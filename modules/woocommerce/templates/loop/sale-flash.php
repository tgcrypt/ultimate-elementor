<?php
/**
 * UAEL WooCommerce Products - Sale Flash.
 *
 * @package UAEL
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $post, $product;

$sale_text = __( 'Sale!', 'uael' );

if ( 'custom' === $this->get_instance_value( 'sale_flash_content' ) ) {

	$sale_price = $product->get_sale_price();

	if ( $sale_price ) {
		$sale_text = $this->get_instance_value( 'sale_flash_custom_string' );

		$regular_price = $product->get_regular_price();
		$percent_sale  = round( ( ( ( $regular_price - $sale_price ) / $regular_price ) * 100 ), 0 );
		$sale_text     = $sale_text ? $sale_text : '-[value]%';
		$sale_text     = str_replace( '[value]', $percent_sale, $sale_text );
	}
};


?>
<?php if ( $product->is_on_sale() ) : ?>

	<?php echo apply_filters( 'uael_woo_products_sale_flash', '<div class="uael-sale-flash-wrap"><span class="uael-onsale">' . esc_html( $sale_text ) . '</span></div>', $post, $product ); ?>

	<?php
endif;

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
