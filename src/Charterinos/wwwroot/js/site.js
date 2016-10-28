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
            var i, j;
            var result = [],
                maxValue = Number.MIN_VALUE,
                minDate = Date.MAX_VALUE,
                maxDate = Date.MIN_VALUE;

            var dataKeys = Object.getOwnPropertyNames(data);
            for (i = 0; i < dataKeys.length; i++) {
                var chartDict = data[dataKeys[i]];
                var chartDictKeys = Object.getOwnPropertyNames(chartDict);
                var chartData = [];
                for (j = 0; j < chartDictKeys.length; j++) {
                    var date = new Date(chartDictKeys[j]);
                    var value = chartDict[chartDictKeys[j]];

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
                }
                result.push({
                    label: dataKeys[i],
                    data: chartData,
                    borderColor: "#" + random.hexColor(),
                    fill: false
                });
            }

            console.log(minDate, maxDate, maxValue);

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