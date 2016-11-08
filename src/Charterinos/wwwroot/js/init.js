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
  var services = { constructors: {}, activated: {} },
    main = {};

  main.inject = function(module) {
    return function() {
      var activatedDependecies = module.inject && module.inject.map(activate) || [];

      return module.apply(module, activatedDependecies);
    }
  };

  main.service = function(name, module) {
    services.constructors[name] = module;
  }

  return main;

  function activate(name) {
    var Constructor, i, activatedDependencies;

    if (!(name in services.activated) && name in services.constructors) {
      Constructor = services.constructors[name];
      activatedDependencies = Constructor.inject && Constructor.inject.map(activate) || [];
      services.activated[name] = applyNew(Constructor, activatedDependencies);
    }

    return services.activated[name];
  }

  function applyNew(constructor, args) {
      function F(args) {
        return constructor.apply(this, args);
      }

      F.prototype = constructor.prototype;

      return new F(args);
  }
}());