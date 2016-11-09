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
        toDo = { name: "To Do", stack: "main", data: [] },
        crs = { name: "CRs", stack: "crs", data: [] },
        result = { epics: [], data: [toDo, inProgress, crs, done]}

      data.forEachOwnProperty(function(epic, epicName) {
        result.epics.push(epicName);

        toDo.data.push({ y: epic.toDo, color: "#33b5e5" });
        done.data.push({ y: epic.done, color: "#00C851" });
        inProgress.data.push({ y: epic.inProgress, color: "#2BBBAD" });
        crs.data.push({ y: epic.crs, color: "#ffbb33" });
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