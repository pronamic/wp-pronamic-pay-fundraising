/**
 * External dependencies.
 */
import classnames from 'classnames';

export class ProgressCircle {
	constructor( value, color ) {
		this.value = value;
		this.color = color;
	}

	render () {
		let { value, color } = this;

		// Bar style.
		let degrees = ( value / 100 ) * 360;

		let barStyle = {
			borderColor: color,
			transform: 'rotate( ' + Math.min( degrees, 360 ).toFixed( 2 ) + 'deg )'
		};

		// Fill style.
		let fillStyle = {};

		if ( value > 50 ) {
			fillStyle = {
				borderColor: color
			};
		}

		// Classes.
		let classes = classnames( {
			'ppfr-circle': true,
			'ppfr-circle--50': ( value > 50 )
		} );

		return (
			<div className={ classes }>
				<span className="ppfr-circle__label">{ value }%</span>
				<div className="ppfr-circle__slice">
					<div className="ppfr-circle__slice__bar" style={ barStyle }></div>
					<div className="ppfr-circle__slice__fill" style={ fillStyle }></div>
				</div>
			</div>
		);
	}
}