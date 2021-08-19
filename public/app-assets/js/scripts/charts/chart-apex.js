/*=========================================================================================
    File Name: chart-apex.js
    Description: Apexchart Examples
    ----------------------------------------------------------------------------------------
    Item Name: Frest HTML Admin Template
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(document).ready(function () {

  var $primary = '#5A8DEE',
    $success = '#39DA8A',
    $danger = '#FF5B5C',
    $warning = '#FDAC41',
    $info = '#00CFDD',
    $label_color_light = '#E6EAEE';

  var themeColors = [$primary, $warning, $danger, $success, $info];

  // Line Chart
  // ----------------------------------
  var lineChartOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: themeColors,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [
      {
        name: "Deasease A",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
      {
        name: "Deasease B",
        data: [5, 31, 25, 61, 9, 42, 19, 21, 158],
      }
    ],
    title: {
      text: 'Deseases Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    yaxis: {
      tickAmount: 5,
    }
  }
  var lineChart = new ApexCharts(
    document.querySelector("#line-chart"),
    lineChartOptions
  );
  lineChart.render();

  // Line Area Chart
  // ----------------------------------
  var lineAreaOptions = {
    chart: {
      height: 350,
      type: 'area',
    },
    colors: themeColors,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    annotations: {
      points: [
        {
          x: new Date('2019-09-18T01:00:00').getTime(),
          y: 40,
          marker: {
            size: 6,
            fillColor: "#fff",
            strokeColor: "#2698FF",
            radius: 2
          },
          label: {
            offsetY: 0,
            style: {
              color: "white",
              background: "green"
            },
            text: "Increased"
          }
        },
        {
          x: new Date('2019-09-18T04:00:00').getTime(),
          y: 42,
          marker: {
            size: 6,
            fillColor: "#fff",
            strokeColor: "#2698FF",
            radius: 2
          },
          label: {
            borderColor: "red",
            offsetY: 0,
            style: {
              color: "red",
              background: "red"
            },
            text: "Decreased"
          }
        }
      ]
    },
    legend: {
      offsetY: -10
    },
    xaxis: {
      type: 'datetime',
      categories: ["2019-09-18T00:00:00", "2019-09-18T01:00:00", "2019-09-18T02:00:00",
        "2019-09-18T03:00:00", "2019-09-18T04:00:00", "2019-09-18T05:00:00",
        "2019-09-18T06:00:00"
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  }
  var lineAreaChart = new ApexCharts(
    document.querySelector("#line-area-chart"),
    lineAreaOptions
  );
  lineAreaChart.render();

  // Column Chart
  // ----------------------------------
  var columnChartOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: themeColors,
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    series: [{
      name: 'Plant A',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Plant  B',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Plant C',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    legend: {
      offsetY: -10
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1

    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  }
  var columnChart = new ApexCharts(
    document.querySelector("#column-chart"),
    columnChartOptions
  );

  columnChart.render();

  // Bar Chart
  // ----------------------------------
  var barChartOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: themeColors,
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100]
    }],
    xaxis: {
      categories: ['Abidjan', 'San Pedro', 'Korogho', 'Odienne', 'Bingerville', 
      'Sakassou', 'Man', 'Jacqueville'],
      tickAmount: 5
    }
  }
  var barChart = new ApexCharts(
    document.querySelector("#bar-chart"),
    barChartOptions
  );
  barChart.render();


  // Mixed Chart
  // -----------------------------
  var mixedChartOptions = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    colors: themeColors,
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    series: [{
      name: 'TEAM A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
      name: 'TEAM B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
      name: 'TEAM C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
    markers: {
      size: 0
    },
    legend: {
      offsetY: -10
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      title: {
        text: 'Points'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " views";
          }
          return y;

        }
      }
    }
  }
  var mixedChart = new ApexCharts(
    document.querySelector("#mixed-chart"),
    mixedChartOptions
  );
  mixedChart.render();

  // Pie Chart
  // -----------------------------
  var pieChartOptions = {
    chart: {
      type: 'pie',
      height: 320
    },
    colors: themeColors,
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    series: [44, 55, 13, 43],
    legend: {
      itemMargin: {
        horizontal: 2
      },
    },
    responsive: [{
      breakpoint: 576,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  var pieChart = new ApexCharts(
    document.querySelector("#pie-chart"),
    pieChartOptions
  );
  pieChart.render();

  // Donut Chart
  // -----------------------------
  var donutChartOptions = {
    chart: {
      type: 'donut',
      height: 320
    },
    colors: themeColors,
    series: [44, 55, 41, 17],
    legend: {
      itemMargin: {
        horizontal: 2
      },
    },
    responsive: [{
      breakpoint: 576,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  var donutChart = new ApexCharts(
    document.querySelector("#donut-chart"),
    donutChartOptions
  );

  donutChart.render();


});
