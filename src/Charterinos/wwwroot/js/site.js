(function() {
  var module = function(dataService) {
    $(function() {

      dataService.getBurndown()
        .then(function(data) {
          $("#burndown").highcharts('StockChart', {
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
              series: data
            });
        });

      dataService.getEpics()
        .then(function(data) {
          $("#epics").highcharts({
              chart: {
                type: 'column'
              },
              title: {
                text: 'Epics'
              },
              xAxis: {
                categories: data.epics
              },
              yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                  text: 'Story points'
                }
              },
              plotOptions: {
                column: {
                  stacking: "normal"
                }
              },
              series: data.data
            });
        });
    });
  };

  module.inject = ["DataService"];

  c.inject(module)();
}());
