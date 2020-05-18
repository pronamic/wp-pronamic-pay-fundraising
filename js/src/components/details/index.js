/**
 * WordPress dependencies.
 */
import { RichText } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { formatMoney } from '../../utils';

export class CrowdfundingDetails extends Component {
	render() {
		let {
			colors,
			raisedLabel,
			raisedAmount,
			targetLabel,
			targetAmount,
			contributionsLabel,
			contributionsValue,
			setAttributes
		} = this.props;

		colors = colors ? colors : {};

		return (
			<dl className="ppcf-dl-list">
				<RichText
					tagName="dt"
					className="ppcf-dl-list__label"
					multiline="false"
					value={ raisedLabel }
					onChange={ ( val ) => {
						setAttributes( { raisedLabel: val } );
					} }
					style={ colors.hasOwnProperty( 'raisedLabel' ) && { color: colors.raisedLabel } }
				/>

				<RichText
					tagName="dd"
					className="ppcf-dl-list__value"
					multiline="false"
					value={ formatMoney( raisedAmount ? raisedAmount : '0' ) }
					onChange={ ( val ) => {
						setAttributes( { raisedAmount: val.replace( /,/g, '.' ) } );
					} }
					style={ colors.hasOwnProperty( 'raisedAmount' ) && { color: colors.raisedAmount } }
				/>

				{ targetAmount &&
					<>
						<RichText
							tagName="dt"
							className="ppcf-dl-list__label"
							multiline="false"
							value={ targetLabel }
							onChange={ ( val ) => {
								setAttributes( { targetLabel: val } );
							} }
						/>

						<RichText
							tagName="dd"
							className="ppcf-dl-list__value"
							multiline="false"
							value={ formatMoney( targetAmount ? targetAmount : '0' ) }
							onChange={ ( val ) => {
								setAttributes( { targetAmount: val.replace( /,/g, '.' ) } );
							} }
						/>
					</>
				}

				{ contributionsValue &&
					<>
						<RichText
							tagName="dt"
							className="ppcf-dl-list__label"
							multiline="false"
							value={ contributionsLabel }
							onChange={ ( val ) => {
								setAttributes( { contributionsLabel: val } );
							} }
						/>

						<RichText
							tagName="dd"
							className="ppcf-dl-list__value"
							multiline="false"
							value={ parseInt( contributionsValue ? contributionsValue : 0 ).toString() }
							onChange={ ( val ) => {
								setAttributes( { contributionsValue: parseInt( val ).toString() } );
							} }
							style={ colors.hasOwnProperty( 'contributionsValue' ) && { color: colors.contributionsValue } }
						/>
					</>
				}
			</dl>
		);
	}
}