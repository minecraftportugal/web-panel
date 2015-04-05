/* Constructor: creates a new Widget instance */


App.Desktop = (function() {

    var Desktop = {};


    Desktop.widgets = [];

    Desktop.Defaults = {};

    /* Defaults */


    /* Settings */
    Desktop.settings = {
        "saveOnExit": true
    };

    /* * * * Static Methods * * * /
     /*
     * Desktop.count
     */
    Desktop.getWidgetSerialNumber = function () {

        if (Desktop.counter === undefined) {
            Desktop.counter = 1;
        } else {
            Desktop.counter += 1;
        }

        return Desktop.counter;
    };

    Desktop.serializeState = function () {

        var widgets = [];

        if (Desktop.widgets === undefined) {
            Desktop.widgets = [];
        }

        $.each(Desktop.widgets, function (n, widget) {

            /* Don't save modal widgets */
            if (widget.options.modal) {
                widget.close();
                return true;
            }

            widget.pushState();

            var object = {

                options: widget.options,

                states: widget.states

            };

            widgets.push(object);
        });


        var serializedObject = JSON.stringify(widgets, function (name, value) {
            return value;
        });

        return serializedObject;

    };

    Desktop.saveState = function () {

        var serializedObject = Desktop.serializeState();
        var base64Object = btoa(serializedObject);
        localStorage.setItem("widgetState", base64Object);

    };

    Desktop.loadState = function () {

        var base64Object = localStorage.getItem("widgetState");
        if ((base64Object === undefined) || (base64Object === null)) {
            return false;
        }

        var serializedObject = atob(base64Object); //base64Object; // atob(base64Object);
        var object = [];
        try {
            object = JSON.parse(serializedObject);
        } catch (e) {
            console.log("Couldn't load widget states from localStorage")
        }


        $.each(object, function (n, object) {

            var createdWidget = new Desktop.Widget(object.options, object.states);
            createdWidget.popState();

        });

        return true;
    };

    Desktop.loadFixedState = function (name) {

        var object = App.Desktop.Defaults.fixedStates[name];

        $.each(object, function (n, object) {
            var createdWidget = new Desktop.Widget(object.options, object.states);
            createdWidget.popState();
        });

    };

    Desktop.clearState = function () {
        Desktop.settings.saveOnExit = false;
        localStorage.clear();
        window.location.reload();
    };

    Desktop.closeAll = function () {

        var toClose = [];

        $.each(Desktop.widgets, function (n, widget) {
            if (!widget.options.modal && !widget.options.pinned) {
                toClose.push(widget);
            }
        });

        $.each(toClose, function (n, widget) {
            widget.close();
        });
    };

    Desktop.cascade = function () {
        Desktop.counter = 0;
        $("div.widget").css("z-index", "0"); // reset all z-index. so pq posso.
        $.each(Desktop.widgets, function (n, e) {
            Desktop.counter += 1;
            e.shrink();
            e.initPosition();
            e.bringTop();
        });
    };

    Desktop.tile = function () {
        var wLeft = 0;
        var wTop = 0;
        $.each(Desktop.widgets, function (n, e) {
            e.shrink();
            $(e.selector).css("left", wLeft + "px");
            $(e.selector).css("top", wTop + "px");
            e.bringTop();

            wLeft = wLeft + parseInt($(e.selector).css("width"));

            var $container = $("div#widget-container");
            if (wLeft > $container.width()) {
                wTop = wTop + parseInt($(e.selector).css("height"));
                wLeft = 0;

                if (wTop > $container.height()) {
                    wTop = 0;
                }
            }
        });
    };

    Desktop.embiggen = function () {
        $.each(Desktop.widgets, function (n, e) {
            e.maximize();
            //e.bringTop();
            //e.setActive();
        });
    };

    Desktop.minimizeAll = function () {
        $.each(Desktop.widgets, function (n, widget) {
            widget.minimize();
        });
    };

    Desktop.getWidgetByName = function (name) {

        var widget;

        $.each(Desktop.widgets, function (n, e) {

            if (e.options.name == name) {

                widget = e;
                return false;
            }
            return true;
        });

        return widget;

    };

    Desktop.open = function (param) {

        var createdWidget;

        if (typeof(param) === typeof({})) {

            createdWidget = new Desktop.Widget(param);

        } else if (typeof(param) === typeof("")) {

            if (param in App.Desktop.Defaults.fixedWidgets) {

                var config = App.Desktop.Defaults.fixedWidgets[param];

                createdWidget = new Desktop.Widget(config);

            }

        }


        return createdWidget;
    };

    Desktop.setBackground = function (bg) {

        Desktop.background = bg;

        var $body = $("body");
        $body.css("background-repeat", bg.backgroundRepeat);
        $body.css("background-position", bg.backgroundPosition);
        $body.css("background-attachment", bg.backgroundAttachment);
        $body.css("-webkit-background-size", bg.backgroundSize);
        $body.css("-moz-background-size", bg.backgroundSize);
        $body.css("-o-background-size", bg.backgroundSize);
        $body.css("background-size", bg.backgroundSize);

        //$body.css("background-image", "url(" + image + ")");

        // http://stackoverflow.com/questions/5057990/how-can-i-check-if-a-background-image-is-loaded
        $("<img/>").attr("src", bg.image).load(function () {
            $(this).remove(); // prevent memory leaks as @benweet suggested
            $("body").css("background-image", "url(" + bg.image + ")");

            var loadingDelay = Math.round(Math.random() * 1000);
            var loadingTimeout = setTimeout(function () {
                $("div#loading-blocker").fadeOut(100);
            }, loadingDelay);
        });
    };

    /* DOM event initializations */
    (function() {
        /*
         * Data API - Desktop.open
         * Describe widget to open using data- tags
         */
        $(document).on("click", "[data-widget-action]", function(event) {

            var action = $(this).data("widget-action");
            var name = $(this).data("widget-name");
            var title = $(this).data("widget-title") || name;
            var href = $(this).attr("href");
            var mode = $(this).data("widget-mode");
            var css = $(this).data("widget-css");
            var maximized = $(this).data("widget-maximized") || false;
            var alwaysCreate = $(this).data("widget-always-create") || false;
            var alwaysReload = $(this).data("widget-always-reload") || true;
            var classes = $(this).data("widget-classes") || "widget-not-scrollable";

            switch (action) {

                case "open":
                    Desktop.open({
                        "name" : name,
                        "source" : href,
                        "title" : title,
                        "mode" : mode,
                        "css" : css,
                        "maximized" : maximized,
                        "classes" : classes,
                        "alwaysCreate" : alwaysCreate,
                        "alwaysReload" : alwaysReload
                    });
                    break;

                default:
                    break;

            }

            event.preventDefault();

        });

        /*
         * Data API - Desktop.open
         * Open a widget referencing it by name
         */
        $(document).on("click", "[data-widget-open]", function(event) {

            var name = $(this).data("widget-open");
            var override = $(this).data("widget-open-override");

            if (override !== undefined) {
                //override = JSON.parse(override);
                var params = App.Desktop.Defaults.fixedWidgets[name];
                if (params === undefined) {
                    console.log('No widget named ' + name);
                    return false;
                }
                var newParams = {};
                $.extend(newParams, params);
                $.extend(newParams, override);

                Desktop.open(newParams);
            } else {
                Desktop.open(name);
            }

            event.preventDefault();

        });

        $(window).on("unload", function() {
            if (Desktop.settings.saveOnExit) {
                Desktop.saveState();
            } else {
                Desktop.settings.saveOnExit = true;
            }
        });

        $(function() {

            if (!Desktop.loadState()) {
                Desktop.loadFixedState("basic");
            }

            $("div#widget-button-container").sortable();
        });

    }());

    return Desktop;

})();