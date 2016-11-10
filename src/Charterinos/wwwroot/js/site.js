(function(){
  var module = function(dataService, colors) {
    $(function() {
      buildBurndown($("#burndown"));
      buildEpics($("#epics"));
      buildTotal($("#total"));
    });

    function buildBurndown($element) {
      dataService.getBurndown()
        .then(function(data) {
          $element.highcharts('StockChart', {
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
    }

    function buildEpics($element) {
      dataService.getEpics()
        .then(function(data) {
          $element.highcharts({
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
                text: "%"
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
    }

    function buildTotal($element) {
      var
        doneWidth,
        doneTextWidth,
        inProgressWidth,
        inProgressTextWidth,
        toDoWidth,
        toDoTextWidth,
        fullWidth = $element.outerWidth(),
        $inProgress = $element.find(".in-progress"),
        $done = $element.find(".done"),
        $toDo = $element.find(".to-do");


      dataService.getTotal()
        .then(function(data) {
          $element.css("background",
            "linear-gradient(90deg, " +
            colors.done + " " +
            data.done +
            "%, " + colors.inProgress + " " + 
            (data.done) +
            "%, " + colors.inProgress + " " +
            (data.done + data.inProgress) +
            "%, " + colors.toDo + " " +
            (data.done + data.inProgress) +
            "%, " + colors.toDo + " 100%)");

          $done.html(data.done + "%");
          doneWidth = fullWidth / 100 * data.done;
          doneTextWidth = $done.outerWidth();
          $done.css("left", doneWidth / 2 - doneTextWidth / 2);

          $inProgress.html(data.inProgress + "%");
          inProgressWidth = fullWidth / 100 * data.inProgress;
          inProgressTextWidth = $inProgress.outerWidth();
          $inProgress.css("left", doneWidth + inProgressWidth / 2 - inProgressTextWidth / 2);

          $toDo.html(data.toDo + "%");
          toDoWidth = fullWidth / 100 * data.toDo;
          toDoTextWidth = $toDo.outerWidth();
          $toDo.css("left", doneWidth + inProgressWidth + toDoWidth / 2 - toDoTextWidth / 2);
        });
    }
  };

  module.inject = ["DataService", "ColorConfig"];

  c.inject(module)();
}());
