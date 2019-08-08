////////////登陸失敗的
const width = 500, height =500, radius = 150;
const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
const labelArc = d3.arc().outerRadius(radius+20).innerRadius(radius);
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "data/output_Fasle.json",
        data: "data",
        async: false,
        dataType: "json",
        success: function (response) {
            const data = Object.assign({}, response);
            const pie_data = d3.pie()(data.false.map(function(d) {return d.times;}));
            console.log(pie_data);
            const svg = d3.select("#fasle_circle")   
                .append("svg")
                .attr("width", width)   
                .attr("height", height);   

            const g = svg.selectAll(".arc")
                .data(pie_data)
                .enter().append("g")
                .attr('transform','translate(200,200)')
                .attr("class", "arc");

            const color = d3.scaleOrdinal().range(d3.schemeSet3);

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data); 
                });

            g.append("text")
            .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")";})
            .attr("text-anchor", "middle") 
            .text(function(d) { 
                return d.data; 
            });

            $("#fasle_title").html("SSH登錄失敗IP次數");
        }
    });

//////////////////////成功的

    $.ajax({
        type: "GET",
        url: "data/output_Success.json",
        async: false,
        data: "data",
        dataType: "json",
        success: function (response) {
            const data = Object.assign({}, response);
            const pie_data = d3.pie()(data.true.map(function(d) {return d.times;}));

            
            const svg = d3.select("#fasle_circle")   
                .append("svg")
                .attr("width", width)   
                .attr("height", height);   

            const g = svg.selectAll(".arc")
                .data(pie_data)
                .enter().append("g")
                .attr('transform','translate(200,200)')
                .attr("class", "arc");

            const color = d3.scaleOrdinal().range(d3.schemeSet3);

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data); 
                });

            g.append("text")
            .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")";})
            .attr("text-anchor", "middle") 
            .text(function(d) { 
                return d.data; 
            });

            $("#success_title").html("SSH登錄成功IP次數");
        }
    });
});