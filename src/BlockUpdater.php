<?php
/**
 * Block updater.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

use DOMDocument;
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
	public $target;

	/**
	 * Raised amount.
	 *
	 * @var Money|null
	 */
	public $raised;

	/**
	 * Number of contributions.
	 *
	 * @var int|null
	 */
	public $contributions;

	/**
	 * Blcok updater constructor.
	 */
	public function __construct() {
		$this->block_names = array(
			'pronamic-pay/crowdfunding-donut',
			'pronamic-pay/crowdfunding-bar',
			'pronamic-pay/crowdfunding-compact',
		);
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
	 * @param WP_Post $post Post to update crowdfunding blocks in.
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

		// Update post.
		\wp_update_post(
			array(
				'ID'           => $post->ID,
				'post_content' => $updated_content,
			)
		);
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
			// Update main crowdfunding block attributes.
			if ( \in_array( $block['blockName'], $this->block_names, true ) ) {
				$block = $this->update_crowdfunding_block( $block );
			}

			// Update inner blocks.
			if ( \array_key_exists( 'innerBlocks', $block ) ) {
				$block['innerBlocks'] = $this->update_inner_blocks( $block['innerBlocks'] );
			}
		}

		// Serialize blocks.
		$updated_content = \serialize_blocks( $blocks );

		return $updated_content;
	}

	/**
	 * Update inner blocks.
	 *
	 * @param array $blocks Blocks.
	 * @return array
	 */
	public function update_inner_blocks( $blocks ) {
		foreach ( $blocks as &$block ) {
			switch ( $block['blockName'] ) {
				case 'pronamic-pay/crowdfunding-progress':
					// Update crowdfunding progress block.
					$block = $this->update_progress_block( $block );

					break;
				case 'pronamic-pay/crowdfunding-details':
					// Update crowdfunding details block.
					$block = $this->update_details_block( $block );

					break;
			}

			// Update inner blocks.
			if ( \array_key_exists( 'innerBlocks', $block ) ) {
				$block['innerBlocks'] = $this->update_inner_blocks( $block['innerBlocks'] );
			}
		}

		return $blocks;
	}

	/**
	 * Update crowdfunding block.
	 *
	 * @param array $block Block.
	 * @return array
	 */
	public function update_crowdfunding_block( $block ) {
		$parser = new Parser();

		// Get target for use when updating innner blocks.
		if ( ! \array_key_exists( 'target', $block['attrs'] ) ) {
			$block['attrs']['target'] = 0;
		}

		// Try parsing `target` block attribute.
		try {
			$this->target = $parser->parse( $block['attrs']['target'] );
		} catch ( \Exception $e ) {
			$this->target = null;
		}

		// Set raised.
		if ( ! \array_key_exists( 'raised', $block['attrs'] ) ) {
			$block['attrs']['raised'] = 0;
		}

		// Try parsing and updating `raised` block attribute.
		try {
			$this->raised = $parser->parse( $block['attrs']['raised'] );

			$this->raised = $this->raised->add( $this->add_raised );

			$block['attrs']['raised'] = \number_format( $this->raised->get_value(), 2, '.', '' );
		} catch ( \Exception $e ) {
			$this->raised = null;
		}

		// Set number of contributions.
		if ( ! \array_key_exists( 'contributions', $block['attrs'] ) ) {
			$block['attrs']['contributions'] = 0;
		}

		$this->contributions = 1 + \intval( $block['attrs']['contributions'] );

		$block['attrs']['contributions'] = $this->contributions;

		return $block;
	}

	/**
	 * Update progress block.
	 *
	 * @param array $block Block.
	 * @return array
	 */
	public function update_progress_block( $block ) {
		// Check valid target amount.
		if ( ! ( $this->target instanceof \Pronamic\WordPress\Money\Money ) ) {
			return $block;
		}

		// Check valid raised amount.
		if ( ! ( $this->raised instanceof \Pronamic\WordPress\Money\Money ) ) {
			return $block;
		}

		// Make sure target can be used in calculations.
		$target = $this->target;

		if ( ! ( $target->get_value() > 0 ) ) {
			$target->set_value( 100 );
		}

		// Calculate progress percentage.
		$progress = $this->raised->divide( strval( $target->get_value() ) )->multiply( 100 );

		$progress = \intval( \floor( $progress->get_value() ) );

		/**
		 * Attributes.
		 */
		// Set `value` attribute.
		$block['attrs']['value'] = $progress;

		/**
		 * Inner HTML and content.
		 */
		// Set percentage.
		$html = \preg_replace( '#[0-9]+%#', $block['attrs']['value'] . '%', $block['innerHTML'] );

		// Restrict bar `width` to 100%.
		if ( false !== \stripos( $block['innerHTML'], 'is-style-bar' ) && $block['attrs']['value'] > 100 ) {
			$html = \preg_replace( '#width:[0-9]+%#', 'width:100%', $html );
		}

		// Set degrees.
		$degrees = ( $progress / 100 ) * 360;

		$degrees = \min( $degrees, 360 );

		$degrees = \number_format( $degrees, 2, '.', '' );

		$html = \preg_replace( '#[0-9\.]+deg#', $degrees . 'deg', $html );

		// Set classes.
		$classes = 'ppcf-circle';

		if ( $block['attrs']['value'] > 50 ) {
			$classes .= ' ppcf-circle--50';
		}

		$html = \strtr(
			$html,
			array(
				'ppcf-circle ppcf-circle--50"' => $classes . '"',
				'ppcf-circle"'                => $classes . '"',
			)
		);

		$block['innerHTML']       = $html;
		$block['innerContent'][0] = $html;

		return $block;
	}

	/**
	 * Update details block.
	 *
	 * @param array $block Block.
	 * @return array
	 */
	public function update_details_block( $block ) {
		// Check valid raised amount.
		if ( ! ( $this->raised instanceof \Pronamic\WordPress\Money\Money ) ) {
			return $block;
		}

		// Check valid contributions.
		if ( ! \is_int( $this->contributions ) ) {
			return $block;
		}

		// Get target for use when updating innner blocks.
		if ( ! \array_key_exists( 'list', $block['attrs'] ) ) {
			return $block;
		}

		/**
		 * Attributes.
		 */
		// Set raised amount in `list`.
		$block['attrs']['list'][0]['amount'] = \number_format( $this->raised->get_value(), 2, '.', '' );

		// Set number of contributions in `list`.
		$block['attrs']['list'][2]['value'] = $this->contributions;

		/**
		 * Inner HTML and content.
		 */
		$html = new DOMDocument();

		$html->loadHTML( '<?xml encoding="UTF-8">' . $block['innerHTML'], \LIBXML_HTML_NOIMPLIED | \LIBXML_HTML_NODEFDTD );

		$descriptions = $html->getElementsByTagName( 'dd' );

		// Update raised.
		$descriptions[0]->nodeValue = \preg_replace( '# [0-9\.,]+$#', ' ' . $this->raised->format_i18n( '%2$NTZ' ), $descriptions[0]->nodeValue );

		// Update number of contributions.
		$descriptions[2]->nodeValue = $block['attrs']['list'][2]['value'];

		$html = $html->saveHTML( $html->documentElement );

		$block['innerHTML']       = $html;
		$block['innerContent'][0] = $html;

		return $block;
	}
}
