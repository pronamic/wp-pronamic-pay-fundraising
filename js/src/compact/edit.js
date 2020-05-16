/**
 * WordPress dependencies.
 */
import { createBlock } from '@wordpress/blocks';
import { ColorPalette, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { select } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../constants';
import { updateDetails, updateProgress } from '../utils';

// Template.
const TEMPLATE = [
	[ 'pronamic-pay/crowdfunding-details', {
		list: [
			{
				term: __( 'Raised' ),
				amount: '0,00'
			},
			{
				term: __( 'Target' ),
				amount: '0,00'
			},
			{
				term: __( 'Contributions' ),
				value: '0'
			}
		]
	} ]
];

const CompactEdit = ( { attributes, setAttributes, className, clientId } ) => {
	let { target, raised, contributions, color } = attributes;

	const onChangeTarget = useCallback(
		( target ) => {
			setAttributes( { target: target.replace( /,/g, '.' ) } );
		},
		[ setAttributes ]
	);

	const onChangeRaised = useCallback(
		( raised ) => {
			setAttributes( { raised: raised.replace( /,/g, '.' ) } );
		},
		[ setAttributes ]
	);

	const onChangeContributions = useCallback(
		( contributions ) => {
			setAttributes( { contributions: parseInt( contributions ) } );
		},
		[ setAttributes ]
	);

	const onChangeColor = useCallback(
		( color ) => {
			setAttributes( { color: color } );
		},
		[ setAttributes ]
	);

	// Update progress and details.
	let block = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];

	raised = raised ? raised : 0;
	target = target ? target : 0;
	contributions = contributions ? contributions : 0;

	updateProgress( block, color, raised, target );
	updateDetails( block, color, raised, target, contributions );

	// Inspector controls.
	const inspectorControls = (
		<InspectorControls>
			<PanelBody>
				<TextControl
					label={ __( 'Target' ) }
					value={ target }
					onChange={ onChangeTarget }
				/>
				<TextControl
					label={ __( 'Raised' ) }
					value={ raised }
					onChange={ onChangeRaised }
				/>
				<TextControl
					label={ __( 'Contributions' ) }
					value={ contributions }
					onChange={ onChangeContributions }
				/>
				<ColorPalette
					colors={ COLORS }
					value={ color }
					onChange={ onChangeColor }
				/>
			</PanelBody>
		</InspectorControls>
	);

	// Inner blocks template.
	let classes = className + ' ppcf-block ppcf-block-compact';

	return (
		<div className={ classes }>
			{ inspectorControls }
			<InnerBlocks template={ TEMPLATE } templateLock={ true } />
		</div>
	);
};

export default CompactEdit;