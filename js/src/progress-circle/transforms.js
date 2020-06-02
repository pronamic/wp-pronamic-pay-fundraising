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
				'pronamic-pay/fundraising-progress-bar',
				'pronamic-pay/fundraising-progress-text'
			],
			transform: ( attributes ) => {
				return createBlock( 'pronamic-pay/fundraising-progress-circle', attributes );
			}
		}
	]
}

export default transforms;