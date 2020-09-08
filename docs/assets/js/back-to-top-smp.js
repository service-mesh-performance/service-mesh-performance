// Copyright 2020 Layer5 Authors

// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License.



"use strict";

function smpBackToTop()
{
	var o, t, e, n, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :
		{},
		r = i.backgroundColor,
		d = void 0 === r ? "#3c494f" : r,
		a = i.cornerOffset,
		c = void 0 === a ? 20 : a,
		s = i.diameter,
		l = void 0 === s ? 56 : s,
		u = i.ease,
		p = void 0 === u ? function (o)
		{
			return .5 * (1 - Math.cos(Math.PI * o))
		} : u,
		m = i.id,
		h = void 0 === m ? "back-to-top" : m,
		b = i.innerHTML,
		v = void 0 === b ? '<svg viewBox="1.50 0.5 45 45" style="enable-background:new 0 0 47.5 47.5;" xml:space="preserve" version="1.1" id="svg2"><defs id="defs6"><clipPath id="clipPath16" clipPathUnits="userSpaceOnUse"><path id="path18" d="M 0,38 38,38 38,0 0,0 0,38 Z"/></clipPath></defs><g transform="matrix(1.25,0,0,-1.25,0,47.5)" id="g10"><g id="g12"><g clip-path="url(#clipPath16)" id="g14"><g transform="translate(26.7109,26.1328)" id="g20"><path id="path22" style="fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 0,0 -6.932,10.215 C -7.533,11.1 -8.49,11.082 -9.059,10.178 l -6.39,-10.141 c -0.569,-0.904 -0.18,-1.644 0.866,-1.644 l 1.872,0 0,-3.526 c 0,-1.104 0.896,-2 2,-2 l 6,0 c 1.106,0 2,0.896 2,2 l 0,3.526 1.899,0 C 0.234,-1.607 0.602,-0.885 0,0"/></g><g transform="translate(4.6514,13.4248)" id="g24"><path id="path26" style="fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" d="m 0,0 -2.213,0 c -0.975,0 -1.381,0.712 -1.381,1.401 0,0.71 0.508,1.4 1.381,1.4 l 7.469,0 c 0.874,0 1.382,-0.69 1.382,-1.4 C 6.638,0.712 6.232,0 5.256,0 l -2.212,0 0,-10.189 c 0,-1.016 -0.649,-1.584 -1.522,-1.584 -0.873,0 -1.522,0.568 -1.522,1.584 L 0,0 Z"/></g><g transform="translate(22.1943,9)" id="g28"><path id="path30" style="fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" d="m 0,0 c 0,2.456 -1.279,4.67 -3.816,4.67 -2.538,0 -3.817,-2.214 -3.817,-4.67 0,-2.476 1.239,-4.668 3.817,-4.668 C -1.238,-4.668 0,-2.476 0,0 m -10.799,0 c 0,4.222 2.841,7.471 6.983,7.471 4.079,0 6.982,-3.351 6.982,-7.471 0,-4.201 -2.821,-7.471 -6.982,-7.471 -4.121,0 -6.983,3.27 -6.983,7.471"/></g><g transform="translate(29.6729,9.2441)" id="g32"><path id="path34" style="fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 0,0 2.071,0 C 3.349,0 4.16,0.934 4.16,2.151 4.16,3.37 3.349,4.304 2.071,4.304 L 0,4.304 0,0 Z m -3.046,5.399 c 0,0.955 0.569,1.582 1.585,1.582 l 3.591,0 c 2.985,0 5.197,-1.947 5.197,-4.85 0,-2.963 -2.293,-4.811 -5.074,-4.811 L 0,-2.68 0,-6.009 c 0,-1.015 -0.649,-1.584 -1.521,-1.584 -0.875,0 -1.525,0.569 -1.525,1.584 l 0,11.408 z"/></g></g></g></g></svg>' : b,
		f = i.onClickScrollTo,
		x = void 0 === f ? 0 : f,
		w = i.scrollContainer,
		g = void 0 === w ? document.body : w,
		k = i.scrollDuration,
		y = void 0 === k ? 100 : k,
		T = i.showWhenScrollTopIs,
		M = void 0 === T ? 1 : T,
		z = i.size,
		E = void 0 === z ? l : z,
		C = i.textColor,
		L = void 0 === C ? "#fff" : C,
		N = i.zIndex,
		I = void 0 === N ? 3 : N,
		A = g === document.body,
		B = A && document.documentElement;
	o = Math.round(.43 * E), t = Math.round(.29 * E), e = "#" + h + "{background:" + d + ";-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;bottom:" + c + "px;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);color:" + L + ";cursor:pointer;display:block;height:" + E + "px;opacity:1;outline:0;position:fixed;right:" + c + "px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-transition:bottom .2s,opacity .2s;-o-transition:bottom .2s,opacity .2s;-moz-transition:bottom .2s,opacity .2s;transition:bottom .2s,opacity .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:" + E + "px;z-index:" + I + "}#" + h + " svg{display:block;fill:currentColor;height:" + o + "px;margin:" + t + "px auto 0;width:" + o + "px}#" + h + ".hidden{bottom:-" + E + "px;opacity:0}", (n = document.createElement("style")).appendChild(document.createTextNode(e)), document.head.insertAdjacentElement("afterbegin", n);
	var D = function ()
		{
			var o = document.createElement("div");
			return o.id = h, o.className = "hidden", o.innerHTML = v, o.addEventListener("click", function (o)
			{
				o.preventDefault(),
					function ()
					{
						var o = "function" == typeof x ? x() : x,
							t = window,
							e = t.performance,
							n = t.requestAnimationFrame;
						if (y <= 0 || void 0 === e || void 0 === n) return q(o);
						var i = e.now(),
							r = j(),
							d = r - o;
						n(function o(t)
						{
							var e = Math.min((t - i) / y, 1);
							q(r - Math.round(p(e) * d)), e < 1 && n(o)
						})
					}()
			}), document.body.appendChild(o), o
		}(),
		H = !0;

	function S()
	{
		j() >= M ? function ()
		{
			if (!H) return;
			D.className = "", H = !1
		}() : function ()
		{
			if (H) return;
			D.className = "hidden", H = !0
		}()
	}

	function j()
	{
		return g.scrollTop || B && document.documentElement.scrollTop || 0
	}

	function q(o)
	{
		g.scrollTop = o, B && (document.documentElement.scrollTop = o)
	}(A ? window : g).addEventListener("scroll", S), S()
}
