/* globals pronamic_crowdfunding_details */
const { data } = wp;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;
const { Component, Fragment, RawHTML } = wp.element;

( function () {
	'use strict';

	class DescriptionList extends Component {
		render() {
			return <dl className="ppcf-dl-list">{ this.props.children }</dl>
		}
	}

	class DescriptionDetails extends Component {
		render() {
			return <dd className="ppcf-dl-list__value">{ this.props.children }</dd>
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
		title: pronamic_crowdfunding_details.title,
		icon: 'info',
		category: 'pronamic-pay',
		parent: [ 'pronamic-pay/crowdfunding-donut', 'pronamic-pay/crowdfunding-bar', 'pronamic-pay/crowdfunding-compact', 'core/column', 'core/group' ],

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
						term: pronamic_crowdfunding_details.term_raised,
						amount: '0,00'
					},
					{
						term: pronamic_crowdfunding_details.term_target,
						amount: '0,00'
					},
					{
						term: pronamic_crowdfunding_details.term_contributions,
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
				console.log( index + ' - ' + term );
				list[ index ].term = term;

				console.log( list );
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
							className="ppcf-dl-list__label"
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
						<dt className="ppcf-dl-list__label">
							<RawHTML>
								{ item.term }
							</RawHTML>
						</dt>
						<dd className="ppcf-dl-list__value">
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
					{ definitions }
				</dl>
			);
		}
	} );
} )();
