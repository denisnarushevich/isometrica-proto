/*
 The MIT License

 Copyright (c) 2010-2011-2012 Ibon Tolosana [@hyperandroid]

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Version: 0.5 build: 2

 Created on:
 DATE: 2012-11-05
 TIME: 10:05:45
 */


(function (a) {
    function b(b) {
        for (var b = b.split("."), c = a, d = 0; d < b.length - 1; d++)c[b[d]] || (c[b[d]] = {}), c = c[b[d]]
    }

    function c(b, c) {
        for (var d = b.split("."), e = a, g = 0; g < d.length - 1; g++) {
            if (!e[d[g]])return console.log("    Error assigning value to namespace :" + b + ". '" + d[g] + "' does not exist."), null;
            e = e[d[g]]
        }
        e[d[d.length - 1]] = c;
        return e[d[d.length - 1]]
    }

    String.prototype.endsWith = function (a) {
        return this.indexOf(a, this.length - a.length) !== -1
    };
    Function.prototype.bind = Function.prototype.bind || function () {
        var a = this, b = Array.prototype.slice.call(arguments),
            c = b.shift();
        return function () {
            return a.apply(c, b.concat(Array.prototype.slice.call(arguments)))
        }
    };
    isArray = function (a) {
        return typeof a == "object" && a instanceof Array
    };
    isString = function (a) {
        return typeof a == "string"
    };
    isFunction = function (a) {
        return typeof a == "function"
    };
    var d = false, e = function () {
    };
    e.extend = function (a, g, f, h, i) {
        function j() {
            !d && this.__init && this.__init.apply(this, arguments)
        }

        var q = this.prototype;
        d = true;
        var s = new this;
        d = false;
        j.prototype = s;
        j.prototype.constructor = j;
        j.superclass = q;
        j.extend = e.extend;
        c(f, j);
        if (g)for (var r in g)g.hasOwnProperty(r) && (j[r] = g[r]);
        if (h) {
            isArray(h) || (h = [h]);
            for (f = 0; f < h.length; f++) {
                b(h[f]);
                var t = c(h[f], j);
                if (g)for (r in g)g.hasOwnProperty(r) && (t[r] = g[r])
            }
        }
        var a = isFunction(a) ? a() : a, u;
        for (u in a)s[u] = (u === "__init" || i && i.decorated) && isFunction(a[u]) && isFunction(q[u]) ? function (a, b) {
            return function () {
                var c = this.__super;
                this.__super = q[a];
                var d = b.apply(this, arguments);
                this.__super = c;
                return d
            }
        }(u, a[u]) : a[u];
        return j
    };
    var f = function (a) {
        this.name = a.defines;
        this.extendWith = a.extendsWith;
        this.callback = a.onCreate;
        this.callbackPreCreation = a.onPreCreate;
        this.dependencies = a.depends;
        this.baseClass = a.extendsClass;
        this.aliases = a.aliases;
        this.constants = a.constants;
        this.decorated = a.decorated;
        this.children = [];
        return this
    };
    f.prototype = {children:null, name:null, extendWith:null, callback:null, dependencies:null, baseClass:null, aliases:null, constants:null, decorated:false, solved:false, visited:false, status:function () {
        console.log("  Module: " + this.name + (this.dependencies.length ? " unsolved_deps:[" + this.dependencies +
            "]" : " no dependencies.") + (this.solved ? " solved" : " ------\> NOT solved."))
    }, removeDependency:function (a) {
        for (var b = 0; b < this.dependencies.length; b++)if (this.dependencies[b] === a) {
            this.dependencies.splice(b, 1);
            break
        }
    }, assignDependency:function (a) {
        var b;
        for (b = 0; b < this.dependencies.length; b++)if (this.dependencies[b] === a.name) {
            this.children.push(a);
            this.dependencies.splice(b, 1);
            break
        }
    }, isSolved:function () {
        return this.solved
    }, solveDeep:function () {
        if (this.visited)return true;
        this.visited = true;
        if (this.solved)return true;
        if (this.dependencies.length !== 0)return false;
        for (var a = 0; a < this.children.length; a++)if (!this.children[a].solveDeep())return false;
        this.__initModule();
        this.solved = true;
        i.solved(this);
        return true
    }, __initModule:function () {
        var b = null;
        if (this.baseClass) {
            a:{
                for (var b = this.baseClass.split("."), c = a, d = 0; d < b.length; d++) {
                    if (!c[b[d]]) {
                        b = null;
                        break a
                    }
                    c = c[b[d]]
                }
                b = c
            }
            if (!b) {
                console.log("  " + this.name + " -> Can't extend non-existant class: " + this.baseClass);
                return
            }
            b.extend(this.extendWith, this.constants, this.name,
                this.aliases, {decorated:this.decorated})
        } else e.extend(this.extendWith, this.constants, this.name, this.aliases, {decorated:this.decorated});
        console.log("Created module: " + this.name);
        this.callback && this.callback()
    }};
    var g = function (a, b) {
        this.path = a;
        this.module = b;
        return this
    };
    g.prototype = {path:null, processed:false, module:null, setProcessed:function () {
        this.processed = true
    }, isProcessed:function () {
        return this.processed
    }};
    var h = function () {
        this.nodes = [];
        this.loadedFiles = [];
        this.path = {};
        this.solveListener = [];
        this.orderedSolvedModules =
            [];
        this.readyListener = [];
        return this
    };
    h.baseURL = "";
    h.modulePath = {};
    h.sortedModulePath = [];
    h.symbol = {};
    h.prototype = {nodes:null, loadedFiles:null, solveListener:null, readyListener:null, orderedSolvedModules:null, addSolvedListener:function (a, b) {
        this.solveListener.push({name:a, callback:b})
    }, solved:function (a) {
        var b;
        for (b = 0; b < this.solveListener.length; b++)this.solveListener[b].name === a.name && this.solveListener[b].callback();
        this.orderedSolvedModules.push(a);
        this.notifyReady()
    }, notifyReady:function () {
        var a;
        for (a = 0; a < this.nodes.length; a++)if (!this.nodes[a].isSolved())return;
        for (a = 0; a < this.loadedFiles.length; a++)if (!this.loadedFiles[a].isProcessed())return;
        var b = Array.prototype.slice.call(this.readyListener);
        setTimeout(function () {
            for (var a = 0; a < b.length; a++)b[a]()
        }, 0);
        this.readyListener = []
    }, status:function () {
        for (var a = 0; a < this.nodes.length; a++)this.nodes[a].status()
    }, module:function (a) {
        var b, c;
        if (this.isModuleScheduledToSolve(a.defines))return this;
        if (a.onPreCreate)try {
            a.onPreCreate()
        } catch (d) {
            console.log("  -> catched " +
                d + " on module " + a.defines + " preCreation.")
        }
        if (!a.depends)a.depends = [];
        if ((b = a.depends) && !isArray(b))b = [b], a.depends = b;
        for (c = 0; c < b.length;)this.alreadySolved(b[c]) ? b.splice(c, 1) : c++;
        b = new f(a);
        for (c = 0; c < this.nodes.length; c++)this.nodes[c].assignDependency(b);
        this.nodes.push(b);
        for (c = 0; c < a.depends.length;)if (this.isModuleScheduledToSolve(a.depends[c])) {
            var e = this.findNode(a.depends[c]);
            null !== e ? b.assignDependency(e) : (alert("Module loaded and does not exist in loaded modules nodes. " + a.depends[c]), c++)
        } else c +=
            1;
        (function (a, b) {
            setTimeout(function () {
                for (c = 0; c < b.depends.length; c++)a.loadFile(b.depends[c])
            }, 0)
        })(this, a);
        return this
    }, findNode:function (a) {
        for (var b = 0; b < this.nodes.length; b++)if (this.nodes[b].name === a)return this.nodes[b];
        return null
    }, alreadySolved:function (a) {
        for (var b = 0; b < this.nodes.length; b++)if (this.nodes[b].name === a && this.nodes[b].isSolved())return true;
        return false
    }, loadFile:function (a) {
        for (var b = this.getPath(a), c = 0; c < this.loadedFiles.length; c++)if (this.loadedFiles[c].path === b)return;
        this.loadedFiles.push(new g(b,
            a));
        c = document.createElement("script");
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = true;
        c.addEventListener("load", this.moduleLoaded.bind(this), false);
        c.addEventListener("error", this.moduleErrored.bind(this), false);
        c.setAttribute("module-name", a);
        c.src = b + (!j ? "?" + (new Date).getTime() : "");
        document.getElementsByTagName("head")[0].appendChild(c)
    }, getPath:function (a) {
        if (a.endsWith(".js"))return a = a.charAt(0) !== "/" ? h.baseURL + a : a.substring(1);
        var b, c;
        for (c in h.symbol)if (a === c)return h.baseURL + h.symbol[c];
        for (b = 0; b < h.sortedModulePath.length; b++) {
            var d = h.sortedModulePath[b];
            if (h.modulePath.hasOwnProperty(d) && (c = h.modulePath[d], a.indexOf(d) === 0))return a = a.substring(d.length + 1), a = a.replace(/\./g, "/"), a = c + a + ".js", h.baseURL + a
        }
        return h.baseURL + a.replace(/\./g, "/") + ".js"
    }, isModuleScheduledToSolve:function (a) {
        for (var b = 0; b < this.nodes.length; b++)if (this.nodes[b].name === a)return true;
        return false
    }, moduleLoaded:function (a) {
        if (a.type === "load") {
            for (var b = (a.currentTarget || a.srcElement).getAttribute("module-name"),
                     a = 0; a < this.loadedFiles.length; a++)if (this.loadedFiles[a].module === b) {
                this.loadedFiles[a].setProcessed();
                break
            }
            for (a = 0; a < this.nodes.length; a++)this.nodes[a].removeDependency(b);
            for (a = 0; a < this.nodes.length; a++) {
                for (b = 0; b < this.nodes.length; b++)this.nodes[b].visited = false;
                this.nodes[a].solveDeep()
            }
            var c = this;
            setTimeout(function () {
                c.notifyReady()
            }, 0)
        }
    }, moduleErrored:function (a) {
        console.log("Error loading module: " + (a.currentTarget || a.srcElement).getAttribute("module-name"))
    }, solvedInOrder:function () {
        for (var a =
            0; a < this.orderedSolvedModules.length; a++)console.log(this.orderedSolvedModules[a].name)
    }, solveAll:function () {
        for (var a = 0; a < this.nodes.length; a++)this.nodes[a].solveDeep()
    }, onReady:function (a) {
        this.readyListener.push(a)
    }};
    var i = new h, j = false;
    a.CAAT = a.CAAT || {};
    CAAT.Module = function (a) {
        a.defines ? (b(a.defines), i.module(a)) : console.error("Bad module definition: " + a)
    };
    CAAT.ModuleManager = {};
    CAAT.ModuleManager.baseURL = function (a) {
        if (!a)return CAAT.Module;
        a.endsWith("/") || (a += "/");
        h.baseURL = a;
        return CAAT.ModuleManager
    };
    CAAT.ModuleManager.setModulePath = function (a, b) {
        b.endsWith("/") || (b += "/");
        h.modulePath[a] || (h.modulePath[a] = b, h.sortedModulePath.push(a), h.sortedModulePath.sort(function (a, b) {
            return a < b
        }));
        return CAAT.ModuleManager
    };
    CAAT.ModuleManager.symbol = function (a, b) {
        h.symbol[a] || (h.symbol[a] = b);
        return CAAT.ModuleManager
    };
    CAAT.ModuleManager.bring = function (a) {
        isArray(a) || (a = [a]);
        for (var b = 0; b < a.length; b++)i.loadFile(a[b]);
        return CAAT.ModuleManager
    };
    CAAT.ModuleManager.status = function () {
        i.status()
    };
    CAAT.ModuleManager.addModuleSolvedListener =
        function (a, b) {
            i.addSolveListener(a, b);
            return CAAT.ModuleManager
        };
    CAAT.ModuleManager.load = function (a, b, c) {
        var d = document.createElement("script");
        d.type = "text/javascript";
        d.charset = "utf-8";
        d.async = true;
        b && d.addEventListener("load", b, false);
        c && d.addEventListener("error", c, false);
        d.addEventListener("load", function () {
            i.solveAll()
        }, false);
        d.src = a + (!j ? "?" + (new Date).getTime() : "");
        document.getElementsByTagName("head")[0].appendChild(d)
    };
    CAAT.ModuleManager.solvedInOrder = function () {
        i.solvedInOrder()
    };
    CAAT.ModuleManager.onReady =
        function (a) {
            i.onReady(a);
            return CAAT.ModuleManager
        };
    CAAT.ModuleManager.solveAll = function () {
        i.solveAll()
    };
    CAAT.ModuleManager.debug = function (a) {
        j = a;
        return CAAT.ModuleManager
    }
})(this);
CAAT.Module({defines:"CAAT.Core.Constants", extendsWith:function () {
    CAAT.setCoordinateClamping = function (a) {
        a ? (CAAT.Matrix.prototype.transformRenderingContext = CAAT.Matrix.prototype.transformRenderingContext_Clamp, CAAT.Matrix.prototype.transformRenderingContextSet = CAAT.Matrix.prototype.transformRenderingContextSet_Clamp) : (CAAT.Matrix.prototype.transformRenderingContext = CAAT.Matrix.prototype.transformRenderingContext_NoClamp, CAAT.Matrix.prototype.transformRenderingContextSet = CAAT.Matrix.prototype.transformRenderingContextSet_NoClamp)
    };
    CAAT.log = function () {
        window.console && window.console.log(Array.prototype.slice.call(arguments))
    };
    CAAT.CSS_TEXT_METRICS = 0;
    CAAT.GLRENDER = false;
    CAAT.DEBUG = false;
    CAAT.DEBUGBB = false;
    CAAT.DEBUGBBBCOLOR = "#00f";
    CAAT.DEBUGAABB = false;
    CAAT.DEBUGAABBCOLOR = "#f00";
    CAAT.DEBUG_DIRTYRECTS = false;
    CAAT.DRAG_THRESHOLD_X = 5;
    CAAT.DRAG_THRESHOLD_Y = 5;
    return{}
}});
extend = function (a, b) {
    var c = a.prototype, d = function () {
    };
    d.prototype = b.prototype;
    a.prototype = new d;
    a.superclass = b.prototype;
    a.prototype.constructor = a;
    if (b.prototype.constructor === Object.prototype.constructor)b.prototype.constructor = b;
    for (var e in c)c.hasOwnProperty(e) && (a.prototype[e] = c[e])
};
extendWith = function (a, b, c) {
    var d = function () {
    };
    d.prototype = a.prototype;
    b.prototype = new d;
    b.superclass = a.prototype;
    b.prototype.constructor = b;
    if (a.prototype.constructor === Object.prototype.constructor)a.prototype.constructor = a;
    if (c)for (var e in c)c.hasOwnProperty(e) && (b.prototype[e] = c[e])
};
proxy = function (a, b, c, d) {
    if (typeof a === "function")return a.__isProxy ? a : function (a) {
        var e = function () {
            b && b({fn:a, arguments:Array.prototype.slice.call(arguments)});
            var e = null;
            try {
                e = a.apply(a, Array.prototype.slice.call(arguments)), c && (e = c({fn:a, arguments:Array.prototype.slice.call(arguments)}))
            } catch (f) {
                if (d)e = d({fn:a, arguments:Array.prototype.slice.call(arguments), exception:f}); else throw f;
            }
            return e
        };
        e.__isProxy = true;
        for (var f in a)a.hasOwnProperty(f) && typeof a[f] !== "function" && f !== "__object" && f !== "__isProxy" &&
        function (a, b, c) {
            a.__defineGetter__(c, function () {
                return b[c]
            });
            a.__defineSetter__(c, function (a) {
                b[c] = a
            })
        }(e, a, f);
        return e
    }(a);
    if (typeof a !== "object" || isArray(a) || isString(a) || a.__isProxy)return a;
    var e = new function () {
    };
    e.__object = a;
    e.__isProxy = true;
    for (var f in a)a.hasOwnProperty(f) && typeof a[f] === "function" ? e[f] = function (a, e, f) {
        return function () {
            b && b({object:a.__object, method:f, arguments:Array.prototype.slice.call(arguments)});
            var j = null;
            try {
                j = e.apply(a.__object, arguments), c && c({object:a.__object,
                    method:f, arguments:Array.prototype.slice.call(arguments)})
            } catch (m) {
                if (d)j = d({object:a.__object, method:f, arguments:Array.prototype.slice.call(arguments), exception:m}); else throw m;
            }
            return j
        }
    }(e, a[f], f) : f !== "__object" && f !== "__isProxy" && function (a, b) {
        a.__defineGetter__(b, function () {
            return a.__object[b]
        });
        a.__defineSetter__(b, function (c) {
            a.__object[b] = c
        })
    }(e, f);
    return e
};
proxify = function (a, b, c, d, e, f) {
    for (var g = "__" + a + "__", h = window, i = a.split("."); i.length > 1;)h = h[i.shift()];
    window[g] = h[i];
    (function (a, g, h, i, l) {
        var p = function () {
            console.log("Creating object of type proxy[" + l + "]");
            var g = new a[i](Array.prototype.slice.call(arguments));
            g.____name = l;
            return proxyObject(g, b, c, d, e, f)
        };
        p.prototype = a[i].prototype;
        for (var o in g[h])g[h].hasOwnProperty(o) && typeof g[h][o] !== "function" && o !== "__object" && o !== "__isProxy" && function (a, b, c) {
            c.__defineGetter__(b, function () {
                return a[b]
            });
            c.__defineSetter__(b, function (c) {
                a[b] = c
            })
        }(g[h], o, p);
        g[h] = p
    })(window, h, i, g, a)
};
proxyObject = function (a, b, c, d, e, f) {
    if (typeof a !== "object" || isArray(a) || isString(a) || a.__isProxy)return a;
    a.$proxy__isProxy = true;
    for (var g in a)if (a.hasOwnProperty(g) && g !== "constructor")if (typeof a[g] === "function") {
        var h = a[g];
        a["$proxy__" + g] = h;
        a[g] = function (a, e, g) {
            return function () {
                var f = Array.prototype.slice.call(arguments);
                b && b({object:a, objectName:a.____name, method:g, arguments:f});
                var h = null;
                try {
                    h = e.apply(a, f), c && c({object:a, objectName:a.____name, method:g, arguments:f})
                } catch (l) {
                    if (d)h = d({object:a,
                        objectName:a.____name, method:g, arguments:f, exception:l}); else throw l;
                }
                return h
            }
        }(a, h, g)
    } else g !== "____name" && function (a, b, c, d) {
        a["$proxy__" + b] = a[b];
        a.__defineGetter__(b, function () {
            c && c(a.____name, b);
            return a["$proxy__" + b]
        });
        a.__defineSetter__(b, function (c) {
            a["$proxy__" + b] = c;
            d && d(a.____name, b, c)
        })
    }(a, g, e, f);
    return a
};
CAAT.Module({defines:"CAAT.Core.Class", extendsWith:function () {
    return{}
}});
CAAT.Module({defines:"CAAT.Math.Bezier", depends:["CAAT.Math.Curve"], extendsClass:"CAAT.Math.Curve", aliases:["CAAT.Bezier"], extendsWith:function () {
    return{cubic:false, applyAsPath:function (a) {
        var b = this.coordlist;
        this.cubic ? a.ctx.bezierCurveTo(b[1].x, b[1].y, b[2].x, b[2].y, b[3].x, b[3].y) : a.ctx.quadraticCurveTo(b[1].x, b[1].y, b[2].x, b[2].y);
        return this
    }, isQuadric:function () {
        return!this.cubic
    }, isCubic:function () {
        return this.cubic
    }, setCubic:function (a, b, c, d, e, f, g, h) {
        this.coordlist = [];
        this.coordlist.push((new CAAT.Point).set(a,
            b));
        this.coordlist.push((new CAAT.Point).set(c, d));
        this.coordlist.push((new CAAT.Point).set(e, f));
        this.coordlist.push((new CAAT.Point).set(g, h));
        this.cubic = true;
        this.update();
        return this
    }, setQuadric:function (a, b, c, d, e, f) {
        this.coordlist = [];
        this.coordlist.push((new CAAT.Point).set(a, b));
        this.coordlist.push((new CAAT.Point).set(c, d));
        this.coordlist.push((new CAAT.Point).set(e, f));
        this.cubic = false;
        this.update();
        return this
    }, setPoints:function (a) {
        if (a.length === 3)this.coordlist = a, this.cubic = false, this.update();
        else if (a.length === 4)this.coordlist = a, this.cubic = true, this.update(); else throw"points must be an array of 3 or 4 CAAT.Point instances.";
        return this
    }, paint:function (a) {
        this.cubic ? this.paintCubic(a) : this.paintCuadric(a);
        CAAT.Math.Bezier.superclass.paint.call(this, a)
    }, paintCuadric:function (a) {
        var b, c;
        b = this.coordlist[0].x;
        c = this.coordlist[0].y;
        a = a.ctx;
        a.save();
        a.beginPath();
        a.moveTo(b, c);
        b = new CAAT.Point;
        for (c = this.k; c <= 1 + this.k; c += this.k)this.solve(b, c), a.lineTo(b.x, b.y);
        a.stroke();
        a.restore()
    }, paintCubic:function (a) {
        var b,
            c;
        b = this.coordlist[0].x;
        c = this.coordlist[0].y;
        a = a.ctx;
        a.save();
        a.beginPath();
        a.moveTo(b, c);
        b = new CAAT.Point;
        for (c = this.k; c <= 1 + this.k; c += this.k)this.solve(b, c), a.lineTo(b.x, b.y);
        a.stroke();
        a.restore()
    }, solve:function (a, b) {
        return this.cubic ? this.solveCubic(a, b) : this.solveQuadric(a, b)
    }, solveCubic:function (a, b) {
        var c = b * b, d = b * c, e = this.coordlist, f = e[0], g = e[1], h = e[2], e = e[3];
        a.x = f.x + b * (-f.x * 3 + b * (3 * f.x - f.x * b)) + b * (3 * g.x + b * (-6 * g.x + g.x * 3 * b)) + c * (h.x * 3 - h.x * 3 * b) + e.x * d;
        a.y = f.y + b * (-f.y * 3 + b * (3 * f.y - f.y * b)) + b * (3 * g.y +
            b * (-6 * g.y + g.y * 3 * b)) + c * (h.y * 3 - h.y * 3 * b) + e.y * d;
        return a
    }, solveQuadric:function (a, b) {
        var c = this.coordlist, d = c[0], e = c[1], c = c[2], f = 1 - b;
        a.x = f * f * d.x + 2 * f * b * e.x + b * b * c.x;
        a.y = f * f * d.y + 2 * f * b * e.y + b * b * c.y;
        return a
    }}
}});
CAAT.Module({defines:"CAAT.Math.CatmullRom", depends:["CAAT.Math.Curve"], extendsClass:"CAAT.Math.Curve", aliases:["CAAT.CatmullRom"], extendsWith:function () {
    return{setCurve:function (a, b, c, d) {
        this.coordlist = [];
        this.coordlist.push(a);
        this.coordlist.push(b);
        this.coordlist.push(c);
        this.coordlist.push(d);
        this.update();
        return this
    }, paint:function (a) {
        var b, c;
        b = this.coordlist[1].x;
        c = this.coordlist[1].y;
        var d = a.ctx;
        d.save();
        d.beginPath();
        d.moveTo(b, c);
        b = new CAAT.Point;
        for (c = this.k; c <= 1 + this.k; c += this.k)this.solve(b,
            c), d.lineTo(b.x, b.y);
        d.stroke();
        d.restore();
        CAAT.Math.CatmullRom.superclass.paint.call(this, a)
    }, solve:function (a, b) {
        var c = this.coordlist, d = ((-b + 2) * b - 1) * b * 0.5, e = ((3 * b - 5) * b * b + 2) * 0.5, f = ((-3 * b + 4) * b + 1) * b * 0.5, g = (b - 1) * b * b * 0.5;
        a.x = c[0].x * d + c[1].x * e + c[2].x * f + c[3].x * g;
        a.y = c[0].y * d + c[1].y * e + c[2].y * f + c[3].y * g;
        return a
    }, applyAsPath:function (a) {
        for (var a = a.ctx, b = new CAAT.Point, c = this.k; c <= 1 + this.k; c += this.k)this.solve(b, c), a.lineTo(b.x, b.y);
        return this
    }, endCurvePosition:function () {
        return this.coordlist[this.coordlist.length -
            2]
    }, startCurvePosition:function () {
        return this.coordlist[1]
    }}
}});
CAAT.Module({defines:"CAAT.Math.Curve", depends:["CAAT.Math.Point"], extendsWith:function () {
    return{coordlist:null, k:0.05, length:-1, interpolator:false, HANDLE_SIZE:20, drawHandles:true, paint:function (a) {
        if (false !== this.drawHandles) {
            var b = this.coordlist, a = a.ctx;
            a.save();
            a.beginPath();
            a.strokeStyle = "#a0a0a0";
            a.moveTo(b[0].x, b[0].y);
            a.lineTo(b[1].x, b[1].y);
            a.stroke();
            this.cubic && (a.moveTo(b[2].x, b[2].y), a.lineTo(b[3].x, b[3].y), a.stroke());
            a.globalAlpha = 0.5;
            for (var c = 0; c < this.coordlist.length; c++) {
                a.fillStyle =
                    "#7f7f00";
                var d = this.HANDLE_SIZE / 2;
                a.beginPath();
                a.arc(b[c].x, b[c].y, d, 0, 2 * Math.PI, false);
                a.fill()
            }
            a.restore()
        }
    }, update:function () {
        this.calcLength()
    }, solve:function () {
    }, getContour:function (a) {
        var b = [], c;
        for (c = 0; c <= a; c++) {
            var d = new CAAT.Point;
            this.solve(d, c / a);
            b.push(d)
        }
        return b
    }, getBoundingBox:function (a) {
        a || (a = new CAAT.Rectangle);
        a.setEmpty();
        a.union(this.coordlist[0].x, this.coordlist[0].y);
        for (var b = new CAAT.Point, c = this.k; c <= 1 + this.k; c += this.k)this.solve(b, c), a.union(b.x, b.y);
        return a
    }, calcLength:function () {
        var a,
            b;
        a = this.coordlist[0].x;
        b = this.coordlist[0].y;
        for (var c = 0, d = new CAAT.Point, e = this.k; e <= 1 + this.k; e += this.k)this.solve(d, e), c += Math.sqrt((d.x - a) * (d.x - a) + (d.y - b) * (d.y - b)), a = d.x, b = d.y;
        return this.length = c
    }, getLength:function () {
        return this.length
    }, endCurvePosition:function () {
        return this.coordlist[this.coordlist.length - 1]
    }, startCurvePosition:function () {
        return this.coordlist[0]
    }, setPoints:function () {
    }, setPoint:function (a, b) {
        b >= 0 && b < this.coordlist.length && (this.coordlist[b] = a)
    }, applyAsPath:function () {
    }}
}});
CAAT.Module({defines:"CAAT.Math.Dimension", aliases:["CAAT.Dimension"], extendsWith:function () {
    return{width:0, height:0, __init:function (a, b) {
        this.width = a;
        this.height = b;
        return this
    }}
}});
CAAT.Module({defines:"CAAT.Math.Matrix", depends:["CAAT.Math.Point"], aliases:["CAAT.Matrix"], onCreate:function () {
    CAAT.Math.Matrix.prototype.transformRenderingContext = CAAT.Math.Matrix.prototype.transformRenderingContext_NoClamp;
    CAAT.Math.Matrix.prototype.transformRenderingContextSet = CAAT.Math.Matrix.prototype.transformRenderingContextSet_NoClamp
}, extendsWith:function () {
    return{matrix:null, __init:function () {
        this.matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        if (typeof Float32Array !== "undefined")this.matrix = new Float32Array(this.matrix);
        return this
    }, transformCoord:function (a) {
        var b = a.x, c = a.y, d = this.matrix;
        a.x = b * d[0] + c * d[1] + d[2];
        a.y = b * d[3] + c * d[4] + d[5];
        return a
    }, rotate:function (a) {
        var b = new CAAT.Matrix;
        b.setRotation(a);
        return b
    }, setRotation:function (a) {
        this.identity();
        var b = this.matrix, c = Math.cos(a), a = Math.sin(a);
        b[0] = c;
        b[1] = -a;
        b[3] = a;
        b[4] = c;
        return this
    }, scale:function (a, b) {
        var c = new CAAT.Matrix;
        c.matrix[0] = a;
        c.matrix[4] = b;
        return c
    }, setScale:function (a, b) {
        this.identity();
        this.matrix[0] = a;
        this.matrix[4] = b;
        return this
    }, translate:function (a, b) {
        var c = new CAAT.Matrix;
        c.matrix[2] = a;
        c.matrix[5] = b;
        return c
    }, setTranslate:function (a, b) {
        this.identity();
        this.matrix[2] = a;
        this.matrix[5] = b;
        return this
    }, copy:function (a) {
        var a = a.matrix, b = this.matrix;
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        return this
    }, identity:function () {
        var a = this.matrix;
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 1;
        a[5] = 0;
        a[6] = 0;
        a[7] = 0;
        a[8] = 1;
        return this
    }, multiply:function (a) {
        var b = this.matrix, c = a.matrix, a = b[0], d = b[1], e = b[2], f = b[3], g = b[4],
            h = b[5], i = b[6], j = b[7], m = b[8], k = c[0], n = c[1], l = c[2], p = c[3], o = c[4], q = c[5], s = c[6], r = c[7], c = c[8];
        b[0] = a * k + d * p + e * s;
        b[1] = a * n + d * o + e * r;
        b[2] = a * l + d * q + e * c;
        b[3] = f * k + g * p + h * s;
        b[4] = f * n + g * o + h * r;
        b[5] = f * l + g * q + h * c;
        b[6] = i * k + j * p + m * s;
        b[7] = i * n + j * o + m * r;
        b[8] = i * l + j * q + m * c;
        return this
    }, premultiply:function (a) {
        var b = a.matrix[0] * this.matrix[1] + a.matrix[1] * this.matrix[4] + a.matrix[2] * this.matrix[7], c = a.matrix[0] * this.matrix[2] + a.matrix[1] * this.matrix[5] + a.matrix[2] * this.matrix[8], d = a.matrix[3] * this.matrix[0] + a.matrix[4] * this.matrix[3] +
            a.matrix[5] * this.matrix[6], e = a.matrix[3] * this.matrix[1] + a.matrix[4] * this.matrix[4] + a.matrix[5] * this.matrix[7], f = a.matrix[3] * this.matrix[2] + a.matrix[4] * this.matrix[5] + a.matrix[5] * this.matrix[8], g = a.matrix[6] * this.matrix[0] + a.matrix[7] * this.matrix[3] + a.matrix[8] * this.matrix[6], h = a.matrix[6] * this.matrix[1] + a.matrix[7] * this.matrix[4] + a.matrix[8] * this.matrix[7], i = a.matrix[6] * this.matrix[2] + a.matrix[7] * this.matrix[5] + a.matrix[8] * this.matrix[8];
        this.matrix[0] = a.matrix[0] * this.matrix[0] + a.matrix[1] * this.matrix[3] +
            a.matrix[2] * this.matrix[6];
        this.matrix[1] = b;
        this.matrix[2] = c;
        this.matrix[3] = d;
        this.matrix[4] = e;
        this.matrix[5] = f;
        this.matrix[6] = g;
        this.matrix[7] = h;
        this.matrix[8] = i;
        return this
    }, getInverse:function () {
        var a = this.matrix, b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = a[6], i = a[7], a = a[8], j = new CAAT.Matrix, m = b * (f * a - i * g) - e * (c * a - i * d) + h * (c * g - f * d);
        if (m === 0)return null;
        var k = j.matrix;
        k[0] = f * a - g * i;
        k[1] = d * i - c * a;
        k[2] = c * g - d * f;
        k[3] = g * h - e * a;
        k[4] = b * a - d * h;
        k[5] = d * e - b * g;
        k[6] = e * i - f * h;
        k[7] = c * h - b * i;
        k[8] = b * f - c * e;
        j.multiplyScalar(1 /
            m);
        return j
    }, multiplyScalar:function (a) {
        var b;
        for (b = 0; b < 9; b++)this.matrix[b] *= a;
        return this
    }, transformRenderingContextSet_NoClamp:function (a) {
        var b = this.matrix;
        a.setTransform(b[0], b[3], b[1], b[4], b[2], b[5]);
        return this
    }, transformRenderingContext_NoClamp:function (a) {
        var b = this.matrix;
        a.transform(b[0], b[3], b[1], b[4], b[2], b[5]);
        return this
    }, transformRenderingContextSet_Clamp:function (a) {
        var b = this.matrix;
        a.setTransform(b[0], b[3], b[1], b[4], b[2] >> 0, b[5] >> 0);
        return this
    }, transformRenderingContext_Clamp:function (a) {
        var b =
            this.matrix;
        a.transform(b[0], b[3], b[1], b[4], b[2] >> 0, b[5] >> 0);
        return this
    }}
}});
CAAT.Module({defines:"CAAT.Math.Matrix3", aliases:["CAAT.Matrix3"], extendsWith:function () {
    return{matrix:null, fmatrix:null, __init:function () {
        this.matrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        this.fmatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        return this
    }, transformCoord:function (a) {
        var b = a.x, c = a.y, d = a.z;
        a.x = b * this.matrix[0][0] + c * this.matrix[0][1] + d * this.matrix[0][2] + this.matrix[0][3];
        a.y = b * this.matrix[1][0] + c * this.matrix[1][1] + d * this.matrix[1][2] + this.matrix[1][3];
        a.z = b * this.matrix[2][0] + c * this.matrix[2][1] +
            d * this.matrix[2][2] + this.matrix[2][3];
        return a
    }, initialize:function (a, b, c, d, e, f, g, h, i) {
        this.identity();
        this.matrix[0][0] = a;
        this.matrix[0][1] = b;
        this.matrix[0][2] = c;
        this.matrix[1][0] = d;
        this.matrix[1][1] = e;
        this.matrix[1][2] = f;
        this.matrix[2][0] = g;
        this.matrix[2][1] = h;
        this.matrix[2][2] = i;
        return this
    }, initWithMatrix:function (a) {
        this.matrix = a;
        return this
    }, flatten:function () {
        var a = this.fmatrix, b = this.matrix;
        a[0] = b[0][0];
        a[1] = b[1][0];
        a[2] = b[2][0];
        a[3] = b[3][0];
        a[4] = b[0][1];
        a[5] = b[1][1];
        a[6] = b[2][1];
        a[7] = b[2][1];
        a[8] = b[0][2];
        a[9] = b[1][2];
        a[10] = b[2][2];
        a[11] = b[3][2];
        a[12] = b[0][3];
        a[13] = b[1][3];
        a[14] = b[2][3];
        a[15] = b[3][3];
        return this.fmatrix
    }, identity:function () {
        for (var a = 0; a < 4; a++)for (var b = 0; b < 4; b++)this.matrix[a][b] = a === b ? 1 : 0;
        return this
    }, getMatrix:function () {
        return this.matrix
    }, rotateXY:function (a) {
        return this.rotate(a, 0, 0)
    }, rotateXZ:function (a) {
        return this.rotate(0, a, 0)
    }, rotateYZ:function (a) {
        return this.rotate(0, 0, a)
    }, setRotate:function (a, b, c) {
        this.copy(this.rotate(a, b, c));
        return this
    }, rotate:function (a, b, c) {
        var d = new CAAT.Matrix3, e, f;
        a !== 0 && (f = new CAAT.Matrix3, e = Math.sin(a), a = Math.cos(a), f.matrix[1][1] = a, f.matrix[1][2] = -e, f.matrix[2][1] = e, f.matrix[2][2] = a, d.multiply(f));
        b !== 0 && (f = new CAAT.Matrix3, e = Math.sin(b), a = Math.cos(b), f.matrix[0][0] = a, f.matrix[0][2] = -e, f.matrix[2][0] = e, f.matrix[2][2] = a, d.multiply(f));
        c !== 0 && (f = new CAAT.Matrix3, e = Math.sin(c), a = Math.cos(c), f.matrix[0][0] = a, f.matrix[0][1] = -e, f.matrix[1][0] = e, f.matrix[1][1] = a, d.multiply(f));
        return d
    }, getClone:function () {
        var a = new CAAT.Matrix3;
        a.copy(this);
        return a
    }, multiply:function (a) {
        var b = this.getClone().matrix, c = b[0][0], d = b[0][1], e = b[0][2], f = b[0][3], g = b[1][0], h = b[1][1], i = b[1][2], j = b[1][3], m = b[2][0], k = b[2][1], n = b[2][2], b = b[2][3], l = a.matrix, a = l[0][0], p = l[0][1], o = l[0][2], q = l[0][3], s = l[1][0], r = l[1][1], t = l[1][2], u = l[1][3], v = l[2][0], w = l[2][1], x = l[2][2], y = l[2][3], z = l[3][0], A = l[3][1], B = l[3][2], l = l[3][3];
        this.matrix[0][0] = c * a + d * s + e * v + f * z;
        this.matrix[0][1] = c * p + d * r + e * w + f * A;
        this.matrix[0][2] = c * o + d * t + e * x + f * B;
        this.matrix[0][3] = c * q + d * u + e * y + f * l;
        this.matrix[1][0] =
            g * a + h * s + i * v + j * z;
        this.matrix[1][1] = g * p + h * r + i * w + j * A;
        this.matrix[1][2] = g * o + h * t + i * x + j * B;
        this.matrix[1][3] = g * q + h * u + i * y + j * l;
        this.matrix[2][0] = m * a + k * s + n * v + b * z;
        this.matrix[2][1] = m * p + k * r + n * w + b * A;
        this.matrix[2][2] = m * o + k * t + n * x + b * B;
        this.matrix[2][3] = m * q + k * u + n * y + b * l;
        return this
    }, premultiply:function (a) {
        var b = this.getClone().matrix, c = b[0][0], d = b[0][1], e = b[0][2], f = b[0][3], g = b[1][0], h = b[1][1], i = b[1][2], j = b[1][3], m = b[2][0], k = b[2][1], n = b[2][2], b = b[2][3], l = a.matrix, a = l[0][0], p = l[0][1], o = l[0][2], q = l[0][3], s = l[1][0],
            r = l[1][1], t = l[1][2], u = l[1][3], v = l[2][0], w = l[2][1], x = l[2][2], l = l[2][3];
        this.matrix[0][0] = c * a + d * s + e * v;
        this.matrix[0][1] = c * p + d * r + e * w;
        this.matrix[0][2] = c * o + d * t + e * x;
        this.matrix[0][3] = c * q + d * u + e * l + f;
        this.matrix[1][0] = g * a + h * s + i * v;
        this.matrix[1][1] = g * p + h * r + i * w;
        this.matrix[1][2] = g * o + h * t + i * x;
        this.matrix[1][3] = g * q + h * u + i * l + j;
        this.matrix[2][0] = m * a + k * s + n * v;
        this.matrix[2][1] = m * p + k * r + n * w;
        this.matrix[2][2] = m * o + k * t + n * x;
        this.matrix[2][3] = m * q + k * u + n * l + b;
        return this
    }, setTranslate:function (a, b, c) {
        this.identity();
        this.matrix[0][3] =
            a;
        this.matrix[1][3] = b;
        this.matrix[2][3] = c;
        return this
    }, translate:function (a, b, c) {
        var d = new CAAT.Matrix3;
        d.setTranslate(a, b, c);
        return d
    }, setScale:function (a, b, c) {
        this.identity();
        this.matrix[0][0] = a;
        this.matrix[1][1] = b;
        this.matrix[2][2] = c;
        return this
    }, scale:function (a, b, c) {
        var d = new CAAT.Matrix3;
        d.setScale(a, b, c);
        return d
    }, rotateModelView:function (a, b, c) {
        var d = Math.sin(a), e = Math.sin(b), f = Math.sin(c), a = Math.cos(a), b = Math.cos(b), c = Math.cos(c);
        this.matrix[0][0] = b * a;
        this.matrix[0][1] = -b * d;
        this.matrix[0][2] =
            e;
        this.matrix[0][3] = 0;
        this.matrix[1][0] = f * e * a + d * c;
        this.matrix[1][1] = c * a - f * e * d;
        this.matrix[1][2] = -f * b;
        this.matrix[1][3] = 0;
        this.matrix[2][0] = f * d - c * e * a;
        this.matrix[2][1] = c * e * d + f * a;
        this.matrix[2][2] = c * b;
        this.matrix[2][3] = 0;
        this.matrix[3][0] = 0;
        this.matrix[3][1] = 0;
        this.matrix[3][2] = 0;
        this.matrix[3][3] = 1;
        return this
    }, copy:function (a) {
        for (var b = 0; b < 4; b++)for (var c = 0; c < 4; c++)this.matrix[b][c] = a.matrix[b][c];
        return this
    }, calculateDeterminant:function () {
        var a = this.matrix, b = a[0][0], c = a[0][1], d = a[0][2], e = a[0][3],
            f = a[1][0], g = a[1][1], h = a[1][2], i = a[1][3], j = a[2][0], m = a[2][1], k = a[2][2], n = a[2][3], l = a[3][0], p = a[3][1], o = a[3][2], a = a[3][3];
        return e * g * k * l + c * i * k * l + e * h * j * p + d * i * j * p + d * f * n * p + b * h * n * p + e * f * m * o + b * i * m * o + d * g * j * a + c * h * j * a + c * f * k * a + b * g * k * a + e * h * m * l - d * i * m * l - d * g * n * l - c * h * n * l - e * f * k * p - b * i * k * p - e * g * j * o - c * i * j * o - c * f * n * o - b * g * n * o - d * f * m * a - b * h * m * a
    }, getInverse:function () {
        var a = this.matrix, b = a[0][0], c = a[0][1], d = a[0][2], e = a[0][3], f = a[1][0], g = a[1][1], h = a[1][2], i = a[1][3], j = a[2][0], m = a[2][1], k = a[2][2], n = a[2][3], l = a[3][0], p = a[3][1], o =
            a[3][2], a = a[3][3], q = new CAAT.Matrix3;
        q.matrix[0][0] = h * n * p + i * m * o + g * k * a - i * k * p - g * n * o - h * m * a;
        q.matrix[0][1] = e * k * p + c * n * o + d * m * a - c * k * a - d * n * p - e * m * o;
        q.matrix[0][2] = d * i * p + c * h * a + e * g * o - c * i * o - d * g * a - e * h * p;
        q.matrix[0][3] = e * h * m + c * i * k + d * g * n - d * i * m - e * g * k - c * h * n;
        q.matrix[1][0] = i * k * l + f * n * o + h * j * a - h * n * l - i * j * o - f * k * a;
        q.matrix[1][1] = d * n * l + e * j * o + b * k * a - e * k * l - b * n * o - d * j * a;
        q.matrix[1][2] = e * h * l + b * i * o + d * f * a - d * i * l - e * f * o - b * h * a;
        q.matrix[1][3] = d * i * j + e * f * k + b * h * n - e * h * j - b * i * k - d * f * n;
        q.matrix[2][0] = g * n * l + i * j * p + f * m * a - i * m * l - f * n * p - g * j * a;
        q.matrix[2][1] =
            e * m * l + b * n * p + c * j * a - b * m * a - c * n * l - e * j * p;
        q.matrix[2][2] = d * i * l + e * f * p + b * g * a - e * g * l - b * i * p - c * f * a;
        q.matrix[2][3] = e * g * j + b * i * m + c * f * n - b * g * n - c * i * j - e * f * m;
        q.matrix[3][0] = h * m * l + f * k * p + g * j * o - g * k * l - h * j * p - f * m * o;
        q.matrix[3][1] = c * k * l + d * j * p + b * m * o - d * m * l - b * k * p - c * j * o;
        q.matrix[3][2] = d * g * l + b * h * p + c * f * o - b * g * o - c * h * l - d * f * p;
        q.matrix[3][3] = c * h * j + d * f * m + b * g * k - d * g * j - b * h * m - c * f * k;
        return q.multiplyScalar(1 / this.calculateDeterminant())
    }, multiplyScalar:function (a) {
        var b, c;
        for (b = 0; b < 4; b++)for (c = 0; c < 4; c++)this.matrix[b][c] *= a;
        return this
    }}
}});
CAAT.Module({defines:"CAAT.Math.Point", aliases:["CAAT.Point"], extendsWith:function () {
    return{x:0, y:0, z:0, __init:function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c || 0;
        return this
    }, set:function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c || 0;
        return this
    }, clone:function () {
        return new CAAT.Point(this.x, this.y, this.z)
    }, translate:function (a, b, c) {
        this.x += a;
        this.y += b;
        this.z += c;
        return this
    }, translatePoint:function (a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    }, subtract:function (a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },
        multiply:function (a) {
            this.x *= a;
            this.y *= a;
            this.z *= a;
            return this
        }, rotate:function (a) {
            var b = this.x, c = this.y;
            this.x = b * Math.cos(a) - Math.sin(a) * c;
            this.y = b * Math.sin(a) + Math.cos(a) * c;
            this.z = 0;
            return this
        }, setAngle:function (a) {
            var b = this.getLength();
            this.x = Math.cos(a) * b;
            this.y = Math.sin(a) * b;
            this.z = 0;
            return this
        }, setLength:function (a) {
            var b = this.getLength();
            b ? this.multiply(a / b) : this.x = this.y = this.z = a;
            return this
        }, normalize:function () {
            var a = this.getLength();
            this.x /= a;
            this.y /= a;
            this.z /= a;
            return this
        }, getAngle:function () {
            return Math.atan2(this.y,
                this.x)
        }, limit:function (a) {
            var b = this.getLengthSquared();
            if (b + 0.01 > a * a)b = Math.sqrt(b), this.x = this.x / b * a, this.y = this.y / b * a, this.z = this.z / b * a;
            return this
        }, getLength:function () {
            var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return a < 0.0050 && a > -0.0050 ? 1.0E-6 : a
        }, getLengthSquared:function () {
            var a = this.x * this.x + this.y * this.y + this.z * this.z;
            return a < 0.0050 && a > -0.0050 ? 0 : a
        }, getDistance:function (a) {
            var b = this.x - a.x, c = this.y - a.y, a = this.z - a.z;
            return Math.sqrt(b * b + c * c + a * a)
        }, getDistanceSquared:function (a) {
            var b =
                this.x - a.x, c = this.y - a.y, a = this.z - a.z;
            return b * b + c * c + a * a
        }, toString:function () {
            return"(CAAT.Point) x:" + String(Math.round(Math.floor(this.x * 10)) / 10) + " y:" + String(Math.round(Math.floor(this.y * 10)) / 10) + " z:" + String(Math.round(Math.floor(this.z * 10)) / 10)
        }}
}});
CAAT.Module({defines:"CAAT.Math.Rectangle", aliases:["CAAT.Rectangle"], extendsWith:function () {
    return{__init:function (a, b, c, d) {
        this.setLocation(a, b);
        this.setDimension(c, d)
    }, x:0, y:0, x1:0, y1:0, width:-1, height:-1, setEmpty:function () {
        this.height = this.width = -1;
        this.y1 = this.x1 = this.y = this.x = 0;
        return this
    }, setLocation:function (a, b) {
        this.x = a;
        this.y = b;
        this.x1 = this.x + this.width;
        this.y1 = this.y + this.height;
        return this
    }, setDimension:function (a, b) {
        this.width = a;
        this.height = b;
        this.x1 = this.x + this.width;
        this.y1 = this.y +
            this.height;
        return this
    }, setBounds:function (a, b, c, d) {
        this.setLocation(a, b);
        this.setDimension(c, d);
        return this
    }, contains:function (a, b) {
        return a >= this.x && a < this.x1 && b >= this.y && b < this.y1
    }, isEmpty:function () {
        return this.width === -1 && this.height === -1
    }, union:function (a, b) {
        if (this.isEmpty())this.x1 = this.x = a, this.y1 = this.y = b, this.height = this.width = 0; else {
            this.x1 = this.x + this.width;
            this.y1 = this.y + this.height;
            if (b < this.y)this.y = b;
            if (a < this.x)this.x = a;
            if (b > this.y1)this.y1 = b;
            if (a > this.x1)this.x1 = a;
            this.width = this.x1 -
                this.x;
            this.height = this.y1 - this.y
        }
    }, unionRectangle:function (a) {
        this.union(a.x, a.y);
        this.union(a.x1, a.y);
        this.union(a.x, a.y1);
        this.union(a.x1, a.y1);
        return this
    }, intersects:function (a) {
        return a.isEmpty() || this.isEmpty() ? false : a.x1 <= this.x ? false : a.x >= this.x1 ? false : a.y1 <= this.y ? false : a.y < this.y1
    }, intersectsRect:function (a, b, c, d) {
        return-1 === c || -1 === d ? false : a + c - 1 < this.x ? false : a > this.x1 ? false : b + d - 1 < this.y ? false : b <= this.y1
    }, intersect:function (a, b) {
        typeof b === "undefined" && (b = new CAAT.Rectangle);
        b.x = Math.max(this.x,
            a.x);
        b.y = Math.max(this.y, a.y);
        b.x1 = Math.min(this.x1, a.x1);
        b.y1 = Math.min(this.y1, a.y1);
        b.width = b.x1 - b.x;
        b.height = b.y1 - b.y;
        return b
    }}
}});
CAAT.Module({defines:"CAAT.Behavior.Interpolator", depends:["CAAT.Math.Point"], aliases:["CAAT.Interpolator"], constants:{enumerateInterpolators:function () {
    return[(new CAAT.Behavior.Interpolator).createLinearInterpolator(false, false), "Linear pingpong=false, inverse=false", (new CAAT.Behavior.Interpolator).createLinearInterpolator(true, false), "Linear pingpong=true, inverse=false", (new CAAT.Behavior.Interpolator).createLinearInterpolator(false, true), "Linear pingpong=false, inverse=true", (new CAAT.Behavior.Interpolator).createLinearInterpolator(true,
        true), "Linear pingpong=true, inverse=true", (new CAAT.Behavior.Interpolator).createExponentialInInterpolator(2, false), "ExponentialIn pingpong=false, exponent=2", (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(2, false), "ExponentialOut pingpong=false, exponent=2", (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(2, false), "ExponentialInOut pingpong=false, exponent=2", (new CAAT.Behavior.Interpolator).createExponentialInInterpolator(2, true), "ExponentialIn pingpong=true, exponent=2",
        (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(2, true), "ExponentialOut pingpong=true, exponent=2", (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(2, true), "ExponentialInOut pingpong=true, exponent=2", (new CAAT.Behavior.Interpolator).createExponentialInInterpolator(4, false), "ExponentialIn pingpong=false, exponent=4", (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(4, false), "ExponentialOut pingpong=false, exponent=4", (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(4,
            false), "ExponentialInOut pingpong=false, exponent=4", (new CAAT.Behavior.Interpolator).createExponentialInInterpolator(4, true), "ExponentialIn pingpong=true, exponent=4", (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(4, true), "ExponentialOut pingpong=true, exponent=4", (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(4, true), "ExponentialInOut pingpong=true, exponent=4", (new CAAT.Behavior.Interpolator).createExponentialInInterpolator(6, false), "ExponentialIn pingpong=false, exponent=6",
        (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(6, false), "ExponentialOut pingpong=false, exponent=6", (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(6, false), "ExponentialInOut pingpong=false, exponent=6", (new CAAT.Behavior.Interpolator).createExponentialInInterpolator(6, true), "ExponentialIn pingpong=true, exponent=6", (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(6, true), "ExponentialOut pingpong=true, exponent=6", (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(6,
            true), "ExponentialInOut pingpong=true, exponent=6", (new CAAT.Behavior.Interpolator).createBounceInInterpolator(false), "BounceIn pingpong=false", (new CAAT.Behavior.Interpolator).createBounceOutInterpolator(false), "BounceOut pingpong=false", (new CAAT.Behavior.Interpolator).createBounceInOutInterpolator(false), "BounceInOut pingpong=false", (new CAAT.Behavior.Interpolator).createBounceInInterpolator(true), "BounceIn pingpong=true", (new CAAT.Behavior.Interpolator).createBounceOutInterpolator(true), "BounceOut pingpong=true",
        (new CAAT.Behavior.Interpolator).createBounceInOutInterpolator(true), "BounceInOut pingpong=true", (new CAAT.Behavior.Interpolator).createElasticInInterpolator(1.1, 0.4, false), "ElasticIn pingpong=false, amp=1.1, d=.4", (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(1.1, 0.4, false), "ElasticOut pingpong=false, amp=1.1, d=.4", (new CAAT.Behavior.Interpolator).createElasticInOutInterpolator(1.1, 0.4, false), "ElasticInOut pingpong=false, amp=1.1, d=.4", (new CAAT.Behavior.Interpolator).createElasticInInterpolator(1.1,
            0.4, true), "ElasticIn pingpong=true, amp=1.1, d=.4", (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(1.1, 0.4, true), "ElasticOut pingpong=true, amp=1.1, d=.4", (new CAAT.Behavior.Interpolator).createElasticInOutInterpolator(1.1, 0.4, true), "ElasticInOut pingpong=true, amp=1.1, d=.4", (new CAAT.Behavior.Interpolator).createElasticInInterpolator(1, 0.2, false), "ElasticIn pingpong=false, amp=1.0, d=.2", (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(1, 0.2, false), "ElasticOut pingpong=false, amp=1.0, d=.2",
        (new CAAT.Behavior.Interpolator).createElasticInOutInterpolator(1, 0.2, false), "ElasticInOut pingpong=false, amp=1.0, d=.2", (new CAAT.Behavior.Interpolator).createElasticInInterpolator(1, 0.2, true), "ElasticIn pingpong=true, amp=1.0, d=.2", (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(1, 0.2, true), "ElasticOut pingpong=true, amp=1.0, d=.2", (new CAAT.Behavior.Interpolator).createElasticInOutInterpolator(1, 0.2, true), "ElasticInOut pingpong=true, amp=1.0, d=.2"]
}}, extendsWith:function () {
    return{interpolated:null,
        paintScale:90, __init:function () {
            this.interpolated = new CAAT.Math.Point(0, 0, 0);
            return this
        }, createLinearInterpolator:function (a, b) {
            this.getPosition = function (c) {
                var d = c;
                a && (c < 0.5 ? c *= 2 : c = 1 - (c - 0.5) * 2);
                b !== null && b && (c = 1 - c);
                return this.interpolated.set(d, c)
            };
            return this
        }, createBackOutInterpolator:function (a) {
            this.getPosition = function (b) {
                var c = b;
                a && (b < 0.5 ? b *= 2 : b = 1 - (b - 0.5) * 2);
                b -= 1;
                return this.interpolated.set(c, b * b * (2.70158 * b + 1.70158) + 1)
            };
            return this
        }, createExponentialInInterpolator:function (a, b) {
            this.getPosition =
                function (c) {
                    var d = c;
                    b && (c < 0.5 ? c *= 2 : c = 1 - (c - 0.5) * 2);
                    return this.interpolated.set(d, Math.pow(c, a))
                };
            return this
        }, createExponentialOutInterpolator:function (a, b) {
            this.getPosition = function (c) {
                var d = c;
                b && (c < 0.5 ? c *= 2 : c = 1 - (c - 0.5) * 2);
                return this.interpolated.set(d, 1 - Math.pow(1 - c, a))
            };
            return this
        }, createExponentialInOutInterpolator:function (a, b) {
            this.getPosition = function (c) {
                var d = c;
                b && (c < 0.5 ? c *= 2 : c = 1 - (c - 0.5) * 2);
                return c * 2 < 1 ? this.interpolated.set(d, Math.pow(c * 2, a) / 2) : this.interpolated.set(d, 1 - Math.abs(Math.pow(c *
                    2 - 2, a)) / 2)
            };
            return this
        }, createQuadricBezierInterpolator:function (a, b, c, d) {
            this.getPosition = function (e) {
                var f = e;
                d && (e < 0.5 ? e *= 2 : e = 1 - (e - 0.5) * 2);
                e = (1 - e) * (1 - e) * a.y + 2 * (1 - e) * e * b.y + e * e * c.y;
                return this.interpolated.set(f, e)
            };
            return this
        }, createCubicBezierInterpolator:function (a, b, c, d, e) {
            this.getPosition = function (f) {
                var g = f;
                e && (f < 0.5 ? f *= 2 : f = 1 - (f - 0.5) * 2);
                var h = f * f, f = a.y + f * (-a.y * 3 + f * (3 * a.y - a.y * f)) + f * (3 * b.y + f * (-6 * b.y + b.y * 3 * f)) + h * (c.y * 3 - c.y * 3 * f) + d.y * f * h;
                return this.interpolated.set(g, f)
            };
            return this
        }, createElasticOutInterpolator:function (a, b, c) {
            this.getPosition = function (d) {
                c && (d < 0.5 ? d *= 2 : d = 1 - (d - 0.5) * 2);
                if (d === 0)return{x:0, y:0};
                if (d === 1)return{x:1, y:1};
                var e = b / (2 * Math.PI) * Math.asin(1 / a);
                return this.interpolated.set(d, a * Math.pow(2, -10 * d) * Math.sin((d - e) * 2 * Math.PI / b) + 1)
            };
            return this
        }, createElasticInInterpolator:function (a, b, c) {
            this.getPosition = function (d) {
                c && (d < 0.5 ? d *= 2 : d = 1 - (d - 0.5) * 2);
                if (d === 0)return{x:0, y:0};
                if (d === 1)return{x:1, y:1};
                var e = b / (2 * Math.PI) * Math.asin(1 / a);
                return this.interpolated.set(d, -(a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d -
                    e) * 2 * Math.PI / b)))
            };
            return this
        }, createElasticInOutInterpolator:function (a, b, c) {
            this.getPosition = function (d) {
                c && (d < 0.5 ? d *= 2 : d = 1 - (d - 0.5) * 2);
                var e = b / (2 * Math.PI) * Math.asin(1 / a);
                d *= 2;
                return d <= 1 ? this.interpolated.set(d, -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * 2 * Math.PI / b)) : this.interpolated.set(d, 1 + 0.5 * a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * 2 * Math.PI / b))
            };
            return this
        }, bounce:function (a) {
            return(a /= 1) < 1 / 2.75 ? {x:a, y:7.5625 * a * a} : a < 2 / 2.75 ? {x:a, y:7.5625 * (a -= 1.5 / 2.75) * a + 0.75} : a < 2.5 / 2.75 ? {x:a, y:7.5625 * (a -=
                2.25 / 2.75) * a + 0.9375} : {x:a, y:7.5625 * (a -= 2.625 / 2.75) * a + 0.984375}
        }, createBounceOutInterpolator:function (a) {
            this.getPosition = function (b) {
                a && (b < 0.5 ? b *= 2 : b = 1 - (b - 0.5) * 2);
                return this.bounce(b)
            };
            return this
        }, createBounceInInterpolator:function (a) {
            this.getPosition = function (b) {
                a && (b < 0.5 ? b *= 2 : b = 1 - (b - 0.5) * 2);
                b = this.bounce(1 - b);
                b.y = 1 - b.y;
                return b
            };
            return this
        }, createBounceInOutInterpolator:function (a) {
            this.getPosition = function (b) {
                a && (b < 0.5 ? b *= 2 : b = 1 - (b - 0.5) * 2);
                if (b < 0.5)return b = this.bounce(1 - b * 2), b.y = (1 - b.y) * 0.5,
                    b;
                b = this.bounce(b * 2 - 1, a);
                b.y = b.y * 0.5 + 0.5;
                return b
            };
            return this
        }, paint:function (a) {
            a.save();
            a.beginPath();
            a.moveTo(0, this.getPosition(0).y * this.paintScale);
            for (var b = 0; b <= this.paintScale; b++)a.lineTo(b, this.getPosition(b / this.paintScale).y * this.paintScale);
            a.strokeStyle = "black";
            a.stroke();
            a.restore()
        }, getContour:function (a) {
            for (var b = [], c = 0; c <= a; c++)b.push({x:c / a, y:this.getPosition(c / a).y});
            return b
        }}
}});
CAAT.Module({defines:"CAAT.Behavior.BaseBehavior", constants:{Status:{NOT_STARTED:0, STARTED:1, EXPIRED:2}}, depends:["CAAT.Behavior.Interpolator"], extendsWith:function () {
    var a = (new CAAT.Behavior.Interpolator).createLinearInterpolator(false), b = (new CAAT.Behavior.Interpolator).createLinearInterpolator(true);
    return{__init:function () {
        this.lifecycleListenerList = [];
        this.setDefaultInterpolator();
        return this
    }, lifecycleListenerList:null, behaviorStartTime:-1, behaviorDuration:-1, cycleBehavior:false, status:CAAT.Behavior.BaseBehavior.Status.NOT_STARTED,
        interpolator:null, actor:null, id:0, timeOffset:0, doValueApplication:true, solved:true, discardable:false, setValueApplication:function (a) {
            this.doValueApplication = a;
            return this
        }, setTimeOffset:function (a) {
            this.timeOffset = a;
            return this
        }, setStatus:function (a) {
            this.status = a;
            return this
        }, setId:function (a) {
            this.id = a;
            return this
        }, setDefaultInterpolator:function () {
            this.interpolator = a;
            return this
        }, setPingPong:function () {
            this.interpolator = b;
            return this
        }, setFrameTime:function (a, b) {
            this.behaviorStartTime = a;
            this.behaviorDuration =
                b;
            this.status = CAAT.Behavior.BaseBehavior.Status.NOT_STARTED;
            return this
        }, setDelayTime:function (a, b) {
            this.behaviorStartTime = a;
            this.behaviorDuration = b;
            this.status = CAAT.Behavior.BaseBehavior.Status.NOT_STARTED;
            this.solved = false;
            return this
        }, setOutOfFrameTime:function () {
            this.status = CAAT.Behavior.BaseBehavior.Status.EXPIRED;
            this.behaviorStartTime = Number.MAX_VALUE;
            this.behaviorDuration = 0;
            return this
        }, setInterpolator:function (a) {
            this.interpolator = a;
            return this
        }, apply:function (a, b) {
            if (!this.solved)this.behaviorStartTime +=
                a, this.solved = true;
            a += this.timeOffset * this.behaviorDuration;
            var e = a;
            this.isBehaviorInTime(a, b) && (a = this.normalizeTime(a), this.fireBehaviorAppliedEvent(b, e, a, this.setForTime(a, b)))
        }, setCycle:function (a) {
            this.cycleBehavior = a;
            return this
        }, addListener:function (a) {
            this.lifecycleListenerList.push(a);
            return this
        }, emptyListenerList:function () {
            this.lifecycleListenerList = [];
            return this
        }, getStartTime:function () {
            return this.behaviorStartTime
        }, getDuration:function () {
            return this.behaviorDuration
        }, isBehaviorInTime:function (a, b) {
            var e = CAAT.Behavior.BaseBehavior.Status;
            if (this.status === e.EXPIRED || this.behaviorStartTime < 0)return false;
            this.cycleBehavior && a >= this.behaviorStartTime && (a = (a - this.behaviorStartTime) % this.behaviorDuration + this.behaviorStartTime);
            if (a > this.behaviorStartTime + this.behaviorDuration)return this.status !== e.EXPIRED && this.setExpired(b, a), false;
            if (this.status === e.NOT_STARTED)this.status = e.STARTED, this.fireBehaviorStartedEvent(b, a);
            return this.behaviorStartTime <= a
        }, fireBehaviorStartedEvent:function (a, b) {
            for (var e =
                0, f = this.lifecycleListenerList.length; e < f; e++) {
                var g = this.lifecycleListenerList[e];
                g.behaviorStarted && g.behaviorStarted(this, b, a)
            }
        }, fireBehaviorExpiredEvent:function (a, b) {
            for (var e = 0, f = this.lifecycleListenerList.length; e < f; e++) {
                var g = this.lifecycleListenerList[e];
                g.behaviorExpired && g.behaviorExpired(this, b, a)
            }
        }, fireBehaviorAppliedEvent:function (a, b, e, f) {
            for (var g = 0, h = this.lifecycleListenerList.length; g < h; g++) {
                var i = this.lifecycleListenerList[g];
                i.behaviorApplied && i.behaviorApplied(this, b, e, a, f)
            }
        },
        normalizeTime:function (a) {
            a -= this.behaviorStartTime;
            this.cycleBehavior && (a %= this.behaviorDuration);
            return this.interpolator.getPosition(a / this.behaviorDuration).y
        }, setExpired:function (a, b) {
            this.status = CAAT.Behavior.BaseBehavior.Status.EXPIRED;
            this.setForTime(this.interpolator.getPosition(1).y, a);
            this.fireBehaviorExpiredEvent(a, b);
            this.discardable && this.actor.removeBehavior(this)
        }, setForTime:function () {
        }, initialize:function (a) {
            if (a)for (var b in a)this[b] = a[b];
            return this
        }, getPropertyName:function () {
            return""
        }}
}});
CAAT.Module({defines:"CAAT.Behavior.AlphaBehavior", aliases:["CAAT.AlphaBehavior"], depends:["CAAT.Behavior.BaseBehavior"], extendsClass:"CAAT.Behavior.BaseBehavior", extendsWith:function () {
    return{startAlpha:0, endAlpha:0, getPropertyName:function () {
        return"opacity"
    }, setForTime:function (a, b) {
        CAAT.Behavior.AlphaBehavior.superclass.setForTime.call(this, a, b);
        var c = this.startAlpha + a * (this.endAlpha - this.startAlpha);
        this.doValueApplication && b.setAlpha(c);
        return c
    }, setValues:function (a, b) {
        this.startAlpha = a;
        this.endAlpha =
            b;
        return this
    }, calculateKeyFrameData:function (a) {
        a = this.interpolator.getPosition(a).y;
        return this.startAlpha + a * (this.endAlpha - this.startAlpha)
    }, calculateKeyFramesData:function (a, b, c) {
        typeof c === "undefined" && (c = 100);
        c >>= 0;
        for (var d = "@-" + a + "-keyframes " + b + " {", a = 0; a <= c; a++)b = "" + a / c * 100 + "%{opacity: " + this.calculateKeyFrameData(a / c) + "}", d += b;
        d += "}";
        return d
    }}
}});
CAAT.Module({defines:"CAAT.Behavior.ContainerBehavior", depends:["CAAT.Behavior.BaseBehavior", "CAAT.Behavior.GenericBehavior"], aliases:["CAAT.ContainerBehavior"], extendsClass:"CAAT.Behavior.BaseBehavior", extendsWith:function () {
    return{behaviors:null, __init:function () {
        this.__super();
        this.behaviors = [];
        return this
    }, conformToDuration:function (a) {
        this.duration = a;
        a /= this.duration;
        for (var b, c = 0; c < this.behaviors.length; c++)b = this.behaviors[c], b.setFrameTime(b.getStartTime() * a, b.getDuration() * a);
        return this
    },
        addBehavior:function (a) {
            this.behaviors.push(a);
            a.addListener(this);
            return this
        }, apply:function (a, b) {
            if (!this.solved)this.behaviorStartTime += a, this.solved = true;
            a += this.timeOffset * this.behaviorDuration;
            if (this.isBehaviorInTime(a, b)) {
                a -= this.getStartTime();
                this.cycleBehavior && (a %= this.getDuration());
                for (var c = this.behaviors, d = 0; d < c.length; d++)c[d].apply(a, b)
            }
        }, behaviorExpired:function (a) {
            this.cycleBehavior && a.setStatus(CAAT.Behavior.BaseBehavior.Status.STARTED)
        }, setForTime:function (a, b) {
            for (var c = this.behaviors,
                     d = 0; d < c.length; d++)c[d].setForTime(a, b);
            return null
        }, setExpired:function (a, b) {
            CAAT.Behavior.ContainerBehavior.superclass.setExpired.call(this, a, b);
            for (var c = this.behaviors, d = 0; d < c.length; d++) {
                var e = c[d];
                e.status !== CAAT.Behavior.BaseBehavior.Status.EXPIRED && e.setExpired(a, b - this.behaviorStartTime)
            }
            return this
        }, setFrameTime:function (a, b) {
            CAAT.Behavior.ContainerBehavior.superclass.setFrameTime.call(this, a, b);
            for (var c = this.behaviors, d = 0; d < c.length; d++)c[d].setStatus(CAAT.Behavior.BaseBehavior.Status.NOT_STARTED);
            return this
        }, setDelayTime:function (a, b) {
            CAAT.Behavior.ContainerBehavior.superclass.setDelayTime.call(this, a, b);
            for (var c = this.behaviors, d = 0; d < c.length; d++)c[d].setStatus(CAAT.Behavior.BaseBehavior.Status.NOT_STARTED);
            return this
        }, calculateKeyFrameData:function (a, b, c) {
            function d(a) {
                if (g[a])i += g[a]; else if (c && (j = c[a]))i += j, g[a] = j
            }

            var e, f, g = {}, h;
            for (e = 0; e < this.behaviors.length; e++)f = this.behaviors[e], f.status !== CAAT.Behavior.BehaviorConstants.Status.EXPIRED && !(f instanceof CAAT.Behavior.GenericBehavior) &&
                (h = a * this.behaviorDuration, f.behaviorStartTime <= h && f.behaviorStartTime + f.behaviorDuration >= h && (h = (h - f.behaviorStartTime) / f.behaviorDuration, h = f.calculateKeyFrameData(h), f = f.getPropertyName(b), typeof g[f] === "undefined" && (g[f] = ""), g[f] += h + " "));
            var i = "", j;
            d("translate");
            d("rotate");
            d("scale");
            a = "";
            i && (a = "-" + b + "-transform: " + i + ";");
            i = "";
            d("opacity");
            i && (a += " opacity: " + i + ";");
            return{rules:a, ret:g}
        }, calculateKeyFramesData:function (a, b, c) {
            if (this.duration === Number.MAX_VALUE)return"";
            typeof c === "undefined" &&
            (c = 100);
            for (var d = null, e = "@-" + a + "-keyframes " + b + " {", f, b = 0; b <= c; b++)f = this.interpolator.getPosition(b / c).y, d = this.calculateKeyFrameData(f, a, d), f = "" + b / c * 100 + "%{" + d.rules + "}\n", d = d.ret, e += f;
            e += "}";
            return e
        }}
}});
CAAT.Module({defines:"CAAT.Behavior.GenericBehavior", depends:["CAAT.Behavior.BaseBehavior"], aliases:["CAAT.GenericBehavior"], extendsClass:"CAAT.Behavior.BaseBehavior", extendsWith:function () {
    return{start:0, end:0, target:null, property:null, callback:null, setForTime:function (a, b) {
        var c = this.start + a * (this.end - this.start);
        this.callback && this.callback(c, this.target, b);
        this.property && (this.target[this.property] = c)
    }, setValues:function (a, b, c, d, e) {
        this.start = a;
        this.end = b;
        this.target = c;
        this.property = d;
        this.callback =
            e;
        return this
    }}
}});
CAAT.Module({defines:"CAAT.Behavior.PathBehavior", aliases:["CAAT.PathBehavior"], depends:["CAAT.Behavior.BaseBehavior", "CAAT.Foundation.SpriteImage"], constants:{autorotate:{LEFT_TO_RIGHT:0, RIGHT_TO_LEFT:1, FREE:2}}, extendsClass:"CAAT.Behavior.BaseBehavior", extendsWith:function () {
    return{path:null, autoRotate:false, prevX:-1, prevY:-1, autoRotateOp:CAAT.Behavior.PathBehavior.autorotate.FREE, getPropertyName:function () {
        return"translate"
    }, setAutoRotate:function (a, b) {
        this.autoRotate = a;
        if (b !== void 0)this.autoRotateOp =
            b;
        return this
    }, setPath:function (a) {
        this.path = a;
        return this
    }, setValues:function (a) {
        return this.setPath(a)
    }, setTranslation:function () {
        return this
    }, calculateKeyFrameData:function (a) {
        a = this.interpolator.getPosition(a).y;
        a = this.path.getPosition(a);
        return"translateX(" + a.x + "px) translateY(" + a.y + "px)"
    }, calculateKeyFramesData:function (a, b, c) {
        typeof c === "undefined" && (c = 100);
        c >>= 0;
        for (var d, e = "@-" + a + "-keyframes " + b + " {", b = 0; b <= c; b++)d = "" + b / c * 100 + "%{-" + a + "-transform:" + this.calculateKeyFrameData(b / c) + "}", e += d;
        e += "}";
        return e
    }, setForTime:function (a, b) {
        if (!this.path)return{x:b.x, y:b.y};
        var c = this.path.getPosition(a);
        if (this.autoRotate) {
            if (-1 === this.prevX && -1 === this.prevY)this.prevX = c.x, this.prevY = c.y;
            var d = c.x - this.prevX, e = c.y - this.prevY;
            if (d === 0 && e === 0)return b.setLocation(c.x, c.y), {x:b.x, y:b.y};
            var f = Math.atan2(e, d), g = CAAT.Foundation.SpriteImage, h = CAAT.Behavior.PathBehavior.autorotate;
            this.autoRotateOp === h.LEFT_TO_RIGHT ? this.prevX <= c.x ? b.setImageTransformation(g.TR_NONE) : (b.setImageTransformation(g.TR_FLIP_HORIZONTAL),
                f += Math.PI) : this.autoRotateOp === h.RIGHT_TO_LEFT && (this.prevX <= c.x ? b.setImageTransformation(g.TR_FLIP_HORIZONTAL) : (b.setImageTransformation(g.TR_NONE), f -= Math.PI));
            b.setRotation(f);
            this.prevX = c.x;
            this.prevY = c.y;
            Math.sqrt(d * d + e * e)
        }
        return this.doValueApplication ? (b.setLocation(c.x, c.y), {x:b.x, y:b.y}) : {x:c.x, y:c.y}
    }, positionOnTime:function (a) {
        return this.isBehaviorInTime(a, null) ? (a = this.normalizeTime(a), this.path.getPosition(a)) : {x:-1, y:-1}
    }}
}});
CAAT.Module({defines:"CAAT.Behavior.RotateBehavior", extendsClass:"CAAT.Behavior.BaseBehavior", depends:["CAAT.Behavior.BaseBehavior", "CAAT.Foundation.Actor"], aliases:["CAAT.RotateBehavior"], extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.anchor = CAAT.Foundation.Actor.ANCHOR_CENTER;
        return this
    }, startAngle:0, endAngle:0, anchorX:0.5, anchorY:0.5, getPropertyName:function () {
        return"rotate"
    }, setForTime:function (a, b) {
        var c = this.startAngle + a * (this.endAngle - this.startAngle);
        this.doValueApplication &&
        b.setRotationAnchored(c, this.anchorX, this.anchorY);
        return c
    }, setValues:function (a, b, c, d) {
        this.startAngle = a;
        this.endAngle = b;
        if (typeof c !== "undefined" && typeof d !== "undefined")this.anchorX = c, this.anchorY = d;
        return this
    }, setAngles:function (a, b) {
        return this.setValues(a, b)
    }, setAnchor:function (a, b, c) {
        this.anchorX = b / a.width;
        this.anchorY = c / a.height;
        return this
    }, calculateKeyFrameData:function (a) {
        a = this.interpolator.getPosition(a).y;
        return"rotate(" + (this.startAngle + a * (this.endAngle - this.startAngle)) + "rad)"
    },
        calculateKeyFramesData:function (a, b, c) {
            typeof c === "undefined" && (c = 100);
            c >>= 0;
            for (var d, e = "@-" + a + "-keyframes " + b + " {", b = 0; b <= c; b++)d = "" + b / c * 100 + "%{-" + a + "-transform:" + this.calculateKeyFrameData(b / c) + "}\n", e += d;
            e += "}";
            return e
        }}
}});
CAAT.Module({defines:"CAAT.Behavior.Scale1Behavior", depends:["CAAT.Behavior.BaseBehavior", "CAAT.Foundation.Actor"], aliases:["CAAT.Scale1Behavior"], constants:{Axis:{X:0, Y:1}}, extendsClass:"CAAT.Behavior.BaseBehavior", extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.anchor = CAAT.Foundation.Actor.ANCHOR_CENTER;
        return this
    }, startScale:1, endScale:1, anchorX:0.5, anchorY:0.5, sx:1, sy:1, applyOnX:true, applyOnAxis:function (a) {
        this.applyOnX = a === CAAT.Behavior.Scale1Behavior.Axis.X ? false : true
    },
        getPropertyName:function () {
            return"scale"
        }, setForTime:function (a, b) {
            var c = this.startScale + a * (this.endScale - this.startScale);
            0 === c && (c = 0.01);
            this.doValueApplication && (this.applyOnX ? b.setScaleAnchored(c, b.scaleY, this.anchorX, this.anchorY) : b.setScaleAnchored(b.scaleX, c, this.anchorX, this.anchorY));
            return c
        }, setValues:function (a, b, c, d, e) {
            this.startScale = a;
            this.endScale = b;
            this.applyOnX = !!c;
            if (typeof d !== "undefined" && typeof e !== "undefined")this.anchorX = d, this.anchorY = e;
            return this
        }, setAnchor:function (a, b, c) {
            this.anchorX = b / a.width;
            this.anchorY = c / a.height;
            return this
        }, calculateKeyFrameData:function (a) {
            a = this.interpolator.getPosition(a).y;
            a = this.startScale + a * (this.endScale - this.startScale);
            return this.applyOnX ? "scaleX(" + a + ")" : "scaleY(" + a + ")"
        }, calculateKeyFramesData:function (a, b, c) {
            typeof c === "undefined" && (c = 100);
            c >>= 0;
            for (var d, e = "@-" + a + "-keyframes " + b + " {", b = 0; b <= c; b++)d = "" + b / c * 100 + "%{-" + a + "-transform:" + this.calculateKeyFrameData(b / c) + "}", e += d;
            e += "}";
            return e
        }}
}});
CAAT.Module({defines:"CAAT.Behavior.ScaleBehavior", depends:["CAAT.Behavior.BaseBehavior", "CAAT.Foundation.Actor"], extendsClass:"CAAT.Behavior.BaseBehavior", aliases:["CAAT.ScaleBehavior"], extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.anchor = CAAT.Foundation.Actor.ANCHOR_CENTER;
        return this
    }, startScaleX:1, endScaleX:1, startScaleY:1, endScaleY:1, anchorX:0.5, anchorY:0.5, getPropertyName:function () {
        return"scale"
    }, setForTime:function (a, b) {
        var c = this.startScaleX + a * (this.endScaleX - this.startScaleX),
            d = this.startScaleY + a * (this.endScaleY - this.startScaleY);
        0 === c && (c = 0.01);
        0 === d && (d = 0.01);
        this.doValueApplication && b.setScaleAnchored(c, d, this.anchorX, this.anchorY);
        return{scaleX:c, scaleY:d}
    }, setValues:function (a, b, c, d, e, f) {
        this.startScaleX = a;
        this.endScaleX = b;
        this.startScaleY = c;
        this.endScaleY = d;
        if (typeof e !== "undefined" && typeof f !== "undefined")this.anchorX = e, this.anchorY = f;
        return this
    }, setAnchor:function (a, b, c) {
        this.anchorX = b / a.width;
        this.anchorY = c / a.height;
        return this
    }, calculateKeyFrameData:function (a) {
        a =
            this.interpolator.getPosition(a).y;
        return"scaleX(" + (this.startScaleX + a * (this.endScaleX - this.startScaleX)) + ") scaleY(" + (this.startScaleY + a * (this.endScaleY - this.startScaleY)) + ")"
    }, calculateKeyFramesData:function (a, b, c) {
        typeof c === "undefined" && (c = 100);
        c >>= 0;
        for (var d, e = "@-" + a + "-keyframes " + b + " {", b = 0; b <= c; b++)d = "" + b / c * 100 + "%{-" + a + "-transform:" + this.calculateKeyFrameData(b / c) + "}", e += d;
        e += "}";
        return e
    }}
}});
CAAT.Module({defines:"CAAT.Module.Runtime.BrowserInfo", extendsWith:function () {
    function a(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b].string, d = a[b].prop;
            this.versionSearchString = a[b].versionSearch || a[b].identity;
            if (c) {
                if (c.indexOf(a[b].subString) !== -1)return a[b].identity
            } else if (d)return a[b].identity
        }
    }

    function b(a) {
        var b = a.indexOf(this.versionSearchString);
        return b === -1 ? void 0 : parseFloat(a.substring(b + this.versionSearchString.length + 1))
    }

    var c = [
        {string:navigator.platform, subString:"Win", identity:"Windows"},
        {string:navigator.platform, subString:"Mac", identity:"Mac"},
        {string:navigator.userAgent, subString:"iPhone", identity:"iPhone/iPod"},
        {string:navigator.platform, subString:"Linux", identity:"Linux"}
    ], d = a([
        {string:navigator.userAgent, subString:"Chrome", identity:"Chrome"},
        {string:navigator.userAgent, subString:"OmniWeb", versionSearch:"OmniWeb/", identity:"OmniWeb"},
        {string:navigator.vendor, subString:"Apple", identity:"Safari", versionSearch:"Version"},
        {prop:window.opera, identity:"Opera"},
        {string:navigator.vendor,
            subString:"iCab", identity:"iCab"},
        {string:navigator.vendor, subString:"KDE", identity:"Konqueror"},
        {string:navigator.userAgent, subString:"Firefox", identity:"Firefox"},
        {string:navigator.vendor, subString:"Camino", identity:"Camino"},
        {string:navigator.userAgent, subString:"Netscape", identity:"Netscape"},
        {string:navigator.userAgent, subString:"MSIE", identity:"Explorer", versionSearch:"MSIE"},
        {string:navigator.userAgent, subString:"Explorer", identity:"Explorer", versionSearch:"Explorer"},
        {string:navigator.userAgent,
            subString:"Gecko", identity:"Mozilla", versionSearch:"rv"},
        {string:navigator.userAgent, subString:"Mozilla", identity:"Netscape", versionSearch:"Mozilla"}
    ]) || "An unknown browser", e = b(navigator.userAgent) || b(navigator.appVersion) || "an unknown version", c = a(c) || "an unknown OS";
    return{browser:d, version:e, OS:c}
}});
CAAT.Module({defines:"CAAT.Module.Audio.AudioManager", depends:["CAAT.Module.Runtime.BrowserInfo"], extendsWith:function () {
    return{__init:function () {
        this.browserInfo = CAAT.Module.Runtime.BrowserInfo;
        return this
    }, browserInfo:null, musicEnabled:true, fxEnabled:true, audioCache:null, channels:null, workingChannels:null, loopingChannels:[], audioTypes:{mp3:"audio/mpeg;", ogg:'audio/ogg; codecs="vorbis"', wav:'audio/wav; codecs="1"', mp4:'audio/mp4; codecs="mp4a.40.2"'}, initialize:function (a) {
        this.audioCache = [];
        this.channels =
            [];
        this.workingChannels = [];
        for (var b = 0; b < a; b++) {
            var c = document.createElement("audio");
            if (null !== c) {
                c.finished = -1;
                this.channels.push(c);
                var d = this;
                c.addEventListener("ended", function (a) {
                    var a = a.target, b;
                    for (b = 0; b < d.workingChannels.length; b++)if (d.workingChannels[b] === a) {
                        d.workingChannels.splice(b, 1);
                        break
                    }
                    a.caat_callback && a.caat_callback(a.caat_id);
                    d.channels.push(a)
                }, false)
            }
        }
        return this
    }, addAudioFromURL:function (a, b, c) {
        var d = null, e = document.createElement("audio");
        if (null !== e) {
            if (!e.canPlayType)return false;
            d = b.substr(b.lastIndexOf(".") + 1);
            d = e.canPlayType(this.audioTypes[d]);
            if (d !== "" && d !== "no") {
                e.src = b;
                e.preload = "auto";
                e.load();
                if (c)e.caat_callback = c, e.caat_id = a;
                this.audioCache.push({id:a, audio:e});
                return true
            }
        }
        return false
    }, addAudioFromDomNode:function (a, b, c) {
        var d = b.src.substr(b.src.lastIndexOf(".") + 1);
        if (b.canPlayType(this.audioTypes[d])) {
            if (c)b.caat_callback = c, b.caat_id = a;
            this.audioCache.push({id:a, audio:b});
            return true
        }
        return false
    }, addAudioElement:function (a, b, c) {
        if (typeof b === "string")return this.addAudioFromURL(a,
            b, c); else try {
            if (b instanceof HTMLAudioElement)return this.addAudioFromDomNode(a, b, c)
        } catch (d) {
        }
        return false
    }, addAudio:function (a, b, c) {
        if (b instanceof Array)for (var d = 0; d < b.length; d++) {
            if (this.addAudioElement(a, b[d], c))break
        } else this.addAudioElement(a, b, c);
        return this
    }, getAudio:function (a) {
        for (var b = 0; b < this.audioCache.length; b++)if (this.audioCache[b].id === a)return this.audioCache[b].audio;
        return null
    }, setVolume:function (a, b) {
        var c = this.getAudio(a);
        if (null != c)c.volume = b;
        return this
    }, play:function (a) {
        if (!this.fxEnabled)return this;
        a = this.getAudio(a);
        if (null !== a && this.channels.length > 0) {
            var b = this.channels.shift();
            b.src = a.src;
            b.load();
            b.volume = a.volume;
            b.play();
            this.workingChannels.push(b)
        }
        return this
    }, loop:function (a) {
        if (!this.musicEnabled)return this;
        a = this.getAudio(a);
        if (null !== a) {
            var b = document.createElement("audio");
            if (null !== b)return b.src = a.src, b.preload = "auto", this.browserInfo.browser === "Firefox" ? b.addEventListener("ended", function (a) {
                a.target.currentTime = 0
            }, false) : b.loop = true, b.load(), b.play(), this.loopingChannels.push(b),
                b
        }
        return null
    }, endSound:function () {
        var a;
        for (a = 0; a < this.workingChannels.length; a++)this.workingChannels[a].pause(), this.channels.push(this.workingChannels[a]);
        for (a = 0; a < this.loopingChannels.length; a++)this.loopingChannels[a].pause();
        return this
    }, setSoundEffectsEnabled:function (a) {
        this.fxEnabled = a;
        return this
    }, isSoundEffectsEnabled:function () {
        return this.fxEnabled
    }, setMusicEnabled:function (a) {
        this.musicEnabled = a;
        for (var b = 0; b < this.loopingChannels.length; b++)a ? this.loopingChannels[b].play() : this.loopingChannels[b].pause();
        return this
    }, isMusicEnabled:function () {
        return this.musicEnabled
    }}
}});
CAAT.Module({defines:"CAAT.Module.Storage.LocalStorage", constants:{save:function (a, b) {
    try {
        localStorage.setItem(a, JSON.stringify(b))
    } catch (c) {
    }
    return this
}, load:function (a) {
    try {
        return JSON.parse(localStorage.getItem(a))
    } catch (b) {
        return null
    }
}, remove:function (a) {
    try {
        localStorage.removeItem(a)
    } catch (b) {
    }
    return this
}}, extendsWith:{}});
CAAT.Module({defines:"CAAT.Module.ColorUtil.Color", depends:[], constants:{RampEnumeration:{RAMP_RGBA:0, RAMP_RGB:1, RAMP_CHANNEL_RGB:2, RAMP_CHANNEL_RGBA:3, RAMP_CHANNEL_RGB_ARRAY:4, RAMP_CHANNEL_RGBA_ARRAY:5}, hsvToRgb:function (a, b, c) {
    var d, e, f, a = Math.max(0, Math.min(360, a)), b = Math.max(0, Math.min(100, b)), c = Math.max(0, Math.min(100, c));
    b /= 100;
    c /= 100;
    if (b === 0)return d = b = c, [Math.round(d * 255), Math.round(b * 255), Math.round(c * 255)];
    a /= 60;
    d = Math.floor(a);
    e = a - d;
    a = c * (1 - b);
    f = c * (1 - b * e);
    e = c * (1 - b * (1 - e));
    switch (d) {
        case 0:
            d =
                c;
            b = e;
            c = a;
            break;
        case 1:
            d = f;
            b = c;
            c = a;
            break;
        case 2:
            d = a;
            b = c;
            c = e;
            break;
        case 3:
            d = a;
            b = f;
            break;
        case 4:
            d = e;
            b = a;
            break;
        default:
            d = c, b = a, c = f
    }
    return new CAAT.Module.ColorUtil.Color(Math.round(d * 255), Math.round(b * 255), Math.round(c * 255))
}, interpolate:function (a, b, c, d, e, f, g, h) {
    if (h <= 0)return{r:a, g:b, b:c}; else if (h >= g)return{r:d, g:e, b:f};
    a = a + (d - a) / g * h >> 0;
    b = b + (e - b) / g * h >> 0;
    c = c + (f - c) / g * h >> 0;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    b > 255 ? b = 255 : b < 0 && (b = 0);
    c > 255 ? c = 255 : c < 0 && (c = 0);
    return{r:a, g:b, b:c}
}, makeRGBColorRamp:function (a, b, c) {
    var d =
        [], e = a.length - 1;
    b /= e;
    var f, g, h, i, j, m, k, n, l, p, o, q, s, r;
    for (f = 0; f < e; f += 1) {
        k = a[f];
        n = k >> 24 & 255;
        l = (k & 16711680) >> 16;
        p = (k & 65280) >> 8;
        k &= 255;
        g = a[f + 1];
        o = g >> 24 & 255;
        q = (g & 16711680) >> 16;
        s = (g & 65280) >> 8;
        g &= 255;
        o = (o - n) / b;
        q = (q - l) / b;
        s = (s - p) / b;
        r = (g - k) / b;
        for (g = 0; g < b; g += 1) {
            h = n + o * g >> 0;
            i = l + q * g >> 0;
            j = p + s * g >> 0;
            m = k + r * g >> 0;
            var t = CAAT.Module.ColorUtil.Color.RampEnumeration;
            switch (c) {
                case t.RAMP_RGBA:
                    d.push("argb(" + h + "," + i + "," + j + "," + m + ")");
                    break;
                case t.RAMP_RGB:
                    d.push("rgb(" + i + "," + j + "," + m + ")");
                    break;
                case t.RAMP_CHANNEL_RGB:
                    d.push(4278190080 |
                        i << 16 | j << 8 | m);
                    break;
                case t.RAMP_CHANNEL_RGBA:
                    d.push(h << 24 | i << 16 | j << 8 | m);
                    break;
                case t.RAMP_CHANNEL_RGBA_ARRAY:
                    d.push([i, j, m, h]);
                    break;
                case t.RAMP_CHANNEL_RGB_ARRAY:
                    d.push([i, j, m])
            }
        }
    }
    return d
}, random:function () {
    for (var a = "#", b = 0; b < 3; b++)a += "0123456789abcdef"[Math.random() * 16 >> 0];
    return a
}}, extendsWith:{__init:function (a, b, c) {
    this.r = a || 255;
    this.g = b || 255;
    this.b = c || 255;
    return this
}, r:255, g:255, b:255, toHex:function () {
    return("000000" + ((this.r << 16) + (this.g << 8) + this.b).toString(16)).slice(-6)
}}});
CAAT.Module({defines:"CAAT.Module.Debug.Debug", depends:["CAAT.Event.AnimationLoop"], extendsWith:{width:0, height:0, canvas:null, ctx:null, statistics:null, framerate:null, textContainer:null, textFPS:null, textEntitiesTotal:null, textEntitiesActive:null, textDraws:null, textDrawTime:null, textRAFTime:null, textDirtyRects:null, textDiscardDR:null, frameTimeAcc:0, frameRAFAcc:0, canDebug:false, SCALE:60, debugTpl:'    <style type="text/css">        #caat-debug {            z-index: 10000;            position:fixed;            bottom:0;            left:0;            width:100%;            background-color: rgba(0,0,0,0.8);        }        #caat-debug.caat_debug_max {            margin-bottom: 0px;        }        .caat_debug_bullet {            display:inline-block;            background-color:#f00;            width:8px;            height:8px;            border-radius: 4px;            margin-left:10px;            margin-right:2px;        }        .caat_debug_description {            font-size:11px;            font-family: helvetica, arial;            color: #aaa;            display: inline-block;        }        .caat_debug_value {            font-size:11px;            font-family: helvetica, arial;            color: #fff;            width:25px;            text-align: right;            display: inline-block;            margin-right: .3em;        }        .caat_debug_indicator {            float: right;        }        #debug_tabs {            border-top: 1px solid #888;            height:25px;        }        .tab_max_min {            font-family: helvetica, arial;            font-size: 12px;            font-weight: bold;            color: #888;            border-right: 1px solid #888;            float: left;            cursor: pointer;            padding-left: 5px;            padding-right: 5px;            padding-top: 5px;            height: 20px;        }        .debug_tabs_content_hidden {            display: none;            width: 100%;        }        .debug_tabs_content_visible {            display: block;            width: 100%;        }        .checkbox_enabled {            display:inline-block;            background-color:#eee;            border: 1px solid #eee;            width:6px;            height:8px;            margin-left:12px;            margin-right:2px;            cursor: pointer;        }        .checkbox_disabled {            display:inline-block;            width:6px;            height:8px;            background-color: #333;            border: 1px solid #eee;            margin-left:12px;            margin-right:2px;            cursor: pointer;        }        .checkbox_description {            font-size:11px;            font-family: helvetica, arial;            color: #fff;        }        .debug_tab {            font-family: helvetica, arial;            font-size: 12px;            color: #fff;            border-right: 1px solid #888;            float: left;            padding-left: 5px;            padding-right: 5px;            height: 20px;            padding-top: 5px;            cursor: default;        }        .debug_tab_selected {            background-color: #444;            cursor: default;        }        .debug_tab_not_selected {            background-color: #000;            cursor: pointer;        }    </style>    <div id="caat-debug">        <div id="debug_tabs">            <span class="tab_max_min" onCLick="javascript: var debug = document.getElementById(\'debug_tabs_content\');if (debug.className === \'debug_tabs_content_visible\') {debug.className = \'debug_tabs_content_hidden\'} else {debug.className = \'debug_tabs_content_visible\'}"> CAAT Debug panel </span>            <span id="caat-debug-tab0" class="debug_tab debug_tab_selected">Performance</span>            <span id="caat-debug-tab1" class="debug_tab debug_tab_not_selected">Controls</span>            <span class="caat_debug_indicator">                <span class="caat_debug_bullet" style="background-color:#0f0;"></span>                <span class="caat_debug_description">Draw Time: </span>                <span class="caat_debug_value" id="textDrawTime">5.46</span>                <span class="caat_debug_description">ms.</span>            </span>            <span class="caat_debug_indicator">                <span class="caat_debug_bullet" style="background-color:#f00;"></span>                <span class="caat_debug_description">FPS: </span>                <span class="caat_debug_value" id="textFPS">48</span>            </span>        </div>        <div id="debug_tabs_content" class="debug_tabs_content_hidden">            <div id="caat-debug-tab0-content">                <canvas id="caat-debug-canvas" height="60"></canvas>                <div>                    <span>                        <span class="caat_debug_bullet" style="background-color:#0f0;"></span>                        <span class="caat_debug_description">RAF Time:</span>                        <span class="caat_debug_value" id="textRAFTime">20.76</span>                        <span class="caat_debug_description">ms.</span>                    </span>                    <span>                        <span class="caat_debug_bullet" style="background-color:#0ff;"></span>                        <span class="caat_debug_description">Entities Total: </span>                        <span class="caat_debug_value" id="textEntitiesTotal">41</span>                    </span>                    <span>                        <span class="caat_debug_bullet" style="background-color:#0ff;"></span>                        <span class="caat_debug_description">Entities Active: </span>                        <span class="caat_debug_value" id="textEntitiesActive">37</span>                    </span>                    <span>                        <span class="caat_debug_bullet" style="background-color:#00f;"></span>                        <span class="caat_debug_description">Draws: </span>                        <span class="caat_debug_value" id="textDraws">0</span>                    </span>                    <span>                        <span class="caat_debug_bullet" style="background-color:#00f;"></span>                        <span class="caat_debug_description">DirtyRects: </span>                        <span class="caat_debug_value" id="textDirtyRects">0</span>                    </span>                    <span>                        <span class="caat_debug_bullet" style="background-color:#00f;"></span>                        <span class="caat_debug_description">Discard DR: </span>                        <span class="caat_debug_value" id="textDiscardDR">0</span>                    </span>                </div>            </div>            <div id="caat-debug-tab1-content">                <div>                    <div>                        <span id="control-sound"></span>                        <span class="checkbox_description">Sound</span>                    </div>                    <div>                        <span id="control-music"></span>                        <span class="checkbox_description">Music</span>                    </div>                    <div>                        <span id="control-aabb"></span>                        <span class="checkbox_description">AA Bounding Boxes</span>                    </div>                    <div>                        <span id="control-bb"></span>                        <span class="checkbox_description">Bounding Boxes</span>                    </div>                    <div>                        <span id="control-dr"></span>                        <span class="checkbox_description">Dirty Rects</span>                    </div>                </div>            </div>        </div>    </div>',
    setScale:function (a) {
        this.scale = a;
        return this
    }, initialize:function (a, b) {
        this.width = a = window.innerWidth;
        this.height = b;
        this.framerate = {refreshInterval:CAAT.FPS_REFRESH || 500, frames:0, timeLastRefresh:0, fps:0, prevFps:-1, fpsMin:1E3, fpsMax:0};
        if (!document.getElementById("caat-debug")) {
            var c = document.createElement("div");
            c.innerHTML = this.debugTpl;
            document.body.appendChild(c);
            eval(' var __x= CAAT;        function initCheck( name, bool, callback ) {            var elem= document.getElementById(name);            if ( elem ) {                elem.className= (bool) ? "checkbox_enabled" : "checkbox_disabled";                if ( callback ) {                    elem.addEventListener( "click", (function(elem, callback) {                        return function(e) {                            elem.__value= !elem.__value;                            elem.className= (elem.__value) ? "checkbox_enabled" : "checkbox_disabled";                            callback(e,elem.__value);                        }                    })(elem, callback), false );                }                elem.__value= bool;            }        }        function setupTabs() {            var numTabs=0;            var elem;            var elemContent;            do {                elem= document.getElementById("caat-debug-tab"+numTabs);                if ( elem ) {                    elemContent= document.getElementById("caat-debug-tab"+numTabs+"-content");                    if ( elemContent ) {                        elemContent.style.display= numTabs===0 ? \'block\' : \'none\';                        elem.className= numTabs===0 ? "debug_tab debug_tab_selected" : "debug_tab debug_tab_not_selected";                        elem.addEventListener( "click", (function(tabIndex) {                            return function(e) {                                for( var i=0; i<numTabs; i++ ) {                                    var _elem= document.getElementById("caat-debug-tab"+i);                                    var _elemContent= document.getElementById("caat-debug-tab"+i+"-content");                                    _elemContent.style.display= i===tabIndex ? \'block\' : \'none\';                                    _elem.className= i===tabIndex ? "debug_tab debug_tab_selected" : "debug_tab debug_tab_not_selected";                                }                            }                        })(numTabs), false );                    }                    numTabs++;                }            } while( elem );        }        initCheck( "control-sound", __x.director[0].isSoundEffectsEnabled(), function(e, bool) {            __x.director[0].setSoundEffectsEnabled(bool);        } );        initCheck( "control-music", __x.director[0].isMusicEnabled(), function(e, bool) {            __x.director[0].setMusicEnabled(bool);        } );        initCheck( "control-aabb", CAAT.DEBUGBB, function(e,bool) {            CAAT.DEBUGAABB= bool;            __x.director[0].currentScene.dirty= true;        } );        initCheck( "control-bb", CAAT.DEBUGBB, function(e,bool) {            CAAT.DEBUGBB= bool;            if ( bool ) {                CAAT.DEBUGAABB= true;            }            __x.director[0].currentScene.dirty= true;        } );        initCheck( "control-dr", CAAT.DEBUG_DIRTYRECTS , function( e,bool ) {            CAAT.DEBUG_DIRTYRECTS= bool;        });        setupTabs();')
        }
        this.canvas =
            document.getElementById("caat-debug-canvas");
        if (null === this.canvas)this.canDebug = false; else return this.canvas.width = a, this.canvas.height = b, this.ctx = this.canvas.getContext("2d"), this.ctx.fillStyle = "#000", this.ctx.fillRect(0, 0, this.width, this.height), this.textFPS = document.getElementById("textFPS"), this.textDrawTime = document.getElementById("textDrawTime"), this.textRAFTime = document.getElementById("textRAFTime"), this.textEntitiesTotal = document.getElementById("textEntitiesTotal"), this.textEntitiesActive =
            document.getElementById("textEntitiesActive"), this.textDraws = document.getElementById("textDraws"), this.textDirtyRects = document.getElementById("textDirtyRects"), this.textDiscardDR = document.getElementById("textDiscardDR"), this.canDebug = true, this
    }, debugInfo:function (a) {
        this.statistics = a;
        a = CAAT;
        this.frameTimeAcc += a.FRAME_TIME;
        this.frameRAFAcc += a.REQUEST_ANIMATION_FRAME_TIME;
        this.framerate.frames++;
        if (a.RAF > this.framerate.timeLastRefresh + this.framerate.refreshInterval) {
            this.framerate.fps = this.framerate.frames *
                1E3 / (a.RAF - this.framerate.timeLastRefresh) | 0;
            this.framerate.fpsMin = this.framerate.frames > 0 ? Math.min(this.framerate.fpsMin, this.framerate.fps) : this.framerate.fpsMin;
            this.framerate.fpsMax = Math.max(this.framerate.fpsMax, this.framerate.fps);
            this.textFPS.innerHTML = this.framerate.fps;
            var b = (this.frameTimeAcc * 100 / this.framerate.frames | 0) / 100;
            this.frameTimeAcc = 0;
            this.textDrawTime.innerHTML = b;
            b = (this.frameRAFAcc * 100 / this.framerate.frames | 0) / 100;
            this.frameRAFAcc = 0;
            this.textRAFTime.innerHTML = b;
            this.framerate.timeLastRefresh =
                a.RAF;
            this.framerate.frames = 0;
            this.paint(b)
        }
        this.textEntitiesTotal.innerHTML = this.statistics.size_total;
        this.textEntitiesActive.innerHTML = this.statistics.size_active;
        this.textDirtyRects.innerHTML = this.statistics.size_dirtyRects;
        this.textDraws.innerHTML = this.statistics.draws;
        this.textDiscardDR.innerHTML = this.statistics.size_discarded_by_dirty_rects
    }, paint:function (a) {
        var b = this.ctx, c = 0;
        b.drawImage(this.canvas, 1, 0, this.width - 1, this.height, 0, 0, this.width - 1, this.height);
        b.strokeStyle = "black";
        b.beginPath();
        b.moveTo(this.width - 0.5, 0);
        b.lineTo(this.width - 0.5, this.height);
        b.stroke();
        b.strokeStyle = "#a22";
        b.beginPath();
        c = this.height - (20 / this.SCALE * this.height >> 0) - 0.5;
        b.moveTo(0.5, c);
        b.lineTo(this.width + 0.5, c);
        b.stroke();
        b.strokeStyle = "#aa2";
        b.beginPath();
        c = this.height - (30 / this.SCALE * this.height >> 0) - 0.5;
        b.moveTo(0.5, c);
        b.lineTo(this.width + 0.5, c);
        b.stroke();
        c = Math.min(this.height - this.framerate.fps / this.SCALE * this.height, 59);
        if (-1 === this.framerate.prevFps)this.framerate.prevFps = c | 0;
        b.strokeStyle = "#0ff";
        b.beginPath();
        b.moveTo(this.width, (c | 0) - 0.5);
        b.lineTo(this.width, this.framerate.prevFps - 0.5);
        b.stroke();
        this.framerate.prevFps = c;
        a = (this.height - a / this.SCALE * this.height >> 0) - 0.5;
        b.strokeStyle = "#ff0";
        b.beginPath();
        b.moveTo(this.width, a);
        b.lineTo(this.width, a);
        b.stroke()
    }}});
CAAT.Module({defines:"CAAT.Module.Font.Font", aliases:"CAAT.Font", depends:["CAAT.Foundation.SpriteImage"], constants:{getFontMetrics:function (a) {
    var b;
    if (CAAT.CSS_TEXT_METRICS)try {
        return b = CAAT.Module.Font.Font.getFontMetricsCSS(a)
    } catch (c) {
    }
    return CAAT.Module.Font.Font.getFontMetricsNoCSS(a)
}, getFontMetricsNoCSS:function (a) {
    var a = /(\d+)p[x|t]/i.exec(a), b;
    b = a ? a[1] | 0 : 32;
    a = b - 1;
    b = b + b * 0.2 | 0;
    return{height:b, ascent:a, descent:b - a}
}, getFontMetricsCSS:function (a) {
    function b(a) {
        var b, c, d;
        d = a && a.ownerDocument;
        b = d.documentElement;
        a = a.getBoundingClientRect();
        c = document.body;
        d = d.nodeType === 9 ? d.defaultView || d.parentWindow : false;
        return{top:a.top + (d.pageYOffset || b.scrollTop) - (b.clientTop || c.clientTop || 0), left:a.left + (d.pageXOffset || b.scrollLeft) - (b.clientLeft || c.clientLeft || 0)}
    }

    try {
        var c = document.createElement("span");
        c.style.font = a;
        c.innerHTML = "Hg";
        var d = document.createElement("div");
        d.style.display = "inline-block";
        d.style.width = "1px";
        d.style.heigh = "0px";
        var e = document.createElement("div");
        e.appendChild(c);
        e.appendChild(d);
        var f = document.body;
        f.appendChild(e);
        try {
            return a = {}, d.style.verticalAlign = "baseline", a.ascent = b(d).top - b(c).top, d.style.verticalAlign = "bottom", a.height = b(d).top - b(c).top, a.ascent = Math.ceil(a.ascent), a.height = Math.ceil(a.height), a.descent = a.height - a.ascent, a
        } finally {
            f.removeChild(e)
        }
    } catch (g) {
        return null
    }
}}, extendsWith:function () {
    return{fontSize:10, fontSizeUnit:"px", font:"Sans-Serif", fontStyle:"", fillStyle:"#fff", strokeStyle:null, strokeSize:1, padding:0, image:null, charMap:null, height:0,
        ascent:0, descent:0, setPadding:function (a) {
            this.padding = a;
            return this
        }, setFontStyle:function (a) {
            this.fontStyle = a;
            return this
        }, setStrokeSize:function (a) {
            this.strokeSize = a;
            return this
        }, setFontSize:function (a) {
            this.fontSize = a;
            this.fontSizeUnit = "px";
            return this
        }, setFont:function (a) {
            this.font = a;
            return this
        }, setFillStyle:function (a) {
            this.fillStyle = a;
            return this
        }, setStrokeStyle:function (a) {
            this.strokeStyle = a;
            return this
        }, createDefault:function (a) {
            for (var b = "", c = 32; c < 128; c++)b += String.fromCharCode(c);
            return this.create(b,
                a)
        }, create:function (a, b) {
            b |= 0;
            this.padding = b;
            var c = document.createElement("canvas"), d = c.getContext("2d");
            d.textBaseline = "bottom";
            d.font = this.fontStyle + " " + this.fontSize + "" + this.fontSizeUnit + " " + this.font;
            var e = 0, f = [], g, h;
            for (g = 0; g < a.length; g++) {
                var i = Math.max(1, (d.measureText(a.charAt(g)).width >> 0) + 1) + 2 * b;
                f.push(i);
                e += i
            }
            g = CAAT.Font.getFontMetrics(d.font);
            d = g.height;
            this.ascent = g.ascent;
            this.descent = g.descent;
            this.height = g.height;
            i = g.ascent;
            c.width = e;
            c.height = d;
            d = c.getContext("2d");
            d.textBaseline =
                "alphabetic";
            d.font = this.fontStyle + " " + this.fontSize + "" + this.fontSizeUnit + " " + this.font;
            d.fillStyle = this.fillStyle;
            d.strokeStyle = this.strokeStyle;
            this.charMap = {};
            for (g = e = 0; g < a.length; g++) {
                h = a.charAt(g);
                d.fillText(h, e + b, i);
                if (this.strokeStyle)d.beginPath(), d.lineWidth = this.strokeSize, d.strokeText(h, e + b, i);
                this.charMap[h] = {x:e + b, width:f[g] - 2 * b};
                e += f[g]
            }
            this.image = c;
            return this
        }, setAsSpriteImage:function () {
            var a = [], b = 0, c;
            for (c in this.charMap) {
                var d = c, e = this.charMap[c];
                a[c] = {id:b++, height:this.height,
                    xoffset:0, letter:d, yoffset:0, width:e.width, xadvance:e.width, x:e.x, y:0}
            }
            this.spriteImage = (new CAAT.SpriteImage).initializeAsGlyphDesigner(this.image, a);
            return this
        }, getAscent:function () {
            return this.ascent
        }, getDescent:function () {
            return this.descent
        }, stringHeight:function () {
            return this.height
        }, getFontData:function () {
            return{height:this.height, ascent:this.ascent, descent:this.descent}
        }, stringWidth:function (a) {
            var b, c, d = 0, e;
            for (b = 0, c = a.length; b < c; b++)e = this.charMap[a.charAt(b)], d += e ? e.width : 10;
            return d
        },
        drawText:function (a, b, c, d) {
            var e, f, g, h, i = this.image.height;
            for (e = 0, f = a.length; e < f; e++)(g = this.charMap[a.charAt(e)]) ? (h = g.width, b.drawImage(this.image, g.x, 0, h, i, c, d, h, i), c += h) : (b.strokeStyle = "#f00", b.strokeRect(c, d, 10, i), c += 10)
        }, save:function () {
            var a = this.image.toDataURL("image/png");
            document.location.href = a.replace("image/png", "image/octet-stream")
        }, drawSpriteText:function (a, b) {
            this.spriteImage.drawSpriteText(a, b)
        }}
}});
CAAT.Module({defines:"CAAT.Module.CircleManager.PackedCircle", depends:["CAAT.Module.CircleManager.PackedCircle", "CAAT.Math.Point"], constants:{BOUNDS_RULE_WRAP:1, BOUNDS_RULE_CONSTRAINT:2, BOUNDS_RULE_DESTROY:4, BOUNDS_RULE_IGNORE:8}, extendsWith:{__init:function () {
    this.boundsRule = CAAT.Module.CircleManager.PackedCircle.BOUNDS_RULE_IGNORE;
    this.position = new CAAT.Math.Point(0, 0, 0);
    this.offset = new CAAT.Math.Point(0, 0, 0);
    this.targetPosition = new CAAT.Math.Point(0, 0, 0);
    return this
}, id:0, delegate:null, position:null,
    offset:null, targetPosition:null, targetChaseSpeed:0.02, isFixed:false, boundsRule:0, collisionMask:0, collisionGroup:0, containsPoint:function (a) {
        return this.position.getDistanceSquared(a) < this.radiusSquared
    }, getDistanceSquaredFromPosition:function (a) {
        return this.position.getDistanceSquared(a) < this.radiusSquared
    }, intersects:function (a) {
        var b = this.position.getDistanceSquared(a.position);
        return b < this.radiusSquared || b < a.radiusSquared
    }, setPosition:function (a) {
        this.position = a;
        return this
    }, setDelegate:function (a) {
        this.delegate =
            a;
        return this
    }, setOffset:function (a) {
        this.offset = a;
        return this
    }, setTargetPosition:function (a) {
        this.targetPosition = a;
        return this
    }, setTargetChaseSpeed:function (a) {
        this.targetChaseSpeed = a;
        return this
    }, setIsFixed:function (a) {
        this.isFixed = a;
        return this
    }, setCollisionMask:function (a) {
        this.collisionMask = a;
        return this
    }, setCollisionGroup:function (a) {
        this.collisionGroup = a;
        return this
    }, setRadius:function (a) {
        this.radius = a;
        this.radiusSquared = this.radius * this.radius;
        return this
    }, initialize:function (a) {
        if (a)for (var b in a)this[b] =
            a[b];
        return this
    }, dealloc:function () {
        this.targetPosition = this.delegate = this.offset = this.position = null
    }}});
CAAT.Module({defines:"CAAT.Module.CircleManager.PackedCircleManager", depends:["CAAT.Math.Point", "CAAT.Math.Rectangle"], extendsWith:{__init:function () {
    this.bounds = new CAAT.Math.Rectangle
}, allCircles:[], numberOfCollisionPasses:1, numberOfTargetingPasses:0, bounds:null, addCircle:function (a) {
    a.id = this.allCircles.length;
    this.allCircles.push(a);
    return this
}, removeCircle:function (a) {
    var b = 0, c = false, d = this.allCircles.length;
    if (d === 0)throw"Error: (PackedCircleManager) attempting to remove circle, and allCircles.length === 0!!";
    for (; d--;)if (this.allCircles[d] === a) {
        c = true;
        b = d;
        break
    }
    if (!c)throw"Could not locate circle in allCircles array!";
    this.allCircles[b].dealloc();
    this.allCircles[b] = null;
    return this
}, forceCirclesToMatchDelegatePositions:function () {
    for (var a = this.allCircles.length, b = 0; b < a; b++) {
        var c = this.allCircles[b];
        c && c.delegate && c.position.set(c.delegate.x + c.offset.x, c.delegate.y + c.offset.y)
    }
}, pushAllCirclesTowardTarget:function () {
    for (var a = new CAAT.Point(0, 0, 0), b = this.allCircles, c = b.length, d = 0; d < this.numberOfTargetingPasses; d++)for (var e =
        0; e < c; e++) {
        var f = b[e];
        if (!f.isFixed)a.x = f.position.x - (f.targetPosition.x + f.offset.x), a.y = f.position.y - (f.targetPosition.y + f.offset.y), a.multiply(f.targetChaseSpeed), f.position.x -= a.x, f.position.y -= a.y
    }
}, handleCollisions:function () {
    this.removeExpiredElements();
    for (var a = new CAAT.Math.Point(0, 0, 0), b = this.allCircles, c = b.length, d = 0; d < this.numberOfCollisionPasses; d++)for (var e = 0; e < c; e++)for (var f = b[e], g = e + 1; g < c; g++) {
        var h = b[g];
        if (this.circlesCanCollide(f, h)) {
            var i = h.position.x - f.position.x, j = h.position.y -
                f.position.y, m = (f.radius + h.radius) * 1.08, k = f.position.getDistanceSquared(h.position);
            if (k < m * m - 0.02)a.x = i, a.y = j, a.normalize(), i = (m - Math.sqrt(k)) * 0.5, a.multiply(i), h.isFixed || (f.isFixed && a.multiply(2.2), h.position.translatePoint(a)), f.isFixed || (h.isFixed && a.multiply(2.2), f.position.subtract(a))
        }
    }
}, handleBoundaryForCircle:function (a, b) {
    var c = a.position.x, d = a.position.y, e = a.radius, f = e * 2, b = 12;
    if (b & 1 && c - f > this.bounds.right)a.position.x = this.bounds.left + e; else if (b & 1 && c + f < this.bounds.left)a.position.x = this.bounds.right -
        e;
    if (b & 4 && d - f > this.bounds.bottom)a.position.y = this.bounds.top - e; else if (b & 4 && d + f < this.bounds.top)a.position.y = this.bounds.bottom + e;
    if (b & 8 && c + e >= this.bounds.right)a.position.x = a.position.x = this.bounds.right - e; else if (b & 8 && c - e < this.bounds.left)a.position.x = this.bounds.left + e;
    if (b & 16 && d + e > this.bounds.bottom)a.position.y = this.bounds.bottom - e; else if (b & 16 && d - e < this.bounds.top)a.position.y = this.bounds.top + e
}, getCircleAt:function (a, b, c) {
    for (var d = this.allCircles, e = d.length, a = new CAAT.Math.Point(a, b, 0), b =
        null, f = Number.MAX_VALUE, g = 0; g < e; g++) {
        var h = d[g];
        if (h) {
            var i = h.position.getDistanceSquared(a);
            i < f && i < h.radiusSquared + c && (f = i, b = h)
        }
    }
    return b
}, circlesCanCollide:function (a, b) {
    return!a || !b || a === b ? false : true
}, setBounds:function (a, b, c, d) {
    this.bounds.x = a;
    this.bounds.y = b;
    this.bounds.width = c;
    this.bounds.height = d
}, setNumberOfCollisionPasses:function (a) {
    this.numberOfCollisionPasses = a;
    return this
}, setNumberOfTargetingPasses:function (a) {
    this.numberOfTargetingPasses = a;
    return this
}, sortOnDistanceToTarget:function (a, b) {
    var c = a.getDistanceSquaredFromPosition(a.targetPosition), d = b.getDistanceSquaredFromPosition(a.targetPosition), e = 0;
    c > d ? e = -1 : c < d && (e = 1);
    return e
}, removeExpiredElements:function () {
    for (var a = this.allCircles.length; a >= 0; a--)this.allCircles[a] === null && this.allCircles.splice(a, 1)
}, initialize:function (a) {
    if (a)for (var b in a)this[b] = a[b];
    return this
}}});
CAAT.Module({defines:"CAAT.Module.Preloader.Preloader", extendsWith:function () {
    var a = function (a, c, d) {
        var e = this;
        this.id = a;
        this.path = c;
        this.image = new Image;
        this.image.onload = function () {
            d.__onload(e)
        };
        this.image.onerror = function () {
            d.__onerror(e)
        };
        this.load = function () {
            e.image.src = e.path
        };
        return this
    };
    return{__init:function () {
        this.elements = [];
        return this
    }, elements:null, imageCounter:0, cfinished:null, cloaded:null, cerrored:null, loadedCount:0, addElement:function (b, c) {
        this.elements.push(new a(b, c, this));
        return this
    },
        __onload:function (a) {
            this.cloaded && this.cloaded(a.id);
            this.loadedCount++;
            this.loadedCount === this.elements.length && this.cfinished && this.cfinished(this.elements)
        }, __onerror:function (a) {
            this.cerrored && this.cerrored(a.id)
        }, load:function (a, c, d) {
            this.cfinished = a;
            this.cloaded = c;
            this.cerroed = d;
            for (a = 0; a < this.elements.length; a++)this.elements[a].load();
            return this
        }}
}});
CAAT.Module({defines:"CAAT.Module.Preloader.ImagePreloader", aliases:["CAAT.ImagePreloader"], extendsWith:{__init:function () {
    this.images = [];
    return this
}, images:null, notificationCallback:null, imageCounter:0, loadImages:function (a, b, c) {
    a || b && b(0, []);
    var d = this, e;
    this.notificationCallback = b;
    this.images = [];
    for (e = 0; e < a.length; e++)this.images.push({id:a[e].id, image:new Image});
    for (e = 0; e < a.length; e++)this.images[e].image.onload = function () {
        d.imageCounter++;
        d.notificationCallback(d.imageCounter, d.images)
    }, this.images[e].image.onerror =
        function (a) {
            return function (b) {
                c && c(b, a)
            }
        }(e), this.images[e].image.src = a[e].url;
    a.length === 0 && b(0, [])
}}});
CAAT.Module({defines:"CAAT.Module.Image.ImageUtil", depends:["CAAT.Math.Matrix"], extendsWith:{}, constants:{createAlphaSpriteSheet:function (a, b, c, d, e) {
    if (a < b)var f = a, a = b, b = f;
    f = document.createElement("canvas");
    f.width = d.width;
    f.height = d.height * c;
    var g = f.getContext("2d");
    g.fillStyle = e ? e : "rgba(255,255,255,0)";
    g.fillRect(0, 0, d.width, d.height * c);
    for (e = 0; e < c; e++)g.globalAlpha = 1 - (a - b) / c * (e + 1), g.drawImage(d, 0, e * d.height);
    return f
}, rotate:function (a, b) {
    b = b || 0;
    if (!b)return a;
    var c = document.createElement("canvas");
    c.width = a.height;
    c.height = a.width;
    var d = c.getContext("2d");
    d.globalAlpha = 1;
    d.fillStyle = "rgba(0,0,0,0)";
    d.clearRect(0, 0, c.width, c.height);
    var e = new CAAT.Math.Matrix;
    e.multiply((new CAAT.Math.Matrix).setTranslate(c.width / 2, c.width / 2));
    e.multiply((new CAAT.Math.Matrix).setRotation(b * Math.PI / 180));
    e.multiply((new CAAT.Math.Matrix).setTranslate(-c.width / 2, -c.width / 2));
    e.transformRenderingContext(d);
    d.drawImage(a, 0, 0);
    return c
}, optimize:function (a, b, c) {
    b >>= 0;
    var d = true, e = true, f = true, g = true;
    if (typeof c !==
        "undefined") {
        if (typeof c.top !== "undefined")d = c.top;
        if (typeof c.bottom !== "undefined")e = c.bottom;
        if (typeof c.left !== "undefined")f = c.left;
        if (typeof c.right !== "undefined")g = c.right
    }
    c = document.createElement("canvas");
    c.width = a.width;
    c.height = a.height;
    var h = c.getContext("2d");
    h.fillStyle = "rgba(0,0,0,0)";
    h.fillRect(0, 0, a.width, a.height);
    h.drawImage(a, 0, 0);
    var i = h.getImageData(0, 0, a.width, a.height).data, j, a = 0, m = c.height - 1, k = 0, n = c.width - 1, l = false;
    if (d) {
        for (d = 0; d < c.height; d++) {
            for (j = 0; j < c.width; j++)if (i[d *
                c.width * 4 + 3 + j * 4] > b) {
                l = true;
                break
            }
            if (l)break
        }
        a = d
    }
    if (e) {
        l = false;
        for (d = c.height - 1; d >= a; d--) {
            for (j = 0; j < c.width; j++)if (i[d * c.width * 4 + 3 + j * 4] > b) {
                l = true;
                break
            }
            if (l)break
        }
        m = d
    }
    if (f) {
        l = false;
        for (j = 0; j < c.width; j++) {
            for (d = a; d <= m; d++)if (i[d * c.width * 4 + 3 + j * 4] > b) {
                l = true;
                break
            }
            if (l)break
        }
        k = j
    }
    if (g) {
        l = false;
        for (j = c.width - 1; j >= k; j--) {
            for (d = a; d <= m; d++)if (i[d * c.width * 4 + 3 + j * 4] > b) {
                l = true;
                break
            }
            if (l)break
        }
        n = j
    }
    if (0 === k && 0 === a && c.width - 1 === n && c.height - 1 === m)return c;
    b = n - k + 1;
    e = m - a + 1;
    f = h.getImageData(k, a, b, e);
    c.width = b;
    c.height =
        e;
    h = c.getContext("2d");
    h.putImageData(f, 0, 0);
    return c
}, createThumb:function (a, b, c, d) {
    var b = b || 24, c = c || 24, e = document.createElement("canvas");
    e.width = b;
    e.height = c;
    var f = e.getContext("2d");
    if (d) {
        var g = Math.max(a.width, a.height), d = a.width / g * b, g = a.height / g * c;
        f.drawImage(a, (b - d) / 2, (c - g) / 2, d, g)
    } else f.drawImage(a, 0, 0, b, c);
    return e
}}});
CAAT.Module({defines:"CAAT.Module.Collision.QuadTree", depends:["CAAT.Math.Rectangle"], extendsClass:"CAAT.Math.Rectangle", extendsWith:function () {
    return{bgActors:null, quadData:null, create:function (a, b, c, d, e, f, g) {
        typeof f === "undefined" && (f = 32);
        typeof g === "undefined" && (g = 1);
        var h = (a + c) / 2, i = (b + d) / 2;
        this.x = a;
        this.y = b;
        this.x1 = c;
        this.y1 = d;
        this.width = c - a;
        this.height = d - b;
        this.bgActors = this.__getOverlappingActorList(e);
        if (this.bgActors.length <= g || this.width <= f)return this;
        this.quadData = Array(4);
        this.quadData[0] =
            (new CAAT.Module.Collision.QuadTree).create(a, b, h, i, this.bgActors);
        this.quadData[1] = (new CAAT.Module.Collision.QuadTree).create(h, b, c, i, this.bgActors);
        this.quadData[2] = (new CAAT.Module.Collision.QuadTree).create(a, i, h, d, this.bgActors);
        this.quadData[3] = (new CAAT.Module.Collision.QuadTree).create(h, i, c, d, this.bgActors);
        return this
    }, __getOverlappingActorList:function (a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) {
            var e = a[c];
            this.intersects(e.AABB) && b.push(e)
        }
        return b
    }, getOverlappingActors:function (a) {
        var b,
            c, d, e = [], f;
        c = this.bgActors;
        if (this.quadData)for (b = 0; b < 4; b++) {
            if (this.quadData[b].intersects(a)) {
                f = this.quadData[b].getOverlappingActors(a);
                for (c = 0, d = f.length; c < d; c++)e.push(f[c])
            }
        } else for (b = 0, d = c.length; b < d; b++)f = c[b], a.intersects(f.AABB) && e.push(f);
        return e
    }}
}});
CAAT.Module({defines:"CAAT.Module.Collision.SpatialHash", aliases:["CAAT.SpatialHash"], depends:["CAAT.Math.Rectangle"], extendsWith:{elements:null, width:null, height:null, rows:null, columns:null, xcache:null, ycache:null, xycache:null, rectangle:null, r0:null, r1:null, initialize:function (a, b, c, d) {
    var e;
    this.elements = [];
    for (e = 0; e < c * d; e++)this.elements.push([]);
    this.width = a;
    this.height = b;
    this.rows = c;
    this.columns = d;
    this.xcache = [];
    for (e = 0; e < a; e++)this.xcache.push(e / (a / d) >> 0);
    this.ycache = [];
    for (e = 0; e < b; e++)this.ycache.push(e /
        (b / c) >> 0);
    this.xycache = [];
    for (e = 0; e < this.rows; e++) {
        this.xycache.push([]);
        for (c = 0; c < this.columns; c++)this.xycache[e].push(c + e * d)
    }
    this.rectangle = (new CAAT.Math.Rectangle).setBounds(0, 0, a, b);
    this.r0 = new CAAT.Math.Rectangle;
    this.r1 = new CAAT.Math.Rectangle;
    return this
}, clearObject:function () {
    var a;
    for (a = 0; a < this.rows * this.columns; a++)this.elements[a] = [];
    return this
}, addObject:function (a) {
    for (var b = this.__getCells(a.x | 0, a.y | 0, a.width | 0, a.height | 0), c = 0; c < b.length; c++)this.elements[b[c]].push(a)
}, __getCells:function (a, b, c, d) {
    var e = [];
    this.rectangle.contains(a, b) && e.push(this.xycache[this.ycache[b]][this.xcache[a]]);
    if (this.rectangle.contains(a + c - 1, b + d - 1)) {
        var f = this.xycache[this.ycache[b + d - 1]][this.xcache[a + c - 1]];
        if (f === e[0])return e;
        e.push(f)
    }
    if (this.rectangle.contains(a + c - 1, b)) {
        f = this.xycache[this.ycache[b]][this.xcache[a + c - 1]];
        if (f === e[0] || f === e[1])return e;
        e.push(f)
    }
    this.rectangle.contains(a + c - 1, b + d - 1) && (f = this.xycache[this.ycache[b + d - 1]][this.xcache[a]], e.push(f));
    return e
}, solveCollision:function (a) {
    var b;
    for (b = 0; b < this.elements.length; b++) {
        var c = this.elements[b];
        c.length > 1 && this._solveCollisionCell(c, a)
    }
}, _solveCollisionCell:function (a, b) {
    var c, d;
    for (c = 0; c < a.length; c++) {
        var e = a[c];
        this.r0.setBounds(e.x, e.y, e.width, e.height);
        for (d = c + 1; d < a.length; d++) {
            var f = a[d];
            this.r0.intersects(this.r1.setBounds(f.x, f.y, f.width, f.height)) && b(e, f)
        }
    }
}, collide:function (a, b, c, d, e) {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    var f = this.__getCells(a, b, c, d), g = this.elements;
    this.r0.setBounds(a, b, c, d);
    for (a = 0; a < f.length; a++) {
        d = g[f[a]];
        for (b = 0, c =
            d.length; b < c; b++) {
            var h = d[b];
            this.r1.setBounds(h.x, h.y, h.width, h.height);
            if (this.r0.intersects(this.r1) && e(h))return
        }
    }
}}});
CAAT.Module({defines:"CAAT.Module.TexturePacker.TextureElement", extendsWith:{inverted:false, image:null, u:0, v:0, glTexture:null}});
CAAT.Module({defines:"CAAT.Module.TexturePacker.TextureScan", depends:["CAAT.Module.TexturePacker.TextureElement"], extendsWith:{__init:function (a) {
    this.freeChunks = [
        {position:0, size:a || 1024}
    ];
    return this
}, freeChunks:null, findWhereFits:function (a) {
    if (this.freeChunks.length === 0)return[];
    var b = [], c;
    for (c = 0; c < this.freeChunks.length; c++)for (var d = 0; d + a <= this.freeChunks[c].size;)b.push(d + this.freeChunks[c].position), d += a;
    return b
}, fits:function (a, b) {
    for (var c = 0, c = 0; c < this.freeChunks.length; c++) {
        var d = this.freeChunks[c];
        if (d.position <= a && a + b <= d.position + d.size)return true
    }
    return false
}, substract:function (a, b) {
    for (var c = 0, c = 0; c < this.freeChunks.length; c++) {
        var d = this.freeChunks[c];
        if (d.position <= a && a + b <= d.position + d.size) {
            var e = 0, f = 0, g = 0, h = 0, e = d.position, f = a - d.position, g = a + b, h = d.position + d.size - g;
            this.freeChunks.splice(c, 1);
            f > 0 && this.freeChunks.splice(c++, 0, {position:e, size:f});
            h > 0 && this.freeChunks.splice(c, 0, {position:g, size:h});
            return true
        }
    }
    return false
}, log:function (a) {
    if (0 === this.freeChunks.length)CAAT.log("index " +
        a + " empty"); else {
        for (var a = "index " + a, b = 0; b < this.freeChunks.length; b++) {
            var c = this.freeChunks[b];
            a += "[" + c.position + "," + c.size + "]"
        }
        CAAT.log(a)
    }
}}});
CAAT.Module({defines:"CAAT.Module.TexturePacker.TextureScanMap", depends:["CAAT.Module.TexturePacker.TextureScan"], extendsWith:{__init:function (a, b) {
    this.scanMapHeight = b;
    this.scanMapWidth = a;
    this.scanMap = [];
    for (var c = 0; c < this.scanMapHeight; c++)this.scanMap.push(new CAAT.Module.TexturePacker.TextureScan(this.scanMapWidth));
    return this
}, scanMap:null, scanMapWidth:0, scanMapHeight:0, whereFitsChunk:function (a, b) {
    if (a > this.width || b > this.height)return null;
    for (var c, d, e = 0; e <= this.scanMapHeight - b;) {
        var f = null;
        for (c = false; e <= this.scanMapHeight - b; e++)if (f = this.scanMap[e].findWhereFits(a), null !== f && f.length > 0) {
            c = true;
            break
        }
        if (c) {
            for (d = 0; d < f.length; d++) {
                var g = true;
                for (c = e; c < e + b; c++)if (!this.scanMap[c].fits(f[d], a)) {
                    g = false;
                    break
                }
                if (g)return{x:f[d], y:e}
            }
            e++
        } else break
    }
    return null
}, substract:function (a, b, c, d) {
    for (var e = 0; e < d; e++)this.scanMap[e + b].substract(a, c) || CAAT.log("Error: removing chunk ", c, d, " at ", a, b)
}, log:function () {
    for (var a = 0; a < this.scanMapHeight; a++)this.scanMap[a].log(a)
}}});
CAAT.Module({defines:"CAAT.Module.TexturePacker.TexturePage", depends:["CAAT.Module.TexturePacker.TextureScanMap"], extendsWith:{__init:function (a, b) {
    this.width = a || 1024;
    this.height = b || 1024;
    this.images = [];
    return this
}, width:1024, height:1024, gl:null, texture:null, allowImagesInvertion:false, padding:4, scan:null, images:null, criteria:"area", initialize:function (a) {
    this.gl = a;
    a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    this.texture = a.createTexture();
    a.bindTexture(a.TEXTURE_2D, this.texture);
    a.enable(a.BLEND);
    a.blendFunc(a.ONE, a.ONE_MINUS_SRC_ALPHA);
    for (var b = new Uint8Array(this.width * this.height * 4), c = 0; c < 4 * this.width * this.height;)b[c++] = 0, b[c++] = 0, b[c++] = 0, b[c++] = 0;
    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, this.width, this.height, 0, a.RGBA, a.UNSIGNED_BYTE, b);
    a.enable(a.BLEND);
    for (b = 0; b < this.images.length; b++)c = this.images[b], c.inverted && (c = CAAT.Modules.Image.ImageUtil.rotate(c, -90)), a.texSubImage2D(a.TEXTURE_2D, 0, this.images[b].__tx, this.images[b].__ty, a.RGBA, a.UNSIGNED_BYTE, c)
}, create:function (a) {
    for (var b = [],
             c = 0; c < a.length; c++) {
        var d = a[c].image;
        d.__texturePage || b.push(d)
    }
    this.createFromImages(b)
}, clear:function () {
    this.createFromImages([])
}, update:function (a, b, c, d) {
    this.allowImagesInvertion = a;
    this.padding = b;
    c < 100 && (c = 100);
    d < 100 && (d = 100);
    this.width = c;
    this.height = d;
    this.createFromImages(this.images)
}, createFromImages:function (a) {
    var b;
    this.scan = new CAAT.Module.TexturePacker.TextureScanMap(this.width, this.height);
    this.images = [];
    if (this.allowImagesInvertion)for (b = 0; b < a.length; b++)a[b].inverted = this.allowImagesInvertion &&
        a[b].height < a[b].width;
    var c = this;
    a.sort(function (a, b) {
        var f = a.width * a.height, g = b.width * b.height;
        if (c.criteria === "width")return a.width < b.width ? 1 : a.width > b.width ? -1 : 0; else if (c.criteria === "height")return a.height < b.height ? 1 : a.height > b.height ? -1 : 0;
        return f < g ? 1 : f > g ? -1 : 0
    });
    for (b = 0; b < a.length; b++)this.packImage(a[b])
}, addImage:function (a, b, c) {
    this.allowImagesInvertion = b;
    this.padding = c;
    this.images.push(a);
    this.createFromImages(Array.prototype.slice.call(this.images))
}, endCreation:function () {
    var a = this.gl;
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR_MIPMAP_NEAREST);
    a.generateMipmap(a.TEXTURE_2D)
}, deletePage:function () {
    for (var a = 0; a < this.images.length; a++)delete this.images[a].__texturePage, delete this.images[a].__u, delete this.images[a].__v;
    this.gl.deleteTexture(this.texture)
}, toCanvas:function (a, b) {
    a = a || document.createElement("canvas");
    a.width = this.width;
    a.height = this.height;
    var c = a.getContext("2d");
    c.fillStyle = "rgba(0,0,0,0)";
    c.fillRect(0, 0, this.width, this.height);
    for (var d = 0; d < this.images.length; d++)if (c.drawImage(!this.images[d].inverted ? this.images[d] : CAAT.Modules.Image.ImageUtil.rotate(this.images[d], 90), this.images[d].__tx, this.images[d].__ty), b)c.strokeStyle = "red", c.strokeRect(this.images[d].__tx, this.images[d].__ty, this.images[d].__w, this.images[d].__h);
    if (b)c.strokeStyle = "red", c.strokeRect(0, 0, this.width, this.height);
    return a
}, packImage:function (a) {
    var b, c;
    a.inverted ? (b = a.height, c = a.width) : (b = a.width, c = a.height);
    var d = b, e = c, f;
    if (d && this.padding)f = this.padding, d + f <= this.width && (d += f);
    if (e && this.padding)f = this.padding, e + f <= this.height && (e += f);
    f = this.scan.whereFitsChunk(d, e);
    null !== f ? (this.images.push(a), a.__tx = f.x, a.__ty = f.y, a.__u = f.x / this.width, a.__v = f.y / this.height, a.__u1 = (f.x + b) / this.width, a.__v1 = (f.y + c) / this.height, a.__texturePage = this, a.__w = b, a.__h = c, this.scan.substract(f.x, f.y, d, e)) : CAAT.log("Imagen ", a.src, " de tamano ", a.width, a.height, " no cabe.")
}, changeHeuristic:function (a) {
    this.criteria = a
}}});
CAAT.Module({defines:"CAAT.Module.TexturePacker.TexturePageManager", depends:["CAAT.Module.TexturePacker.TexturePage"], extendsWith:{__init:function () {
    this.pages = [];
    return this
}, pages:null, createPages:function (a, b, c, d) {
    for (var e = false; !e;) {
        e = new CAAT.Module.TexturePacker.TexturePage(b, c);
        e.create(d);
        e.initialize(a);
        e.endCreation();
        this.pages.push(e);
        for (var e = true, f = 0; f < d.length; f++)if (!d[f].image.__texturePage) {
            d[f].image.width <= b && d[f].image.height <= c && (e = false);
            break
        }
    }
}, deletePages:function () {
    for (var a =
        0; a < this.pages.length; a++)this.pages[a].deletePage();
    this.pages = null
}}});
CAAT.Module({defines:"CAAT.Module.LayoutUtils.RowLayout", constants:{Row:function (a, b, c) {
    for (var d = a.width, e = 0, f = 0, g = 0, h = 0, h = -Number.MAX_VALUE, i = Number.MAX_VALUE, g = b.length - 1; g; g -= 1) {
        if (i < b[g].width)i = b[g].width;
        if (h < b[g].height)h = b[g].height
    }
    if (c.padding_left)e = c.padding_left, d -= e;
    c.padding_right && (d -= c.padding_right);
    if (c.top && (f = parseInt(c.top, 10), isNaN(f)))switch (c.top) {
        case "center":
            f = (a.height - h) / 2;
            break;
        case "top":
            f = 0;
            break;
        case "bottom":
            f = a.height - h;
            break;
        default:
            f = 0
    }
    a = d / b.length;
    for (g = 0, h =
        b.length; g < h; g++)b[g].setLocation(e + g * a + (a - b[g].width) / 2, f)
}}});
CAAT.Module({defines:"CAAT.Module.Initialization.Template", depends:["CAAT.Foundation.Director", "CAAT.Module.Preloader.ImagePreloader"], constants:{init:function (a, b, c, d, e) {
    var c = document.getElementById(c), f;
    if (CAAT.__CSS__)c && false === c instanceof HTMLDivElement && (c = null), c === null && (c = document.createElement("div"), document.body.appendChild(c)), f = (new CAAT.Director).initialize(a || 800, b || 600, c); else {
        if (c)if (c instanceof HTMLDivElement) {
            var g = document.createElement("canvas");
            c.appendChild(g);
            c = g
        } else false ==
            c instanceof HTMLCanvasElement && (g = document.createElement("canvas"), document.body.appendChild(g), c = g); else c = document.createElement("canvas"), document.body.appendChild(c);
        f = (new CAAT.Foundation.Director).initialize(a || 800, b || 600, c)
    }
    (new CAAT.Module.Preloader.ImagePreloader).loadImages(d, function (a, b) {
        a === b.length && (f.emptyScenes(), f.setImagesCache(b), e(f), f.easeIn(0, CAAT.Foundation.Scene.EASE_SCALE, 2E3, false, CAAT.Foundation.Actor.ANCHOR_CENTER, (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(2.5,
            0.4)), CAAT.loop(60))
    })
}}});
CAAT.Module({defines:"CAAT.Module.Initialization.TemplateWithSplash", depends:["CAAT.Foundation.Director", "CAAT.Module.Preloader.ImagePreloader"], constants:{init:function (a, b, c, d, e, f, g, h) {
    function i(a, b, c) {
        var d = a.getImage("spinner"), e = a.getImage("splash"), g = a.createScene(), f = (new Date).getTime();
        e && g.addChild((new CAAT.Foundation.Actor).setBackgroundImage(e, false).setBounds(0, 0, a.width, a.height).setImageTransformation(CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE));
        d && g.addChild((new CAAT.Foundation.Actor).setBackgroundImage(d).centerAt(g.width / 2,
            g.height / 2).addBehavior((new CAAT.Behavior.RotateBehavior).setValues(0, 2 * Math.PI).setFrameTime(0, 1E3).setCycle(true)));
        g.loadedImage = function (d, e) {
            if (!e || d === e.length) {
                var g = (new Date).getTime() - f;
                g < b ? (g = Math.abs(b - g), g > b && (g = b), setTimeout(function () {
                    j(a, e, c)
                }, g)) : j(a, e, c)
            }
        };
        return g
    }

    function j(a, b, c) {
        a.emptyScenes();
        a.setImagesCache(b);
        a.setClear(true);
        c(a);
        a.setClear(CAAT.Foundation.Director.CLEAR_ALL);
        a.easeIn(0, CAAT.Foundation.Scene.EASE_SCALE, 2E3, false, CAAT.Foundation.Actor.ANCHOR_CENTER, (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(2.5,
            0.4))
    }

    var c = document.getElementById(c), m;
    if (CAAT.__CSS__)c && false === c instanceof HTMLDivElement && (c = null), c === null && (c = document.createElement("div"), document.body.appendChild(c)); else if (c)if (c instanceof HTMLDivElement) {
        var k = document.createElement("canvas");
        c.appendChild(k);
        c = k
    } else false == c instanceof HTMLCanvasElement && (k = document.createElement("canvas"), document.body.appendChild(k), c = k); else c = document.createElement("canvas"), document.body.appendChild(c);
    m = (new CAAT.Foundation.Director).initialize(a ||
        800, b || 600, c);
    a = [];
    g && a.push({id:"splash", url:g});
    h && a.push({id:"spinner", url:h});
    m.setClear(CAAT.Foundation.Director.CLEAR_DIRTY_RECTS);
    (new CAAT.Module.Preloader.ImagePreloader).loadImages(a, function (a, b) {
        if (a === b.length) {
            m.setImagesCache(b);
            var c = i(m, d || 5E3, f);
            CAAT.loop(60);
            e && e.length > 0 ? (new CAAT.Module.Preloader.ImagePreloader).loadImages(e, c.loadedImage) : c.loadedImage(0, null)
        }
    })
}}});
CAAT.Module({defines:"CAAT.PathUtil.PathSegment", depends:["CAAT.Math.Rectangle", "CAAT.Math.Point", "CAAT.Math.Matrix", "CAAT.Math.Curve"], extendsWith:function () {
    return{__init:function () {
        this.bbox = new CAAT.Math.Rectangle;
        return this
    }, color:"#000", length:0, bbox:null, parent:null, setParent:function (a) {
        this.parent = a;
        return this
    }, setColor:function (a) {
        if (a)this.color = a;
        return this
    }, endCurvePosition:function () {
    }, startCurvePosition:function () {
    }, setPoints:function () {
    }, setPoint:function () {
    }, getPosition:function () {
    },
        getLength:function () {
            return this.length
        }, getBoundingBox:function () {
            return this.bbox
        }, numControlPoints:function () {
        }, getControlPoint:function () {
        }, endPath:function () {
        }, getContour:function () {
        }, updatePath:function () {
        }, applyAsPath:function () {
        }, transform:function () {
        }, drawHandle:function (a, b, c) {
            a.beginPath();
            a.arc(b, c, CAAT.Math.Curve.prototype.HANDLE_SIZE / 2, 0, 2 * Math.PI, false);
            a.fill()
        }}
}});
CAAT.Module({defines:"CAAT.PathUtil.ArcPath", depends:["CAAT.PathUtil.PathSegment", "CAAT.Math.Point", "CAAT.Math.Rectangle"], aliases:["CAAT.ArcPath"], extendsClass:"CAAT.PathUtil.PathSegment", extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.points = [];
        this.points.push(new CAAT.Math.Point);
        this.points.push(new CAAT.Math.Point);
        this.newPosition = new CAAT.Math.Point;
        return this
    }, points:null, length:-1, cw:true, bbox:null, newPosition:null, radius:0, startAngle:0, angle:2 * Math.PI, arcTo:false, setRadius:function (a) {
        this.radius =
            a;
        return this
    }, isArcTo:function () {
        return this.arcTo
    }, setArcTo:function (a) {
        this.arcTo = a;
        return this
    }, initialize:function (a, b, c, d) {
        this.setInitialPosition(a, b);
        this.setFinalPosition(a + c, b);
        this.angle = d || 2 * Math.PI;
        return this
    }, applyAsPath:function (a) {
        a = a.ctx;
        this.arcTo ? a.arcTo(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.radius) : a.arc(this.points[0].x, this.points[0].y, this.radius, this.startAngle, this.angle + this.startAngle, this.cw);
        return this
    }, setPoint:function (a, b) {
        b >= 0 &&
            b < this.points.length && (this.points[b] = a)
    }, setPoints:function (a) {
        this.points = [];
        this.points[0] = a[0];
        this.points[1] = a[1];
        this.updatePath();
        return this
    }, setClockWise:function (a) {
        this.cw = a !== void 0 ? a : true;
        return this
    }, isClockWise:function () {
        return this.cw
    }, setInitialPosition:function (a, b) {
        for (var c = 0, d = this.points.length; c < d; c++)this.points[0].x = a, this.points[0].y = b;
        return this
    }, setFinalPosition:function (a, b) {
        this.points[1].x = a;
        this.points[1].y = b;
        this.updatePath(this.points[1]);
        return this
    }, endCurvePosition:function () {
        return this.points[0]
    },
        startCurvePosition:function () {
            return this.points[0]
        }, getPosition:function (a) {
            if (a > 1 || a < 0)a %= 1;
            a < 0 && (a = 1 + a);
            -1 === this.length ? this.newPosition.set(this.points[0].x, this.points[0].y) : (a = this.angle * a * (this.cw ? 1 : -1) + this.startAngle, this.newPosition.set(this.points[0].x + this.radius * Math.cos(a), this.points[0].y + this.radius * Math.sin(a)));
            return this.newPosition
        }, initialPositionX:function () {
            return this.points[0].x
        }, finalPositionX:function () {
            return this.points[1].x
        }, paint:function (a, b) {
            var c = a.ctx;
            c.save();
            c.strokeStyle = this.color;
            c.beginPath();
            this.arcTo ? c.arcTo(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.radius) : c.arc(this.points[0].x, this.points[0].y, this.radius, this.startAngle, this.startAngle + this.angle, this.cw);
            c.stroke();
            if (b) {
                c.globalAlpha = 0.5;
                c.fillStyle = "#7f7f00";
                for (var d = 0; d < this.points.length; d++)this.drawHandle(c, this.points[d].x, this.points[d].y)
            }
            c.restore()
        }, numControlPoints:function () {
            return this.points.length
        }, getControlPoint:function (a) {
            return this.points[a]
        },
        getContour:function (a) {
            for (var b = [], c = 0; c < a; c++)b.push({x:this.points[0].x + this.radius * Math.cos(c * Math.PI / (a / 2)), y:this.points[0].y + this.radius * Math.sin(c * Math.PI / (a / 2))});
            return b
        }, getPositionFromLength:function (a) {
            return this.getPosition(a / this.length * (this.cw ? 1 : -1))
        }, updatePath:function (a) {
            if (this.points[1] === a) {
                if (!this.arcTo)this.radius = Math.sqrt((this.points[0].x - this.points[1].x) * (this.points[0].x - this.points[1].x) + (this.points[0].y - this.points[1].y) * (this.points[0].y - this.points[1].y));
                this.length =
                    this.angle * this.radius;
                this.startAngle = Math.atan2(this.points[1].y - this.points[0].y, this.points[1].x - this.points[0].x)
            } else this.points[0] === a && this.points[1].set(this.points[0].x + this.radius * Math.cos(this.startAngle), this.points[0].y + this.radius * Math.sin(this.startAngle));
            this.bbox.setEmpty();
            this.bbox.x = this.points[0].x - this.radius;
            this.bbox.y = this.points[0].y - this.radius;
            this.bbox.x1 = this.points[0].x + this.radius;
            this.bbox.y1 = this.points[0].y + this.radius;
            this.bbox.width = 2 * this.radius;
            this.bbox.height =
                2 * this.radius;
            return this
        }}
}});
CAAT.Module({defines:"CAAT.PathUtil.CurvePath", depends:["CAAT.PathUtil.PathSegment", "CAAT.Math.Point", "CAAT.Math.Bezier"], aliases:["CAAT.CurvePath"], extendsClass:"CAAT.PathUtil.PathSegment", extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.newPosition = new CAAT.Math.Point(0, 0, 0);
        return this
    }, curve:null, newPosition:null, applyAsPath:function (a) {
        this.curve.applyAsPath(a);
        return this
    }, setPoint:function (a, b) {
        this.curve && this.curve.setPoint(a, b)
    }, setPoints:function (a) {
        var b = new CAAT.Math.Bezier;
        b.setPoints(a);
        this.curve = b;
        return this
    }, setQuadric:function (a, b, c, d, e, f) {
        var g = new CAAT.Bezier;
        g.setQuadric(a, b, c, d, e, f);
        this.curve = g;
        this.updatePath();
        return this
    }, setCubic:function (a, b, c, d, e, f, g, h) {
        var i = new CAAT.Bezier;
        i.setCubic(a, b, c, d, e, f, g, h);
        this.curve = i;
        this.updatePath();
        return this
    }, updatePath:function () {
        this.curve.update();
        this.length = this.curve.getLength();
        this.curve.getBoundingBox(this.bbox);
        return this
    }, getPosition:function (a) {
        if (a > 1 || a < 0)a %= 1;
        a < 0 && (a = 1 + a);
        this.curve.solve(this.newPosition,
            a);
        return this.newPosition
    }, getPositionFromLength:function (a) {
        this.curve.solve(this.newPosition, a / this.length);
        return this.newPosition
    }, initialPositionX:function () {
        return this.curve.coordlist[0].x
    }, finalPositionX:function () {
        return this.curve.coordlist[this.curve.coordlist.length - 1].x
    }, paint:function (a, b) {
        this.curve.drawHandles = b;
        a.ctx.strokeStyle = this.color;
        this.curve.paint(a, b)
    }, numControlPoints:function () {
        return this.curve.coordlist.length
    }, getControlPoint:function (a) {
        return this.curve.coordlist[a]
    },
        endCurvePosition:function () {
            return this.curve.endCurvePosition()
        }, startCurvePosition:function () {
            return this.curve.startCurvePosition()
        }, getContour:function (a) {
            for (var b = [], c = 0; c <= a; c++)b.push({x:c / a, y:this.getPosition(c / a).y});
            return b
        }}
}});
CAAT.Module({defines:"CAAT.PathUtil.LinearPath", depends:["CAAT.PathUtil.PathSegment", "CAAT.Math.Point"], aliases:["CAAT.LinearPath"], extendsClass:"CAAT.PathUtil.PathSegment", extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.points = [];
        this.points.push(new CAAT.Math.Point);
        this.points.push(new CAAT.Math.Point);
        this.newPosition = new CAAT.Point(0, 0, 0);
        return this
    }, points:null, newPosition:null, applyAsPath:function (a) {
        a.ctx.lineTo(this.points[1].x, this.points[1].y)
    }, setPoint:function (a, b) {
        b === 0 ? this.points[0] = a : b === 1 && (this.points[1] = a)
    }, updatePath:function () {
        var a = this.points[1].x - this.points[0].x, b = this.points[1].y - this.points[0].y;
        this.length = Math.sqrt(a * a + b * b);
        this.bbox.setEmpty();
        this.bbox.union(this.points[0].x, this.points[0].y);
        this.bbox.union(this.points[1].x, this.points[1].y);
        return this
    }, setPoints:function (a) {
        this.points[0] = a[0];
        this.points[1] = a[1];
        this.updatePath();
        return this
    }, setInitialPosition:function (a, b) {
        this.points[0].x = a;
        this.points[0].y = b;
        this.newPosition.set(a,
            b);
        return this
    }, setFinalPosition:function (a, b) {
        this.points[1].x = a;
        this.points[1].y = b;
        return this
    }, endCurvePosition:function () {
        return this.points[1]
    }, startCurvePosition:function () {
        return this.points[0]
    }, getPosition:function (a) {
        if (a > 1 || a < 0)a %= 1;
        a < 0 && (a = 1 + a);
        this.newPosition.set(this.points[0].x + (this.points[1].x - this.points[0].x) * a, this.points[0].y + (this.points[1].y - this.points[0].y) * a);
        return this.newPosition
    }, getPositionFromLength:function (a) {
        return this.getPosition(a / this.length)
    }, initialPositionX:function () {
        return this.points[0].x
    },
        finalPositionX:function () {
            return this.points[1].x
        }, paint:function (a, b) {
            var c = a.ctx;
            c.save();
            c.strokeStyle = this.color;
            c.beginPath();
            c.moveTo(this.points[0].x, this.points[0].y);
            c.lineTo(this.points[1].x, this.points[1].y);
            c.stroke();
            if (b)c.globalAlpha = 0.5, c.fillStyle = "#7f7f00", c.beginPath(), this.drawHandle(c, this.points[0].x, this.points[0].y), this.drawHandle(c, this.points[1].x, this.points[1].y);
            c.restore()
        }, numControlPoints:function () {
            return 2
        }, getControlPoint:function (a) {
            if (0 === a)return this.points[0];
            else if (1 === a)return this.points[1]
        }, getContour:function () {
            var a = [];
            a.push(this.getPosition(0).clone());
            a.push(this.getPosition(1).clone());
            return a
        }}
}});
CAAT.Module({defines:"CAAT.PathUtil.RectPath", depends:["CAAT.PathUtil.PathSegment", "CAAT.Math.Point", "CAAT.Math.Rectangle"], aliases:["CAAT.RectPath", "CAAT.ShapePath"], extendsClass:"CAAT.PathUtil.PathSegment", extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.points = [];
        this.points.push(new CAAT.Math.Point);
        this.points.push(new CAAT.Math.Point);
        this.points.push(new CAAT.Math.Point);
        this.points.push(new CAAT.Math.Point);
        this.points.push(new CAAT.Math.Point);
        this.newPosition = new CAAT.Math.Point;
        return this
    }, points:null, length:-1, cw:true, bbox:null, newPosition:null, applyAsPath:function (a) {
        a = a.ctx;
        this.cw ? (a.lineTo(this.points[0].x, this.points[0].y), a.lineTo(this.points[1].x, this.points[1].y), a.lineTo(this.points[2].x, this.points[2].y), a.lineTo(this.points[3].x, this.points[3].y), a.lineTo(this.points[4].x, this.points[4].y)) : (a.lineTo(this.points[4].x, this.points[4].y), a.lineTo(this.points[3].x, this.points[3].y), a.lineTo(this.points[2].x, this.points[2].y), a.lineTo(this.points[1].x, this.points[1].y),
            a.lineTo(this.points[0].x, this.points[0].y));
        return this
    }, setPoint:function (a, b) {
        b >= 0 && b < this.points.length && (this.points[b] = a)
    }, setPoints:function (a) {
        this.points = [];
        this.points.push(a[0]);
        this.points.push((new CAAT.Point).set(a[1].x, a[0].y));
        this.points.push(a[1]);
        this.points.push((new CAAT.Point).set(a[0].x, a[1].y));
        this.points.push(a[0].clone());
        this.updatePath();
        return this
    }, setClockWise:function (a) {
        this.cw = a !== void 0 ? a : true;
        return this
    }, isClockWise:function () {
        return this.cw
    }, setInitialPosition:function (a, b) {
        for (var c = 0, d = this.points.length; c < d; c++)this.points[c].x = a, this.points[c].y = b;
        return this
    }, setFinalPosition:function (a, b) {
        this.points[2].x = a;
        this.points[2].y = b;
        this.points[1].x = a;
        this.points[1].y = this.points[0].y;
        this.points[3].x = this.points[0].x;
        this.points[3].y = b;
        this.points[4].x = this.points[0].x;
        this.points[4].y = this.points[0].y;
        this.updatePath();
        return this
    }, endCurvePosition:function () {
        return this.points[4]
    }, startCurvePosition:function () {
        return this.points[0]
    }, getPosition:function (a) {
        if (a >
            1 || a < 0)a %= 1;
        a < 0 && (a = 1 + a);
        if (-1 === this.length)this.newPosition.set(0, 0); else {
            var b = this.bbox.width / this.length, c = this.bbox.height / this.length, d = 0, e, f = 0;
            this.cw ? (e = [0, 1, 2, 3, 4], b = [b, c, b, c]) : (e = [4, 3, 2, 1, 0], b = [c, b, c, b]);
            for (; f < b.length;)if (d + b[f] < a)d += b[f], f++; else break;
            a -= d;
            d = e[f];
            e = e[f + 1];
            this.newPosition.set(this.points[d].x + (this.points[e].x - this.points[d].x) * a / b[f], this.points[d].y + (this.points[e].y - this.points[d].y) * a / b[f])
        }
        return this.newPosition
    }, initialPositionX:function () {
        return this.points[0].x
    },
        finalPositionX:function () {
            return this.points[2].x
        }, paint:function (a, b) {
            var c = a.ctx;
            c.save();
            c.strokeStyle = this.color;
            c.beginPath();
            c.strokeRect(this.bbox.x, this.bbox.y, this.bbox.width, this.bbox.height);
            if (b) {
                c.globalAlpha = 0.5;
                c.fillStyle = "#7f7f00";
                for (var d = 0; d < this.points.length; d++)this.drawHandle(c, this.points[d].x, this.points[d].y)
            }
            c.restore()
        }, numControlPoints:function () {
            return this.points.length
        }, getControlPoint:function (a) {
            return this.points[a]
        }, getContour:function () {
            for (var a = [], b = 0; b < this.points.length; b++)a.push(this.points[b]);
            return a
        }, updatePath:function (a) {
            if (a) {
                if (a === this.points[0])this.points[1].y = a.y, this.points[3].x = a.x; else if (a === this.points[1])this.points[0].y = a.y, this.points[2].x = a.x; else if (a === this.points[2])this.points[3].y = a.y, this.points[1].x = a.x; else if (a === this.points[3])this.points[0].x = a.x, this.points[2].y = a.y;
                this.points[4].x = this.points[0].x;
                this.points[4].y = this.points[0].y
            }
            this.bbox.setEmpty();
            for (a = 0; a < 4; a++)this.bbox.union(this.points[a].x, this.points[a].y);
            this.length = 2 * this.bbox.width + 2 * this.bbox.height;
            this.points[0].x = this.bbox.x;
            this.points[0].y = this.bbox.y;
            this.points[1].x = this.bbox.x + this.bbox.width;
            this.points[1].y = this.bbox.y;
            this.points[2].x = this.bbox.x + this.bbox.width;
            this.points[2].y = this.bbox.y + this.bbox.height;
            this.points[3].x = this.bbox.x;
            this.points[3].y = this.bbox.y + this.bbox.height;
            this.points[4].x = this.bbox.x;
            this.points[4].y = this.bbox.y;
            return this
        }, getPositionFromLength:function (a) {
            return this.getPosition(a / (this.bbox.width * 2 + this.bbox.height * 2))
        }}
}});
CAAT.Module({defines:"CAAT.PathUtil.Path", aliases:["CAAT.Path"], depends:"CAAT.PathUtil.PathSegment,CAAT.PathUtil.ArcPath,CAAT.PathUtil.CurvePath,CAAT.PathUtil.LinearPath,CAAT.PathUtil.RectPath,CAAT.Math.Bezier,CAAT.Math.CatmullRom,CAAT.Math.Point,CAAT.Math.Matrix".split(","), extendsClass:"CAAT.PathUtil.PathSegment", extendsWith:{__init:function () {
    this.__super();
    this.newPosition = new CAAT.Math.Point(0, 0, 0);
    this.pathSegments = [];
    this.behaviorList = [];
    this.matrix = new CAAT.Math.Matrix;
    this.tmpMatrix = new CAAT.Math.Matrix;
    return this
}, pathSegments:null, pathSegmentDurationTime:null, pathSegmentStartTime:null, newPosition:null, pathLength:-1, beginPathX:-1, beginPathY:-1, trackPathX:-1, trackPathY:-1, ax:-1, ay:-1, point:[], interactive:true, behaviorList:null, rb_angle:0, rb_rotateAnchorX:0.5, rb_rotateAnchorY:0.5, sb_scaleX:1, sb_scaleY:1, sb_scaleAnchorX:0.5, sb_scaleAnchorY:0.5, tAnchorX:0, tAnchorY:0, tb_x:0, tb_y:0, matrix:null, tmpMatrix:null, pathPoints:null, width:0, height:0, clipOffsetX:0, clipOffsetY:0, applyAsPath:function (a) {
    var b = a.ctx;
    a.modelViewMatrix.transformRenderingContext(b);
    b.beginPath();
    b.globalCompositeOperation = "source-out";
    b.moveTo(this.getFirstPathSegment().startCurvePosition().x, this.getFirstPathSegment().startCurvePosition().y);
    for (var c = 0; c < this.pathSegments.length; c++)this.pathSegments[c].applyAsPath(a);
    b.globalCompositeOperation = "source-over";
    return this
}, setInteractive:function (a) {
    this.interactive = a;
    return this
}, getFirstPathSegment:function () {
    return this.pathSegments.length ? this.pathSegments[0] : null
}, getLastPathSegment:function () {
    return this.pathSegments.length ?
        this.pathSegments[this.pathSegments.length - 1] : null
}, endCurvePosition:function () {
    return this.pathSegments.length ? this.pathSegments[this.pathSegments.length - 1].endCurvePosition() : (new CAAT.Math.Point).set(this.beginPathX, this.beginPathY)
}, startCurvePosition:function () {
    return this.pathSegments[0].startCurvePosition()
}, getCurrentPathSegment:function () {
    return this.pathSegments[this.pathSegments.length - 1]
}, setLinear:function (a, b, c, d) {
    this.beginPath(a, b);
    this.addLineTo(c, d);
    this.endPath();
    return this
}, setQuadric:function (a, b, c, d, e, f) {
    this.beginPath(a, b);
    this.addQuadricTo(c, d, e, f);
    this.endPath();
    return this
}, setCubic:function (a, b, c, d, e, f, g, h) {
    this.beginPath(a, b);
    this.addCubicTo(c, d, e, f, g, h);
    this.endPath();
    return this
}, setRectangle:function (a, b, c, d) {
    this.beginPath(a, b);
    this.addRectangleTo(c, d);
    this.endPath();
    return this
}, setCatmullRom:function (a, b) {
    b && (a = a.slice(0), a.unshift(a[a.length - 1]), a.push(a[1]), a.push(a[2]));
    for (var c = 1; c < a.length - 2; c++) {
        var d = (new CAAT.PathUtil.CurvePath).setColor("#000").setParent(this), e = (new CAAT.Math.CatmullRom).setCurve(a[c -
            1], a[c], a[c + 1], a[c + 2]);
        d.curve = e;
        this.pathSegments.push(d)
    }
    return this
}, addSegment:function (a) {
    a.setParent(this);
    this.pathSegments.push(a);
    return this
}, addArcTo:function (a, b, c, d, e, f, g) {
    f = new CAAT.PathUtil.ArcPath;
    f.setArcTo(true);
    f.setRadius(e);
    f.setInitialPosition(a, b).setFinalPosition(c, d);
    f.setParent(this);
    f.setColor(g);
    this.pathSegments.push(f);
    return this
}, addRectangleTo:function (a, b, c, d) {
    var e = new CAAT.PathUtil.RectPath;
    e.setPoints([this.endCurvePosition(), (new CAAT.Math.Point).set(a, b)]);
    e.setClockWise(c);
    e.setColor(d);
    e.setParent(this);
    this.pathSegments.push(e);
    return this
}, addQuadricTo:function (a, b, c, d, e) {
    var f = new CAAT.Math.Bezier;
    f.setPoints([this.endCurvePosition(), (new CAAT.Math.Point).set(a, b), (new CAAT.Math.Point).set(c, d)]);
    this.trackPathX = c;
    this.trackPathY = d;
    a = (new CAAT.PathUtil.CurvePath).setColor(e).setParent(this);
    a.curve = f;
    this.pathSegments.push(a);
    return this
}, addCubicTo:function (a, b, c, d, e, f, g) {
    var h = new CAAT.Math.Bezier;
    h.setPoints([this.endCurvePosition(), (new CAAT.Math.Point).set(a,
        b), (new CAAT.Math.Point).set(c, d), (new CAAT.Math.Point).set(e, f)]);
    this.trackPathX = e;
    this.trackPathY = f;
    a = (new CAAT.PathUtil.CurvePath).setColor(g).setParent(this);
    a.curve = h;
    this.pathSegments.push(a);
    return this
}, addCatmullTo:function (a, b, c, d, e, f, g) {
    g = (new CAAT.Math.CatmullRom).setColor(g);
    g.setCurve(this.trackPathX, this.trackPathY, a, b, c, d, e, f);
    this.trackPathX = e;
    this.trackPathY = f;
    a = (new CAAT.PathUtil.CurvePath).setParent(this);
    a.curve = g;
    this.pathSegments.push(a);
    return this
}, addLineTo:function (a, b, c) {
    c = (new CAAT.PathUtil.LinearPath).setColor(c);
    c.setPoints([this.endCurvePosition(), (new CAAT.Math.Point).set(a, b)]);
    c.setParent(this);
    this.trackPathX = a;
    this.trackPathY = b;
    this.pathSegments.push(c);
    return this
}, beginPath:function (a, b) {
    this.trackPathX = a;
    this.trackPathY = b;
    this.beginPathX = a;
    this.beginPathY = b;
    return this
}, closePath:function () {
    this.getLastPathSegment().setPoint(this.getFirstPathSegment().startCurvePosition(), this.getLastPathSegment().numControlPoints() - 1);
    this.trackPathX = this.beginPathX;
    this.trackPathY = this.beginPathY;
    this.endPath();
    return this
}, endPath:function () {
    this.pathSegmentStartTime = [];
    this.pathSegmentDurationTime = [];
    this.updatePath();
    return this
}, getPosition:function (a) {
    if (a > 1 || a < 0)a %= 1;
    a < 0 && (a = 1 + a);
    for (var b = this.pathSegments, c = this.pathSegmentStartTime, d = this.pathSegmentDurationTime, e = 0, f = b.length, g, h = this.newPosition, i; e !== f;)if (g = (f + e) / 2 | 0, i = c[g], i <= a && a <= i + d[g])return a = d[g] ? (a - i) / d[g] : 0, a = b[g].getPosition(a), h.x = a.x, h.y = a.y, h; else a < i ? f = g : e = g + 1;
    return this.endCurvePosition()
},
    getPositionFromLength:function (a) {
        a %= this.getLength();
        a < 0 && (a += this.getLength());
        for (var b = 0, c = 0; c < this.pathSegments.length; c++) {
            if (b <= a && a <= this.pathSegments[c].getLength() + b) {
                a -= b;
                a = this.pathSegments[c].getPositionFromLength(a);
                this.newPosition.x = a.x;
                this.newPosition.y = a.y;
                break
            }
            b += this.pathSegments[c].getLength()
        }
        return this.newPosition
    }, paint:function (a) {
        for (var b = 0; b < this.pathSegments.length; b++)this.pathSegments[b].paint(a, this.interactive)
    }, release:function () {
        this.ay = this.ax = -1
    }, getNumSegments:function () {
        return this.pathSegments.length
    },
    getSegment:function (a) {
        return this.pathSegments[a]
    }, numControlPoints:function () {
        return this.points.length
    }, getControlPoint:function (a) {
        return this.points[a]
    }, updatePath:function (a, b) {
        var c, d;
        this.length = 0;
        this.bbox.setEmpty();
        this.points = [];
        var e = Number.MAX_VALUE, f = Number.MAX_VALUE;
        for (c = 0; c < this.pathSegments.length; c++) {
            this.pathSegments[c].updatePath(a);
            this.length += this.pathSegments[c].getLength();
            this.bbox.unionRectangle(this.pathSegments[c].bbox);
            for (d = 0; d < this.pathSegments[c].numControlPoints(); d++) {
                var g =
                    this.pathSegments[c].getControlPoint(d);
                this.points.push(g);
                if (g.x < e)e = g.x;
                if (g.y < f)f = g.y
            }
        }
        this.clipOffsetX = -e;
        this.clipOffsetY = -f;
        this.width = this.bbox.width;
        this.height = this.bbox.height;
        this.setLocation(this.bbox.x, this.bbox.y);
        this.pathSegmentStartTime = [];
        this.pathSegmentDurationTime = [];
        for (c = 0; c < this.pathSegments.length; c++)this.pathSegmentStartTime.push(0), this.pathSegmentDurationTime.push(0);
        for (c = 0; c < this.pathSegments.length; c++)this.pathSegmentDurationTime[c] = this.getLength() ? this.pathSegments[c].getLength() /
            this.getLength() : 0, c > 0 ? this.pathSegmentStartTime[c] = this.pathSegmentStartTime[c - 1] + this.pathSegmentDurationTime[c - 1] : this.pathSegmentStartTime[0] = 0, this.pathSegments[c].endPath();
        this.extractPathPoints();
        b && b(this);
        return this
    }, press:function (a, b) {
        if (this.interactive) {
            for (var c = CAAT.Math.Curve.prototype.HANDLE_SIZE / 2, d = 0; d < this.pathSegments.length; d++)for (var e = 0; e < this.pathSegments[d].numControlPoints(); e++) {
                var f = this.pathSegments[d].getControlPoint(e);
                if (a >= f.x - c && b >= f.y - c && a < f.x + c && b < f.y + c) {
                    this.point =
                        f;
                    return
                }
            }
            this.point = null
        }
    }, drag:function (a, b, c) {
        if (this.interactive && null !== this.point) {
            if (-1 === this.ax || -1 === this.ay)this.ax = a, this.ay = b;
            this.point.x += a - this.ax;
            this.point.y += b - this.ay;
            this.ax = a;
            this.ay = b;
            this.updatePath(this.point, c)
        }
    }, getContour:function (a) {
        for (var b = [], c = 0; c <= a; c++)b.push((new CAAT.Math.Point).set(c / a, this.getPosition(c / a).y, 0));
        return b
    }, setPoints:function (a) {
        if (this.points.length === a.length)for (var b = 0; b < a.length; b++)this.points[b].x = a[b].x, this.points[b].y = a[b].y;
        return this
    },
    setPoint:function (a, b) {
        if (b >= 0 && b < this.points.length)this.points[b].x = a.x, this.points[b].y = a.y;
        return this
    }, emptyBehaviorList:function () {
        this.behaviorList = [];
        return this
    }, extractPathPoints:function () {
        if (!this.pathPoints) {
            var a;
            this.pathPoints = [];
            for (a = 0; a < this.numControlPoints(); a++)this.pathPoints.push(this.getControlPoint(a).clone())
        }
        return this
    }, addBehavior:function (a) {
        this.behaviorList.push(a);
        return this
    }, removeBehaviour:function (a) {
        for (var b = this.behaviorList.length - 1; b;)if (this.behaviorList[b] ===
            a) {
            this.behaviorList.splice(b, 1);
            break
        }
        return this
    }, removeBehaviorById:function (a) {
        for (var b = 0; b < this.behaviorList.length; b++)this.behaviorList[b].id === a && this.behaviorList.splice(b, 1);
        return this
    }, applyBehaviors:function (a) {
        for (var b = 0; b < this.behaviorList.length; b++)this.behaviorList[b].apply(a, this);
        this.setATMatrix();
        for (b = 0; b < this.numControlPoints(); b++)this.setPoint(this.matrix.transformCoord(this.pathPoints[b].clone().translate(this.clipOffsetX, this.clipOffsetY)), b);
        return this
    }, setATMatrix:function () {
        this.matrix.identity();
        this.tmpMatrix.identity();
        var a = this.matrix.matrix, b, c, d, e, f, g, h, i, j, m;
        h = this.bbox;
        var k = h.width, n = h.height, l = h.x, p = h.y;
        h = 1;
        j = e = 0;
        g = 1;
        i = this.tb_x - l - this.tAnchorX * k;
        m = this.tb_y - p - this.tAnchorY * n;
        if (this.rb_angle) {
            var o = this.rb_rotateAnchorX * k + l, q = this.rb_rotateAnchorY * n + p;
            i += h * o + e * q;
            m += j * o + g * q;
            b = Math.cos(this.rb_angle);
            c = Math.sin(this.rb_angle);
            d = h;
            f = j;
            h = d * b + e * c;
            e = -d * c + e * b;
            j = f * b + g * c;
            g = -f * c + g * b;
            i += -h * o - e * q;
            m += -j * o - g * q
        }
        if (this.sb_scaleX != 1 || this.sb_scaleY != 1)k = this.sb_scaleAnchorX * k + l, n = this.sb_scaleAnchorY *
            n + p, i += h * k + e * n, m += j * k + g * n, h *= this.sb_scaleX, e *= this.sb_scaleY, j *= this.sb_scaleX, g *= this.sb_scaleY, i += -h * k - e * n, m += -j * k - g * n;
        a[0] = h;
        a[1] = e;
        a[2] = i;
        a[3] = j;
        a[4] = g;
        a[5] = m;
        return this
    }, setRotationAnchored:function (a, b, c) {
        this.rb_angle = a;
        this.rb_rotateAnchorX = b;
        this.rb_rotateAnchorY = c;
        return this
    }, setRotationAnchor:function (a, b) {
        this.rb_rotateAnchorX = a;
        this.rb_rotateAnchorY = b
    }, setRotation:function (a) {
        this.rb_angle = a
    }, setScaleAnchored:function (a, b, c, d) {
        this.sb_scaleX = a;
        this.sb_scaleAnchorX = c;
        this.sb_scaleY =
            b;
        this.sb_scaleAnchorY = d;
        return this
    }, setScale:function (a, b) {
        this.sb_scaleX = a;
        this.sb_scaleY = b;
        return this
    }, setScaleAnchor:function (a, b) {
        this.sb_scaleAnchorX = a;
        this.sb_scaleAnchorY = b;
        return this
    }, setPositionAnchor:function (a, b) {
        this.tAnchorX = a;
        this.tAnchorY = b;
        return this
    }, setPositionAnchored:function (a, b, c, d) {
        this.tb_x = a;
        this.tb_y = b;
        this.tAnchorX = c;
        this.tAnchorY = d;
        return this
    }, setPosition:function (a, b) {
        this.tb_x = a;
        this.tb_y = b;
        return this
    }, setLocation:function (a, b) {
        this.tb_x = a;
        this.tb_y = b;
        return this
    },
    flatten:function (a, b) {
        for (var c = this.getPositionFromLength(0), d = (new CAAT.PathUtil.Path).beginPath(c.x, c.y), e = 0; e < a; e++)c = this.getPositionFromLength(e / a * this.length), d.addLineTo(c.x, c.y);
        b ? d.closePath() : d.endPath();
        return d
    }}});
CAAT.Module({defines:"CAAT.WebGL.GLU", depends:["CAAT.Math.Matrix3"], onCreate:function () {
    makePerspective = function (a, b, c, d, e) {
        var a = c * Math.tan(a * Math.PI / 360), f = -a;
        return makeFrustum(f * b, a * b, f, a, c, d, e)
    };
    makeFrustum = function (a, b, c, d, e, f, g) {
        var h = 2 * e / (b - a), i = 2 * e / (d - c), a = (b + a) / (b - a), c = (d + c) / (d - c), d = -(f + e) / (f - e), e = -2 * f * e / (f - e);
        return(new CAAT.Math.Matrix3).initWithMatrix([
            [h, 0, a, -g / 2],
            [0, -i, c, g / 2],
            [0, 0, d, e],
            [0, 0, -1, 0]
        ])
    };
    makeOrtho = function (a, b, c, d, e, f) {
        var g = -(b + a) / (b - a), h = -(d + c) / (d - c), i = -(f + e) / (f - e);
        return(new CAAT.Matrix3).initWithMatrix([
            [2 /
                (b - a), 0, 0, g],
            [0, 2 / (d - c), 0, h],
            [0, 0, -2 / (f - e), i],
            [0, 0, 0, 1]
        ])
    }
}});
CAAT.Module({defines:"CAAT.WebGL.Program", extendsWith:{__init:function (a) {
    this.gl = a;
    return this
}, shaderProgram:null, gl:null, setAlpha:function () {
}, getShader:function (a, b, c) {
    if (b === "x-shader/x-fragment")b = a.createShader(a.FRAGMENT_SHADER); else if (b === "x-shader/x-vertex")b = a.createShader(a.VERTEX_SHADER); else return null;
    a.shaderSource(b, c);
    a.compileShader(b);
    return!a.getShaderParameter(b, a.COMPILE_STATUS) ? (alert(a.getShaderInfoLog(b)), null) : b
}, getDomShader:function (a, b) {
    var c = document.getElementById(b);
    if (!c)return null;
    for (var d = "", e = c.firstChild; e;)e.nodeType === 3 && (d += e.textContent), e = e.nextSibling;
    if (c.type === "x-shader/x-fragment")c = a.createShader(a.FRAGMENT_SHADER); else if (c.type === "x-shader/x-vertex")c = a.createShader(a.VERTEX_SHADER); else return null;
    a.shaderSource(c, d);
    a.compileShader(c);
    return!a.getShaderParameter(c, a.COMPILE_STATUS) ? (alert(a.getShaderInfoLog(c)), null) : c
}, initialize:function () {
    return this
}, getFragmentShader:function () {
    return null
}, getVertexShader:function () {
    return null
},
    create:function () {
        var a = this.gl;
        this.shaderProgram = a.createProgram();
        a.attachShader(this.shaderProgram, this.getVertexShader());
        a.attachShader(this.shaderProgram, this.getFragmentShader());
        a.linkProgram(this.shaderProgram);
        a.useProgram(this.shaderProgram);
        return this
    }, setMatrixUniform:function (a) {
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, new Float32Array(a.flatten()))
    }, useProgram:function () {
        this.gl.useProgram(this.shaderProgram);
        return this
    }}});
CAAT.Module({defines:"CAAT.WebGL.ColorProgram", aliases:["CAAT.ColorProgram"], extendsClass:"CAAT.WebGL.Program", extendsWith:{__init:function (a) {
    this.__super(a);
    return this
}, colorBuffer:null, vertexPositionBuffer:null, vertexPositionArray:null, getFragmentShader:function () {
    return this.getShader(this.gl, "x-shader/x-fragment", "#ifdef GL_ES \nprecision highp float; \n#endif \nvarying vec4 color; \nvoid main(void) { \n  gl_FragColor = color;\n}\n")
}, getVertexShader:function () {
    return this.getShader(this.gl,
        "x-shader/x-vertex", "attribute vec3 aVertexPosition; \nattribute vec4 aColor; \nuniform mat4 uPMatrix; \nvarying vec4 color; \nvoid main(void) { \ngl_Position = uPMatrix * vec4(aVertexPosition, 1.0); \ncolor= aColor; \n}\n")
}, initialize:function () {
    this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram,
        "aColor");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    this.useProgram();
    this.colorBuffer = this.gl.createBuffer();
    this.setColor([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    this.vertexPositionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    this.vertexPositionArray = new Float32Array(6144);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexPositionArray,
        this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
    return CAAT.ColorProgram.superclass.initialize.call(this)
}, setColor:function (a) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(a), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, this.colorBuffer, this.gl.FLOAT, false, 0, 0)
}}});
CAAT.Module({defines:"CAAT.WebGL.TextureProgram", aliases:["CAAT.TextureProgram"], extendsClass:"CAAT.WebGL.Program", depends:["CAAT.WebGL.Program"], extendsWith:{__init:function (a) {
    this.__super(a);
    return this
}, vertexPositionBuffer:null, vertexPositionArray:null, vertexUVBuffer:null, vertexUVArray:null, vertexIndexBuffer:null, linesBuffer:null, prevAlpha:-1, prevR:-1, prevG:-1, prevB:-1, prevA:-1, prevTexture:null, getFragmentShader:function () {
    return this.getShader(this.gl, "x-shader/x-fragment", "#ifdef GL_ES \nprecision highp float; \n#endif \nvarying vec2 vTextureCoord; \nuniform sampler2D uSampler; \nuniform float alpha; \nuniform bool uUseColor;\nuniform vec4 uColor;\nvoid main(void) { \nif ( uUseColor ) {\n  gl_FragColor= vec4(uColor.r*alpha, uColor.g*alpha, uColor.b*alpha, uColor.a*alpha);\n} else { \n  vec4 textureColor= texture2D(uSampler, vec2(vTextureCoord)); \n  gl_FragColor = vec4(textureColor.r*alpha, textureColor.g*alpha, textureColor.b*alpha, textureColor.a * alpha ); \n}\n}\n")
},
    getVertexShader:function () {
        return this.getShader(this.gl, "x-shader/x-vertex", "attribute vec3 aVertexPosition; \nattribute vec2 aTextureCoord; \nuniform mat4 uPMatrix; \nvarying vec2 vTextureCoord; \nvoid main(void) { \ngl_Position = uPMatrix * vec4(aVertexPosition, 1.0); \nvTextureCoord = aTextureCoord;\n}\n")
    }, useProgram:function () {
        CAAT.TextureProgram.superclass.useProgram.call(this);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexUVBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer)
    }, initialize:function () {
        var a;
        this.linesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.linesBuffer);
        var b = [];
        for (a = 0; a < 1024; a++)b[a] = a;
        this.linesBufferArray = new Uint16Array(b);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.linesBufferArray, this.gl.DYNAMIC_DRAW);
        this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
        this.shaderProgram.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
        this.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
        this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
        this.shaderProgram.samplerUniform = this.gl.getUniformLocation(this.shaderProgram, "uSampler");
        this.shaderProgram.alphaUniform = this.gl.getUniformLocation(this.shaderProgram, "alpha");
        this.shaderProgram.useColor = this.gl.getUniformLocation(this.shaderProgram,
            "uUseColor");
        this.shaderProgram.color = this.gl.getUniformLocation(this.shaderProgram, "uColor");
        this.setAlpha(1);
        this.setUseColor(false);
        this.vertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        this.vertexPositionArray = new Float32Array(49152);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexPositionArray, this.gl.DYNAMIC_DRAW);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        this.vertexUVBuffer =
            this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexUVBuffer);
        this.vertexUVArray = new Float32Array(32768);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexUVArray, this.gl.DYNAMIC_DRAW);
        this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);
        this.vertexIndexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        b = [];
        for (a = 0; a < 4096; a++)b.push(0 + a * 4), b.push(1 + a * 4), b.push(2 + a * 4), b.push(0 + a * 4),
            b.push(2 + a * 4), b.push(3 + a * 4);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(b), this.gl.DYNAMIC_DRAW);
        return CAAT.TextureProgram.superclass.initialize.call(this)
    }, setUseColor:function (a, b, c, d, e) {
        this.gl.uniform1i(this.shaderProgram.useColor, a ? 1 : 0);
        if (a && (this.prevA !== e || this.prevR !== b || this.prevG !== c || this.prevB !== d))this.gl.uniform4f(this.shaderProgram.color, b, c, d, e), this.prevA = e, this.prevR = b, this.prevG = c, this.prevB = d
    }, setTexture:function (a) {
        if (this.prevTexture !== a) {
            var b = this.gl;
            b.activeTexture(b.TEXTURE0);
            b.bindTexture(b.TEXTURE_2D, a);
            b.uniform1i(this.shaderProgram.samplerUniform, 0);
            this.prevTexture = a
        }
        return this
    }, updateVertexBuffer:function (a) {
        var b = this.gl;
        b.bindBuffer(b.ARRAY_BUFFER, this.vertexPositionBuffer);
        b.bufferSubData(b.ARRAY_BUFFER, 0, a);
        return this
    }, updateUVBuffer:function (a) {
        var b = this.gl;
        b.bindBuffer(b.ARRAY_BUFFER, this.vertexUVBuffer);
        b.bufferSubData(b.ARRAY_BUFFER, 0, a);
        return this
    }, setAlpha:function (a) {
        if (this.prevAlpha !== a)this.gl.uniform1f(this.shaderProgram.alphaUniform,
            a), this.prevAlpha = a;
        return this
    }, drawLines:function (a, b, c, d, e, f, g) {
        var h = this.gl;
        this.setAlpha(f);
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, this.linesBuffer);
        h.lineWidth(g);
        this.updateVertexBuffer(a);
        this.setUseColor(true, c, d, e, 1);
        h.drawElements(h.LINES, b, h.UNSIGNED_SHORT, 0);
        this.setAlpha(1);
        this.setUseColor(false);
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer)
    }, drawPolylines:function (a, b, c, d, e, f, g) {
        var h = this.gl;
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, this.linesBuffer);
        h.lineWidth(g);
        this.setAlpha(f);
        this.updateVertexBuffer(a);
        this.setUseColor(true, c, d, e, 1);
        h.drawElements(h.LINE_STRIP, b, h.UNSIGNED_SHORT, 0);
        this.setAlpha(1);
        this.setUseColor(false);
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer)
    }}});
CAAT.Module({defines:"CAAT.Event.TouchInfo", aliases:["CAAT.TouchInfo"], extendsWith:{__init:function (a, b, c, d) {
    this.identifier = a;
    this.pageX = this.clientX = b;
    this.pageY = this.clientY = c;
    this.target = d;
    this.time = (new Date).getTime();
    return this
}}});
CAAT.Module({defines:"CAAT.Event.TouchEvent", aliases:["CAAT.TouchEvent"], depends:["CAAT.Event.TouchInfo"], extendsWith:{__init:function () {
    this.touches = [];
    this.changedTouches = [];
    return this
}, time:0, source:null, sourceEvent:null, shift:false, control:false, alt:false, meta:false, touches:null, changedTouches:null, init:function (a, b, c) {
    this.source = b;
    this.alt = a.altKey;
    this.control = a.ctrlKey;
    this.shift = a.shiftKey;
    this.meta = a.metaKey;
    this.sourceEvent = a;
    this.time = c;
    return this
}, addTouch:function (a) {
    -1 === this.touches.indexOf(a) &&
    this.touches.push(a);
    return this
}, addChangedTouch:function (a) {
    -1 === this.changedTouches.indexOf(a) && this.changedTouches.push(a);
    return this
}, isAltDown:function () {
    return this.alt
}, isControlDown:function () {
    return this.control
}, isShiftDown:function () {
    return this.shift
}, isMetaDown:function () {
    return this.meta
}, getSourceEvent:function () {
    return this.sourceEvent
}}});
CAAT.Module({defines:"CAAT.Event.MouseEvent", aliases:["CAAT.MouseEvent"], depends:["CAAT.Math.Point"], extendsWith:{__init:function () {
    this.point = new CAAT.Math.Point(0, 0, 0);
    this.screenPoint = new CAAT.Math.Point(0, 0, 0);
    this.touches = [];
    return this
}, screenPoint:null, point:null, time:0, source:null, shift:false, control:false, alt:false, meta:false, sourceEvent:null, touches:null, init:function (a, b, c, d, e, f) {
    this.point.set(a, b);
    this.source = d;
    this.screenPoint = e;
    this.alt = c.altKey;
    this.control = c.ctrlKey;
    this.shift = c.shiftKey;
    this.meta = c.metaKey;
    this.sourceEvent = c;
    this.x = a;
    this.y = b;
    this.time = f;
    return this
}, isAltDown:function () {
    return this.alt
}, isControlDown:function () {
    return this.control
}, isShiftDown:function () {
    return this.shift
}, isMetaDown:function () {
    return this.meta
}, getSourceEvent:function () {
    return this.sourceEvent
}}});
CAAT.Module({defines:"CAAT.Event.KeyEvent", aliases:"CAAT.KeyEvent", extendsWith:{__init:function (a, b, c, d) {
    this.keyCode = a;
    this.action = b;
    this.modifiers = c;
    this.sourceEvent = d;
    this.preventDefault = function () {
        this.sourceEvent.preventDefault()
    };
    this.getKeyCode = function () {
        return this.keyCode
    };
    this.getAction = function () {
        return this.action
    };
    this.modifiers = function () {
        return this.modifiers
    };
    this.isShiftPressed = function () {
        return this.modifiers.shift
    };
    this.isControlPressed = function () {
        return this.modifiers.control
    };
    this.isAltPressed = function () {
        return this.modifiers.alt
    };
    this.getSourceEvent = function () {
        return this.sourceEvent
    }
}}, onCreate:function () {
    CAAT.Keys = {ENTER:13, BACKSPACE:8, TAB:9, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPSLOCK:20, ESCAPE:27, PAGEUP:33, PAGEDOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, INSERT:45, DELETE:46, 0:48, 1:49, 2:50, 3:51, 4:52, 5:53, 6:54, 7:55, 8:56, 9:57, a:65, b:66, c:67, d:68, e:69, f:70, g:71, h:72, i:73, j:74, k:75, l:76, m:77, n:78, o:79, p:80, q:81, r:82, s:83, t:84, u:85, v:86, w:87, x:88, y:89, z:90, SELECT:93,
        NUMPAD0:96, NUMPAD1:97, NUMPAD2:98, NUMPAD3:99, NUMPAD4:100, NUMPAD5:101, NUMPAD6:102, NUMPAD7:103, NUMPAD8:104, NUMPAD9:105, MULTIPLY:106, ADD:107, SUBTRACT:109, DECIMALPOINT:110, DIVIDE:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SCROLLLOCK:145, SEMICOLON:186, EQUALSIGN:187, COMMA:188, DASH:189, PERIOD:190, FORWARDSLASH:191, GRAVEACCENT:192, OPENBRACKET:219, BACKSLASH:220, CLOSEBRAKET:221, SINGLEQUOTE:222};
    CAAT.SHIFT_KEY = 16;
    CAAT.CONTROL_KEY = 17;
    CAAT.ALT_KEY = 18;
    CAAT.ENTER_KEY =
        13;
    CAAT.KEY_MODIFIERS = {alt:false, control:false, shift:false}
}});
CAAT.Module({defines:"CAAT.Event.Input", depends:["CAAT.Event.KeyEvent", "CAAT.Event.MouseEvent", "CAAT.Event.TouchEvent"], onCreate:function () {
    (function () {
        CAAT.setCursor = function (a) {
            if (navigator.browser !== "iOS")document.body.style.cursor = a
        }
    })();
    CAAT.TOUCH_AS_MOUSE = 1;
    CAAT.TOUCH_AS_MULTITOUCH = 2;
    CAAT.TOUCH_BEHAVIOR = CAAT.TOUCH_AS_MOUSE;
    (function () {
        CAAT.windowResizeListeners = [];
        CAAT.registerResizeListener = function (a) {
            CAAT.windowResizeListeners.push(a)
        };
        CAAT.unregisterResizeListener = function (a) {
            for (var b =
                0; b < CAAT.windowResizeListeners.length; b++)if (a === CAAT.windowResizeListeners[b]) {
                CAAT.windowResizeListeners.splice(b, 1);
                break
            }
        }
    })();
    (function () {
        CAAT.keyListeners = [];
        CAAT.registerKeyListener = function (a) {
            CAAT.keyListeners.push(a)
        }
    })();
    CAAT.enableDeviceMotion = function () {
        function a(a) {
            CAAT.rotationRate = {alpha:0, beta:a[0], gamma:a[1]}
        }

        CAAT.prevOnDeviceMotion = null;
        CAAT.onDeviceMotion = null;
        CAAT.accelerationIncludingGravity = {x:0, y:0, z:0};
        CAAT.rotationRate = {alpha:0, beta:0, gamma:0};
        window.DeviceOrientationEvent ?
            window.addEventListener("deviceorientation", function (b) {
                a([b.beta, b.gamma])
            }, true) : window.DeviceMotionEvent ? window.addEventListener("devicemotion", function (b) {
            a([b.acceleration.x * 2, b.acceleration.y * 2])
        }, true) : window.addEventListener("MozOrientation", function (b) {
            a([-b.y * 45, b.x * 45])
        }, true)
    };
    (function () {
        window.addEventListener("keydown", function (a) {
            var b = a.which ? a.which : a.keyCode;
            if (b === CAAT.SHIFT_KEY)CAAT.KEY_MODIFIERS.shift = true; else if (b === CAAT.CONTROL_KEY)CAAT.KEY_MODIFIERS.control = true; else if (b ===
                CAAT.ALT_KEY)CAAT.KEY_MODIFIERS.alt = true; else for (var c = 0; c < CAAT.keyListeners.length; c++)CAAT.keyListeners[c](new CAAT.KeyEvent(b, "down", {alt:CAAT.KEY_MODIFIERS.alt, control:CAAT.KEY_MODIFIERS.control, shift:CAAT.KEY_MODIFIERS.shift}, a))
        }, false);
        window.addEventListener("keyup", function (a) {
            var b = a.which ? a.which : a.keyCode;
            if (b === CAAT.SHIFT_KEY)CAAT.KEY_MODIFIERS.shift = false; else if (b === CAAT.CONTROL_KEY)CAAT.KEY_MODIFIERS.control = false; else if (b === CAAT.ALT_KEY)CAAT.KEY_MODIFIERS.alt = false; else for (var c =
                0; c < CAAT.keyListeners.length; c++)CAAT.keyListeners[c](new CAAT.KeyEvent(b, "up", {alt:CAAT.KEY_MODIFIERS.alt, control:CAAT.KEY_MODIFIERS.control, shift:CAAT.KEY_MODIFIERS.shift}, a))
        }, false);
        window.addEventListener("resize", function () {
            for (var a = 0; a < CAAT.windowResizeListeners.length; a++)CAAT.windowResizeListeners[a].windowResized(window.innerWidth, window.innerHeight)
        }, false)
    })()
}, extendsWith:{}});
CAAT.Module({defines:"CAAT.Event.AnimationLoop", onCreate:function () {
    CAAT.ENDRAF = false;
    CAAT.INTERVAL_ID = null;
    CAAT.renderEnabled = false;
    CAAT.FPS = 60;
    CAAT.NO_RAF = 0;
    CAAT.FPS_REFRESH = 500;
    CAAT.RAF = 0;
    CAAT.REQUEST_ANIMATION_FRAME_TIME = 0;
    CAAT.SET_INTERVAL = 0;
    CAAT.FRAME_TIME = 0;
    CAAT.currentDirector = null;
    CAAT.director = [];
    CAAT.RegisterDirector = function (a) {
        if (!CAAT.currentDirector)CAAT.currentDirector = a;
        CAAT.director.push(a)
    };
    CAAT.getCurrentScene = function () {
        return CAAT.currentDirector.getCurrentScene()
    };
    CAAT.getCurrentSceneTime =
        function () {
            return CAAT.currentDirector.getCurrentScene().time
        };
    CAAT.endLoop = function () {
        CAAT.NO_RAF ? CAAT.INTERVAL_ID !== null && clearInterval(CAAT.INTERVAL_ID) : CAAT.ENDRAF = true;
        CAAT.renderEnabled = false
    };
    CAAT.loop = function (a) {
        if (!CAAT.renderEnabled) {
            for (var b = 0, c = CAAT.director.length; b < c; b++)CAAT.director[b].timeline = (new Date).getTime();
            CAAT.FPS = a || 60;
            CAAT.renderEnabled = true;
            CAAT.NO_RAF ? CAAT.INTERVAL_ID = setInterval(function () {
                for (var a = (new Date).getTime(), b = 0, c = CAAT.director.length; b < c; b++) {
                    var g = CAAT.director[b];
                    (g.renderMode === CAAT.Director.RENDER_MODE_CONTINUOUS || g.needsRepaint) && g.renderFrame()
                }
                CAAT.FRAME_TIME = a - CAAT.SET_INTERVAL;
                if (CAAT.RAF)CAAT.REQUEST_ANIMATION_FRAME_TIME = (new Date).getTime() - CAAT.RAF;
                CAAT.RAF = (new Date).getTime();
                CAAT.SET_INTERVAL = a
            }, 1E3 / CAAT.FPS) : CAAT.renderFrameRAF()
        }
    };
    CAAT.renderFrameRAF = function () {
        var a = CAAT;
        if (a.ENDRAF)a.ENDRAF = false; else {
            for (var b = (new Date).getTime(), c = 0, d = a.director.length; c < d; c++)a.director[c].renderFrame();
            b = (new Date).getTime() - b;
            a.FRAME_TIME = b;
            if (a.RAF)a.REQUEST_ANIMATION_FRAME_TIME =
                (new Date).getTime() - a.RAF;
            a.RAF = (new Date).getTime();
            window.requestAnimFrame(a.renderFrameRAF, 0)
        }
    };
    window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
            window.setTimeout(a, 1E3 / CAAT.FPS)
        }
    }()
}, extendsWith:function () {
    return{}
}});
CAAT.Module({defines:"CAAT.Foundation.Timer.TimerTask", aliases:["CAAT.TimerTask"], extendsWith:{startTime:0, duration:0, callback_timeout:null, callback_tick:null, callback_cancel:null, scene:null, taskId:0, remove:false, create:function (a, b, c, d, e) {
    this.startTime = a;
    this.duration = b;
    this.callback_timeout = c;
    this.callback_tick = d;
    this.callback_cancel = e;
    return this
}, checkTask:function (a) {
    var b = a;
    b -= this.startTime;
    b >= this.duration ? (this.remove = true, this.callback_timeout && this.callback_timeout(a, b, this)) : this.callback_tick &&
        this.callback_tick(a, b, this);
    return this
}, reset:function (a) {
    this.remove = false;
    this.startTime = a;
    this.scene.ensureTimerTask(this);
    return this
}, cancel:function () {
    this.remove = true;
    null != this.callback_cancel && this.callback_cancel(this.scene.time, this.scene.time - this.startTime, this);
    return this
}}});
CAAT.Module({defines:"CAAT.Foundation.Timer.TimerManager", aliases:["CAAT.TimerManager"], depends:["CAAT.Foundation.Timer.TimerTask"], extendsWith:{__init:function () {
    this.timerList = [];
    return this
}, timerList:null, timerSequence:0, checkTimers:function (a) {
    for (var b = this.timerList, c = b.length - 1; c >= 0;)b[c].remove || b[c].checkTask(a), c--
}, ensureTimerTask:function (a) {
    this.hasTimer(a) || this.timerList.push(a);
    return this
}, hasTimer:function (a) {
    for (var b = this.timerList, c = b.length - 1; c >= 0;) {
        if (b[c] === a)return true;
        c--
    }
    return false
}, createTimer:function (a, b, c, d, e) {
    a = (new CAAT.Foundation.Timer.TimerTask).create(a, b, c, d, e);
    a.taskId = this.timerSequence++;
    a.sceneTime = this.time;
    a.scene = this;
    this.timerList.push(a);
    return a
}, removeExpiredTimers:function () {
    var a, b = this.timerList;
    for (a = 0; a < b.length; a++)b[a].remove && b.splice(a, 1)
}}});
CAAT.Module({defines:"CAAT.Foundation.UI.Layout.LayoutManager", aliases:["CAAT.UI.LayoutManager"], depends:["CAAT.Behavior.Interpolator"], constants:{AXIS:{X:0, Y:1}, ALIGNMENT:{LEFT:0, RIGHT:1, CENTER:2, TOP:3, BOTTOM:4, JUSTIFY:5}}, extendsWith:function () {
    return{__init:function () {
        this.newChildren = [];
        this.padding = {left:2, right:2, top:2, bottom:2};
        return this
    }, newElementInterpolator:(new CAAT.Behavior.Interpolator).createElasticOutInterpolator(1.1, 0.7), moveElementInterpolator:(new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(2),
        padding:null, invalid:true, hgap:2, vgap:2, animated:false, newChildren:null, setAnimated:function (a) {
            this.animated = a;
            return this
        }, setHGap:function (a) {
            this.hgap = a;
            this.invalidateLayout();
            return this
        }, setVGap:function (a) {
            this.vgap = a;
            this.invalidateLayout();
            return this
        }, setAllPadding:function (a) {
            this.padding.left = a;
            this.padding.right = a;
            this.padding.top = a;
            this.padding.bottom = a;
            this.invalidateLayout();
            return this
        }, setPadding:function (a, b, c, d) {
            this.padding.left = a;
            this.padding.right = b;
            this.padding.top = c;
            this.padding.bottom =
                d;
            this.invalidateLayout();
            return this
        }, addChild:function (a) {
            this.newChildren.push(a)
        }, removeChild:function () {
        }, doLayout:function () {
            this.newChildren = [];
            this.invalid = false
        }, invalidateLayout:function () {
            this.invalid = true
        }, getMinimumLayoutSize:function () {
        }, getPreferredLayoutSize:function () {
        }, isValid:function () {
            return!this.invalid
        }, isInvalidated:function () {
            return this.invalid
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.UI.Layout.BoxLayout", aliases:["CAAT.UI.BoxLayout"], depends:["CAAT.Foundation.UI.Layout.LayoutManager", "CAAT.Math.Dimension"], extendsClass:"CAAT.Foundation.UI.Layout.LayoutManager", extendsWith:function () {
    return{axis:CAAT.Foundation.UI.Layout.LayoutManager.AXIS.Y, valign:CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.CENTER, halign:CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.CENTER, setAxis:function (a) {
        this.axis = a;
        this.invalidateLayout();
        return this
    }, setHorizontalAlignment:function (a) {
        this.halign =
            a;
        this.invalidateLayout();
        return this
    }, setVerticalAlignment:function (a) {
        this.valign = a;
        this.invalidateLayout();
        return this
    }, doLayout:function (a) {
        this.axis === CAAT.Foundation.UI.Layout.LayoutManager.AXIS.Y ? this.doLayoutVertical(a) : this.doLayoutHorizontal(a);
        CAAT.Foundation.UI.Layout.BoxLayout.superclass.doLayout.call(this, a)
    }, doLayoutHorizontal:function (a) {
        var b = 0, c = 0, d = 0, e, f, g;
        for (e = 0, f = a.getNumChildren(); e < f; e += 1)if (g = a.getChildAt(e), g.isVisible() && g.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
            if (c <
                g.height)c = g.height;
            b += g.width;
            e > 0 && (b += this.hgap)
        }
        switch (this.halign) {
            case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.LEFT:
                b = this.padding.left;
                break;
            case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.RIGHT:
                b = a.width - b - this.padding.right;
                break;
            default:
                b = (a.width - b) / 2
        }
        for (e = 0, f = a.getNumChildren(); e < f; e += 1)if (g = a.getChildAt(e), g.isVisible() && g.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
            switch (this.valign) {
                case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.TOP:
                    d = this.padding.top;
                    break;
                case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.BOTTOM:
                    d = a.height - this.padding.bottom - g.height;
                    break;
                default:
                    d = (a.height - g.height) / 2
            }
            this.__setActorPosition(g, b, d);
            b += g.width + this.hgap
        }
    }, __setActorPosition:function (a, b, c) {
        this.animated ? this.newChildren.indexOf(a) !== -1 ? (a.setPosition(b, c), a.setScale(0, 0), a.scaleTo(1, 1, 500, 0, 0.5, 0.5, this.newElementInterpolator)) : a.moveTo(b, c, 500, 0, this.moveElementInterpolator) : a.setPosition(b, c)
    }, doLayoutVertical:function (a) {
        var b = 0, c = 0, d, e, f;
        for (d = 0, e =
            a.getNumChildren(); d < e; d += 1)if (f = a.getChildAt(d), f.isVisible() && f.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
            if (b < f.width)b = f.width;
            c += f.height;
            d > 0 && (c += this.vgap)
        }
        switch (this.valign) {
            case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.TOP:
                b = this.padding.top;
                break;
            case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.BOTTOM:
                b = a.height - c - this.padding.bottom;
                break;
            default:
                b = (a.height - c) / 2
        }
        for (d = 0, e = a.getNumChildren(); d < e; d += 1)if (f = a.getChildAt(d), f.isVisible() && f.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
            switch (this.halign) {
                case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.LEFT:
                    c =
                        this.padding.left;
                    break;
                case CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.RIGHT:
                    c = a.width - this.padding.right - f.width;
                    break;
                default:
                    c = (a.width - f.width) / 2
            }
            this.__setActorPosition(f, c, b);
            b += f.height + this.vgap
        }
    }, getPreferredLayoutSize:function (a) {
        var b = new CAAT.Dimension, c = 0, d = 0, e, f;
        for (e = 0, f = a.getNumChildren(); e < f; e += 1) {
            var g = a.getChildAt(e);
            if (g.isVisible() && g.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
                g = g.getPreferredSize();
                if (d < g.height)d = g.height;
                c += g.width
            }
        }
        b.width = c;
        b.height = d;
        return b
    },
        getMinimumLayoutSize:function (a) {
            var b = new CAAT.Dimension, c = 0, d = 0, e, f;
            for (e = 0, f = a.getNumChildren(); e < f; e += 1) {
                var g = a.getChildAt(e);
                if (g.isVisible() && g.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
                    g = g.getMinimumSize();
                    if (d < g.height)d = g.height;
                    c += g.width
                }
            }
            b.width = c;
            b.height = d;
            return b
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.UI.Layout.BorderLayout", aliases:["CAAT.UI.BorderLayout"], depends:["CAAT.Foundation.UI.Layout.LayoutManager", "CAAT.Math.Dimension"], extendsClass:"CAAT.Foundation.UI.Layout.LayoutManager", extendsWith:{__init:function () {
    this.__super();
    return this
}, left:null, right:null, top:null, bottom:null, center:null, addChild:function (a, b) {
    typeof b === "undefined" && (b = "center");
    CAAT.Foundation.UI.Layout.BorderLayout.superclass.addChild.call(this, a, b);
    b === "left" ? this.left = a : b === "right" ?
        this.right = a : b === "top" ? this.top = a : b === "bottom" ? this.bottom = a : this.center = a
}, removeChild:function (a) {
    if (this.center === a)this.center = null; else if (this.left === a)this.left = null; else if (this.right === a)this.right = null; else if (this.top === a)this.top = null; else if (this.bottom === a)this.bottom = null
}, __getChild:function (a) {
    if (a === "center")return this.center; else if (a === "left")return this.left; else if (a === "right")return this.right; else if (a === "top")return this.top; else if (a === "bottom")return this.bottom
}, getMinimumLayoutSize:function () {
    var a,
        b = new CAAT.Math.Dimension;
    if ((a = this.__getChild("right")) != null)a = a.getMinimumSize(), b.width += a.width + this.hgap, b.height = Math.max(a.height, b.height);
    if ((a = this.__getChild("left")) != null)a = a.getMinimumSize(), b.width += a.width + this.hgap, b.height = Math.max(a.height, b.height);
    if ((a = this.__getChild("center")) != null)a = a.getMinimumSize(), b.width += a.width, b.height = Math.max(a.height, b.height);
    if ((a = this.__getChild("top")) != null)a = a.getMinimumSize(), b.width = Math.max(a.width, b.width), b.height += a.height + this.vgap;
    if ((a = this.__getChild("bottom")) != null)a = a.getMinimumSize(), b.width = Math.max(a.width, b.width), b.height += a.height + this.vgap;
    b.width += this.padding.left + this.padding.right;
    b.height += this.padding.top + this.padding.bottom;
    return b
}, getPreferredLayoutSize:function () {
    var a, b = new CAAT.Dimension;
    if ((a = this.__getChild("left")) != null)a = a.getPreferredSize(), b.width += a.width + this.hgap, b.height = Math.max(a.height, b.height);
    if ((a = this.__getChild("right")) != null)a = a.getPreferredSize(), b.width += a.width + this.hgap, b.height =
        Math.max(a.height, b.height);
    if ((a = this.__getChild("center")) != null)a = a.getPreferredSize(), b.width += a.width, b.height = Math.max(a.height, b.height);
    if ((a = this.__getChild("top")) != null)a = a.getPreferredSize(), b.width = Math.max(a.width, b.width), b.height += a.height + this.vgap;
    if ((a = this.__getChild("bottom")) != null)a = a.getPreferredSize(), b.width = Math.max(a.width, b.width), b.height += a.height + this.vgap;
    b.width += this.padding.left + this.padding.right;
    b.height += this.padding.top + this.padding.bottom;
    return b
}, doLayout:function (a) {
    var b =
        this.padding.top, c = a.height - this.padding.bottom, d = this.padding.left, e = a.width - this.padding.right, f, g;
    if ((f = this.__getChild("top")) != null)f.setSize(e - d, f.height), g = f.getPreferredSize(), f.setBounds(d, b, e - d, g.height), b += g.height + this.vgap;
    if ((f = this.__getChild("bottom")) != null)f.setSize(e - d, f.height), g = f.getPreferredSize(), f.setBounds(d, c - g.height, e - d, g.height), c -= g.height + this.vgap;
    if ((f = this.__getChild("right")) != null)f.setSize(f.width, c - b), g = f.getPreferredSize(), f.setBounds(e - g.width, b, g.width, c -
        b), e -= g.width + this.hgap;
    if ((f = this.__getChild("left")) != null)f.setSize(f.width, c - b), g = f.getPreferredSize(), f.setBounds(d, b, g.width, c - b), d += g.width + this.hgap;
    (f = this.__getChild("center")) != null && f.setBounds(d, b, e - d, c - b);
    CAAT.Foundation.UI.Layout.BorderLayout.superclass.doLayout.call(this, a)
}}});
CAAT.Module({defines:"CAAT.Foundation.UI.Layout.GridLayout", aliases:["CAAT.UI.GridLayout"], depends:["CAAT.Foundation.UI.Layout.LayoutManager", "CAAT.Math.Dimension"], extendsClass:"CAAT.Foundation.UI.Layout.LayoutManager", extendsWith:{__init:function (a, b) {
    this.__super();
    this.rows = a;
    this.columns = b;
    return this
}, rows:0, columns:2, doLayout:function (a) {
    var b = a.getNumChildren();
    if (b !== 0) {
        var c = this.rows, d = this.columns;
        c > 0 ? d = Math.floor((b + c - 1) / c) : c = Math.floor((b + d - 1) / d);
        for (var e = (d - 1) * this.hgap, f = a.width -
            (this.padding.left + this.padding.right), g = Math.floor((f - e) / d), h = (c - 1) * this.vgap, i = a.height - (this.padding.top + this.padding.bottom), j = Math.floor((i - h) / c), h = Math.floor((i - (j * c + h)) / 2), i = 0, e = this.padding.left + Math.floor((f - (g * d + e)) / 2); i < d; i++, e += g + this.hgap)for (var f = 0, m = this.padding.top + h; f < c; f++, m += j + this.vgap) {
            var k = f * d + i;
            if (k < b && (k = a.getChildAt(k), k.isVisible() && k.isInAnimationFrame(CAAT.getCurrentSceneTime())))if (this.animated) {
                if (k.width !== g || k.height !== j)k.setSize(g, j), this.newChildren.indexOf(k) !==
                    -1 ? (k.setPosition(e, m), k.setScale(0.01, 0.01), k.scaleTo(1, 1, 500, 0, 0.5, 0.5, this.newElementInterpolator)) : k.moveTo(e, m, 500, 0, this.moveElementInterpolator)
            } else k.setBounds(e, m, g, j)
        }
        CAAT.Foundation.UI.Layout.GridLayout.superclass.doLayout.call(this, a)
    }
}, getMinimumLayoutSize:function (a) {
    var b = this.rows, c = this.columns, d = a.getNumChildren(), e = 0, f = 0, g;
    b > 0 ? c = Math.ceil((d + b - 1) / b) : b = Math.ceil((d + c - 1) / c);
    for (g = 0; g < d; g += 1) {
        var h = a.getChildAt(g);
        if (h.isVisible() && h.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
            h =
                h.getMinimumSize();
            if (e < h.width)e = h.width;
            if (f < h.height)f = h.height
        }
    }
    return new CAAT.Dimension(this.padding.left + this.padding.right + c * e + (c - 1) * this.hgap, this.padding.top + this.padding.bottom + b * f + (b - 1) * this.vgap)
}, getPreferredLayoutSize:function (a) {
    var b = this.rows, c = this.columns, d = a.getNumChildren(), e = 0, f = 0, g;
    b > 0 ? c = Math.ceil((d + b - 1) / b) : b = Math.ceil((d + c - 1) / c);
    for (g = 0; g < d; g += 1) {
        var h = a.getChildAt(g);
        if (actorisVisible() && h.isInAnimationFrame(CAAT.getCurrentSceneTime())) {
            h = h.getPreferredSize();
            if (e < h.width)e =
                h.width;
            if (f < h.height)f = h.height
        }
    }
    return new CAAT.Math.Dimension(this.padding.left + this.padding.right + c * e + (c - 1) * this.hgap, this.padding.top + this.padding.bottom + b * f + (b - 1) * this.vgap)
}}});
CAAT.Module({defines:"CAAT.Foundation.SpriteImageHelper", extendsWith:{__init:function (a, b, c, d, e, f) {
    this.x = a;
    this.y = b;
    this.width = c;
    this.height = d;
    this.setGL(a / e, b / f, (a + c - 1) / e, (b + d - 1) / f);
    return this
}, x:0, y:0, width:0, height:0, u:0, v:0, u1:0, v1:0, setGL:function (a, b, c, d) {
    this.u = a;
    this.v = b;
    this.u1 = c;
    this.v1 = d;
    return this
}}});
CAAT.Module({defines:"CAAT.Foundation.SpriteImage", aliases:["CAAT.SpriteImage"], depends:["CAAT.Foundation.SpriteImageHelper", "CAAT.Math.Rectangle"], constants:{TR_NONE:0, TR_FLIP_HORIZONTAL:1, TR_FLIP_VERTICAL:2, TR_FLIP_ALL:3, TR_FIXED_TO_SIZE:4, TR_FIXED_WIDTH_TO_SIZE:6, TR_TILE:5}, extendsWith:function () {
    return{__init:function () {
        this.paint = this.paintN;
        this.setAnimationImageIndex([0]);
        this.mapInfo = {};
        return this
    }, animationImageIndex:null, prevAnimationTime:-1, changeFPS:1E3, transformation:0, spriteIndex:0,
        image:null, rows:1, columns:1, width:0, height:0, singleWidth:0, singleHeight:0, scaleX:1, scaleY:1, offsetX:0, offsetY:0, ownerActor:null, mapInfo:null, map:null, setOwner:function (a) {
            this.ownerActor = a;
            return this
        }, getRows:function () {
            return this.rows
        }, getColumns:function () {
            return this.columns
        }, getWidth:function () {
            return this.mapInfo[this.spriteIndex].width
        }, getHeight:function () {
            return this.mapInfo[this.spriteIndex].height
        }, getWrappedImageWidth:function () {
            return this.image.width
        }, getWrappedImageHeight:function () {
            return this.image.height
        },
        getRef:function () {
            var a = new CAAT.Foundation.SpriteImage;
            a.image = this.image;
            a.rows = this.rows;
            a.columns = this.columns;
            a.width = this.width;
            a.height = this.height;
            a.singleWidth = this.singleWidth;
            a.singleHeight = this.singleHeight;
            a.mapInfo = this.mapInfo;
            a.offsetX = this.offsetX;
            a.offsetY = this.offsetY;
            a.scaleX = this.scaleX;
            a.scaleY = this.scaleY;
            return a
        }, setOffsetX:function (a) {
            this.offsetX = a;
            return this
        }, setOffsetY:function (a) {
            this.offsetY = a;
            return this
        }, setOffset:function (a, b) {
            this.offsetX = a;
            this.offsetY = b;
            return this
        },
        initialize:function (a, b, c) {
            this.image = a;
            this.rows = b;
            this.columns = c;
            this.width = a.width;
            this.height = a.height;
            this.singleWidth = Math.floor(this.width / c);
            this.singleHeight = Math.floor(this.height / b);
            this.mapInfo = {};
            var d, e, f, g;
            if (a.__texturePage) {
                a.__du = this.singleWidth / a.__texturePage.width;
                a.__dv = this.singleHeight / a.__texturePage.height;
                e = this.singleWidth;
                f = this.singleHeight;
                var h = this.columns;
                if (a.inverted)d = e, e = f, f = d, h = this.rows;
                var a = this.image.__tx, i = this.image.__ty, j = this.image.__texturePage;
                for (d =
                         0; d < b * c; d++) {
                    g = a + (d % h >> 0) * e;
                    var m = i + (d / h >> 0) * f, k = g + e, n = m + f;
                    g = (new CAAT.Foundation.SpriteImageHelper(g, m, k - g, n - m, j.width, j.height)).setGL(g / j.width, m / j.height, k / j.width, n / j.height);
                    this.mapInfo[d] = g
                }
            } else for (d = 0; d < b * c; d++)e = (d % this.columns | 0) * this.singleWidth, f = (d / this.columns | 0) * this.singleHeight, g = new CAAT.Foundation.SpriteImageHelper(e, f, this.singleWidth, this.singleHeight, a.width, a.height), this.mapInfo[d] = g;
            return this
        }, paintTiled:function (a, b) {
            this.setSpriteIndexAtTime(b);
            var c = this.mapInfo[this.spriteIndex],
                d = new CAAT.Math.Rectangle;
            this.ownerActor.AABB.intersect(a.AABB, d);
            var e = this.getWidth(), f = this.getHeight(), g = (this.offsetX - this.ownerActor.x) % e;
            g > 0 && (g -= e);
            var h = (this.offsetY - this.ownerActor.y) % f;
            h > 0 && (h -= f);
            var e = ((d.width - g) / e >> 0) + 1, f = ((d.height - h) / f >> 0) + 1, i, j, m = a.ctx;
            for (i = 0; i < f; i++)for (j = 0; j < e; j++)m.drawImage(this.image, c.x, c.y, c.width, c.height, d.x - this.ownerActor.x + g + j * c.width >> 0, d.y - this.ownerActor.y + h + i * c.height >> 0, c.width, c.height)
        }, paintInvertedH:function (a, b, c, d) {
            this.setSpriteIndexAtTime(b);
            b = this.mapInfo[this.spriteIndex];
            a = a.ctx;
            a.save();
            a.translate((c | 0) + b.width, d | 0);
            a.scale(-1, 1);
            a.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX >> 0, this.offsetY >> 0, b.width, b.height);
            a.restore();
            return this
        }, paintInvertedV:function (a, b, c, d) {
            this.setSpriteIndexAtTime(b);
            b = this.mapInfo[this.spriteIndex];
            a = a.ctx;
            a.save();
            a.translate(c | 0, d + b.height | 0);
            a.scale(1, -1);
            a.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX >> 0, this.offsetY >> 0, b.width, b.height);
            a.restore();
            return this
        }, paintInvertedHV:function (a, b, c, d) {
            this.setSpriteIndexAtTime(b);
            b = this.mapInfo[this.spriteIndex];
            a = a.ctx;
            a.save();
            a.translate(c | 0, d + b.height | 0);
            a.scale(1, -1);
            a.translate(b.width, 0);
            a.scale(-1, 1);
            a.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX >> 0, this.offsetY >> 0, b.width, b.height);
            a.restore();
            return this
        }, paintN:function (a, b, c, d) {
            this.setSpriteIndexAtTime(b);
            b = this.mapInfo[this.spriteIndex];
            a.ctx.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX + c >> 0, this.offsetY + d >> 0, b.width, b.height);
            return this
        }, paintScaledWidth:function (a, b, c, d) {
            this.setSpriteIndexAtTime(b);
            b = this.mapInfo[this.spriteIndex];
            a.ctx.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX + c >> 0, this.offsetY + d >> 0, this.ownerActor.width, b.height);
            return this
        }, paintChunk:function (a, b, c, d, e, f, g) {
            a.drawImage(this.image, d, e, f, g, b, c, f, g)
        }, paintTile:function (a, b, c, d) {
            b = this.mapInfo[b];
            a.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX + c >> 0, this.offsetY + d >> 0, b.width, b.height);
            return this
        }, paintScaled:function (a, b, c, d) {
            this.setSpriteIndexAtTime(b);
            b = this.mapInfo[this.spriteIndex];
            a.ctx.drawImage(this.image, b.x, b.y, b.width, b.height, this.offsetX + c >> 0, this.offsetY + d >> 0, this.ownerActor.width, this.ownerActor.height);
            return this
        }, getCurrentSpriteImageCSSPosition:function () {
            var a = this.mapInfo[this.spriteIndex];
            return"" + -(a.x - this.offsetX) + "px " + -(a.y - this.offsetY) + "px " + (this.ownerActor.transformation === CAAT.Foundation.SpriteImage.TR_TILE ? "repeat" : "no-repeat")
        }, getNumImages:function () {
            return this.rows * this.columns
        }, setUV:function (a, b) {
            var c = this.image;
            if (c.__texturePage) {
                var d = b,
                    e = this.mapInfo[this.spriteIndex], f = e.u, g = e.v, h = e.u1, e = e.v1;
                if (this.offsetX || this.offsetY)f = c.__texturePage, g = -this.offsetY / f.height, h = (this.ownerActor.width - this.offsetX) / f.width, e = (this.ownerActor.height - this.offsetY) / f.height, f = -this.offsetX / f.width + c.__u, g += c.__v, h += c.__u, e += c.__v;
                c.inverted ? (a[d++] = h, a[d++] = g, a[d++] = h, a[d++] = e, a[d++] = f, a[d++] = e, a[d++] = f, a[d++] = g) : (a[d++] = f, a[d++] = g, a[d++] = h, a[d++] = g, a[d++] = h, a[d++] = e, a[d++] = f, a[d++] = e)
            }
        }, setChangeFPS:function (a) {
            this.changeFPS = a;
            return this
        },
        setSpriteTransformation:function (a) {
            this.transformation = a;
            var b = CAAT.Foundation.SpriteImage;
            switch (a) {
                case b.TR_FLIP_HORIZONTAL:
                    this.paint = this.paintInvertedH;
                    break;
                case b.TR_FLIP_VERTICAL:
                    this.paint = this.paintInvertedV;
                    break;
                case b.TR_FLIP_ALL:
                    this.paint = this.paintInvertedHV;
                    break;
                case b.TR_FIXED_TO_SIZE:
                    this.paint = this.paintScaled;
                    break;
                case b.TR_FIXED_WIDTH_TO_SIZE:
                    this.paint = this.paintScaledWidth;
                    break;
                case b.TR_TILE:
                    this.paint = this.paintTiled;
                    break;
                default:
                    this.paint = this.paintN
            }
            this.ownerActor.invalidate();
            return this
        }, resetAnimationTime:function () {
            this.prevAnimationTime = -1;
            return this
        }, setAnimationImageIndex:function (a) {
            this.animationImageIndex = a;
            this.spriteIndex = a[0];
            this.prevAnimationTime = -1;
            return this
        }, setSpriteIndex:function (a) {
            this.spriteIndex = a;
            return this
        }, setSpriteIndexAtTime:function (a) {
            if (this.animationImageIndex.length > 1)this.prevAnimationTime === -1 ? (this.prevAnimationTime = a, this.spriteIndex = this.animationImageIndex[0]) : (a -= this.prevAnimationTime, a /= this.changeFPS, a %= this.animationImageIndex.length,
                this.spriteIndex = this.animationImageIndex[Math.floor(a)]), this.ownerActor.invalidate()
        }, getMapInfo:function (a) {
            return this.mapInfo[a]
        }, initializeFromMap:function (a, b) {
            this.initialize(a, 1, 1);
            var c, d, e = 0;
            for (c in b)d = b[c], d = new CAAT.Foundation.SpriteImageHelper(d.x, d.y, d.width, d.height, a.width, a.height), this.mapInfo[c] = d, e || this.setAnimationImageIndex([c]), e++;
            return this
        }, initializeAsGlyphDesigner:function (a, b) {
            this.initialize(a, 1, 1);
            var c, d, e = 0;
            for (c in b) {
                var f = b[c];
                d = new CAAT.Foundation.SpriteImageHelper(f.x,
                    f.y, f.width, f.height, a.width, a.height);
                d.xoffset = typeof f.xoffset === "undefined" ? 0 : f.xoffset;
                d.yoffset = typeof f.yoffset === "undefined" ? 0 : f.yoffset;
                d.xadvance = typeof f.xadvance === "undefined" ? f.width : f.xadvance;
                this.mapInfo[c] = d;
                e || this.setAnimationImageIndex([c]);
                e++
            }
            return this
        }, initializeAsFontMap:function (a, b) {
            this.initialize(a, 1, 1);
            for (var c, d = 0, e = 0; e < b.length; e++) {
                var f = b[e];
                c = new CAAT.Foundation.SpriteImageHelper(d, 0, f.width, a.height, a.width, a.height);
                c.xoffset = 0;
                c.yoffset = 0;
                c.xadvance = f.width;
                d += f.width;
                this.mapInfo[b[e].c] = c;
                e || this.setAnimationImageIndex([b[e].c])
            }
            return this
        }, initializeAsMonoTypeFontMap:function (a, b) {
            for (var c = [], d = b.split(""), e = a.width / d.length >> 0, f = 0; f < d.length; f++)c.push({c:d[f], width:e});
            return this.initializeAsFontMap(a, c)
        }, stringWidth:function (a) {
            var b, c, d = 0, e;
            for (b = 0, c = a.length; b < c; b++)(e = this.mapInfo[a.charAt(b)]) && (d += e.xadvance);
            return d
        }, stringHeight:function () {
            if (this.fontHeight)return this.fontHeight;
            var a = 0, b;
            for (b in this.mapInfo) {
                var c = this.mapInfo[b],
                    c = c.height + c.yoffset;
                c > a && (a = c)
            }
            return this.fontHeight = a
        }, drawText:function (a, b, c, d) {
            for (var e, f, g = a.split(""), a = 0; a < g.length; a++)if (e = this.mapInfo[g[a]])f = e.width, b.drawImage(this.image, e.x, e.y, f, e.height, c + e.xoffset, d + e.yoffset, f, e.height), c += e.xadvance
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.Actor", aliases:["CAAT.Actor"], depends:"CAAT.Event.AnimationLoop,CAAT.Foundation.SpriteImage,CAAT.Core.Constants,CAAT.Behavior.PathBehavior,CAAT.Behavior.RotateBehavior,CAAT.Behavior.ScaleBehavior,CAAT.Behavior.Scale1Behavior,CAAT.PathUtil.LinearPath,CAAT.Event.AnimationLoop".split(","), constants:{ANCHOR_CENTER:0, ANCHOR_TOP:1, ANCHOR_BOTTOM:2, ANCHOR_LEFT:3, ANCHOR_RIGHT:4, ANCHOR_TOP_LEFT:5, ANCHOR_TOP_RIGHT:6, ANCHOR_BOTTOM_LEFT:7, ANCHOR_BOTTOM_RIGHT:8, ANCHOR_CUSTOM:9,
    CACHE_NONE:0, CACHE_SIMPLE:1, CACHE_DEEP:2}, extendsWith:function () {
    var a = 0;
    return{__init:function () {
        this.behaviorList = [];
        this.lifecycleListenerList = [];
        this.AABB = new CAAT.Math.Rectangle;
        this.viewVertices = [new CAAT.Math.Point(0, 0, 0), new CAAT.Math.Point(0, 0, 0), new CAAT.Math.Point(0, 0, 0), new CAAT.Math.Point(0, 0, 0)];
        this.scaleAnchor = CAAT.Foundation.Actor.ANCHOR_CENTER;
        this.modelViewMatrix = new CAAT.Math.Matrix;
        this.worldModelViewMatrix = new CAAT.Math.Matrix;
        this.resetTransform();
        this.setScale(1, 1);
        this.setRotation(0);
        this.id = a++;
        return this
    }, __super:null, lifecycleListenerList:null, behaviorList:null, parent:null, x:0, y:0, width:0, height:0, preferredSize:null, minimumSize:null, start_time:0, duration:Number.MAX_VALUE, clip:false, clipPath:null, tAnchorX:0, tAnchorY:0, scaleX:0, scaleY:0, scaleTX:0.5, scaleTY:0.5, scaleAnchor:0, rotationAngle:0, rotationY:0.5, rotationX:0.5, alpha:1, isGlobalAlpha:false, frameAlpha:1, expired:false, discardable:false, pointed:false, mouseEnabled:true, visible:true, fillStyle:null, strokeStyle:null, time:0, AABB:null,
        viewVertices:null, inFrame:false, dirty:true, wdirty:true, oldX:-1, oldY:-1, modelViewMatrix:null, worldModelViewMatrix:null, modelViewMatrixI:null, worldModelViewMatrixI:null, glEnabled:false, backgroundImage:null, id:null, size_active:1, size_total:1, __d_ax:-1, __d_ay:-1, gestureEnabled:false, invalid:true, cached:0, collides:false, collidesAsRect:true, isAA:true, invalidateLayout:function () {
            this.parent && !this.parent.layoutInvalidated && this.parent.invalidateLayout();
            return this
        }, __validateLayout:function () {
        }, setPreferredSize:function (a, c) {
            if (!this.preferredSize)this.preferredSize = new CAAT.Math.Dimension;
            this.preferredSize.width = a;
            this.preferredSize.height = c;
            return this
        }, getPreferredSize:function () {
            return this.preferredSize ? this.preferredSize : this.getMinimumSize()
        }, setMinimumSize:function (a, c) {
            if (!this.minimumSize)this.minimumSize = new CAAT.Math.Dimension;
            this.minimumSize.width = a;
            this.minimumSize.height = c;
            return this
        }, getMinimumSize:function () {
            return this.minimumSize ? this.minimumSize : new CAAT.Math.Dimension(this.width, this.height)
        },
        create:function () {
            return this
        }, moveTo:function (a, c, d, e, f, g) {
            if (!(a === this.x && c === this.y)) {
                var h = this.getBehavior("__moveTo");
                h || (h = (new CAAT.Behavior.PathBehavior).setId("__moveTo").setValues(new CAAT.PathUtil.LinearPath), this.addBehavior(h));
                h.path.setInitialPosition(this.x, this.y).setFinalPosition(a, c);
                h.setDelayTime(e ? e : 0, d);
                f && h.setInterpolator(f);
                if (g)h.lifecycleListenerList = [], h.addListener({behaviorExpired:function (a, b, c) {
                    g(a, b, c)
                }});
                return this
            }
        }, rotateTo:function (a, c, d, e, f, g) {
            if (a !== this.rotationAngle) {
                var h =
                    this.getBehavior("__rotateTo");
                h || (h = (new CAAT.Behavior.RotateBehavior).setId("__rotateTo").setValues(0, 0, 0.5, 0.5), this.addBehavior(h));
                h.setValues(this.rotationAngle, a, e, f).setDelayTime(d ? d : 0, c);
                g && h.setInterpolator(g);
                return this
            }
        }, scaleTo:function (a, c, d, e, f, g, h) {
            if (!(this.scaleX === a && this.scaleY === c)) {
                var i = this.getBehavior("__scaleTo");
                i || (i = (new CAAT.Behavior.ScaleBehavior).setId("__scaleTo").setValues(1, 1, 1, 1, 0.5, 0.5), this.addBehavior(i));
                i.setValues(this.scaleX, a, this.scaleY, c, f, g).setDelayTime(e ?
                    e : 0, d);
                h && i.setInterpolator(h);
                return this
            }
        }, scaleXTo:function (a, c, d, e, f, g) {
            return this.__scale1To(CAAT.Behavior.Scale1Behavior.AXIS_X, a, c, d, e, f, g)
        }, scaleYTo:function (a, c, d, e, f, g) {
            return this.__scale1To(CAAT.Behavior.Scale1Behavior.AXIS_Y, a, c, d, e, f, g)
        }, __scale1To:function (a, c, d, e, f, g, h) {
            if (!(a === CAAT.Behavior.Scale1Behavior.AXIS_X && c === this.scaleX || a === CAAT.Behavior.Scale1Behavior.AXIS_Y && c === this.scaleY)) {
                var i = this.getBehavior("__scaleXTo");
                i || (i = (new CAAT.Behavior.Scale1Behavior).setId("__scaleXTo").setValues(1,
                    1, a === CAAT.Behavior.Scale1Behavior.AXIS_X, 0.5, 0.5), this.addBehavior(i));
                i.setValues(a ? this.scaleX : this.scaleY, c, f, g).setDelayTime(e ? e : 0, d);
                h && i.setInterpolator(h);
                return this
            }
        }, touchStart:function () {
        }, touchMove:function () {
        }, touchEnd:function () {
        }, gestureStart:function () {
        }, gestureChange:function (a, c, d) {
            this.gestureEnabled && (this.setRotation(a), this.setScale(c, d));
            return this
        }, gestureEnd:function () {
        }, isVisible:function () {
            return this.visible
        }, setupCollission:function (a, c) {
            this.collides = a;
            this.collidesAsRect =
                !c
        }, invalidate:function () {
            this.invalid = true
        }, setGestureEnabled:function (a) {
            this.gestureEnabled = !!a;
            return this
        }, isGestureEnabled:function () {
            return this.gestureEnabled
        }, getId:function () {
            return this.id
        }, setId:function (a) {
            this.id = a;
            return this
        }, setParent:function (a) {
            this.parent = a;
            return this
        }, setBackgroundImage:function (a, c) {
            if (a) {
                a = a instanceof CAAT.Foundation.SpriteImage ? a.getRef() : (new CAAT.Foundation.SpriteImage).initialize(a, 1, 1);
                a.setOwner(this);
                this.backgroundImage = a;
                if (typeof c === "undefined" ||
                    c)this.width = a.getWidth(), this.height = a.getHeight();
                this.glEnabled = true;
                this.invalidate()
            } else this.backgroundImage = null;
            return this
        }, setSpriteIndex:function (a) {
            this.backgroundImage && (this.backgroundImage.setSpriteIndex(a), this.invalidate());
            return this
        }, setBackgroundImageOffset:function (a, c) {
            this.backgroundImage && this.backgroundImage.setOffset(a, c);
            return this
        }, setAnimationImageIndex:function (a) {
            this.backgroundImage && (this.backgroundImage.resetAnimationTime(), this.backgroundImage.setAnimationImageIndex(a),
                this.invalidate());
            return this
        }, resetAnimationTime:function () {
            this.backgroundImage && (this.backgroundImage.resetAnimationTime(), this.invalidate());
            return this
        }, setChangeFPS:function (a) {
            this.backgroundImage && this.backgroundImage.setChangeFPS(a);
            return this
        }, setImageTransformation:function (a) {
            this.backgroundImage && this.backgroundImage.setSpriteTransformation(a);
            return this
        }, centerOn:function (a, c) {
            this.setPosition(a - this.width / 2, c - this.height / 2);
            return this
        }, centerAt:function (a, c) {
            this.setPosition(a -
                this.width / 2, c - this.height / 2);
            return this
        }, getTextureGLPage:function () {
            return this.backgroundImage.image.__texturePage
        }, setVisible:function (a) {
            this.invalidate();
            CAAT.currentDirector && CAAT.currentDirector.dirtyRectsEnabled && !a && this.visible && CAAT.currentDirector.scheduleDirtyRect(this.AABB);
            this.visible = a;
            return this
        }, setOutOfFrameTime:function () {
            this.setFrameTime(-1, 0);
            return this
        }, addListener:function (a) {
            this.lifecycleListenerList.push(a);
            return this
        }, removeListener:function (a) {
            for (var c = this.lifecycleListenerList.length; c--;)if (this.lifecycleListenerList[c] ===
                a) {
                this.lifecycleListenerList.splice(c, 1);
                break
            }
        }, setGlobalAlpha:function (a) {
            this.isGlobalAlpha = a;
            return this
        }, fireEvent:function (a, c) {
            for (var d = 0; d < this.lifecycleListenerList.length; d++)this.lifecycleListenerList[d].actorLifeCycleEvent(this, a, c)
        }, setExpired:function (a) {
            this.expired = true;
            this.fireEvent("expired", a);
            return this
        }, enableEvents:function (a) {
            this.mouseEnabled = a;
            return this
        }, emptyBehaviorList:function () {
            this.behaviorList = [];
            return this
        }, setFillStyle:function (a) {
            this.fillStyle = a;
            this.invalidate();
            return this
        }, setStrokeStyle:function (a) {
            this.strokeStyle = a;
            this.invalidate();
            return this
        }, setPaint:function (a) {
            return this.setFillStyle(a)
        }, setAlpha:function (a) {
            this.alpha = a;
            this.invalidate();
            return this
        }, resetTransform:function () {
            this.rotationAngle = 0;
            this.rotationY = this.rotationX = 0.5;
            this.scaleY = this.scaleX = 1;
            this.scaleTY = this.scaleTX = 0.5;
            this.scaleAnchor = 0;
            this.oldY = this.oldX = -1;
            this.dirty = true;
            return this
        }, setFrameTime:function (a, c) {
            this.start_time = a;
            this.duration = c;
            this.expired = false;
            this.dirty =
                true;
            return this
        }, paint:function (a, c) {
            if (this.backgroundImage)this.backgroundImage.paint(a, c, 0, 0); else if (this.fillStyle) {
                var d = a.ctx;
                d.fillStyle = this.fillStyle;
                d.fillRect(0, 0, this.width, this.height)
            }
        }, setScale:function (a, c) {
            this.scaleX = a;
            this.scaleY = c;
            this.dirty = true;
            return this
        }, getAnchorPercent:function (a) {
            var c = [0.5, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5, 0, 0, 1, 0, 0, 1, 1, 1];
            return{x:c[a * 2], y:c[a * 2 + 1]}
        }, getAnchor:function (a) {
            var c = 0, d = 0, e = CAAT.Foundation.Actor;
            switch (a) {
                case e.ANCHOR_CENTER:
                    d = c = 0.5;
                    break;
                case e.ANCHOR_TOP:
                    c =
                        0.5;
                    d = 0;
                    break;
                case e.ANCHOR_BOTTOM:
                    c = 0.5;
                    d = 1;
                    break;
                case e.ANCHOR_LEFT:
                    c = 0;
                    d = 0.5;
                    break;
                case e.ANCHOR_RIGHT:
                    c = 1;
                    d = 0.5;
                    break;
                case e.ANCHOR_TOP_RIGHT:
                    c = 1;
                    d = 0;
                    break;
                case e.ANCHOR_BOTTOM_LEFT:
                    c = 0;
                    d = 1;
                    break;
                case e.ANCHOR_BOTTOM_RIGHT:
                    d = c = 1;
                    break;
                case e.ANCHOR_TOP_LEFT:
                    d = c = 0
            }
            return{x:c, y:d}
        }, setGlobalAnchor:function (a, c) {
            this.scaleTX = this.rotationX = this.tAnchorX = a;
            this.scaleTY = this.rotationY = this.tAnchorY = c;
            this.dirty = true;
            return this
        }, setScaleAnchor:function (a, c) {
            this.scaleTX = a;
            this.scaleTY = c;
            this.dirty =
                true;
            return this
        }, setScaleAnchored:function (a, c, d, e) {
            this.scaleTX = d;
            this.scaleTY = e;
            this.scaleX = a;
            this.scaleY = c;
            this.dirty = true;
            return this
        }, setRotationAnchor:function (a, c) {
            this.rotationX = c;
            this.rotationY = a;
            this.dirty = true;
            return this
        }, setRotation:function (a) {
            this.rotationAngle = a;
            this.dirty = true;
            return this
        }, setRotationAnchored:function (a, c, d) {
            this.rotationAngle = a;
            this.rotationX = c;
            this.rotationY = d;
            this.dirty = true;
            return this
        }, setSize:function (a, c) {
            this.width = a;
            this.height = c;
            this.dirty = true;
            return this
        },
        setBounds:function (a, c, d, e) {
            this.x = a;
            this.y = c;
            this.width = d;
            this.height = e;
            this.dirty = true;
            return this
        }, setLocation:function (a, c) {
            this.x = a;
            this.y = c;
            this.oldX = a;
            this.oldY = c;
            this.dirty = true;
            return this
        }, setPosition:function (a, c) {
            return this.setLocation(a, c)
        }, setPositionAnchor:function (a, c) {
            this.tAnchorX = a;
            this.tAnchorY = c;
            return this
        }, setPositionAnchored:function (a, c, d, e) {
            this.setLocation(a, c);
            this.tAnchorX = d;
            this.tAnchorY = e;
            return this
        }, isInAnimationFrame:function (a) {
            if (this.expired)return false;
            if (this.duration ===
                Number.MAX_VALUE)return this.start_time <= a;
            return a >= this.start_time + this.duration ? (this.expired || this.setExpired(a), false) : this.start_time <= a && a < this.start_time + this.duration
        }, contains:function (a, c) {
            return a >= 0 && c >= 0 && a < this.width && c < this.height
        }, addBehavior:function (a) {
            this.behaviorList.push(a);
            return this
        }, removeBehaviour:function (a) {
            for (var c = this.behaviorList, d = c.length - 1; d;)if (c[d] === a) {
                c.splice(d, 1);
                break
            }
            return this
        }, removeBehaviorById:function (a) {
            for (var c = this.behaviorList, d = 0; d < c.length; d++)c[d].id ===
                a && c.splice(d, 1);
            return this
        }, getBehavior:function (a) {
            for (var c = this.behaviorList, d = 0; d < c.length; d++) {
                var e = c[d];
                if (e.id === a)return e
            }
            return null
        }, setDiscardable:function (a) {
            this.discardable = a;
            return this
        }, destroy:function (a) {
            this.parent && this.parent.removeChild(this);
            this.fireEvent("destroyed", a)
        }, modelToView:function (a) {
            var c, d, e, f;
            this.dirty && this.setModelViewMatrix();
            f = this.worldModelViewMatrix.matrix;
            if (a instanceof Array)for (var g = 0; g < a.length; g++)e = a[g], c = e.x, d = e.y, e.x = c * f[0] + d * f[1] + f[2], e.y =
                c * f[3] + d * f[4] + f[5]; else c = a.x, d = a.y, a.x = c * f[0] + d * f[1] + f[2], a.y = c * f[3] + d * f[4] + f[5];
            return a
        }, modelToModel:function (a, c) {
            this.dirty && this.setModelViewMatrix();
            return c.viewToModel(this.modelToView(a))
        }, viewToModel:function (a) {
            this.dirty && this.setModelViewMatrix();
            this.worldModelViewMatrixI = this.worldModelViewMatrix.getInverse();
            this.worldModelViewMatrixI.transformCoord(a);
            return a
        }, findActorAtPosition:function (a) {
            if (!this.visible || !this.mouseEnabled || !this.isInAnimationFrame(this.time))return null;
            this.modelViewMatrixI = this.modelViewMatrix.getInverse();
            this.modelViewMatrixI.transformCoord(a);
            return this.contains(a.x, a.y) ? this : null
        }, enableDrag:function () {
            this.ay = this.ax = 0;
            this.asy = this.asx = 1;
            this.screeny = this.screenx = this.ara = 0;
            this.mouseEnter = function () {
                this.__d_ay = this.__d_ax = -1;
                this.pointed = true;
                CAAT.setCursor("move")
            };
            this.mouseExit = function () {
                this.__d_ay = this.__d_ax = -1;
                this.pointed = false;
                CAAT.setCursor("default")
            };
            this.mouseMove = function () {
            };
            this.mouseUp = function () {
                this.__d_ay = this.__d_ax =
                    -1
            };
            this.mouseDrag = function (a) {
                var c;
                c = this.modelToView(new CAAT.Math.Point(a.x, a.y));
                this.parent.viewToModel(c);
                if (this.__d_ax === -1 || this.__d_ay === -1)this.__d_ax = c.x, this.__d_ay = c.y, this.__d_asx = this.scaleX, this.__d_asy = this.scaleY, this.__d_ara = this.rotationAngle, this.__d_screenx = a.screenPoint.x, this.__d_screeny = a.screenPoint.y;
                if (a.isShiftDown()) {
                    var d = (a.screenPoint.x - this.__d_screenx) / 100, e = (a.screenPoint.y - this.__d_screeny) / 100;
                    a.isAltDown() || (e = d = a = Math.max(d, e));
                    this.setScale(d + this.__d_asx,
                        e + this.__d_asy)
                } else a.isControlDown() ? this.setRotation(-Math.atan2(a.screenPoint.x - this.__d_screenx, a.screenPoint.y - this.__d_screeny) + this.__d_ara) : (this.x += c.x - this.__d_ax, this.y += c.y - this.__d_ay);
                this.__d_ax = c.x;
                this.__d_ay = c.y
            };
            return this
        }, disableDrag:function () {
            this.mouseEnter = function () {
            };
            this.mouseExit = function () {
            };
            this.mouseMove = function () {
            };
            this.mouseUp = function () {
            };
            this.mouseDrag = function () {
            };
            return this
        }, mouseClick:function () {
        }, mouseDblClick:function () {
        }, mouseEnter:function () {
            this.pointed =
                true
        }, mouseExit:function () {
            this.pointed = false
        }, mouseMove:function () {
        }, mouseDown:function () {
        }, mouseUp:function () {
        }, mouseOut:function () {
        }, mouseOver:function () {
        }, mouseDrag:function () {
        }, drawScreenBoundingBox:function (a) {
            if (null !== this.AABB && this.inFrame) {
                var c = this.AABB, a = a.ctx;
                a.strokeStyle = CAAT.DEBUGAABBCOLOR;
                a.strokeRect(0.5 + (c.x | 0), 0.5 + (c.y | 0), c.width | 0, c.height | 0);
                if (CAAT.DEBUGBB)c = this.viewVertices, a.beginPath(), a.lineTo(c[0].x, c[0].y), a.lineTo(c[1].x, c[1].y), a.lineTo(c[2].x, c[2].y), a.lineTo(c[3].x,
                    c[3].y), a.closePath(), a.strokeStyle = CAAT.DEBUGBBCOLOR, a.stroke()
            }
        }, animate:function (a, c) {
            if (!this.visible)return false;
            var d;
            if (!this.isInAnimationFrame(c))return this.inFrame = false, this.dirty = true, false;
            if (this.x !== this.oldX || this.y !== this.oldY)this.dirty = true, this.oldX = this.x, this.oldY = this.y;
            for (d = 0; d < this.behaviorList.length; d++)this.behaviorList[d].apply(c, this);
            this.clipPath && this.clipPath.applyBehaviors(c);
            this.setModelViewMatrix();
            if (this.dirty || this.wdirty || this.invalid)a.dirtyRectsEnabled &&
                a.addDirtyRect(this.AABB), this.setScreenBounds(), a.dirtyRectsEnabled && a.addDirtyRect(this.AABB);
            this.invalid = this.dirty = false;
            this.inFrame = true;
            return this.AABB.intersects(a.AABB)
        }, setModelViewMatrix:function () {
            var a, c, d, e, f, g, h, i, j, m, k;
            this.wdirty = false;
            k = this.modelViewMatrix.matrix;
            if (this.dirty) {
                h = 1;
                j = e = 0;
                g = 1;
                i = this.x - this.tAnchorX * this.width;
                m = this.y - this.tAnchorY * this.height;
                if (this.rotationAngle) {
                    var n = this.rotationX * this.width, l = this.rotationY * this.height;
                    i += h * n + e * l;
                    m += j * n + g * l;
                    a = Math.cos(this.rotationAngle);
                    c = Math.sin(this.rotationAngle);
                    d = h;
                    f = j;
                    h = d * a + e * c;
                    e = -d * c + e * a;
                    j = f * a + g * c;
                    g = -f * c + g * a;
                    i += -h * n - e * l;
                    m += -j * n - g * l
                }
                if (this.scaleX != 1 || this.scaleY != 1)a = this.scaleTX * this.width, c = this.scaleTY * this.height, i += h * a + e * c, m += j * a + g * c, h *= this.scaleX, e *= this.scaleY, j *= this.scaleX, g *= this.scaleY, i += -h * a - e * c, m += -j * a - g * c;
                k[0] = h;
                k[1] = e;
                k[2] = i;
                k[3] = j;
                k[4] = g;
                k[5] = m
            }
            if (this.parent) {
                if (this.isAA = this.rotationAngle === 0 && this.scaleX === 1 && this.scaleY === 1 && this.parent.isAA, this.dirty || this.parent.wdirty)this.worldModelViewMatrix.copy(this.parent.worldModelViewMatrix),
                    this.isAA ? (h = this.worldModelViewMatrix.matrix, h[2] += k[2], h[5] += k[5]) : this.worldModelViewMatrix.multiply(this.modelViewMatrix), this.wdirty = true
            } else {
                if (this.dirty)this.wdirty = true;
                this.worldModelViewMatrix.identity();
                this.isAA = this.rotationAngle === 0 && this.scaleX === 1 && this.scaleY === 1
            }
        }, setScreenBounds:function () {
            var a = this.AABB, c = this.viewVertices, d, e, f, g, h;
            if (this.isAA) {
                d = this.worldModelViewMatrix.matrix;
                e = d[2];
                f = d[5];
                g = this.width;
                h = this.height;
                a.x = e;
                a.y = f;
                a.x1 = e + g;
                a.y1 = f + h;
                a.width = g;
                a.height = h;
                if (CAAT.GLRENDER)d =
                    c[0], d.x = e, d.y = f, d = c[1], d.x = e + g, d.y = f, d = c[2], d.x = e + g, d.y = f + h, d = c[3], d.x = e, d.y = f + h;
                return this
            }
            d = c[0];
            d.x = 0;
            d.y = 0;
            d = c[1];
            d.x = this.width;
            d.y = 0;
            d = c[2];
            d.x = this.width;
            d.y = this.height;
            d = c[3];
            d.x = 0;
            d.y = this.height;
            this.modelToView(this.viewVertices);
            e = Number.MAX_VALUE;
            f = -Number.MAX_VALUE;
            g = Number.MAX_VALUE;
            h = -Number.MAX_VALUE;
            d = c[0];
            if (d.x < e)e = d.x;
            if (d.x > f)f = d.x;
            if (d.y < g)g = d.y;
            if (d.y > h)h = d.y;
            d = c[1];
            if (d.x < e)e = d.x;
            if (d.x > f)f = d.x;
            if (d.y < g)g = d.y;
            if (d.y > h)h = d.y;
            d = c[2];
            if (d.x < e)e = d.x;
            if (d.x > f)f = d.x;
            if (d.y < g)g =
                d.y;
            if (d.y > h)h = d.y;
            d = c[3];
            if (d.x < e)e = d.x;
            if (d.x > f)f = d.x;
            if (d.y < g)g = d.y;
            if (d.y > h)h = d.y;
            a.x = e;
            a.y = g;
            a.x1 = f;
            a.y1 = h;
            a.width = f - e;
            a.height = h - g;
            return this
        }, paintActor:function (a, c) {
            if (!this.visible || !a.inDirtyRect(this))return true;
            var d = a.ctx;
            this.frameAlpha = this.parent ? this.parent.frameAlpha * this.alpha : 1;
            d.globalAlpha = this.frameAlpha;
            a.modelViewMatrix.transformRenderingContextSet(d);
            this.worldModelViewMatrix.transformRenderingContext(d);
            this.clip && (d.beginPath(), this.clipPath ? this.clipPath.applyAsPath(a) :
                d.rect(0, 0, this.width, this.height), d.clip());
            this.paint(a, c);
            return true
        }, __paintActor:function (a, c) {
            if (!this.visible)return true;
            var d = a.ctx;
            this.frameAlpha = this.alpha;
            var e = this.worldModelViewMatrix.matrix;
            d.setTransform(e[0], e[3], e[1], e[4], e[2], e[5], this.frameAlpha);
            this.paint(a, c);
            return true
        }, paintActorGL:function (a) {
            this.frameAlpha = this.parent.frameAlpha * this.alpha;
            if (this.glEnabled && this.visible)if (this.glNeedsFlush(a)) {
                a.glFlush();
                this.glSetShader(a);
                if (!this.__uv)this.__uv = new Float32Array(8);
                if (!this.__vv)this.__vv = new Float32Array(12);
                this.setGLCoords(this.__vv, 0);
                this.setUV(this.__uv, 0);
                a.glRender(this.__vv, 12, this.__uv)
            } else {
                var c = a.coordsIndex;
                this.setGLCoords(a.coords, c);
                a.coordsIndex = c + 12;
                this.setUV(a.uv, a.uvIndex);
                a.uvIndex += 8
            }
        }, setGLCoords:function (a, c) {
            var d = this.viewVertices;
            a[c++] = d[0].x;
            a[c++] = d[0].y;
            a[c++] = 0;
            a[c++] = d[1].x;
            a[c++] = d[1].y;
            a[c++] = 0;
            a[c++] = d[2].x;
            a[c++] = d[2].y;
            a[c++] = 0;
            a[c++] = d[3].x;
            a[c++] = d[3].y;
            a[c] = 0
        }, setUV:function (a, c) {
            this.backgroundImage.setUV(a, c)
        }, glNeedsFlush:function (a) {
            return this.getTextureGLPage() !==
                a.currentTexturePage ? true : this.frameAlpha !== a.currentOpacity ? true : false
        }, glSetShader:function (a) {
            var c = this.getTextureGLPage();
            c !== a.currentTexturePage && a.setGLTexturePage(c);
            this.frameAlpha !== a.currentOpacity && a.setGLCurrentOpacity(this.frameAlpha)
        }, endAnimate:function () {
            return this
        }, initialize:function (a) {
            if (a)for (var c in a)this[c] = a[c];
            return this
        }, setClip:function (a, c) {
            this.clip = a;
            this.clipPath = c;
            return this
        }, isCached:function () {
            return this.cached
        }, stopCacheAsBitmap:function () {
            if (this.cached)this.backgroundImage =
                null, this.cached = CAAT.Foundation.Actor.CACHE_NONE
        }, cacheAsBitmap:function (a, c) {
            var a = a || 0, d = document.createElement("canvas");
            d.width = this.width;
            d.height = this.height;
            var e = d.getContext("2d");
            CAAT.Foundation.Actor.prototype.animate.call(this, CAAT.currentDirector, a);
            var e = {ctx:e, modelViewMatrix:new CAAT.Math.Matrix, worldModelViewMatrix:new CAAT.Math.Matrix, dirtyRectsEnabled:false, inDirtyRect:function () {
                return true
            }, AABB:new CAAT.Math.Rectangle(0, 0, this.width, this.height)}, f = this.modelViewMatrix, g = this.worldModelViewMatrix;
            this.modelViewMatrix = new CAAT.Math.Matrix;
            this.worldModelViewMatrix = new CAAT.Math.Matrix;
            this.cached = CAAT.Foundation.Actor.CACHE_NONE;
            if (typeof c === "undefined")c = CAAT.Foundation.Actor.CACHE_SIMPLE;
            c === CAAT.Foundation.Actor.CACHE_DEEP ? (this.animate(e, a), this.paintActor(e, a)) : this instanceof CAAT.Foundation.ActorContainer || this instanceof CAAT.ActorContainer ? CAAT.Foundation.ActorContainer.superclass.paintActor.call(this, e, a) : (this.animate(e, a), this.paintActor(e, a));
            this.setBackgroundImage(d);
            this.cached =
                c;
            this.modelViewMatrix = f;
            this.worldModelViewMatrix = g;
            return this
        }, setAsButton:function (a, c, d, e, f, g) {
            this.setBackgroundImage(a, true);
            this.iNormal = c || 0;
            this.iOver = d || this.iNormal;
            this.iPress = e || this.iNormal;
            this.iDisabled = f || this.iNormal;
            this.fnOnClick = g;
            this.enabled = true;
            this.setSpriteIndex(c);
            this.setEnabled = function (a) {
                this.enabled = a;
                this.setSpriteIndex(this.enabled ? this.iNormal : this.iDisabled);
                return this
            };
            this.actionPerformed = function () {
                this.enabled && this.fnOnClick && this.fnOnClick(this)
            };
            this.mouseEnter =
                function () {
                    this.enabled && (this.dragging ? this.setSpriteIndex(this.iPress) : this.setSpriteIndex(this.iOver), CAAT.setCursor("pointer"))
                };
            this.mouseExit = function () {
                this.enabled && (this.setSpriteIndex(this.iNormal), CAAT.setCursor("default"))
            };
            this.mouseDown = function () {
                this.enabled && this.setSpriteIndex(this.iPress)
            };
            this.mouseUp = function () {
                if (this.enabled)this.setSpriteIndex(this.iNormal), this.dragging = false
            };
            this.mouseClick = function () {
            };
            this.mouseDrag = function () {
                if (this.enabled)this.dragging = true
            };
            this.setButtonImageIndex =
                function (a, b, c, d) {
                    this.iNormal = a || 0;
                    this.iOver = b || this.iNormal;
                    this.iPress = c || this.iNormal;
                    this.iDisabled = d || this.iNormal;
                    this.setSpriteIndex(this.iNormal);
                    return this
                };
            return this
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.ActorContainer", aliases:["CAAT.ActorContainer"], depends:["CAAT.Foundation.Actor", "CAAT.Math.Point", "CAAT.Math.Rectangle"], constants:{AddHint:{CONFORM:1}}, extendsClass:"CAAT.Foundation.Actor", extendsWith:function () {
    var a = CAAT.Foundation.Actor.CACHE_DEEP, b = CAAT.Foundation.ActorContainer.superclass, c = b.drawScreenBoundingBox, d = b.paintActor, e = b.paintActorGL, f = b.animate, g = b.findActorAtPosition, h = b.destroy;
    return{__init:function (a) {
        this.__super();
        this.childrenList = [];
        this.activeChildren = [];
        this.pendingChildrenList = [];
        if (typeof a !== "undefined")this.addHint = a, this.boundingBox = new CAAT.Math.Rectangle;
        return this
    }, childrenList:null, activeChildren:null, pendingChildrenList:null, addHint:0, boundingBox:null, runion:new CAAT.Math.Rectangle, layoutManager:null, layoutInvalidated:true, setLayout:function (a) {
        this.layoutManager = a;
        return this
    }, setBounds:function (a, b, c, d) {
        CAAT.Foundation.ActorContainer.superclass.setBounds.call(this, a, b, c, d);
        CAAT.currentDirector && !CAAT.currentDirector.inValidation &&
        this.invalidateLayout();
        return this
    }, __validateLayout:function () {
        this.__validateTree();
        this.layoutInvalidated = false
    }, __validateTree:function () {
        if (this.layoutManager && this.layoutManager.isInvalidated()) {
            CAAT.currentDirector.inValidation = true;
            this.layoutManager.doLayout(this);
            for (var a = 0; a < this.getNumChildren(); a += 1)this.getChildAt(a).__validateLayout()
        }
    }, invalidateLayout:function () {
        this.layoutInvalidated = true;
        if (this.layoutManager) {
            this.layoutManager.invalidateLayout(this);
            for (var a = 0; a < this.getNumChildren(); a +=
                1)this.getChildAt(a).invalidateLayout()
        }
    }, getLayout:function () {
        return this.layoutManager
    }, drawScreenBoundingBox:function (a, b) {
        if (this.inFrame) {
            for (var d = this.childrenList, e = 0; e < d.length; e++)d[e].drawScreenBoundingBox(a, b);
            c.call(this, a, b)
        }
    }, emptyChildren:function () {
        this.childrenList = [];
        return this
    }, paintActor:function (b, c) {
        if (!this.visible)return false;
        var e = b.ctx;
        e.save();
        if (!d.call(this, b, c))return false;
        if (this.cached === a)return false;
        if (!this.isGlobalAlpha)this.frameAlpha = this.parent ? this.parent.frameAlpha :
            1;
        for (var g = 0, f = this.activeChildren.length; g < f; ++g) {
            var h = this.activeChildren[g];
            h.visible && (e.save(), h.paintActor(b, c), e.restore())
        }
        e.restore();
        return true
    }, __paintActor:function (a, b) {
        if (!this.visible)return true;
        var c = a.ctx;
        this.frameAlpha = this.parent ? this.parent.frameAlpha * this.alpha : 1;
        var d = this.worldModelViewMatrix.matrix;
        c.setTransform(d[0], d[3], d[1], d[4], d[2], d[5], this.frameAlpha);
        this.paint(a, b);
        if (!this.isGlobalAlpha)this.frameAlpha = this.parent ? this.parent.frameAlpha : 1;
        c = 0;
        for (d = this.activeChildren.length; c <
            d; ++c)this.activeChildren[c].paintActor(a, b);
        return true
    }, paintActorGL:function (a, b) {
        var c, d, g;
        if (!this.visible)return true;
        e.call(this, a, b);
        if (!this.isGlobalAlpha)this.frameAlpha = this.parent.frameAlpha;
        for (c = 0, d = this.activeChildren.length; c < d; ++c)g = this.activeChildren[c], g.paintActorGL(a, b)
    }, animate:function (b, c) {
        if (!this.visible)return false;
        this.activeChildren = [];
        if (false === f.call(this, b, c))return false;
        if (this.cached === a)return true;
        this.__validateLayout();
        CAAT.currentDirector.inValidation = false;
        var d, e, g = this.pendingChildrenList;
        for (d = 0; d < g.length; d++)e = g[d], this.addChildImmediately(e.child, e.constraint);
        this.pendingChildrenList = [];
        g = [];
        e = this.childrenList;
        this.size_total = this.size_active = 1;
        for (d = 0; d < e.length; d++) {
            var h = e[d];
            h.time = c;
            this.size_total += h.size_total;
            h.animate(b, c) ? (this.activeChildren.push(h), this.size_active += h.size_active) : h.expired && h.discardable && g.push(h)
        }
        for (d = 0, e = g.length; d < e; d++)h = g[d], h.destroy(c), b.dirtyRectsEnabled && b.addDirtyRect(h.AABB);
        return true
    }, endAnimate:function () {
    },
        addChildImmediately:function (a, b) {
            return this.addChild(a, b)
        }, addChild:function (a, b) {
            if (a.parent != null)throw"adding to a container an element with parent.";
            a.parent = this;
            this.childrenList.push(a);
            a.dirty = true;
            this.layoutManager ? (this.layoutManager.addChild(a, b), this.invalidateLayout()) : this.addHint === CAAT.Foundation.ActorContainer.AddHint.CONFORM && this.recalcSize();
            return this
        }, recalcSize:function () {
            var a = this.boundingBox;
            a.setEmpty();
            for (var b = this.childrenList, c, d = 0; d < b.length; d++)c = b[d], this.runion.setBounds(c.x <
                0 ? 0 : c.x, c.y < 0 ? 0 : c.y, c.width, c.height), a.unionRectangle(this.runion);
            this.setSize(a.x1, a.y1);
            return this
        }, addChildDelayed:function (a, b) {
            this.pendingChildrenList.push({child:a, constraint:b});
            return this
        }, addChildAt:function (a, b) {
            if (b <= 0)return a.parent = this, a.dirty = true, this.childrenList.splice(0, 0, a), this.invalidateLayout(), this; else if (b >= this.childrenList.length)b = this.childrenList.length;
            a.parent = this;
            a.dirty = true;
            this.childrenList.splice(b, 0, a);
            this.invalidateLayout();
            return this
        }, findActorById:function (a) {
            for (var b =
                this.childrenList, c = 0, d = b.length; c < d; c++)if (b[c].id === a)return b[c];
            return null
        }, findChild:function (a) {
            var b = this.childrenList, c, d = b.length;
            for (c = 0; c < d; c++)if (b[c] === a)return c;
            return-1
        }, removeChildAt:function (a) {
            var b = this.childrenList;
            return-1 !== a && a >= 0 && a < this.childrenList.length ? (b[a].setParent(null), a = b.splice(a, 1), a[0].isVisible() && CAAT.currentDirector.dirtyRectsEnabled && CAAT.currentDirector.scheduleDirtyRect(a[0].AABB), this.invalidateLayout(), a[0]) : null
        }, removeChild:function (a) {
            return this.removeChildAt(this.findChild(a))
        },
        removeFirstChild:function () {
            var a = this.childrenList.shift();
            a.parent = null;
            a.isVisible() && CAAT.currentDirector.dirtyRectsEnabled && CAAT.currentDirector.scheduleDirtyRect(a.AABB);
            this.invalidateLayout();
            return a
        }, removeLastChild:function () {
            if (this.childrenList.length) {
                var a = this.childrenList.pop();
                a.parent = null;
                a.isVisible() && CAAT.currentDirector.dirtyRectsEnabled && CAAT.currentDirector.scheduleDirtyRect(a.AABB);
                this.invalidateLayout();
                return a
            }
            return null
        }, findActorAtPosition:function (a) {
            if (null === g.call(this,
                a))return null;
            for (var b = this.childrenList.length - 1; b >= 0; b--) {
                var c = this.childrenList[b], d = new CAAT.Math.Point(a.x, a.y, 0), c = c.findActorAtPosition(d);
                if (null !== c)return c
            }
            return this
        }, destroy:function () {
            for (var a = this.childrenList, b = a.length - 1; b >= 0; b--)a[b].destroy();
            h.call(this);
            return this
        }, getNumChildren:function () {
            return this.childrenList.length
        }, getNumActiveChildren:function () {
            return this.activeChildren.length
        }, getChildAt:function (a) {
            return this.childrenList[a]
        }, setZOrder:function (a, b) {
            var c =
                this.findChild(a);
            if (-1 !== c) {
                var d = this.childrenList;
                if (b !== c) {
                    if (b >= d.length)d.splice(c, 1), d.push(a); else {
                        c = d.splice(c, 1);
                        if (b < 0)b = 0; else if (b > d.length)b = d.length;
                        d.splice(b, 0, c[0])
                    }
                    this.invalidateLayout()
                }
            }
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.Scene", depends:"CAAT.Math.Point,CAAT.Math.Matrix,CAAT.PathUtil.Path,CAAT.Behavior.GenericBehavior,CAAT.Behavior.ContainerBehavior,CAAT.Behavior.ScaleBehavior,CAAT.Behavior.AlphaBehavior,CAAT.Behavior.RotateBehavior,CAAT.Behavior.PathBehavior,CAAT.Foundation.ActorContainer,CAAT.Foundation.Timer.TimerManager".split(","), aliases:["CAAT.Scene"], extendsClass:"CAAT.Foundation.ActorContainer", constants:{EASE_ROTATION:1, EASE_SCALE:2, EASE_TRANSLATE:3}, extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.timerManager = new CAAT.TimerManager;
        this.fillStyle = null;
        this.isGlobalAlpha = true;
        return this
    }, easeContainerBehaviour:null, easeContainerBehaviourListener:null, easeIn:false, paused:false, timerManager:null, isPaused:function () {
        return this.paused
    }, setPaused:function (a) {
        this.paused = a
    }, createTimer:function (a, b, c, d, e) {
        return this.timerManager.createTimer(a, b, c, d, e)
    }, animate:function (a, b) {
        this.timerManager.checkTimers(b);
        CAAT.Foundation.Scene.superclass.animate.call(this, a, b);
        this.timerManager.removeExpiredTimers()
    },
        createAlphaBehaviour:function (a, b) {
            var c = new CAAT.Behavior.AlphaBehavior;
            c.setFrameTime(0, a);
            c.startAlpha = b ? 0 : 1;
            c.endAlpha = b ? 1 : 0;
            this.easeContainerBehaviour.addBehavior(c)
        }, easeTranslationIn:function (a, b, c, d) {
            this.easeTranslation(a, b, c, true, d)
        }, easeTranslationOut:function (a, b, c, d) {
            this.easeTranslation(a, b, c, false, d)
        }, easeTranslation:function (a, b, c, d, e) {
            this.easeContainerBehaviour = new CAAT.Behavior.ContainerBehavior;
            this.easeIn = d;
            var f = new CAAT.Behavior.PathBehavior;
            e && f.setInterpolator(e);
            f.setFrameTime(0,
                a);
            c < 1 ? c = 1 : c > 4 && (c = 4);
            switch (c) {
                case CAAT.Actor.ANCHOR_TOP:
                    d ? f.setPath((new CAAT.PathUtil.Path).setLinear(0, -this.height + 1, 0, 0)) : f.setPath((new CAAT.PathUtil.Path).setLinear(0, 0, 0, -this.height + 1));
                    break;
                case CAAT.Actor.ANCHOR_BOTTOM:
                    d ? f.setPath((new CAAT.PathUtil.Path).setLinear(0, this.height - 1, 0, 0)) : f.setPath((new CAAT.PathUtil.Path).setLinear(0, 0, 0, this.height - 1));
                    break;
                case CAAT.Actor.ANCHOR_LEFT:
                    d ? f.setPath((new CAAT.PathUtil.Path).setLinear(-this.width + 1, 0, 0, 0)) : f.setPath((new CAAT.PathUtil.Path).setLinear(0,
                        0, -this.width + 1, 0));
                    break;
                case CAAT.Actor.ANCHOR_RIGHT:
                    d ? f.setPath((new CAAT.PathUtil.Path).setLinear(this.width - 1, 0, 0, 0)) : f.setPath((new CAAT.PathUtil.Path).setLinear(0, 0, this.width - 1, 0))
            }
            b && this.createAlphaBehaviour(a, d);
            this.easeContainerBehaviour.addBehavior(f);
            this.easeContainerBehaviour.setFrameTime(this.time, a);
            this.easeContainerBehaviour.addListener(this);
            this.emptyBehaviorList();
            CAAT.Foundation.Scene.superclass.addBehavior.call(this, this.easeContainerBehaviour)
        }, easeScaleIn:function (a, b, c, d, e) {
            this.easeScale(a, b, c, d, true, e);
            this.easeIn = true
        }, easeScaleOut:function (a, b, c, d, e) {
            this.easeScale(a, b, c, d, false, e);
            this.easeIn = false
        }, easeScale:function (a, b, c, d, e, f) {
            this.easeContainerBehaviour = new CAAT.Behavior.ContainerBehavior;
            var g = 0, h = 0, i = 0, j = 0;
            switch (d) {
                case CAAT.Actor.ANCHOR_TOP_LEFT:
                case CAAT.Actor.ANCHOR_TOP_RIGHT:
                case CAAT.Actor.ANCHOR_BOTTOM_LEFT:
                case CAAT.Actor.ANCHOR_BOTTOM_RIGHT:
                case CAAT.Actor.ANCHOR_CENTER:
                    j = i = 1;
                    break;
                case CAAT.Actor.ANCHOR_TOP:
                case CAAT.Actor.ANCHOR_BOTTOM:
                    i =
                        g = 1;
                    h = 0;
                    j = 1;
                    break;
                case CAAT.Actor.ANCHOR_LEFT:
                case CAAT.Actor.ANCHOR_RIGHT:
                    j = h = 1;
                    g = 0;
                    i = 1;
                    break;
                default:
                    alert("scale anchor ?? " + d)
            }
            if (!e) {
                var m;
                m = g;
                g = i;
                i = m;
                m = h;
                h = j;
                j = m
            }
            c && this.createAlphaBehaviour(b, e);
            c = this.getAnchorPercent(d);
            a = (new CAAT.Behavior.ScaleBehavior).setFrameTime(a, b).setValues(g, i, h, j, c.x, c.y);
            f && a.setInterpolator(f);
            this.easeContainerBehaviour.addBehavior(a);
            this.easeContainerBehaviour.setFrameTime(this.time, b);
            this.easeContainerBehaviour.addListener(this);
            this.emptyBehaviorList();
            CAAT.Foundation.Scene.superclass.addBehavior.call(this, this.easeContainerBehaviour)
        }, addBehavior:function () {
            return this
        }, easeRotationIn:function (a, b, c, d) {
            this.easeRotation(a, b, c, true, d);
            this.easeIn = true
        }, easeRotationOut:function (a, b, c, d) {
            this.easeRotation(a, b, c, false, d);
            this.easeIn = false
        }, easeRotation:function (a, b, c, d, e) {
            this.easeContainerBehaviour = new CAAT.ContainerBehavior;
            var f = 0, g = 0;
            if (c == CAAT.Actor.ANCHOR_CENTER)c = CAAT.Actor.ANCHOR_TOP;
            switch (c) {
                case CAAT.Actor.ANCHOR_TOP:
                case CAAT.Actor.ANCHOR_BOTTOM:
                case CAAT.Actor.ANCHOR_LEFT:
                case CAAT.Actor.ANCHOR_RIGHT:
                    f =
                        Math.PI * (Math.random() < 0.5 ? 1 : -1);
                    break;
                case CAAT.Actor.ANCHOR_TOP_LEFT:
                case CAAT.Actor.ANCHOR_TOP_RIGHT:
                case CAAT.Actor.ANCHOR_BOTTOM_LEFT:
                case CAAT.Actor.ANCHOR_BOTTOM_RIGHT:
                    f = Math.PI / 2 * (Math.random() < 0.5 ? 1 : -1);
                    break;
                default:
                    alert("rot anchor ?? " + c)
            }
            if (false === d)var h = f, f = g, g = h;
            b && this.createAlphaBehaviour(a, d);
            b = this.getAnchorPercent(c);
            f = (new CAAT.RotateBehavior).setFrameTime(0, a).setValues(f, g, b.x, b.y);
            e && f.setInterpolator(e);
            this.easeContainerBehaviour.addBehavior(f);
            this.easeContainerBehaviour.setFrameTime(this.time,
                a);
            this.easeContainerBehaviour.addListener(this);
            this.emptyBehaviorList();
            CAAT.Foundation.Scene.superclass.addBehavior.call(this, this.easeContainerBehaviour)
        }, setEaseListener:function (a) {
            this.easeContainerBehaviourListener = a
        }, behaviorExpired:function () {
            this.easeContainerBehaviourListener.easeEnd(this, this.easeIn)
        }, activated:function () {
        }, setExpired:function (a) {
            this.expired = a
        }, paint:function (a) {
            if (this.fillStyle)a = a.ctx, a.fillStyle = this.fillStyle, a.fillRect(0, 0, this.width, this.height)
        }, findActorAtPosition:function (a) {
            var b,
                c, d = new CAAT.Math.Point;
            if (this.inputList) {
                var e = this.inputList;
                for (b = 0; b < e.length; b++) {
                    var f = e[b];
                    for (c = 0; c < f.length; c++)if (d.set(a.x, a.y), f[c].worldModelViewMatrix.getInverse().transformCoord(d), f[c].contains(d.x, d.y))return f[c]
                }
            }
            d.set(a.x, a.y);
            return CAAT.Foundation.Scene.superclass.findActorAtPosition.call(this, d)
        }, enableInputList:function (a) {
            this.inputList = [];
            for (var b = 0; b < a; b++)this.inputList.push([]);
            return this
        }, addActorToInputList:function (a, b, c) {
            b < 0 ? b = 0 : b >= this.inputList.length && (b = this.inputList.length -
                1);
            b = this.inputList[b];
            typeof c === "undefined" || c >= b.length ? b.push(a) : c <= 0 ? b.unshift(a) : b.splice(c, 0, a);
            return this
        }, emptyInputList:function (a) {
            a < 0 ? a = 0 : a >= this.inputList.length && (a = this.inputList.length - 1);
            this.inputList[a] = [];
            return this
        }, removeActorFromInputList:function (a, b) {
            if (typeof b === "undefined") {
                var c, d;
                for (c = 0; c < this.inputList.length; c++) {
                    var e = this.inputList[c];
                    for (d = 0; d < e.length; d++)e[d] == a && e.splice(d, 1)
                }
                return this
            }
            b < 0 ? b = 0 : b >= this.inputList.length && (b = this.inputList.length - 1);
            e = this.inputList[b];
            for (d = 0; d < e.length; d++)e[d] == a && e.splice(d, 1);
            return this
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.Director", aliases:["CAAT.Director"], extendsClass:"CAAT.Foundation.ActorContainer", depends:"CAAT.Core.Class,CAAT.Core.Constants,CAAT.Foundation.ActorContainer,CAAT.Module.Audio.AudioManager,CAAT.Module.Runtime.BrowserInfo,CAAT.Module.Debug.Debug,CAAT.Math.Point,CAAT.Math.Rectangle,CAAT.Math.Matrix,CAAT.Foundation.Timer.TimerManager,CAAT.Foundation.Actor,CAAT.Foundation.Scene,CAAT.Event.AnimationLoop,CAAT.Event.Input,CAAT.Event.KeyEvent,CAAT.Event.MouseEvent,CAAT.Event.TouchEvent,CAAT.WebGL.Program,CAAT.WebGL.ColorProgram,CAAT.WebGL.TextureProgram,CAAT.WebGL.GLU,CAAT.Module.TexturePacker.TexturePageManager".split(","), constants:{RENDER_MODE_CONTINUOUS:1,
    RENDER_MODE_DIRTY:2, CLEAR_DIRTY_RECTS:1, CLEAR_ALL:true, CLEAR_NONE:false, RESIZE_NONE:1, RESIZE_WIDTH:2, RESIZE_HEIGHT:4, RESIZE_BOTH:8, RESIZE_PROPORTIONAL:16}, extendsWith:function () {
    return{__init:function () {
        this.__super();
        this.browserInfo = CAAT.Module.Runtime.BrowserInfo;
        this.audioManager = (new CAAT.Module.Audio.AudioManager).initialize(8);
        this.scenes = [];
        this.mousePoint = new CAAT.Math.Point(0, 0, 0);
        this.prevMousePoint = new CAAT.Math.Point(0, 0, 0);
        this.screenMousePoint = new CAAT.Math.Point(0, 0, 0);
        this.isMouseDown =
            false;
        this.lastSelectedActor = null;
        this.dragging = false;
        this.cDirtyRects = [];
        this.sDirtyRects = [];
        this.dirtyRects = [];
        for (var a = 0; a < 64; a++)this.dirtyRects.push(new CAAT.Math.Rectangle);
        this.dirtyRectsIndex = 0;
        this.touches = {};
        this.timerManager = new CAAT.Foundation.Timer.TimerManager;
        return this
    }, debug:false, renderMode:CAAT.Foundation.Director.RENDER_MODE_CONTINUOUS, onRenderStart:null, onRenderEnd:null, mousePoint:null, prevMousePoint:null, screenMousePoint:null, isMouseDown:false, lastSelectedActor:null, dragging:false,
        scenes:null, currentScene:null, canvas:null, ctx:null, time:0, timeline:0, imagesCache:null, audioManager:null, clear:CAAT.Foundation.Director.CLEAR_ALL, transitionScene:null, browserInfo:null, gl:null, glEnabled:false, glTextureManager:null, glTtextureProgram:null, glColorProgram:null, pMatrix:null, coords:null, coordsIndex:0, uv:null, uvIndex:0, front_to_back:false, statistics:{size_total:0, size_active:0, size_dirtyRects:0, draws:0, size_discarded_by_dirty_rects:0}, currentTexturePage:0, currentOpacity:1, intervalId:null,
        frameCounter:0, resize:1, onResizeCallback:null, __gestureScale:0, __gestureRotation:0, dirtyRects:null, cDirtyRects:null, sDirtyRects:null, dirtyRectsIndex:0, dirtyRectsEnabled:false, nDirtyRects:0, drDiscarded:0, stopped:false, needsRepaint:false, touches:null, timerManager:null, clean:function () {
            this.audioManager = this.imagesCache = this.currentScene = this.scenes = null;
            this.isMouseDown = false;
            this.lastSelectedActor = null;
            this.dragging = false;
            this.__gestureRotation = this.__gestureScale = 0;
            this.dirty = true;
            this.cDirtyRects =
                this.dirtyRects = null;
            this.dirtyRectsIndex = 0;
            this.dirtyRectsEnabled = false;
            this.nDirtyRects = 0;
            this.onResizeCallback = null;
            return this
        }, createTimer:function (a, b, c, d, e) {
            this.timerManager.createTimer(a, b, c, d, e);
            return this
        }, requestRepaint:function () {
            this.needsRepaint = true
        }, getCurrentScene:function () {
            return this.currentScene
        }, checkDebug:function () {
            if (CAAT.DEBUG) {
                var a = (new CAAT.Module.Debug.Debug).initialize(this.width, 60);
                this.debugInfo = a.debugInfo.bind(a)
            }
        }, getRenderType:function () {
            return this.glEnabled ?
                "WEBGL" : "CANVAS"
        }, windowResized:function (a, b) {
            var c = CAAT.Foundation.Director;
            switch (this.resize) {
                case c.RESIZE_WIDTH:
                    this.setBounds(0, 0, a, this.height);
                    break;
                case c.RESIZE_HEIGHT:
                    this.setBounds(0, 0, this.width, b);
                    break;
                case c.RESIZE_BOTH:
                    this.setBounds(0, 0, a, b);
                    break;
                case c.RESIZE_PROPORTIONAL:
                    this.setScaleProportional(a, b)
            }
            this.glEnabled && this.glReset();
            if (this.onResizeCallback)this.onResizeCallback(this, a, b)
        }, setScaleProportional:function (a, b) {
            var c = Math.min(a / this.referenceWidth, b / this.referenceHeight);
            this.setScaleAnchored(c, c, 0, 0);
            this.canvas.width = this.referenceWidth * c;
            this.canvas.height = this.referenceHeight * c;
            this.ctx = this.canvas.getContext(this.glEnabled ? "experimental-webgl" : "2d");
            this.glEnabled && this.glReset()
        }, enableResizeEvents:function (a, b) {
            var c = CAAT.Foundation.Director;
            a === c.RESIZE_BOTH || a === c.RESIZE_WIDTH || a === c.RESIZE_HEIGHT || a === c.RESIZE_PROPORTIONAL ? (this.referenceWidth = this.width, this.referenceHeight = this.height, this.resize = a, CAAT.registerResizeListener(this), this.onResizeCallback =
                b, this.windowResized(window.innerWidth, window.innerHeight)) : (CAAT.unregisterResizeListener(this), this.onResizeCallback = null);
            return this
        }, setBounds:function (a, b, c, d) {
            CAAT.Foundation.Director.superclass.setBounds.call(this, a, b, c, d);
            this.canvas.width = c;
            this.canvas.height = d;
            this.ctx = this.canvas.getContext(this.glEnabled ? "experimental-webgl" : "2d");
            for (a = 0; a < this.scenes.length; a++)this.scenes[a].setBounds(0, 0, c, d);
            this.glEnabled && this.glReset();
            return this
        }, initialize:function (a, b, c, d) {
            typeof c !== "undefined" &&
            (isString(c) ? c = document.getElementById(c) : c instanceof HTMLCanvasElement || console.log("Canvas is a: " + c + " ???"));
            c || (c = document.createElement("canvas"), document.body.appendChild(c));
            this.canvas = c;
            typeof d === "undefined" && (d = c);
            this.setBounds(0, 0, a, b);
            this.enableEvents(d);
            this.timeline = (new Date).getTime();
            this.transitionScene = (new CAAT.Foundation.Scene).setBounds(0, 0, a, b);
            c = document.createElement("canvas");
            c.width = a;
            c.height = b;
            a = (new CAAT.Foundation.Actor).setBackgroundImage(c);
            this.transitionScene.ctx =
                c.getContext("2d");
            this.transitionScene.addChildImmediately(a);
            this.transitionScene.setEaseListener(this);
            this.checkDebug();
            return this
        }, glReset:function () {
            this.pMatrix = makeOrtho(0, this.referenceWidth, this.referenceHeight, 0, -1, 1);
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.glColorProgram.setMatrixUniform(this.pMatrix);
            this.glTextureProgram.setMatrixUniform(this.pMatrix);
            this.gl.viewportWidth = this.canvas.width;
            this.gl.viewportHeight = this.canvas.height
        }, initializeGL:function (a, b, c) {
            c || (c = document.createElement("canvas"), document.body.appendChild(c));
            c.width = a;
            c.height = b;
            this.referenceWidth = a;
            this.referenceHeight = b;
            try {
                this.gl = c.getContext("experimental-webgl"), this.gl.viewportWidth = a, this.gl.viewportHeight = b, CAAT.GLRENDER = true
            } catch (d) {
            }
            if (this.gl)this.canvas = c, this.setBounds(0, 0, a, b), this.enableEvents(c), this.timeline = (new Date).getTime(), this.glColorProgram = (new CAAT.WebGL.ColorProgram(this.gl)).create().initialize(), this.glTextureProgram = (new CAAT.WebGL.TextureProgram(this.gl)).create().initialize(),
                this.glTextureProgram.useProgram(), this.glReset(), this.coords = new Float32Array(6144), this.uv = new Float32Array(4096), this.gl.clearColor(0, 0, 0, 255), this.front_to_back ? (this.gl.clearDepth(1), this.gl.enable(this.gl.DEPTH_TEST), this.gl.depthFunc(this.gl.LESS)) : this.gl.disable(this.gl.DEPTH_TEST), this.gl.enable(this.gl.BLEND), this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA), this.glEnabled = true, this.checkDebug(); else return this.initialize(a, b, c);
            return this
        }, createScene:function () {
            var a = new CAAT.Scene;
            this.addScene(a);
            return a
        }, setImagesCache:function (a, b, c) {
            var d;
            if (null !== this.glTextureManager)this.glTextureManager.deletePages(), this.glTextureManager = null;
            if (this.imagesCache) {
                var e = [];
                for (d = 0; d < this.imagesCache.length; d++)e.push(this.imagesCache[d].id);
                for (d = 0; d < e.length; d++)delete this.imagesCache[e[d]]
            }
            if (this.imagesCache = a)for (d = 0; d < a.length; d++)this.imagesCache[a[d].id] = a[d].image;
            this.tpW = b || 2048;
            this.tpH = c || 2048;
            this.updateGLPages();
            return this
        }, updateGLPages:function () {
            if (this.glEnabled)this.glTextureManager =
                new CAAT.Module.TexturePacker.TexturePageManager, this.glTextureManager.createPages(this.gl, this.tpW, this.tpH, this.imagesCache), this.currentTexturePage = this.glTextureManager.pages[0], this.glTextureProgram.setTexture(this.currentTexturePage.texture)
        }, setGLTexturePage:function (a) {
            this.currentTexturePage = a;
            this.glTextureProgram.setTexture(a.texture);
            return this
        }, addImage:function (a, b, c) {
            if (this.getImage(a))for (var d = 0; d < this.imagesCache.length; d++) {
                if (this.imagesCache[d].id === a) {
                    this.imagesCache[d].image =
                        b;
                    break
                }
            } else this.imagesCache.push({id:a, image:b});
            this.imagesCache[a] = b;
            c || this.updateGLPages()
        }, deleteImage:function (a, b) {
            for (var c = 0; c < this.imagesCache.length; c++)if (this.imagesCache[c].id === a) {
                delete this.imagesCache[a];
                this.imagesCache.splice(c, 1);
                break
            }
            b || this.updateGLPages()
        }, setGLCurrentOpacity:function (a) {
            this.currentOpacity = a;
            this.glTextureProgram.setAlpha(a)
        }, glRender:function (a, b, c) {
            var a = a || this.coords, c = c || this.uv, b = b || this.coordsIndex, d = this.gl, b = b / 12 * 2;
            this.glTextureProgram.updateVertexBuffer(a);
            this.glTextureProgram.updateUVBuffer(c);
            d.drawElements(d.TRIANGLES, 3 * b, d.UNSIGNED_SHORT, 0)
        }, glFlush:function () {
            this.coordsIndex !== 0 && this.glRender(this.coords, this.coordsIndex, this.uv);
            this.uvIndex = this.coordsIndex = 0;
            this.statistics.draws++
        }, findActorAtPosition:function (a) {
            for (var b = this.childrenList.length - 1; b >= 0; b--) {
                var c = this.childrenList[b], d = new CAAT.Math.Point(a.x, a.y, 0), c = c.findActorAtPosition(d);
                if (null !== c)return c
            }
            return this
        }, resetStats:function () {
            this.statistics.size_total = 0;
            this.statistics.size_active =
                0;
            this.statistics.draws = 0;
            this.statistics.size_discarded_by_dirty_rects = 0
        }, render:function (a) {
            if (!this.currentScene || !this.currentScene.isPaused()) {
                this.time += a;
                this.animate(this, this.time);
                CAAT.DEBUG && this.resetStats();
                var b = this.childrenList.length, c, d, e, f = this.ctx;
                if (this.glEnabled) {
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                    for (c = this.uvIndex = this.coordsIndex = 0; c < b; c++)if (e = this.childrenList[c], e.isInAnimationFrame(this.time)) {
                        d = e.time - e.start_time;
                        if (e.onRenderStart)e.onRenderStart(d);
                        e.paintActorGL(this, d);
                        if (e.onRenderEnd)e.onRenderEnd(d);
                        e.isPaused() || (e.time += a);
                        CAAT.DEBUG && (this.statistics.size_total += e.size_total, this.statistics.size_active += e.size_active)
                    }
                    this.glFlush()
                } else {
                    f.globalAlpha = 1;
                    f.globalCompositeOperation = "source-over";
                    f.save();
                    if (this.dirtyRectsEnabled)if (this.modelViewMatrix.transformRenderingContext(f), CAAT.DEBUG_DIRTYRECTS)f.clearRect(0, 0, this.width, this.height); else {
                        f.beginPath();
                        this.nDirtyRects = 0;
                        d = this.cDirtyRects;
                        for (c = 0; c < d.length; c++)e = d[c], e.isEmpty() ||
                            (f.rect(e.x | 0, e.y | 0, 1 + (e.width | 0), 1 + (e.height | 0)), this.nDirtyRects++);
                        f.clip()
                    } else this.clear === CAAT.Foundation.Director.CLEAR_ALL && f.clearRect(0, 0, this.width, this.height);
                    for (c = 0; c < b; c++)if (e = this.childrenList[c], e.isInAnimationFrame(this.time)) {
                        d = e.time - e.start_time;
                        f.save();
                        if (e.onRenderStart)e.onRenderStart(d);
                        !CAAT.DEBUG_DIRTYRECTS && this.dirtyRectsEnabled ? this.nDirtyRects && e.paintActor(this, d) : e.paintActor(this, d);
                        if (e.onRenderEnd)e.onRenderEnd(d);
                        f.restore();
                        if (CAAT.DEBUGAABB)f.globalAlpha =
                            1, f.globalCompositeOperation = "source-over", this.modelViewMatrix.transformRenderingContextSet(f), e.drawScreenBoundingBox(this, d);
                        e.isPaused() || (e.time += a);
                        if (CAAT.DEBUG)this.statistics.size_total += e.size_total, this.statistics.size_active += e.size_active, this.statistics.size_dirtyRects = this.nDirtyRects
                    }
                    if (this.nDirtyRects > 0 && CAAT.DEBUG && CAAT.DEBUG_DIRTYRECTS) {
                        f.beginPath();
                        this.nDirtyRects = 0;
                        d = this.cDirtyRects;
                        for (c = 0; c < d.length; c++)e = d[c], e.isEmpty() || (f.rect(e.x | 0, e.y | 0, 1 + (e.width | 0), 1 + (e.height | 0)),
                            this.nDirtyRects++);
                        f.clip();
                        f.fillStyle = "rgba(160,255,150,.4)";
                        f.fillRect(0, 0, this.width, this.height)
                    }
                    f.restore()
                }
                this.frameCounter++
            }
        }, inDirtyRect:function (a) {
            if (!this.dirtyRectsEnabled || CAAT.DEBUG_DIRTYRECTS)return true;
            var b = this.cDirtyRects, c, d = a.AABB;
            for (c = 0; c < b.length; c++)if (b[c].intersects(d))return true;
            this.statistics.size_discarded_by_dirty_rects += a.size_total;
            return false
        }, animate:function (a, b) {
            this.timerManager.checkTimers(b);
            this.setModelViewMatrix(this);
            this.modelViewMatrixI = this.modelViewMatrix.getInverse();
            this.setScreenBounds();
            this.invalid = this.dirty = false;
            this.dirtyRectsIndex = -1;
            this.cDirtyRects = [];
            var c = this.childrenList, d, e;
            if (this.dirtyRectsEnabled) {
                var f = this.sDirtyRects;
                if (f.length) {
                    for (e = 0, d = f.length; e < d; e++)this.addDirtyRect(f[e]);
                    this.sDirtyRects = []
                }
            }
            for (e = 0; e < c.length; e++)d = c[e], d.animate(this, d.time - d.start_time);
            this.timerManager.removeExpiredTimers();
            return this
        }, scheduleDirtyRect:function (a) {
            this.sDirtyRects.push(a)
        }, addDirtyRect:function (a) {
            if (!a.isEmpty()) {
                var b, c, d, e, f = this.cDirtyRects;
                for (b = 0; b < f.length; b++)if (c = f[b], !c.isEmpty() && c.intersects(a)) {
                    for (var g = true; g;) {
                        c.unionRectangle(a);
                        for (d = 0; d < f.length; d++)if (d !== b && (e = f[d], !e.isEmpty() && e.intersects(c))) {
                            c.unionRectangle(e);
                            e.setEmpty();
                            break
                        }
                        d == f.length && (g = false)
                    }
                    for (d = 0; d < f.length; d++)f[d].isEmpty() && f.splice(d, 1);
                    return
                }
                this.dirtyRectsIndex++;
                if (this.dirtyRectsIndex >= this.dirtyRects.length)for (b = 0; b < 32; b++)this.dirtyRects.push(new CAAT.Math.Rectangle);
                b = this.dirtyRects[this.dirtyRectsIndex];
                b.x = a.x;
                b.y = a.y;
                b.x1 = a.x1;
                b.y1 =
                    a.y1;
                b.width = a.width;
                b.height = a.height;
                this.cDirtyRects.push(b)
            }
        }, renderToContext:function (a, b) {
            if (b.isInAnimationFrame(this.time)) {
                a.setTransform(1, 0, 0, 1, 0, 0);
                a.globalAlpha = 1;
                a.globalCompositeOperation = "source-over";
                a.clearRect(0, 0, this.width, this.height);
                var c = this.ctx;
                this.ctx = a;
                a.save();
                var d = this.modelViewMatrix, e = this.worldModelViewMatrix;
                this.modelViewMatrix = this.worldModelViewMatrix = new CAAT.Math.Matrix;
                this.wdirty = true;
                b.animate(this, b.time);
                if (b.onRenderStart)b.onRenderStart(b.time);
                b.paintActor(this,
                    b.time);
                if (b.onRenderEnd)b.onRenderEnd(b.time);
                this.worldModelViewMatrix = e;
                this.modelViewMatrix = d;
                a.restore();
                this.ctx = c
            }
        }, addScene:function (a) {
            a.setBounds(0, 0, this.width, this.height);
            this.scenes.push(a);
            a.setEaseListener(this);
            null === this.currentScene && this.setScene(0)
        }, getNumScenes:function () {
            return this.scenes.length
        }, easeInOut:function (a, b, c, d, e, f, g, h, i, j) {
            if (a !== this.getCurrentSceneIndex()) {
                a = this.scenes[a];
                d = this.scenes[d];
                if (!CAAT.__CSS__ && !this.glEnabled)this.renderToContext(this.transitionScene.ctx,
                    d), d = this.transitionScene;
                a.setExpired(false);
                d.setExpired(false);
                a.mouseEnabled = false;
                d.mouseEnabled = false;
                a.resetTransform();
                d.resetTransform();
                a.setLocation(0, 0);
                d.setLocation(0, 0);
                a.alpha = 1;
                d.alpha = 1;
                b === CAAT.Foundation.Scene.EASE_ROTATION ? a.easeRotationIn(g, h, c, i) : b === CAAT.Foundation.Scene.EASE_SCALE ? a.easeScaleIn(0, g, h, c, i) : a.easeTranslationIn(g, h, c, i);
                e === CAAT.Foundation.Scene.EASE_ROTATION ? d.easeRotationOut(g, h, f, j) : e === CAAT.Foundation.Scene.EASE_SCALE ? d.easeScaleOut(0, g, h, f, j) : d.easeTranslationOut(g,
                    h, f, j);
                this.childrenList = [];
                this.addChild(d);
                this.addChild(a)
            }
        }, easeInOutRandom:function (a, b, c, d) {
            var e = Math.random(), f = Math.random(), g;
            e < 0.33 ? (e = CAAT.Foundation.Scene.EASE_ROTATION, g = (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(4)) : e < 0.66 ? (e = CAAT.Foundation.Scene.EASE_SCALE, g = (new CAAT.Behavior.Interpolator).createElasticOutInterpolator(1.1, 0.4)) : (e = CAAT.Foundation.Scene.EASE_TRANSLATE, g = (new CAAT.Behavior.Interpolator).createBounceOutInterpolator());
            var h;
            f < 0.33 ? (f = CAAT.Foundation.Scene.EASE_ROTATION,
                h = (new CAAT.Behavior.Interpolator).createExponentialInOutInterpolator(4)) : f < 0.66 ? (f = CAAT.Foundation.Scene.EASE_SCALE, h = (new CAAT.Behavior.Interpolator).createExponentialOutInterpolator(4)) : (f = CAAT.Foundation.Scene.EASE_TRANSLATE, h = (new CAAT.Behavior.Interpolator).createBounceOutInterpolator());
            this.easeInOut(a, e, Math.random() * 8.99 >> 0, b, f, Math.random() * 8.99 >> 0, c, d, g, h)
        }, easeIn:function (a, b, c, d, e, f) {
            a = this.scenes[a];
            b === CAAT.Foundation.Scene.EASE_ROTATION ? a.easeRotationIn(c, d, e, f) : b === CAAT.Foundation.Scene.EASE_SCALE ?
                a.easeScaleIn(0, c, d, e, f) : a.easeTranslationIn(c, d, e, f);
            this.childrenList = [];
            this.addChild(a);
            a.resetTransform();
            a.setLocation(0, 0);
            a.alpha = 1;
            a.mouseEnabled = false;
            a.setExpired(false)
        }, setScene:function (a) {
            a = this.scenes[a];
            this.childrenList = [];
            this.addChild(a);
            this.currentScene = a;
            a.setExpired(false);
            a.mouseEnabled = true;
            a.resetTransform();
            a.setLocation(0, 0);
            a.alpha = 1;
            a.activated()
        }, switchToScene:function (a, b, c, d) {
            var e = this.getSceneIndex(this.currentScene);
            d ? this.easeInOutRandom(a, e, b, c) : this.setScene(a)
        },
        switchToPrevScene:function (a, b, c) {
            var d = this.getSceneIndex(this.currentScene);
            this.getNumScenes() <= 1 || d === 0 || (c ? this.easeInOutRandom(d - 1, d, a, b) : this.setScene(d - 1))
        }, switchToNextScene:function (a, b, c) {
            var d = this.getSceneIndex(this.currentScene);
            this.getNumScenes() <= 1 || d === this.getNumScenes() - 1 || (c ? this.easeInOutRandom(d + 1, d, a, b) : this.setScene(d + 1))
        }, mouseEnter:function () {
        }, mouseExit:function () {
        }, mouseMove:function () {
        }, mouseDown:function () {
        }, mouseUp:function () {
        }, mouseDrag:function () {
        }, easeEnd:function (a, b) {
            b ? (this.currentScene = a, this.currentScene.activated()) : a.setExpired(true);
            a.mouseEnabled = true;
            a.emptyBehaviorList()
        }, getSceneIndex:function (a) {
            for (var b = 0; b < this.scenes.length; b++)if (this.scenes[b] === a)return b;
            return-1
        }, getScene:function (a) {
            return this.scenes[a]
        }, getCurrentSceneIndex:function () {
            return this.getSceneIndex(this.currentScene)
        }, getBrowserName:function () {
            return this.browserInfo.browser
        }, getBrowserVersion:function () {
            return this.browserInfo.version
        }, getOSName:function () {
            return this.browserInfo.OS
        },
        getImage:function (a) {
            var b = this.imagesCache[a];
            if (b)return b;
            for (b = 0; b < this.imagesCache.length; b++)if (this.imagesCache[b].id === a)return this.imagesCache[b].image;
            return null
        }, addAudio:function (a, b) {
            this.audioManager.addAudio(a, b);
            return this
        }, audioPlay:function (a) {
            this.audioManager.play(a)
        }, audioLoop:function (a) {
            return this.audioManager.loop(a)
        }, endSound:function () {
            return this.audioManager.endSound()
        }, setSoundEffectsEnabled:function (a) {
            return this.audioManager.setSoundEffectsEnabled(a)
        }, setMusicEnabled:function (a) {
            return this.audioManager.setMusicEnabled(a)
        },
        isMusicEnabled:function () {
            return this.audioManager.isMusicEnabled()
        }, isSoundEffectsEnabled:function () {
            return this.audioManager.isSoundEffectsEnabled()
        }, setVolume:function (a, b) {
            return this.audioManager.setVolume(a, b)
        }, emptyScenes:function () {
            this.scenes = []
        }, addChild:function (a) {
            a.parent = this;
            this.childrenList.push(a)
        }, loop:function (a, b, c) {
            if (c)this.onRenderStart = b, this.onRenderEnd = c; else if (b)this.onRenderEnd = b;
            CAAT.loop()
        }, renderFrame:function () {
            CAAT.currentDirector = this;
            if (!this.stopped) {
                var a = (new Date).getTime(),
                    b = a - this.timeline;
                b > 500 && (b = 500);
                if (this.onRenderStart)this.onRenderStart(b);
                this.render(b);
                this.debugInfo && this.debugInfo(this.statistics);
                this.timeline = a;
                if (this.onRenderEnd)this.onRenderEnd(b);
                this.needsRepaint = false
            }
        }, resetTimeline:function () {
            this.timeline = (new Date).getTime()
        }, endLoop:function () {
        }, setClear:function (a) {
            this.clear = a;
            this.dirtyRectsEnabled = this.clear === CAAT.Foundation.Director.CLEAR_DIRTY_RECTS ? true : false;
            return this
        }, getAudioManager:function () {
            return this.audioManager
        }, cumulateOffset:function (a, b, c) {
            var d = c + "Left";
            c += "Top";
            for (var e = 0, f = 0, g; navigator.browser !== "iOS" && a && a.style;)if (g = a.currentStyle ? a.currentStyle.position : (g = (a.ownerDocument.defaultView || a.ownerDocument.parentWindow).getComputedStyle(a, null)) ? g.getPropertyValue("position") : null, /^(fixed)$/.test(g))break; else e += a[d], f += a[c], a = a[b];
            return{x:e, y:f, style:g}
        }, getOffset:function (a) {
            var b = this.cumulateOffset(a, "offsetParent", "offset");
            return b.style === "fixed" ? (a = this.cumulateOffset(a, a.parentNode ? "parentNode" : "parentElement",
                "scroll"), {x:b.x + a.x, y:b.y + a.y}) : {x:b.x, y:b.y}
        }, getCanvasCoord:function (a, b) {
            var c = new CAAT.Math.Point, d = 0, e = 0;
            if (!b)b = window.event;
            if (b.pageX || b.pageY)d = b.pageX, e = b.pageY; else if (b.clientX || b.clientY)d = b.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, e = b.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            var f = this.getOffset(this.canvas);
            d -= f.x;
            e -= f.y;
            c.x = d;
            c.y = e;
            if (!this.modelViewMatrixI)this.modelViewMatrixI = this.modelViewMatrix.getInverse();
            this.modelViewMatrixI.transformCoord(c);
            d = c.x;
            e = c.y;
            a.set(d, e);
            this.screenMousePoint.set(d, e)
        }, __mouseDownHandler:function (a) {
            if (this.dragging && this.lastSelectedActor)this.__mouseUpHandler(a); else {
                this.getCanvasCoord(this.mousePoint, a);
                this.isMouseDown = true;
                var b = this.findActorAtPosition(this.mousePoint);
                if (null !== b) {
                    var c = b.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0));
                    b.mouseDown((new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y)))
                }
                this.lastSelectedActor =
                    b
            }
        }, __mouseUpHandler:function (a) {
            this.isMouseDown = false;
            this.getCanvasCoord(this.mousePoint, a);
            var b = null, c = this.lastSelectedActor;
            null !== c && (b = c.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0)), c.actionPerformed && c.contains(b.x, b.y) && c.actionPerformed(a), c.mouseUp((new CAAT.Event.MouseEvent).init(b.x, b.y, a, c, this.screenMousePoint, this.currentScene.time)));
            !this.dragging && null !== c && c.contains(b.x, b.y) && c.mouseClick((new CAAT.Event.MouseEvent).init(b.x, b.y, a, c, this.screenMousePoint,
                this.currentScene.time));
            this.in_ = this.dragging = false
        }, __mouseMoveHandler:function (a) {
            var b, c, d = this.currentScene ? this.currentScene.time : 0;
            if (this.isMouseDown && null !== this.lastSelectedActor) {
                if (b = this.lastSelectedActor, c = b.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0)), this.dragging || !(Math.abs(this.prevMousePoint.x - c.x) < CAAT.DRAG_THRESHOLD_X && Math.abs(this.prevMousePoint.y - c.y) < CAAT.DRAG_THRESHOLD_Y)) {
                    this.dragging = true;
                    var e = b.x, f = b.y;
                    b.mouseDrag((new CAAT.Event.MouseEvent).init(c.x,
                        c.y, a, b, new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y), d));
                    this.prevMousePoint.x = c.x;
                    this.prevMousePoint.y = c.y;
                    if (e === b.x && f === b.y) {
                        e = b.contains(c.x, c.y);
                        if (this.in_ && !e)b.mouseExit((new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, this.screenMousePoint, d)), this.in_ = false;
                        if (!this.in_ && e)b.mouseEnter((new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, this.screenMousePoint, d)), this.in_ = true
                    }
                }
            } else this.in_ = true, b = this.findActorAtPosition(this.mousePoint), b !== this.lastSelectedActor && (null !==
                this.lastSelectedActor && (c = this.lastSelectedActor.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0)), this.lastSelectedActor.mouseExit((new CAAT.Event.MouseEvent).init(c.x, c.y, a, this.lastSelectedActor, this.screenMousePoint, d))), null !== b && (c = b.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0)), b.mouseEnter((new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, this.screenMousePoint, d)))), c = b.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x,
                this.screenMousePoint.y, 0)), null !== b && b.mouseMove((new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, this.screenMousePoint, d)), this.prevMousePoint.x = c.x, this.prevMousePoint.y = c.y, this.lastSelectedActor = b
        }, __mouseOutHandler:function (a) {
            if (!this.dragging)if (null !== this.lastSelectedActor) {
                this.getCanvasCoord(this.mousePoint, a);
                var b = new CAAT.Math.Point(this.mousePoint.x, this.mousePoint.y, 0);
                this.lastSelectedActor.viewToModel(b);
                a = (new CAAT.Event.MouseEvent).init(b.x, b.y, a, this.lastSelectedActor, this.screenMousePoint,
                    this.currentScene.time);
                this.lastSelectedActor.mouseExit(a);
                this.lastSelectedActor.mouseOut(a);
                if (!this.dragging)this.lastSelectedActor = null
            } else this.in_ = this.isMouseDown = false
        }, __mouseOverHandler:function (a) {
            if (!this.dragging) {
                var b, c;
                null == this.lastSelectedActor ? (b = this.findActorAtPosition(this.mousePoint), null !== b && (c = b.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0)), a = (new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, this.screenMousePoint, this.currentScene ? this.currentScene.time :
                    0), b.mouseOver(a), b.mouseEnter(a)), this.lastSelectedActor = b) : (b = this.lastSelectedActor, c = b.viewToModel(new CAAT.Math.Point(this.screenMousePoint.x, this.screenMousePoint.y, 0)), a = (new CAAT.Event.MouseEvent).init(c.x, c.y, a, b, this.screenMousePoint, this.currentScene.time), b.mouseOver(a), b.mouseEnter(a))
            }
        }, __mouseDBLClickHandler:function (a) {
            this.getCanvasCoord(this.mousePoint, a);
            null !== this.lastSelectedActor && this.lastSelectedActor.mouseDblClick((new CAAT.Event.MouseEvent).init(this.mousePoint.x, this.mousePoint.y,
                a, this.lastSelectedActor, this.screenMousePoint, this.currentScene.time))
        }, __touchStartHandler:function (a) {
            if (a.target === this.canvas) {
                a.preventDefault();
                var a = a.targetTouches[0], b = this.mousePoint;
                this.getCanvasCoord(b, a);
                if (!(b.x < 0 || b.y < 0 || b.x >= this.width || b.y >= this.height))this.touching = true, this.__mouseDownHandler(a)
            }
        }, __touchEndHandler:function (a) {
            if (this.touching)a.preventDefault(), a = a.changedTouches[0], this.getCanvasCoord(this.mousePoint, a), this.touching = false, this.__mouseUpHandler(a)
        }, __touchMoveHandler:function (a) {
            if (this.touching &&
                (a.preventDefault(), !this.gesturing))for (var b = 0; b < a.targetTouches.length; b++) {
                var c = a.targetTouches[b];
                this.getCanvasCoord(this.mousePoint, c);
                this.__mouseMoveHandler(c)
            }
        }, __gestureStart:function () {
            this.gesturing = true;
            this.__gestureRotation = this.lastSelectedActor.rotationAngle;
            this.__gestureSX = this.lastSelectedActor.scaleX - 1;
            this.__gestureSY = this.lastSelectedActor.scaleY - 1
        }, __gestureChange:function (a, b) {
            if (!(typeof a === "undefined" || typeof b === "undefined") && this.lastSelectedActor !== null && this.lastSelectedActor.isGestureEnabled())this.lastSelectedActor.setRotation(b *
                Math.PI / 180 + this.__gestureRotation), this.lastSelectedActor.setScale(this.__gestureSX + a, this.__gestureSY + a)
        }, __gestureEnd:function () {
            this.gesturing = false;
            this.__gestureScale = this.__gestureRotation = 0
        }, __touchEndHandlerMT:function (a) {
            a.preventDefault();
            var b, c = [];
            for (b = 0; b < a.changedTouches.length; b++) {
                var d = a.changedTouches[b].identifier;
                c.push(d)
            }
            var e = {};
            for (b = 0; b < c.length; b++) {
                var f = c[b];
                if (this.touches[f])d = this.touches[f].actor, e[d.id] || (e[d.id] = {actor:d, touch:(new CAAT.Event.TouchEvent).init(a,
                    d, this.currentScene.time)}), e[d.id].touch.addChangedTouch(this.touches[f].touch)
            }
            for (b = 0; b < a.changedTouches.length; b++)c = a.changedTouches[b], d = c.identifier, delete this.touches[d];
            for (var g in e) {
                var a = e[g], d = a.actor, c = a.touch, h;
                for (h in this.touches)a = this.touches[h], a.actor.id === d.id && c.addTouch(a.touch);
                d.touchEnd(c)
            }
        }, __touchMoveHandlerMT:function (a) {
            a.preventDefault();
            var b, c = [];
            for (b = 0; b < a.changedTouches.length; b++) {
                var d = a.changedTouches[b], e = d.identifier;
                if (this.touches[e]) {
                    var f = this.mousePoint;
                    this.getCanvasCoord(f, d);
                    var g = this.touches[e].actor, f = g.viewToModel(f);
                    this.touches[e] = {actor:g, touch:new CAAT.Event.TouchInfo(e, f.x, f.y, g)};
                    c.push(e)
                }
            }
            e = {};
            for (b = 0; b < c.length; b++)d = c[b], g = this.touches[d].actor, e[g.id] || (e[g.id] = {actor:g, touch:(new CAAT.Event.TouchEvent).init(a, g, this.currentScene.time)}), g = e[g.id].touch, g.addTouch(this.touches[d].touch), g.addChangedTouch(this.touches[d].touch);
            for (var h in e) {
                var a = e[h], g = a.actor, d = a.touch, i;
                for (i in this.touches)a = this.touches[i], a.actor.id ===
                    g.id && d.addTouch(a.touch);
                g.touchMove(d)
            }
        }, __touchCancelHandleMT:function (a) {
            this.__touchEndHandlerMT(a)
        }, __touchStartHandlerMT:function (a) {
            a.preventDefault();
            var b, c = [];
            for (b = 0; b < a.changedTouches.length; b++) {
                var d = a.changedTouches[b], e = d.identifier, f = this.mousePoint;
                this.getCanvasCoord(f, d);
                if (!(f.x < 0 || f.y < 0 || f.x >= this.width || f.y >= this.height)) {
                    var g = this.findActorAtPosition(f);
                    g !== null && (f = g.viewToModel(f), this.touches[e] || (this.touches[e] = {actor:g, touch:new CAAT.Event.TouchInfo(e, f.x, f.y, g)}, c.push(e)))
                }
            }
            e =
            {};
            for (b = 0; b < c.length; b++)d = c[b], g = this.touches[d].actor, e[g.id] || (e[g.id] = {actor:g, touch:(new CAAT.Event.TouchEvent).init(a, g, this.currentScene.time)}), g = e[g.id].touch, g.addTouch(this.touches[d].touch), g.addChangedTouch(this.touches[d].touch);
            for (var h in e) {
                var a = e[h], g = a.actor, d = a.touch, i;
                for (i in this.touches)a = this.touches[i], a.actor.id === g.id && d.addTouch(a.touch);
                g.touchStart(d)
            }
        }, __findTouchFirstActor:function () {
            var a = Number.MAX_VALUE, b = null, c;
            for (c in this.touches) {
                var d = this.touches[c];
                if (d.touch.time &&
                    d.touch.time < a && d.actor.isGestureEnabled())b = d.actor, a = d.touch.time
            }
            return b
        }, __gesturedActor:null, __touchGestureStartHandleMT:function (a) {
            var b = this.__findTouchFirstActor();
            if (b !== null && b.isGestureEnabled())this.__gesturedActor = b, this.__gestureRotation = b.rotationAngle, this.__gestureSX = b.scaleX - 1, this.__gestureSY = b.scaleY - 1, b.gestureStart(a.rotation * Math.PI / 180, a.scale + this.__gestureSX, a.scale + this.__gestureSY)
        }, __touchGestureEndHandleMT:function (a) {
            null !== this.__gesturedActor && this.__gesturedActor.isGestureEnabled() &&
            this.__gesturedActor.gestureEnd(a.rotation * Math.PI / 180, a.scale + this.__gestureSX, a.scale + this.__gestureSY);
            this.__gestureScale = this.__gestureRotation = 0
        }, __touchGestureChangeHandleMT:function (a) {
            this.__gesturedActor !== null && this.__gesturedActor.isGestureEnabled() && this.__gesturedActor.gestureChange(a.rotation * Math.PI / 180, this.__gestureSX + a.scale, this.__gestureSY + a.scale)
        }, addHandlers:function (a) {
            var b = this;
            window.addEventListener("mouseup", function (a) {
                if (b.touching)a.preventDefault(), a.cancelBubble =
                    true, a.stopPropagation && a.stopPropagation(), b.getCanvasCoord(b.mousePoint, a), b.__mouseUpHandler(a), b.touching = false
            }, false);
            window.addEventListener("mousedown", function (c) {
                if (c.target === a) {
                    c.preventDefault();
                    c.cancelBubble = true;
                    c.stopPropagation && c.stopPropagation();
                    var d = b.mousePoint;
                    b.getCanvasCoord(d, c);
                    if (!(d.x < 0 || d.y < 0 || d.x >= b.width || d.y >= b.height))b.touching = true, b.__mouseDownHandler(c)
                }
            }, false);
            window.addEventListener("mouseover", function (c) {
                if (c.target === a && !b.dragging) {
                    c.preventDefault();
                    c.cancelBubble = true;
                    c.stopPropagation && c.stopPropagation();
                    var d = b.mousePoint;
                    b.getCanvasCoord(d, c);
                    d.x < 0 || d.y < 0 || d.x >= b.width || d.y >= b.height || b.__mouseOverHandler(c)
                }
            }, false);
            window.addEventListener("mouseout", function (c) {
                if (c.target === a && !b.dragging)c.preventDefault(), c.cancelBubble = true, c.stopPropagation && c.stopPropagation(), b.getCanvasCoord(b.mousePoint, c), b.__mouseOutHandler(c)
            }, false);
            window.addEventListener("mousemove", function (a) {
                a.preventDefault();
                a.cancelBubble = true;
                a.stopPropagation && a.stopPropagation();
                var d = b.mousePoint;
                b.getCanvasCoord(d, a);
                (b.dragging || !(d.x < 0 || d.y < 0 || d.x >= b.width || d.y >= b.height)) && b.__mouseMoveHandler(a)
            }, false);
            window.addEventListener("dblclick", function (c) {
                if (c.target === a) {
                    c.preventDefault();
                    c.cancelBubble = true;
                    c.stopPropagation && c.stopPropagation();
                    var d = b.mousePoint;
                    b.getCanvasCoord(d, c);
                    d.x < 0 || d.y < 0 || d.x >= b.width || d.y >= b.height || b.__mouseDBLClickHandler(c)
                }
            }, false);
            CAAT.TOUCH_BEHAVIOR === CAAT.TOUCH_AS_MOUSE ? (a.addEventListener("touchstart", this.__touchStartHandler.bind(this),
                false), a.addEventListener("touchmove", this.__touchMoveHandler.bind(this), false), a.addEventListener("touchend", this.__touchEndHandler.bind(this), false), a.addEventListener("gesturestart", function (c) {
                c.target === a && (c.preventDefault(), b.__gestureStart(c.scale, c.rotation))
            }, false), a.addEventListener("gestureend", function (c) {
                c.target === a && (c.preventDefault(), b.__gestureEnd(c.scale, c.rotation))
            }, false), a.addEventListener("gesturechange", function (c) {
                c.target === a && (c.preventDefault(), b.__gestureChange(c.scale,
                    c.rotation))
            }, false)) : CAAT.TOUCH_BEHAVIOR === CAAT.TOUCH_AS_MULTITOUCH && (a.addEventListener("touchstart", this.__touchStartHandlerMT.bind(this), false), a.addEventListener("touchmove", this.__touchMoveHandlerMT.bind(this), false), a.addEventListener("touchend", this.__touchEndHandlerMT.bind(this), false), a.addEventListener("touchcancel", this.__touchCancelHandleMT.bind(this), false), a.addEventListener("gesturestart", this.__touchGestureStartHandleMT.bind(this), false), a.addEventListener("gestureend", this.__touchGestureEndHandleMT.bind(this),
                false), a.addEventListener("gesturechange", this.__touchGestureChangeHandleMT.bind(this), false))
        }, enableEvents:function (a) {
            CAAT.RegisterDirector(this);
            this.in_ = false;
            this.createEventHandler(a)
        }, createEventHandler:function (a) {
            this.in_ = false;
            this.addHandlers(a)
        }}
}, onCreate:function () {
    if (typeof CAAT.__CSS__ !== "undefined")CAAT.Foundation.Director.prototype.clip = true, CAAT.Foundation.Director.prototype.glEnabled = false, CAAT.Foundation.Director.prototype.getRenderType = function () {
        return"CSS"
    }, CAAT.Foundation.Director.prototype.setScaleProportional =
        function (a, b) {
            var c = Math.min(a / this.referenceWidth, b / this.referenceHeight);
            this.setScaleAnchored(c, c, 0, 0);
            this.eventHandler.style.width = "" + this.referenceWidth + "px";
            this.eventHandler.style.height = "" + this.referenceHeight + "px"
        }, CAAT.Foundation.Director.prototype.setBounds = function (a, b, c, d) {
        CAAT.Foundation.Director.superclass.setBounds.call(this, a, b, c, d);
        for (a = 0; a < this.scenes.length; a++)this.scenes[a].setBounds(0, 0, c, d);
        this.eventHandler.style.width = c + "px";
        this.eventHandler.style.height = d + "px";
        return this
    },
        CAAT.Foundation.Director.prototype.initialize = function (a, b, c) {
            this.timeline = (new Date).getTime();
            this.domElement = c;
            this.style("position", "absolute");
            this.style("width", "" + a + "px");
            this.style("height", "" + b + "px");
            this.style("overflow", "hidden");
            this.enableEvents(c);
            this.setBounds(0, 0, a, b);
            this.checkDebug();
            return this
        }, CAAT.Foundation.Director.prototype.render = function (a) {
        this.time += a;
        this.animate(this, a);
        var b, c, d;
        CAAT.DEBUG && this.resetStats();
        for (b = 0, c = this.childrenList.length; b < c; b++) {
            var e = this.childrenList[b];
            if (e.isInAnimationFrame(this.time)) {
                d = e.time - e.start_time;
                if (e.onRenderStart)e.onRenderStart(d);
                e.paintActor(this, d);
                if (e.onRenderEnd)e.onRenderEnd(d);
                e.isPaused() || (e.time += a);
                if (CAAT.DEBUG)this.statistics.size_discarded_by_dirtyRects += this.drDiscarded, this.statistics.size_total += e.size_total, this.statistics.size_active += e.size_active, this.statistics.size_dirtyRects = this.nDirtyRects
            }
        }
        this.frameCounter++
    }, CAAT.Foundation.Director.prototype.addScene = function (a) {
        a.setVisible(true);
        a.setBounds(0, 0, this.width,
            this.height);
        this.scenes.push(a);
        a.setEaseListener(this);
        null === this.currentScene && this.setScene(0);
        this.domElement.appendChild(a.domElement)
    }, CAAT.Foundation.Director.prototype.emptyScenes = function () {
        this.scenes = [];
        this.domElement.innerHTML = "";
        this.createEventHandler()
    }, CAAT.Foundation.Director.prototype.setClear = function () {
        return this
    }, CAAT.Foundation.Director.prototype.createEventHandler = function () {
        this.eventHandler = document.createElement("div");
        this.domElement.appendChild(this.eventHandler);
        this.eventHandler.style.position =
            "absolute";
        this.eventHandler.style.left = "0";
        this.eventHandler.style.top = "0";
        this.eventHandler.style.zIndex = 999999;
        this.eventHandler.style.width = "" + this.width + "px";
        this.eventHandler.style.height = "" + this.height + "px";
        this.canvas = this.eventHandler;
        this.in_ = false;
        this.addHandlers(this.canvas)
    }, CAAT.Foundation.Director.prototype.inDirtyRect = function () {
        return true
    }
}});
CAAT.Module({defines:"CAAT.Foundation.UI.Dock", aliases:["CAAT.Dock"], extendsClass:"CAAT.Foundation.ActorContainer", depends:["CAAT.Foundation.ActorContainer", "CAAT.Behavior.GenericBehavior"], constants:{OP_LAYOUT_BOTTOM:0, OP_LAYOUT_TOP:1, OP_LAYOUT_LEFT:2, OP_LAYOUT_RIGHT:3}, extendsWith:{scene:null, ttask:null, minSize:0, maxSize:0, range:2, layoutOp:0, initialize:function (a) {
    this.scene = a;
    return this
}, setApplicationRange:function (a) {
    this.range = a;
    return this
}, setLayoutOp:function (a) {
    this.layoutOp = a;
    return this
},
    setSizes:function (a, b) {
        this.minSize = a;
        this.maxSize = b;
        for (var c = 0; c < this.childrenList.length; c++)this.childrenList[c].width = a, this.childrenList[c].height = a;
        return this
    }, layout:function () {
        var a, b, c = CAAT.Foundation.UI.Dock;
        if (this.layoutOp === c.OP_LAYOUT_BOTTOM || this.layoutOp === c.OP_LAYOUT_TOP) {
            var d = b = 0;
            for (a = 0; a < this.getNumChildren(); a++)b += this.getChildAt(a).width;
            d = (this.width - b) / 2;
            for (a = 0; a < this.getNumChildren(); a++)b = this.getChildAt(a), b.x = d, d += b.width, b.y = this.layoutOp === c.OP_LAYOUT_BOTTOM ? this.maxSize -
                b.height : 0
        } else {
            for (a = d = b = 0; a < this.getNumChildren(); a++)b += this.getChildAt(a).height;
            d = (this.height - b) / 2;
            for (a = 0; a < this.getNumChildren(); a++)b = this.getChildAt(a), b.y = d, d += b.height, b.x = this.layoutOp === c.OP_LAYOUT_LEFT ? 0 : this.width - b.width
        }
    }, mouseMove:function () {
        this.actorNotPointed()
    }, mouseExit:function () {
        this.actorNotPointed()
    }, actorNotPointed:function () {
        var a, b = this;
        for (a = 0; a < this.getNumChildren(); a++) {
            var c = this.getChildAt(a);
            c.emptyBehaviorList();
            c.addBehavior((new CAAT.Behavior.GenericBehavior).setValues(c.width,
                this.minSize, c, "width").setFrameTime(this.scene.time, 250)).addBehavior((new CAAT.Behavior.GenericBehavior).setValues(c.height, this.minSize, c, "height").setFrameTime(this.scene.time, 250));
            a === this.getNumChildren() - 1 && c.behaviorList[0].addListener({behaviorApplied:function (a, b, c, g) {
                g.parent.layout()
            }, behaviorExpired:function (d, e, f) {
                for (a = 0; a < b.getNumChildren(); a++)c = b.getChildAt(a), c.width = b.minSize, c.height = b.minSize;
                f.parent.layout()
            }})
        }
    }, actorPointed:function (a, b, c) {
        for (var d = this.findChild(c), e =
            CAAT.Foundation.UI.Dock, f = 0, f = this.layoutOp === e.OP_LAYOUT_BOTTOM || this.layoutOp === e.OP_LAYOUT_TOP ? a / c.width : b / c.height, a = 0; a < this.childrenList.length; a++)b = this.childrenList[a], b.emptyBehaviorList(), c = 0, c = a < d - this.range || a > d + this.range ? this.minSize : a === d ? this.maxSize : a < d ? this.minSize + (this.maxSize - this.minSize) * (Math.cos((a - d - f + 1) / this.range * Math.PI) + 1) / 2 : this.minSize + (this.maxSize - this.minSize) * (Math.cos((a - d - f) / this.range * Math.PI) + 1) / 2, b.height = c, b.width = c;
        this.layout()
    }, actorMouseExit:function () {
        null !==
            this.ttask && this.ttask.cancel();
        var a = this;
        this.ttask = this.scene.createTimer(this.scene.time, 100, function () {
            a.actorNotPointed()
        }, null, null)
    }, actorMouseEnter:function () {
        if (null !== this.ttask)this.ttask.cancel(), this.ttask = null
    }, addChild:function (a) {
        var b = this;
        a.__Dock_mouseEnter = a.mouseEnter;
        a.__Dock_mouseExit = a.mouseExit;
        a.__Dock_mouseMove = a.mouseMove;
        a.mouseEnter = function (a) {
            b.actorMouseEnter(a);
            this.__Dock_mouseEnter(a)
        };
        a.mouseExit = function (a) {
            b.actorMouseExit(a);
            this.__Dock_mouseExit(a)
        };
        a.mouseMove =
            function (a) {
                b.actorPointed(a.point.x, a.point.y, a.source);
                this.__Dock_mouseMove(a)
            };
        a.width = this.minSize;
        a.height = this.minSize;
        return CAAT.Foundation.UI.Dock.superclass.addChild.call(this, a)
    }}});
CAAT.Module({defines:"CAAT.Foundation.UI.InterpolatorActor", aliases:["CAAT.InterpolatorActor"], depends:["CAAT.Foundation.Actor"], extendsClass:"CAAT.Foundation.Actor", extendsWith:{interpolator:null, contour:null, S:50, gap:5, setGap:function (a) {
    this.gap = a;
    return this
}, setInterpolator:function (a, b) {
    this.interpolator = a;
    this.contour = a.getContour(b || this.S);
    return this
}, paint:function (a, b) {
    CAAT.InterpolatorActor.superclass.paint.call(this, a, b);
    if (this.backgroundImage)return this;
    if (this.interpolator) {
        var c =
            a.ctx, d = this.width - 2 * this.gap, e = this.height - 2 * this.gap;
        c.beginPath();
        c.moveTo(this.gap + d * this.contour[0].x, -this.gap + this.height - e * this.contour[0].y);
        for (var f = 1; f < this.contour.length; f++)c.lineTo(this.gap + d * this.contour[f].x, -this.gap + this.height - e * this.contour[f].y);
        c.strokeStyle = this.strokeStyle;
        c.stroke()
    }
}, getInterpolator:function () {
    return this.interpolator
}}});
CAAT.Module({defines:"CAAT.Foundation.UI.Label", depends:["CAAT.Foundation.Actor", "CAAT.Foundation.SpriteImage", "CAAT.Module.Font.Font"], extendsClass:"CAAT.Foundation.Actor", extendsWith:function () {
    var a = function (a) {
        this.ctx = a;
        return this
    };
    a.prototype = {ctx:null, defaultFS:null, font:null, fontSize:null, fill:null, stroke:null, filled:null, stroked:null, strokeSize:null, italic:null, bold:null, alignment:null, tabSize:null, shadow:null, shadowBlur:null, shadowColor:null, sfont:null, chain:null, setDefault:function (a) {
        this.defaultFS =
            24;
        this.font = "Arial";
        this.fontSize = this.defaultFS;
        this.fill = "#000";
        this.stroke = "#f00";
        this.filled = true;
        this.stroked = false;
        this.strokeSize = 1;
        this.bold = this.italic = false;
        this.alignment = "left";
        this.tabSize = 75;
        this.shadow = false;
        this.shadowBlur = 0;
        this.shadowColor = "#000";
        for (var b in a)a.hasOwnProperty(b) && (this[b] = a[b]);
        this.__setFont();
        return this
    }, setStyle:function (a) {
        if (typeof a !== "undefined")for (var b in a)this[b] = a[b];
        return this
    }, applyStyle:function () {
        this.__setFont();
        return this
    }, clone:function () {
        var b =
            new a(this.ctx), c;
        for (c in this)this.hasOwnProperty(c) && (b[c] = this[c]);
        for (var d = this; d.chain;)for (c in d = d.chain, d)b[c] === null && d.hasOwnProperty(c) && (b[c] = d[c]);
        b.__setFont();
        return b
    }, __getProperty:function (a) {
        var b = this, c;
        do {
            c = b[a];
            if (c !== null)return c;
            b = b.chain
        } while (b);
        return null
    }, image:function (a) {
        this.__setShadow(a)
    }, text:function (a, b, c, d) {
        this.__setShadow(a);
        a.font = this.__getProperty("sfont");
        this.filled && this.__fillText(a, b, c, d);
        this.stroked && this.__strokeText(a, b, c, d)
    }, __setShadow:function (a) {
        if (this.__getProperty("shadow"))a.shadowBlur =
            this.__getProperty("shadowBlur"), a.shadowColor = this.__getProperty("shadowColor")
    }, __fillText:function (a, b, c, d) {
        a.fillStyle = this.__getProperty("fill");
        a.fillText(b, c, d)
    }, __strokeText:function (a, b, c, d) {
        a.strokeStyle = this.__getProperty("stroke");
        a.lineWidth = this.__getProperty("strokeSize");
        a.beginPath();
        a.strokeText(b, c, d)
    }, __setFont:function () {
        var a = this.__getProperty("italic"), b = this.__getProperty("bold"), c = this.__getProperty("fontSize"), d = this.__getProperty("font");
        this.sfont = (a ? "italic " : "") + (b ?
            "bold " : "") + c + "px " + d;
        this.ctx.font = this.__getProperty("sfont")
    }, setBold:function (a) {
        if (a != this.bold)this.bold = a, this.__setFont()
    }, setItalic:function (a) {
        if (a != this.italic)this.italic = a, this.__setFont()
    }, setStroked:function (a) {
        this.stroked = a
    }, setFilled:function (a) {
        this.filled = a
    }, getTabPos:function (a) {
        var b = this.__getProperty("tabSize");
        return((a / b >> 0) + 1) * b
    }, setFillStyle:function (a) {
        this.fill = a
    }, setStrokeStyle:function (a) {
        this.stroke = a
    }, setStrokeSize:function (a) {
        this.strokeSize = a
    }, setAlignment:function (a) {
        this.alignment =
            a
    }, setFontSize:function (a) {
        if (a !== this.fontSize)this.fontSize = a, this.__setFont()
    }};
    var b = function () {
        this.text = "";
        return this
    };
    b.prototype = {x:0, y:0, width:0, text:null, crcs:null, rcs:null, styles:null, images:null, lines:null, documentHeight:0, anchorStack:null, __nextLine:function () {
        this.x = 0;
        this.currentLine = new f;
        this.lines.push(this.currentLine)
    }, __image:function (a, b, c) {
        var e;
        e = b && c ? a.getWidth() : a.getWrappedImageWidth();
        this.width && e + this.x > this.width && this.x > 0 && this.__nextLine();
        this.currentLine.addElementImage(new d(this.x,
            a, b, c, this.crcs.clone(), this.__getCurrentAnchor()));
        this.x += e
    }, __text:function () {
        if (this.text.length !== 0) {
            var a = this.ctx.measureText(this.text).width;
            this.width && a + this.x > this.width && this.x > 0 && this.__nextLine();
            this.currentLine.addElement(new e(this.text, this.x, a, 0, this.crcs.clone(), this.__getCurrentAnchor()));
            this.x += a;
            this.text = ""
        }
    }, fchar:function (a) {
        a === " " ? (this.__text(), this.x += this.ctx.measureText(a).width, this.width && this.x > this.width && this.__nextLine()) : this.text += a
    }, end:function () {
        this.text.length >
            0 && this.__text();
        for (var a = 0, b = 0, c = 0; c < this.lines.length; c++) {
            var d = this.lines[c].getHeight();
            if (d === 0)d = this.styles["default"].fontSize;
            a += d;
            c === this.lines.length - 1 && (b = d * 0.25 >> 0);
            this.lines[c].setY(a)
        }
        this.documentHeight = a + b
    }, getDocumentHeight:function () {
        return this.documentHeight
    }, __getCurrentAnchor:function () {
        return this.anchorStack.length ? this.anchorStack[this.anchorStack.length - 1] : null
    }, __resetAppliedStyles:function () {
        this.rcs = [];
        this.__pushDefaultStyles()
    }, __pushDefaultStyles:function () {
        this.crcs =
            (new a(this.ctx)).setDefault(this.styles["default"]);
        this.rcs.push(this.crcs)
    }, __pushStyle:function (b) {
        var c = this.crcs;
        this.crcs = new a(this.ctx);
        this.crcs.chain = c;
        this.crcs.setStyle(b);
        this.crcs.applyStyle();
        this.rcs.push(this.crcs)
    }, __popStyle:function () {
        if (this.rcs.length > 1)this.rcs.pop(), this.crcs = this.rcs[this.rcs.length - 1], this.crcs.applyStyle()
    }, __popAnchor:function () {
        this.anchorStack.length > 0 && this.anchorStack.pop()
    }, __pushAnchor:function (a) {
        this.anchorStack.push(a)
    }, start:function (a, b, c, d) {
        this.y =
            this.x = 0;
        this.width = typeof d !== "undefined" ? d : 0;
        this.ctx = a;
        this.lines = [];
        this.styles = b;
        this.images = c;
        this.anchorStack = [];
        this.__resetAppliedStyles();
        this.__nextLine()
    }, setTag:function (a) {
        this.__text();
        a = a.toLowerCase();
        if (a === "b")this.crcs.setBold(true); else if (a === "/b")this.crcs.setBold(false); else if (a === "i")this.crcs.setItalic(true); else if (a === "/i")this.crcs.setItalic(false); else if (a === "stroked")this.crcs.setStroked(true); else if (a === "/stroked")this.crcs.setStroked(false); else if (a === "filled")this.crcs.setFilled(true);
        else if (a === "/filled")this.crcs.setFilled(false); else if (a === "tab")this.x = this.crcs.getTabPos(this.x); else if (a === "br")this.__nextLine(); else if (a === "/a")this.__popAnchor(); else if (a === "/style")this.rcs.length > 1 && this.__popStyle(); else if (a.indexOf("fillcolor") === 0)a = a.split("="), this.crcs.setFillStyle(a[1]); else if (a.indexOf("strokecolor") === 0)a = a.split("="), this.crcs.setStrokeStyle(a[1]); else if (a.indexOf("strokesize") === 0)a = a.split("="), this.crcs.setStrokeSize(a[1] | 0); else if (a.indexOf("fontsize") ===
            0)a = a.split("="), this.crcs.setFontSize(a[1] | 0); else if (a.indexOf("style") === 0)a = a.split("="), (a = this.styles[a[1]]) && this.__pushStyle(a); else if (a.indexOf("image") === 0) {
            var a = a.split("=")[1].split(","), b = a[0];
            if (this.images[b]) {
                var c = 0, d = 0;
                a.length >= 3 && (c = a[1] | 0, d = a[2] | 0);
                this.__image(this.images[b], c, d)
            }
        } else a.indexOf("a=") === 0 && (a = a.split("="), this.__pushAnchor(a[1]))
    }};
    var c = function (a, b) {
        this.link = a;
        this.style = b;
        return this
    };
    c.prototype = {x:null, y:null, width:null, height:null, style:null, link:null,
        isLink:function () {
            return this.link
        }, setLink:function (a) {
            this.link = a;
            return this
        }, getLink:function () {
            return this.link
        }, contains:function () {
            return false
        }};
    var d = function (a, b, c, e, f, k) {
        d.superclass.constructor.call(this, k, f);
        this.x = a;
        this.image = b;
        this.row = c;
        this.column = e;
        this.width = b.getWidth();
        this.height = b.getHeight();
        if (this.image instanceof CAAT.SpriteImage)this.spriteIndex = c * b.columns + e, this.paint = this.paintSI;
        return this
    };
    d.prototype = {image:null, row:null, column:null, spriteIndex:null, paint:function (a) {
        this.style.image(a);
        a.drawImage(this.image, this.x, -this.height + 1)
    }, paintSI:function (a) {
        this.style.image(a);
        this.image.setSpriteIndex(this.spriteIndex);
        this.image.paint({ctx:a}, 0, this.x, -this.height + 1)
    }, getHeight:function () {
        return this.image instanceof CAAT.Foundation.SpriteImage ? this.image.singleHeight : this.image.height
    }, getFontMetrics:function () {
        return null
    }, contains:function (a, b) {
        return a >= this.x && a <= this.x + this.width && b >= this.y && b < this.y + this.height
    }, setYPosition:function (a) {
        this.y = a - this.height + 1
    }};
    var e = function (a, b, c, d, f, k) {
        e.superclass.constructor.call(this, k, f);
        this.x = b;
        this.y = 0;
        this.width = c;
        this.text = a;
        this.style = f;
        this.fm = CAAT.Module.Font.Font.getFontMetrics(f.sfont);
        this.height = this.fm.height;
        return this
    };
    e.prototype = {text:null, style:null, fm:null, bl:null, paint:function (a) {
        this.style.text(a, this.text, this.x, 0)
    }, getHeight:function () {
        return this.fm.height
    }, getFontMetrics:function () {
        return this.fm
    }, contains:function (a, b) {
        return a >= this.x && a <= this.x + this.width && b >= this.y && b <= this.y + this.height
    }, setYPosition:function (a) {
        this.bl =
            a;
        this.y = a - this.fm.ascent
    }};
    extend(d, c);
    extend(e, c);
    var f = function () {
        this.elements = [];
        return this
    };
    f.prototype = {elements:null, width:0, height:0, y:0, x:0, alignment:null, baselinePos:0, addElement:function (a) {
        this.width = Math.max(this.width, a.x + a.width);
        this.height = Math.max(this.height, a.height);
        this.elements.push(a);
        this.alignment = a.style.__getProperty("alignment")
    }, addElementImage:function (a) {
        this.width = Math.max(this.width, a.x + a.width);
        this.height = Math.max(this.height, a.height);
        this.elements.push(a)
    },
        getHeight:function () {
            return this.height
        }, setY:function (a) {
            this.y = a
        }, getY:function () {
            return this.y
        }, paint:function (a) {
            a.save();
            a.translate(this.x, this.y + this.baselinePos);
            for (var b = 0; b < this.elements.length; b++)this.elements[b].paint(a);
            a.restore()
        }, setAlignment:function (a) {
            var b;
            if (this.alignment === "center")this.x = (a - this.width) / 2; else if (this.alignment === "right")this.x = a - this.width; else if (this.alignment === "justify" && this.width / a >= 0.6 && this.elements.length > 1) {
                var c = a - this.width, c = c / (this.elements.length -
                    1) | 0;
                for (b = 1; b < this.elements.length; b++)this.elements[b].x += b * c;
                c = a - this.width - c * (this.elements.length - 1);
                for (b = 0; b < c; b++)this.elements[this.elements.length - 1 - b].x += c - b
            }
        }, adjustHeight:function () {
            var a = null, b = null, c;
            for (c = 0; c < this.elements.length; c += 1) {
                var d = this.elements[c], e = d.getFontMetrics();
                null != e ? a ? e.ascent > a.ascent && (a = e) : a = e : b ? d.getHeight() > d.getHeight() && (b = d) : b = d
            }
            this.baselinePos = Math.max(a ? a.ascent : 0, b ? b.getHeight() : 0);
            this.height = this.baselinePos + (a != null ? a.descent : 0);
            for (c = 0; c < this.elements.length; c++)this.elements[c].setYPosition(this.baselinePos);
            return this.height
        }, __getElementAt:function (a, b) {
            for (var c = 0; c < this.elements.length; c++) {
                var d = this.elements[c];
                if (d.contains(a, b))return d
            }
            return null
        }};
    return{__init:function () {
        this.__super();
        this.rc = new b;
        this.lines = [];
        this.styles = {};
        this.images = {};
        return this
    }, halignment:CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.LEFT, valignment:CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.TOP, text:null, rc:null, styles:null, documentWidth:0, documentHeight:0, documentX:0, documentY:0, reflow:true, lines:null,
        images:null, clickCallback:null, setStyle:function (a, b) {
            this.styles[a] = b;
            return this
        }, addImage:function (a, b) {
            this.images[a] = b;
            return this
        }, setSize:function (a, b) {
            CAAT.Foundation.UI.Label.superclass.setSize.call(this, a, b);
            this.setText(this.text, this.width);
            return this
        }, setBounds:function (a, b, c, d) {
            CAAT.Foundation.UI.Label.superclass.setBounds.call(this, a, b, c, d);
            this.setText(this.text, this.width);
            return this
        }, setText:function (a, b) {
            if (null !== a) {
                var c = this.cached;
                c && this.stopCacheAsBitmap();
                this.documentHeight =
                    this.documentWidth = 0;
                this.text = a;
                var d, e, f, n, l, p, o = CAAT.currentDirector.ctx;
                o.save();
                f = this.text;
                d = 0;
                e = f.length;
                for (this.rc.start(o, this.styles, this.images, b); d < e;)p = f.charAt(d), p === "\\" ? (d += 1, this.rc.fchar(f.charAt(d)), d += 1) : p === "<" ? (n = f.indexOf(">", d + 1), -1 !== n && (l = f.substr(d + 1, n - d - 1), l.indexOf("<") !== -1 ? (this.rc.fchar(p), d += 1) : (this.rc.setTag(l), d = n + 1))) : (this.rc.fchar(p), d += 1);
                this.rc.end();
                this.lines = this.rc.lines;
                this.__calculateDocumentDimension(typeof b === "undefined" ? 0 : b);
                this.setLinesAlignment();
                o.restore();
                this.setPreferredSize(this.documentWidth, this.documentHeight);
                this.invalidateLayout();
                this.setDocumentPosition();
                c && this.cacheAsBitmap(0, c);
                return this
            }
        }, setVerticalAlignment:function (a) {
            this.valignment = a;
            this.setDocumentPosition();
            return this
        }, setHorizontalAlignment:function (a) {
            this.halignment = a;
            this.setDocumentPosition();
            return this
        }, setDocumentPosition:function () {
            var a = 0, b = 0;
            this.valignment === CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.CENTER ? b = (this.height - this.documentHeight) /
                2 : this.valignment === CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.BOTTOM && (b = this.height - this.documentHeight);
            this.halignment === CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.CENTER ? a = (this.width - this.documentWidth) / 2 : this.halignment === CAAT.Foundation.UI.Layout.LayoutManager.ALIGNMENT.RIGHT && (a = this.width - this.documentWidth);
            this.documentX = a;
            this.documentY = b
        }, __calculateDocumentDimension:function (a) {
            var b, c = 0;
            for (b = this.documentHeight = this.documentWidth = 0; b < this.lines.length; b++)this.lines[b].y =
                c, this.documentWidth = Math.max(this.documentWidth, this.lines[b].width), this.documentHeight += this.lines[b].adjustHeight(), c += this.lines[b].getHeight();
            this.documentWidth = Math.max(this.documentWidth, a);
            return this
        }, setLinesAlignment:function () {
            for (var a = 0; a < this.lines.length; a++)this.lines[a].setAlignment(this.documentWidth)
        }, paint:function (a, b) {
            if (this.cached === CAAT.Foundation.Actor.CACHE_NONE) {
                var c = a.ctx;
                c.save();
                c.textBaseline = "alphabetic";
                c.translate(this.documentX, this.documentY);
                for (var d = 0; d <
                    this.lines.length; d++)this.lines[d].paint(a.ctx);
                c.restore()
            } else this.backgroundImage && this.backgroundImage.paint(a, b, 0, 0)
        }, __getDocumentElementAt:function (a, b) {
            a -= this.documentX;
            b -= this.documentY;
            for (var c = 0; c < this.lines.length; c++) {
                var d = this.lines[c];
                if (d.x <= a && d.y <= b && d.x + d.width >= a && d.y + d.height >= b)return d.__getElementAt(a - d.x, b - d.y)
            }
            return null
        }, mouseExit:function () {
            CAAT.setCursor("default")
        }, mouseMove:function (a) {
            (a = this.__getDocumentElementAt(a.x, a.y)) && a.getLink() ? CAAT.setCursor("pointer") :
                CAAT.setCursor("default")
        }, mouseClick:function (a) {
            this.clickCallback && (a = this.__getDocumentElementAt(a.x, a.y), a.getLink() && this.clickCallback(a.getLink()))
        }, setClickCallback:function (a) {
            this.clickCallback = a;
            return this
        }}
}});
CAAT.Module({defines:"CAAT.Foundation.UI.PathActor", aliases:["CAAT.PathActor"], depends:["CAAT.Foundation.Actor"], extendsClass:"CAAT.Foundation.Actor", extendsWith:{path:null, pathBoundingRectangle:null, bOutline:false, outlineColor:"black", onUpdateCallback:null, interactive:false, showBBox:false, getPath:function () {
    return this.path
}, setPath:function (a) {
    this.path = a;
    if (a != null)this.pathBoundingRectangle = a.getBoundingBox(), this.setInteractive(this.interactive);
    return this
}, paint:function (a, b) {
    CAAT.Foundation.UI.PathActor.superclass.paint.call(this,
        a, b);
    if (this.path) {
        var c = a.ctx;
        c.strokeStyle = "#000";
        this.path.paint(a, this.interactive);
        if (this.bOutline)c.strokeStyle = this.outlineColor, c.strokeRect(this.pathBoundingRectangle.x, this.pathBoundingRectangle.y, this.pathBoundingRectangle.width, this.pathBoundingRectangle.height)
    }
}, showBoundingBox:function (a, b) {
    if ((this.bOutline = a) && b)this.outlineColor = b;
    return this
}, setInteractive:function (a) {
    this.interactive = a;
    this.path && this.path.setInteractive(a);
    return this
}, setOnUpdateCallback:function (a) {
    this.onUpdateCallback =
        a;
    return this
}, mouseDrag:function (a) {
    this.path.drag(a.point.x, a.point.y, this.onUpdateCallback)
}, mouseDown:function (a) {
    this.path.press(a.point.x, a.point.y)
}, mouseUp:function () {
    this.path.release()
}}});
CAAT.Module({defines:"CAAT.Foundation.UI.ShapeActor", aliases:["CAAT.ShapeActor"], extendsClass:"CAAT.Foundation.ActorContainer", depends:["CAAT.Foundation.ActorContainer"], constants:{SHAPE_CIRCLE:0, SHAPE_RECTANGLE:1}, extendsWith:{__init:function () {
    this.__super();
    this.compositeOp = "source-over";
    this.setShape(CAAT.Foundation.UI.ShapeActor.SHAPE_CIRCLE);
    return this
}, shape:0, compositeOp:null, lineWidth:1, lineCap:null, lineJoin:null, miterLimit:null, setLineWidth:function (a) {
    this.lineWidth = a;
    return this
}, setLineCap:function (a) {
    this.lineCap =
        a;
    return this
}, setLineJoin:function (a) {
    this.lineJoin = a;
    return this
}, setMiterLimit:function (a) {
    this.miterLimit = a;
    return this
}, getLineCap:function () {
    return this.lineCap
}, getLineJoin:function () {
    return this.lineJoin
}, getMiterLimit:function () {
    return this.miterLimit
}, getLineWidth:function () {
    return this.lineWidth
}, setShape:function (a) {
    this.shape = a;
    this.paint = this.shape === CAAT.Foundation.UI.ShapeActor.SHAPE_CIRCLE ? this.paintCircle : this.paintRectangle;
    return this
}, setCompositeOp:function (a) {
    this.compositeOp =
        a;
    return this
}, paint:function () {
}, paintCircle:function (a, b) {
    if (this.cached)CAAT.ActorContainer.prototype.paint.call(this, a, b); else {
        var c = a.ctx;
        c.lineWidth = this.lineWidth;
        c.globalCompositeOperation = this.compositeOp;
        if (null !== this.fillStyle)c.fillStyle = this.fillStyle, c.beginPath(), c.arc(this.width / 2, this.height / 2, Math.min(this.width, this.height) / 2 - this.lineWidth / 2, 0, 2 * Math.PI, false), c.fill();
        if (null !== this.strokeStyle)c.strokeStyle = this.strokeStyle, c.beginPath(), c.arc(this.width / 2, this.height / 2, Math.min(this.width,
            this.height) / 2 - this.lineWidth / 2, 0, 2 * Math.PI, false), c.stroke()
    }
}, paintRectangle:function (a, b) {
    if (this.cached)CAAT.ActorContainer.prototype.paint.call(this, a, b); else {
        var c = a.ctx;
        c.lineWidth = this.lineWidth;
        if (this.lineCap)c.lineCap = this.lineCap;
        if (this.lineJoin)c.lineJoin = this.lineJoin;
        if (this.miterLimit)c.miterLimit = this.miterLimit;
        c.globalCompositeOperation = this.compositeOp;
        if (null !== this.fillStyle)c.fillStyle = this.fillStyle, c.beginPath(), c.fillRect(0, 0, this.width, this.height), c.fill();
        if (null !== this.strokeStyle)c.strokeStyle =
            this.strokeStyle, c.beginPath(), c.strokeRect(0, 0, this.width, this.height), c.stroke()
    }
}}});
CAAT.Module({defines:"CAAT.Foundation.UI.StarActor", aliases:["CAAT.StarActor"], depends:["CAAT.Foundation.ActorContainer"], extendsClass:"CAAT.Foundation.ActorContainer", extendsWith:{__init:function () {
    this.__super();
    this.compositeOp = "source-over";
    return this
}, nPeaks:0, maxRadius:0, minRadius:0, initialAngle:0, compositeOp:null, lineWidth:1, lineCap:null, lineJoin:null, miterLimit:null, setLineWidth:function (a) {
    this.lineWidth = a;
    return this
}, setLineCap:function (a) {
    this.lineCap = a;
    return this
}, setLineJoin:function (a) {
    this.lineJoin =
        a;
    return this
}, setMiterLimit:function (a) {
    this.miterLimit = a;
    return this
}, getLineCap:function () {
    return this.lineCap
}, getLineJoin:function () {
    return this.lineJoin
}, getMiterLimit:function () {
    return this.miterLimit
}, getLineWidth:function () {
    return this.lineWidth
}, setFilled:function () {
    return this
}, setOutlined:function () {
    return this
}, setCompositeOp:function (a) {
    this.compositeOp = a;
    return this
}, setInitialAngle:function (a) {
    this.initialAngle = a;
    return this
}, initialize:function (a, b, c) {
    this.setSize(2 * b, 2 * b);
    this.nPeaks =
        a;
    this.maxRadius = b;
    this.minRadius = c;
    return this
}, paint:function (a) {
    var a = a.ctx, b = this.width / 2, c = this.height / 2, d = this.maxRadius, e = this.minRadius, f = b + d * Math.cos(this.initialAngle), g = c + d * Math.sin(this.initialAngle);
    a.lineWidth = this.lineWidth;
    if (this.lineCap)a.lineCap = this.lineCap;
    if (this.lineJoin)a.lineJoin = this.lineJoin;
    if (this.miterLimit)a.miterLimit = this.miterLimit;
    a.globalCompositeOperation = this.compositeOp;
    a.beginPath();
    a.moveTo(f, g);
    for (f = 1; f < this.nPeaks * 2; f++) {
        var h = Math.PI / this.nPeaks * f + this.initialAngle,
            i = f % 2 === 0 ? d : e, g = b + i * Math.cos(h), h = c + i * Math.sin(h);
        a.lineTo(g, h)
    }
    a.lineTo(b + d * Math.cos(this.initialAngle), c + d * Math.sin(this.initialAngle));
    a.closePath();
    if (this.fillStyle)a.fillStyle = this.fillStyle, a.fill();
    if (this.strokeStyle)a.strokeStyle = this.strokeStyle, a.stroke()
}}});
CAAT.Module({defines:"CAAT.Foundation.UI.TextActor", aliases:["CAAT.TextActor"], extendsClass:"CAAT.Foundation.Actor", constants:{TRAVERSE_PATH_FORWARD:1, TRAVERSE_PATH_BACKWARD:-1}, depends:["CAAT.Foundation.Actor", "CAAT.Foundation.SpriteImage", "CAAT.Module.Font.Font", "CAAT.Math.Point", "CAAT.Behavior.Interpolator"], extendsWith:{__init:function () {
    this.__super();
    this.font = "10px sans-serif";
    this.textAlign = "left";
    this.outlineColor = "black";
    this.clip = false;
    this.__calcFontData();
    return this
}, font:null, fontData:null,
    textAlign:null, textBaseline:"top", fill:true, textFillStyle:"#eee", text:null, textWidth:0, textHeight:0, outline:false, outlineColor:null, lineWidth:1, path:null, pathInterpolator:null, pathDuration:1E4, sign:1, lx:0, ly:0, setFill:function (a) {
        this.stopCacheAsBitmap();
        this.fill = a;
        return this
    }, setLineWidth:function (a) {
        this.stopCacheAsBitmap();
        this.lineWidth = a;
        return this
    }, setTextFillStyle:function (a) {
        this.stopCacheAsBitmap();
        this.textFillStyle = a;
        return this
    }, setOutline:function (a) {
        this.stopCacheAsBitmap();
        this.outline =
            a;
        return this
    }, setPathTraverseDirection:function (a) {
        this.sign = a;
        return this
    }, setOutlineColor:function (a) {
        this.stopCacheAsBitmap();
        this.outlineColor = a;
        return this
    }, setText:function (a) {
        this.stopCacheAsBitmap();
        this.text = a;
        if (null === this.text || this.text === "")this.width = this.height = 0;
        this.calcTextSize(CAAT.currentDirector);
        this.invalidate();
        return this
    }, setTextAlign:function (a) {
        this.textAlign = a;
        this.__setLocation();
        return this
    }, setAlign:function (a) {
        return this.setTextAlign(a)
    }, setTextBaseline:function (a) {
        this.stopCacheAsBitmap();
        this.textBaseline = a;
        return this
    }, setBaseline:function (a) {
        this.stopCacheAsBitmap();
        return this.setTextBaseline(a)
    }, setFont:function (a) {
        this.stopCacheAsBitmap();
        a || (a = "10px sans-serif");
        a instanceof CAAT.Module.Font.Font ? a.setAsSpriteImage() : a instanceof CAAT.Foundation.SpriteImage && CAAT.log("WARN: setFont will no more accept a CAAT.SpriteImage as argument.");
        this.font = a;
        this.__calcFontData();
        this.calcTextSize(CAAT.director[0]);
        return this
    }, setLocation:function (a, b) {
        this.lx = a;
        this.ly = b;
        this.__setLocation();
        return this
    }, setPosition:function (a, b) {
        this.lx = a;
        this.ly = b;
        this.__setLocation();
        return this
    }, setBounds:function (a, b, c, d) {
        this.lx = a;
        this.ly = b;
        this.setSize(c, d);
        this.__setLocation();
        return this
    }, setSize:function (a, b) {
        CAAT.Foundation.UI.TextActor.superclass.setSize.call(this, a, b);
        this.__setLocation();
        return this
    }, __setLocation:function () {
        CAAT.Foundation.UI.TextActor.superclass.setLocation.call(this, this.textAlign === "center" ? this.lx - this.width / 2 : this.textAlign === "right" || this.textAlign === "end" ? this.lx -
            this.width : this.lx, this.textBaseline === "bottom" ? this.ly - this.height : this.textBaseline === "middle" ? this.ly - this.height / 2 : this.textBaseline === "alphabetic" ? this.ly - this.fontData.ascent : this.ly)
    }, centerAt:function (a, b) {
        this.textAlign = "left";
        return CAAT.Foundation.UI.TextActor.superclass.centerAt.call(this, a, b)
    }, calcTextSize:function (a) {
        if (typeof this.text === "undefined" || null === this.text || "" === this.text)return this.textHeight = this.textWidth = 0, this;
        if (a.glEnabled)return this;
        if (this.font instanceof CAAT.Foundation.SpriteImage)return this.textWidth =
            this.font.stringWidth(this.text), this.textHeight = this.font.stringHeight(), this.width = this.textWidth, this.height = this.textHeight, a = this.font.singleHeight * 0.8 >> 0, this.fontData = {height:this.font.singleHeight, ascent:a, descent:this.font.singleHeight - a}, this;
        if (this.font instanceof CAAT.Module.Font.Font)return this.textWidth = this.font.stringWidth(this.text), this.textHeight = this.font.stringHeight(), this.width = this.textWidth, this.height = this.textHeight, this.fontData = this.font.getFontData(), this;
        a = a.ctx;
        a.save();
        a.font = this.font;
        this.textWidth = a.measureText(this.text).width;
        if (this.width === 0)this.width = this.textWidth;
        this.textHeight = this.fontData.height;
        this.setSize(this.textWidth, this.textHeight);
        a.restore();
        return this
    }, __calcFontData:function () {
        this.fontData = CAAT.Module.Font.Font.getFontMetrics(this.font)
    }, paint:function (a, b) {
        CAAT.Foundation.UI.TextActor.superclass.paint.call(this, a, b);
        if (!this.cached && null !== this.text) {
            (this.textWidth === 0 || this.textHeight === 0) && this.calcTextSize(a);
            var c = a.ctx;
            if (this.font instanceof
                CAAT.Module.Font.Font || this.font instanceof CAAT.Foundation.SpriteImage)this.drawSpriteText(a, b); else {
                if (null !== this.font)c.font = this.font;
                c.textBaseline = "alphabetic";
                if (null === this.path) {
                    if (null !== this.textAlign)c.textAlign = this.textAlign;
                    var d = 0;
                    if (this.textAlign === "center")d = this.width / 2 | 0; else if (this.textAlign === "right")d = this.width;
                    if (this.fill) {
                        if (null !== this.textFillStyle)c.fillStyle = this.textFillStyle;
                        c.fillText(this.text, d, this.fontData.ascent)
                    }
                    if (this.outline) {
                        if (null !== this.outlineColor)c.strokeStyle =
                            this.outlineColor;
                        c.lineWidth = this.lineWidth;
                        c.beginPath();
                        c.strokeText(this.text, d, this.fontData.ascent)
                    }
                } else this.drawOnPath(a, b)
            }
        }
    }, drawOnPath:function (a, b) {
        var c = a.ctx;
        if (this.fill && null !== this.textFillStyle)c.fillStyle = this.textFillStyle;
        if (this.outline && null !== this.outlineColor)c.strokeStyle = this.outlineColor;
        for (var d = this.sign * this.pathInterpolator.getPosition(b % this.pathDuration / this.pathDuration).y * this.path.getLength(), e = new CAAT.Math.Point(0, 0, 0), f = new CAAT.Math.Point(0, 0, 0), g = 0; g < this.text.length; g++) {
            var h =
                this.text[g].toString(), i = c.measureText(h).width, f = d, e = this.path.getPositionFromLength(f).clone(), f = this.path.getPositionFromLength(f - 0.1).clone(), f = Math.atan2(e.y - f.y, e.x - f.x);
            c.save();
            c.translate(e.x >> 0, e.y >> 0);
            c.rotate(f);
            this.fill && c.fillText(h, 0, 0);
            if (this.outline)c.beginPath(), c.lineWidth = this.lineWidth, c.strokeText(h, 0, 0);
            c.restore();
            d += i
        }
    }, drawSpriteText:function (a, b) {
        null === this.path ? this.font.drawText(this.text, a.ctx, 0, 0) : this.drawSpriteTextOnPath(a, b)
    }, drawSpriteTextOnPath:function (a, b) {
        for (var c =
            a.ctx, d = this.sign * this.pathInterpolator.getPosition(b % this.pathDuration / this.pathDuration).y * this.path.getLength(), e = new CAAT.Math.Point(0, 0, 0), f = new CAAT.Math.Point(0, 0, 0), g = 0; g < this.text.length; g++) {
            var h = this.text[g].toString(), i = this.font.stringWidth(h), f = i / 2 + d, e = this.path.getPositionFromLength(f).clone(), f = this.path.getPositionFromLength(f - 0.1).clone(), f = Math.atan2(e.y - f.y, e.x - f.x);
            c.save();
            c.translate(e.x | 0, e.y | 0);
            c.rotate(f);
            e = this.textBaseline === "bottom" ? 0 - this.font.getHeight() : 0;
            this.font.drawText(h,
                c, 0, e);
            c.restore();
            d += i
        }
    }, setPath:function (a, b, c) {
        this.path = a;
        this.pathInterpolator = b || (new CAAT.Behavior.Interpolator).createLinearInterpolator();
        this.pathDuration = c || 1E4;
        this.mouseEnabled = false;
        return this
    }}});
CAAT.ModuleManager.solveAll();
