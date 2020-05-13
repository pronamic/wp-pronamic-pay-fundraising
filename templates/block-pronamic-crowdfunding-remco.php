<?php



?>
<div class="ppd-block__container__col">
	<dl class="ppd-dl-list">
		<dt class="ppd-dl-list__label"><?php echo \esc_html( $attributes['collectedLabel'] ); ?></dt>
		<dd class="ppd-dl-list__value"><?php echo \esc_html( $attributes['collectedAmount'] ); ?></dd>

		<dt class="ppd-dl-list__label"><?php echo \esc_html( $attributes['goalLabel'] ); ?></dt>
		<dd class="ppd-dl-list__value"><?php echo \esc_html( $attributes['goalAmount'] ); ?></dd>

		<dt class="ppd-dl-list__label"><?php echo \esc_html( $attributes['numberLabel'] ); ?></dt>
		<dd class="ppd-dl-list__value"><?php echo \esc_html( $attributes['numberValue'] ); ?></dd>
	</dl>
</div>

<h2>Attributes</h2>

<?php var_dump( $attributes ); ?>

<h2>HTML</h2>

<pre><?php echo esc_html( $content ); ?></pre>
