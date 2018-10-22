<?php
/**
 * UAEL Posts Module.
 *
 * @package UAEL
 */

namespace UltimateElementor\Modules\Posts;

use UltimateElementor\Base\Module_Base;
use Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Module.
 */
class Module extends Module_Base {

	/**
	 * Module should load or not.
	 *
	 * @since 1.7.0
	 * @access public
	 *
	 * @return bool true|false.
	 */
	public static function is_enable() {
		return true;
	}

	/**
	 * Get Module Name.
	 *
	 * @since 1.7.0
	 * @access public
	 *
	 * @return string Module name.
	 */
	public function get_name() {
		return 'posts';
	}

	/**
	 * Get Widgets.
	 *
	 * @since 1.7.0
	 * @access public
	 *
	 * @return array Widgets.
	 */
	public function get_widgets() {
		return [
			'Posts',
		];
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct();

		add_action( 'wp_ajax_uael_get_post', array( $this, 'get_post_data' ) );
		add_action( 'wp_ajax_nopriv_uael_get_post', array( $this, 'get_post_data' ) );
	}

	/**
	 * Get Post Data via AJAX call.
	 *
	 * @since 1.7.0
	 * @access public
	 */
	public function get_post_data() {

		$post_id   = $_POST['page_id'];
		$widget_id = $_POST['widget_id'];
		$style_id  = $_POST['skin'];

		$elementor = \Elementor\Plugin::$instance;
		$meta      = $elementor->db->get_plain_editor( $post_id );

		$widget_data = $this->find_element_recursive( $meta, $widget_id );

		$data = array(
			'message'    => __( 'Saved', 'uael' ),
			'ID'         => '',
			'skin_id'    => '',
			'html'       => '',
			'pagination' => '',
		);

		if ( null != $widget_data ) {

			// Restore default values.
			$widget = $elementor->elements_manager->create_element_instance( $widget_data );

			// Return data and call your function according to your need for ajax call.
			// You will have access to settings variable as well as some widget functions.
			$skin = TemplateBlocks\Skin_Init::get_instance( $style_id );

			// Here you will just need posts based on ajax requst to attache in layout.
			$html = $skin->inner_render( $style_id, $widget );

			$pagination = $skin->page_render( $style_id, $widget );

			$data['ID']         = $widget->get_id();
			$data['skin_id']    = $widget->get_current_skin_id();
			$data['html']       = $html;
			$data['pagination'] = $pagination;
		}

		wp_send_json_success( $data );
	}

	/**
	 * Get Widget Setting data.
	 *
	 * @since 1.7.0
	 * @access public
	 * @param array  $elements Element array.
	 * @param string $form_id Element ID.
	 * @return Boolean True/False.
	 */
	public function find_element_recursive( $elements, $form_id ) {

		foreach ( $elements as $element ) {
			if ( $form_id === $element['id'] ) {
				return $element;
			}

			if ( ! empty( $element['elements'] ) ) {
				$element = $this->find_element_recursive( $element['elements'], $form_id );

				if ( $element ) {
					return $element;
				}
			}
		}

		return false;
	}
}
