/**
 * WordPress dependencies.
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Transforms.
 */
const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'pronamic-pay/crowdfunding-donut', 'pronamic-pay/crowdfunding-compact' ],
			transform: ( attributes ) => {
				return createBlock( 'pronamic-pay/crowdfunding-bar', attributes );
			}
		}
	]
}

export default transforms;