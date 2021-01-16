function BellyButton(table_data){

d3.json("samples.json").then((data =>{
    console.log(data);
    var data = data.data;
    var results = data.filter(obj=>obj.id==table_data);
    var target = results[0];
    var formatting = d3.select("#sample-metadata");
    formatting.html("");
    Object.entries(target).ForEach(([key,value])=>{
        formatting.append("h5").text(`${key.toUpperCase()}:${value}`);
    });
    }));
};

//function barChart(table_data){

//d3.json("samples.json").then((sampleData =>{  
    //var data = data.sampleData;
    //var results = data.filter(obj=>obj.id==table_data);
    //var target = results(0);
//})};

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

function changed(table_data) {
    // Fetch new data each time a new sample is selected
    bubbleChart(table_data);
    BellyButton(table_data);
  }
  // Initialize the dashboard
  changed();