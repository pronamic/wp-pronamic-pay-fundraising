/**
 * WordPress dependencies.
 */
import { ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../constants';
import { CrowdfundingDetails } from '../components/details';

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
		setAttributes( { raisedLabel: __( 'Raised', 'pronamic-pay-crowdfunding' ) } );
	}

	if ( ! contributionsLabel ) {
		setAttributes( { contributionsLabel: __( 'contributions', 'pronamic-pay-crowdfunding' ) } );
	}

	raisedAmount = raisedAmount ? raisedAmount : '';
	contributionsValue = contributionsValue ? contributionsValue : '';

	// Inspector controls.
	const inspectorControls = (
		<InspectorControls>
			<PanelBody>
				<TextControl
					label={ __( 'Raised', 'pronamic-pay-crowdfunding' ) }
					value={ raisedAmount }
					onChange={ ( val ) => {
						setAttributes( { raisedAmount: val.replace( /,/g, '.' ) } )
					} }
				/>
				<TextControl
					label={ __( 'Contributions', 'pronamic-pay-crowdfunding' ) }
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

	let classes = className + ' ppcf-block ppcf-block-compact';

	let colors = {
		raisedAmount: color,
	};

	return (
		<div className={ classes }>
			{ inspectorControls }
			<CrowdfundingDetails
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