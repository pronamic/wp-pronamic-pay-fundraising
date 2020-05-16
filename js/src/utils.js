/**
 * WordPress dependencies.
 */
import { dispatch } from '@wordpress/data';

/**
 * Recursive update inner blocks.
 *
 * @param string blockType   Block type.
 * @param object parentBlock Parent block.
 * @param object attr        Attribute updates.
 * @return void
 */
export function recursiveUpdateInnerBlocks ( blockType, parentBlock, attr ) {
	if ( ! parentBlock.innerBlocks ) {
		return;
	}

	parentBlock.innerBlocks.forEach( ( block ) => {
		if ( blockType === block.name ) {
			// Update attribute `list`.
			if ( attr.hasOwnProperty( 'list' ) ) {
				attr.list.map( ( item, index ) => {
					// Merge current block attribute with item updates.
					attr.list[ index ] = Object.assign( block.attributes.list[ index ], item );
				} );
			}

			dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, attr );
		}

		recursiveUpdateInnerBlocks( blockType, block, attr );
	} );
};

export function updateProgress( block, color, raised, target ) {
	if ( ! block ) {
		return;
	}

	// Attribute updates.
	let attr = {
		color: color,
		value: calculateProgressValue( raised, target )
	};

	recursiveUpdateInnerBlocks( 'pronamic-pay/crowdfunding-progress', block, attr );
};

export function updateDetails( block, color, raised, target, contributions ) {
	if ( ! block ) {
		return;
	}

	// Compose raised item.
	let itemRaised = {
		amount: parseFloat( raised )
	};

	if ( 'pronamic-pay/crowdfunding-bar' === block.name ) {
		itemRaised.color = {
			label: color,
			value: color,
		};
	}

	if ( 'pronamic-pay/crowdfunding-compact' === block.name ) {
		itemRaised.color = {
			value: color,
		};
	}

	// Attribute updates.
	let attr = {
		color: color,
		list: [
			itemRaised,
			{ amount: parseFloat( target ) },
			{ value: parseInt( contributions ) }
		]
	};

	recursiveUpdateInnerBlocks( 'pronamic-pay/crowdfunding-details', block, attr );
};

/**
 * Calculate progress value.
 *
 * @param string raised Raised amount.
 * @param string target Target amount.
 * @return float
 */
export function calculateProgressValue( raised, target ) {
	raised = parseFloat( raised );
	target = parseFloat( target );

	if ( 0 == target && ( 0 == raised || raised > target ) ) {
		target = 100;
	}

	return Math.floor( ( raised / target ) * 100 );
};