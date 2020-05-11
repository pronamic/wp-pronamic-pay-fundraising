/* globals pronamic_crowdfunding_donut */
const { data, ServerSideRenderer } = wp;
const { updateCategory, registerBlockType } = wp.blocks;
const { Button, ColorPalette, HTML, InnerBlocks, InspectorControls, Placeholder } = wp.blockEditor;
const { TextControl, PanelBody } = wp.components;
const { SVG, G, Path, Polygon, Rect, Circle } = wp.components;

( function () {
	'use strict';

	/**
	 * Register crowdfunding donut block type.
	 *
	 * @param string name     Block name.
	 * @param object settings Block settings.
	 *
	 * @return WPBlock        Block if registered successfully, otherwise "undefined".
	 */
	registerBlockType( 'pronamic-pay/crowdfunding-donut', {
		title: pronamic_crowdfunding_donut.title,
		icon: 'marker',
		category: 'pronamic-pay',

		// Attributes.
		attributes: {
			target: {
				type: 'string',
				value: '0',
				default: '0'
			},
			raised: {
				type: 'string',
				default: '0'
			},
			contributions: {
				type: 'integer',
				default: 0
			},
			color: {
				type: 'string',
				default: '#f9461c'
			}
		},

		// Edit.
		edit: ( { attributes, setAttributes, className, clientId } ) => {
			let { target, raised, contributions, color } = attributes;

			const onChangeTarget = ( updatedTarget ) => {
				updatedTarget = updatedTarget.replace( /,/g, '.' );

				target = updatedTarget;

				setAttributes( { target: updatedTarget } );
			}

			const onChangeRaised = ( updatedRaised ) => {
				updatedRaised = updatedRaised.replace( /,/g, '.' );

				raised = updatedRaised;

				setAttributes( { raised: updatedRaised } );
			}

			const onChangeContributions = ( updatedContributions ) => {
				updatedContributions = parseInt( updatedContributions );

				contributions = updatedContributions;

				setAttributes( { contributions: updatedContributions } );
			}

			const onChangeColor = ( color ) => {
				setAttributes( { color: color } );
			}

			const recursiveUpdateInnerBlocks = ( blockType, parentBlock, attr ) => {
				if ( ! parentBlock.innerBlocks ) {
					return;
				}

				parentBlock.innerBlocks.forEach( ( block ) => {
					if ( blockType === block.name ) {
						if ( attr.hasOwnProperty( 'list' ) ) {
							attr.list.map( ( item, index ) => {
								// Merge current block attribute with item updates.
								attr.list[ index ] = Object.assign( block.attributes.list[ index ], item );
							} );
						}

						data.dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, attr );
					}

					recursiveUpdateInnerBlocks( blockType, block, attr );
				} );
			};

			const updateProgress = () => {
				// Get inner blocks of this block.
				let block = data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[0];

				// Calculate progress.
				let target = parseFloat( attributes.target );
				let raised = parseFloat( attributes.raised );

				if ( raised > target && 0 == target || 0 == target && 0 == raised ) {
					target = 1;
				}

				let attr = {
					value: Math.floor( ( raised / target ) * 100 )
				};

				recursiveUpdateInnerBlocks( 'pronamic-pay/crowdfunding-progress', block, attr );
			}

			const updateDetails = () => {
				// Get inner blocks of this block.
				let block = data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[0];

				// Attribute updates.
				let attr = {
					list: [
						{ amount: parseFloat( raised ) },
						{ amount: parseFloat( target ) },
						{ value: parseInt( contributions ) }
					]
				};

				recursiveUpdateInnerBlocks( 'pronamic-pay/crowdfunding-details', block, attr );
			}

			updateProgress();
			updateDetails();

			// Inspector controls.
			const colors = [
				{ name: 'orange', color: '#f9461c' },
				{ name: 'purple', color: '#6355ff' },
				{ name: 'green', color: '#2ce3be' }
			];

			const inspectorControls = (
				<InspectorControls>
					<PanelBody>
						<TextControl
							label={ pronamic_crowdfunding_donut.label_target }
							value={ target }
							onChange={ onChangeTarget }
						/>
						<TextControl
							label={ pronamic_crowdfunding_donut.label_raised }
							value={ raised }
							onChange={ onChangeRaised }
						/>
						<TextControl
							label={ pronamic_crowdfunding_donut.label_contributions }
							value={ contributions }
							onChange={ onChangeContributions }
						/>
						<ColorPalette
							colors={ colors }
							value={ color }
							onChange={ onChangeColor }
						/>
					</PanelBody>
				</InspectorControls>
			);

			// Inner blocks template.
			const TEMPLATE = [
				[ 'core/columns', {}, [
					[ 'core/column', { width: 20 }, [
						[ 'pronamic-pay/crowdfunding-progress', {} ]
					] ],
					[ 'core/column', { width: 80 }, [
						[ 'pronamic-pay/crowdfunding-details', {} ]
					] ]
				] ],
			];

			let classes = className + ' ppcf-block ppcf-block-circle';

			return (
				<div className={ classes }>
					{ inspectorControls }
					<InnerBlocks template={ TEMPLATE } />
				</div>
			);
		},

		// Save.
		save: ( { attributes } ) => {
			return (
				<div className="ppcf-block ppcf-block-circle">
					<InnerBlocks.Content />
				</div>
			);
		}
	} );

	/**
	 * Pronamic Pay block category icon.
	 */
	updateCategory( 'pronamic-pay', {
		icon: (
			<SVG width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<Path d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512c-48.85 0-94.504-13.682-133.34-37.424L174.558 384h92.988c70.693 0 128-57.308 128-128 0-70.692-57.307-128-128-128h-46.682c-15.248 0-27.608 12.36-27.608 27.608 0 15.247 12.36 27.608 27.608 27.608h46.682c40.198 0 72.784 32.586 72.784 72.784 0 40.198-32.586 72.784-72.784 72.784H167.153c-12.869 0-23.681 8.805-26.741 20.72a28 28 0 00-.606 1.966l-30.622 114.273C43.161 419.443 0 342.762 0 256 0 114.615 114.615 0 256 0zm11.545 220.863h-65.757c-19.406 0-35.137 15.731-35.137 35.137s15.731 35.137 35.137 35.137h65.757c19.406 0 35.137-15.731 35.137-35.137s-15.731-35.137-35.137-35.137z" fill="#A0A5AA" />
			</SVG>
		)
	} );
} )();
