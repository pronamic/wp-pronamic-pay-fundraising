/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { moreVertical as icon } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block';
import save from './save';

const { attributes, category, name, parent } = metadata;

export { metadata, name };

// Settings.
export const settings = {
	title: __( 'Details' ),
	description: __( 'Add a block that displays crowdfunding details.' ),
	category,
	parent,
	icon,
	example: {},
	attributes,
	edit,
	save
};