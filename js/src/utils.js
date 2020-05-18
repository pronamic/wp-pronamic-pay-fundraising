/**
 * Calculate progress value.
 *
 * @param string raised Raised amount.
 * @param string target Target amount.
 * @return float
 */
export function calculateProgressValue( raised, target ) {
	raised = parseFloat( raised ? raised : 0 );
	target = parseFloat( target ? target : 0 );

	if ( 0 == target && ( 0 == raised || raised > target ) ) {
		target = 100;
	}

	return Math.floor( ( raised / target ) * 100 );
};

/**
 * Format money.
 *
 * @param string value Amount to format.
 * @return string
 */
export function formatMoney ( value ) {
	value = parseFloat( value );

	// Fraction digits.
	let fractionDigits = 2;

	if ( 0 === ( value * 100 ) % 100 ) {
		fractionDigits = 0;
	}

	return '€ ' + value.toFixed( fractionDigits ).replace( /\./g, ',' );
}