// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"game/domElements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.class_editPanels = exports.panel_loadBoard = exports.panel_saveBoard = exports.panel_playing = exports.panel_lowerEdit = exports.panel_editor = exports.panel_debug = exports.input_newHoppersToSave = exports.input_newLevelName = exports.input_levelToLoad = exports.info_toSave = exports.info_levelName = exports.info_edited = exports.btn_save = exports.btn_new = exports.btn_load = exports.btn_showLoader = exports.btn_playLevel = exports.btn_levelEditor = exports.btn_backToUnedited = exports.tileIcons = void 0;
var tileIcons = document.querySelectorAll(".tile-icon");
exports.tileIcons = tileIcons;
var btn_backToUnedited = document.getElementById("back-to-unedited");
exports.btn_backToUnedited = btn_backToUnedited;
var btn_levelEditor = document.getElementById("level-editor");
exports.btn_levelEditor = btn_levelEditor;
var btn_playLevel = document.getElementById("play-level");
exports.btn_playLevel = btn_playLevel;
var btn_showLoader = document.getElementById("launch-loader");
exports.btn_showLoader = btn_showLoader;
var btn_load = document.getElementById("load");
exports.btn_load = btn_load;
var btn_new = document.getElementById("new");
exports.btn_new = btn_new;
var btn_save = document.getElementById("save");
exports.btn_save = btn_save;
var info_edited = document.getElementById("edited");
exports.info_edited = info_edited;
var info_levelName = document.getElementById("level-name");
exports.info_levelName = info_levelName;
var info_toSave = document.getElementById("to-save");
exports.info_toSave = info_toSave;
var input_levelToLoad = document.getElementById("level-to-load");
exports.input_levelToLoad = input_levelToLoad;
var input_newLevelName = document.getElementById("new-level-name");
exports.input_newLevelName = input_newLevelName;
var input_newHoppersToSave = document.getElementById("new-hoppers-to-save");
exports.input_newHoppersToSave = input_newHoppersToSave;
var panel_debug = document.getElementById("debug-panel");
exports.panel_debug = panel_debug;
var panel_editor = document.getElementById("editor-panel");
exports.panel_editor = panel_editor;
var panel_lowerEdit = document.getElementById("lower-edit-panel");
exports.panel_lowerEdit = panel_lowerEdit;
var panel_playing = document.getElementById("playing-panel");
exports.panel_playing = panel_playing;
var panel_saveBoard = document.getElementById("panel-save-board");
exports.panel_saveBoard = panel_saveBoard;
var panel_loadBoard = document.getElementById("panel-load-board");
exports.panel_loadBoard = panel_loadBoard;
var class_editPanels = document.querySelectorAll(".edit-panel");
exports.class_editPanels = class_editPanels;
},{}],"game/classes/Hopper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _game = require("../game.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hopper =
/*#__PURE__*/
function () {
  function Hopper(x, y) {
    _classCallCheck(this, Hopper);

    this.x = x;
    this.y = y;
    this.radius = _game.config.hopper.radius; // Collision detectors

    this.left = x - this.radius;
    this.right = x + this.radius;
    this.bottom = y + this.radius;
    this.free = false; // Movement

    this.onCeiling = false;
    this.movement = "falling";
    this.direction = "right"; // Physics

    this.dx = _game.config.physics.speed;
    this.dy = _game.config.physics.speed;
    this.terminal = _game.config.terminal;
  }

  _createClass(Hopper, [{
    key: "update",
    value: function update() {
      var _this = this;

      // First translate current px coordinates as grid coordinates
      var gridX = Math.floor(this.x / _game.config.board.spacing);
      var gridY = Math.floor(this.y / _game.config.board.spacing);
      var block = ["1", "2", "5", "6"]; // These correspond to blocks that hoppers can't move through

      var empty = ["0", "3", "4"]; // Correspond to empty squares or exit

      var exit = "4";
      var px_blockTop = (gridY + 1) * _game.config.board.spacing; // y coordinate of top of block
      // HELPER FUNCTIONS

      var rollingOntoLeftArrow = function rollingOntoLeftArrow() {
        try {
          if (_game.gameBoard[gridY + 1][gridX + 1] == "5" && _this.movement == "rolling") {
            return true;
          } else {
            return false;
          }
        } catch (_unused) {
          return false;
        }
      };

      var rollingOntoRightArrow = function rollingOntoRightArrow() {
        try {
          if (_game.gameBoard[gridY + 1][gridX - 1] == "6" && _this.movement == "rolling") {
            return true;
          } else {
            return false;
          }
        } catch (_unused2) {
          return false;
        }
      };

      var isRollingOverLeftArrow = function isRollingOverLeftArrow() {
        try {
          if (_game.gameBoard[gridY + 1][gridX] == "5" && _this.movement == "rolling") {
            return true;
          } else {
            return false;
          }
        } catch (_unused3) {
          if (gridY == _game.config.board.size - 1 && _game.gameBoard[0][gridX] == "5" && _this.movement == "rolling") {
            return true;
          } else {
            return false;
          }
        }
      };

      var isRollingOverRightArrow = function isRollingOverRightArrow() {
        try {
          if (_game.gameBoard[gridY + 1][gridX] == "6") {
            return true;
          } else {
            return false;
          }
        } catch (_unused4) {
          if (gridY == _game.config.board.size - 1 && _game.gameBoard[0][gridX] == "6" && _this.movement == "rolling") {
            return true;
          } else {
            return false;
          }
        }
      };

      var isWallToLeft = function isWallToLeft() {
        return block.includes(_game.gameBoard[gridY][gridX - 1]) || rollingOntoRightArrow();
      };

      var isWallToRight = function isWallToRight() {
        return block.includes(_game.gameBoard[gridY][gridX + 1]) || rollingOntoLeftArrow();
      };

      var isWallToRightWrap = function isWallToRightWrap() {
        return _this.x > _game.canvas.width && block.includes(_game.gameBoard[gridY][0]);
      };

      var isWallToLeftWrap = function isWallToLeftWrap() {
        return _this.x <= 0 && block.includes(_game.gameBoard[gridY][_game.config.board.size - 1]);
      };

      var isFloorBelowHopper = function isFloorBelowHopper() {
        try {
          return block.includes(_game.gameBoard[gridY + 1][gridX]);
        } catch (_unused5) {
          return false;
        }
      };

      var isNoFloorBelowHopper = function isNoFloorBelowHopper() {
        try {
          return empty.includes(_game.gameBoard[gridY + 1][gridX]);
        } catch (_unused6) {
          return true;
        }
      };

      var reachedExit = function reachedExit() {
        return _game.gameBoard[gridY][gridX] == "4";
      };

      var fellThroughFloor = function fellThroughFloor() {
        return _this.bottom + _this.dy > _game.canvas.height && _game.gameBoard[0][gridX] == "0";
      };

      var wrappedThroughFloorAndHitCeiling = function wrappedThroughFloorAndHitCeiling() {
        return _this.bottom + _this.dy > _game.canvas.height && (_game.gameBoard[0][gridX] != "0" || _game.gameBoard[0][gridX] != "3") && !_this.onCeiling;
      };

      var fellThroughCeiling = function fellThroughCeiling() {
        return _this.onCeiling && (_game.gameBoard[0][gridX] == "0" || _game.gameBoard[0][gridX] == "3") && (_this.left + 1 > gridX * _game.config.board.spacing && _this.direction == "right" || _this.right - 1 < (gridX + 1) * _game.config.board.spacing && _this.direction == "left");
      }; // COLLISIONS
      // Test if hopper has reached exit


      if (reachedExit()) {
        this.free = true;
      } // Test collision with floor


      if (isFloorBelowHopper()) {
        // See if square below hopper is an impenetrable block
        if (this.bottom + this.dy > px_blockTop) {
          this.y = px_blockTop - this.radius; // Correcting position

          this.movement = "rolling";

          if (_game.gameBoard[gridY + 1][gridX] == "5") {
            // Left arrow
            this.direction = "left";
          } else if (_game.gameBoard[gridY + 1][gridX] == "6") {
            this.direction = "right";
          }
        }
      } // Check hopper has fallen thru floor but hit ceiling


      if (isRollingOverLeftArrow()) {
        this.direction = "left";
      }

      if (isRollingOverRightArrow()) {
        this.direction = "right";
      } // if (hit)
      // Test collision with wall to the right of hopper


      if (isWallToRight()) {
        if (this.right > (gridX + 1) * _game.config.board.spacing) {
          this.direction = "left";
        }
      } // Test collision with wall to the left of hopper


      if (isWallToLeft()) {
        if (this.left < gridX * _game.config.board.spacing) {
          this.direction = "right";
        }
      } // Make hopper fall if it rolls off an edge


      if (this.movement == "rolling" && isNoFloorBelowHopper() && this.bottom + 1 > (gridY + 1) * _game.config.board.spacing && (this.left + 1 > gridX * _game.config.board.spacing && this.direction == "right" || this.right - 1 < (gridX + 1) * _game.config.board.spacing && this.direction == "left")) {
        this.movement = "falling";
      } // Wrap around


      if (wrappedThroughFloorAndHitCeiling()) {
        this.onCeiling = true;
        this.movement = "rolling";
        this.y = _game.canvas.height - this.radius - 1;
      } else if (fellThroughFloor()) {
        this.y = 0;
      }

      if (fellThroughCeiling()) {
        this.y = 0;
        this.movement = "falling";
        this.onCeiling = false;
      }

      if (isWallToRightWrap()) {
        this.direction = "left";
      } else if (this.x > _game.canvas.width) {
        this.x = 0;
      }

      if (isWallToLeftWrap()) {
        this.direction = "right";
      } else if (this.x < 0) {
        // console.log(gameBoard[gridY][config.size - 1])
        this.x = _game.canvas.width;
      } // MOVEMENT


      switch (this.movement) {
        case "falling":
          this.dx = 0;
          this.dy = Math.min(this.dy + _game.config.physics.gravity, _game.config.physics.terminal);
          this.y += this.dy;
          break;

        case "rolling":
          this.dx = this.direction == "right" ? _game.config.physics.speed : -_game.config.physics.speed;
          this.dy = 0;
          this.x += this.dx;
          break;

        case "stopped":
          this.dx = 0;
          this.dy = 0;
          this.x += this.dx;
          this.y += this.dy;
          break;
      } // Update collision detectors


      this.left = this.x - this.radius;
      this.right = this.x + this.radius;
      this.bottom = this.y + this.radius;
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      _game.c.save();

      _game.c.beginPath();

      _game.c.fillStyle = _game.config.hopper.color;

      _game.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);

      _game.c.fill();

      _game.c.closePath();

      _game.c.restore();
    }
  }]);

  return Hopper;
}();

exports.default = Hopper;
},{"../game.js":"game/game.js"}],"game/data/levels.json":[function(require,module,exports) {
module.exports = [{
  "name": "The Easy One",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "0", "1", "0", "0", "2", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "2", "2", "1", "2", "2", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "2", "0", "2", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "4", "0", "0", "0", "0", "0", "0", "0", "4", "0", "0", "0", "0"], ["0", "0", "0", "2", "2", "2", "2", "2", "2", "2", "2", "2", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "A Bridge Too Far",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "4", "0", "1", "0", "0", "1", "0", "4", "0", "0", "0", "0", "0"], ["0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Ciggie",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "4", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "2", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Stairway to Heaven",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [[0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}, {
  "name": "Stairway to Hell",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "4", "0", "0", "0", "0", "1", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "2", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "2", "2", "1", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Safe Passage",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [[0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 4, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}, {
  "name": "Solar System",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"], ["0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "4", "4", "4", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "4", "4", "4", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "4", "4", "4", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "New level",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "1", "0", "2", "1", "1", "0", "4", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "1", "1", "2", "0", "1", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "One Step Forward",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "4", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "1", "1", "1", "5", "1", "1", "1", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Easy as pie",
  "hoppers": {
    "max": "",
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "0", "6", "0", "3", "0", "5", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "4", "0", "1", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "1", "0", "5", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "X Marx the Spot",
  "hoppers": {
    "max": "",
    "releaseRate": 100
  },
  "map": [["0", "0", "6", "0", "0", "0", "0", "0", "0", "0", "0", "0", "5", "0", "0", "0"], ["0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "4", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "2", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "1", "5", "2", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "1", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0"], ["0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Bird of Paradise",
  "hoppers": {
    "max": 1,
    "releaseRate": 100
  },
  "map": [[0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 4], [2, 2, 0, 1, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}, {
  "name": "Means of Production",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["1", "1", "2", "2", "1", "1", "2", "2", "1", "1", "2", "2", "1", "1", "2", "2"], ["0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "6", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "4", "0", "0"], ["0", "0", "0", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "6", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, // {"name":"Means of Production","hoppers":{"max":"1","releaseRate":100},"map":[["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],["0","0","0","0","0","0","0","3","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","6","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","4","0","0"],["0","0","0","0","0","0","0","5","2","5","2","5","2","6","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]},
{
  "name": "Sieze the Means of Production",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["1", "1", "2", "2", "1", "1", "2", "2", "1", "1", "2", "2", "1", "1", "2", "2"], ["0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "5", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "4", "0", "0"], ["0", "0", "0", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "2", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Jolly Roger's Cookbook",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "6", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "5", "0", "0"], ["0", "0", "0", "0", "0", "2", "2", "2", "2", "2", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "1", "1", "1", "1", "1", "2", "0", "0", "0", "0", "0"], ["0", "0", "0", "1", "0", "1", "1", "1", "1", "1", "0", "1", "0", "0", "0", "0"], ["0", "0", "0", "5", "1", "1", "1", "1", "1", "1", "1", "5", "0", "0", "0", "0"], ["0", "0", "0", "2", "1", "1", "6", "1", "5", "1", "1", "2", "0", "0", "0", "0"], ["0", "0", "0", "2", "1", "1", "1", "1", "1", "1", "1", "2", "0", "0", "0", "0"], ["0", "0", "0", "1", "2", "1", "1", "1", "1", "1", "2", "1", "0", "0", "0", "0"], ["0", "0", "0", "0", "1", "2", "1", "1", "1", "2", "1", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "1", "2", "2", "2", "1", "0", "0", "0", "0", "0", "0"], ["0", "6", "0", "0", "0", "1", "1", "4", "1", "1", "0", "0", "0", "5", "0", "0"], ["0", "0", "0", "0", "0", "2", "6", "6", "6", "2", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "Cosmonaut",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "4", "2", "1", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "1", "0", "5", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "5", "2", "2", "0", "2", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "2", "1", "5", "0", "2", "1", "0", "0", "0", "0"], ["0", "0", "0", "1", "2", "0", "5", "0", "2", "0", "2", "1", "0", "0", "0", "0"], ["0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0"], ["0", "0", "0", "0", "2", "0", "0", "0", "0", "0", "6", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "5", "0", "0", "0", "2", "0", "0", "0", "0", "0", "0"]]
}, // {"name":"","hoppers":{"max":"1","releaseRate":100},"map":[["0","0","0","0","0","0","0","3","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","2","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","4","1","1","0","0","0","0","0","0","0"],["0","0","0","0","0","0","1","0","5","0","0","0","0","0","0","0"],["0","0","0","0","2","0","5","2","1","0","2","0","0","0","0","0"],["0","0","0","1","2","0","2","1","5","0","2","1","0","0","0","0"],["0","0","0","1","2","0","5","0","1","0","2","1","0","0","0","0"],["0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0"],["0","0","0","0","6","0","0","0","0","0","6","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],["0","0","0","0","0","1","0","0","0","1","0","0","0","0","0","0"]]},
{
  "name": "Snail",
  "hoppers": {
    "max": "1",
    "releaseRate": 100
  },
  "map": [["3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "6", "1", "6", "1", "6", "1", "6", "1", "6", "1", "6", "1", "6", "1", "0"], ["0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0"], ["0", "1", "0", "1", "5", "1", "5", "1", "5", "1", "5", "1", "5", "0", "1", "0"], ["0", "1", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "1", "0"], ["0", "1", "0", "1", "0", "6", "1", "6", "1", "6", "1", "0", "1", "0", "1", "0"], ["0", "1", "0", "1", "0", "1", "0", "0", "0", "0", "1", "0", "1", "0", "1", "0"], ["0", "1", "0", "1", "0", "1", "0", "4", "1", "0", "1", "0", "1", "0", "1", "0"], ["0", "1", "0", "1", "0", "1", "5", "1", "5", "0", "1", "0", "1", "0", "1", "0"], ["0", "1", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "1", "0", "1", "0"], ["0", "1", "0", "6", "1", "6", "1", "6", "1", "6", "1", "0", "1", "0", "1", "0"], ["0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "1", "0"], ["0", "1", "5", "1", "5", "1", "5", "1", "5", "1", "5", "1", "5", "0", "1", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0"], ["0", "1", "6", "1", "6", "1", "6", "1", "6", "1", "6", "1", "6", "1", "6", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]]
}, {
  "name": "More levels coming soon!",
  "hoppers": {
    "max": "4",
    "releaseRate": 100
  },
  "map": [["3", "0", "0", "0", "0", "1", "0", "3", "3", "0", "1", "0", "0", "0", "0", "3"], ["0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0"], ["0", "0", "0", "5", "6", "0", "0", "0", "0", "0", "0", "5", "6", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "5", "6", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0"], ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"], ["0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0"], ["0", "0", "1", "0", "0", "0", "0", "4", "4", "0", "0", "0", "0", "1", "0", "0"], ["0", "0", "1", "0", "0", "0", "0", "4", "4", "0", "0", "0", "0", "1", "0", "0"], ["0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0"], ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"], ["0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "5", "6", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "5", "6", "0", "0", "0", "0", "0", "0", "5", "6", "0", "0", "0"], ["0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0"], ["0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"]]
}];
},{}],"game/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activatePlayMode = activatePlayMode;
exports.activateLevelEditor = activateLevelEditor;
exports.createGameBoardCopy = createGameBoardCopy;
exports.setHomeAddresses = setHomeAddresses;
exports.clearBoard = clearBoard;
exports.loadNextLevel = loadNextLevel;
exports.generateLevelJSON = generateLevelJSON;

var dom = _interopRequireWildcard(require("./domElements"));

var _game = require("./game.js");

var _Hopper = _interopRequireDefault(require("./classes/Hopper.js"));

var _levels = _interopRequireDefault(require("./data/levels.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import * as hopperFunctions from "./functions.js";
function activatePlayMode() {
  if (_game.hoppers.length < 1) {
    _game.level.hoppers.current = 0;
    _game.level.hoppers.free = 0;
    _game.level.hoppers.max = _game.level.new ? _levels.default[_game.level.current].hoppers.max : _game.level.hoppers.max;
  }

  _game.selector.x = 99999;
  _game.selector.y = 99999;
  _game.selector.homeX = null;
  _game.selector.homeY = null;
  _game.selector.dragging = false;
  _game.selector.draggingBlock = false;
  _game.selector.whatBlockWas = null;
  _game.config.mode = "play";
}

function activateLevelEditor() {
  _game.dragger.x = null;
  _game.dragger.y = null;
  _game.dragger.homeX = null;
  _game.dragger.homeY = null;
  _game.dragger.dragging = false;
  _game.dragger.draggingBlock = false;
  _game.dragger.whatBlockWas = null;
  _game.painter.x = null;
  _game.painter.y = null;
  _game.painter.dragging = false;
  _game.painter.blockType = "2";
  _game.config.mode = "editor";
  _game.editor.mode = "none";
}

function createGameBoardCopy(board) {
  board.forEach(function (row) {
    _game.gameBoard.shift();
  });
  board.forEach(function (row) {
    _game.gameBoard.push(row.toString().split(","));
  });
}

function setHomeAddresses() {
  _game.homeAddresses.splice(0, _game.homeAddresses.length);

  _game.spawnPoints.splice(0, _game.spawnPoints.length);

  for (var y = 0; y < _game.config.board.size; y++) {
    for (var x = 0; x < _game.config.board.size; x++) {
      if (_game.gameBoard[y][x] == "1") {
        _game.homeAddresses.push({
          home: {
            x: x,
            y: y
          },
          current: {
            x: x,
            y: y
          }
        });
      } else if (_game.gameBoard[y][x] == "3") {
        _game.spawnPoints.push({
          x: x,
          y: y
        });
      }
    }
  }
}

function clearBoard() {
  for (var y = 0; y < _game.config.board.size; y++) {
    for (var x = 0; x < _game.config.board.size; x++) {
      _game.gameBoard[y][x] = "0";
    }
  }

  _game.hoppers.splice(0, _game.hoppers.length);

  _game.level.hoppers.max = 1;
  _game.level.new = true;
}

function loadNextLevel() {
  _game.level.new = false;
  _game.level.current += 1;
  _game.selector.x = 10000;
  _game.selector.y = 10000;
  (0, _game.init)();
} // Save and load.


function generateLevelJSON() {
  var newMax = dom.input_newHoppersToSave.value;

  if (newMax <= 0) {
    newMax = 1;
  } else {
    _game.level.hoppers.max = newMax;
  }

  return {
    name: dom.input_newLevelName.value,
    hoppers: {
      max: newMax,
      releaseRate: 100
    },
    map: _game.gameBoard
  };
}
},{"./domElements":"game/domElements.js","./game.js":"game/game.js","./classes/Hopper.js":"game/classes/Hopper.js","./data/levels.json":"game/data/levels.json"}],"game/functions/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawGameBoard = drawGameBoard;
exports.clearScreen = clearScreen;

var _game = require("../game.js");

function drawGameBoard() {
  for (var y = 0; y < _game.config.board.size; y++) {
    for (var x = 0; x < _game.config.board.size; x++) {
      switch (_game.gameBoard[y][x]) {
        case "0":
          drawBlock(x, y, _game.config.colors.empty);
          break;

        case "1":
          drawBlock(x, y, _game.config.colors.movable);
          break;

        case "2":
          drawBlock(x, y, _game.config.colors.immovable);
          break;

        case "3":
          drawBlock(x, y, _game.config.colors.spawn);
          break;

        case "4":
          drawBlock(x, y, _game.config.colors.exit);
          break;

        case "5":
          drawBlock(x, y, _game.config.colors.immovable);
          drawLeftArrow(x, y);
          break;

        case "6":
          drawBlock(x, y, _game.config.colors.immovable);
          drawRightArrow(x, y);
          break;
      }

      if (_game.config.mode == "editor") drawGrid(x, y);
    }
  }

  function drawBlock(x, y, color) {
    _game.c.save();

    _game.c.beginPath();

    _game.c.fillStyle = color;

    _game.c.fillRect(x * _game.config.board.spacing, y * _game.config.board.spacing, x * _game.config.board.spacing + _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing);

    _game.c.fill();

    _game.c.closePath();

    _game.c.restore();
  }

  function drawLeftArrow(x, y) {
    _game.c.save();

    _game.c.beginPath();

    _game.c.fillStyle = _game.config.colors.movable;
    _game.c.strokeStyle = _game.config.colors.movable;

    _game.c.moveTo(x * _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing / 2);

    _game.c.lineTo(x * _game.config.board.spacing + _game.config.board.spacing, y * _game.config.board.spacing);

    _game.c.lineTo(x * _game.config.board.spacing + _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing);

    _game.c.lineTo(x * _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing / 2);

    _game.c.stroke();

    _game.c.fill();

    _game.c.restore();
  }

  function drawRightArrow(x, y) {
    _game.c.save();

    _game.c.beginPath();

    _game.c.fillStyle = _game.config.colors.movable;
    _game.c.strokeStyle = _game.config.colors.movable;

    _game.c.moveTo(x * _game.config.board.spacing + _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing / 2);

    _game.c.lineTo(x * _game.config.board.spacing, y * _game.config.board.spacing);

    _game.c.lineTo(x * _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing);

    _game.c.lineTo(x * _game.config.board.spacing + _game.config.board.spacing, y * _game.config.board.spacing + _game.config.board.spacing / 2);

    _game.c.stroke();

    _game.c.fill();

    _game.c.restore();
  }

  function drawGrid(x, y) {
    _game.c.save();

    _game.c.beginPath();

    _game.c.fillStyle = "white";

    _game.c.arc(x * _game.config.board.spacing, y * _game.config.board.spacing, 1, 0, Math.PI * 2, true);

    _game.c.fill();

    _game.c.closePath();

    _game.c.restore();
  }
}

function clearScreen() {
  _game.c.fillStyle = "black";

  _game.c.fillRect(0, 0, _game.canvas.width, _game.canvas.height);

  _game.c.fill();
}
},{"../game.js":"game/game.js"}],"game/functions/hopper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.killAHopper = killAHopper;
exports.spawnSingleHopper = spawnSingleHopper;
exports.spawnHoppers = spawnHoppers;
exports.resetHoppers = resetHoppers;

var dom = _interopRequireWildcard(require("../domElements.js"));

var _game = require("../game.js");

var _Hopper = _interopRequireDefault(require("../classes/Hopper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function killAHopper() {
  if (_game.hoppers.length > 0) {
    _game.hoppers.shift();

    _game.level.hoppers.current = _game.hoppers.length;
    _game.level.hoppers.max -= 1;
  }
}

function spawnSingleHopper() {
  var currentSpawnPoint = _game.level.hoppers.current % _game.spawnPoints.length;
  var halfWayAcrossSpawnPoint = _game.spawnPoints[currentSpawnPoint].x * _game.config.board.spacing + _game.config.board.spacing / 2;
  var topOfSpawnPoint = _game.spawnPoints[currentSpawnPoint].y * _game.config.board.spacing;

  if (_game.hoppers.length < _game.config.hopper.limit) {
    try {
      _game.hoppers.push(new _Hopper.default(halfWayAcrossSpawnPoint, topOfSpawnPoint));
    } catch (_unused) {
      _game.hoppers.push(new _Hopper.default(_game.config.board.spacing / 2, 0));
    }
  }

  console.log(_game.hoppers.length);
  _game.level.hoppers.current = _game.hoppers.length;
  _game.level.hoppers.max = _game.hoppers.length;
  dom.info_toSave.innerHTML = _game.level.hoppers.max;
}

function spawnHoppers() {
  var timeToSpawnHopper = function timeToSpawnHopper() {
    return _game.frame == 0 || _game.frame % _game.level.hoppers.releaseRate == 0;
  };

  var notEnoughHoppers = _game.level.hoppers.max > _game.level.hoppers.current + _game.level.hoppers.free && _game.hoppers.length < _game.config.hopper.limit;

  if (notEnoughHoppers && timeToSpawnHopper()) {
    spawnSingleHopper();
  }
}

function resetHoppers() {
  _game.level.hoppers.current = 0;
  _game.level.hoppers.free = 0;

  _game.hoppers.splice(0, _game.hoppers.length);
}
},{"../domElements.js":"game/domElements.js","../game.js":"game/game.js","../classes/Hopper.js":"game/classes/Hopper.js"}],"game/eventListeners/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mousedown = exports.mouse = void 0;
var mouse = {
  x: 900,
  y: 900
};
exports.mouse = mouse;
var mousedown = false; // Mouse events

exports.mousedown = mousedown;
window.addEventListener("mousemove", function () {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("mousedown", function () {
  exports.mousedown = mousedown = true;
});
window.addEventListener("mouseup", function () {
  exports.mousedown = mousedown = false;
});
},{}],"game/classes/Selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _game = require("../game.js");

var _mouse = require("../eventListeners/mouse.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Selector =
/*#__PURE__*/
function () {
  function Selector() {
    _classCallCheck(this, Selector);

    this.x = 10000;
    this.y = 10000;
    this.homeX = null;
    this.homeY = null;
    this.dragging = false;
    this.draggingBlock = false;
    this.whatBlockWas = null;
  }

  _createClass(Selector, [{
    key: "update",
    value: function update() {
      var _this = this;

      var mouseGridX = Math.floor(_mouse.mouse.x / _game.config.board.spacing);
      var mouseGridY = Math.floor(_mouse.mouse.y / _game.config.board.spacing);
      var thisBlockX = Math.floor(this.x / _game.config.board.spacing);
      var thisBlockY = Math.floor(this.y / _game.config.board.spacing);
      var colorOfBlock = _game.config.colors.list[this.whatBlockWas]; // Helper functions

      var getHomeAddress = function getHomeAddress() {
        var address = _game.homeAddresses.filter(function (address) {
          return address.current.x == mouseGridX && address.current.y == mouseGridY;
        })[0]; // First key of address in object is home address, hence [0]


        _this.homeX = address.home.x * _game.config.board.spacing;
        _this.homeY = address.home.y * _game.config.board.spacing;
        _this.whatBlockWas = _game.gameBoard[mouseGridY][mouseGridX];
      };

      var setNewCurrentAddress = function setNewCurrentAddress() {
        _game.homeAddresses.forEach(function (address) {
          if (address.home.x == Math.floor(_this.homeX / _game.config.board.spacing) && address.home.y == Math.floor(_this.homeY / _game.config.board.spacing)) {
            address.current.x = thisBlockX;
            address.current.y = thisBlockY;
          }
        });
      };

      var dropBlockOnEmptySquare = function dropBlockOnEmptySquare() {
        _this.dragging = false;
        setNewCurrentAddress();
        _game.gameBoard[thisBlockY][thisBlockX] = _this.whatBlockWas;

        if (_this.draggingBlock) {
          _game.c.fillStyle = "pink";

          _game.c.fillRect(_this.x, _this.y, _game.config.board.spacing, _game.config.board.spacing);
        }

        _this.draggingBlock = false;
      };

      var moveBlockToMousePosition = function moveBlockToMousePosition() {
        _this.x = Math.floor(_mouse.mouse.x / _game.config.board.spacing) * _game.config.board.spacing;
        _this.y = Math.floor(_mouse.mouse.y / _game.config.board.spacing) * _game.config.board.spacing;
      }; // Methods
      // Level 1
      // Skip mouseIsInHomeRange tests if you want to drag the block anywhere, e.g. during level editing.


      var mouseIsInHomeRange = function mouseIsInHomeRange() {
        return _mouse.mouse.x < _this.homeX + _game.config.board.spacing * 2 && _mouse.mouse.x > _this.homeX - _game.config.board.spacing && _mouse.mouse.y < _this.homeY + _game.config.board.spacing * 2 && _mouse.mouse.y > _this.homeY - _game.config.board.spacing && _mouse.mouse.x < _game.canvas.width && _mouse.mouse.x >= 0 && _mouse.mouse.y < _game.canvas.height && _mouse.mouse.y >= 0;
      };

      var mouseIsOverlappingBlock = function mouseIsOverlappingBlock() {
        try {
          return _game.gameBoard[mouseGridY][mouseGridX] == "1";
        } catch (_unused) {
          return false;
        }
      };

      var hasStoppedDragging = function hasStoppedDragging() {
        return _this.dragging && !_mouse.mousedown;
      };

      var hasStoppedDraggingBlock = function hasStoppedDraggingBlock() {
        return _this.draggingBlock && !_mouse.mousedown;
      };

      var isDraggingBlock = function isDraggingBlock() {
        return _this.draggingBlock && _mouse.mousedown;
      };

      var mouseOverlappingEmptySquare = function mouseOverlappingEmptySquare() {
        try {
          return _game.gameBoard[mouseGridY][mouseGridX] == "0";
        } catch (_unused2) {
          return false;
        }
      };

      var blockOverlappingEmptySquare = function blockOverlappingEmptySquare() {
        try {
          return _game.gameBoard[thisBlockY][thisBlockX] == "0";
        } catch (_unused3) {
          return false;
        }
      };

      var mouseOverlappingHopper = function mouseOverlappingHopper() {
        return _game.hoppers.some(function (hopper) {
          try {
            var hopperGridX = Math.floor(hopper.x / _game.config.board.spacing);
            var hopperGridY = Math.floor(hopper.y / _game.config.board.spacing);
            return mouseGridX == hopperGridX && mouseGridY == hopperGridY; // change to new if bugs occur
          } catch (_unused4) {
            return false;
          }
        });
      };

      var blockOverlappingHopper = function blockOverlappingHopper() {
        return _game.hoppers.some(function (hopper) {
          try {
            var hopperGridX = Math.floor(hopper.x / _game.config.board.spacing);
            var hopperGridY = Math.floor(hopper.y / _game.config.board.spacing);
            return thisBlockX == hopperGridX && thisBlockY == hopperGridY; // chjange to new if bugs occur
          } catch (_unused5) {
            return false;
          }
        });
      }; // Level2


      var hasStartedDraggingBlock = function hasStartedDraggingBlock() {
        return !_this.draggingBlock && _mouse.mousedown && mouseIsOverlappingBlock();
      };

      var hasStartedDraggingNothing = function hasStartedDraggingNothing() {
        return !_this.dragging && _mouse.mousedown && !mouseIsOverlappingBlock();
      };

      var isDraggingBlockOverHopper = function isDraggingBlockOverHopper() {
        return blockOverlappingHopper() && isDraggingBlock();
      };

      var hasDroppedBlockOnHopper = function hasDroppedBlockOnHopper() {
        return hasStoppedDraggingBlock() && mouseOverlappingHopper() && !isDraggingBlockOverHopper();
      };

      var isDraggingOverEmptySquare = function isDraggingOverEmptySquare() {
        return isDraggingBlock() && mouseOverlappingEmptySquare() && !mouseOverlappingHopper();
      };

      var hasDroppedBlockOnEmptySquare = function hasDroppedBlockOnEmptySquare() {
        return hasStoppedDraggingBlock() && !mouseOverlappingHopper() && blockOverlappingEmptySquare() && !blockOverlappingHopper();
      };

      if (hasStartedDraggingBlock()) {
        getHomeAddress();
        this.dragging = true;
        this.draggingBlock = true;
        _game.gameBoard[mouseGridY][mouseGridX] = "0";
      } else if (hasStartedDraggingNothing()) {
        this.dragging = true;
        this.draggingBlock = false;
      }

      if (blockOverlappingHopper() && mouseOverlappingHopper()) {
        this.draw();
        return;
      } else if (blockOverlappingHopper() && !mouseOverlappingHopper() && mouseOverlappingEmptySquare() && mouseIsInHomeRange()) {
        moveBlockToMousePosition();
      } else if (blockOverlappingHopper() && (!mouseIsInHomeRange() || !mouseOverlappingEmptySquare())) {
        this.draw();
        return;
      }

      if (isDraggingOverEmptySquare() && mouseIsInHomeRange()) {
        moveBlockToMousePosition();
      } else if (hasDroppedBlockOnEmptySquare() || hasDroppedBlockOnHopper()) {
        dropBlockOnEmptySquare();
      }

      if (isDraggingBlock()) {
        this.draw();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      _game.c.save();

      _game.c.beginPath();

      _game.c.shadowColor = "white";
      _game.c.shadowBlur = 12;
      _game.c.strokeStyle = "rgb(255,191,0)";
      _game.c.fillStyle = "rgba(150,50,100,0.2)";

      _game.c.rect(this.homeX - _game.config.board.spacing, this.homeY - _game.config.board.spacing, _game.config.board.spacing * 3, _game.config.board.spacing * 3);

      _game.c.fill();

      _game.c.stroke();

      _game.c.closePath();

      _game.c.restore();

      _game.c.fillStyle = "orange";

      _game.c.fillRect(this.x, this.y, _game.config.board.spacing, _game.config.board.spacing);
    }
  }]);

  return Selector;
}();

exports.default = Selector;
},{"../game.js":"game/game.js","../eventListeners/mouse.js":"game/eventListeners/mouse.js"}],"game/classes/Dragger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _game = require("../game.js");

var _mouse = require("../eventListeners/mouse.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dragger =
/*#__PURE__*/
function () {
  function Dragger() {
    _classCallCheck(this, Dragger);

    this.x = null;
    this.y = null;
    this.homeX = null;
    this.homeY = null;
    this.dragging = false;
    this.draggingBlock = false;
    this.whatBlockWas = null;
  }

  _createClass(Dragger, [{
    key: "update",
    value: function update() {
      var _this = this;

      var mouseGridX = Math.floor(_mouse.mouse.x / _game.config.board.spacing);
      var mouseGridY = Math.floor(_mouse.mouse.y / _game.config.board.spacing);
      var thisBlockX = Math.floor(this.x / _game.config.board.spacing);
      var thisBlockY = Math.floor(this.y / _game.config.board.spacing);
      var colorOfBlock = _game.config.colors.list[this.whatBlockWas]; // Helper functions

      var dropBlockOnEmptySquare = function dropBlockOnEmptySquare() {
        _this.dragging = false;
        _game.gameBoard[thisBlockY][thisBlockX] = _this.whatBlockWas;

        if (_this.draggingBlock) {
          _game.c.fillStyle = _game.config.colors.list[_this.whatBlockWas];

          _game.c.fillRect(_this.x, _this.y, _game.config.board.spacing, _game.config.board.spacing);
        }

        _this.draggingBlock = false;
        _game.level.new = true;

        if (_game.info_edited.classList.contains("hidden")) {
          _game.info_edited.classList.remove("hidden");
        }
      };

      var moveBlockToMousePosition = function moveBlockToMousePosition() {
        _this.x = Math.floor(_mouse.mouse.x / _game.config.board.spacing) * _game.config.board.spacing;
        _this.y = Math.floor(_mouse.mouse.y / _game.config.board.spacing) * _game.config.board.spacing;
      }; // Methods
      // Level 1
      // Skip mouseIsOnBoard tests if you want to drag the block anywhere, e.g. during level editing.


      var mouseIsOnBoard = function mouseIsOnBoard() {
        return _mouse.mouse.x < _game.canvas.width && _mouse.mouse.x >= 0 && _mouse.mouse.y < _game.canvas.height && _mouse.mouse.y >= 0;
      };

      var mouseIsOverlappingBlock = function mouseIsOverlappingBlock() {
        try {
          return ["1", "2", "3", "4", "5", "6"].includes(_game.gameBoard[mouseGridY][mouseGridX]);
        } catch (_unused) {
          return false;
        }
      };

      var hasStoppedDragging = function hasStoppedDragging() {
        return _this.dragging && !_mouse.mousedown;
      };

      var hasStoppedDraggingBlock = function hasStoppedDraggingBlock() {
        return _this.draggingBlock && !_mouse.mousedown;
      };

      var isDraggingBlock = function isDraggingBlock() {
        return _this.draggingBlock && _mouse.mousedown;
      };

      var mouseOverlappingEmptySquare = function mouseOverlappingEmptySquare() {
        try {
          return _game.gameBoard[mouseGridY][mouseGridX] == "0";
        } catch (_unused2) {
          return false;
        }
      };

      var blockOverlappingEmptySquare = function blockOverlappingEmptySquare() {
        try {
          return _game.gameBoard[thisBlockY][thisBlockX] == "0";
        } catch (_unused3) {
          return false;
        }
      };

      var mouseOverlappingHopper = function mouseOverlappingHopper() {
        return _game.hoppers.some(function (hopper) {
          try {
            var hopperGridX = Math.floor(hopper.x / _game.config.board.spacing);
            var hopperGridY = Math.floor(hopper.y / _game.config.board.spacing);
            return mouseGridX == hopperGridX && mouseGridY == hopperGridY;
          } catch (_unused4) {
            return false;
          }
        });
      };

      var blockOverlappingHopper = function blockOverlappingHopper() {
        return _game.hoppers.some(function (hopper) {
          try {
            var hopperGridX = Math.floor(hopper.x / _game.config.board.spacing);
            var hopperGridY = Math.floor(hopper.y / _game.config.board.spacing);
            return thisBlockX == hopperGridX && thisBlockY == hopperGridY;
          } catch (_unused5) {
            return false;
          }
        });
      }; // Level2


      var hasStartedDraggingBlock = function hasStartedDraggingBlock() {
        return !_this.draggingBlock && _mouse.mousedown && mouseIsOverlappingBlock();
      };

      var hasStartedDraggingNothing = function hasStartedDraggingNothing() {
        return !_this.dragging && _mouse.mousedown && !mouseIsOverlappingBlock();
      };

      var isDraggingBlockOverHopper = function isDraggingBlockOverHopper() {
        return blockOverlappingHopper() && isDraggingBlock();
      };

      var hasDroppedBlockOnHopper = function hasDroppedBlockOnHopper() {
        return hasStoppedDraggingBlock() && mouseOverlappingHopper() && !isDraggingBlockOverHopper();
      };

      var isDraggingOverEmptySquare = function isDraggingOverEmptySquare() {
        return isDraggingBlock() && mouseOverlappingEmptySquare() && !mouseOverlappingHopper();
      };

      var hasDroppedBlockOnEmptySquare = function hasDroppedBlockOnEmptySquare() {
        return hasStoppedDraggingBlock() && !mouseOverlappingHopper() && blockOverlappingEmptySquare() && !blockOverlappingHopper();
      };

      if (hasStartedDraggingBlock()) {
        this.whatBlockWas = _game.gameBoard[mouseGridY][mouseGridX];
        this.dragging = true;
        this.draggingBlock = true;
        _game.gameBoard[mouseGridY][mouseGridX] = "0";
      } else if (hasStartedDraggingNothing()) {
        this.dragging = true;
        this.draggingBlock = false;
      }

      if (blockOverlappingHopper() && mouseOverlappingHopper()) {
        this.draw();
        return;
      } else if (blockOverlappingHopper() && !mouseOverlappingHopper() && mouseOverlappingEmptySquare() && mouseIsOnBoard()) {
        moveBlockToMousePosition();
      } else if (blockOverlappingHopper() && (!mouseIsOnBoard() || !mouseOverlappingEmptySquare())) {
        this.draw();
        return;
      }

      if (isDraggingOverEmptySquare() && mouseIsOnBoard()) {
        moveBlockToMousePosition();
      } else if (hasDroppedBlockOnEmptySquare() || hasDroppedBlockOnHopper()) {
        dropBlockOnEmptySquare();
      }

      if (isDraggingBlock()) {
        this.draw();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      _game.c.save();

      _game.c.beginPath();

      _game.c.strokeStyle = "white";
      _game.c.shadowColor = "white";
      _game.c.shadowBlur = 12;
      _game.c.fillStyle = _game.config.colors.list[this.whatBlockWas];

      _game.c.rect(this.x, this.y, _game.config.board.spacing, _game.config.board.spacing);

      _game.c.fillRect(this.x, this.y, _game.config.board.spacing, _game.config.board.spacing);

      _game.c.stroke();

      _game.c.closePath();

      _game.c.restore();
    }
  }]);

  return Dragger;
}();

exports.default = Dragger;
},{"../game.js":"game/game.js","../eventListeners/mouse.js":"game/eventListeners/mouse.js"}],"game/classes/Painter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _game = require("../game.js");

var _mouse = require("../eventListeners/mouse.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Painter =
/*#__PURE__*/
function () {
  function Painter() {
    _classCallCheck(this, Painter);

    this.x = null;
    this.y = null;
    this.dragging = false;
    this.blockType = "1";
    this.overlappingHopper = false;
  }

  _createClass(Painter, [{
    key: "update",
    value: function update() {
      var _this = this;

      var colorOfBlock = _game.config.colors.list[this.blockType];
      var mouseGridX = Math.floor(_mouse.mouse.x / _game.config.board.spacing);
      var mouseGridY = Math.floor(_mouse.mouse.y / _game.config.board.spacing);

      var moveBlockToMousePosition = function moveBlockToMousePosition() {
        _this.x = Math.floor(_mouse.mouse.x / _game.config.board.spacing) * _game.config.board.spacing;
        _this.y = Math.floor(_mouse.mouse.y / _game.config.board.spacing) * _game.config.board.spacing;
      };

      var mouseIsOnBoard = function mouseIsOnBoard() {
        return _mouse.mouse.x < _game.canvas.width && _mouse.mouse.x >= 0 && _mouse.mouse.y < _game.canvas.height && _mouse.mouse.y >= 0;
      };

      var mouseOverlappingHopper = function mouseOverlappingHopper() {
        return _game.hoppers.some(function (hopper) {
          try {
            var hopperGridX = Math.floor(hopper.x / _game.config.board.spacing);
            var hopperGridY = Math.floor(hopper.y / _game.config.board.spacing);
            return mouseGridX == hopperGridX && mouseGridY == hopperGridY; // change to new if bugs occur
          } catch (_unused) {
            return false;
          }
        });
      };

      var hasStartedPainting = function hasStartedPainting() {
        return !_this.dragging && _mouse.mousedown && mouseIsOnBoard();
      };

      var isPainting = function isPainting() {
        return _this.dragging && _mouse.mousedown;
      };

      var hasStoppedPainting = function hasStoppedPainting() {
        return _this.dragging && !_mouse.mousedown;
      };

      if (hasStartedPainting()) {
        this.dragging = true;
      } else if (hasStoppedPainting()) {
        this.dragging = false;
      }

      if (isPainting() && !mouseOverlappingHopper()) {
        this.overlappingHopper = false;

        if (mouseIsOnBoard()) {
          _game.gameBoard[mouseGridY][mouseGridX] = this.blockType;
          _game.level.new = true;

          if (_game.info_edited.classList.contains("hidden")) {
            _game.info_edited.classList.remove("hidden");
          }
        }
      } else if (mouseOverlappingHopper()) {
        this.overlappingHopper = true;
      } else {
        this.overlappingHopper = false;
      }

      moveBlockToMousePosition();
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      _game.c.save();

      _game.c.beginPath();

      if (this.dragging) {
        _game.c.shadowColor = "white";
        _game.c.shadowBlur = 12;
      }

      _game.c.strokeStyle = "white";
      _game.c.fillStyle = this.overlappingHopper ? "red" : _game.config.colors.list[this.blockType];

      _game.c.rect(this.x, this.y, _game.config.board.spacing, _game.config.board.spacing);

      _game.c.fillRect(this.x, this.y, _game.config.board.spacing, _game.config.board.spacing);

      _game.c.stroke();

      _game.c.closePath();

      _game.c.restore();
    }
  }]);

  return Painter;
}();

exports.default = Painter;
},{"../game.js":"game/game.js","../eventListeners/mouse.js":"game/eventListeners/mouse.js"}],"game/eventListeners/keyboard.js":[function(require,module,exports) {
"use strict";

var _game = require("../game.js");

var _domElements = require("../domElements.js");

var functions = _interopRequireWildcard(require("../functions.js"));

var hopperFunctions = _interopRequireWildcard(require("../functions/hopper.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var notTyping = function notTyping() {
  return !(_domElements.input_newLevelName === document.activeElement);
};

window.addEventListener("keyup", function (e) {
  if ((e.key == "p" || e.key == "P") && notTyping()) {
    _game.level.paused = !_game.level.paused;
    document.getElementById("paused").classList.toggle("hidden");
  }
});
window.addEventListener("keyup", function (e) {
  if ((e.key == "r" || e.key == "R") && _game.config.mode == "play") {
    if (_game.level.new) {
      hopperFunctions.resetHoppers();
      functions.setHomeAddresses();
      functions.activatePlayMode();
    } else (0, _game.init)();
  }
});
window.addEventListener("keyup", function (e) {
  if ((e.key == "s" || e.key == "S") && _game.config.mode == "editor" && notTyping()) {
    functions.setHomeAddresses();
    hopperFunctions.spawnSingleHopper();
    _game.level.new = true;
  }
});
window.addEventListener("keyup", function (e) {
  if ((e.key == "k" || e.key == "K") && _game.config.mode == "editor" && notTyping()) {
    hopperFunctions.killAHopper();
    _game.level.new = true;
  }
});
window.addEventListener("keydown", function (e) {
  if (e.key == "Shift") {
    _domElements.tileIcons.forEach(function (icon) {
      return icon.classList.remove("selected");
    });

    _game.editor.mode = "drag";
  }
});
window.addEventListener("keyup", function (e) {
  if (e.key == "Shift") {
    _game.editor.mode = "none";
  }
});
},{"../game.js":"game/game.js","../domElements.js":"game/domElements.js","../functions.js":"game/functions.js","../functions/hopper.js":"game/functions/hopper.js"}],"game/functions/domFunctions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLevelHasBeenEdited = showLevelHasBeenEdited;
exports.showSaveJSONPanel = showSaveJSONPanel;
exports.showLoader = showLoader;
exports.showPlayingPanel = showPlayingPanel;
exports.showEditorPanel = showEditorPanel;
exports.hideFilePanel = hideFilePanel;

var dom = _interopRequireWildcard(require("../domElements.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function showLevelHasBeenEdited() {
  if (dom.info_edited.classList.contains("hidden")) {
    dom.info_edited.classList.remove("hidden");
  }
}

function showSaveJSONPanel() {
  if (dom.panel_saveBoard.classList.contains("hidden")) {
    dom.panel_saveBoard.classList.remove("hidden");
  }

  if (!dom.panel_loadBoard.classList.contains("hidden")) {
    dom.panel_loadBoard.classList.add("hidden");
  }
}

function showLoader() {
  if (dom.panel_loadBoard.classList.contains("hidden")) {
    dom.panel_loadBoard.classList.remove("hidden");
  }

  if (!dom.panel_saveBoard.classList.contains("hidden")) {
    dom.panel_saveBoard.classList.add("hidden");
  }
}

function showPlayingPanel() {
  if (!dom.panel_editor.classList.contains("hidden")) {
    dom.panel_editor.classList.add("hidden");
    dom.panel_lowerEdit.classList.add("hidden");
    dom.panel_playing.classList.remove("hidden");
  }
}

function showEditorPanel() {
  if (dom.panel_editor.classList.contains("hidden")) {
    dom.panel_editor.classList.remove("hidden");
    dom.panel_lowerEdit.classList.remove("hidden");
    dom.panel_playing.classList.add("hidden");
  }
}

function hideFilePanel() {
  if (!dom.panel_saveBoard.classList.contains("hidden")) {
    dom.panel_saveBoard.classList.add("hidden");
  }

  if (!dom.panel_loadBoard.classList.contains("hidden")) {
    dom.panel_loadBoard.classList.add("hidden");
  }
}
},{"../domElements.js":"game/domElements.js"}],"game/eventListeners/domListeners.js":[function(require,module,exports) {
"use strict";

var dom = _interopRequireWildcard(require("../domElements.js"));

var functions = _interopRequireWildcard(require("../functions.js"));

var domFunctions = _interopRequireWildcard(require("../functions/domFunctions.js"));

var _game = require("../game.js");

var _levels = _interopRequireDefault(require("../data/levels.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dom.btn_playLevel.addEventListener("click", function () {
  if (_game.config.mode == "editor") functions.setHomeAddresses();
  domFunctions.hideFilePanel();
  domFunctions.showPlayingPanel();
  functions.activatePlayMode();
});
dom.btn_levelEditor.addEventListener("click", function () {
  domFunctions.hideFilePanel();
  domFunctions.showEditorPanel();
  functions.activateLevelEditor();
});
dom.btn_backToUnedited.addEventListener("click", _game.init);
dom.btn_save.addEventListener("click", function () {
  domFunctions.showSaveJSONPanel();
  dom.panel_saveBoard.innerHTML = "<h4>Save this string somewhere:</h4><div class='json'>" + JSON.stringify(functions.generateLevelJSON()) + "</div>";
});
dom.btn_showLoader.addEventListener("click", domFunctions.showLoader);
dom.btn_load.addEventListener("click", function () {
  var levelInfo = JSON.parse(dom.input_levelToLoad.value);
  (0, _game.init)(levelInfo);
  domFunctions.hideFilePanel();
  domFunctions.showPlayingPanel();
  functions.activatePlayMode();
});
dom.btn_new.addEventListener("click", function () {
  functions.clearBoard();
  domFunctions.hideFilePanel();
  domFunctions.showLevelHasBeenEdited();
});
dom.input_newLevelName.addEventListener("click", domFunctions.hideFilePanel);
dom.input_newHoppersToSave.addEventListener("click", domFunctions.hideFilePanel);
dom.input_newLevelName.addEventListener("input", function (e) {
  dom.info_levelName.innerHTML = dom.input_newLevelName.value;
  domFunctions.hideFilePanel();
});
dom.input_newHoppersToSave.addEventListener("input", function (e) {
  var newMax = dom.input_newHoppersToSave.value;

  if (newMax <= 0) {
    _game.level.hoppers.max = 1;
    dom.info_toSave.innerHTML = 1;
  } else {
    _game.level.hoppers.max = newMax;
    dom.info_toSave.innerHTML = _game.level.hoppers.max;
  }

  _game.level.new = true;
  domFunctions.hideFilePanel();
  domFunctions.showLevelHasBeenEdited();
});
dom.tileIcons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    _game.editor.mode = "paint";
    _game.painter.x = 99999;
    _game.painter.y = 99999;
    _game.painter.dragging = false;
    _game.painter.blockType = icon.dataset.blockType;

    if (!icon.classList.contains("selected")) {
      dom.tileIcons.forEach(function (icon) {
        return icon.classList.remove("selected");
      });
      icon.classList.add("selected");
    }

    domFunctions.hideFilePanel();
  });
});
},{"../domElements.js":"game/domElements.js","../functions.js":"game/functions.js","../functions/domFunctions.js":"game/functions/domFunctions.js","../game.js":"game/game.js","../data/levels.json":"game/data/levels.json"}],"game/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.frame = exports.painter = exports.dragger = exports.selector = exports.hoppers = exports.gameBoard = exports.spawnPoints = exports.homeAddresses = exports.c = exports.canvas = exports.editor = exports.config = exports.level = exports.palettes = void 0;

var functions = _interopRequireWildcard(require("./functions.js"));

var canvasFunctions = _interopRequireWildcard(require("./functions/canvas.js"));

var hopperFunctions = _interopRequireWildcard(require("./functions/hopper.js"));

var dom = _interopRequireWildcard(require("./domElements.js"));

var _Hopper = _interopRequireDefault(require("./classes/Hopper.js"));

var _Selector = _interopRequireDefault(require("./classes/Selector.js"));

var _Dragger = _interopRequireDefault(require("./classes/Dragger.js"));

var _Painter = _interopRequireDefault(require("./classes/Painter.js"));

var _mouse = _interopRequireDefault(require("./eventListeners/mouse.js"));

var _keyboard = _interopRequireDefault(require("./eventListeners/keyboard.js"));

var _domListeners = _interopRequireDefault(require("./eventListeners/domListeners.js"));

var _levels = _interopRequireDefault(require("./data/levels.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var palettes = ["#ff71ce", "#01cdfe", "#05ffa1", "#bfb9ff", "#fffb96"];
exports.palettes = palettes;
var level = {
  current: 0,
  name: "",
  hoppers: {
    releaseRate: 100,
    current: 0,
    max: 1,
    free: 0
  },
  completed: false,
  paused: false,
  new: false
};
exports.level = level;
var config = {
  board: {
    size: 16,
    spacing: 32
  },
  hopper: {
    color: "green",
    radius: 9,
    limit: 16
  },
  mode: "play",
  physics: {
    gravity: 0.3,
    speed: 1.5,
    terminal: 9.8
  },
  colors: {
    empty: "black",
    movable: palettes[level.current % palettes.length],
    immovable: "grey",
    exit: "white",
    spawn: "blue",
    leftArrow: "green",
    rightArrow: "green"
  }
};
exports.config = config;
config.colors.list = [// don't change the order of this!
config.colors.empty, config.colors.movable, config.colors.immovable, config.colors.spawn, config.colors.exit, config.colors.leftArrow, config.colors.rightArrow];
var editor = {
  mode: "none"
};
exports.editor = editor;
var canvas = document.querySelector("canvas");
exports.canvas = canvas;
var c = canvas.getContext("2d");
exports.c = c;
canvas.width = config.board.size * config.board.spacing;
canvas.height = config.board.size * config.board.spacing;
var homeAddresses = [];
exports.homeAddresses = homeAddresses;
var spawnPoints = [];
exports.spawnPoints = spawnPoints;
var gameBoard = [];
exports.gameBoard = gameBoard;
var hoppers = [];
exports.hoppers = hoppers;
var selector = new _Selector.default();
exports.selector = selector;
var dragger = new _Dragger.default();
exports.dragger = dragger;
var painter = new _Painter.default();
exports.painter = painter;

function init() {
  var newLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _levels.default[level.current];
  level.new = false;
  config.mode = "play";
  level.hoppers.current = 0;
  level.hoppers.free = 0;

  if (newLevel.hoppers.max > 0) {
    level.hoppers.max = newLevel.hoppers.max;
  } else {
    level.hoppers.max = 1;
  }

  dom.info_levelName.innerHTML = newLevel.name;
  dom.info_toSave.innerHTML = level.hoppers.max;

  if (!dom.info_edited.classList.contains("hidden")) {
    dom.info_edited.classList.add("hidden");
  }

  exports.hoppers = hoppers = [];
  exports.spawnPoints = spawnPoints = [];
  exports.gameBoard = gameBoard = [];
  functions.createGameBoardCopy(newLevel.map);
  functions.setHomeAddresses();
  exports.frame = frame = -1;
  config.colors.movable = palettes[level.current % palettes.length];
  exports.selector = selector = new _Selector.default();
}

var frame = 0;
exports.frame = frame;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  canvasFunctions.clearScreen();
  canvasFunctions.drawGameBoard();
  hopperFunctions.spawnHoppers();

  if (config.mode == "editor") {
    switch (editor.mode) {
      case "paint":
        painter.update();
        break;

      case "drag":
        dragger.update();
        break;
    }
  } else {
    selector.update();
  }

  if (!level.paused) {
    updateHoppers();
    exports.frame = frame = frame + 1;
  } else {
    hoppers.forEach(function (hopper) {
      return hopper.draw();
    });
  }

  function updateHoppers() {
    var allHoppersRescued = level.hoppers.free == level.hoppers.max && config.mode == "play" && !level.new;
    var numberOfHoppers = hoppers.length;
    var freedHoppers = [];

    for (var i = numberOfHoppers - 1; i >= 0; i--) {
      hoppers[i].update();

      if (hoppers[i].free) {
        freedHoppers.push(i);
      }
    }

    if (freedHoppers.length > 0) {
      freedHoppers.forEach(function (hopper) {
        hoppers.splice(hopper, 1);
        level.hoppers.free += 1;
      });
    }

    if (allHoppersRescued) {
      functions.loadNextLevel();
    }
  }
} // Cheats


window.addEventListener("keyup", function (e) {
  if ((e.key == "n" || e.key == "N") && config.mode == "play") {
    functions.loadNextLevel();
  }
});
init();
gameLoop();
},{"./functions.js":"game/functions.js","./functions/canvas.js":"game/functions/canvas.js","./functions/hopper.js":"game/functions/hopper.js","./domElements.js":"game/domElements.js","./classes/Hopper.js":"game/classes/Hopper.js","./classes/Selector.js":"game/classes/Selector.js","./classes/Dragger.js":"game/classes/Dragger.js","./classes/Painter.js":"game/classes/Painter.js","./eventListeners/mouse.js":"game/eventListeners/mouse.js","./eventListeners/keyboard.js":"game/eventListeners/keyboard.js","./eventListeners/domListeners.js":"game/eventListeners/domListeners.js","./data/levels.json":"game/data/levels.json"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49219" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game/game.js"], null)
//# sourceMappingURL=/game.ff0916f4.js.map