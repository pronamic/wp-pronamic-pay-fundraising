/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save ( { attributes } ) {
	return (
		<div className="ppcf-block ppcf-block-circle">
			<InnerBlocks.Content/>
		</div>
	);
}