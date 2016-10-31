Object.defineProperty(Object.prototype,
    "forEachOwnProperty",
    {
        value: function(action) {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    action(this[key], key);
                }
            }
        },
        writable: true,
        configurable: true,
        enumerable: false
    });

$(function() {
    var canvas = $("#chart");
    var ctx = canvas[0];
    Date.MIN_VALUE = new Date(-8640000000000000);
    Date.MAX_VALUE = new Date(8640000000000000);

    $.ajax({
            type: "GET",
            url: canvas.data("url")
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

                    chartData.push({
                        x: date,
                        y: value
                    });

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
                    label: chartName,
                    data: chartData,
                    borderColor: "#" + random.hexColor(),
                    fill: false
                });
            });

            result.push({
                label: "Ideal",
                borderColor: "#" + random.hexColor(),
                fill: false,
                data: [
                    {
                        x: minDate,
                        y: maxValue
                    },
                    {
                        x: maxDate,
                        y: 0
                    }
                ]
            });


            var chart = new Chart(ctx,
            {
                type: 'line',
                data: {
                    datasets: result
                },
                options: {
                    maintainAspectRatio: true,
                    responsive: false,
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                position: 'bottom',
                                time: {
                                    unit: "day"
                                }
                            }
                        ]
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy'
                    }
                }
            });
        });
});

var random = {
    number: function(min, max) {
        return Math.floor(Math.random() * max) + min;
    },
    hexColor: function() {
        var color = 
          random.number(0, 255).toString(16) 
          + random.number(0, 255).toString(16) 
          + random.number(0, 255).toString(16);  

        return color;
    }
}