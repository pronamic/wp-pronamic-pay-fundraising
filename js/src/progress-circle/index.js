/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import icon from './icon';

/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block';
import save from './save';
import transforms from './transforms';

const { attributes, category, name } = metadata;

export { metadata, name };

// Settings.
export const settings = {
	title: __( 'Fundraising Progress Circle', 'pronamic-pay-fundraising' ),
	description: __( 'Displays fundraising information with circular progress chart.', 'pronamic-pay-fundraising' ),
	category,
	icon,
	example: {},
	attributes,
	edit,
	save,
	transforms
};