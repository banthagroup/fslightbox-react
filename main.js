!function (e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var n = t();
        for (var o in n) ("object" == typeof exports ? exports : e)[o] = n[o]
    }
}(window, function () {
    return function (e) {
        var t = {};
        function n(o) {
            if (t[o]) return t[o].exports;
            var r = t[o] = { i: o, l: !1, exports: {} };
            return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = e, n.c = t, n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o })
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 })
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) {
                return e[t]
            }.bind(null, r));
            return o
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 11)
    }([function (e, t, n) {
        "use strict";
        e.exports = n(2)
    }, function (e, t, n) {
        e.exports = n(4)()
    }, function (e, t, n) {
        "use strict";
        /** @license React v16.7.0
         * react.production.min.js
         *
         * Copyright (c) Facebook, Inc. and its affiliates.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */var o = n(3), r = "function" == typeof Symbol && Symbol.for, i = r ? Symbol.for("react.element") : 60103,
            s = r ? Symbol.for("react.portal") : 60106, u = r ? Symbol.for("react.fragment") : 60107,
            a = r ? Symbol.for("react.strict_mode") : 60108, c = r ? Symbol.for("react.profiler") : 60114,
            l = r ? Symbol.for("react.provider") : 60109, f = r ? Symbol.for("react.context") : 60110,
            p = r ? Symbol.for("react.concurrent_mode") : 60111, h = r ? Symbol.for("react.forward_ref") : 60112,
            d = r ? Symbol.for("react.suspense") : 60113, b = r ? Symbol.for("react.memo") : 60115,
            y = r ? Symbol.for("react.lazy") : 60116, m = "function" == typeof Symbol && Symbol.iterator;
        function v(e) {
            for (var t = arguments.length - 1, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, o = 0; o < t; o++) n += "&args[]=" + encodeURIComponent(arguments[o + 1]);
            !function (e, t, n, o, r, i, s, u) {
                if (!e) {
                    if (e = void 0, void 0 === t) e = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."); else {
                        var a = [n, o, r, i, s, u], c = 0;
                        (e = Error(t.replace(/%s/g, function () {
                            return a[c++]
                        }))).name = "Invariant Violation"
                    }
                    throw e.framesToPop = 1, e
                }
            }(!1, "Minified React error #" + e + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", n)
        }
        var g = {
            isMounted: function () {
                return !1
            }, enqueueForceUpdate: function () {
            }, enqueueReplaceState: function () {
            }, enqueueSetState: function () {
            }
        }, x = {};
        function _(e, t, n) {
            this.props = e, this.context = t, this.refs = x, this.updater = n || g
        }
        function S() {
        }
        function w(e, t, n) {
            this.props = e, this.context = t, this.refs = x, this.updater = n || g
        }
        _.prototype.isReactComponent = {}, _.prototype.setState = function (e, t) {
            "object" != typeof e && "function" != typeof e && null != e && v("85"), this.updater.enqueueSetState(this, e, t, "setState")
        }, _.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate")
        }, S.prototype = _.prototype;
        var O = w.prototype = new S;
        O.constructor = w, o(O, _.prototype), O.isPureReactComponent = !0;
        var j = { current: null, currentDispatcher: null }, k = Object.prototype.hasOwnProperty,
            L = { key: !0, ref: !0, __self: !0, __source: !0 };
        function T(e, t, n) {
            var o = void 0, r = {}, s = null, u = null;
            if (null != t) for (o in void 0 !== t.ref && (u = t.ref), void 0 !== t.key && (s = "" + t.key), t) k.call(t, o) && !L.hasOwnProperty(o) && (r[o] = t[o]);
            var a = arguments.length - 2;
            if (1 === a) r.children = n; else if (1 < a) {
                for (var c = Array(a), l = 0; l < a; l++) c[l] = arguments[l + 2];
                r.children = c
            }
            if (e && e.defaultProps) for (o in a = e.defaultProps) void 0 === r[o] && (r[o] = a[o]);
            return { $$typeof: i, type: e, key: s, ref: u, props: r, _owner: j.current }
        }
        function P(e) {
            return "object" == typeof e && null !== e && e.$$typeof === i
        }
        var E = /\/+/g, C = [];
        function R(e, t, n, o) {
            if (C.length) {
                var r = C.pop();
                return r.result = e, r.keyPrefix = t, r.func = n, r.context = o, r.count = 0, r
            }
            return { result: e, keyPrefix: t, func: n, context: o, count: 0 }
        }
        function z(e) {
            e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > C.length && C.push(e)
        }
        function I(e, t, n) {
            return null == e ? 0 : function e(t, n, o, r) {
                var u = typeof t;
                "undefined" !== u && "boolean" !== u || (t = null);
                var a = !1;
                if (null === t) a = !0; else switch (u) {
                    case"string":
                    case"number":
                        a = !0;
                        break;
                    case"object":
                        switch (t.$$typeof) {
                            case i:
                            case s:
                                a = !0
                        }
                }
                if (a) return o(r, t, "" === n ? "." + M(t, 0) : n), 1;
                if (a = 0, n = "" === n ? "." : n + ":", Array.isArray(t)) for (var c = 0; c < t.length; c++) {
                    var l = n + M(u = t[c], c);
                    a += e(u, l, o, r)
                } else if (l = null === t || "object" != typeof t ? null : "function" == typeof (l = m && t[m] || t["@@iterator"]) ? l : null, "function" == typeof l) for (t = l.call(t), c = 0; !(u = t.next()).done;) a += e(u = u.value, l = n + M(u, c++), o, r); else "object" === u && v("31", "[object Object]" == (o = "" + t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : o, "");
                return a
            }(e, "", t, n)
        }
        function M(e, t) {
            return "object" == typeof e && null !== e && null != e.key ? function (e) {
                var t = { "=": "=0", ":": "=2" };
                return "$" + ("" + e).replace(/[=:]/g, function (e) {
                    return t[e]
                })
            }(e.key) : t.toString(36)
        }
        function A(e, t) {
            e.func.call(e.context, t, e.count++)
        }
        function F(e, t, n) {
            var o = e.result, r = e.keyPrefix;
            e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? H(e, o, n, function (e) {
                return e
            }) : null != e && (P(e) && (e = function (e, t) {
                return { $$typeof: i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner }
            }(e, r + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(E, "$&/") + "/") + n)), o.push(e))
        }
        function H(e, t, n, o, r) {
            var i = "";
            null != n && (i = ("" + n).replace(E, "$&/") + "/"), I(e, F, t = R(t, i, o, r)), z(t)
        }
        var N = {
            Children: {
                map: function (e, t, n) {
                    if (null == e) return e;
                    var o = [];
                    return H(e, o, null, t, n), o
                }, forEach: function (e, t, n) {
                    if (null == e) return e;
                    I(e, A, t = R(null, null, t, n)), z(t)
                }, count: function (e) {
                    return I(e, function () {
                        return null
                    }, null)
                }, toArray: function (e) {
                    var t = [];
                    return H(e, t, null, function (e) {
                        return e
                    }), t
                }, only: function (e) {
                    return P(e) || v("143"), e
                }
            },
            createRef: function () {
                return { current: null }
            },
            Component: _,
            PureComponent: w,
            createContext: function (e, t) {
                return void 0 === t && (t = null), (e = {
                    $$typeof: f,
                    _calculateChangedBits: t,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null
                }).Provider = { $$typeof: l, _context: e }, e.Consumer = e
            },
            forwardRef: function (e) {
                return { $$typeof: h, render: e }
            },
            lazy: function (e) {
                return { $$typeof: y, _ctor: e, _status: -1, _result: null }
            },
            memo: function (e, t) {
                return { $$typeof: b, type: e, compare: void 0 === t ? null : t }
            },
            Fragment: u,
            StrictMode: a,
            Suspense: d,
            createElement: T,
            cloneElement: function (e, t, n) {
                null == e && v("267", e);
                var r = void 0, s = o({}, e.props), u = e.key, a = e.ref, c = e._owner;
                if (null != t) {
                    void 0 !== t.ref && (a = t.ref, c = j.current), void 0 !== t.key && (u = "" + t.key);
                    var l = void 0;
                    for (r in e.type && e.type.defaultProps && (l = e.type.defaultProps), t) k.call(t, r) && !L.hasOwnProperty(r) && (s[r] = void 0 === t[r] && void 0 !== l ? l[r] : t[r])
                }
                if (1 === (r = arguments.length - 2)) s.children = n; else if (1 < r) {
                    l = Array(r);
                    for (var f = 0; f < r; f++) l[f] = arguments[f + 2];
                    s.children = l
                }
                return { $$typeof: i, type: e.type, key: u, ref: a, props: s, _owner: c }
            },
            createFactory: function (e) {
                var t = T.bind(null, e);
                return t.type = e, t
            },
            isValidElement: P,
            version: "16.7.0",
            unstable_ConcurrentMode: p,
            unstable_Profiler: c,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: j, assign: o }
        }, q = { default: N }, D = q && N || q;
        e.exports = D.default || D
    }, function (e, t, n) {
        "use strict";
        /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
        var o = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty,
            i = Object.prototype.propertyIsEnumerable;
        e.exports = function () {
            try {
                if (!Object.assign) return !1;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
                    return t[e]
                }).join("")) return !1;
                var o = {};
                return "abcdefghijklmnopqrst".split("").forEach(function (e) {
                    o[e] = e
                }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("")
            } catch (e) {
                return !1
            }
        }() ? Object.assign : function (e, t) {
            for (var n, s, u = function (e) {
                if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }(e), a = 1; a < arguments.length; a++) {
                for (var c in n = Object(arguments[a])) r.call(n, c) && (u[c] = n[c]);
                if (o) {
                    s = o(n);
                    for (var l = 0; l < s.length; l++) i.call(n, s[l]) && (u[s[l]] = n[s[l]])
                }
            }
            return u
        }
    }, function (e, t, n) {
        "use strict";
        var o = n(5);
        function r() {
        }
        e.exports = function () {
            function e(e, t, n, r, i, s) {
                if (s !== o) {
                    var u = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                    throw u.name = "Invariant Violation", u
                }
            }
            function t() {
                return e
            }
            e.isRequired = e;
            var n = {
                array: e,
                bool: e,
                func: e,
                number: e,
                object: e,
                string: e,
                symbol: e,
                any: e,
                arrayOf: t,
                element: e,
                instanceOf: t,
                node: e,
                objectOf: t,
                oneOf: t,
                oneOfType: t,
                shape: t,
                exact: t
            };
            return n.checkPropTypes = r, n.PropTypes = n, n
        }
    }, function (e, t, n) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    }, function (e, t, n) {
        var o = n(7);
        "string" == typeof o && (o = [[e.i, o, ""]]);
        var r = { hmr: !0, transform: void 0, insertInto: void 0 };
        n(9)(o, r);
        o.locals && (e.exports = o.locals)
    }, function (e, t, n) {
        (t = e.exports = n(8)(!1)).push([e.i, "@import url(https://fonts.googleapis.com/css?family=Montserrat);", ""]), t.push([e.i, '.fslightbox-toolbar {\n    position: absolute;\n    right: 0;\n    top: 0;\n    height: 100%;\n    display: flex;\n    background: rgba(35, 35, 35, 0.65);\n}\n\n.fslightbox-toolbar-button {\n    height: 100%;\n    width: 45px;\n    cursor: pointer;\n}\n\n.fslightbox-loader {\n    display: block;\n    margin: auto;\n    position: relative;\n    width: 67px;\n    height: 67px;\n}\n\n.fslightbox-loader div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 54px;\n    height: 54px;\n    margin: 6px;\n    border: 5px solid #999;\n    border-radius: 50%;\n    animation: fslightbox-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #999 transparent transparent transparent;\n}\n\n.fslightbox-loader div:nth-child(1) {\n    animation-delay: -0.45s;\n}\n\n.fslightbox-loader div:nth-child(2) {\n    animation-delay: -0.3s;\n}\n\n.fslightbox-loader div:nth-child(3) {\n    animation-delay: -0.15s;\n}\n\n@keyframes fslightbox-loader {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.fslightbox-source-holder {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    display: flex;\n    align-items: center;\n}\n\n.fslightbox-single-source {\n    margin: auto;\n    opacity: 0;\n    display: block;\n    backface-visibility: hidden;\n    transform: translateZ(0);\n}\n\n.fslightbox-video {\n    object-fit: cover;\n}\n\n\n.fslightbox-transform-transition {\n    transition: transform .3s;\n}\n\n.fslightbox-invalid-file-wrapper {\n    font-size: 22px;\n    color: #eaebeb;\n    margin: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.fslightbox-fade-in {\n    opacity: 1 !important;\n}\n\n.fslightbox-fade-in-class {\n    animation: fslightbox-fade-in .25s cubic-bezier(0,0,.7,1) forwards;\n}\n\n.fslightbox-fade-out-class {\n    animation: fslightbox-fade-out .25s ease forwards;\n}\n\n.fslightbox-fade-in-complete {\n    animation: fslightbox-fade-in-complete .25s cubic-bezier(0,0,.7,1) forwards;\n}\n\n.fslightbox-fade-out-complete {\n    animation: fslightbox-fade-out-complete .25s ease !important;\n}\n\n@keyframes fslightbox-fade-in-complete {\n    from {\n        opacity: .3;\n    }\n    to {\n        opacity: 1;\n    }\n}\n\n@keyframes fslightbox-fade-out-complete {\n    from {\n        opacity: 1;\n    }\n\n    to {\n        opacity: 0;\n    }\n}\n\n@keyframes fslightbox-fade-in {\n    from {\n        opacity: .65;\n    }\n    to {\n        opacity: 1;\n    }\n}\n\n\n@keyframes fslightbox-fade-out {\n    from {\n        opacity: .35;\n    }\n    to {\n        opacity: 0;\n    }\n}\n\n.fslightbox-container {\n    opacity: 0;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(rgba(30, 30, 30, 0.9), black 1810%);\n    font-family: "Montserrat", sans-serif;\n    z-index: 9999999;\n    user-select: none;\n    animation: fslightbox-fade-in-complete .25s forwards;\n    transition: opacity .25s;\n    -webkit-tap-highlight-color: transparent;\n}\n\n.fslightbox-open {\n    overflow: hidden;\n    height: 100%;\n}\n\n.fslightbox-scrollbarfix {\n    padding-right: 17px;\n}\n\n.fslightbox-nav {\n    height: 45px;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 2;\n}\n\n.fslightbox-slide-number-container {\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: .82rem;\n    color: #c1c2c2;\n    z-index: 1;\n    max-width: 46px;\n}\n\n.fslightbox-slide-number {\n    padding: 0 2px;\n}\n\n.fslightbox-slide-number-container .fslightbox-slash {\n    padding-top: .15rem;\n    font-size: 12px;\n}\n\n.fslightbox-svg-icon path {\n    fill: #ddd;\n}\n\n.fslightbox-svg-icon circle {\n    stroke: #4691f6;\n    stroke-width: 1;\n}\n\n.fslightbox-slide-btn-container {\n    display: flex;\n    align-items: center;\n    padding: 30px 30px 30px 6px;\n    position: absolute;\n    top: 50%;\n    cursor: pointer;\n    z-index: 1;\n    transform: translateY(-50%);\n}\n\n.fslightbox-slide-btn-container:hover .fslightbox-svg-icon path {\n    fill: #f1f1f1;\n}\n\n.fslightbox-slide-btn {\n    padding: 7px;\n    font-size: 26px;\n    background: rgba(35, 35, 35, 0.65);\n}\n\n@media (min-width: 476px) {\n    .fslightbox-slide-btn {\n        padding: 8px;\n    }\n}\n\n.fslightbox-slide-btn-left-container {\n    left: 0;\n}\n\n@media (max-width: 475.99px) {\n    .fslightbox-slide-btn-left-container {\n        padding-left: 3px;\n    }\n}\n\n.fslightbox-slide-btn-right-container {\n    right: 0;\n    padding-left: 30px;\n    padding-right: 3px;\n}\n\n@media (min-width: 476px) {\n    .fslightbox-slide-btn-right-container {\n        padding-right: 6px;\n    }\n}\n\n.button-style {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.fslightbox-holder-wrapper {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: absolute;\n}\n\n.fslightbox-media-holder {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.fslightbox-invisible-hover {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 10;\n}\n\n.fslightbox-cursor-grabbing {\n    cursor: grabbing;\n}\n\n.button-style:hover .fslightbox-svg-icon path {\n    fill: #fff;\n}\n\n', ""])
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map(function (t) {
                    var n = function (e, t) {
                        var n = e[1] || "", o = e[3];
                        if (!o) return n;
                        if (t && "function" == typeof btoa) {
                            var r = (s = o, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s)))) + " */"),
                                i = o.sources.map(function (e) {
                                    return "/*# sourceURL=" + o.sourceRoot + e + " */"
                                });
                            return [n].concat(i).concat([r]).join("\n")
                        }
                        var s;
                        return [n].join("\n")
                    }(t, e);
                    return t[2] ? "@media " + t[2] + "{" + n + "}" : n
                }).join("")
            }, t.i = function (e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var o = {}, r = 0; r < this.length; r++) {
                    var i = this[r][0];
                    null != i && (o[i] = !0)
                }
                for (r = 0; r < e.length; r++) {
                    var s = e[r];
                    null != s[0] && o[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), t.push(s))
                }
            }, t
        }
    }, function (e, t, n) {
        var o, r, i = {}, s = (o = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === r && (r = o.apply(this, arguments)), r
        }), u = function (e) {
            var t = {};
            return function (e, n) {
                if ("function" == typeof e) return e();
                if (void 0 === t[e]) {
                    var o = function (e, t) {
                        return t ? t.querySelector(e) : document.querySelector(e)
                    }.call(this, e, n);
                    if (window.HTMLIFrameElement && o instanceof window.HTMLIFrameElement) try {
                        o = o.contentDocument.head
                    } catch (e) {
                        o = null
                    }
                    t[e] = o
                }
                return t[e]
            }
        }(), a = null, c = 0, l = [], f = n(10);
        function p(e, t) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n], r = i[o.id];
                if (r) {
                    r.refs++;
                    for (var s = 0; s < r.parts.length; s++) r.parts[s](o.parts[s]);
                    for (; s < o.parts.length; s++) r.parts.push(v(o.parts[s], t))
                } else {
                    var u = [];
                    for (s = 0; s < o.parts.length; s++) u.push(v(o.parts[s], t));
                    i[o.id] = { id: o.id, refs: 1, parts: u }
                }
            }
        }
        function h(e, t) {
            for (var n = [], o = {}, r = 0; r < e.length; r++) {
                var i = e[r], s = t.base ? i[0] + t.base : i[0], u = { css: i[1], media: i[2], sourceMap: i[3] };
                o[s] ? o[s].parts.push(u) : n.push(o[s] = { id: s, parts: [u] })
            }
            return n
        }
        function d(e, t) {
            var n = u(e.insertInto);
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var o = l[l.length - 1];
            if ("top" === e.insertAt) o ? o.nextSibling ? n.insertBefore(t, o.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), l.push(t); else if ("bottom" === e.insertAt) n.appendChild(t); else {
                if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var r = u(e.insertAt.before, n);
                n.insertBefore(t, r)
            }
        }
        function b(e) {
            if (null === e.parentNode) return !1;
            e.parentNode.removeChild(e);
            var t = l.indexOf(e);
            t >= 0 && l.splice(t, 1)
        }
        function y(e) {
            var t = document.createElement("style");
            if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
                var o = function () {
                    0;
                    return n.nc
                }();
                o && (e.attrs.nonce = o)
            }
            return m(t, e.attrs), d(e, t), t
        }
        function m(e, t) {
            Object.keys(t).forEach(function (n) {
                e.setAttribute(n, t[n])
            })
        }
        function v(e, t) {
            var n, o, r, i;
            if (t.transform && e.css) {
                if (!(i = "function" == typeof t.transform ? t.transform(e.css) : t.transform.default(e.css))) return function () {
                };
                e.css = i
            }
            if (t.singleton) {
                var s = c++;
                n = a || (a = y(t)), o = _.bind(null, n, s, !1), r = _.bind(null, n, s, !0)
            } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
                var t = document.createElement("link");
                return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", m(t, e.attrs), d(e, t), t
            }(t), o = function (e, t, n) {
                var o = n.css, r = n.sourceMap, i = void 0 === t.convertToAbsoluteUrls && r;
                (t.convertToAbsoluteUrls || i) && (o = f(o));
                r && (o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
                var s = new Blob([o], { type: "text/css" }), u = e.href;
                e.href = URL.createObjectURL(s), u && URL.revokeObjectURL(u)
            }.bind(null, n, t), r = function () {
                b(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = y(t), o = function (e, t) {
                var n = t.css, o = t.media;
                o && e.setAttribute("media", o);
                if (e.styleSheet) e.styleSheet.cssText = n; else {
                    for (; e.firstChild;) e.removeChild(e.firstChild);
                    e.appendChild(document.createTextNode(n))
                }
            }.bind(null, n), r = function () {
                b(n)
            });
            return o(e), function (t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    o(e = t)
                } else r()
            }
        }
        e.exports = function (e, t) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = s()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
            var n = h(e, t);
            return p(n, t), function (e) {
                for (var o = [], r = 0; r < n.length; r++) {
                    var s = n[r];
                    (u = i[s.id]).refs--, o.push(u)
                }
                e && p(h(e, t), t);
                for (r = 0; r < o.length; r++) {
                    var u;
                    if (0 === (u = o[r]).refs) {
                        for (var a = 0; a < u.parts.length; a++) u.parts[a]();
                        delete i[u.id]
                    }
                }
            }
        };
        var g, x = (g = [], function (e, t) {
            return g[e] = t, g.filter(Boolean).join("\n")
        });
        function _(e, t, n, o) {
            var r = n ? "" : o.css;
            if (e.styleSheet) e.styleSheet.cssText = x(t, r); else {
                var i = document.createTextNode(r), s = e.childNodes;
                s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(i, s[t]) : e.appendChild(i)
            }
        }
    }, function (e, t) {
        e.exports = function (e) {
            var t = "undefined" != typeof window && window.location;
            if (!t) throw new Error("fixUrls requires window.location");
            if (!e || "string" != typeof e) return e;
            var n = t.protocol + "//" + t.host, o = n + t.pathname.replace(/\/[^\/]*$/, "/");
            return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, t) {
                var r, i = t.trim().replace(/^"(.*)"$/, function (e, t) {
                    return t
                }).replace(/^'(.*)'$/, function (e, t) {
                    return t
                });
                return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? e : (r = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : o + i.replace(/^\.\//, ""), "url(" + JSON.stringify(r) + ")")
            })
        }
    }, function (e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), r = n.n(o), i = n(1), s = n.n(i);
        function u(e) {
            return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function c(e, t) {
            return !t || "object" !== u(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function l(e) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function f(e, t) {
            return (f = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var p = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), c(this, l(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && f(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("svg", {
                        className: "fslightbox-svg-icon",
                        width: this.props.size,
                        height: this.props.size,
                        viewBox: this.props.viewBox,
                        xmlns: "http://www.w3.org/2000/svg"
                    }, r.a.createElement("path", { d: this.props.d }))
                }
            }]) && a(n.prototype, i), s && a(n, s), t
        }();
        p.propTypes = { viewBox: s.a.string.isRequired, size: s.a.string.isRequired, d: s.a.string.isRequired };
        var h = p;
        function d(e) {
            return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function b(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function y(e, t) {
            return !t || "object" !== d(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function m(e) {
            return (m = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function v(e, t) {
            return (v = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var g = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), y(this, m(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && v(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", {
                        onClick: this.props.onClick,
                        className: "fslightbox-toolbar-button button-style"
                    }, r.a.createElement(h, { viewBox: this.props.viewBox, size: this.props.size, d: this.props.d }))
                }
            }]) && b(n.prototype, i), s && b(n, s), t
        }();
        function x(e) {
            return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function _(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function S(e) {
            return (S = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function w(e, t) {
            return (w = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        function O(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        var j = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = S(t).call(this, e)) || "object" !== x(r) && "function" != typeof r ? O(o) : r).close = n.close.bind(O(O(n))), n.fullscreen = n.fullscreen.bind(O(O(n))), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && w(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "fullscreen", value: function () {
                    this.props.fsLightbox.info.isFullscreenOpen ? this.props.fsLightbox.fullscreenToggler.turnOffFullscreen() : this.props.fsLightbox.fullscreenToggler.turnOnFullscreen()
                }
            }, {
                key: "close", value: function () {
                    this.props.fsLightbox.core.closeOpenLightbox.closeLightbox()
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-toolbar" }, r.a.createElement(g, {
                        onClick: this.fullscreen,
                        viewBox: "0 0 17.5 17.5",
                        size: "1.25em",
                        d: "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"
                    }), r.a.createElement(g, {
                        onClick: this.close,
                        viewBox: "0 0 24 24",
                        size: "1.25em",
                        d: "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
                    }))
                }
            }]) && _(n.prototype, i), s && _(n, s), t
        }();
        j.propTypes = { fsLightbox: s.a.object.isRequired };
        var k = j;
        function L(e) {
            return (L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function T(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function P(e, t) {
            return !t || "object" !== L(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function E(e) {
            return (E = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function C(e, t) {
            return (C = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var R = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), P(this, E(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && C(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-slide-number-container" }, r.a.createElement("div", { className: "fslightbox-slide-number" }, this.props.slide), r.a.createElement("div", { className: "fslightbox-slide-number fslightbox-slash" }, "/"), r.a.createElement("div", { className: "fslightbox-slide-number" }, this.props.totalSlides))
                }
            }]) && T(n.prototype, i), s && T(n, s), t
        }();
        R.propTypes = { slide: s.a.number, totalSlides: s.a.number };
        var z = R;
        function I(e) {
            return (I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function M(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function A(e, t) {
            return !t || "object" !== I(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function F(e) {
            return (F = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function H(e, t) {
            return (H = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var N = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), A(this, F(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && H(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-nav" }, r.a.createElement(k, { fsLightbox: this.props.fsLightbox }), r.a.createElement(z, {
                        slide: this.props.fsLightbox.state.slide,
                        totalSlides: this.props.fsLightbox.totalSlides
                    }))
                }
            }]) && M(n.prototype, i), s && M(n, s), t
        }();
        N.propTypes = { fsLightbox: s.a.object };
        var q = N;
        n(6);
        function D(e) {
            var t;
            this.changeSlideTo = function (o) {
                t = o, n(), e.setState({ slide: t }, function () {
                    e.core.sourceHoldersTransformer.transformStageSources().withTimeout()
                })
            };
            var n = function () {
                e.sourceAnimator.animateSourceFromSlide(e.state.slide).removeFadeIn(), e.sourceAnimator.animateSourceFromSlide(e.state.slide).fadeOut(), e.sourceAnimator.animateSourceFromSlide(t).removeFadeOut(), e.sourceAnimator.animateSourceFromSlide(t).fadeIn()
            }
        }
        function U(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var B = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLightbox = t, this.documentClassList = document.documentElement.classList, this.fadingOut = !1, this.componentMountedAfterClose = this.componentMountedAfterClose.bind(this)
            }
            var t, n, o;
            return t = e, (n = [{
                key: "openLightbox", value: function () {
                    var e = this;
                    this.fsLightbox.setState({ isOpen: !0 }, function () {
                        e.componentMountedAfterOpen(), e.addOpeningClassToDocument()
                    })
                }
            }, {
                key: "addOpeningClassToDocument", value: function () {
                    this.documentClassList.add("fslightbox-open")
                }
            }, {
                key: "closeLightbox", value: function () {
                    var e = this;
                    this.fadingOut || (this.fadingOut = !0, this.fsLightbox.elements.container.current.classList.add("fslightbox-fade-out-complete"), setTimeout(function () {
                        e.afterFadeOut()
                    }, 250))
                }
            }, {
                key: "componentMountedAfterOpen", value: function () {
                    this.fsLightbox.info.isInitialized ? (this.fsLightbox.core.onResize.attachListener(), this.fsLightbox.core.onResize.adjustMediaHolderSize(), this.fsLightbox.core.sourceHoldersTransformer.transformStageSources().withoutTimeout()) : this.fsLightbox.initialize()
                }
            }, {
                key: "afterFadeOut", value: function () {
                    this.fsLightbox.elements.container.current.classList.remove("fslightbox-fade-out-complete"), this.fadingOut = !1, this.documentClassList.remove("fslightbox-open"), this.fsLightbox.setState({ isOpen: !1 }), this.componentMountedAfterClose()
                }
            }, {
                key: "componentMountedAfterClose", value: function () {
                    this.fsLightbox.core.onResize.removeListener()
                }
            }]) && U(t.prototype, n), o && U(t, o), e
        }();
        function $(e) {
            return ($ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function W(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function V(e) {
            return (V = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function Y(e, t) {
            return (Y = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        function J(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        var X = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = V(t).call(this, e)) || "object" !== $(r) && "function" != typeof r ? J(o) : r).goToPreviousSlide = n.goToPreviousSlide.bind(J(J(n))), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Y(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "goToPreviousSlide", value: function () {
                    this.props._.slideChanger.changeSlideTo(this.props._.stageSources.getPreviousSlideIndex() + 1)
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement("div", {
                        onClick: this.goToPreviousSlide,
                        className: "fslightbox-slide-btn-container fslightbox-slide-btn-left-container"
                    }, r.a.createElement("div", { className: "fslightbox-slide-btn button-style" }, r.a.createElement(h, {
                        viewBox: "0 0 20 20",
                        size: "1em",
                        d: "M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
                    })))
                }
            }]) && W(n.prototype, i), s && W(n, s), t
        }();
        X.propTypes = { _: s.a.object.isRequired };
        var G = X;
        function Z(e) {
            return (Z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function K(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function Q(e) {
            return (Q = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function ee(e, t) {
            return (ee = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        function te(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        var ne = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = Q(t).call(this, e)) || "object" !== Z(r) && "function" != typeof r ? te(o) : r).goToNextSlide = n.goToNextSlide.bind(te(te(n))), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && ee(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "goToNextSlide", value: function () {
                    this.props._.slideChanger.changeSlideTo(this.props._.stageSources.getNextSlideIndex() + 1)
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement("div", {
                        onClick: this.goToNextSlide,
                        className: "fslightbox-slide-btn-container fslightbox-slide-btn-right-container"
                    }, r.a.createElement("div", { className: "fslightbox-slide-btn button-style" }, r.a.createElement(h, {
                        viewBox: "0 0 20 20",
                        size: "1em",
                        d: "M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                    })))
                }
            }]) && K(n.prototype, i), s && K(n, s), t
        }();
        ne.propTypes = { _: s.a.object };
        var oe = ne;
        function re(e) {
            return (re = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function ie(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function se(e) {
            return (se = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function ue(e, t) {
            return (ue = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        function ae(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        var ce = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = se(t).call(this, e)) || "object" !== re(r) && "function" != typeof r ? ae(o) : r).onLoadedMetaData = n.onLoadedMetaData.bind(ae(ae(n))), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && ue(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "onLoadedMetaData", value: function (e) {
                    this.props._.isSourceAlreadyLoaded[this.props.i] || (this.props._.sourceDimensions[this.props.i] = {
                        width: e.target.videoWidth,
                        height: e.target.videoHeight
                    }, this.props.onFirstSourceLoad())
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement("video", {
                        onLoadedMetadata: this.onLoadedMetaData,
                        className: "fslightbox-single-source fslightbox-video",
                        controls: !0,
                        ref: this.props._.elements.sources[this.props.i],
                        poster: this.props._.videosPosters[this.props.i]
                    }, r.a.createElement("source", { src: this.props._.urls[this.props.i] }))
                }
            }]) && ie(n.prototype, i), s && ie(n, s), t
        }();
        ce.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired, onFirstSourceLoad: s.a.func.isRequired };
        var le = ce;
        function fe(e) {
            return (fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function pe(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function he(e, t) {
            return !t || "object" !== fe(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function de(e) {
            return (de = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function be(e, t) {
            return (be = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var ye = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), he(this, de(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && be(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("iframe", {
                        className: "fslightbox-single-source fslightbox-fade-in-class",
                        ref: this.props._.elements.sources[this.props.i],
                        src: "https://www.youtube.com/embed/" + (e = this.props._.urls[this.props.i], e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2]) + "?enablejsapi=1",
                        allowFullScreen: !0,
                        width: 1920,
                        height: 1080,
                        frameBorder: "0"
                    });
                    var e
                }
            }]) && pe(n.prototype, i), s && pe(n, s), t
        }();
        ye.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired };
        var me = ye;
        function ve(e) {
            return (ve = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function ge(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function xe(e, t) {
            return !t || "object" !== ve(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function _e(e) {
            return (_e = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function Se(e, t) {
            return (Se = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var we = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), xe(this, _e(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Se(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", {
                        className: "fslightbox-invalid-file-wrapper",
                        ref: this.props._.elements.sources[this.props.i]
                    }, "Invalid file")
                }
            }]) && ge(n.prototype, i), s && ge(n, s), t
        }();
        we.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired };
        var Oe = we;
        function je(e) {
            return (je = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function ke(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function Le(e) {
            return (Le = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function Te(e, t) {
            return (Te = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        function Pe(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        var Ee = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = Le(t).call(this, e)) || "object" !== je(r) && "function" != typeof r ? Pe(o) : r).imageOnLoad = n.imageOnLoad.bind(Pe(Pe(n))), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Te(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "imageOnLoad", value: function (e) {
                    this.props._.isSourceAlreadyLoaded[this.props.i] || (this.props._.sourceDimensions[this.props.i] = {
                        width: e.target.width,
                        height: e.target.height
                    }, this.props.onFirstSourceLoad())
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement(r.a.Fragment, null, r.a.createElement("img", {
                        onLoad: this.imageOnLoad,
                        className: "fslightbox-single-source",
                        ref: this.props._.elements.sources[this.props.i],
                        src: this.props._.urls[this.props.i],
                        alt: this.props._.urls[this.props.i]
                    }))
                }
            }]) && ke(n.prototype, i), s && ke(n, s), t
        }();
        Ee.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired, onFirstSourceLoad: s.a.func.isRequired };
        var Ce, Re = Ee;
        function ze(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var Ie = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLightbox = t, this.onFirstSourceLoad = null, this.i = null, Ce = null
            }
            var t, n, o;
            return t = e, (n = [{
                key: "attachOnFirstSourceLoad", value: function (e) {
                    this.onFirstSourceLoad = e
                }
            }, {
                key: "createSourceForIndex", value: function (e) {
                    switch (this.i = e, this.fsLightbox.sourcesTypes[e]) {
                        case"image":
                            this.createImageSource();
                            break;
                        case"video":
                            this.createVideoSource();
                            break;
                        case"youtube":
                            this.createYoutubeSource();
                            break;
                        default:
                            this.createInvalidSource()
                    }
                }
            }, {
                key: "getSource", value: function () {
                    return r.a.createElement(Ce, {
                        _: this.fsLightbox,
                        i: this.i,
                        onFirstSourceLoad: this.onFirstSourceLoad
                    })
                }
            }, {
                key: "createImageSource", value: function () {
                    Ce = Re
                }
            }, {
                key: "createVideoSource", value: function () {
                    Ce = le
                }
            }, {
                key: "createYoutubeSource", value: function () {
                    Ce = me
                }
            }, {
                key: "createInvalidSource", value: function () {
                    Ce = Oe
                }
            }]) && ze(t.prototype, n), o && ze(t, o), e
        }();
        function Me(e) {
            return (Me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function Ae(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function Fe(e, t) {
            return !t || "object" !== Me(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function He(e) {
            return (He = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function Ne(e, t) {
            return (Ne = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var qe = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), Fe(this, He(t).apply(this, arguments))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ne(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-loader" }, r.a.createElement("div", null), r.a.createElement("div", null), r.a.createElement("div", null), r.a.createElement("div", null))
                }
            }]) && Ae(n.prototype, i), s && Ae(n, s), t
        }();
        function De(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var Ue = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLightbox = t, this._i = null, this._sourceWidth = 0, this._sourceHeight = 0, this._ratio = 0, this._newHeight = 0
            }
            var t, n, o;
            return t = e, (n = [{
                key: "setIndex", value: function (e) {
                    this._i = e, this._sourceWidth = this.fsLightbox.sourceDimensions[e].width, this._sourceHeight = this.fsLightbox.sourceDimensions[e].height, this._ratio = this._sourceWidth / this._sourceHeight
                }
            }, {
                key: "adjustSourceSize", value: function () {
                    if (this._newHeight = this.fsLightbox.maxSourceWidth / this._ratio, this._newHeight < this.fsLightbox.maxSourceHeight) return this._sourceWidth < this.fsLightbox.maxSourceWidth && (this._newHeight = this._sourceHeight), void this._setDimensions();
                    this._sourceHeight > this.fsLightbox.maxSourceHeight ? this._newHeight = this.fsLightbox.maxSourceHeight : this._newHeight = this._sourceHeight, this._setDimensions()
                }
            }, {
                key: "_setDimensions", value: function () {
                    this.fsLightbox.elements.sources[this._i].current.style.height = this._newHeight + "px", this.fsLightbox.elements.sources[this._i].current.style.width = this._newHeight * this._ratio + "px"
                }
            }]) && De(t.prototype, n), o && De(t, o), e
        }();
        function Be(e) {
            return (Be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function $e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function We(e) {
            return (We = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function Ve(e, t) {
            return (Ve = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        function Ye(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        var Je = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = We(t).call(this, e)) || "object" !== Be(r) && "function" != typeof r ? Ye(o) : r).callUpdateAfterMount = !1, n.isLoaderVisible = !0, n.props._.sourcesToCreateOnConstruct[n.props.i] && (n.callUpdateAfterMount = !0, n.createSource()), n.onFirstSourceLoad = n.onFirstSourceLoad.bind(Ye(Ye(n))), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ve(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "createSource", value: function () {
                    this.isLoaderVisible = !1;
                    var e = new Ie(this.props._);
                    e.createSourceForIndex(this.props.i), e.attachOnFirstSourceLoad(this.onFirstSourceLoad), this.props._.elements.sourcesJSXComponents[this.props.i] = e.getSource(), this.callUpdateAfterMount || this.sourceWasCreated()
                }
            }, {
                key: "sourceWasCreated", value: function () {
                    this.forceUpdate()
                }
            }, {
                key: "componentDidMount", value: function () {
                    this.callUpdateAfterMount && this.sourceWasCreated(), this.props._.isSourceAlreadyLoaded[this.props.i] && this.onSourceLoad()
                }
            }, {
                key: "onFirstSourceLoad", value: function () {
                    this.props._.isSourceAlreadyLoaded[this.props.i] = !0;
                    var e = new Ue(this.props._);
                    e.setIndex(this.props.i), this.props._.collections.sourceSizeAdjusters[this.props.i] = e, this.onSourceLoad()
                }
            }, {
                key: "onSourceLoad", value: function () {
                    this.fadeInSource(), this.props._.collections.sourceSizeAdjusters[this.props.i].adjustSourceSize()
                }
            }, {
                key: "fadeInSource", value: function () {
                    this.props._.stageSources.isSourceInStage(this.props.i) && (this.props.i === this.props._.state.slide - 1 ? this.props._.elements.sources[this.props.i].current.classList.add("fslightbox-fade-in-complete") : this.props._.elements.sources[this.props.i].current.classList.add("fslightbox-fade-in-class"))
                }
            }, {
                key: "render", value: function () {
                    var e = this.props._.isSourceAlreadyLoaded[this.props.i] || !this.isLoaderVisible ? null : r.a.createElement(qe, null);
                    return r.a.createElement(r.a.Fragment, null, e, this.props._.elements.sourcesJSXComponents[this.props.i])
                }
            }]) && $e(n.prototype, i), s && $e(n, s), t
        }();
        Je.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired };
        var Xe = Je;
        function Ge(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var Ze = function () {
            function e() {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._url = "", this._sourceType = null, this._xhr = null, this._resolve = null, this._onRequestStateChange = this._onRequestStateChange.bind(this)
            }
            var t, n, o;
            return t = e, (n = [{
                key: "setUrlToCheck", value: function (e) {
                    this._url = e
                }
            }, {
                key: "getSourceType", value: function () {
                    var e = this;
                    return new Promise(function (t) {
                        e._resolve = t, e._checkIfYoutubeType() ? e._youtubeType() : e._setUpXhr()
                    }).catch(function () {
                        return e._invalidType()
                    })
                }
            }, {
                key: "_checkIfYoutubeType", value: function () {
                    var e = document.createElement("a");
                    return e.href = this._url, "www.youtube.com" === e.hostname
                }
            }, {
                key: "_setUpXhr", value: function () {
                    this._xhr = new XMLHttpRequest, this._xhr.open("GET", this._url, !0), this._xhr.onreadystatechange = this._onRequestStateChange, this._xhr.send()
                }
            }, {
                key: "_onRequestStateChange", value: function () {
                    if (2 === this._xhr.readyState) {
                        if (200 !== this._xhr.status) return this._invalidType(), void this._abortRequestAndResolvePromise();
                        var e;
                        this._callCorrectActionsDependingOnSourceType((e = this._xhr.getResponseHeader("content-type")).slice(0, e.indexOf("/"))), this._abortRequestAndResolvePromise()
                    }
                }
            }, {
                key: "_abortRequestAndResolvePromise", value: function () {
                    this._xhr.abort(), this._resolve()
                }
            }, {
                key: "_callCorrectActionsDependingOnSourceType", value: function (e) {
                    switch (e) {
                        case"image":
                            this._imageType();
                            break;
                        case"video":
                            this._videoType();
                            break;
                        default:
                            this._invalidType()
                    }
                }
            }, {
                key: "_youtubeType", value: function () {
                    this._sourceType = "youtube", this._resolve()
                }
            }, {
                key: "_imageType", value: function () {
                    this._sourceType = "image"
                }
            }, {
                key: "_videoType", value: function () {
                    this._sourceType = "video"
                }
            }, {
                key: "_invalidType", value: function () {
                    this._sourceType = "invalid"
                }
            }]) && Ge(t.prototype, n), o && Ge(t, o), e
        }();
        function Ke(e) {
            return (Ke = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function Qe(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function et(e, t) {
            return !t || "object" !== Ke(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function tt(e) {
            return (tt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function nt(e, t) {
            return (nt = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var ot = function (e) {
            function t(e) {
                var n;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = et(this, tt(t).call(this, e))).source = r.a.createRef(), n.props._.sourcesTypes[n.props.i] || n.initRequest(), n._isMounted = !1, n._isTypeChecked = !1, n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && nt(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "initRequest", value: function () {
                    var e = this;
                    this.sourceTypeChecker = new Ze, this.sourceTypeChecker.setUrlToCheck(this.props._.urls[this.props.i]), this.sourceTypeChecker.getSourceType().then(function () {
                        return e.processReceivedSourceType()
                    })
                }
            }, {
                key: "processReceivedSourceType", value: function () {
                    if (this.props._.sourcesTypes[this.props.i] = this.sourceTypeChecker._sourceType, this._isMounted) {
                        if (null === this.source.current) return void (this.props._.sourcesToCreateOnConstruct[this.props.i] = !0);
                        this.source.current.createSource()
                    } else this._isTypeChecked = !0
                }
            }, {
                key: "componentDidMount", value: function () {
                    this._isMounted = !0, this._isTypeChecked && this.source.current.createSource()
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement("div", {
                        ref: this.props._.elements.sourceHolders[this.props.i],
                        className: "fslightbox-source-holder"
                    }, r.a.createElement(Xe, { _: this.props._, i: this.props.i, ref: this.source }))
                }
            }]) && Qe(n.prototype, i), s && Qe(n, s), t
        }();
        ot.propTypes = { _: s.a.object, i: s.a.number };
        var rt = ot;
        function it(e) {
            return (it = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function st(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function ut(e, t) {
            return !t || "object" !== it(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function at(e) {
            return (at = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function ct(e, t) {
            return (ct = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var lt = function (e) {
            function t(e) {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), ut(this, at(t).call(this, e))
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && ct(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    for (var e = [], t = 0; t < this.props._.totalSlides; t++) e.push(r.a.createElement(rt, {
                        key: t,
                        i: t,
                        _: this.props._
                    }));
                    return r.a.createElement("div", {
                        ref: this.props._.elements.mediaHolder,
                        className: "fslightbox-media-holder"
                    }, e)
                }
            }]) && st(n.prototype, i), s && st(n, s), t
        }();
        lt.propTypes = { _: s.a.object };
        var ft = lt, pt = function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        };
        function ht(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var dt = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLightbox = t, this._onResizeMethod = this._onResizeMethod.bind(this)
            }
            var t, n, o;
            return t = e, (n = [{
                key: "init", value: function () {
                    this.fsLightbox.isMobile = pt(), this._saveMaxSourcesDimensions(), this.adjustMediaHolderSize(), this.attachListener()
                }
            }, {
                key: "adjustMediaHolderSize", value: function () {
                    this.fsLightbox.elements.mediaHolder.current.style.width = this.fsLightbox.maxSourceWidth + "px", this.fsLightbox.elements.mediaHolder.current.style.height = this.fsLightbox.maxSourceHeight + "px"
                }
            }, {
                key: "attachListener", value: function () {
                    window.addEventListener("resize", this._onResizeMethod)
                }
            }, {
                key: "removeListener", value: function () {
                    window.removeEventListener("resize", this._onResizeMethod)
                }
            }, {
                key: "_saveMaxSourcesDimensions", value: function () {
                    window.innerWidth < 1e3 ? this.fsLightbox.maxSourceWidth = window.innerWidth : this.fsLightbox.maxSourceWidth = window.innerWidth - .1 * window.innerWidth, this.fsLightbox.maxSourceHeight = window.innerHeight - .1 * window.innerHeight
                }
            }, {
                key: "_onResizeMethod", value: function () {
                    this.fsLightbox.isMobile = pt(), this._saveMaxSourcesDimensions(), this.adjustMediaHolderSize(), this.fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes(), this.fsLightbox.core.sourceHoldersTransformer.transformStageSources().withoutTimeout()
                }
            }]) && ht(t.prototype, n), o && ht(t, o), e
        }(), bt = function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(r.a.createRef());
            return t
        }, yt = function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(null);
            return t
        };
        function mt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var vt = function () {
            function e(t) {
                var n = t.collections;
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.collections = n, this._i = 0
            }
            var t, n, o;
            return t = e, (n = [{
                key: "adjustAllSourcesSizes", value: function () {
                    for (this._i = 0; this._hasNext();) this._adjustSourceSize(), this._i++
                }
            }, {
                key: "_hasNext", value: function () {
                    return this._i < this.collections.sourceSizeAdjusters.length
                }
            }, {
                key: "_adjustSourceSize", value: function () {
                    this._isNull() || this.collections.sourceSizeAdjusters[this._i].adjustSourceSize()
                }
            }, {
                key: "_isNull", value: function () {
                    return !this.collections.sourceSizeAdjusters[this._i]
                }
            }]) && mt(t.prototype, n), o && mt(t, o), e
        }();
        function gt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var xt = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLightbox = t
            }
            var t, n, o;
            return t = e, (n = [{
                key: "isSourceInStage", value: function (e) {
                    if (e++, 1 === this.fsLightbox.state.slide && e === this.fsLightbox.totalSlides) return !0;
                    if (this.fsLightbox.state.slide === this.fsLightbox.totalSlides && 1 === e) return !0;
                    var t = this.fsLightbox.state.slide - e;
                    return -1 === t || 0 === t || 1 === t
                }
            }, {
                key: "getPreviousSlideIndex", value: function () {
                    return 1 === this.fsLightbox.state.slide ? this.fsLightbox.totalSlides - 1 : this.fsLightbox.state.slide - 2
                }
            }, {
                key: "getNextSlideIndex", value: function () {
                    return this.fsLightbox.state.slide === this.fsLightbox.totalSlides ? 0 : this.fsLightbox.state.slide
                }
            }, {
                key: "getAllStageIndexes", value: function () {
                    var e = { current: this.fsLightbox.state.slide - 1 };
                    return this.fsLightbox.totalSlides > 1 && (e.next = this.getNextSlideIndex()), this.fsLightbox.totalSlides > 2 && (e.previous = this.getPreviousSlideIndex()), e
                }
            }]) && gt(t.prototype, n), o && gt(t, o), e
        }();
        function _t(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var St = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLigthbox = t, this.stageSourcesIndexes = t.stageSources.getAllStageIndexes(), this.fsLigthbox.core.sourceHoldersTransformer.transformZero(this.stageSourcesIndexes.current)
            }
            var t, n, o;
            return t = e, (n = [{
                key: "withoutTimeout", value: function () {
                    this.transformNegative(), this.transformPositive()
                }
            }, {
                key: "withTimeout", value: function () {
                    var e = this;
                    setTimeout(function () {
                        e.transformNegative(), e.transformPositive()
                    }, 220)
                }
            }, {
                key: "transformNegative", value: function () {
                    void 0 !== this.stageSourcesIndexes.previous && this.stageSourcesIndexes.previous !== this.fsLigthbox.state.slide - 1 && this.fsLigthbox.core.sourceHoldersTransformer.transformNegative(this.stageSourcesIndexes.previous)
                }
            }, {
                key: "transformPositive", value: function () {
                    void 0 !== this.stageSourcesIndexes.next && this.stageSourcesIndexes.next !== this.fsLigthbox.state.slide - 1 && this.fsLigthbox.core.sourceHoldersTransformer.transformPositive(this.stageSourcesIndexes.next)
                }
            }]) && _t(t.prototype, n), o && _t(t, o), e
        }();
        function wt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        var Ot = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLigthbox = t
            }
            var t, n, o;
            return t = e, (n = [{
                key: "transformStageSources", value: function () {
                    return new St(this.fsLigthbox)
                }
            }, {
                key: "transformNegative", value: function (e) {
                    this._getStyleOfSourceHolderByIndex(e).transform = "translate(" + -this.fsLigthbox.slideDistance * window.innerWidth + "px,0)"
                }
            }, {
                key: "transformZero", value: function (e) {
                    this._getStyleOfSourceHolderByIndex(e).transform = "translate(0,0)"
                }
            }, {
                key: "transformPositive", value: function (e) {
                    this._getStyleOfSourceHolderByIndex(e).transform = "translate(" + this.fsLigthbox.slideDistance * window.innerWidth + "px,0)"
                }
            }, {
                key: "_getStyleOfSourceHolderByIndex", value: function (e) {
                    return this.fsLigthbox.elements.sourceHolders[e].current.style
                }
            }]) && wt(t.prototype, n), o && wt(t, o), e
        }();
        function jt(e) {
            var t = this, n = e.elements.sources, o = null;
            this.animateSourceFromSlide = function (e) {
                return o = e - 1, t
            }, this.fadeOut = function () {
                r().add("fslightbox-fade-out-class")
            }, this.fadeIn = function () {
                r().add("fslightbox-fade-in-class")
            }, this.removeFadeOut = function () {
                r().remove("fslightbox-fade-out-class")
            }, this.removeFadeIn = function () {
                r().contains("fslightbox-fade-in-class") ? r().remove("fslightbox-fade-in-class") : r().remove("fslightbox-fade-in-complete")
            };
            var r = function () {
                return n[o].current.classList
            }
        }
        function kt(e) {
            var t = e.info;
            this.turnOnFullscreen = function () {
                t.isFullscreenOpen = !0;
                var e = document.documentElement;
                e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen()
            }, this.turnOffFullscreen = function () {
                t.isFullscreenOpen = !1, document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
            }
        }
        function Lt(e) {
            return (Lt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        function Tt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        function Pt(e, t) {
            return !t || "object" !== Lt(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function Et(e) {
            return (Et = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }
        function Ct(e, t) {
            return (Ct = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var Rt = function (e) {
            function t(e) {
                var n;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = Pt(this, Et(t).call(this, e))).setData(), n.setInfo(), n.setStates(), n.setElements(), n.setCollections(), n.setCore(), n
            }
            var n, i, s;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ct(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "setData", value: function () {
                    this.urls = this.props.urls, this.sourcesTypes = [], this.isSourceAlreadyLoaded = [], this.totalSlides = this.props.urls.length, this.slideDistance = this.props.slideDistance ? this.props.slideDistance : 1.3, this.sourcesToCreateOnConstruct = [], this.videosPosters = this.props.videosPosters ? this.props.videosPosters : [], this.maxSourceWidth = 0, this.maxSourceHeight = 0, this.sourceDimensions = []
                }
            }, {
                key: "setInfo", value: function () {
                    this.info = { isInitialized: !1, isFullscreenOpen: !1 }
                }
            }, {
                key: "setStates", value: function () {
                    this.state = { slide: this.props.slide ? this.props.slide : 1, isOpen: this.props.isOpen }
                }
            }, {
                key: "setElements", value: function () {
                    this.elements = {
                        container: r.a.createRef(),
                        mediaHolder: r.a.createRef(),
                        sourceHolders: bt(this.props.urls),
                        sourcesJSXComponents: yt(this.props.urls),
                        sources: bt(this.props.urls)
                    }
                }
            }, {
                key: "setCore", value: function () {
                    this.core = {
                        closeOpenLightbox: new B(this),
                        onResize: new dt(this),
                        sourceSizeAdjusterIterator: new vt(this),
                        sourceHoldersTransformer: new Ot(this)
                    }, this.stageSources = new xt(this), this.slideChanger = new D(this), this.sourceAnimator = new jt(this), this.fullscreenToggler = new kt(this)
                }
            }, {
                key: "setCollections", value: function () {
                    this.collections = { sourceSizeAdjusters: [] }
                }
            }, {
                key: "componentDidUpdate", value: function (e, t, n) {
                    e.isOpen !== this.props.isOpen && (this.state.isOpen ? this.core.closeOpenLightbox.closeLightbox() : this.core.closeOpenLightbox.openLightbox()), e.slide !== this.props.slide && this.slideChanger.changeSlideTo(this.props.slide)
                }
            }, {
                key: "initialize", value: function () {
                    this.info.isInitialized = !0, this.core.onResize.init(), this.core.sourceHoldersTransformer.transformStageSources().withoutTimeout()
                }
            }, {
                key: "componentDidMount", value: function () {
                    this.props.isOpen && (this.initialize(), this.core.closeOpenLightbox.addOpeningClassToDocument())
                }
            }, {
                key: "render", value: function () {
                    return this.state.isOpen ? r.a.createElement("div", {
                        ref: this.elements.container,
                        className: "fslightbox-container"
                    }, r.a.createElement(q, { fsLightbox: this }), r.a.createElement(G, { _: this }), r.a.createElement(oe, { _: this }), r.a.createElement(ft, { _: this })) : null
                }
            }]) && Tt(n.prototype, i), s && Tt(n, s), t
        }();
        Rt.propTypes = {
            isOpen: s.a.bool.isRequired,
            urls: s.a.array.isRequired,
            onOpen: s.a.func,
            onClose: s.a.func,
            onInit: s.a.func,
            onShow: s.a.func,
            videosPosters: s.a.array,
            slide: s.a.number,
            slideDistance: s.a.number
        };
        t.default = Rt
    }])
});