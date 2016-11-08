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

Date.MIN_VALUE = new Date(-8640000000000000);
Date.MAX_VALUE = new Date(8640000000000000);

var c = (function() {
  var  services = { constructors: {}, activated: {} },
    main = {};

  main.inject = function (module) {
    return function() {
      if (!module.inject) {
        return module.call(module);
      }

      var activatedDependecies = module.inject.map(activate);

      return module.apply(module, activatedDependecies);
    }
  };

  main.service = function(name, module) {
    services.constructors[name] = module;
  }

  return main;

  function activate(name) {
    var Constructor, i;

    if (name in services.activated) {
      return services.activated[name];
    }

    if (name in services.constructors) {
      Constructor = services.constructors[name];
      if (!('inject' in Constructor)) {
        services.activated[name] = new Constructor();
        return services.activated[name];
      }

      var activatedDependencies = Constructor.inject.map(activate);

      services.activated[name] = Constructor.apply({}, activatedDependencies);
      return services.activated[name];
    }
  }
}());