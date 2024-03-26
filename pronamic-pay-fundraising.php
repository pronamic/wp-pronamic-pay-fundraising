<?php
/**
 * Plugin Name: Pronamic Pay Fundraising Add-On
 * Plugin URI: https://www.pronamic.eu/plugins/pronamic-pay-fundraising/
 * Description: Extend the Pronamic Pay plugin with fundraising blocks.
 *
 * Version: 3.2.5
 * Requires at least: 5.5
 * Requires PHP: 7.4
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

/**
 * Autoload.
 */
require_once __DIR__ . '/vendor/autoload_packages.php';

/**
 * Bootstrap.
 */
\Pronamic\WordPress\Pay\Fundraising\Addon::instance(
	[
		'file' => __FILE__,
	]
);
