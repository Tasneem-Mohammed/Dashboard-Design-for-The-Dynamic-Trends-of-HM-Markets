function fetchDataAndUpdateBarChart() {
    fetch('/get-d')
      .then(response => response.json())
      .then(data => {
        updateChart(data);
      })
      .catch(error => console.error('Error:', error))
  }

  function updateChart(data) {
    // Initialize amCharts
    am5.ready(function () {
  
    // Create root element
      var root = am5.Root.new("chart1");
  
    // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
  
    // Create chart
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingRight:1,
        paddingLeft:0
      }));
  
      // Add cursor
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);
  
      // Create axes
      var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30,
        minorGridEnabled: true
       });
      xRenderer.labels.template.setAll({
        rotation: 0,
        centerY: am5.p50,
        centerX: am5.p50,
        paddingRight: 15,
        // fontWeight: "bold",
        fontFamily: "Pacifico",
        fontStyle: "oblique",
        fontSize:20
      });
      xRenderer.grid.template.setAll({
        location: 1
      });
  
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviationX: 0.3,
        categoryField: "status",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));

      var yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })
  
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviationY: 0.3,
        renderer: yRenderer
      }));
  
      // Create series
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "status",
        tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"// or valueX?
        })
      }));
  
    series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
    });
   
    series.columns.template.adapters.add("fill", function(fill, target) {
      if (target.dataItem.get("valueY") > 20) {
        return am5.color("#800080");
      }
      else {
        return am5.color("#b768a2");  
    }});   
    series.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });    

    xAxis.data.setAll(data) ;
    series.data.setAll(data) ;
    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateBarChart();
  });