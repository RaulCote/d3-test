function donutChartImpressions() {
  d3.json("https://241c7699-0d58-47f2-90ea-da4d443eed81.mock.pstmn.io/impresions?year=2018", function(jsonData)
  {

    const total = jsonData[0].impresions + jsonData[1].impresions

    const tabletPercent = jsonData[0].impresions*100/total + '%'
    const smartphonePercent = jsonData[1].impresions*100/total + '%'

    const width = 300;
    const height = 300; 
    const radius = 80;
    const color = d3.scaleOrdinal()
      .range(["#74c9e5", "#2c5264"]);
    
    const canvas = d3.select(".donutChartImpressions").append("svg")
      .attr("class", "svg-padre")


    const group = canvas.append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2+ ")");

    const arc = d3.arc()
      .innerRadius(87)
      .outerRadius(radius)

    const pie = d3.pie()
      .value(function(d) {
        return d.impresions;
      });

    const theArc = group.selectAll(".arc")
      .data(pie(jsonData))
      .enter()
      .append("g")
      .attr("class", "arc")

    theArc.append("path")
      .attr("d", arc)
      .attr("fill", function(d, i) 
        {
          return color(i)
        })

    theArc.append("text")
      .attr("dy", "-0.7em")
      .style("text-anchor", "middle")
      .style("font-family", "Roboto")
      .style("font-size", "1.23em")
      .attr("fill", "#a9a9a9")
      .text("IMPRESIONS")
    
    theArc.append("text")
      .attr("dy", "0.5em")
      .style("text-anchor", "middle")
      .style("font-size", "1.6em")
      .style("font-family", "Roboto")
      .attr("fill", "#3d3d3d")
      .text(total.toLocaleString())

// Legends
    const tabletText = canvas.append("text")
      .attr("transform", "translate(" + 0 + "," + height/1.13 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .style("font-weight", "600")
      .attr("fill", "#74c9e5")
      .text("Tablet")

      canvas.append("text")
      .attr("transform", "translate(" + 0 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#3d3d3d")
      .text(tabletPercent)

      canvas.append("text")
      .attr("transform", "translate(" + width/7 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#a9a9a9")
      .text(jsonData[0].impresions.toLocaleString())

    const smarthphoneText = canvas.append("text")
      .attr("transform", "translate(" + width/1.44 + "," + height/1.13 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .style("font-weight", "600")
      .attr("fill", "#2c5264")
      .text("Smartphone")

      canvas.append("text")
      .attr("transform", "translate(" + width/1.7 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#3d3d3d")
      .text(smartphonePercent)

      canvas.append("text")
      .attr("transform", "translate(" + width/1.39 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#a9a9a9")
      .text(jsonData[1].impresions.toLocaleString())
  })
}

donutChartImpressions()