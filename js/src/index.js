/**
 * WordPress dependencies.
 */
import { getBlockType, registerBlockType, updateCategory } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import * as FundraisingProgressCircle from './progress-circle';
import * as FundraisingProgressBar from './progress-bar';
import * as FundraisingProgressText from './progress-text';

/**
 * Register block.
 *
 * @param {Object} block Block to register.
 * @return void
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	const { name, settings } = block;

	if ( ! getBlockType( name ) ) {
		registerBlockType( name, settings );
	}
};

// Register blocks.
[
	FundraisingProgressCircle,
	FundraisingProgressBar,
	FundraisingProgressText
].forEach( registerBlock );

// Set Pronamic Pay category icon.
updateCategory(
	'pronamic-pay',
	{
		icon: (
			<SVG width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<Path
					d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512c-48.85 0-94.504-13.682-133.34-37.424L174.558 384h92.988c70.693 0 128-57.308 128-128 0-70.692-57.307-128-128-128h-46.682c-15.248 0-27.608 12.36-27.608 27.608 0 15.247 12.36 27.608 27.608 27.608h46.682c40.198 0 72.784 32.586 72.784 72.784 0 40.198-32.586 72.784-72.784 72.784H167.153c-12.869 0-23.681 8.805-26.741 20.72a28 28 0 00-.606 1.966l-30.622 114.273C43.161 419.443 0 342.762 0 256 0 114.615 114.615 0 256 0zm11.545 220.863h-65.757c-19.406 0-35.137 15.731-35.137 35.137s15.731 35.137 35.137 35.137h65.757c19.406 0 35.137-15.731 35.137-35.137s-15.731-35.137-35.137-35.137z"
					fill="#A0A5AA"/>
			</SVG>
		)
	}
);