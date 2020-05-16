/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { Fragment, RawHTML } from '@wordpress/element';
import { formatMoney } from './utils';

export default function save ( { attributes } ) {
	let { currencySymbol, list } = attributes;

	let descriptions = list.map( ( item, index ) => {
		let labelStyle = {};
		let valueStyle = {};

		if ( item.color ) {
			if ( item.color.hasOwnProperty( 'label' ) ) {
				labelStyle = { color: item.color.label };
			}

			if ( item.color.hasOwnProperty( 'value' ) ) {
				valueStyle = { color: item.color.value };
			}
		}

		return (
			<Fragment key={ index }>
				<dt className="ppcf-dl-list__label" style={ labelStyle }>
					<RawHTML>
						{ item.term }
					</RawHTML>
				</dt>
				<dd className="ppcf-dl-list__value" style={ valueStyle }>
					{
						item.hasOwnProperty( 'amount' ) ?
							<>
								{ currencySymbol + ' ' + formatMoney( item.amount ) }
							</>
							:
							item.value
					}
				</dd>
			</Fragment>
		);
	} );

	return (
		<dl className="ppcf-dl-list">
			{ descriptions }
		</dl>
	);
}