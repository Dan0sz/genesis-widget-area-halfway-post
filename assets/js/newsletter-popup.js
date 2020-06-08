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

            setTimeout(this.show_popup, 30000);
            $('.' + this.class_name).on('click', '.' + this.close_button, this.close_popup);
        },

        /**
         *
         */
        create_popup: function () {
            if ($('.' + newsletter_popup.class_name).length > 0) {
                return;
            }

            $clone = newsletter_popup.$widget.parent().clone();
            $clone.addClass(newsletter_popup.class_name);
            $clone.css('width', newsletter_popup.$widget.parent().outerWidth());
            $clone.appendTo('body');

            $clone.append('<span class="' + newsletter_popup.close_button + '"></span>');
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