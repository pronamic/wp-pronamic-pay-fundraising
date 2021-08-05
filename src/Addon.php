<?php
/**
 * Fundraising Add-on.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2021 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

use Pronamic\WordPress\Pay\Payments\Payment;
use Pronamic\WordPress\Pay\Payments\PaymentStatus;

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
	 * @return Addon
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

		// Update blocks on payment status update.
		\add_action( 'pronamic_payment_status_update', array( $this, 'payment_status_block_update' ), 10, 1 );
	}

	/**
	 * Update blocks on payment status update.
	 *
	 * @param Payment $payment Payment.
	 * @return void
	 */
	public function payment_status_block_update( Payment $payment ) {
		if ( PaymentStatus::SUCCESS !== $payment->get_status() ) {
			return;
		}

		$post_id = $payment->get_origin_id();

		if ( null === $post_id ) {
			return;
		}

		$origin_post = \get_post( $post_id );

		if ( null === $origin_post ) {
			return;
		}

		if ( ! \has_blocks( $origin_post->post_content ) ) {
			return;
		}

		// Use block updater to update blocks in origin post.
		$updater = new BlockUpdater();

		$updater->add_raised_money( $payment->get_total_amount() );

		$updater->update_post( $origin_post );
	}
}
