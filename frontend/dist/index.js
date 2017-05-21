(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Data_Array = require("../Data.Array");
var Data_Boolean = require("../Data.Boolean");
var Data_Either = require("../Data.Either");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Map = require("../Data.Map");
var Data_Maybe = require("../Data.Maybe");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Prelude = require("../Prelude");
var Ocean = (function () {
    function Ocean() {

    };
    Ocean.value = new Ocean();
    return Ocean;
})();
var Ship = (function () {
    function Ship() {

    };
    Ship.value = new Ship();
    return Ship;
})();
var Tile = (function () {
    function Tile(value0) {
        this.value0 = value0;
    };
    Tile.create = function (value0) {
        return new Tile(value0);
    };
    return Tile;
})();
var Point = function (x) {
    return x;
};
var unwrapTile = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar15) {
                return $dollar15;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Data_Maybe.Just) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Battleship line 78, column 1 - line 78, column 24: " + [ v.constructor.name ]);
        })());
    };
};
var showTileType = new Data_Show.Show(function (v) {
    if (v instanceof Ocean) {
        return "ocean";
    };
    if (v instanceof Ship) {
        return "ship";
    };
    throw new Error("Failed pattern match at Battleship line 19, column 3 - line 20, column 3: " + [ v.constructor.name ]);
});
var showPoint = new Data_Show.Show(function (v) {
    return "(" + (Data_Show.show(Data_Show.showInt)(v.x) + (", " + (Data_Show.show(Data_Show.showInt)(v.y) + ")")));
});
var ocean = new Tile({
    tileType: Ocean.value, 
    attacked: false
});
var getType = function (v) {
    return v.value0.tileType;
};
var eqPoint = new Data_Eq.Eq(function (v) {
    return function (v1) {
        return v.x === v1.x && v.y === v1.y;
    };
});
var ordPoint = new Data_Ord.Ord(function () {
    return eqPoint;
}, function (v) {
    return function (v1) {
        if (Data_Eq.eq(eqPoint)(v)(v1)) {
            return Data_Ordering.EQ.value;
        };
        if (v.x < v1.x || v.y < v1.y) {
            return Data_Ordering.LT.value;
        };
        if (Data_Boolean.otherwise) {
            return Data_Ordering.GT.value;
        };
        throw new Error("Failed pattern match at Battleship line 27, column 3 - line 30, column 21: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var tileAt = function (v) {
    return function (v1) {
        return Data_Map.lookup(ordPoint)(v)(v1.grid);
    };
};
var emptyGrid = Data_Map.empty;
var fillGrid = function (w) {
    return function (h) {
        var fillRow = function (g) {
            return function (rowIndex) {
                return Data_Foldable.foldl(Data_Foldable.foldableArray)(function (grid) {
                    return function (colIndex) {
                        return Data_Map.insert(ordPoint)({
                            x: colIndex, 
                            y: rowIndex
                        })(ocean)(grid);
                    };
                })(g)(Data_Array.range(0)(w));
            };
        };
        return Data_Foldable.foldl(Data_Foldable.foldableArray)(fillRow)(emptyGrid)(Data_Array.range(0)(h));
    };
};
var boardRec = function (width) {
    return function (height) {
        return function (grid) {
            return {
                width: width, 
                height: height, 
                grid: grid
            };
        };
    };
};
var board = function (w) {
    return function (h) {
        if (w < 0 || h < 0) {
            return boardRec(w)(h)(emptyGrid);
        };
        if (Data_Boolean.otherwise) {
            return boardRec(w)(h)(fillGrid(w)(h));
        };
        throw new Error("Failed pattern match at Battleship line 56, column 1 - line 58, column 44: " + [ w.constructor.name, h.constructor.name ]);
    };
};
var attack = function (p) {
    return function (v) {
        var ret = function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return new Data_Either.Left("Error! Bad tile position.");
            };
            if (v1 instanceof Data_Maybe.Just) {
                var newTile = Tile.create((function () {
                    var $51 = {};
                    for (var $52 in v1.value0.value0) {
                        if ({}.hasOwnProperty.call(v1.value0.value0, $52)) {
                            $51[$52] = v1["value0"]["value0"][$52];
                        };
                    };
                    $51.attacked = true;
                    return $51;
                })());
                return Data_Either.Right.create((function () {
                    var $54 = {};
                    for (var $55 in v) {
                        if ({}.hasOwnProperty.call(v, $55)) {
                            $54[$55] = v[$55];
                        };
                    };
                    $54.grid = Data_Map.insert(ordPoint)(p)(newTile)(v.grid);
                    return $54;
                })());
            };
            throw new Error("Failed pattern match at Battleship line 67, column 5 - line 68, column 5: " + [ v1.constructor.name ]);
        };
        return ret(tileAt(p)(v));
    };
};
module.exports = {
    Point: Point, 
    Tile: Tile, 
    Ocean: Ocean, 
    Ship: Ship, 
    attack: attack, 
    board: board, 
    boardRec: boardRec, 
    emptyGrid: emptyGrid, 
    fillGrid: fillGrid, 
    getType: getType, 
    ocean: ocean, 
    tileAt: tileAt, 
    unwrapTile: unwrapTile, 
    showTileType: showTileType, 
    eqPoint: eqPoint, 
    ordPoint: ordPoint, 
    showPoint: showPoint
};

},{"../Data.Array":43,"../Data.Boolean":53,"../Data.Either":59,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Map":85,"../Data.Maybe":88,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Show":111,"../Data.Traversable":121,"../Prelude":139}],2:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Functor = require("../Data.Functor");
var Data_Semigroup = require("../Data.Semigroup");
var Alt = function (Functor0, alt) {
    this.Functor0 = Functor0;
    this.alt = alt;
};
var altArray = new Alt(function () {
    return Data_Functor.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));
var alt = function (dict) {
    return dict.alt;
};
module.exports = {
    Alt: Alt, 
    alt: alt, 
    altArray: altArray
};

},{"../Data.Functor":74,"../Data.Semigroup":107}],3:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Plus = require("../Control.Plus");
var Data_Functor = require("../Data.Functor");
var Alternative = function (Applicative0, Plus1) {
    this.Applicative0 = Applicative0;
    this.Plus1 = Plus1;
};
var alternativeArray = new Alternative(function () {
    return Control_Applicative.applicativeArray;
}, function () {
    return Control_Plus.plusArray;
});
module.exports = {
    Alternative: Alternative, 
    alternativeArray: alternativeArray
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Plus":36,"../Data.Functor":74}],4:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Apply = require("../Control.Apply");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Applicative = function (Apply0, pure) {
    this.Apply0 = Apply0;
    this.pure = pure;
};
var pure = function (dict) {
    return dict.pure;
};
var unless = function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (!v) {
                return v1;
            };
            if (v) {
                return pure(dictApplicative)(Data_Unit.unit);
            };
            throw new Error("Failed pattern match at Control.Applicative line 63, column 1 - line 63, column 19: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var when = function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v) {
                return v1;
            };
            if (!v) {
                return pure(dictApplicative)(Data_Unit.unit);
            };
            throw new Error("Failed pattern match at Control.Applicative line 58, column 1 - line 58, column 16: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var liftA1 = function (dictApplicative) {
    return function (f) {
        return function (a) {
            return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
        };
    };
};
var applicativeFn = new Applicative(function () {
    return Control_Apply.applyFn;
}, function (x) {
    return function (v) {
        return x;
    };
});
var applicativeArray = new Applicative(function () {
    return Control_Apply.applyArray;
}, function (x) {
    return [ x ];
});
module.exports = {
    Applicative: Applicative, 
    liftA1: liftA1, 
    pure: pure, 
    unless: unless, 
    when: when, 
    applicativeFn: applicativeFn, 
    applicativeArray: applicativeArray
};

},{"../Control.Apply":6,"../Data.Functor":74,"../Data.Unit":127}],5:[function(require,module,exports){
"use strict";

exports.arrayApply = function (fs) {
  return function (xs) {
    var result = [];
    var n = 0;
    for (var i = 0, l = fs.length; i < l; i++) {
      for (var j = 0, k = xs.length; j < k; j++) {
        result[n++] = fs[i](xs[j]);
      }
    }
    return result;
  };
};

},{}],6:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Category = require("../Control.Category");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Apply = function (Functor0, apply) {
    this.Functor0 = Functor0;
    this.apply = apply;
};
var applyFn = new Apply(function () {
    return Data_Functor.functorFn;
}, function (f) {
    return function (g) {
        return function (x) {
            return f(x)(g(x));
        };
    };
});
var applyArray = new Apply(function () {
    return Data_Functor.functorArray;
}, $foreign.arrayApply);
var apply = function (dict) {
    return dict.apply;
};
var applyFirst = function (dictApply) {
    return function (a) {
        return function (b) {
            return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"])(a))(b);
        };
    };
};
var applySecond = function (dictApply) {
    return function (a) {
        return function (b) {
            return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"](Control_Category.id(Control_Category.categoryFn)))(a))(b);
        };
    };
};
var lift2 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b);
            };
        };
    };
};
var lift3 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c);
                };
            };
        };
    };
};
var lift4 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c))(d);
                    };
                };
            };
        };
    };
};
var lift5 = function (dictApply) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return apply(dictApply)(apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c))(d))(e);
                        };
                    };
                };
            };
        };
    };
};
module.exports = {
    Apply: Apply, 
    apply: apply, 
    applyFirst: applyFirst, 
    applySecond: applySecond, 
    lift2: lift2, 
    lift3: lift3, 
    lift4: lift4, 
    lift5: lift5, 
    applyFn: applyFn, 
    applyArray: applyArray
};

},{"../Control.Category":11,"../Data.Function":71,"../Data.Functor":74,"./foreign":5}],7:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Biapply = require("../Control.Biapply");
var Biapplicative = function (Biapply0, bipure) {
    this.Biapply0 = Biapply0;
    this.bipure = bipure;
};
var bipure = function (dict) {
    return dict.bipure;
};
module.exports = {
    Biapplicative: Biapplicative, 
    bipure: bipure
};

},{"../Control.Biapply":8}],8:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Function = require("../Data.Function");
var Biapply = function (Bifunctor0, biapply) {
    this.Bifunctor0 = Bifunctor0;
    this.biapply = biapply;
};
var biapply = function (dict) {
    return dict.biapply;
};
var biapplyFirst = function (dictBiapply) {
    return function (a) {
        return function (b) {
            return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(Data_Function["const"](Control_Category.id(Control_Category.categoryFn)))(Data_Function["const"](Control_Category.id(Control_Category.categoryFn))))(a))(b);
        };
    };
};
var biapplySecond = function (dictBiapply) {
    return function (a) {
        return function (b) {
            return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(Data_Function["const"])(Data_Function["const"]))(a))(b);
        };
    };
};
var bilift2 = function (dictBiapply) {
    return function (f) {
        return function (g) {
            return function (a) {
                return function (b) {
                    return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b);
                };
            };
        };
    };
};
var bilift3 = function (dictBiapply) {
    return function (f) {
        return function (g) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return biapply(dictBiapply)(biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b))(c);
                    };
                };
            };
        };
    };
};
module.exports = {
    Biapply: Biapply, 
    biapply: biapply, 
    biapplyFirst: biapplyFirst, 
    biapplySecond: biapplySecond, 
    bilift2: bilift2, 
    bilift3: bilift3
};

},{"../Control.Category":11,"../Data.Bifunctor":50,"../Data.Function":71}],9:[function(require,module,exports){
"use strict";

exports.arrayBind = function (arr) {
  return function (f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

},{}],10:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Bind = function (Apply0, bind) {
    this.Apply0 = Apply0;
    this.bind = bind;
};
var Discard = function (discard) {
    this.discard = discard;
};
var discard = function (dict) {
    return dict.discard;
};
var bindFn = new Bind(function () {
    return Control_Apply.applyFn;
}, function (m) {
    return function (f) {
        return function (x) {
            return f(m(x))(x);
        };
    };
});
var bindArray = new Bind(function () {
    return Control_Apply.applyArray;
}, $foreign.arrayBind);
var bind = function (dict) {
    return dict.bind;
};
var bindFlipped = function (dictBind) {
    return Data_Function.flip(bind(dictBind));
};
var composeKleisliFlipped = function (dictBind) {
    return function (f) {
        return function (g) {
            return function (a) {
                return bindFlipped(dictBind)(f)(g(a));
            };
        };
    };
};
var composeKleisli = function (dictBind) {
    return function (f) {
        return function (g) {
            return function (a) {
                return bind(dictBind)(f(a))(g);
            };
        };
    };
};
var discardUnit = new Discard(function (dictBind) {
    return bind(dictBind);
});
var ifM = function (dictBind) {
    return function (cond) {
        return function (t) {
            return function (f) {
                return bind(dictBind)(cond)(function (cond$prime) {
                    if (cond$prime) {
                        return t;
                    };
                    return f;
                });
            };
        };
    };
};
var join = function (dictBind) {
    return function (m) {
        return bind(dictBind)(m)(Control_Category.id(Control_Category.categoryFn));
    };
};
module.exports = {
    Bind: Bind, 
    Discard: Discard, 
    bind: bind, 
    bindFlipped: bindFlipped, 
    composeKleisli: composeKleisli, 
    composeKleisliFlipped: composeKleisliFlipped, 
    discard: discard, 
    ifM: ifM, 
    join: join, 
    bindFn: bindFn, 
    bindArray: bindArray, 
    discardUnit: discardUnit
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Data.Function":71,"../Data.Functor":74,"../Data.Unit":127,"./foreign":9}],11:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Category = function (Semigroupoid0, id) {
    this.Semigroupoid0 = Semigroupoid0;
    this.id = id;
};
var id = function (dict) {
    return dict.id;
};
var categoryFn = new Category(function () {
    return Control_Semigroupoid.semigroupoidFn;
}, function (x) {
    return x;
});
module.exports = {
    Category: Category, 
    id: id, 
    categoryFn: categoryFn
};

},{"../Control.Semigroupoid":37}],12:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Extend = require("../Control.Extend");
var Data_Functor = require("../Data.Functor");
var Comonad = function (Extend0, extract) {
    this.Extend0 = Extend0;
    this.extract = extract;
};
var extract = function (dict) {
    return dict.extract;
};
module.exports = {
    Comonad: Comonad, 
    extract: extract
};

},{"../Control.Extend":13,"../Data.Functor":74}],13:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Data_Functor = require("../Data.Functor");
var Data_Semigroup = require("../Data.Semigroup");
var Extend = function (Functor0, extend) {
    this.Functor0 = Functor0;
    this.extend = extend;
};
var extendFn = function (dictSemigroup) {
    return new Extend(function () {
        return Data_Functor.functorFn;
    }, function (f) {
        return function (g) {
            return function (w) {
                return f(function (w$prime) {
                    return g(Data_Semigroup.append(dictSemigroup)(w)(w$prime));
                });
            };
        };
    });
};
var extend = function (dict) {
    return dict.extend;
};
var extendFlipped = function (dictExtend) {
    return function (w) {
        return function (f) {
            return extend(dictExtend)(f)(w);
        };
    };
};
var duplicate = function (dictExtend) {
    return extend(dictExtend)(Control_Category.id(Control_Category.categoryFn));
};
var composeCoKleisliFlipped = function (dictExtend) {
    return function (f) {
        return function (g) {
            return function (w) {
                return f(extend(dictExtend)(g)(w));
            };
        };
    };
};
var composeCoKleisli = function (dictExtend) {
    return function (f) {
        return function (g) {
            return function (w) {
                return g(extend(dictExtend)(f)(w));
            };
        };
    };
};
module.exports = {
    Extend: Extend, 
    composeCoKleisli: composeCoKleisli, 
    composeCoKleisliFlipped: composeCoKleisliFlipped, 
    duplicate: duplicate, 
    extend: extend, 
    extendFlipped: extendFlipped, 
    extendFn: extendFn
};

},{"../Control.Category":11,"../Data.Functor":74,"../Data.Semigroup":107}],14:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Unit = require("../Data.Unit");
var Lazy = function (defer) {
    this.defer = defer;
};
var defer = function (dict) {
    return dict.defer;
};
var fix = function (dictLazy) {
    return function (f) {
        return defer(dictLazy)(function (v) {
            return f(fix(dictLazy)(f));
        });
    };
};
module.exports = {
    Lazy: Lazy, 
    defer: defer, 
    fix: fix
};

},{"../Data.Unit":127}],15:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Prelude = require("../Prelude");
var MonadCont = function (Monad0, callCC) {
    this.Monad0 = Monad0;
    this.callCC = callCC;
};
var callCC = function (dict) {
    return dict.callCC;
};
module.exports = {
    MonadCont: MonadCont, 
    callCC: callCC
};

},{"../Prelude":139}],16:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var MonadEff = function (Monad0, liftEff) {
    this.Monad0 = Monad0;
    this.liftEff = liftEff;
};
var monadEffEff = new MonadEff(function () {
    return Control_Monad_Eff.monadEff;
}, Control_Category.id(Control_Category.categoryFn));
var liftEff = function (dict) {
    return dict.liftEff;
};
module.exports = {
    MonadEff: MonadEff, 
    liftEff: liftEff, 
    monadEffEff: monadEffEff
};

},{"../Control.Category":11,"../Control.Monad":35,"../Control.Monad.Eff":22}],17:[function(require,module,exports){
/* global exports */
"use strict";

exports.ready = function(func) {
    return function() {
        jQuery(document).ready(func);
    };
};

exports.select = function(selector) {
    return function() {
        return jQuery(selector);
    };
};

exports.find = function(selector) {
    return function(ob) {
        return function() {
            return ob.find(selector);
        };
    };
};

exports.parent = function(ob) {
    return function() {
        return ob.parent();
    };
};

exports.closest = function(selector) {
    return function(ob) {
        return function() {
            return ob.closest(selector);
        };
    };
};

exports.create = function(html) {
    return function() {
        return jQuery(html);
    };
};

exports.setAttr = function(attr) {
    return function(val) {
        return function(ob) {
            return function() {
                ob.attr(attr, val);
            };
        };
    };
};

exports.attr = function(attrs) {
    return function(ob) {
        return function() {
            ob.attr(attrs);
        };
    };
};

exports.css = function(props) {
    return function(ob) {
        return function() {
            ob.css(props);
        };
    };
};

exports.hasClass = function(cls) {
    return function(ob) {
        return function() {
            return ob.hasClass(cls);
        };
    };
};

exports.toggleClass = function(cls) {
    return function(ob) {
        return function() {
            ob.toggleClass(cls);
        };
    };
};

exports.setClass = function(cls) {
    return function(flag) {
        return function(ob) {
            return function() {
                ob.toggleClass(cls, flag);
            };
        };
    };
};

exports.setProp = function(p) {
    return function(val) {
        return function(ob) {
            return function() {
                ob.prop(p, val);
            };
        };
    };
};

exports.getProp = function(p) {
    return function(ob) {
        return function() {
            return ob.prop(p);
        };
    };
};

exports.append = function(ob1) {
    return function(ob) {
        return function() {
            ob.append(ob1);
        };
    };
};

exports.appendText = function(s) {
    return function(ob) {
        return function() {
            ob.append(s);
        };
    };
};

exports.body = function() {
    return jQuery(document.body);
};

exports.remove = function(ob) {
    return function() {
        ob.remove();
    };
};

exports.clear = function(ob) {
    return function() {
        ob.empty();
    };
};

exports.before = function(ob) {
    return function(ob1) {
        return function() {
            ob1.before(ob);
        };
    };
};

exports.getText = function(ob) {
    return function() {
        return ob.text();
    };
};

exports.setText = function(text) {
    return function(ob) {
        return function() {
            ob.text(text);
        };
    };
};

exports.getHtml = function(ob) {
    return function() {
        return ob.html();
    };
};

exports.setHtml = function(html) {
    return function(ob) {
        return function() {
            ob.html(html);
        };
    };
};

exports.getValue = function(ob) {
    return function() {
        return ob.val();
    };
};

exports.setValue = function(val) {
    return function(ob) {
        return function() {
            ob.val(val);
        };
    };
};

exports.toggle = function(ob) {
    return function() {
        ob.toggle();
    };
};

exports.setVisible = function(flag) {
    return function(ob) {
        return function() {
            ob.toggle(flag);
        };
    };
};

exports.toArray = function(ob) {
    return function() {
        var els = ob.toArray();
        var copy = [];
        for (var i = 0; i < els.length; i++) {
            copy.push(jQuery(els[i]));
        }
        return copy;
    };
};

exports.on = function(evt) {
    return function(act) {
        return function(ob) {
            return function() {
                ob.on(evt, function(e) {
                    act(e)(jQuery(this))();
                });
            };
        };
    };
};

exports["on'"] = function(evt) {
    return function(sel) {
        return function(act) {
            return function(ob) {
                return function() {
                    ob.on(evt, sel, function(e) {
                        act(e)(jQuery(this))();
                    });
                };
            };
        };
    };
};

exports.preventDefault = function(e) {
    return function() {
        e.preventDefault();
    };
};

exports.stopPropagation = function(e) {
    return function() {
        e.stopPropagation();
    };
};

exports.stopImmediatePropagation = function(e) {
    return function() {
        e.stopImmediatePropagation();
    };
};

exports.getTarget = function(e) {
    return function() {
        return jQuery(e.target);
    };
};

exports.getCurrentTarget = function(e) {
    return function() {
        return jQuery(e.currentTarget);
    };
};

exports.getPageX = function(e) {
    return function() {
        return jQuery(e.pageX);
    };
};

exports.getPageY = function(e) {
    return function() {
        return jQuery(e.pageY);
    };
};

exports.getWhich = function(e) {
    return function() {
        return jQuery(e.which);
    };
};

exports.getMetaKey = function(e) {
    return function() {
        return jQuery(e.metaKey);
    };
};


exports.clone = function(ob) {
    return function() {
        return ob.clone();
    };
};

exports.cloneWithDataAndEvents = function(ob) {
    return function() {
        return ob.clone(true);
    };
};

},{}],18:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var DOM = require("../DOM");
var Data_Foreign = require("../Data.Foreign");
var Prelude = require("../Prelude");
var removeClass = function (cls) {
    return $foreign.setClass(cls)(false);
};
var hide = $foreign.setVisible(false);
var display = $foreign.setVisible(true);
var addClass = function (cls) {
    return $foreign.setClass(cls)(true);
};
module.exports = {
    addClass: addClass, 
    display: display, 
    hide: hide, 
    removeClass: removeClass, 
    append: $foreign.append, 
    appendText: $foreign.appendText, 
    attr: $foreign.attr, 
    before: $foreign.before, 
    body: $foreign.body, 
    clear: $foreign.clear, 
    clone: $foreign.clone, 
    cloneWithDataAndEvents: $foreign.cloneWithDataAndEvents, 
    closest: $foreign.closest, 
    create: $foreign.create, 
    css: $foreign.css, 
    find: $foreign.find, 
    getCurrentTarget: $foreign.getCurrentTarget, 
    getHtml: $foreign.getHtml, 
    getMetaKey: $foreign.getMetaKey, 
    getPageX: $foreign.getPageX, 
    getPageY: $foreign.getPageY, 
    getProp: $foreign.getProp, 
    getTarget: $foreign.getTarget, 
    getText: $foreign.getText, 
    getValue: $foreign.getValue, 
    getWhich: $foreign.getWhich, 
    hasClass: $foreign.hasClass, 
    on: $foreign.on, 
    "on'": $foreign["on'"], 
    parent: $foreign.parent, 
    preventDefault: $foreign.preventDefault, 
    ready: $foreign.ready, 
    remove: $foreign.remove, 
    select: $foreign.select, 
    setAttr: $foreign.setAttr, 
    setClass: $foreign.setClass, 
    setHtml: $foreign.setHtml, 
    setProp: $foreign.setProp, 
    setText: $foreign.setText, 
    setValue: $foreign.setValue, 
    setVisible: $foreign.setVisible, 
    stopImmediatePropagation: $foreign.stopImmediatePropagation, 
    stopPropagation: $foreign.stopPropagation, 
    toArray: $foreign.toArray, 
    toggle: $foreign.toggle, 
    toggleClass: $foreign.toggleClass
};

},{"../Control.Monad.Eff":22,"../DOM":38,"../Data.Foreign":68,"../Prelude":139,"./foreign":17}],19:[function(require,module,exports){
"use strict";

exports.unsafeCoerceEff = function (f) {
  return f;
};

},{}],20:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var unsafePerformEff = function ($0) {
    return Control_Monad_Eff.runPure($foreign.unsafeCoerceEff($0));
};
module.exports = {
    unsafePerformEff: unsafePerformEff, 
    unsafeCoerceEff: $foreign.unsafeCoerceEff
};

},{"../Control.Monad.Eff":22,"../Control.Semigroupoid":37,"./foreign":19}],21:[function(require,module,exports){
"use strict";

exports.pureE = function (a) {
  return function () {
    return a;
  };
};

exports.bindE = function (a) {
  return function (f) {
    return function () {
      return f(a())();
    };
  };
};

exports.runPure = function (f) {
  return f();
};

exports.untilE = function (f) {
  return function () {
    while (!f());
    return {};
  };
};

exports.whileE = function (f) {
  return function (a) {
    return function () {
      while (f()) {
        a();
      }
      return {};
    };
  };
};

exports.forE = function (lo) {
  return function (hi) {
    return function (f) {
      return function () {
        for (var i = lo; i < hi; i++) {
          f(i)();
        }
      };
    };
  };
};

exports.foreachE = function (as) {
  return function (f) {
    return function () {
      for (var i = 0, l = as.length; i < l; i++) {
        f(as[i])();
      }
    };
  };
};

},{}],22:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var monadEff = new Control_Monad.Monad(function () {
    return applicativeEff;
}, function () {
    return bindEff;
});
var bindEff = new Control_Bind.Bind(function () {
    return applyEff;
}, $foreign.bindE);
var applyEff = new Control_Apply.Apply(function () {
    return functorEff;
}, Control_Monad.ap(monadEff));
var applicativeEff = new Control_Applicative.Applicative(function () {
    return applyEff;
}, $foreign.pureE);
var functorEff = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEff));
module.exports = {
    functorEff: functorEff, 
    applyEff: applyEff, 
    applicativeEff: applicativeEff, 
    bindEff: bindEff, 
    monadEff: monadEff, 
    forE: $foreign.forE, 
    foreachE: $foreign.foreachE, 
    runPure: $foreign.runPure, 
    untilE: $foreign.untilE, 
    whileE: $foreign.whileE
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":35,"../Data.Functor":74,"../Data.Unit":127,"./foreign":21}],23:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var MonadThrow = function (Monad0, throwError) {
    this.Monad0 = Monad0;
    this.throwError = throwError;
};
var MonadError = function (MonadThrow0, catchError) {
    this.MonadThrow0 = MonadThrow0;
    this.catchError = catchError;
};
var throwError = function (dict) {
    return dict.throwError;
};
var monadThrowMaybe = new MonadThrow(function () {
    return Data_Maybe.monadMaybe;
}, Data_Function["const"](Data_Maybe.Nothing.value));
var monadThrowEither = new MonadThrow(function () {
    return Data_Either.monadEither;
}, Data_Either.Left.create);
var monadErrorMaybe = new MonadError(function () {
    return monadThrowMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Maybe.Nothing) {
            return v1(Data_Unit.unit);
        };
        if (v instanceof Data_Maybe.Just) {
            return new Data_Maybe.Just(v.value0);
        };
        throw new Error("Failed pattern match at Control.Monad.Error.Class line 77, column 3 - line 77, column 33: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var monadErrorEither = new MonadError(function () {
    return monadThrowEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Either.Left) {
            return v1(v.value0);
        };
        if (v instanceof Data_Either.Right) {
            return new Data_Either.Right(v.value0);
        };
        throw new Error("Failed pattern match at Control.Monad.Error.Class line 70, column 3 - line 70, column 30: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var catchError = function (dict) {
    return dict.catchError;
};
var catchJust = function (dictMonadError) {
    return function (p) {
        return function (act) {
            return function (handler) {
                var handle = function (e) {
                    var v = p(e);
                    if (v instanceof Data_Maybe.Nothing) {
                        return throwError(dictMonadError.MonadThrow0())(e);
                    };
                    if (v instanceof Data_Maybe.Just) {
                        return handler(v.value0);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Error.Class line 54, column 5 - line 56, column 26: " + [ v.constructor.name ]);
                };
                return catchError(dictMonadError)(act)(handle);
            };
        };
    };
};
var $$try = function (dictMonadError) {
    return function (a) {
        return catchError(dictMonadError)(Data_Functor.map(((((dictMonadError.MonadThrow0()).Monad0()).Bind1()).Apply0()).Functor0())(Data_Either.Right.create)(a))(function ($21) {
            return Control_Applicative.pure(((dictMonadError.MonadThrow0()).Monad0()).Applicative0())(Data_Either.Left.create($21));
        });
    };
};
var withResource = function (dictMonadError) {
    return function (acquire) {
        return function (release) {
            return function (kleisli) {
                return Control_Bind.bind(((dictMonadError.MonadThrow0()).Monad0()).Bind1())(acquire)(function (v) {
                    return Control_Bind.bind(((dictMonadError.MonadThrow0()).Monad0()).Bind1())($$try(dictMonadError)(kleisli(v)))(function (v1) {
                        return Control_Bind.discard(Control_Bind.discardUnit)(((dictMonadError.MonadThrow0()).Monad0()).Bind1())(release(v))(function () {
                            return Data_Either.either(throwError(dictMonadError.MonadThrow0()))(Control_Applicative.pure(((dictMonadError.MonadThrow0()).Monad0()).Applicative0()))(v1);
                        });
                    });
                });
            };
        };
    };
};
module.exports = {
    MonadError: MonadError, 
    MonadThrow: MonadThrow, 
    catchError: catchError, 
    catchJust: catchJust, 
    throwError: throwError, 
    "try": $$try, 
    withResource: withResource, 
    monadThrowEither: monadThrowEither, 
    monadErrorEither: monadErrorEither, 
    monadThrowMaybe: monadThrowMaybe, 
    monadErrorMaybe: monadErrorMaybe
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Semigroupoid":37,"../Data.Either":59,"../Data.Function":71,"../Data.Functor":74,"../Data.Maybe":88,"../Data.Unit":127,"../Prelude":139}],24:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Monad_Cont_Class = require("../Control.Monad.Cont.Class");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class");
var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Tuple = require("../Data.Tuple");
var Prelude = require("../Prelude");
var ExceptT = function (x) {
    return x;
};
var withExceptT = function (dictFunctor) {
    return function (f) {
        return function (v) {
            var mapLeft = function (v1) {
                return function (v2) {
                    if (v2 instanceof Data_Either.Right) {
                        return new Data_Either.Right(v2.value0);
                    };
                    if (v2 instanceof Data_Either.Left) {
                        return new Data_Either.Left(v1(v2.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans line 44, column 3 - line 44, column 32: " + [ v1.constructor.name, v2.constructor.name ]);
                };
            };
            return ExceptT(Data_Functor.map(dictFunctor)(mapLeft(f))(v));
        };
    };
};
var runExceptT = function (v) {
    return v;
};
var newtypeExceptT = new Data_Newtype.Newtype(function (n) {
    return n;
}, ExceptT);
var monadTransExceptT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return function (m) {
        return Control_Bind.bind(dictMonad.Bind1())(m)(function (v) {
            return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(v));
        });
    };
});
var mapExceptT = function (f) {
    return function (v) {
        return f(v);
    };
};
var functorExceptT = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return mapExceptT(Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Either.functorEither)(f)));
    });
};
var except = function (dictApplicative) {
    return function ($96) {
        return ExceptT(Control_Applicative.pure(dictApplicative)($96));
    };
};
var monadExceptT = function (dictMonad) {
    return new Control_Monad.Monad(function () {
        return applicativeExceptT(dictMonad);
    }, function () {
        return bindExceptT(dictMonad);
    });
};
var bindExceptT = function (dictMonad) {
    return new Control_Bind.Bind(function () {
        return applyExceptT(dictMonad);
    }, function (v) {
        return function (k) {
            return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either(function ($97) {
                return Control_Applicative.pure(dictMonad.Applicative0())(Data_Either.Left.create($97));
            })(function (a) {
                var v1 = k(a);
                return v1;
            }));
        };
    });
};
var applyExceptT = function (dictMonad) {
    return new Control_Apply.Apply(function () {
        return functorExceptT(((dictMonad.Bind1()).Apply0()).Functor0());
    }, Control_Monad.ap(monadExceptT(dictMonad)));
};
var applicativeExceptT = function (dictMonad) {
    return new Control_Applicative.Applicative(function () {
        return applyExceptT(dictMonad);
    }, function ($98) {
        return ExceptT(Control_Applicative.pure(dictMonad.Applicative0())(Data_Either.Right.create($98)));
    });
};
var monadAskExceptT = function (dictMonadAsk) {
    return new Control_Monad_Reader_Class.MonadAsk(function () {
        return monadExceptT(dictMonadAsk.Monad0());
    }, Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};
var monadReaderExceptT = function (dictMonadReader) {
    return new Control_Monad_Reader_Class.MonadReader(function () {
        return monadAskExceptT(dictMonadReader.MonadAsk0());
    }, function (f) {
        return mapExceptT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
    });
};
var monadContExceptT = function (dictMonadCont) {
    return new Control_Monad_Cont_Class.MonadCont(function () {
        return monadExceptT(dictMonadCont.Monad0());
    }, function (f) {
        return ExceptT(Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
            var v = f(function (a) {
                return ExceptT(c(new Data_Either.Right(a)));
            });
            return v;
        }));
    });
};
var monadEffExceptT = function (dictMonadEff) {
    return new Control_Monad_Eff_Class.MonadEff(function () {
        return monadExceptT(dictMonadEff.Monad0());
    }, function ($99) {
        return Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadEff.Monad0())(Control_Monad_Eff_Class.liftEff(dictMonadEff)($99));
    });
};
var monadRecExceptT = function (dictMonadRec) {
    return new Control_Monad_Rec_Class.MonadRec(function () {
        return monadExceptT(dictMonadRec.Monad0());
    }, function (f) {
        return function ($100) {
            return ExceptT(Control_Monad_Rec_Class.tailRecM(dictMonadRec)(function (a) {
                return Control_Bind.bind((dictMonadRec.Monad0()).Bind1())((function () {
                    var v = f(a);
                    return v;
                })())(function (m$prime) {
                    return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())((function () {
                        if (m$prime instanceof Data_Either.Left) {
                            return new Control_Monad_Rec_Class.Done(new Data_Either.Left(m$prime.value0));
                        };
                        if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Loop) {
                            return new Control_Monad_Rec_Class.Loop(m$prime.value0.value0);
                        };
                        if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Done) {
                            return new Control_Monad_Rec_Class.Done(new Data_Either.Right(m$prime.value0.value0));
                        };
                        throw new Error("Failed pattern match at Control.Monad.Except.Trans line 76, column 14 - line 79, column 43: " + [ m$prime.constructor.name ]);
                    })());
                });
            })($100));
        };
    });
};
var monadStateExceptT = function (dictMonadState) {
    return new Control_Monad_State_Class.MonadState(function () {
        return monadExceptT(dictMonadState.Monad0());
    }, function (f) {
        return Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
    });
};
var monadTellExceptT = function (dictMonadTell) {
    return new Control_Monad_Writer_Class.MonadTell(function () {
        return monadExceptT(dictMonadTell.Monad0());
    }, function ($101) {
        return Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadTell.Monad0())(Control_Monad_Writer_Class.tell(dictMonadTell)($101));
    });
};
var monadWriterExceptT = function (dictMonadWriter) {
    return new Control_Monad_Writer_Class.MonadWriter(function () {
        return monadTellExceptT(dictMonadWriter.MonadTell0());
    }, mapExceptT(function (m) {
        return Control_Bind.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m))(function (v) {
            return Control_Applicative.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(Data_Functor.map(Data_Either.functorEither)(function (r) {
                return new Data_Tuple.Tuple(r, v.value1);
            })(v.value0));
        });
    }), mapExceptT(function (m) {
        return Control_Monad_Writer_Class.pass(dictMonadWriter)(Control_Bind.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(m)(function (v) {
            return Control_Applicative.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())((function () {
                if (v instanceof Data_Either.Left) {
                    return new Data_Tuple.Tuple(new Data_Either.Left(v.value0), Control_Category.id(Control_Category.categoryFn));
                };
                if (v instanceof Data_Either.Right) {
                    return new Data_Tuple.Tuple(new Data_Either.Right(v.value0.value0), v.value0.value1);
                };
                throw new Error("Failed pattern match at Control.Monad.Except.Trans line 138, column 10 - line 140, column 44: " + [ v.constructor.name ]);
            })());
        }));
    }));
};
var monadThrowExceptT = function (dictMonad) {
    return new Control_Monad_Error_Class.MonadThrow(function () {
        return monadExceptT(dictMonad);
    }, function ($102) {
        return ExceptT(Control_Applicative.pure(dictMonad.Applicative0())(Data_Either.Left.create($102)));
    });
};
var monadErrorExceptT = function (dictMonad) {
    return new Control_Monad_Error_Class.MonadError(function () {
        return monadThrowExceptT(dictMonad);
    }, function (v) {
        return function (k) {
            return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either(function (a) {
                var v1 = k(a);
                return v1;
            })(function ($103) {
                return Control_Applicative.pure(dictMonad.Applicative0())(Data_Either.Right.create($103));
            }));
        };
    });
};
var altExceptT = function (dictSemigroup) {
    return function (dictMonad) {
        return new Control_Alt.Alt(function () {
            return functorExceptT(((dictMonad.Bind1()).Apply0()).Functor0());
        }, function (v) {
            return function (v1) {
                return Control_Bind.bind(dictMonad.Bind1())(v)(function (v2) {
                    if (v2 instanceof Data_Either.Right) {
                        return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(v2.value0));
                    };
                    if (v2 instanceof Data_Either.Left) {
                        return Control_Bind.bind(dictMonad.Bind1())(v1)(function (v3) {
                            if (v3 instanceof Data_Either.Right) {
                                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(v3.value0));
                            };
                            if (v3 instanceof Data_Either.Left) {
                                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Left(Data_Semigroup.append(dictSemigroup)(v2.value0)(v3.value0)));
                            };
                            throw new Error("Failed pattern match at Control.Monad.Except.Trans line 88, column 9 - line 90, column 49: " + [ v3.constructor.name ]);
                        });
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans line 84, column 5 - line 90, column 49: " + [ v2.constructor.name ]);
                });
            };
        });
    };
};
var plusExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_Plus.Plus(function () {
            return altExceptT(dictMonoid.Semigroup0())(dictMonad);
        }, Control_Monad_Error_Class.throwError(monadThrowExceptT(dictMonad))(Data_Monoid.mempty(dictMonoid)));
    };
};
var alternativeExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_Alternative.Alternative(function () {
            return applicativeExceptT(dictMonad);
        }, function () {
            return plusExceptT(dictMonoid)(dictMonad);
        });
    };
};
var monadZeroExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_MonadZero.MonadZero(function () {
            return alternativeExceptT(dictMonoid)(dictMonad);
        }, function () {
            return monadExceptT(dictMonad);
        });
    };
};
var monadPlusExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_MonadPlus.MonadPlus(function () {
            return monadZeroExceptT(dictMonoid)(dictMonad);
        });
    };
};
module.exports = {
    ExceptT: ExceptT, 
    except: except, 
    mapExceptT: mapExceptT, 
    runExceptT: runExceptT, 
    withExceptT: withExceptT, 
    newtypeExceptT: newtypeExceptT, 
    functorExceptT: functorExceptT, 
    applyExceptT: applyExceptT, 
    applicativeExceptT: applicativeExceptT, 
    bindExceptT: bindExceptT, 
    monadExceptT: monadExceptT, 
    monadRecExceptT: monadRecExceptT, 
    altExceptT: altExceptT, 
    plusExceptT: plusExceptT, 
    alternativeExceptT: alternativeExceptT, 
    monadPlusExceptT: monadPlusExceptT, 
    monadZeroExceptT: monadZeroExceptT, 
    monadTransExceptT: monadTransExceptT, 
    monadEffExceptT: monadEffExceptT, 
    monadContExceptT: monadContExceptT, 
    monadThrowExceptT: monadThrowExceptT, 
    monadErrorExceptT: monadErrorExceptT, 
    monadAskExceptT: monadAskExceptT, 
    monadReaderExceptT: monadReaderExceptT, 
    monadStateExceptT: monadStateExceptT, 
    monadTellExceptT: monadTellExceptT, 
    monadWriterExceptT: monadWriterExceptT
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Monad":35,"../Control.Monad.Cont.Class":15,"../Control.Monad.Eff.Class":16,"../Control.Monad.Error.Class":23,"../Control.Monad.Reader.Class":26,"../Control.Monad.Rec.Class":27,"../Control.Monad.State.Class":30,"../Control.Monad.Trans.Class":31,"../Control.Monad.Writer.Class":32,"../Control.MonadPlus":33,"../Control.MonadZero":34,"../Control.Plus":36,"../Control.Semigroupoid":37,"../Data.Either":59,"../Data.Function":71,"../Data.Functor":74,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Semigroup":107,"../Data.Tuple":123,"../Prelude":139}],25:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Either = require("../Data.Either");
var Data_Identity = require("../Data.Identity");
var Data_Newtype = require("../Data.Newtype");
var Prelude = require("../Prelude");
var withExcept = Control_Monad_Except_Trans.withExceptT(Data_Identity.functorIdentity);
var runExcept = function ($0) {
    return Data_Newtype.unwrap(Data_Identity.newtypeIdentity)(Control_Monad_Except_Trans.runExceptT($0));
};
var mapExcept = function (f) {
    return Control_Monad_Except_Trans.mapExceptT(function ($1) {
        return Data_Identity.Identity(f(Data_Newtype.unwrap(Data_Identity.newtypeIdentity)($1)));
    });
};
module.exports = {
    mapExcept: mapExcept, 
    runExcept: runExcept, 
    withExcept: withExcept
};

},{"../Control.Monad.Error.Class":23,"../Control.Monad.Except.Trans":24,"../Control.Semigroupoid":37,"../Data.Either":59,"../Data.Identity":77,"../Data.Newtype":97,"../Prelude":139}],26:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor = require("../Data.Functor");
var Prelude = require("../Prelude");
var MonadAsk = function (Monad0, ask) {
    this.Monad0 = Monad0;
    this.ask = ask;
};
var MonadReader = function (MonadAsk0, local) {
    this.MonadAsk0 = MonadAsk0;
    this.local = local;
};
var monadAskFun = new MonadAsk(function () {
    return Control_Monad.monadFn;
}, Control_Category.id(Control_Category.categoryFn));
var monadReaderFun = new MonadReader(function () {
    return monadAskFun;
}, Control_Semigroupoid.composeFlipped(Control_Semigroupoid.semigroupoidFn));
var local = function (dict) {
    return dict.local;
};
var ask = function (dict) {
    return dict.ask;
};
var asks = function (dictMonadAsk) {
    return function (f) {
        return Data_Functor.map((((dictMonadAsk.Monad0()).Bind1()).Apply0()).Functor0())(f)(ask(dictMonadAsk));
    };
};
module.exports = {
    MonadAsk: MonadAsk, 
    MonadReader: MonadReader, 
    ask: ask, 
    asks: asks, 
    local: local, 
    monadAskFun: monadAskFun, 
    monadReaderFun: monadReaderFun
};

},{"../Control.Category":11,"../Control.Monad":35,"../Control.Semigroupoid":37,"../Data.Functor":74,"../Prelude":139}],27:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Unsafe = require("../Control.Monad.Eff.Unsafe");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Either = require("../Data.Either");
var Data_Functor = require("../Data.Functor");
var Data_Identity = require("../Data.Identity");
var Data_Unit = require("../Data.Unit");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var Loop = (function () {
    function Loop(value0) {
        this.value0 = value0;
    };
    Loop.create = function (value0) {
        return new Loop(value0);
    };
    return Loop;
})();
var Done = (function () {
    function Done(value0) {
        this.value0 = value0;
    };
    Done.create = function (value0) {
        return new Done(value0);
    };
    return Done;
})();
var MonadRec = function (Monad0, tailRecM) {
    this.Monad0 = Monad0;
    this.tailRecM = tailRecM;
};
var tailRecM = function (dict) {
    return dict.tailRecM;
};
var tailRecM2 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return tailRecM(dictMonadRec)(function (o) {
                    return f(o.a)(o.b);
                })({
                    a: a, 
                    b: b
                });
            };
        };
    };
};
var tailRecM3 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return tailRecM(dictMonadRec)(function (o) {
                        return f(o.a)(o.b)(o.c);
                    })({
                        a: a, 
                        b: b, 
                        c: c
                    });
                };
            };
        };
    };
};
var tailRecEff = function (f) {
    return function (a) {
        var fromDone = function (v) {
            var __unused = function (dictPartial1) {
                return function ($dollar15) {
                    return $dollar15;
                };
            };
            return __unused()((function () {
                if (v instanceof Done) {
                    return v.value0;
                };
                throw new Error("Failed pattern match at Control.Monad.Rec.Class line 129, column 28 - line 129, column 42: " + [ v.constructor.name ]);
            })());
        };
        var f$prime = function ($46) {
            return Control_Monad_Eff_Unsafe.unsafeCoerceEff(f($46));
        };
        return function __do() {
            var v = Control_Bind.bindFlipped(Control_Monad_Eff.bindEff)(Control_Monad_ST.newSTRef)(f$prime(a))();
            (function () {
                while (!(function __do() {
                    var v1 = v.value;
                    if (v1 instanceof Loop) {
                        var v2 = f$prime(v1.value0)();
                        var v3 = v.value = v2;
                        return false;
                    };
                    if (v1 instanceof Done) {
                        return true;
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class line 118, column 5 - line 123, column 26: " + [ v1.constructor.name ]);
                })()) {

                };
                return {};
            })();
            return Data_Functor.map(Control_Monad_Eff.functorEff)(fromDone)(Control_Monad_ST.readSTRef(v))();
        };
    };
};
var tailRec = function (f) {
    var go = function (__copy_v) {
        var __tco_done = false;
        var __tco_result;
        function __tco_loop(v) {
            if (v instanceof Loop) {
                __copy_v = f(v.value0);
                return;
            };
            if (v instanceof Done) {
                __tco_done = true;
                return v.value0;
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 93, column 13 - line 96, column 18: " + [ v.constructor.name ]);
        };
        while (!__tco_done) {
            __tco_result = __tco_loop(__copy_v);
        };
        return __tco_result;
    };
    return function ($47) {
        return go(f($47));
    };
};
var monadRecIdentity = new MonadRec(function () {
    return Data_Identity.monadIdentity;
}, function (f) {
    var runIdentity = function (v) {
        return v;
    };
    return function ($48) {
        return Data_Identity.Identity(tailRec(function ($49) {
            return runIdentity(f($49));
        })($48));
    };
});
var monadRecEither = new MonadRec(function () {
    return Data_Either.monadEither;
}, function (f) {
    return function (a0) {
        var g = function (v) {
            if (v instanceof Data_Either.Left) {
                return new Done(new Data_Either.Left(v.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Loop) {
                return new Loop(f(v.value0.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Done) {
                return new Done(new Data_Either.Right(v.value0.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 108, column 7 - line 108, column 33: " + [ v.constructor.name ]);
        };
        return tailRec(g)(f(a0));
    };
});
var monadRecEff = new MonadRec(function () {
    return Control_Monad_Eff.monadEff;
}, tailRecEff);
var functorStep = new Data_Functor.Functor(function (f) {
    return function (v) {
        if (v instanceof Loop) {
            return new Loop(v.value0);
        };
        if (v instanceof Done) {
            return new Done(f(v.value0));
        };
        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 28, column 3 - line 28, column 26: " + [ f.constructor.name, v.constructor.name ]);
    };
});
var forever = function (dictMonadRec) {
    return function (ma) {
        return tailRecM(dictMonadRec)(function (u) {
            return Data_Functor.voidRight((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(new Loop(u))(ma);
        })(Data_Unit.unit);
    };
};
var bifunctorStep = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Loop) {
                return new Loop(v(v2.value0));
            };
            if (v2 instanceof Done) {
                return new Done(v1(v2.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 32, column 3 - line 32, column 34: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
module.exports = {
    Loop: Loop, 
    Done: Done, 
    MonadRec: MonadRec, 
    forever: forever, 
    tailRec: tailRec, 
    tailRecM: tailRecM, 
    tailRecM2: tailRecM2, 
    tailRecM3: tailRecM3, 
    functorStep: functorStep, 
    bifunctorStep: bifunctorStep, 
    monadRecIdentity: monadRecIdentity, 
    monadRecEff: monadRecEff, 
    monadRecEither: monadRecEither
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":22,"../Control.Monad.Eff.Unsafe":20,"../Control.Monad.ST":29,"../Control.Semigroupoid":37,"../Data.Bifunctor":50,"../Data.Either":59,"../Data.Functor":74,"../Data.Identity":77,"../Data.Unit":127,"../Partial.Unsafe":136,"../Prelude":139}],28:[function(require,module,exports){
"use strict";

exports.newSTRef = function (val) {
  return function () {
    return { value: val };
  };
};

exports.readSTRef = function (ref) {
  return function () {
    return ref.value;
  };
};

exports.modifySTRef = function (ref) {
  return function (f) {
    return function () {
      return ref.value = f(ref.value); // eslint-disable-line no-return-assign
    };
  };
};

exports.writeSTRef = function (ref) {
  return function (a) {
    return function () {
      return ref.value = a; // eslint-disable-line no-return-assign
    };
  };
};

exports.runST = function (f) {
  return f;
};

},{}],29:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var pureST = function (st) {
    return Control_Monad_Eff.runPure($foreign.runST(st));
};
module.exports = {
    pureST: pureST, 
    modifySTRef: $foreign.modifySTRef, 
    newSTRef: $foreign.newSTRef, 
    readSTRef: $foreign.readSTRef, 
    runST: $foreign.runST, 
    writeSTRef: $foreign.writeSTRef
};

},{"../Control.Monad.Eff":22,"./foreign":28}],30:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var MonadState = function (Monad0, state) {
    this.Monad0 = Monad0;
    this.state = state;
};
var state = function (dict) {
    return dict.state;
};
var put = function (dictMonadState) {
    return function (s) {
        return state(dictMonadState)(function (v) {
            return new Data_Tuple.Tuple(Data_Unit.unit, s);
        });
    };
};
var modify = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            return new Data_Tuple.Tuple(Data_Unit.unit, f(s));
        });
    };
};
var gets = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            return new Data_Tuple.Tuple(f(s), s);
        });
    };
};
var get = function (dictMonadState) {
    return state(dictMonadState)(function (s) {
        return new Data_Tuple.Tuple(s, s);
    });
};
module.exports = {
    MonadState: MonadState, 
    get: get, 
    gets: gets, 
    modify: modify, 
    put: put, 
    state: state
};

},{"../Data.Tuple":123,"../Data.Unit":127,"../Prelude":139}],31:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Prelude = require("../Prelude");
var MonadTrans = function (lift) {
    this.lift = lift;
};
var lift = function (dict) {
    return dict.lift;
};
module.exports = {
    MonadTrans: MonadTrans, 
    lift: lift
};

},{"../Prelude":139}],32:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Tuple = require("../Data.Tuple");
var Prelude = require("../Prelude");
var MonadTell = function (Monad0, tell) {
    this.Monad0 = Monad0;
    this.tell = tell;
};
var MonadWriter = function (MonadTell0, listen, pass) {
    this.MonadTell0 = MonadTell0;
    this.listen = listen;
    this.pass = pass;
};
var tell = function (dict) {
    return dict.tell;
};
var pass = function (dict) {
    return dict.pass;
};
var listen = function (dict) {
    return dict.listen;
};
var listens = function (dictMonadWriter) {
    return function (f) {
        return function (m) {
            return Control_Bind.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(listen(dictMonadWriter)(m))(function (v) {
                return Control_Applicative.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(new Data_Tuple.Tuple(v.value0, f(v.value1)));
            });
        };
    };
};
var censor = function (dictMonadWriter) {
    return function (f) {
        return function (m) {
            return pass(dictMonadWriter)(Control_Bind.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(m)(function (v) {
                return Control_Applicative.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(new Data_Tuple.Tuple(v, f));
            }));
        };
    };
};
module.exports = {
    MonadTell: MonadTell, 
    MonadWriter: MonadWriter, 
    censor: censor, 
    listen: listen, 
    listens: listens, 
    pass: pass, 
    tell: tell
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Data.Function":71,"../Data.Tuple":123,"../Prelude":139}],33:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Functor = require("../Data.Functor");
var MonadPlus = function (MonadZero0) {
    this.MonadZero0 = MonadZero0;
};
var monadPlusArray = new MonadPlus(function () {
    return Control_MonadZero.monadZeroArray;
});
module.exports = {
    MonadPlus: MonadPlus, 
    monadPlusArray: monadPlusArray
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":35,"../Control.MonadZero":34,"../Control.Plus":36,"../Data.Functor":74}],34:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_Plus = require("../Control.Plus");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var MonadZero = function (Alternative1, Monad0) {
    this.Alternative1 = Alternative1;
    this.Monad0 = Monad0;
};
var monadZeroArray = new MonadZero(function () {
    return Control_Alternative.alternativeArray;
}, function () {
    return Control_Monad.monadArray;
});
var guard = function (dictMonadZero) {
    return function (v) {
        if (v) {
            return Control_Applicative.pure((dictMonadZero.Alternative1()).Applicative0())(Data_Unit.unit);
        };
        if (!v) {
            return Control_Plus.empty((dictMonadZero.Alternative1()).Plus1());
        };
        throw new Error("Failed pattern match at Control.MonadZero line 55, column 1 - line 55, column 23: " + [ v.constructor.name ]);
    };
};
module.exports = {
    MonadZero: MonadZero, 
    guard: guard, 
    monadZeroArray: monadZeroArray
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":35,"../Control.Plus":36,"../Data.Functor":74,"../Data.Unit":127}],35:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Data_Functor = require("../Data.Functor");
var Data_Unit = require("../Data.Unit");
var Monad = function (Applicative0, Bind1) {
    this.Applicative0 = Applicative0;
    this.Bind1 = Bind1;
};
var whenM = function (dictMonad) {
    return function (mb) {
        return function (m) {
            return Control_Bind.bind(dictMonad.Bind1())(mb)(function (v) {
                return Control_Applicative.when(dictMonad.Applicative0())(v)(m);
            });
        };
    };
};
var unlessM = function (dictMonad) {
    return function (mb) {
        return function (m) {
            return Control_Bind.bind(dictMonad.Bind1())(mb)(function (v) {
                return Control_Applicative.unless(dictMonad.Applicative0())(v)(m);
            });
        };
    };
};
var monadFn = new Monad(function () {
    return Control_Applicative.applicativeFn;
}, function () {
    return Control_Bind.bindFn;
});
var monadArray = new Monad(function () {
    return Control_Applicative.applicativeArray;
}, function () {
    return Control_Bind.bindArray;
});
var liftM1 = function (dictMonad) {
    return function (f) {
        return function (a) {
            return Control_Bind.bind(dictMonad.Bind1())(a)(function (v) {
                return Control_Applicative.pure(dictMonad.Applicative0())(f(v));
            });
        };
    };
};
var ap = function (dictMonad) {
    return function (f) {
        return function (a) {
            return Control_Bind.bind(dictMonad.Bind1())(f)(function (v) {
                return Control_Bind.bind(dictMonad.Bind1())(a)(function (v1) {
                    return Control_Applicative.pure(dictMonad.Applicative0())(v(v1));
                });
            });
        };
    };
};
module.exports = {
    Monad: Monad, 
    ap: ap, 
    liftM1: liftM1, 
    unlessM: unlessM, 
    whenM: whenM, 
    monadFn: monadFn, 
    monadArray: monadArray
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Data.Functor":74,"../Data.Unit":127}],36:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Data_Functor = require("../Data.Functor");
var Plus = function (Alt0, empty) {
    this.Alt0 = Alt0;
    this.empty = empty;
};
var plusArray = new Plus(function () {
    return Control_Alt.altArray;
}, [  ]);
var empty = function (dict) {
    return dict.empty;
};
module.exports = {
    Plus: Plus, 
    empty: empty, 
    plusArray: plusArray
};

},{"../Control.Alt":2,"../Data.Functor":74}],37:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Semigroupoid = function (compose) {
    this.compose = compose;
};
var semigroupoidFn = new Semigroupoid(function (f) {
    return function (g) {
        return function (x) {
            return f(g(x));
        };
    };
});
var compose = function (dict) {
    return dict.compose;
};
var composeFlipped = function (dictSemigroupoid) {
    return function (f) {
        return function (g) {
            return compose(dictSemigroupoid)(g)(f);
        };
    };
};
module.exports = {
    Semigroupoid: Semigroupoid, 
    compose: compose, 
    composeFlipped: composeFlipped, 
    semigroupoidFn: semigroupoidFn
};

},{}],38:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Monad_Eff = require("../Control.Monad.Eff");
module.exports = {};

},{"../Control.Monad.Eff":22}],39:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array_ST = require("../Data.Array.ST");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Semiring = require("../Data.Semiring");
var Prelude = require("../Prelude");
var Iterator = (function () {
    function Iterator(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Iterator.create = function (value0) {
        return function (value1) {
            return new Iterator(value0, value1);
        };
    };
    return Iterator;
})();
var peek = function (v) {
    return function __do() {
        var v1 = Control_Monad_ST.readSTRef(v.value1)();
        return v.value0(v1);
    };
};
var next = function (v) {
    return function __do() {
        var v1 = Control_Monad_ST.readSTRef(v.value1)();
        var v2 = Control_Monad_ST.modifySTRef(v.value1)(function (v2) {
            return v2 + 1 | 0;
        })();
        return v.value0(v1);
    };
};
var pushWhile = function (p) {
    return function (iter) {
        return function (array) {
            return function __do() {
                var v = Control_Monad_ST.newSTRef(false)();
                while (Data_Functor.map(Control_Monad_Eff.functorEff)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST.readSTRef(v))()) {
                    (function __do() {
                        var v1 = peek(iter)();
                        if (v1 instanceof Data_Maybe.Just && p(v1.value0)) {
                            var v2 = Data_Array_ST.pushSTArray(array)(v1.value0)();
                            return Data_Functor["void"](Control_Monad_Eff.functorEff)(next(iter))();
                        };
                        return Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_ST.writeSTRef(v)(true))();
                    })();
                };
                return {};
            };
        };
    };
};
var pushAll = pushWhile(Data_Function["const"](true));
var iterator = function (f) {
    return Data_Functor.map(Control_Monad_Eff.functorEff)(Iterator.create(f))(Control_Monad_ST.newSTRef(0));
};
var iterate = function (iter) {
    return function (f) {
        return function __do() {
            var v = Control_Monad_ST.newSTRef(false)();
            while (Data_Functor.map(Control_Monad_Eff.functorEff)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST.readSTRef(v))()) {
                (function __do() {
                    var v1 = next(iter)();
                    if (v1 instanceof Data_Maybe.Just) {
                        return f(v1.value0)();
                    };
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_ST.writeSTRef(v)(true))();
                    };
                    throw new Error("Failed pattern match at Data.Array.ST.Iterator line 39, column 5 - line 41, column 46: " + [ v1.constructor.name ]);
                })();
            };
            return {};
        };
    };
};
var exhausted = function ($27) {
    return Data_Functor.map(Control_Monad_Eff.functorEff)(Data_Maybe.isNothing)(peek($27));
};
module.exports = {
    exhausted: exhausted, 
    iterate: iterate, 
    iterator: iterator, 
    next: next, 
    peek: peek, 
    pushAll: pushAll, 
    pushWhile: pushWhile
};

},{"../Control.Applicative":4,"../Control.Bind":10,"../Control.Monad.Eff":22,"../Control.Monad.ST":29,"../Control.Semigroupoid":37,"../Data.Array.ST":41,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Maybe":88,"../Data.Semiring":109,"../Prelude":139}],40:[function(require,module,exports){
"use strict";

exports.runSTArray = function (f) {
  return f;
};

exports.emptySTArray = function () {
  return [];
};

exports.peekSTArrayImpl = function (just) {
  return function (nothing) {
    return function (xs) {
      return function (i) {
        return function () {
          return i >= 0 && i < xs.length ? just(xs[i]) : nothing;
        };
      };
    };
  };
};

exports.pokeSTArray = function (xs) {
  return function (i) {
    return function (a) {
      return function () {
        var ret = i >= 0 && i < xs.length;
        if (ret) xs[i] = a;
        return ret;
      };
    };
  };
};

exports.pushAllSTArray = function (xs) {
  return function (as) {
    return function () {
      return xs.push.apply(xs, as);
    };
  };
};

exports.spliceSTArray = function (xs) {
  return function (i) {
    return function (howMany) {
      return function (bs) {
        return function () {
          return xs.splice.apply(xs, [i, howMany].concat(bs));
        };
      };
    };
  };
};

exports.copyImpl = function (xs) {
  return function () {
    return xs.slice();
  };
};

exports.toAssocArray = function (xs) {
  return function () {
    var n = xs.length;
    var as = new Array(n);
    for (var i = 0; i < n; i++) as[i] = { value: xs[i], index: i };
    return as;
  };
};

},{}],41:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Maybe = require("../Data.Maybe");
var Prelude = require("../Prelude");
var Unsafe_Coerce = require("../Unsafe.Coerce");
var unsafeFreeze = function ($0) {
    return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Unsafe_Coerce.unsafeCoerce($0));
};
var thaw = $foreign.copyImpl;
var pushSTArray = function (arr) {
    return function (a) {
        return $foreign.pushAllSTArray(arr)([ a ]);
    };
};
var peekSTArray = $foreign.peekSTArrayImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var freeze = $foreign.copyImpl;
module.exports = {
    freeze: freeze, 
    peekSTArray: peekSTArray, 
    pushSTArray: pushSTArray, 
    thaw: thaw, 
    unsafeFreeze: unsafeFreeze, 
    emptySTArray: $foreign.emptySTArray, 
    pokeSTArray: $foreign.pokeSTArray, 
    pushAllSTArray: $foreign.pushAllSTArray, 
    runSTArray: $foreign.runSTArray, 
    spliceSTArray: $foreign.spliceSTArray, 
    toAssocArray: $foreign.toAssocArray
};

},{"../Control.Applicative":4,"../Control.Monad.Eff":22,"../Control.Monad.ST":29,"../Control.Semigroupoid":37,"../Data.Maybe":88,"../Prelude":139,"../Unsafe.Coerce":146,"./foreign":40}],42:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
// Array creation --------------------------------------------------------------
//------------------------------------------------------------------------------

exports.range = function (start) {
  return function (end) {
    var step = start > end ? -1 : 1;
    var result = [];
    var i = start, n = 0;
    while (i !== end) {
      result[n++] = i;
      i += step;
    }
    result[n] = i;
    return result;
  };
};

var replicate = function (count) {
  return function (value) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value);
  };
};

var replicatePolyfill = function (count) {
  return function (value) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }
    return result;
  };
};

// In browsers that have Array.prototype.fill we use it, as it's faster.
exports.replicate = typeof Array.prototype.fill === "function" ?
    replicate :
    replicatePolyfill;

exports.fromFoldableImpl = (function () {
  // jshint maxparams: 2
  function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  var emptyList = {};

  function curryCons(head) {
    return function (tail) {
      return new Cons(head, tail);
    };
  }

  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }

  return function (foldr) {
    return function (xs) {
      return listToArray(foldr(curryCons)(emptyList)(xs));
    };
  };
})();

//------------------------------------------------------------------------------
// Array size ------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.length = function (xs) {
  return xs.length;
};

//------------------------------------------------------------------------------
// Extending arrays ------------------------------------------------------------
//------------------------------------------------------------------------------

exports.cons = function (e) {
  return function (l) {
    return [e].concat(l);
  };
};

exports.snoc = function (l) {
  return function (e) {
    var l1 = l.slice();
    l1.push(e);
    return l1;
  };
};

//------------------------------------------------------------------------------
// Non-indexed reads -----------------------------------------------------------
//------------------------------------------------------------------------------

exports["uncons'"] = function (empty) {
  return function (next) {
    return function (xs) {
      return xs.length === 0 ? empty({}) : next(xs[0])(xs.slice(1));
    };
  };
};

//------------------------------------------------------------------------------
// Indexed operations ----------------------------------------------------------
//------------------------------------------------------------------------------

exports.indexImpl = function (just) {
  return function (nothing) {
    return function (xs) {
      return function (i) {
        return i < 0 || i >= xs.length ? nothing :  just(xs[i]);
      };
    };
  };
};

exports.findIndexImpl = function (just) {
  return function (nothing) {
    return function (f) {
      return function (xs) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (f(xs[i])) return just(i);
        }
        return nothing;
      };
    };
  };
};

exports.findLastIndexImpl = function (just) {
  return function (nothing) {
    return function (f) {
      return function (xs) {
        for (var i = xs.length - 1; i >= 0; i--) {
          if (f(xs[i])) return just(i);
        }
        return nothing;
      };
    };
  };
};

exports._insertAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (a) {
        return function (l) {
          if (i < 0 || i > l.length) return nothing;
          var l1 = l.slice();
          l1.splice(i, 0, a);
          return just(l1);
        };
      };
    };
  };
};

exports._deleteAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (l) {
        if (i < 0 || i >= l.length) return nothing;
        var l1 = l.slice();
        l1.splice(i, 1);
        return just(l1);
      };
    };
  };
};

exports._updateAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (a) {
        return function (l) {
          if (i < 0 || i >= l.length) return nothing;
          var l1 = l.slice();
          l1[i] = a;
          return just(l1);
        };
      };
    };
  };
};

//------------------------------------------------------------------------------
// Transformations -------------------------------------------------------------
//------------------------------------------------------------------------------

exports.reverse = function (l) {
  return l.slice().reverse();
};

exports.concat = function (xss) {
  if (xss.length <= 10000) {
    // This method is faster, but it crashes on big arrays.
    // So we use it when can and fallback to simple variant otherwise.
    return Array.prototype.concat.apply([], xss);
  }

  var result = [];
  for (var i = 0, l = xss.length; i < l; i++) {
    var xs = xss[i];
    for (var j = 0, m = xs.length; j < m; j++) {
      result.push(xs[j]);
    }
  }
  return result;
};

exports.filter = function (f) {
  return function (xs) {
    return xs.filter(f);
  };
};

exports.partition = function (f) {
  return function (xs) {
    var yes = [];
    var no  = [];
    for (var i = 0; i < xs.length; i++) {
      var x = xs[i];
      if (f(x))
        yes.push(x);
      else
        no.push(x);
    }
    return { yes: yes, no: no };
  };
};

//------------------------------------------------------------------------------
// Sorting ---------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.sortImpl = function (f) {
  return function (l) {
    // jshint maxparams: 2
    return l.slice().sort(function (x, y) {
      return f(x)(y);
    });
  };
};

//------------------------------------------------------------------------------
// Subarrays -------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.slice = function (s) {
  return function (e) {
    return function (l) {
      return l.slice(s, e);
    };
  };
};

exports.take = function (n) {
  return function (l) {
    return n < 1 ? [] : l.slice(0, n);
  };
};

exports.drop = function (n) {
  return function (l) {
    return n < 1 ? l : l.slice(n);
  };
};

//------------------------------------------------------------------------------
// Zipping ---------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.zipWith = function (f) {
  return function (xs) {
    return function (ys) {
      var l = xs.length < ys.length ? xs.length : ys.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(xs[i])(ys[i]);
      }
      return result;
    };
  };
};

//------------------------------------------------------------------------------
// Partial ---------------------------------------------------------------------
//------------------------------------------------------------------------------

exports.unsafeIndexImpl = function (xs) {
  return function (n) {
    return xs[n];
  };
};

},{}],43:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array_ST = require("../Data.Array.ST");
var Data_Array_ST_Iterator = require("../Data.Array.ST.Iterator");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_Traversable.traversableArray)(dictApplicative)($foreign.zipWith(f)(xs)(ys));
            };
        };
    };
};
var zip = $foreign.zipWith(Data_Tuple.Tuple.create);
var updateAt = $foreign._updateAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var unzip = $foreign["uncons'"](function (v) {
    return new Data_Tuple.Tuple([  ], [  ]);
})(function (v) {
    return function (ts) {
        var v1 = unzip(ts);
        return new Data_Tuple.Tuple($foreign.cons(v.value0)(v1.value0), $foreign.cons(v.value1)(v1.value1));
    };
});
var unsafeIndex = function (dictPartial) {
    return $foreign.unsafeIndexImpl;
};
var uncons = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (x) {
    return function (xs) {
        return new Data_Maybe.Just({
            head: x, 
            tail: xs
        });
    };
});
var toUnfoldable = function (dictUnfoldable) {
    return function (xs) {
        var len = $foreign.length(xs);
        var f = function (i) {
            if (i < len) {
                return new Data_Maybe.Just(new Data_Tuple.Tuple(unsafeIndex()(xs)(i), i + 1 | 0));
            };
            if (Data_Boolean.otherwise) {
                return Data_Maybe.Nothing.value;
            };
            throw new Error("Failed pattern match at Data.Array line 132, column 19 - line 137, column 26: " + [ i.constructor.name ]);
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(f)(0);
    };
};
var tail = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (v) {
    return function (xs) {
        return new Data_Maybe.Just(xs);
    };
});
var sortBy = function (comp) {
    return function (xs) {
        var comp$prime = function (x) {
            return function (y) {
                var v = comp(x)(y);
                if (v instanceof Data_Ordering.GT) {
                    return 1;
                };
                if (v instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if (v instanceof Data_Ordering.LT) {
                    return -1 | 0;
                };
                throw new Error("Failed pattern match at Data.Array line 462, column 15 - line 467, column 1: " + [ v.constructor.name ]);
            };
        };
        return $foreign.sortImpl(comp$prime)(xs);
    };
};
var sortWith = function (dictOrd) {
    return function (f) {
        return sortBy(Data_Ord.comparing(dictOrd)(f));
    };
};
var sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
var singleton = function (a) {
    return [ a ];
};
var $$null = function (xs) {
    return $foreign.length(xs) === 0;
};
var nubBy = function (eq) {
    return function (xs) {
        var v = uncons(xs);
        if (v instanceof Data_Maybe.Just) {
            return $foreign.cons(v.value0.head)(nubBy(eq)($foreign.filter(function (y) {
                return !eq(v.value0.head)(y);
            })(v.value0.tail)));
        };
        if (v instanceof Data_Maybe.Nothing) {
            return [  ];
        };
        throw new Error("Failed pattern match at Data.Array line 570, column 3 - line 572, column 18: " + [ v.constructor.name ]);
    };
};
var nub = function (dictEq) {
    return nubBy(Data_Eq.eq(dictEq));
};
var mapWithIndex = function (f) {
    return function (xs) {
        return $foreign.zipWith(f)($foreign.range(0)($foreign.length(xs) - 1 | 0))(xs);
    };
};
var some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Apply.apply((dictAlternative.Applicative0()).Apply0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())($foreign.cons)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
var many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Alt.alt((dictAlternative.Plus1()).Alt0())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative.Applicative0())([  ]));
        };
    };
};
var insertAt = $foreign._insertAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var init = function (xs) {
    if ($$null(xs)) {
        return Data_Maybe.Nothing.value;
    };
    if (Data_Boolean.otherwise) {
        return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1 | 0)(xs));
    };
    throw new Error("Failed pattern match at Data.Array line 248, column 1 - line 250, column 55: " + [ xs.constructor.name ]);
};
var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var last = function (xs) {
    return index(xs)($foreign.length(xs) - 1 | 0);
};
var unsnoc = function (xs) {
    return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
        return function (v1) {
            return {
                init: v, 
                last: v1
            };
        };
    })(init(xs)))(last(xs));
};
var modifyAt = function (i) {
    return function (f) {
        return function (xs) {
            var go = function (x) {
                return updateAt(i)(f(x))(xs);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
var span = function (p) {
    return function (arr) {
        var go = function (__copy_i) {
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(i) {
                var v = index(arr)(i);
                if (v instanceof Data_Maybe.Just) {
                    var $64 = p(v.value0);
                    if ($64) {
                        __copy_i = i + 1 | 0;
                        return;
                    };
                    __tco_done = true;
                    return new Data_Maybe.Just(i);
                };
                if (v instanceof Data_Maybe.Nothing) {
                    __tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.Array line 528, column 5 - line 530, column 25: " + [ v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__copy_i);
            };
            return __tco_result;
        };
        var breakIndex = go(0);
        if (breakIndex instanceof Data_Maybe.Just && breakIndex.value0 === 0) {
            return {
                init: [  ], 
                rest: arr
            };
        };
        if (breakIndex instanceof Data_Maybe.Just) {
            return {
                init: $foreign.slice(0)(breakIndex.value0)(arr), 
                rest: $foreign.slice(breakIndex.value0)($foreign.length(arr))(arr)
            };
        };
        if (breakIndex instanceof Data_Maybe.Nothing) {
            return {
                init: arr, 
                rest: [  ]
            };
        };
        throw new Error("Failed pattern match at Data.Array line 515, column 3 - line 521, column 30: " + [ breakIndex.constructor.name ]);
    };
};
var takeWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).init;
    };
};
var head = function (xs) {
    return index(xs)(0);
};
var groupBy = function (op) {
    return function (xs) {
        return Control_Monad_ST.pureST(function __do() {
            var v = Data_Array_ST.emptySTArray();
            var v1 = Data_Array_ST_Iterator.iterator(function (v1) {
                return index(xs)(v1);
            })();
            Data_Array_ST_Iterator.iterate(v1)(function (x) {
                return Data_Functor["void"](Control_Monad_Eff.functorEff)(function __do() {
                    var v2 = Data_Array_ST.emptySTArray();
                    Data_Array_ST_Iterator.pushWhile(op(x))(v1)(v2)();
                    var v3 = Data_Array_ST.unsafeFreeze(v2)();
                    return Data_Array_ST.pushSTArray(v)(new Data_NonEmpty.NonEmpty(x, v3))();
                });
            })();
            return Data_Array_ST.unsafeFreeze(v)();
        });
    };
};
var group = function (dictEq) {
    return function (xs) {
        return groupBy(Data_Eq.eq(dictEq))(xs);
    };
};
var group$prime = function (dictOrd) {
    return function ($85) {
        return group(dictOrd.Eq0())(sort(dictOrd)($85));
    };
};
var fromFoldable = function (dictFoldable) {
    return $foreign.fromFoldableImpl(Data_Foldable.foldr(dictFoldable));
};
var foldRecM = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (array) {
                var go = function (res) {
                    return function (i) {
                        if (i >= $foreign.length(array)) {
                            return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(res));
                        };
                        if (Data_Boolean.otherwise) {
                            return Control_Bind.bind((dictMonadRec.Monad0()).Bind1())(f(res)(unsafeIndex()(array)(i)))(function (v) {
                                return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop({
                                    a: v, 
                                    b: i + 1 | 0
                                }));
                            });
                        };
                        throw new Error("Failed pattern match at Data.Array line 671, column 3 - line 675, column 42: " + [ res.constructor.name, i.constructor.name ]);
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(go)(a)(0);
            };
        };
    };
};
var foldM = function (dictMonad) {
    return function (f) {
        return function (a) {
            return $foreign["uncons'"](function (v) {
                return Control_Applicative.pure(dictMonad.Applicative0())(a);
            })(function (b) {
                return function (bs) {
                    return Control_Bind.bind(dictMonad.Bind1())(f(a)(b))(function (a$prime) {
                        return foldM(dictMonad)(f)(a$prime)(bs);
                    });
                };
            });
        };
    };
};
var findLastIndex = $foreign.findLastIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var insertBy = function (cmp) {
    return function (x) {
        return function (ys) {
            var i = Data_Maybe.maybe(0)(function (v) {
                return v + 1 | 0;
            })(findLastIndex(function (y) {
                return Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(x)(y))(Data_Ordering.GT.value);
            })(ys));
            return Data_Maybe.fromJust()(insertAt(i)(x)(ys));
        };
    };
};
var insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
var findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var intersectBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return $foreign.filter(function (x) {
                return Data_Maybe.isJust(findIndex(eq(x))(ys));
            })(xs);
        };
    };
};
var intersect = function (dictEq) {
    return intersectBy(Data_Eq.eq(dictEq));
};
var elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var dropWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).rest;
    };
};
var deleteAt = $foreign._deleteAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var deleteBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2.length === 0) {
                return [  ];
            };
            return Data_Maybe.maybe(v2)(function (i) {
                return Data_Maybe.fromJust()(deleteAt(i)(v2));
            })(findIndex(v(v1))(v2));
        };
    };
};
var unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_Semigroup.semigroupArray)(xs)(Data_Foldable.foldl(Data_Foldable.foldableArray)(Data_Function.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
        };
    };
};
var union = function (dictEq) {
    return unionBy(Data_Eq.eq(dictEq));
};
var $$delete = function (dictEq) {
    return deleteBy(Data_Eq.eq(dictEq));
};
var difference = function (dictEq) {
    return Data_Foldable.foldr(Data_Foldable.foldableArray)($$delete(dictEq));
};
var concatMap = Data_Function.flip(Control_Bind.bind(Control_Bind.bindArray));
var mapMaybe = function (f) {
    return concatMap(function ($86) {
        return Data_Maybe.maybe([  ])(singleton)(f($86));
    });
};
var filterA = function (dictApplicative) {
    return function (p) {
        return function ($87) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(mapMaybe(function (v) {
                if (v.value1) {
                    return new Data_Maybe.Just(v.value0);
                };
                return Data_Maybe.Nothing.value;
            }))(Data_Traversable.traverse(Data_Traversable.traversableArray)(dictApplicative)(function (x) {
                return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Tuple.Tuple.create(x))(p(x));
            })($87));
        };
    };
};
var catMaybes = mapMaybe(Control_Category.id(Control_Category.categoryFn));
var alterAt = function (i) {
    return function (f) {
        return function (xs) {
            var go = function (x) {
                var v = f(x);
                if (v instanceof Data_Maybe.Nothing) {
                    return deleteAt(i)(xs);
                };
                if (v instanceof Data_Maybe.Just) {
                    return updateAt(i)(v.value0)(xs);
                };
                throw new Error("Failed pattern match at Data.Array line 388, column 10 - line 390, column 32: " + [ v.constructor.name ]);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
module.exports = {
    alterAt: alterAt, 
    catMaybes: catMaybes, 
    concatMap: concatMap, 
    "delete": $$delete, 
    deleteAt: deleteAt, 
    deleteBy: deleteBy, 
    difference: difference, 
    dropWhile: dropWhile, 
    elemIndex: elemIndex, 
    elemLastIndex: elemLastIndex, 
    filterA: filterA, 
    findIndex: findIndex, 
    findLastIndex: findLastIndex, 
    foldM: foldM, 
    foldRecM: foldRecM, 
    fromFoldable: fromFoldable, 
    group: group, 
    "group'": group$prime, 
    groupBy: groupBy, 
    head: head, 
    index: index, 
    init: init, 
    insert: insert, 
    insertAt: insertAt, 
    insertBy: insertBy, 
    intersect: intersect, 
    intersectBy: intersectBy, 
    last: last, 
    many: many, 
    mapMaybe: mapMaybe, 
    mapWithIndex: mapWithIndex, 
    modifyAt: modifyAt, 
    nub: nub, 
    nubBy: nubBy, 
    "null": $$null, 
    singleton: singleton, 
    some: some, 
    sort: sort, 
    sortBy: sortBy, 
    sortWith: sortWith, 
    span: span, 
    tail: tail, 
    takeWhile: takeWhile, 
    toUnfoldable: toUnfoldable, 
    uncons: uncons, 
    union: union, 
    unionBy: unionBy, 
    unsafeIndex: unsafeIndex, 
    unsnoc: unsnoc, 
    unzip: unzip, 
    updateAt: updateAt, 
    zip: zip, 
    zipWithA: zipWithA, 
    concat: $foreign.concat, 
    cons: $foreign.cons, 
    drop: $foreign.drop, 
    filter: $foreign.filter, 
    length: $foreign.length, 
    partition: $foreign.partition, 
    range: $foreign.range, 
    replicate: $foreign.replicate, 
    reverse: $foreign.reverse, 
    slice: $foreign.slice, 
    snoc: $foreign.snoc, 
    take: $foreign.take, 
    zipWith: $foreign.zipWith
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Lazy":14,"../Control.Monad.Eff":22,"../Control.Monad.Rec.Class":27,"../Control.Monad.ST":29,"../Control.Semigroupoid":37,"../Data.Array.ST":41,"../Data.Array.ST.Iterator":39,"../Data.Boolean":53,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Maybe":88,"../Data.NonEmpty":98,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Ring":105,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unfoldable":125,"../Partial.Unsafe":136,"../Prelude":139,"./foreign":42}],44:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Bifunctor_Clown = require("../Data.Bifunctor.Clown");
var Data_Bifunctor_Flip = require("../Data.Bifunctor.Flip");
var Data_Bifunctor_Joker = require("../Data.Bifunctor.Joker");
var Data_Bifunctor_Product = require("../Data.Bifunctor.Product");
var Data_Bifunctor_Wrap = require("../Data.Bifunctor.Wrap");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Monoid = require("../Data.Monoid");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Endo = require("../Data.Monoid.Endo");
var Data_Newtype = require("../Data.Newtype");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Bifoldable = function (bifoldMap, bifoldl, bifoldr) {
    this.bifoldMap = bifoldMap;
    this.bifoldl = bifoldl;
    this.bifoldr = bifoldr;
};
var bifoldr = function (dict) {
    return dict.bifoldr;
};
var bitraverse_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return function (f) {
            return function (g) {
                return bifoldr(dictBifoldable)(function ($97) {
                    return Control_Apply.applySecond(dictApplicative.Apply0())(f($97));
                })(function ($98) {
                    return Control_Apply.applySecond(dictApplicative.Apply0())(g($98));
                })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
            };
        };
    };
};
var bifor_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return function (g) {
                    return bitraverse_(dictBifoldable)(dictApplicative)(f)(g)(t);
                };
            };
        };
    };
};
var bisequence_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return bitraverse_(dictBifoldable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
    };
};
var bifoldl = function (dict) {
    return dict.bifoldl;
};
var bifoldableJoker = function (dictFoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (v) {
            return function (r) {
                return function (v1) {
                    return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(r)(v1);
                };
            };
        };
    }, function (v) {
        return function (r) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldl(dictFoldable)(r)(u)(v1);
                };
            };
        };
    }, function (v) {
        return function (r) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldr(dictFoldable)(r)(u)(v1);
                };
            };
        };
    });
};
var bifoldableClown = function (dictFoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (l) {
            return function (v) {
                return function (v1) {
                    return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(l)(v1);
                };
            };
        };
    }, function (l) {
        return function (v) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldl(dictFoldable)(l)(u)(v1);
                };
            };
        };
    }, function (l) {
        return function (v) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldr(dictFoldable)(l)(u)(v1);
                };
            };
        };
    });
};
var bifoldMapDefaultR = function (dictBifoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (g) {
                return bifoldr(dictBifoldable)(function ($99) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(f($99));
                })(function ($100) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(g($100));
                })(Data_Monoid.mempty(dictMonoid));
            };
        };
    };
};
var bifoldMapDefaultL = function (dictBifoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (g) {
                return bifoldl(dictBifoldable)(function (m) {
                    return function (a) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(f(a));
                    };
                })(function (m) {
                    return function (b) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(g(b));
                    };
                })(Data_Monoid.mempty(dictMonoid));
            };
        };
    };
};
var bifoldMap = function (dict) {
    return dict.bifoldMap;
};
var bifoldableFlip = function (dictBifoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (r) {
            return function (l) {
                return function (v) {
                    return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
                };
            };
        };
    }, function (r) {
        return function (l) {
            return function (u) {
                return function (v) {
                    return bifoldl(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    }, function (r) {
        return function (l) {
            return function (u) {
                return function (v) {
                    return bifoldr(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    });
};
var bifoldableWrap = function (dictBifoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (l) {
            return function (r) {
                return function (v) {
                    return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
                };
            };
        };
    }, function (l) {
        return function (r) {
            return function (u) {
                return function (v) {
                    return bifoldl(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    }, function (l) {
        return function (r) {
            return function (u) {
                return function (v) {
                    return bifoldr(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    });
};
var bifoldlDefault = function (dictBifoldable) {
    return function (f) {
        return function (g) {
            return function (z) {
                return function (p) {
                    return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(bifoldMap(dictBifoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function ($101) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(f)($101)));
                    })(function ($102) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(g)($102)));
                    })(p)))(z);
                };
            };
        };
    };
};
var bifoldrDefault = function (dictBifoldable) {
    return function (f) {
        return function (g) {
            return function (z) {
                return function (p) {
                    return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(bifoldMap(dictBifoldable)(Data_Monoid_Endo.monoidEndo)(function ($103) {
                        return Data_Monoid_Endo.Endo(f($103));
                    })(function ($104) {
                        return Data_Monoid_Endo.Endo(g($104));
                    })(p))(z);
                };
            };
        };
    };
};
var bifoldableProduct = function (dictBifoldable) {
    return function (dictBifoldable1) {
        return new Bifoldable(function (dictMonoid) {
            return function (l) {
                return function (r) {
                    return function (v) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v.value0))(bifoldMap(dictBifoldable1)(dictMonoid)(l)(r)(v.value1));
                    };
                };
            };
        }, function (l) {
            return function (r) {
                return function (u) {
                    return function (m) {
                        return bifoldlDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
                    };
                };
            };
        }, function (l) {
            return function (r) {
                return function (u) {
                    return function (m) {
                        return bifoldrDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
                    };
                };
            };
        });
    };
};
var bifold = function (dictBifoldable) {
    return function (dictMonoid) {
        return bifoldMap(dictBifoldable)(dictMonoid)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
    };
};
var biany = function (dictBifoldable) {
    return function (dictBooleanAlgebra) {
        return function (p) {
            return function (q) {
                return function ($105) {
                    return Data_Newtype.unwrap(Data_Monoid_Disj.newtypeDisj)(bifoldMap(dictBifoldable)(Data_Monoid_Disj.monoidDisj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($106) {
                        return Data_Monoid_Disj.Disj(p($106));
                    })(function ($107) {
                        return Data_Monoid_Disj.Disj(q($107));
                    })($105));
                };
            };
        };
    };
};
var biall = function (dictBifoldable) {
    return function (dictBooleanAlgebra) {
        return function (p) {
            return function (q) {
                return function ($108) {
                    return Data_Newtype.unwrap(Data_Monoid_Conj.newtypeConj)(bifoldMap(dictBifoldable)(Data_Monoid_Conj.monoidConj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($109) {
                        return Data_Monoid_Conj.Conj(p($109));
                    })(function ($110) {
                        return Data_Monoid_Conj.Conj(q($110));
                    })($108));
                };
            };
        };
    };
};
module.exports = {
    Bifoldable: Bifoldable, 
    biall: biall, 
    biany: biany, 
    bifold: bifold, 
    bifoldMap: bifoldMap, 
    bifoldMapDefaultL: bifoldMapDefaultL, 
    bifoldMapDefaultR: bifoldMapDefaultR, 
    bifoldl: bifoldl, 
    bifoldlDefault: bifoldlDefault, 
    bifoldr: bifoldr, 
    bifoldrDefault: bifoldrDefault, 
    bifor_: bifor_, 
    bisequence_: bisequence_, 
    bitraverse_: bitraverse_, 
    bifoldableClown: bifoldableClown, 
    bifoldableJoker: bifoldableJoker, 
    bifoldableFlip: bifoldableFlip, 
    bifoldableProduct: bifoldableProduct, 
    bifoldableWrap: bifoldableWrap
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Semigroupoid":37,"../Data.Bifunctor.Clown":45,"../Data.Bifunctor.Flip":46,"../Data.Bifunctor.Joker":47,"../Data.Bifunctor.Product":48,"../Data.Bifunctor.Wrap":49,"../Data.Foldable":66,"../Data.Function":71,"../Data.Monoid":95,"../Data.Monoid.Conj":90,"../Data.Monoid.Disj":91,"../Data.Monoid.Dual":92,"../Data.Monoid.Endo":93,"../Data.Newtype":97,"../Data.Semigroup":107,"../Data.Unit":127,"../Prelude":139}],45:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Clown = function (x) {
    return x;
};
var showClown = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Clown " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var ordClown = function (dictOrd) {
    return dictOrd;
};
var newtypeClown = new Data_Newtype.Newtype(function (n) {
    return n;
}, Clown);
var functorClown = new Data_Functor.Functor(function (v) {
    return function (v1) {
        return v1;
    };
});
var eqClown = function (dictEq) {
    return dictEq;
};
var bifunctorClown = function (dictFunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (v) {
            return function (v1) {
                return Data_Functor.map(dictFunctor)(f)(v1);
            };
        };
    });
};
var biapplyClown = function (dictApply) {
    return new Control_Biapply.Biapply(function () {
        return bifunctorClown(dictApply.Functor0());
    }, function (v) {
        return function (v1) {
            return Control_Apply.apply(dictApply)(v)(v1);
        };
    });
};
var biapplicativeClown = function (dictApplicative) {
    return new Control_Biapplicative.Biapplicative(function () {
        return biapplyClown(dictApplicative.Apply0());
    }, function (a) {
        return function (v) {
            return Control_Applicative.pure(dictApplicative)(a);
        };
    });
};
module.exports = {
    Clown: Clown, 
    newtypeClown: newtypeClown, 
    eqClown: eqClown, 
    ordClown: ordClown, 
    showClown: showClown, 
    functorClown: functorClown, 
    bifunctorClown: bifunctorClown, 
    biapplyClown: biapplyClown, 
    biapplicativeClown: biapplicativeClown
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Biapplicative":7,"../Control.Biapply":8,"../Data.Bifunctor":50,"../Data.Eq":61,"../Data.Functor":74,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],46:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Flip = function (x) {
    return x;
};
var showFlip = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Flip " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var ordFlip = function (dictOrd) {
    return dictOrd;
};
var newtypeFlip = new Data_Newtype.Newtype(function (n) {
    return n;
}, Flip);
var functorFlip = function (dictBifunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return Data_Bifunctor.lmap(dictBifunctor)(f)(v);
        };
    });
};
var eqFlip = function (dictEq) {
    return dictEq;
};
var bifunctorFlip = function (dictBifunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (g) {
            return function (v) {
                return Data_Bifunctor.bimap(dictBifunctor)(g)(f)(v);
            };
        };
    });
};
var biapplyFlip = function (dictBiapply) {
    return new Control_Biapply.Biapply(function () {
        return bifunctorFlip(dictBiapply.Bifunctor0());
    }, function (v) {
        return function (v1) {
            return Control_Biapply.biapply(dictBiapply)(v)(v1);
        };
    });
};
var biapplicativeFlip = function (dictBiapplicative) {
    return new Control_Biapplicative.Biapplicative(function () {
        return biapplyFlip(dictBiapplicative.Biapply0());
    }, function (a) {
        return function (b) {
            return Control_Biapplicative.bipure(dictBiapplicative)(b)(a);
        };
    });
};
module.exports = {
    Flip: Flip, 
    newtypeFlip: newtypeFlip, 
    eqFlip: eqFlip, 
    ordFlip: ordFlip, 
    showFlip: showFlip, 
    functorFlip: functorFlip, 
    bifunctorFlip: bifunctorFlip, 
    biapplyFlip: biapplyFlip, 
    biapplicativeFlip: biapplicativeFlip
};

},{"../Control.Biapplicative":7,"../Control.Biapply":8,"../Data.Bifunctor":50,"../Data.Eq":61,"../Data.Functor":74,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],47:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Joker = function (x) {
    return x;
};
var showJoker = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Joker " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var ordJoker = function (dictOrd) {
    return dictOrd;
};
var newtypeJoker = new Data_Newtype.Newtype(function (n) {
    return n;
}, Joker);
var functorJoker = function (dictFunctor) {
    return new Data_Functor.Functor(function (g) {
        return function (v) {
            return Data_Functor.map(dictFunctor)(g)(v);
        };
    });
};
var eqJoker = function (dictEq) {
    return dictEq;
};
var bifunctorJoker = function (dictFunctor) {
    return new Data_Bifunctor.Bifunctor(function (v) {
        return function (g) {
            return function (v1) {
                return Data_Functor.map(dictFunctor)(g)(v1);
            };
        };
    });
};
var biapplyJoker = function (dictApply) {
    return new Control_Biapply.Biapply(function () {
        return bifunctorJoker(dictApply.Functor0());
    }, function (v) {
        return function (v1) {
            return Control_Apply.apply(dictApply)(v)(v1);
        };
    });
};
var biapplicativeJoker = function (dictApplicative) {
    return new Control_Biapplicative.Biapplicative(function () {
        return biapplyJoker(dictApplicative.Apply0());
    }, function (v) {
        return function (b) {
            return Control_Applicative.pure(dictApplicative)(b);
        };
    });
};
module.exports = {
    Joker: Joker, 
    newtypeJoker: newtypeJoker, 
    eqJoker: eqJoker, 
    ordJoker: ordJoker, 
    showJoker: showJoker, 
    functorJoker: functorJoker, 
    bifunctorJoker: bifunctorJoker, 
    biapplyJoker: biapplyJoker, 
    biapplicativeJoker: biapplicativeJoker
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Biapplicative":7,"../Control.Biapply":8,"../Data.Bifunctor":50,"../Data.Eq":61,"../Data.Functor":74,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],48:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Product = (function () {
    function Product(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Product.create = function (value0) {
        return function (value1) {
            return new Product(value0, value1);
        };
    };
    return Product;
})();
var showProduct = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(Product " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
var eqProduct = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
            };
        });
    };
};
var ordProduct = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqProduct(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (x) {
            return function (y) {
                var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                if (v instanceof Data_Ordering.LT) {
                    return Data_Ordering.LT.value;
                };
                if (v instanceof Data_Ordering.GT) {
                    return Data_Ordering.GT.value;
                };
                return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
            };
        });
    };
};
var bifunctorProduct = function (dictBifunctor) {
    return function (dictBifunctor1) {
        return new Data_Bifunctor.Bifunctor(function (f) {
            return function (g) {
                return function (v) {
                    return new Product(Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v.value0), Data_Bifunctor.bimap(dictBifunctor1)(f)(g)(v.value1));
                };
            };
        });
    };
};
var biapplyProduct = function (dictBiapply) {
    return function (dictBiapply1) {
        return new Control_Biapply.Biapply(function () {
            return bifunctorProduct(dictBiapply.Bifunctor0())(dictBiapply1.Bifunctor0());
        }, function (v) {
            return function (v1) {
                return new Product(Control_Biapply.biapply(dictBiapply)(v.value0)(v1.value0), Control_Biapply.biapply(dictBiapply1)(v.value1)(v1.value1));
            };
        });
    };
};
var biapplicativeProduct = function (dictBiapplicative) {
    return function (dictBiapplicative1) {
        return new Control_Biapplicative.Biapplicative(function () {
            return biapplyProduct(dictBiapplicative.Biapply0())(dictBiapplicative1.Biapply0());
        }, function (a) {
            return function (b) {
                return new Product(Control_Biapplicative.bipure(dictBiapplicative)(a)(b), Control_Biapplicative.bipure(dictBiapplicative1)(a)(b));
            };
        });
    };
};
module.exports = {
    Product: Product, 
    eqProduct: eqProduct, 
    ordProduct: ordProduct, 
    showProduct: showProduct, 
    bifunctorProduct: bifunctorProduct, 
    biapplyProduct: biapplyProduct, 
    biapplicativeProduct: biapplicativeProduct
};

},{"../Control.Biapplicative":7,"../Control.Biapply":8,"../Data.Bifunctor":50,"../Data.Eq":61,"../Data.HeytingAlgebra":76,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],49:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Wrap = function (x) {
    return x;
};
var showWrap = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Wrap " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var ordWrap = function (dictOrd) {
    return dictOrd;
};
var newtypeWrap = new Data_Newtype.Newtype(function (n) {
    return n;
}, Wrap);
var functorWrap = function (dictBifunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return Data_Bifunctor.rmap(dictBifunctor)(f)(v);
        };
    });
};
var eqWrap = function (dictEq) {
    return dictEq;
};
var bifunctorWrap = function (dictBifunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (g) {
            return function (v) {
                return Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v);
            };
        };
    });
};
var biapplyWrap = function (dictBiapply) {
    return new Control_Biapply.Biapply(function () {
        return bifunctorWrap(dictBiapply.Bifunctor0());
    }, function (v) {
        return function (v1) {
            return Control_Biapply.biapply(dictBiapply)(v)(v1);
        };
    });
};
var biapplicativeWrap = function (dictBiapplicative) {
    return new Control_Biapplicative.Biapplicative(function () {
        return biapplyWrap(dictBiapplicative.Biapply0());
    }, function (a) {
        return function (b) {
            return Control_Biapplicative.bipure(dictBiapplicative)(a)(b);
        };
    });
};
module.exports = {
    Wrap: Wrap, 
    newtypeWrap: newtypeWrap, 
    eqWrap: eqWrap, 
    ordWrap: ordWrap, 
    showWrap: showWrap, 
    functorWrap: functorWrap, 
    bifunctorWrap: bifunctorWrap, 
    biapplyWrap: biapplyWrap, 
    biapplicativeWrap: biapplicativeWrap
};

},{"../Control.Biapplicative":7,"../Control.Biapply":8,"../Data.Bifunctor":50,"../Data.Eq":61,"../Data.Functor":74,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],50:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Bifunctor = function (bimap) {
    this.bimap = bimap;
};
var bimap = function (dict) {
    return dict.bimap;
};
var lmap = function (dictBifunctor) {
    return function (f) {
        return bimap(dictBifunctor)(f)(Control_Category.id(Control_Category.categoryFn));
    };
};
var rmap = function (dictBifunctor) {
    return bimap(dictBifunctor)(Control_Category.id(Control_Category.categoryFn));
};
module.exports = {
    Bifunctor: Bifunctor, 
    bimap: bimap, 
    lmap: lmap, 
    rmap: rmap
};

},{"../Control.Category":11}],51:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Data_Bifoldable = require("../Data.Bifoldable");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Bifunctor_Clown = require("../Data.Bifunctor.Clown");
var Data_Bifunctor_Flip = require("../Data.Bifunctor.Flip");
var Data_Bifunctor_Joker = require("../Data.Bifunctor.Joker");
var Data_Bifunctor_Product = require("../Data.Bifunctor.Product");
var Data_Bifunctor_Wrap = require("../Data.Bifunctor.Wrap");
var Data_Functor = require("../Data.Functor");
var Data_Traversable = require("../Data.Traversable");
var Prelude = require("../Prelude");
var Bitraversable = function (Bifoldable1, Bifunctor0, bisequence, bitraverse) {
    this.Bifoldable1 = Bifoldable1;
    this.Bifunctor0 = Bifunctor0;
    this.bisequence = bisequence;
    this.bitraverse = bitraverse;
};
var bitraverse = function (dict) {
    return dict.bitraverse;
};
var lfor = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return bitraverse(dictBitraversable)(dictApplicative)(f)(Control_Applicative.pure(dictApplicative))(t);
            };
        };
    };
};
var ltraverse = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (f) {
            return bitraverse(dictBitraversable)(dictApplicative)(f)(Control_Applicative.pure(dictApplicative));
        };
    };
};
var rfor = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return bitraverse(dictBitraversable)(dictApplicative)(Control_Applicative.pure(dictApplicative))(f)(t);
            };
        };
    };
};
var rtraverse = function (dictBitraversable) {
    return function (dictApplicative) {
        return bitraverse(dictBitraversable)(dictApplicative)(Control_Applicative.pure(dictApplicative));
    };
};
var bitraversableJoker = function (dictTraversable) {
    return new Bitraversable(function () {
        return Data_Bifoldable.bifoldableJoker(dictTraversable.Foldable1());
    }, function () {
        return Data_Bifunctor_Joker.bifunctorJoker(dictTraversable.Functor0());
    }, function (dictApplicative) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Joker.Joker)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v));
        };
    }, function (dictApplicative) {
        return function (v) {
            return function (r) {
                return function (v1) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Joker.Joker)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(r)(v1));
                };
            };
        };
    });
};
var bitraversableClown = function (dictTraversable) {
    return new Bitraversable(function () {
        return Data_Bifoldable.bifoldableClown(dictTraversable.Foldable1());
    }, function () {
        return Data_Bifunctor_Clown.bifunctorClown(dictTraversable.Functor0());
    }, function (dictApplicative) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Clown.Clown)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v));
        };
    }, function (dictApplicative) {
        return function (l) {
            return function (v) {
                return function (v1) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Clown.Clown)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(l)(v1));
                };
            };
        };
    });
};
var bisequenceDefault = function (dictBitraversable) {
    return function (dictApplicative) {
        return bitraverse(dictBitraversable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
    };
};
var bisequence = function (dict) {
    return dict.bisequence;
};
var bitraversableFlip = function (dictBitraversable) {
    return new Bitraversable(function () {
        return Data_Bifoldable.bifoldableFlip(dictBitraversable.Bifoldable1());
    }, function () {
        return Data_Bifunctor_Flip.bifunctorFlip(dictBitraversable.Bifunctor0());
    }, function (dictApplicative) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Flip.Flip)(bisequence(dictBitraversable)(dictApplicative)(v));
        };
    }, function (dictApplicative) {
        return function (r) {
            return function (l) {
                return function (v) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Flip.Flip)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v));
                };
            };
        };
    });
};
var bitraversableProduct = function (dictBitraversable) {
    return function (dictBitraversable1) {
        return new Bitraversable(function () {
            return Data_Bifoldable.bifoldableProduct(dictBitraversable.Bifoldable1())(dictBitraversable1.Bifoldable1());
        }, function () {
            return Data_Bifunctor_Product.bifunctorProduct(dictBitraversable.Bifunctor0())(dictBitraversable1.Bifunctor0());
        }, function (dictApplicative) {
            return function (v) {
                return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Product.Product.create)(bisequence(dictBitraversable)(dictApplicative)(v.value0)))(bisequence(dictBitraversable1)(dictApplicative)(v.value1));
            };
        }, function (dictApplicative) {
            return function (l) {
                return function (r) {
                    return function (v) {
                        return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Product.Product.create)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v.value0)))(bitraverse(dictBitraversable1)(dictApplicative)(l)(r)(v.value1));
                    };
                };
            };
        });
    };
};
var bitraversableWrap = function (dictBitraversable) {
    return new Bitraversable(function () {
        return Data_Bifoldable.bifoldableWrap(dictBitraversable.Bifoldable1());
    }, function () {
        return Data_Bifunctor_Wrap.bifunctorWrap(dictBitraversable.Bifunctor0());
    }, function (dictApplicative) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Wrap.Wrap)(bisequence(dictBitraversable)(dictApplicative)(v));
        };
    }, function (dictApplicative) {
        return function (l) {
            return function (r) {
                return function (v) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Bifunctor_Wrap.Wrap)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v));
                };
            };
        };
    });
};
var bitraverseDefault = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (f) {
            return function (g) {
                return function (t) {
                    return bisequence(dictBitraversable)(dictApplicative)(Data_Bifunctor.bimap(dictBitraversable.Bifunctor0())(f)(g)(t));
                };
            };
        };
    };
};
var bifor = function (dictBitraversable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return function (g) {
                    return bitraverse(dictBitraversable)(dictApplicative)(f)(g)(t);
                };
            };
        };
    };
};
module.exports = {
    Bitraversable: Bitraversable, 
    bifor: bifor, 
    bisequence: bisequence, 
    bisequenceDefault: bisequenceDefault, 
    bitraverse: bitraverse, 
    bitraverseDefault: bitraverseDefault, 
    lfor: lfor, 
    ltraverse: ltraverse, 
    rfor: rfor, 
    rtraverse: rtraverse, 
    bitraversableClown: bitraversableClown, 
    bitraversableJoker: bitraversableJoker, 
    bitraversableFlip: bitraversableFlip, 
    bitraversableProduct: bitraversableProduct, 
    bitraversableWrap: bitraversableWrap
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Data.Bifoldable":44,"../Data.Bifunctor":50,"../Data.Bifunctor.Clown":45,"../Data.Bifunctor.Flip":46,"../Data.Bifunctor.Joker":47,"../Data.Bifunctor.Product":48,"../Data.Bifunctor.Wrap":49,"../Data.Functor":74,"../Data.Traversable":121,"../Prelude":139}],52:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Unit = require("../Data.Unit");
var BooleanAlgebra = function (HeytingAlgebra0) {
    this.HeytingAlgebra0 = HeytingAlgebra0;
};
var booleanAlgebraUnit = new BooleanAlgebra(function () {
    return Data_HeytingAlgebra.heytingAlgebraUnit;
});
var booleanAlgebraFn = function (dictBooleanAlgebra) {
    return new BooleanAlgebra(function () {
        return Data_HeytingAlgebra.heytingAlgebraFunction(dictBooleanAlgebra.HeytingAlgebra0());
    });
};
var booleanAlgebraBoolean = new BooleanAlgebra(function () {
    return Data_HeytingAlgebra.heytingAlgebraBoolean;
});
module.exports = {
    BooleanAlgebra: BooleanAlgebra, 
    booleanAlgebraBoolean: booleanAlgebraBoolean, 
    booleanAlgebraUnit: booleanAlgebraUnit, 
    booleanAlgebraFn: booleanAlgebraFn
};

},{"../Data.HeytingAlgebra":76,"../Data.Unit":127}],53:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var otherwise = true;
module.exports = {
    otherwise: otherwise
};

},{}],54:[function(require,module,exports){
"use strict";

exports.topInt = 2147483647;
exports.bottomInt = -2147483648;

exports.topChar = String.fromCharCode(65535);
exports.bottomChar = String.fromCharCode(0);

},{}],55:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Unit = require("../Data.Unit");
var Bounded = function (Ord0, bottom, top) {
    this.Ord0 = Ord0;
    this.bottom = bottom;
    this.top = top;
};
var top = function (dict) {
    return dict.top;
};
var boundedUnit = new Bounded(function () {
    return Data_Ord.ordUnit;
}, Data_Unit.unit, Data_Unit.unit);
var boundedOrdering = new Bounded(function () {
    return Data_Ord.ordOrdering;
}, Data_Ordering.LT.value, Data_Ordering.GT.value);
var boundedInt = new Bounded(function () {
    return Data_Ord.ordInt;
}, $foreign.bottomInt, $foreign.topInt);
var boundedChar = new Bounded(function () {
    return Data_Ord.ordChar;
}, $foreign.bottomChar, $foreign.topChar);
var boundedBoolean = new Bounded(function () {
    return Data_Ord.ordBoolean;
}, false, true);
var bottom = function (dict) {
    return dict.bottom;
};
module.exports = {
    Bounded: Bounded, 
    bottom: bottom, 
    top: top, 
    boundedBoolean: boundedBoolean, 
    boundedInt: boundedInt, 
    boundedChar: boundedChar, 
    boundedOrdering: boundedOrdering, 
    boundedUnit: boundedUnit
};

},{"../Data.Ord":102,"../Data.Ordering":103,"../Data.Unit":127,"./foreign":54}],56:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_CatQueue = require("../Data.CatQueue");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_NaturalTransformation = require("../Data.NaturalTransformation");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var CatNil = (function () {
    function CatNil() {

    };
    CatNil.value = new CatNil();
    return CatNil;
})();
var CatCons = (function () {
    function CatCons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    CatCons.create = function (value0) {
        return function (value1) {
            return new CatCons(value0, value1);
        };
    };
    return CatCons;
})();
var showCatList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        if (v instanceof CatNil) {
            return "CatNil";
        };
        if (v instanceof CatCons) {
            return "(CatList " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(Data_CatQueue.showCatQueue(showCatList(dictShow)))(v.value1) + ")")));
        };
        throw new Error("Failed pattern match at Data.CatList line 154, column 3 - line 155, column 3: " + [ v.constructor.name ]);
    });
};
var $$null = function (v) {
    if (v instanceof CatNil) {
        return true;
    };
    return false;
};
var link = function (v) {
    return function (cat) {
        if (v instanceof CatNil) {
            return cat;
        };
        if (v instanceof CatCons) {
            return new CatCons(v.value0, Data_CatQueue.snoc(v.value1)(cat));
        };
        throw new Error("Failed pattern match at Data.CatList line 111, column 1 - line 111, column 22: " + [ v.constructor.name, cat.constructor.name ]);
    };
};
var foldr = function (k) {
    return function (b) {
        return function (q) {
            var foldl = function (__copy_v) {
                return function (__copy_c) {
                    return function (__copy_v1) {
                        var __tco_v = __copy_v;
                        var __tco_c = __copy_c;
                        var __tco_done = false;
                        var __tco_result;
                        function __tco_loop(v, c, v1) {
                            if (v1 instanceof Data_List_Types.Nil) {
                                __tco_done = true;
                                return c;
                            };
                            if (v1 instanceof Data_List_Types.Cons) {
                                __tco_v = v;
                                __tco_c = v(c)(v1.value0);
                                __copy_v1 = v1.value1;
                                return;
                            };
                            throw new Error("Failed pattern match at Data.CatList line 126, column 3 - line 126, column 22: " + [ v.constructor.name, c.constructor.name, v1.constructor.name ]);
                        };
                        while (!__tco_done) {
                            __tco_result = __tco_loop(__tco_v, __tco_c, __copy_v1);
                        };
                        return __tco_result;
                    };
                };
            };
            var go = function (__copy_xs) {
                return function (__copy_ys) {
                    var __tco_xs = __copy_xs;
                    var __tco_done = false;
                    var __tco_result;
                    function __tco_loop(xs, ys) {
                        var v = Data_CatQueue.uncons(xs);
                        if (v instanceof Data_Maybe.Nothing) {
                            __tco_done = true;
                            return foldl(function (x) {
                                return function (i) {
                                    return i(x);
                                };
                            })(b)(ys);
                        };
                        if (v instanceof Data_Maybe.Just) {
                            __tco_xs = v.value0.value1;
                            __copy_ys = new Data_List_Types.Cons(k(v.value0.value0), ys);
                            return;
                        };
                        throw new Error("Failed pattern match at Data.CatList line 121, column 14 - line 123, column 67: " + [ v.constructor.name ]);
                    };
                    while (!__tco_done) {
                        __tco_result = __tco_loop(__tco_xs, __copy_ys);
                    };
                    return __tco_result;
                };
            };
            return go(q)(Data_List_Types.Nil.value);
        };
    };
};
var uncons = function (v) {
    if (v instanceof CatNil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof CatCons) {
        return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0, (function () {
            var $41 = Data_CatQueue["null"](v.value1);
            if ($41) {
                return CatNil.value;
            };
            return foldr(link)(CatNil.value)(v.value1);
        })()));
    };
    throw new Error("Failed pattern match at Data.CatList line 102, column 1 - line 102, column 24: " + [ v.constructor.name ]);
};
var foldMap = function (dictMonoid) {
    return function (f) {
        return function (v) {
            if (v instanceof CatNil) {
                return Data_Monoid.mempty(dictMonoid);
            };
            if (v instanceof CatCons) {
                var d = (function () {
                    var $46 = Data_CatQueue["null"](v.value1);
                    if ($46) {
                        return CatNil.value;
                    };
                    return foldr(link)(CatNil.value)(v.value1);
                })();
                return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(foldMap(dictMonoid)(f)(d));
            };
            throw new Error("Failed pattern match at Data.CatList line 142, column 1 - line 142, column 26: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
};
var foldableCatList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (l) {
            return foldMap(dictMonoid)(f)(l);
        };
    };
}, function (f) {
    return function (s) {
        return function (l) {
            return Data_Foldable.foldlDefault(foldableCatList)(f)(s)(l);
        };
    };
}, function (f) {
    return function (s) {
        return function (l) {
            return Data_Foldable.foldrDefault(foldableCatList)(f)(s)(l);
        };
    };
});
var empty = CatNil.value;
var append = function (v) {
    return function (v1) {
        if (v1 instanceof CatNil) {
            return v;
        };
        if (v instanceof CatNil) {
            return v1;
        };
        return link(v)(v1);
    };
};
var cons = function (a) {
    return function (cat) {
        return append(new CatCons(a, Data_CatQueue.empty))(cat);
    };
};
var map = function (v) {
    return function (v1) {
        if (v1 instanceof CatNil) {
            return CatNil.value;
        };
        if (v1 instanceof CatCons) {
            var d = (function () {
                var $53 = Data_CatQueue["null"](v1.value1);
                if ($53) {
                    return CatNil.value;
                };
                return foldr(link)(CatNil.value)(v1.value1);
            })();
            return cons(v(v1.value0))(map(v)(d));
        };
        throw new Error("Failed pattern match at Data.CatList line 136, column 1 - line 136, column 22: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var functorCatList = new Data_Functor.Functor(map);
var singleton = function (a) {
    return cons(a)(CatNil.value);
};
var traversableCatList = new Data_Traversable.Traversable(function () {
    return foldableCatList;
}, function () {
    return functorCatList;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof CatNil) {
            return Control_Applicative.pure(dictApplicative)(CatNil.value);
        };
        if (v instanceof CatCons) {
            var d = (function () {
                var $57 = Data_CatQueue["null"](v.value1);
                if ($57) {
                    return CatNil.value;
                };
                return foldr(link)(CatNil.value)(v.value1);
            })();
            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(cons)(v.value0))(Data_Traversable.sequence(traversableCatList)(dictApplicative)(d));
        };
        throw new Error("Failed pattern match at Data.CatList line 174, column 3 - line 174, column 32: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof CatNil) {
                return Control_Applicative.pure(dictApplicative)(CatNil.value);
            };
            if (v1 instanceof CatCons) {
                var d = (function () {
                    var $62 = Data_CatQueue["null"](v1.value1);
                    if ($62) {
                        return CatNil.value;
                    };
                    return foldr(link)(CatNil.value)(v1.value1);
                })();
                return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(cons)(v(v1.value0)))(Data_Traversable.traverse(traversableCatList)(dictApplicative)(v)(d));
            };
            throw new Error("Failed pattern match at Data.CatList line 170, column 3 - line 170, column 34: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var semigroupCatList = new Data_Semigroup.Semigroup(append);
var monoidCatList = new Data_Monoid.Monoid(function () {
    return semigroupCatList;
}, CatNil.value);
var monadCatList = new Control_Monad.Monad(function () {
    return applicativeCatList;
}, function () {
    return bindCatList;
});
var bindCatList = new Control_Bind.Bind(function () {
    return applyCatList;
}, Data_Function.flip(foldMap(monoidCatList)));
var applyCatList = new Control_Apply.Apply(function () {
    return functorCatList;
}, Control_Monad.ap(monadCatList));
var applicativeCatList = new Control_Applicative.Applicative(function () {
    return applyCatList;
}, singleton);
var fromFoldable = function (dictFoldable) {
    return function (f) {
        return Data_Foldable.foldMap(dictFoldable)(monoidCatList)(singleton)(f);
    };
};
var snoc = function (cat) {
    return function (a) {
        return append(cat)(new CatCons(a, Data_CatQueue.empty));
    };
};
var unfoldableCatList = new Data_Unfoldable.Unfoldable(function (f) {
    return function (b) {
        var go = function (__copy_source) {
            return function (__copy_memo) {
                var __tco_source = __copy_source;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(source, memo) {
                    var v = f(source);
                    if (v instanceof Data_Maybe.Nothing) {
                        __tco_done = true;
                        return memo;
                    };
                    if (v instanceof Data_Maybe.Just) {
                        __tco_source = v.value0.value1;
                        __copy_memo = snoc(memo)(v.value0.value0);
                        return;
                    };
                    throw new Error("Failed pattern match at Data.CatList line 165, column 24 - line 167, column 57: " + [ v.constructor.name ]);
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_source, __copy_memo);
                };
                return __tco_result;
            };
        };
        return go(b)(CatNil.value);
    };
});
var altCatList = new Control_Alt.Alt(function () {
    return functorCatList;
}, append);
var plusCatList = new Control_Plus.Plus(function () {
    return altCatList;
}, empty);
var alternativeCatList = new Control_Alternative.Alternative(function () {
    return applicativeCatList;
}, function () {
    return plusCatList;
});
var monadZeroCatList = new Control_MonadZero.MonadZero(function () {
    return alternativeCatList;
}, function () {
    return monadCatList;
});
var monadPlusCatList = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroCatList;
});
module.exports = {
    CatNil: CatNil, 
    CatCons: CatCons, 
    append: append, 
    cons: cons, 
    empty: empty, 
    fromFoldable: fromFoldable, 
    "null": $$null, 
    snoc: snoc, 
    uncons: uncons, 
    semigroupCatList: semigroupCatList, 
    monoidCatList: monoidCatList, 
    showCatList: showCatList, 
    foldableCatList: foldableCatList, 
    unfoldableCatList: unfoldableCatList, 
    traversableCatList: traversableCatList, 
    functorCatList: functorCatList, 
    applyCatList: applyCatList, 
    applicativeCatList: applicativeCatList, 
    bindCatList: bindCatList, 
    monadCatList: monadCatList, 
    altCatList: altCatList, 
    plusCatList: plusCatList, 
    alternativeCatList: alternativeCatList, 
    monadZeroCatList: monadZeroCatList, 
    monadPlusCatList: monadPlusCatList
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":35,"../Control.MonadPlus":33,"../Control.MonadZero":34,"../Control.Plus":36,"../Data.CatQueue":57,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.List":84,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.NaturalTransformation":96,"../Data.Semigroup":107,"../Data.Show":111,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unfoldable":125}],57:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Tuple = require("../Data.Tuple");
var CatQueue = (function () {
    function CatQueue(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    CatQueue.create = function (value0) {
        return function (value1) {
            return new CatQueue(value0, value1);
        };
    };
    return CatQueue;
})();
var uncons = function (__copy_v) {
    var __tco_done = false;
    var __tco_result;
    function __tco_loop(v) {
        if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
            __tco_done = true;
            return Data_Maybe.Nothing.value;
        };
        if (v.value0 instanceof Data_List_Types.Nil) {
            __copy_v = new CatQueue(Data_List.reverse(v.value1), Data_List_Types.Nil.value);
            return;
        };
        if (v.value0 instanceof Data_List_Types.Cons) {
            __tco_done = true;
            return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
        };
        throw new Error("Failed pattern match at Data.CatQueue line 51, column 1 - line 51, column 36: " + [ v.constructor.name ]);
    };
    while (!__tco_done) {
        __tco_result = __tco_loop(__copy_v);
    };
    return __tco_result;
};
var snoc = function (v) {
    return function (a) {
        return new CatQueue(v.value0, new Data_List_Types.Cons(a, v.value1));
    };
};
var showCatQueue = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(CatQueue " + (Data_Show.show(Data_List_Types.showList(dictShow))(v.value0) + (" " + (Data_Show.show(Data_List_Types.showList(dictShow))(v.value1) + ")")));
    });
};
var $$null = function (v) {
    if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
        return true;
    };
    return false;
};
var empty = new CatQueue(Data_List_Types.Nil.value, Data_List_Types.Nil.value);
module.exports = {
    CatQueue: CatQueue, 
    empty: empty, 
    "null": $$null, 
    snoc: snoc, 
    uncons: uncons, 
    showCatQueue: showCatQueue
};

},{"../Data.List":84,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.Semigroup":107,"../Data.Show":111,"../Data.Tuple":123}],58:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var CommutativeRing = function (Ring0) {
    this.Ring0 = Ring0;
};
var commutativeRingUnit = new CommutativeRing(function () {
    return Data_Ring.ringUnit;
});
var commutativeRingNumber = new CommutativeRing(function () {
    return Data_Ring.ringNumber;
});
var commutativeRingInt = new CommutativeRing(function () {
    return Data_Ring.ringInt;
});
var commutativeRingFn = function (dictCommutativeRing) {
    return new CommutativeRing(function () {
        return Data_Ring.ringFn(dictCommutativeRing.Ring0());
    });
};
module.exports = {
    CommutativeRing: CommutativeRing, 
    commutativeRingInt: commutativeRingInt, 
    commutativeRingNumber: commutativeRingNumber, 
    commutativeRingUnit: commutativeRingUnit, 
    commutativeRingFn: commutativeRingFn
};

},{"../Data.Ring":105,"../Data.Semiring":109,"../Data.Unit":127}],59:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bifoldable = require("../Data.Bifoldable");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Bitraversable = require("../Data.Bitraversable");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Prelude = require("../Prelude");
var Left = (function () {
    function Left(value0) {
        this.value0 = value0;
    };
    Left.create = function (value0) {
        return new Left(value0);
    };
    return Left;
})();
var Right = (function () {
    function Right(value0) {
        this.value0 = value0;
    };
    Right.create = function (value0) {
        return new Right(value0);
    };
    return Right;
})();
var showEither = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            if (v instanceof Left) {
                return "(Left " + (Data_Show.show(dictShow)(v.value0) + ")");
            };
            if (v instanceof Right) {
                return "(Right " + (Data_Show.show(dictShow1)(v.value0) + ")");
            };
            throw new Error("Failed pattern match at Data.Either line 161, column 3 - line 162, column 3: " + [ v.constructor.name ]);
        });
    };
};
var functorEither = new Data_Functor.Functor(function (v) {
    return function (v1) {
        if (v1 instanceof Left) {
            return new Left(v1.value0);
        };
        if (v1 instanceof Right) {
            return new Right(v(v1.value0));
        };
        throw new Error("Failed pattern match at Data.Either line 37, column 3 - line 37, column 26: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var invariantEither = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorEither));
var fromRight = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar62) {
                return $dollar62;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Right) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.Either line 253, column 1 - line 253, column 23: " + [ v.constructor.name ]);
        })());
    };
};
var fromLeft = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar66) {
                return $dollar66;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Left) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.Either line 248, column 1 - line 248, column 22: " + [ v.constructor.name ]);
        })());
    };
};
var foldableEither = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            if (v instanceof Left) {
                return Data_Monoid.mempty(dictMonoid);
            };
            if (v instanceof Right) {
                return f(v.value0);
            };
            throw new Error("Failed pattern match at Data.Either line 189, column 3 - line 189, column 31: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Left) {
                return z;
            };
            if (v1 instanceof Right) {
                return v(z)(v1.value0);
            };
            throw new Error("Failed pattern match at Data.Either line 187, column 3 - line 187, column 26: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Left) {
                return z;
            };
            if (v1 instanceof Right) {
                return v(v1.value0)(z);
            };
            throw new Error("Failed pattern match at Data.Either line 185, column 3 - line 185, column 26: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
});
var traversableEither = new Data_Traversable.Traversable(function () {
    return foldableEither;
}, function () {
    return functorEither;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Left) {
            return Control_Applicative.pure(dictApplicative)(new Left(v.value0));
        };
        if (v instanceof Right) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Either line 203, column 3 - line 203, column 36: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Left) {
                return Control_Applicative.pure(dictApplicative)(new Left(v1.value0));
            };
            if (v1 instanceof Right) {
                return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Either line 201, column 3 - line 201, column 39: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var extendEither = new Control_Extend.Extend(function () {
    return functorEither;
}, function (v) {
    return function (v1) {
        if (v1 instanceof Left) {
            return new Left(v1.value0);
        };
        return new Right(v(v1));
    };
});
var eqEither = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                if (x instanceof Left && y instanceof Left) {
                    return Data_Eq.eq(dictEq)(x.value0)(y.value0);
                };
                if (x instanceof Right && y instanceof Right) {
                    return Data_Eq.eq(dictEq1)(x.value0)(y.value0);
                };
                return false;
            };
        });
    };
};
var ordEither = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqEither(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (x) {
            return function (y) {
                if (x instanceof Left && y instanceof Left) {
                    return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                };
                if (x instanceof Left) {
                    return Data_Ordering.LT.value;
                };
                if (y instanceof Left) {
                    return Data_Ordering.GT.value;
                };
                if (x instanceof Right && y instanceof Right) {
                    return Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
                };
                throw new Error("Failed pattern match at Data.Either line 176, column 1 - line 176, column 64: " + [ x.constructor.name, y.constructor.name ]);
            };
        });
    };
};
var eq1Either = function (dictEq) {
    return new Data_Eq.Eq1(function (dictEq1) {
        return Data_Eq.eq(eqEither(dictEq)(dictEq1));
    });
};
var ord1Either = function (dictOrd) {
    return new Data_Ord.Ord1(function () {
        return eq1Either(dictOrd.Eq0());
    }, function (dictOrd1) {
        return Data_Ord.compare(ordEither(dictOrd)(dictOrd1));
    });
};
var either = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Left) {
                return v(v2.value0);
            };
            if (v2 instanceof Right) {
                return v1(v2.value0);
            };
            throw new Error("Failed pattern match at Data.Either line 230, column 1 - line 230, column 26: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var isLeft = either(Data_Function["const"](true))(Data_Function["const"](false));
var isRight = either(Data_Function["const"](false))(Data_Function["const"](true));
var choose = function (dictAlt) {
    return function (a) {
        return function (b) {
            return Control_Alt.alt(dictAlt)(Data_Functor.map(dictAlt.Functor0())(Left.create)(a))(Data_Functor.map(dictAlt.Functor0())(Right.create)(b));
        };
    };
};
var boundedEither = function (dictBounded) {
    return function (dictBounded1) {
        return new Data_Bounded.Bounded(function () {
            return ordEither(dictBounded.Ord0())(dictBounded1.Ord0());
        }, new Left(Data_Bounded.bottom(dictBounded)), new Right(Data_Bounded.top(dictBounded1)));
    };
};
var bifunctorEither = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Left) {
                return new Left(v(v2.value0));
            };
            if (v2 instanceof Right) {
                return new Right(v1(v2.value0));
            };
            throw new Error("Failed pattern match at Data.Either line 44, column 3 - line 44, column 34: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
var bifoldableEither = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
    return function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return v(v2.value0);
                };
                if (v2 instanceof Right) {
                    return v1(v2.value0);
                };
                throw new Error("Failed pattern match at Data.Either line 197, column 3 - line 197, column 31: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    };
}, function (v) {
    return function (v1) {
        return function (z) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return v(z)(v2.value0);
                };
                if (v2 instanceof Right) {
                    return v1(z)(v2.value0);
                };
                throw new Error("Failed pattern match at Data.Either line 195, column 3 - line 195, column 33: " + [ v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name ]);
            };
        };
    };
}, function (v) {
    return function (v1) {
        return function (z) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return v(v2.value0)(z);
                };
                if (v2 instanceof Right) {
                    return v1(v2.value0)(z);
                };
                throw new Error("Failed pattern match at Data.Either line 193, column 3 - line 193, column 33: " + [ v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name ]);
            };
        };
    };
});
var bitraversableEither = new Data_Bitraversable.Bitraversable(function () {
    return bifoldableEither;
}, function () {
    return bifunctorEither;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Left) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Left.create)(v.value0);
        };
        if (v instanceof Right) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Either line 209, column 3 - line 209, column 35: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof Left) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Left.create)(v(v2.value0));
                };
                if (v2 instanceof Right) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v1(v2.value0));
                };
                throw new Error("Failed pattern match at Data.Either line 207, column 3 - line 207, column 41: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    };
});
var applyEither = new Control_Apply.Apply(function () {
    return functorEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Left) {
            return new Left(v.value0);
        };
        if (v instanceof Right) {
            return Data_Functor.map(functorEither)(v.value0)(v1);
        };
        throw new Error("Failed pattern match at Data.Either line 80, column 3 - line 80, column 28: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var bindEither = new Control_Bind.Bind(function () {
    return applyEither;
}, either(function (e) {
    return function (v) {
        return new Left(e);
    };
})(function (a) {
    return function (f) {
        return f(a);
    };
}));
var semigroupEither = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (x) {
        return function (y) {
            return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semigroup.append(dictSemigroup))(x))(y);
        };
    });
};
var semiringEither = function (dictSemiring) {
    return new Data_Semiring.Semiring(function (x) {
        return function (y) {
            return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semiring.add(dictSemiring))(x))(y);
        };
    }, function (x) {
        return function (y) {
            return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semiring.mul(dictSemiring))(x))(y);
        };
    }, new Right(Data_Semiring.one(dictSemiring)), new Right(Data_Semiring.zero(dictSemiring)));
};
var applicativeEither = new Control_Applicative.Applicative(function () {
    return applyEither;
}, Right.create);
var monadEither = new Control_Monad.Monad(function () {
    return applicativeEither;
}, function () {
    return bindEither;
});
var altEither = new Control_Alt.Alt(function () {
    return functorEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Left) {
            return v1;
        };
        return v;
    };
});
module.exports = {
    Left: Left, 
    Right: Right, 
    choose: choose, 
    either: either, 
    fromLeft: fromLeft, 
    fromRight: fromRight, 
    isLeft: isLeft, 
    isRight: isRight, 
    functorEither: functorEither, 
    invariantEither: invariantEither, 
    bifunctorEither: bifunctorEither, 
    applyEither: applyEither, 
    applicativeEither: applicativeEither, 
    altEither: altEither, 
    bindEither: bindEither, 
    monadEither: monadEither, 
    extendEither: extendEither, 
    showEither: showEither, 
    eqEither: eqEither, 
    eq1Either: eq1Either, 
    ordEither: ordEither, 
    ord1Either: ord1Either, 
    boundedEither: boundedEither, 
    foldableEither: foldableEither, 
    bifoldableEither: bifoldableEither, 
    traversableEither: traversableEither, 
    bitraversableEither: bitraversableEither, 
    semiringEither: semiringEither, 
    semigroupEither: semigroupEither
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bifoldable":44,"../Data.Bifunctor":50,"../Data.Bitraversable":51,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Monoid":95,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Data.Traversable":121,"../Prelude":139}],60:[function(require,module,exports){
"use strict";

exports.refEq = function (r1) {
  return function (r2) {
    return r1 === r2;
  };
};

exports.refIneq = function (r1) {
  return function (r2) {
    return r1 !== r2;
  };
};

exports.eqArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      if (xs.length !== ys.length) return false;
      for (var i = 0; i < xs.length; i++) {
        if (!f(xs[i])(ys[i])) return false;
      }
      return true;
    };
  };
};

},{}],61:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
var Eq = function (eq) {
    this.eq = eq;
};
var Eq1 = function (eq1) {
    this.eq1 = eq1;
};
var eqVoid = new Eq(function (v) {
    return function (v1) {
        return true;
    };
});
var eqUnit = new Eq(function (v) {
    return function (v1) {
        return true;
    };
});
var eqString = new Eq($foreign.refEq);
var eqNumber = new Eq($foreign.refEq);
var eqInt = new Eq($foreign.refEq);
var eqChar = new Eq($foreign.refEq);
var eqBoolean = new Eq($foreign.refEq);
var eq1 = function (dict) {
    return dict.eq1;
};
var eq = function (dict) {
    return dict.eq;
};
var eqArray = function (dictEq) {
    return new Eq($foreign.eqArrayImpl(eq(dictEq)));
};
var eq1Array = new Eq1(function (dictEq) {
    return eq(eqArray(dictEq));
});
var notEq = function (dictEq) {
    return function (x) {
        return function (y) {
            return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
        };
    };
};
var notEq1 = function (dictEq1) {
    return function (dictEq) {
        return function (x) {
            return function (y) {
                return eq(eqBoolean)(eq1(dictEq1)(dictEq)(x)(y))(false);
            };
        };
    };
};
module.exports = {
    Eq: Eq, 
    Eq1: Eq1, 
    eq: eq, 
    eq1: eq1, 
    notEq: notEq, 
    notEq1: notEq1, 
    eqBoolean: eqBoolean, 
    eqInt: eqInt, 
    eqNumber: eqNumber, 
    eqChar: eqChar, 
    eqString: eqString, 
    eqUnit: eqUnit, 
    eqVoid: eqVoid, 
    eqArray: eqArray, 
    eq1Array: eq1Array
};

},{"../Data.Unit":127,"../Data.Void":128,"./foreign":60}],62:[function(require,module,exports){
"use strict";

exports.intDegree = function (x) {
  return Math.min(Math.abs(x), 2147483647);
};

exports.intDiv = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x / y | 0;
  };
};

exports.intMod = function (x) {
  return function (y) {
    return x % y;
  };
};

exports.numDiv = function (n1) {
  return function (n2) {
    return n1 / n2;
  };
};

},{}],63:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var EuclideanRing = function (CommutativeRing0, degree, div, mod) {
    this.CommutativeRing0 = CommutativeRing0;
    this.degree = degree;
    this.div = div;
    this.mod = mod;
};
var mod = function (dict) {
    return dict.mod;
};
var gcd = function (__copy_dictEq) {
    return function (__copy_dictEuclideanRing) {
        return function (__copy_a) {
            return function (__copy_b) {
                var __tco_dictEq = __copy_dictEq;
                var __tco_dictEuclideanRing = __copy_dictEuclideanRing;
                var __tco_a = __copy_a;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(dictEq, dictEuclideanRing, a, b) {
                    var $7 = Data_Eq.eq(dictEq)(b)(Data_Semiring.zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0()));
                    if ($7) {
                        __tco_done = true;
                        return a;
                    };
                    __tco_dictEq = dictEq;
                    __tco_dictEuclideanRing = dictEuclideanRing;
                    __tco_a = b;
                    __copy_b = mod(dictEuclideanRing)(a)(b);
                    return;
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_dictEq, __tco_dictEuclideanRing, __tco_a, __copy_b);
                };
                return __tco_result;
            };
        };
    };
};
var euclideanRingNumber = new EuclideanRing(function () {
    return Data_CommutativeRing.commutativeRingNumber;
}, function (v) {
    return 1;
}, $foreign.numDiv, function (v) {
    return function (v1) {
        return 0.0;
    };
});
var euclideanRingInt = new EuclideanRing(function () {
    return Data_CommutativeRing.commutativeRingInt;
}, $foreign.intDegree, $foreign.intDiv, $foreign.intMod);
var div = function (dict) {
    return dict.div;
};
var lcm = function (dictEq) {
    return function (dictEuclideanRing) {
        return function (a) {
            return function (b) {
                var $8 = Data_Eq.eq(dictEq)(a)(Data_Semiring.zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0())) || Data_Eq.eq(dictEq)(b)(Data_Semiring.zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0()));
                if ($8) {
                    return Data_Semiring.zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0());
                };
                return div(dictEuclideanRing)(Data_Semiring.mul(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0())(a)(b))(gcd(dictEq)(dictEuclideanRing)(a)(b));
            };
        };
    };
};
var degree = function (dict) {
    return dict.degree;
};
module.exports = {
    EuclideanRing: EuclideanRing, 
    degree: degree, 
    div: div, 
    gcd: gcd, 
    lcm: lcm, 
    mod: mod, 
    euclideanRingInt: euclideanRingInt, 
    euclideanRingNumber: euclideanRingNumber
};

},{"../Data.BooleanAlgebra":52,"../Data.CommutativeRing":58,"../Data.Eq":61,"../Data.HeytingAlgebra":76,"../Data.Ring":105,"../Data.Semiring":109,"./foreign":62}],64:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Field = function (EuclideanRing0) {
    this.EuclideanRing0 = EuclideanRing0;
};
var fieldNumber = new Field(function () {
    return Data_EuclideanRing.euclideanRingNumber;
});
module.exports = {
    Field: Field, 
    fieldNumber: fieldNumber
};

},{"../Data.CommutativeRing":58,"../Data.EuclideanRing":63,"../Data.Ring":105,"../Data.Semiring":109}],65:[function(require,module,exports){
"use strict";

exports.foldrArray = function (f) {
  return function (init) {
    return function (xs) {
      var acc = init;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};

exports.foldlArray = function (f) {
  return function (init) {
    return function (xs) {
      var acc = init;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

},{}],66:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Alt = require("../Control.Alt");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Control_Plus = require("../Control.Plus");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Maybe_Last = require("../Data.Maybe.Last");
var Data_Monoid = require("../Data.Monoid");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Endo = require("../Data.Monoid.Endo");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Foldable = function (foldMap, foldl, foldr) {
    this.foldMap = foldMap;
    this.foldl = foldl;
    this.foldr = foldr;
};
var foldr = function (dict) {
    return dict.foldr;
};
var $$null = function (dictFoldable) {
    return foldr(dictFoldable)(function (v) {
        return function (v1) {
            return false;
        };
    })(true);
};
var oneOf = function (dictFoldable) {
    return function (dictPlus) {
        return foldr(dictFoldable)(Control_Alt.alt(dictPlus.Alt0()))(Control_Plus.empty(dictPlus));
    };
};
var traverse_ = function (dictApplicative) {
    return function (dictFoldable) {
        return function (f) {
            return foldr(dictFoldable)(function ($175) {
                return Control_Apply.applySecond(dictApplicative.Apply0())(f($175));
            })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
        };
    };
};
var for_ = function (dictApplicative) {
    return function (dictFoldable) {
        return Data_Function.flip(traverse_(dictApplicative)(dictFoldable));
    };
};
var sequence_ = function (dictApplicative) {
    return function (dictFoldable) {
        return traverse_(dictApplicative)(dictFoldable)(Control_Category.id(Control_Category.categoryFn));
    };
};
var foldl = function (dict) {
    return dict.foldl;
};
var intercalate = function (dictFoldable) {
    return function (dictMonoid) {
        return function (sep) {
            return function (xs) {
                var go = function (v) {
                    return function (x) {
                        if (v.init) {
                            return {
                                init: false, 
                                acc: x
                            };
                        };
                        return {
                            init: false, 
                            acc: Data_Semigroup.append(dictMonoid.Semigroup0())(v.acc)(Data_Semigroup.append(dictMonoid.Semigroup0())(sep)(x))
                        };
                    };
                };
                return (foldl(dictFoldable)(go)({
                    init: true, 
                    acc: Data_Monoid.mempty(dictMonoid)
                })(xs)).acc;
            };
        };
    };
};
var length = function (dictFoldable) {
    return function (dictSemiring) {
        return foldl(dictFoldable)(function (c) {
            return function (v) {
                return Data_Semiring.add(dictSemiring)(Data_Semiring.one(dictSemiring))(c);
            };
        })(Data_Semiring.zero(dictSemiring));
    };
};
var maximumBy = function (dictFoldable) {
    return function (cmp) {
        var max$prime = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing) {
                    return new Data_Maybe.Just(v1);
                };
                if (v instanceof Data_Maybe.Just) {
                    return new Data_Maybe.Just((function () {
                        var $98 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.GT.value);
                        if ($98) {
                            return v.value0;
                        };
                        return v1;
                    })());
                };
                throw new Error("Failed pattern match at Data.Foldable line 296, column 3 - line 296, column 27: " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
        return foldl(dictFoldable)(max$prime)(Data_Maybe.Nothing.value);
    };
};
var maximum = function (dictOrd) {
    return function (dictFoldable) {
        return maximumBy(dictFoldable)(Data_Ord.compare(dictOrd));
    };
};
var minimumBy = function (dictFoldable) {
    return function (cmp) {
        var min$prime = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing) {
                    return new Data_Maybe.Just(v1);
                };
                if (v instanceof Data_Maybe.Just) {
                    return new Data_Maybe.Just((function () {
                        var $102 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.LT.value);
                        if ($102) {
                            return v.value0;
                        };
                        return v1;
                    })());
                };
                throw new Error("Failed pattern match at Data.Foldable line 309, column 3 - line 309, column 27: " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
        return foldl(dictFoldable)(min$prime)(Data_Maybe.Nothing.value);
    };
};
var minimum = function (dictOrd) {
    return function (dictFoldable) {
        return minimumBy(dictFoldable)(Data_Ord.compare(dictOrd));
    };
};
var product = function (dictFoldable) {
    return function (dictSemiring) {
        return foldl(dictFoldable)(Data_Semiring.mul(dictSemiring))(Data_Semiring.one(dictSemiring));
    };
};
var sum = function (dictFoldable) {
    return function (dictSemiring) {
        return foldl(dictFoldable)(Data_Semiring.add(dictSemiring))(Data_Semiring.zero(dictSemiring));
    };
};
var foldableMultiplicative = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableMaybe = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return Data_Monoid.mempty(dictMonoid);
            };
            if (v instanceof Data_Maybe.Just) {
                return f(v.value0);
            };
            throw new Error("Failed pattern match at Data.Foldable line 130, column 3 - line 130, column 30: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return z;
            };
            if (v1 instanceof Data_Maybe.Just) {
                return v(z)(v1.value0);
            };
            throw new Error("Failed pattern match at Data.Foldable line 128, column 3 - line 128, column 25: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return z;
            };
            if (v1 instanceof Data_Maybe.Just) {
                return v(v1.value0)(z);
            };
            throw new Error("Failed pattern match at Data.Foldable line 126, column 3 - line 126, column 25: " + [ v.constructor.name, z.constructor.name, v1.constructor.name ]);
        };
    };
});
var foldableDual = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableDisj = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableConj = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldableAdditive = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var foldMapDefaultR = function (dictFoldable) {
    return function (dictMonoid) {
        return function (f) {
            return foldr(dictFoldable)(function (x) {
                return function (acc) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
                };
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
var foldableArray = new Foldable(function (dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
}, $foreign.foldlArray, $foreign.foldrArray);
var foldMapDefaultL = function (dictFoldable) {
    return function (dictMonoid) {
        return function (f) {
            return foldl(dictFoldable)(function (acc) {
                return function (x) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
                };
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
var foldMap = function (dict) {
    return dict.foldMap;
};
var foldableFirst = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return foldMap(foldableMaybe)(dictMonoid)(f)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldl(foldableMaybe)(f)(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldr(foldableMaybe)(f)(z)(v);
        };
    };
});
var foldableLast = new Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return foldMap(foldableMaybe)(dictMonoid)(f)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldl(foldableMaybe)(f)(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return foldr(foldableMaybe)(f)(z)(v);
        };
    };
});
var foldlDefault = function (dictFoldable) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(foldMap(dictFoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function ($176) {
                    return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(c)($176)));
                })(xs)))(u);
            };
        };
    };
};
var foldrDefault = function (dictFoldable) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo)(function ($177) {
                    return Data_Monoid_Endo.Endo(c($177));
                })(xs))(u);
            };
        };
    };
};
var fold = function (dictFoldable) {
    return function (dictMonoid) {
        return foldMap(dictFoldable)(dictMonoid)(Control_Category.id(Control_Category.categoryFn));
    };
};
var findMap = function (dictFoldable) {
    return function (p) {
        var go = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing) {
                    return p(v1);
                };
                return v;
            };
        };
        return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
    };
};
var find = function (dictFoldable) {
    return function (p) {
        var go = function (v) {
            return function (v1) {
                if (v instanceof Data_Maybe.Nothing && p(v1)) {
                    return new Data_Maybe.Just(v1);
                };
                return v;
            };
        };
        return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
    };
};
var any = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Monoid_Disj.newtypeDisj)(Data_Monoid_Disj.newtypeDisj)(Data_Monoid_Disj.Disj)(foldMap(dictFoldable)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra)));
    };
};
var elem = function (dictFoldable) {
    return function (dictEq) {
        return function ($178) {
            return any(dictFoldable)(Data_HeytingAlgebra.heytingAlgebraBoolean)(Data_Eq.eq(dictEq)($178));
        };
    };
};
var notElem = function (dictFoldable) {
    return function (dictEq) {
        return function (x) {
            return function ($179) {
                return !elem(dictFoldable)(dictEq)(x)($179);
            };
        };
    };
};
var or = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return any(dictFoldable)(dictHeytingAlgebra)(Control_Category.id(Control_Category.categoryFn));
    };
};
var all = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Monoid_Conj.newtypeConj)(Data_Monoid_Conj.newtypeConj)(Data_Monoid_Conj.Conj)(foldMap(dictFoldable)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra)));
    };
};
var and = function (dictFoldable) {
    return function (dictHeytingAlgebra) {
        return all(dictFoldable)(dictHeytingAlgebra)(Control_Category.id(Control_Category.categoryFn));
    };
};
module.exports = {
    Foldable: Foldable, 
    all: all, 
    and: and, 
    any: any, 
    elem: elem, 
    find: find, 
    findMap: findMap, 
    fold: fold, 
    foldMap: foldMap, 
    foldMapDefaultL: foldMapDefaultL, 
    foldMapDefaultR: foldMapDefaultR, 
    foldl: foldl, 
    foldlDefault: foldlDefault, 
    foldr: foldr, 
    foldrDefault: foldrDefault, 
    for_: for_, 
    intercalate: intercalate, 
    length: length, 
    maximum: maximum, 
    maximumBy: maximumBy, 
    minimum: minimum, 
    minimumBy: minimumBy, 
    notElem: notElem, 
    "null": $$null, 
    oneOf: oneOf, 
    or: or, 
    product: product, 
    sequence_: sequence_, 
    sum: sum, 
    traverse_: traverse_, 
    foldableArray: foldableArray, 
    foldableMaybe: foldableMaybe, 
    foldableFirst: foldableFirst, 
    foldableLast: foldableLast, 
    foldableAdditive: foldableAdditive, 
    foldableDual: foldableDual, 
    foldableDisj: foldableDisj, 
    foldableConj: foldableConj, 
    foldableMultiplicative: foldableMultiplicative
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Plus":36,"../Control.Semigroupoid":37,"../Data.Eq":61,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Maybe":88,"../Data.Maybe.First":86,"../Data.Maybe.Last":87,"../Data.Monoid":95,"../Data.Monoid.Additive":89,"../Data.Monoid.Conj":90,"../Data.Monoid.Disj":91,"../Data.Monoid.Dual":92,"../Data.Monoid.Endo":93,"../Data.Monoid.Multiplicative":94,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Unit":127,"../Prelude":139,"./foreign":65}],67:[function(require,module,exports){
"use strict";

exports.toForeign = function (value) {
  return value;
};

exports.unsafeFromForeign = function (value) {
  return value;
};

exports.typeOf = function (value) {
  return typeof value;
};

exports.tagOf = function (value) {
  return Object.prototype.toString.call(value).slice(8, -1);
};

exports.isNull = function (value) {
  return value === null;
};

exports.isUndefined = function (value) {
  return value === undefined;
};

exports.isArray = Array.isArray || function (value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

},{}],68:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Monad_Except = require("../Control.Monad.Except");
var Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Boolean = require("../Data.Boolean");
var Data_Either = require("../Data.Either");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Identity = require("../Data.Identity");
var Data_Int = require("../Data.Int");
var Data_List_NonEmpty = require("../Data.List.NonEmpty");
var Data_Maybe = require("../Data.Maybe");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_String = require("../Data.String");
var Prelude = require("../Prelude");
var ForeignError = (function () {
    function ForeignError(value0) {
        this.value0 = value0;
    };
    ForeignError.create = function (value0) {
        return new ForeignError(value0);
    };
    return ForeignError;
})();
var TypeMismatch = (function () {
    function TypeMismatch(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    TypeMismatch.create = function (value0) {
        return function (value1) {
            return new TypeMismatch(value0, value1);
        };
    };
    return TypeMismatch;
})();
var ErrorAtIndex = (function () {
    function ErrorAtIndex(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    ErrorAtIndex.create = function (value0) {
        return function (value1) {
            return new ErrorAtIndex(value0, value1);
        };
    };
    return ErrorAtIndex;
})();
var ErrorAtProperty = (function () {
    function ErrorAtProperty(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    ErrorAtProperty.create = function (value0) {
        return function (value1) {
            return new ErrorAtProperty(value0, value1);
        };
    };
    return ErrorAtProperty;
})();
var JSONError = (function () {
    function JSONError(value0) {
        this.value0 = value0;
    };
    JSONError.create = function (value0) {
        return new JSONError(value0);
    };
    return JSONError;
})();
var showForeignError = new Data_Show.Show(function (v) {
    if (v instanceof ForeignError) {
        return "(ForeignError " + (v.value0 + ")");
    };
    if (v instanceof ErrorAtIndex) {
        return "(ErrorAtIndex " + (Data_Show.show(Data_Show.showInt)(v.value0) + (" " + (Data_Show.show(showForeignError)(v.value1) + ")")));
    };
    if (v instanceof ErrorAtProperty) {
        return "(ErrorAtProperty " + (Data_Show.show(Data_Show.showString)(v.value0) + (" " + (Data_Show.show(showForeignError)(v.value1) + ")")));
    };
    if (v instanceof JSONError) {
        return "(JSONError " + (Data_Show.show(Data_Show.showString)(v.value0) + ")");
    };
    if (v instanceof TypeMismatch) {
        return "(TypeMismatch " + (Data_Show.show(Data_Show.showString)(v.value0) + (" " + (Data_Show.show(Data_Show.showString)(v.value1) + ")")));
    };
    throw new Error("Failed pattern match at Data.Foreign line 65, column 3 - line 66, column 3: " + [ v.constructor.name ]);
});
var renderForeignError = function (v) {
    if (v instanceof ForeignError) {
        return v.value0;
    };
    if (v instanceof ErrorAtIndex) {
        return "Error at array index " + (Data_Show.show(Data_Show.showInt)(v.value0) + (": " + Data_Show.show(showForeignError)(v.value1)));
    };
    if (v instanceof ErrorAtProperty) {
        return "Error at property " + (Data_Show.show(Data_Show.showString)(v.value0) + (": " + Data_Show.show(showForeignError)(v.value1)));
    };
    if (v instanceof JSONError) {
        return "JSON error: " + v.value0;
    };
    if (v instanceof TypeMismatch) {
        return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
    };
    throw new Error("Failed pattern match at Data.Foreign line 75, column 1 - line 75, column 44: " + [ v.constructor.name ]);
};
var readUndefined = function (value) {
    if ($foreign.isUndefined(value)) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_Maybe.Nothing.value);
    };
    if (Data_Boolean.otherwise) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(new Data_Maybe.Just(value));
    };
    throw new Error("Failed pattern match at Data.Foreign line 156, column 1 - line 158, column 34: " + [ value.constructor.name ]);
};
var readNullOrUndefined = function (value) {
    if ($foreign.isNull(value) || $foreign.isUndefined(value)) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_Maybe.Nothing.value);
    };
    if (Data_Boolean.otherwise) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(new Data_Maybe.Just(value));
    };
    throw new Error("Failed pattern match at Data.Foreign line 161, column 1 - line 163, column 34: " + [ value.constructor.name ]);
};
var readNull = function (value) {
    if ($foreign.isNull(value)) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_Maybe.Nothing.value);
    };
    if (Data_Boolean.otherwise) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(new Data_Maybe.Just(value));
    };
    throw new Error("Failed pattern match at Data.Foreign line 151, column 1 - line 153, column 34: " + [ value.constructor.name ]);
};
var fail = function ($121) {
    return Control_Monad_Error_Class.throwError(Control_Monad_Except_Trans.monadThrowExceptT(Data_Identity.monadIdentity))(Data_List_NonEmpty.singleton($121));
};
var readArray = function (value) {
    if ($foreign.isArray(value)) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))($foreign.unsafeFromForeign(value));
    };
    if (Data_Boolean.otherwise) {
        return fail(new TypeMismatch("array", $foreign.tagOf(value)));
    };
    throw new Error("Failed pattern match at Data.Foreign line 146, column 1 - line 148, column 58: " + [ value.constructor.name ]);
};
var unsafeReadTagged = function (tag) {
    return function (value) {
        if ($foreign.tagOf(value) === tag) {
            return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))($foreign.unsafeFromForeign(value));
        };
        if (Data_Boolean.otherwise) {
            return fail(new TypeMismatch(tag, $foreign.tagOf(value)));
        };
        throw new Error("Failed pattern match at Data.Foreign line 105, column 1 - line 107, column 54: " + [ tag.constructor.name, value.constructor.name ]);
    };
};
var readBoolean = unsafeReadTagged("Boolean");
var readNumber = unsafeReadTagged("Number");
var readInt = function (value) {
    var error = Data_Either.Left.create(Data_List_NonEmpty.singleton(new TypeMismatch("Int", $foreign.tagOf(value))));
    var fromNumber = function ($122) {
        return Data_Maybe.maybe(error)(Control_Applicative.pure(Data_Either.applicativeEither))(Data_Int.fromNumber($122));
    };
    return Control_Monad_Except.mapExcept(Data_Either.either(Data_Function["const"](error))(fromNumber))(readNumber(value));
};
var readString = unsafeReadTagged("String");
var readChar = function (value) {
    var error = Data_Either.Left.create(Data_List_NonEmpty.singleton(new TypeMismatch("Char", $foreign.tagOf(value))));
    var fromString = function ($123) {
        return Data_Maybe.maybe(error)(Control_Applicative.pure(Data_Either.applicativeEither))(Data_String.toChar($123));
    };
    return Control_Monad_Except.mapExcept(Data_Either.either(Data_Function["const"](error))(fromString))(readString(value));
};
var eqForeignError = new Data_Eq.Eq(function (x) {
    return function (y) {
        if (x instanceof ForeignError && y instanceof ForeignError) {
            return x.value0 === y.value0;
        };
        if (x instanceof TypeMismatch && y instanceof TypeMismatch) {
            return x.value0 === y.value0 && x.value1 === y.value1;
        };
        if (x instanceof ErrorAtIndex && y instanceof ErrorAtIndex) {
            return x.value0 === y.value0 && Data_Eq.eq(eqForeignError)(x.value1)(y.value1);
        };
        if (x instanceof ErrorAtProperty && y instanceof ErrorAtProperty) {
            return x.value0 === y.value0 && Data_Eq.eq(eqForeignError)(x.value1)(y.value1);
        };
        if (x instanceof JSONError && y instanceof JSONError) {
            return x.value0 === y.value0;
        };
        return false;
    };
});
var ordForeignError = new Data_Ord.Ord(function () {
    return eqForeignError;
}, function (x) {
    return function (y) {
        if (x instanceof ForeignError && y instanceof ForeignError) {
            return Data_Ord.compare(Data_Ord.ordString)(x.value0)(y.value0);
        };
        if (x instanceof ForeignError) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof ForeignError) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof TypeMismatch && y instanceof TypeMismatch) {
            var v = Data_Ord.compare(Data_Ord.ordString)(x.value0)(y.value0);
            if (v instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            return Data_Ord.compare(Data_Ord.ordString)(x.value1)(y.value1);
        };
        if (x instanceof TypeMismatch) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof TypeMismatch) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof ErrorAtIndex && y instanceof ErrorAtIndex) {
            var v = Data_Ord.compare(Data_Ord.ordInt)(x.value0)(y.value0);
            if (v instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            return Data_Ord.compare(ordForeignError)(x.value1)(y.value1);
        };
        if (x instanceof ErrorAtIndex) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof ErrorAtIndex) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof ErrorAtProperty && y instanceof ErrorAtProperty) {
            var v = Data_Ord.compare(Data_Ord.ordString)(x.value0)(y.value0);
            if (v instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            return Data_Ord.compare(ordForeignError)(x.value1)(y.value1);
        };
        if (x instanceof ErrorAtProperty) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof ErrorAtProperty) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof JSONError && y instanceof JSONError) {
            return Data_Ord.compare(Data_Ord.ordString)(x.value0)(y.value0);
        };
        throw new Error("Failed pattern match: " + [ x.constructor.name, y.constructor.name ]);
    };
});
module.exports = {
    ForeignError: ForeignError, 
    TypeMismatch: TypeMismatch, 
    ErrorAtIndex: ErrorAtIndex, 
    ErrorAtProperty: ErrorAtProperty, 
    JSONError: JSONError, 
    fail: fail, 
    readArray: readArray, 
    readBoolean: readBoolean, 
    readChar: readChar, 
    readInt: readInt, 
    readNull: readNull, 
    readNullOrUndefined: readNullOrUndefined, 
    readNumber: readNumber, 
    readString: readString, 
    readUndefined: readUndefined, 
    renderForeignError: renderForeignError, 
    unsafeReadTagged: unsafeReadTagged, 
    eqForeignError: eqForeignError, 
    ordForeignError: ordForeignError, 
    showForeignError: showForeignError, 
    isArray: $foreign.isArray, 
    isNull: $foreign.isNull, 
    isUndefined: $foreign.isUndefined, 
    tagOf: $foreign.tagOf, 
    toForeign: $foreign.toForeign, 
    typeOf: $foreign.typeOf, 
    unsafeFromForeign: $foreign.unsafeFromForeign
};

},{"../Control.Applicative":4,"../Control.Monad.Error.Class":23,"../Control.Monad.Except":25,"../Control.Monad.Except.Trans":24,"../Control.Semigroupoid":37,"../Data.Boolean":53,"../Data.Either":59,"../Data.Eq":61,"../Data.Function":71,"../Data.HeytingAlgebra":76,"../Data.Identity":77,"../Data.Int":81,"../Data.List.NonEmpty":82,"../Data.Maybe":88,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Show":111,"../Data.String":119,"../Prelude":139,"./foreign":67}],69:[function(require,module,exports){
"use strict";

// module Data.Function.Uncurried

exports.mkFn0 = function (fn) {
  return function () {
    return fn({});
  };
};

exports.mkFn2 = function (fn) {
  /* jshint maxparams: 2 */
  return function (a, b) {
    return fn(a)(b);
  };
};

exports.mkFn3 = function (fn) {
  /* jshint maxparams: 3 */
  return function (a, b, c) {
    return fn(a)(b)(c);
  };
};

exports.mkFn4 = function (fn) {
  /* jshint maxparams: 4 */
  return function (a, b, c, d) {
    return fn(a)(b)(c)(d);
  };
};

exports.mkFn5 = function (fn) {
  /* jshint maxparams: 5 */
  return function (a, b, c, d, e) {
    return fn(a)(b)(c)(d)(e);
  };
};

exports.mkFn6 = function (fn) {
  /* jshint maxparams: 6 */
  return function (a, b, c, d, e, f) {
    return fn(a)(b)(c)(d)(e)(f);
  };
};

exports.mkFn7 = function (fn) {
  /* jshint maxparams: 7 */
  return function (a, b, c, d, e, f, g) {
    return fn(a)(b)(c)(d)(e)(f)(g);
  };
};

exports.mkFn8 = function (fn) {
  /* jshint maxparams: 8 */
  return function (a, b, c, d, e, f, g, h) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h);
  };
};

exports.mkFn9 = function (fn) {
  /* jshint maxparams: 9 */
  return function (a, b, c, d, e, f, g, h, i) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i);
  };
};

exports.mkFn10 = function (fn) {
  /* jshint maxparams: 10 */
  return function (a, b, c, d, e, f, g, h, i, j) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i)(j);
  };
};

exports.runFn0 = function (fn) {
  return fn();
};

exports.runFn2 = function (fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
};

exports.runFn3 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
};

exports.runFn4 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

exports.runFn5 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return fn(a, b, c, d, e);
          };
        };
      };
    };
  };
};

exports.runFn6 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return fn(a, b, c, d, e, f);
            };
          };
        };
      };
    };
  };
};

exports.runFn7 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return fn(a, b, c, d, e, f, g);
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn8 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return fn(a, b, c, d, e, f, g, h);
                };
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn9 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return fn(a, b, c, d, e, f, g, h, i);
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn10 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return function (j) {
                      return fn(a, b, c, d, e, f, g, h, i, j);
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};

},{}],70:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var runFn1 = function (f) {
    return f;
};
var mkFn1 = function (f) {
    return f;
};
module.exports = {
    mkFn1: mkFn1, 
    runFn1: runFn1, 
    mkFn0: $foreign.mkFn0, 
    mkFn10: $foreign.mkFn10, 
    mkFn2: $foreign.mkFn2, 
    mkFn3: $foreign.mkFn3, 
    mkFn4: $foreign.mkFn4, 
    mkFn5: $foreign.mkFn5, 
    mkFn6: $foreign.mkFn6, 
    mkFn7: $foreign.mkFn7, 
    mkFn8: $foreign.mkFn8, 
    mkFn9: $foreign.mkFn9, 
    runFn0: $foreign.runFn0, 
    runFn10: $foreign.runFn10, 
    runFn2: $foreign.runFn2, 
    runFn3: $foreign.runFn3, 
    runFn4: $foreign.runFn4, 
    runFn5: $foreign.runFn5, 
    runFn6: $foreign.runFn6, 
    runFn7: $foreign.runFn7, 
    runFn8: $foreign.runFn8, 
    runFn9: $foreign.runFn9
};

},{"../Data.Unit":127,"./foreign":69}],71:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var on = function (f) {
    return function (g) {
        return function (x) {
            return function (y) {
                return f(g(x))(g(y));
            };
        };
    };
};
var flip = function (f) {
    return function (b) {
        return function (a) {
            return f(a)(b);
        };
    };
};
var $$const = function (a) {
    return function (v) {
        return a;
    };
};
var applyFlipped = function (x) {
    return function (f) {
        return f(x);
    };
};
var apply = function (f) {
    return function (x) {
        return f(x);
    };
};
module.exports = {
    apply: apply, 
    applyFlipped: applyFlipped, 
    "const": $$const, 
    flip: flip, 
    on: on
};

},{"../Control.Category":11}],72:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Functor = require("../Data.Functor");
var Invariant = function (imap) {
    this.imap = imap;
};
var imapF = function (dictFunctor) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictFunctor)(f);
        };
    };
};
var invariantArray = new Invariant(imapF(Data_Functor.functorArray));
var invariantFn = new Invariant(imapF(Data_Functor.functorFn));
var imap = function (dict) {
    return dict.imap;
};
module.exports = {
    Invariant: Invariant, 
    imap: imap, 
    imapF: imapF, 
    invariantFn: invariantFn, 
    invariantArray: invariantArray
};

},{"../Data.Functor":74}],73:[function(require,module,exports){
"use strict";

exports.arrayMap = function (f) {
  return function (arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

},{}],74:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Unit = require("../Data.Unit");
var Functor = function (map) {
    this.map = map;
};
var map = function (dict) {
    return dict.map;
};
var mapFlipped = function (dictFunctor) {
    return function (fa) {
        return function (f) {
            return map(dictFunctor)(f)(fa);
        };
    };
};
var $$void = function (dictFunctor) {
    return map(dictFunctor)(Data_Function["const"](Data_Unit.unit));
};
var voidLeft = function (dictFunctor) {
    return function (f) {
        return function (x) {
            return map(dictFunctor)(Data_Function["const"](x))(f);
        };
    };
};
var voidRight = function (dictFunctor) {
    return function (x) {
        return map(dictFunctor)(Data_Function["const"](x));
    };
};
var functorFn = new Functor(Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn));
var functorArray = new Functor($foreign.arrayMap);
var flap = function (dictFunctor) {
    return function (ff) {
        return function (x) {
            return map(dictFunctor)(function (f) {
                return f(x);
            })(ff);
        };
    };
};
module.exports = {
    Functor: Functor, 
    flap: flap, 
    map: map, 
    mapFlipped: mapFlipped, 
    "void": $$void, 
    voidLeft: voidLeft, 
    voidRight: voidRight, 
    functorFn: functorFn, 
    functorArray: functorArray
};

},{"../Control.Semigroupoid":37,"../Data.Function":71,"../Data.Unit":127,"./foreign":73}],75:[function(require,module,exports){
"use strict";

exports.boolConj = function (b1) {
  return function (b2) {
    return b1 && b2;
  };
};

exports.boolDisj = function (b1) {
  return function (b2) {
    return b1 || b2;
  };
};

exports.boolNot = function (b) {
  return !b;
};

},{}],76:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var HeytingAlgebra = function (conj, disj, ff, implies, not, tt) {
    this.conj = conj;
    this.disj = disj;
    this.ff = ff;
    this.implies = implies;
    this.not = not;
    this.tt = tt;
};
var tt = function (dict) {
    return dict.tt;
};
var not = function (dict) {
    return dict.not;
};
var implies = function (dict) {
    return dict.implies;
};
var heytingAlgebraUnit = new HeytingAlgebra(function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, Data_Unit.unit, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return Data_Unit.unit;
}, Data_Unit.unit);
var ff = function (dict) {
    return dict.ff;
};
var disj = function (dict) {
    return dict.disj;
};
var heytingAlgebraBoolean = new HeytingAlgebra($foreign.boolConj, $foreign.boolDisj, false, function (a) {
    return function (b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
    };
}, $foreign.boolNot, true);
var conj = function (dict) {
    return dict.conj;
};
var heytingAlgebraFunction = function (dictHeytingAlgebra) {
    return new HeytingAlgebra(function (f) {
        return function (g) {
            return function (a) {
                return conj(dictHeytingAlgebra)(f(a))(g(a));
            };
        };
    }, function (f) {
        return function (g) {
            return function (a) {
                return disj(dictHeytingAlgebra)(f(a))(g(a));
            };
        };
    }, function (v) {
        return ff(dictHeytingAlgebra);
    }, function (f) {
        return function (g) {
            return function (a) {
                return implies(dictHeytingAlgebra)(f(a))(g(a));
            };
        };
    }, function (f) {
        return function (a) {
            return not(dictHeytingAlgebra)(f(a));
        };
    }, function (v) {
        return tt(dictHeytingAlgebra);
    });
};
module.exports = {
    HeytingAlgebra: HeytingAlgebra, 
    conj: conj, 
    disj: disj, 
    ff: ff, 
    implies: implies, 
    not: not, 
    tt: tt, 
    heytingAlgebraBoolean: heytingAlgebraBoolean, 
    heytingAlgebraUnit: heytingAlgebraUnit, 
    heytingAlgebraFunction: heytingAlgebraFunction
};

},{"../Data.Unit":127,"./foreign":75}],77:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad = require("../Control.Monad");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Bounded = require("../Data.Bounded");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Eq = require("../Data.Eq");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Field = require("../Data.Field");
var Data_Foldable = require("../Data.Foldable");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Prelude = require("../Prelude");
var Identity = function (x) {
    return x;
};
var showIdentity = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Identity " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semiringIdentity = function (dictSemiring) {
    return dictSemiring;
};
var semigroupIdenity = function (dictSemigroup) {
    return dictSemigroup;
};
var ringIdentity = function (dictRing) {
    return dictRing;
};
var ordIdentity = function (dictOrd) {
    return dictOrd;
};
var newtypeIdentity = new Data_Newtype.Newtype(function (n) {
    return n;
}, Identity);
var monoidIdentity = function (dictMonoid) {
    return dictMonoid;
};
var lazyIdentity = function (dictLazy) {
    return dictLazy;
};
var heytingAlgebraIdentity = function (dictHeytingAlgebra) {
    return dictHeytingAlgebra;
};
var functorIdentity = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var invariantIdentity = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorIdentity));
var foldableIdentity = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
var traversableIdentity = new Data_Traversable.Traversable(function () {
    return foldableIdentity;
}, function () {
    return functorIdentity;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Identity)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Identity)(f(v));
        };
    };
});
var fieldIdentity = function (dictField) {
    return dictField;
};
var extendIdentity = new Control_Extend.Extend(function () {
    return functorIdentity;
}, function (f) {
    return function (m) {
        return f(m);
    };
});
var euclideanRingIdentity = function (dictEuclideanRing) {
    return dictEuclideanRing;
};
var eqIdentity = function (dictEq) {
    return dictEq;
};
var eq1Identity = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqIdentity(dictEq));
});
var ord1Identity = new Data_Ord.Ord1(function () {
    return eq1Identity;
}, function (dictOrd) {
    return Data_Ord.compare(ordIdentity(dictOrd));
});
var comonadIdentity = new Control_Comonad.Comonad(function () {
    return extendIdentity;
}, function (v) {
    return v;
});
var commutativeRingIdentity = function (dictCommutativeRing) {
    return dictCommutativeRing;
};
var boundedIdentity = function (dictBounded) {
    return dictBounded;
};
var booleanAlgebraIdentity = function (dictBooleanAlgebra) {
    return dictBooleanAlgebra;
};
var applyIdentity = new Control_Apply.Apply(function () {
    return functorIdentity;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindIdentity = new Control_Bind.Bind(function () {
    return applyIdentity;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeIdentity = new Control_Applicative.Applicative(function () {
    return applyIdentity;
}, Identity);
var monadIdentity = new Control_Monad.Monad(function () {
    return applicativeIdentity;
}, function () {
    return bindIdentity;
});
var altIdentity = new Control_Alt.Alt(function () {
    return functorIdentity;
}, function (x) {
    return function (v) {
        return x;
    };
});
module.exports = {
    Identity: Identity, 
    newtypeIdentity: newtypeIdentity, 
    eqIdentity: eqIdentity, 
    ordIdentity: ordIdentity, 
    boundedIdentity: boundedIdentity, 
    heytingAlgebraIdentity: heytingAlgebraIdentity, 
    booleanAlgebraIdentity: booleanAlgebraIdentity, 
    semigroupIdenity: semigroupIdenity, 
    monoidIdentity: monoidIdentity, 
    semiringIdentity: semiringIdentity, 
    euclideanRingIdentity: euclideanRingIdentity, 
    ringIdentity: ringIdentity, 
    commutativeRingIdentity: commutativeRingIdentity, 
    fieldIdentity: fieldIdentity, 
    lazyIdentity: lazyIdentity, 
    showIdentity: showIdentity, 
    eq1Identity: eq1Identity, 
    ord1Identity: ord1Identity, 
    functorIdentity: functorIdentity, 
    invariantIdentity: invariantIdentity, 
    altIdentity: altIdentity, 
    applyIdentity: applyIdentity, 
    applicativeIdentity: applicativeIdentity, 
    bindIdentity: bindIdentity, 
    monadIdentity: monadIdentity, 
    extendIdentity: extendIdentity, 
    comonadIdentity: comonadIdentity, 
    foldableIdentity: foldableIdentity, 
    traversableIdentity: traversableIdentity
};

},{"../Control.Alt":2,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Lazy":14,"../Control.Monad":35,"../Data.BooleanAlgebra":52,"../Data.Bounded":55,"../Data.CommutativeRing":58,"../Data.Eq":61,"../Data.EuclideanRing":63,"../Data.Field":64,"../Data.Foldable":66,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.HeytingAlgebra":76,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Ring":105,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Data.Traversable":121,"../Prelude":139}],78:[function(require,module,exports){
"use strict";

// module Data.Int.Bits

exports.and = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 & n2;
  };
};

exports.or = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 | n2;
  };
};

exports.xor = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 ^ n2;
  };
};

exports.shl = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 << n2;
  };
};

exports.shr = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 >> n2;
  };
};

exports.zshr = function (n1) {
  return function (n2) {
    /* jshint bitwise: false */
    return n1 >>> n2;
  };
};

exports.complement = function (n) {
  /* jshint bitwise: false */
  return ~n;
};

},{}],79:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
module.exports = {
    and: $foreign.and, 
    complement: $foreign.complement, 
    or: $foreign.or, 
    shl: $foreign.shl, 
    shr: $foreign.shr, 
    xor: $foreign.xor, 
    zshr: $foreign.zshr
};

},{"./foreign":78}],80:[function(require,module,exports){
"use strict";

// module Data.Int

exports.fromNumberImpl = function (just) {
  return function (nothing) {
    return function (n) {
      /* jshint bitwise: false */
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};

exports.toNumber = function (n) {
  return n;
};

exports.fromStringAsImpl = function (just) {
  return function (nothing) {
    return function (radix) {
      var digits;
      if (radix < 11) {
        digits = "[0-" + (radix - 1).toString() + "]";
      } else if (radix === 11) {
        digits = "[0-9a]";
      } else {
        digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
      }
      var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");

      return function (s) {
        /* jshint bitwise: false */
        if (pattern.test(s)) {
          var i = parseInt(s, radix);
          return (i | 0) === i ? just(i) : nothing;
        } else {
          return nothing;
        }
      };
    };
  };
};

exports.toStringAs = function (radix) {
  return function (i) {
    return i.toString(radix);
  };
};

exports.pow = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return Math.pow(x,y) | 0;
  };
};

},{}],81:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Boolean = require("../Data.Boolean");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Int_Bits = require("../Data.Int.Bits");
var Data_Maybe = require("../Data.Maybe");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Global = require("../Global");
var $$Math = require("../Math");
var Prelude = require("../Prelude");
var Radix = function (x) {
    return x;
};
var radix = function (n) {
    if (n >= 2 && n <= 36) {
        return new Data_Maybe.Just(n);
    };
    if (Data_Boolean.otherwise) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Int line 124, column 1 - line 125, column 38: " + [ n.constructor.name ]);
};
var odd = function (x) {
    return (x & 1) !== 0;
};
var octal = 8;
var hexadecimal = 16;
var fromStringAs = $foreign.fromStringAsImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var fromString = fromStringAs(10);
var fromNumber = $foreign.fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var unsafeClamp = function (x) {
    if (x === Global.infinity) {
        return 0;
    };
    if (x === -Global.infinity) {
        return 0;
    };
    if (x >= $foreign.toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
        return Data_Bounded.top(Data_Bounded.boundedInt);
    };
    if (x <= $foreign.toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
        return Data_Bounded.bottom(Data_Bounded.boundedInt);
    };
    if (Data_Boolean.otherwise) {
        return Data_Maybe.fromMaybe(0)(fromNumber(x));
    };
    throw new Error("Failed pattern match at Data.Int line 63, column 1 - line 68, column 43: " + [ x.constructor.name ]);
};
var round = function ($2) {
    return unsafeClamp($$Math.round($2));
};
var floor = function ($3) {
    return unsafeClamp($$Math.floor($3));
};
var even = function (x) {
    return (x & 1) === 0;
};
var decimal = 10;
var ceil = function ($4) {
    return unsafeClamp($$Math.ceil($4));
};
var binary = 2;
var base36 = 36;
module.exports = {
    base36: base36, 
    binary: binary, 
    ceil: ceil, 
    decimal: decimal, 
    even: even, 
    floor: floor, 
    fromNumber: fromNumber, 
    fromString: fromString, 
    fromStringAs: fromStringAs, 
    hexadecimal: hexadecimal, 
    octal: octal, 
    odd: odd, 
    radix: radix, 
    round: round, 
    pow: $foreign.pow, 
    toNumber: $foreign.toNumber, 
    toStringAs: $foreign.toStringAs
};

},{"../Control.Semigroupoid":37,"../Data.Boolean":53,"../Data.Bounded":55,"../Data.Eq":61,"../Data.HeytingAlgebra":76,"../Data.Int.Bits":79,"../Data.Maybe":88,"../Data.Ord":102,"../Data.Ring":105,"../Global":131,"../Math":134,"../Prelude":139,"./foreign":80}],82:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Prelude = require("../Prelude");
var uncons = function (v) {
    return {
        head: v.value0, 
        tail: v.value1
    };
};
var toList = function (v) {
    return new Data_List_Types.Cons(v.value0, v.value1);
};
var toUnfoldable = function (dictUnfoldable) {
    return function ($41) {
        return Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
            return Data_Functor.map(Data_Maybe.functorMaybe)(function (rec) {
                return new Data_Tuple.Tuple(rec.head, rec.tail);
            })(Data_List.uncons(xs));
        })(toList($41));
    };
};
var tail = function (v) {
    return v.value1;
};
var singleton = function ($42) {
    return Data_List_Types.NonEmptyList(Data_NonEmpty.singleton(Data_List_Types.plusList)($42));
};
var length = function (v) {
    return 1 + Data_List.length(v.value1) | 0;
};
var last = function (v) {
    return Data_Maybe.fromMaybe(v.value0)(Data_List.last(v.value1));
};
var init = function (v) {
    return Data_Maybe.maybe(Data_List_Types.Nil.value)(function (v1) {
        return new Data_List_Types.Cons(v.value0, v1);
    })(Data_List.init(v.value1));
};
var head = function (v) {
    return v.value0;
};
var fromList = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just(new Data_NonEmpty.NonEmpty(v.value0, v.value1));
    };
    throw new Error("Failed pattern match at Data.List.NonEmpty line 38, column 1 - line 38, column 25: " + [ v.constructor.name ]);
};
var fromFoldable = function (dictFoldable) {
    return function ($43) {
        return fromList(Data_List.fromFoldable(dictFoldable)($43));
    };
};
var concatMap = Data_Function.flip(Control_Bind.bind(Data_List_Types.bindNonEmptyList));
var appendFoldable = function (dictFoldable) {
    return function (v) {
        return function (ys) {
            return new Data_NonEmpty.NonEmpty(v.value0, Data_Semigroup.append(Data_List_Types.semigroupList)(v.value1)(Data_List.fromFoldable(dictFoldable)(ys)));
        };
    };
};
module.exports = {
    appendFoldable: appendFoldable, 
    concatMap: concatMap, 
    fromFoldable: fromFoldable, 
    fromList: fromList, 
    head: head, 
    init: init, 
    last: last, 
    length: length, 
    singleton: singleton, 
    tail: tail, 
    toList: toList, 
    toUnfoldable: toUnfoldable, 
    uncons: uncons
};

},{"../Control.Bind":10,"../Control.Semigroupoid":37,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.List":84,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.NonEmpty":98,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Tuple":123,"../Data.Unfoldable":125,"../Prelude":139}],83:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Prelude = require("../Prelude");
var Nil = (function () {
    function Nil() {

    };
    Nil.value = new Nil();
    return Nil;
})();
var Cons = (function () {
    function Cons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cons.create = function (value0) {
        return function (value1) {
            return new Cons(value0, value1);
        };
    };
    return Cons;
})();
var NonEmptyList = function (x) {
    return x;
};
var toList = function (v) {
    return new Cons(v.value0, v.value1);
};
var newtypeNonEmptyList = new Data_Newtype.Newtype(function (n) {
    return n;
}, NonEmptyList);
var foldableList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldl(foldableList)(function (acc) {
            return function ($116) {
                return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f($116));
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
}, function (f) {
    var go = function (__copy_b) {
        return function (__copy_v) {
            var __tco_b = __copy_b;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(b, v) {
                if (v instanceof Nil) {
                    __tco_done = true;
                    return b;
                };
                if (v instanceof Cons) {
                    __tco_b = f(b)(v.value0);
                    __copy_v = v.value1;
                    return;
                };
                throw new Error("Failed pattern match at Data.List.Types line 76, column 12 - line 78, column 30: " + [ v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_b, __copy_v);
            };
            return __tco_result;
        };
    };
    return go;
}, function (f) {
    return function (b) {
        var rev = function (__copy_acc) {
            return function (__copy_v) {
                var __tco_acc = __copy_acc;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(acc, v) {
                    if (v instanceof Nil) {
                        __tco_done = true;
                        return acc;
                    };
                    if (v instanceof Cons) {
                        __tco_acc = new Cons(v.value0, acc);
                        __copy_v = v.value1;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.List.Types line 71, column 15 - line 73, column 33: " + [ v.constructor.name ]);
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_acc, __copy_v);
                };
                return __tco_result;
            };
        };
        return function ($117) {
            return Data_Foldable.foldl(foldableList)(Data_Function.flip(f))(b)(rev(Nil.value)($117));
        };
    };
});
var foldableNonEmptyList = Data_NonEmpty.foldableNonEmpty(foldableList);
var functorList = new Data_Functor.Functor(function (f) {
    return Data_Foldable.foldr(foldableList)(function (x) {
        return function (acc) {
            return new Cons(f(x), acc);
        };
    })(Nil.value);
});
var functorNonEmptyList = Data_NonEmpty.functorNonEmpty(functorList);
var semigroupList = new Data_Semigroup.Semigroup(function (xs) {
    return function (ys) {
        return Data_Foldable.foldr(foldableList)(Cons.create)(ys)(xs);
    };
});
var monoidList = new Data_Monoid.Monoid(function () {
    return semigroupList;
}, Nil.value);
var semigroupNonEmptyList = new Data_Semigroup.Semigroup(function (v) {
    return function (as$prime) {
        return new Data_NonEmpty.NonEmpty(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(toList(as$prime)));
    };
});
var showList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        if (v instanceof Nil) {
            return "Nil";
        };
        return "(" + (Data_Foldable.intercalate(foldableList)(Data_Monoid.monoidString)(" : ")(Data_Functor.map(functorList)(Data_Show.show(dictShow))(v)) + " : Nil)");
    });
};
var showNonEmptyList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(NonEmptyList " + (Data_Show.show(Data_NonEmpty.showNonEmpty(dictShow)(showList(dictShow)))(v) + ")");
    });
};
var traversableList = new Data_Traversable.Traversable(function () {
    return foldableList;
}, function () {
    return functorList;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableList)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return function ($118) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Foldable.foldl(foldableList)(Data_Function.flip(Cons.create))(Nil.value))(Data_Foldable.foldl(foldableList)(function (acc) {
                return function ($119) {
                    return Control_Apply.lift2(dictApplicative.Apply0())(Data_Function.flip(Cons.create))(acc)(f($119));
                };
            })(Control_Applicative.pure(dictApplicative)(Nil.value))($118));
        };
    };
});
var traversableNonEmptyList = Data_NonEmpty.traversableNonEmpty(traversableList);
var unfoldableList = new Data_Unfoldable.Unfoldable(function (f) {
    return function (b) {
        var go = function (__copy_source) {
            return function (__copy_memo) {
                var __tco_source = __copy_source;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(source, memo) {
                    var v = f(source);
                    if (v instanceof Data_Maybe.Nothing) {
                        __tco_done = true;
                        return Data_Foldable.foldl(foldableList)(Data_Function.flip(Cons.create))(Nil.value)(memo);
                    };
                    if (v instanceof Data_Maybe.Just) {
                        __tco_source = v.value0.value1;
                        __copy_memo = new Cons(v.value0.value0, memo);
                        return;
                    };
                    throw new Error("Failed pattern match at Data.List.Types line 84, column 22 - line 86, column 52: " + [ v.constructor.name ]);
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_source, __copy_memo);
                };
                return __tco_result;
            };
        };
        return go(b)(Nil.value);
    };
});
var extendNonEmptyList = new Control_Extend.Extend(function () {
    return functorNonEmptyList;
}, function (f) {
    return function (v) {
        var go = function (a) {
            return function (v1) {
                return {
                    val: new Cons(f(new Data_NonEmpty.NonEmpty(a, v1.acc)), v1.val), 
                    acc: new Cons(a, v1.acc)
                };
            };
        };
        return new Data_NonEmpty.NonEmpty(f(v), (Data_Foldable.foldr(foldableList)(go)({
            val: Nil.value, 
            acc: Nil.value
        })(v.value1)).val);
    };
});
var extendList = new Control_Extend.Extend(function () {
    return functorList;
}, function (f) {
    return function (v) {
        if (v instanceof Nil) {
            return Nil.value;
        };
        if (v instanceof Cons) {
            var go = function (a$prime) {
                return function (v1) {
                    var acc$prime = new Cons(a$prime, v1.acc);
                    return {
                        val: new Cons(f(acc$prime), v1.val), 
                        acc: acc$prime
                    };
                };
            };
            return new Cons(f(v), (Data_Foldable.foldr(foldableList)(go)({
                val: Nil.value, 
                acc: Nil.value
            })(v.value1)).val);
        };
        throw new Error("Failed pattern match at Data.List.Types line 118, column 3 - line 118, column 21: " + [ f.constructor.name, v.constructor.name ]);
    };
});
var eq1List = new Data_Eq.Eq1(function (dictEq) {
    return function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    return function (__copy_v2) {
                        var __tco_v = __copy_v;
                        var __tco_v1 = __copy_v1;
                        var __tco_done = false;
                        var __tco_result;
                        function __tco_loop(v, v1, v2) {
                            if (!v2) {
                                __tco_done = true;
                                return false;
                            };
                            if (v instanceof Nil && v1 instanceof Nil) {
                                __tco_done = true;
                                return v2;
                            };
                            if (v instanceof Cons && v1 instanceof Cons) {
                                __tco_v = v.value1;
                                __tco_v1 = v1.value1;
                                __copy_v2 = v2 && Data_Eq.eq(dictEq)(v1.value0)(v.value0);
                                return;
                            };
                            __tco_done = true;
                            return false;
                        };
                        while (!__tco_done) {
                            __tco_result = __tco_loop(__tco_v, __tco_v1, __copy_v2);
                        };
                        return __tco_result;
                    };
                };
            };
            return go(xs)(ys)(true);
        };
    };
});
var eqList = function (dictEq) {
    return new Data_Eq.Eq(Data_Eq.eq1(eq1List)(dictEq));
};
var eqNonEmptyList = function (dictEq) {
    return Data_NonEmpty.eqNonEmpty(eq1List)(dictEq);
};
var ord1List = new Data_Ord.Ord1(function () {
    return eq1List;
}, function (dictOrd) {
    return function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    var __tco_v = __copy_v;
                    var __tco_done = false;
                    var __tco_result;
                    function __tco_loop(v, v1) {
                        if (v instanceof Nil && v1 instanceof Nil) {
                            __tco_done = true;
                            return Data_Ordering.EQ.value;
                        };
                        if (v instanceof Nil) {
                            __tco_done = true;
                            return Data_Ordering.LT.value;
                        };
                        if (v1 instanceof Nil) {
                            __tco_done = true;
                            return Data_Ordering.GT.value;
                        };
                        if (v instanceof Cons && v1 instanceof Cons) {
                            var v2 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
                            if (v2 instanceof Data_Ordering.EQ) {
                                __tco_v = v.value1;
                                __copy_v1 = v1.value1;
                                return;
                            };
                            __tco_done = true;
                            return v2;
                        };
                        throw new Error("Failed pattern match at Data.List.Types line 49, column 20 - line 57, column 23: " + [ v.constructor.name, v1.constructor.name ]);
                    };
                    while (!__tco_done) {
                        __tco_result = __tco_loop(__tco_v, __copy_v1);
                    };
                    return __tco_result;
                };
            };
            return go(xs)(ys);
        };
    };
});
var ordList = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqList(dictOrd.Eq0());
    }, Data_Ord.compare1(ord1List)(dictOrd));
};
var ordNonEmptyList = function (dictOrd) {
    return Data_NonEmpty.ordNonEmpty(ord1List)(dictOrd);
};
var comonadNonEmptyList = new Control_Comonad.Comonad(function () {
    return extendNonEmptyList;
}, function (v) {
    return v.value0;
});
var applyList = new Control_Apply.Apply(function () {
    return functorList;
}, function (v) {
    return function (v1) {
        if (v instanceof Nil) {
            return Nil.value;
        };
        if (v instanceof Cons) {
            return Data_Semigroup.append(semigroupList)(Data_Functor.map(functorList)(v.value0)(v1))(Control_Apply.apply(applyList)(v.value1)(v1));
        };
        throw new Error("Failed pattern match at Data.List.Types line 93, column 3 - line 93, column 20: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var applyNonEmptyList = new Control_Apply.Apply(function () {
    return functorNonEmptyList;
}, function (v) {
    return function (v1) {
        return new Data_NonEmpty.NonEmpty(v.value0(v1.value0), Data_Semigroup.append(semigroupList)(Control_Apply.apply(applyList)(v.value1)(new Cons(v1.value0, Nil.value)))(Control_Apply.apply(applyList)(new Cons(v.value0, v.value1))(v1.value1)));
    };
});
var bindList = new Control_Bind.Bind(function () {
    return applyList;
}, function (v) {
    return function (v1) {
        if (v instanceof Nil) {
            return Nil.value;
        };
        if (v instanceof Cons) {
            return Data_Semigroup.append(semigroupList)(v1(v.value0))(Control_Bind.bind(bindList)(v.value1)(v1));
        };
        throw new Error("Failed pattern match at Data.List.Types line 100, column 3 - line 100, column 19: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var bindNonEmptyList = new Control_Bind.Bind(function () {
    return applyNonEmptyList;
}, function (v) {
    return function (f) {
        var v1 = f(v.value0);
        return new Data_NonEmpty.NonEmpty(v1.value0, Data_Semigroup.append(semigroupList)(v1.value1)(Control_Bind.bind(bindList)(v.value1)(function ($120) {
            return toList(f($120));
        })));
    };
});
var applicativeList = new Control_Applicative.Applicative(function () {
    return applyList;
}, function (a) {
    return new Cons(a, Nil.value);
});
var monadList = new Control_Monad.Monad(function () {
    return applicativeList;
}, function () {
    return bindList;
});
var altNonEmptyList = new Control_Alt.Alt(function () {
    return functorNonEmptyList;
}, Data_Semigroup.append(semigroupNonEmptyList));
var altList = new Control_Alt.Alt(function () {
    return functorList;
}, Data_Semigroup.append(semigroupList));
var plusList = new Control_Plus.Plus(function () {
    return altList;
}, Nil.value);
var alternativeList = new Control_Alternative.Alternative(function () {
    return applicativeList;
}, function () {
    return plusList;
});
var monadZeroList = new Control_MonadZero.MonadZero(function () {
    return alternativeList;
}, function () {
    return monadList;
});
var monadPlusList = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroList;
});
var applicativeNonEmptyList = new Control_Applicative.Applicative(function () {
    return applyNonEmptyList;
}, function ($121) {
    return NonEmptyList(Data_NonEmpty.singleton(plusList)($121));
});
var monadNonEmptyList = new Control_Monad.Monad(function () {
    return applicativeNonEmptyList;
}, function () {
    return bindNonEmptyList;
});
module.exports = {
    Nil: Nil, 
    Cons: Cons, 
    NonEmptyList: NonEmptyList, 
    toList: toList, 
    showList: showList, 
    eqList: eqList, 
    eq1List: eq1List, 
    ordList: ordList, 
    ord1List: ord1List, 
    semigroupList: semigroupList, 
    monoidList: monoidList, 
    functorList: functorList, 
    foldableList: foldableList, 
    unfoldableList: unfoldableList, 
    traversableList: traversableList, 
    applyList: applyList, 
    applicativeList: applicativeList, 
    bindList: bindList, 
    monadList: monadList, 
    altList: altList, 
    plusList: plusList, 
    alternativeList: alternativeList, 
    monadZeroList: monadZeroList, 
    monadPlusList: monadPlusList, 
    extendList: extendList, 
    newtypeNonEmptyList: newtypeNonEmptyList, 
    eqNonEmptyList: eqNonEmptyList, 
    ordNonEmptyList: ordNonEmptyList, 
    showNonEmptyList: showNonEmptyList, 
    functorNonEmptyList: functorNonEmptyList, 
    applyNonEmptyList: applyNonEmptyList, 
    applicativeNonEmptyList: applicativeNonEmptyList, 
    bindNonEmptyList: bindNonEmptyList, 
    monadNonEmptyList: monadNonEmptyList, 
    altNonEmptyList: altNonEmptyList, 
    extendNonEmptyList: extendNonEmptyList, 
    comonadNonEmptyList: comonadNonEmptyList, 
    semigroupNonEmptyList: semigroupNonEmptyList, 
    foldableNonEmptyList: foldableNonEmptyList, 
    traversableNonEmptyList: traversableNonEmptyList
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":35,"../Control.MonadPlus":33,"../Control.MonadZero":34,"../Control.Plus":36,"../Control.Semigroupoid":37,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.NonEmpty":98,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Show":111,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unfoldable":125,"../Prelude":139}],84:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var updateAt = function (v) {
    return function (v1) {
        return function (v2) {
            if (v === 0 && v2 instanceof Data_List_Types.Cons) {
                return new Data_Maybe.Just(new Data_List_Types.Cons(v1, v2.value1));
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                    return new Data_List_Types.Cons(v2.value0, v3);
                })(updateAt(v - 1 | 0)(v1)(v2.value1));
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var unzip = Data_Foldable.foldr(Data_List_Types.foldableList)(function (v) {
    return function (v1) {
        return new Data_Tuple.Tuple(new Data_List_Types.Cons(v.value0, v1.value0), new Data_List_Types.Cons(v.value1, v1.value1));
    };
})(new Data_Tuple.Tuple(Data_List_Types.Nil.value, Data_List_Types.Nil.value));
var uncons = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just({
            head: v.value0, 
            tail: v.value1
        });
    };
    throw new Error("Failed pattern match at Data.List line 253, column 1 - line 253, column 21: " + [ v.constructor.name ]);
};
var toUnfoldable = function (dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (rec) {
            return new Data_Tuple.Tuple(rec.head, rec.tail);
        })(uncons(xs));
    });
};
var tail = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just(v.value1);
    };
    throw new Error("Failed pattern match at Data.List line 239, column 1 - line 239, column 19: " + [ v.constructor.name ]);
};
var span = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Cons && v(v1.value0)) {
            var v2 = span(v)(v1.value1);
            return {
                init: new Data_List_Types.Cons(v1.value0, v2.init), 
                rest: v2.rest
            };
        };
        return {
            init: Data_List_Types.Nil.value, 
            rest: v1
        };
    };
};
var singleton = function (a) {
    return new Data_List_Types.Cons(a, Data_List_Types.Nil.value);
};
var sortBy = function (cmp) {
    var merge = function (v) {
        return function (v1) {
            if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
                if (Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1.value0))(Data_Ordering.GT.value)) {
                    return new Data_List_Types.Cons(v1.value0, merge(v)(v1.value1));
                };
                if (Data_Boolean.otherwise) {
                    return new Data_List_Types.Cons(v.value0, merge(v.value1)(v1));
                };
            };
            if (v instanceof Data_List_Types.Nil) {
                return v1;
            };
            if (v1 instanceof Data_List_Types.Nil) {
                return v;
            };
            throw new Error("Failed pattern match at Data.List line 468, column 3 - line 470, column 41: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
    var mergePairs = function (v) {
        if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Cons) {
            return new Data_List_Types.Cons(merge(v.value0)(v.value1.value0), mergePairs(v.value1.value1));
        };
        return v;
    };
    var mergeAll = function (__copy_v) {
        var __tco_done = false;
        var __tco_result;
        function __tco_loop(v) {
            if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
                __tco_done = true;
                return v.value0;
            };
            __copy_v = mergePairs(v);
            return;
        };
        while (!__tco_done) {
            __tco_result = __tco_loop(__copy_v);
        };
        return __tco_result;
    };
    var sequences = function (v) {
        if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Cons) {
            if (Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v.value1.value0))(Data_Ordering.GT.value)) {
                return descending(v.value1.value0)(singleton(v.value0))(v.value1.value1);
            };
            if (Data_Boolean.otherwise) {
                return ascending(v.value1.value0)(function (v1) {
                    return new Data_List_Types.Cons(v.value0, v1);
                })(v.value1.value1);
            };
        };
        return singleton(v);
    };
    var descending = function (__copy_a) {
        return function (__copy_as) {
            return function (__copy_v) {
                var __tco_a = __copy_a;
                var __tco_as = __copy_as;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(a, as, v) {
                    if (v instanceof Data_List_Types.Cons && Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(a)(v.value0))(Data_Ordering.GT.value)) {
                        __tco_a = v.value0;
                        __tco_as = new Data_List_Types.Cons(a, as);
                        __copy_v = v.value1;
                        return;
                    };
                    __tco_done = true;
                    return new Data_List_Types.Cons(new Data_List_Types.Cons(a, as), sequences(v));
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_a, __tco_as, __copy_v);
                };
                return __tco_result;
            };
        };
    };
    var ascending = function (__copy_a) {
        return function (__copy_as) {
            return function (__copy_v) {
                var __tco_a = __copy_a;
                var __tco_as = __copy_as;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(a, as, v) {
                    if (v instanceof Data_List_Types.Cons && Data_Eq.notEq(Data_Ordering.eqOrdering)(cmp(a)(v.value0))(Data_Ordering.GT.value)) {
                        __tco_a = v.value0;
                        __tco_as = function (ys) {
                            return as(new Data_List_Types.Cons(a, ys));
                        };
                        __copy_v = v.value1;
                        return;
                    };
                    __tco_done = true;
                    return new Data_List_Types.Cons(as(singleton(a)), sequences(v));
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_a, __tco_as, __copy_v);
                };
                return __tco_result;
            };
        };
    };
    return function ($304) {
        return mergeAll(sequences($304));
    };
};
var sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
var reverse = (function () {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var __tco_acc = __copy_acc;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(acc, v) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return acc;
                };
                if (v instanceof Data_List_Types.Cons) {
                    __tco_acc = new Data_List_Types.Cons(v.value0, acc);
                    __copy_v = v.value1;
                    return;
                };
                throw new Error("Failed pattern match at Data.List line 359, column 11 - line 362, column 36: " + [ acc.constructor.name, v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_acc, __copy_v);
            };
            return __tco_result;
        };
    };
    return go(Data_List_Types.Nil.value);
})();
var snoc = function (xs) {
    return function (x) {
        return reverse(new Data_List_Types.Cons(x, reverse(xs)));
    };
};
var take = (function () {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            return function (__copy_v1) {
                var __tco_acc = __copy_acc;
                var __tco_v = __copy_v;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(acc, v, v1) {
                    if (v === 0) {
                        __tco_done = true;
                        return reverse(acc);
                    };
                    if (v1 instanceof Data_List_Types.Nil) {
                        __tco_done = true;
                        return reverse(acc);
                    };
                    if (v1 instanceof Data_List_Types.Cons) {
                        __tco_acc = new Data_List_Types.Cons(v1.value0, acc);
                        __tco_v = v - 1 | 0;
                        __copy_v1 = v1.value1;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.List line 486, column 8 - line 490, column 46: " + [ acc.constructor.name, v.constructor.name, v1.constructor.name ]);
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_acc, __tco_v, __copy_v1);
                };
                return __tco_result;
            };
        };
    };
    return go(Data_List_Types.Nil.value);
})();
var takeWhile = function (p) {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var __tco_acc = __copy_acc;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(acc, v) {
                if (v instanceof Data_List_Types.Cons && p(v.value0)) {
                    __tco_acc = new Data_List_Types.Cons(v.value0, acc);
                    __copy_v = v.value1;
                    return;
                };
                __tco_done = true;
                return reverse(acc);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_acc, __copy_v);
            };
            return __tco_result;
        };
    };
    return go(Data_List_Types.Nil.value);
};
var unsnoc = function (lst) {
    var go = function (__copy_v) {
        return function (__copy_acc) {
            var __tco_v = __copy_v;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(v, acc) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return new Data_Maybe.Just({
                        revInit: acc, 
                        last: v.value0
                    });
                };
                if (v instanceof Data_List_Types.Cons) {
                    __tco_v = v.value1;
                    __copy_acc = new Data_List_Types.Cons(v.value0, acc);
                    return;
                };
                throw new Error("Failed pattern match at Data.List line 261, column 14 - line 265, column 36: " + [ v.constructor.name, acc.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_v, __copy_acc);
            };
            return __tco_result;
        };
    };
    return Data_Functor.map(Data_Maybe.functorMaybe)(function (h) {
        return {
            init: reverse(h.revInit), 
            last: h.last
        };
    })(go(lst)(Data_List_Types.Nil.value));
};
var zipWith = function (f) {
    return function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    return function (__copy_acc) {
                        var __tco_v = __copy_v;
                        var __tco_v1 = __copy_v1;
                        var __tco_done = false;
                        var __tco_result;
                        function __tco_loop(v, v1, acc) {
                            if (v instanceof Data_List_Types.Nil) {
                                __tco_done = true;
                                return acc;
                            };
                            if (v1 instanceof Data_List_Types.Nil) {
                                __tco_done = true;
                                return acc;
                            };
                            if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
                                __tco_v = v.value1;
                                __tco_v1 = v1.value1;
                                __copy_acc = new Data_List_Types.Cons(f(v.value0)(v1.value0), acc);
                                return;
                            };
                            throw new Error("Failed pattern match at Data.List line 650, column 19 - line 654, column 52: " + [ v.constructor.name, v1.constructor.name, acc.constructor.name ]);
                        };
                        while (!__tco_done) {
                            __tco_result = __tco_loop(__tco_v, __tco_v1, __copy_acc);
                        };
                        return __tco_result;
                    };
                };
            };
            return reverse(go(xs)(ys)(Data_List_Types.Nil.value));
        };
    };
};
var zip = zipWith(Data_Tuple.Tuple.create);
var zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_List_Types.traversableList)(dictApplicative)(zipWith(f)(xs)(ys));
            };
        };
    };
};
var range = function (start) {
    return function (end) {
        if (start === end) {
            return singleton(start);
        };
        if (Data_Boolean.otherwise) {
            var go = function (__copy_s) {
                return function (__copy_e) {
                    return function (__copy_step) {
                        return function (__copy_rest) {
                            var __tco_s = __copy_s;
                            var __tco_e = __copy_e;
                            var __tco_step = __copy_step;
                            var __tco_done = false;
                            var __tco_result;
                            function __tco_loop(s, e, step, rest) {
                                if (s === e) {
                                    __tco_done = true;
                                    return new Data_List_Types.Cons(s, rest);
                                };
                                if (Data_Boolean.otherwise) {
                                    __tco_s = s + step | 0;
                                    __tco_e = e;
                                    __tco_step = step;
                                    __copy_rest = new Data_List_Types.Cons(s, rest);
                                    return;
                                };
                                throw new Error("Failed pattern match at Data.List line 139, column 31 - line 142, column 65: " + [ s.constructor.name, e.constructor.name, step.constructor.name, rest.constructor.name ]);
                            };
                            while (!__tco_done) {
                                __tco_result = __tco_loop(__tco_s, __tco_e, __tco_step, __copy_rest);
                            };
                            return __tco_result;
                        };
                    };
                };
            };
            return go(end)(start)((function () {
                var $195 = start > end;
                if ($195) {
                    return 1;
                };
                return -1 | 0;
            })())(Data_List_Types.Nil.value);
        };
        throw new Error("Failed pattern match at Data.List line 138, column 1 - line 142, column 65: " + [ start.constructor.name, end.constructor.name ]);
    };
};
var $$null = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return true;
    };
    return false;
};
var mapWithIndex = function (f) {
    return function (lst) {
        var go = function (__copy_v) {
            return function (__copy_v1) {
                return function (__copy_acc) {
                    var __tco_v = __copy_v;
                    var __tco_v1 = __copy_v1;
                    var __tco_done = false;
                    var __tco_result;
                    function __tco_loop(v, v1, acc) {
                        if (v1 instanceof Data_List_Types.Nil) {
                            __tco_done = true;
                            return acc;
                        };
                        if (v1 instanceof Data_List_Types.Cons) {
                            __tco_v = v + 1 | 0;
                            __tco_v1 = v1.value1;
                            __copy_acc = new Data_List_Types.Cons(f(v)(v1.value0), acc);
                            return;
                        };
                        throw new Error("Failed pattern match at Data.List line 424, column 22 - line 427, column 48: " + [ v.constructor.name, v1.constructor.name, acc.constructor.name ]);
                    };
                    while (!__tco_done) {
                        __tco_result = __tco_loop(__tco_v, __tco_v1, __copy_acc);
                    };
                    return __tco_result;
                };
            };
        };
        return reverse(go(0)(lst)(Data_List_Types.Nil.value));
    };
};
var mapMaybe = function (f) {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var __tco_acc = __copy_acc;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(acc, v) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return reverse(acc);
                };
                if (v instanceof Data_List_Types.Cons) {
                    var v1 = f(v.value0);
                    if (v1 instanceof Data_Maybe.Nothing) {
                        __tco_acc = acc;
                        __copy_v = v.value1;
                        return;
                    };
                    if (v1 instanceof Data_Maybe.Just) {
                        __tco_acc = new Data_List_Types.Cons(v1.value0, acc);
                        __copy_v = v.value1;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.List line 412, column 5 - line 414, column 32: " + [ v1.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.List line 408, column 14 - line 414, column 32: " + [ acc.constructor.name, v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_acc, __copy_v);
            };
            return __tco_result;
        };
    };
    return go(Data_List_Types.Nil.value);
};
var manyRec = function (dictMonadRec) {
    return function (dictAlternative) {
        return function (p) {
            var go = function (acc) {
                return Control_Bind.bind((dictMonadRec.Monad0()).Bind1())(Control_Alt.alt((dictAlternative.Plus1()).Alt0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Control_Monad_Rec_Class.Loop.create)(p))(Control_Applicative.pure(dictAlternative.Applicative0())(new Control_Monad_Rec_Class.Done(Data_Unit.unit))))(function (v) {
                    return Control_Applicative.pure(dictAlternative.Applicative0())(Data_Bifunctor.bimap(Control_Monad_Rec_Class.bifunctorStep)(function (v1) {
                        return new Data_List_Types.Cons(v1, acc);
                    })(function (v1) {
                        return reverse(acc);
                    })(v));
                });
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)(Data_List_Types.Nil.value);
        };
    };
};
var someRec = function (dictMonadRec) {
    return function (dictAlternative) {
        return function (v) {
            return Control_Apply.apply((dictAlternative.Applicative0()).Apply0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Data_List_Types.Cons.create)(v))(manyRec(dictMonadRec)(dictAlternative)(v));
        };
    };
};
var some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Apply.apply((dictAlternative.Applicative0()).Apply0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Data_List_Types.Cons.create)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
var many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Alt.alt((dictAlternative.Plus1()).Alt0())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative.Applicative0())(Data_List_Types.Nil.value));
        };
    };
};
var length = Data_Foldable.foldl(Data_List_Types.foldableList)(function (acc) {
    return function (v) {
        return acc + 1 | 0;
    };
})(0);
var last = function (__copy_v) {
    var __tco_done = false;
    var __tco_result;
    function __tco_loop(v) {
        if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
            __tco_done = true;
            return new Data_Maybe.Just(v.value0);
        };
        if (v instanceof Data_List_Types.Cons) {
            __copy_v = v.value1;
            return;
        };
        __tco_done = true;
        return Data_Maybe.Nothing.value;
    };
    while (!__tco_done) {
        __tco_result = __tco_loop(__copy_v);
    };
    return __tco_result;
};
var insertBy = function (v) {
    return function (x) {
        return function (v1) {
            if (v1 instanceof Data_List_Types.Nil) {
                return singleton(x);
            };
            if (v1 instanceof Data_List_Types.Cons) {
                var v2 = v(x)(v1.value0);
                if (v2 instanceof Data_Ordering.GT) {
                    return new Data_List_Types.Cons(v1.value0, insertBy(v)(x)(v1.value1));
                };
                return new Data_List_Types.Cons(x, v1);
            };
            throw new Error("Failed pattern match at Data.List line 210, column 1 - line 210, column 31: " + [ v.constructor.name, x.constructor.name, v1.constructor.name ]);
        };
    };
};
var insertAt = function (v) {
    return function (v1) {
        return function (v2) {
            if (v === 0) {
                return new Data_Maybe.Just(new Data_List_Types.Cons(v1, v2));
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                    return new Data_List_Types.Cons(v2.value0, v3);
                })(insertAt(v - 1 | 0)(v1)(v2.value1));
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
var init = function (lst) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
        return v.init;
    })(unsnoc(lst));
};
var index = function (__copy_v) {
    return function (__copy_v1) {
        var __tco_v = __copy_v;
        var __tco_done = false;
        var __tco_result;
        function __tco_loop(v, v1) {
            if (v instanceof Data_List_Types.Nil) {
                __tco_done = true;
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Data_List_Types.Cons && v1 === 0) {
                __tco_done = true;
                return new Data_Maybe.Just(v.value0);
            };
            if (v instanceof Data_List_Types.Cons) {
                __tco_v = v.value1;
                __copy_v1 = v1 - 1 | 0;
                return;
            };
            throw new Error("Failed pattern match at Data.List line 275, column 1 - line 275, column 22: " + [ v.constructor.name, v1.constructor.name ]);
        };
        while (!__tco_done) {
            __tco_result = __tco_loop(__tco_v, __copy_v1);
        };
        return __tco_result;
    };
};
var head = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just(v.value0);
    };
    throw new Error("Failed pattern match at Data.List line 224, column 1 - line 224, column 19: " + [ v.constructor.name ]);
};
var transpose = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_List_Types.Nil.value;
    };
    if (v instanceof Data_List_Types.Cons && v.value0 instanceof Data_List_Types.Nil) {
        return transpose(v.value1);
    };
    if (v instanceof Data_List_Types.Cons && v.value0 instanceof Data_List_Types.Cons) {
        return new Data_List_Types.Cons(new Data_List_Types.Cons(v.value0.value0, mapMaybe(head)(v.value1)), transpose(new Data_List_Types.Cons(v.value0.value1, mapMaybe(tail)(v.value1))));
    };
    throw new Error("Failed pattern match at Data.List line 687, column 1 - line 687, column 20: " + [ v.constructor.name ]);
};
var groupBy = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return Data_List_Types.Nil.value;
        };
        if (v1 instanceof Data_List_Types.Cons) {
            var v2 = span(v(v1.value0))(v1.value1);
            return new Data_List_Types.Cons(new Data_NonEmpty.NonEmpty(v1.value0, v2.init), groupBy(v)(v2.rest));
        };
        throw new Error("Failed pattern match at Data.List line 560, column 1 - line 560, column 20: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var group = function (dictEq) {
    return groupBy(Data_Eq.eq(dictEq));
};
var group$prime = function (dictOrd) {
    return function ($305) {
        return group(dictOrd.Eq0())(sort(dictOrd)($305));
    };
};
var fromFoldable = function (dictFoldable) {
    return Data_Foldable.foldr(dictFoldable)(Data_List_Types.Cons.create)(Data_List_Types.Nil.value);
};
var foldM = function (dictMonad) {
    return function (v) {
        return function (a) {
            return function (v1) {
                if (v1 instanceof Data_List_Types.Nil) {
                    return Control_Applicative.pure(dictMonad.Applicative0())(a);
                };
                if (v1 instanceof Data_List_Types.Cons) {
                    return Control_Bind.bind(dictMonad.Bind1())(v(a)(v1.value0))(function (a$prime) {
                        return foldM(dictMonad)(v)(a$prime)(v1.value1);
                    });
                };
                throw new Error("Failed pattern match at Data.List line 698, column 1 - line 698, column 23: " + [ v.constructor.name, a.constructor.name, v1.constructor.name ]);
            };
        };
    };
};
var findIndex = function (fn) {
    var go = function (__copy_v) {
        return function (__copy_v1) {
            var __tco_v = __copy_v;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(v, v1) {
                if (v1 instanceof Data_List_Types.Cons) {
                    if (fn(v1.value0)) {
                        __tco_done = true;
                        return new Data_Maybe.Just(v);
                    };
                    if (Data_Boolean.otherwise) {
                        __tco_v = v + 1 | 0;
                        __copy_v1 = v1.value1;
                        return;
                    };
                };
                if (v1 instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.List line 295, column 3 - line 296, column 44: " + [ v.constructor.name, v1.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_v, __copy_v1);
            };
            return __tco_result;
        };
    };
    return go(0);
};
var findLastIndex = function (fn) {
    return function (xs) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
            return (length(xs) - 1 | 0) - v | 0;
        })(findIndex(fn)(reverse(xs)));
    };
};
var filterM = function (dictMonad) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Data_List_Types.Nil) {
                return Control_Applicative.pure(dictMonad.Applicative0())(Data_List_Types.Nil.value);
            };
            if (v1 instanceof Data_List_Types.Cons) {
                return Control_Bind.bind(dictMonad.Bind1())(v(v1.value0))(function (v2) {
                    return Control_Bind.bind(dictMonad.Bind1())(filterM(dictMonad)(v)(v1.value1))(function (v3) {
                        return Control_Applicative.pure(dictMonad.Applicative0())((function () {
                            if (v2) {
                                return new Data_List_Types.Cons(v1.value0, v3);
                            };
                            return v3;
                        })());
                    });
                });
            };
            throw new Error("Failed pattern match at Data.List line 397, column 1 - line 397, column 25: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var filter = function (p) {
    var go = function (__copy_acc) {
        return function (__copy_v) {
            var __tco_acc = __copy_acc;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(acc, v) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return reverse(acc);
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (p(v.value0)) {
                        __tco_acc = new Data_List_Types.Cons(v.value0, acc);
                        __copy_v = v.value1;
                        return;
                    };
                    if (Data_Boolean.otherwise) {
                        __tco_acc = acc;
                        __copy_v = v.value1;
                        return;
                    };
                };
                throw new Error("Failed pattern match at Data.List line 381, column 12 - line 386, column 28: " + [ acc.constructor.name, v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_acc, __copy_v);
            };
            return __tco_result;
        };
    };
    return go(Data_List_Types.Nil.value);
};
var intersectBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v1 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            if (v2 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            return filter(function (x) {
                return Data_Foldable.any(Data_List_Types.foldableList)(Data_HeytingAlgebra.heytingAlgebraBoolean)(v(x))(v2);
            })(v1);
        };
    };
};
var intersect = function (dictEq) {
    return intersectBy(Data_Eq.eq(dictEq));
};
var nubBy = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return Data_List_Types.Nil.value;
        };
        if (v1 instanceof Data_List_Types.Cons) {
            return new Data_List_Types.Cons(v1.value0, nubBy(v)(filter(function (y) {
                return !v(v1.value0)(y);
            })(v1.value1)));
        };
        throw new Error("Failed pattern match at Data.List line 579, column 1 - line 579, column 22: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var nub = function (dictEq) {
    return nubBy(Data_Eq.eq(dictEq));
};
var elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var dropWhile = function (p) {
    var go = function (__copy_v) {
        var __tco_done = false;
        var __tco_result;
        function __tco_loop(v) {
            if (v instanceof Data_List_Types.Cons && p(v.value0)) {
                __copy_v = v.value1;
                return;
            };
            __tco_done = true;
            return v;
        };
        while (!__tco_done) {
            __tco_result = __tco_loop(__copy_v);
        };
        return __tco_result;
    };
    return go;
};
var drop = function (__copy_v) {
    return function (__copy_v1) {
        var __tco_v = __copy_v;
        var __tco_done = false;
        var __tco_result;
        function __tco_loop(v, v1) {
            if (v === 0) {
                __tco_done = true;
                return v1;
            };
            if (v1 instanceof Data_List_Types.Nil) {
                __tco_done = true;
                return Data_List_Types.Nil.value;
            };
            if (v1 instanceof Data_List_Types.Cons) {
                __tco_v = v - 1 | 0;
                __copy_v1 = v1.value1;
                return;
            };
            throw new Error("Failed pattern match at Data.List line 505, column 1 - line 505, column 15: " + [ v.constructor.name, v1.constructor.name ]);
        };
        while (!__tco_done) {
            __tco_result = __tco_loop(__tco_v, __copy_v1);
        };
        return __tco_result;
    };
};
var slice = function (start) {
    return function (end) {
        return function (xs) {
            return take(end - start | 0)(drop(start)(xs));
        };
    };
};
var deleteBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Data_List_Types.Nil) {
                return Data_List_Types.Nil.value;
            };
            if (v2 instanceof Data_List_Types.Cons && v(v1)(v2.value0)) {
                return v2.value1;
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return new Data_List_Types.Cons(v2.value0, deleteBy(v)(v1)(v2.value1));
            };
            throw new Error("Failed pattern match at Data.List line 606, column 1 - line 606, column 23: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_List_Types.semigroupList)(xs)(Data_Foldable.foldl(Data_List_Types.foldableList)(Data_Function.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
        };
    };
};
var union = function (dictEq) {
    return unionBy(Data_Eq.eq(dictEq));
};
var deleteAt = function (v) {
    return function (v1) {
        if (v === 0 && v1 instanceof Data_List_Types.Cons) {
            return new Data_Maybe.Just(v1.value1);
        };
        if (v1 instanceof Data_List_Types.Cons) {
            return Data_Functor.map(Data_Maybe.functorMaybe)(function (v2) {
                return new Data_List_Types.Cons(v1.value0, v2);
            })(deleteAt(v - 1 | 0)(v1.value1));
        };
        return Data_Maybe.Nothing.value;
    };
};
var $$delete = function (dictEq) {
    return deleteBy(Data_Eq.eq(dictEq));
};
var difference = function (dictEq) {
    return Data_Foldable.foldl(Data_List_Types.foldableList)(Data_Function.flip($$delete(dictEq)));
};
var concatMap = Data_Function.flip(Control_Bind.bind(Data_List_Types.bindList));
var concat = function (v) {
    return Control_Bind.bind(Data_List_Types.bindList)(v)(Control_Category.id(Control_Category.categoryFn));
};
var catMaybes = mapMaybe(Control_Category.id(Control_Category.categoryFn));
var alterAt = function (v) {
    return function (v1) {
        return function (v2) {
            if (v === 0 && v2 instanceof Data_List_Types.Cons) {
                return Data_Maybe.Just.create((function () {
                    var v3 = v1(v2.value0);
                    if (v3 instanceof Data_Maybe.Nothing) {
                        return v2.value1;
                    };
                    if (v3 instanceof Data_Maybe.Just) {
                        return new Data_List_Types.Cons(v3.value0, v2.value1);
                    };
                    throw new Error("Failed pattern match at Data.List line 345, column 3 - line 347, column 23: " + [ v3.constructor.name ]);
                })());
            };
            if (v2 instanceof Data_List_Types.Cons) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                    return new Data_List_Types.Cons(v2.value0, v3);
                })(alterAt(v - 1 | 0)(v1)(v2.value1));
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var modifyAt = function (n) {
    return function (f) {
        return alterAt(n)(function ($306) {
            return Data_Maybe.Just.create(f($306));
        });
    };
};
module.exports = {
    alterAt: alterAt, 
    catMaybes: catMaybes, 
    concat: concat, 
    concatMap: concatMap, 
    "delete": $$delete, 
    deleteAt: deleteAt, 
    deleteBy: deleteBy, 
    difference: difference, 
    drop: drop, 
    dropWhile: dropWhile, 
    elemIndex: elemIndex, 
    elemLastIndex: elemLastIndex, 
    filter: filter, 
    filterM: filterM, 
    findIndex: findIndex, 
    findLastIndex: findLastIndex, 
    foldM: foldM, 
    fromFoldable: fromFoldable, 
    group: group, 
    "group'": group$prime, 
    groupBy: groupBy, 
    head: head, 
    index: index, 
    init: init, 
    insert: insert, 
    insertAt: insertAt, 
    insertBy: insertBy, 
    intersect: intersect, 
    intersectBy: intersectBy, 
    last: last, 
    length: length, 
    many: many, 
    manyRec: manyRec, 
    mapMaybe: mapMaybe, 
    mapWithIndex: mapWithIndex, 
    modifyAt: modifyAt, 
    nub: nub, 
    nubBy: nubBy, 
    "null": $$null, 
    range: range, 
    reverse: reverse, 
    singleton: singleton, 
    slice: slice, 
    snoc: snoc, 
    some: some, 
    someRec: someRec, 
    sort: sort, 
    sortBy: sortBy, 
    span: span, 
    tail: tail, 
    take: take, 
    takeWhile: takeWhile, 
    toUnfoldable: toUnfoldable, 
    transpose: transpose, 
    uncons: uncons, 
    union: union, 
    unionBy: unionBy, 
    unsnoc: unsnoc, 
    unzip: unzip, 
    updateAt: updateAt, 
    zip: zip, 
    zipWith: zipWith, 
    zipWithA: zipWithA
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Lazy":14,"../Control.Monad.Rec.Class":27,"../Control.Semigroupoid":37,"../Data.Bifunctor":50,"../Data.Boolean":53,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.NonEmpty":98,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Ring":105,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unfoldable":125,"../Data.Unit":127,"../Prelude":139}],85:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var Leaf = (function () {
    function Leaf() {

    };
    Leaf.value = new Leaf();
    return Leaf;
})();
var Two = (function () {
    function Two(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Two.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Two(value0, value1, value2, value3);
                };
            };
        };
    };
    return Two;
})();
var Three = (function () {
    function Three(value0, value1, value2, value3, value4, value5, value6) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
        this.value6 = value6;
    };
    Three.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return function (value6) {
                                return new Three(value0, value1, value2, value3, value4, value5, value6);
                            };
                        };
                    };
                };
            };
        };
    };
    return Three;
})();
var TwoLeft = (function () {
    function TwoLeft(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoLeft(value0, value1, value2);
            };
        };
    };
    return TwoLeft;
})();
var TwoRight = (function () {
    function TwoRight(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoRight(value0, value1, value2);
            };
        };
    };
    return TwoRight;
})();
var ThreeLeft = (function () {
    function ThreeLeft(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeLeft(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    return ThreeLeft;
})();
var ThreeMiddle = (function () {
    function ThreeMiddle(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeMiddle.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeMiddle(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    return ThreeMiddle;
})();
var ThreeRight = (function () {
    function ThreeRight(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeRight(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    return ThreeRight;
})();
var KickUp = (function () {
    function KickUp(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    KickUp.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new KickUp(value0, value1, value2, value3);
                };
            };
        };
    };
    return KickUp;
})();
var values = function (v) {
    if (v instanceof Leaf) {
        return Data_List_Types.Nil.value;
    };
    if (v instanceof Two) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value2))(values(v.value3)));
    };
    if (v instanceof Three) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value2))(Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value3))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value5))(values(v.value6)))));
    };
    throw new Error("Failed pattern match at Data.Map line 425, column 1 - line 425, column 18: " + [ v.constructor.name ]);
};
var size = function ($673) {
    return Data_List.length(values($673));
};
var singleton = function (k) {
    return function (v) {
        return new Two(Leaf.value, k, v, Leaf.value);
    };
};
var toAscUnfoldable = function (dictUnfoldable) {
    return function (m) {
        var go = function (__copy_v) {
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(v) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof Leaf) {
                        __copy_v = v.value1;
                        return;
                    };
                    if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
                        __tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), v.value1));
                    };
                    if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
                        __tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), new Data_List_Types.Cons(v.value0.value3, v.value1)));
                    };
                    if (v.value0 instanceof Two) {
                        __copy_v = new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(singleton(v.value0.value1)(v.value0.value2), new Data_List_Types.Cons(v.value0.value3, v.value1)));
                        return;
                    };
                    if (v.value0 instanceof Three) {
                        __copy_v = new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(singleton(v.value0.value1)(v.value0.value2), new Data_List_Types.Cons(v.value0.value3, new Data_List_Types.Cons(singleton(v.value0.value4)(v.value0.value5), new Data_List_Types.Cons(v.value0.value6, v.value1)))));
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map line 406, column 18 - line 415, column 71: " + [ v.value0.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map line 404, column 21 - line 415, column 71: " + [ v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__copy_v);
            };
            return __tco_result;
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(go)(new Data_List_Types.Cons(m, Data_List_Types.Nil.value));
    };
};
var toAscArray = toAscUnfoldable(Data_Unfoldable.unfoldableArray);
var toUnfoldable = function (dictUnfoldable) {
    return function (m) {
        var go = function (__copy_v) {
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(v) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof Leaf) {
                        __copy_v = v.value1;
                        return;
                    };
                    if (v.value0 instanceof Two) {
                        __tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(v.value0.value3, v.value1))));
                    };
                    if (v.value0 instanceof Three) {
                        __tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), new Data_List_Types.Cons(singleton(v.value0.value4)(v.value0.value5), new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(v.value0.value3, new Data_List_Types.Cons(v.value0.value6, v.value1))))));
                    };
                    throw new Error("Failed pattern match at Data.Map line 395, column 18 - line 400, column 77: " + [ v.value0.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map line 393, column 18 - line 400, column 77: " + [ v.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__copy_v);
            };
            return __tco_result;
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(go)(new Data_List_Types.Cons(m, Data_List_Types.Nil.value));
    };
};
var showTree = function (dictShow) {
    return function (dictShow1) {
        return function (v) {
            if (v instanceof Leaf) {
                return "Leaf";
            };
            if (v instanceof Two) {
                return "Two (" + (showTree(dictShow)(dictShow1)(v.value0) + (") (" + (Data_Show.show(dictShow)(v.value1) + (") (" + (Data_Show.show(dictShow1)(v.value2) + (") (" + (showTree(dictShow)(dictShow1)(v.value3) + ")")))))));
            };
            if (v instanceof Three) {
                return "Three (" + (showTree(dictShow)(dictShow1)(v.value0) + (") (" + (Data_Show.show(dictShow)(v.value1) + (") (" + (Data_Show.show(dictShow1)(v.value2) + (") (" + (showTree(dictShow)(dictShow1)(v.value3) + (") (" + (Data_Show.show(dictShow)(v.value4) + (") (" + (Data_Show.show(dictShow1)(v.value5) + (") (" + (showTree(dictShow)(dictShow1)(v.value6) + ")")))))))))))));
            };
            throw new Error("Failed pattern match at Data.Map line 109, column 1 - line 110, column 1: " + [ v.constructor.name ]);
        };
    };
};
var showMap = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (m) {
            return "(fromFoldable " + (Data_Show.show(Data_Show.showArray(Data_Tuple.showTuple(dictShow)(dictShow1)))(toAscArray(m)) + ")");
        });
    };
};
var mapWithKey = function (v) {
    return function (v1) {
        if (v1 instanceof Leaf) {
            return Leaf.value;
        };
        if (v1 instanceof Two) {
            return new Two(mapWithKey(v)(v1.value0), v1.value1, v(v1.value1)(v1.value2), mapWithKey(v)(v1.value3));
        };
        if (v1 instanceof Three) {
            return new Three(mapWithKey(v)(v1.value0), v1.value1, v(v1.value1)(v1.value2), mapWithKey(v)(v1.value3), v1.value4, v(v1.value4)(v1.value5), mapWithKey(v)(v1.value6));
        };
        throw new Error("Failed pattern match at Data.Map line 451, column 1 - line 451, column 25: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var lookupLE = function (dictOrd) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v1 instanceof Two) {
                var v2 = Data_Ord.compare(dictOrd)(v)(v1.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v1.value1, 
                        value: v1.value2
                    });
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value1, 
                        value: v1.value2
                    })(lookupLE(dictOrd)(v)(v1.value3)));
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return lookupLE(dictOrd)(v)(v1.value0);
                };
                throw new Error("Failed pattern match at Data.Map line 176, column 37 - line 179, column 24: " + [ v2.constructor.name ]);
            };
            if (v1 instanceof Three) {
                var v3 = Data_Ord.compare(dictOrd)(v)(v1.value4);
                if (v3 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v1.value4, 
                        value: v1.value5
                    });
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value4, 
                        value: v1.value5
                    })(lookupLE(dictOrd)(v)(v1.value6)));
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return lookupLE(dictOrd)(v)(new Two(v1.value0, v1.value1, v1.value2, v1.value3));
                };
                throw new Error("Failed pattern match at Data.Map line 180, column 49 - line 183, column 40: " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map line 175, column 1 - line 175, column 26: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var lookupGE = function (dictOrd) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v1 instanceof Two) {
                var v2 = Data_Ord.compare(dictOrd)(v)(v1.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v1.value1, 
                        value: v1.value2
                    });
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value1, 
                        value: v1.value2
                    })(lookupGE(dictOrd)(v)(v1.value0)));
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return lookupGE(dictOrd)(v)(v1.value3);
                };
                throw new Error("Failed pattern match at Data.Map line 200, column 37 - line 203, column 25: " + [ v2.constructor.name ]);
            };
            if (v1 instanceof Three) {
                var v3 = Data_Ord.compare(dictOrd)(v)(v1.value1);
                if (v3 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v1.value1, 
                        value: v1.value2
                    });
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value1, 
                        value: v1.value2
                    })(lookupGE(dictOrd)(v)(v1.value0)));
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return lookupGE(dictOrd)(v)(new Two(v1.value3, v1.value4, v1.value5, v1.value6));
                };
                throw new Error("Failed pattern match at Data.Map line 204, column 49 - line 207, column 41: " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map line 199, column 1 - line 199, column 26: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var lookup = function (dictOrd) {
    return function (k) {
        return function (tree) {
            if (tree instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            var comp = Data_Ord.compare(dictOrd);
            var __unused = function (dictPartial1) {
                return function ($dollar45) {
                    return $dollar45;
                };
            };
            return __unused()((function () {
                if (tree instanceof Two) {
                    var v1 = comp(k)(tree.value1);
                    if (v1 instanceof Data_Ordering.EQ) {
                        return new Data_Maybe.Just(tree.value2);
                    };
                    if (v1 instanceof Data_Ordering.LT) {
                        return lookup(dictOrd)(k)(tree.value0);
                    };
                    return lookup(dictOrd)(k)(tree.value3);
                };
                if (tree instanceof Three) {
                    var v = comp(k)(tree.value1);
                    if (v instanceof Data_Ordering.EQ) {
                        return new Data_Maybe.Just(tree.value2);
                    };
                    var v3 = comp(k)(tree.value4);
                    if (v3 instanceof Data_Ordering.EQ) {
                        return new Data_Maybe.Just(tree.value5);
                    };
                    if (v instanceof Data_Ordering.LT) {
                        return lookup(dictOrd)(k)(tree.value0);
                    };
                    if (v3 instanceof Data_Ordering.GT) {
                        return lookup(dictOrd)(k)(tree.value6);
                    };
                    return lookup(dictOrd)(k)(tree.value3);
                };
                throw new Error("Failed pattern match at Data.Map line 156, column 10 - line 170, column 39: " + [ tree.constructor.name ]);
            })());
        };
    };
};
var member = function (dictOrd) {
    return function (k) {
        return function (m) {
            return Data_Maybe.isJust(lookup(dictOrd)(k)(m));
        };
    };
};
var keys = function (v) {
    if (v instanceof Leaf) {
        return Data_List_Types.Nil.value;
    };
    if (v instanceof Two) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(keys(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value1))(keys(v.value3)));
    };
    if (v instanceof Three) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(keys(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value1))(Data_Semigroup.append(Data_List_Types.semigroupList)(keys(v.value3))(Data_Semigroup.append(Data_List_Types.semigroupList)(Control_Applicative.pure(Data_List_Types.applicativeList)(v.value4))(keys(v.value6)))));
    };
    throw new Error("Failed pattern match at Data.Map line 419, column 1 - line 419, column 16: " + [ v.constructor.name ]);
};
var isEmpty = function (v) {
    if (v instanceof Leaf) {
        return true;
    };
    return false;
};
var functorMap = new Data_Functor.Functor(function (v) {
    return function (v1) {
        if (v1 instanceof Leaf) {
            return Leaf.value;
        };
        if (v1 instanceof Two) {
            return new Two(Data_Functor.map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), Data_Functor.map(functorMap)(v)(v1.value3));
        };
        if (v1 instanceof Three) {
            return new Three(Data_Functor.map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), Data_Functor.map(functorMap)(v)(v1.value3), v1.value4, v(v1.value5), Data_Functor.map(functorMap)(v)(v1.value6));
        };
        throw new Error("Failed pattern match at Data.Map line 81, column 3 - line 81, column 20: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var fromZipper = function (__copy_dictOrd) {
    return function (__copy_v) {
        return function (__copy_tree) {
            var __tco_dictOrd = __copy_dictOrd;
            var __tco_v = __copy_v;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(dictOrd, v, tree) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return tree;
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof TwoLeft) {
                        __tco_dictOrd = dictOrd;
                        __tco_v = v.value1;
                        __copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
                        return;
                    };
                    if (v.value0 instanceof TwoRight) {
                        __tco_dictOrd = dictOrd;
                        __tco_v = v.value1;
                        __copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
                        return;
                    };
                    if (v.value0 instanceof ThreeLeft) {
                        __tco_dictOrd = dictOrd;
                        __tco_v = v.value1;
                        __copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
                        return;
                    };
                    if (v.value0 instanceof ThreeMiddle) {
                        __tco_dictOrd = dictOrd;
                        __tco_v = v.value1;
                        __copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
                        return;
                    };
                    if (v.value0 instanceof ThreeRight) {
                        __tco_dictOrd = dictOrd;
                        __tco_v = v.value1;
                        __copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map line 247, column 3 - line 252, column 88: " + [ v.value0.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map line 245, column 1 - line 245, column 27: " + [ v.constructor.name, tree.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_dictOrd, __tco_v, __copy_tree);
            };
            return __tco_result;
        };
    };
};
var insert = function (dictOrd) {
    var up = function (__copy_v) {
        return function (__copy_v1) {
            var __tco_v = __copy_v;
            var __tco_done = false;
            var __tco_result;
            function __tco_loop(v, v1) {
                if (v instanceof Data_List_Types.Nil) {
                    __tco_done = true;
                    return new Two(v1.value0, v1.value1, v1.value2, v1.value3);
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof TwoLeft) {
                        __tco_done = true;
                        return fromZipper(dictOrd)(v.value1)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, v.value0.value0, v.value0.value1, v.value0.value2));
                    };
                    if (v.value0 instanceof TwoRight) {
                        __tco_done = true;
                        return fromZipper(dictOrd)(v.value1)(new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1.value0, v1.value1, v1.value2, v1.value3));
                    };
                    if (v.value0 instanceof ThreeLeft) {
                        __tco_v = v.value1;
                        __copy_v1 = new KickUp(new Two(v1.value0, v1.value1, v1.value2, v1.value3), v.value0.value0, v.value0.value1, new Two(v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5));
                        return;
                    };
                    if (v.value0 instanceof ThreeMiddle) {
                        __tco_v = v.value1;
                        __copy_v1 = new KickUp(new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1.value0), v1.value1, v1.value2, new Two(v1.value3, v.value0.value3, v.value0.value4, v.value0.value5));
                        return;
                    };
                    if (v.value0 instanceof ThreeRight) {
                        __tco_v = v.value1;
                        __copy_v1 = new KickUp(new Two(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3), v.value0.value4, v.value0.value5, new Two(v1.value0, v1.value1, v1.value2, v1.value3));
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map line 283, column 5 - line 288, column 104: " + [ v.value0.constructor.name, v1.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map line 281, column 3 - line 281, column 54: " + [ v.constructor.name, v1.constructor.name ]);
            };
            while (!__tco_done) {
                __tco_result = __tco_loop(__tco_v, __copy_v1);
            };
            return __tco_result;
        };
    };
    var comp = Data_Ord.compare(dictOrd);
    var down = function (__copy_ctx) {
        return function (__copy_k) {
            return function (__copy_v) {
                return function (__copy_v1) {
                    var __tco_ctx = __copy_ctx;
                    var __tco_k = __copy_k;
                    var __tco_v = __copy_v;
                    var __tco_done = false;
                    var __tco_result;
                    function __tco_loop(ctx, k, v, v1) {
                        if (v1 instanceof Leaf) {
                            __tco_done = true;
                            return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
                        };
                        if (v1 instanceof Two) {
                            var v3 = comp(k)(v1.value1);
                            if (v3 instanceof Data_Ordering.EQ) {
                                __tco_done = true;
                                return fromZipper(dictOrd)(ctx)(new Two(v1.value0, k, v, v1.value3));
                            };
                            if (v3 instanceof Data_Ordering.LT) {
                                __tco_ctx = new Data_List_Types.Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                                __tco_k = k;
                                __tco_v = v;
                                __copy_v1 = v1.value0;
                                return;
                            };
                            __tco_ctx = new Data_List_Types.Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                            __tco_k = k;
                            __tco_v = v;
                            __copy_v1 = v1.value3;
                            return;
                        };
                        if (v1 instanceof Three) {
                            var v3 = comp(k)(v1.value1);
                            if (v3 instanceof Data_Ordering.EQ) {
                                __tco_done = true;
                                return fromZipper(dictOrd)(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
                            };
                            var v4 = comp(k)(v1.value4);
                            if (v4 instanceof Data_Ordering.EQ) {
                                __tco_done = true;
                                return fromZipper(dictOrd)(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
                            };
                            if (v3 instanceof Data_Ordering.LT) {
                                __tco_ctx = new Data_List_Types.Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                                __tco_k = k;
                                __tco_v = v;
                                __copy_v1 = v1.value0;
                                return;
                            };
                            if (v3 instanceof Data_Ordering.GT && v4 instanceof Data_Ordering.LT) {
                                __tco_ctx = new Data_List_Types.Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                                __tco_k = k;
                                __tco_v = v;
                                __copy_v1 = v1.value3;
                                return;
                            };
                            __tco_ctx = new Data_List_Types.Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                            __tco_k = k;
                            __tco_v = v;
                            __copy_v1 = v1.value6;
                            return;
                        };
                        throw new Error("Failed pattern match at Data.Map line 264, column 3 - line 264, column 52: " + [ ctx.constructor.name, k.constructor.name, v.constructor.name, v1.constructor.name ]);
                    };
                    while (!__tco_done) {
                        __tco_result = __tco_loop(__tco_ctx, __tco_k, __tco_v, __copy_v1);
                    };
                    return __tco_result;
                };
            };
        };
    };
    return down(Data_List_Types.Nil.value);
};
var pop = function (dictOrd) {
    var up = function (ctxs) {
        return function (tree) {
            if (ctxs instanceof Data_List_Types.Nil) {
                return tree;
            };
            if (ctxs instanceof Data_List_Types.Cons) {
                var __unused = function (dictPartial1) {
                    return function ($dollar53) {
                        return $dollar53;
                    };
                };
                return __unused()((function () {
                    if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
                    };
                    if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
                    };
                    if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                        return up(ctxs.value1)(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3));
                    };
                    if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                        return up(ctxs.value1)(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree));
                    };
                    if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
                    };
                    if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
                    };
                    if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                    };
                    if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                    };
                    if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
                    };
                    if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                    };
                    if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                    };
                    if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
                    };
                    if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
                    };
                    if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                    };
                    if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                    };
                    if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
                    };
                    if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                        return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
                    };
                    throw new Error("Failed pattern match at Data.Map line 333, column 9 - line 350, column 136: " + [ ctxs.value0.constructor.name, tree.constructor.name ]);
                })());
            };
            throw new Error("Failed pattern match at Data.Map line 330, column 5 - line 350, column 136: " + [ ctxs.constructor.name ]);
        };
    };
    var removeMaxNode = function (ctx) {
        return function (m) {
            var __unused = function (dictPartial1) {
                return function ($dollar55) {
                    return $dollar55;
                };
            };
            return __unused()((function () {
                if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
                    return up(ctx)(Leaf.value);
                };
                if (m instanceof Two) {
                    return removeMaxNode(new Data_List_Types.Cons(new TwoRight(m.value0, m.value1, m.value2), ctx))(m.value3);
                };
                if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
                    return up(new Data_List_Types.Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
                };
                if (m instanceof Three) {
                    return removeMaxNode(new Data_List_Types.Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx))(m.value6);
                };
                throw new Error("Failed pattern match at Data.Map line 362, column 5 - line 366, column 107: " + [ m.constructor.name ]);
            })());
        };
    };
    var maxNode = function (m) {
        var __unused = function (dictPartial1) {
            return function ($dollar57) {
                return $dollar57;
            };
        };
        return __unused()((function () {
            if (m instanceof Two && m.value3 instanceof Leaf) {
                return {
                    key: m.value1, 
                    value: m.value2
                };
            };
            if (m instanceof Two) {
                return maxNode(m.value3);
            };
            if (m instanceof Three && m.value6 instanceof Leaf) {
                return {
                    key: m.value4, 
                    value: m.value5
                };
            };
            if (m instanceof Three) {
                return maxNode(m.value6);
            };
            throw new Error("Failed pattern match at Data.Map line 353, column 33 - line 357, column 45: " + [ m.constructor.name ]);
        })());
    };
    var comp = Data_Ord.compare(dictOrd);
    var down = function (__copy_ctx) {
        return function (__copy_k) {
            return function (__copy_m) {
                var __tco_ctx = __copy_ctx;
                var __tco_k = __copy_k;
                var __tco_done = false;
                var __tco_result;
                function __tco_loop(ctx, k, m) {
                    if (m instanceof Leaf) {
                        __tco_done = true;
                        return Data_Maybe.Nothing.value;
                    };
                    if (m instanceof Two) {
                        var v = comp(k)(m.value1);
                        if (m.value3 instanceof Leaf && v instanceof Data_Ordering.EQ) {
                            __tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, up(ctx)(Leaf.value)));
                        };
                        if (v instanceof Data_Ordering.EQ) {
                            var max = maxNode(m.value0);
                            __tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, removeMaxNode(new Data_List_Types.Cons(new TwoLeft(max.key, max.value, m.value3), ctx))(m.value0)));
                        };
                        if (v instanceof Data_Ordering.LT) {
                            __tco_ctx = new Data_List_Types.Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                            __tco_k = k;
                            __copy_m = m.value0;
                            return;
                        };
                        __tco_ctx = new Data_List_Types.Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                        __tco_k = k;
                        __copy_m = m.value3;
                        return;
                    };
                    if (m instanceof Three) {
                        var leaves = (function () {
                            if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                                return true;
                            };
                            return false;
                        })();
                        var v = comp(k)(m.value4);
                        var v3 = comp(k)(m.value1);
                        if (leaves && v3 instanceof Data_Ordering.EQ) {
                            __tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
                        };
                        if (leaves && v instanceof Data_Ordering.EQ) {
                            __tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value5, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
                        };
                        if (v3 instanceof Data_Ordering.EQ) {
                            var max = maxNode(m.value0);
                            __tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, removeMaxNode(new Data_List_Types.Cons(new ThreeLeft(max.key, max.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
                        };
                        if (v instanceof Data_Ordering.EQ) {
                            var max = maxNode(m.value3);
                            __tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value5, removeMaxNode(new Data_List_Types.Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max.key, max.value, m.value6), ctx))(m.value3)));
                        };
                        if (v3 instanceof Data_Ordering.LT) {
                            __tco_ctx = new Data_List_Types.Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                            __tco_k = k;
                            __copy_m = m.value0;
                            return;
                        };
                        if (v3 instanceof Data_Ordering.GT && v instanceof Data_Ordering.LT) {
                            __tco_ctx = new Data_List_Types.Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                            __tco_k = k;
                            __copy_m = m.value3;
                            return;
                        };
                        __tco_ctx = new Data_List_Types.Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                        __tco_k = k;
                        __copy_m = m.value6;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map line 303, column 36 - line 326, column 82: " + [ m.constructor.name ]);
                };
                while (!__tco_done) {
                    __tco_result = __tco_loop(__tco_ctx, __tco_k, __copy_m);
                };
                return __tco_result;
            };
        };
    };
    return down(Data_List_Types.Nil.value);
};
var foldableMap = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (m) {
            return Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(f)(values(m));
        };
    };
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(f)(z)(values(m));
        };
    };
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldr(Data_List_Types.foldableList)(f)(z)(values(m));
        };
    };
});
var traversableMap = new Data_Traversable.Traversable(function () {
    return foldableMap;
}, function () {
    return functorMap;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableMap)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            if (v instanceof Leaf) {
                return Control_Applicative.pure(dictApplicative)(Leaf.value);
            };
            if (v instanceof Two) {
                return Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Two.create)(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value0)))(Control_Applicative.pure(dictApplicative)(v.value1)))(f(v.value2)))(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value3));
            };
            if (v instanceof Three) {
                return Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Three.create)(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value0)))(Control_Applicative.pure(dictApplicative)(v.value1)))(f(v.value2)))(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value3)))(Control_Applicative.pure(dictApplicative)(v.value4)))(f(v.value5)))(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value6));
            };
            throw new Error("Failed pattern match at Data.Map line 91, column 3 - line 91, column 30: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
});
var findMin = function (v) {
    if (v instanceof Leaf) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Two) {
        return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
            key: v.value1, 
            value: v.value2
        })(findMin(v.value0)));
    };
    if (v instanceof Three) {
        return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
            key: v.value1, 
            value: v.value2
        })(findMin(v.value0)));
    };
    throw new Error("Failed pattern match at Data.Map line 229, column 1 - line 229, column 23: " + [ v.constructor.name ]);
};
var lookupGT = function (dictOrd) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v1 instanceof Two) {
                var v2 = Data_Ord.compare(dictOrd)(v)(v1.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return findMin(v1.value3);
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value1, 
                        value: v1.value2
                    })(lookupGT(dictOrd)(v)(v1.value0)));
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return lookupGT(dictOrd)(v)(v1.value3);
                };
                throw new Error("Failed pattern match at Data.Map line 212, column 37 - line 215, column 25: " + [ v2.constructor.name ]);
            };
            if (v1 instanceof Three) {
                var v3 = Data_Ord.compare(dictOrd)(v)(v1.value1);
                if (v3 instanceof Data_Ordering.EQ) {
                    return findMin(new Two(v1.value3, v1.value4, v1.value5, v1.value6));
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value1, 
                        value: v1.value2
                    })(lookupGT(dictOrd)(v)(v1.value0)));
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return lookupGT(dictOrd)(v)(new Two(v1.value3, v1.value4, v1.value5, v1.value6));
                };
                throw new Error("Failed pattern match at Data.Map line 216, column 49 - line 219, column 41: " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map line 211, column 1 - line 211, column 26: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var findMax = function (v) {
    if (v instanceof Leaf) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Two) {
        return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
            key: v.value1, 
            value: v.value2
        })(findMax(v.value3)));
    };
    if (v instanceof Three) {
        return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
            key: v.value4, 
            value: v.value5
        })(findMax(v.value6)));
    };
    throw new Error("Failed pattern match at Data.Map line 223, column 1 - line 223, column 23: " + [ v.constructor.name ]);
};
var lookupLT = function (dictOrd) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v1 instanceof Two) {
                var v2 = Data_Ord.compare(dictOrd)(v)(v1.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return findMax(v1.value0);
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value1, 
                        value: v1.value2
                    })(lookupLT(dictOrd)(v)(v1.value3)));
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return lookupLT(dictOrd)(v)(v1.value0);
                };
                throw new Error("Failed pattern match at Data.Map line 188, column 37 - line 191, column 24: " + [ v2.constructor.name ]);
            };
            if (v1 instanceof Three) {
                var v3 = Data_Ord.compare(dictOrd)(v)(v1.value4);
                if (v3 instanceof Data_Ordering.EQ) {
                    return findMax(new Two(v1.value0, v1.value1, v1.value2, v1.value3));
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v1.value4, 
                        value: v1.value5
                    })(lookupLT(dictOrd)(v)(v1.value6)));
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return lookupLT(dictOrd)(v)(new Two(v1.value0, v1.value1, v1.value2, v1.value3));
                };
                throw new Error("Failed pattern match at Data.Map line 192, column 49 - line 195, column 40: " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map line 187, column 1 - line 187, column 26: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
var eqMap = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (m1) {
            return function (m2) {
                return Data_Eq.eq(Data_Eq.eqArray(Data_Tuple.eqTuple(dictEq)(dictEq1)))(toAscArray(m1))(toAscArray(m2));
            };
        });
    };
};
var ordMap = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqMap(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (m1) {
            return function (m2) {
                return Data_Ord.compare(Data_Ord.ordArray(Data_Tuple.ordTuple(dictOrd)(dictOrd1)))(toAscArray(m1))(toAscArray(m2));
            };
        });
    };
};
var eq1Map = function (dictEq) {
    return new Data_Eq.Eq1(function (dictEq1) {
        return Data_Eq.eq(eqMap(dictEq)(dictEq1));
    });
};
var ord1Map = function (dictOrd) {
    return new Data_Ord.Ord1(function () {
        return eq1Map(dictOrd.Eq0());
    }, function (dictOrd1) {
        return Data_Ord.compare(ordMap(dictOrd)(dictOrd1));
    });
};
var empty = Leaf.value;
var fromFoldable = function (dictOrd) {
    return function (dictFoldable) {
        return Data_Foldable.foldl(dictFoldable)(function (m) {
            return function (v) {
                return insert(dictOrd)(v.value0)(v.value1)(m);
            };
        })(empty);
    };
};
var $$delete = function (dictOrd) {
    return function (k) {
        return function (m) {
            return Data_Maybe.maybe(m)(Data_Tuple.snd)(pop(dictOrd)(k)(m));
        };
    };
};
var checkValid = function (tree) {
    var allHeights = function (v) {
        if (v instanceof Leaf) {
            return Control_Applicative.pure(Data_List_Types.applicativeList)(0);
        };
        if (v instanceof Two) {
            return Data_Functor.map(Data_List_Types.functorList)(function (n) {
                return n + 1 | 0;
            })(Data_Semigroup.append(Data_List_Types.semigroupList)(allHeights(v.value0))(allHeights(v.value3)));
        };
        if (v instanceof Three) {
            return Data_Functor.map(Data_List_Types.functorList)(function (n) {
                return n + 1 | 0;
            })(Data_Semigroup.append(Data_List_Types.semigroupList)(allHeights(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(allHeights(v.value3))(allHeights(v.value6))));
        };
        throw new Error("Failed pattern match at Data.Map line 144, column 3 - line 144, column 30: " + [ v.constructor.name ]);
    };
    return Data_List.length(Data_List.nub(Data_Eq.eqInt)(allHeights(tree))) === 1;
};
var alter = function (dictOrd) {
    return function (f) {
        return function (k) {
            return function (m) {
                var v = f(lookup(dictOrd)(k)(m));
                if (v instanceof Data_Maybe.Nothing) {
                    return $$delete(dictOrd)(k)(m);
                };
                if (v instanceof Data_Maybe.Just) {
                    return insert(dictOrd)(k)(v.value0)(m);
                };
                throw new Error("Failed pattern match at Data.Map line 371, column 15 - line 373, column 25: " + [ v.constructor.name ]);
            };
        };
    };
};
var fromFoldableWith = function (dictOrd) {
    return function (dictFoldable) {
        return function (f) {
            var combine = function (v) {
                return function (v1) {
                    if (v1 instanceof Data_Maybe.Just) {
                        return Data_Maybe.Just.create(f(v)(v1.value0));
                    };
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return new Data_Maybe.Just(v);
                    };
                    throw new Error("Failed pattern match at Data.Map line 388, column 3 - line 388, column 38: " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return Data_Foldable.foldl(dictFoldable)(function (m) {
                return function (v) {
                    return alter(dictOrd)(combine(v.value1))(v.value0)(m);
                };
            })(empty);
        };
    };
};
var unionWith = function (dictOrd) {
    return function (f) {
        return function (m1) {
            return function (m2) {
                var go = function (m) {
                    return function (v) {
                        return alter(dictOrd)(function ($674) {
                            return Data_Maybe.Just.create(Data_Maybe.maybe(v.value1)(f(v.value1))($674));
                        })(v.value0)(m);
                    };
                };
                return Data_Foldable.foldl(Data_List_Types.foldableList)(go)(m2)(toUnfoldable(Data_List_Types.unfoldableList)(m1));
            };
        };
    };
};
var union = function (dictOrd) {
    return unionWith(dictOrd)(Data_Function["const"]);
};
var semigroupMap = function (dictOrd) {
    return new Data_Semigroup.Semigroup(union(dictOrd));
};
var monoidMap = function (dictOrd) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMap(dictOrd);
    }, empty);
};
var unions = function (dictOrd) {
    return function (dictFoldable) {
        return Data_Foldable.foldl(dictFoldable)(union(dictOrd))(empty);
    };
};
var update = function (dictOrd) {
    return function (f) {
        return function (k) {
            return function (m) {
                return alter(dictOrd)(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
            };
        };
    };
};
module.exports = {
    alter: alter, 
    checkValid: checkValid, 
    "delete": $$delete, 
    empty: empty, 
    findMax: findMax, 
    findMin: findMin, 
    fromFoldable: fromFoldable, 
    fromFoldableWith: fromFoldableWith, 
    insert: insert, 
    isEmpty: isEmpty, 
    keys: keys, 
    lookup: lookup, 
    lookupGE: lookupGE, 
    lookupGT: lookupGT, 
    lookupLE: lookupLE, 
    lookupLT: lookupLT, 
    mapWithKey: mapWithKey, 
    member: member, 
    pop: pop, 
    showTree: showTree, 
    singleton: singleton, 
    size: size, 
    toAscUnfoldable: toAscUnfoldable, 
    toUnfoldable: toUnfoldable, 
    union: union, 
    unionWith: unionWith, 
    unions: unions, 
    update: update, 
    values: values, 
    eq1Map: eq1Map, 
    eqMap: eqMap, 
    ord1Map: ord1Map, 
    ordMap: ordMap, 
    showMap: showMap, 
    semigroupMap: semigroupMap, 
    monoidMap: monoidMap, 
    functorMap: functorMap, 
    foldableMap: foldableMap, 
    traversableMap: traversableMap
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Semigroupoid":37,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.List":84,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unfoldable":125,"../Partial.Unsafe":136,"../Prelude":139}],86:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var First = function (x) {
    return x;
};
var showFirst = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "First (" + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
    });
};
var semigroupFirst = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v instanceof Data_Maybe.Just) {
            return v;
        };
        return v1;
    };
});
var ordFirst = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
var ord1First = Data_Maybe.ord1Maybe;
var newtypeFirst = new Data_Newtype.Newtype(function (n) {
    return n;
}, First);
var monoidFirst = new Data_Monoid.Monoid(function () {
    return semigroupFirst;
}, Data_Maybe.Nothing.value);
var monadFirst = Data_Maybe.monadMaybe;
var invariantFirst = Data_Maybe.invariantMaybe;
var functorFirst = Data_Maybe.functorMaybe;
var extendFirst = Data_Maybe.extendMaybe;
var eqFirst = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
var eq1First = Data_Maybe.eq1Maybe;
var boundedFirst = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
var bindFirst = Data_Maybe.bindMaybe;
var applyFirst = Data_Maybe.applyMaybe;
var applicativeFirst = Data_Maybe.applicativeMaybe;
module.exports = {
    First: First, 
    newtypeFirst: newtypeFirst, 
    eqFirst: eqFirst, 
    eq1First: eq1First, 
    ordFirst: ordFirst, 
    ord1First: ord1First, 
    boundedFirst: boundedFirst, 
    functorFirst: functorFirst, 
    invariantFirst: invariantFirst, 
    applyFirst: applyFirst, 
    applicativeFirst: applicativeFirst, 
    bindFirst: bindFirst, 
    monadFirst: monadFirst, 
    extendFirst: extendFirst, 
    showFirst: showFirst, 
    semigroupFirst: semigroupFirst, 
    monoidFirst: monoidFirst
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],87:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Last = function (x) {
    return x;
};
var showLast = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Last " + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
    });
};
var semigroupLast = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v1 instanceof Data_Maybe.Just) {
            return v1;
        };
        if (v1 instanceof Data_Maybe.Nothing) {
            return v;
        };
        throw new Error("Failed pattern match at Data.Maybe.Last line 54, column 3 - line 54, column 39: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var ordLast = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
var ord1Last = Data_Maybe.ord1Maybe;
var newtypeLast = new Data_Newtype.Newtype(function (n) {
    return n;
}, Last);
var monoidLast = new Data_Monoid.Monoid(function () {
    return semigroupLast;
}, Data_Maybe.Nothing.value);
var monadLast = Data_Maybe.monadMaybe;
var invariantLast = Data_Maybe.invariantMaybe;
var functorLast = Data_Maybe.functorMaybe;
var extendLast = Data_Maybe.extendMaybe;
var eqLast = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
var eq1Last = Data_Maybe.eq1Maybe;
var boundedLast = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
var bindLast = Data_Maybe.bindMaybe;
var applyLast = Data_Maybe.applyMaybe;
var applicativeLast = Data_Maybe.applicativeMaybe;
module.exports = {
    Last: Last, 
    newtypeLast: newtypeLast, 
    eqLast: eqLast, 
    eq1Last: eq1Last, 
    ordLast: ordLast, 
    ord1Last: ord1Last, 
    boundedLast: boundedLast, 
    functorLast: functorLast, 
    invariantLast: invariantLast, 
    applyLast: applyLast, 
    applicativeLast: applicativeLast, 
    bindLast: bindLast, 
    monadLast: monadLast, 
    extendLast: extendLast, 
    showLast: showLast, 
    semigroupLast: semigroupLast, 
    monoidLast: monoidLast
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],88:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Nothing = (function () {
    function Nothing() {

    };
    Nothing.value = new Nothing();
    return Nothing;
})();
var Just = (function () {
    function Just(value0) {
        this.value0 = value0;
    };
    Just.create = function (value0) {
        return new Just(value0);
    };
    return Just;
})();
var showMaybe = function (dictShow) {
    return new Data_Show.Show(function (v) {
        if (v instanceof Just) {
            return "(Just " + (Data_Show.show(dictShow)(v.value0) + ")");
        };
        if (v instanceof Nothing) {
            return "Nothing";
        };
        throw new Error("Failed pattern match at Data.Maybe line 208, column 3 - line 209, column 3: " + [ v.constructor.name ]);
    });
};
var semigroupMaybe = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            if (v instanceof Nothing) {
                return v1;
            };
            if (v1 instanceof Nothing) {
                return v;
            };
            if (v instanceof Just && v1 instanceof Just) {
                return new Just(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Maybe line 177, column 3 - line 177, column 23: " + [ v.constructor.name, v1.constructor.name ]);
        };
    });
};
var monoidMaybe = function (dictSemigroup) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMaybe(dictSemigroup);
    }, Nothing.value);
};
var maybe$prime = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Nothing) {
                return v(Data_Unit.unit);
            };
            if (v2 instanceof Just) {
                return v1(v2.value0);
            };
            throw new Error("Failed pattern match at Data.Maybe line 233, column 1 - line 233, column 28: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var maybe = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Nothing) {
                return v;
            };
            if (v2 instanceof Just) {
                return v1(v2.value0);
            };
            throw new Error("Failed pattern match at Data.Maybe line 220, column 1 - line 220, column 22: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
};
var isNothing = maybe(true)(Data_Function["const"](false));
var isJust = maybe(false)(Data_Function["const"](true));
var functorMaybe = new Data_Functor.Functor(function (v) {
    return function (v1) {
        if (v1 instanceof Just) {
            return new Just(v(v1.value0));
        };
        return Nothing.value;
    };
});
var invariantMaybe = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorMaybe));
var fromMaybe$prime = function (a) {
    return maybe$prime(a)(Control_Category.id(Control_Category.categoryFn));
};
var fromMaybe = function (a) {
    return maybe(a)(Control_Category.id(Control_Category.categoryFn));
};
var fromJust = function (dictPartial) {
    return function (v) {
        var __unused = function (dictPartial1) {
            return function ($dollar34) {
                return $dollar34;
            };
        };
        return __unused(dictPartial)((function () {
            if (v instanceof Just) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Data.Maybe line 271, column 1 - line 271, column 21: " + [ v.constructor.name ]);
        })());
    };
};
var extendMaybe = new Control_Extend.Extend(function () {
    return functorMaybe;
}, function (v) {
    return function (v1) {
        if (v1 instanceof Nothing) {
            return Nothing.value;
        };
        return new Just(v(v1));
    };
});
var eqMaybe = function (dictEq) {
    return new Data_Eq.Eq(function (x) {
        return function (y) {
            if (x instanceof Nothing && y instanceof Nothing) {
                return true;
            };
            if (x instanceof Just && y instanceof Just) {
                return Data_Eq.eq(dictEq)(x.value0)(y.value0);
            };
            return false;
        };
    });
};
var ordMaybe = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqMaybe(dictOrd.Eq0());
    }, function (x) {
        return function (y) {
            if (x instanceof Nothing && y instanceof Nothing) {
                return Data_Ordering.EQ.value;
            };
            if (x instanceof Nothing) {
                return Data_Ordering.LT.value;
            };
            if (y instanceof Nothing) {
                return Data_Ordering.GT.value;
            };
            if (x instanceof Just && y instanceof Just) {
                return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
            };
            throw new Error("Failed pattern match at Data.Maybe line 196, column 1 - line 196, column 51: " + [ x.constructor.name, y.constructor.name ]);
        };
    });
};
var eq1Maybe = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqMaybe(dictEq));
});
var ord1Maybe = new Data_Ord.Ord1(function () {
    return eq1Maybe;
}, function (dictOrd) {
    return Data_Ord.compare(ordMaybe(dictOrd));
});
var boundedMaybe = function (dictBounded) {
    return new Data_Bounded.Bounded(function () {
        return ordMaybe(dictBounded.Ord0());
    }, Nothing.value, new Just(Data_Bounded.top(dictBounded)));
};
var applyMaybe = new Control_Apply.Apply(function () {
    return functorMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Just) {
            return Data_Functor.map(functorMaybe)(v.value0)(v1);
        };
        if (v instanceof Nothing) {
            return Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Maybe line 69, column 3 - line 69, column 31: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var bindMaybe = new Control_Bind.Bind(function () {
    return applyMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Just) {
            return v1(v.value0);
        };
        if (v instanceof Nothing) {
            return Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Maybe line 128, column 3 - line 128, column 24: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var applicativeMaybe = new Control_Applicative.Applicative(function () {
    return applyMaybe;
}, Just.create);
var monadMaybe = new Control_Monad.Monad(function () {
    return applicativeMaybe;
}, function () {
    return bindMaybe;
});
var altMaybe = new Control_Alt.Alt(function () {
    return functorMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Nothing) {
            return v1;
        };
        return v;
    };
});
var plusMaybe = new Control_Plus.Plus(function () {
    return altMaybe;
}, Nothing.value);
var alternativeMaybe = new Control_Alternative.Alternative(function () {
    return applicativeMaybe;
}, function () {
    return plusMaybe;
});
var monadZeroMaybe = new Control_MonadZero.MonadZero(function () {
    return alternativeMaybe;
}, function () {
    return monadMaybe;
});
module.exports = {
    Nothing: Nothing, 
    Just: Just, 
    fromJust: fromJust, 
    fromMaybe: fromMaybe, 
    "fromMaybe'": fromMaybe$prime, 
    isJust: isJust, 
    isNothing: isNothing, 
    maybe: maybe, 
    "maybe'": maybe$prime, 
    functorMaybe: functorMaybe, 
    applyMaybe: applyMaybe, 
    applicativeMaybe: applicativeMaybe, 
    altMaybe: altMaybe, 
    plusMaybe: plusMaybe, 
    alternativeMaybe: alternativeMaybe, 
    bindMaybe: bindMaybe, 
    monadMaybe: monadMaybe, 
    monadZeroMaybe: monadZeroMaybe, 
    extendMaybe: extendMaybe, 
    invariantMaybe: invariantMaybe, 
    semigroupMaybe: semigroupMaybe, 
    monoidMaybe: monoidMaybe, 
    eqMaybe: eqMaybe, 
    eq1Maybe: eq1Maybe, 
    ordMaybe: ordMaybe, 
    ord1Maybe: ord1Maybe, 
    boundedMaybe: boundedMaybe, 
    showMaybe: showMaybe
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Extend":13,"../Control.Monad":35,"../Control.MonadZero":34,"../Control.Plus":36,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Function":71,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Monoid":95,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Show":111,"../Data.Unit":127,"../Prelude":139}],89:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Additive = function (x) {
    return x;
};
var showAdditive = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Additive " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupAdditive = function (dictSemiring) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semiring.add(dictSemiring)(v)(v1);
        };
    });
};
var ordAdditive = function (dictOrd) {
    return dictOrd;
};
var newtypeAdditive = new Data_Newtype.Newtype(function (n) {
    return n;
}, Additive);
var monoidAdditive = function (dictSemiring) {
    return new Data_Monoid.Monoid(function () {
        return semigroupAdditive(dictSemiring);
    }, Data_Semiring.zero(dictSemiring));
};
var invariantAdditive = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorAdditive = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendAdditive = new Control_Extend.Extend(function () {
    return functorAdditive;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqAdditive = function (dictEq) {
    return dictEq;
};
var comonadAdditive = new Control_Comonad.Comonad(function () {
    return extendAdditive;
}, Data_Newtype.unwrap(newtypeAdditive));
var boundedAdditive = function (dictBounded) {
    return dictBounded;
};
var applyAdditive = new Control_Apply.Apply(function () {
    return functorAdditive;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindAdditive = new Control_Bind.Bind(function () {
    return applyAdditive;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeAdditive = new Control_Applicative.Applicative(function () {
    return applyAdditive;
}, Additive);
var monadAdditive = new Control_Monad.Monad(function () {
    return applicativeAdditive;
}, function () {
    return bindAdditive;
});
module.exports = {
    Additive: Additive, 
    newtypeAdditive: newtypeAdditive, 
    eqAdditive: eqAdditive, 
    ordAdditive: ordAdditive, 
    boundedAdditive: boundedAdditive, 
    functorAdditive: functorAdditive, 
    invariantAdditive: invariantAdditive, 
    applyAdditive: applyAdditive, 
    applicativeAdditive: applicativeAdditive, 
    bindAdditive: bindAdditive, 
    monadAdditive: monadAdditive, 
    extendAdditive: extendAdditive, 
    comonadAdditive: comonadAdditive, 
    showAdditive: showAdditive, 
    semigroupAdditive: semigroupAdditive, 
    monoidAdditive: monoidAdditive
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Prelude":139}],90:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Conj = function (x) {
    return x;
};
var showConj = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Conj " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semiringConj = function (dictHeytingAlgebra) {
    return new Data_Semiring.Semiring(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    }, Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
var semigroupConj = function (dictHeytingAlgebra) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    });
};
var ordConj = function (dictOrd) {
    return dictOrd;
};
var newtypeConj = new Data_Newtype.Newtype(function (n) {
    return n;
}, Conj);
var monoidConj = function (dictHeytingAlgebra) {
    return new Data_Monoid.Monoid(function () {
        return semigroupConj(dictHeytingAlgebra);
    }, Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
var invariantConj = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorConj = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendConj = new Control_Extend.Extend(function () {
    return functorConj;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqConj = function (dictEq) {
    return dictEq;
};
var comonadConj = new Control_Comonad.Comonad(function () {
    return extendConj;
}, Data_Newtype.unwrap(newtypeConj));
var boundedConj = function (dictBounded) {
    return dictBounded;
};
var applyConj = new Control_Apply.Apply(function () {
    return functorConj;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindConj = new Control_Bind.Bind(function () {
    return applyConj;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeConj = new Control_Applicative.Applicative(function () {
    return applyConj;
}, Conj);
var monadConj = new Control_Monad.Monad(function () {
    return applicativeConj;
}, function () {
    return bindConj;
});
module.exports = {
    Conj: Conj, 
    newtypeConj: newtypeConj, 
    eqConj: eqConj, 
    ordConj: ordConj, 
    boundedConj: boundedConj, 
    functorConj: functorConj, 
    invariantConj: invariantConj, 
    applyConj: applyConj, 
    applicativeConj: applicativeConj, 
    bindConj: bindConj, 
    monadConj: monadConj, 
    extendConj: extendConj, 
    comonadConj: comonadConj, 
    showConj: showConj, 
    semigroupConj: semigroupConj, 
    monoidConj: monoidConj, 
    semiringConj: semiringConj
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.HeytingAlgebra":76,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Prelude":139}],91:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Disj = function (x) {
    return x;
};
var showDisj = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Disj " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semiringDisj = function (dictHeytingAlgebra) {
    return new Data_Semiring.Semiring(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    }, Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};
var semigroupDisj = function (dictHeytingAlgebra) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    });
};
var ordDisj = function (dictOrd) {
    return dictOrd;
};
var newtypeDisj = new Data_Newtype.Newtype(function (n) {
    return n;
}, Disj);
var monoidDisj = function (dictHeytingAlgebra) {
    return new Data_Monoid.Monoid(function () {
        return semigroupDisj(dictHeytingAlgebra);
    }, Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};
var invariantDisj = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorDisj = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendDisj = new Control_Extend.Extend(function () {
    return functorDisj;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqDisj = function (dictEq) {
    return dictEq;
};
var comonadDisj = new Control_Comonad.Comonad(function () {
    return extendDisj;
}, Data_Newtype.unwrap(newtypeDisj));
var boundedDisj = function (dictBounded) {
    return dictBounded;
};
var applyDisj = new Control_Apply.Apply(function () {
    return functorDisj;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindDisj = new Control_Bind.Bind(function () {
    return applyDisj;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeDisj = new Control_Applicative.Applicative(function () {
    return applyDisj;
}, Disj);
var monadDisj = new Control_Monad.Monad(function () {
    return applicativeDisj;
}, function () {
    return bindDisj;
});
module.exports = {
    Disj: Disj, 
    newtypeDisj: newtypeDisj, 
    eqDisj: eqDisj, 
    ordDisj: ordDisj, 
    boundedDisj: boundedDisj, 
    functorDisj: functorDisj, 
    invariantDisj: invariantDisj, 
    applyDisj: applyDisj, 
    applicativeDisj: applicativeDisj, 
    bindDisj: bindDisj, 
    monadDisj: monadDisj, 
    extendDisj: extendDisj, 
    comonadDisj: comonadDisj, 
    showDisj: showDisj, 
    semigroupDisj: semigroupDisj, 
    monoidDisj: monoidDisj, 
    semiringDisj: semiringDisj
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.HeytingAlgebra":76,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Prelude":139}],92:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Dual = function (x) {
    return x;
};
var showDual = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Dual " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupDual = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semigroup.append(dictSemigroup)(v1)(v);
        };
    });
};
var ordDual = function (dictOrd) {
    return dictOrd;
};
var newtypeDual = new Data_Newtype.Newtype(function (n) {
    return n;
}, Dual);
var monoidDual = function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
        return semigroupDual(dictMonoid.Semigroup0());
    }, Data_Monoid.mempty(dictMonoid));
};
var invariantDual = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorDual = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendDual = new Control_Extend.Extend(function () {
    return functorDual;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqDual = function (dictEq) {
    return dictEq;
};
var comonadDual = new Control_Comonad.Comonad(function () {
    return extendDual;
}, Data_Newtype.unwrap(newtypeDual));
var boundedDual = function (dictBounded) {
    return dictBounded;
};
var applyDual = new Control_Apply.Apply(function () {
    return functorDual;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindDual = new Control_Bind.Bind(function () {
    return applyDual;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeDual = new Control_Applicative.Applicative(function () {
    return applyDual;
}, Dual);
var monadDual = new Control_Monad.Monad(function () {
    return applicativeDual;
}, function () {
    return bindDual;
});
module.exports = {
    Dual: Dual, 
    newtypeDual: newtypeDual, 
    eqDual: eqDual, 
    ordDual: ordDual, 
    boundedDual: boundedDual, 
    functorDual: functorDual, 
    invariantDual: invariantDual, 
    applyDual: applyDual, 
    applicativeDual: applicativeDual, 
    bindDual: bindDual, 
    monadDual: monadDual, 
    extendDual: extendDual, 
    comonadDual: comonadDual, 
    showDual: showDual, 
    semigroupDual: semigroupDual, 
    monoidDual: monoidDual
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139}],93:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Semigroup = require("../Data.Semigroup");
var Prelude = require("../Prelude");
var Endo = function (x) {
    return x;
};
var semigroupEndo = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return function ($11) {
            return v(v1($11));
        };
    };
});
var newtypeEndo = new Data_Newtype.Newtype(function (n) {
    return n;
}, Endo);
var monoidEndo = new Data_Monoid.Monoid(function () {
    return semigroupEndo;
}, Control_Category.id(Control_Category.categoryFn));
var invariantEndo = new Data_Functor_Invariant.Invariant(function (ab) {
    return function (ba) {
        return function (v) {
            return function ($12) {
                return ab(v(ba($12)));
            };
        };
    };
});
module.exports = {
    Endo: Endo, 
    newtypeEndo: newtypeEndo, 
    invariantEndo: invariantEndo, 
    semigroupEndo: semigroupEndo, 
    monoidEndo: monoidEndo
};

},{"../Control.Category":11,"../Control.Semigroupoid":37,"../Data.Functor.Invariant":72,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Semigroup":107,"../Prelude":139}],94:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Multiplicative = function (x) {
    return x;
};
var showMultiplicative = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Multiplicative " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupMultiplicative = function (dictSemiring) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semiring.mul(dictSemiring)(v)(v1);
        };
    });
};
var ordMultiplicative = function (dictOrd) {
    return dictOrd;
};
var newtypeMultiplicative = new Data_Newtype.Newtype(function (n) {
    return n;
}, Multiplicative);
var monoidMultiplicative = function (dictSemiring) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMultiplicative(dictSemiring);
    }, Data_Semiring.one(dictSemiring));
};
var invariantMultiplicative = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorMultiplicative = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendMultiplicative = new Control_Extend.Extend(function () {
    return functorMultiplicative;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqMultiplicative = function (dictEq) {
    return dictEq;
};
var comonadMultiplicative = new Control_Comonad.Comonad(function () {
    return extendMultiplicative;
}, Data_Newtype.unwrap(newtypeMultiplicative));
var boundedMultiplicative = function (dictBounded) {
    return dictBounded;
};
var applyMultiplicative = new Control_Apply.Apply(function () {
    return functorMultiplicative;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindMultiplicative = new Control_Bind.Bind(function () {
    return applyMultiplicative;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeMultiplicative = new Control_Applicative.Applicative(function () {
    return applyMultiplicative;
}, Multiplicative);
var monadMultiplicative = new Control_Monad.Monad(function () {
    return applicativeMultiplicative;
}, function () {
    return bindMultiplicative;
});
module.exports = {
    Multiplicative: Multiplicative, 
    newtypeMultiplicative: newtypeMultiplicative, 
    eqMultiplicative: eqMultiplicative, 
    ordMultiplicative: ordMultiplicative, 
    boundedMultiplicative: boundedMultiplicative, 
    functorMultiplicative: functorMultiplicative, 
    invariantMultiplicative: invariantMultiplicative, 
    applyMultiplicative: applyMultiplicative, 
    applicativeMultiplicative: applicativeMultiplicative, 
    bindMultiplicative: bindMultiplicative, 
    monadMultiplicative: monadMultiplicative, 
    extendMultiplicative: extendMultiplicative, 
    comonadMultiplicative: comonadMultiplicative, 
    showMultiplicative: showMultiplicative, 
    semigroupMultiplicative: semigroupMultiplicative, 
    monoidMultiplicative: monoidMultiplicative
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Monad":35,"../Data.Bounded":55,"../Data.Eq":61,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Prelude":139}],95:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Function = require("../Data.Function");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Monoid = function (Semigroup0, mempty) {
    this.Semigroup0 = Semigroup0;
    this.mempty = mempty;
};
var monoidUnit = new Monoid(function () {
    return Data_Semigroup.semigroupUnit;
}, Data_Unit.unit);
var monoidString = new Monoid(function () {
    return Data_Semigroup.semigroupString;
}, "");
var monoidArray = new Monoid(function () {
    return Data_Semigroup.semigroupArray;
}, [  ]);
var mempty = function (dict) {
    return dict.mempty;
};
var monoidFn = function (dictMonoid) {
    return new Monoid(function () {
        return Data_Semigroup.semigroupFn(dictMonoid.Semigroup0());
    }, Data_Function["const"](mempty(dictMonoid)));
};
var power = function (dictMonoid) {
    return function (x) {
        var go = function (p) {
            if (p <= 0) {
                return mempty(dictMonoid);
            };
            if (p === 1) {
                return x;
            };
            if (p % 2 === 0) {
                var x$prime = go(p / 2 | 0);
                return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x$prime);
            };
            if (Data_Boolean.otherwise) {
                var x$prime = go(p / 2 | 0);
                return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x));
            };
            throw new Error("Failed pattern match at Data.Monoid line 49, column 3 - line 53, column 57: " + [ p.constructor.name ]);
        };
        return go;
    };
};
module.exports = {
    Monoid: Monoid, 
    mempty: mempty, 
    power: power, 
    monoidUnit: monoidUnit, 
    monoidFn: monoidFn, 
    monoidString: monoidString, 
    monoidArray: monoidArray
};

},{"../Data.Boolean":53,"../Data.Eq":61,"../Data.EuclideanRing":63,"../Data.Function":71,"../Data.Ord":102,"../Data.Semigroup":107,"../Data.Unit":127,"../Prelude":139}],96:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
module.exports = {};

},{}],97:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Prelude = require("../Prelude");
var Newtype = function (unwrap, wrap) {
    this.unwrap = unwrap;
    this.wrap = wrap;
};
var wrap = function (dict) {
    return dict.wrap;
};
var unwrap = function (dict) {
    return dict.unwrap;
};
var underF2 = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($50) {
                            return function ($51) {
                                return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(Data_Function.on(f)(Data_Functor.map(dictFunctor)(wrap(dictNewtype)))($50)($51));
                            };
                        };
                    };
                };
            };
        };
    };
};
var underF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($52) {
                            return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(wrap(dictNewtype))($52)));
                        };
                    };
                };
            };
        };
    };
};
var under2 = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                return function ($53) {
                    return function ($54) {
                        return unwrap(dictNewtype1)(Data_Function.on(f)(wrap(dictNewtype))($53)($54));
                    };
                };
            };
        };
    };
};
var under = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                return function ($55) {
                    return unwrap(dictNewtype1)(f(wrap(dictNewtype)($55)));
                };
            };
        };
    };
};
var un = function (dictNewtype) {
    return function (v) {
        return unwrap(dictNewtype);
    };
};
var traverse = function (dictFunctor) {
    return function (dictNewtype) {
        return function (v) {
            return function (f) {
                return function ($56) {
                    return Data_Functor.map(dictFunctor)(wrap(dictNewtype))(f(unwrap(dictNewtype)($56)));
                };
            };
        };
    };
};
var overF2 = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($57) {
                            return function ($58) {
                                return Data_Functor.map(dictFunctor1)(wrap(dictNewtype1))(Data_Function.on(f)(Data_Functor.map(dictFunctor)(unwrap(dictNewtype)))($57)($58));
                            };
                        };
                    };
                };
            };
        };
    };
};
var overF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($59) {
                            return Data_Functor.map(dictFunctor1)(wrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(unwrap(dictNewtype))($59)));
                        };
                    };
                };
            };
        };
    };
};
var over2 = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                return function ($60) {
                    return function ($61) {
                        return wrap(dictNewtype1)(Data_Function.on(f)(unwrap(dictNewtype))($60)($61));
                    };
                };
            };
        };
    };
};
var over = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                return function ($62) {
                    return wrap(dictNewtype1)(f(unwrap(dictNewtype)($62)));
                };
            };
        };
    };
};
var op = function (dictNewtype) {
    return un(dictNewtype);
};
var collect = function (dictFunctor) {
    return function (dictNewtype) {
        return function (v) {
            return function (f) {
                return function ($63) {
                    return wrap(dictNewtype)(f(Data_Functor.map(dictFunctor)(unwrap(dictNewtype))($63)));
                };
            };
        };
    };
};
var alaF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        return function ($64) {
                            return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(wrap(dictNewtype))($64)));
                        };
                    };
                };
            };
        };
    };
};
var ala = function (dictFunctor) {
    return function (dictNewtype) {
        return function (dictNewtype1) {
            return function (v) {
                return function (f) {
                    return Data_Functor.map(dictFunctor)(unwrap(dictNewtype))(f(wrap(dictNewtype1)));
                };
            };
        };
    };
};
module.exports = {
    Newtype: Newtype, 
    ala: ala, 
    alaF: alaF, 
    collect: collect, 
    op: op, 
    over: over, 
    over2: over2, 
    overF: overF, 
    overF2: overF2, 
    traverse: traverse, 
    un: un, 
    under: under, 
    under2: under2, 
    underF: underF, 
    underF2: underF2, 
    unwrap: unwrap, 
    wrap: wrap
};

},{"../Control.Semigroupoid":37,"../Data.Function":71,"../Data.Functor":74,"../Prelude":139}],98:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Control_Plus = require("../Control.Plus");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Prelude = require("../Prelude");
var NonEmpty = (function () {
    function NonEmpty(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    NonEmpty.create = function (value0) {
        return function (value1) {
            return new NonEmpty(value0, value1);
        };
    };
    return NonEmpty;
})();
var tail = function (v) {
    return v.value1;
};
var singleton = function (dictPlus) {
    return function (a) {
        return new NonEmpty(a, Control_Plus.empty(dictPlus));
    };
};
var showNonEmpty = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(NonEmpty " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
var oneOf = function (dictAlternative) {
    return function (v) {
        return Control_Alt.alt((dictAlternative.Plus1()).Alt0())(Control_Applicative.pure(dictAlternative.Applicative0())(v.value0))(v.value1);
    };
};
var head = function (v) {
    return v.value0;
};
var functorNonEmpty = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return new NonEmpty(f(v.value0), Data_Functor.map(dictFunctor)(f)(v.value1));
        };
    });
};
var fromNonEmpty = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
var foldl1 = function (dictFoldable) {
    return function (f) {
        return function (v) {
            return Data_Foldable.foldl(dictFoldable)(f)(v.value0)(v.value1);
        };
    };
};
var foldableNonEmpty = function (dictFoldable) {
    return new Data_Foldable.Foldable(function (dictMonoid) {
        return function (f) {
            return function (v) {
                return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f)(v.value1));
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return Data_Foldable.foldl(dictFoldable)(f)(f(b)(v.value0))(v.value1);
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return f(v.value0)(Data_Foldable.foldr(dictFoldable)(f)(b)(v.value1));
            };
        };
    });
};
var traversableNonEmpty = function (dictTraversable) {
    return new Data_Traversable.Traversable(function () {
        return foldableNonEmpty(dictTraversable.Foldable1());
    }, function () {
        return functorNonEmpty(dictTraversable.Functor0());
    }, function (dictApplicative) {
        return function (v) {
            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(NonEmpty.create)(v.value0))(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value1));
        };
    }, function (dictApplicative) {
        return function (f) {
            return function (v) {
                return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(NonEmpty.create)(f(v.value0)))(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value1));
            };
        };
    });
};
var foldMap1 = function (dictSemigroup) {
    return function (dictFoldable) {
        return function (f) {
            return function (v) {
                return Data_Foldable.foldl(dictFoldable)(function (s) {
                    return function (a1) {
                        return Data_Semigroup.append(dictSemigroup)(s)(f(a1));
                    };
                })(f(v.value0))(v.value1);
            };
        };
    };
};
var fold1 = function (dictSemigroup) {
    return function (dictFoldable) {
        return foldMap1(dictSemigroup)(dictFoldable)(Control_Category.id(Control_Category.categoryFn));
    };
};
var eq1NonEmpty = function (dictEq1) {
    return new Data_Eq.Eq1(function (dictEq) {
        return function (v) {
            return function (v1) {
                return Data_Eq.eq(dictEq)(v.value0)(v1.value0) && Data_Eq.eq1(dictEq1)(dictEq)(v.value1)(v1.value1);
            };
        };
    });
};
var eqNonEmpty = function (dictEq1) {
    return function (dictEq) {
        return new Data_Eq.Eq(Data_Eq.eq1(eq1NonEmpty(dictEq1))(dictEq));
    };
};
var ord1NonEmpty = function (dictOrd1) {
    return new Data_Ord.Ord1(function () {
        return eq1NonEmpty(dictOrd1.Eq10());
    }, function (dictOrd) {
        return function (v) {
            return function (v1) {
                var v2 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
                if (v2 instanceof Data_Ordering.EQ) {
                    return Data_Ord.compare1(dictOrd1)(dictOrd)(v.value1)(v1.value1);
                };
                return v2;
            };
        };
    });
};
var ordNonEmpty = function (dictOrd1) {
    return function (dictOrd) {
        return new Data_Ord.Ord(function () {
            return eqNonEmpty(dictOrd1.Eq10())(dictOrd.Eq0());
        }, Data_Ord.compare1(ord1NonEmpty(dictOrd1))(dictOrd));
    };
};
module.exports = {
    NonEmpty: NonEmpty, 
    fold1: fold1, 
    foldMap1: foldMap1, 
    foldl1: foldl1, 
    fromNonEmpty: fromNonEmpty, 
    head: head, 
    oneOf: oneOf, 
    singleton: singleton, 
    tail: tail, 
    showNonEmpty: showNonEmpty, 
    eqNonEmpty: eqNonEmpty, 
    eq1NonEmpty: eq1NonEmpty, 
    ordNonEmpty: ordNonEmpty, 
    ord1NonEmpty: ord1NonEmpty, 
    functorNonEmpty: functorNonEmpty, 
    foldableNonEmpty: foldableNonEmpty, 
    traversableNonEmpty: traversableNonEmpty
};

},{"../Control.Alt":2,"../Control.Alternative":3,"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Control.Plus":36,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Semigroup":107,"../Data.Show":111,"../Data.Traversable":121,"../Prelude":139}],99:[function(require,module,exports){
"use strict";

exports.unsafeCompareImpl = function (lt) {
  return function (eq) {
    return function (gt) {
      return function (x) {
        return function (y) {
          return x < y ? lt : x === y ? eq : gt;
        };
      };
    };
  };
};

},{}],100:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Ordering = require("../Data.Ordering");
var unsafeCompare = $foreign.unsafeCompareImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
module.exports = {
    unsafeCompare: unsafeCompare
};

},{"../Data.Ordering":103,"./foreign":99}],101:[function(require,module,exports){
"use strict";

exports.ordArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      var i = 0;
      var xlen = xs.length;
      var ylen = ys.length;
      while (i < xlen && i < ylen) {
        var x = xs[i];
        var y = ys[i];
        var o = f(x)(y);
        if (o !== 0) {
          return o;
        }
        i++;
      }
      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};

},{}],102:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Ord_Unsafe = require("../Data.Ord.Unsafe");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
var Ord = function (Eq0, compare) {
    this.Eq0 = Eq0;
    this.compare = compare;
};
var Ord1 = function (Eq10, compare1) {
    this.Eq10 = Eq10;
    this.compare1 = compare1;
};
var ordVoid = new Ord(function () {
    return Data_Eq.eqVoid;
}, function (v) {
    return function (v1) {
        return Data_Ordering.EQ.value;
    };
});
var ordUnit = new Ord(function () {
    return Data_Eq.eqUnit;
}, function (v) {
    return function (v1) {
        return Data_Ordering.EQ.value;
    };
});
var ordString = new Ord(function () {
    return Data_Eq.eqString;
}, Data_Ord_Unsafe.unsafeCompare);
var ordOrdering = new Ord(function () {
    return Data_Ordering.eqOrdering;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Ordering.LT && v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.EQ) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.GT && v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.LT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.GT) {
            return Data_Ordering.GT.value;
        };
        throw new Error("Failed pattern match at Data.Ord line 69, column 3 - line 69, column 21: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var ordNumber = new Ord(function () {
    return Data_Eq.eqNumber;
}, Data_Ord_Unsafe.unsafeCompare);
var ordInt = new Ord(function () {
    return Data_Eq.eqInt;
}, Data_Ord_Unsafe.unsafeCompare);
var ordChar = new Ord(function () {
    return Data_Eq.eqChar;
}, Data_Ord_Unsafe.unsafeCompare);
var ordBoolean = new Ord(function () {
    return Data_Eq.eqBoolean;
}, Data_Ord_Unsafe.unsafeCompare);
var compare1 = function (dict) {
    return dict.compare1;
};
var compare = function (dict) {
    return dict.compare;
};
var comparing = function (dictOrd) {
    return function (f) {
        return Data_Function.on(compare(dictOrd))(f);
    };
};
var greaterThan = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.GT) {
                return true;
            };
            return false;
        };
    };
};
var greaterThanOrEq = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.LT) {
                return false;
            };
            return true;
        };
    };
};
var signum = function (dictOrd) {
    return function (dictRing) {
        return function (x) {
            var $33 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing.Semiring0()));
            if ($33) {
                return Data_Semiring.one(dictRing.Semiring0());
            };
            return Data_Ring.negate(dictRing)(Data_Semiring.one(dictRing.Semiring0()));
        };
    };
};
var lessThan = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.LT) {
                return true;
            };
            return false;
        };
    };
};
var lessThanOrEq = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            var v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.GT) {
                return false;
            };
            return true;
        };
    };
};
var max = function (dictOrd) {
    return function (x) {
        return function (y) {
            var v = compare(dictOrd)(x)(y);
            if (v instanceof Data_Ordering.LT) {
                return y;
            };
            if (v instanceof Data_Ordering.EQ) {
                return x;
            };
            if (v instanceof Data_Ordering.GT) {
                return x;
            };
            throw new Error("Failed pattern match at Data.Ord line 123, column 3 - line 126, column 12: " + [ v.constructor.name ]);
        };
    };
};
var min = function (dictOrd) {
    return function (x) {
        return function (y) {
            var v = compare(dictOrd)(x)(y);
            if (v instanceof Data_Ordering.LT) {
                return x;
            };
            if (v instanceof Data_Ordering.EQ) {
                return x;
            };
            if (v instanceof Data_Ordering.GT) {
                return y;
            };
            throw new Error("Failed pattern match at Data.Ord line 114, column 3 - line 117, column 12: " + [ v.constructor.name ]);
        };
    };
};
var ordArray = function (dictOrd) {
    return new Ord(function () {
        return Data_Eq.eqArray(dictOrd.Eq0());
    }, (function () {
        var toDelta = function (x) {
            return function (y) {
                var v = compare(dictOrd)(x)(y);
                if (v instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if (v instanceof Data_Ordering.LT) {
                    return 1;
                };
                if (v instanceof Data_Ordering.GT) {
                    return -1 | 0;
                };
                throw new Error("Failed pattern match at Data.Ord line 61, column 7 - line 66, column 1: " + [ v.constructor.name ]);
            };
        };
        return function (xs) {
            return function (ys) {
                return compare(ordInt)(0)($foreign.ordArrayImpl(toDelta)(xs)(ys));
            };
        };
    })());
};
var ord1Array = new Ord1(function () {
    return Data_Eq.eq1Array;
}, function (dictOrd) {
    return compare(ordArray(dictOrd));
});
var clamp = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                return min(dictOrd)(hi)(max(dictOrd)(low)(x));
            };
        };
    };
};
var between = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                if (lessThan(dictOrd)(x)(low)) {
                    return false;
                };
                if (greaterThan(dictOrd)(x)(hi)) {
                    return false;
                };
                return true;
            };
        };
    };
};
var abs = function (dictOrd) {
    return function (dictRing) {
        return function (x) {
            var $42 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing.Semiring0()));
            if ($42) {
                return x;
            };
            return Data_Ring.negate(dictRing)(x);
        };
    };
};
module.exports = {
    Ord: Ord, 
    Ord1: Ord1, 
    abs: abs, 
    between: between, 
    clamp: clamp, 
    compare: compare, 
    compare1: compare1, 
    comparing: comparing, 
    greaterThan: greaterThan, 
    greaterThanOrEq: greaterThanOrEq, 
    lessThan: lessThan, 
    lessThanOrEq: lessThanOrEq, 
    max: max, 
    min: min, 
    signum: signum, 
    ordBoolean: ordBoolean, 
    ordInt: ordInt, 
    ordNumber: ordNumber, 
    ordString: ordString, 
    ordChar: ordChar, 
    ordUnit: ordUnit, 
    ordVoid: ordVoid, 
    ordArray: ordArray, 
    ordOrdering: ordOrdering, 
    ord1Array: ord1Array
};

},{"../Data.Eq":61,"../Data.Function":71,"../Data.Ord.Unsafe":100,"../Data.Ordering":103,"../Data.Ring":105,"../Data.Semiring":109,"../Data.Unit":127,"../Data.Void":128,"./foreign":101}],103:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Eq = require("../Data.Eq");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var LT = (function () {
    function LT() {

    };
    LT.value = new LT();
    return LT;
})();
var GT = (function () {
    function GT() {

    };
    GT.value = new GT();
    return GT;
})();
var EQ = (function () {
    function EQ() {

    };
    EQ.value = new EQ();
    return EQ;
})();
var showOrdering = new Data_Show.Show(function (v) {
    if (v instanceof LT) {
        return "LT";
    };
    if (v instanceof GT) {
        return "GT";
    };
    if (v instanceof EQ) {
        return "EQ";
    };
    throw new Error("Failed pattern match at Data.Ordering line 27, column 3 - line 28, column 3: " + [ v.constructor.name ]);
});
var semigroupOrdering = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v instanceof LT) {
            return LT.value;
        };
        if (v instanceof GT) {
            return GT.value;
        };
        if (v instanceof EQ) {
            return v1;
        };
        throw new Error("Failed pattern match at Data.Ordering line 22, column 3 - line 22, column 19: " + [ v.constructor.name, v1.constructor.name ]);
    };
});
var invert = function (v) {
    if (v instanceof GT) {
        return LT.value;
    };
    if (v instanceof EQ) {
        return EQ.value;
    };
    if (v instanceof LT) {
        return GT.value;
    };
    throw new Error("Failed pattern match at Data.Ordering line 34, column 1 - line 34, column 15: " + [ v.constructor.name ]);
};
var eqOrdering = new Data_Eq.Eq(function (v) {
    return function (v1) {
        if (v instanceof LT && v1 instanceof LT) {
            return true;
        };
        if (v instanceof GT && v1 instanceof GT) {
            return true;
        };
        if (v instanceof EQ && v1 instanceof EQ) {
            return true;
        };
        return false;
    };
});
module.exports = {
    LT: LT, 
    GT: GT, 
    EQ: EQ, 
    invert: invert, 
    eqOrdering: eqOrdering, 
    semigroupOrdering: semigroupOrdering, 
    showOrdering: showOrdering
};

},{"../Data.Eq":61,"../Data.Semigroup":107,"../Data.Show":111}],104:[function(require,module,exports){
"use strict";

exports.intSub = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x - y | 0;
  };
};

exports.numSub = function (n1) {
  return function (n2) {
    return n1 - n2;
  };
};

},{}],105:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Semiring = require("../Data.Semiring");
var Data_Unit = require("../Data.Unit");
var Ring = function (Semiring0, sub) {
    this.Semiring0 = Semiring0;
    this.sub = sub;
};
var sub = function (dict) {
    return dict.sub;
};
var ringUnit = new Ring(function () {
    return Data_Semiring.semiringUnit;
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
});
var ringNumber = new Ring(function () {
    return Data_Semiring.semiringNumber;
}, $foreign.numSub);
var ringInt = new Ring(function () {
    return Data_Semiring.semiringInt;
}, $foreign.intSub);
var ringFn = function (dictRing) {
    return new Ring(function () {
        return Data_Semiring.semiringFn(dictRing.Semiring0());
    }, function (f) {
        return function (g) {
            return function (x) {
                return sub(dictRing)(f(x))(g(x));
            };
        };
    });
};
var negate = function (dictRing) {
    return function (a) {
        return sub(dictRing)(Data_Semiring.zero(dictRing.Semiring0()))(a);
    };
};
module.exports = {
    Ring: Ring, 
    negate: negate, 
    sub: sub, 
    ringInt: ringInt, 
    ringNumber: ringNumber, 
    ringUnit: ringUnit, 
    ringFn: ringFn
};

},{"../Data.Semiring":109,"../Data.Unit":127,"./foreign":104}],106:[function(require,module,exports){
"use strict";

exports.concatString = function (s1) {
  return function (s2) {
    return s1 + s2;
  };
};

exports.concatArray = function (xs) {
  return function (ys) {
    if (xs.length === 0) return ys;
    if (ys.length === 0) return xs;
    return xs.concat(ys);
  };
};

},{}],107:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
var Semigroup = function (append) {
    this.append = append;
};
var semigroupVoid = new Semigroup(function (v) {
    return Data_Void.absurd;
});
var semigroupUnit = new Semigroup(function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
});
var semigroupString = new Semigroup($foreign.concatString);
var semigroupArray = new Semigroup($foreign.concatArray);
var append = function (dict) {
    return dict.append;
};
var semigroupFn = function (dictSemigroup) {
    return new Semigroup(function (f) {
        return function (g) {
            return function (x) {
                return append(dictSemigroup)(f(x))(g(x));
            };
        };
    });
};
module.exports = {
    Semigroup: Semigroup, 
    append: append, 
    semigroupString: semigroupString, 
    semigroupUnit: semigroupUnit, 
    semigroupVoid: semigroupVoid, 
    semigroupFn: semigroupFn, 
    semigroupArray: semigroupArray
};

},{"../Data.Unit":127,"../Data.Void":128,"./foreign":106}],108:[function(require,module,exports){
"use strict";

exports.intAdd = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x + y | 0;
  };
};

exports.intMul = function (x) {
  return function (y) {
    /* jshint bitwise: false */
    return x * y | 0;
  };
};

exports.numAdd = function (n1) {
  return function (n2) {
    return n1 + n2;
  };
};

exports.numMul = function (n1) {
  return function (n2) {
    return n1 * n2;
  };
};

},{}],109:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Unit = require("../Data.Unit");
var Semiring = function (add, mul, one, zero) {
    this.add = add;
    this.mul = mul;
    this.one = one;
    this.zero = zero;
};
var zero = function (dict) {
    return dict.zero;
};
var semiringUnit = new Semiring(function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, function (v) {
    return function (v1) {
        return Data_Unit.unit;
    };
}, Data_Unit.unit, Data_Unit.unit);
var semiringNumber = new Semiring($foreign.numAdd, $foreign.numMul, 1.0, 0.0);
var semiringInt = new Semiring($foreign.intAdd, $foreign.intMul, 1, 0);
var one = function (dict) {
    return dict.one;
};
var mul = function (dict) {
    return dict.mul;
};
var add = function (dict) {
    return dict.add;
};
var semiringFn = function (dictSemiring) {
    return new Semiring(function (f) {
        return function (g) {
            return function (x) {
                return add(dictSemiring)(f(x))(g(x));
            };
        };
    }, function (f) {
        return function (g) {
            return function (x) {
                return mul(dictSemiring)(f(x))(g(x));
            };
        };
    }, function (v) {
        return one(dictSemiring);
    }, function (v) {
        return zero(dictSemiring);
    });
};
module.exports = {
    Semiring: Semiring, 
    add: add, 
    mul: mul, 
    one: one, 
    zero: zero, 
    semiringInt: semiringInt, 
    semiringNumber: semiringNumber, 
    semiringFn: semiringFn, 
    semiringUnit: semiringUnit
};

},{"../Data.Unit":127,"./foreign":108}],110:[function(require,module,exports){
"use strict";

exports.showIntImpl = function (n) {
  return n.toString();
};

exports.showNumberImpl = function (n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};

exports.showCharImpl = function (c) {
  var code = c.charCodeAt(0);
  if (code < 0x20 || code === 0x7F) {
    switch (c) {
      case "\x07": return "'\\a'";
      case "\b": return "'\\b'";
      case "\f": return "'\\f'";
      case "\n": return "'\\n'";
      case "\r": return "'\\r'";
      case "\t": return "'\\t'";
      case "\v": return "'\\v'";
    }
    return "'\\" + code.toString(10) + "'";
  }
  return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
};

exports.showStringImpl = function (s) {
  var l = s.length;
  return "\"" + s.replace(
    /[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
    function (c, i) {
      switch (c) {
        case "\"":
        case "\\":
          return "\\" + c;
        case "\x07": return "\\a";
        case "\b": return "\\b";
        case "\f": return "\\f";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\t": return "\\t";
        case "\v": return "\\v";
      }
      var k = i + 1;
      var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty;
    }
  ) + "\"";
};

exports.showArrayImpl = function (f) {
  return function (xs) {
    var ss = [];
    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }
    return "[" + ss.join(",") + "]";
  };
};

},{}],111:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Show = function (show) {
    this.show = show;
};
var showString = new Show($foreign.showStringImpl);
var showNumber = new Show($foreign.showNumberImpl);
var showInt = new Show($foreign.showIntImpl);
var showChar = new Show($foreign.showCharImpl);
var showBoolean = new Show(function (v) {
    if (v) {
        return "true";
    };
    if (!v) {
        return "false";
    };
    throw new Error("Failed pattern match at Data.Show line 13, column 3 - line 14, column 3: " + [ v.constructor.name ]);
});
var show = function (dict) {
    return dict.show;
};
var showArray = function (dictShow) {
    return new Show($foreign.showArrayImpl(show(dictShow)));
};
module.exports = {
    Show: Show, 
    show: show, 
    showBoolean: showBoolean, 
    showInt: showInt, 
    showNumber: showNumber, 
    showChar: showChar, 
    showString: showString, 
    showArray: showArray
};

},{"./foreign":110}],112:[function(require,module,exports){
"use strict";

exports["new"] = function () {
  return {};
};

exports.peekImpl = function (just) {
  return function (nothing) {
    return function (m) {
      return function (k) {
        return function () {
          return {}.hasOwnProperty.call(m, k) ? just(m[k]) : nothing;
        };
      };
    };
  };
};

exports.poke = function (m) {
  return function (k) {
    return function (v) {
      return function () {
        m[k] = v;
        return m;
      };
    };
  };
};

exports["delete"] = function (m) {
  return function (k) {
    return function () {
      delete m[k];
      return m;
    };
  };
};

},{}],113:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_ST = require("../Control.Monad.ST");
var Data_Maybe = require("../Data.Maybe");
var peek = $foreign.peekImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
module.exports = {
    peek: peek, 
    "delete": $foreign["delete"], 
    "new": $foreign["new"], 
    poke: $foreign.poke
};

},{"../Control.Monad.Eff":22,"../Control.Monad.ST":29,"../Data.Maybe":88,"./foreign":112}],114:[function(require,module,exports){
"use strict";

exports._copyEff = function (m) {
  return function () {
    var r = {};
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r[k] = m[k];
      }
    }
    return r;
  };
};

exports.empty = {};

exports.runST = function (f) {
  return f;
};

exports._fmapStrMap = function (m0, f) {
  var m = {};
  for (var k in m0) {
    if (hasOwnProperty.call(m0, k)) {
      m[k] = f(m0[k]);
    }
  }
  return m;
};

exports._mapWithKey = function (m0, f) {
  var m = {};
  for (var k in m0) {
    if (hasOwnProperty.call(m0, k)) {
      m[k] = f(k)(m0[k]);
    }
  }
  return m;
};

exports._foldM = function (bind) {
  return function (f) {
    return function (mz) {
      return function (m) {
        var acc = mz;
        function g(k) {
          return function (z) {
            return f(z)(k)(m[k]);
          };
        }
        for (var k in m) {
          if (hasOwnProperty.call(m, k)) {
            acc = bind(acc)(g(k));
          }
        }
        return acc;
      };
    };
  };
};

exports._foldSCStrMap = function (m, z, f, fromMaybe) {
  var acc = z;
  for (var k in m) {
    if (hasOwnProperty.call(m, k)) {
      var maybeR = f(acc)(k)(m[k]);
      var r = fromMaybe(null)(maybeR);
      if (r === null) return acc;
      else acc = r;
    }
  }
  return acc;
};

exports.all = function (f) {
  return function (m) {
    for (var k in m) {
      if (hasOwnProperty.call(m, k) && !f(k)(m[k])) return false;
    }
    return true;
  };
};

exports.size = function (m) {
  var s = 0;
  for (var k in m) {
    if (hasOwnProperty.call(m, k)) {
      ++s;
    }
  }
  return s;
};

exports._lookup = function (no, yes, k, m) {
  return k in m ? yes(m[k]) : no;
};

exports._unsafeDeleteStrMap = function (m, k) {
  delete m[k];
  return m;
};

exports._lookupST = function (no, yes, k, m) {
  return function () {
    return k in m ? yes(m[k]) : no;
  };
};

function _collect(f) {
  return function (m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}

exports._collect = _collect;

exports.keys = Object.keys || _collect(function (k) {
  return function () { return k; };
});

},{}],115:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Function_Uncurried = require("../Data.Function.Uncurried");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_StrMap_ST = require("../Data.StrMap.ST");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Prelude = require("../Prelude");
var values = $foreign._collect(function (v) {
    return function (v1) {
        return v1;
    };
});
var toUnfoldable = function (dictUnfoldable) {
    return function ($40) {
        return Data_Array.toUnfoldable(dictUnfoldable)($foreign._collect(Data_Tuple.Tuple.create)($40));
    };
};
var toArray = $foreign._collect(Data_Tuple.Tuple.create);
var thawST = $foreign._copyEff;
var showStrMap = function (dictShow) {
    return new Data_Show.Show(function (m) {
        return "(fromFoldable " + (Data_Show.show(Data_Show.showArray(Data_Tuple.showTuple(Data_Show.showString)(dictShow)))(toArray(m)) + ")");
    });
};
var pureST = function (f) {
    return Control_Monad_Eff.runPure($foreign.runST(f));
};
var singleton = function (k) {
    return function (v) {
        return pureST(function __do() {
            var v1 = Data_StrMap_ST["new"]();
            var v2 = Data_StrMap_ST.poke(v1)(k)(v)();
            return v1;
        });
    };
};
var mutate = function (f) {
    return function (m) {
        return pureST(function __do() {
            var v = thawST(m)();
            var v1 = f(v)();
            return v;
        });
    };
};
var member = Data_Function_Uncurried.runFn4($foreign._lookup)(false)(Data_Function["const"](true));
var mapWithKey = function (f) {
    return function (m) {
        return $foreign._mapWithKey(m, f);
    };
};
var lookup = Data_Function_Uncurried.runFn4($foreign._lookup)(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
var isSubmap = function (dictEq) {
    return function (m1) {
        return function (m2) {
            var f = function (k) {
                return function (v) {
                    return $foreign._lookup(false, Data_Eq.eq(dictEq)(v), k, m2);
                };
            };
            return $foreign.all(f)(m1);
        };
    };
};
var isEmpty = $foreign.all(function (v) {
    return function (v1) {
        return false;
    };
});
var insert = function (k) {
    return function (v) {
        return mutate(function (s) {
            return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_StrMap_ST.poke(s)(k)(v));
        });
    };
};
var functorStrMap = new Data_Functor.Functor(function (f) {
    return function (m) {
        return $foreign._fmapStrMap(m, f);
    };
});
var fromFoldableWith = function (dictFoldable) {
    return function (f) {
        return function (l) {
            return pureST(function __do() {
                var v = Data_StrMap_ST["new"]();
                Data_Foldable.for_(Control_Monad_Eff.applicativeEff)(dictFoldable)(l)(function (v1) {
                    return Control_Bind.bind(Control_Monad_Eff.bindEff)($foreign._lookupST(v1.value1, f(v1.value1), v1.value0, v))(Data_StrMap_ST.poke(v)(v1.value0));
                })();
                return v;
            });
        };
    };
};
var fromFoldable = function (dictFoldable) {
    return function (l) {
        return pureST(function __do() {
            var v = Data_StrMap_ST["new"]();
            Data_Foldable.for_(Control_Monad_Eff.applicativeEff)(dictFoldable)(l)(function (v1) {
                return Data_StrMap_ST.poke(v)(v1.value0)(v1.value1);
            })();
            return v;
        });
    };
};
var freezeST = $foreign._copyEff;
var foldMaybe = function (f) {
    return function (z) {
        return function (m) {
            return $foreign._foldSCStrMap(m, z, f, Data_Maybe.fromMaybe);
        };
    };
};
var foldM = function (dictMonad) {
    return function (f) {
        return function (z) {
            return $foreign._foldM(Control_Bind.bind(dictMonad.Bind1()))(f)(Control_Applicative.pure(dictMonad.Applicative0())(z));
        };
    };
};
var semigroupStrMap = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (m1) {
        return function (m2) {
            return mutate(function (s1) {
                return Data_Functor["void"](Control_Monad_Eff.functorEff)(foldM(Control_Monad_Eff.monadEff)(function (s2) {
                    return function (k) {
                        return function (v2) {
                            return Data_StrMap_ST.poke(s2)(k)($foreign._lookup(v2, function (v1) {
                                return Data_Semigroup.append(dictSemigroup)(v1)(v2);
                            }, k, m2));
                        };
                    };
                })(s1)(m1));
            })(m2);
        };
    });
};
var monoidStrMap = function (dictSemigroup) {
    return new Data_Monoid.Monoid(function () {
        return semigroupStrMap(dictSemigroup);
    }, $foreign.empty);
};
var union = function (m) {
    return mutate(function (s) {
        return Data_Functor["void"](Control_Monad_Eff.functorEff)(foldM(Control_Monad_Eff.monadEff)(Data_StrMap_ST.poke)(s)(m));
    });
};
var unions = function (dictFoldable) {
    return Data_Foldable.foldl(dictFoldable)(union)($foreign.empty);
};
var fold = $foreign._foldM(Data_Function.applyFlipped);
var foldMap = function (dictMonoid) {
    return function (f) {
        return fold(function (acc) {
            return function (k) {
                return function (v) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(k)(v));
                };
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
};
var foldableStrMap = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return foldMap(dictMonoid)(Data_Function["const"](f));
    };
}, function (f) {
    return fold(function (z) {
        return function (v) {
            return f(z);
        };
    });
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldr(Data_Foldable.foldableArray)(f)(z)(values(m));
        };
    };
});
var traversableStrMap = new Data_Traversable.Traversable(function () {
    return foldableStrMap;
}, function () {
    return functorStrMap;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableStrMap)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return function (ms) {
            return Data_Foldable.foldr(Data_Foldable.foldableArray)(function (x) {
                return function (acc) {
                    return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(union)(x))(acc);
                };
            })(Control_Applicative.pure(dictApplicative)($foreign.empty))(Data_Functor.map(Data_Functor.functorArray)(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Tuple.uncurry(singleton)))(Data_Functor.map(Data_Functor.functorArray)(Data_Traversable.traverse(Data_Tuple.traversableTuple)(dictApplicative)(f))(toArray(ms))));
        };
    };
});
var eqStrMap = function (dictEq) {
    return new Data_Eq.Eq(function (m1) {
        return function (m2) {
            return isSubmap(dictEq)(m1)(m2) && isSubmap(dictEq)(m2)(m1);
        };
    });
};
var eq1StrMap = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqStrMap(dictEq));
});
var $$delete = function (k) {
    return mutate(function (s) {
        return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_StrMap_ST["delete"](s)(k));
    });
};
var pop = function (k) {
    return function (m) {
        return Data_Functor.mapFlipped(Data_Maybe.functorMaybe)(lookup(k)(m))(function (a) {
            return new Data_Tuple.Tuple(a, $$delete(k)(m));
        });
    };
};
var alter = function (f) {
    return function (k) {
        return function (m) {
            var v = f(lookup(k)(m));
            if (v instanceof Data_Maybe.Nothing) {
                return $$delete(k)(m);
            };
            if (v instanceof Data_Maybe.Just) {
                return insert(k)(v.value0)(m);
            };
            throw new Error("Failed pattern match at Data.StrMap line 187, column 15 - line 189, column 25: " + [ v.constructor.name ]);
        };
    };
};
var update = function (f) {
    return function (k) {
        return function (m) {
            return alter(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
        };
    };
};
module.exports = {
    alter: alter, 
    "delete": $$delete, 
    fold: fold, 
    foldM: foldM, 
    foldMap: foldMap, 
    foldMaybe: foldMaybe, 
    freezeST: freezeST, 
    fromFoldable: fromFoldable, 
    fromFoldableWith: fromFoldableWith, 
    insert: insert, 
    isEmpty: isEmpty, 
    isSubmap: isSubmap, 
    lookup: lookup, 
    mapWithKey: mapWithKey, 
    member: member, 
    pop: pop, 
    pureST: pureST, 
    singleton: singleton, 
    thawST: thawST, 
    toUnfoldable: toUnfoldable, 
    union: union, 
    unions: unions, 
    update: update, 
    values: values, 
    functorStrMap: functorStrMap, 
    foldableStrMap: foldableStrMap, 
    traversableStrMap: traversableStrMap, 
    eqStrMap: eqStrMap, 
    eq1StrMap: eq1StrMap, 
    showStrMap: showStrMap, 
    semigroupStrMap: semigroupStrMap, 
    monoidStrMap: monoidStrMap, 
    all: $foreign.all, 
    empty: $foreign.empty, 
    keys: $foreign.keys, 
    runST: $foreign.runST, 
    size: $foreign.size
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Monad.Eff":22,"../Control.Monad.ST":29,"../Control.Semigroupoid":37,"../Data.Array":43,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Function.Uncurried":70,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Semigroup":107,"../Data.Show":111,"../Data.StrMap.ST":113,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unfoldable":125,"../Prelude":139,"./foreign":114}],116:[function(require,module,exports){
"use strict";

exports.charCodeAt = function (i) {
  return function (s) {
    if (i >= 0 && i < s.length) return s.charCodeAt(i);
    throw new Error("Data.String.Unsafe.charCodeAt: Invalid index.");
  };
};

exports.charAt = function (i) {
  return function (s) {
    if (i >= 0 && i < s.length) return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

exports.char = function (s) {
  if (s.length === 1) return s.charAt(0);
  throw new Error("Data.String.Unsafe.char: Expected string of length 1.");
};

},{}],117:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
module.exports = {
    "char": $foreign["char"], 
    charAt: $foreign.charAt, 
    charCodeAt: $foreign.charCodeAt
};

},{"./foreign":116}],118:[function(require,module,exports){
"use strict";

exports._charAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (s) {
        return i >= 0 && i < s.length ? just(s.charAt(i)) : nothing;
      };
    };
  };
};

exports.singleton = function (c) {
  return c;
};

exports._charCodeAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (s) {
        return i >= 0 && i < s.length ? just(s.charCodeAt(i)) : nothing;
      };
    };
  };
};

exports._toChar = function (just) {
  return function (nothing) {
    return function (s) {
      return s.length === 1 ? just(s) : nothing;
    };
  };
};

exports.fromCharArray = function (a) {
  return a.join("");
};

exports._indexOf = function (just) {
  return function (nothing) {
    return function (x) {
      return function (s) {
        var i = s.indexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};

exports["_indexOf'"] = function (just) {
  return function (nothing) {
    return function (x) {
      return function (startAt) {
        return function (s) {
          if (startAt < 0 || startAt > s.length) return nothing;
          var i = s.indexOf(x, startAt);
          return i === -1 ? nothing : just(i);
        };
      };
    };
  };
};

exports._lastIndexOf = function (just) {
  return function (nothing) {
    return function (x) {
      return function (s) {
        var i = s.lastIndexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};

exports["_lastIndexOf'"] = function (just) {
  return function (nothing) {
    return function (x) {
      return function (startAt) {
        return function (s) {
          if (startAt < 0 || startAt > s.length) return nothing;
          var i = s.lastIndexOf(x, startAt);
          return i === -1 ? nothing : just(i);
        };
      };
    };
  };
};

exports.length = function (s) {
  return s.length;
};

exports._localeCompare = function (lt) {
  return function (eq) {
    return function (gt) {
      return function (s1) {
        return function (s2) {
          var result = s1.localeCompare(s2);
          return result < 0 ? lt : result > 0 ? gt : eq;
        };
      };
    };
  };
};

exports.replace = function (s1) {
  return function (s2) {
    return function (s3) {
      return s3.replace(s1, s2);
    };
  };
};

exports.replaceAll = function (s1) {
  return function (s2) {
    return function (s3) {
      return s3.replace(new RegExp(s1.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), s2);
    };
  };
};

exports.take = function (n) {
  return function (s) {
    return s.substr(0, n);
  };
};

exports.drop = function (n) {
  return function (s) {
    return s.substring(n);
  };
};

exports.count = function (p) {
  return function (s) {
    var i = 0;
    while (i < s.length && p(s.charAt(i))) i++;
    return i;
  };
};

exports.split = function (sep) {
  return function (s) {
    return s.split(sep);
  };
};

exports._splitAt = function (just) {
  return function (nothing) {
    return function (i) {
      return function (s) {
        return i >= 0 && i < s.length ?
               just({ before: s.substring(0, i), after: s.substring(i) }) :
               nothing;
      };
    };
  };
};

exports.toCharArray = function (s) {
  return s.split("");
};

exports.toLower = function (s) {
  return s.toLowerCase();
};

exports.toUpper = function (s) {
  return s.toUpperCase();
};

exports.trim = function (s) {
  return s.trim();
};

exports.joinWith = function (s) {
  return function (xs) {
    return xs.join(s);
  };
};

},{}],119:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_String_Unsafe = require("../Data.String.Unsafe");
var Prelude = require("../Prelude");
var Replacement = function (x) {
    return x;
};
var Pattern = function (x) {
    return x;
};
var uncons = function (v) {
    if (v === "") {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just({
        head: Data_String_Unsafe.charAt(0)(v), 
        tail: $foreign.drop(1)(v)
    });
};
var toChar = $foreign._toChar(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var takeWhile = function (p) {
    return function (s) {
        return $foreign.take($foreign.count(p)(s))(s);
    };
};
var splitAt = $foreign._splitAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var showReplacement = new Data_Show.Show(function (v) {
    return "(Replacement " + (v + ")");
});
var showPattern = new Data_Show.Show(function (v) {
    return "(Pattern " + (v + ")");
});
var $$null = function (s) {
    return s === "";
};
var newtypeReplacement = new Data_Newtype.Newtype(function (n) {
    return n;
}, Replacement);
var newtypePattern = new Data_Newtype.Newtype(function (n) {
    return n;
}, Pattern);
var localeCompare = $foreign._localeCompare(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
var lastIndexOf$prime = $foreign["_lastIndexOf'"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var lastIndexOf = $foreign._lastIndexOf(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var stripSuffix = function (v) {
    return function (str) {
        var v1 = lastIndexOf(v)(str);
        if (v1 instanceof Data_Maybe.Just && v1.value0 === ($foreign.length(str) - $foreign.length(v) | 0)) {
            return Data_Maybe.Just.create($foreign.take(v1.value0)(str));
        };
        return Data_Maybe.Nothing.value;
    };
};
var indexOf$prime = $foreign["_indexOf'"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var indexOf = $foreign._indexOf(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var stripPrefix = function (v) {
    return function (str) {
        var v1 = indexOf(v)(str);
        if (v1 instanceof Data_Maybe.Just && v1.value0 === 0) {
            return Data_Maybe.Just.create($foreign.drop($foreign.length(v))(str));
        };
        return Data_Maybe.Nothing.value;
    };
};
var eqReplacement = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordReplacement = new Data_Ord.Ord(function () {
    return eqReplacement;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
var eqPattern = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordPattern = new Data_Ord.Ord(function () {
    return eqPattern;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
var dropWhile = function (p) {
    return function (s) {
        return $foreign.drop($foreign.count(p)(s))(s);
    };
};
var contains = function (pat) {
    return function ($48) {
        return Data_Maybe.isJust(indexOf(pat)($48));
    };
};
var charCodeAt = $foreign._charCodeAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var charAt = $foreign._charAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
module.exports = {
    Pattern: Pattern, 
    Replacement: Replacement, 
    charAt: charAt, 
    charCodeAt: charCodeAt, 
    contains: contains, 
    dropWhile: dropWhile, 
    indexOf: indexOf, 
    "indexOf'": indexOf$prime, 
    lastIndexOf: lastIndexOf, 
    "lastIndexOf'": lastIndexOf$prime, 
    localeCompare: localeCompare, 
    "null": $$null, 
    splitAt: splitAt, 
    stripPrefix: stripPrefix, 
    stripSuffix: stripSuffix, 
    takeWhile: takeWhile, 
    toChar: toChar, 
    uncons: uncons, 
    eqPattern: eqPattern, 
    ordPattern: ordPattern, 
    newtypePattern: newtypePattern, 
    showPattern: showPattern, 
    eqReplacement: eqReplacement, 
    ordReplacement: ordReplacement, 
    newtypeReplacement: newtypeReplacement, 
    showReplacement: showReplacement, 
    count: $foreign.count, 
    drop: $foreign.drop, 
    fromCharArray: $foreign.fromCharArray, 
    joinWith: $foreign.joinWith, 
    length: $foreign.length, 
    replace: $foreign.replace, 
    replaceAll: $foreign.replaceAll, 
    singleton: $foreign.singleton, 
    split: $foreign.split, 
    take: $foreign.take, 
    toCharArray: $foreign.toCharArray, 
    toLower: $foreign.toLower, 
    toUpper: $foreign.toUpper, 
    trim: $foreign.trim
};

},{"../Control.Semigroupoid":37,"../Data.Eq":61,"../Data.Function":71,"../Data.Maybe":88,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Ring":105,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Data.String.Unsafe":117,"../Prelude":139,"./foreign":118}],120:[function(require,module,exports){
"use strict";

// jshint maxparams: 3

exports.traverseArrayImpl = function () {
  function Cont(fn) {
    this.fn = fn;
  }

  var emptyList = {};

  var ConsCell = function (head, tail) {
    this.head = head;
    this.tail = tail;
  };

  function consList(x) {
    return function (xs) {
      return new ConsCell(x, xs);
    };
  }

  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }

  return function (apply) {
    return function (map) {
      return function (pure) {
        return function (f) {
          var buildFrom = function (x, ys) {
            return apply(map(consList)(f(x)))(ys);
          };

          var go = function (acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last = xs[currentLen - 1];
              return new Cont(function () {
                return go(buildFrom(last, acc), currentLen - 1, xs);
              });
            }
          };

          return function (array) {
            var result = go(pure(emptyList), array.length, array);
            while (result instanceof Cont) {
              result = result.fn();
            }

            return map(listToArray)(result);
          };
        };
      };
    };
  };
}();

},{}],121:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Category = require("../Control.Category");
var Data_Foldable = require("../Data.Foldable");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Maybe_Last = require("../Data.Maybe.Last");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Monoid_Conj = require("../Data.Monoid.Conj");
var Data_Monoid_Disj = require("../Data.Monoid.Disj");
var Data_Monoid_Dual = require("../Data.Monoid.Dual");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative");
var Prelude = require("../Prelude");
var StateL = function (x) {
    return x;
};
var StateR = function (x) {
    return x;
};
var Traversable = function (Foldable1, Functor0, sequence, traverse) {
    this.Foldable1 = Foldable1;
    this.Functor0 = Functor0;
    this.sequence = sequence;
    this.traverse = traverse;
};
var traverse = function (dict) {
    return dict.traverse;
};
var traversableMultiplicative = new Traversable(function () {
    return Data_Foldable.foldableMultiplicative;
}, function () {
    return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Multiplicative.Multiplicative)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
        };
    };
});
var traversableMaybe = new Traversable(function () {
    return Data_Foldable.foldableMaybe;
}, function () {
    return Data_Maybe.functorMaybe;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
        };
        if (v instanceof Data_Maybe.Just) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Maybe.Just.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Traversable line 87, column 3 - line 87, column 35: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
            };
            if (v1 instanceof Data_Maybe.Just) {
                return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Maybe.Just.create)(v(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Traversable line 85, column 3 - line 85, column 37: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var traversableDual = new Traversable(function () {
    return Data_Foldable.foldableDual;
}, function () {
    return Data_Monoid_Dual.functorDual;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Dual.Dual)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Dual.Dual)(f(v));
        };
    };
});
var traversableDisj = new Traversable(function () {
    return Data_Foldable.foldableDisj;
}, function () {
    return Data_Monoid_Disj.functorDisj;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Disj.Disj)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Disj.Disj)(f(v));
        };
    };
});
var traversableConj = new Traversable(function () {
    return Data_Foldable.foldableConj;
}, function () {
    return Data_Monoid_Conj.functorConj;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Conj.Conj)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Conj.Conj)(f(v));
        };
    };
});
var traversableAdditive = new Traversable(function () {
    return Data_Foldable.foldableAdditive;
}, function () {
    return Data_Monoid_Additive.functorAdditive;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Additive.Additive)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Additive.Additive)(f(v));
        };
    };
});
var stateR = function (v) {
    return v;
};
var stateL = function (v) {
    return v;
};
var sequenceDefault = function (dictTraversable) {
    return function (dictApplicative) {
        return traverse(dictTraversable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
    };
};
var traversableArray = new Traversable(function () {
    return Data_Foldable.foldableArray;
}, function () {
    return Data_Functor.functorArray;
}, function (dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
}, function (dictApplicative) {
    return $foreign.traverseArrayImpl(Control_Apply.apply(dictApplicative.Apply0()))(Data_Functor.map((dictApplicative.Apply0()).Functor0()))(Control_Applicative.pure(dictApplicative));
});
var sequence = function (dict) {
    return dict.sequence;
};
var traversableFirst = new Traversable(function () {
    return Data_Foldable.foldableFirst;
}, function () {
    return Data_Maybe_First.functorFirst;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_First.First)(sequence(traversableMaybe)(dictApplicative)(v));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_First.First)(traverse(traversableMaybe)(dictApplicative)(f)(v));
        };
    };
});
var traversableLast = new Traversable(function () {
    return Data_Foldable.foldableLast;
}, function () {
    return Data_Maybe_Last.functorLast;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_Last.Last)(sequence(traversableMaybe)(dictApplicative)(v));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_Last.Last)(traverse(traversableMaybe)(dictApplicative)(f)(v));
        };
    };
});
var traverseDefault = function (dictTraversable) {
    return function (dictApplicative) {
        return function (f) {
            return function (ta) {
                return sequence(dictTraversable)(dictApplicative)(Data_Functor.map(dictTraversable.Functor0())(f)(ta));
            };
        };
    };
};
var functorStateR = new Data_Functor.Functor(function (f) {
    return function (k) {
        return function (s) {
            var v = stateR(k)(s);
            return {
                accum: v.accum, 
                value: f(v.value)
            };
        };
    };
});
var functorStateL = new Data_Functor.Functor(function (f) {
    return function (k) {
        return function (s) {
            var v = stateL(k)(s);
            return {
                accum: v.accum, 
                value: f(v.value)
            };
        };
    };
});
var $$for = function (dictApplicative) {
    return function (dictTraversable) {
        return function (x) {
            return function (f) {
                return traverse(dictTraversable)(dictApplicative)(f)(x);
            };
        };
    };
};
var applyStateR = new Control_Apply.Apply(function () {
    return functorStateR;
}, function (f) {
    return function (x) {
        return function (s) {
            var v = stateR(x)(s);
            var v1 = stateR(f)(v.accum);
            return {
                accum: v1.accum, 
                value: v1.value(v.value)
            };
        };
    };
});
var applyStateL = new Control_Apply.Apply(function () {
    return functorStateL;
}, function (f) {
    return function (x) {
        return function (s) {
            var v = stateL(f)(s);
            var v1 = stateL(x)(v.accum);
            return {
                accum: v1.accum, 
                value: v.value(v1.value)
            };
        };
    };
});
var applicativeStateR = new Control_Applicative.Applicative(function () {
    return applyStateR;
}, function (a) {
    return function (s) {
        return {
            accum: s, 
            value: a
        };
    };
});
var mapAccumR = function (dictTraversable) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return stateR(traverse(dictTraversable)(applicativeStateR)(function (a) {
                    return function (s) {
                        return f(s)(a);
                    };
                })(xs))(s0);
            };
        };
    };
};
var scanr = function (dictTraversable) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumR(dictTraversable)(function (b) {
                    return function (a) {
                        var b$prime = f(a)(b);
                        return {
                            accum: b$prime, 
                            value: b$prime
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
var applicativeStateL = new Control_Applicative.Applicative(function () {
    return applyStateL;
}, function (a) {
    return function (s) {
        return {
            accum: s, 
            value: a
        };
    };
});
var mapAccumL = function (dictTraversable) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return stateL(traverse(dictTraversable)(applicativeStateL)(function (a) {
                    return function (s) {
                        return f(s)(a);
                    };
                })(xs))(s0);
            };
        };
    };
};
var scanl = function (dictTraversable) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumL(dictTraversable)(function (b) {
                    return function (a) {
                        var b$prime = f(b)(a);
                        return {
                            accum: b$prime, 
                            value: b$prime
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
module.exports = {
    Traversable: Traversable, 
    "for": $$for, 
    mapAccumL: mapAccumL, 
    mapAccumR: mapAccumR, 
    scanl: scanl, 
    scanr: scanr, 
    sequence: sequence, 
    sequenceDefault: sequenceDefault, 
    traverse: traverse, 
    traverseDefault: traverseDefault, 
    traversableArray: traversableArray, 
    traversableMaybe: traversableMaybe, 
    traversableFirst: traversableFirst, 
    traversableLast: traversableLast, 
    traversableAdditive: traversableAdditive, 
    traversableDual: traversableDual, 
    traversableConj: traversableConj, 
    traversableDisj: traversableDisj, 
    traversableMultiplicative: traversableMultiplicative
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Category":11,"../Data.Foldable":66,"../Data.Functor":74,"../Data.Maybe":88,"../Data.Maybe.First":86,"../Data.Maybe.Last":87,"../Data.Monoid.Additive":89,"../Data.Monoid.Conj":90,"../Data.Monoid.Disj":91,"../Data.Monoid.Dual":92,"../Data.Monoid.Multiplicative":94,"../Prelude":139,"./foreign":120}],122:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var uncurry9 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value1.value0);
    };
};
var uncurry8 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value0);
    };
};
var uncurry7 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0);
    };
};
var uncurry6 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0);
    };
};
var uncurry5 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0);
    };
};
var uncurry4 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0);
    };
};
var uncurry3 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0)(v.value1.value1.value0);
    };
};
var uncurry2 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0);
    };
};
var uncurry10 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value0);
    };
};
var uncurry1 = function (f) {
    return function (v) {
        return f(v.value0);
    };
};
var tuple9 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return function (h) {
                                return function (i) {
                                    return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, Data_Unit.unit)))))))));
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
var tuple8 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return function (h) {
                                return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, Data_Unit.unit))))))));
                            };
                        };
                    };
                };
            };
        };
    };
};
var tuple7 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, Data_Unit.unit)))))));
                        };
                    };
                };
            };
        };
    };
};
var tuple6 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, Data_Unit.unit))))));
                    };
                };
            };
        };
    };
};
var tuple5 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, Data_Unit.unit)))));
                };
            };
        };
    };
};
var tuple4 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, Data_Unit.unit))));
            };
        };
    };
};
var tuple3 = function (a) {
    return function (b) {
        return function (c) {
            return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, Data_Unit.unit)));
        };
    };
};
var tuple2 = function (a) {
    return function (b) {
        return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, Data_Unit.unit));
    };
};
var tuple10 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return function (h) {
                                return function (i) {
                                    return function (j) {
                                        return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, new Data_Tuple.Tuple(j, Data_Unit.unit))))))))));
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
var tuple1 = function (a) {
    return new Data_Tuple.Tuple(a, Data_Unit.unit);
};
var over9 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1.value1.value1)))))))));
    };
};
var over8 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1.value1))))))));
    };
};
var over7 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1)))))));
    };
};
var over6 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1))))));
    };
};
var over5 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1)))));
    };
};
var over4 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value0), v.value1.value1.value1.value1))));
    };
};
var over3 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value0), v.value1.value1.value1)));
    };
};
var over2 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(o(v.value1.value0), v.value1.value1));
    };
};
var over10 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value1))))))))));
    };
};
var over1 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(o(v.value0), v.value1);
    };
};
var get9 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value1.value1.value0;
};
var get8 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value1.value0;
};
var get7 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value0;
};
var get6 = function (v) {
    return v.value1.value1.value1.value1.value1.value0;
};
var get5 = function (v) {
    return v.value1.value1.value1.value1.value0;
};
var get4 = function (v) {
    return v.value1.value1.value1.value0;
};
var get3 = function (v) {
    return v.value1.value1.value0;
};
var get2 = function (v) {
    return v.value1.value0;
};
var get10 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value0;
};
var get1 = function (v) {
    return v.value0;
};
var curry9 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, z))))))))));
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
var curry8 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, z)))))))));
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
var curry7 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, z))))))));
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
var curry6 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, z)))))));
                            };
                        };
                    };
                };
            };
        };
    };
};
var curry5 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, z))))));
                        };
                    };
                };
            };
        };
    };
};
var curry4 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, z)))));
                    };
                };
            };
        };
    };
};
var curry3 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, z))));
                };
            };
        };
    };
};
var curry2 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, z)));
            };
        };
    };
};
var curry10 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return function (j) {
                                                return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, new Data_Tuple.Tuple(j, z)))))))))));
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
var curry1 = function (z) {
    return function (f) {
        return function (a) {
            return f(new Data_Tuple.Tuple(a, z));
        };
    };
};
module.exports = {
    curry1: curry1, 
    curry10: curry10, 
    curry2: curry2, 
    curry3: curry3, 
    curry4: curry4, 
    curry5: curry5, 
    curry6: curry6, 
    curry7: curry7, 
    curry8: curry8, 
    curry9: curry9, 
    get1: get1, 
    get10: get10, 
    get2: get2, 
    get3: get3, 
    get4: get4, 
    get5: get5, 
    get6: get6, 
    get7: get7, 
    get8: get8, 
    get9: get9, 
    over1: over1, 
    over10: over10, 
    over2: over2, 
    over3: over3, 
    over4: over4, 
    over5: over5, 
    over6: over6, 
    over7: over7, 
    over8: over8, 
    over9: over9, 
    tuple1: tuple1, 
    tuple10: tuple10, 
    tuple2: tuple2, 
    tuple3: tuple3, 
    tuple4: tuple4, 
    tuple5: tuple5, 
    tuple6: tuple6, 
    tuple7: tuple7, 
    tuple8: tuple8, 
    tuple9: tuple9, 
    uncurry1: uncurry1, 
    uncurry10: uncurry10, 
    uncurry2: uncurry2, 
    uncurry3: uncurry3, 
    uncurry4: uncurry4, 
    uncurry5: uncurry5, 
    uncurry6: uncurry6, 
    uncurry7: uncurry7, 
    uncurry8: uncurry8, 
    uncurry9: uncurry9
};

},{"../Data.Tuple":123,"../Data.Unit":127,"../Prelude":139}],123:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Biapplicative = require("../Control.Biapplicative");
var Control_Biapply = require("../Control.Biapply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Bifoldable = require("../Data.Bifoldable");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Bitraversable = require("../Data.Bitraversable");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Bounded = require("../Data.Bounded");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Tuple = (function () {
    function Tuple(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Tuple.create = function (value0) {
        return function (value1) {
            return new Tuple(value0, value1);
        };
    };
    return Tuple;
})();
var uncurry = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
var swap = function (v) {
    return new Tuple(v.value1, v.value0);
};
var snd = function (v) {
    return v.value1;
};
var showTuple = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(Tuple " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
var semiringTuple = function (dictSemiring) {
    return function (dictSemiring1) {
        return new Data_Semiring.Semiring(function (v) {
            return function (v1) {
                return new Tuple(Data_Semiring.add(dictSemiring)(v.value0)(v1.value0), Data_Semiring.add(dictSemiring1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return function (v1) {
                return new Tuple(Data_Semiring.mul(dictSemiring)(v.value0)(v1.value0), Data_Semiring.mul(dictSemiring1)(v.value1)(v1.value1));
            };
        }, new Tuple(Data_Semiring.one(dictSemiring), Data_Semiring.one(dictSemiring1)), new Tuple(Data_Semiring.zero(dictSemiring), Data_Semiring.zero(dictSemiring1)));
    };
};
var semigroupoidTuple = new Control_Semigroupoid.Semigroupoid(function (v) {
    return function (v1) {
        return new Tuple(v1.value0, v.value1);
    };
});
var semigroupTuple = function (dictSemigroup) {
    return function (dictSemigroup1) {
        return new Data_Semigroup.Semigroup(function (v) {
            return function (v1) {
                return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), Data_Semigroup.append(dictSemigroup1)(v.value1)(v1.value1));
            };
        });
    };
};
var ringTuple = function (dictRing) {
    return function (dictRing1) {
        return new Data_Ring.Ring(function () {
            return semiringTuple(dictRing.Semiring0())(dictRing1.Semiring0());
        }, function (v) {
            return function (v1) {
                return new Tuple(Data_Ring.sub(dictRing)(v.value0)(v1.value0), Data_Ring.sub(dictRing1)(v.value1)(v1.value1));
            };
        });
    };
};
var monoidTuple = function (dictMonoid) {
    return function (dictMonoid1) {
        return new Data_Monoid.Monoid(function () {
            return semigroupTuple(dictMonoid.Semigroup0())(dictMonoid1.Semigroup0());
        }, new Tuple(Data_Monoid.mempty(dictMonoid), Data_Monoid.mempty(dictMonoid1)));
    };
};
var lookup = function (dictFoldable) {
    return function (dictEq) {
        return function (a) {
            return function ($261) {
                return Data_Newtype.unwrap(Data_Maybe_First.newtypeFirst)(Data_Foldable.foldMap(dictFoldable)(Data_Maybe_First.monoidFirst)(function (v) {
                    var $143 = Data_Eq.eq(dictEq)(a)(v.value0);
                    if ($143) {
                        return new Data_Maybe.Just(v.value1);
                    };
                    return Data_Maybe.Nothing.value;
                })($261));
            };
        };
    };
};
var heytingAlgebraTuple = function (dictHeytingAlgebra) {
    return function (dictHeytingAlgebra1) {
        return new Data_HeytingAlgebra.HeytingAlgebra(function (v) {
            return function (v1) {
                return new Tuple(Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.conj(dictHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return function (v1) {
                return new Tuple(Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.disj(dictHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, new Tuple(Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra1)), function (v) {
            return function (v1) {
                return new Tuple(Data_HeytingAlgebra.implies(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.implies(dictHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return new Tuple(Data_HeytingAlgebra.not(dictHeytingAlgebra)(v.value0), Data_HeytingAlgebra.not(dictHeytingAlgebra1)(v.value1));
        }, new Tuple(Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra1)));
    };
};
var functorTuple = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new Tuple(v.value0, f(v.value1));
    };
});
var invariantTuple = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorTuple));
var fst = function (v) {
    return v.value0;
};
var lazyTuple = function (dictLazy) {
    return function (dictLazy1) {
        return new Control_Lazy.Lazy(function (f) {
            return new Tuple(Control_Lazy.defer(dictLazy)(function (v) {
                return fst(f(Data_Unit.unit));
            }), Control_Lazy.defer(dictLazy1)(function (v) {
                return snd(f(Data_Unit.unit));
            }));
        });
    };
};
var foldableTuple = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v.value1);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v.value1);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v.value1)(z);
        };
    };
});
var traversableTuple = new Data_Traversable.Traversable(function () {
    return foldableTuple;
}, function () {
    return functorTuple;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Tuple.create(v.value0))(v.value1);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Tuple.create(v.value0))(f(v.value1));
        };
    };
});
var extendTuple = new Control_Extend.Extend(function () {
    return functorTuple;
}, function (f) {
    return function (v) {
        return new Tuple(v.value0, f(v));
    };
});
var eqTuple = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
            };
        });
    };
};
var ordTuple = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqTuple(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (x) {
            return function (y) {
                var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                if (v instanceof Data_Ordering.LT) {
                    return Data_Ordering.LT.value;
                };
                if (v instanceof Data_Ordering.GT) {
                    return Data_Ordering.GT.value;
                };
                return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
            };
        });
    };
};
var eq1Tuple = function (dictEq) {
    return new Data_Eq.Eq1(function (dictEq1) {
        return Data_Eq.eq(eqTuple(dictEq)(dictEq1));
    });
};
var ord1Tuple = function (dictOrd) {
    return new Data_Ord.Ord1(function () {
        return eq1Tuple(dictOrd.Eq0());
    }, function (dictOrd1) {
        return Data_Ord.compare(ordTuple(dictOrd)(dictOrd1));
    });
};
var curry = function (f) {
    return function (a) {
        return function (b) {
            return f(new Tuple(a, b));
        };
    };
};
var comonadTuple = new Control_Comonad.Comonad(function () {
    return extendTuple;
}, snd);
var commutativeRingTuple = function (dictCommutativeRing) {
    return function (dictCommutativeRing1) {
        return new Data_CommutativeRing.CommutativeRing(function () {
            return ringTuple(dictCommutativeRing.Ring0())(dictCommutativeRing1.Ring0());
        });
    };
};
var boundedTuple = function (dictBounded) {
    return function (dictBounded1) {
        return new Data_Bounded.Bounded(function () {
            return ordTuple(dictBounded.Ord0())(dictBounded1.Ord0());
        }, new Tuple(Data_Bounded.bottom(dictBounded), Data_Bounded.bottom(dictBounded1)), new Tuple(Data_Bounded.top(dictBounded), Data_Bounded.top(dictBounded1)));
    };
};
var booleanAlgebraTuple = function (dictBooleanAlgebra) {
    return function (dictBooleanAlgebra1) {
        return new Data_BooleanAlgebra.BooleanAlgebra(function () {
            return heytingAlgebraTuple(dictBooleanAlgebra.HeytingAlgebra0())(dictBooleanAlgebra1.HeytingAlgebra0());
        });
    };
};
var bifunctorTuple = new Data_Bifunctor.Bifunctor(function (f) {
    return function (g) {
        return function (v) {
            return new Tuple(f(v.value0), g(v.value1));
        };
    };
});
var bifoldableTuple = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
    return function (f) {
        return function (g) {
            return function (v) {
                return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(g(v.value1));
            };
        };
    };
}, function (f) {
    return function (g) {
        return function (z) {
            return function (v) {
                return g(f(z)(v.value0))(v.value1);
            };
        };
    };
}, function (f) {
    return function (g) {
        return function (z) {
            return function (v) {
                return f(v.value0)(g(v.value1)(z));
            };
        };
    };
});
var bitraversableTuple = new Data_Bitraversable.Bitraversable(function () {
    return bifoldableTuple;
}, function () {
    return bifunctorTuple;
}, function (dictApplicative) {
    return function (v) {
        return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Tuple.create)(v.value0))(v.value1);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (g) {
            return function (v) {
                return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Tuple.create)(f(v.value0)))(g(v.value1));
            };
        };
    };
});
var biapplyTuple = new Control_Biapply.Biapply(function () {
    return bifunctorTuple;
}, function (v) {
    return function (v1) {
        return new Tuple(v.value0(v1.value0), v.value1(v1.value1));
    };
});
var biapplicativeTuple = new Control_Biapplicative.Biapplicative(function () {
    return biapplyTuple;
}, Tuple.create);
var applyTuple = function (dictSemigroup) {
    return new Control_Apply.Apply(function () {
        return functorTuple;
    }, function (v) {
        return function (v1) {
            return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v.value1(v1.value1));
        };
    });
};
var bindTuple = function (dictSemigroup) {
    return new Control_Bind.Bind(function () {
        return applyTuple(dictSemigroup);
    }, function (v) {
        return function (f) {
            var v1 = f(v.value1);
            return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v1.value1);
        };
    });
};
var applicativeTuple = function (dictMonoid) {
    return new Control_Applicative.Applicative(function () {
        return applyTuple(dictMonoid.Semigroup0());
    }, Tuple.create(Data_Monoid.mempty(dictMonoid)));
};
var monadTuple = function (dictMonoid) {
    return new Control_Monad.Monad(function () {
        return applicativeTuple(dictMonoid);
    }, function () {
        return bindTuple(dictMonoid.Semigroup0());
    });
};
module.exports = {
    Tuple: Tuple, 
    curry: curry, 
    fst: fst, 
    lookup: lookup, 
    snd: snd, 
    swap: swap, 
    uncurry: uncurry, 
    showTuple: showTuple, 
    eqTuple: eqTuple, 
    eq1Tuple: eq1Tuple, 
    ordTuple: ordTuple, 
    ord1Tuple: ord1Tuple, 
    boundedTuple: boundedTuple, 
    semigroupoidTuple: semigroupoidTuple, 
    semigroupTuple: semigroupTuple, 
    monoidTuple: monoidTuple, 
    semiringTuple: semiringTuple, 
    ringTuple: ringTuple, 
    commutativeRingTuple: commutativeRingTuple, 
    heytingAlgebraTuple: heytingAlgebraTuple, 
    booleanAlgebraTuple: booleanAlgebraTuple, 
    functorTuple: functorTuple, 
    invariantTuple: invariantTuple, 
    bifunctorTuple: bifunctorTuple, 
    applyTuple: applyTuple, 
    biapplyTuple: biapplyTuple, 
    applicativeTuple: applicativeTuple, 
    biapplicativeTuple: biapplicativeTuple, 
    bindTuple: bindTuple, 
    monadTuple: monadTuple, 
    extendTuple: extendTuple, 
    comonadTuple: comonadTuple, 
    lazyTuple: lazyTuple, 
    foldableTuple: foldableTuple, 
    bifoldableTuple: bifoldableTuple, 
    traversableTuple: traversableTuple, 
    bitraversableTuple: bitraversableTuple
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Biapplicative":7,"../Control.Biapply":8,"../Control.Bind":10,"../Control.Comonad":12,"../Control.Extend":13,"../Control.Lazy":14,"../Control.Monad":35,"../Control.Semigroupoid":37,"../Data.Bifoldable":44,"../Data.Bifunctor":50,"../Data.Bitraversable":51,"../Data.BooleanAlgebra":52,"../Data.Bounded":55,"../Data.CommutativeRing":58,"../Data.Eq":61,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.Functor.Invariant":72,"../Data.HeytingAlgebra":76,"../Data.Maybe":88,"../Data.Maybe.First":86,"../Data.Monoid":95,"../Data.Newtype":97,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Ring":105,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Data.Traversable":121,"../Data.Unit":127,"../Prelude":139}],124:[function(require,module,exports){
"use strict";

exports.unfoldrArrayImpl = function (isNothing) {
  return function (fromJust) {
    return function (fst) {
      return function (snd) {
        return function (f) {
          return function (b) {
            var result = [];
            var value = b;
            while (true) { // eslint-disable-line no-constant-condition
              var maybe = f(value);
              if (isNothing(maybe)) return result;
              var tuple = fromJust(maybe);
              result.push(fst(tuple));
              value = snd(tuple);
            }
          };
        };
      };
    };
  };
};

},{}],125:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var Unfoldable = function (unfoldr) {
    this.unfoldr = unfoldr;
};
var unfoldr = function (dict) {
    return dict.unfoldr;
};
var unfoldableArray = new Unfoldable($foreign.unfoldrArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));
var replicate = function (dictUnfoldable) {
    return function (n) {
        return function (v) {
            var step = function (i) {
                var $8 = i <= 0;
                if ($8) {
                    return Data_Maybe.Nothing.value;
                };
                return new Data_Maybe.Just(new Data_Tuple.Tuple(v, i - 1 | 0));
            };
            return unfoldr(dictUnfoldable)(step)(n);
        };
    };
};
var replicateA = function (dictApplicative) {
    return function (dictUnfoldable) {
        return function (dictTraversable) {
            return function (n) {
                return function (m) {
                    return Data_Traversable.sequence(dictTraversable)(dictApplicative)(replicate(dictUnfoldable)(n)(m));
                };
            };
        };
    };
};
var singleton = function (dictUnfoldable) {
    return replicate(dictUnfoldable)(1);
};
var none = function (dictUnfoldable) {
    return unfoldr(dictUnfoldable)(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Unit.unit);
};
var fromMaybe = function (dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function (b) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Maybe.Nothing.value))(b);
    });
};
module.exports = {
    Unfoldable: Unfoldable, 
    fromMaybe: fromMaybe, 
    none: none, 
    replicate: replicate, 
    replicateA: replicateA, 
    singleton: singleton, 
    unfoldr: unfoldr, 
    unfoldableArray: unfoldableArray
};

},{"../Data.Function":71,"../Data.Functor":74,"../Data.Maybe":88,"../Data.Ord":102,"../Data.Ring":105,"../Data.Traversable":121,"../Data.Tuple":123,"../Data.Unit":127,"../Partial.Unsafe":136,"../Prelude":139,"./foreign":124}],126:[function(require,module,exports){
"use strict";

exports.unit = {};

},{}],127:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Data_Show = require("../Data.Show");
var showUnit = new Data_Show.Show(function (v) {
    return "unit";
});
module.exports = {
    showUnit: showUnit, 
    unit: $foreign.unit
};

},{"../Data.Show":111,"./foreign":126}],128:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Data_Show = require("../Data.Show");
var Void = function (x) {
    return x;
};
var absurd = function (a) {
    var spin = function (__copy_v) {
        var __tco_result;
        function __tco_loop(v) {
            __copy_v = v;
            return;
        };
        while (!false) {
            __tco_result = __tco_loop(__copy_v);
        };
        return __tco_result;
    };
    return spin(a);
};
var showVoid = new Data_Show.Show(absurd);
module.exports = {
    absurd: absurd, 
    showVoid: showVoid
};

},{"../Data.Show":111}],129:[function(require,module,exports){
"use strict";
var Battleship = require("../Battleship");
var Data_Array = require("../Data.Array");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Maybe = require("../Data.Maybe");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_HTML_Attributes = require("../Text.Smolder.HTML.Attributes");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var cellClass = function (tileType) {
    return "cell " + Data_Show.show(Battleship.showTileType)(tileType);
};
var cell = function (dictPartial) {
    return function (board) {
        return function (rowIndex) {
            return function (colIndex) {
                var tileType = Battleship.getType(Battleship.unwrapTile(dictPartial)(Battleship.tileAt({
                    x: colIndex, 
                    y: rowIndex
                })(board)));
                return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.td)(Text_Smolder_HTML_Attributes.className(cellClass(tileType)))(Text_Smolder_Markup.text(""));
            };
        };
    };
};
var row = function (dictPartial) {
    return function (v) {
        return function (rowIndex) {
            return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.tr)(Text_Smolder_HTML_Attributes.className("row"))(Data_Foldable.foldMap(Data_Foldable.foldableArray)(Text_Smolder_Markup.monoidMarkup)(cell(dictPartial)(v)(rowIndex))(Data_Array.range(0)(v.width)));
        };
    };
};
var boardToHtml = function (dictPartial) {
    return function (v) {
        return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.table)(Text_Smolder_HTML_Attributes.className("board"))(Data_Foldable.foldMap(Data_Foldable.foldableArray)(Text_Smolder_Markup.monoidMarkup)(row(dictPartial)(v))(Data_Array.range(0)(v.height)));
    };
};
module.exports = {
    boardToHtml: boardToHtml, 
    cell: cell, 
    cellClass: cellClass, 
    row: row
};

},{"../Battleship":1,"../Data.Array":43,"../Data.Foldable":66,"../Data.Function":71,"../Data.Maybe":88,"../Data.Semigroup":107,"../Data.Show":111,"../Prelude":139,"../Text.Smolder.HTML":141,"../Text.Smolder.HTML.Attributes":140,"../Text.Smolder.Markup":142}],130:[function(require,module,exports){
/* globals exports */
"use strict";

// module Global

exports.nan = NaN;

exports.isNaN = isNaN;

exports.infinity = Infinity;

exports.isFinite = isFinite;

exports.readInt = function (radix) {
  return function (n) {
    return parseInt(n, radix);
  };
};

exports.readFloat = parseFloat;

exports.decodeURI = decodeURI;
exports.encodeURI = encodeURI;
exports.decodeURIComponent = decodeURIComponent;
exports.encodeURIComponent = encodeURIComponent;

},{}],131:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
module.exports = {
    "decodeURI": $foreign["decodeURI"], 
    "decodeURIComponent": $foreign["decodeURIComponent"], 
    "encodeURI": $foreign["encodeURI"], 
    "encodeURIComponent": $foreign["encodeURIComponent"], 
    infinity: $foreign.infinity, 
    "isFinite": $foreign["isFinite"], 
    "isNaN": $foreign["isNaN"], 
    nan: $foreign.nan, 
    readFloat: $foreign.readFloat, 
    readInt: $foreign.readInt
};

},{"./foreign":130}],132:[function(require,module,exports){
"use strict";
var Battleship = require("../Battleship");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_JQuery = require("../Control.Monad.Eff.JQuery");
var DOM = require("../DOM");
var Data_Function = require("../Data.Function");
var Draw = require("../Draw");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var Text_Smolder_Renderer_String = require("../Text.Smolder.Renderer.String");
var main = (function () {
    var html = Text_Smolder_Renderer_String.render(Partial_Unsafe.unsafePartialBecause("Board was incorrectly constructed!")(function (dictPartial) {
        return Draw.boardToHtml(dictPartial)(Battleship.board(5)(10));
    }));
    return function __do() {
        var v = Control_Monad_Eff_JQuery.select("body")();
        return Control_Monad_Eff_JQuery.setHtml(html)(v)();
    };
})();
module.exports = {
    main: main
};

},{"../Battleship":1,"../Control.Bind":10,"../Control.Monad.Eff":22,"../Control.Monad.Eff.JQuery":18,"../DOM":38,"../Data.Function":71,"../Draw":129,"../Partial.Unsafe":136,"../Prelude":139,"../Text.Smolder.Renderer.String":143}],133:[function(require,module,exports){
"use strict";

// module Math

exports.abs = Math.abs;

exports.acos = Math.acos;

exports.asin = Math.asin;

exports.atan = Math.atan;

exports.atan2 = function (y) {
  return function (x) {
    return Math.atan2(y, x);
  };
};

exports.ceil = Math.ceil;

exports.cos = Math.cos;

exports.exp = Math.exp;

exports.floor = Math.floor;

exports.trunc = Math.trunc || function (n) {
  return n < 0 ? Math.ceil(n) : Math.floor(n);
};

exports.log = Math.log;

exports.max = function (n1) {
  return function (n2) {
    return Math.max(n1, n2);
  };
};

exports.min = function (n1) {
  return function (n2) {
    return Math.min(n1, n2);
  };
};

exports.pow = function (n) {
  return function (p) {
    return Math.pow(n, p);
  };
};

exports.remainder = function (n) {
  return function (m) {
    return n % m;
  };
};

exports.round = Math.round;

exports.sin = Math.sin;

exports.sqrt = Math.sqrt;

exports.tan = Math.tan;

exports.e = Math.E;

exports.ln2 = Math.LN2;

exports.ln10 = Math.LN10;

exports.log2e = Math.LOG2E;

exports.log10e = Math.LOG10E;

exports.pi = Math.PI;

exports.sqrt1_2 = Math.SQRT1_2;

exports.sqrt2 = Math.SQRT2;

},{}],134:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
module.exports = {
    abs: $foreign.abs, 
    acos: $foreign.acos, 
    asin: $foreign.asin, 
    atan: $foreign.atan, 
    atan2: $foreign.atan2, 
    ceil: $foreign.ceil, 
    cos: $foreign.cos, 
    e: $foreign.e, 
    exp: $foreign.exp, 
    floor: $foreign.floor, 
    ln10: $foreign.ln10, 
    ln2: $foreign.ln2, 
    log: $foreign.log, 
    log10e: $foreign.log10e, 
    log2e: $foreign.log2e, 
    max: $foreign.max, 
    min: $foreign.min, 
    pi: $foreign.pi, 
    pow: $foreign.pow, 
    remainder: $foreign.remainder, 
    round: $foreign.round, 
    sin: $foreign.sin, 
    sqrt: $foreign.sqrt, 
    sqrt1_2: $foreign.sqrt1_2, 
    sqrt2: $foreign.sqrt2, 
    tan: $foreign.tan, 
    trunc: $foreign.trunc
};

},{"./foreign":133}],135:[function(require,module,exports){
"use strict";

// module Partial.Unsafe

exports.unsafePartial = function (f) {
  return f();
};

exports.unsafePartialBecause = function (reason) {
  return function (f) {
    try {
      return exports.unsafePartial(f);
    } catch (err) {
      throw new Error("unsafePartial failed. The following " +
                      "assumption was incorrect: '" + reason + "'.");
    }
  };
};

},{}],136:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Partial = require("../Partial");
var unsafeCrashWith = function (msg) {
    return $foreign.unsafePartial(function (dictPartial) {
        return Partial.crashWith(dictPartial)(msg);
    });
};
module.exports = {
    unsafeCrashWith: unsafeCrashWith, 
    unsafePartial: $foreign.unsafePartial, 
    unsafePartialBecause: $foreign.unsafePartialBecause
};

},{"../Partial":138,"./foreign":135}],137:[function(require,module,exports){
"use strict";

// module Partial

exports.crashWith = function () {
  return function (msg) {
    throw new Error(msg);
  };
};

},{}],138:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var crash = function (dictPartial) {
    return $foreign.crashWith(dictPartial)("Partial.crash: partial function");
};
module.exports = {
    crash: crash, 
    crashWith: $foreign.crashWith
};

},{"./foreign":137}],139:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Boolean = require("../Data.Boolean");
var Data_BooleanAlgebra = require("../Data.BooleanAlgebra");
var Data_Bounded = require("../Data.Bounded");
var Data_CommutativeRing = require("../Data.CommutativeRing");
var Data_Eq = require("../Data.Eq");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Field = require("../Data.Field");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_NaturalTransformation = require("../Data.NaturalTransformation");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var Data_Void = require("../Data.Void");
module.exports = {};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Category":11,"../Control.Monad":35,"../Control.Semigroupoid":37,"../Data.Boolean":53,"../Data.BooleanAlgebra":52,"../Data.Bounded":55,"../Data.CommutativeRing":58,"../Data.Eq":61,"../Data.EuclideanRing":63,"../Data.Field":64,"../Data.Function":71,"../Data.Functor":74,"../Data.HeytingAlgebra":76,"../Data.NaturalTransformation":96,"../Data.Ord":102,"../Data.Ordering":103,"../Data.Ring":105,"../Data.Semigroup":107,"../Data.Semiring":109,"../Data.Show":111,"../Data.Unit":127,"../Data.Void":128}],140:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var xmlns = Text_Smolder_Markup.attribute("xmlns");
var wrap = Text_Smolder_Markup.attribute("wrap");
var width = Text_Smolder_Markup.attribute("width");
var value = Text_Smolder_Markup.attribute("value");
var usemap = Text_Smolder_Markup.attribute("usemap");
var type$prime = Text_Smolder_Markup.attribute("type");
var title = Text_Smolder_Markup.attribute("title");
var target = Text_Smolder_Markup.attribute("target");
var tabindex = Text_Smolder_Markup.attribute("tabindex");
var summary = Text_Smolder_Markup.attribute("summary");
var subject = Text_Smolder_Markup.attribute("subject");
var style = Text_Smolder_Markup.attribute("style");
var step = Text_Smolder_Markup.attribute("step");
var start = Text_Smolder_Markup.attribute("start");
var srcdoc = Text_Smolder_Markup.attribute("srcdoc");
var src = Text_Smolder_Markup.attribute("src");
var spellcheck = Text_Smolder_Markup.attribute("spellcheck");
var span = Text_Smolder_Markup.attribute("span");
var sizes = Text_Smolder_Markup.attribute("sizes");
var size = Text_Smolder_Markup.attribute("size");
var shape = Text_Smolder_Markup.attribute("shape");
var selected = Text_Smolder_Markup.attribute("selected");
var seamless = Text_Smolder_Markup.attribute("seamless");
var scoped = Text_Smolder_Markup.attribute("scoped");
var scope = Text_Smolder_Markup.attribute("scope");
var sandbox = Text_Smolder_Markup.attribute("sandbox");
var rowspan = Text_Smolder_Markup.attribute("rowspan");
var rows = Text_Smolder_Markup.attribute("rows");
var reversed = Text_Smolder_Markup.attribute("reversed");
var required = Text_Smolder_Markup.attribute("required");
var rel = Text_Smolder_Markup.attribute("rel");
var readonly = Text_Smolder_Markup.attribute("readonly");
var radiogroup = Text_Smolder_Markup.attribute("radiogroup");
var pubdate = Text_Smolder_Markup.attribute("pubdate");
var preload = Text_Smolder_Markup.attribute("preload");
var placeholder = Text_Smolder_Markup.attribute("placeholder");
var ping = Text_Smolder_Markup.attribute("ping");
var pattern = Text_Smolder_Markup.attribute("pattern");
var optimum = Text_Smolder_Markup.attribute("optimum");
var open = Text_Smolder_Markup.attribute("open");
var onwaiting = Text_Smolder_Markup.attribute("onwaiting");
var onvolumechange = Text_Smolder_Markup.attribute("onvolumechange");
var onunload = Text_Smolder_Markup.attribute("onunload");
var onundo = Text_Smolder_Markup.attribute("onundo");
var ontimeupdate = Text_Smolder_Markup.attribute("ontimeupdate");
var onsuspend = Text_Smolder_Markup.attribute("onsuspend");
var onsubmit = Text_Smolder_Markup.attribute("onsubmit");
var onstorage = Text_Smolder_Markup.attribute("onstorage");
var onstalled = Text_Smolder_Markup.attribute("onstalled");
var onselect = Text_Smolder_Markup.attribute("onselect");
var onseeking = Text_Smolder_Markup.attribute("onseeking");
var onseeked = Text_Smolder_Markup.attribute("onseeked");
var onscroll = Text_Smolder_Markup.attribute("onscroll");
var onresize = Text_Smolder_Markup.attribute("onresize");
var onredo = Text_Smolder_Markup.attribute("onredo");
var onreadystatechange = Text_Smolder_Markup.attribute("onreadystatechange");
var onratechange = Text_Smolder_Markup.attribute("onratechange");
var onpropstate = Text_Smolder_Markup.attribute("onpropstate");
var onprogress = Text_Smolder_Markup.attribute("onprogress");
var onplaying = Text_Smolder_Markup.attribute("onplaying");
var onplay = Text_Smolder_Markup.attribute("onplay");
var onpause = Text_Smolder_Markup.attribute("onpause");
var onpageshow = Text_Smolder_Markup.attribute("onpageshow");
var onpagehide = Text_Smolder_Markup.attribute("onpagehide");
var ononline = Text_Smolder_Markup.attribute("ononline");
var onmousewheel = Text_Smolder_Markup.attribute("onmousewheel");
var onmouseup = Text_Smolder_Markup.attribute("onmouseup");
var onmouseover = Text_Smolder_Markup.attribute("onmouseover");
var onmouseout = Text_Smolder_Markup.attribute("onmouseout");
var onmousemove = Text_Smolder_Markup.attribute("onmousemove");
var onmousedown = Text_Smolder_Markup.attribute("onmousedown");
var onmessage = Text_Smolder_Markup.attribute("onmessage");
var onloadstart = Text_Smolder_Markup.attribute("onloadstart");
var onloadedmetadata = Text_Smolder_Markup.attribute("onloadedmetadata");
var onloadeddata = Text_Smolder_Markup.attribute("onloadeddata");
var onload = Text_Smolder_Markup.attribute("onload");
var onkeyup = Text_Smolder_Markup.attribute("onkeyup");
var onkeydown = Text_Smolder_Markup.attribute("onkeydown");
var oninvalid = Text_Smolder_Markup.attribute("oninvalid");
var oninput = Text_Smolder_Markup.attribute("oninput");
var onhaschange = Text_Smolder_Markup.attribute("onhaschange");
var onforminput = Text_Smolder_Markup.attribute("onforminput");
var onformchange = Text_Smolder_Markup.attribute("onformchange");
var onfocus = Text_Smolder_Markup.attribute("onfocus");
var onerror = Text_Smolder_Markup.attribute("onerror");
var onended = Text_Smolder_Markup.attribute("onended");
var onemptied = Text_Smolder_Markup.attribute("onemptied");
var ondurationchange = Text_Smolder_Markup.attribute("ondurationchange");
var ondrop = Text_Smolder_Markup.attribute("ondrop");
var ondragstart = Text_Smolder_Markup.attribute("ondragstart");
var ondragover = Text_Smolder_Markup.attribute("ondragover");
var ondragleave = Text_Smolder_Markup.attribute("ondragleave");
var ondragenter = Text_Smolder_Markup.attribute("ondragenter");
var ondragend = Text_Smolder_Markup.attribute("ondragend");
var ondrag = Text_Smolder_Markup.attribute("ondrag");
var ondblclick = Text_Smolder_Markup.attribute("ondblclick");
var oncontextmenu = Text_Smolder_Markup.attribute("oncontextmenu");
var onclick = Text_Smolder_Markup.attribute("onclick");
var onchange = Text_Smolder_Markup.attribute("onchange");
var oncanplaythrough = Text_Smolder_Markup.attribute("oncanplaythrough");
var oncanplay = Text_Smolder_Markup.attribute("oncanplay");
var onblur = Text_Smolder_Markup.attribute("onblur");
var onbeforeprint = Text_Smolder_Markup.attribute("onbeforeprint");
var onbeforeonload = Text_Smolder_Markup.attribute("onbeforeonload");
var novalidate = Text_Smolder_Markup.attribute("novalidate");
var name = Text_Smolder_Markup.attribute("name");
var multiple = Text_Smolder_Markup.attribute("multiple");
var min = Text_Smolder_Markup.attribute("min");
var method = Text_Smolder_Markup.attribute("method");
var media = Text_Smolder_Markup.attribute("media");
var maxlength = Text_Smolder_Markup.attribute("maxlength");
var max = Text_Smolder_Markup.attribute("max");
var manifest = Text_Smolder_Markup.attribute("manifest");
var low = Text_Smolder_Markup.attribute("low");
var loop = Text_Smolder_Markup.attribute("loop");
var list = Text_Smolder_Markup.attribute("list");
var lang = Text_Smolder_Markup.attribute("lang");
var label = Text_Smolder_Markup.attribute("label");
var keytype = Text_Smolder_Markup.attribute("keytype");
var itemprop = Text_Smolder_Markup.attribute("itemprop");
var item = Text_Smolder_Markup.attribute("item");
var ismap = Text_Smolder_Markup.attribute("ismap");
var id = Text_Smolder_Markup.attribute("id");
var icon = Text_Smolder_Markup.attribute("icon");
var httpEquiv = Text_Smolder_Markup.attribute("http-equiv");
var hreflang = Text_Smolder_Markup.attribute("hreflang");
var href = Text_Smolder_Markup.attribute("href");
var high = Text_Smolder_Markup.attribute("high");
var hidden = Text_Smolder_Markup.attribute("hidden");
var height = Text_Smolder_Markup.attribute("height");
var headers = Text_Smolder_Markup.attribute("headers");
var formtarget = Text_Smolder_Markup.attribute("formtarget");
var formnovalidate = Text_Smolder_Markup.attribute("formnovalidate");
var formmethod = Text_Smolder_Markup.attribute("formmethod");
var formenctype = Text_Smolder_Markup.attribute("formenctype");
var formaction = Text_Smolder_Markup.attribute("formaction");
var form = Text_Smolder_Markup.attribute("form");
var $$for = Text_Smolder_Markup.attribute("for");
var enctype = Text_Smolder_Markup.attribute("enctype");
var draggable = Text_Smolder_Markup.attribute("draggable");
var disabled = Text_Smolder_Markup.attribute("disabled");
var dir = Text_Smolder_Markup.attribute("dir");
var defer = Text_Smolder_Markup.attribute("defer");
var datetime = Text_Smolder_Markup.attribute("datetime");
var data$prime = Text_Smolder_Markup.attribute("data");
var coords = Text_Smolder_Markup.attribute("coords");
var controls = Text_Smolder_Markup.attribute("controls");
var contextmenu = Text_Smolder_Markup.attribute("contextmenu");
var contenteditable = Text_Smolder_Markup.attribute("contenteditable");
var content = Text_Smolder_Markup.attribute("content");
var colspan = Text_Smolder_Markup.attribute("colspan");
var cols = Text_Smolder_Markup.attribute("cols");
var className = Text_Smolder_Markup.attribute("class");
var cite = Text_Smolder_Markup.attribute("cite");
var checked = Text_Smolder_Markup.attribute("checked");
var charset = Text_Smolder_Markup.attribute("charset");
var challenge = Text_Smolder_Markup.attribute("challenge");
var autoplay = Text_Smolder_Markup.attribute("autoplay");
var autofocus = Text_Smolder_Markup.attribute("autofocus");
var autocomplete = Text_Smolder_Markup.attribute("autocomplete");
var async = Text_Smolder_Markup.attribute("async");
var alt = Text_Smolder_Markup.attribute("alt");
var action = Text_Smolder_Markup.attribute("action");
var accesskey = Text_Smolder_Markup.attribute("accesskey");
var acceptCharset = Text_Smolder_Markup.attribute("accept-charset");
var accept = Text_Smolder_Markup.attribute("accept");
module.exports = {
    accept: accept, 
    acceptCharset: acceptCharset, 
    accesskey: accesskey, 
    action: action, 
    alt: alt, 
    async: async, 
    autocomplete: autocomplete, 
    autofocus: autofocus, 
    autoplay: autoplay, 
    challenge: challenge, 
    charset: charset, 
    checked: checked, 
    cite: cite, 
    className: className, 
    cols: cols, 
    colspan: colspan, 
    content: content, 
    contenteditable: contenteditable, 
    contextmenu: contextmenu, 
    controls: controls, 
    coords: coords, 
    "data'": data$prime, 
    datetime: datetime, 
    defer: defer, 
    dir: dir, 
    disabled: disabled, 
    draggable: draggable, 
    enctype: enctype, 
    "for": $$for, 
    form: form, 
    formaction: formaction, 
    formenctype: formenctype, 
    formmethod: formmethod, 
    formnovalidate: formnovalidate, 
    formtarget: formtarget, 
    headers: headers, 
    height: height, 
    hidden: hidden, 
    high: high, 
    href: href, 
    hreflang: hreflang, 
    httpEquiv: httpEquiv, 
    icon: icon, 
    id: id, 
    ismap: ismap, 
    item: item, 
    itemprop: itemprop, 
    keytype: keytype, 
    label: label, 
    lang: lang, 
    list: list, 
    loop: loop, 
    low: low, 
    manifest: manifest, 
    max: max, 
    maxlength: maxlength, 
    media: media, 
    method: method, 
    min: min, 
    multiple: multiple, 
    name: name, 
    novalidate: novalidate, 
    onbeforeonload: onbeforeonload, 
    onbeforeprint: onbeforeprint, 
    onblur: onblur, 
    oncanplay: oncanplay, 
    oncanplaythrough: oncanplaythrough, 
    onchange: onchange, 
    onclick: onclick, 
    oncontextmenu: oncontextmenu, 
    ondblclick: ondblclick, 
    ondrag: ondrag, 
    ondragend: ondragend, 
    ondragenter: ondragenter, 
    ondragleave: ondragleave, 
    ondragover: ondragover, 
    ondragstart: ondragstart, 
    ondrop: ondrop, 
    ondurationchange: ondurationchange, 
    onemptied: onemptied, 
    onended: onended, 
    onerror: onerror, 
    onfocus: onfocus, 
    onformchange: onformchange, 
    onforminput: onforminput, 
    onhaschange: onhaschange, 
    oninput: oninput, 
    oninvalid: oninvalid, 
    onkeydown: onkeydown, 
    onkeyup: onkeyup, 
    onload: onload, 
    onloadeddata: onloadeddata, 
    onloadedmetadata: onloadedmetadata, 
    onloadstart: onloadstart, 
    onmessage: onmessage, 
    onmousedown: onmousedown, 
    onmousemove: onmousemove, 
    onmouseout: onmouseout, 
    onmouseover: onmouseover, 
    onmouseup: onmouseup, 
    onmousewheel: onmousewheel, 
    ononline: ononline, 
    onpagehide: onpagehide, 
    onpageshow: onpageshow, 
    onpause: onpause, 
    onplay: onplay, 
    onplaying: onplaying, 
    onprogress: onprogress, 
    onpropstate: onpropstate, 
    onratechange: onratechange, 
    onreadystatechange: onreadystatechange, 
    onredo: onredo, 
    onresize: onresize, 
    onscroll: onscroll, 
    onseeked: onseeked, 
    onseeking: onseeking, 
    onselect: onselect, 
    onstalled: onstalled, 
    onstorage: onstorage, 
    onsubmit: onsubmit, 
    onsuspend: onsuspend, 
    ontimeupdate: ontimeupdate, 
    onundo: onundo, 
    onunload: onunload, 
    onvolumechange: onvolumechange, 
    onwaiting: onwaiting, 
    open: open, 
    optimum: optimum, 
    pattern: pattern, 
    ping: ping, 
    placeholder: placeholder, 
    preload: preload, 
    pubdate: pubdate, 
    radiogroup: radiogroup, 
    readonly: readonly, 
    rel: rel, 
    required: required, 
    reversed: reversed, 
    rows: rows, 
    rowspan: rowspan, 
    sandbox: sandbox, 
    scope: scope, 
    scoped: scoped, 
    seamless: seamless, 
    selected: selected, 
    shape: shape, 
    size: size, 
    sizes: sizes, 
    span: span, 
    spellcheck: spellcheck, 
    src: src, 
    srcdoc: srcdoc, 
    start: start, 
    step: step, 
    style: style, 
    subject: subject, 
    summary: summary, 
    tabindex: tabindex, 
    target: target, 
    title: title, 
    "type'": type$prime, 
    usemap: usemap, 
    value: value, 
    width: width, 
    wrap: wrap, 
    xmlns: xmlns
};

},{"../Text.Smolder.Markup":142}],141:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var wbr = Text_Smolder_Markup.leaf("wbr");
var video = Text_Smolder_Markup.parent("video");
var $$var = Text_Smolder_Markup.parent("var");
var ul = Text_Smolder_Markup.parent("ul");
var track = Text_Smolder_Markup.leaf("track");
var tr = Text_Smolder_Markup.parent("tr");
var title = Text_Smolder_Markup.parent("title");
var time = Text_Smolder_Markup.parent("time");
var thead = Text_Smolder_Markup.parent("thead");
var th = Text_Smolder_Markup.parent("th");
var tfoot = Text_Smolder_Markup.parent("tfoot");
var textarea = Text_Smolder_Markup.parent("textarea");
var td = Text_Smolder_Markup.parent("td");
var tbody = Text_Smolder_Markup.parent("tbody");
var table = Text_Smolder_Markup.parent("table");
var sup = Text_Smolder_Markup.parent("sup");
var summary = Text_Smolder_Markup.parent("summary");
var sub = Text_Smolder_Markup.parent("sub");
var style = Text_Smolder_Markup.parent("style");
var strong = Text_Smolder_Markup.parent("strong");
var span = Text_Smolder_Markup.parent("span");
var source = Text_Smolder_Markup.leaf("source");
var small = Text_Smolder_Markup.parent("small");
var select = Text_Smolder_Markup.parent("select");
var section = Text_Smolder_Markup.parent("section");
var script = Text_Smolder_Markup.parent("script");
var samp = Text_Smolder_Markup.parent("samp");
var ruby = Text_Smolder_Markup.parent("ruby");
var rt = Text_Smolder_Markup.parent("rt");
var rp = Text_Smolder_Markup.parent("rp");
var q = Text_Smolder_Markup.parent("q");
var progress = Text_Smolder_Markup.parent("progress");
var pre = Text_Smolder_Markup.parent("pre");
var param = Text_Smolder_Markup.leaf("param");
var p = Text_Smolder_Markup.parent("p");
var output = Text_Smolder_Markup.parent("output");
var option = Text_Smolder_Markup.parent("option");
var optgroup = Text_Smolder_Markup.parent("optgroup");
var ol = Text_Smolder_Markup.parent("ol");
var object = Text_Smolder_Markup.parent("object");
var noscript = Text_Smolder_Markup.parent("noscript");
var nav = Text_Smolder_Markup.parent("nav");
var meter = Text_Smolder_Markup.parent("meter");
var meta = Text_Smolder_Markup.leaf("meta");
var menuitem = Text_Smolder_Markup.leaf("menuitem");
var menu = Text_Smolder_Markup.parent("menu");
var mark = Text_Smolder_Markup.parent("mark");
var map = Text_Smolder_Markup.parent("map");
var link = Text_Smolder_Markup.leaf("link");
var li = Text_Smolder_Markup.parent("li");
var legend = Text_Smolder_Markup.parent("legend");
var label = Text_Smolder_Markup.parent("label");
var keygen = Text_Smolder_Markup.leaf("keygen");
var kbd = Text_Smolder_Markup.parent("kbd");
var ins = Text_Smolder_Markup.parent("ins");
var input = Text_Smolder_Markup.leaf("input");
var img = Text_Smolder_Markup.leaf("img");
var iframe = Text_Smolder_Markup.parent("iframe");
var i = Text_Smolder_Markup.parent("i");
var html = Text_Smolder_Markup.parent("html");
var hr = Text_Smolder_Markup.leaf("hr");
var hgroup = Text_Smolder_Markup.parent("hgroup");
var header = Text_Smolder_Markup.parent("header");
var head = Text_Smolder_Markup.parent("head");
var h6 = Text_Smolder_Markup.parent("h6");
var h5 = Text_Smolder_Markup.parent("h5");
var h4 = Text_Smolder_Markup.parent("h4");
var h3 = Text_Smolder_Markup.parent("h3");
var h2 = Text_Smolder_Markup.parent("h2");
var h1 = Text_Smolder_Markup.parent("h1");
var form = Text_Smolder_Markup.parent("form");
var footer = Text_Smolder_Markup.parent("footer");
var figure = Text_Smolder_Markup.parent("figure");
var figcaption = Text_Smolder_Markup.parent("figcaption");
var fieldset = Text_Smolder_Markup.parent("fieldset");
var embed = Text_Smolder_Markup.leaf("embed");
var em = Text_Smolder_Markup.parent("em");
var dt = Text_Smolder_Markup.parent("dt");
var dl = Text_Smolder_Markup.parent("dl");
var div = Text_Smolder_Markup.parent("div");
var dfn = Text_Smolder_Markup.parent("dfn");
var details = Text_Smolder_Markup.parent("details");
var del = Text_Smolder_Markup.parent("del");
var dd = Text_Smolder_Markup.parent("dd");
var datalist = Text_Smolder_Markup.parent("datalist");
var command = Text_Smolder_Markup.parent("command");
var colgroup = Text_Smolder_Markup.parent("colgroup");
var col = Text_Smolder_Markup.leaf("col");
var code = Text_Smolder_Markup.parent("code");
var cite = Text_Smolder_Markup.parent("cite");
var caption = Text_Smolder_Markup.parent("caption");
var canvas = Text_Smolder_Markup.parent("canvas");
var button = Text_Smolder_Markup.parent("button");
var br = Text_Smolder_Markup.leaf("br");
var body = Text_Smolder_Markup.parent("body");
var blockquote = Text_Smolder_Markup.parent("blockquote");
var bdo = Text_Smolder_Markup.parent("bdo");
var base = Text_Smolder_Markup.leaf("base");
var b = Text_Smolder_Markup.parent("b");
var audio = Text_Smolder_Markup.parent("audio");
var aside = Text_Smolder_Markup.parent("aside");
var article = Text_Smolder_Markup.parent("article");
var area = Text_Smolder_Markup.leaf("area");
var address = Text_Smolder_Markup.parent("address");
var abbr = Text_Smolder_Markup.parent("abbr");
var a = Text_Smolder_Markup.parent("a");
module.exports = {
    a: a, 
    abbr: abbr, 
    address: address, 
    area: area, 
    article: article, 
    aside: aside, 
    audio: audio, 
    b: b, 
    base: base, 
    bdo: bdo, 
    blockquote: blockquote, 
    body: body, 
    br: br, 
    button: button, 
    canvas: canvas, 
    caption: caption, 
    cite: cite, 
    code: code, 
    col: col, 
    colgroup: colgroup, 
    command: command, 
    datalist: datalist, 
    dd: dd, 
    del: del, 
    details: details, 
    dfn: dfn, 
    div: div, 
    dl: dl, 
    dt: dt, 
    em: em, 
    embed: embed, 
    fieldset: fieldset, 
    figcaption: figcaption, 
    figure: figure, 
    footer: footer, 
    form: form, 
    h1: h1, 
    h2: h2, 
    h3: h3, 
    h4: h4, 
    h5: h5, 
    h6: h6, 
    head: head, 
    header: header, 
    hgroup: hgroup, 
    hr: hr, 
    html: html, 
    i: i, 
    iframe: iframe, 
    img: img, 
    input: input, 
    ins: ins, 
    kbd: kbd, 
    keygen: keygen, 
    label: label, 
    legend: legend, 
    li: li, 
    link: link, 
    map: map, 
    mark: mark, 
    menu: menu, 
    menuitem: menuitem, 
    meta: meta, 
    meter: meter, 
    nav: nav, 
    noscript: noscript, 
    object: object, 
    ol: ol, 
    optgroup: optgroup, 
    option: option, 
    output: output, 
    p: p, 
    param: param, 
    pre: pre, 
    progress: progress, 
    q: q, 
    rp: rp, 
    rt: rt, 
    ruby: ruby, 
    samp: samp, 
    script: script, 
    section: section, 
    select: select, 
    small: small, 
    source: source, 
    span: span, 
    strong: strong, 
    style: style, 
    sub: sub, 
    summary: summary, 
    sup: sup, 
    table: table, 
    tbody: tbody, 
    td: td, 
    textarea: textarea, 
    tfoot: tfoot, 
    th: th, 
    thead: thead, 
    time: time, 
    title: title, 
    tr: tr, 
    track: track, 
    ul: ul, 
    "var": $$var, 
    video: video, 
    wbr: wbr
};

},{"../Text.Smolder.Markup":142}],142:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Data_CatList = require("../Data.CatList");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var EventHandler = (function () {
    function EventHandler(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    EventHandler.create = function (value0) {
        return function (value1) {
            return new EventHandler(value0, value1);
        };
    };
    return EventHandler;
})();
var EventHandlers = (function () {
    function EventHandlers(value0) {
        this.value0 = value0;
    };
    EventHandlers.create = function (value0) {
        return new EventHandlers(value0);
    };
    return EventHandlers;
})();
var Attr = (function () {
    function Attr(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Attr.create = function (value0) {
        return function (value1) {
            return new Attr(value0, value1);
        };
    };
    return Attr;
})();
var Attribute = (function () {
    function Attribute(value0) {
        this.value0 = value0;
    };
    Attribute.create = function (value0) {
        return new Attribute(value0);
    };
    return Attribute;
})();
var Element = (function () {
    function Element(value0, value1, value2, value3, value4) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    };
    Element.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return new Element(value0, value1, value2, value3, value4);
                    };
                };
            };
        };
    };
    return Element;
})();
var Content = (function () {
    function Content(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Content.create = function (value0) {
        return function (value1) {
            return new Content(value0, value1);
        };
    };
    return Content;
})();
var Return = (function () {
    function Return(value0) {
        this.value0 = value0;
    };
    Return.create = function (value0) {
        return new Return(value0);
    };
    return Return;
})();
var Attributable = function ($$with) {
    this["with"] = $$with;
};
var Eventable = function (withEvent) {
    this.withEvent = withEvent;
};
var withEvent = function (dict) {
    return dict.withEvent;
};
var $$with = function (dict) {
    return dict["with"];
};
var text = function (s) {
    return new Content(s, new Return(Data_Unit.unit));
};
var semigroupAttribute = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return new Attribute(Data_Semigroup.append(Data_CatList.semigroupCatList)(v.value0)(v1.value0));
    };
});
var parent = function (el) {
    return function (kids) {
        return new Element(el, new Data_Maybe.Just(kids), Data_Monoid.mempty(Data_CatList.monoidCatList), Data_Monoid.mempty(Data_CatList.monoidCatList), new Return(Data_Unit.unit));
    };
};
var optionalWith = function (dictAttributable) {
    return function (h) {
        return function (c) {
            return function (a) {
                if (c) {
                    return $$with(dictAttributable)(h)(a);
                };
                return h;
            };
        };
    };
};
var on = function (name) {
    return function (handler) {
        return new EventHandlers(Control_Applicative.pure(Data_CatList.applicativeCatList)(new EventHandler(name, handler)));
    };
};
var monoidAttribute = new Data_Monoid.Monoid(function () {
    return semigroupAttribute;
}, new Attribute(Data_Monoid.mempty(Data_CatList.monoidCatList)));
var leaf = function (el) {
    return new Element(el, Data_Maybe.Nothing.value, Data_Monoid.mempty(Data_CatList.monoidCatList), Data_Monoid.mempty(Data_CatList.monoidCatList), new Return(Data_Unit.unit));
};
var functorMarkupM = new Data_Functor.Functor(function (f) {
    return function (v) {
        if (v instanceof Element) {
            return new Element(v.value0, v.value1, v.value2, v.value3, Data_Functor.map(functorMarkupM)(f)(v.value4));
        };
        if (v instanceof Content) {
            return new Content(v.value0, Data_Functor.map(functorMarkupM)(f)(v.value1));
        };
        if (v instanceof Return) {
            return new Return(f(v.value0));
        };
        throw new Error("Failed pattern match at Text.Smolder.Markup line 55, column 3 - line 55, column 88: " + [ f.constructor.name, v.constructor.name ]);
    };
});
var eventableMarkupM = new Eventable(function (v) {
    return function (v1) {
        if (v instanceof Element) {
            return new Element(v.value0, v.value1, v.value2, Data_Semigroup.append(Data_CatList.semigroupCatList)(v.value3)(v1.value0), v.value4);
        };
        return v;
    };
});
var eventableMarkupMF = new Eventable(function (k) {
    return function (xs) {
        return function (m) {
            return withEvent(eventableMarkupM)(k(m))(xs);
        };
    };
});
var attribute = function (key) {
    return function (value) {
        return new Attribute(Control_Applicative.pure(Data_CatList.applicativeCatList)(new Attr(key, value)));
    };
};
var attributableMarkupM = new Attributable(function (v) {
    return function (v1) {
        if (v instanceof Element) {
            return new Element(v.value0, v.value1, Data_Semigroup.append(Data_CatList.semigroupCatList)(v.value2)(v1.value0), v.value3, v.value4);
        };
        return v;
    };
});
var attributableMarkupMF = new Attributable(function (k) {
    return function (xs) {
        return function (m) {
            return $$with(attributableMarkupM)(k(m))(xs);
        };
    };
});
var monadMarkupM = new Control_Monad.Monad(function () {
    return applicativeMarkupM;
}, function () {
    return bindMarkupM;
});
var bindMarkupM = new Control_Bind.Bind(function () {
    return applyMarkupM;
}, function (v) {
    return function (f) {
        if (v instanceof Element) {
            return new Element(v.value0, v.value1, v.value2, v.value3, Control_Bind.bind(bindMarkupM)(v.value4)(f));
        };
        if (v instanceof Content) {
            return new Content(v.value0, Control_Bind.bind(bindMarkupM)(v.value1)(f));
        };
        if (v instanceof Return) {
            return f(v.value0);
        };
        throw new Error("Failed pattern match at Text.Smolder.Markup line 66, column 3 - line 66, column 90: " + [ v.constructor.name, f.constructor.name ]);
    };
});
var applyMarkupM = new Control_Apply.Apply(function () {
    return functorMarkupM;
}, Control_Monad.ap(monadMarkupM));
var applicativeMarkupM = new Control_Applicative.Applicative(function () {
    return applyMarkupM;
}, Return.create);
var semigroupMarkupM = new Data_Semigroup.Semigroup(function (x) {
    return function (y) {
        return Control_Apply.applySecond(applyMarkupM)(x)(y);
    };
});
var monoidMarkup = new Data_Monoid.Monoid(function () {
    return semigroupMarkupM;
}, new Return(Data_Unit.unit));
module.exports = {
    Attr: Attr, 
    EventHandler: EventHandler, 
    EventHandlers: EventHandlers, 
    Element: Element, 
    Content: Content, 
    Return: Return, 
    Attributable: Attributable, 
    Eventable: Eventable, 
    attribute: attribute, 
    leaf: leaf, 
    on: on, 
    optionalWith: optionalWith, 
    parent: parent, 
    text: text, 
    "with": $$with, 
    withEvent: withEvent, 
    semigroupMarkupM: semigroupMarkupM, 
    monoidMarkup: monoidMarkup, 
    functorMarkupM: functorMarkupM, 
    applyMarkupM: applyMarkupM, 
    applicativeMarkupM: applicativeMarkupM, 
    bindMarkupM: bindMarkupM, 
    monadMarkupM: monadMarkupM, 
    semigroupAttribute: semigroupAttribute, 
    monoidAttribute: monoidAttribute, 
    attributableMarkupM: attributableMarkupM, 
    attributableMarkupMF: attributableMarkupMF, 
    eventableMarkupM: eventableMarkupM, 
    eventableMarkupMF: eventableMarkupMF
};

},{"../Control.Applicative":4,"../Control.Apply":6,"../Control.Bind":10,"../Control.Monad":35,"../Data.CatList":56,"../Data.Function":71,"../Data.Functor":74,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Semigroup":107,"../Data.Unit":127,"../Prelude":139}],143:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Semigroup = require("../Data.Semigroup");
var Data_StrMap = require("../Data.StrMap");
var Data_String = require("../Data.String");
var Data_Tuple = require("../Data.Tuple");
var Data_Tuple_Nested = require("../Data.Tuple.Nested");
var Prelude = require("../Prelude");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var Text_Smolder_Renderer_Util = require("../Text.Smolder.Renderer.Util");
var escapeMap = Data_StrMap.fromFoldable(Data_Foldable.foldableArray)([ new Data_Tuple.Tuple("&", "&amp;"), new Data_Tuple.Tuple("<", "&lt;"), new Data_Tuple.Tuple(">", "&gt;"), new Data_Tuple.Tuple("\"", "&quot;"), new Data_Tuple.Tuple("'", "&#39;"), new Data_Tuple.Tuple("/", "&#x2F;") ]);
var escapeChar = function (s) {
    return Data_Maybe.maybe(s)(Control_Category.id(Control_Category.categoryFn))(Data_StrMap.lookup(s)(escapeMap));
};
var $$escape = function (s) {
    return Data_String.joinWith("")(Data_Functor.map(Data_Functor.functorArray)(escapeChar)(Data_String.split("")(s)));
};
var renderNode = function (v) {
    if (v instanceof Text_Smolder_Renderer_Util.Element) {
        var showTail = function (v1) {
            if (v1 instanceof Data_List_Types.Nil) {
                return "/>";
            };
            return ">" + (Data_Foldable.fold(Data_List_Types.foldableList)(Data_Monoid.monoidString)(Data_Functor.map(Data_List_Types.functorList)(renderNode)(v1)) + ("</" + (v.value0 + ">")));
        };
        var showAttrs = function (a$prime) {
            var pair = function (k) {
                return " " + (k + Data_Foldable.foldMap(Data_Foldable.foldableMaybe)(Data_Monoid.monoidString)(function (v1) {
                    return "=\"" + ($$escape(v1) + "\"");
                })(Data_StrMap.lookup(k)(a$prime)));
            };
            return Data_Foldable.fold(Data_Foldable.foldableArray)(Data_Monoid.monoidString)(Data_Functor.map(Data_Functor.functorArray)(pair)(Data_StrMap.keys(a$prime)));
        };
        return "<" + (v.value0 + (showAttrs(v.value1) + showTail(v.value3)));
    };
    if (v instanceof Text_Smolder_Renderer_Util.Text) {
        return $$escape(v.value0);
    };
    throw new Error("Failed pattern match at Text.Smolder.Renderer.String line 36, column 1 - line 44, column 81: " + [ v.constructor.name ]);
};
var render = function ($9) {
    return Data_Foldable.fold(Data_List_Types.foldableList)(Data_Monoid.monoidString)(Data_Functor.map(Data_List_Types.functorList)(renderNode)(Text_Smolder_Renderer_Util.renderMarkup($9)));
};
module.exports = {
    render: render, 
    renderNode: renderNode
};

},{"../Control.Category":11,"../Control.Semigroupoid":37,"../Data.Foldable":66,"../Data.Function":71,"../Data.Functor":74,"../Data.List":84,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.Monoid":95,"../Data.Semigroup":107,"../Data.StrMap":115,"../Data.String":119,"../Data.Tuple":123,"../Data.Tuple.Nested":122,"../Prelude":139,"../Text.Smolder.Markup":142,"../Text.Smolder.Renderer.Util":144}],144:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_CatList = require("../Data.CatList");
var Data_Functor = require("../Data.Functor");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_StrMap = require("../Data.StrMap");
var Data_Tuple = require("../Data.Tuple");
var Prelude = require("../Prelude");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var Element = (function () {
    function Element(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Element.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Element(value0, value1, value2, value3);
                };
            };
        };
    };
    return Element;
})();
var Text = (function () {
    function Text(value0) {
        this.value0 = value0;
    };
    Text.create = function (value0) {
        return new Text(value0);
    };
    return Text;
})();
var renderAttrs = (function () {
    var toTuple = function (v) {
        return new Data_Tuple.Tuple(v.value0, v.value1);
    };
    return function ($20) {
        return Data_StrMap.fromFoldable(Data_CatList.foldableCatList)(Data_Functor.map(Data_CatList.functorCatList)(toTuple)($20));
    };
})();
var renderMarkup = function (v) {
    if (v instanceof Text_Smolder_Markup.Element && v.value1 instanceof Data_Maybe.Just) {
        return new Data_List_Types.Cons(new Element(v.value0, renderAttrs(v.value2), v.value3, renderMarkup(v.value1.value0)), renderMarkup(v.value4));
    };
    if (v instanceof Text_Smolder_Markup.Element && v.value1 instanceof Data_Maybe.Nothing) {
        return new Data_List_Types.Cons(new Element(v.value0, renderAttrs(v.value2), v.value3, Data_List_Types.Nil.value), renderMarkup(v.value4));
    };
    if (v instanceof Text_Smolder_Markup.Content) {
        return new Data_List_Types.Cons(new Text(v.value0), renderMarkup(v.value1));
    };
    if (v instanceof Text_Smolder_Markup.Return) {
        return Data_List_Types.Nil.value;
    };
    throw new Error("Failed pattern match at Text.Smolder.Renderer.Util line 20, column 1 - line 21, column 86: " + [ v.constructor.name ]);
};
module.exports = {
    Element: Element, 
    Text: Text, 
    renderMarkup: renderMarkup
};

},{"../Control.Semigroupoid":37,"../Data.CatList":56,"../Data.Functor":74,"../Data.List":84,"../Data.List.Types":83,"../Data.Maybe":88,"../Data.StrMap":115,"../Data.Tuple":123,"../Prelude":139,"../Text.Smolder.Markup":142}],145:[function(require,module,exports){
"use strict";

// module Unsafe.Coerce

exports.unsafeCoerce = function (x) {
  return x;
};

},{}],146:[function(require,module,exports){
// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
module.exports = {
    unsafeCoerce: $foreign.unsafeCoerce
};

},{"./foreign":145}],147:[function(require,module,exports){
require('Main').main();

},{"Main":132}]},{},[147]);
