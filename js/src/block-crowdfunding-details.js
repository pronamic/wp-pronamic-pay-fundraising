const { data } = wp;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;
const { Component, Fragment, RawHTML } = wp.element;

( function () {
	'use strict';

	class DescriptionList extends Component {
		render() {
			return <dl className="ppd-dl-list">{ this.props.children }</dl>
		}
	}

	class DescriptionDetails extends Component {
		render() {
			return <dd className="ppd-dl-list__value">{ this.props.children }</dd>
		}
	}

	const formatMoney = ( value ) => {
		value = parseFloat( value );

		// Fraction digits.
		let fractionDigits = 2;

		if ( 0 === ( value * 100 ) % 100 ) {
			fractionDigits = 0;
		}

		return value.toFixed( fractionDigits ).replace( /\./g, ',' );
	};

	/**
	 * Register details block type.
	 *
	 * @param string name     Block name.
	 * @param object settings Block settings.
	 *
	 * @return WPBlock        Block if registered successfully, otherwise "undefined".
	 */
	registerBlockType( 'pronamic-pay/crowdfunding-details', {
		title: 'Details',
		icon: 'info',
		category: 'pronamic-pay',
		parent: [ 'pronamic-pay/crowdfunding-ring', 'core/column' ],

		// Attributes.
		attributes: {
			currencySymbol: {
				type: 'string',
				default: '€'
			},
			list: {
				type: 'array',
				default: [
					{
						term: 'Raised',
						amount: '0,00'
					},
					{
						term: 'Target',
						amount: '0,00'
					},
					{
						term: 'Number of contributions',
						value: '0'
					}
				]
			}
		},

		// Edit.
		edit: ( { attributes, setAttributes, className } ) => {
			let { list, currencySymbol } = attributes;

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

			let definitions = list.map( ( item, index ) => {
				return (
					<Fragment key={ index }>
						<RichText
							tagName="dt"
							className="ppd-dl-list__label"
							value={ item.term }
							onChange={ ( content ) => updateDescriptionTerm( index, content ) }
						/>
						<DescriptionDetails onChange={ ( content ) => updateDescriptionDetail( index, content ) }>
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
					{ definitions }
				</DescriptionList>
			);
		},

		// Save.
		save: ( { attributes } ) => {
			let { currencySymbol, list } = attributes;

			let definitions = list.map( ( item, index ) => {
				return (
					<Fragment key={ index }>
						<dt className="ppd-dl-list__label">
							<RawHTML>
								{ item.term }
							</RawHTML>
						</dt>
						<dd className="ppd-dl-list__value">
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
				<dl className="ppd-dl-list">
					{ definitions }
				</dl>
			);
		}
	} );
} )();
