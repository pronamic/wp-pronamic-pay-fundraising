/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { CrowdfundingDetails } from '../components/details';
import { calculateProgressValue, formatMoney } from '../utils';
import classnames from 'classnames';

export default function save ( { attributes } ) {
	let {
		color,
		raisedLabel,
		raisedAmount,
		targetLabel,
		targetAmount,
		contributionsLabel,
		contributionsValue
	} = attributes;

	// Return early to use server render callback.
	return null;

	// Progress.
	let barStyle = {},
		fillStyle = {};

	let value = calculateProgressValue( raisedAmount, targetAmount );

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
		<div className="ppcf-block ppcf-block-circle">
			<div className="ppcf-block-circle__container">
				<div className="ppcf-block__container__col">
					<div className={ classes }>
						<span className="ppcf-circle__label">{ value }%</span>
						<div className="ppcf-circle__slice">
							<div className="ppcf-circle__slice__bar" style={ barStyle }></div>
							<div className="ppcf-circle__slice__fill" style={ fillStyle }></div>
						</div>
					</div>
				</div>
				<div className="ppcf-block__container__col">
					<dl className="ppcf-dl-list">
						<dt className="ppcf-dl-list__label">{ raisedLabel }</dt>
						<dd className="ppcf-dl-list__value">{ formatMoney( raisedAmount ) }</dd>
						<dt className="ppcf-dl-list__label">{ targetLabel }</dt>
						<dd className="ppcf-dl-list__value">{ formatMoney( targetAmount ) }</dd>
						<dt className="ppcf-dl-list__label">{ contributionsLabel }</dt>
						<dd className="ppcf-dl-list__value">{ parseInt( contributionsValue ).toString() }</dd>
					</dl>
				</div>
			</div>
		</div>
	);
}