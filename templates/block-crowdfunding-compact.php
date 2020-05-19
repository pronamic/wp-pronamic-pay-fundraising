<?php
/**
 * Compact crowdfunding block template.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

use Pronamic\WordPress\Money\Parser;

// Amounts.
$parser = new Parser();

$raised_amount = $parser->parse( $attributes['raisedAmount'] );

?>
<div class="ppcf-block ppcf-block-compact">
	<dl class="ppcf-dl-list">
		<dt class="ppcf-dl-list__label"><?php echo $attributes['raisedLabel']; ?></dt>
		<dd class="ppcf-dl-list__value" style="color:<?php echo $attributes['color']; ?>"><?php echo \esc_html( $raised_amount->format_i18n_non_trailing_zeros() ); ?></dd>
		<dt class="ppcf-dl-list__label"><?php echo $attributes['contributionsLabel']; ?></dt>
		<dd class="ppcf-dl-list__value"><?php echo intval( $attributes['contributionsValue'] ); ?></dd>
	</dl>
</div>
