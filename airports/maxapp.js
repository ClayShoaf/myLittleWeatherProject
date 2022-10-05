! function() {
    function t(t, n, e) {
        var r = t.translate(),
            a = Math.atan2(n[1] - r[1], n[0] - r[0]) - Math.atan2(e[1] - r[1], e[0] - r[0]);
        return [Math.cos(a / 2), 0, 0, Math.sin(a / 2)]
    }

    function n(t, n) {
        var e = t.invert(n);
        return e && isFinite(e[0]) && isFinite(e[1]) && s(e)
    }

    function e(t) {
        var n = .5 * t[0] * l,
            e = .5 * t[1] * l,
            r = .5 * t[2] * l,
            a = Math.sin(n),
            i = Math.cos(n),
            o = Math.sin(e),
            s = Math.cos(e),
            c = Math.sin(r),
            u = Math.cos(r);
        return [i * s * u + a * o * c, a * s * u - i * o * c, i * o * u + a * s * c, i * s * c - a * o * u]
    }

    function r(t, n) {
        var e = t[0],
            r = t[1],
            a = t[2],
            i = t[3],
            o = n[0],
            s = n[1],
            c = n[2],
            u = n[3];
        return [e * o - r * s - a * c - i * u, e * s + r * o + a * u - i * c, e * c - r * u + a * o + i * s, e * u + r * c - a * s + i * o]
    }

    function a(t, n) {
        if (t && n) {
            var e = u(t, n),
                r = Math.sqrt(c(e, e)),
                a = .5 * Math.acos(Math.max(-1, Math.min(1, c(t, n)))),
                i = Math.sin(a) / r;
            return r && [Math.cos(a), e[2] * i, -e[1] * i, e[0] * i]
        }
    }

    function i(t, n) {
        var e = Math.max(-1, Math.min(1, c(t, n))),
            r = 0 > e ? -1 : 1,
            a = Math.acos(r * e),
            i = Math.sin(a);
        return i ? function(e) {
            var o = r * Math.sin((1 - e) * a) / i,
                s = Math.sin(e * a) / i;
            return [t[0] * o + n[0] * s, t[1] * o + n[1] * s, t[2] * o + n[2] * s, t[3] * o + n[3] * s]
        } : function() {
            return t
        }
    }

    function o(t) {
        return [Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * d, Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * d, Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * d]
    }

    function s(t) {
        var n = t[0] * l,
            e = t[1] * l,
            r = Math.cos(e);
        return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)]
    }

    function c(t, n) {
        for (var e = 0, r = t.length, a = 0; r > e; ++e) a += t[e] * n[e];
        return a
    }

    function u(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function h(t) {
        for (var n = 0, e = arguments.length, r = []; ++n < e;) r.push(arguments[n]);
        var a = d3.dispatch.apply(null, r);
        return a.of = function(n, e) {
            return function(r) {
                try {
                    var i = r.sourceEvent = d3.event;
                    r.target = t, d3.event = r, a[r.type].apply(n, e)
                } finally {
                    d3.event = i
                }
            }
        }, a
    }
    var l = Math.PI / 180,
        d = 180 / Math.PI;
    d3.geo.zoom = function() {
        function c(t) {
            g++ || t({
                type: "zoomstart"
            })
        }

        function u(t) {
            t({
                type: "zoom"
            })
        }

        function l(t) {
            --g || t({
                type: "zoomend"
            })
        }
        var d, f, p, g = 0,
            v = h(m, "zoomstart", "zoom", "zoomend"),
            m = d3.behavior.zoom().on("zoomstart", function() {
                var i = d3.mouse(this),
                    s = e(d.rotate()),
                    h = n(d, i);
                h && (p = h), b.call(m, "zoom", function() {
                    d.scale(M.k = d3.event.scale);
                    var e = d3.mouse(this),
                        c = a(p, n(d, e));
                    d.rotate(M.r = o(s = c ? r(s, c) : r(t(d, i, e), s))), i = e, u(v.of(this, arguments))
                }), c(v.of(this, arguments))
            }).on("zoomend", function() {
                b.call(m, "zoom", null), l(v.of(this, arguments))
            }),
            b = m.on,
            M = {
                r: [0, 0, 0],
                k: 1
            };
        return m.rotateTo = function(t) {
            var n = a(s(t), s([-M.r[0], -M.r[1]]));
            return o(r(e(M.r), n))
        }, m.projection = function(t) {
            return arguments.length ? (d = t, M = {
                r: d.rotate(),
                k: d.scale()
            }, m.scale(M.k)) : d
        }, m.duration = function(t) {
            return arguments.length ? (f = t, m) : f
        }, m.event = function(t) {
            t.each(function() {
                var t = d3.select(this),
                    n = v.of(this, arguments),
                    r = M,
                    a = d3.transition(t);
                if (a !== t) {
                    a.each("start.zoom", function() {
                        this.__chart__ && (M = this.__chart__), d.rotate(M.r).scale(M.k), c(n)
                    }).tween("zoom:zoom", function() {
                        var t = m.size()[0],
                            s = i(e(M.r), e(r.r)),
                            c = d3.geo.distance(M.r, r.r),
                            h = d3.interpolateZoom([0, 0, t / M.k], [c, 0, t / r.k]);
                        return f && a.duration(f(.001 * h.duration)),
                            function(e) {
                                var r = h(e);
                                this.__chart__ = M = {
                                    r: o(s(r[0] / c)),
                                    k: t / r[2]
                                }, d.rotate(M.r).scale(M.k), m.scale(M.k), u(n)
                            }
                    }).each("end.zoom", function() {
                        l(n)
                    });
                    try {
                        a.each("interrupt.zoom", function() {
                            l(n)
                        })
                    } catch (s) {}
                } else this.__chart__ = M, c(n), u(n), l(n)
            })
        }, d3.rebind(m, v, "on")
    }
}(),
function() {
    function t(t, n) {
        var e = d3.geo.interpolate(t, n)(.5),
            r = o(o(f(t), f(n)), f(e)),
            i = 1 / a(r);
        r[0] *= i, r[1] *= i, r[2] *= i;
        var s = _.origin(d(r))().coordinates[0];
        return [{
            type: "Polygon",
            coordinates: [s]
        }, {
            type: "Polygon",
            coordinates: [s.slice().reverse()]
        }]
    }

    function n(t, n) {
        var e = t.pop();
        n < t.length && ((t[n] = e).index = n)
    }

    function e(t) {
        var n = t.a.p,
            e = t.b.p,
            h = t.c.p,
            l = o(c(t.c.p, t.a.p), c(t.b.p, t.a.p)),
            d = 1 / r(l),
            f = Math.sqrt(d),
            p = s(.5 * f * a(c(n, e)) * a(c(e, h)) * a(c(h, n))),
            g = .5 * d * r(c(e, h)) * i(c(n, e), c(n, h)),
            v = .5 * d * r(c(n, h)) * i(c(e, n), c(e, h)),
            m = .5 * d * r(c(n, e)) * i(c(h, n), c(h, e)),
            b = [g * n[0] + v * e[0] + m * h[0], g * n[1] + v * e[1] + m * h[1], g * n[2] + v * e[2] + m * h[2]],
            M = r(b);
        return M > F ? (b[0] *= M = 1 / Math.sqrt(M), b[1] *= M, b[2] *= M) : b = t.n, u(t, b) || (b[0] *= -1, b[1] *= -1, b[2] *= -1, p = z - p, b.negative = !0), b.radius = p, b
    }

    function r(t) {
        return i(t, t)
    }

    function a(t) {
        return Math.sqrt(r(t))
    }

    function i(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }

    function o(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function s(t) {
        return Math.asin(Math.max(-1, Math.min(1, t)))
    }

    function c(t, n) {
        return [t[0] - n[0], t[1] - n[1], t[2] - n[2]]
    }

    function u(t, n) {
        return i(t.n, n) - i(t.n, t.a.p) > F
    }

    function h(t, n) {
        return Math.abs(i(t.n, n) - i(t.n, t.a.p)) <= F
    }

    function l(t) {
        var n = 1 / a(t);
        return t[0] *= n, t[1] *= n, t[2] *= n, t
    }

    function d(t) {
        return [Math.atan2(t[1], t[0]) * k, s(t[2]) * k]
    }

    function f(t) {
        var n = t[0] * w,
            e = t[1] * w,
            r = Math.cos(e);
        return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)]
    }

    function p(t, n, e) {
        var r;
        this.t = t, this.v = n, this.i = e, this.prevF = null, (r = this.nextF = n.visible) && (r.prevF = this), n.visible = this
    }

    function g(t, n, e) {
        u(t, n) && t.visible.push(new p(t, n, e))
    }

    function v(t, n, e) {
        for (var r = n.visible, a = e.visible, i = r.length, o = a.length, s = 0, c = 0; i > s || o > c;)
            if (i > s) {
                var u = r[s];
                if (o > c) {
                    var h = a[c];
                    if (u.i > h.i) {
                        g(t, h.v, h.i), ++c;
                        continue
                    }
                    u.i === h.i && ++c
                }
                g(t, u.v, u.i), ++s
            } else {
                var h = a[c];
                g(t, h.v, h.i), ++c
            }
    }

    function m(t, n, e, r) {
        this.visible = [], this.marked = !1, this.n = l(o(c(e, t), c(n, t))), (((this.a = new b(this, t)).next = this.b = new b(this, n)).next = this.c = new b(this, e)).next = this.a, this.index = r
    }

    function b(t, n) {
        this.triangle = t, this.p = n, this.neighbor = this.next = null
    }

    function M(t) {
        return !t.triangle.marked && t.neighbor.triangle.marked
    }

    function x(t) {
        if (!(t = t.neighbor).triangle.marked)
            for (var n = [t], e = t;;)
                if (M(t = t.next)) {
                    if (t === e) return n;
                    n.push(t)
                } else t = t.neighbor
    }

    function y(t, n) {
        (t.neighbor = n).neighbor = t
    }
    var z = Math.PI,
        k = 180 / z,
        w = z / 180,
        F = 1e-15,
        _ = d3.geo.circle().angle(90);
    d3.geo.voronoi = function(n, e) {
        arguments.length < 2 && (e = d3.geo.delaunay(n)), e || (e = []);
        var r = n.length,
            a = [];
        return e.forEach(function(t) {
            a[t.a.p.i] = t.a, a[t.b.p.i] = t.b
        }), {
            type: "GeometryCollection",
            geometries: 1 === r ? [{
                type: "Sphere"
            }] : 2 === r ? t(n[0], n[1]) : n.map(function(t, e) {
                var r = [],
                    s = [],
                    c = {
                        type: "Polygon",
                        coordinates: [r],
                        neighbors: s
                    },
                    u = a[e],
                    h = u,
                    p = h;
                if (!p) return null;
                for (var g = p.triangle.centre;;) {
                    var v = p.triangle.centre;
                    if (i(v, g) < F - 1) {
                        var m = f(n[p.neighbor.p.i]),
                            b = f(n[p.p.i]),
                            M = l([m[0] + b[0], m[1] + b[1], m[2] + b[2]]);
                        i(v, o(m, b)) > 0 && (M[0] = -M[0], M[1] = -M[1], M[2] = -M[2]), r.push(d(M))
                    }
                    if (r.push(d(v)), s.push(p.neighbor.p.i), g = v, p === u && h !== u) break;
                    p = (h = p).next.next.neighbor
                }
                return c
            })
        }
    }, d3.geo.voronoi.topology = function(t, n) {
        arguments.length < 2 && (n = d3.geo.delaunay(t)), n || (n = []);
        var e = t.length,
            r = new Array(e),
            a = [],
            i = -1,
            o = {},
            s = [];
        return n.forEach(function(t) {
            s[t.a.p.i] = t.a, s[t.b.p.i] = t.b
        }), t.forEach(function(t, n) {
            var e = [],
                c = [],
                u = s[n],
                h = u,
                l = h;
            if (!l) return null;
            for (;;) {
                if (l !== h) {
                    var f = h.triangle.index,
                        p = l.triangle.index,
                        g = p > f ? f + "," + p : p + "," + f,
                        v = o[g];
                    null == v && (p > f ? a[v = o[g] = ++i] = [d(h.triangle.centre), d(l.triangle.centre)] : a[v = o[g] = ++i] = [d(l.triangle.centre), d(h.triangle.centre)]), e.push(p > f ? v : ~v), c.push(l.neighbor.p.i)
                }
                if (l === u && h !== u) break;
                l = (h = l).neighbor.next
            }
            r[n] = {
                type: "Polygon",
                neighbors: c,
                arcs: [e]
            }
        }), {
            objects: {
                voronoi: {
                    type: "GeometryCollection",
                    geometries: r
                }
            },
            arcs: a
        }
    }, d3.geo.delaunay = function(t) {
        var n = t.map(f),
            r = (t.length, d3.convexhull3d(n));
        return r.length ? (r.forEach(function(n) {
            n.coordinates = [t[n.a.p.i], t[n.b.p.i], t[n.c.p.i]], n.centre = e(n)
        }), r) : void 0
    }, d3.convexhull3d = function(t) {
        var e = t.length;
        if (4 > e) return [];
        for (var r = 0; e > r; ++r) t[r].i = r;
        d3.shuffle(t);
        for (var a = t[0], i = t[1], o = t[2], s = new m(a, i, o), r = 3; e > r && h(s, t[r]); ++r);
        if (r === e) return [];
        var c = t[r];
        if (t[r] = t[3], t[3] = c, u(s, c)) {
            var l = i;
            i = o, o = l
        }
        var d = new m(a, i, o, 0),
            f = new m(c, i, a, 1),
            p = new m(o, c, a, 2),
            b = new m(i, c, o, 3),
            M = [d, f, p, b];
        y(d.a, f.b), y(d.b, b.c), y(d.c, p.c), y(f.a, b.a), y(b.b, p.a), y(p.b, f.c);
        for (var r = 4; e > r; ++r) {
            var z = t[r];
            g(d, z, r), g(f, z, r), g(p, z, r), g(b, z, r)
        }
        for (var r = 4; e > r; ++r) {
            var z = t[r],
                k = z.visible;
            if (k) {
                var w = null,
                    a = k;
                do a.t.marked = !0; while (a = a.nextF);
                a = k;
                do {
                    var s = a.t;
                    if (w = x(s.a) || x(s.b) || x(s.c)) break
                } while (a = a.nextF);
                if (w) {
                    for (var F = 0, _ = w.length, j = null, P = null; _ > F; ++F) {
                        var E = w[F],
                            A = E.triangle,
                            q = E.neighbor.triangle,
                            s = new m(z, E.neighbor.p, E.p, M.length);
                        y(s.b, E), j ? y(j.a, s.c) : P = s, v(s, A, q), M.push(j = s)
                    }
                    y(j.a, P.c), a = k;
                    do {
                        for (var s = a.t, F = 0, _ = s.visible.length; _ > F; ++F) s.visible[F].remove();
                        s.visible.length = 0, n(M, s.index)
                    } while (a = a.nextF)
                }
            }
        }
        return M
    }, p.prototype.remove = function() {
        this.prevF ? this.prevF.nextF = this.nextF : this.v.visible = this.nextF, this.nextF && (this.nextF.prevF = this.prevF)
    }
}(),
function() {
    function t(t, o, u) {
        d.append("path").datum(topojson.feature(o, o.objects.land)).attr("class", "land"), d.append("path").datum(topojson.mesh(o, o.objects.countries, function(t, n) {
            return t !== n
        })).attr("class", "countries"), l.append("path").datum(d3.geo.graticule()).attr("class", "graticule");
        var p = u.map(function(t) {
            return t.name
        });
	var kolor = u.map(function(t) {return t.color});
//	console.log("DEBUG: kolor")
//	console.log(kolor)
        u = u.map(function(t) {
            return [+t.longitude, +t.latitude]
        });
        var g = {
            type: "MultiPoint",
            coordinates: u
        };
        d.append("path").datum(g).attr("class", "points"), d.each(n);
        var v, m = d3.geo.delaunay(u),
            b = d3.geo.voronoi(u, m).geometries,
            M = -(1 / 0);
        m.forEach(function(t) {
            t.centre.radius > M && (M = (v = t.centre).radius)
        }), v = e(v), d3.select("#remote-point-coordinates").text(r(v)), d3.select("#remote-point-distance").text(i(6378.1 * M) + "km");
        var x, y, z = -(1 / 0);
        b.forEach(function(t, n) {
            if (t) {
                for (var e, r = u[n], a = t.neighbors, i = 1 / 0, o = 0, s = a.length; s > o; ++o) {
                    var c = d3.geo.distance(r, u[a[o]]);
                    i > c && (i = c, e = a[o])
                }
                i > z && (x = n, z = i, y = e)
            }
        }), d3.select("#remote-airport-name").text(p[x]), d3.select("#remote-airport-coordinates").text(r(u[x])), d3.select("#remote-airport-distance").text(i(6378.1 * z) + "km"), d3.select("#remote-airport-neighbour").text(p[y]), l.data([{
            origin: v,
            radius: M
        }, {
            origin: u[x],
            radius: z
        }].map(function(t, n) {
            return d3.geo.path().projection(d3.geo.azimuthalEquidistant().clipAngle(90).translate([s, s]).scale(2 * s / Math.PI - 1).precision(.1).rotate([-t.origin[0], -t.origin[1]])).pointRadius(1.5)
        }));
        var k = d3.geo.circle(),
            w = l.append("g").data([{
                origin: v,
                radius: M
            }, {
                origin: u[x],
                radius: z
            }]);
	var counter = -1;
        w.append("path").datum(function(t) {
            return k.angle(t.radius * a).origin(t.origin)()
        }).attr("class", "remote-radius"), w.append("path").datum(function(t) {
            return {
                type: "Point",
                coordinates: t.origin
            }
        }).attr("class", "remote-radius"), l.append("path").datum({
            type: "Sphere"
        }).attr("class", "outline"), d.selectAll(".voronoi").data(b).enter().insert("path", ".points").attr("class", "voronoi").style("fill", function(shit) {
	    counter += 1
	    if (counter >= b.length) {counter = 0}
//	    console.log(counter)
//	    console.log("DEBUG: shit")
//	    console.log(shit)
//	    console.log("DEBUG: kolor")
//	    console.log(kolor)
//	    console.log("DEBUG: kolor[counter]")
//	    console.log(kolor[counter])
//	    console.log("DEBUG: b")
//	    console.log(b)
//	    console.log("DEBUG: b[counter]")
//	    console.log(b[counter])
//	    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            return kolor[counter]
        }
	).append("title").text(function(t, n) {
            return p[n]
        }), d.each(n), h.call(d3.geo.zoom().projection(c).scaleExtent([c.scale(), 8 * c.scale()]).on("zoom.redraw", function() {
            h.each(n)
        }))
    }

    function n(t) {
        t && d3.select(this).selectAll("path").attr("d", t)
    }

    function e(t) {
        return [Math.atan2(t[1], t[0]) * a, Math.asin(t[2]) * a]
    }

    function r(t) {
        return i(Math.abs(t[1])) + "\xb0" + (t[1] > 0 ? "N" : "S") + ", " + i(Math.abs(t[0])) + "\xb0" + (t[0] > 0 ? "E" : "W")
    }
    var a = 180 / Math.PI,
        i = d3.format(",f"),
        o = 480,
        s = 250,
        c = d3.geo.orthographic().clipAngle(90).precision(.1).translate([o, o]).scale(o - 1).rotate([85, -15]),
        u = d3.geo.path().projection(c).pointRadius(1),
        h = d3.selectAll("#map").append("svg").attr("width", 2 * o).attr("height", 2 * o),
        l = d3.selectAll("#remote-point, #remote-airport").append("svg").attr("class", "remote").attr("width", 2 * s).attr("height", 2 * s),
        d = d3.selectAll("svg").data([u, null, null]),
        f = d3.scale.category20b();
    queue().defer(d3.json, "https://raw.githubusercontent.com/ClayShoaf/opencpi/main/world-110m.json").defer(d3.csv, "https://raw.githubusercontent.com/ClayShoaf/myLittleWeatherProject/main/dailydata/18650101.csv").await(t)
}();
