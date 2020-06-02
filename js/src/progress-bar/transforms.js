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
				'pronamic-pay/fundraising-progress-text'
			],
			transform: ( attributes ) => {
				return createBlock( 'pronamic-pay/fundraising-progress-bar', attributes );
			}
		}
	]
}

export default transforms;