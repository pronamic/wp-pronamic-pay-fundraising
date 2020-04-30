<?php
/**
 * Crowdfunding Add-on.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

/**
 * Addon.
 *
 * @author  Reüel van der Steege
 * @since   1.0.0
 * @version 1.0.0
 */
class Addon {
	/**
	 * Instance.
	 *
	 * @var Addon|null
	 */
	protected static $instance;

	/**
	 * Instance.
	 *
	 * @param string|array|object $args The add-on arguments.
	 *
	 * @return Plugin
	 */
	public static function instance( $args = array() ) {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self( $args );
		}

		return self::$instance;
	}

	/**
	 * The root file of this WordPress plugin.
	 *
	 * @var string
	 */
	public $file;

	/**
	 * Version.
	 *
	 * @var string
	 */
	public $version = '';

	/**
	 * Blocks.
	 *
	 * @var Blocks
	 */
	private $blocks;

	/**
	 * Add-on constructor.
	 *
	 * @param array $args Arguments.
	 */
	public function __construct( $args = array() ) {
		$args = wp_parse_args(
			$args,
			array(
				'file'    => null,
				'options' => array(),
			)
		);

		$this->file = $args['file'];

		// Version from plugin file header.
		if ( null !== $args['file'] ) {
			$file_data = get_file_data( $this->file, array( 'Version' => 'Version' ) );

			if ( \array_key_exists( 'Version', $file_data ) ) {
				$this->version = $file_data['Version'];
			}
		}

		// Actions.
		$plugins_loaded_function = array( $this, 'plugins_loaded' );

		if ( ! \has_action( 'plugins_loaded', $plugins_loaded_function ) ) {
			\add_action( 'plugins_loaded', $plugins_loaded_function );
		}
	}

	/**
	 * Plugins loaded.
	 *
	 * @link https://developer.wordpress.org/reference/hooks/plugins_loaded/
	 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
	 * @return void
	 */
	public function plugins_loaded() {
		if ( ! \function_exists( '\pronamic_pay_plugin' ) ) {
			// @todo Add admin notice if Pronamic Pay is not active.
			return;
		}

		if ( ! \function_exists( '\register_block_type' ) ) {
			// @todo Add admin notice if blocks can not be registered.
			return;
		}

		// Blocks.
		$this->blocks = new Blocks( $this );
		$this->blocks->setup();
	}
}
