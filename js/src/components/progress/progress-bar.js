export class ProgressBar {
	constructor ( value, color ) {
		this.value = value;
		this.color = color;
	}

	render () {
		let { value, color } = this;

		// Bar style.
		let barStyle = {
			background: color,
			width: Math.min( value, 100 ) + '%'
		};

		return (
			<div className="ppfr-progress">
				<div className="ppfr-progress__bar" style={ barStyle }>
					<span className="ppfr-progress__bar__status">{ value }%</span>
				</div>
			</div>
		);
	}
}