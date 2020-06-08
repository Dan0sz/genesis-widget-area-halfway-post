<?php
/* * * * * * * * * * * * * * * * * * * * *
 * @package  : newsletter-popup
 * @author   : Daan van den Bergh
 * @copyright: (c) 2020 Daan van den Bergh
 * @url      : https://daan.dev
 * * * * * * * * * * * * * * * * * * * * */

class NewsletterPopup
{
    private $handle = 'daan-newsletter-popup';

    public function __construct()
    {
        $this->init();
    }

    private function init()
    {
        if (!is_admin() && is_single() && get_post_type() == 'post') {
            $this->enqueue_admin_scripts();
        }
    }

    public function enqueue_admin_scripts()
    {
        wp_enqueue_script($this->handle, plugin_dir_url(DAAN_NEWSLETTER_POPUP_PLUGIN_FILE) . 'assets/js/newsletter-popup.js', [ 'jquery' ], DAAN_NEWSLETTER_POPUP_STATIC_VERSION, true);
        wp_enqueue_script('newsletter-popup-cookie-lib', plugin_dir_url(DAAN_NEWSLETTER_POPUP_PLUGIN_FILE) . 'assets/js/lib/js-cookie.min.js', [ 'jquery' ], DAAN_NEWSLETTER_POPUP_STATIC_VERSION, true);
        wp_enqueue_style($this->handle, plugin_dir_url(DAAN_NEWSLETTER_POPUP_PLUGIN_FILE). 'assets/css/newsletter-popup.min.css', [], DAAN_NEWSLETTER_POPUP_STATIC_VERSION);
    }
}
