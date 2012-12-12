define(function () {

    'use strict';
    function f(a) {
        throw a;
    }

    var h = !0, j = null, k = !1;

    function n(a) {
        return function () {
            return this[a]
        }
    }

    var o, aa = window;
    Math.floor(2147483648 * Math.random()).toString(36);
    function q(a, b) {
        var c = a.split("."), d = aa;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) {
            !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
        }
    }

    function u(a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.qa = b.prototype;
        a.prototype = new c
    }

    ;
    function ca(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }

    ca.prototype.toString = function () {
        return"(" + this.x + ", " + this.y + ")"
    };
    function da(a, b) {
        this.x = a;
        this.y = b
    }

    u(da, ca);
    var ea, fa;
    HTMLCanvasElement.nb = new da(0, 0);
    function ga(a) {
        var b = x, c = HTMLCanvasElement.nb;
        c.x = 0;
        c.y = 0;
        void 0 === b.V && (b.V = $(b).offset(), b.Qa = $(b).height());
        a.changedTouches && (a = a.changedTouches[0]);
        c.x = a.pageX - b.V.left;
        c.y = b.Qa - (a.pageY - b.V.top);
        return c
    }

    for (var ha = 0, ia = ["ms", "moz", "webkit", "o"], ja = 0; ja < ia.length && !window.requestAnimationFrame; ++ja) {
        window.requestAnimationFrame = window[ia[ja] + "RequestAnimationFrame"], window.Va = window[ia[ja] + "CancelAnimationFrame"] || window[ia[ja] + "CancelRequestAnimationFrame"]
    }
    window.requestAnimationFrame || (console.log("using setTimeout"), window.requestAnimationFrame = function (a) {
        var b = Date.now(), c = Math.max(0, 16 - (b - ha)), d = window.setTimeout(function () {
            a(b + c)
        }, c);
        ha = b + c;
        return d
    });
    window.Va || (window.Va = function (a) {
        clearTimeout(a)
    });
    function ka(a, b) {
        console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
    }

    var la = window.Stats || j, ma = {useGoogleAnalytics:k, projection:"3d", webglMode:h, usesOffscreenBuffer:k, basePath:""}, na = "3d", B = h, oa = k, pa = "", C = j, qa = k, ra = {}, sa = j, ta = j, ua = j, x = j, va = k, D = {}, wa = {}, xa = {}, ya = {}, za = Date.now(), Aa = 0, Ba = {Mb:0, Pb:1, Qb:2, Nb:3, Ob:4}, E = j, F = [];

    function Ca(a) {
        var b = ra[a], c = C;
        if (a != sa) {
            sa = a;
            c.validateProgram(b);
            c.useProgram(b);
            for (var d in b.a) {
                c.enableVertexAttribArray(b.a[d])
            }
        }
        return b
    }

    function Da() {
        var a = x;
        C.ea = a.width;
        C.U = a.height
    }

    function Ea(a, b) {
        var c = C, d = Fa(a, "frag"), e = Fa(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
        c.shaderSource(g, d);
        c.compileShader(g);
        if (c.getShaderParameter(g, c.COMPILE_STATUS)) {
            d = c.createShader(c.VERTEX_SHADER);
            c.shaderSource(d, e);
            c.compileShader(d);
            if (c.getShaderParameter(d, c.COMPILE_STATUS)) {
                c = C;
                e = c.createProgram();
                c.attachShader(e, g);
                c.attachShader(e, d);
                c.linkProgram(e);
                c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader");
                ra[a] = e;
                b && b(e)
            } else {
                console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)
            }
        } else {
            console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
        }
    }

    function Fa(a, b) {
        var c = "";
        $.ajax({url:pa + "shaders/" + a + "." + b, async:k, type:"GET", success:function (a, b) {
            b == "success" ? c = a : console.log("error getting the shader data")
        }});
        return c
    }

    function H(a, b, c, d) {
        b = typeof b == "object" ? {dataType:b.dataType, url:b.url, name:b.name || b.url} : {url:b, name:c || b};
        D[a] || (D[a] = {});
        var c = D[a], e = b.name;
        if (c[e]) {
            if (c[e].status == "loading") {
                d && c[e].aa.push(d)
            } else {
                if (c[e].status == "loaded") {
                    d && d(c[e].data)
                } else {
                    if (c[e].status == "try") {
                        c[e].status = "loading";
                        if (xa[a]) {
                            xa[a](a, b)
                        } else {
                            xa["default"](a, b)
                        }
                        d && c[e].aa.push(d)
                    }
                }
            }
        } else {
            c[e] = {data:j, name:e, status:"try", aa:[]};
            d && c[e].aa.push(d);
            H(a, b)
        }
    }

    function Ga(a, b) {
        var c = ya[a], d, e;
        if (!c) {
            ya[a] = [];
            c = ya[a]
        }
        b && c.push(b);
        var g = h;
        if (a == "all") {
            for (var i in D) {
                d = D[i];
                for (e in d) {
                    if (d[e].status != "loaded") {
                        g = k;
                        break
                    }
                }
                if (!g) {
                    break
                }
            }
        } else {
            d = D[a];
            for (e in d) {
                if (d[e].status != "loaded") {
                    g = k;
                    break
                }
            }
        }
        if (g) {
            for (; d = c.shift();) {
                d()
            }
        }
    }

    function Ha(a, b) {
        return b ? D[a][b].data : j
    }

    function Ia(a, b) {
        return b ? b in D[a] : k
    }

    function Ja(a) {
        var b = C, c = h;
        try {
            var d = 0;
            b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
            b.activeTexture(b.TEXTURE0);
            b.bindTexture(b.TEXTURE_2D, a.J);
            b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
            d = b.getError();
            if (d !== 0) {
                console.log("gl error " + d);
                c = k
            }
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
            b.bindTexture(b.TEXTURE_2D, j)
        } catch (e) {
            console.log("got some error: " + e);
            c = k
        }
        return c
    }

    function Ka(a, b, c) {
        D[c][a.name].data = b;
        return h
    }

    function La(a, b) {
        if (B && !b.J) {
            b.J = C.createTexture()
        }
        D.texture[a.name].data = b;
        return B ? Ja(b) : h
    }

    function Ma(a, b) {
        var c = new Image, d = b.url, e = b.name;
        c.src = "";
        c.addEventListener("load", function () {
            var d = D.texture[e];
            if (wa[a](b, c)) {
                d.status = "loaded";
                for (var i; i = d.aa.shift();) {
                    i(d.data)
                }
                Ga(a);
                Ga("all")
            } else {
                d.status = "try";
                H(a, b)
            }
        }, k);
        if (d.match(/^http(s)?:/)) {
            c.crossOrigin = "anonymous";
            c.src = d
        } else {
            c.src = d.match(/^data:/) ? d : pa + d
        }
    }

    function Xa(a, b) {
        var c = b.url, d = c, e = b.name;
        c.match(/^http(s)?:\/\//) || (d = pa + c);
        $.ajax({url:d, dataType:b.dataType, Rb:function (a) {
            a.withCredentials = h
        }, success:function (d, i) {
            var m = D[a][e];
            if (i == "success") {
                if ((wa[a] || wa["default"])(b, d, a)) {
                    m.status = "loaded";
                    for (var l; l = m.aa.shift();) {
                        l(m.data)
                    }
                    Ga(a);
                    Ga("all")
                } else {
                    m.status = "try";
                    H(a, b)
                }
            } else {
                console.log("Error loading asset " + c)
            }
        }})
    }

    function Ya() {
        var a;
        if (B) {
            a = C;
            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
        } else {
            a = fa;
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.fillRect(0, 0, a.ea, a.U)
        }
        if (ua) {
            ua.B();
            if (!ua.$) {
                ua.onEnterScene()
            }
        }
        if (!B && oa) {
            a.fillRect(0, 0, a.ea, a.U);
            a.drawImage(ea, 0, 0)
        }
        a = Date.now();
        Aa = a - za;
        za = a
    }

    var I = new Float32Array(3);

    function Za(a) {
        var a = ga(a), b = 0, c = F.length;
        for (I.set([a.x, a.y, 0]); b < c; b++) {
            F[b](I, 0)
        }
    }

    function $a(a) {
        var a = ga(a), b = 0, c = F.length;
        for (I.set([a.x, a.y, 0]); b < c; b++) {
            F[b](I, 1)
        }
    }

    function ab(a) {
        var a = ga(a), b = 0, c = F.length;
        for (I.set([a.x, a.y, 0]); b < c; b++) {
            F[b](I, 2)
        }
    }

    function bb(a) {
        var a = ga(a), b = 0, c = F.length;
        for (I.set([a.x, a.y, 0]); b < c; b++) {
            F[b](I, 3)
        }
    }

    function cb(a) {
        var a = ga(a), b = 0, c = F.length;
        for (I.set([a.x, a.y, 0]); b < c; b++) {
            F[b](I, 4)
        }
    }

    function db() {
        if (!qa) {
            window.requestAnimationFrame(db, x);
            E && E.begin();
            Ya();
            J.Jb(Aa);
            E && E.end()
        }
    }

    function M() {
        return Math.random() * 2 - 1
    }

    q("chesterGL.version", "0.3");
    q("chesterGL.settings", ma);
    q("chesterGL.mouseEvents", Ba);
    Ba.UP = 2;
    Ba.DOWN = 0;
    Ba.MOVE = 1;
    Ba.ENTER = 3;
    Ba.LEAVE = 4;
    q("chesterGL.viewportSize", function () {
        return new eb(C.ea, C.U)
    });
    q("chesterGL.setup", function (a) {
        a = document.getElementById(a);
        na = ma.projection;
        B = ma.webglMode;
        oa = ma.usesOffscreenBuffer;
        pa = ma.basePath;
        try {
            x = a;
            if (B) {
                if ((C = a.getContext("experimental-webgl", {alpha:k, antialias:k, preserveDrawingBuffer:h})) && window.WebGLDebugUtils) {
                    console.log("installing debug context");
                    C = WebGLDebugUtils.makeDebugContext(C, ka)
                }
            }
        } catch (b) {
            console.log("ERROR: " + b)
        }
        if (!C) {
            C = a.getContext("2d");
            if (oa) {
                ea = document.createElement("canvas");
                ea.width = a.width;
                ea.height = a.height;
                fa = ea.getContext("2d");
                fa.ea = a.width;
                fa.U = a.height
            } else {
                fa = C
            }
            (!C || !fa) && f("Error initializing graphic context!");
            B = ma.webglMode = k
        }
        Da();
        if (window.navigator.platform.match(/iPhone|iPad/)) {
            document.addEventListener("touchstart", Za, k);
            document.addEventListener("touchmove", function (a) {
                $a(a);
                a.preventDefault()
            }, k);
            document.addEventListener("touchend", ab, k)
        } else {
            $(x).mousedown(Za);
            $(x).mousemove($a);
            $(x).mouseup(ab);
            $(x).mouseenter(bb);
            $(x).mouseleave(cb)
        }
        if (B) {
            var c = C;
            Ea("default", function (a) {
                a.z = c.getUniformLocation(a, "uMVPMatrix");
                a.a = {vertexPositionAttribute:c.getAttribLocation(a, "aVertexPosition"), vertexColorAttribute:c.getAttribLocation(a, "aVertexColor")};
                a.mvpMatrixUniform = a.z;
                a.attribs = a.a
            });
            Ea("texture", function (a) {
                a.z = c.getUniformLocation(a, "uMVPMatrix");
                a.Ha = c.getUniformLocation(a, "uSampler");
                a.a = {vertexColorAttribute:c.getAttribLocation(a, "aVertexColor"), textureCoordAttribute:c.getAttribLocation(a, "aTextureCoord"), vertexPositionAttribute:c.getAttribLocation(a, "aVertexPosition")};
                a.mvpMatrixUniform = a.z;
                a.samplerUniform = a.Ha;
                a.attribs = a.a
            })
        }
        var a = window.location.search.substring(1).split("&"), d;
        for (d in a) {
            var e = a[d].split("=");
            if (e[0] == "_cdbg" && e[1] == "1") {
                va = h;
                console.log("debug mode on")
            }
        }
        wa.texture = La;
        wa["default"] = Ka;
        xa.texture = Ma;
        xa["default"] = Xa;
        if (la) {
            console.log("chesterGL: adding stats");
            E = new la;
            E.setMode(1);
            E.domElement.style.position = "absolute";
            E.domElement.style.left = "0px";
            E.domElement.style.top = "0px";
            q("chesterGL.stats", E);
            document.body.appendChild(E.domElement)
        }
    });
    q("chesterGL.canvasResized", Da);
    q("chesterGL.initShader", Ea);
    q("chesterGL.registerAssetHandler", function (a, b) {
        wa[a] = b
    });
    q("chesterGL.loadAsset", H);
    q("chesterGL.assetsLoaded", Ga);
    q("chesterGL.getAsset", Ha);
    q("chesterGL.hasAsset", Ia);
    q("chesterGL.setupPerspective", function () {
        var a = C;
        if (B) {
            a.clearColor(0, 0, 0, 1);
            a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
            a.enable(a.BLEND);
            a.disable(a.DEPTH_TEST);
            var b = a.ea, c = a.U;
            a.viewport(0, 0, b, c);
            ta = new Float32Array(16);
            if (na == "2d") {
                console.log("setting up 2d projection (" + b + "," + c + ")");
                fb(ta, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0, 1)
            } else {
                if (na == "3d") {
                    console.log("setting up 3d projection (" + b + "," + c + ")");
                    var d = c / 1.1566;
                    var a = new Float32Array(16), e = b / c, g = 60 * Math.PI / 180 / 2, i = Math.sin(g);
                    if (!(i == 0 || e == 0)) {
                        g = Math.cos(g) / i;
                        a = fb(a, g / e, 0, 0, 0, 0, g, 0, 0, 0, 0, -1500.5 / 1499.5, -1, 0, 0, -1500 / 1499.5, 0)
                    }
                    d = [b / 2, c / 2, d];
                    e = [b / 2, c / 2, 0];
                    b = new Float32Array(16);
                    c = gb[0];
                    c[0] = e[0] - d[0];
                    c[1] = e[1] - d[1];
                    c[2] = e[2] - d[2];
                    hb(c, c);
                    c[3] = 0;
                    e = gb[1];
                    ib(c, [0, 1, 0], e);
                    hb(e, e);
                    e[3] = 0;
                    g = gb[2];
                    ib(e, c, g);
                    hb(g, g);
                    g[3] = 0;
                    c[0] = -c[0];
                    c[1] = -c[1];
                    c[2] = -c[2];
                    jb(b, 0, e);
                    jb(b, 1, g);
                    jb(b, 2, c);
                    b[3] = 0;
                    b[7] = 0;
                    b[11] = 0;
                    b[15] = 1;
                    kb(b, -d[0], -d[1], -d[2]);
                    lb(a, b, ta)
                } else {
                    f("Invalid projection: " + na)
                }
            }
        }
    });
    q("chesterGL.setRunningScene", function (a) {
        if (ua && ua != a) {
            ua.onExitScene()
        }
        a.type == P.SCENE && (ua = a)
    });
    q("chesterGL.drawScene", Ya);
    q("chesterGL.run", db);
    q("chesterGL.togglePause", function () {
        if (qa) {
            qa = k;
            za = Date.now();
            db()
        } else {
            qa = h
        }
    });
    q("chesterGL.isPaused", function () {
        return qa
    });
    q("chesterGL.setPause", function (a) {
        if (qa && !a) {
            qa = a;
            za = Date.now();
            db()
        } else {
            qa = a
        }
    });
    q("chesterGL.addMouseHandler", function (a) {
        F.indexOf(a) == -1 && F.push(a)
    });
    q("chesterGL.removeMouseHandler", function (a) {
        a = F.indexOf(a);
        a >= 0 && F.splice(a, 1)
    });
    function eb(a, b) {
        this.width = a;
        this.height = b
    }

    eb.prototype.toString = function () {
        return"(" + this.width + " x " + this.height + ")"
    };
    eb.prototype.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    function Q(a) {
        this.length = a.length || a;
        for (var b = 0; b < this.length; b++) {
            this[b] = a[b] || 0
        }
    }

    Q.prototype.BYTES_PER_ELEMENT = 8;
    Q.prototype.set = function (a, b) {
        for (var b = b || 0, c = 0; c < a.length && b + c < this.length; c++) {
            this[b + c] = a[c]
        }
    };
    Q.prototype.toString = Array.prototype.join;
    "undefined" == typeof Float64Array && (Q.BYTES_PER_ELEMENT = 8, Q.prototype.BYTES_PER_ELEMENT = Q.prototype.BYTES_PER_ELEMENT, Q.prototype.set = Q.prototype.set, Q.prototype.toString = Q.prototype.toString, q("Float64Array", Q));
    function R(a) {
        this.length = a.length || a;
        for (var b = 0; b < this.length; b++) {
            this[b] = a[b] || 0
        }
    }

    R.prototype.BYTES_PER_ELEMENT = 4;
    R.prototype.set = function (a, b) {
        for (var b = b || 0, c = 0; c < a.length && b + c < this.length; c++) {
            this[b + c] = a[c]
        }
    };
    R.prototype.toString = Array.prototype.join;
    "undefined" == typeof Float32Array && (R.BYTES_PER_ELEMENT = 4, R.prototype.BYTES_PER_ELEMENT = R.prototype.BYTES_PER_ELEMENT, R.prototype.set = R.prototype.set, R.prototype.toString = R.prototype.toString, q("Float32Array", R));
    function mb(a) {
        var b = new Float32Array(3);
        nb(b, a);
        return b
    }

    function nb(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2]
    }

    function hb(a, b) {
        var c = a[0], d = a[1], e = a[2], c = 1 / Math.sqrt(c * c + d * d + e * e);
        b[0] = a[0] * c;
        b[1] = a[1] * c;
        b[2] = a[2] * c
    }

    function ib(a, b, c) {
        var d = a[0], e = a[1], a = a[2], g = b[0], i = b[1], b = b[2];
        c[0] = e * b - a * i;
        c[1] = a * g - d * b;
        c[2] = d * i - e * g
    }

    ;
    function ob(a) {
        var b = new Float32Array(4);
        pb(b, a);
        return b
    }

    function qb(a, b, c, d) {
        var e = new Float32Array(4);
        e[0] = a;
        e[1] = b;
        e[2] = c;
        e[3] = d;
        return e
    }

    function pb(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3]
    }

    ;
    function fb(a, b, c, d, e, g, i, m, l, p, r, s, y, z, v, w, t) {
        a[0] = b;
        a[1] = c;
        a[2] = d;
        a[3] = e;
        a[4] = g;
        a[5] = i;
        a[6] = m;
        a[7] = l;
        a[8] = p;
        a[9] = r;
        a[10] = s;
        a[11] = y;
        a[12] = z;
        a[13] = v;
        a[14] = w;
        a[15] = t;
        return a
    }

    function jb(a, b, c) {
        a[b] = c[0];
        a[b + 4] = c[1];
        a[b + 8] = c[2];
        a[b + 12] = c[3]
    }

    function rb(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 0;
        a[5] = 1;
        a[6] = 0;
        a[7] = 0;
        a[8] = 0;
        a[9] = 0;
        a[10] = 1;
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1;
        return a
    }

    function lb(a, b, c) {
        var d = a[0], e = a[1], g = a[2], i = a[3], m = a[4], l = a[5], p = a[6], r = a[7], s = a[8], y = a[9], z = a[10], v = a[11], w = a[12], t = a[13], A = a[14], a = a[15], G = b[0], N = b[1], O = b[2], K = b[3], L = b[4], ba = b[5], Na = b[6], Oa = b[7], Pa = b[8], Qa = b[9], Ra = b[10], Sa = b[11], Ta = b[12], Ua = b[13], Wa = b[14], b = b[15];
        c[0] = d * G + m * N + s * O + w * K;
        c[1] = e * G + l * N + y * O + t * K;
        c[2] = g * G + p * N + z * O + A * K;
        c[3] = i * G + r * N + v * O + a * K;
        c[4] = d * L + m * ba + s * Na + w * Oa;
        c[5] = e * L + l * ba + y * Na + t * Oa;
        c[6] = g * L + p * ba + z * Na + A * Oa;
        c[7] = i * L + r * ba + v * Na + a * Oa;
        c[8] = d * Pa + m * Qa + s * Ra + w * Sa;
        c[9] = e * Pa + l * Qa + y * Ra + t * Sa;
        c[10] = g * Pa + p * Qa + z * Ra + A * Sa;
        c[11] = i * Pa + r * Qa + v * Ra + a * Sa;
        c[12] = d * Ta + m * Ua + s * Wa + w * b;
        c[13] = e * Ta + l * Ua + y * Wa + t * b;
        c[14] = g * Ta + p * Ua + z * Wa + A * b;
        c[15] = i * Ta + r * Ua + v * Wa + a * b
    }

    function sb(a, b, c) {
        var d = b[0], e = b[1], b = b[2];
        c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
        c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
        c[2] = d * a[2] + e * a[6] + b * a[10] + a[14]
    }

    function kb(a, b, c, d) {
        var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], i = a[3] * b + a[7] * c + a[11] * d + a[15];
        a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
        a[13] = e;
        a[14] = g;
        a[15] = i
    }

    new Float64Array(3);
    new Float64Array(3);
    var gb = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
    new Float64Array(16);
    function S(a, b, c) {
        this.type = b || P.STANDALONE;
        c && (this.parent = c);
        this.children = [];
        this.f = T.DEFAULT;
        a && ("string" === typeof a && Ia("texture", a) ? this.T(a) : this.S(a));
        this.type == P.STANDALONE && this.gb([1, 1, 1, 1]);
        this.ba(0, 0, 0);
        this.fb(0.5, 0.5);
        if (B && (!c || c.type != P.BLOCKGROUP)) {
            this.l = C.createBuffer(), this.k = new Float32Array(36)
        }
        this.d = new Float32Array(16);
        this.r = new Float32Array(16);
        this.d = rb(new Float32Array(16));
        this.sa = [];
        this.W = []
    }

    var T = {DEFAULT:0, TEXTURE:1}, tb = ["default", "texture"], P = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, ub = Math.PI / 180, vb = 180 / Math.PI, wb = 1 * ub, xb = qb(0, 0, 1, 1), yb = new eb(0, 0);
    o = S.prototype;
    o.title = "";
    o.ob = k;
    o.d = j;
    o.r = j;
    o.visible = h;
    o.$ = k;
    o.g = k;
    o.D = k;
    o.F = k;
    o.fa = 0;
    o.l = j;
    o.k = j;
    o.position = j;
    o.K = j;
    o.i = j;
    o.color = j;
    o.c = j;
    o.rotation = 0;
    o.R = 1;
    o.pa = 1;
    o.update = j;
    o.frame = j;
    o.parent = j;
    o.children = j;
    o.sa = j;
    o.W = j;
    o.o = k;
    o.Fb = function () {
        this.$ = h;
        for (var a in this.children) {
            this.children[a].onEnterScene()
        }
    };
    o.Gb = function () {
        this.$ = k;
        for (var a in this.children) {
            this.children[a].onExitScene()
        }
    };
    o.S = function (a) {
        if ("string" === typeof a) {
            var b = U.ja(a);
            b || f("Invalid frame name: " + a);
            a = b.frame;
            this.T(b.c)
        }
        this.frame ? pb(this.frame, a) : this.frame = ob(a);
        this.Ia(a[2], a[3]);
        this.F = h
    };
    o.ja = n("frame");
    o.Ia = function (a, b) {
        this.i = new eb(a, b);
        this.F = h
    };
    o.xb = n("i");
    o.Ka = function (a, b) {
        this.R = a;
        this.pa = 2 == arguments.length ? b : this.R;
        this.g = h
    };
    o.Ab = n("R");
    o.gb = function (a) {
        this.color ? pb(this.color, a) : this.color = ob(a);
        this.D = h
    };
    o.wb = n("color");
    o.ba = function (a, b, c) {
        if (this.position) {
            if (1 == arguments.length) {
                nb(this.position, a)
            } else {
                var d = this.position;
                d[0] = a;
                d[1] = b;
                d[2] = c
            }
        } else {
            1 == arguments.length ? d = mb(a) : (d = new Float32Array(3), d[0] = a, d[1] = b, d[2] = c), this.position = d
        }
        this.g = h
    };
    o.fb = function (a, b) {
        this.K = new da(a, b)
    };
    o.ub = n("K");
    o.yb = n("position");
    o.tb = function (a) {
        for (var b = this.parent, a = mb(a || this.position); b;) {
            sb(b.d, a, a), b = b.parent
        }
        return a
    };
    o.vb = function () {
        var a = this.position, b = this.frame[2], c = this.frame[3];
        return[a[0] - b / 2, a[1] - c / 2, b, c]
    };
    o.T = function (a) {
        this.c = a;
        this.f = T.TEXTURE;
        if (va) {
            if (this.f == T.TEXTURE) {
                var b = new V(1, 1);
                this.C(b);
                b.ib(function () {
                    var a = this.parent.i, b = a.width / 2, a = a.height / 2;
                    this.va([
                        [-b, -a, 0],
                        [-b, a, 0],
                        [b, a, 0],
                        [b, -a, 0]
                    ], [1, 1, 1, 1], h)
                })
            }
            this.ob = h
        }
        var c = this;
        H("texture", a, j, function (a) {
            c.i || c.Ia(a.width, a.height);
            c.frame || c.S([0, 0, a.width, a.height])
        })
    };
    o.Bb = n("c");
    o.Ja = function (a) {
        this.rotation = a;
        this.g = h
    };
    o.zb = n("rotation");
    o.ib = function (a) {
        this.update = a
    };
    o.Ib = function (a) {
        this.visible = a
    };
    o.Db = n("visible");
    o.C = function (a) {
        a.parent && f("can't add a block twice!");
        this.o ? this.sa.push(a) : (this.children.push(a), a.parent = this);
        if (this.$) {
            a.onEnterScene()
        }
    };
    o.removeChild = function (a) {
        (!a.parent || a.parent != this) && f("not our child!");
        if (this.o) {
            this.W.push(a)
        } else {
            var b = this.children.indexOf(a);
            0 <= b && (this.children.splice(b, 1), a.parent = j)
        }
        if (this.$) {
            a.onExitScene()
        }
    };
    o.transform = function () {
        var a = C, b, c;
        if (this.g || this.parent && this.parent.g) {
            b = this.position[0];
            c = this.position[1];
            rb(this.d);
            kb(this.d, b, c, this.position[2]);
            b = this.d;
            var d = -1 * this.rotation;
            c = b[0];
            var e = b[1], g = b[2], i = b[3], m = b[4], l = b[5], p = b[6], r = b[7], s = b[8], y = b[9], z = b[10], v = b[11], w = Math.cos(d), t = Math.sin(d), A = 1 - w, d = 0 * A + w, G = 0 * A + 1 * t, N = 0 * A - 0 * t, O = 0 * A - 1 * t, K = 0 * A + w, L = 0 * A + 0 * t, ba = 0 * A + 0 * t, t = 0 * A - 0 * t, w = 1 * A + w;
            fb(b, c * d + m * G + s * N, e * d + l * G + y * N, g * d + p * G + z * N, i * d + r * G + v * N, c * O + m * K + s * L, e * O + l * K + y * L, g * O + p * K + z * L, i * O + r * K + v * L, c * ba + m * t + s * w, e * ba + l * t + y * w, g * ba + p * t + z * w, i * ba + r * t + v * w, b[12], b[13], b[14], b[15]);
            b = this.d;
            c = this.R;
            e = this.pa;
            fb(b, b[0] * c, b[1] * c, b[2] * c, b[3] * c, b[4] * e, b[5] * e, b[6] * e, b[7] * e, 1 * b[8], 1 * b[9], 1 * b[10], 1 * b[11], b[12], b[13], b[14], b[15]);
            (b = this.parent ? this.parent.d : j) && lb(b, this.d, this.d)
        }
        if (!(this.type == P.BLOCKGROUP || this.type == P.PRIMITIVE)) {
            if (b = this.k, c = this.parent && this.parent.type == P.BLOCKGROUP, B) {
                !c && (this.F || this.D) && a.bindBuffer(a.ARRAY_BUFFER, this.l);
                if (this.F || c && this.g) {
                    if (i = 0.5 * this.i.width, m = 0.5 * this.i.height, g = this.position[2], e = 36 * this.fa, c ? (l = [i, m, 0], p = [-i, m, 0], r = [i, -m, 0], i = [-i, -m, 0], sb(this.d, l, l), sb(this.d, p, p), sb(this.d, i, i), sb(this.d, r, r), b[e] = i[0], b[e + 1] = i[1], b[e + 2] = g, b[e + 9] = p[0], b[e + 1 + 9] = p[1], b[e + 2 + 9] = g, b[e + 18] = r[0], b[e + 1 + 18] = r[1], b[e + 2 + 18] = g, b[e + 27] = l[0], b[e + 1 + 27] = l[1]) : (l = this.i ? (0.5 - this.K.x) * this.i.width : 0, p = this.i ?
                        (0.5 - this.K.y) * this.i.height : 0, b[e] = -i + l, b[e + 1] = -m + p, b[e + 2] = g, b[e + 9] = -i + l, b[e + 1 + 9] = m + p, b[e + 2 + 9] = g, b[e + 18] = i + l, b[e + 1 + 18] = -m + p, b[e + 2 + 18] = g, b[e + 27] = i + l, b[e + 1 + 27] = m + p), b[e + 2 + 27] = g, this.f == T.TEXTURE) {
                        g = Ha("texture", this.c), m = g.width, l = g.height, g = this.frame[0] / m + 0.0010, i = this.frame[1] / l + 0.0010, m = this.frame[2] / m - 0.0020, l = this.frame[3] / l - 0.0020, e += 3, b[e] = g, b[e + 1] = i, b[e + 9] = g, b[e + 1 + 9] = i + l, b[e + 18] = g + m, b[e + 1 + 18] = i, b[e + 27] = g + m, b[e + 1 + 27] = i + l
                    }
                }
                if (this.D) {
                    e = 5 + 36 * this.fa;
                    g = this.color;
                    for (i = 0; 4 > i; i++) {
                        b[e + 9 * i] = g[0], b[e + 1 + 9 * i] = g[1], b[e + 2 + 9 * i] = g[2], b[e + 3 + 9 * i] = g[3]
                    }
                }
                B && (!c && (this.F || this.D)) && a.bufferData(a.ARRAY_BUFFER, this.k, a.STATIC_DRAW)
            }
        }
    };
    o.B = function () {
        this.o = h;
        this.update && this.update(Aa);
        if (this.visible) {
            this.transform();
            (!this.parent || this.parent.type != P.BLOCKGROUP) && this.Q();
            for (var a = this.children, b = a.length, c = 0; c < b; c++) {
                a[c].B()
            }
            for (this.o = this.F = this.D = this.g = k; a = this.sa.shift();) {
                this.C(a)
            }
            for (; a = this.W.shift();) {
                this.removeChild(a)
            }
        } else {
            this.o = k
        }
    };
    o.Q = function () {
        this.type == P.BLOCKGROUP && f("Cannot call render on a BlockGroup block!");
        if (this.type != P.SCENE) {
            var a, b;
            if (B) {
                a = C;
                var c = Ca(tb[this.f]);
                a.bindBuffer(a.ARRAY_BUFFER, this.l);
                a.vertexAttribPointer(c.a.vertexPositionAttribute, 3, a.FLOAT, k, 36, 0);
                a.vertexAttribPointer(c.a.vertexColorAttribute, 4, a.FLOAT, k, 36, 20);
                this.f != T.DEFAULT && this.f == T.TEXTURE && (b = Ha("texture", this.c), a.vertexAttribPointer(c.a.textureCoordAttribute, 2, a.FLOAT, k, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.J), a.uniform1i(c.Ha, 0));
                (this.g || this.parent && this.parent.g) && lb(ta, this.d, this.r);
                a.uniformMatrix4fv(c.z, k, this.r);
                a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
            } else {
                a = fa;
                b = this.d;
                var d = c = 0;
                this.i && (c = this.i.width, d = this.i.height);
                a.globalAlpha = this.color[3];
                a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.K.x) * c, a.U - (b[13] + (0.5 - this.K.y) * d));
                if (1 == this.f) {
                    b = Ha("texture", this.c);
                    var e = this.frame;
                    a.drawImage(b, e[0], b.height - (e[1] + d), e[2], e[3], -c / 2, -d / 2, c, d)
                } else {
                    b = [];
                    for (e = 0; 4 > e; e++) {
                        b[e] = 255 * this.color[e]
                    }
                    a.fillStyle = "rgba(" + b.join(",") + ")";
                    a.fillRect(-c / 2, -d / 2, c, d)
                }
            }
        }
    };
    q("chesterGL.Block", S);
    q("chesterGL.Block.FullFrame", xb);
    q("chesterGL.Block.SizeZero", yb);
    q("chesterGL.Block.TYPE", P);
    q("chesterGL.Block.PROGRAM", T);
    q("chesterGL.Block.PROGRAM_NAME", tb);
    q("chesterGL.Block.DEG_TO_RAD", ub);
    q("chesterGL.Block.RAD_TO_DEG", vb);
    q("chesterGL.Block.ONE_DEG", wb);
    S.prototype.title = S.prototype.title;
    S.prototype.onEnterScene = S.prototype.Fb;
    S.prototype.onExitScene = S.prototype.Gb;
    S.prototype.children = S.prototype.children;
    S.prototype.addChild = S.prototype.C;
    S.prototype.removeChild = S.prototype.removeChild;
    S.prototype.getBoundingBox = S.prototype.vb;
    S.prototype.setPosition = S.prototype.ba;
    S.prototype.getPosition = S.prototype.yb;
    S.prototype.setAnchorPoint = S.prototype.fb;
    S.prototype.getAnchorPoint = S.prototype.ub;
    S.prototype.getAbsolutePosition = S.prototype.tb;
    S.prototype.setRotation = S.prototype.Ja;
    S.prototype.getRotation = S.prototype.zb;
    S.prototype.setColor = S.prototype.gb;
    S.prototype.getColor = S.prototype.wb;
    S.prototype.setFrame = S.prototype.S;
    S.prototype.getFrame = S.prototype.ja;
    S.prototype.setContentSize = S.prototype.Ia;
    S.prototype.getContentSize = S.prototype.xb;
    S.prototype.setTexture = S.prototype.T;
    S.prototype.getTexture = S.prototype.Bb;
    S.prototype.setScale = S.prototype.Ka;
    S.prototype.getScale = S.prototype.Ab;
    S.prototype.setUpdate = S.prototype.ib;
    S.prototype.setVisible = S.prototype.Ib;
    S.prototype.isVisible = S.prototype.Db;
    function zb(a) {
        S.call(this, j, 4);
        var b = this;
        H("texture", a.texture, j, function () {
            b.bb(a)
        })
    }

    u(zb, S);
    var Ab = k;

    function Bb() {
        Ea("particles", function (a) {
            var b = C;
            a.z = b.getUniformLocation(a, "uMVPMatrix");
            a.Kb = b.getUniformLocation(a, "uSampler");
            a.Lb = b.getUniformLocation(a, "u_time");
            a.a = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
            a.Ta = k;
            a = b.getError();
            0 !== a && console.log("gl error: " + a)
        });
        Ab = h
    }

    o = zb.prototype;
    o.A = h;
    o.cb = j;
    o.Ya = 0;
    o.M = 0;
    o.H = 0;
    o.G = 0;
    o.duration = 0;
    o.Aa = 0;
    o.ab = 0;
    o.ca = j;
    o.da = j;
    o.oa = j;
    o.X = j;
    o.Y = j;
    o.ma = j;
    o.na = j;
    o.lb = 0;
    o.mb = 0;
    o.Za = 0;
    o.$a = 0;
    o.Fa = k;
    o.elapsedTime = 0;
    o.ta = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
    o.bb = function (a) {
        this.f = -1;
        Ab || Bb();
        this.cb = a.texture;
        this.G = a.maxParticles;
        this.duration = 1E3 * parseFloat(a.duration);
        this.Aa = 1E3 * parseFloat(a.lifetime);
        this.ab = 1E3 * parseFloat(a.lifetimeVariance);
        this.ca = ob(a.startColor);
        this.da = ob(a.startColorVariance);
        this.X = ob(a.endColor);
        this.Y = ob(a.endColorVariance);
        this.oa = mb(a.positionVariance);
        this.ma = mb(a.speed);
        this.na = mb(a.speedVariance);
        this.lb = parseFloat(a.startSize);
        this.mb = parseFloat(a.startSizeVariance);
        this.Za = parseFloat(a.endSize);
        this.$a = parseFloat(a.endSizeVariance);
        this.elapsedTime = 0;
        this.ta = a.blendOptions.slice(0);
        this.A = h;
        this.l || (this.l = C.createBuffer());
        this.k = new Float32Array(18 * this.G);
        for (var a = Ca("particles"), b = C, c = 0; c < this.G; c++) {
            Cb(this, c)
        }
        b.uniform1i(a.Kb, 0);
        Db(this, a);
        this.H = this.M = this.elapsedTime = 0;
        this.Ya = this.G / Math.abs(this.Aa)
    };
    function Cb(a, b, c, d) {
        var e = a.k;
        e[18 * b + 0] = c || -1;
        e[18 * b + 1] = d || 0;
        e[18 * b + 2] = a.lb + a.mb * M();
        e[18 * b + 3] = a.Za + a.$a * M();
        e[18 * b + 4] = a.ma[0] + a.na[0] * M();
        e[18 * b + 5] = a.ma[1] + a.na[1] * M();
        e[18 * b + 6] = a.ma[2] + a.na[2] * M();
        e[18 * b + 7] = M() * a.oa[0];
        e[18 * b + 8] = M() * a.oa[1];
        e[18 * b + 9] = M() * a.oa[2];
        e[18 * b + 10] = Math.max(0, Math.min(1, a.ca[0] + M() * a.da[0]));
        e[18 * b + 11] = Math.max(0, Math.min(1, a.ca[1] + M() * a.da[1]));
        e[18 * b + 12] = Math.max(0, Math.min(1, a.ca[2] + M() * a.da[2]));
        e[18 * b + 13] = Math.max(0, Math.min(1, a.ca[3] + M() * a.da[3]));
        e[18 * b + 14] = Math.max(0, Math.min(1, a.X[0] + M() * a.Y[0]));
        e[18 * b + 15] = Math.max(0, Math.min(1, a.X[1] + M() * a.Y[1]));
        e[18 * b + 16] = Math.max(0, Math.min(1, a.X[2] + M() * a.Y[2]));
        e[18 * b + 17] = Math.max(0, Math.min(1, a.X[3] + M() * a.Y[3]))
    }

    function Db(a, b) {
        var c = C;
        c.bindBuffer(c.ARRAY_BUFFER, a.l);
        b.Ta || (c.vertexAttribPointer(b.a.a_lifetime, 1, c.FLOAT, k, 72, 0), c.vertexAttribPointer(b.a.a_startTime, 1, c.FLOAT, k, 72, 4), c.vertexAttribPointer(b.a.a_startSize, 1, c.FLOAT, k, 72, 8), c.vertexAttribPointer(b.a.a_endSize, 1, c.FLOAT, k, 72, 12), c.vertexAttribPointer(b.a.a_speed, 3, c.FLOAT, k, 72, 16), c.vertexAttribPointer(b.a.a_startPosition, 3, c.FLOAT, k, 72, 28), c.vertexAttribPointer(b.a.a_startColor, 4, c.FLOAT, k, 72, 40), c.vertexAttribPointer(b.a.a_endColor, 4, c.FLOAT, k, 72,
            56), b.Ta = h);
        c.bufferData(c.ARRAY_BUFFER, a.k, c.STATIC_DRAW)
    }

    var Eb = new Float32Array(18);
    zb.prototype.update = function (a) {
        if (Ca("particles")) {
            this.elapsedTime += a;
            var b = 1 / this.Ya;
            for (this.M += a; this.H < this.G && this.M > b && this.A;) {
                a = Math.abs(this.Aa + this.ab * M()), Cb(this, this.H++, a, this.elapsedTime), this.Fa = h, this.M -= b
            }
            for (b = 0; b < this.G; b++) {
                var a = this.k, c = 18 * b;
                if (0 < a[c] && a[c] + a[c + 1] <= this.elapsedTime && b != this.H - 1) {
                    var d = a.subarray(c, c + 18);
                    Eb.set(d);
                    Eb[0] = -1;
                    d = a.subarray(c + 18, 18 * this.H);
                    a.set(d, c);
                    a.set(Eb, 18 * (this.H - 1));
                    this.H--
                }
            }
            0 < this.duration && this.elapsedTime > this.duration && (this.A = k)
        }
    };
    zb.prototype.Q = function () {
        var a = Ca("particles");
        if (a) {
            var b = C, c = Ha("texture", this.cb);
            b.blendFunc(b[this.ta[0]], b[this.ta[1]]);
            b.uniform1f(a.Lb, this.elapsedTime);
            b.activeTexture(b.TEXTURE0);
            b.bindTexture(b.TEXTURE_2D, c.J);
            this.Fa ? (Db(this, a), this.Fa = k) : b.bindBuffer(b.ARRAY_BUFFER, this.l);
            (this.g || this.parent && this.parent.g) && lb(ta, this.d, this.r);
            b.uniformMatrix4fv(a.z, k, this.r);
            b.drawArrays(b.POINTS, 0, this.G);
            b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
        }
    };
    q("chesterGL.GPUParticleSystem", zb);
    zb.loadShaders = Bb;
    zb.prototype.loadProperties = zb.prototype.bb;
    function W(a, b) {
        this.totalTime = a;
        this.b = b;
        this.j = 0
    }

    o = W.prototype;
    o.s = 0;
    o.b = j;
    o.totalTime = 0;
    o.j = 0;
    o.v = k;
    o.A = k;
    o.update = function (a) {
        this.j += a;
        0 < this.totalTime && this.j >= this.totalTime && this.stop()
    };
    o.m = function () {
        this.A = h
    };
    o.stop = function () {
        this.v = h;
        this.A = k
    };
    o.reset = function () {
        this.v = this.A = k;
        this.j = 0
    };
    function X(a, b, c, d) {
        W.call(this, b, d);
        this.ga = mb(a);
        this.N = void 0 !== c ? c === h : h;
        this.La = new Float32Array(3);
        this.Z = new Float32Array(3)
    }

    u(X, W);
    X.prototype.ga = j;
    X.prototype.Z = j;
    X.prototype.N = h;
    X.prototype.La = j;
    var Fb = new Float32Array(3);
    X.prototype.update = function (a) {
        W.prototype.update.call(this, a);
        var a = this.b, b = Math.min(1, this.j / this.totalTime), c = this.La, d = this.Z, e = c[0], g = c[1], c = c[2];
        Fb[0] = (d[0] - e) * b + e;
        Fb[1] = (d[1] - g) * b + g;
        Fb[2] = (d[2] - c) * b + c;
        a.ba(Fb[0], Fb[1], Fb[2])
    };
    X.prototype.m = function () {
        W.prototype.m.call(this);
        this.b || f("invalid move action! - no block");
        if (this.N) {
            var a = this.ga, b = this.b.position, c = this.Z;
            c[0] = a[0] + b[0];
            c[1] = a[1] + b[1];
            c[2] = a[2] + b[2]
        } else {
            nb(this.Z, this.ga)
        }
        nb(this.La, this.b.position)
    };
    X.prototype.stop = function () {
        W.prototype.stop.call(this);
        this.j >= this.totalTime && this.b.ba(this.Z)
    };
    X.prototype.reverse = function () {
        this.N || f("This only works on relative movements");
        var a = [], b = this.ga;
        a[0] = -b[0];
        a[1] = -b[1];
        a[2] = -b[2];
        return new X(a, this.totalTime, h)
    };
    function Y(a, b, c, d, e) {
        W.call(this, c, e);
        this.N = d;
        this.wa = a;
        this.xa = b;
        this.Na = this.Ma = this.ia = this.ha = 0
    }

    u(Y, W);
    o = Y.prototype;
    o.m = function () {
        Y.qa.m.call(this);
        this.b || f("invalid scale action - no block provided");
        this.N ? (this.ha = this.b.R + this.wa, this.ia = this.b.pa + this.xa) : (this.ha = this.wa, this.ia = this.xa);
        this.Ma = this.b.R;
        this.Na = this.b.pa
    };
    o.update = function (a) {
        Y.qa.update.call(this, a);
        var a = this.b, b = Math.min(1, this.j / this.totalTime);
        a.Ka(this.Ma + b * (this.ha - this.Ma), this.Na + b * (this.ia - this.Na))
    };
    o.stop = function () {
        Y.qa.stop.call(this);
        this.j >= this.totalTime && this.b.Ka(this.ha, this.ia)
    };
    o.reset = function () {
        Y.qa.reset.call(this)
    };
    o.reverse = function () {
        this.N || f("This only works on relative movements");
        return new Y(-this.wa, -this.xa, this.totalTime, h)
    };
    function Gb(a, b, c) {
        this.Ua = a;
        this.Sa = c;
        W.call(this, b || 1)
    }

    u(Gb, W);
    Gb.prototype.Ua = j;
    Gb.prototype.Sa = j;
    Gb.prototype.update = function (a) {
        W.prototype.update.call(this, a);
        this.v && this.Ua.call(j, this.Sa)
    };
    function Hb(a, b) {
        W.call(this, a.totalTime + b.totalTime);
        this.p = [a, b]
    }

    u(Hb, W);
    o = Hb.prototype;
    o.p = j;
    o.ua = 0;
    o.kb = 0;
    o.m = function () {
        W.prototype.m.call(this);
        this.kb = this.p[0].totalTime;
        this.b.Ga(this.p[0])
    };
    o.reset = function () {
        W.prototype.reset.call(this);
        this.ua = 0;
        this.p[0].reset();
        this.p[1].reset();
        J.Pa(this.p[0].s);
        J.Pa(this.p[1].s)
    };
    o.update = function (a) {
        W.prototype.update.call(this, a);
        0 === this.ua && this.j >= this.kb && (this.p[0].stop(), this.ua = 1, this.b.Ga(this.p[1]))
    };
    function Ib(a, b) {
        this.Da = b || 1;
        this.Oa = 0;
        this.action = a;
        W.call(this, a.totalTime)
    }

    u(Ib, W);
    o = Ib.prototype;
    o.Da = 0;
    o.Oa = 0;
    o.action = j;
    o.m = function () {
        W.prototype.m.call(this);
        this.action.b = this.b
    };
    o.update = function (a) {
        W.prototype.update.call(this, a);
        this.action.update(a);
        if (this.v && (0 > this.Da || this.Oa < this.Da)) {
            this.Oa++, this.reset(), this.action.reset(), this.m()
        }
    };
    function Jb(a, b, c, d) {
        this.delay = a;
        a *= b.length;
        c === h && (a = -1);
        W.call(this, a, d);
        this.jb = c === h;
        this.frames = b.slice(0)
    }

    u(Jb, W);
    o = Jb.prototype;
    o.L = 0;
    o.delay = 0;
    o.frames = j;
    o.jb = k;
    o.update = function (a) {
        W.prototype.update.call(this, a);
        a = this.b;
        this.v ? (this.L = this.frames.length - 1, a.S(this.frames[this.L])) : this.j >= this.delay * this.L && (a.S(this.frames[this.L++]), this.L == this.frames.length && (this.jb ? this.j = this.L = 0 : this.v = h))
    };
    function Kb(a, b, c, d) {
        this.Ra = a;
        this.Xa = b;
        W.call(this, c, d)
    }

    u(Kb, W);
    Kb.prototype.Ra = 0;
    Kb.prototype.Xa = 0;
    Kb.prototype.update = function (a) {
        W.prototype.update.call(this, a);
        this.v ? this.b.Ja(0) : this.b.Ja(this.Ra * Math.sin(2 * (this.j / 1E3 * this.Xa) * Math.PI / (this.totalTime / 1E3)))
    };
    var J = {I:{}, Cb:0, eb:function (a) {
        if (!a.s || !J.I.hasOwnProperty(a.s)) {
            a.s = J.Cb++, J.I[a.s] = a
        }
        a.m();
        return a.s
    }, Pa:function (a) {
        J.I.hasOwnProperty(a) && delete J.I[a]
    }, Jb:function (a) {
        for (var b in J.I) {
            var c = J.I[b];
            c.A && c.update(a);
            c.v && delete J.I[c.s]
        }
    }};
    S.prototype.Ga = function (a) {
        a.b = this;
        return J.eb(a)
    };
    q("chesterGL.ActionManager", J);
    q("chesterGL.MoveAction", X);
    q("chesterGL.ScaleAction", Y);
    q("chesterGL.CallbackAction", Gb);
    q("chesterGL.SequenceAction", Hb);
    q("chesterGL.RepeatAction", Ib);
    q("chesterGL.AnimateAction", Jb);
    q("chesterGL.WiggleAction", Kb);
    J.scheduleAction = J.eb;
    J.unscheduleAction = J.Pa;
    Hb.createSequence = function (a) {
        0 === arguments.length && f("Needs at least one action to create a sequence!");
        for (var b = arguments[0], c = 1; c < arguments.length; c++) {
            b = new Hb(b, arguments[c])
        }
        return b
    };
    S.prototype.runAction = S.prototype.Ga;
    W.prototype.stop = W.prototype.stop;
    X.prototype.stop = X.prototype.stop;
    Y.prototype.stop = Y.prototype.stop;
    Hb.prototype.stop = Hb.prototype.stop;
    Ib.prototype.stop = Ib.prototype.stop;
    X.prototype.reverse = X.prototype.reverse;
    Y.prototype.reverse = Y.prototype.reverse;
    var U = {frames:{}, Hb:function (a) {
        if (a.meta && "1.0" == a.meta.version) {
            var b = a.meta.image;
            H("texture", b, j, function (c) {
                var c = c.height, d = a.frames, e;
                for (e in d) {
                    var g = d[e], i = {frame:{}, c:""};
                    i.frame = qb(g.frame.x, c - (g.frame.y + g.frame.h), g.frame.w, g.frame.h);
                    i.c = b;
                    U.frames[e] = i
                }
            })
        } else {
            f("Unkown json data")
        }
    }, sb:function (a, b) {
        D.frameset[a.name].data = b;
        return h
    }, ja:function (a) {
        return U.frames[a]
    }, Eb:function (a) {
        console.log("loadFrames: will fetch " + a);
        H("frameset", {url:a, dataType:"json"}, j, function (a) {
            U.Hb(a)
        })
    }};
    wa.frameset = U.sb;
    q("chesterGL.BlockFrames", U);
    U.getFrame = U.ja;
    U.loadFrames = U.Eb;
    function V(a, b) {
        B || f("PrimitiveBlock only works on WebGL mode");
        this.Ca = a || 500;
        this.Ba = b || 500;
        S.call(this, j, P.PRIMITIVE);
        var c = C;
        this.za = c.createBuffer();
        this.q = new Float32Array(7 * this.Ca);
        this.ya = c.createBuffer();
        this.e = new Float32Array(14 * this.Ba);
        this.f = T.DEFAULT
    }

    u(V, S);
    o = V.prototype;
    o.za = j;
    o.q = j;
    o.ya = j;
    o.e = j;
    o.Ba = 0;
    o.t = 0;
    o.Ca = 0;
    o.u = 0;
    o.P = [];
    o.qb = function (a, b, c) {
        if (this.u < this.Ca) {
            var d = 7 * this.u, c = c || [1, 1, 1, 1];
            this.q[d + 0] = a;
            this.q[d + 1] = b;
            this.q[d + 2] = 0;
            this.q[d + 3] = c[0];
            this.q[d + 4] = c[1];
            this.q[d + 5] = c[2];
            this.q[d + 6] = c[3];
            this.u++
        } else {
            f("too many points!")
        }
    };
    o.pb = function (a, b, c, d, e) {
        if (this.t < this.Ba) {
            var g = 14 * this.t, e = e || [1, 1, 1, 1];
            this.e[g + 0] = a;
            this.e[g + 1] = b;
            this.e[g + 2] = 0;
            this.e[g + 3] = e[0];
            this.e[g + 4] = e[1];
            this.e[g + 5] = e[2];
            this.e[g + 6] = e[3];
            this.e[g + 7] = c;
            this.e[g + 8] = d;
            this.e[g + 9] = 0;
            this.e[g + 10] = e[0];
            this.e[g + 11] = e[1];
            this.e[g + 12] = e[2];
            this.e[g + 13] = e[3];
            this.t++
        } else {
            f("too many lines!")
        }
    };
    o.va = function (a, b, c, d) {
        for (var b = b || [1, 1, 1, 1], c = c || k, d = d || k, e = a.length, g = C, i = new Float32Array(7 * a.length), m = g.createBuffer(), l = 0; l < e; l++) {
            var p = a[l];
            i[7 * l + 0] = p[0];
            i[7 * l + 1] = p[1];
            i[7 * l + 2] = p[2];
            i[7 * l + 3] = b[0];
            i[7 * l + 4] = b[1];
            i[7 * l + 5] = b[2];
            i[7 * l + 6] = b[3]
        }
        g.bindBuffer(g.ARRAY_BUFFER, m);
        g.bufferData(g.ARRAY_BUFFER, i, g.STATIC_DRAW);
        this.P.unshift([i, m, c, d])
    };
    o.rb = function (a, b, c, d, e, g) {
        c /= 2;
        d /= 2;
        this.va([
            [a - c, b - d, 0],
            [a - c, b + d, 0],
            [a + c, b + d, 0],
            [a + c, b - d, 0]
        ], e, h, g)
    };
    o.B = function () {
        this.t = this.u = 0;
        0 < this.P.length && (this.P = []);
        S.prototype.B.call(this)
    };
    o.Q = function () {
        var a = C, b = Ca(tb[this.f]);
        if (0 < this.u || 0 < this.t || 0 < this.P.length) {
            lb(ta, this.d, this.r), a.uniformMatrix4fv(b.z, k, this.r)
        }
        if (0 < this.u) {
            var c = C, d = 7 * this.u;
            c.bindBuffer(c.ARRAY_BUFFER, this.za);
            c.bufferData(c.ARRAY_BUFFER, this.q.subarray(0, d), c.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, this.za);
            a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
            a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
            a.drawArrays(a.POINTS, 0, this.u)
        }
        0 < this.t && (c = C, d = 14 * this.t, c.bindBuffer(c.ARRAY_BUFFER, this.ya), c.bufferData(c.ARRAY_BUFFER, this.e.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.ya), a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0), a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, k, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.t));
        c = this.P.length;
        if (0 < c) {
            for (d = 0; d < c; d++) {
                var e = this.P[d];
                a.bindBuffer(a.ARRAY_BUFFER, e[1]);
                a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
                a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
                e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
            }
        }
    };
    q("chesterGL.PrimitiveBlock", V);
    V.prototype.drawPoint = V.prototype.qb;
    V.prototype.drawLine = V.prototype.pb;
    V.prototype.drawPolygon = V.prototype.va;
    V.prototype.drawRectangle = V.prototype.rb;
    var Lb, Mb, Nb, Ob;

    function Pb() {
        return aa.navigator ? aa.navigator.userAgent : j
    }

    Ob = Nb = Mb = Lb = k;
    var Qb;
    if (Qb = Pb()) {
        var Rb = aa.navigator;
        Lb = 0 == Qb.indexOf("Opera");
        Mb = !Lb && -1 != Qb.indexOf("MSIE");
        Nb = !Lb && -1 != Qb.indexOf("WebKit");
        Ob = !Lb && !Nb && "Gecko" == Rb.product
    }
    var Sb = Mb, Tb = Ob, Ub = Nb;
    var Vb;
    if (Lb && aa.opera) {
        var Wb = aa.opera.version;
        "function" == typeof Wb && Wb()
    } else {
        Tb ? Vb = /rv\:([^\);]+)(\)|;)/ : Sb ? Vb = /MSIE\s+([^\);]+)(\)|;)/ : Ub && (Vb = /WebKit\/(\S+)/), Vb && Vb.exec(Pb())
    }
    ;
    var Xb = j, Yb = j;

    function Zb(a) {
        (a = $b[a]) || f("Invalid map - make sure you call loadTMX first");
        S.call(this, j, P.TMXBLOCK);
        for (var b = 0; b < a.layers.length; b++) {
            for (var c = a.layers[b], d = B ? new Z(j, c.blocks.length) : new S, e = j, g = 0; g < c.blocks.length; g++) {
                var i = c.blocks[g];
                e || (e = ac(a.tilesets, i.gid), d.T(e.texture));
                var m;
                B ? m = d.Wa(i.frame) : (m = new S(i.frame), m.T(e.texture));
                m.ba(i.position);
                d.C(m)
            }
            this.C(d)
        }
    }

    u(Zb, S);
    Zb.prototype.Q = function () {
    };
    var $b = {};

    function ac(a, b) {
        for (var c = a[0], d = 1; d < a.length; d++) {
            var e = a[d];
            b >= e.firstgid && (c = e)
        }
        return c
    }

    wa.tmx = function (a, b) {
        D.tmx[a.name].data = b;
        return h
    };
    q("chesterGL.TMXBlock", Zb);
    Zb.loadTMX = function (a) {
        H("tmx", {url:a, dataType:"xml"}, j, function (b) {
            var c = {}, b = $(b).find("map"), d = b.attr("orientation");
            c.tilesets = [];
            b.find("tileset").each(function (a, b) {
                var d = $(b);
                if ("obstruction" != d.attr("name")) {
                    var m = {};
                    m.tileSize = new eb(parseInt(d.attr("tilewidth"), 10), parseInt(d.attr("tileheight"), 10));
                    d.attr("spacing") && (m.spacing = parseInt(d.attr("spacing"), 10));
                    d.attr("margin") && (m.margin = parseInt(d.attr("margin"), 10));
                    var l = d.find("image").first();
                    m.imgSize = new eb(parseInt(l.attr("width"), 10), parseInt(l.attr("height"), 10));
                    m.texture = l.attr("source");
                    m.firstgid = parseInt(d.attr("firstgid"), 10);
                    c.tilesets.push(m)
                }
            });
            c.mapTileSize = new eb(parseInt(b.attr("tilewidth"), 10), parseInt(b.attr("tileheight"), 10));
            c.layers = [];
            b.find("layer").each(function (a, b) {
                if ("0" != $(b).attr("visible")) {
                    var i = {blocks:[]}, m = new eb(parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)), l = $(b).find("data").first();
                    if (l) {
                        ("base64" != l.attr("encoding") || l.attr("compression")) && f("Invalid TMX Data");
                        var p = l.text().trim();
                        if (!Xb) {
                            Xb = {};
                            Yb = {};
                            for (l = 0; 65 > l; l++) {
                                Xb[l] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l), Yb[Xb[l]] = l
                            }
                        }
                        for (var r = Yb, l = [], s = 0; s < p.length;) {
                            var y = r[p.charAt(s++)], z = s < p.length ? r[p.charAt(s)] : 0;
                            ++s;
                            var v = s < p.length ? r[p.charAt(s)] : 0;
                            ++s;
                            var w = s < p.length ? r[p.charAt(s)] : 0;
                            ++s;
                            (y == j || z == j || v == j || w == j) && f(Error());
                            l.push(y << 2 | z >> 4);
                            64 != v && (l.push(z << 4 & 240 | v >> 2), 64 != w && l.push(v << 6 & 192 | w))
                        }
                        p = 0;
                        r = j;
                        for (s = 0; s < m.height; s++) {
                            for (y = 0; y < m.width; y++) {
                                var t = l[p + 3] << 24 | l[p + 2] << 16 | l[p + 1] << 8 | l[p + 0] >>> 0;
                                if (0 !== t) {
                                    r || (r = ac(c.tilesets, t));
                                    z = {};
                                    z.gid = t;
                                    var A = r.margin || 0, G = r.spacing || 0, v = r.tileSize, N = r.imgSize, w = c.mapTileSize, O = parseInt((N.width - 2 * A + G) / (v.width + G), 10), t = t - r.firstgid, t = qb(t % O * (v.width + G) + A, N.height - v.height - A - G - parseInt(t / O, 10) * (v.height + G) + A, v.width, v.height);
                                    z.frame = t;
                                    var K, L;
                                    "orthogonal" == d ? (K = y * w.width + v.width / 2, L = (m.height - s - 1) * w.height + v.height / 2) : "isometric" == d ? (K = w.width / 2 * (m.width + y - s - 1) + v.width / 2, L = w.height / 2 * (2 * m.height - y - s - 2) + v.height / 2) : f("Invalid orientation");
                                    z.position = [K, L, 0];
                                    i.blocks.push(z)
                                }
                                p += 4
                            }
                        }
                    } else {
                        f("No data for layer!")
                    }
                    c.layers.push(i)
                }
            });
            $b[a] = c
        })
    };
    function bc(a, b, c) {
        var b = b || "20pt sans-serif", c = c || "White", d = document.createElement("canvas");
        this.canvas = d;
        this.context = d.getContext("2d");
        this.font = b;
        this.fillStyle = c;
        this.c = Date.now() + ".canvas";
        D.texture || (D.texture = {});
        D.texture[this.c] = d;
        S.call(this, cc(this, a));
        this.hb(a, k);
        this.f = T.TEXTURE
    }

    u(bc, S);
    o = bc.prototype;
    o.canvas = j;
    o.context = j;
    o.Ea = k;
    o.text = "";
    o.ra = 0;
    o.font = "";
    o.fillStyle = "";
    o.hb = function (a, b) {
        this.text = a;
        dc(this);
        b || (this.S(cc(this)), this.Ea = h)
    };
    function dc(a) {
        var b = a.context, c = a.canvas;
        b.clearRect(0, 0, c.width, c.height);
        b.fillText(a.text, 0, 0.8 * c.height);
        c.J || (c.J = C.createTexture(), D.texture[a.c].data = c);
        Ja(c);
        a.Ea = k
    }

    function cc(a, b) {
        var c = a.context, d = a.canvas;
        c.font = a.font;
        c.fillStyle = a.fillStyle;
        b && (a.text = b);
        a.ra || (a.ra = 1.25 * c.measureText("m").width);
        var e = c.measureText(a.text).width;
        d.width = e;
        d.height = a.ra;
        c.font = a.font;
        c.fillStyle = a.fillStyle;
        return[0, 0, e, a.ra]
    }

    o.B = function () {
        this.Ea && dc(this);
        S.prototype.B.call(this)
    };
    q("chesterGL.LabelBlock", bc);
    bc.prototype.setText = bc.prototype.hb;
    function Z(a, b) {
        B || f("BlockGroup only works on WebGL mode");
        S.call(this, j, P.BLOCKGROUP);
        a ? (this.c = a, this.f = T.TEXTURE) : this.f = T.DEFAULT;
        this.O = b || 10;
        ec(this)
    }

    u(Z, S);
    o = Z.prototype;
    o.O = 0;
    o.la = k;
    o.ka = j;
    o.n = j;
    function ec(a, b, c) {
        var d = C;
        a.l || (a.l = d.createBuffer());
        a.ka || (a.ka = d.createBuffer());
        var d = new Float32Array(36 * a.O), e = new Uint16Array(6 * a.O);
        b && d.set(b);
        c && e.set(c);
        a.k = d;
        a.n = e
    }

    o.Wa = function (a) {
        a = new S(a, P.STANDALONE, this);
        this.c && a.T(this.c);
        return a
    };
    o.C = function (a) {
        a.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
        this.children.length >= this.O && (this.O *= 2, ec(this, this.k, this.n));
        this.c ? this.c != a.c && f("Invalid child: only can add child with the same texture") : this.c = a.c;
        this.children.push(a);
        a.fa = this.children.length - 1;
        a.k = this.k;
        this.la = h
    };
    o.removeChild = function (a) {
        a.parent != this && f("Invalid child");
        if (this.o) {
            this.W.push(a)
        } else {
            a = this.children.indexOf(a);
            if (0 < a) {
                for (this.children.splice(a, 1); a < this.Sb; a++) {
                    var b = this.children[a];
                    b.fa = a;
                    b.g = h;
                    b.D = h
                }
            }
            this.la = h
        }
    };
    o.B = function () {
        this.o = h;
        this.update && this.update(Aa);
        if (this.visible) {
            this.transform();
            for (var a = this.children, b = a.length, c = 0; c < b; c++) {
                a[c].B()
            }
            a = C;
            a.bindBuffer(a.ARRAY_BUFFER, this.l);
            a.bufferData(a.ARRAY_BUFFER, this.k, a.STATIC_DRAW);
            if (this.la) {
                var d, a = (this.n[-1] || -1) + 1;
                d = d || Math.max(this.children.length, 1);
                for (b = 0; b < d; b++) {
                    c = 6 * b, this.n[c + 0] = a, this.n[c + 1] = a + 1, this.n[c + 2] = a + 2, this.n[c + 3] = a + 2, this.n[c + 4] = a + 1, this.n[c + 5] = a + 3, a += 4
                }
                d = C;
                d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.ka);
                d.bufferData(d.ELEMENT_ARRAY_BUFFER, this.n, d.STATIC_DRAW);
                this.la = k
            }
            this.Q();
            for (this.o = this.F = this.D = this.g = k; d = this.W.shift();) {
                this.removeChild(d)
            }
        } else {
            this.o = k
        }
    };
    o.Q = function (a) {
        var b = C, c = Ca(tb[this.f]), a = a || this.children.length;
        b.bindBuffer(b.ARRAY_BUFFER, this.l);
        b.vertexAttribPointer(c.a.vertexPositionAttribute, 3, b.FLOAT, k, 36, 0);
        if (this.f != T.DEFAULT && this.f == T.TEXTURE) {
            var d = Ha("texture", this.c);
            b.vertexAttribPointer(c.a.textureCoordAttribute, 2, b.FLOAT, k, 36, 12);
            b.activeTexture(b.TEXTURE0);
            b.bindTexture(b.TEXTURE_2D, d.J);
            b.uniform1i(c.Ha, 0)
        }
        b.vertexAttribPointer(c.a.vertexColorAttribute, 4, b.FLOAT, k, 36, 20);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.ka);
        (this.g || this.parent && this.parent.g) && lb(ta, this.d, this.r);
        b.uniformMatrix4fv(c.z, k, this.r);
        b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
    };
    q("chesterGL.BlockGroup", Z);
    Z.prototype.createBlock = Z.prototype.Wa;
    Z.prototype.addChild = Z.prototype.C;
    Z.prototype.removeChild = Z.prototype.removeChild;

//@ sourceMappingURL=chester.js.map

});