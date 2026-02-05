

const plexifyCarousel = function() {

        // Swiper Four
    const handleSwiperFour = function() {
        if (jQuery('.swiper-four').length > 0) {
            const swiper = new Swiper('.swiper-four', {
                speed: 1000,
                loop: true,
                parallax: true,
                slidesPerView: 4,
                spaceBetween: 30,
                autoplay: {
					delay: 2500,
				},
                navigation: {
                    nextEl: ".tranding-button-next",
                    prevEl: ".tranding-button-prev",
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    360: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                }
            });
        }
         if(jQuery('.company-logo-swiper').length > 0){
			var swiper = new Swiper( '.company-logo-swiper', {
				speed: 1000,
				parallax: true,
				loop: true,
				slidesPerView: 4,
				spaceBetween: 90,
				loopedSlides: 6,
				autoplay: {
					delay: 2500,
				},
				watchSlidesProgress: true,
				watchSlidesVisibility: true,
				navigation: {
					nextEl: ".tranding-button-next",
					prevEl: ".tranding-button-prev",
				},	
				breakpoints: {
					1200: {
						slidesPerView: 4,
					},
					1024: {
						slidesPerView: 4,
					},
					991: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 50,
					},
					600: {
						slidesPerView: 3,
					},
					340: {
						slidesPerView: 2,
						spaceBetween: 40,
					},
				}
			});
		}
    }
    // Client-Swiper Four
    const handleClientSwiper = function() {
        if (jQuery('.clients-swiper').length > 0) {
            const swiper = new Swiper('.clients-swiper', {
                speed: 1000,
                loop: true,
                parallax: true,
                slidesPerView: 4,
                spaceBetween: 30,
                navigation: {
                    nextEl: ".tranding-button-next",
                    prevEl: ".tranding-button-prev",
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    360: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                }
            });
        }
    }

    const handleCategorySwiper2 = function() {
        if (jQuery('.category-swiper2').length > 0) {
            const swiper = new Swiper('.category-swiper2', {
                slidesPerView: 6,
                centeredSlides: false,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 3000,
                },
                navigation: {
                    nextEl: ".tranding-button-next",
                    prevEl: ".tranding-button-prev",
                },
                breakpoints: {
                    1600: {
                        slidesPerView: 6,
                        spaceBetween: 40,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    991: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    575: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                }
            });
        }
    }

    const mainSliderSlick = function() {
        if (jQuery('.slider-main').length > 0) {
            $('.slider-main').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                infinite: true,
                asNavFor: '.slider-thumbs'
            });
            $('.slider-thumbs').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                asNavFor: '.slider-main',
                dots: false,
                centerMode: false,
                infinite: true,
                focusOnSelect: true,
            });
        }
    }

	const handlePortfolioGallery = function() {	
		if(jQuery('.portfolio-gallery').length > 0){
			const swiper = new Swiper( '.portfolio-gallery', {
				slidesPerView: 3,
				spaceBetween: 50,
				loop: true,
				pagination: {
					el: ".swiper-pagination-two",
				},
				navigation: {
					nextEl: ".portfolio-button-next",
					prevEl: ".portfolio-button-prev",
				},
				breakpoints: {
					1200: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 2,
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					300: {
						slidesPerView: 1,
						spaceBetween: 15,
					},
				}
			} ); 
		}
	}

	const productGallerySwiper1 = function() {	
		if(jQuery('.product-gallery-swiper').length > 0){
			const swiper = new Swiper(".product-gallery-swiper", {
				spaceBetween: 10,
				slidesPerView: 2,
				pagination: {
					el: ".swiper-pagination-trading",
				},
			});
			const swiper2 = new Swiper(".product-gallery-swiper2", {
                spaceBetween: 0,
                updateOnWindowResize: true,	
                navigation: {
                    nextEl: ".gallery-button-next",
                    prevEl: ".gallery-button-prev",
                },
                thumbs: {
                    swiper: swiper,
                },
			});
		}
	}

     const handleSwiperservice = function() {
       if(jQuery('.service-swiper').length > 0){
			var swiper = new Swiper( '.service-swiper', {
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 4,
				spaceBetween: 0,
				// autoplay: {
				// 	delay: 2500,
				// },
				navigation: {
					nextEl: ".tranding-button-next",
					prevEl: ".tranding-button-prev",
				},	
				breakpoints: {
					1480: {
						slidesPerView: 4,
					},
					1200: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 2,
					},
					991: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 2,
					},
					576: {
						slidesPerView: 2,
					},
					340: {
						slidesPerView: 1,
					},
				}
			});
		}
    }
   	const handleteamswiper = function() {
		if (jQuery('.team-four').length > 0) {
			var swiper = new Swiper('.team-four', {
				speed: 1500,
				parallax: true,
				slidesPerView: 4,
				spaceBetween: 0,
				loop: true,
				autoplay: {
					delay: 1500,
					disableOnInteraction: false,
				},
				watchSlidesProgress: true,
				watchSlidesVisibility: true,
				breakpoints: {
					1200: { 
						slidesPerView: 4 
					},
					1024: {
						slidesPerView: 4
					},
					991: { 
						slidesPerView: 3 
					},
					768: { 
						slidesPerView: 3,
					},
					600: { 
						slidesPerView: 1 
					},
					340: { 
						slidesPerView: 1,
					},
				}
			});

			swiper.el.addEventListener("mouseenter", () => {
				swiper.autoplay.stop();
			});

			swiper.el.addEventListener("mouseleave", () => {
				swiper.autoplay.start();
			});
		}
	}
	const handleBlogSwiper = () => {
    const swiper = new Swiper(".blog-swiper	", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 35,
        loop: true,
        centeredSlides: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        567: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      },
    });
  };

     const handleTestimonialSwiper = function () {
        const wrapper = document.querySelector(".testimonial-swiper-wrapper");
            if (!wrapper) return;

            const testimonialThumbs = new Swiper(".testimonial-thumbs", {
            speed: 1500,
            parallax: true,
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            // autoplay: {
            //     delay: 3000,
            // },
        });

        new Swiper(".testimonial-swiper", {
            speed: 1500,
            parallax: true,
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            // autoplay: {
            //     delay: 3000,
            // },
            navigation: {
                nextEl: ".testimonial-button-next",
                prevEl: ".testimonial-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            thumbs: {
                swiper: testimonialThumbs,
            },
        });
    };

   const handleTileSlider = function () {

    const slider = document.querySelector(".main-slider-4");
    if (!slider) return;

    const createGrids = function () {
        const grids = document.querySelectorAll(".image-grid");

        grids.forEach(function (grid) {
            const image = grid.getAttribute("data-image");
            grid.innerHTML = "";

            const cols = 10;
            const rows = 6;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {

                    const tile = document.createElement("div");

                    const posX = (c / (cols - 1)) * 100;
                    const posY = (r / (rows - 1)) * 100;

                    tile.style.backgroundImage = `url(${image})`;
                    tile.style.backgroundPosition = `${posX}% ${posY}%`;
                    tile.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;

                    grid.appendChild(tile);
                }
            }
        });
    };

    const animateTiles = function (slide) {
        const tiles = slide.querySelectorAll(".image-grid div");
        const title = slide.querySelector(".title");

        gsap.set(tiles, { opacity: 0 });

        gsap.to(tiles, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: {
                grid: [6, 10],
                from: "center",
                amount: 0.8
            }
        });

        gsap.fromTo(
            title,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: "power2.out" }
        );
    };

    const swiperMain = new Swiper(".main-slider-4", {
        speed: 1000,
        effect: "fade",
        slidesPerView: 1,
        loop: true,
        allowTouchMove: true,

        on: {
            init: function () {
                createGrids();
                animateTiles(this.slides[this.activeIndex]);
            },
            slideChangeTransitionStart: function () {
                animateTiles(this.slides[this.activeIndex]);
            }
        }
    });

};

const handleServiceSwiper = function () {

    const swiperEl = document.querySelector(".service-swiper-2");
    if (!swiperEl) return;

    new Swiper(".service-swiper-2", {
        speed: 1000,
        loop: true,
        parallax: true,
        slidesPerView: 2.65,
        spaceBetween: 20,
         autoplay: {
            delay: 1500,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
        },

        breakpoints: {
            1280: { slidesPerView: 2.65 },
            1199: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            991:  { slidesPerView: 2 },
            767:  { slidesPerView: 1.5 },
            600:  { slidesPerView: 1 },
            340:  { slidesPerView: 1 },
        },
    });

};

const handleTestimonial = function () {

    const swiperEl = document.querySelector(".testimonial-swiper7");
    if (!swiperEl) return;

    new Swiper(".testimonial-swiper7", {
        speed: 1000,
        loop: true,
        parallax: true,
        spaceBetween: 30,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
        },

        // Agar autoplay chahiye toh yeh section open rakho
        autoplay: {
            delay: 3000,
        },

        breakpoints: {
            1280: { slidesPerView: 1 },
            340:  { slidesPerView: 1 },
        },
    });

};


    return {

        init: function() {
            mainSliderSlick();
            handleTestimonialSwiper();
            productGallerySwiper1();
            handlePortfolioGallery();
            handleSwiperFour();
            handleSwiperservice();
			handleBlogSwiper();
            handleteamswiper();
            handleClientSwiper();
            handleCategorySwiper2();
            handleTileSlider();
            handleServiceSwiper();
            handleTestimonial();
        },
    }

}();


/* Document.ready Start */
jQuery(document).ready(function() {
    'use strict';
    plexifyCarousel.init();
});
/* Document.ready END */
