(function() {
  var api;
  function Service(apiConfig) {
    api = apiConfig;
  }

  Service.inject = ["ApiConfig"];

  Service.prototype.getBurndown = function() {
    return $.ajax({
      type: "GET",
      url: api.burndown
    });
  };

  Service.prototype.getEpics = function() {
    return $.ajax({
      tyep: "GET",
      url: api.epics
    });
  }

  c.service("DataRepository", Service);
}());