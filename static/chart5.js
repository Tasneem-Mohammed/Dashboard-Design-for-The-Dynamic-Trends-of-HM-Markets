function fetchDataAndUpdateSortedBarChart() {
    fetch('/get-sortedBar-data')
      .then(response => response.json())
      .then( sortedBar => {
        console.log('Data for the Sorted Bar chart:', sortedBar);
        updateChart5(sortedBar);
      })
      .catch(error => console.error('Error:', error))
}

function updateChart5(data) {
  am5.ready(function () {
    var root = am5.Root.new("chart5");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0
    }));

    // chart.zoomOutButton.set("forceHidden", true);

    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    yRenderer.grid.template.set("location", 1);

    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "sub-category",
      renderer: yRenderer,
      tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
    }));

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      numberFormatter: am5.NumberFormatter.new(root, {
        "numberFormat": "#,###a"
      }),
      extraMax: 0.1,
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0.1,
        minGridDistance: 50
      })
    }));

    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "sub-category",
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "sales",
      categoryYField: "sub-category",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "left",
        labelText: "{valueX}"
      })
    }));

    series.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
      strokeOpacity: 0
    });

    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);
    sortCategoryAxis();

    function getSeriesItem(category) {
      for (var i = 0; i < series.dataItems.length; i++) {
        var dataItem = series.dataItems[i];
        if (dataItem.get("sub-category") === category) {
          return dataItem;
        }
      }
    }

    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none",
      xAxis: xAxis,
      yAxis: yAxis
    }));

    function sortCategoryAxis() {
      series.dataItems.sort(function (x, y) {
        return x.get("valueX") - y.get("valueY");
      });

      am5.array.each(yAxis.dataItems, function (dataItem) {
        var seriesDataItem = getSeriesItem(dataItem.get("sub-category"));

        if (seriesDataItem) {
          var index = series.dataItems.indexOf(seriesDataItem);
          var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
          dataItem.set("index", index);
          dataItem.set("deltaPosition", -deltaPosition);
          dataItem.animate({
            key: "deltaPosition",
            to: 0,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic)
          });
        }
      });

      yAxis.dataItems.sort(function (x, y) {
        return x.get("index") - y.get("index");
      });
    }
    var label = series.labelText.CategoryAxis.template.setAll({
        fontFamily: "Pacifico",
        fontStyle: "italic"
      })
    
    series.appear(1000, 100);
    chart.appear(1000);
    console.log("data",data);
    // console.log("series: ", series.dataItems)
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdateSortedBarChart();
});