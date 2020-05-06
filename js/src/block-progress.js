const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { RangeControl, PanelBody } = wp.components;

( function () {
	'use strict';

	/**
	 * Register progress block type.
	 *
	 * @param string name     Block name.
	 * @param object settings Block settings.
	 *
	 * @return WPBlock        Block if registered successfully, otherwise "undefined".
	 */
	registerBlockType( 'pronamic-pay/progress', {
		title: 'Progress',
		icon: 'marker',
		category: 'pronamic-pay',
		parent: [ 'pronamic-pay/crowdfunding-ring', 'core/column' ],

		// Attributes.
		attributes: {
			value: {
				type: 'integer',
				default: 0
			}
		},

		styles: [
			{
				name: 'ring',
				label: 'Ring',
				isDefault: true
			},
			{
				name: 'bar',
				label: 'Bar'
			}
		],

		// Edit.
		edit( { attributes, setAttributes, className } ) {
			let { value } = attributes;

			let degrees = 0;

			let negativeClass = '';

			const onChangeValue = ( value ) => {
				setAttributes( { value: value } );

				degrees = ( value / 100 ) * 360;

				if ( value > 100 ) {
					degrees = 360;
				}

				if ( value > 50 ) {
					negativeClass = 'ppd-circle--50';
				}
			}

			onChangeValue( value );

			let style = {
				transform: 'rotate( ' + degrees.toFixed( 2 ) + 'deg )'
			};

			let classes = className + ' ppd-circle ' + negativeClass;

			return (
				<div className={ classes }>
					<span className="ppd-circle__label">{ value }%</span>

					<div className="ppd-circle__slice">
						<div className="ppd-circle__slice__bar" style={ style }></div>
						<div className="ppd-circle__slice__fill"></div>
					</div>
				</div>
			);
		},

		// Save.
		save( { attributes } ) {
			let degrees = ( attributes.value / 100 ) * 360;

			let classes = 'ppd-circle';

			if ( attributes.value > 50 ) {
				classes += ' ppd-circle--50';
			}

			let style = {
				transform: 'rotate( ' + degrees.toFixed( 2 ) + 'deg )'
			};

			return (
				<div className={ classes }>
					<span className="ppd-circle__label">{ attributes.value }%</span>

					<div className="ppd-circle__slice">
						<div className="ppd-circle__slice__bar" style={ style }></div>
						<div className="ppd-circle__slice__fill"></div>
					</div>
				</div>
			);
		}
	} );
} )();
