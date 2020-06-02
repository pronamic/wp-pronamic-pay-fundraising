/**
* WordPress dependencies.
*/
import { Component } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { ProgressCircle } from './progress-circle';
import { ProgressBar } from './progress-bar';

export class FundraisingProgress extends Component {
	render () {
		let { color, style, value } = this.props;

		let Progress;

		switch ( style ) {
			case 'circle':
				Progress = new ProgressCircle( value,  color );

				break;
			case 'bar':
			default:
				Progress = new ProgressBar( value,  color );
		}

		return Progress.render();
	}
}