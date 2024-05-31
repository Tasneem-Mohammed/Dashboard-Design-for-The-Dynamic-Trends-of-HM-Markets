// function fetchDataAndUpdateLineChart() {
//     fetch('/get-line-data')
//         .then(response => response.json())
//         .then(line_data => {
//             console.log('Data for the line chart:', line_data);
//             updateChart4(line_data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // console.log(error); 
//         });
// }


// function updateChart4(data) {
//     // Initialize amCharts
//     am5.ready(function () {

//         // Create root element
//         var root = am5.Root.new("chart4");

//         const myTheme = am5.Theme.new(root);

//         myTheme.rule("AxisLabel", ["minor"]).setAll({
//             dy: 1
//         });

//         myTheme.rule("Grid", ["x"]).setAll({
//             strokeOpacity: 0.05
//         });

//         myTheme.rule("Grid", ["x", "minor"]).setAll({
//             strokeOpacity: 0.05
//         });
//         // Set themes
//         root.setThemes([
//             am5themes_Animated.new(root),
//             myTheme
//         ]);


//         // Create chart
//         var chart = root.container.children.push(am5xy.XYChart.new(root, {
//             panX: true,
//             panY: true,
//             wheelX: "panX",
//             wheelY: "zoomX",
//             maxTooltipDistance: 0,
//             pinchZoomX: true
//         }));

//         // Create axes
// var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
//     maxDeviation: 0.2,
//     baseInterval: {
//         timeUnit: "day",
//         count: 1
//     },
//     renderer: am5xy.AxisRendererX.new(root, {
//         minorGridEnabled: true
//     }),
//     tooltip: am5.Tooltip.new(root, {})
// }));

// var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//     renderer: am5xy.AxisRendererY.new(root, {})
// }));

// // Add series
// for (var i = 0; i < data.length; i++) {
//     var series = chart.series.push(am5xy.LineSeries.new(root, {
//         name: data[i]["sub-category"],
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: "sales",
//         valueXField: "date",
//         legendValueText: "{valueY}",
//         tooltip: am5.Tooltip.new(root, {
//             pointerOrientation: "horizontal",
//             labelText: "{valueY}"
//         })
//     }));

//             // Parse date string into JavaScript Date object
//             var date = new Date(data[i]["date"]);
//             var sales = data[i]["sales"];
//         date = dateFormat(date);
//             // Set data for the series
//             series.data.setAll([{
//                 "date": date,
//                 "sales": sales,
//                 "sub-category": data[i]["sub-category"]
//             }]);
//             // Make stuff animate on load
//             // https://www.amcharts.com/docs/v5/concepts/animations/
//             series.appear();
//         }

//         // Add cursor
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
//         var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
//             behavior: "none"
//         }));
//         cursor.lineY.set("visible", false);

//         // Add scrollbar
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
//         chart.set("scrollbarX", am5.Scrollbar.new(root, {
//             orientation: "horizontal"
//         }));

//         chart.set("scrollbarY", am5.Scrollbar.new(root, {
//             orientation: "vertical"
//         }));

//         // Add legend
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
//         var legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
//             width: 200,
//             paddingLeft: 15,
//             height: am5.percent(100)
//         }));

//         // When legend item container is hovered, dim all the series except the hovered one
//         legend.itemContainers.template.events.on("pointerover", function (e) {
//             var itemContainer = e.target;

//             // As series list is data of a legend, dataContext is series
//             var series = itemContainer.dataItem.dataContext;

//             chart.series.each(function (chartSeries) {
//                 if (chartSeries != series) {
//                     chartSeries.strokes.template.setAll({
//                         strokeOpacity: 0.15,
//                         stroke: am5.color(0x000000)
//                     });
//                 } else {
//                     chartSeries.strokes.template.setAll({
//                         strokeWidth: 3
//                     });
//                 }
//             })
//         })

//         // When legend item container is unhovered, make all series as they are
//         legend.itemContainers.template.events.on("pointerout", function (e) {
//             var itemContainer = e.target;
//             var series = itemContainer.dataItem.dataContext;

//             chart.series.each(function (chartSeries) {
//                 chartSeries.strokes.template.setAll({
//                     strokeOpacity: 1,
//                     strokeWidth: 1,
//                     stroke: chartSeries.get("fill")
//                 });
//             });
//         })

//         legend.itemContainers.template.set("width", am5.p100);
//         legend.valueLabels.template.setAll({
//             width: am5.p100,
//             textAlign: "right"
//         });

//         // It's important to set legend data after all the events are set on template, otherwise events won't be copied
//         legend.data.setAll(chart.series.values);

//         // Make stuff animate on load
//         // https://www.amcharts.com/docs/v5/concepts/animations/
//         chart.appear(1000, 100);
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     fetchDataAndUpdateLineChart();
// });
