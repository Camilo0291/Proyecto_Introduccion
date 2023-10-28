/*
 2014 Artem Sapegin (sapegin.me)
 @license MIT
*/
var $jscomp = $jscomp || {}; $jscomp.scope = {}; $jscomp.findInternal = function (c, h, e) { c instanceof String && (c = String(c)); for (var k = c.length, l = 0; l < k; l++) { var m = c[l]; if (h.call(e, m, l, c)) return { i: l, v: m } } return { i: -1, v: void 0 } }; $jscomp.ASSUME_ES5 = !1; $jscomp.ASSUME_NO_NATIVE_MAP = !1; $jscomp.ASSUME_NO_NATIVE_SET = !1; $jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (c, h, e) { c != Array.prototype && c != Object.prototype && (c[h] = e.value) }; $jscomp.getGlobal = function (c) { return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c }; $jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (c, h, e, k) { if (h) { e = $jscomp.global; c = c.split("."); for (k = 0; k < c.length - 1; k++) { var l = c[k]; l in e || (e[l] = {}); e = e[l] } c = c[c.length - 1]; k = e[c]; h = h(k); h != k && null != h && $jscomp.defineProperty(e, c, { configurable: !0, writable: !0, value: h }) } }; $jscomp.polyfill("Array.prototype.find", function (c) { return c ? c : function (c, e) { return $jscomp.findInternal(this, c, e).v } }, "es6", "es3");
(function (c) { "function" === typeof define && define.amd ? define(["jquery"], c) : c(jQuery) })(function (c, h) {
    function e(a, b) { this.container = a; this.options = b; this.init() } function k(a, b) { this.widget = a; this.options = c.extend({}, b); this.detectService(); this.service && this.init() } function l(a) { function b(a, b) { return b.toUpper() } var c = {}; a = a.data(); for (var f in a) { var g = a[f]; "yes" === g ? g = !0 : "no" === g && (g = !1); c[f.replace(/-(\w)/g, b)] = g } return c } function m(a, b) { return t(a, b, encodeURIComponent) } function t(a, b, c) {
        return a.replace(/\{([^\}]+)\}/g,
            function (a, d) { return d in b ? c ? c(b[d]) : b[d] : a })
    } function q(a, b) { a = "social-likes__" + a; return a + " " + a + "_" + b } function v(a, b) { function d(e) { "keydown" === e.type && 27 !== e.which || c(e.target).closest(a).length || (a.removeClass("social-likes_opened"), f.off(g, d), c.isFunction(b) && b()) } var f = c(document), g = "click touchstart keydown"; f.on(g, d) } function w(a) {
        if (document.documentElement.getBoundingClientRect) {
            var b = parseInt(a.css("left"), 10), c = parseInt(a.css("top"), 10), f = a[0].getBoundingClientRect(); 10 > f.left ? a.css("left",
                10 - f.left + b) : f.right > window.innerWidth - 10 && a.css("left", window.innerWidth - f.right - 10 + b); 10 > f.top ? a.css("top", 10 - f.top + c) : f.bottom > window.innerHeight - 10 && a.css("top", window.innerHeight - f.bottom - 10 + c)
        } a.addClass("social-likes_opened")
    } var p = "https:" === location.protocol ? "https:" : "http:", u = "https:" === p, n = {
        facebook: {
            counterUrl: "https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?", convertNumber: function (a) { return a.data[0].total_count }, popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
            popupWidth: 600, popupHeight: 500
        }, twitter: { counterUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?", convertNumber: function (a) { return a.count }, popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}", popupWidth: 600, popupHeight: 450, click: function () { /[\.\?:\-\u2013\u2014]\s*$/.test(this.options.title) || (this.options.title += ":"); return !0 } }, mailru: {
            counterUrl: p + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?", convertNumber: function (a) { for (var b in a) if (a.hasOwnProperty(b)) return a[b].shares },
            popupUrl: p + "//connect.mail.ru/share?share_url={url}&title={title}", popupWidth: 550, popupHeight: 360
        }, vkontakte: { counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}", counter: function (a, b) { var d = n.vkontakte; d._ || (d._ = [], window.VK || (window.VK = {}), window.VK.Share = { count: function (a, b) { d._[a].resolve(b) } }); var f = d._.length; d._.push(b); c.getScript(m(a, { index: f })).fail(b.reject) }, popupUrl: p + "//vk.com/share.php?url={url}&title={title}", popupWidth: 550, popupHeight: 330 }, odnoklassniki: {
            counterUrl: u ?
                h : "http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}", counter: function (a, b) { var d = n.odnoklassniki; d._ || (d._ = [], window.ODKL || (window.ODKL = {}), window.ODKL.updateCount = function (a, b) { d._[a].resolve(b) }); var f = d._.length; d._.push(b); c.getScript(m(a, { index: f })).fail(b.reject) }, popupUrl: "http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}", popupWidth: 550, popupHeight: 360
        }, plusone: {
            counterUrl: u ? h : "http://share.yandex.ru/gpp.xml?url={url}", counter: function (a,
                b) { var d = n.plusone; d._ ? b.reject() : (window.services || (window.services = {}), window.services.gplus = { cb: function (a) { "string" === typeof a && (a = a.replace(/\D/g, "")); d._.resolve(parseInt(a, 10)) } }, d._ = b, c.getScript(m(a)).fail(b.reject)) }, popupUrl: "https://plus.google.com/share?url={url}", popupWidth: 700, popupHeight: 500
        }, pinterest: {
            counterUrl: p + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?", convertNumber: function (a) { return a.count }, popupUrl: p + "//pinterest.com/pin/create/button/?url={url}&description={title}",
            popupWidth: 630, popupHeight: 270
        }
    }, r = { promises: {}, fetch: function (a, b, d) { r.promises[a] || (r.promises[a] = {}); var f = r.promises[a]; if (d.forceUpdate || !f[b]) { var g = c.extend({}, n[a], d), e = c.Deferred(); (a = g.counterUrl && m(g.counterUrl, { url: b })) && c.isFunction(g.counter) ? g.counter(a, e) : g.counterUrl ? c.getJSON(a).done(function (a) { try { var b = a; c.isFunction(g.convertNumber) && (b = g.convertNumber(a)); e.resolve(b) } catch (x) { e.reject() } }).fail(e.reject) : e.reject(); f[b] = e.promise() } return f[b] } }; c.fn.socialLikes = function (a) {
        return this.each(function () {
            var b =
                c(this), d = b.data("social-likes"); d ? c.isPlainObject(a) && d.update(a) : (d = new e(b, c.extend({}, c.fn.socialLikes.defaults, a, l(b))), b.data("social-likes", d))
        })
    }; c.fn.socialLikes.defaults = { url: window.location.href.replace(window.location.hash, ""), title: document.title, counters: !0, zeroes: !1, wait: 500, timeout: 1E4, popupCheckInterval: 500, singleTitle: "Share", initHtml: !0 }; e.prototype = {
        init: function () {
            this.container.addClass("social-likes"); this.single = this.container.hasClass("social-likes_single"); this.initUserButtons();
            this.number = this.countersLeft = 0; this.container.on("counter.social-likes", c.proxy(this.updateCounter, this)); var a = this.container.children(); this.makeSingleButton(); this.buttons = []; a.each(c.proxy(function (a, d) { a = new k(c(d), this.options); this.buttons.push(a); a.options.counterUrl && this.countersLeft++ }, this)); this.options.counters ? (this.timer = setTimeout(c.proxy(this.appear, this), this.options.wait), this.timeout = setTimeout(c.proxy(this.ready, this, !0), this.options.timeout)) : this.appear()
        }, initUserButtons: function () {
            !this.userButtonInited &&
            window.socialLikesButtons && c.extend(!0, n, socialLikesButtons); this.userButtonInited = !0
        }, makeSingleButton: function () {
            if (this.single) {
                var a = this.container; a.addClass("social-likes_vertical"); a.wrap(c("<div>", { "class": "social-likes_single-w" })); a.wrapInner(c("<div>", { "class": "social-likes__single-container" })); var b = a.parent(), d = c("<div>", { "class": q("widget", "single") }), f = c(t('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', {
                    buttonCls: q("button", "single"), iconCls: q("icon", "single"),
                    title: this.options.singleTitle
                })); d.append(f); b.append(d); d.on("click", function () { d.toggleClass("social-likes__widget_active"); d.hasClass("social-likes__widget_active") ? (a.css({ left: -(a.width() - d.width()) / 2, top: -a.height() }), w(a), v(a, function () { d.removeClass("social-likes__widget_active") })) : a.removeClass("social-likes_opened"); return !1 }); this.widget = d
            }
        }, update: function (a) {
            if (a.forceUpdate || a.url !== this.options.url) {
                this.number = 0; this.countersLeft = this.buttons.length; this.widget && this.widget.find(".social-likes__counter").remove();
                c.extend(this.options, a); for (var b = 0; b < this.buttons.length; b++)this.buttons[b].update(a)
            }
        }, updateCounter: function (a, b, c) { c && (this.number += c, this.single && this.getCounterElem().text(this.number)); this.countersLeft--; 0 === this.countersLeft && (this.appear(), this.ready()) }, appear: function () { this.container.addClass("social-likes_visible") }, ready: function (a) { this.timeout && clearTimeout(this.timeout); this.container.addClass("social-likes_ready"); a || this.container.trigger("ready.social-likes", this.number) }, getCounterElem: function () {
            var a =
                this.widget.find(".social-likes__counter_single"); a.length || (a = c("<span>", { "class": q("counter", "single") }), this.widget.append(a)); return a
        }
    }; k.prototype = {
        init: function () { this.detectParams(); if (this.options.initHtml) this.initHtml(); else this.widget.on("click", c.proxy(this.click, this)); setTimeout(c.proxy(this.initCounter, this), 0) }, update: function (a) { c.extend(this.options, { forceUpdate: !1 }, a); this.widget.find(".social-likes__counter").remove(); this.initCounter() }, detectService: function () {
            var a = this.widget.data("service");
            if (!a) { var b = this.widget[0]; b = b.classList || b.className.split(" "); for (var d = 0; d < b.length; d++) { var f = b[d]; if (n[f]) { a = f; break } } if (!a) return } this.service = a; c.extend(this.options, n[a])
        }, detectParams: function () { var a = this.widget.data(); if (a.counter) { var b = parseInt(a.counter, 10); isNaN(b) ? this.options.counterUrl = a.counter : this.options.counterNumber = b } a.title && (this.options.title = a.title); a.url && (this.options.url = a.url) }, initHtml: function () {
            var a = this.options, b = this.widget, d = b.find("a"); d.length && this.cloneDataAttrs(d,
                b); d = c("<span>", { "class": this.getElementClassNames("button"), text: b.text() }); if (a.clickUrl) a = m(a.clickUrl, { url: a.url, title: a.title }), a = c("<a>", { href: a }), this.cloneDataAttrs(b, a), b.replaceWith(a), this.widget = b = a; else b.on("click", c.proxy(this.click, this)); b.removeClass(this.service); b.addClass(this.getElementClassNames("widget")); d.prepend(c("<span>", { "class": this.getElementClassNames("icon") })); b.empty().append(d); this.button = d
        }, initCounter: function () {
            this.options.counters && (this.options.counterNumber ?
                this.updateCounter(this.options.counterNumber) : r.fetch(this.service, this.options.url, { counterUrl: this.options.counterUrl, forceUpdate: this.options.forceUpdate }).always(c.proxy(this.updateCounter, this)))
        }, cloneDataAttrs: function (a, b) { a = a.data(); for (var c in a) a.hasOwnProperty(c) && b.data(c, a[c]) }, getElementClassNames: function (a) { return q(a, this.service) }, updateCounter: function (a) {
            a = parseInt(a, 10) || 0; var b = { "class": this.getElementClassNames("counter"), text: a }; a || this.options.zeroes || (b["class"] += " social-likes__counter_empty",
                b.text = ""); b = c("<span>", b); this.widget.append(b); this.widget.trigger("counter.social-likes", [this.service, a])
        }, click: function (a) { var b = this.options, d = !0; c.isFunction(b.click) && (d = b.click.call(this, a)); d && (a = m(b.popupUrl, { url: b.url, title: b.title }), a = this.addAdditionalParamsToUrl(a), this.openPopup(a, { width: b.popupWidth, height: b.popupHeight })); return !1 }, addAdditionalParamsToUrl: function (a) {
            var b = c.param(c.extend(this.widget.data(), this.options.data)); if (c.isEmptyObject(b)) return a; var d = -1 === a.indexOf("?") ?
                "?" : "&"; return a + d + b
        }, openPopup: function (a, b) {
            var d = Math.round(screen.width / 2 - b.width / 2), f = 0; screen.height > b.height && (f = Math.round(screen.height / 3 - b.height / 2)); var e = window.open(a, "sl_" + this.service, "left=" + d + ",top=" + f + ",width=" + b.width + ",height=" + b.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1"); if (e) {
                e.focus(); this.widget.trigger("popup_opened.social-likes", [this.service, e]); var h = setInterval(c.proxy(function () {
                    e.closed && (clearInterval(h), this.widget.trigger("popup_closed.social-likes",
                        this.service))
                }, this), this.options.popupCheckInterval)
            } else location.href = a
        }
    }; c(function () { c(".social-likes").socialLikes() })
});