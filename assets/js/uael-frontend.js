( function( $ ) {

	var isElEditMode = false;

	/**
	 * Function for Before After Slider animation.
	 *
	 */
	var UAELBASlider = function( $element ) {

		$element.css( 'width', '' );
		$element.css( 'height', '' );

		max = -1;

		$element.find( "img" ).each(function() {
			if( max < $(this).width() ) {
				max = $(this).width();
			}
		});

		$element.css( 'width', max + 'px' );
	}

	/**
	 * Function for GF Styler select field.
	 *
	 */
	var WidgetUAELGFStylerHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope )
			return;

		var	gfSelectFields = $scope.find('select:not([multiple])');

		gfSelectFields.wrap( "<span class='uael-gf-select-custom'></span>" );
	}

	/**
	 * Function for CF7 Styler select field.
	 *
	 */
	var WidgetUAELCF7StylerHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope )
			return;

		var	cf7SelectFields = $scope.find('select:not([multiple])'),
			cf7Loader = $scope.find('span.ajax-loader');


		cf7SelectFields.wrap( "<span class='uael-cf7-select-custom'></span>" );

		cf7Loader.wrap( "<div class='uael-cf7-loader-active'></div>" );

		var wpcf7event = document.querySelector( '.wpcf7' );

		wpcf7event.addEventListener( 'wpcf7submit', function( event ) {
			var cf7ErrorFields = $scope.find('.wpcf7-not-valid-tip');
		    cf7ErrorFields.wrap( "<span class='uael-cf7-alert'></span>" );
		}, false );

	}

	/**
	 * Function for Fancy Text animation.
	 *
	 */
	var UAELFancyText = function() {

		var id 					= $( this ).data( 'id' );
		var $this 				= $( this ).find( '.uael-fancy-text-node' );
		var animation			= $this.data( 'animation' );
		var fancystring 		= $this.data( 'strings' );
		var nodeclass           = '.elementor-element-' + id;

		var typespeed 			= $this.data( 'type-speed' );
		var backspeed 			= $this.data( 'back-speed' );
		var startdelay 			= $this.data( 'start-delay' );
		var backdelay 			= $this.data( 'back-delay' );
		var loop 				= $this.data( 'loop' );
		var showcursor 			= $this.data( 'show_cursor' );
		var cursorchar 			= $this.data( 'cursor-char' );

		var speed 				= $this.data('speed');
		var pause				= $this.data('pause');
		var mousepause			= $this.data('mousepause');

		if ( 'type' == animation ) {
			$( nodeclass + ' .uael-typed-main' ).typed({
				strings: fancystring,
				typeSpeed: typespeed,
				startDelay: startdelay,
				backSpeed: backspeed,
				backDelay: backdelay,
				loop: loop,
				showCursor: showcursor,
				cursorChar: cursorchar,
	        });

		} else if ( 'slide' == animation ) {

			$( nodeclass + ' .uael-slide-main' ).vTicker('init', {
					strings: fancystring,
					speed: speed,
					pause: pause,
					mousePause: mousepause,
			});
		}
	}

	/**
	 * Before After Slider handler Function.
	 *
	 */
	var WidgetUAELBASliderHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope )
			return;

		var selector = $scope.find( '.uael-ba-container' );
		var initial_offset = selector.data( 'offset' );
		var move_on_hover = selector.data( 'move-on-hover' );
		var orientation = selector.data( 'orientation' );

		$scope.css( 'width', '' );
		$scope.css( 'height', '' );

		if( 'yes' == move_on_hover ) {
			move_on_hover = true;
		} else {
			move_on_hover = false;
		}

		$scope.imagesLoaded( function() {

			UAELBASlider( $scope );

			$scope.find( '.uael-ba-container' ).twentytwenty(
	            {
	                default_offset_pct: initial_offset,
	                move_on_hover: move_on_hover,
	                orientation: orientation
	            }
	        );

	        $( window ).resize( function( e ) {
	        	UAELBASlider( $scope );
	        } );
		} );
	};

	/**
	 * Fancy text handler Function.
	 *
	 */
	var WidgetUAELFancyTextHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope ) {
			return;
		}
		var node_id = $scope.data( 'id' );
		var viewport_position	= 90;
		var selector = $( '.elementor-element-' + node_id );

		if( typeof elementorFrontend.waypoint !== 'undefined' ) {
			elementorFrontend.waypoint(
				selector,
				UAELFancyText,
				{
					offset: viewport_position + '%'
				}
			);
		}
	};

	/**
	 *
	 * Timeline handler Function.
	 *
	 */
	var WidgetUAELTimelineHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope )
			return;

		// Define variables.
		var $this          		= $scope.find( '.uael-timeline-node' );
		var timeline_main   	= $scope.find(".uael-timeline-main");
		var animate_border 		= $scope.find(".animate-border");
		var timeline_icon  		= $scope.find(".uael-timeline-marker");
		var uael_events  		= $scope.find(".uael-events");
		var events_inner 		= $scope.find(".uael-timeline-widget");
		var line_inner   		= $scope.find(".uael-timeline__line__inner");
		var line_outer   		= $scope.find(".uael-timeline__line");
		var $main_class			= $scope.find(".elementor-widget-uael-timeline");
		var $icon_class 		= $scope.find(".uael-timeline-marker");
		var $card_last 			= $scope.find(".uael-timeline-field:last-child");

		var timeline_start_icon = $icon_class.first().position();
		var timeline_end_icon = $icon_class.last().position();

		line_outer.css('top', timeline_start_icon.top );

		var timeline_card_height = $card_last.height();

		var last_item_top = $card_last.offset().top - $this.offset().top;

		var $last_item, parent_top;

		if( $scope.hasClass('uael-timeline-arrow-center')) {

			line_outer.css('bottom', timeline_end_icon.top );

			parent_top = last_item_top - timeline_start_icon.top;
			$last_item = parent_top + timeline_end_icon.top;

		} else if( $scope.hasClass('uael-timeline-arrow-top')) {

			var top_height = timeline_card_height - timeline_end_icon.top;
			line_outer.css('bottom', top_height );

			$last_item = last_item_top;

		} else if( $scope.hasClass('uael-timeline-arrow-bottom')) {

			var bottom_height = timeline_card_height - timeline_end_icon.top;
			line_outer.css('bottom', bottom_height );

			parent_top = last_item_top - timeline_start_icon.top;
			$last_item = parent_top + timeline_end_icon.top;

		}

		var viewportHeight = document.documentElement.clientHeight;
		var elementPos = $this.offset().top;

		var photoViewportOffsetTop = elementPos - $(document).scrollTop();

		var elementEnd = $last_item + 20;

		var initial_height = 0;

		line_inner.height(initial_height);

		var num = 0;

		// Callback function for all event listeners.
		function uaelTimelineFunc() {

				var $document = $(document);
				// Repeat code for window resize event starts.
				timeline_start_icon = $icon_class.first().position();
				timeline_end_icon 	= $icon_class.last().position();

				$card_last 			= $scope.find(".uael-timeline-field").last();

				line_outer.css('top', timeline_start_icon.top );

				timeline_card_height = $card_last.height();

				last_item_top = $card_last.offset().top - $this.offset().top;

				if( $scope.hasClass('uael-timeline-arrow-center')) {

					line_outer.css('bottom', timeline_end_icon.top );
					parent_top = last_item_top - timeline_start_icon.top;
					$last_item = parent_top + timeline_end_icon.top;

				} else if( $scope.hasClass('uael-timeline-arrow-top')) {

					var top_height = timeline_card_height - timeline_end_icon.top;
					line_outer.css('bottom', top_height );
					$last_item = last_item_top;

				} else if( $scope.hasClass('uael-timeline-arrow-bottom')) {

					var bottom_height = timeline_card_height - timeline_end_icon.top;
					line_outer.css('bottom', bottom_height );
					parent_top = last_item_top - timeline_start_icon.top;
					$last_item = parent_top + timeline_end_icon.top;
				}
				elementEnd = $last_item + 20;

			// Repeat code for window resize event ends.

			var viewportHeight = document.documentElement.clientHeight;
			var viewportHeightHalf = viewportHeight/2;
			var elementPos = $this.offset().top;
			var new_elementPos = elementPos + timeline_start_icon.top;

			var photoViewportOffsetTop = new_elementPos - $document.scrollTop();

			if (photoViewportOffsetTop < 0) {
				photoViewportOffsetTop = Math.abs(photoViewportOffsetTop);
			} else {
				photoViewportOffsetTop = -Math.abs(photoViewportOffsetTop);
			}

			if ( elementPos < (viewportHeightHalf) ) {

				if ( (viewportHeightHalf) + Math.abs(photoViewportOffsetTop) < (elementEnd) ) {
					line_inner.height((viewportHeightHalf) + photoViewportOffsetTop);
				}else{
					if ( (photoViewportOffsetTop + viewportHeightHalf) >= elementEnd ) {
						line_inner.height(elementEnd);
					}
				}
			} else {
				if ( (photoViewportOffsetTop  + viewportHeightHalf) < elementEnd ) {
					if (0 > photoViewportOffsetTop) {
						line_inner.height((viewportHeightHalf) - Math.abs(photoViewportOffsetTop));
						++num;
					} else {
						line_inner.height((viewportHeightHalf) + photoViewportOffsetTop);
					}
				}else{
					if ( (photoViewportOffsetTop + viewportHeightHalf) >= elementEnd ) {
						line_inner.height(elementEnd);
					}
				}
			}

			var timeline_icon_pos, timeline_card_pos;
			var elementPos, elementCardPos;
			var timeline_icon_top, timeline_card_top;
			timeline_icon = $scope.find(".uael-timeline-marker");
			animate_border 	= $scope.find(".animate-border");

			for (var i = 0; i < timeline_icon.length; i++) {

				timeline_icon_pos = $(timeline_icon[i]).offset().top;
				timeline_card_pos = $(animate_border[i]).offset().top;

				elementPos = $this.offset().top;
				elementCardPos = $this.offset().top;

				timeline_icon_top = timeline_icon_pos - $document.scrollTop();
				timeline_card_top = timeline_card_pos - $document.scrollTop();

				if ( ( timeline_card_top ) < ( ( viewportHeightHalf ) ) ) {

					animate_border[i].classList.remove("out-view");
					animate_border[i].classList.add("in-view");

				} else {
					// Remove classes if element is below than half of viewport.
					animate_border[i].classList.add("out-view");
					animate_border[i].classList.remove("in-view");
				}

				if ( ( timeline_icon_top ) < ( ( viewportHeightHalf ) ) ) {

					// Add classes if element is above than half of viewport.
					timeline_icon[i].classList.remove("out-view-timeline-icon");
					timeline_icon[i].classList.add("in-view-timeline-icon");

				} else {

					// Remove classes if element is below than half of viewport.
					timeline_icon[i].classList.add("out-view-timeline-icon");
					timeline_icon[i].classList.remove("in-view-timeline-icon");

				}
			}

		}
		// Listen for events.
		window.addEventListener("load", uaelTimelineFunc);
		window.addEventListener("resize", uaelTimelineFunc);
		window.addEventListener("scroll", uaelTimelineFunc);


		var post_selector = $scope.find( '.uael-days' );

		var node_id = $scope.data( 'id' );

		if ( post_selector.hasClass( 'uael-timeline-infinite-load' ) ) {

			post_selector.infinitescroll(
				{
	                navSelector     : '.elementor-element-' + node_id + ' .uael-timeline-pagination',
	                nextSelector    : '.elementor-element-' + node_id + ' .uael-timeline-pagination a.next',
	                itemSelector    : '.elementor-element-' + node_id + ' .uael-timeline-field',
	                prefill         : true,
	                bufferPx        : 200,
	                loading         : {
						msgText         : 'Loading',
						finishedMsg     : '',
						img 			: uael_script.post_loader,
						speed           : 10,
	                }
	            },
	            function( elements ) {
		            elements = $( elements );
		            window.addEventListener("load", uaelTimelineFunc);
					window.addEventListener("resize", uaelTimelineFunc);
					window.addEventListener("scroll", uaelTimelineFunc);
		        }
		    );
		}
	};

	/*
	 *
	 * Radio Button Switcher JS Function.
	 *
	 */
	var WidgetUAELContentToggleHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope ) {
			return;
		}

		var $this           = $scope.find( '.uael-rbs-wrapper' );
		var node_id 		= $scope.data( 'id' );
		var rbs_section_1   = $scope.find( ".uael-rbs-section-1" );
		var rbs_section_2   = $scope.find( ".uael-rbs-section-2" );
		var main_btn        = $scope.find( ".uael-main-btn" );
		var switch_type     = main_btn.attr( 'data-switch-type' );
		var rbs_label_1   	= $scope.find( ".uael-sec-1" );
		var rbs_label_2   	= $scope.find( ".uael-sec-2" );
		var current_class;

		switch ( switch_type ) {
			case 'round_1':
				current_class = '.uael-switch-round-1';
				break;
			case 'round_2':
				current_class = '.uael-switch-round-2';
				break;
			case 'rectangle':
				current_class = '.uael-switch-rectangle';
				break;
			case 'label_box':
				current_class = '.uael-switch-label-box';
				break;
			default:
				current_class = 'No Class Selected';
				break;
		}

		var rbs_switch      = $scope.find( current_class );

		if( rbs_switch.is( ':checked' ) ) {
			rbs_section_1.hide();
			rbs_section_2.show();
		} else {
			rbs_section_1.show();
			rbs_section_2.hide();
		}

		rbs_switch.on('click', function(e){
	        rbs_section_1.toggle();
	        rbs_section_2.toggle();
	    });

		/* Label 1 Click */
		rbs_label_1.on('click', function(e){
			// Uncheck
			rbs_switch.prop("checked", false);
			rbs_section_1.show();
			rbs_section_2.hide();

	    });

	    /* Label 2 Click */
		rbs_label_2.on('click', function(e){
			// Check
			rbs_switch.prop("checked", true);
			rbs_section_1.hide();
			rbs_section_2.show();
	    });
	};

	/**
	 * Video Gallery handler Function.
	 *
	 */
	var WidgetUAELVideoGalleryHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope ) {
			return;
		}

		var selector = $scope.find( '.uael-video-gallery-wrap' );
		var layout = selector.data( 'layout' );
		var action = selector.data( 'action' );
		var all_filters = selector.data( 'all-filters' );

		if ( selector.length < 1 ) {
			return;
		}

		$scope.find( '.uael-vg__play_full' ).on( 'click', function( e ) {

			if ( 'inline' == action ) {

				e.preventDefault();

				var iframe 		= $( "<iframe/>" );
				var vurl 		= $( this ).data( 'url' );
				var overlay		= $( this ).closest( '.uael-video__gallery-item' ).find( '.uael-vg__overlay' );
				var wrap_outer = $( this ).closest( '.uael-video__gallery-iframe' );

				iframe.attr( 'src', vurl );
				iframe.attr( 'frameborder', '0' );
				iframe.attr( 'allowfullscreen', '1' );
				iframe.attr( 'allow', 'autoplay;encrypted-media;' );

				wrap_outer.html( iframe );
				wrap_outer.attr( 'style', 'background:#000;' );
				overlay.hide();

			}
		} );

		// If Carousel is the layout.
		if( 'carousel' == layout ) {

			var slider_options 	= selector.data( 'vg_slider' );

			selector.find( '.uael-video__gallery-iframe' )
			.imagesLoaded( { background: true } )
			.done( function( e ) {
				selector.slick( slider_options );
			} );
		}

		// If Filters is the layout.
		if( selector.hasClass( 'uael-video-gallery-filter' ) ) {

			var filters = $scope.find( '.uael-video__gallery-filters' );
			var def_cat = '*';

			if ( filters.length > 0 ) {

				var def_filter = filters.data( 'default' );

				if ( '' !== def_filter ) {

					def_cat 	= def_filter;
					def_cat_sel = filters.find( '[data-filter="' + def_filter + '"]' );

					if ( def_cat_sel.length > 0 ) {
						def_cat_sel.siblings().removeClass( 'uael-filter__current' );
						def_cat_sel.addClass( 'uael-filter__current' );
					}

					if ( -1 == all_filters.indexOf( def_cat.replace('.', "") ) ) {
						def_cat = '*';
					}
				}
			}

			var $obj = {};

			selector.imagesLoaded( { background: '.item' }, function( e ) {

				$obj = selector.isotope({
					filter: def_cat,
					layoutMode: 'masonry',
					itemSelector: '.uael-video__gallery-item',
				});

				selector.find( '.uael-video__gallery-item' ).resize( function() {
					$obj.isotope( 'layout' );
				});
			});

			$scope.find( '.uael-video__gallery-filter' ).on( 'click', function() {

				$( this ).siblings().removeClass( 'uael-filter__current' );
				$( this ).addClass( 'uael-filter__current' );

				var value = $( this ).data( 'filter' );
				selector.isotope( { filter: value } );
			});
		}
	}

	/*
	 * Image Gallery handler Function.
	 *
	 */
	var WidgetUAELImageGalleryHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope ) {
			return;
		}

		var $justified_selector	= $scope.find('.uael-img-justified-wrap');
		var row_height			= $justified_selector.data( 'rowheight' );
		var lastrow				= $justified_selector.data( 'lastrow' );

		if ( $justified_selector.length > 0 ) {
			$justified_selector.imagesLoaded( function() {
			})
			.done(function( instance ) {
				$justified_selector.justifiedGallery({
				    rowHeight : row_height,
				    lastRow : lastrow,
				    selector : 'div',
				    waitThumbnailsLoad : true,
				});
			});
		}

		/* Carousel */
		var slider_selector	= $scope.find('.uael-img-carousel-wrap');

		if ( slider_selector.length > 0 ) {

			var adaptiveImageHeight = function( e, obj ) {

				var node = obj.$slider,
                post_active = node.find('.slick-slide.slick-active'),
                max_height = -1;

	            post_active.each(function( i ) {

	                var $this = $( this ),
	                    this_height = $this.innerHeight();

	                if( max_height < this_height ) {
	                    max_height = this_height;
	                }
	            });

	            node.find('.slick-list.draggable').animate({ height: max_height }, { duration: 200, easing: 'linear' });
	            max_height = -1;
			};

			var slider_options 	= JSON.parse( slider_selector.attr('data-image_carousel') );

			/* Execute when slick initialize */
			slider_selector.on('init', adaptiveImageHeight );

			$scope.imagesLoaded( function(e) {

				slider_selector.slick(slider_options);

				/* After slick slide change */
				slider_selector.on('afterChange', adaptiveImageHeight );

				slider_selector.find('.uael-grid-item').resize( function() {
					// Manually refresh positioning of slick
					setTimeout(function() {
						slider_selector.slick('setPosition');
					}, 300);
				});
			});
		}


		/* Grid */
		if ( ! isElEditMode ) {

			var selector = $scope.find( '.uael-img-grid-masonry-wrap' );

			if ( selector.length < 1 ) {
				return;
			}

			if ( ! ( selector.hasClass('uael-masonry') || selector.hasClass('uael-cat-filters') ) ) {
				return;
			}

			var layoutMode = 'fitRows';

			if ( selector.hasClass('uael-masonry') ) {
				layoutMode = 'masonry';
			}

			var filters = $scope.find('.uael-masonry-filters');
			var def_cat = '*';

			if ( filters.length > 0 ) {

				var def_filter = filters.attr('data-default');

				if ( '' !== def_filter ) {

					def_cat 	= def_filter;
					def_cat_sel = filters.find('[data-filter="'+def_filter+'"]');

					if ( def_cat_sel.length > 0 ) {
						def_cat_sel.siblings().removeClass('uael-current');
						def_cat_sel.addClass('uael-current');
					}
				}
			}

			var masonaryArgs = {
				// set itemSelector so .grid-sizer is not used in layout
				filter 			: def_cat,
				itemSelector	: '.uael-grid-item',
				percentPosition : true,
				layoutMode		: layoutMode,
				hiddenStyle 	: {
					opacity 	: 0,
				},
			};

			var $isotopeObj = {};

			$scope.imagesLoaded( function(e) {
				$isotopeObj = selector.isotope( masonaryArgs );
			});


			// bind filter button click
			$scope.on( 'click', '.uael-masonry-filter', function() {

				var $this 		= $(this);
				var filterValue = $this.attr('data-filter');

				$this.siblings().removeClass('uael-current');
				$this.addClass('uael-current');
				if ( $justified_selector.length > 0 ) {
					$justified_selector.justifiedGallery({ 
						filter: filterValue,
						rowHeight : row_height,
					    lastRow : lastrow,
					    selector : 'div',
					});
				} else {
					$isotopeObj.isotope({ filter: filterValue });
				}
			});
		}
	};

	UAELVideo = {

		/**
		 * Auto Play Video
		 *
		 */

		_play: function( selector ) {

			var iframe 		= $( "<iframe/>" );
	        var vurl 		= selector.data( 'src' );

	        if ( 0 == selector.find( 'iframe' ).length ) {

				iframe.attr( 'src', vurl );
				iframe.attr( 'frameborder', '0' );
				iframe.attr( 'allowfullscreen', '1' );
				iframe.attr( 'allow', 'autoplay;encrypted-media;' );

				selector.html( iframe );
	        }

	        selector.closest( '.uael-video__outer-wrap' ).find( '.uael-vimeo-wrap' ).hide();
		}
	}

	/*
	 * Video handler Function.
	 *
	 */
	var WidgetUAELVideoHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope ) {
			return;
		}

		var outer_wrap = $scope.find( '.uael-video__outer-wrap' );

		outer_wrap.off( 'click' ).on( 'click', function( e ) {

			var selector 	= $( this ).find( '.uael-video__play' );

			UAELVideo._play( selector );

		});

		if( '1' == outer_wrap.data( 'autoplay' ) || true == outer_wrap.data( 'device' ) ) {

			UAELVideo._play( $scope.find( '.uael-video__play' ) );
		}
	};

	$( window ).on( 'elementor/frontend/init', function () {

		if ( elementorFrontend.isEditMode() ) {
			isElEditMode = true;
		}

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-fancy-heading.default', WidgetUAELFancyTextHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-ba-slider.default', WidgetUAELBASliderHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-timeline.default', WidgetUAELTimelineHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-content-toggle.default', WidgetUAELContentToggleHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-gf-styler.default', WidgetUAELGFStylerHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-cf7-styler.default', WidgetUAELCF7StylerHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-image-gallery.default', WidgetUAELImageGalleryHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-video.default', WidgetUAELVideoHandler );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/uael-video-gallery.default', WidgetUAELVideoGalleryHandler );

		if( isElEditMode ) {

			elementor.channels.data.on( 'element:after:duplicate element:after:remove', function( e, arg ) {
				$( '.elementor-widget-uael-ba-slider' ).each( function() {
					WidgetUAELBASliderHandler( $( this ), $ );
				} );
			} );
		}

	});

} )( jQuery );
