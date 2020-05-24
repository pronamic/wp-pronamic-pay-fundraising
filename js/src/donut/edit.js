/**
* External dependencies.
*/
import classnames from 'classnames';

/**
* WordPress dependencies.
*/
import { ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../constants';
import { calculateProgressValue, formatMoney } from '../utils';
import { CrowdfundingDetails } from '../components/details';
import { CrowdfundingProgress } from '../components/progress';

const DonutEdit = ( { attributes, setAttributes, className } ) => {
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
		setAttributes( { raisedLabel: __( 'Raised', 'pronamic-pay-crowdfunding' ) } );
	}

	if ( ! targetLabel ) {
		setAttributes( { targetLabel: __( 'Target', 'pronamic-pay-crowdfunding' ) } );
	}

	if ( ! contributionsLabel ) {
		setAttributes( { contributionsLabel: __( 'Contributions', 'pronamic-pay-crowdfunding' ) } );
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
		<div className="ppcf-block ppcf-block-circle">
			{ inspectorControls }
			<div className="ppcf-block-circle__container">
				<div className="ppcf-block__container__col">
					<CrowdfundingProgress style="donut" value={ calculateProgressValue( raisedAmount, targetAmount ) } color={ color } />
				</div>
				<div className="ppcf-block__container__col">
					<CrowdfundingDetails
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

export default DonutEdit;