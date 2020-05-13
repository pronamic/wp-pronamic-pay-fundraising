/* globals pronamic_crowdfunding_compact */
const { registerBlockType } = wp.blocks;

( function () {
	'use strict';

	/**
	 * Register crowdfunding compact block type.
	 *
	 * @param string name     Block name.
	 * @param object settings Block settings.
	 *
	 * @return WPBlock        Block if registered successfully, otherwise "undefined".
	 */
	registerBlockType( 'pronamic-pay/crowdfunding-remco', {
		title: 'Remco',
		icon: 'marker',
		category: 'pronamic-pay',

		// Attributes.
		attributes: {
			collectedLabel: {
				type: 'string',
				default: 'Collected'
			},
			collectedAmount: {
				type: 'string',
				default: '0'
			},
			goalLabel: {
				type: 'string',
				default: 'Goal'
			},
			goalAmount: {
				type: 'string',
				default: '0'
			},
			numberLabel: {
				type: 'string',
				default: 'Number'
			},
			numberValue: {
				type: 'string',
				default: '0'
			}
		},

		// Edit.
		edit: ( { attributes, setAttributes, className, clientId } ) => {
			return <dl>
				<RichText
					tagName="dt"
					className="ppcf-dl-list__label"
					value={ attributes.collectedLabel }
					onChange={ ( val ) => {
						setAttributes( { collectedLabel: val } );
					}}
				/>

				<RichText
					tagName="dd"
					className="ppcf-dl-list__label"
					value={ attributes.collectedAmount }
					onChange={ ( val ) => {
						setAttributes( { collectedAmount: val } );
					}}
				/>

				<RichText
					tagName="dt"
					className="ppcf-dl-list__label"
					value={ attributes.goalLabel }
					onChange={ ( val ) => {
						setAttributes( { goalLabel: val } );
					}}
				/>

				<RichText
					tagName="dd"
					className="ppcf-dl-list__label"
					value={ attributes.goalAmount }
					onChange={ ( val ) => {
						setAttributes( { goalAmount: val } );
					}}
				/>

				<RichText
					tagName="dt"
					className="ppcf-dl-list__label"
					value={ attributes.numberLabel }
					onChange={ ( val ) => {
						setAttributes( { numberLabel: val } );
					}}
				/>

				<RichText
					tagName="dd"
					className="ppcf-dl-list__label"
					value={ attributes.numberValue }
					onChange={ ( val ) => {
						setAttributes( { numberValue: val } );
					}}
				/>
			</dl>
        },

		// Save.
		save: ( { attributes } ) => {
			return <div>
				<div class="ppd-block__container__col">
					<dl class="ppd-dl-list">
						<dt class="ppd-dl-list__label">{ attributes.collectedLabel }</dt>
						<dd class="ppd-dl-list__value">{ attributes.collectedAmount }</dd>

						<dt class="ppd-dl-list__label">{ attributes.goalLabel }</dt>
						<dd class="ppd-dl-list__value">{ attributes.goalAmount }</dd>

						<dt class="ppd-dl-list__label">{ attributes.numberLabel }</dt>
						<dd class="ppd-dl-list__value">{ attributes.numberValue }</dd>
					</dl>
				</div>
			</div>
		}
	} );
} )();
