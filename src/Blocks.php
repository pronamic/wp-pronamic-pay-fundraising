<?php
/**
 * Editor Blocks.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

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
		// Register crowdfunding ring script.
		wp_register_script(
			'pronamic-crowdfunding-ring-editor',
			plugins_url( '/js/dist/block-crowdfunding-ring.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		wp_register_script(
			'pronamic-progress-editor',
			plugins_url( '/js/dist/block-progress.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		wp_register_script(
			'pronamic-crowdfunding-details-editor',
			plugins_url( '/js/dist/block-crowdfunding-details.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		wp_localize_script(
			'pronamic-crowdfunding-ring-editor',
			'pronamic_crowdfunding_ring',
			array(
				'title'               => __( 'Crowdfunding Ring', 'pronamic-pay-crowdfunding' ),
				'label_target'        => __( 'Target amount', 'pronamic_ideal' ),
				'label_raised'        => __( 'Raised amount', 'pronamic_ideal' ),
				'label_contributions' => __( 'Number of contributions', 'pronamic_ideal' ),
				'label_color'         => __( 'Color', 'pronamic_ideal' ),
			)
		);
	}

	/**
	 * Register styles.
	 *
	 * @return void
	 */
	public function register_styles() {
		$min = SCRIPT_DEBUG ? '' : '.min';

		wp_register_style(
			'pronamic-pay-crowdfunding',
			plugins_url( '/css/crowdfunding' . $min . '.css', $this->plugin->file ),
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
		register_block_type(
			'pronamic-pay/crowdfunding-ring',
			array(
				'editor_script' => 'pronamic-crowdfunding-ring-editor',
				'style'         => 'pronamic-pay-crowdfunding',
				'attributes'    => array(
					'target'        => array(
						'type'    => 'string',
						'default' => '0',
					),
					'raised'        => array(
						'type'    => 'string',
						'default' => '0',
					),
					'contributions' => array(
						'type'    => 'integer',
						'default' => 0,
					),
					'color'         => array(
						'type'    => 'string',
						'default' => '#f9461c',
					),
				),
			)
		);

		register_block_type(
			'pronamic-pay/progress',
			array(
				'editor_script'   => 'pronamic-progress-editor',
				'attributes'      => array(
					'value'        => array(
						'type'    => 'integer',
						'default' => 0,
					),
				),
			)
		);

		register_block_type(
			'pronamic-pay/crowdfunding-details',
			array(
				'editor_script'   => 'pronamic-crowdfunding-details-editor',
				'attributes'      => array(
					'list'        => array(
						'type'    => 'array',
						'default' => array(),
					),
				),
			)
		);
	}

	/**
	 * Enqueue styles.
	 *
	 * @return void
	 */
	public function enqueue_styles() {
		\wp_enqueue_style( 'pronamic-pay-crowdfunding' );
	}
}
