<?php
/**
 * Plugin Name: Pronamic Pay Fundraising Add-On
 * Plugin URI: https://www.pronamic.eu/plugins/pronamic-pay-fundraising/
 * Description: Extend the Pronamic Pay plugin with fundraising blocks.
 *
 * Version: 1.0.0
 * Requires at least: 4.7
 *
 * Author: Pronamic
 * Author URI: https://www.pronamic.eu/
 *
 * Text Domain: pronamic-pay-fundraising
 * Domain Path: /languages/
 *
 * License: GPL-3.0-or-later
 *
 * Depends: wp-pay/core
 *
 * GitHub URI: https://github.com/wp-pay/fundraising
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay\Fundraising
 */

if ( ! class_exists( '\Pronamic\WordPress\Pay\Fundraising\Addon' ) ) {
	return;
}

/**
 * Bootstrap.
 */
\Pronamic\WordPress\Pay\Fundraising\Addon::instance(
	array(
		'file' => __FILE__,
	)
);
