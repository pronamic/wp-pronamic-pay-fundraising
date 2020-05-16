/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { moreHorizontal as icon } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block';
import save from './save';
import styles from './styles';

const { attributes, category, name, parent } = metadata;

export { metadata, name };

// Settings.
export const settings = {
	title: __( 'Progress' ),
	description: __( 'Add a block that displays crowdfunding progress.' ),
	category,
	parent,
	icon,
	example: {},
	styles,
	attributes,
	edit,
	save
};