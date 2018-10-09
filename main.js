import * as d3  from 'd3';
import crossfilter from 'crossfilter2';
import * as dc from 'dc';


let chart = dc.barChart('#test');

d3.csv('morley.csv').then(function(experiments) {
  experiments.forEach(function(x) {
    x.Speed = +x.Speed;
  });

  let ndx  = crossfilter(experiments);
  let runDimension = ndx.dimension(function(d) {return +d.Run;});
  let speedSumGroup = runDimension
      .group().reduceSum(function(d)
                         {return d.Speed * d.Run / 1000;});

  chart
    .width(768)
    .height(480)
    .x(d3.scaleLinear().domain([6,20]))
    .brushOn(false)
    .yAxisLabel('This is the Y Axis!')
    .dimension(runDimension)
    .group(speedSumGroup)
    .on('renderlet', function(chart) {
      chart.selectAll('rect').on('click', function(d) {
        console.log('click!', d);
      });
    });

  chart.render();

});
