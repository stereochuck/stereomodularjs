function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _default = /*#__PURE__*/function () {
  function _default(options) {
    _classCallCheck(this, _default);
    this.mAttr = 'data-' + options.dataName;
    this.mCaptureEvents = ['mouseenter', 'mouseleave'];
    this.el = options.el;
  }
  _createClass(_default, [{
    key: "mInit",
    value: function mInit(modules) {
      var _this = this;
      this.modules = modules;
      this.mCheckEventTarget = this.mCheckEventTarget.bind(this);
      if (this.events) {
        Object.keys(this.events).forEach(function (event) {
          return _this.mAddEvent(event);
        });
      }
    }
  }, {
    key: "mUpdate",
    value: function mUpdate(modules) {
      this.modules = modules;
    }
  }, {
    key: "mDestroy",
    value: function mDestroy() {
      var _this2 = this;
      if (this.events) {
        Object.keys(this.events).forEach(function (event) {
          return _this2.mRemoveEvent(event);
        });
      }
    }
  }, {
    key: "mAddEvent",
    value: function mAddEvent(event) {
      var capture = this.mCaptureEvents.includes(event) ? true : false;
      this.el.addEventListener(event, this.mCheckEventTarget, capture);
    }
  }, {
    key: "mRemoveEvent",
    value: function mRemoveEvent(event) {
      var capture = this.mCaptureEvents.includes(event) ? true : false;
      this.el.removeEventListener(event, this.mCheckEventTarget, capture);
    }
  }, {
    key: "mCheckEventTarget",
    value: function mCheckEventTarget(e) {
      var event = this.events[e.type];
      if (typeof event === "string") {
        this[event](e);
      } else {
        var data = '[' + this.mAttr + ']';
        var target = e.target;
        if (this.mCaptureEvents.includes(e.type)) {
          if (target.matches(data)) {
            this.mCallEventMethod(e, event, target);
          }
        } else {
          while (target && target !== document) {
            if (target.matches(data)) {
              if (this.mCallEventMethod(e, event, target) != 'undefined') {
                break;
              }
            }
            target = target.parentNode;
          }
        }
      }
    }
  }, {
    key: "mCallEventMethod",
    value: function mCallEventMethod(e, event, target) {
      var name = target.getAttribute(this.mAttr);
      if (event.hasOwnProperty(name)) {
        var method = event[name];
        if (!e.hasOwnProperty('currentTarget')) {
          Object.defineProperty(e, 'currentTarget', {
            value: target
          });
        }
        if (!e.hasOwnProperty('curTarget')) {
          Object.defineProperty(e, 'curTarget', {
            value: target
          }); // For IE 11
        }
        this[method](e);
      }
    }
  }, {
    key: "$",
    value: function $(query, context) {
      var classIndex = query.indexOf('.');
      var idIndex = query.indexOf('#');
      var attrIndex = query.indexOf('[');
      var indexes = [classIndex, idIndex, attrIndex].filter(function (index) {
        return index != -1;
      });
      var index = false;
      var name = query;
      var more = '';
      var parent = this.el;
      if (indexes.length) {
        index = Math.min.apply(Math, _toConsumableArray(indexes));
        name = query.slice(0, index);
        more = query.slice(index);
      }
      if (_typeof(context) == 'object') {
        parent = context;
      }
      return parent.querySelectorAll('[' + this.mAttr + '=' + name + ']' + more);
    }
  }, {
    key: "parent",
    value: function parent(query, context) {
      var data = '[' + this.mAttr + '=' + query + ']';
      var parent = context.parentNode;
      while (parent && parent !== document) {
        if (parent.matches(data)) {
          return parent;
        }
        parent = parent.parentNode;
      }
    }
  }, {
    key: "getData",
    value: function getData(name, context) {
      var target = context || this.el;
      return target.getAttribute(this.mAttr + '-' + name);
    }
  }, {
    key: "setData",
    value: function setData(name, value, context) {
      var target = context || this.el;
      return target.setAttribute(this.mAttr + '-' + name, value);
    }
  }, {
    key: "call",
    value: function call(func, args, mod, id) {
      var _this3 = this;
      if (args && !mod) {
        mod = args;
        args = false;
      }
      if (this.modules[mod]) {
        if (id) {
          if (this.modules[mod][id]) {
            this.modules[mod][id][func](args);
          }
        } else {
          Object.keys(this.modules[mod]).forEach(function (id) {
            _this3.modules[mod][id][func](args);
          });
        }
      }
    }
  }, {
    key: "on",
    value: function on(e, mod, func, id) {
      var _this4 = this;
      if (this.modules[mod]) {
        if (id) {
          this.modules[mod][id].el.addEventListener(e, function (o) {
            return func(o);
          });
        } else {
          Object.keys(this.modules[mod]).forEach(function (i) {
            _this4.modules[mod][i].el.addEventListener(e, function (o) {
              return func(o);
            });
          });
        }
      }
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
  return _default;
}();

var _default$1 = /*#__PURE__*/function () {
  function _default(options) {
    _classCallCheck(this, _default);
    this.app;
    this.modules = options.modules;
    this.currentModules = {};
    this.activeModules = {};
    this.newModules = {};
    this.moduleId = 0;
  }
  _createClass(_default, [{
    key: "init",
    value: function init(app, scope) {
      var _this = this;
      var container = scope || document;
      var elements = container.querySelectorAll('[data-module]');
      if (app && !this.app) {
        this.app = app;
      }
      this.activeModules['app'] = {
        'app': this.app
      };
      elements.forEach(function (el) {
        var dataModules = el.getAttribute('data-module');
        dataModules = dataModules.replace(' ', '');
        if (dataModules == undefined || dataModules == "") {
          console.log('Undeclared module - Check your module name.');
        } else {
          //split at ","
          var modulesList = dataModules.split(',');
          modulesList.forEach(function (currentModule) {
            var moduleName = currentModule;
            var moduleExists = false;
            if (_this.modules[moduleName]) {
              moduleExists = true;
            } else {
              console.log('"' + moduleName + '" is an unknown module or isn\'t imported.');
            }
            if (moduleExists) {
              var options = {
                el: el,
                name: moduleName,
                dataName: moduleName
              };
              var module = new _this.modules[moduleName](options);
              var id = currentModule.value;
              if (!id) {
                _this.moduleId++;
                id = 'm' + _this.moduleId;
                el.setAttribute('data-mid', id);
              }
              _this.addActiveModule(moduleName, id, module);
              var moduleId = moduleName + '-' + id;
              if (scope) {
                _this.newModules[moduleId] = module;
              } else {
                _this.currentModules[moduleId] = module;
              }
            }
          });
        }
      });
      Object.entries(this.currentModules).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          module = _ref2[1];
        if (scope) {
          var split = id.split('-');
          var moduleName = split.shift();
          var moduleId = split.pop();
          _this.addActiveModule(moduleName, moduleId, module);
        } else {
          _this.initModule(module);
        }
      });
    }
  }, {
    key: "initModule",
    value: function initModule(module) {
      module.mInit(this.activeModules);
      module.init();
    }
  }, {
    key: "addActiveModule",
    value: function addActiveModule(name, id, module) {
      if (this.activeModules[name]) {
        Object.assign(this.activeModules[name], _defineProperty({}, id, module));
      } else {
        this.activeModules[name] = _defineProperty({}, id, module);
      }
    }
  }, {
    key: "update",
    value: function update(scope) {
      var _this2 = this;
      this.destroyScope(scope);
      this.init(this.app, scope);
      Object.entries(this.currentModules).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          id = _ref4[0],
          module = _ref4[1];
        module.mUpdate(_this2.activeModules);
      });
      Object.entries(this.newModules).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          id = _ref6[0],
          module = _ref6[1];
        _this2.initModule(module);
      });
      Object.assign(this.currentModules, this.newModules);
    }
  }, {
    key: "destroy",
    value: function destroy(scope) {
      if (scope) {
        this.destroyScope(scope);
      } else {
        this.destroyModules();
      }
    }
  }, {
    key: "destroyScope",
    value: function destroyScope(scope) {
      var _this3 = this;
      var elements = scope.querySelectorAll('*');
      elements.forEach(function (el) {
        //get el data-module attribute and mid
        var moduleName = el.getAttribute('data-module');
        var moduleId = el.getAttribute('data-mid');
        var moduleExists = false;
        var module = moduleName + '-' + moduleId;
        if (_this3.currentModules[module]) {
          moduleExists = true;
        }
        if (moduleExists) {
          _this3.destroyModule(_this3.currentModules[module]);
          delete _this3.currentModules[module];
        }
      });
      this.activeModules = {};
      this.newModules = {};
    }
  }, {
    key: "destroyModules",
    value: function destroyModules() {
      var _this4 = this;
      Object.entries(this.currentModules).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          id = _ref8[0],
          module = _ref8[1];
        _this4.destroyModule(module);
      });
      this.currentModules = [];
    }
  }, {
    key: "destroyModule",
    value: function destroyModule(module) {
      module.mDestroy();
      module.destroy();
    }
  }, {
    key: "toCamel",
    value: function toCamel(arr) {
      var _this5 = this;
      return arr.reduce(function (a, b) {
        return a + _this5.toUpper(b);
      });
    }
  }, {
    key: "toUpper",
    value: function toUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }]);
  return _default;
}();

export default _default$1;
export { _default as module };
