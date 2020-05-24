<?php
/**
 * Block-crowdfunding-bar.php.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

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

?>
<div class="ppcf-block ppcf-block-bar">
	<div class="ppcf-progress">
		<div class="ppcf-progress__bar" style="<?php echo \esc_html( \implode( ' ', $bar_style ) ); ?>">
			<span class="ppcf-progress__bar__status"><?php echo \esc_html( $progress ); ?>%</span>
		</div>
	</div>
	<dl class="ppcf-dl-list">
		<dt class="ppcf-dl-list__label" style="color:<?php echo \esc_html( $attributes['color'] ); ?>"><?php echo $attributes['raisedLabel']; ?></dt>
		<dd class="ppcf-dl-list__value" style="color:<?php echo \esc_html( $attributes['color'] ); ?>"><?php echo \esc_html( $raised_amount->format_i18n_non_trailing_zeros() ); ?></dd>
		<dt class="ppcf-dl-list__label"><?php echo $attributes['targetLabel']; ?></dt>
		<dd class="ppcf-dl-list__value"><?php echo \esc_html( $target_amount->format_i18n_non_trailing_zeros() ); ?></dd>
	</dl>
</div>
