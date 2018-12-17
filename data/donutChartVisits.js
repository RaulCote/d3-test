function donutChartVisits() { 
  d3.json("https://241c7699-0d58-47f2-90ea-da4d443eed81.mock.pstmn.io/visits?year=2018", function(jsonData)
  {

    const total = jsonData[0].visits + jsonData[1].visits

    const tabletPercent = jsonData[0].visits*100/total + '%'
    const smartphonePercent = jsonData[1].visits*100/total + '%'

    const width = 300;
    const height = 300;
    const radius = 80;
    const color = d3.scaleOrdinal()
      .range(["#eec531", "#bb5a21"]);
    
    const canvas = d3.select(".donutChartVisits").append("svg")
      .attr("class", "svg-padre")

    const group = canvas.append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2+ ")");

    const arc = d3.arc()
      .innerRadius(87)
      .outerRadius(radius)

    const pie = d3.pie()
    .value(function(d) {
      return d.visits;
    })
    .sort(function (a,b) {
      return d3.ascending(a.visits, b.visits)
    })
      

    const theArc = group.selectAll(".arc")
      .data(pie(jsonData))
      .enter()
      .append("g")
      .attr("class", "arc")

    theArc.append("path")
    .sort(function (a,b) {
      return d3.descending(a.visits, b.visits)
    })
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
    .text("VISITS")
  
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
      .attr("fill", "#eec531")
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
      .text(jsonData[0].visits.toLocaleString())

    const smarthphoneText = canvas.append("text")
      .attr("transform", "translate(" + width/1.42 + "," + height/1.13 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .style("font-weight", "600")
      .attr("fill", "#bb5a21")
      .text("Smartphone")

    canvas.append("text")
      .attr("transform", "translate(" + width/1.75 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#3d3d3d")
      .text(smartphonePercent)

    canvas.append("text")
      .attr("transform", "translate(" + width/1.42 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#a9a9a9")
      .text(jsonData[1].visits.toLocaleString())
  })
}
  
donutChartVisits()