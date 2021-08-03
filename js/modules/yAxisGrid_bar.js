"use strict";

function yAxisGrid_bar(chart, xAxisWidth, scaleY, setting) {
    let ticks = scaleY.ticks();
    let distance = (ticks[ticks.length - 1] - ticks[0]) / 5;
    let newTicks = new Array();
    if(ticks[0] < 0) newTicks.push(0);
    for(let i = 0; i <= 5; i++) {
        let value = ticks[0] + i*distance;
        newTicks.push(value);
    }
    newTicks.sort(function(a, b) { return a - b;});
    chart.append("g")
    .lower()	
    .attr("class", "yGrid grid")
    .call(d3.axisLeft(scaleY)
        .tickSize(-xAxisWidth)
        .tickValues(newTicks)
        .tickFormat(d3.formatLocale(
            {
            decimal: ",",
            thousands: " ",
            grouping: [3]
            }
        ).format(",.0f"))
    );
    chart.selectAll("g.grid line")
    .each(function() {
        d3.select(this)
        .attr("stroke-dasharray", "3, 3");
    });
    chart.selectAll("g.yGrid text")
    .each(function() {
        d3.select(this)
        .attr("transform", `translate(${-1 * setting.yTicks.rowMargin}, 0)`)
    });
}

