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
            y = r ? Symbol.for("react.suspense") : 60113, b = r ? Symbol.for("react.memo") : 60115,
            d = r ? Symbol.for("react.lazy") : 60116, m = "function" == typeof Symbol && Symbol.iterator;

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
        }, w = {};

        function _(e, t, n) {
            this.props = e, this.context = t, this.refs = w, this.updater = n || g
        }

        function O() {
        }

        function S(e, t, n) {
            this.props = e, this.context = t, this.refs = w, this.updater = n || g
        }

        _.prototype.isReactComponent = {}, _.prototype.setState = function (e, t) {
            "object" != typeof e && "function" != typeof e && null != e && v("85"), this.updater.enqueueSetState(this, e, t, "setState")
        }, _.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate")
        }, O.prototype = _.prototype;
        var x = S.prototype = new O;
        x.constructor = S, o(x, _.prototype), x.isPureReactComponent = !0;
        var j = { current: null, currentDispatcher: null }, k = Object.prototype.hasOwnProperty,
            E = { key: !0, ref: !0, __self: !0, __source: !0 };

        function P(e, t, n) {
            var o = void 0, r = {}, s = null, u = null;
            if (null != t) for (o in void 0 !== t.ref && (u = t.ref), void 0 !== t.key && (s = "" + t.key), t) k.call(t, o) && !E.hasOwnProperty(o) && (r[o] = t[o]);
            var a = arguments.length - 2;
            if (1 === a) r.children = n; else if (1 < a) {
                for (var c = Array(a), l = 0; l < a; l++) c[l] = arguments[l + 2];
                r.children = c
            }
            if (e && e.defaultProps) for (o in a = e.defaultProps) void 0 === r[o] && (r[o] = a[o]);
            return { $$typeof: i, type: e, key: s, ref: u, props: r, _owner: j.current }
        }

        function T(e) {
            return "object" == typeof e && null !== e && e.$$typeof === i
        }

        var C = /\/+/g, L = [];

        function R(e, t, n, o) {
            if (L.length) {
                var r = L.pop();
                return r.result = e, r.keyPrefix = t, r.func = n, r.context = o, r.count = 0, r
            }
            return { result: e, keyPrefix: t, func: n, context: o, count: 0 }
        }

        function z(e) {
            e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > L.length && L.push(e)
        }

        function M(e, t, n) {
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
                if (a) return o(r, t, "" === n ? "." + A(t, 0) : n), 1;
                if (a = 0, n = "" === n ? "." : n + ":", Array.isArray(t)) for (var c = 0; c < t.length; c++) {
                    var l = n + A(u = t[c], c);
                    a += e(u, l, o, r)
                } else if (l = null === t || "object" != typeof t ? null : "function" == typeof (l = m && t[m] || t["@@iterator"]) ? l : null, "function" == typeof l) for (t = l.call(t), c = 0; !(u = t.next()).done;) a += e(u = u.value, l = n + A(u, c++), o, r); else "object" === u && v("31", "[object Object]" == (o = "" + t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : o, "");
                return a
            }(e, "", t, n)
        }

        function A(e, t) {
            return "object" == typeof e && null !== e && null != e.key ? function (e) {
                var t = { "=": "=0", ":": "=2" };
                return "$" + ("" + e).replace(/[=:]/g, function (e) {
                    return t[e]
                })
            }(e.key) : t.toString(36)
        }

        function H(e, t) {
            e.func.call(e.context, t, e.count++)
        }

        function I(e, t, n) {
            var o = e.result, r = e.keyPrefix;
            e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? D(e, o, n, function (e) {
                return e
            }) : null != e && (T(e) && (e = function (e, t) {
                return { $$typeof: i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner }
            }(e, r + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(C, "$&/") + "/") + n)), o.push(e))
        }

        function D(e, t, n, o, r) {
            var i = "";
            null != n && (i = ("" + n).replace(C, "$&/") + "/"), M(e, I, t = R(t, i, o, r)), z(t)
        }

        var N = {
            Children: {
                map: function (e, t, n) {
                    if (null == e) return e;
                    var o = [];
                    return D(e, o, null, t, n), o
                }, forEach: function (e, t, n) {
                    if (null == e) return e;
                    M(e, H, t = R(null, null, t, n)), z(t)
                }, count: function (e) {
                    return M(e, function () {
                        return null
                    }, null)
                }, toArray: function (e) {
                    var t = [];
                    return D(e, t, null, function (e) {
                        return e
                    }), t
                }, only: function (e) {
                    return T(e) || v("143"), e
                }
            },
            createRef: function () {
                return { current: null }
            },
            Component: _,
            PureComponent: S,
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
                return { $$typeof: d, _ctor: e, _status: -1, _result: null }
            },
            memo: function (e, t) {
                return { $$typeof: b, type: e, compare: void 0 === t ? null : t }
            },
            Fragment: u,
            StrictMode: a,
            Suspense: y,
            createElement: P,
            cloneElement: function (e, t, n) {
                null == e && v("267", e);
                var r = void 0, s = o({}, e.props), u = e.key, a = e.ref, c = e._owner;
                if (null != t) {
                    void 0 !== t.ref && (a = t.ref, c = j.current), void 0 !== t.key && (u = "" + t.key);
                    var l = void 0;
                    for (r in e.type && e.type.defaultProps && (l = e.type.defaultProps), t) k.call(t, r) && !E.hasOwnProperty(r) && (s[r] = void 0 === t[r] && void 0 !== l ? l[r] : t[r])
                }
                if (1 === (r = arguments.length - 2)) s.children = n; else if (1 < r) {
                    l = Array(r);
                    for (var f = 0; f < r; f++) l[f] = arguments[f + 2];
                    s.children = l
                }
                return { $$typeof: i, type: e.type, key: u, ref: a, props: s, _owner: c }
            },
            createFactory: function (e) {
                var t = P.bind(null, e);
                return t.type = e, t
            },
            isValidElement: T,
            version: "16.7.0",
            unstable_ConcurrentMode: p,
            unstable_Profiler: c,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: j, assign: o }
        }, U = { default: N }, q = U && N || U;
        e.exports = q.default || q
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
        (t = e.exports = n(8)(!1)).push([e.i, "@import url(https://fonts.googleapis.com/css?family=Montserrat);", ""]), t.push([e.i, '.fslightbox-toolbar {\n    position: absolute;\n    right: 0;\n    top: 0;\n    height: 100%;\n    display: flex;\n    background: rgba(35, 35, 35, 0.65);\n}\n\n.fslightbox-toolbar-button {\n    height: 100%;\n    width: 45px;\n    cursor: pointer;\n}\n\n.fslightbox-loader {\n    display: block;\n    margin: auto;\n    position: relative;\n    width: 67px;\n    height: 67px;\n}\n\n.fslightbox-loader div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 54px;\n    height: 54px;\n    margin: 6px;\n    border: 5px solid #999;\n    border-radius: 50%;\n    animation: fslightbox-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #999 transparent transparent transparent;\n}\n\n.fslightbox-loader div:nth-child(1) {\n    animation-delay: -0.45s;\n}\n\n.fslightbox-loader div:nth-child(2) {\n    animation-delay: -0.3s;\n}\n\n.fslightbox-loader div:nth-child(3) {\n    animation-delay: -0.15s;\n}\n\n@keyframes fslightbox-loader {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.fslightbox-source-holder {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    display: flex;\n    align-items: center;\n}\n\n.fslightbox-single-source {\n    margin: auto;\n    opacity: 0;\n    display: block;\n    backface-visibility: hidden;\n    transform: translateZ(0);\n}\n\n.fslightbox-video {\n    object-fit: cover;\n}\n\n\n.fslightbox-transform-transition {\n    transition: transform .3s;\n}\n\n.fslightbox-invalid-file-wrapper {\n    font-size: 22px;\n    color: #eaebeb;\n    margin: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.fslightbox-fade-in {\n    opacity: 1 !important;\n}\n\n.fslightbox-fade-in-class {\n    animation: fslightbox-fade-in .25s ease forwards;\n}\n\n.fslightbox-fade-out-animation {\n    animation: fslightbox-fade-out .25s ease !important;\n}\n\n@keyframes fslightbox-fade-in {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n\n@keyframes fslightbox-fade-out {\n    from {\n        opacity: 1;\n    }\n\n    to {\n        opacity: 0;\n    }\n}\n\n\n@keyframes fslightbox-fade-out-anim {\n    0% {\n        opacity: .2;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.fslightbox-container {\n    opacity: 0;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(rgba(30, 30, 30, 0.9), black 1810%);\n    font-family: "Montserrat", sans-serif;\n    z-index: 9999999;\n    user-select: none;\n    animation: fslightbox-fade-in .25s forwards;\n    transition: opacity .25s;\n    -webkit-tap-highlight-color: transparent;\n}\n\n.fslightbox-open {\n    overflow: hidden;\n    height: 100%;\n}\n\n.fslightbox-scrollbarfix {\n    padding-right: 17px;\n}\n\n.fslightbox-nav {\n    height: 45px;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 2;\n}\n\n.fslightbox-slide-number-container {\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: .82rem;\n    color: #c1c2c2;\n    z-index: 1;\n    max-width: 46px;\n}\n\n.fslightbox-slide-number {\n    padding: 0 2px;\n}\n\n.fslightbox-slide-number-container .fslightbox-slash {\n    padding-top: .15rem;\n    font-size: 12px;\n}\n\n.fslightbox-svg-icon path {\n    fill: #ddd;\n}\n\n.fslightbox-svg-icon circle {\n    stroke: #4691f6;\n    stroke-width: 1;\n}\n\n.fslightbox-slide-btn-container {\n    display: flex;\n    align-items: center;\n    padding: 30px 30px 30px 6px;\n    position: absolute;\n    top: 50%;\n    cursor: pointer;\n    z-index: 1;\n    transform: translateY(-50%);\n}\n\n.fslightbox-slide-btn-container:hover .fslightbox-svg-icon path {\n    fill: #f1f1f1;\n}\n\n.fslightbox-slide-btn {\n    padding: 7px;\n    font-size: 26px;\n    background: rgba(35, 35, 35, 0.65);\n}\n\n@media (min-width: 476px) {\n    .fslightbox-slide-btn {\n        padding: 8px;\n    }\n}\n\n.fslightbox-slide-btn-left-container {\n    left: 0;\n}\n\n@media (max-width: 475.99px) {\n    .fslightbox-slide-btn-left-container {\n        padding-left: 3px;\n    }\n}\n\n.fslightbox-slide-btn-right-container {\n    right: 0;\n    padding-left: 30px;\n    padding-right: 3px;\n}\n\n@media (min-width: 476px) {\n    .fslightbox-slide-btn-right-container {\n        padding-right: 6px;\n    }\n}\n\n.button-style {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.fslightbox-holder-wrapper {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: absolute;\n}\n\n.fslightbox-media-holder {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.fslightbox-invisible-hover {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 10;\n}\n\n.fslightbox-cursor-grabbing {\n    cursor: grabbing;\n}\n\n.button-style:hover .fslightbox-svg-icon path {\n    fill: #fff;\n}\n\n', ""])
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

        function y(e, t) {
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

        function d(e) {
            var t = document.createElement("style");
            if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
                var o = function () {
                    0;
                    return n.nc
                }();
                o && (e.attrs.nonce = o)
            }
            return m(t, e.attrs), y(e, t), t
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
                n = a || (a = d(t)), o = _.bind(null, n, s, !1), r = _.bind(null, n, s, !0)
            } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
                var t = document.createElement("link");
                return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", m(t, e.attrs), y(e, t), t
            }(t), o = function (e, t, n) {
                var o = n.css, r = n.sourceMap, i = void 0 === t.convertToAbsoluteUrls && r;
                (t.convertToAbsoluteUrls || i) && (o = f(o));
                r && (o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
                var s = new Blob([o], { type: "text/css" }), u = e.href;
                e.href = URL.createObjectURL(s), u && URL.revokeObjectURL(u)
            }.bind(null, n, t), r = function () {
                b(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = d(t), o = function (e, t) {
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
        var g, w = (g = [], function (e, t) {
            return g[e] = t, g.filter(Boolean).join("\n")
        });

        function _(e, t, n, o) {
            var r = n ? "" : o.css;
            if (e.styleSheet) e.styleSheet.cssText = w(t, r); else {
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

        function y(e) {
            return (y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
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

        function d(e, t) {
            return !t || "object" !== y(t) && "function" != typeof t ? function (e) {
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
                }(this, t), d(this, m(t).apply(this, arguments))
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

        function w(e) {
            return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
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

        function O(e) {
            return (O = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function S(e, t) {
            return (S = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function x(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        var j = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = O(t).call(this, e)) || "object" !== w(r) && "function" != typeof r ? x(o) : r).close = n.close.bind(x(x(n))), n.fullscreen = n.fullscreen.bind(x(x(n))), n
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
                }), t && S(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "fullscreen", value: function () {
                }
            }, {
                key: "close", value: function () {
                    this.props.closeLightbox()
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
        j.propTypes = { closeLightbox: s.a.func };
        var k = j;

        function E(e) {
            return (E = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function P(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function T(e, t) {
            return !t || "object" !== E(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function C(e) {
            return (C = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function L(e, t) {
            return (L = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var R = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), T(this, C(t).apply(this, arguments))
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
                }), t && L(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-slide-number-container" }, r.a.createElement("div", { className: "fslightbox-slide-number" }, "1"), r.a.createElement("div", { className: "fslightbox-slide-number fslightbox-slash" }, "/"), r.a.createElement("div", { className: "fslightbox-slide-number" }, "4"))
                }
            }]) && P(n.prototype, i), s && P(n, s), t
        }();

        function z(e) {
            return (z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
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
            return !t || "object" !== z(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function H(e) {
            return (H = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function I(e, t) {
            return (I = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var D = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), A(this, H(t).apply(this, arguments))
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
                }), t && I(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-nav" }, r.a.createElement(k, { closeLightbox: this.props.closeLightbox }), r.a.createElement(R, null))
                }
            }]) && M(n.prototype, i), s && M(n, s), t
        }();
        D.propTypes = { closeLightbox: s.a.func };
        var N = D;
        n(6);

        function U(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var q = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._ = t, this.documentClassList = document.documentElement.classList, this.fadingOut = !1, this.closeLightbox = this.closeLightbox.bind(this), this.componentMountedAfterOpen = this.componentMountedAfterOpen.bind(this), this.componentMountedAfterClose = this.componentMountedAfterClose.bind(this)
            }

            var t, n, o;
            return t = e, (n = [{
                key: "openLightbox", value: function () {
                    this._.setState({ isOpen: !0 }, this.componentMountedAfterOpen), this.addOpeningClassToDocument()
                }
            }, {
                key: "addOpeningClassToDocument", value: function () {
                    this.documentClassList.add("fslightbox-open")
                }
            }, {
                key: "componentMountedAfterOpen", value: function () {
                    this._.initialized ? (this._.onResize.attachListener(), this._.onResize.adjustMediaHolderSize()) : this._.initialize()
                }
            }, {
                key: "closeLightbox", value: function () {
                    var e = this;
                    this.fadingOut || (this.fadingOut = !0, this._.elements.container.current.classList.add("fslightbox-fade-out-animation"), setTimeout(function () {
                        e._.elements.container.current.classList.remove("fslightbox-fade-out-animation"), e.fadingOut = !1, e.documentClassList.remove("fslightbox-open"), e._.setState({ isOpen: !1 }, e.componentMountedAfterClose)
                    }, 250))
                }
            }, {
                key: "componentMountedAfterClose", value: function () {
                    this._.onResize.removeListener()
                }
            }]) && U(t.prototype, n), o && U(t, o), e
        }();

        function F(e) {
            return (F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function $(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function B(e, t) {
            return !t || "object" !== F(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function W(e) {
            return (W = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function V(e, t) {
            return (V = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var Y = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), B(this, W(t).apply(this, arguments))
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
                }), t && V(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-slide-btn-container fslightbox-slide-btn-left-container" }, r.a.createElement("div", { className: "fslightbox-slide-btn button-style" }, r.a.createElement(h, {
                        viewBox: "0 0 20 20",
                        size: "1em",
                        d: "M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
                    })))
                }
            }]) && $(n.prototype, i), s && $(n, s), t
        }();

        function J(e) {
            return (J = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function X(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function G(e, t) {
            return !t || "object" !== J(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function Z(e) {
            return (Z = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function K(e, t) {
            return (K = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var Q = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), G(this, Z(t).apply(this, arguments))
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
                }), t && K(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-slide-btn-container fslightbox-slide-btn-right-container" }, r.a.createElement("div", { className: "fslightbox-slide-btn button-style" }, r.a.createElement(h, {
                        viewBox: "0 0 20 20",
                        size: "1em",
                        d: "M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                    })))
                }
            }]) && X(n.prototype, i), s && X(n, s), t
        }();

        function ee(e) {
            return (ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function te(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function ne(e) {
            return (ne = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function oe(e, t) {
            return (oe = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function re(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        var ie = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = ne(t).call(this, e)) || "object" !== ee(r) && "function" != typeof r ? re(o) : r).onLoadedMetaData = n.onLoadedMetaData.bind(re(re(n))), n
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
                }), t && oe(e, t)
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
            }]) && te(n.prototype, i), s && te(n, s), t
        }();
        ie.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired, onFirstSourceLoad: s.a.func.isRequired };
        var se = ie;

        function ue(e) {
            return (ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function ae(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function ce(e, t) {
            return !t || "object" !== ue(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function le(e) {
            return (le = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function fe(e, t) {
            return (fe = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var pe = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), ce(this, le(t).apply(this, arguments))
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
                }), t && fe(e, t)
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
            }]) && ae(n.prototype, i), s && ae(n, s), t
        }();
        pe.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired };
        var he = pe;

        function ye(e) {
            return (ye = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function be(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function de(e, t) {
            return !t || "object" !== ye(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function me(e) {
            return (me = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function ve(e, t) {
            return (ve = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var ge = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), de(this, me(t).apply(this, arguments))
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
                }), t && ve(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", {
                        className: "fslightbox-invalid-file-wrapper",
                        ref: this.props._.elements.sources[this.props.i]
                    }, "Invalid file")
                }
            }]) && be(n.prototype, i), s && be(n, s), t
        }();
        ge.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired };
        var we = ge;

        function _e(e) {
            return (_e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Oe(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function Se(e) {
            return (Se = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function xe(e, t) {
            return (xe = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function je(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        var ke = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = Se(t).call(this, e)) || "object" !== _e(r) && "function" != typeof r ? je(o) : r).imageOnLoad = n.imageOnLoad.bind(je(je(n))), n
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
                }), t && xe(e, t)
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
            }]) && Oe(n.prototype, i), s && Oe(n, s), t
        }();
        ke.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired, onFirstSourceLoad: s.a.func.isRequired };
        var Ee = ke;

        function Pe(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var Te = null, Ce = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fsLightbox = t, this.i = null, this.onFirstSourceLoad = null
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
                key: "createImageSource", value: function () {
                    Te = Ee
                }
            }, {
                key: "createVideoSource", value: function () {
                    Te = se
                }
            }, {
                key: "createYoutubeSource", value: function () {
                    Te = he
                }
            }, {
                key: "createInvalidSource", value: function () {
                    Te = we
                }
            }, {
                key: "getSource", value: function () {
                    return r.a.createElement(Te, {
                        _: this.fsLightbox,
                        i: this.i,
                        onFirstSourceLoad: this.onFirstSourceLoad
                    })
                }
            }]) && Pe(t.prototype, n), o && Pe(t, o), e
        }();

        function Le(e) {
            return (Le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Re(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function ze(e, t) {
            return !t || "object" !== Le(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function Me(e) {
            return (Me = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function Ae(e, t) {
            return (Ae = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var He = function (e) {
            function t() {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), ze(this, Me(t).apply(this, arguments))
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
                }), t && Ae(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    return r.a.createElement("div", { className: "fslightbox-loader" }, r.a.createElement("div", null), r.a.createElement("div", null), r.a.createElement("div", null), r.a.createElement("div", null))
                }
            }]) && Re(n.prototype, i), s && Re(n, s), t
        }();

        function Ie(e) {
            return (Ie = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function De(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function Ne(e) {
            return (Ne = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function Ue(e, t) {
            return (Ue = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function qe(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        var Fe = function (e) {
            function t(e) {
                var n, o, r;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), o = this, (n = !(r = Ne(t).call(this, e)) || "object" !== Ie(r) && "function" != typeof r ? qe(o) : r).callUpdateAfterMount = !1, n.isLoaderVisible = !0, n.props._.sourcesToCreateOnConstruct[n.props.i] && (n.callUpdateAfterMount = !0, n.createSource()), n.onFirstSourceLoad = n.onFirstSourceLoad.bind(qe(qe(n))), n
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
                }), t && Ue(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "createSource", value: function () {
                    this.isLoaderVisible = !1;
                    var e = new Ce(this.props._);
                    e.createSourceForIndex(this.props.i), e.attachOnFirstSourceLoad(this.onFirstSourceLoad), this.props._.elements.sourcesJSXComponents[this.props.i] = e.getSource(), this.callUpdateAfterMount || this.sourceWasCreated()
                }
            }, {
                key: "sourceWasCreated", value: function () {
                    this.forceUpdate(), this.props._.sourceComponentsCreators[this.props.i].createSourceTransformer()
                }
            }, {
                key: "componentDidMount", value: function () {
                    this.callUpdateAfterMount && this.sourceWasCreated(), this.props._.isSourceAlreadyLoaded[this.props.i] && this.onSourceLoad()
                }
            }, {
                key: "onFirstSourceLoad", value: function () {
                    this.props._.isSourceAlreadyLoaded[this.props.i] = !0, this.props._.sourceComponentsCreators[this.props.i].createSourceSizeAdjuster(), this.onSourceLoad()
                }
            }, {
                key: "onSourceLoad", value: function () {
                    this.props._.elements.sources[this.props.i].current.classList.add("fslightbox-fade-in-class"), this.props._.sourceSizeAdjusters[this.props.i].updateSource(), this.props._.sourceSizeAdjusters[this.props.i].adjustSourceSize()
                }
            }, {
                key: "render", value: function () {
                    var e = this.props._.isSourceAlreadyLoaded[this.props.i] || !this.isLoaderVisible ? null : r.a.createElement(He, null);
                    return r.a.createElement(r.a.Fragment, null, e, this.props._.elements.sourcesJSXComponents[this.props.i])
                }
            }]) && De(n.prototype, i), s && De(n, s), t
        }();
        Fe.propTypes = { _: s.a.object.isRequired, i: s.a.number.isRequired };
        var $e = Fe;

        function Be(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var We = function () {
            function e() {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.url = "", this.sourceType = null, this.xhr = new XMLHttpRequest, this.resolve = null, this.onRequestStateChange = this.onRequestStateChange.bind(this)
            }

            var t, n, o;
            return t = e, (n = [{
                key: "setUrlToCheck", value: function (e) {
                    this.url = e
                }
            }, {
                key: "getSourceType", value: function () {
                    var e = this;
                    return new Promise(function (t) {
                        e.resolve = t, e.checkIfYoutubeType() ? e.youtubeType() : e.setXHR()
                    }).catch(function () {
                        return e.invalidType()
                    })
                }
            }, {
                key: "checkIfYoutubeType", value: function () {
                    var e = document.createElement("a");
                    return e.href = this.url, "www.youtube.com" === e.hostname
                }
            }, {
                key: "setXHR", value: function () {
                    this.xhr.open("GET", this.url, !0), this.xhr.onreadystatechange = this.onRequestStateChange, this.xhr.send()
                }
            }, {
                key: "onRequestStateChange", value: function () {
                    var e;
                    2 === this.xhr.readyState && (this.callCorrectActionsDependingOnSourceType((e = this.xhr.getResponseHeader("content-type")).slice(0, e.indexOf("/"))), this.resolve(), this.xhr.abort())
                }
            }, {
                key: "callCorrectActionsDependingOnSourceType", value: function (e) {
                    switch (e) {
                        case"image":
                            this.imageType();
                            break;
                        case"video":
                            this.videoType();
                            break;
                        default:
                            this.invalidType()
                    }
                }
            }, {
                key: "youtubeType", value: function () {
                    this.sourceType = "youtube", this.resolve()
                }
            }, {
                key: "imageType", value: function () {
                    this.sourceType = "image"
                }
            }, {
                key: "videoType", value: function () {
                    this.sourceType = "video"
                }
            }, {
                key: "invalidType", value: function () {
                    this.sourceType = "invalid"
                }
            }]) && Be(t.prototype, n), o && Be(t, o), e
        }();

        function Ve(e) {
            return (Ve = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Ye(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function Je(e, t) {
            return !t || "object" !== Ve(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function Xe(e) {
            return (Xe = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function Ge(e, t) {
            return (Ge = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var Ze = function (e) {
            function t(e) {
                var n;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = Je(this, Xe(t).call(this, e))).source = r.a.createRef(), n.props._.sourcesTypes[n.props.i] || n.initRequest(), n._isMounted = !1, n._isTypeChecked = !1, n
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
                }), t && Ge(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "initRequest", value: function () {
                    var e = this;
                    this.sourceTypeChecker = new We, this.sourceTypeChecker.setUrlToCheck(this.props._.urls[this.props.i]), this.sourceTypeChecker.getSourceType().then(function () {
                        return e.processReceivedSourceType()
                    })
                }
            }, {
                key: "processReceivedSourceType", value: function () {
                    if (this.props._.sourcesTypes[this.props.i] = this.sourceTypeChecker.sourceType, this._isMounted) {
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
                    }, r.a.createElement($e, { _: this.props._, i: this.props.i, ref: this.source }))
                }
            }]) && Ye(n.prototype, i), s && Ye(n, s), t
        }();
        Ze.propTypes = { _: s.a.object, i: s.a.number };
        var Ke = Ze;

        function Qe(e) {
            return (Qe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function et(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function tt(e, t) {
            return !t || "object" !== Qe(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function nt(e) {
            return (nt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function ot(e, t) {
            return (ot = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var rt = function (e) {
            function t(e) {
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), tt(this, nt(t).call(this, e))
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
                }), t && ot(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "render", value: function () {
                    for (var e = [], t = 0; t < this.props._.totalSlides; t++) e.push(r.a.createElement(Ke, {
                        key: t,
                        i: t,
                        _: this.props._
                    }));
                    return r.a.createElement("div", {
                        ref: this.props._.elements.mediaHolder,
                        className: "fslightbox-media-holder"
                    }, e)
                }
            }]) && et(n.prototype, i), s && et(n, s), t
        }();
        rt.propTypes = { _: s.a.object };
        var it = rt;

        function st(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var ut = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._ = t, this.onResizeMethod = this.onResizeMethod.bind(this)
            }

            var t, n, o;
            return t = e, (n = [{
                key: "init", value: function () {
                    this.saveMaxSourcesDimensions(), this.adjustMediaHolderSize(), this.attachListener()
                }
            }, {
                key: "saveMaxSourcesDimensions", value: function () {
                    window.innerWidth < 1e3 ? this._.maxSourceWidth = window.innerWidth : this._.maxSourceWidth = window.innerWidth - .1 * window.innerWidth, this._.maxSourceHeight = window.innerHeight - .1 * window.innerHeight
                }
            }, {
                key: "adjustMediaHolderSize", value: function () {
                    this._.elements.mediaHolder.current.style.width = this._.maxSourceWidth + "px", this._.elements.mediaHolder.current.style.height = this._.maxSourceHeight + "px"
                }
            }, {
                key: "attachListener", value: function () {
                    window.addEventListener("resize", this.onResizeMethod)
                }
            }, {
                key: "removeListener", value: function () {
                    window.removeEventListener("resize", this.onResizeMethod)
                }
            }, {
                key: "onResizeMethod", value: function () {
                    this._.setState({ isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) }), this.saveMaxSourcesDimensions(), this.adjustMediaHolderSize(), this._.sourceSizeAdjusterIterator.adjustAllSourcesSizes()
                }
            }]) && st(t.prototype, n), o && st(t, o), e
        }(), at = function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(r.a.createRef());
            return t
        }, ct = function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(null);
            return t
        };

        function lt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var ft = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._ = t, this.i = 0
            }

            var t, n, o;
            return t = e, (n = [{
                key: "hasNext", value: function () {
                    return this.i < this._.sourceSizeAdjusters.length
                }
            }, {
                key: "isNull", value: function () {
                    return !this._.sourceSizeAdjusters[this.i]
                }
            }, {
                key: "adjustSourceSize", value: function () {
                    this.isNull() || this._.sourceSizeAdjusters[this.i].adjustSourceSize()
                }
            }, {
                key: "adjustAllSourcesSizes", value: function () {
                    for (this.i = 0; this.hasNext();) this.adjustSourceSize(), this.i++
                }
            }]) && lt(t.prototype, n), o && lt(t, o), e
        }();

        function pt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var ht = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._ = t, this.i = null
            }

            var t, n, o;
            return t = e, (n = [{
                key: "setIndex", value: function (e) {
                    this.i = e
                }
            }]) && pt(t.prototype, n), o && pt(t, o), e
        }();

        function yt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var bt = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._ = t, this.element = null, this.i = null, this.sourceWidth = 0, this.sourceHeight = 0, this.ratio = 0, this.newHeight = 0
            }

            var t, n, o;
            return t = e, (n = [{
                key: "setIndex", value: function (e) {
                    this.i = e, this.sourceWidth = this._.sourceDimensions[e].width, this.sourceHeight = this._.sourceDimensions[e].height, this.ratio = this.sourceWidth / this.sourceHeight
                }
            }, {
                key: "updateSource", value: function () {
                    this.element = this._.elements.sources[this.i].current
                }
            }, {
                key: "adjustSourceSize", value: function () {
                    if (this.newHeight = this._.maxSourceWidth / this.ratio, this.newHeight < this._.maxSourceHeight) return this.sourceWidth < this._.maxSourceWidth && (this.newHeight = this.sourceHeight), void this.setDimensions();
                    this.sourceHeight > this._.maxSourceHeight ? this.newHeight = this._.maxSourceHeight : this.newHeight = this.sourceHeight, this.setDimensions()
                }
            }, {
                key: "setDimensions", value: function () {
                    this.element.style.height = this.newHeight + "px", this.element.style.width = this.newHeight * this.ratio + "px"
                }
            }]) && yt(t.prototype, n), o && yt(t, o), e
        }();

        function dt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        var mt = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._ = t, this.i = null
            }

            var t, n, o;
            return t = e, (n = [{
                key: "setIndex", value: function (e) {
                    this.i = e
                }
            }, {
                key: "createSourceTransformer", value: function () {
                    var e = new ht(this._);
                    e.setIndex(this.i), this._.sourceTransformers[this.i] = e
                }
            }, {
                key: "createSourceSizeAdjuster", value: function () {
                    var e = new bt(this._);
                    e.setIndex(this.i), this._.sourceSizeAdjusters[this.i] = e
                }
            }]) && dt(t.prototype, n), o && dt(t, o), e
        }();

        function vt(e) {
            return (vt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function gt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function wt(e, t) {
            return !t || "object" !== vt(t) && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function _t(e) {
            return (_t = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function Ot(e, t) {
            return (Ot = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        var St = function (e) {
            function t(e) {
                var n;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = wt(this, _t(t).call(this, e))).setData(), n.setStates(), n.setElements(), n.setCore(), n
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
                }), t && Ot(e, t)
            }(t, o["Component"]), n = t, (i = [{
                key: "setData", value: function () {
                    this.initialized = !1, this.urls = this.props.urls, this.sourcesTypes = [], this.isSourceAlreadyLoaded = [], this.slide = this.props.slide ? this.props.slide : 1, this.totalSlides = this.props.urls.length, this.slideDistance = this.props.slideDistance ? this.props.slideDistance : 1.3, this.sourcesToCreateOnConstruct = [], this.videosPosters = this.props.videosPosters ? this.props.videosPosters : [], this.maxSourceWidth = 0, this.maxSourceHeight = 0, this.sourceDimensions = []
                }
            }, {
                key: "setStates", value: function () {
                    this.state = { isOpen: this.props.isOpen, slide: this.props.slide ? this.props.slide : 1 }
                }
            }, {
                key: "setElements", value: function () {
                    this.elements = {
                        container: r.a.createRef(),
                        mediaHolder: r.a.createRef(),
                        sourceHolders: at(this.props.urls),
                        sourcesJSXComponents: ct(this.props.urls),
                        sources: at(this.props.urls)
                    }
                }
            }, {
                key: "setCore", value: function () {
                    this.closeOpenLightbox = new q(this), this.onResize = new ut(this), this.sourceSizeAdjusterIterator = new ft(this), this.sourceComponentsCreators = function (e) {
                        for (var t = [], n = 0; n < e.totalSlides; n++) {
                            var o = new mt(e);
                            o.setIndex(n), t.push(o)
                        }
                        return t
                    }(this), this.sourceSizeAdjusters = [], this.sourceTransformers = []
                }
            }, {
                key: "componentDidUpdate", value: function (e, t, n) {
                    e.isOpen !== this.props.isOpen && (this.state.isOpen ? this.closeOpenLightbox.closeLightbox() : this.closeOpenLightbox.openLightbox()), this.props.slide !== this.slide && (this.slide = this.props.slide)
                }
            }, {
                key: "initialize", value: function () {
                    this.initialized = !0, this.onResize.init()
                }
            }, {
                key: "componentDidMount", value: function () {
                    this.props.isOpen && (this.initialize(), this.closeOpenLightbox.addOpeningClassToDocument())
                }
            }, {
                key: "render", value: function () {
                    return this.state.isOpen ? r.a.createElement("div", {
                        ref: this.elements.container,
                        className: "fslightbox-container"
                    }, r.a.createElement(N, { closeLightbox: this.closeOpenLightbox.closeLightbox }), r.a.createElement(Y, null), r.a.createElement(Q, null), r.a.createElement(it, { _: this })) : null
                }
            }]) && gt(n.prototype, i), s && gt(n, s), t
        }();
        St.propTypes = {
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
        var xt = St;
        t.default = xt
    }])
});