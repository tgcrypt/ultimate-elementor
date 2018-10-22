( function( $ ) {

	/**
	 * Table handler Function.
	 *
	 */
	var WidgetUAELTableHandler = function( $scope, $ ) {
		if ( 'undefined' == typeof $scope ) {
			return;
		}
		// Define variables.
		var $this                = $scope.find( '.uael-table-wrapper' );
		var node_id              = $scope.data( 'id' );
		var uael_table           = $scope.find( '.uael-table' );
		var uael_table_name      = $scope.find( '.sort-this' );
		var uael_search_table    = $scope.find( '.uael-search-table' );
		var uael_search_box      = $scope.find( '#uael-search-box' );
		var uael_show_entries    = $scope.find( '#uael-show-entries' );
		var uael_table_id        = $scope.find( '#uael-table-id-' + node_id );
		var on_responsive        = $scope.find( '.on-responsive' );

		if ( 0 == uael_table_id.length )
			return;

		// Show entries select
		var show_entry = $( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id ).data( 'show-entry' );

		if ( 'yes' == show_entry ) {
			$( '.elementor-element-' + node_id + ' #' + uael_show_entries[0].id ).on('change', function() {
				var total_entries = $( '.elementor-element-' + node_id + ' #' + uael_show_entries[0].id + ' option:last' ).val();
				for (var i=2; i <= total_entries; i++) {
					if (i <= parseInt(this.value)) {
						$( '.elementor-element-' + node_id + ' [data-entry="' + i + '"]').show();
					} else {
						$( '.elementor-element-' + node_id + ' [data-entry="' + i + '"]').hide();
					}
				}
			})
		}

		function sortTable(n) {
			var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
			table = uael_table;
			switching = true;
			//Set the sorting direction to ascending.
			dir = "asc";
			/*Make a loop that will continue until
			no switching has been done.*/
			while ( switching ) {
				//start by saying: no switching is done.
				switching = false;
				if( uael_table[0] ) {
					var uael_tbody = uael_table[0].getElementsByTagName( 'TBODY' );
					var rows = uael_tbody[0].getElementsByTagName( 'TR' );
				}
				/*Loop through all table rows (except the
				first, which contains table headers).*/
				for ( i = 0; i < ( rows.length - 1); i++ ) {
					//start by saying there should be no switching:
					shouldSwitch = false;
					/*Get the two elements you want to compare,
					one from current row and one from the next.*/
					x = rows[i].getElementsByClassName("uael-table__text-inner")[n];
					y = rows[i + 1].getElementsByClassName("uael-table__text-inner")[n];
					/*check if the two rows should switch place,
					based on the direction, asc or desc.*/
					if ( dir == "asc" ) {
						$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' .uael-sort-icon' ).removeClass('fa-sort-up');
						$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' .uael-sort-icon' ).removeClass('fa-sort-down');
						$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' .uael-sort-icon' ).addClass('fa-sort');
						$("[data-sort=" + n + "] .sort-style i").removeClass( "fa-sort-up" );
						$("[data-sort=" + n + "] .sort-style i").addClass( "fa fa-sort-up" );
						if ( x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() ) {
							//if so, mark as a switch and break the loop.
							shouldSwitch= true;
							break;
						}
					} else if ( dir == "desc" ) {
						$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' .uael-sort-icon' ).removeClass('fa-sort-up');
						$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' .uael-sort-icon' ).removeClass('fa-sort-down');
						$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' .uael-sort-icon' ).addClass('fa-sort');
						$("[data-sort=" + n + "] .sort-style i").removeClass( "fa-sort-down" );
						$("[data-sort=" + n + "] .sort-style i").addClass( "fa fa-sort-down" );
						if ( x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() ) {
							//if so, mark as a switch and break the loop.
							shouldSwitch= true;
							break;
						}
					}
				}
				if ( shouldSwitch ) {
					/*If a switch has been marked, make the switch
					and mark that a switch has been done.*/
					rows[i].parentNode.insertBefore( rows[i + 1], rows[i] );
					switching = true;
					//Each time a switch is done, increase this count by 1.
					switchcount ++;
				} else {
					/*If no switching has been done AND the direction is "asc",
					set the direction to "desc" and run the while loop again.*/
					if ( switchcount == 0 && dir == "asc" ) {
						dir = "desc";
						switching = true;
					}
				}
			}
		}
		// Call function on column click.
		var sort_table = $( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id ).data( 'sort-table' );
		if ( 'yes' == sort_table ) {
			$( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id + ' th' ).css({'cursor': 'pointer'});
			$( uael_table_name ).click(function() {
				var col_number = $( this ).data( 'sort' );
				if (typeof col_number !== typeof undefined && col_number !== false) {
					sortTable(col_number);
				}
			});
		}

		// Search table algorithm.
		function searchTable() {
			var input, filter, table, tr, td, i;
			input = $( '.elementor-element-' + node_id + ' #' + uael_search_box[0].id ).get( 0 );
			filter = input.value.toUpperCase();
			// Convert input elements to uppercase.
			table = $( '.elementor-element-' + node_id + ' #' + uael_table_id[0].id ).get( 0 );
			tr = table.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i++) {
				// Get all column values
				td_all = tr[i].getElementsByTagName("td");
				if (td_all != 0) {
					for (var k = 0; k < td_all.length; k++ ) {
						td = tr[i].getElementsByTagName("td")[k];
						if (td) {
							if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
								tr[i].style.display = "";
								break;
							} else {
								tr[i].style.display = "none";
							}
						}
					}
				}
			}
		}
		// Search on keyup algorithm.
		$( uael_search_table ).keyup(function() {
			searchTable();
		});

		function coloumn_rules() {
			if($(window).width() > 767) {
				$(uael_table).addClass('uael-column-rules');
				$(uael_table).removeClass('uael-no-column-rules');
			}else{
				$(uael_table).removeClass('uael-column-rules');
				$(uael_table).addClass('uael-no-column-rules');
			}
		}

		// Listen for events.
		window.addEventListener("load", coloumn_rules);
		window.addEventListener("resize", coloumn_rules);
	};

	$( window ).on( 'elementor/frontend/init', function () {

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-table.default', WidgetUAELTableHandler );
	});
} )( jQuery );
