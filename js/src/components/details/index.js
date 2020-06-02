/**
 * WordPress dependencies.
 */
import { RichText } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { formatMoney } from '../../utils';

export class FundraisingDetails extends Component {
	render() {
		let {
			colors,
			currencyCode,
			currencyDecimals,
			locale,
			raisedLabel,
			raisedAmount,
			targetLabel,
			targetAmount,
			contributionsLabel,
			contributionsValue,
			setAttributes
		} = this.props;

		colors = colors ? colors : {};
		currencyCode = currencyCode ? currencyCode : 'EUR';
		currencyDecimals = currencyDecimals ? currencyDecimals : '2';
		locale = locale ? locale : 'nl-NL';

		return (
			<dl className="ppfr-dl-list">
				<RichText
					tagName="dt"
					className="ppfr-dl-list__label"
					multiline="false"
					value={ raisedLabel }
					onChange={ ( val ) => {
						setAttributes( { raisedLabel: val } );
					} }
					style={ colors.hasOwnProperty( 'raisedLabel' ) && { color: colors.raisedLabel } }
				/>

				<RichText
					tagName="dd"
					className="ppfr-dl-list__value"
					multiline="false"
					value={ formatMoney( raisedAmount ? raisedAmount : '0', currencyCode, currencyDecimals, locale ) }
					onChange={ ( val ) => {
						val = val.replace( /,/g, '.' ).replace( /[^\d.-]/g, '' );

						let lastPeriod = val.lastIndexOf( '.' );

						if ( lastPeriod > -1 ) {
							let decimals = val.substring( lastPeriod + 1 ).replace( /[0]+$/g, '' ).padEnd( currencyDecimals, '0' );

							val = val.substring( 0, lastPeriod ).replace( /\./g, '' ) + '.' + decimals;
						}

						setAttributes( { raisedAmount: val } );
					} }
					style={ colors.hasOwnProperty( 'raisedAmount' ) && { color: colors.raisedAmount } }
				/>

				{ targetAmount &&
					<>
						<RichText
							tagName="dt"
							className="ppfr-dl-list__label"
							multiline="false"
							value={ targetLabel }
							onChange={ ( val ) => {
								setAttributes( { targetLabel: val } );
							} }
						/>

						<RichText
							tagName="dd"
							className="ppfr-dl-list__value"
							multiline="false"
							value={ formatMoney( targetAmount ? targetAmount : '0', currencyCode, currencyDecimals, locale ) }
							onChange={ ( val ) => {
								setAttributes( { targetAmount: val.replace( /,/g, '.' ).replace( /[^\d.-]/g, '' ) } );
							} }
						/>
					</>
				}

				{ contributionsValue &&
					<>
						<RichText
							tagName="dt"
							className="ppfr-dl-list__label"
							multiline="false"
							value={ contributionsLabel }
							onChange={ ( val ) => {
								setAttributes( { contributionsLabel: val } );
							} }
						/>

						<RichText
							tagName="dd"
							className="ppfr-dl-list__value"
							multiline="false"
							value={ parseInt( contributionsValue ? contributionsValue : 0 ).toString() }
							onChange={ ( val ) => {
								setAttributes( { contributionsValue: val ? val.replace( /[^\d]/g, '' ) : '0' } );
							} }
							style={ colors.hasOwnProperty( 'contributionsValue' ) && { color: colors.contributionsValue } }
						/>
					</>
				}
			</dl>
		);
	}
}