
var CircleGauge = (function (global)
{

    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __attrs (e, atrs)
    {
        for (var a in atrs)
        {
            e.setAttribute(a, atrs[a]);
        }
    }

    function createSVGElem (which, attrs, to)
    {
        var el = document.createElementNS('http://www.w3.org/2000/svg', which);
        __attrs(el, attrs);
        if (to !== void 0)
            to.appendChild(el);
        return el;
    }

    function arcPath (p, r, x, y) {
        if (p >= 100) p = 99.99;
        var st = (-Math.PI / 2),
            e = st + (p / 100) * ((Math.PI / 2 * 3) - st);
        return [    
                'M',
                r + x + r * Math.cos(st),
                r + y + r * Math.sin(st),
                'A',
                r, r, 0,
                p > 50 ? 1 : 0,
                1,
                r + x + r * Math.cos(e),
                r + y + r * Math.sin(e)
            ].join(' ');
    }

    function offset (o)
    {
        return 50 - o.radius;
    }

    var defaults = 
    {
        lineColor: '#E63462', 
        lineWidth: 5,
        radius: 25,
        value: 0,
        textColor: '#ff0000',
        textSize: 12,
        emptyLineColor: '#E0E0E0',
        emptyLineWidth: 5,
        text: null
    }

    function CircleGauge (opts)
    {
        if (opts === void 0) { opts = {}; }
        this._opts = __assign({}, defaults, opts);
    }

    CircleGauge.prototype.create = function (t)
    {
        var o = this._opts,
            ofs = offset(o);   
        
        this.svg = createSVGElem('svg', {'xmlns': 'http://www.w3.org/2000/svg', 'viewBox' : '0 0 100 100' });
        this.text = o.text;

        this._emptypath = createSVGElem('path', {
            'fill': 'transparent', 'stroke': o.emptyLineColor,
            'stroke-width': o.emptyLineWidth, 'd': arcPath(99.99, o.radius, ofs, ofs)
        }, this.svg);
       
        this._path = createSVGElem('path', { 
            'fill': 'transparent', 'stroke': o.lineColor,
            'stroke-width': o.lineWidth, 'd': arcPath(o.value, o.radius, ofs, ofs)
        }, this.svg);
  
        this._text = createSVGElem('text', {
            'fill': o.textColor, 
            'x': 50, 'y': 50 + o.textSize / 2,
            'text-anchor': 'middle', 'font-size': o.textSize
        }, this.svg);

        this.setText(this.text(o.value));
        
        t.appendChild(this.svg);

        return this;
    }

    CircleGauge.prototype.val = function (p, anim, msec, cb)
    {
        if (typeof p !== "undefined")
        {
            var opts = this._opts,
                _this = this;
            p = parseFloat(p);
            var ofs = offset(opts);

            if (anim)
            {
                var dv = p,
                    unit = (dv - opts.value) / msec;

                var itv = setInterval(function ()
                {
                    _this._opts.value += unit;
                    if (Math.abs(_this._opts.value - dv) <= (2 * Math.abs(unit)))
                    {
                        _this._opts.value = dv;
                        _this._path.setAttribute('d', arcPath(_this._opts.value, _this._opts.radius, ofs, ofs));
                        clearInterval(itv);
                        if( typeof cb === "function")
                        {
                            cb();
                        }
                    }
                    _this._path.setAttribute('d', arcPath(_this._opts.value, _this._opts.radius, ofs, ofs));
                   
                    if (typeof _this.text === "function")
                    {
                        _this.setText(_this.text(_this._opts.value));
                    }
                }, 1);
                return;
            }
            this._opts.value = p;
            
            if (typeof _this.text === "function")
            {
                 _this.setText(_this.text(_this._opts.value));
            }
            this._path.setAttribute('d', arcPath(this._opts.value, this._opts.radius, ofs, ofs));                 
        }

        return this._opts.value;
    }

    CircleGauge.prototype.setText = function (s)
    {
        if(s !== void 0)
        {
            this._text.textContent = s;
        }
        return this._text.textContent;
    }

    CircleGauge.prototype.textColor = function (c)
    {
        if(typeof c !== "undefined")
        {
            this._opts.textColor = c;
            this._text.setAttribute('fill', c);
        }
        return this._opts.textColor;
    }

    CircleGauge.prototype.textSize = function (s)
    {
        if(typeof s !== "undefined")
        {
            this._opts.textSize = s;
            var o = this._opts,
                ofs = offset(o);
            this._text.setAttribute('font-size', s);
            __attrs(this._text, {'x':50, 'y':50 + o.textSize / 2});    
        }
        return this._opts.textSize;
    }

    CircleGauge.prototype.lineWidth = function (w)
    {
        if(typeof w !== "undefined")
        {
            this._opts.lineWidth = parseFloat(w);
            this.resize();
        }
        return this._opts.lineWidth;
    }

    CircleGauge.prototype.lineColor = function (c)
    {
        if(typeof c !== "undefined")
        {
            this._opts.lineColor = c;
            this._path.setAttribute('stroke', c);           
        }
        return this._opts.lineColor;
    } 

    CircleGauge.prototype.emptyLineWidth = function (w)
    {
        if(typeof w !== "undefined")
        {
            this._opts.emptyLineWidth = parseFloat(w);
            this.resize();           
        }
        return this._opts.emptyLineWidth;
    }

    CircleGauge.prototype.emptyLineColor = function (c)
    {   
        if(typeof c !== "undefined")
        {
            this._opts.emptyLineColor = c;
            this._emptypath.setAttribute('stroke', c);
        }
        return this._opts.emptyLineColor;
    }       

    CircleGauge.prototype.radius = function (r)
    {
        if(typeof r !== "undefined")
        {
            this._opts.radius = parseFloat(r);
            this.resize();            
        }
        return this._opts.radius;
    }

    CircleGauge.prototype.resize = function ()
    {
        var o = this._opts,
            ofs = offset(o);

        __attrs(this._path, {'stroke-width': o.lineWidth,'d': arcPath(o.value, o.radius, ofs, ofs)});
        __attrs(this._emptypath, {'stroke-width': o.emptyLineWidth,'d': arcPath(99.99, o.radius, ofs, ofs)});
    }

    if (typeof module != 'undefined' && module.exports) {
        module.exports = CircleGauge;
    } else if (typeof define === 'function' && define.amd) {
        define([], function(){
            return CircleGauge;
        });
    } else {
        global.CircleGauge = CircleGauge;
    }

    return CircleGauge;
}(this.window || global));