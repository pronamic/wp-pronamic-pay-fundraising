<?php
/**
 * Block-crowdfunding-donut.php.
 *
 * @author    Pronamic <info@pronamic.eu>
 * @copyright 2005-2020 Pronamic
 * @license   GPL-3.0-or-later
 * @package   Pronamic\WordPress\Pay
 */

namespace Pronamic\WordPress\Pay\Crowdfunding;

use Pronamic\WordPress\Money\Parser;

$progress = Util::calculate_progress_value( $attributes['raisedAmount'], $attributes['targetAmount'] );

// Classes.
$classes = array( 'ppcf-circle' );

if ( $progress > 50 ) :
	$classes[] = 'ppcf-circle--50';
endif;

// Donut style.
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

?>
<div class="ppcf-block ppcf-block-circle">
	<div class="ppcf-block-circle__container">
		<div class="ppcf-block__container__col">
			<div class="<?php echo \esc_html( \implode( ' ', $classes ) ); ?>">
				<span class="ppcf-circle__label"><?php echo \esc_html( $progress ); ?>%</span>
				<div class="ppcf-circle__slice">
					<div class="ppcf-circle__slice__bar" style="<?php echo \esc_html( \implode( ' ', $bar_style ) ); ?>"></div>
					<div class="ppcf-circle__slice__fill" style="<?php echo \esc_html( \implode( ' ', $fill_style ) ); ?>"></div>
				</div>
			</div>
		</div>
		<div class="ppcf-block__container__col">
			<dl class="ppcf-dl-list">
				<dt class="ppcf-dl-list__label"><?php echo $attributes['raisedLabel']; ?></dt>
				<dd class="ppcf-dl-list__value"><?php echo \esc_html( $raised_amount->format_i18n_non_trailing_zeros() ); ?></dd>
				<dt class="ppcf-dl-list__label"><?php echo $attributes['targetLabel']; ?></dt>
				<dd class="ppcf-dl-list__value"><?php echo \esc_html( $target_amount->format_i18n_non_trailing_zeros() ); ?></dd>
				<dt class="ppcf-dl-list__label"><?php echo $attributes['contributionsLabel']; ?></dt>
				<dd class="ppcf-dl-list__value"><?php echo esc_html( intval( $attributes['contributionsValue'] ) ); ?></dd>
			</dl>
		</div>
	</div>
</div>
