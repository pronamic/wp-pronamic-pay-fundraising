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
		targetLabel,
		targetAmount,
		raisedLabel,
		raisedAmount,
		contributionsLabel,
		contributionsValue,
		color
	} = attributes;

	if ( ! raisedLabel ) {
		setAttributes( { raisedLabel: __( 'Raised', 'pronamic-pay-crowdfunding' ) } );
	}

	if ( ! contributionsLabel ) {
		setAttributes( { contributionsLabel: __( 'contributions', 'pronamic-pay-crowdfunding' ) } );
	}

	raisedAmount = raisedAmount ? raisedAmount : '';
	targetAmount = targetAmount ? targetAmount : '';
	contributionsValue = contributionsValue ? contributionsValue : '';

	// Inspector controls.
	const inspectorControls = (
		<InspectorControls>
			<PanelBody>
				<TextControl
					label={ __( 'Target', 'pronamic-pay-crowdfunding' ) }
					value={ targetAmount }
					onChange={ ( val ) => {
						setAttributes( { targetAmount: val.replace( /,/g, '.' ) } )
					} }
				/>
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
						setAttributes( { contributionsValue: val } )
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
			/>
		</div>
	);
};

export default CompactEdit;