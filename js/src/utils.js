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
export function formatMoney ( value, currencyCode, currencyDecimals, locale ) {
	let lastPeriod = value.lastIndexOf( '.' );

	if ( lastPeriod > -1 ) {
		let decimals = value.substring( lastPeriod + 1 ).replace( /[0]+$/g, '' ).padEnd( currencyDecimals, '0' );

		value = value.substring( 0, lastPeriod ).replace( /\./g, '' ) + '.' + decimals;
	}

	value = parseFloat( value );

	// Fraction digits.
	let fractionDigits = currencyDecimals;

	if ( 0 === ( value * 100 ) % 100 ) {
		fractionDigits = 0;
	}

	return value.toLocaleString(
		locale,
		{
			style: 'currency',
			currency: currencyCode,
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits
		}
	);
}