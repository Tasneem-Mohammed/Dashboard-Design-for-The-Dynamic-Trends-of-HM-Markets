// function fetchDataAndUpdateBubbleChart() {
//     fetch('/get-bubble-data')
//       .then(response => response.json())
//       .then(bubble_data => {
//         console.log('Data for the third chart:', bubble_data);
//         updateChart3(bubble_data);
//       })
//       .catch(error => console.error('Error:', error))
//       console.log(error);
//   }

//   function updateChart3(data) {
//     // Initialize amCharts
//     am5.ready(function () {
  
//     // Create root element
//       var root = am5.Root.new("chart3");
  
//     // Set themes
//       root.setThemes([
//         am5themes_Animated.new(root)
//       ]);
  
//     // Create chart
//       var chart = root.container.children.push(am5xy.XYChart.new(root, {
//         panX: true,
//         panY: true,
//         wheelY: "zoomXY",
//         pinchZoomX: true,
//         pinchZoomY: true
//       }));
  
//       // Create axes
//       var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
//         tooltip: am5.Tooltip.new(root, {})
//       }));

//       var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {}),
//         tooltip: am5.Tooltip.new(root, {})
//       }));
  
//       // Create series
//       var series = chart.series.push(am5xy.LineSeries.new(root, {
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: "profitValue", // profit heere
//         valueXField :"salesValue", // sales
//         valueField: "quantityValue", // quantity
//         tooltip: am5.Tooltip.new(root, {
//         labelText: " Profit :{profitValue}, Sales:{salesValue}, Quantity:{quantityValue}"
//         })
//       }));
//     series.strokes.template.set("visible", false);

//     chart.set("cursor", am5xy.XYCursor.new(root, {
//         xAxis: xAxis,
//         yAxis: yAxis,
//         snapToSeries: [series]
//       }));
// // Add scrollbars
//     chart.set("scrollbarX", am5.Scrollbar.new(root, {
//         orientation: "horizontal"
//       }));
      
//     chart.set("scrollbarY", am5.Scrollbar.new(root, {
//         orientation: "vertical"
//       }));
//       var canvasBullets = series.children.push(am5.Graphics.new(root, {}));
//       canvasBullets.set("draw", (display) => {
//         // Loop through all data items 
//         am5.array.each(series.dataItems, (dataItem) => {
//             // Set fill style from data context
//             var dataContext = dataItem.dataContext;
//             if (dataContext) {
//                 const point = dataItem.get("point");
//                 if (point) {
//                     display.beginPath();
//                     display.beginFill(am5.color(dataContext.color)); // Sub-Category for color
//                     display.drawCircle(point.x, point.y, dataContext.TotalQuantity / 2); //TotalQuantity for size
//                     display.endFill();
//                 }
//             }
//         });
//     });

//     // User data is set on each redraw, so we use this to mark draw as dirty
//     series.strokes.template.on("userData", () => {
//         canvasBullets._markDirtyKey("draw");
//     });
      
//       series.data.setAll(data);
      
//     // Make stuff animate on load
//     series.appear(1000);
//     chart.appear(1000, 100);
//    // end am5.ready()
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     fetchDataAndUpdateBubbleChart();
//   });

// //////////////////second trial ///////////////

// // function updateChart3(data) {
// //   am5.ready(function () {
// //     var root = am5.Root.new("chart3");

// //     root.setThemes([am5themes_Animated.new(root)]);

// //     var chart = root.container.children.push(am5xy.XYChart.new(root, {
// //       panX: true,
// //       panY: true,
// //       wheelY: "zoomXY",
// //       pinchZoomX: true,
// //       pinchZoomY: true
// //     }));

// //     var titleLabel = am5.Label.new(root, {
// //       text: "All Games With Their Reviews and Ratings",
// //       fontSize: 20,
// //       fontWeight: "500",
// //       textAlign: "center",
// //       x: am5.percent(50),
// //       centerX: am5.percent(50),
// //       paddingTop: 0,
// //       paddingBottom: 0,
// //       fill: am5.color("#ffffff")
// //     });

// //     titleLabel.set("y", 0);
// //     chart.children.unshift(titleLabel);

// //     var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
// //       renderer: am5xy.AxisRendererX.new(root, {}),
// //       tooltip: am5.Tooltip.new(root, {})
// //     }));

// //     xAxis.children.moveValue(am5.Label.new(root, {
// //       text: "Quantity",
// //       x: am5.p50,
// //       centerX: am5.p50,
// //       fill: am5.color("#ffffff")
// //     }), xAxis.children.length - 1);

// //     var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
// //       renderer: am5xy.AxisRendererY.new(root, {
// //         inversed: false
// //       }),
// //       tooltip: am5.Tooltip.new(root, {})
// //     }));

// //     yAxis.children.moveValue(am5.Label.new(root, {
// //       rotation: -90,
// //       text: "Profit",
// //       y: am5.p50,
// //       centerX: am5.p50,
// //       fill: am5.color("#ffffff")
// //     }), 0);

// //     let xRenderer = xAxis.get("renderer");
// //     xRenderer.labels.template.setAll({
// //       fill: am5.color("#ffffff"),
// //       fontSize: "0.8em"
// //     });

// //     let yRenderer = yAxis.get("renderer");
// //     yRenderer.labels.template.setAll({
// //       fill: am5.color("#ffffff"),
// //       fontSize: "0.8em"
// //     });

// //     var series = chart.series.push(am5xy.LineSeries.new(root, {
// //       calculateAggregates: true,
// //       xAxis: xAxis,
// //       yAxis: yAxis,
// //       valueYField: "profit",
// //       valueXField: "Quantity",
// //       valueField: "sales",
// //       seriesTooltipTarget: "bullet",
// //       tooltip: am5.Tooltip.new(root, {
// //         pointerOrientation: "horizontal",
// //         labelText: "[bold]{track_name}[/]\n Category: {valueY.formatNumber('#.0')}\n Quantity: {valueX.formatNumber('#,###.')}\n Sales: {value.formatNumber('#,###.')}"
// //       })
// //     }));

// //     series.set("type", am5xy.ScatterSeries.new(root, {
// //       calculateAggregates: true,
// //       xAxis: xAxis,
// //       yAxis: yAxis,
// //       valueYField: "profit",
// //       valueXField: "Quantity",
// //       valueField: "sales",
// //       seriesTooltipTarget: "bullet",
// //       tooltip: am5.Tooltip.new(root, {
// //         pointerOrientation: "horizontal",
// //         labelText: "[bold]{track_name}[/]\n Category: {valueY.formatNumber('#.0')}\n Quantity: {valueX.formatNumber('#,###.')}\n Sales: {value.formatNumber('#,###.')}"
// //       })
// //     }));

// //     var circleBullet = series.bullets.push(am5.Bullet.new(root, {
// //       sprite: am5.Circle.new(root, {
// //         radius: 5,
// //         fill: am5.color("#a367dc")
// //       })
// //     }));

// //     series.set("heatRules", [{
// //       target: circleBullet.get("sprite"),
// //       min: 1,
// //       max: 9,
// //       dataField: "value",
// //       key: "radius"
// //     }]);

// //     chart.set("cursor", am5xy.XYCursor.new(root, {
// //       xAxis: xAxis,
// //       yAxis: yAxis,
// //       snapToSeries: [series]
// //     }));

// //     chart.set("scrollbarX", am5.Scrollbar.new(root, {
// //       orientation: "horizontal"
// //     }));

// //     chart.set("scrollbarY", am5.Scrollbar.new(root, {
// //       orientation: "vertical"
// //     }));

// //     series.data.setAll(data);

// //     series.appear(1000);
// //     chart.appear(1000, 100);
// //   });
// // }

  
// //   document.addEventListener('DOMContentLoaded', function() {
// //       fetchDataAndUpdateBubbleChart3();
// //     });