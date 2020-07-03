$(document).on("ready", function() {
    if (jQuery.support.cors = !0,
    document.getElementById("side-column") && ($("#breadcrumbs-wrapper").addClass("clickable-breadcrumb"),
    $("#breadcrumbs-wrapper").click(function() {
        window.innerWidth < 840 && ($("#side-column-wrapper").toggleClass("active"),
        $("#submenu-icon").toggleClass("open"))
    }),
    $("#side-column .dropdown-box > .title").click(function(e) {
        $(e.currentTarget).parent().toggleClass("open")
    }),
    $("#side-column .menu").click(function(e) {
        $("#side-column .submenu-wrapper").removeClass("open"),
        $(e.currentTarget).find(".submenu-wrapper").addClass("open")
    })),
    $(".infobar").click(function(e) {
        e.target.className.indexOf("infobar-hide") >= 0 && ($(this).hide(),
        AoPS.fixFooter(),
        $("#main-content").trigger($.Event("resize")),
        $.ajax({
            url: "/ajax.php",
            timeout: 5e3,
            type: "post",
            data: {
                a: "infobar-hide",
                key: $(this).data("key")
            },
            success: function(e) {}
        }))
    }),
    $("#menu-myaops-toggle").click(function(e) {
        $("#menu-myaops").toggle(),
        e.preventDefault(),
        e.stopPropagation()
    }),
    !document.getElementById("side-column")) {
        var e = document.getElementById("submenu-icon");
        e && e.parentNode.removeChild(e)
    }
    AoPS.fixFooter(),
    $(window).on("resize.fix_footer", function() {
        AoPS.fixFooter()
    }),
    AoPS.login.initialize(),
    AoPS.inputPlaceholders.initialize(),
    document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect ? $("html").addClass("svg") : $("html").addClass("no-svg");
    var o = $("body")
      , n = $("#top-bar")
      , t = $("#main-logo")
      , i = !1
      , a = !1
      , r = !1
      , s = !1;
    n.on("mousemove.start_loc", function() {
        i = !0
    }),
    t.on("mousemove.start_loc", function() {
        s = !0
    }),
    o.on("mousemove.start_loc", function() {
        n.off("mousemove.start_loc"),
        o.off("mousemove.start_loc"),
        t.off("mousemove.start_loc"),
        setTimeout(function() {
            i = !1,
            s = !1
        }, 350)
    }),
    n.on("mouseenter", function() {
        a = !0,
        setTimeout(function() {
            !i && a && $("#header-popin").animate({
                opacity: 1
            }, 150)
        }, 350)
    }),
    t.on("mouseenter", function() {
        r = !0,
        setTimeout(function() {
            !s && r && $("#header-popin").animate({
                opacity: 1
            }, 150)
        }, 350)
    }),
    n.on("mouseleave", function() {
        a = !1
    }),
    t.on("mouseleave", function() {
        r = !1
    }),
    $("#header").on("mouseleave", function() {
        $("#header-popin").animate({
            opacity: 0
        }, 150)
    }),
    n.find(".site").hover(function() {
        var e = $(this);
        e.addClass("dropdown-visible");
        var o = e.find(".site-dropdown-wrapper");
        if (o.length) {
            var n = $(window).width()
              , t = o.outerWidth()
              , i = o.offset().left + t + 10 - n;
            i > 0 && o.css("left", -100 - i + "px")
        }
    }, function() {
        $(this).removeClass("dropdown-visible").find(".site-dropdown-wrapper").css("left", "")
    }),
    AoPS.checkPrivacy()
}),
$(window).on("load", function() {
    AoPS.fixFooter()
}),
AoPS.checkPrivacy = function() {
    if (document.URL.indexOf("/privacy") < 0 && AoPS.session && AoPS.session.show_privacy) {
        var e = ["<p>We've made a few updates to our privacy policies. These updates went into effect on Thursday, May 23, 2019.</p>", "<p>Click ", '<a href="' + AoPS.aops_url + 'company/privacy" target="_blank">here</a> ', "to learn more about the new ", '<a href="' + AoPS.aops_url + '" target="_blank">artofproblemsolving.com</a> policy.</p>', "<p>Click ", '<a href="' + AoPS.academy_url + 'legal/privacy" target="_blank">here</a> ', "to learn more about the new ", '<a href="' + AoPS.academy_url + '" target="_blank">aopsacademy.org</a> policy.</p>']
          , o = 1
          , n = document.location.href;
        (n.indexOf("community") > 0 || n.indexOf("alcumus") > 0 || n.indexOf("baeditor") > 0 || n.indexOf("class/") > 0) && (o = 1e3),
        setTimeout(function() {
            alert(e.join(""), {
                onButtonClick: function() {
                    $.post("/ajax.php", {
                        action: "update-accepted"
                    })
                },
                max_width: "600px",
                closeX: !1,
                force_response: !0
            })
        }, o)
    }
}
,
window.classicAlert = window.alert,
window.alert = function(e, o) {
    AoPS.hasOwnProperty("Ui") ? (AoPS.Ui.Modal.closeTopModal(),
    void 0 === o ? AoPS.Ui.Modal.showAlertQuick(e) : AoPS.Ui.Modal.showAlertQuick(e, o)) : window.classicAlert(e)
}
,
AoPS.setBreadcrumbs = function(e) {
    for (var o, n = [], t = 0; t < e.length; t++)
        o = e[t].text,
        e[t].url && (o = '<a href="' + e[t].url + '">' + o + "</a>"),
        n.push('<span class="crumb crumb-' + (t + 1) + '">' + o + "</span>");
    $(".crumb-wrapper").html(n.join(' <i class="aops-font aops-angle-double-right"></i> '))
}
,
AoPS.fixFooter = function() {
    var e = $(window).height()
      , o = $("body").hasClass("small-footer");
    e -= $("#header-wrapper").outerHeight(),
    e -= $("#top-bar").outerHeight(),
    e -= o ? $("#small-footer-wrapper").outerHeight() : $("#main-footer").outerHeight(),
    $("#main-content").css("min-height", e),
    o && $("#small-footer-wrapper").show();
    var n = document.getElementById("side-column-wrapper");
    n && $(n).css("min-height", e),
    AoPS.fixSidebarOnce()
}
,
AoPS.makeSidebarAdjustment = function(e, o, n) {
    if (e && o && n) {
        var t = 0;
        o.children().each(function() {
            t += $(this).outerHeight(!0)
        }),
        e.height() !== Math.max(n.outerHeight(!0), t) && e.css("height", Math.max(n.outerHeight(!0), t))
    }
}
,
AoPS.fixSidebarOnce = function() {
    var e = $("#side-column-wrapper")
      , o = $("#side-column")
      , n = $("#main-column");
    AoPS.makeSidebarAdjustment(e, o, n)
}
,
AoPS.fixSidebarAnimatedOnce = function(e) {
    AoPS.fixSidebarAnimatedOnceOnElement(e, "main-column")
}
,
AoPS.fixSidebarAnimatedOnceOnElement = function(e, o) {
    var n = $("#side-column-wrapper")
      , t = $("#side-column")
      , i = 2 + e ? e / 15 : 0
      , a = 0;
    !function e() {
        a > i || (a++,
        AoPS.makeSidebarAdjustment(n, t, $("#" + o)),
        setTimeout(e, 15))
    }()
}
,
AoPS.fixSidebarClassObserver = function(e) {
    var o, n = $("#side-column-wrapper"), t = $("#side-column"), i = $("#main-column");
    e || (e = []),
    o = e.attributeFilter ? {
        attributeFilter: e.attributeFilter,
        childList: !0,
        subtree: !0
    } : {
        attributeFilter: ["class"],
        childList: !0,
        subtree: !0
    };
    new MutationObserver(function() {
        if (e.animation_length) {
            var o = 2 + e.animation_length / 15
              , a = 0;
            !function e() {
                a > o || (a++,
                AoPS.makeSidebarAdjustment(n, t, i),
                setTimeout(e, 15))
            }()
        } else
            AoPS.makeSidebarAdjustment(n, t, i)
    }
    ).observe(document.getElementById("main-column"), o),
    e.animation_length ? AoPS.fixSidebarAnimatedOnce(e.animation_length / 15) : AoPS.makeSidebarAdjustment(n, t, i)
}
,
AoPS.login = {
    ajaxing: !1,
    $login_form: $("#login-form"),
    logout_url: AoPS.bootstrap_data && AoPS.bootstrap_data.logout_url,
    user_clicked_logout: !1,
    user_clicked_login: !1,
    initialize: function() {
        $(document).on("click", ".online-login-button", AoPS.login.display),
        $("#header-logout, #small-header-logout").on("click", AoPS.login.logout),
        $("#register-button").on("click", AoPS.login.register),
        $("#login-cancel-button").on("click", AoPS.login.close),
        $("#login-button").on("click", AoPS.login.login),
        $("#login-password").on("keypress", function(e) {
            13 === e.keyCode && AoPS.login.login()
        }),
        $("#login-username").on("keypress", function(e) {
            if (13 === e.keyCode) {
                var o = document.getElementById("login-username").value;
                document.getElementById("login-password").value.length ? AoPS.login.login() : o.length && document.getElementById("login-password").focus()
            }
        })
    },
    logout: function(e) {
        if (!AoPS.login.ajaxing) {
            e.preventDefault(),
            e.stopPropagation(),
            AoPS.login.user_clicked_logout = !0,
            AoPS.login.ajaxing = !0;
            var o = AoPS.protected_url + "ajax.php"
              , n = location.protocol;
            void 0 !== n && n.indexOf("https") < 0 && (o = o.replace("https", "http")),
            $.ajax({
                url: o,
                timeout: 1e4,
                type: "post",
                crossDomain: !0,
                xhrFields: {
                    withCredentials: !0
                },
                data: {
                    a: "logout"
                },
                success: function(e) {
                    AoPS.login.ajaxing = !1,
                    AoPS.login.logout_url ? window.location = AoPS.login.logout_url : window.location.hash ? window.location.reload(!0) : window.location.href = window.location.href
                }
            })
        }
    },
    register: function(e) {
        var o = document.getElementById("registration-form");
        o.username.value = document.getElementById("login-username").value,
        o.password.value = document.getElementById("login-password").value,
        o.submit()
    },
    loggedin: function() {},
    login: function(e) {
        if (!AoPS.login.ajaxing) {
            AoPS.login.user_clicked_login = !0,
            AoPS.login.ajaxing = !0;
            var o = AoPS.protected_url + "ajax.php";
            if (void 0 !== e && !0 === e) {
                var n = location.protocol;
                void 0 !== n && n.indexOf("https") < 0 && (o = o.replace("https", "http"))
            }
            $.ajax({
                url: o,
                timeout: 1e4,
                type: "post",
                data: {
                    a: "login",
                    username: $("#login-username").val(),
                    password: $("#login-password").val(),
                    stay: $("#login-stay-logged-in").is(":checked")
                },
                crossDomain: !0,
                xhrFields: {
                    withCredentials: !0
                },
                success: function(e) {
                    setTimeout(function() {
                        AoPS.login.ajaxing = !1
                    }, 1e3),
                    e.error_msg ? ($("#login-form > .error").show().html(e.error_msg),
                    e.error_msg.toLowerCase().indexOf("account deactivated") >= 0 && $.ajax({
                        url: o,
                        timeout: 1e4,
                        type: "post",
                        data: {
                            a: "user-get-registration-disabled",
                            username: $("#login-username").val()
                        },
                        crossDomain: !0,
                        xhrFields: {
                            withCredentials: !0
                        },
                        success: function(e) {
                            e.response.inactive_registration_disabled && $('#login-form a[href="/user/register.php"]').hide()
                        }
                    })) : e.error_code ? $("#login-from > .error").show().html(e.error_code) : document.location.href.indexOf("com/online?login") > 0 ? document.location = "/online" : window.location.hash ? window.location.reload(!0) : window.location.href = window.location.href
                },
                error: function(o) {
                    void 0 !== e && !0 === e ? (AoPS.login.user_clicked_login = !1,
                    setTimeout(function() {
                        AoPS.login.ajaxing = !1
                    }, 1e3),
                    $("#login-form > .error").show().html("There was an error communicating with the server. Please try again.")) : (AoPS.login.ajaxing = !1,
                    AoPS.login.login(!0))
                }
            })
        }
    },
    close: function() {
        AoPS.Ui.Modal.closeAllModals(),
        $(document).off("keyup", AoPS.login.checkKeyPress)
    },
    display: function(e) {
        e = !1 !== e,
        0 === AoPS.login.$login_form.length && (window.location.href = "/user/login.php?redirect=" + encodeURIComponent(window.location.href)),
        $("#login-cancel-button").toggle(e),
        $("#login-password").attr("type", "password"),
        AoPS.login.$login_form.showPlainModal({
            max_width: "500px",
            closeX: e,
            force_response: !e,
            scrollable: !0
        }),
        setTimeout(function() {
            $("#login-username").focus()
        }, 1),
        e && $(document).on("keyup", AoPS.login.checkKeyPress)
    },
    checkKeyPress: function(e) {
        27 === e.keyCode && AoPS.login.close()
    },
    onUserAjaxLogout: function() {
        AoPS.session.logged_in || ($("#header .myaops").remove(),
        $("#header-login").show())
    },
    onUserAjaxLogin: function() {
        document.location.reload(!0)
    }
},
$(function() {
    var e = $(".menubar-label, .login-dropdown")
      , o = !1;
    e.on("click", function(e) {
        o && (e.preventDefault(),
        e.stopPropagation())
    }).on("mouseover", function(e) {
        if (o)
            e.preventDefault();
        else {
            var n = $(this);
            n.prop("hoverTimeout") && n.prop("hoverTimeout", clearTimeout(n.prop("hoverTimeout"))),
            n.prop("hoverIntent", setTimeout(function() {
                n.addClass("open")
            }, 50))
        }
    }).on("mouseleave", function(e) {
        if (o)
            e.preventDefault();
        else {
            var n = $(this);
            n.prop("hoverIntent") && n.prop("hoverIntent", clearTimeout(n.prop("hoverIntent"))),
            n.prop("hoverTimeout", setTimeout(function() {
                n.removeClass("open")
            }, 50))
        }
    });
    var n = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
    ("ontouchstart"in document.documentElement || "MSPointerDown" === n) && e.each(function() {
        var t = $(this);
        this.addEventListener(n, function(i) {
            if (("MSPointerDown" === n || 1 === i.touches.length) && (window.innerWidth > 700 || t.hasClass("login-dropdown")))
                if (i.stopPropagation(),
                t.hasClass("open"))
                    o = !1;
                else {
                    o = !0,
                    i.target !== this && i.target.parentNode !== this || i.preventDefault(),
                    e.removeClass("open"),
                    t.addClass("open");
                    document.addEventListener(n, function e(n) {
                        n.stopPropagation(),
                        t.removeClass("open"),
                        document.removeEventListener("touchstart", e),
                        o = !1
                    })
                }
        }, !1)
    })
}),
AoPS.updateLayout = function() {}
,
"undefined" != typeof Backbone && (AoPS.Model = Backbone.Model.extend({}),
AoPS.Collection = Backbone.Collection.extend({
    debug: function() {
        console.log(this),
        console.log(this.length),
        console.log(this.models)
    }
}),
AoPS.View = Backbone.View.extend({
    getTemplate: function(e, o) {
        var n = AoPS.View.compileTemplate(e);
        return $.parseHTML($.trim(n && n(o)))
    },
    compile: function(e) {
        return AoPS.View.compileTemplate(e)
    },
    display: function(e, o) {
        this.$el.html($.parseHTML($.trim(e(o))))
    },
    debug: function() {
        console.log("View.model:", this.model),
        console.log("View.tagName:", this.tagName),
        console.log("View.className:", this.className),
        console.log("View.el:", this.el),
        console.log("View.$el:", this.$el)
    },
    hide: function() {
        this.$el.hide()
    },
    show: function() {
        this.$el.show()
    },
    close: function() {
        this.remove(),
        this.unbind(),
        "function" == typeof this.onClose && this.onClose()
    }
}),
AoPS.View.template_cache = {},
AoPS.View.compileTemplate = function(e) {
    var o = AoPS.View.template_cache;
    if (!o.hasOwnProperty(e)) {
        var n = $(e)
          , t = Handlebars.templates && Handlebars.templates[e.slice(1)];
        n.length ? o[e] = Handlebars.compile(n.html()) : t && (o[e] = t)
    }
    return o[e]
}
),
AoPS.inputPlaceholders = {
    initialize: function() {
        "placeholder"in document.createElement("input") || ($("[placeholder]").focus(function() {
            var e = $(this);
            e.val() === e.attr("placeholder") && (e.val(""),
            e.removeClass("placeholder"))
        }).blur(function() {
            var e = $(this);
            "" !== e.val() && e.val() !== e.attr("placeholder") || (e.addClass("placeholder"),
            e.val(e.attr("placeholder")))
        }).blur(),
        $(["placeholder"]).parents("form").submit(AoPS.inputPlaceholders.clear),
        AoPS.inputPlaceholders.clear = function() {
            $("[placeholder]").each(function() {
                var e = $(this);
                e.val() === e.attr("placeholder") && e.val("")
            })
        }
        )
    },
    clear: function() {}
},
AoPS.doFastMathJax = function(e) {
    AoPS.FastMathJax.push(e)
}
,
AoPS.FastMathJax = {
    _elements: [],
    _isProcessing: !1,
    _process: function() {
        if (!this._isProcessing)
            if (this._elements.length) {
                this._isProcessing = !0;
                var e = $("<div />").css({
                    position: "fixed",
                    top: "-100vh",
                    left: "-100vw",
                    opacity: 0,
                    "z-index": -9999,
                    "pointer-events": "none"
                }).appendTo($(document.body))
                  , o = this
                  , n = this._elements.splice(0, 250);
                _.each(n, function(o) {
                    o.$hidden = o.$el.clone().removeClass().appendTo(e)
                }),
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, e.get(0)]),
                MathJax.Hub.Queue([function() {
                    _.each(n, function(e) {
                        e.$el.html("").append(e.$hidden.clone()),
                        e.$hidden.remove()
                    }),
                    e.remove(),
                    o._isProcessing = !1,
                    o._process()
                }
                ])
            } else
                this._isProcessing = !1
    },
    push: function(e) {
        window.MathJax && (e instanceof jQuery || _.isArray(e) ? _.each(e, _.bind(function(e) {
            this._elements.push({
                $el: $(e)
            })
        }, this)) : this._elements.push({
            $el: $(e)
        }),
        setTimeout(_.bind(function() {
            this._process()
        }, this), 50))
    }
},
AoPS.importJavaScript = function(e) {
    var o = document.createElement("script");
    o.setAttribute("type", "text/javascript"),
    o.setAttribute("src", e),
    document.getElementsByTagName("head")[0].appendChild(o)
}
,
window.number_format = function(e, o, n, t) {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    var i, a, r, s = isFinite(+e) ? +e : 0, l = isFinite(+o) ? Math.abs(o) : 0, c = void 0 === t ? "," : t, u = void 0 === n ? "." : n, d = "";
    return (d = (l ? (i = s,
    a = l,
    r = Math.pow(10, a),
    "" + (Math.round(i * r) / r).toFixed(a)) : "" + Math.round(s)).split("."))[0].length > 3 && (d[0] = d[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, c)),
    (d[1] || "").length < l && (d[1] = d[1] || "",
    d[1] += new Array(l - d[1].length + 1).join("0")),
    d.join(u)
}
,
function() {
    var e = !1
      , o = !1;
    AoPS.refreshOnBackButtonLoadWithOldData = function(n, t) {
        if (!o && (o = !0,
        n)) {
            var i = function(e) {
                var o = "" + AoPS.bootstrap_data[e];
                return !(o.indexOf(";") > -1) && (parseInt(o) || !1)
            }(t = t || "init_time");
            if (!1 !== i) {
                var a = function(e) {
                    if (!document || _.isUndefined(document.cookie) || !navigator || !navigator.cookieEnabled)
                        return !1;
                    for (var o, n = new RegExp("^\\s*" + e + "_init_time\\s*=\\s*(.*?)\\s*$"), t = document.cookie.split(";"), i = 0; i < t.length; i++)
                        if (o = t[i].match(n))
                            return parseInt(o[1]);
                    return !1
                }(n);
                !1 !== a && a >= i ? function() {
                    if (!e) {
                        e = !0;
                        var o = document.createElement("STYLE")
                          , n = document.createTextNode("body {display: none;}");
                        o.appendChild(n),
                        document.head.appendChild(o),
                        console.log("About to refresh the page due to back button use."),
                        setTimeout(function() {
                            window.location.reload(!0)
                        }, 2e3)
                    }
                }() : setTimeout(function() {
                    e || (document.cookie = n + "_init_time=" + i + "; path=/")
                }, 3e3)
            }
        }
    }
}(),
AoPS.isUserLimited = function() {
    return AoPS.user_is_limited
}
,
AoPS.user_is_limited = AoPS.hasOwnProperty("session") && AoPS.session.hasOwnProperty("role") && -1 !== AoPS.session.role.indexOf("limited_user"),
AoPS.isUserNew = function() {
    return AoPS.user_is_new
}
,
AoPS.user_is_new = AoPS.hasOwnProperty("session") && AoPS.session.hasOwnProperty("role") && -1 !== AoPS.session.role.indexOf("new_user"),
AoPS.in_academy = AoPS.bootstrap_data && AoPS.bootstrap_data.hasOwnProperty("in_academy") && 1 === parseInt(AoPS.bootstrap_data.in_academy),
AoPS.convertSmartQuotes = function(e) {
    return e.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, "-").replace(/[\u2026]/g, "...")
}
;
var gOldOnError = window.onerror;
window.onerror = function(e, o, n, t, i) {
    return !!gOldOnError && gOldOnError(e, o, n)
}
,
window.onImageLoad = function() {}
,
window.handlebars = function(e, o) {
    var n = "";
    if (o || (o = {}),
    e instanceof Element)
        n = e.innerHTML;
    else if ("undefined" != typeof jQuery && e instanceof jQuery)
        n = e.html();
    else {
        if ("string" != typeof e)
            return !1;
        var t = document.querySelector(e);
        n = null === t ? e : t.innerHTML
    }
    if ("undefined" != typeof Handlebars)
        return Handlebars.compile(n)(o);
    for (var i in o) {
        var a = new RegExp("{{" + i + "}}","g");
        n = n.replace(a, o[i])
    }
    return n
}
;
;AoPS.hasOwnProperty("Ui") && AoPS.hasOwnProperty("ui_main_loaded") || (AoPS.Ui = function(e) {
    var t;
    t = $(window).height(),
    setInterval(function() {
        var e = $(window).height();
        e != t && (t = e,
        $(window).trigger("resize"))
    }, 100),
    $(window).on("resize", function() {
        t = $(window).height()
    }),
    e.buildTableRow = function(e) {
        var t = $("<tr/>")
          , o = (e = _.defaults(e, {
            is_header: !1
        })).is_header ? "th" : "td";
        return _.each(e.data, function(e) {
            t.append($.parseHTML("<" + o + ">" + e + "</" + o + ">"))
        }),
        e.is_header && t.addClass("aops-no-sort"),
        t
    }
    ,
    e.buildTable = function(t) {
        var o, s, a = 0, i = !1, n = !1;
        return t = _.defaults(t, {
            sortable: !1,
            table_id: "",
            sort_on_build: !1,
            table_class: "",
            sort_col: 0,
            sort_order: "asc",
            repeating_header: 0
        }),
        o = $("<table/>", {
            id: t.table_id,
            class: t.table_class
        }),
        s = $("<tbody/>").appendTo(o),
        t.hasOwnProperty("footer") && $("<tfoot/>").prependTo(o).append(e.buildTableRow({
            data: t.footer,
            is_header: !0
        })),
        t.hasOwnProperty("header") && $("<thead/>").prependTo(o).append(e.buildTableRow({
            data: t.header,
            is_header: !0
        })),
        t.hasOwnProperty("rows") && _.each(t.rows, function(o) {
            s.append(e.buildTableRow({
                data: o
            })),
            a++,
            t.repeating_header > 0 && a % t.repeating_header == 0 && s.append(e.buildTableRow({
                data: t.header,
                is_header: !0
            }))
        }),
        t.sortable && (o.tablesorter(t.sort_on_build ? {
            sortList: t.hasOwnProperty("sortList") ? t.sortList : [[t.sort_col, "asc" === t.sort_order ? 0 : 1]]
        } : {}),
        t.repeating_header > 0 && (o.bind("sortStart", function() {
            i ? (i = !1,
            n = !0) : (i = !0,
            s.find(".aops-no-sort").remove(),
            o.trigger("update"))
        }),
        o.bind("sortEnd", function() {
            n ? n = !1 : s.find("tr:nth-child(" + t.repeating_header + "n)").after(e.buildTableRow({
                data: t.header,
                is_header: !0
            }))
        }))),
        o
    }
    ,
    e.Flyout = function() {
        var e, t = {}, o = [], s = {
            width: 300,
            height: 150,
            class: "",
            time: 5e3,
            animation_time: 1e3,
            close_function: "close"
        };
        function a() {
            if (o.length && document.body) {
                var e = document.getElementById("flyout");
                if (!e || !e.parentNode) {
                    var t = o.shift();
                    i(t.html, t.opts)
                }
            }
        }
        function i(o, a) {
            a = $.extend({}, s, a),
            e = a;
            var i = document.createElement("div");
            i.id = "flyout",
            i.style.width = a.width + "px",
            i.style.height = a.height + "px",
            i.style.right = -a.width + "px",
            i.className = a.class,
            i.innerHTML = '<div class="close" onclick="AoPS.Ui.Flyout.' + a.close_function + '()"></div>' + o,
            document.body.appendChild(i),
            $("#flyout").animate({
                right: 0
            }, a.animation_time, function() {
                t.timeout = setTimeout(function() {
                    n()
                }, a.time)
            })
        }
        function n() {
            $("#flyout").animate({
                right: -e.width
            }, e.animation_time, function() {
                t.timeout = 0;
                var e = document.getElementById("flyout");
                e && (e.parentNode.removeChild(e),
                a())
            })
        }
        return t.display = function(e, s) {
            document.body ? (t.close(),
            o = [],
            i(e, s)) : (AoPS.ErrorUtil.log("E_EARLY_FLYOUT"),
            t.queue(e, s))
        }
        ,
        t.queue = function(e, t) {
            o.push({
                html: e,
                opts: t
            }),
            a()
        }
        ,
        t.close = function() {
            if (document.body) {
                t.timeout && clearTimeout(t.timeout),
                o = [];
                var e = document.getElementById("flyout");
                e && e.parentNode && e.parentNode.removeChild(e)
            }
        }
        ,
        t.closeWithoutClearingQueue = function() {
            document.body && (t.timeout && clearTimeout(t.timeout),
            n())
        }
        ,
        $(a),
        t
    }(),
    $.fn.extend({
        showUnstyledModal: function(e) {
            var t = _.defaults({
                $obj: this
            }, arguments.length > 0 ? arguments[0] : {});
            return this.show(),
            AoPS.Ui.Modal.show$Object(t)
        },
        showPlainModal: function(e) {
            var t = _.defaults({
                body: this
            }, arguments.length > 0 ? arguments[0] : {});
            return this.show(),
            AoPS.Ui.Modal.show(t)
        },
        showPlainBodyModal: function(e) {
            var t = _.defaults({
                body: this
            }, arguments.length > 0 ? arguments[0] : {});
            return this.show(),
            AoPS.Ui.Modal.showPlainBody(t)
        },
        showModal: function(e) {
            var t = arguments.length > 0 ? arguments[0] : {};
            return this.show(),
            AoPS.Ui.Modal.showMessage(this, t)
        },
        showModalQuick: function(e) {
            var t = arguments.length > 0 ? arguments[0] : {};
            return this.show(),
            AoPS.Ui.Modal.showMessageQuick(this, t)
        },
        showPlainAlert: function(e) {
            var t = _.defaults({
                body: this,
                type: "alert"
            }, arguments.length > 0 ? arguments[0] : {});
            return this.show(),
            AoPS.Ui.Modal.show(t)
        },
        showAlertQuick: function(e) {
            var t = arguments.length > 0 ? arguments[0] : {};
            return this.show(),
            AoPS.Ui.Modal.showAlertQuick(this, t)
        },
        showAlert: function(e) {
            var t = arguments.length > 0 ? arguments[0] : {};
            return this.show(),
            AoPS.Ui.Modal.showAlert(this, t)
        },
        cloneToPlainModal: function(e) {
            var t = this.clone(!0)
              , o = _.defaults({
                body: t,
                type: "message"
            }, arguments.length > 0 ? arguments[0] : {});
            return t.show(),
            AoPS.Ui.Modal.showPlain(o)
        },
        cloneToUnstyledModal: function(e) {
            var t = this.clone(!0)
              , o = _.defaults({
                $obj: t
            }, arguments.length > 0 ? arguments[0] : {});
            return this.show(),
            AoPS.Ui.Modal.show$Object(o)
        },
        cloneToModal: function(e) {
            var t = this.clone(!0)
              , o = _.extend({}, arguments.length > 0 ? arguments[0] : {});
            return t.show(),
            AoPS.Ui.Modal.showMessage(t, o)
        },
        replaceTopModalPlain: function(e) {
            var t = _.defaults({
                body: this,
                frame_class: "",
                type: "message"
            }, arguments.length > 0 ? arguments[0] : {})
              , o = AoPS.Ui.Modal.replace(t);
            return this.show(),
            o
        },
        replaceTopModalUnstyled: function(e) {
            var t = _.defaults({
                $obj: this,
                type: "$"
            }, arguments.length > 0 ? arguments[0] : {})
              , o = AoPS.Ui.Modal.replace(t);
            return this.show(),
            o
        },
        replaceTopModal: function(e) {
            var t = _.extend({
                type: "message",
                frame_class: "aops-modal-standard",
                body: this
            }, arguments.length > 0 ? arguments[0] : {})
              , o = AoPS.Ui.Modal.replace(t);
            return this.show(),
            o
        }
    });
    var o = 1e5;
    return e.Modal = {
        active_modals: [],
        fitMasks: function() {
            function e() {
                var e = {
                    height: $(window).outerHeight(),
                    width: $(window).outerWidth()
                };
                function t(t, o) {
                    var s = t.options["max_" + o];
                    return "%" === s.substr(s.length - 1, 1) ? Math.min(parseFloat(s) / 100 * e[o], t.options.overall_max_width) : Math.min(parseFloat(s), t.options.overall_max_width)
                }
                _.each(this.active_modals, function(e) {
                    var o = {
                        height: t(e, "height"),
                        width: t(e, "width")
                    };
                    e.$obj.css({
                        "max-height": "",
                        "max-width": ""
                    }),
                    e.$obj.css({
                        height: e.options.height,
                        width: e.options.width
                    }),
                    _.each(["width", "height"], function(t) {
                        var s = Math.round(o[t]);
                        e.$obj[t]() > s && e.$obj[t](s)
                    });
                    var s = Math.min(1e3, window.innerWidth - 12) + "px";
                    e.$obj.css({
                        "max-height": e.options.max_height,
                        "max-width": s
                    })
                })
            }
            function t() {
                $("body").toggleClass("modal-page-overflow", $("body").height() > $(window).height()),
                _.each(this.active_modals, function(e) {
                    e.$wrapper.css({
                        overflow: "hidden"
                    }),
                    e.$obj.css({
                        position: "absolute"
                    }),
                    e.$obj.css({
                        top: parseInt(Math.max(0, ($(window).height() - e.$obj.outerHeight()) / 2 * .8)),
                        left: parseInt(Math.max(0, ($(window).width() - e.$obj.outerWidth()) / 2))
                    })
                })
            }
            e.apply(this),
            e.apply(this),
            setTimeout(_.bind(function() {
                e.apply(this),
                t.apply(this)
            }, this), 5),
            t.apply(this)
        },
        show$Object: function(e) {
            var t = {
                $wrapper: $("<div/>", {
                    class: "aops-modal-wrapper"
                }),
                $mask: $("<div/>", {
                    class: "aops-modal-mask"
                }),
                $obj: e.$obj,
                options: this.appendDefaults(e)
            };
            return $("body").addClass("aops-modal-open"),
            t.$wrapper.append(t.$obj),
            this.setZIndices(t),
            $("body").append(t.$mask),
            $("body").append(t.$wrapper),
            t.options.hasOwnProperty("onShow") && setTimeout(function() {
                t.options.onShow()
            }, 100),
            this.active_modals.push(t),
            this.setZIndices(t),
            t.$mask.fadeTo(e.mask_fade_in_speed, t.options.mask_alpha),
            t.$wrapper.fadeIn(e.mask_fade_in_speed, function() {
                "alert" === e.type && e.focus_on_alert && t.$obj.find("button").first().focus()
            }),
            t.options.draggable && t.$obj.draggable && t.$obj.draggable(t.options.draggable_options),
            this.parseForceResponse(t),
            this.fitMasks(),
            "activeElement"in document && !_.isUndefined(document.activeElement) && !_.isNull(document.activeElement) && document.activeElement.blur(),
            t.options.mathjax && window.MathJax && MathJax.Hub.Queue(["Typeset", MathJax.Hub, t.$obj[0]]),
            t.$obj.trigger("modal_shown"),
            t
        },
        show: function(e) {
            var t;
            switch ((t = this.prepareOptions.apply(this, arguments)).type) {
            case "$":
                return this.show$Object(t);
            case "unframed_html":
                return $($.parseHTML(t.body));
            case "ignore-loading":
                break;
            default:
                return this.show$Object(_.extend({
                    $obj: this.makeFramed$Object(t)
                }, t))
            }
        },
        extFrameClass: function(e, t) {
            return e + (t.hasOwnProperty("frame_class") ? " " + t.frame_class : "")
        },
        showPlain: function(e) {
            return this.show(e)
        },
        showQuick: function(e) {
            return this.show(_.defaults({
                frame_class: this.extFrameClass("aops-modal-standard aops-modal-quick", e)
            }, e))
        },
        showPlainBody: function(e) {
            return this.show(_.defaults({
                frame_class: this.extFrameClass("aops-modal-plain-body", e)
            }, e))
        },
        showMessage: function(e) {
            var t, o = arguments.length > 1 ? arguments[1] : {};
            return t = o.hasOwnProperty("buttons") ? "buttons" : "message",
            this.show(_.extend({
                type: t,
                body: e,
                frame_class: this.extFrameClass("aops-modal-standard", o)
            }, o))
        },
        showMessageQuick: function(e) {
            return this.showQuick(_.extend({
                type: "message",
                body: e
            }, arguments.length > 1 ? arguments[1] : {}))
        },
        showAlert: function(e) {
            var t = arguments.length > 1 ? arguments[1] : {};
            return this.show(_.extend({
                type: "alert",
                body: e,
                frame_class: this.extFrameClass("aops-modal-standard", t)
            }, t))
        },
        showAlertQuick: function(e) {
            return this.showQuick(_.extend({
                type: "alert",
                body: e
            }, arguments.length > 1 ? arguments[1] : {}))
        },
        showConfirm: function(e, t) {
            var o = arguments.length > 2 ? arguments[2] : {}
              , s = this.show(_.extend({
                type: "confirm",
                body: e,
                onButtonClick: t,
                frame_class: this.extFrameClass("aops-modal-standard", o)
            }, o));
            return s.$obj.find(".aops-modal-btn").first().focus(),
            s
        },
        showConfirmQuick: function(e, t) {
            var o = this.showQuick(_.extend({
                type: "confirm",
                body: e,
                onButtonClick: t
            }, arguments.length > 2 ? arguments[2] : {}));
            return o.$obj.find(".aops-modal-btn").first().focus(),
            o
        },
        showButtons: function(e, t, o) {
            var s = arguments.length > 3 ? arguments[3] : {};
            return this.show(_.extend({
                type: "buttons",
                buttons: t,
                body: e,
                onButtonClick: o,
                frame_class: this.extFrameClass("aops-modal-standard", s)
            }, s))
        },
        showButtonsQuick: function(e, t, o) {
            return this.showQuick(_.extend({
                type: "buttons",
                buttons: t,
                body: e,
                onButtonClick: o
            }, arguments.length > 3 ? arguments[3] : {}))
        },
        makeFramed$Object: function(e) {
            var t, o, s = null, a = null, i = this, n = $("<div/>", {
                class: e.scrollable ? "aops-scroll-content" : "aops-modal-noscroll"
            });
            function r(e) {
                var t = "";
                return e.btnClass && (t = " " + e.btnClass),
                $("<button/>", {
                    class: "aops-modal-btn btn btn-primary" + t,
                    text: e.text
                }).on("click", function(t) {
                    return e.options.hasOwnProperty("onButtonClick") && e.hasOwnProperty("value") && e.options.onButtonClick(e.value),
                    e.options.close_on_button_click && i.closeTopModal(),
                    t.stopPropagation(),
                    t.preventDefault(),
                    !1
                })
            }
            if (t = $($.parseHTML('<div class="aops-modal-frame"></div>')),
            o = $($.parseHTML('<div class="aops-modal-content-wrapper"></div>')),
            t.append(o),
            e.scrollable ? (o.append($.parseHTML('<div class="aops-scroll-outer">\t\t\t\t\t\t<div class="aops-scroll-bar"><div class="aops-scroll-slider"></div></div>\t\t\t\t\t\t<div class="aops-scroll-inner"></div></div>')),
            n.addClass("aops-scroll-content"),
            o.find(".aops-scroll-inner").append(n),
            o.find(".aops-scroll-bar").buildAopsScrollbar({
                $content: n,
                axis: e.scroll_axis,
                chrome53_hack: navigator.userAgent.indexOf("Mac OS X") && !!window.chrome && !!window.chrome.webstore
            }),
            "y" === e.scroll_axis ? t.addClass("aops-modal-vert-scroll") : t.addClass("aops-modal-horiz-scroll")) : o.append(n),
            e.hasOwnProperty("title") && (a = $("<div/>", {
                class: "aops-modal-title",
                html: e.title
            }),
            o.prepend(a)),
            e.hasOwnProperty("body") && n.append($("<div/>", {
                class: "aops-modal-body"
            }).append(e.body)),
            ["alert", "confirm", "buttons"].indexOf(e.type) > -1)
                switch (s = $("<div/>", {
                    class: "aops-modal-buttons aops-modal-footer"
                }).appendTo(o),
                e.type) {
                case "alert":
                    s.append(r.apply(this, [{
                        text: e.alert_button_ok,
                        value: !0,
                        options: e
                    }]));
                    break;
                case "confirm":
                    s.append(r.apply(this, [{
                        text: e.confirm_button_ok,
                        value: !0,
                        btnClass: !1,
                        options: e
                    }])),
                    s.append(r.apply(this, [{
                        text: e.confirm_button_cancel,
                        value: !1,
                        btnClass: !1,
                        options: e
                    }]));
                    break;
                case "buttons":
                    _.each(e.buttons, function(t) {
                        s.append(r.apply(i, [{
                            text: t.text,
                            value: t.value,
                            btnClass: t.btnClass || !1,
                            options: e
                        }]))
                    })
                }
            else
                e.hasOwnProperty("footer") && $("<div/>", {
                    class: "aops-modal-footer",
                    html: e.footer
                }).appendTo(o);
            return e.closeX && $("<a/>", {
                class: "aops-close-x clickable"
            }).appendTo(o).on("click", function() {
                e.onClickX() && i.closeTopModal()
            }),
            e.hasOwnProperty("frame_class") && t.addClass(e.frame_class),
            _.isNull(a) ? t.find(".aops-modal-footer").length > 0 && t.addClass("bottom-only") : t.addClass(t.find(".aops-modal-footer").length > 0 ? "top-and-bottom" : "top-only"),
            t.css({
                "max-height": e.max_height,
                "max-width": e.max_width,
                height: e.height,
                width: e.width
            }),
            t
        },
        setZIndices: function(e) {
            e.$mask.css({
                "z-index": o++
            }),
            e.$wrapper.css({
                "z-index": o++
            })
        },
        prepareOptions: function(e) {
            var t;
            return "string" == typeof e ? (AoPS.ErrorUtil.log("E_MODAL", new Error("Calling preloaded modal."), {
                id: e
            }),
            {
                type: "ignore-loading"
            }) : (t = e,
            this.appendDefaults(t))
        },
        appendDefaults: function(e) {
            return e.hasOwnProperty("defaults_parsed") && e.defaults_parsed ? e : _.extend({
                defaults_parsed: !0,
                focus_on_alert: !0,
                max_width: "80%",
                max_height: "80%",
                width: "",
                height: "",
                frame_class: "",
                mask_alpha: .4,
                kill_phrase: "",
                mask_fade_in_speed: 200,
                overall_max_width: 1e3,
                force_response: !1,
                mathjax: !1,
                closeX: !0,
                draggable: !1,
                draggable_options: {},
                scrollable: !1,
                scroll_axis: "y",
                close_on_button_click: !0,
                alert_button_ok: "OK",
                confirm_button_ok: "OK",
                confirm_button_cancel: "Cancel",
                onClickMask: function() {
                    return !0
                },
                onClickX: function() {
                    return !0
                }
            }, e)
        },
        parseForceResponse: function(e) {
            e.$wrapper.off("click.wrapper"),
            e.options.force_response ? e.$obj.off("click.modal") : (e.$obj.data("clicked_modal", !1),
            e.$obj.on("click.modal", function() {
                e.$obj.data("clicked_modal", !0)
            }),
            e.$wrapper.on("click.wrapper", _.bind(function(t) {
                e.$obj.data("clicked_modal") ? e.$obj.data("clicked_modal", !1) : (e.$obj.data("clicked_modal", !1),
                e.options.onClickMask() && (this.closeTopModal(),
                e.$obj.off("click.modal")))
            }, this)))
        },
        closeTopModal: function() {
            var e;
            if (0 !== this.active_modals.length) {
                if ((e = this.active_modals.pop()).options.hasOwnProperty("replace_with"))
                    return this.active_modals.push(e),
                    void this.replaceTopModal(e.options.replace_with);
                this.removeModal(e),
                0 === this.active_modals.length && ($("body").removeClass("aops-modal-open"),
                $("body").removeClass("modal-page-overflow"))
            }
        },
        applyKillPhrase: function(e) {
            var t;
            for (t = this.active_modals.length - 1; t >= 0; t--)
                this.active_modals[t].options.kill_phrase === e && this.closeParticularModal(this.active_modals[t])
        },
        closeParticularModal: function(e) {
            this.active_modals = _.without(this.active_modals, e),
            this.removeModal(e),
            0 === this.active_modals.length && ($("body").removeClass("aops-modal-open"),
            $("body").removeClass("modal-page-overflow"))
        },
        isModalVisible: function() {
            return !(0 === this.active_modals.length)
        },
        appendClassToInput: function(e, t, o) {
            var s, a = 1;
            return "string" != typeof t ? (s = t,
            a = 0) : s = 2 === o.length ? o[1] : {},
            s.frame_class = this.extFrameClass(e, s),
            o[a] = s,
            o
        },
        replaceTopModal: function(e) {
            var t;
            (t = this.appendClassToInput("aops-modal-standard", e, arguments))[0] = _.extend({
                mask_fade_in_speed: 0
            }, t[0]),
            this.replace.apply(this, t)
        },
        replaceTopModalQuick: function(e) {
            var t = this.appendClassToInput("aops-modal-standard aops-modal-quick", e, arguments);
            t[0] = _.extend({
                mask_fade_in_speed: 0
            }, t[0]),
            this.replace.apply(this, t)
        },
        replaceOrShow: function(e) {
            return this.active_modals.length > 0 ? this.replaceTopModal(e) : this.show(e)
        },
        replaceOrShowQuick: function(e) {
            return this.active_modals.length > 0 ? this.replaceTopModalQuick(e) : this.showQuick(e)
        },
        replaceTopModalPlain: function(e) {
            this.replace.apply(this, arguments)
        },
        replace: function(e) {
            var t, o = this.active_modals.pop();
            switch (t = _.defaults({
                options: this.prepareOptions.apply(this, arguments)
            }, o),
            o.$obj.detach(),
            t.options.type) {
            case "$":
                t.$obj = t.options.$obj;
                break;
            case "unframed_html":
                t.$obj = $($.parseHTML(t.options.body));
                break;
            default:
                t.$obj = this.makeFramed$Object(t.options)
            }
            return t.$wrapper.hide(),
            t.$wrapper.append(t.$obj),
            this.active_modals.push(t),
            this.parseForceResponse(t),
            t.$wrapper.fadeIn(t.options.mask_fade_in_speed, function() {
                "alert" === t.options.type && t.options.focus_on_alert && t.$obj.find("button").first().focus(),
                t.options.hasOwnProperty("onShow") && setTimeout(function() {
                    t.options.onShow()
                }, 1)
            }),
            this.fitMasks(),
            t
        },
        removeModal: function(e) {
            e.$obj.detach(),
            e.$obj.off("click.modal"),
            e.$mask.remove(),
            e.$wrapper.remove(),
            e.options.hasOwnProperty("onClose") && e.options.onClose()
        },
        closePenultimateModal: function() {
            var e;
            this.active_modals.length < 2 || (e = this.active_modals.pop(),
            this.removeModal(this.active_modals.pop()),
            this.active_modals.push(e))
        },
        closeAllModals: function() {
            this.active_modals.length > 0 && (this.closeTopModal(),
            this.closeAllModals())
        },
        makeHelp: function(e) {
            var t;
            return t = this.appendClassToInput("aops-modal-standard", e, arguments),
            $("<div/>", {
                class: "aops-modal-help"
            }).on("click", _.bind(function() {
                this.show.apply(this, t)
            }, this))
        }
    },
    $(window).resize(function() {
        e.Modal.fitMasks()
    }),
    e.buildLoginConfirm = function(e, t) {
        var o = {
            buttons: [{
                text: "Create Account",
                value: 2
            }, {
                text: "Sign In",
                value: 1
            }, {
                text: "Cancel",
                value: 0
            }],
            type: "buttons",
            body: e,
            frame_class: "aops-modal-standard login-prompt-modal",
            close_on_button_click: !1,
            width: "500px",
            onButtonClick: function(e) {
                2 === (e = parseInt(e)) ? window.location.href = "/user/register.php" : 1 === e ? 0 === AoPS.login.$login_form.length ? window.location.href = "/user/login.php?redirect=" + encodeURIComponent(window.location.href) : AoPS.login.display() : AoPS.Ui.Modal.closeTopModal()
            }
        };
        return 2 === arguments.length && (o = _.extend(o, t)),
        AoPS.Ui.Modal.show(o)
    }
    ,
    e.buildAopsScrollbar = function(e) {
        var t, o = {
            chrome53_hack: !1,
            slider_size: 0,
            bar_size: 0,
            min_slider_length: 12,
            slider_position: 0,
            is_scrollable: !1,
            is_dragging: !1,
            is_visible: !1,
            axis: "y",
            loc: "top",
            scroll_loc: "scrollTop",
            size_f: "outerHeight",
            autosize_client: "clientWidth",
            autosize_f: "outerWidth",
            is_draggable: !1,
            hide_scrollbar: !0,
            show_on_hover: !1,
            onScroll: void 0,
            onStopScroll: void 0,
            slider_end_tolerance: 10.5,
            content_size: -1,
            content_size_at_last_slider_end_check: 0,
            slider_now_at_end: !1,
            slider_now_at_start: !1,
            autosize: !1,
            autosize_nudge: 0,
            autosize_bargutter: 22,
            autosize_exclusions: [],
            has_autosize_exclusions: !1,
            fade_end_active: !1,
            fade_start_active: !1,
            activate_keys: !0,
            stop_scroll_timeout_id: "",
            stop_scrolling_delay: 250,
            stop_scroll_propagation: !1,
            onDragStart: function() {},
            onDragRelease: function() {},
            arrow_speed: parseInt(e.$content.css("line-height"))
        };
        function s() {
            var e = parseInt(t.$content.first().position()[o.loc])
              , s = parseInt(t.$bar[o.size_f]())
              , a = parseInt(t.$content.first()[o.size_f]());
            t.$bar.data("aops_scroll_" + o.loc, _.isNaN(s) ? 0 : s),
            t.$content.first().data("aops_scroll_" + o.loc, _.isNaN(a) ? 0 : a),
            t.$content.first().data("aops_target_loc_" + o.loc, _.isNaN(e) && _.isUndefined(e) ? 0 : e),
            o.autosize && t.$outer_wrapper.data("aops_scroll_not_" + o.loc, t.$outer_wrapper[0][o.autosize_client])
        }
        function a() {
            var e;
            "scroll" === t.$inner_wrapper.css("overflow-" + o.axis) && function() {
                var e, t, s;
                if (o.has_autosize_exclusions)
                    for (e = o.autosize_exclusions.length,
                    t = window.innerWidth,
                    s = 0; s < e; s++)
                        if (t >= o.autosize_exclusions[s].min && t <= o.autosize_exclusions[s].max)
                            return !1;
                return !0
            }() ? (e = t.$outer_wrapper[0][o.autosize_client]) > 0 && (t.$inner_wrapper[o.autosize_f](e + o.autosize_bargutter),
            o.is_visible ? t.$content[o.autosize_f](e - o.autosize_nudge) : t.$content[o.autosize_f](e)) : (t.$inner_wrapper[o.autosize_f](""),
            t.$content[o.autosize_f](""))
        }
        e.hasOwnProperty("$scrollbar") || console.log("You called AoPS.Ui.buildAopsScrollbar without setting $scrollbar.\tBad.  I quit."),
        e.hasOwnProperty("$content") || console.log("You called AoPS.Ui.buildAopsScrollbar without setting $ content.  Bad.\t I quit."),
        (o = _.defaults(_.pick.apply({}, _.union([e], _.keys(o))), o)).autosize_exclusions.length > 0 && (o.has_autosize_exclusions = !0),
        "x" === o.axis && (o = _.extend(o, {
            loc: "left",
            scroll_loc: "scrollLeft",
            size_f: "outerWidth",
            autosize_client: "clientHeight",
            autosize_f: "outerHeight"
        })),
        t = {
            $slider: e.$scrollbar.find(".aops-scroll-slider").first(),
            $bar: e.$scrollbar,
            $outer_wrapper: e.$scrollbar.parent(),
            $inner_wrapper: e.$content.parent(),
            $content: e.$content,
            get: function(e) {
                return o.hasOwnProperty(e) ? o[e] : null
            },
            adjustSlider: function() {
                var e, t, s = this.$inner_wrapper[o.size_f](), a = this.$content[o.size_f]();
                o.content_size = a,
                o.bar_size = this.$bar[o.size_f]() - o.min_slider_length,
                e = -1 * (parseFloat(this.$inner_wrapper[o.scroll_loc]()) - 0),
                o.slider_size = s / a * o.bar_size,
                t = s / a * o.bar_size + o.min_slider_length,
                this.$slider[o.size_f](t - this.getBorderNudge()),
                a <= s ? (o.is_scrollable = !1,
                this.$slider.css({
                    display: "none"
                }),
                o.hide_scrollbar && this.setBarVisibility(!1),
                o.slider_position = 0) : (o.is_scrollable = !0,
                o.slider_position = e < 0 ? e + a < s ? o.bar_size - o.slider_size + .5 : -e / a * o.bar_size + .5 : 0,
                this.$slider.css({
                    display: "block"
                }),
                o.show_on_hover && !o.is_dragging ? this.$outer_wrapper.data("hovered") ? this.setBarVisibility(!0) : o.hide_scrollbar && this.setBarVisibility(!1) : this.setBarVisibility(!0)),
                o.slider_position + o.slider_size > o.bar_size && (o.slider_position = o.bar_size - o.slider_size),
                this.$slider.css(o.loc, o.slider_position),
                this.checkSliderAtEnd()
            },
            setBarVisibility: function(e) {
                this.$bar.toggle(e),
                o.is_visible = e,
                this.$outer_wrapper.toggleClass("aops-scrollbar-visible", e),
                this.$outer_wrapper.toggleClass("aops-scrollbar-not-visible", !e),
                o.autosize && a(),
                e && o.chrome53_hack && t.$inner_wrapper.css("overflow-" + o.axis, "scroll")
            },
            getBorderNudge: function() {
                return "x" === o.axis ? parseFloat(this.$slider.css("border-left-width")) + parseFloat(this.$slider.css("border-right-width")) : parseFloat(this.$slider.css("border-top-width")) + parseFloat(this.$slider.css("border-bottom-width"))
            },
            moveSlider: function(e) {
                o.slider_position = Math.min(Math.max(0, e), o.bar_size - o.slider_size),
                this.$slider.css(o.loc, o.slider_position),
                this.scrollTargets(),
                this.adjustSlider()
            },
            scrollTargets: function() {
                var e = this.$content[o.size_f]();
                o.content_size = e,
                this.$inner_wrapper[o.scroll_loc](o.slider_position * e / o.bar_size + .5),
                this.checkSliderAtEnd()
            },
            checkSliderAtEnd: function() {
                o.content_size_at_last_slider_end_check !== parseInt(o.content_size) && (o.slider_now_at_end = !1,
                o.content_size_at_last_slider_end_check = parseInt(o.content_size)),
                o.slider_position > o.bar_size - o.slider_size - o.slider_end_tolerance ? !0 == !o.slider_now_at_end && (o.slider_now_at_end = !0,
                o.is_visible && this.$bar.trigger("slider_at_end"),
                o.fade_end_active && o.$fade_end.css({
                    display: "none"
                })) : (o.slider_now_at_end = !1,
                o.fade_end_active && (o.bar_size < 0 ? o.$fade_end.css({
                    display: "none"
                }) : o.is_visible && o.$fade_end.css({
                    display: "block"
                }))),
                o.slider_position < o.slider_end_tolerance ? (!0 == !o.slider_now_at_start && (o.slider_now_at_start = !0,
                o.is_visible && this.$bar.trigger("slider_at_start")),
                o.fade_start_active && o.$fade_start.css({
                    display: "none"
                })) : (o.slider_now_at_start = !1,
                o.fade_start_active && o.$fade_start.css({
                    display: "block"
                }))
            }
        };
        var i = 0;
        o.chrome53_hack || t.$inner_wrapper.css("overflow-" + o.axis, "scroll"),
        t.$inner_wrapper.on("scroll.adjust_slider touchmove.adjust_slider", function(e) {
            t.adjustSlider(),
            _.isUndefined(o.onScroll) || o.onScroll(e),
            _.isUndefined(o.onStopScroll) || (window.clearTimeout(o.stop_scroll_timeout_id),
            o.stop_scroll_timeout_id = setTimeout(o.onStopScroll, o.stop_scrolling_delay))
        }),
        o.stop_scroll_propagation && "y" === o.axis && t.$inner_wrapper.on("mousewheel DOMMouseScroll", function(e) {
            var s, a, i = Math.max(-1, Math.min(1, e.originalEvent.wheelDelta || -e.originalEvent.detail)), n = t.$inner_wrapper[o.scroll_loc]();
            if (t.$bar.is(":visible"))
                return i > 0 && n - i < 0 ? (t.$inner_wrapper[o.scroll_loc](0),
                r()) : (s = t.$inner_wrapper[o.size_f](),
                a = t.$content[o.size_f](),
                i < 0 && (n + s) / a > .99 ? (t.moveSlider(a - s),
                r()) : void 0);
            function r() {
                return t.adjustSlider(),
                e.preventDefault(),
                e.stopPropagation(),
                !1
            }
        }),
        t.$bar.on("mousedown", function(s) {
            var a = s["page" + o.axis.toUpperCase()] - e.$scrollbar.offset()[o.loc];
            t.moveSlider(a - o.slider_size / 2),
            s.stopPropagation(),
            s.preventDefault()
        }),
        t.$bar.on("reset_end_watchers", function() {
            o.slider_now_at_start = !1,
            o.slider_now_at_end = !1
        }),
        t.$slider.on("mousedown touchstart", function(s) {
            var a = "page" + o.axis.toUpperCase()
              , i = s.originalEvent.hasOwnProperty("touches") ? s.originalEvent.touches[0][a] : s[a]
              , n = parseFloat(t.$slider.position()[o.loc]);
            o.is_dragging = !0,
            $(document).bind("mousemove touchmove", function(e) {
                return t.moveSlider(n + (e.originalEvent.hasOwnProperty("touches") ? e.originalEvent.touches[0][a] : e[a]) - i),
                !1
            }).bind("mouseup touchend", function(s) {
                $(document).unbind("mousemove mouseup touchmove touchend"),
                o.is_dragging = !1,
                e.hasOwnProperty("end_f") && e.end_f(),
                t.adjustSlider(),
                s.stopPropagation(),
                s.preventDefault()
            }),
            s.stopPropagation(),
            s.preventDefault()
        }),
        o.is_draggable && t.$inner_wrapper.on("mousedown.drag", function(s) {
            var a = "page" + o.axis.toUpperCase()
              , i = s.originalEvent.hasOwnProperty("touches") ? s.originalEvent.touches[0][a] : s[a]
              , n = parseFloat(t.$inner_wrapper[o.scroll_loc]());
            o.is_dragging = !0,
            $(document).bind("mousemove touchmove", function(e) {
                return o.onDragStart(),
                t.$inner_wrapper[o.scroll_loc](n - (e.originalEvent.hasOwnProperty("touches") ? e.originalEvent.touches[0][a] : e[a]) + i),
                t.adjustSlider(),
                !1
            }).bind("mouseup touchend", function(s) {
                $(document).unbind("mousemove mouseup touchmove touchend"),
                o.is_dragging = !1,
                e.hasOwnProperty("end_f") && e.end_f(),
                t.adjustSlider(),
                s.stopPropagation(),
                s.preventDefault(),
                o.onDragRelease()
            }),
            s.stopPropagation(),
            s.preventDefault()
        }),
        t.$slider.on("click", function(e) {
            e.stopPropagation(),
            e.preventDefault()
        }),
        t.$bar.on("click", function(e) {
            e.stopPropagation(),
            e.preventDefault()
        }),
        o.activate_keys && (t.$content.add(t.$bar).hover(function() {
            $(this).data("hover", 1)
        }, function() {
            $(this).data("hover", 0)
        }),
        $(document).keydown(function(e) {
            _.each(t.$content, function(s) {
                var a = document.activeElement || document.body;
                if (t.$slider.is(":visible") && (1 === $(s).data("hover") || 1 === $(t.$bar).data("hover"))) {
                    if ("textarea" === a.type || "input" === a.type)
                        return !0;
                    if ("y" === o.axis)
                        switch (e.which) {
                        case 33:
                            t.moveSlider(o.slider_position - o.slider_size);
                            break;
                        case 34:
                            t.moveSlider(o.slider_position + o.slider_size);
                            break;
                        case 35:
                            e.ctrlKey && (t.moveSlider(o.bar_size - o.slider_size),
                            t.$bar.trigger("slider_at_end"));
                            break;
                        case 36:
                            e.ctrlKey && (t.moveSlider(0),
                            t.$bar.trigger("slider_at_start"));
                            break;
                        case 38:
                            t.moveSlider(o.slider_position - o.arrow_speed * o.slider_size / o.bar_size - .5);
                            break;
                        case 40:
                            t.moveSlider(o.slider_position + o.arrow_speed * o.slider_size / o.bar_size - .5);
                            break;
                        default:
                            return !0
                        }
                    if ("x" === o.axis)
                        switch (e.which) {
                        case 37:
                            t.moveSlider(o.slider_position - o.arrow_speed * o.slider_size / o.bar_size);
                            break;
                        case 39:
                            t.moveSlider(o.slider_position + o.arrow_speed * o.slider_size / o.bar_size);
                            break;
                        default:
                            return !0
                        }
                    return e.stopPropagation(),
                    e.preventDefault(),
                    !1
                }
            })
        })),
        o.show_on_hover && t.$outer_wrapper.hover(function() {
            $(this).data("hovered", !0)
        }, function() {
            $(this).data("hovered", !1)
        }),
        (o.fade_start_active = e.hasOwnProperty("fade_start_class")) && (o.$fade_start = $($.parseHTML('<div class="' + e.fade_start_class + '"></div>')),
        t.$outer_wrapper.append(o.$fade_start)),
        (o.fade_end_active = e.hasOwnProperty("fade_end_class")) && (o.$fade_end = $($.parseHTML('<div class="' + e.fade_end_class + '"></div>')),
        t.$outer_wrapper.append(o.$fade_end)),
        t.$outer_wrapper.on("scroll touchmove", function(e) {
            $(e.target).scrollLeft(0),
            $(e.target).scrollTop(0)
        }),
        "y" === o.axis && (t.$bar.bind("mousewheel", function(e, s) {
            if (t.$slider.is(":visible"))
                return t.moveSlider(o.slider_position - o.bar_size / o.slider_size * s),
                !1
        }),
        setTimeout(function() {
            var e = t.$inner_wrapper.outerWidth(!0) - t.$inner_wrapper.prop("scrollWidth")
              , o = Math.max(e, 15)
              , s = (parseInt(t.$inner_wrapper.css("left")) || 0) + (parseInt(t.$outer_wrapper.css("padding-left")) || 0);
            t.$inner_wrapper.css({
                width: "calc(100% + " + o + "px)"
            }),
            0 === e && t.$content.css({
                "max-width": "calc(100% - " + (o + s) + "px)"
            })
        }, 0)),
        function e() {
            (t.$inner_wrapper.is(":visible") && (Math.abs(parseInt(t.$content.first()[o.size_f]()) - t.$content.first().data("aops_scroll_" + o.loc)) > 0 || Math.abs(parseInt(t.$bar[o.size_f]()) - t.$bar.data("aops_scroll_" + o.loc)) > 0 || Math.abs(parseInt(t.$content.first().position()[o.loc]) - t.$content.first().data("aops_target_loc_" + o.loc)) > 0) || function() {
                if (!o.autosize)
                    return !1;
                var e = t.$outer_wrapper;
                return !!e[0] && Math.abs(parseInt(e[0][o.autosize_client]) - e.data("aops_scroll_not_" + o.loc)) > 0
            }()) && (s(),
            t.adjustSlider(),
            o.autosize && a()),
            setTimeout(function() {
                e()
            }, 200)
        }(),
        t.adjustSlider(),
        s(),
        function e() {
            t.$content.first().is(":visible") ? (o.arrow_speed = parseInt(t.$content.first().css("line-height")),
            (_.isNaN(o.arrow_speed) || o.arrow_speed < 1) && (o.arrow_speed = 10),
            s()) : setTimeout(function() {
                i < 3 ? (e(),
                i += 1) : (o.arrow_speed = 10,
                s())
            }, 1e3)
        }(),
        t.checkSliderAtEnd(),
        o.autosize && a(),
        o.show_on_hover && (t.$outer_wrapper.on("mouseenter", function(e) {
            o.is_scrollable && t.setBarVisibility(!0)
        }),
        t.$outer_wrapper.on("mouseleave", function(e) {
            o.is_dragging || t.setBarVisibility(!1)
        })),
        e.$scrollbar.aopsScroll = t
    }
    ,
    $.fn.extend({
        buildAopsScrollbar: function(e) {
            return AoPS.Ui.buildAopsScrollbar($.extend(e, {
                $scrollbar: this
            }))
        },
        wrapWithScroll: function(e) {
            var t = $($.parseHTML('<div class="aops-scroll-outer"><div class="aops-scroll-bar"><div class="aops-scroll-slider"></div></div><div class="aops-scroll-inner"></div></div>'))
              , o = t.find(".aops-scroll-bar");
            return this.addClass("aops-scroll-content"),
            t.find(".aops-scroll-inner").append(this),
            o.buildAopsScrollbar($.extend(e, {
                $content: this
            })),
            t.aopsScroll = o.aopsScroll,
            t
        }
    }),
    e.buildAutocomplete = function(e) {
        return (e = _.defaults(e, {
            match_type: "any",
            is_case_sensitive: !1,
            delay: 0,
            autoFocus: !0,
            minLength: 2,
            num_matches: 0,
            ui_class: ""
        })).$input.parent().addClass("ui-front"),
        e.$input.addClass("ui-autocomplete-input"),
        e.$input.autocomplete({
            autoFocus: e.autoFocus,
            source: "function" == typeof e.source ? e.source : "from_start" === e.match_type || "any" === e.match_type ? function(t, o) {
                var s = new RegExp(("from_start" === e.match_type ? "^" : "") + $.ui.autocomplete.escapeRegex(t.term),e.is_case_sensitive ? "" : "i")
                  , a = _.filter(e.source, function(e) {
                    return s.test(e.label)
                });
                e.num_matches > 0 && (a = a.slice(0, e.num_matches)),
                o(a)
            }
            : "from_start_then_any" === e.match_type ? function(t, o) {
                var s = new RegExp("^" + $.ui.autocomplete.escapeRegex(t.term),e.is_case_sensitive ? "" : "i")
                  , a = new RegExp($.ui.autocomplete.escapeRegex(t.term),e.is_case_sensitive ? "" : "i")
                  , i = _.union(_.filter(e.source, function(e) {
                    return s.test(e.label)
                }), _.filter(e.source, function(e) {
                    return a.test(e.label.substring(1))
                }));
                e.num_matches > 0 && (i = i.slice(0, e.num_matches)),
                o(i)
            }
            : void 0,
            minLength: e.minLength,
            delay: e.delay,
            position: e.hasOwnProperty("position") ? e.position : {},
            response: function(t, o) {
                if (e.hasOwnProperty("blockResponse") && e.blockResponse())
                    e.$input.hasClass("ui-autocomplete-input") && e.$input.autocomplete("close");
                else {
                    var s = _.isNaN(this.selectionStart) ? $(this).val() : $(this).val().substr(0, this.selectionStart)
                      , a = s.length;
                    o.content.length > 0 && 37 !== $(this).data("last_key") && 8 !== $(this).data("last_key") && 46 !== $(this).data("last_key") && new RegExp("^" + $.ui.autocomplete.escapeRegex(s),"i").test(o.content[0].value) && ($(this).val(s + o.content[0].value.substring(a)),
                    this.setSelectionRange(a, o.content[0].label.length))
                }
            },
            open: function(t, o) {
                var s = $(this).data("ui-autocomplete").menu
                  , a = $(this).data("ui-autocomplete").term.substr(0, this.selectionStart)
                  , i = new RegExp($.ui.autocomplete.escapeRegex(a),"gi");
                s.element.find("a").each(function() {
                    $(this).html($(this).text().replace(i, function(e) {
                        return '<span class="ui-autocomplete-term">%s</span>'.replace("%s", e)
                    }))
                }),
                e.hasOwnProperty("onOpen") && e.onOpen(this)
            }
        }),
        e.hasOwnProperty("onFocus") && e.$input.on("autocompletefocus", function(t, o) {
            e.onFocus(t, o)
        }),
        e.hasOwnProperty("onSelect") && e.$input.on("autocompleteselect", function(t, o) {
            e.onSelect(t, o)
        }),
        e.hasOwnProperty("_renderItem") && (e.$input.data("ui-autocomplete")._renderItem = e._renderItem),
        e.hasOwnProperty("change") && e.$input.on("autocompletechange", e.change),
        e.$input.on("click", function(e) {
            this.selectionEnd === this.value.length && $(this).autocomplete("search", this.value)
        }),
        e.$input.on("keydown", function(e) {
            var t = this.value.substr(this.selectionStart, 1).toUpperCase().charCodeAt(0)
              , o = e.which || e.keyCode;
            if (t === o)
                return this.setSelectionRange(this.selectionStart + 1, this.value.length),
                e.stopPropagation(),
                e.preventDefault(),
                $(this).autocomplete("search", this.value.substring(0, this.selectionStart)),
                !1;
            $(this).data("last_key", o)
        }),
        e.ui_class.length > 0 && e.$input.autocomplete("widget").addClass(e.ui_class),
        e.$input
    }
    ,
    $.fn.extend({
        aopsAutocomplete: function(e) {
            return AoPS.Ui.buildAutocomplete($.extend(e, {
                $input: this
            }))
        }
    }),
    e.getScrollbarWidth = function() {
        return "number" != typeof e.scrollbarWidth && (e.scrollbarWidth = e.computeScrollbarWidth()),
        e.scrollbarWidth
    }
    ,
    e.computeScrollbarWidth = function() {
        var e = jQuery('<div style="width: 100%; height:200px;">test</div>')
          , t = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append(e)
          , o = e[0]
          , s = t[0];
        jQuery("body").append(s);
        var a = o.offsetWidth;
        t.css("overflow", "scroll");
        var i = s.clientWidth;
        return t.remove(),
        a - i
    }
    ,
    e.buildUsernameAutocomplete = function(e, t) {
        var o = _.extend({
            match_type: "from_start_then_any",
            delay: 100,
            is_case_sensitive: !1,
            source: function(e, o) {
                new AoPS.Ajax.ScriptRunner("/m/community/ajax.php").run("fetch_username_matches", {
                    username_stub: e.term
                }, function(e, s) {
                    var a;
                    e ? (a = _.map(s.response.usernames, function(e) {
                        return _.defaults(e, {
                            label: e.value
                        })
                    }),
                    t && t.num_matches && a.length > t.num_matches && (a = a.slice(0, t.num_matches)),
                    o(a)) : o([])
                })
            },
            num_matches: 10,
            position: {
                my: "left top+5"
            },
            ui_class: "username-autocomplete"
        }, t);
        e.aopsAutocomplete(o)
    }
    ,
    $.fn.extend({
        aopsUsernameAutocomplete: function(e) {
            AoPS.Ui.buildUsernameAutocomplete(this, e)
        }
    }),
    e.autoExpandTextarea = function(e) {
        var t = e.outerHeight()
          , o = parseInt(e.css("paddingBottom"), 10) + parseInt(e.css("paddingTop"), 10);
        function s() {
            if (e[0].scrollHeight) {
                var t = $(window).scrollTop();
                e.height("auto").height(e[0].scrollHeight - o),
                $(window).scrollTop(t)
            } else
                setTimeout(s, 500)
        }
        e[0].scrollHeight + o <= t && (o = 0),
        /\S/.test(e.val()) && s(),
        e.on("input keyup", s),
        $(window).on("resize", s)
    }
    ,
    e
}(AoPS.Ui || {}),
function(e) {
    var t = {
        adjust_container: 20
    };
    function o(o, s, a) {
        var i = e.extend({}, t, a)
          , n = 0
          , r = ['<div class="aops-scroll-outer">', '<div class="aops-scroll-bar"><div class="aops-scroll-slider"></div></div>', '<div class="aops-scroll-inner">', '<div class="aops-scroll-content">', e(o).html(), "</div>", "</div>", "</div>"].join("");
        e(o).html(r),
        i.axis && "x" === i.axis ? (n = parseInt(e(o).find(".aops-scroll-outer").height()),
        e(o).find(".aops-scroll-inner").height(n + i.adjust_container)) : (n = parseInt(e(o).find(".aops-scroll-outer").width()),
        e(o).find(".aops-scroll-inner").width(n + i.adjust_container)),
        i.$scrollbar = e(o),
        i.$content = e(o).find(".aops-scroll-content"),
        AoPS.Ui.buildAopsScrollbar(i)
    }
    e.fn.aopsscroll = function(t, s) {
        return this.each(function() {
            e.data(this, "plugin_aopsscroll") || e.data(this, "plugin_aopsscroll", new o(this,t,s))
        })
    }
}(jQuery),
AoPS.Ui.ui_main_loaded = !0);
;AoPS.GoToHash = function(e) {
    var a = e.substring(1).replace(/^([a-zA-Z0-9\-]*).*/, "$1");
    if (a) {
        var n = $("#" + a).length ? $("#" + a) : $("a[name=" + a + "]");
        if (canNavResize && n.offset()) {
            var i = n.offset().top;
            $("#header").hasClass("shrunken-header") ? i -= $("#header").height() : i -= 2 * $("#header").height(),
            $("body,html").animate({
                scrollTop: i
            }, 300, "swing")
        }
    }
}
;
var canNavResize = !1
  , getWindowWidth = function() {
    return window.innerWidth
}
  , isMobile = function() {
    return window.matchMedia("(max-width: 700px)").matches
};
$(document).ready(function() {
    var e = getWindowWidth();
    $(".menubar-label-link-outer").on("click", function(e) {
        var a, n, i, o, s, t;
        isMobile() && (a = this,
        n = $(a).next().find(".dropdown-content"),
        i = $(a).parent(),
        o = $(i).height(),
        s = $(n).height(),
        t = o,
        t = o > s + 12 ? o - s - 6 : o + s + 6,
        $(i).height(t))
    }),
    $(window).on("resize", function(a) {
        if (getWindowWidth() !== e)
            if (e = getWindowWidth(),
            isMobile()) {
                $(".menubar-labels").css({
                    display: "none"
                });
                var n = $("body").height()
                  , i = $("#header-wrapper").height();
                $(".menubar-labels").height(n - i),
                $(".menubar-label").each(function(e) {
                    $(this).height("auto")
                })
            } else
                $(".menubar-label").each(function(e) {
                    $(this).height(16)
                }),
                $(".menubar-labels").css({
                    display: "flex",
                    minHeight: 0
                }),
                $(".menubar-labels").height("auto")
    }),
    $(".menubar-hamburger").on("click", function(e) {
        var a = $("body").height()
          , n = $("#header-wrapper").height();
        "none" === $(".menubar-labels").css("display") ? ($(".menubar-labels").css({
            display: "block"
        }),
        $(".menubar-labels").css({
            height: "auto",
            minHeight: a - n + "px"
        })) : $(".menubar-labels").css({
            display: "none"
        })
    }),
    $(".dropdown-content a").on("click", function(e) {
        isMobile() && $(".menubar-labels").css({
            display: "none"
        })
    });
    var a = !1
      , n = !1
      , i = _.throttle(_.bind(function(e) {
        n && (a = !1,
        n = !1,
        $("body,html").stop().animate()),
        $(window).scrollTop() > 5 ? $("#header").addClass("shrunken-header") : $("#header").removeClass("shrunken-header")
    }, this), 200)
      , o = $("body")
      , s = o.hasClass("community") || o.hasClass("school-class-page") || o.hasClass("mediawiki") || o.hasClass("cart") || o.hasClass("ebooks") || o.hasClass("dashboard") || o.hasClass("resources") || o.hasClass("small-header") || o.hasClass("no-nav-resize");
    isMobile() || s || (canNavResize = !0,
    window.location.hash && AoPS.GoToHash(window.location.hash),
    i(),
    $(window).on("scroll", i)),
    $("div.slide-button").on("click", function() {
        if (!a) {
            a = !0,
            n = !1;
            var e = $(".callouts-container").offset().top;
            isMobile() || (e -= 2 * $("#main-menubar").height()),
            $("body,html").animate({
                scrollTop: e
            }, 1200, "swing", function() {
                a = !1
            })
        }
    }),
    document.body.addEventListener("wheel", function() {
        n = !0
    }),
    $(window).on("resize", function(e) {
        isMobile() || canNavResize || s ? isMobile() && canNavResize && (canNavResize = !1,
        $("#header").removeClass("shrunken-header"),
        $(window).off("scroll", i)) : (canNavResize = !0,
        $(window).on("scroll", i))
    }),
    window.addEventListener("hashchange", function() {
        setTimeout(function() {
            AoPS.GoToHash(window.location.hash)
        }, 10)
    }),
    $(".menubar-label").on("click", function(e) {
        if ($(document).width() <= 700) {
            var a = $(e.currentTarget);
            a.height() < 50 && $([document.documentElement, document.body]).animate({
                scrollTop: a.offset().top - 15
            }, 500)
        }
    })
});
;AoPS.Utils = function(r) {
    var t;
    return r.getKeyChain = function(r, t) {
        if (_.isObject(r))
            return _.isArray(t) || (t = _.toArray(arguments).slice(1)),
            _.reduce(t, function(r, t) {
                if (!(!r || !r.hasOwnProperty(t)))
                    return r[t]
            }, r)
    }
    ,
    r.hasKeyChain = function() {
        var t = r.getKeyChain.apply(this, arguments);
        return !_.isUndefined(t)
    }
    ,
    r.initKeyChain = function(r, t, e) {
        return _.isArray(t) ? _.isUndefined(e) && (e = {}) : (t = _.toArray(arguments).slice(1),
        e = {}),
        _.reduce(t, function(r, n, i) {
            var o = i === t.length - 1 ? e : {};
            return r.hasOwnProperty(n) || (r[n] = o),
            r[n]
        }, r)
    }
    ,
    r.Class = ((t = function() {}
    ).extend = function r(t) {
        return function(e) {
            var n, i, o;
            return (i = function() {}
            ).prototype = t.prototype,
            n = new i,
            _.extend(n, e),
            (o = function() {
                this.initialize && this.initialize.apply(this, arguments)
            }
            ).prototype = n,
            o.extend = r(o),
            o
        }
    }(t),
    t),
    r
}(AoPS.Utils || {});
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(r) {
        var t, e, n, i, o, a, h, c = "", f = 0;
        for (r = Base64._utf8_encode(r); f < r.length; )
            i = (t = r.charCodeAt(f++)) >> 2,
            o = (3 & t) << 4 | (e = r.charCodeAt(f++)) >> 4,
            a = (15 & e) << 2 | (n = r.charCodeAt(f++)) >> 6,
            h = 63 & n,
            isNaN(e) ? a = h = 64 : isNaN(n) && (h = 64),
            c = c + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(h);
        return c
    },
    decode: function(r) {
        var t, e, n, i, o, a, h = "", c = 0;
        for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < r.length; )
            t = this._keyStr.indexOf(r.charAt(c++)) << 2 | (i = this._keyStr.indexOf(r.charAt(c++))) >> 4,
            e = (15 & i) << 4 | (o = this._keyStr.indexOf(r.charAt(c++))) >> 2,
            n = (3 & o) << 6 | (a = this._keyStr.indexOf(r.charAt(c++))),
            h += String.fromCharCode(t),
            64 !== o && (h += String.fromCharCode(e)),
            64 !== a && (h += String.fromCharCode(n));
        return h = Base64._utf8_decode(h)
    },
    _utf8_encode: function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var t = "", e = 0; e < r.length; e++) {
            var n = r.charCodeAt(e);
            n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192),
            t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224),
            t += String.fromCharCode(n >> 6 & 63 | 128),
            t += String.fromCharCode(63 & n | 128))
        }
        return t
    },
    _utf8_decode: function(r) {
        for (var t = "", e = 0, n = 0, i = 0, o = 0; e < r.length; )
            (n = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(n),
            e++) : n > 191 && n < 224 ? (i = r.charCodeAt(e + 1),
            t += String.fromCharCode((31 & n) << 6 | 63 & i),
            e += 2) : (i = r.charCodeAt(e + 1),
            o = r.charCodeAt(e + 2),
            t += String.fromCharCode((15 & n) << 12 | (63 & i) << 6 | 63 & o),
            e += 3);
        return t
    }
};
;AoPS.Utils.initKeyChain(AoPS, "Ajax"),
AoPS.Ajax = function(e) {
    var t, i, s = AoPS.Utils;
    function n(t, i, s) {
        var n = i.ajax_data
          , r = i.callback
          , o = i.timeout || t.timeout;
        return i.action && (n.a = i.action),
        AoPS.session && (n.aops_logged_in = AoPS.session.logged_in,
        n.aops_user_id = AoPS.session.user_id,
        n.aops_session_id = AoPS.session.id),
        s || (s = {
            checkQueue: function() {}
        }),
        $.ajax({
            url: t.script_path,
            data: n,
            dataType: "json",
            type: "POST",
            timeout: o,
            error: function(t, i) {
                s.checkQueue(),
                e.handleError(r, t, i)
            },
            success: function(e) {
                s.checkQueue();
                var i = !e.hasOwnProperty("error_code");
                r(i, e),
                _.each(t.global_handlers, function(t) {
                    t(i, e)
                })
            }
        })
    }
    return e.handleError = function(e, t, i) {
        var s = parseInt(t.status);
        200 !== s || t.responseText.length ? "abort" === i ? e(!1, {
            response: {},
            error_code: "E_AJAX_CANCEL",
            error_msg: "The request was cancelled by the calling code."
        }) : "timeout" === i ? e(!1, {
            response: {},
            error_code: "E_AJAX_TIMEOUT",
            error_msg: "Something took too long to happen, and your browser gave up. Please check your internet connection, then try again."
        }) : "parsererror" === i ? (console.log(t.responseText),
        e(!1, {
            response: {},
            error_code: "E_AJAX_BADRETURN",
            error_msg: "You have come across a temporary error with our website. Please try again in an hour, and let us know if you continue to experience problems."
        })) : e(!1, 404 === s ? {
            response: {},
            error_code: "E_AJAX_404",
            error_msg: "The requested script does not exist."
        } : {
            response: {},
            error_code: "E_AJAX_UNKNOWN",
            error_msg: "Something went wrong. Please check your internet connection, then try again."
        }) : e(!0, {
            response: {}
        })
    }
    ,
    t = s.Class.extend({
        initialize: function() {
            this.processing_id = 0,
            this.processing_xhr = null,
            this.next_id = 1,
            this.queue_id_list = [],
            this.queue_table = {}
        },
        getRunningId: function() {
            return this.processing_id
        },
        checkQueue: function() {
            if (this.processing_id = this.queue_id_list.pop(),
            this.processing_xhr = null,
            this.processing_id) {
                var e = this.queue_table[this.processing_id];
                if (!e)
                    return this.checkQueue();
                delete this.queue_table[this.processing_id],
                this.processing_xhr = e.processFunction(e.data, this)
            } else
                this.processing_id = 0
        },
        cancelId: function(e) {
            var t;
            return this.queue_table[e] ? ((t = this.queue_table[e]) && t.data.callback(!1, {
                response: {},
                error_code: "E_AJAX_CANCEL",
                error_msg: "The request was cancelled by the calling code."
            }),
            delete this.queue_table[e],
            !0) : !(this.processing_id !== e || !this.processing_xhr || !this.processing_xhr.abort) && (this.processing_xhr.abort(),
            !0)
        },
        addToQueue: function(e, t, i) {
            var s = this.next_id;
            return this.next_id += 1,
            this.queue_table[s] = {
                data: e,
                processFunction: t
            },
            i ? this.queue_id_list.push(s) : this.queue_id_list = [s].concat(this.queue_id_list),
            this.processing_id || this.checkQueue(),
            s
        }
    }),
    e.RepetitionFilter = s.Class.extend({
        initialize: function(e) {
            this.recent_inputs = [],
            this._clearRecentDebounced = _.debounce(_.bind(function() {
                this.recent_inputs = []
            }, this), e)
        },
        sendToFilter: function(e) {
            var t;
            return t = _.some(this.recent_inputs, function(t) {
                return _.isEqual(e, t)
            }),
            this._clearRecentDebounced(),
            t || this.recent_inputs.push(e),
            !t
        }
    }),
    i = new t,
    e.ScriptRunner = s.Class.extend({
        initialize: function(s, n) {
            var r;
            n = n || {},
            this.script_path = s,
            this.global_handlers = [],
            this.timeout = 2e4,
            _.isFinite(n.timeout) && n.timeout > 0 && (this.timeout = n.timeout),
            r = 500,
            _.isFinite(n.filter_interval) && (r = n.filter_interval),
            r > 0 && (this.filter_object = new e.RepetitionFilter(r)),
            this.last_queue_id = 0,
            this.queue_object = i,
            this.use_queue = !n.hasOwnProperty("use_queue") || !!n.use_queue,
            this.use_queue && n.separate_queue && (this.queue_object = new t)
        },
        addGlobalHandler: function(e) {
            return !!_.isFunction(e) && (this.global_handlers.push(e),
            !0)
        },
        removeGlobalHandler: function(e) {
            var t = this.global_handlers.length;
            return this.global_handlers = _.reject(this.global_handlers, function(t) {
                return t === e
            }, this),
            this.global_handlers.length < t
        },
        getLastQueueId: function() {
            return this.last_queue_id
        },
        getRunningQueueId: function() {
            return this.use_queue && this.queue_object ? this.queue_object.getRunningId() : 0
        },
        cancelQueueId: function(e) {
            return !(!this.use_queue || !e) && this.queue_object.cancelId(e)
        },
        run: function(e, t, i, s) {
            if (_.isObject(e))
                return this.run(e.action, e.ajax_data, e.callback, e);
            s = s || {};
            var r = _.extend({
                a: e
            }, t)
              , o = {
                action: e,
                ajax_data: t,
                callback: i,
                timeout: s.timeout
            }
              , u = _.partial(n, this);
            return !this.filter_object || s.no_filter || this.filter_object.sendToFilter(r) ? (_.isFunction(i) || (console.log("WARNING: No callback provided for AJAX. Using no-op."),
            o.callback = function() {}
            ),
            this.use_queue && !s.no_queue ? this.last_queue_id = this.queue_object.addToQueue(o, u, s.queue_at_front) : (u(o),
            this.last_queue_id = 0),
            !0) : (setTimeout(function() {
                i(!1, {
                    error_code: "E_AJAX_FILTERED",
                    error_msg: "The same request was made recently, so this one was filtered."
                })
            }, 0),
            !1)
        }
    }),
    e
}(AoPS.Ajax);
;AoPS.Utils.initKeyChain(AoPS, "BackboneExtras"),
AoPS.BackboneExtras = function(e) {
    var t = AoPS.Utils;
    function i(e, t) {
        var i;
        return i = '<a data-subviewloc="' + (e = Handlebars.Utils.escapeExpression(e)) + '"></a>',
        new Handlebars.SafeString(i)
    }
    return Handlebars.registerHelper("equals", function(e, t, i) {
        return e == t ? i.fn(this) : i.inverse(this)
    }),
    e.AutocreateMixin = {
        setCreateFunction: function(e) {
            this.createFunction = e
        },
        getOrCreate: function(e, t) {
            t = t || {};
            var i = _.omit(t, ["delay_add"])
              , s = this.get(e);
            if (s || _.isFunction(this.createFunction))
                return s || (s = this.createFunction(e)) && !t.delay_add && this.add(s, i),
                s
        }
    },
    e.TemplateMixin = {
        setTemplate: function(e, t) {
            "#" !== e[0] && (e = "#" + e),
            this.compiledTemplate = AoPS.View.compileTemplate(e),
            this.compiledTemplate || console.log("WARNING: Template ID " + e + " not found"),
            this.use_root_el = !!t,
            this.rendered_tpl_before = !1
        },
        setTemplateAndUseRootEl: function(e) {
            this.setTemplate(e, !0)
        },
        renderTopOnly: function() {
            var e, t;
            this.compiledTemplate ? "" === (e = $.trim(this.compiledTemplate({}))) || (this.use_root_el ? this.rendered_tpl_before || (t = $($.parseHTML(e)).empty(),
            this.$el.replaceWith(t),
            this.setElement(t),
            this.rendered_tpl_before = !0) : this.rendered_tpl_before = !0) : this.$el.empty()
        },
        renderTemplate: function(e) {
            var t, i;
            this.compiledTemplate ? "" === (t = $.trim(this.compiledTemplate(e))) || (this.use_root_el ? this.rendered_tpl_before ? (this.$el.empty(),
            this.$el.append($($.parseHTML(t)).contents())) : (i = this.$el.html(t).contents(),
            this.$el.replaceWith(i),
            this.setElement(i),
            this.rendered_tpl_before = !0) : (this.$el.html(t),
            this.rendered_tpl_before = !0)) : this.$el.empty()
        }
    },
    Handlebars.registerHelper("SUBVIEWLOC", i),
    Handlebars.registerHelper("subviewloc", i),
    e.SubviewMixin = {
        reorderAtLocation: function(e, i, s) {
            t.initKeyChain(this, ["subviews", e], []);
            var n = this.subviews[e].length;
            if (n) {
                var o = this.subviews[e][n - 1];
                i = _.bind(i, this);
                var a = _.map(this.subviews[e], function(e) {
                    return {
                        cmp: i(e),
                        view: e
                    }
                }, this);
                if (a.sort(function(e, t) {
                    return e.cmp < t.cmp ? -1 : 1
                }),
                this.subviews[e] = _.pluck(a, "view"),
                !s) {
                    var l = this.subviews[e][n - 1];
                    l !== o && o.$el.after(l.$el),
                    _.each(this.subviews[e].slice(0, -1), function(e) {
                        l.$el.before(e.$el)
                    })
                }
            }
        },
        applyToAllAtLocation: function(e, i) {
            t.initKeyChain(this, ["subviews", e], []),
            _.each(this.subviews[e], _.bind(i, this))
        },
        applyToAllSubviews: function(e) {
            t.initKeyChain(this, "subviews"),
            _.each(this.subviews, function(t, i) {
                this.applyToAllAtLocation(i, _.partial(e, i))
            }, this)
        },
        isLocationEmpty: function(e) {
            return t.initKeyChain(this, ["subviews", e], []),
            !this.subviews[e].length
        },
        getLocationList: function() {
            return t.initKeyChain(this, "subviews"),
            _.reject(_.keys(this.subviews), _.bind(this.isLocationEmpty, this))
        },
        clearLocation: function(e, i) {
            t.initKeyChain(this, ["subviews", e], []),
            this.applyToAllAtLocation(e, function(e) {
                i ? e.$el.detach() : this.closeView(e)
            }),
            this.subviews[e] = []
        },
        addSubviewToLocation: function(e, i) {
            i = i || "",
            t.initKeyChain(this, ["subviews", i], []),
            this.subviews[i].push(e)
        },
        detachAllSubviews: function() {
            this.applyToAllSubviews(function(e, t) {
                t.$el.detach()
            })
        },
        renderAllSubviews: function() {
            this.applyToAllSubviews(function(e, t) {
                t.render()
            })
        },
        attachToHandlebarsLocation: function(e, t) {
            var i = this.$('a[data-subviewloc="' + t + '"]');
            i.length && i.first().before(e)
        },
        attachAllSubviews: function() {
            var e = {};
            _.each(this.getLocationList(), function(t) {
                var i = [];
                this.applyToAllAtLocation(t, function(e) {
                    i.push(e.$el)
                }),
                e[t] = i
            }, this),
            _.each(this.getLocationList(), function(t) {
                var i = e[t];
                "" === t ? this.$el.append(i) : "@" === t[0] ? this.attachToHandlebarsLocation(i, t.slice(1)) : this.$(t).append(i)
            }, this)
        },
        removeHandlebarsLocationMarkers: function() {
            this.$("a[data-subviewloc]").remove()
        },
        closeAllSubviews: function() {
            this.applyToAllSubviews(function(e, t) {
                this.closeView(t)
            }),
            this.subviews = {}
        },
        closeView: function(e) {
            e.remove(),
            e.unbind(),
            e.onClose && e.onClose()
        }
    },
    e
}(AoPS.BackboneExtras);
;AoPS.Page = {},
AoPS.Page.loader_html = '<div class="aops-loader"><img src="/assets/images/logo-ludicrous.gif" /></div>',
AoPS.Page.$loader = $($.parseHTML(AoPS.Page.loader_html)),
AoPS.Page.buildLoader = function() {
    return AoPS.Page.$loader.clone()
}
,
AoPS.Page.Model = Backbone.Model.extend({
    initialize: function() {
        this.set("elements", {}),
        this.set("active_elements", []),
        this.set("locations", []),
        this.set("active_locations", [])
    },
    fetchElement: function(e) {
        var t = e.hasOwnProperty("id") ? this.findExistingElement(e.id) : null;
        return _.isUndefined(t) || _.isNull(t) ? t = this.createElement(e) : "backbone" === t.type && (t.dom_element = t.view.$el),
        t
    },
    findExistingElement: function(e) {
        var t = this.get("elements");
        return t.hasOwnProperty(e) ? t[e] : null
    },
    createElement: function(e) {
        var t, i;
        return e.hasOwnProperty("type") && "backbone" !== e.type ? "jQuery_object" === e.type && (e.hasOwnProperty("jQuery_object") || (console.log("You tried to initiate a jQuery_object element without sending the object!"),
        console.log("The id is " + e.id)),
        t = {
            id: e.id,
            dom_element: e.jQuery_object,
            type: "jQuery_object",
            no_save: !!e.no_save,
            onAddToPage: e.hasOwnProperty("onAddToPage") ? e.onAddToPage : function() {}
            ,
            onRemoveFromPage: e.hasOwnProperty("onRemoveFromPage") ? e.onRemoveFromPage : function() {}
        }) : (i = e.constructor(),
        t = {
            id: e.id,
            dom_element: i.$el,
            type: "backbone",
            view: i,
            no_save: !!e.no_save,
            onAddToPage: "function" == typeof i.onAddToPage ? function(e) {
                i.onAddToPage(e)
            }
            : function() {}
            ,
            onRemoveFromPage: "function" == typeof i.onRemoveFromPage ? function() {
                i.onRemoveFromPage()
            }
            : function() {}
        }),
        e.no_save || this.insertElement(t),
        t
    },
    insertElement: function(e) {
        this.get("elements")[e.id] = e
    },
    activateElement: function(e) {
        var t = this.fetchElement(e);
        return this.get("active_elements").push(t),
        t
    },
    fetchLocation: function(e) {
        var t = _.find(this.get("locations"), function(t) {
            return t.id === e
        });
        return _.isUndefined(t) && (t = this.createLocation(e)),
        t
    },
    createLocation: function(e) {
        var t = {
            id: e,
            dom_element: $($.parseHTML('<div id="' + e + '"></div>')),
            is_active: !1
        };
        return this.get("locations").push(t),
        t
    },
    activateLocation: function(e) {
        e.is_active = !0,
        this.get("active_locations").push(e)
    },
    clearActiveArrays: function() {
        this.set("active_elements", []),
        this.set("active_locations", [])
    }
}),
AoPS.Page.View = Backbone.View.extend({
    classes: [],
    $breadcrumbs_wrapper: $("#breadcrumbs-wrapper"),
    $breadcrumbs_bar: $("#breadcrumbs .crumb-wrapper"),
    initialize: function() {
        this.$subheader = $("#subheader"),
        0 === this.$subheader.length && (this.$subheader = $('<div id="subheader"></div>').css({
            width: "100%",
            "text-align": "center"
        }),
        $("#header").after(this.$subheader)),
        this.$error_window = $("#page_error_window"),
        0 === this.$error_window.length && (this.$error_window = $('<div id="page_error_window"></div>').css({
            width: "100%",
            "text-align": "left"
        })),
        this.$loader = AoPS.Page.buildLoader()
    },
    findActiveElement: function(e) {
        return _.find(this.model.get("active_elements"), function(t) {
            return t.id === e
        })
    },
    showElement: function(e) {
        var t, i = this.model.activateElement(e);
        return e.hasOwnProperty("location") ? "subheader" === e.location ? this.$subheader.append(i.dom_element) : ((t = this.model.fetchLocation(e.location)).is_active || (this.model.activateLocation(t),
        this.$el.append(t.dom_element)),
        t.dom_element.append(i.dom_element)) : this.$el.append(i.dom_element),
        i.dom_element.trigger("added_to_page", e.hasOwnProperty("on_add_settings") ? e.on_add_settings : {}),
        i.onAddToPage(e.hasOwnProperty("on_add_settings") ? e.on_add_settings : {}),
        _.clone(i)
    },
    showElements: function(e) {
        var t = [];
        return _.each(e, _.bind(function(e) {
            t.push(this.showElement(e))
        }, this)),
        t
    },
    hideElement: function(e) {
        e && (e.dom_element.detach(),
        "backbone" === e.type && e.view.$el.detach(),
        e.onRemoveFromPage(),
        e.no_save && "backbone" === e.type && e.view.close && e.view.close())
    },
    clearPage: function(e) {
        var t = 0 === arguments.length ? {
            remove_all: !0,
            remove_classes: !0
        } : e;
        AoPS.Ui.Modal.closeAllModals(),
        this.hideLoader(),
        t.remove_classes && this.clearClasses(),
        t.remove_all && (_.each(this.model.get("active_elements"), this.hideElement, this),
        _.each(this.model.get("active_locations"), function(e) {
            e.is_active = !1,
            e.dom_element.detach()
        }),
        this.model.clearActiveArrays()),
        this.showBreadcrumbs()
    },
    removeElement: function(e) {
        var t;
        0 !== e.length && (t = this.model.findExistingElement(e),
        this.hideElement(t),
        this.model.set("active_elements", _.without(this.model.get("active_elements"), t)))
    },
    forgetElement: function(e) {
        var t;
        0 !== e.length && (t = this.model.findExistingElement(e),
        _.isUndefined(t) || (this.hideElement(t),
        this.model.set("active_elements", _.without(this.model.get("active_elements"), t)),
        this.model.set("elements", _.without(this.model.get("elements"), t))))
    },
    addClass: function(e) {
        this.$el.addClass(e),
        this.classes.push(e)
    },
    removeClass: function(e) {
        this.$el.removeClass(e),
        this.classes = _.without(this.classes, e)
    },
    setClass: function(e) {
        this.clearClasses(),
        this.addClass(e)
    },
    clearClasses: function() {
        _.each(this.classes, _.bind(function(e) {
            this.$el.removeClass(e)
        }, this)),
        this.classes = []
    },
    throwError: function(e) {
        var t;
        switch (this.clearPage(),
        e.error_type) {
        case "unregistered":
            t = "You must be signed in to view this page.";
            break;
        case "custom":
            t = e.error_msg
        }
        this.$error_window.html(t),
        this.showElement({
            id: "page-error-window-" + this.cid,
            type: "jQuery_object",
            jQuery_object: this.$error_window
        })
    },
    hideBreadcrumbs: function() {
        this.$breadcrumbs_wrapper.hide()
    },
    showBreadcrumbs: function() {
        this.$breadcrumbs_wrapper.show()
    },
    showLoader: function() {
        this.$loader.is(":visible") || this.$el.append(this.$loader)
    },
    hideLoader: function() {
        this.$loader.detach()
    },
    setBreadcrumbs: function(e, t) {
        var i = _.map(e || [], function(e, i) {
            var n = e.text
              , o = e.no_stay ? "" : " " + (t || "data-stay");
            return e.url && (n = '<a href="' + e.url + '"' + o + ">" + n + "</a>"),
            '<span class="crumb crumb-' + (i + 1) + '">' + n + "</span>"
        });
        this.$breadcrumbs_bar.html($.parseHTML(i.join(' <i class="aops-font aops-angle-double-right"></i> ')))
    },
    setTitle: function(e) {
        document.title = e
    }
}),
AoPS.Page.setBreadcrumbs = function(e, t) {
    var i = _.map(e || [], function(e, i) {
        var n = e.text
          , o = e.no_stay ? "" : " " + (t || "data-stay");
        return e.url && (n = "<a " + (e.hasOwnProperty("data") ? e.data : "") + ' href="' + e.url + '"' + o + ">" + n + "</a>"),
        '<span class="crumb crumb-' + (i + 1) + '">' + n + "</span>"
    });
    $("#breadcrumbs .crumb-wrapper").html($.parseHTML(i.join(' <i class="aops-font aops-angle-double-right"></i> ')))
}
,
AoPS.Page.showBreadcrumbs = function() {
    $("#breadcrumbs-wrapper").show()
}
,
AoPS.Page.hideBreadcrumbs = function() {
    $("#breadcrumbs-wrapper").hide()
}
,
AoPS.Page.constructPage = function(e) {
    return new AoPS.Page.View({
        model: new AoPS.Page.Model,
        id: e
    })
}
;
;AoPS.AskAoPS = AoPS.AskAops = {
    display: function(a) {
        var s = ['<div class="aops-modal-body clearfix askaops">', '<div class="askaops-categories">', "<h1>Ask AoPS</h1>", "<strong>I have a question about:</strong><br>", '<div style="padding-left:10px;padding-top:10px;line-height:2em;">', '<label><input type="radio" name="askaops-category" value="general" checked="checked"> General Information</label>', '<label><input type="radio" name="askaops-category" value="book"> Book Recommendations</label>', '<label><input type="radio" name="askaops-category" value="class"> Class Recommendations</label>', '<label><input type="radio" name="askaops-category" value="order"> Order Information</label>', '<label><input type="radio" name="askaops-category" value="myclass"> My Current Class</label>', '<label><input type="radio" name="askaops-category" value="technical"> Technical Support</label>', '<label><input type="radio" name="askaops-category" value="other"> Other</label>', "</div>", "</div>", '<div class="askaops-form">', '<div id="askaops-blurb">Have a general question about Art of Problem Solving? Let us know below.</div>', '<div data-hj-suppress="" data-hj-masked="" id="askaops-error" class="error-box"></div>', '<input data-hj-suppress="" data-hj-masked="" id="askaops-subject" class="form-control" placeholder="Message Subject">', '<input data-hj-suppress="" data-hj-masked="" id="askaops-ordernumber" class="askaops-ordernumber form-control" placeholder="Order number - if known">', '<input data-hj-suppress="" data-hj-masked="" id="askaops-course" class="askaops-course form-control" placeholder="Class name and id - if known">', '<textarea data-hj-suppress="" data-hj-masked="" id="askaops-message" class="form-control"  style="margin-top:10px;height:100px;" placeholder="How can we help you?"></textarea>', '<input data-hj-suppress="" data-hj-masked="" id="askaops-username" class="askaops-username form-control" placeholder="AoPS Username - if known">', '<input data-hj-suppress="" data-hj-masked="" id="askaops-name" style="margin-top:10px" class="form-control" placeholder="Your name">', '<input data-hj-suppress="" data-hj-masked="" id="askaops-email" style="margin-top:10px" class="form-control" placeholder="Your email address">', '<div style="text-align:right">', '<input id="askaops-submit" style="margin-top:10px" type="submit" class="btn-lg btn btn-primary" value="Submit your message">', "</div>", "</div>", "</div>"];
        s = s.join("\n"),
        AoPS.Ui.Modal.showPlain({
            body: s,
            width: "75%",
            onClose: this.onClose,
            scrollable: !1,
            frame_class: "askaops-modal"
        }),
        void 0 !== a && setTimeout(function() {
            "class" === a ? ($(".askaops input[name='askaops-category'][value=class]").prop("checked", !0),
            AoPS.AskAoPS.onChange()) : "book" === a && ($(".askaops input[name='askaops-category'][value=book]").prop("checked", !0),
            AoPS.AskAoPS.onChange())
        }, 1),
        this.onShow()
    },
    onChange: function(a) {
        var s = $(".askaops input[name='askaops-category']:checked").val()
          , o = ["Have a general question about Art of Problem Solving?", "Let us know below."].join(" ")
          , e = ["Please tell us about your student's math background, including", "their grade level, recent math classes, and contest experience", "(if any), as well as your goals for choosing books. You can also", "find suggestions on our ", '<a href="/store/recommendations">Recommendations page</a>.'].join(" ")
          , r = ["Please tell us about your student's math background, including", "their grade level, recent math classes, and contest experience", "(if any), as well as your goals for choosing a course. You can", "also find suggestions on our", '<a href="/school/recommendations">Recommendations page</a>.', "Visit <a href=http://www.artofproblemsolving.com/school/how-school-works/faqs>", "Frequently Asked Questions</a> for quick answers to common class questions."].join(" ")
          , n = ["Have a question about an order? Let us know below."].join(" ")
          , t = ["Have a question about your current class? Let us know below.", 'Visit <a href="/school/how-school-works/faqs">Frequently Asked Questions</a>', "for quick answers to common class questions.", "<p>Specific questions about homework problems or assignments", "should be posted to your course's message board.", "Extension requests can be made from your class homepage.</p>"].join(" ");
        switch ($("#askaops-username").hide(),
        $("#askaops-ordernumber").hide(),
        $("#askaops-course").hide(),
        s) {
        case "general":
            $("#askaops-blurb").html(o);
            break;
        case "book":
            $("#askaops-blurb").html(e);
            break;
        case "class":
            $("#askaops-blurb").html(r);
            break;
        case "order":
            $("#askaops-blurb").html(n),
            $("#askaops-ordernumber").show();
            break;
        case "myclass":
            $("#askaops-blurb").html(t),
            $("#askaops-username").show(),
            $("#askaops-course").show();
            break;
        case "technical":
            $("#askaops-username").show(),
            $("#askaops-blurb").html(["Please include a detailed description of the error or issue you ", "are experiencing."]);
            break;
        case "other":
            $("#askaops-blurb").html("")
        }
    },
    onSubmit: function() {
        $("#askaops-submit").off("click", AoPS.AskAoPS.onSubmit);
        var a = $(".askaops input[name='askaops-category']:checked").val();
        $.post("/m/contact/ajax.php", {
            action: "email",
            type: a,
            username: $("#askaops-username").val(),
            email: $("#askaops-email").val(),
            name: $("#askaops-name").val(),
            subject: $("#askaops-subject").val(),
            message: $("#askaops-message").val(),
            orderid: $("#askaops-ordernumber").val(),
            course: $("#askaops-course").val(),
            url: window.location.href
        }, function(a) {
            if (a.error_msg)
                $("#askaops-error").html(a.error_msg).show(),
                $("#askaops-submit").on("click", AoPS.AskAoPS.onSubmit);
            else {
                AoPS.Ui.Modal.closeTopModal();
                AoPS.Ui.Modal.showAlertQuick(["<p>Thank you. We have received your comment or question.</p>", "<p>One of our staff members will respond to you within two", "business days.</p>"].join(" "))
            }
        })
    },
    onShow: function() {
        $(".askaops input[name='askaops-category']").on("change", this.onChange),
        $("#askaops-submit").on("click", this.onSubmit)
    },
    onClose: function() {
        $(".askaops input[name='askaops-category']").off("change", this.onChange),
        $("#askaops-submit").off("click", this.onSubmit)
    }
};
;//# sourceMappingURL=aops_core.js.map
