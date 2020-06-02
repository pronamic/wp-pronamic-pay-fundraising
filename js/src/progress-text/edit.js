/**
 * WordPress dependencies.
 */
import { ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../constants';
import { FundraisingDetails } from '../components/details';

const CompactEdit = ( { attributes, setAttributes, className } ) => {
	let {
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

	if ( ! contributionsLabel ) {
		setAttributes( { contributionsLabel: __( 'contributions', 'pronamic-pay-fundraising' ) } );
	}

	raisedAmount = raisedAmount ? raisedAmount : '';
	contributionsValue = contributionsValue ? contributionsValue : '';

	// Inspector controls.
	const inspectorControls = (
		<InspectorControls>
			<PanelBody>
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

	let classes = className + ' ppfr-block ppfr-block-compact';

	let colors = {
		raisedAmount: color,
	};

	return (
		<div className={ classes }>
			{ inspectorControls }
			<FundraisingDetails
				setAttributes={ setAttributes }
				colors={ colors }
				raisedLabel={ raisedLabel }
				raisedAmount={ raisedAmount }
				contributionsLabel={ contributionsLabel }
				contributionsValue={ contributionsValue }
				locale={ locale }
				currencyCode={ currencyCode }
				currencyDecimals={ currencyDecimals }
			/>
		</div>
	);
};

export default CompactEdit;