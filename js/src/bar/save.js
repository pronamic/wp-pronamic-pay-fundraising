/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { calculateProgressValue, formatMoney } from '../utils';

export default function save ( { attributes } ) {
	let {
		color,
		raisedLabel,
		raisedAmount,
		targetLabel,
		targetAmount
	} = attributes;

	// Return early to use server render callback.
	return null;

	let value = calculateProgressValue( raisedAmount, targetAmount );

	let barStyle = {
		background: color,
		width: Math.min( value, 100 ) + '%'
	};

	return (
		<div className="ppcf-block ppcf-block-bar">
			<div className="ppcf-progress">
				<div className="ppcf-progress__bar" style={ barStyle }>
					<span className="ppcf-progress__bar__status">
						{ value }%
					</span>
				</div>
			</div>
			<dl className="ppcf-dl-list">
				<dt className="ppcf-dl-list__label" style={ { color: color } }>{ raisedLabel }</dt>
				<dd className="ppcf-dl-list__value" style={ { color: color } }>{ formatMoney( raisedAmount ) }</dd>
				<dt className="ppcf-dl-list__label">{ targetLabel }</dt>
				<dd className="ppcf-dl-list__value">{ formatMoney( targetAmount ) }</dd>
			</dl>
		</div>
	);
}