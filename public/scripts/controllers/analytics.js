(function () {

    'use strict';

    var app = angular.module('app');

    app.controller('AnalyticsController', ['OrderService', AnalyticsController]);

    function AnalyticsController(OrderService) {

        var model = this;
        
        // Retrieve all orders that have been placed
        function fetchOrders() {
            function onSuccess(orders) {
                // Draw the analytics by processing the order history
                drawChart(orders, '#analytics', 10);
            }
            function onFailure(error) {
                
            }
            OrderService.getOrders().then(onSuccess, onFailure);
        }
        
        // Draw analytics chart corresponding to order history
        function drawChart(orders, domID, nDays) {
            
            // Process input data
            var raw = orders.slice();
            var data = d3.nest()
                .key(function(order) { return new Date(order.timePlaced).toLocaleDateString(); })
                .rollup(function(order) { return d3.sum(order, function(o) { return o.total; }); })
                .entries(raw);
            
            // Define function to read x (date) and y (order total) values
            var xFn = function(order) { return d3.time.format.iso.parse(order.key); }
            var yFn = function(order) { return order.values; }
            
            // Variables initialization for the purpose of rendering
            var margin = {top: 20, right: 40, bottom: 30, left: 20};
            var parentWidth = parseInt(d3.select(domID).style('width'), 10);
            var parentHeight = Math.floor(parentWidth / 1.6);
            var width = parentWidth - margin.left - margin.right;
            var height = parentHeight - margin.top - margin.bottom;
            var n = nDays + 1;
            var barWidth = Math.floor(width / (n));
            var now = new Date();
            var past = new Date();
            past.setDate(past.getDate() - n + 1);
            
            // Specify the x and y scale
            var x = d3.time.scale()
                .rangeRound([barWidth / 2, width - barWidth / 2])
                .domain([past, now]);
            var y = d3.scale.linear()
                .range([height, 0])
                .domain([0, d3.max(data, yFn)]);
            
            // Specify the x and y axis
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .ticks(d3.time.days, 1);
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('right')
                .tickFormat(function(total) { return '$' + Math.round(total); });
            
            // Add the graph (svg) directive to domID
            var svg = d3.select(domID).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            
            // Add the axes to the graph    
            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
                .attr('transform', 'translate(' + width + ', 0)');
            svg.append('g')
                .attr('class', 'x axis')
                .call(xAxis)
                .attr('transform', 'translate(0,' + height + ')');
            
            // Add the bars to the graph
            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', function(order) { return x(xFn(order)) - barWidth / 2 + 1; })
                .attr('width', barWidth - 2)
                .attr('y', function(order) { return y(yFn(order)); })
                .attr('height', function(d) { return height - y(yFn(d)); });
        }
        
        fetchOrders();
    }

})();