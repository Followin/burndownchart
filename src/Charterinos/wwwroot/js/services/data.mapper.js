(function() {

  var colors;

  function DataMapper(colorConfig) { colors = colorConfig };

  DataMapper.inject = ["ColorConfig"];

  c.service("DataMapper", DataMapper);

  DataMapper.prototype.mapBurndown = function(data) {
    var result = [],
        maxValue = Number.MIN_VALUE;

    data.series.forEachOwnProperty(function(chartDict, chartName) {
      var chartData = [];
      chartDict.forEachOwnProperty(function(value, date) {
        date = new Date(date);

        chartData.push([
          date.getTime(),
          value
        ]);

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
          new Date(data.startDate).getTime(),
          maxValue
        ],
        [
          new Date(data.endDate).getTime(),
          0
        ]
      ]
    });

    console.log(result);
    return result;
  };

  DataMapper.prototype.mapEpics = function(data) {
    var
      done = { name: "Done", stack: "main", data: [], color: colors.done },
      inProgress = { name: "In Progress", stack: "main", data: [], color: colors.inProgress },
      toDo = { name: "To Do", stack: "main", data: [], color: colors.toDo },
      crs = { name: "CRs", stack: "crs", data: [], color: colors.crs },
      result = { epics: [], data: [toDo, inProgress, crs, done] }

    data.forEachOwnProperty(function(epic, epicName) {
      result.epics.push(epicName);

      toDo.data.push(epic.toDo);
      done.data.push(epic.done);
      inProgress.data.push(epic.inProgress);
      crs.data.push(epic.crs);
    });

    return result;
  }

  DataMapper.prototype.mapTotal = function(data) {
    var
      doneTotal = 0,
      inProgressTotal = 0,
      spTotal = 0,
      result = {};

    data.forEachOwnProperty(function(epic) {
      spTotal += (epic.done + epic.inProgress + epic.toDo);
      doneTotal += epic.done;
      inProgressTotal += epic.inProgress;
    });

    result.done = Math.round(doneTotal / spTotal * 100);
    result.inProgress = Math.round(inProgressTotal / spTotal * 100);
    result.toDo = 100 - (result.done + result.inProgress);

    return result;
  }
}())