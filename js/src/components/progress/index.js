/**
 * WordPress dependencies.
 */
import { Component } from '@wordpress/element';
import classnames from 'classnames';

export class CrowdfundingProgress extends Component {
	render () {
		let { color, style, value } = this.props;

		let barStyle = {},
			fillStyle = {};

		// Donut.
		if ( 'donut' === style ) {
			let classes = classnames( {
				'ppcf-circle': true,
				'ppcf-circle--50': ( value > 50 )
			} );

			let degrees = ( value / 100 ) * 360;

			barStyle = {
				borderColor: color,
				transform: 'rotate( ' + Math.min( degrees, 360 ).toFixed( 2 ) + 'deg )'
			};

			if ( value > 50 ) {
				fillStyle = {
					borderColor: color
				};
			}

			return (
				<div className={ classes }>
					<span className="ppcf-circle__label">{ value }%</span>
					<div className="ppcf-circle__slice">
						<div className="ppcf-circle__slice__bar" style={ barStyle }></div>
						<div className="ppcf-circle__slice__fill" style={ fillStyle }></div>
					</div>
				</div>
			);
		}

		// Bar.
		barStyle = {
			background: color,
			width: Math.min( value, 100 ) + '%'
		};

		return (
			<div className="ppcf-progress">
				<div className="ppcf-progress__bar" style={ barStyle }>
					<span className="ppcf-progress__bar__status">{ value }%</span>
				</div>
			</div>
		);
	}
}