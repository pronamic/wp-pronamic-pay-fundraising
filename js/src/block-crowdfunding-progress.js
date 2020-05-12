/* globals pronamic_crowdfunding_progress */
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
	registerBlockType( 'pronamic-pay/crowdfunding-progress', {
		title: pronamic_crowdfunding_progress.title,
		icon: 'marker',
		category: 'pronamic-pay',
		parent: [ 'pronamic-pay/crowdfunding-donut', 'pronamic-pay/crowdfunding-bar', 'pronamic-pay/crowdfunding-compact', 'core/column', 'core/group' ],

		// Attributes.
		attributes: {
			color: {
				type: 'string',
				default: '#f9461c'
			},
			value: {
				type: 'integer',
				default: 0
			}
		},

		styles: [
			{
				name: 'donut',
				label: pronamic_crowdfunding_progress.label_donut,
				isDefault: true
			},
			{
				name: 'bar',
				label: pronamic_crowdfunding_progress.label_bar,
			}
		],

		// Edit.
		edit: ( { attributes, setAttributes, className } ) => {
			let { color, value } = attributes;

			let degrees = 0;

			let negativeClass = '';

			const onChangeValue = ( value ) => {
				setAttributes( { value: value } );

				if ( value > 50 ) {
					negativeClass = ' ppcf-circle--50';
				}
			}

			onChangeValue( value );

			// Classes.
			let classes = className;

			if ( className.indexOf( 'is-style' ) < 0) {
				classes += ' is-style-donut';
			}

			let isStyleDonut = classes.indexOf( 'is-style-donut' ) > -1;

			let barStyle = {};
			let fillStyle = {};
			let subClasses = '';

			if ( isStyleDonut ) {
				let degrees = ( value / 100 ) * 360;

				barStyle = {
					borderColor: color,
					transform: 'rotate( ' + Math.min( degrees, 360 ).toFixed( 2 ) + 'deg )'
				};

				if ( value > 50 ) {
					fillStyle = {
						borderColor: color,
					};
				}

				subClasses = 'ppcf-circle' + negativeClass;
			} else {
				barStyle = {
					background: color,
					width: Math.min( value,  100 ) + '%'
				};

				subClasses = 'ppcf-progress';
			}

			return (
				<div className={ classes }>
					{
						isStyleDonut ?
							<div className={ subClasses }>
								<span className="ppcf-circle__label">{ value }%</span>

								<div className="ppcf-circle__slice">
									<div className="ppcf-circle__slice__bar" style={ barStyle }></div>
									<div className="ppcf-circle__slice__fill" style={ fillStyle }></div>
								</div>
							</div>
						:
							<div className={ subClasses }>
								<div className="ppcf-progress__bar" style={ barStyle }>
									<span className="ppcf-progress__bar__status">
										{ value }%
									</span>
								</div>
							</div>
					}
				</div>
			);
		},

		// Save.
		save: ( { attributes } ) => {
			let className = attributes.className === undefined ? '' : attributes.className ;
			let { color, value } = attributes;

			// Classes.
			let classes = className;

			if ( className.indexOf( 'is-style' ) < 0 ) {
				classes += 'is-style-donut';
			}

			let isStyleDonut = classes.indexOf( 'is-style-donut' ) > -1;

			let barStyle = {};
			let fillStyle = {};
			let subClasses = '';

			if ( isStyleDonut ) {
				let degrees = ( value / 100 ) * 360;

				barStyle = {
					borderColor: color,
					transform: 'rotate( ' + Math.min( degrees, 360 ).toFixed( 2 ) + 'deg )'
				};

				subClasses = 'ppcf-circle';

				if ( value > 50 ) {
					subClasses += ' ppcf-circle--50';

					fillStyle = {
						borderColor: color,
					};
				}
			} else {
				barStyle = {
					background: color,
					width: Math.min( value, 100 ) + '%'
				};

				subClasses = 'ppcf-progress';
			}

			return (
				<div className={ classes }>
					{
						isStyleDonut ?
							<div className={ subClasses }>
								<span className="ppcf-circle__label">{ value }%</span>

								<div className="ppcf-circle__slice">
									<div className="ppcf-circle__slice__bar" style={ barStyle }></div>
									<div className="ppcf-circle__slice__fill" style={ fillStyle }></div>
								</div>
							</div>
						:
							<div className={ subClasses }>
								<div className="ppcf-progress__bar" style={ barStyle }>
									<span className="ppcf-progress__bar__status">
										{ value }%
									</span>
								</div>
							</div>
					}
				</div>
			);
		}
	} );
} )();
