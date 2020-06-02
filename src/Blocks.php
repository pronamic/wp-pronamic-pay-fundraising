<?php
/**
 * Editor Blocks.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

/**
 * Blocks
 *
 * @author  Reüel van der Steege
 * @since   2.2.6
 * @version 2.1.7
 */
class Blocks {
	/**
	 * Add-on plugin.
	 *
	 * @var Addon
	 */
	private $plugin;

	/**
	 * Constructor.
	 *
	 * @param Addon $plugin Add-on plugin.
	 */
	public function __construct( Addon $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Setup.
	 *
	 * @return void
	 */
	public function setup() {
		// Initialize.
		add_action( 'init', array( $this, 'register_scripts' ) );
		add_action( 'init', array( $this, 'register_styles' ) );
		add_action( 'init', array( $this, 'register_block_types' ) );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_styles' ) );
	}

	/**
	 * Register blocks.
	 *
	 * @return void
	 */
	public function register_scripts() {
		$asset_file = include( plugin_dir_path( $this->plugin->file ) . 'js/dist/index.asset.php' );

		wp_register_script(
			'pronamic-pay-fundraising-blocks',
			plugins_url( 'js/dist/index.js', $this->plugin->file ),
			$asset_file['dependencies'],
			$asset_file['version']
		);

		// Script translations.
		wp_set_script_translations( 'pronamic-pay-fundraising-blocks', 'pronamic-pay-fundraising', plugin_dir_path( $this->plugin->file ) . 'languages' );
	}

	/**
	 * Register styles.
	 *
	 * @return void
	 */
	public function register_styles() {
		$min = SCRIPT_DEBUG ? '' : '.min';

		wp_register_style(
			'pronamic-pay-fundraising',
			plugins_url( '/css/fundraising' . $min . '.css', $this->plugin->file ),
			array(),
			$this->plugin->version
		);
	}

	/**
	 * Register block types.
	 *
	 * @return void
	 */
	public function register_block_types() {
		// Blocks.
		$attributes = array(
			'raisedLabel'        => array(
				'type' => 'string',
			),
			'raisedAmount'       => array(
				'type'    => 'string',
				'default' => '0',
			),
			'targetLabel'        => array(
				'type' => 'string',
			),
			'targetAmount'       => array(
				'type'    => 'string',
				'default' => '0',
			),
			'contributionsLabel' => array(
				'type' => 'string',
			),
			'contributionsValue' => array(
				'type'    => 'string',
				'default' => '0',
			),
			"currencyCode"       => array(
				'type' => 'string',
			),
			"currencyDecimals"   => array(
				'type'    => 'string',
				'default' => '2',
			),
			"locale"             => array(
				'type'    => 'string',
				'default' => str_replace( '_', '-', \get_locale() ),
			),
			'color'              => array(
				'type'    => 'string',
				'default' => '#f9461c',
			),
		);

		$args = array(
			'editor_script' => 'pronamic-pay-fundraising-blocks',
			'style'         => 'pronamic-pay-fundraising',
			'attributes'    => $attributes,
		);

		// Fundraising Progress Circle block.
		$args['render_callback'] = function ( $attributes, $content ) {
			ob_start();

			include __DIR__ . '/../templates/block-fundraising-progress-circle.php';

			return ob_get_clean();
		};

		register_block_type( 'pronamic-pay/fundraising-progress-circle', $args );

		// Fundraising Progress Bar block.
		$args['render_callback'] = function ( $attributes, $content ) {
			ob_start();

			include __DIR__ . '/../templates/block-fundraising-progress-bar.php';

			return ob_get_clean();
		};

		register_block_type( 'pronamic-pay/fundraising-progress-bar', $args );

		// Fundraising Progress Text block.
		$args['render_callback'] = function ( $attributes, $content ) {
			ob_start();

			include __DIR__ . '/../templates/block-fundraising-progress-text.php';

			return ob_get_clean();
		};

		register_block_type( 'pronamic-pay/fundraising-progress-text', $args );
	}

	/**
	 * Enqueue styles.
	 *
	 * @return void
	 */
	public function enqueue_styles() {
		\wp_enqueue_style( 'pronamic-pay-fundraising' );
	}
}
