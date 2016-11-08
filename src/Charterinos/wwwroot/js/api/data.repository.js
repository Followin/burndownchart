(function() {
  var api;
  function Service(apiConfig) {
    api = apiConfig;
  }

  Service.inject = ["ApiConfig"];

  Service.prototype.getData = function() {
    return $.ajax({
      type: "GET",
      url: api.burndown
    });
  }

  c.service("DataRepository", Service);
}());