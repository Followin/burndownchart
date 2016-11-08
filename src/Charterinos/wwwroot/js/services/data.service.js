(function() {
  var dataMapper, dataRepository;

  function DataService(mapper, repository) {
    dataMapper = mapper;
    dataRepository = repository;
  };

  DataService.inject = ["DataMapper", "DataRepository"];

  DataService.prototype.getBurndown = function() {
    return combine(dataRepository.getBurndown, dataMapper.mapBurndown);
  }

  DataService.prototype.getEpics = function() {
    return combine(dataRepository.getEpics, dataMapper.mapEpics);
  }

  c.service("DataService", DataService);

  function combine(repoFunc, mapperFunc) {
    return new Promise(function(resolve, reject) {
      repoFunc()
        .then(function(data) {
            resolve(mapperFunc(data));
          }, reject);
    });
  }
}());