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

			let style = {};
			let subClasses = '';

			if ( isStyleDonut ) {
				style = { transform: 'rotate( ' + degrees.toFixed( 2 ) + 'deg )' };

				subClasses = 'ppcf-circle' + negativeClass;
			} else {
				let width = ( value > 100 ? 100 : value );

				style = { width: width + '%' };

				subClasses = 'ppcf-progress';
			}

			return (
				<div className={ classes }>
					{
						isStyleDonut ?
							<div className={ subClasses }>
								<span className="ppcf-circle__label">{ value }%</span>

								<div className="ppcf-circle__slice">
									<div className="ppcf-circle__slice__bar" style={ style }></div>
									<div className="ppcf-circle__slice__fill"></div>
								</div>
							</div>
						:
							<div className={ subClasses }>
								<div className="ppcf-progress__bar" style={ style }>
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

			// Classes.
			let classes = className;

			if ( className.indexOf( 'is-style' ) < 0 ) {
				classes += 'is-style-donut';
			}

			let isStyleDonut = classes.indexOf( 'is-style-donut' ) > -1;

			let style = {};
			let subClasses = '';

			if ( isStyleDonut ) {
				let degrees = ( attributes.value / 100 ) * 360;

				if ( degrees > 360 ) {
					degrees = 360;
				}

				style = { transform: 'rotate( ' + degrees.toFixed( 2 ) + 'deg )' };

				subClasses = 'ppcf-circle';

				if ( attributes.value > 50 ) {
					subClasses += ' ppcf-circle--50';
				}
			} else {
				let width = ( attributes.value > 100 ? 100 : attributes.value );

				style = { width: width + '%' };

				subClasses = 'ppcf-progress';
			}

			return (
				<div className={ classes }>
					{
						isStyleDonut ?
							<div className={ subClasses }>
								<span className="ppcf-circle__label">{ attributes.value }%</span>

								<div className="ppcf-circle__slice">
									<div className="ppcf-circle__slice__bar" style={ style }></div>
									<div className="ppcf-circle__slice__fill"></div>
								</div>
							</div>
						:
							<div className={ subClasses }>
								<div className="ppcf-progress__bar" style={ style }>
									<span className="ppcf-progress__bar__status">
										{ attributes.value }%
									</span>
								</div>
							</div>
					}
				</div>
			);
		}
	} );
} )();
