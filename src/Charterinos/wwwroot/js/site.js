(function() {
  var module = function(dataService) {
    $(function() {
      var $container = $("#container");

      dataService.getBurndown()
        .then(function(data) {
          $container.highcharts('StockChart', {
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

    });
  };

  module.inject = ["DataService"];

  c.inject(module)();
}());
