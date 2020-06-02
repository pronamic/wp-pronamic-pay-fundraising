/**
 * WordPress dependencies
 */
import { formatMoney } from '../utils';

export default function save ( { attributes } ) {
	let {
		color,
		raisedLabel,
		raisedAmount,
		contributionsLabel,
		contributionsValue
	} = attributes;

	// Return early to use server render callback.
	return null;

	return (
		<div className="ppfr-block ppfr-block-compact">
			<dl className="ppfr-dl-list">
				<dt className="ppfr-dl-list__label">{ raisedLabel }</dt>
				<dd className="ppfr-dl-list__value" style={ { color: color } }>{ formatMoney( raisedAmount ) }</dd>
				<dt className="ppfr-dl-list__label">{ contributionsLabel }</dt>
				<dd className="ppfr-dl-list__value">{ parseInt( contributionsValue ).toString() }</dd>
			</dl>
		</div>
	);
}