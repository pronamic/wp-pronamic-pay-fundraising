<?php
/**
 * Block updater.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2022 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

use Pronamic\WordPress\Money\Money;
use Pronamic\WordPress\Money\Parser;
use WP_Post;

/**
 * Addon.
 *
 * @author  Reüel van der Steege
 * @since   1.0.0
 * @version 1.0.0
 */
class BlockUpdater {
	/**
	 * Block names.
	 *
	 * @var array
	 */
	public $block_names;

	/**
	 * Add raised money.
	 *
	 * @var Money|null
	 */
	public $add_raised;

	/**
	 * Target amount.
	 *
	 * @var Money|null
	 */
	public $target_amount;

	/**
	 * Raised amount.
	 *
	 * @var Money|null
	 */
	public $raised_amount;

	/**
	 * Number of contributions.
	 *
	 * @var int|null
	 */
	public $contributions;

	/**
	 * Block updater constructor.
	 */
	public function __construct() {
		$this->block_names = [
			'pronamic-pay/fundraising-progress-circle',
			'pronamic-pay/fundraising-progress-bar',
			'pronamic-pay/fundraising-progress-text',
		];
	}

	/**
	 * Add raised money.
	 *
	 * @param Money $add Money to add to raised amount.
	 * @return void
	 */
	public function add_raised_money( Money $add ) {
		$this->add_raised = $add;
	}

	/**
	 * Update post.
	 *
	 * @param WP_Post $post Post to update fundraising blocks in.
	 */
	public function update_post( WP_Post $post ) {
		$post_content = $post->post_content;

		if ( ! \has_blocks( $post_content ) ) {
			return;
		}

		if ( null === $this->add_raised ) {
			return;
		}

		$updated_content = $this->update_content( $post_content );

		if ( $updated_content === $post_content ) {
			return;
		}

		// Temporary allow unfiltered HTML for `transform` CSS attribute.
		\add_filter( 'user_has_cap', [ $this, 'allow_unfiltered_html' ], 10, 2 );

		\kses_init();

		// Update post.
		\wp_update_post(
			[
				'ID'           => $post->ID,
				'post_content' => $updated_content,
			]
		);

		\remove_filter( 'user_has_cap', [ $this, 'allow_unfiltered_html' ] );

		\kses_init();
	}

	/**
	 * Allow unfiltered HTML.
	 *
	 * @param array $capabilities Capabilities.
	 * @param array $capability Capability.
	 * @return array
	 */
	public function allow_unfiltered_html( $capabilities, $capability ) {
		if ( in_array( 'unfiltered_html', $capability, true ) ) {
			$capabilities['unfiltered_html'] = true;
		}

		return $capabilities;
	}

	/**
	 * Update content.
	 *
	 * @param string $post_content Post content.
	 * @return string
	 */
	public function update_content( $post_content ) {
		$blocks = \parse_blocks( $post_content );

		foreach ( $blocks as &$block ) {
			$block = $this->update_block( $block );
		}

		// Serialize blocks.
		$updated_content = \serialize_blocks( $blocks );

		return $updated_content;
	}

	/**
	 * Update block.
	 *
	 * @param array $block Block to update.
	 * @return array
	 */
	public function update_block( $block ) {
		// Update fundraising block.
		if ( \in_array( $block['blockName'], $this->block_names, true ) ) {
			$block = $this->update_fundraising_block( $block );
		}

		// Update inner blocks.
		if ( \array_key_exists( 'innerBlocks', $block ) ) {
			foreach ( $block['innerBlocks'] as &$inner_block ) {
				$inner_block = $this->update_block( $inner_block );
			}
		}

		// Update fundraising blocks in reusable block.
		if ( 'core/block' === $block['blockName'] && isset( $block['attrs']['ref'] ) ) {
			$block_post = \get_post( $block['attrs']['ref'] );

			if ( null !== $block_post ) {
				$this->update_post( $block_post );
			}
		}

		return $block;
	}

	/**
	 * Update fundraising block.
	 *
	 * @param array $block Block.
	 * @return array
	 */
	public function update_fundraising_block( $block ) {
		$parser = new Parser();

		// Get target amount for use when updating inner blocks.
		if ( ! \array_key_exists( 'targetAmount', $block['attrs'] ) ) {
			$block['attrs']['targetAmount'] = 0;
		}

		// Try parsing `targetAmount` block attribute.
		try {
			$this->target_amount = $parser->parse( $block['attrs']['targetAmount'] );
		} catch ( \Exception $e ) {
			$this->target_amount = null;
		}

		// Set raised amount.
		if ( ! \array_key_exists( 'raisedAmount', $block['attrs'] ) ) {
			$block['attrs']['raisedAmount'] = 0;
		}

		// Try parsing and updating `raisedAmount` block attribute.
		try {
			$this->raised_amount = $parser->parse( $block['attrs']['raisedAmount'] );

			$this->raised_amount = $this->raised_amount->add( $this->add_raised );

			$this->raised_amount->set_currency( $this->add_raised->get_currency() );

			// Update block attributes.
			$block['attrs']['raisedAmount']     = \number_format( $this->raised_amount->get_value(), 2, '.', '' );
			$block['attrs']['currencyCode']     = $this->raised_amount->get_currency()->get_alphabetic_code();
			$block['attrs']['currencyDecimals'] = $this->raised_amount->get_currency()->get_number_decimals();
			$block['attrs']['locale']           = str_replace( '_', '-', \get_locale() );
		} catch ( \Exception $e ) {
			$this->raised_amount = null;
		}

		// Set number of contributions.
		if ( ! \array_key_exists( 'contributionsValue', $block['attrs'] ) ) {
			$block['attrs']['contributionsValue'] = 0;
		}

		$this->contributions = 1 + \intval( $block['attrs']['contributionsValue'] );

		$block['attrs']['contributionsValue'] = strval( $this->contributions );

		return $block;
	}
}
