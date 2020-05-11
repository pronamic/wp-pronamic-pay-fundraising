<?php
/**
 * Plugin Name: Pronamic Pay Crowdfunding Add-On
 * Plugin URI: https://www.pronamic.eu/plugins/pronamic-pay-crowdfunding/
 * Description: Extend the Pronamic Pay plugin with blocks for crowdfunding.
 *
 * Version: 1.0.0
 * Requires at least: 4.7
 *
 * Author: Pronamic
 * Author URI: https://www.pronamic.eu/
 *
 * Text Domain: pronamic-pay-crowdfunding
 * Domain Path: /languages/
 *
 * License: GPL-3.0-or-later
 *
 * Depends: wp-pay/core
 *
 * GitHub URI: https://github.com/wp-pay/crowdfunding
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay\Crowdfunding
 */

/**
 * Autoload.
 */
require __DIR__ . '/vendor/autoload.php';

/**
 * Bootstrap.
 */
\Pronamic\WordPress\Pay\Crowdfunding\Addon::instance(
	array(
		'file' => __FILE__,
	)
);
