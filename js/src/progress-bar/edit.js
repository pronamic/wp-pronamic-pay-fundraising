/**
 * WordPress dependencies.
 */
import { ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { COLORS } from '../constants';
import { calculateProgressValue } from '../utils';
import { FundraisingProgress } from '../components/progress';
import { FundraisingDetails } from '../components/details';

const FundraisingProgressBarEdit = ( { attributes, setAttributes, className } ) => {
	let {
		targetLabel,
		targetAmount,
		raisedLabel,
		raisedAmount,
		color,
		currencyCode,
		currencyDecimals,
		locale
	} = attributes;

	if ( ! raisedLabel ) {
		setAttributes( { raisedLabel: __( 'Raised:', 'pronamic-pay-fundraising' ) } );
	}

	if ( ! targetLabel ) {
		setAttributes( { targetLabel: __( 'Target:', 'pronamic-pay-fundraising' ) } );
	}

	raisedAmount = raisedAmount ? raisedAmount : '';
	targetAmount = targetAmount ? targetAmount : '';

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

	let classes = className + ' ppfr-block ppfr-block-bar';

	let colors = {
		raisedLabel: color,
		raisedAmount: color,
	};

	return (
		<div className={ classes }>
			{ inspectorControls }
			<FundraisingProgress
				color={ color }
				value={ calculateProgressValue( raisedAmount, targetAmount ) }
			/>
			<FundraisingDetails
				setAttributes={ setAttributes }
				colors={ colors }
				raisedLabel={ raisedLabel }
				raisedAmount={ raisedAmount }
				targetLabel={ targetLabel }
				targetAmount={ targetAmount }
				locale={ locale }
				currencyCode={ currencyCode }
				currencyDecimals={ currencyDecimals }
			/>
		</div>
	);
};

export default FundraisingProgressBarEdit;