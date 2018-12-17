function donutChartRevenues() {
    d3.json("https://241c7699-0d58-47f2-90ea-da4d443eed81.mock.pstmn.io/revenue?year=2018", function(jsonData)
    {
    const total = jsonData[0].revenue + jsonData[1].revenue

    const tabletPercent = jsonData[0].revenue*100/total + '%'
    const smartphonePercent = jsonData[1].revenue*100/total + '%'

    const width = 300;
    const height = 300;
    const radius = 80;
    const color = d3.scaleOrdinal()
      .range(["#89d341", "#3a681b"]);
    
    const canvas = d3.select(".donutChartRevenues").append("svg")
      .attr("class", "svg-padre")

    const group = canvas.append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2+ ")");

    const arc = d3.arc()
      .innerRadius(87)
      .outerRadius(radius)

    const pie = d3.pie()
      .value(function(d) {
        return d.revenue;
      })
      .sort(function (a,b) {
        return d3.ascending(a.revenue, b.revenue)
      })

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
      .attr("dy", "-1em")
      .style("text-anchor", "middle")
      .style("font-family", "Roboto")
      .attr("fill", "#a9a9a9")
      .text("REVENUE")

      theArc.append("text")
        .attr("dy", "0.5em")
        .style("text-anchor", "middle")
        .style("font-size", "1.7em")
        .style("font-family", "Roboto")
        .attr("fill", "#3d3d3d")
        .text(total.toLocaleString() + "€")

    // Legends
    const tabletText = canvas.append("text")
      .attr("transform", "translate(" + 0 + "," + height/1.13 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .style("font-weight", "600")
      .attr("fill", "#89d341")
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
      .text(jsonData[0].revenue.toLocaleString() + '€')

    const smarthphoneText = canvas.append("text")
      .attr("transform", "translate(" + width/1.44 + "," + height/1.13 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .style("font-weight", "600")
      .attr("fill", "#3a681b")
      .text("Smartphone")

    canvas.append("text")
      .attr("transform", "translate(" + width/1.5 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#3d3d3d")
      .text(smartphonePercent)

    canvas.append("text")
      .attr("transform", "translate(" + width/1.25 + "," + height/1.05 + ")")
      .style("font-family", "Roboto")
      .style("font-size", "1em")
      .attr("fill", "#a9a9a9")
      .text(jsonData[1].revenue.toLocaleString() + '€')
    })
  }
  
  donutChartRevenues()