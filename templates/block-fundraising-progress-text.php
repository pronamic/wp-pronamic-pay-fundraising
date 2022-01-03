<?php
/**
 * Fundraising Progress Text block template.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2022 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Fundraising;

use Pronamic\WordPress\Money\Parser;

// Amount.
$parser = new Parser();

$raised_amount = $parser->parse( $attributes['raisedAmount'] );

// Currency.
if ( \array_key_exists( 'currencyCode', $attributes ) ) :
	$raised_amount->set_currency( $attributes['currencyCode'] );
endif;

?>
<div class="ppfr-block ppfr-block-compact">
	<dl class="ppfr-dl-list">
		<dt class="ppfr-dl-list__label"><?php echo \wp_kses_post( $attributes['raisedLabel'] ); ?></dt>
		<dd class="ppfr-dl-list__value" style="color:<?php echo \esc_attr( $attributes['color'] ); ?>"><?php echo \esc_html( $raised_amount->format_i18n_non_trailing_zeros() ); ?></dd>
		<dt class="ppfr-dl-list__label"><?php echo \wp_kses_post( $attributes['contributionsLabel'] ); ?></dt>
		<dd class="ppfr-dl-list__value"><?php echo intval( $attributes['contributionsValue'] ); ?></dd>
	</dl>
</div>
