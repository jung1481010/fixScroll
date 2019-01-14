/*
 * FixScroll
 *
 * Copyright (c) 2019 Justin
 * MIT license
 * example  $('css selector').fixScroll();
 */
(function($) {
    $.FixScroll = function(el, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;

        var oldClientY = null;

        function touchstartHandler(e) {
            if (e.targetTouches.length === 1) {
                //detect touch
                oldClientY = e.targetTouches[0].clientY;
            }
        }

        function touchmoveHandler(e) {
            if (e.targetTouches.length === 1) {
                //detect touch
                scrollHandler(e);
            }
        }

        function scrollHandler(e) {
            var clientY = e.targetTouches[0].clientY - oldClientY;

            if (base.el.scrollTop === 0 && clientY > 0) {
                // element is at the top of its scroll

                e.preventDefault();
            }

            if (isEnd() && clientY < 0) {
                //element is at the bottom of its scroll

                e.preventDefault();
            }
        }

        function isEnd() {
            return base.el.scrollHeight - base.el.scrollTop <= base.el.clientHeight;
        }

        base.init = function() {
            base.el.addEventListener('touchstart',touchstartHandler,false);
            base.el.addEventListener('touchmove',touchmoveHandler,false);
        };

        base.init();
    };

    $.fn.fixScroll = function() {
        return this.each(function() {
            (new $.FixScroll(this));
        });
    };
})(jQuery);