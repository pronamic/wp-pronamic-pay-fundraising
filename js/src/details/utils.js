/**
 * WordPress dependencies.
 */
import { dispatch } from '@wordpress/data';

/**
 * Format money.
 *
 * @param string value Amount to format.
 * @return string
 */
export function formatMoney( value ) {
	value = parseFloat( value );

	// Fraction digits.
	let fractionDigits = 2;

	if ( 0 === ( value * 100 ) % 100 ) {
		fractionDigits = 0;
	}

	return value.toFixed( fractionDigits ).replace( /\./g, ',' );
};