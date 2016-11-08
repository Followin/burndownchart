(function() {
  var module = function(random) {
    $(function() {
      var $container = $("#container");
      $.ajax({
          type: "GET",
          url: $container.data("url")
        })
        .then(function(data) {
          var result = [],
            maxValue = Number.MIN_VALUE,
            minDate = Date.MAX_VALUE,
            maxDate = Date.MIN_VALUE;

          data.forEachOwnProperty(function(chartDict, chartName) {
            var chartData = [];
            chartDict.forEachOwnProperty(function(value, date) {
              date = new Date(date);

              chartData.push([
                date.getTime(),
                value
              ]);

              if (date > maxDate) {
                maxDate = date;
              } else if (date < minDate) {
                minDate = date;
              }

              if (value > maxValue) {
                maxValue = value;
              }
            });

            result.push({
              name: chartName,
              data: chartData,
              marker: {
                enabled: true
              },
              tooltip: true,
              shadow: true,
              showInNavigator: true
            });
          });

          result.push({
            name: "Ideal",
            data: [
              [
                minDate.getTime(),
                maxValue
              ],
              [
                maxDate.getTime(),
                0
              ]
            ]
          });

          $container
            .highcharts('StockChart',
            {
              chart: {
                zoomType: 'x'
              },
              title: {
                text: 'Burndown',
                x: -20
              },
              rangeSelector: {
                allButtonsEnabled: true
              },
              series: result
            });
        });
    });
  };

  module.inject = ["RandomService"];

  c.inject(module)();
}());
