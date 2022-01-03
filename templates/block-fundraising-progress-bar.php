<?php
/**
 * Fundraising Progress Bar block template.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2022 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

use Pronamic\WordPress\Money\Parser;

$progress = Util::calculate_progress_value( $attributes['raisedAmount'], $attributes['targetAmount'] );

// Bar style.
$bar_style = array(
	'background: ' . $attributes['color'] . ';',
	'width: ' . sprintf( '%.2F', min( $progress, 100 ) ) . '%;',
);

// Amounts.
$parser = new Parser();

$raised_amount = $parser->parse( $attributes['raisedAmount'] );
$target_amount = $parser->parse( $attributes['targetAmount'] );

// Currency.
if ( \array_key_exists( 'currencyCode', $attributes ) ) :
	$raised_amount->set_currency( $attributes['currencyCode'] );
	$target_amount->set_currency( $attributes['currencyCode'] );
endif;

?>
<div class="ppfr-block ppfr-block-bar">
	<div class="ppfr-progress">
		<div class="ppfr-progress__bar" style="<?php echo \esc_attr( \implode( ' ', $bar_style ) ); ?>">
			<span class="ppfr-progress__bar__status"><?php echo \esc_html( $progress ); ?>%</span>
		</div>
	</div>
	<dl class="ppfr-dl-list">
		<dt class="ppfr-dl-list__label" style="color:<?php echo \esc_html( $attributes['color'] ); ?>"><?php echo \wp_kses_post( $attributes['raisedLabel'] ); ?></dt>
		<dd class="ppfr-dl-list__value" style="color:<?php echo \esc_html( $attributes['color'] ); ?>"><?php echo \esc_html( $raised_amount->format_i18n_non_trailing_zeros() ); ?></dd>
		<dt class="ppfr-dl-list__label"><?php echo \wp_kses_post( $attributes['targetLabel'] ); ?></dt>
		<dd class="ppfr-dl-list__value"><?php echo \esc_html( $target_amount->format_i18n_non_trailing_zeros() ); ?></dd>
	</dl>
</div>
