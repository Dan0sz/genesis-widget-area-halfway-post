/* * * * * * * * * * * * * * * * * * * * *
 * @package  : newsletter-popup
 * @author   : Daan van den Bergh
 * @copyright: (c) 2020 Daan van den Bergh
 * @url      : https://daan.dev
 * * * * * * * * * * * * * * * * * * * * */

jQuery(document).ready(function ($) {
    var newsletter_popup = {
        class_name: 'newsletter-popup',
        close_button: 'close',
        cookies: Cookies.noConflict(),
        cookie_name: 'newsletter_popup_closed',
        closed: false,

        // Selectors
        $document_height: $(document).height(),
        $widget: $('.enews-widget'),
        $close: $('.newsletter-popup .close'),

        /**
         *
         */
        init: function () {
            this.create_popup();

            $(window).on('scroll', this.detect_position);
            $('.' + this.class_name).on('click', '.' + this.close_button, this.close_popup);
        },

        /**
         *
         */
        create_popup: function () {
            if ($('.' + newsletter_popup.class_name).length > 0) {
                return;
            }

            $clone = newsletter_popup.$widget.clone();
            $clone.addClass(newsletter_popup.class_name);
            $clone.css('width', newsletter_popup.$widget.width());
            $clone.appendTo('body');

            $clone.append('<span class="' + newsletter_popup.close_button + '"></span>');
        },

        /**
         *
         */
        detect_position: function () {
            if ($('.' + newsletter_popup.class_name).is(':visible')) {
                return;
            }

            // If cookie is set, return.
            if (newsletter_popup.cookies.get(newsletter_popup.cookie_name)) {
                return;
            }

            scroll_top = $(window).scrollTop();

            // Show pop-up around the middle of the document, not after the middle.
            if (scroll_top > newsletter_popup.$document_height / 2.5 && scroll_top < newsletter_popup.$document_height / 2 && newsletter_popup.closed === false) {
                newsletter_popup.show_popup();
            }
        },

        /**
         *
         */
        show_popup: function() {
            $('.' + newsletter_popup.class_name).fadeIn();
        },

        /**
         *
         */
        close_popup: function() {
            newsletter_popup.closed = true;
            newsletter_popup.cookies.set(newsletter_popup.cookie_name, 'true', { 'expires': 30, 'sameSite': 'strict' });
            $('.' + newsletter_popup.class_name).fadeOut();
        }
    };

    newsletter_popup.init();
});