function fetchDataAndUpdateMap6Chart() {
    fetch('/get-Map-data')
      .then(response => response.json())
      .then( Map_data => {
        console.log('Data for the mapchart:', Map_data);
        updateChart6(Map_data);
      })
      .catch(error => console.error('Error:', error));
}

function updateChart6(data) {
    am5.ready(function() {

        // Create root
        var root = am5.Root.new("chart6"); 
        
        // Set themes
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        // Create chart
        var chart = root.container.children.push(am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "none",
          projection: am5map.geoAlbersUsa(),
          layout: root.horizontalLayout
        }));
        
        // Create polygon series
        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_usaLow,
          valueField: "value",
          calculateAggregates: true
        }));
        
        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "{name}: {value}"
        });
        
        polygonSeries.set("heatRules", [{
          target: polygonSeries.mapPolygons.template,
          dataField: "value",
          min: am5.color(0x967bb6),
          max: am5.color(0x020f0),
          key: "fill"
        }]);
        
        polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
          heatLegend.showValue(ev.target.dataItem.get("value"));
        });
        
        polygonSeries.data.setAll(data);
        // polygonSeries.data.setAll([
        //   { id: "US-AL", value: 4447100 },
        //   { id: "US-AK", value: 626932 },
        //   { id: "US-WY", value: 493782 }
        // ]);
        
        var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
          orientation: "vertical",
          startColor: am5.color(0xff621f),
          endColor: am5.color(0x661f00),
          startText: "Lowest",
          endText: "Highest",
          stepCount: 5
        }));
        // heatLegend.startLabel.color = am5.color(0x661f00);
        heatLegend.startLabel.setAll({
          fontSize: 15,
          fill: am5.color(0x661f00)
        })
        
        heatLegend.endLabel.setAll({
          fontSize: 15,
          fill: am5.color(0x661f00)
        });
        
        // change this to template when possible
        polygonSeries.events.on("datavalidated", function () {
          heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
          heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
        });
        
        }); // end am5.ready()
    }

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateMap6Chart();
});
