<?php
/**
 * Fundraising Progress Circle block template.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2021 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

use Pronamic\WordPress\Money\Parser;

$progress = Util::calculate_progress_value( $attributes['raisedAmount'], $attributes['targetAmount'] );

// Classes.
$classes = array( 'ppfr-circle' );

if ( $progress > 50 ) :
	$classes[] = 'ppfr-circle--50';
endif;

// Circle style.
$degrees = ( $progress / 100 ) * 360;

$bar_style = array(
	'border-color: ' . $attributes['color'] . ';',
	'transform: ' . sprintf( 'rotate( %.2Fdeg )', min( $degrees, 360 ) ) . ';',
);

$fill_style = array();

if ( $progress > 50 ) :
	$fill_style[] = 'border-color: ' . $attributes['color'] . ';';
endif;

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
<div class="ppfr-block ppfr-block-circle">
	<div class="ppfr-block-circle__container">
		<div class="ppfr-block__container__col">
			<div class="<?php echo \esc_attr( \implode( ' ', $classes ) ); ?>">
				<span class="ppfr-circle__label"><?php echo \esc_html( $progress ); ?>%</span>
				<div class="ppfr-circle__slice">
					<div class="ppfr-circle__slice__bar" style="<?php echo \esc_attr( \implode( ' ', $bar_style ) ); ?>"></div>
					<div class="ppfr-circle__slice__fill" style="<?php echo \esc_attr( \implode( ' ', $fill_style ) ); ?>"></div>
				</div>
			</div>
		</div>
		<div class="ppfr-block__container__col">
			<dl class="ppfr-dl-list">
				<dt class="ppfr-dl-list__label"><?php echo \wp_kses_post( $attributes['raisedLabel'] ); ?></dt>
				<dd class="ppfr-dl-list__value"><?php echo \esc_html( $raised_amount->format_i18n_non_trailing_zeros() ); ?></dd>
				<dt class="ppfr-dl-list__label"><?php echo \wp_kses_post( $attributes['targetLabel'] ); ?></dt>
				<dd class="ppfr-dl-list__value"><?php echo \esc_html( $target_amount->format_i18n_non_trailing_zeros() ); ?></dd>
				<dt class="ppfr-dl-list__label"><?php echo \wp_kses_post( $attributes['contributionsLabel'] ); ?></dt>
				<dd class="ppfr-dl-list__value"><?php echo esc_html( intval( $attributes['contributionsValue'] ) ); ?></dd>
			</dl>
		</div>
	</div>
</div>
