/**
 * External dependencies.
 */
import classnames from 'classnames';

export default  function save( { attributes } ) {
	let className = ( attributes.className === undefined ? '' : attributes.className );

	let { color, value } = attributes;

	let isDonut = ( className.indexOf( 'is-style-bar' ) === -1 );

	// Classes.
	let classes = classnames( {
		'is-style-donut': isDonut
	} );

	let barStyle = {},
		fillStyle = {};

	// Donut style.
	if ( isDonut ) {
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

		let subClasses = classnames( {
			'ppcf-circle': true,
			'ppcf-circle--50': ( value > 50 )
		} );

		return (
			<div className={ classes }>
				<div className={ subClasses }>
					<span className="ppcf-circle__label">{ value }%</span>

					<div className="ppcf-circle__slice">
						<div className="ppcf-circle__slice__bar" style={ barStyle }></div>
						<div className="ppcf-circle__slice__fill" style={ fillStyle }></div>
					</div>
				</div>
			</div>
		);
	}

	// Bar style.
	barStyle = {
		background: color,
		width: Math.min( value, 100 ) + '%'
	};

	return (
		<div className={ classes }>
			<div className="ppcf-progress">
				<div className="ppcf-progress__bar" style={ barStyle }>
					<span className="ppcf-progress__bar__status">
						{ value }%
					</span>
				</div>
			</div>
		</div>
	);
}