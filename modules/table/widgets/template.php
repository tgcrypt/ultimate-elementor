<?php
/**
 * UAEL Table Module Template.
 *
 * @package UAEL
 */

use Elementor\Control_Media;

// Wrapper.
$this->add_render_attribute( 'uael_table_wrapper', 'class', 'uael-table-wrapper' );
$this->add_render_attribute( 'uael_table_wrapper', 'itemtype', 'http://schema.org/Table' );

// Input Box.
$this->add_render_attribute( 'uael_search_box', 'id', 'uael-search-box' );
$this->add_render_attribute( 'uael_search_box', 'class', 'uael-search-table' );
$this->add_render_attribute( 'uael_search_box', 'type', 'text' );
$this->add_render_attribute( 'uael_search_box', 'title', 'Search here' );
// Table.
$this->add_render_attribute( 'uael_table_id', 'id', 'uael-table-id-' . $node_id );
if ( 'responsive' !== $settings['responsive'] ) {
	$this->add_render_attribute( 'uael_table_id', 'class', 'uael-text-break' );
}
$this->add_render_attribute( 'uael_table_id', 'class', 'uael-column-rules' );
$this->add_render_attribute( 'uael_table_id', 'class', 'uael-table' );
// Tr (Row).
$this->add_render_attribute( 'uael_table_row', 'class', 'uael-table-row' );
// Text span.
$this->add_render_attribute( 'uael_table__text', 'class', 'uael-table__text' );
// Sortable.
if ( 'yes' === $settings['sortable'] ) {
	$this->add_render_attribute( 'uael_table_id', 'data-sort-table', $settings['sortable'] );
} else {
	$this->add_render_attribute( 'uael_table_id', 'data-sort-table', 'no' );
}
// Show entries.
if ( 'yes' === $settings['show_entries'] ) {
	$this->add_render_attribute( 'uael_table_id', 'data-show-entry', $settings['show_entries'] );
} else {
	$this->add_render_attribute( 'uael_table_id', 'data-show-entry', 'no' );
}

$csv = $this->parse_csv();

?>
<div itemscope <?php echo $this->get_render_attribute_string( 'uael_table_wrapper' ); ?>>
	<div class="uael-advance-heading" itemprop="about">
		<div class="uael-tbl-entry-wrapper">
			<?php if ( 'yes' === $settings['show_entries'] ) { ?>
				<?php $row_count = 1; ?>
				<label class="uael-lbl-entry"><?php _e( 'Show Entries: ', 'uael' ); ?></label><select id="uael-show-entries" class="uael-entries-box">
				<?php if ( 'file' == $settings['source'] ) { ?>
					<?php
					$max = 0;
					if ( is_array( $csv['rows'] ) ) {
						$max = max( $csv['rows'] );
					}
					for ( $i = 1; $i < $max; $i++ ) {
						?>
					<option value="<?php echo $i; ?>"><?php echo $i; ?></option>
					<?php } ?>
					<option value="<?php echo $max; ?>" selected="selected"><?php _e( 'All', 'uael' ); ?></option>

				<?php } else { ?>

					<?php $arr_row_count = array(); ?>
					<?php
					if ( isset( $settings['table_content'] ) ) {

						foreach ( $settings['table_content'] as $index => $row ) {
							if ( 'row' === $row['content_type'] ) {
								array_push( $arr_row_count, $row_count );
								++$row_count;
							}
						}
					}
					$row_count = 1;
					if ( isset( $settings['table_content'] ) ) {

						foreach ( $settings['table_content'] as $index => $row ) {
							if ( 'row' === $row['content_type'] ) {
								if ( count( $arr_row_count ) === $row_count ) {
									?>
								<option value="<?php echo $row_count; ?>" selected="selected"><?php _e( 'All', 'uael' ); ?></option>
								<?php } else { ?>
								<option value="<?php echo $row_count; ?>"><?php echo $row_count; ?></option>
									<?php
}
								++$row_count;
							}
						}
					}
					?>
				<?php } ?>
				</select>
			<?php } ?>
		</div>
		<div class="uael-tbl-search-wrapper">
			<?php if ( 'yes' === $settings['searchable'] ) { ?>
				<label class="uael-lbl-search"><?php _e( 'Search: ', 'uael' ); ?></label><input <?php echo $this->get_render_attribute_string( 'uael_search_box' ); ?>>
			<?php } ?>
		</div>
	</div>
	<?php
	if ( 'file' == $settings['source'] ) {
		echo $csv['html'];
	} else {
		?>
	<table <?php echo $this->get_render_attribute_string( 'uael_table_id' ); ?>>
		<?php
		$first_row_h    = true;
		$counter_h      = 1;
		$cell_counter_h = 0;
		$inline_count   = 0;
		$row_count_h    = count( $settings['table_headings'] );
		$header_text    = array();
		$data_entry     = 0;

		if ( $row_count_h > 1 ) {
			?>
		<thead>
			<?php
			if ( $settings['table_headings'] ) {
				foreach ( $settings['table_headings'] as $index => $head ) {
					// Header text prepview editing.
					$repeater_heading_text = $this->get_repeater_setting_key( 'heading_text', 'table_headings', $inline_count );
					$this->add_render_attribute( $repeater_heading_text, 'class', 'uael-table__text-inner' );
					$this->add_inline_editing_attributes( $repeater_heading_text );
					// TH.
					if ( true === $first_row_h ) {
						$this->add_render_attribute( 'current_' . $head['_id'], 'data-sort', $cell_counter_h );
					}
					$this->add_render_attribute( 'current_' . $head['_id'], 'class', 'sort-this' );
					$this->add_render_attribute( 'current_' . $head['_id'], 'class', 'elementor-repeater-item-' . $head['_id'] );
					$this->add_render_attribute( 'current_' . $head['_id'], 'class', 'uael-table-col' );
					if ( 1 < $head['heading_col_span'] ) {
						$this->add_render_attribute( 'current_' . $head['_id'], 'colspan', $head['heading_col_span'] );
					}
					if ( 1 < $head['heading_row_span'] ) {
						$this->add_render_attribute( 'current_' . $head['_id'], 'rowspan', $head['heading_row_span'] );
					}
					// Sort Icon.
					if ( 'yes' === $settings['sortable'] && true === $first_row_h ) {
						$this->add_render_attribute( 'icon_sort_' . $head['_id'], 'class', 'fa fa-sort' );
					}
					if ( true === $first_row_h ) {
						$this->add_render_attribute( 'icon_sort_' . $head['_id'], 'class', 'uael-sort-icon' );
					}
					if ( $head['head_image']['url'] ) {
						$this->add_render_attribute( 'uael_head_col_img' . $head['_id'], 'src', $head['head_image']['url'] );
						$this->add_render_attribute( 'uael_head_col_img' . $head['_id'], 'class', 'uael-col-img--' . $settings['all_image_align'] );
						$this->add_render_attribute( 'uael_head_col_img' . $head['_id'], 'title', get_the_title( $head['head_image']['id'] ) );
						$this->add_render_attribute( 'uael_head_col_img' . $head['_id'], 'alt', Control_Media::get_image_alt( $head['head_image'] ) );
					}
					// ICON.
					$this->add_render_attribute( 'uael_heading_icon' . $head['_id'], 'class', $head['heading_icon'] );
					$this->add_render_attribute( 'uael_heading_icon_align' . $head['_id'], 'class', 'uael-align-icon--' . $settings['all_icon_align'] );

					if ( 'cell' === $head['header_content_type'] ) {
						?>
						<th <?php echo $this->get_render_attribute_string( 'current_' . $head['_id'] ); ?> scope="col">
							<span class="sort-style">
							<span <?php echo $this->get_render_attribute_string( 'uael_table__text' ); ?>>
								<?php if ( 'icon' === $head['header_content_icon_image'] ) { ?>
									<?php if ( $head['heading_icon'] ) { ?>
										<?php if ( 'left' === $settings['all_icon_align'] ) { ?>
									<span <?php echo $this->get_render_attribute_string( 'uael_heading_icon_align' . $head['_id'] ); ?>>
										<i <?php echo $this->get_render_attribute_string( 'uael_heading_icon' . $head['_id'] ); ?>></i>
									</span>
								<?php } ?>
								<?php } ?>
								<?php } else { ?>
										<?php if ( $head['head_image']['url'] ) { ?>
											<?php if ( 'left' == $settings['all_image_align'] ) { ?>
											<img <?php echo $this->get_render_attribute_string( 'uael_head_col_img' . $head['_id'] ); ?>>
										<?php } ?>
										<?php } ?>
								<?php } ?>
								<span <?php echo $this->get_render_attribute_string( $repeater_heading_text ); ?>><?php echo $head['heading_text']; ?></span>
								<?php if ( 'icon' === $head['header_content_icon_image'] ) { ?>
									<?php if ( $head['heading_icon'] ) { ?>
										<?php if ( 'right' === $settings['all_icon_align'] ) { ?>
									<span <?php echo $this->get_render_attribute_string( 'uael_heading_icon_align' . $head['_id'] ); ?>>
										<i <?php echo $this->get_render_attribute_string( 'uael_heading_icon' . $head['_id'] ); ?>></i>
									</span>
								<?php } ?>
								<?php } ?>
								<?php } else { ?>
										<?php if ( $head['head_image']['url'] ) { ?>
											<?php if ( 'right' == $settings['all_image_align'] ) { ?>
											<img <?php echo $this->get_render_attribute_string( 'uael_head_col_img' . $head['_id'] ); ?>>
										<?php } ?>
										<?php } ?>
								<?php } ?>
							</span>
							<?php if ( 'yes' === $settings['sortable'] && true === $first_row_h ) { ?>
								<i <?php echo $this->get_render_attribute_string( 'icon_sort_' . $head['_id'] ); ?>></i>
							<?php } ?>
							</span>
						</th>
						<?php
						$header_text[ $cell_counter_h ] = $head['heading_text'];
						$cell_counter_h++;
					} else {
						if ( $counter_h > 1 && $counter_h < $row_count_h ) {
							// Break into new row.
							?>
							</tr><tr <?php echo $this->get_render_attribute_string( 'uael_table_row' ); ?>>
							<?php
							$first_row_h = false;
						} elseif ( 1 === $counter_h && false === $this->is_invalid_first_row() ) {
							?>
							<tr <?php echo $this->get_render_attribute_string( 'uael_table_row' ); ?>>
											<?php
						}
						$cell_counter_h = 0;
					}
					$counter_h++;
					$inline_count++;
				}
			}
			?>
		</thead>
		<?php } ?>
		<tbody>
			<!-- ROWS -->
			<?php
			$counter           = 1;
			$cell_counter      = 0;
			$cell_inline_count = 0;
			$row_count         = count( $settings['table_content'] );
			if ( $settings['table_content'] ) {
				foreach ( $settings['table_content'] as $index => $row ) {
					// Cell text inline classes.
					$repeater_cell_text = $this->get_repeater_setting_key( 'cell_text', 'table_content', $cell_inline_count );
					$this->add_render_attribute( $repeater_cell_text, 'class', 'uael-table__text-inner' );
					$this->add_inline_editing_attributes( $repeater_cell_text );
					$this->add_render_attribute( 'uael_cell_icon_align' . $row['_id'], 'class', 'uael-align-icon--' . $settings['all_icon_align'] );
					$this->add_render_attribute( 'uael_cell_icon' . $row['_id'], 'class', $row['cell_icon'] );
					$this->add_render_attribute( 'uael_table_col' . $row['_id'], 'class', 'uael-table-col' );
					$this->add_render_attribute( 'uael_table_col' . $row['_id'], 'class', 'elementor-repeater-item-' . $row['_id'] );
					if ( 1 < $row['cell_span'] ) {
						$this->add_render_attribute( 'uael_table_col' . $row['_id'], 'colspan', $row['cell_span'] );
					}
					if ( 1 < $row['cell_row_span'] ) {
						$this->add_render_attribute( 'uael_table_col' . $row['_id'], 'rowspan', $row['cell_row_span'] );
					}
					if ( $row['image']['url'] ) {
						$this->add_render_attribute( 'uael_col_img' . $row['_id'], 'src', $row['image']['url'] );
						$this->add_render_attribute( 'uael_col_img' . $row['_id'], 'class', 'uael-col-img--' . $settings['all_image_align'] );
						$this->add_render_attribute( 'uael_col_img' . $row['_id'], 'title', get_the_title( $row['image']['id'] ) );
						$this->add_render_attribute( 'uael_col_img' . $row['_id'], 'alt', Control_Media::get_image_alt( $row['image'] ) );
					}
					if ( ! empty( $row['link']['url'] ) ) {
						$this->add_render_attribute( 'col-link-' . $row['_id'], 'href', $row['link']['url'] );
						if ( $row['link']['is_external'] ) {
							$this->add_render_attribute( 'col-link-' . $row['_id'], 'target', '_blank' );
						}
						if ( $row['link']['nofollow'] ) {
							$this->add_render_attribute( 'col-link-' . $row['_id'], 'rel', 'nofollow' );
						}
					}

					if ( 'cell' === $row['content_type'] ) {
						// Fetch corresponding header cell text.
						if ( isset( $header_text[ $cell_counter ] ) && $header_text[ $cell_counter ] ) {
							$this->add_render_attribute( 'uael_table_col' . $row['_id'], 'data-title', $header_text[ $cell_counter ] );
						}
						?>
						<<?php echo $row['table_th_td']; ?> <?php echo $this->get_render_attribute_string( 'uael_table_col' . $row['_id'] ); ?>>
							<?php if ( ! empty( $row['link']['url'] ) ) { ?>
							<a <?php echo $this->get_render_attribute_string( 'col-link-' . $row['_id'] ); ?>>
							<?php } ?>
								<span <?php echo $this->get_render_attribute_string( 'uael_table__text' ); ?>>
									<?php if ( 'icon' === $row['cell_content_icon_image'] ) { ?>
										<?php if ( $row['cell_icon'] ) { ?>
											<?php if ( 'left' === $settings['all_icon_align'] ) { ?>
										<span <?php echo $this->get_render_attribute_string( 'uael_cell_icon_align' . $row['_id'] ); ?>>
											<i <?php echo $this->get_render_attribute_string( 'uael_cell_icon' . $row['_id'] ); ?>></i>
										</span>
										<?php } ?>
										<?php } ?>
									<?php } else { ?>
										<?php if ( $row['image']['url'] ) { ?>
											<?php if ( 'left' === $settings['all_image_align'] ) { ?>
											<img <?php echo $this->get_render_attribute_string( 'uael_col_img' . $row['_id'] ); ?>>
										<?php } ?>
										<?php } ?>
									<?php } ?>
									<span <?php echo $this->get_render_attribute_string( $repeater_cell_text ); ?>><?php echo $row['cell_text']; ?></span>
									<?php if ( 'icon' === $row['cell_content_icon_image'] ) { ?>
										<?php if ( $row['cell_icon'] ) { ?>
											<?php if ( 'right' === $settings['all_icon_align'] ) { ?>
										<span <?php echo $this->get_render_attribute_string( 'uael_cell_icon_align' . $row['_id'] ); ?>>
											<i <?php echo $this->get_render_attribute_string( 'uael_cell_icon' . $row['_id'] ); ?>></i>
										</span>
										<?php } ?>
										<?php } ?>
									<?php } else { ?>
										<?php if ( $row['image']['url'] ) { ?>
											<?php if ( 'right' === $settings['all_image_align'] ) { ?>
											<img <?php echo $this->get_render_attribute_string( 'uael_col_img' . $row['_id'] ); ?>>
										<?php } ?>
										<?php } ?>
									<?php } ?>
								</span>
							<?php if ( ! empty( $row['link']['url'] ) ) { ?>
							</a>
							<?php } ?>
						</td>
							<?php
							// Increment to next cell.
							$cell_counter++;
					} else {
						if ( $counter > 1 && $counter < $row_count ) {
							// Break into new row.
							++$data_entry;
							?>
							</tr><tr data-entry="<?php echo $data_entry; ?>" <?php echo $this->get_render_attribute_string( 'uael_table_row' ); ?>>
												<?php
						} elseif ( 1 === $counter && false === $this->is_invalid_first_row() ) {
							$data_entry = 1;
							?>
							<tr data-entry="<?php echo $data_entry; ?>" <?php echo $this->get_render_attribute_string( 'uael_table_row' ); ?>>
											<?php
						}
						$cell_counter = 0;
					}
					$counter++;
					$cell_inline_count++;
				}
			}
			?>
		</tbody>
	</table>
		<?php
	}
	?>
</div>
<?php
