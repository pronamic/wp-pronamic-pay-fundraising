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
			blocks: [ 'pronamic-pay/crowdfunding-bar', 'pronamic-pay/crowdfunding-compact' ],
			transform: ( attributes ) => {
				return createBlock( 'pronamic-pay/crowdfunding-donut', attributes );
			}
		}
	]
}

export default transforms;