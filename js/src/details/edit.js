/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { RichText } from '@wordpress/block-editor';
import { Component, Fragment, RawHTML, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { formatMoney } from './utils';

class DescriptionList extends Component {
	render () {
		return <dl className="ppcf-dl-list">{ this.props.children }</dl>
	}
}

class DescriptionDetails extends Component {
	render () {
		return <dd className="ppcf-dl-list__value" style={ this.props.style }>{ this.props.children }</dd>
	}
}

const DetailsEdit = ( { attributes, setAttributes, className } ) => {
	let { color, currencySymbol, list } = attributes;

	const updateCurrencySymbol = ( currencySymbol ) => {
		setAttributes( { currencySymbol: currencySymbol } );
	};

	const updateDescriptionTerm = ( index, term ) => {
		list[ index ].term = term;

		setAttributes( { list: list } );
	};

	const updateDescriptionDetail = ( index, content ) => {
		item = list[ index ];

		if ( item.hasOwnProperty( 'amount' ) ) {
			item.amount = content;
		} else {
			item.value = content;
		}

		list[ index ] = item;

		setAttributes( { list: list } );
	};

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
				<RichText
					tagName="dt"
					className="ppcf-dl-list__label"
					value={ item.term }
					onChange={ ( content ) => updateDescriptionTerm( index, content ) }
					style={ labelStyle }
				/>
				<DescriptionDetails onChange={ ( content ) => updateDescriptionDetail( index, content ) }
				                    style={ valueStyle }>
					{
						item.hasOwnProperty( 'amount' ) ?
							<>
								<RichText
									tagName="span"
									value={ currencySymbol }
									onChange={ ( content ) => setAttributes( { currencySymbol: content } ) }
								/>
								{ ' ' + formatMoney( item.amount ) }
							</>
							:
							item.value
					}
				</DescriptionDetails>
			</Fragment>
		)
	} );

	return (
		<DescriptionList className={ className }>
			{ descriptions }
		</DescriptionList>
	);
}

export default DetailsEdit;