(function() {
  var dataMapper, dataRepository;

  function DataService(mapper, repository) {
    dataMapper = mapper;
    dataRepository = repository;
  };

  DataService.inject = ["DataMapper", "DataRepository"];

  DataService.prototype.getBurndown = function() {
    return new Promise(function(resolve, reject) {
      dataRepository.getData()
        .then(function(data) {
            resolve(dataMapper.mapBurndown(data));
          }, reject);
    });
  }

  c.service("DataService", DataService);
}());