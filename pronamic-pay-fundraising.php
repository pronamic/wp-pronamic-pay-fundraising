<?php
/**
 * Plugin Name: Pronamic Pay Fundraising Add-On
 * Plugin URI: https://www.pronamic.eu/plugins/pronamic-pay-fundraising/
 * Description: Extend the Pronamic Pay plugin with fundraising blocks.
 *
 * Version: 3.1.0
 * Requires at least: 5.5
 * Requires PHP: 8.0
 *
 * Author: Pronamic
 * Author URI: https://www.pronamic.eu/
 *
 * Text Domain: pronamic-pay-fundraising
 * Domain Path: /languages/
 *
 * License: GPL-3.0-or-later
 *
 * Requires Plugins: pronamic-ideal
 * Depends: wp-pay/core
 *
 * Update URI: https://www.pronamic.eu/plugins/pronamic-pay-fundraising/
 * GitHub URI: https://github.com/pronamic/wp-pronamic-pay-fundraising
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2023 Pronamic
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
	[
		'file' => __FILE__,
	]
);
