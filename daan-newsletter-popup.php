<?php
/**
 * @formatter:off
 * Plugin Name: Daan's Newsletter Popup
 * Plugin URI: https://github.com/Dan0sz/newsletter-popup
 * Description: Show a newsletter subscription box when a visitor reaches halfway the content. Simple, but effective.
 * Version: 1.0.0
 * Author: Daan van den Bergh
 * Author URI: https://daan.dev
 * Text Domain: daan-newsletter-popup
 * @formatter:on
 */

defined('ABSPATH') || exit;

/**
 * Define constants.
 */
define('DAAN_NEWSLETTER_POPUP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DAAN_NEWSLETTER_POPUP_PLUGIN_FILE', __FILE__);
define('DAAN_NEWSLETTER_POPUP_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('DAAN_NEWSLETTER_POPUP_STATIC_VERSION', '1.0.0');

/**
 * Takes care of loading classes on demand.
 *
 * @param $class
 *
 * @return mixed|void
 */
function daan_newsletter_popup_autoload($class)
{
    $path = explode('_', $class);

    if ($path[0] != 'NewsletterPopup') {
        return;
    }

    $filename = '';

    if (count($path) == 1) {
        $parts = preg_split('/(?=[A-Z])/', lcfirst($path[0]));

        $filename = 'class-' . strtolower(implode('-', $parts)) . '.php';
    } else {
        array_shift($path);
        end($path);
        $i = 0;

        while ($i < key($path)) {
            $filename .= strtolower($path[$i]) . '/';
            $i++;
        }

        $pieces = preg_split('/(?=[A-Z])/', lcfirst($path[$i]));

        $filename .= 'class-' . strtolower(implode('-', $pieces)) . '.php';
    }

    return include DAAN_NEWSLETTER_POPUP_PLUGIN_DIR . 'includes/' . $filename;
}

spl_autoload_register('daan_newsletter_popup_autoload');

/**
 * @return NewsletterPopup
 */
function daan_newsletter_popup_init()
{
    static $newsletter_popup = null;

    if ($newsletter_popup === null) {
        $newsletter_popup = new NewsletterPopup();
    }

    return $newsletter_popup;
}

daan_newsletter_popup_init();
