<?php
/**
 * Util.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2023 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

/**
 * Util.
 *
 * @author  Reüel van der Steege
 * @since   1.0.0
 * @version 1.0.0
 */
class Util {
	/**
	 * Calculate progress value.
	 *
	 * @param string $raised Raised amount.
	 * @param string $target Target amount.
	 *
	 * @return float
	 */
	public static function calculate_progress_value( $raised, $target ) {
		$raised = \floatval( $raised );
		$target = \floatval( $target );

		if ( 0 == $target && ( 0 == $raised || $raised > $target ) ) {
			$target = 100;
		}

		return (int) floor( ( $raised / $target ) * 100 );
	}

	/**
	 * Get block classes.
	 *
	 * @param array       $attributes Block attributes.
	 * @param string|null $class_name Optional class name to include.
	 * @return string
	 */
	public static function get_block_classes( array $attributes, ?string $class_name ): string {
		$classes = [];

		if ( ! empty( $class_name ) ) {
			$classes = [ $class_name ];
		}

		if ( \array_key_exists( 'borderColor', $attributes ) && ! empty( $attributes['borderColor'] ) ) {
			$classes[] = 'has-border-color has-' . $attributes['borderColor'] . '-border-color';
		}

		return implode( ' ', $classes );
	}
}
