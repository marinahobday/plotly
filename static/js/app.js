function BellyButton(table_data){

d3.json("samples.json").then((data =>{
    console.log(data);
    var data = data.metadata;
    var results = data.filter(obj=>obj.id==table_data);
    var target = results[0];
    console.log(target)
    var formatting = d3.select("#sample-metadata");
    formatting.html("");
    Object.entries(target).forEach(([key,value])=>{
        formatting.append("h5").text(`${key.toUpperCase()}:${value}`);
    });
    }));
};

function barChart(table_data){

d3.json("samples.json").then((sampleData =>{  
    var data = sampleData.samples;
    var results = data.filter(obj=>obj.id==table_data);
    var target = results[0];
    var otu_ids = target.otu_ids;
    var otu_labels = target.otu_labels;
    var sample_values = target.sample_values;
    var barchartLayout = {   
        title: "Top 10 OTUs",
        hovermode: "closest",
        xaxis: { title: "Number" },
        yaxis: { title: "OTU"},
        margin: { t: 30, l: 150}};
    var barchartData = [
        {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_ids => `otu${otu_ids}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ]
    Plotly.newPlot("bar", barchartData, barchartLayout);
}))};

function bubbleChart(table_data){

d3.json("samples.json").then((data =>{
    var data = data.samples;
    var results = data.filter(obj=>obj.id==table_data);
    var target = results[0];
    var otu_ids = target.otu_ids;
    var otu_labels = target.otu_labels;
    var sample_values = target.sample_values;
    var bubbleLayout = {   
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}};
    var bubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "earth"
            }
        }
    ]
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}));
}

// var populateDropdown = function(names) {

//     var selecting = d3.select("#selDataset");
//     var options = selectTag.selectAll("option").data(names);
  
//     options.enter()
//         .append('option')
//         .attr('value', function(d) {
//             return d;
//         })
//         .text(function(d) {
//             return d;
//         });
  
//   };
function popmydata() {
    d3.json("samples.json").then((data =>{
        var names = data.names;
        var selecting = d3.select("#selDataset");
        names.forEach((sample)=>{
            selecting.append("option")
            .text(sample)
            .property("value", sample)
        });
        var firstsample = names[0];

    barChart(firstsample);
    bubbleChart(firstsample);
    BellyButton(firstsample); 
}
))};
popmydata()
//yolo
function optionChanged(table_data) {
    // Fetch new data each time a new sample is selected
    // barChart(table_data);
    // bubbleChart(table_data);
    BellyButton(table_data);
    bubbleChart(table_data);
    barChart(table_data);

  }
  // Initialize the dashboard
optionChanged();