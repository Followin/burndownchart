(function() {
  function Random() {
  }

  Random.prototype.number = function(min, max) {
    return Math.floor(Math.random() * max) + min;
  };

  Random.prototype.hexColor = function() {
    var color =
      Random.number(0, 255).toString(16) +
      Random.number(0, 255).toString(16) +
      Random.number(0, 255).toString(16);

    return color;
  };

  c.service("RandomService", Random);
}())