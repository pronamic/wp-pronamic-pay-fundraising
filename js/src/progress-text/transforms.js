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
			blocks: [
				'pronamic-pay/fundraising-progress-circle',
				'pronamic-pay/fundraising-progress-bar'
			],
			transform: ( attributes ) => {
				return createBlock( 'pronamic-pay/fundraising-progress-text', attributes );
			}
		}
	]
}

export default transforms;