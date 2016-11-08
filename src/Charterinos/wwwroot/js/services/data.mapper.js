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
        todo = { name: "To Do", stack: "main", data: [] },
        crs = { name: "CRs", stack: "crs", data: [] },
        result = { epics: [], data: [done, inProgress, todo, crs]}

      data.forEachOwnProperty(function(epic, epicName) {
        result.epics.push(epicName);
        done.data.push({ y: epic.done, color: "#00FF00" });
        inProgress.data.push(epic.inProgress);
        todo.data.push(epic.toDo);
        crs.data.push(epic.crs);
      });

      console.log(result)
      return result;
    }

    return DataMapper;
  }())