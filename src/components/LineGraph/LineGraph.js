import React, {useEffect} from 'react';

import * as d3 from "d3";
import './LineGraph.css';

function LineGraph({ data, highLoad, width, height }) {
  const margin = ({ top: 20, right: 50, bottom: 50, left: 50 });
  
  //y scale
  const y = d3.scaleLinear()
    .domain([0, Math.max(d3.max(data, d => d.value), 1.5)])
    .range([height - margin.bottom, margin.top]);

  //x scale
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])

  //x-Axis tick scale
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 60).tickFormat(d3.timeFormat("%I:%M %p")))

  //y-Axis tick scale
  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(width / 70).tickSize(-width + margin.left + 48)).call(g => g.select(".domain").remove())

  //initial line definition
  const line = d3.line()
    .defined(d => !isNaN(d.value) && d.value !== null)
    .x(d => x(d.date))
    .y(d => y(d.value))
    .curve(d3.curveBasis);
  
    //initial render
  useEffect(() => {
  //chart draw (initial render)
  const chartDraw = () => {
    //create SVG
    const svg = d3.select(".LineGraph").append("svg")
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('class', 'svg-wrapper');
    
    //render X-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(${5}, ${height - margin.bottom})`)
      .transition().duration(1000).ease(d3.easeLinear)
      .call(xAxis);

    //render y-axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    //render line
    svg.append("path")
      .attr("class", "line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", highLoad ? "rgb(227,96,63)" : "#21ce99")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
    
    //render High Load limit line
    svg
      .append("line")
      .attr('class', 'maxLine')
      .attr("x1", x(x.domain()[0]))
      .attr("x2", x(x.domain()[1]) + 3)
      .attr("y1", y(1))
      .attr("y2", y(1))
      .style("stroke", "#F45531")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "5,5");
    
    //create text nodes
    svg
      .append("text")
      .text("High-Load")
      .attr("x", x(x.domain()[1]) - 50)
      .attr("y", y(1) - 5)
      .attr("font-size", 10)
      .attr("fill", "#F45531")
      .attr("font-family", "sans-serif")
      .attr('class', 'maxLineText graphText');
    
    svg.append("text")
      .attr('class', 'graphText')
      .text("Time")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height - margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .attr('font-size', 12)
      .attr('fill', 'white');
    
    svg
      .append("text")
      .text("CPU Load")
      .attr('class', 'maxLineText graphText')
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("fill", "white");

    return svg.node();
  }
    chartDraw();
  }, []);

  //update render
  useEffect(() => {
    const chartUpdate = () => {
    //update domains on rerender
    x.domain(d3.extent(data, d => d.date));
    y.domain([0, Math.max(d3.max(data, d => d.value), 1.5)]);
    let svg = d3.select(".LineGraph").transition();
    //redraw maxline
    svg
      .select(".maxLine")
      .attr("y1", y(1))
      .attr("y2", y(1))
      .attr("x1", x(x.domain()[0]))
      .attr("x2", x(x.domain()[1]) + 3);
    
    //move maxline text
    svg.select(".maxLineText")
      .attr("y", y(1) - 5)

    //redraw line
    svg
      .select(".line")
      .attr("stroke", highLoad ? "rgb(227,96,63)" : "#21ce99")
      .duration(750)
      .attr("d", line(data));
    
    //redraw x-axis
    svg.select(".x.axis") 
      .duration(750)
      .call(xAxis);
    
    //redraw y-axis (remove left and top axis lines)
    svg.select(".y.axis") 
      .duration(750)
      .call(yAxis).select('.domain')
                    .attr('stroke-width', 0);
  }
    chartUpdate();
  }, [data]);

  

  
  return (
    <div className="LineGraph"></div>
  );
}

export default LineGraph;
