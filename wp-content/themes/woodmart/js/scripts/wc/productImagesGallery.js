/* global woodmart_settings */
(function($) {
	woodmartThemeModule.$document.on('wdReplaceMainGallery', function() {
		woodmartThemeModule.productImagesGallery( true );
	});

	$.each([
		'frontend/element_ready/wd_single_product_gallery.default'
	], function(index, value) {
		woodmartThemeModule.wdElementorAddAction(value, function($wrapper) {
			woodmartThemeModule.productImagesGallery();

			$wrapper.find('.woocommerce-product-gallery').css('opacity', '1');
		});
	});

	woodmartThemeModule.productImagesGallery = function( replaceGallery = false) {
		woodmartThemeModule.setupMainCarouselArg();

		$('.woocommerce-product-gallery').each(function() {
			var $galleryWrapper = $(this);
			var $gallery = $galleryWrapper.find('.woocommerce-product-gallery__wrapper:not(.quick-view-gallery)');
			var $thumbnails = $galleryWrapper.find('.thumbnails');
			var $firstImageMainGallery = $gallery.find('.wp-post-image').first();

			$thumbnails.addClass('thumbnails-ready');

			if ($galleryWrapper.hasClass('thumbs-position-without') || $galleryWrapper.hasClass('thumbs-position-centered') || $galleryWrapper.hasClass('thumbs-position-bottom') || $galleryWrapper.hasClass('thumbs-position-left') || $galleryWrapper.hasClass('thumbs-position-carousel_two_columns') || (woodmartThemeModule.$window.width() <= 1024 && ($galleryWrapper.hasClass('thumbs-position-bottom_combined') || $galleryWrapper.hasClass('thumbs-position-bottom_column') || $galleryWrapper.hasClass('thumbs-position-bottom_grid'))) ) {
				if ('yes' === woodmart_settings.product_slider_auto_height) {
					$galleryWrapper.imagesLoaded(function() {
						initGallery();
					});
				} else {
					initGallery();
				}
			}

			if ($thumbnails.length !== 0) {
				if ( replaceGallery ) {
					createThumbnails();
				}

				if ($galleryWrapper.hasClass('thumbs-position-left') && woodmartThemeModule.$body.width() > 1024 && typeof ($.fn.slick) != 'undefined') {
					initThumbnailsVertical();
				} else {
					initThumbnailsHorizontal();
				}
			}

			function initGallery() {
				if ('undefined' === typeof $.fn.owlCarousel) {
					return;
				}

				woodmartThemeModule.$document.trigger('wood-images-loaded');
				$gallery.trigger('destroy.owl.carousel');
				$gallery.addClass('owl-carousel wd-owl').owlCarousel(woodmartThemeModule.mainCarouselArg);
			}

			function createThumbnails() {
				var html = '';

				$gallery.find('.woocommerce-product-gallery__image').each(function() {
					var $this   = $(this);
					var image   = $this.data('thumb'),
					    alt     = $this.find('a img').attr('alt'),
					    title   = $this.find('a img').attr('title'),
					    classes = '';

					if (!title && $this.find('a picture').length) {
						title = $this.find('a picture').attr('title');
					}

					if ( $this.find('.wd-product-video').length ) {
						classes += ' wd-with-video';
					}

					html += '<div class="product-image-thumbnail' + classes + '">';
					html += '<img alt="' + alt + '" title="' + title + '" src="' + image + '" />';

					html += '</div>';
				});

				if ($thumbnails.hasClass('slick-slider')) {
					$thumbnails.slick('unslick');
				} else if ($thumbnails.hasClass('owl-carousel')) {
					$thumbnails.trigger('destroy.owl.carousel');
				}

				$thumbnails.empty();
				$thumbnails.append(html);
			}

			function initThumbnailsVertical() {
				var verticalItemsCount = $thumbnails.data('vertical_items');

				if ( $firstImageMainGallery.hasClass('wd-lazy-load') && ! $firstImageMainGallery.attr('data-loaded' ) ) {
					return;
				}

				if ( ! $thumbnails.hasClass('wd-v-thumb-default') && ! $thumbnails.hasClass('wd-height-calculated') && $galleryWrapper.hasClass('wd-has-thumb') ) {
					var $height = $gallery.height();

					if ( 'undefined' !== typeof elementorFrontend && elementorFrontend.isEditMode() ) {
						$height = $gallery.find('.wp-post-image').height();
					}

					$thumbnails.css( '--wd-slick-h', $height + 'px' );

					$thumbnails.addClass('wd-height-calculated');
				}

				$thumbnails.slick({
					slidesToShow   : verticalItemsCount,
					slidesToScroll : verticalItemsCount,
					vertical       : true,
					verticalSwiping: true,
					infinite       : false,
					listHeight : 100,
					adaptiveHeight : true,
				});

				$thumbnails.on('afterChange', function () {
					woodmartThemeModule.$document.trigger('wood-images-loaded');
				});

				$thumbnails.on('click', '.product-image-thumbnail', function() {
					$gallery.trigger('to.owl.carousel', $(this).index());
				});

				$gallery.on('changed.owl.carousel', function(e) {
					var i = e.item.index;

					$thumbnails.slick('slickGoTo', i);
					$thumbnails.find('.active-thumb').removeClass('active-thumb');
					$thumbnails.find('.product-image-thumbnail').eq(i).addClass('active-thumb');
				});

				$thumbnails.find('.product-image-thumbnail').eq(0).addClass('active-thumb');

				$thumbnails.imagesLoaded(function() {
					$thumbnails.slick('setPosition');
				});
			}

			function initThumbnailsHorizontal() {
				if ('undefined' === typeof $.fn.owlCarousel) {
					return;
				}

				$thumbnails.addClass('owl-carousel').owlCarousel({
					rtl       : woodmartThemeModule.$body.hasClass('rtl'),
					items     : $thumbnails.data('desktop'),
					responsive: {
						1025: {
							items: $thumbnails.data('desktop')
						},
						769 : {
							items: $thumbnails.data('tablet')
						},
						577 : {
							items: $thumbnails.data('tablet')
						},
						0   : {
							items: $thumbnails.data('mobile')
						}
					},
					dots      : false,
					nav       : true,
					navText   : false,
					navClass  : [
						'owl-prev wd-btn-arrow',
						'owl-next wd-btn-arrow'
					]
				});

				var $thumbnailsOwl = $thumbnails.owlCarousel();

				$thumbnails.on('mouseup', '.owl-item', function() {
					var i = $(this).index();

					$thumbnailsOwl.trigger('to.owl.carousel', i);
					$gallery.trigger('to.owl.carousel', i);
				});

				$gallery.on('changed.owl.carousel', function(e) {
					var i = e.item.index;

					$thumbnailsOwl.trigger('to.owl.carousel', i);
					$thumbnails.find('.active-thumb').removeClass('active-thumb');
					$thumbnails.find('.product-image-thumbnail').eq(i).addClass('active-thumb');
				});

				$thumbnails.find('.product-image-thumbnail').eq(0).addClass('active-thumb');
			}

			$firstImageMainGallery.on('load', function () {
				if ( $firstImageMainGallery.hasClass('wd-lazy-load') && $galleryWrapper.hasClass('thumbs-position-left') && ! $firstImageMainGallery.attr('data-loaded') && woodmartThemeModule.$body.width() > 1024 && typeof ($.fn.slick) != 'undefined' ) {
					if ($thumbnails.hasClass('slick-slider')) {
						$thumbnails.slick('unslick');
					}

					$firstImageMainGallery.attr('data-loaded', true);

					initThumbnailsVertical();
				}
			});
		});
	};

	woodmartThemeModule.$window.on('elementor/frontend/init', function() {
		if (!elementorFrontend.isEditMode()) {
			return;
		}

		woodmartThemeModule.$window.on('resize', woodmartThemeModule.debounce(function() {
			woodmartThemeModule.productImagesGallery();
		}, 300));
	});

	$(document).ready(function() {
		woodmartThemeModule.productImagesGallery();
	});
})(jQuery);
