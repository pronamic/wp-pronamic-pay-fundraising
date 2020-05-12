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
			return <dd className="ppcf-dl-list__value" style={ this.props.style }>{ this.props.children }</dd>
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
						amount: '0,00',
						color: null
					},
					{
						term: pronamic_crowdfunding_details.term_target,
						amount: '0,00',
						color: null
					},
					{
						term: pronamic_crowdfunding_details.term_contributions,
						value: '0',
						color: null
					}
				]
			}
		},

		// Edit.
		edit: ( { attributes, setAttributes, className } ) => {
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
						<DescriptionDetails onChange={ ( content ) => updateDescriptionDetail( index, content ) } style={ valueStyle }>
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
		},

		// Save.
		save: ( { attributes } ) => {
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
	} );
} )();
