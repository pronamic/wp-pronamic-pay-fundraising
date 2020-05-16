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
			blocks: [ 'pronamic-pay/crowdfunding-donut', 'pronamic-pay/crowdfunding-bar' ],
			transform: ( attributes ) => {
				return createBlock( 'pronamic-pay/crowdfunding-compact', attributes );
			}
		}
	]
}

export default transforms;