function fetchDataAndUpdatePieChart() {
    fetch('/get-pie-data')
      .then(response => response.json())
      .then( pie_data => {
        console.log('Data for the second chart:', pie_data);
        updateChart2(pie_data);
      })
      .catch(error => console.error('Error:', error))
}

function updateChart2(data) {
    // Initialize amCharts
    am5.ready(function () {
  
        // Create root element
        var root = am5.Root.new("chart2");
  
        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        
  
        // Create chart
        var chart = root.container.children.push(am5percent.PieChart.new(root, {
            endAngle:270
        })
        );
        
       
        // Create series
        var series = chart.series.push(am5percent.PieSeries.new(root, {
                categoryField: "status",
                valueField: "value",
                endAngle:270
            }));

        var label = series.labels.template.setAll({
                // fontWeight: "bold",
                fontFamily: "Pacifico",
                fontStyle: "italic"
              });
       
        
        // Make stuff animate on load
        series.appear(1000, 125);

        // Assign data to the series
        series.data.setAll(data);
        
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdatePieChart();
});
