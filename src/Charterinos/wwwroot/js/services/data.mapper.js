c.service("DataMapper",
  function() {
    function DataMapper() {};

    DataMapper.prototype.mapBurndown = function(data) {
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

      return result;
    };

    DataMapper.prototype.mapEpics = function (data) {
      var 
        done = { name: "Done", stack: "main", data: [] },
        inProgress = { name: "In Progress", stack: "main", data: [] },
        crs = { name: "CRs", stack: "crs", data: [] },
        result = { epics: [], data: [inProgress, crs, done]}

      data.forEachOwnProperty(function(epic, epicName) {
        var spSum = epic.done + epic.inProgress + epic.toDo;

        result.epics.push(epicName);

        done.data.push({ y: Math.round(epic.done / spSum * 100), color: "#00FF00" });
        inProgress.data.push(Math.round(epic.inProgress / spSum * 100));
        crs.data.push(epic.crs);
      });

      return result;
    }

    DataMapper.prototype.mapTotal = function(data) {
      var
        doneTotal= 0 ,
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

      return result;
    }

    return DataMapper;
  }())