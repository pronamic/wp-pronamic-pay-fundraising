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
		// Register scripts.
		wp_register_script(
			'pronamic-crowdfunding-donut-editor',
			plugins_url( '/js/dist/block-crowdfunding-donut.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		wp_register_script(
			'pronamic-crowdfunding-bar-editor',
			plugins_url( '/js/dist/block-crowdfunding-bar.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		wp_register_script(
			'pronamic-crowdfunding-compact-editor',
			plugins_url( '/js/dist/block-crowdfunding-compact.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		wp_register_script(
			'pronamic-crowdfunding-progress-editor',
			plugins_url( '/js/dist/block-crowdfunding-progress.js', $this->plugin->file ),
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

		wp_register_script(
			'pronamic-crowdfunding-remco',
			plugins_url( '/js/dist/block-crowdfunding-remco.js', $this->plugin->file ),
			array( 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element' ),
			$this->plugin->version,
			false
		);

		// Localize scripts.
		wp_localize_script(
			'pronamic-crowdfunding-donut-editor',
			'pronamic_crowdfunding_donut',
			array(
				'title'               => __( 'Crowdfunding Donut', 'pronamic-pay-crowdfunding' ),
				'label_target'        => __( 'Target amount', 'pronamic-pay-crowdfunding' ),
				'label_raised'        => __( 'Raised amount', 'pronamic-pay-crowdfunding' ),
				'label_contributions' => __( 'Number of contributions', 'pronamic-pay-crowdfunding' ),
				'label_color'         => __( 'Color', 'pronamic-pay-crowdfunding' ),
			)
		);

		wp_localize_script(
			'pronamic-crowdfunding-bar-editor',
			'pronamic_crowdfunding_bar',
			array(
				'title'               => __( 'Crowdfunding Bar', 'pronamic-pay-crowdfunding' ),
				'label_target'        => __( 'Target amount', 'pronamic-pay-crowdfunding' ),
				'label_raised'        => __( 'Raised amount', 'pronamic-pay-crowdfunding' ),
				'label_contributions' => __( 'Number of contributions', 'pronamic-pay-crowdfunding' ),
				'label_color'         => __( 'Color', 'pronamic-pay-crowdfunding' ),
			)
		);

		wp_localize_script(
			'pronamic-crowdfunding-compact-editor',
			'pronamic_crowdfunding_compact',
			array(
				'title'               => __( 'Crowdfunding Compact', 'pronamic-pay-crowdfunding' ),
				'label_target'        => __( 'Target amount', 'pronamic-pay-crowdfunding' ),
				'label_raised'        => __( 'Raised amount', 'pronamic-pay-crowdfunding' ),
				'label_contributions' => __( 'Number of contributions', 'pronamic-pay-crowdfunding' ),
				'term_raised'         => __( 'Raised', 'pronamic-pay-crowdfunding' ),
				'term_target'         => __( 'Target', 'pronamic-pay-crowdfunding' ),
				'term_contributions'  => __( 'contributions', 'pronamic-pay-crowdfunding' ),
				'label_color'         => __( 'Color', 'pronamic-pay-crowdfunding' ),
			)
		);

		wp_localize_script(
			'pronamic-crowdfunding-progress-editor',
			'pronamic_crowdfunding_progress',
			array(
				'title'       => __( 'Crowdfunding Progress', 'pronamic-pay-crowdfunding' ),
				'label_donut' => __( 'Donut', 'pronamic-pay-crowdfunding' ),
				'label_bar'   => __( 'Bar', 'pronamic-pay-crowdfunding' ),
			)
		);

		wp_localize_script(
			'pronamic-crowdfunding-details-editor',
			'pronamic_crowdfunding_details',
			array(
				'title'              => __( 'Crowdfunding Details', 'pronamic-pay-crowdfunding' ),
				'term_raised'        => __( 'Raised', 'pronamic-pay-crowdfunding' ),
				'term_target'        => __( 'Target', 'pronamic-pay-crowdfunding' ),
				'term_contributions' => __( 'Contributions', 'pronamic-pay-crowdfunding' ),
			)
		);

		wp_localize_script(
			'pronamic-crowdfunding-remco-editor',
			'pronamic_crowdfunding_remco',
			array(

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
		// Main blocks.
		$attributes = array(
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
		);

		register_block_type(
			'pronamic-pay/crowdfunding-donut',
			array(
				'editor_script' => 'pronamic-crowdfunding-donut-editor',
				'style'         => 'pronamic-pay-crowdfunding',
				'attributes'    => $attributes,
			)
		);

		register_block_type(
			'pronamic-pay/crowdfunding-bar',
			array(
				'editor_script' => 'pronamic-crowdfunding-bar-editor',
				'style'         => 'pronamic-pay-crowdfunding',
				'attributes'    => $attributes,
			)
		);

		register_block_type(
			'pronamic-pay/crowdfunding-compact',
			array(
				'editor_script' => 'pronamic-crowdfunding-compact-editor',
				'style'         => 'pronamic-pay-crowdfunding',
				'attributes'    => $attributes,
			)
		);

		// Sub blocks.
		register_block_type(
			'pronamic-pay/crowdfunding-progress',
			array(
				'editor_script' => 'pronamic-crowdfunding-progress-editor',
				'attributes'    => array(
					'value' => array(
						'type'    => 'integer',
						'default' => 0,
					),
				),
			)
		);

		register_block_type(
			'pronamic-pay/crowdfunding-details',
			array(
				'editor_script' => 'pronamic-crowdfunding-details-editor',
				'attributes'    => array(
					'list' => array(
						'type'    => 'array',
						'default' => array(),
					),
				)
			)
		);

		register_block_type(
			'pronamic-pay/crowdfunding-remco',
			array(
				'editor_script' => 'pronamic-crowdfunding-remco',
				'attributes'    => array(
					'collectedLabel' => array(
						'type' => 'string',
					),
					'collectedAmount' => array(
						'type' => 'string',	
					),
					'goalLabel' => array(
						'type' => 'string',
					),
					'goalAmount' => array(
						'type' => 'string',	
					),
					'numberLabel' => array(
						'type' => 'string',
					),
					'numberValue' => array(
						'type' => 'string',	
					),
				),
				'render_callback' => function( $attributes, $content ) {
					ob_start();

					include __DIR__ . '/../templates/block-pronamic-crowdfunding-remco.php';

					return ob_get_clean();
				}
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
