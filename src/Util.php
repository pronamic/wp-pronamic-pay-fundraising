<?php
/**
 * Util.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

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
}