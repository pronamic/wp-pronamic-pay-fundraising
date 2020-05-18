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

	return (
		<div className="ppcf-block ppcf-block-compact">
			<dl className="ppcf-dl-list">
				<dt className="ppcf-dl-list__label">{ raisedLabel }</dt>
				<dd className="ppcf-dl-list__value" style={ { color: color } }>{ formatMoney( raisedAmount ) }</dd>
				<dt className="ppcf-dl-list__label">{ contributionsLabel }</dt>
				<dd className="ppcf-dl-list__value">{ parseInt( contributionsValue ).toString() }</dd>
			</dl>
		</div>
	);
}