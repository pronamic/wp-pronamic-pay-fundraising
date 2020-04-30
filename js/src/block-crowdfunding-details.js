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

			let definitions = list.map( ( item, index ) => {
				let definition = item.amount ? currencySymbol + ' ' + item.amount : item.value;

				return (
					<Fragment key={ index }>
						<RichText
							tagName="dt"
							className="ppd-dl-list__label"
							value={ item.term }
							onChange={ ( content ) => setAttributes( { content } ) }
						/>
						<DescriptionDetails>
							{
								item.hasOwnProperty( 'amount' ) ?
									<>
										<RichText
											tagName="span"
											value={ currencySymbol }
											onChange={ ( content ) => setAttributes( { content } ) }
										/>
										{ ' ' + item.amount }
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
			// @todo How to save?!

			return (
				<dl className="ppd-dl-list">
					{
						attributes.list.forEach( ( detail, index ) => {
							// ....
						} )
					}
				</dl>
			);
		}
	} );
} )();
