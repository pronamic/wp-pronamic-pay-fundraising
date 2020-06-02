/**
* WordPress dependencies.
*/
import { ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { COLORS } from '../constants';
import { calculateProgressValue, formatMoney } from '../utils';
import { FundraisingDetails } from '../components/details';
import { FundraisingProgress } from '../components/progress';

const FundraisingProgressCircleEdit = ( { attributes, setAttributes, className } ) => {
	let {
		targetLabel,
		targetAmount,
		raisedLabel,
		raisedAmount,
		contributionsLabel,
		contributionsValue,
		color,
		currencyCode,
		currencyDecimals,
		locale
	} = attributes;

	if ( ! raisedLabel ) {
		setAttributes( { raisedLabel: __( 'Raised', 'pronamic-pay-fundraising' ) } );
	}

	if ( ! targetLabel ) {
		setAttributes( { targetLabel: __( 'Target', 'pronamic-pay-fundraising' ) } );
	}

	if ( ! contributionsLabel ) {
		setAttributes( { contributionsLabel: __( 'Contributions', 'pronamic-pay-fundraising' ) } );
	}

	raisedAmount = raisedAmount ? raisedAmount : '';
	targetAmount = targetAmount ? targetAmount : '';
	contributionsValue = contributionsValue ? contributionsValue : '';

	// Inspector controls.
	const inspectorControls = (
		<InspectorControls>
			<PanelBody>
				<TextControl
					label={ __( 'Target', 'pronamic-pay-fundraising' ) }
					value={ targetAmount }
					onChange={ ( val ) => {
						setAttributes( { targetAmount: val.replace( /,/g, '.' ) } )
					} }
				/>
				<TextControl
					label={ __( 'Raised', 'pronamic-pay-fundraising' ) }
					value={ raisedAmount }
					onChange={ ( val ) => {
						setAttributes( { raisedAmount: val.replace( /,/g, '.' ) } )
					} }
				/>
				<TextControl
					label={ __( 'Contributions', 'pronamic-pay-fundraising' ) }
					value={ contributionsValue }
					onChange={ ( val ) => {
						setAttributes( { contributionsValue: val.replace( /[^\d]/g, '' ) } )
					} }
				/>
				<ColorPalette
					colors={ COLORS }
					value={ color }
					onChange={ ( val ) => {
						setAttributes( { color: val } )
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<div className="ppfr-block ppfr-block-circle">
			{ inspectorControls }
			<div className="ppfr-block-circle__container">
				<div className="ppfr-block__container__col">
					<FundraisingProgress
						style="circle"
						color={ color }
						value={ calculateProgressValue( raisedAmount, targetAmount ) }
					/>
				</div>
				<div className="ppfr-block__container__col">
					<FundraisingDetails
						setAttributes={ setAttributes }
						raisedLabel={ raisedLabel }
						raisedAmount={ raisedAmount }
						targetLabel={ targetLabel }
						targetAmount={ targetAmount }
						contributionsLabel={ contributionsLabel }
						contributionsValue={ contributionsValue ? contributionsValue : '0' }
						locale={ locale }
						currencyCode={ currencyCode }
						currencyDecimals={ currencyDecimals }
					/>
				</div>
			</div>
		</div>
	);
};

export default FundraisingProgressCircleEdit;