const plexify = function () {
	'use strict';

	let screenWidth = jQuery(window).width();

	function setCookie(cname, cvalue, exhours) {
		var d = new Date();
		d.setTime(d.getTime() + (30 * 60 * 1000)); /* 30 Minutes */
		var expires = "expires=" + d.toString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim(); 
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}


	const handleWowAnimation = () => {
		if (document.querySelectorAll(".wow").length > 0) {
			const wow = new WOW({
				boxClass: "wow",
				animateClass: "animated",
				offset: 50,
				mobile: false,
			});
			wow.init();
		}
	}
	
	
	const magnificPopup = function () {
		if (jQuery('.mfp-gallery').length > 0) {
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1] 
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function (item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});
		}

		if (jQuery('.mfp-video').length > 0) {
			/* magnificPopup for Play video function */
			jQuery('.mfp-video').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">' +
						'<div class="mfp-close"></div>' +
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
						'<div class="mfp-title">Some caption</div>' +
						'</div>'
				},
				callbacks: {
					markupParse: function (template, values, item) {
						values.title = item.el.attr('title');
					}
				}
			});

		}

		if (jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').length > 0) {
			/* magnificPopup for Play video function end */
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: true
			});
		}
	}
	const handleLightgallery = () => {

    
    if (typeof lightGallery === "undefined") return;

    const plugins = [];

    if (typeof lgThumbnail !== "undefined") plugins.push(lgThumbnail);
    if (typeof lgZoom !== "undefined") plugins.push(lgZoom);

    const commonConfig = {
        plugins: plugins,
        selector: ".lg-item",
        thumbnail: plugins.includes(lgThumbnail),
        exThumbImage: "data-src"
    };

    const gallery1 = document.getElementById("lightgallery");
    if (gallery1) {
        lightGallery(gallery1, commonConfig);
    }

    const gallery2 = document.getElementById("lightgallery2");
    if (gallery2) {
        lightGallery(gallery2, commonConfig);
    }
};



	const handleImageTooltip = function () {
    if (screenWidth > 991) {
        $('.image-tooltip-effect')
            .on('mouseenter', function () {
                const title = $(this).data('url');
                $('body').append(
                    `<div class='image-tooltip overflow-visible user-select-none'>
                        <img src="${title}" class='title'>
                    </div>`
                );
                $('.image-tooltip').width(300);
                $('.image-tooltip img').css({
                    scale: '1',
                    opacity: '1'
                });
            })
            .on('mouseleave', function () {
                $('.image-tooltip').remove();
            })
            .on('mousemove', function (e) {
                const mousex = e.pageX + 50; 
                const mousey = e.pageY - 100; 

                if (mousex > 900) {
                    $('.image-tooltip img').css({
                        transform: 'rotate(5deg)',
                        scale: '1.1'
                    });
                } else if (mousex <= 900 && mousex > 800) {
                    $('.image-tooltip img').css({
                        transform: 'rotate(0deg)'
                    });
                } else {
                    $('.image-tooltip img').css({
                        transform: 'rotate(-5deg)',
                        scale: '1'
                    });
                }

                $('.image-tooltip').css({ top: mousey, left: mousex });

                if (mousex + $('.image-tooltip').width() + 60 > screen.width) {
                    $('.image-tooltip').css({
                        top: mousey,
                        left: mousex - $('.image-tooltip').width() - 60
                    });
                }
            });
    }
};


	const handleCounter = function () {
		if (jQuery('.counter').length) {
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});
		}
	}

	const handleShowPass = function () {
		jQuery('.show-pass').on('click', function () {
			var inputType = jQuery(this).parent().find('.dz-password');
			if (inputType.attr('type') == 'password') {
				inputType.attr('type', 'text');
				jQuery(this).addClass('active');
			}
			else {
				inputType.attr('type', 'password');
				jQuery(this).removeClass('active');
			}
		});
	}

	const handleVideo = function () {
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	}

	const reposition = function () {
		const modal = jQuery(this),

		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
	}

	const handelResize = function () {
		jQuery(window).on('resize', function () {
			jQuery('.modal:visible').each(reposition);
		});
	}

	const boxHover = function () {
		jQuery('.box-hover').on('mouseenter', function () {
			const selector = jQuery(this).parent().parent();
			selector.find('.box-hover').removeClass('active');
			jQuery(this).addClass('active');
		});
	}

	const handleCurrentActive = function () {
		for (const nk = window.location, o = $("ul.navbar a").filter(function () {
			return this.href === nk;
		}).addClass("active").parent().addClass("active"); ;) {

			if (!o.is("li")) break;

			o = o.parent()
				.addClass("show")
				.parent('li')
				.addClass("active");
		}
	}

	const priceSlider = () => {
		const setupSlider = (sliderId, minValueId, maxValueId) => {
			const slider = document.getElementById(sliderId);
			if (!slider) return;

			const formatForSlider = {
				from: (formattedValue) => Number(formattedValue),
				to: (numericValue) => Math.round(numericValue),
			};

			noUiSlider.create(slider, {
				start: [40, 346],
				connect: true,
				format: formatForSlider,
				tooltips: [wNumb({ decimals: 1 }), true],
				range: { min: 0, max: 400 },
			});

			const formatValues = [
				document.getElementById(minValueId),
				document.getElementById(maxValueId),
			];

			slider.noUiSlider.on("update", (values) => {
				formatValues[0].innerHTML = "Min Price: $" + values[0];
				formatValues[1].innerHTML = "Max Price: $" + values[1];
			});
		};

		setupSlider(
		"slider-tooltips",
		"slider-margin-value-min",
		"slider-margin-value-max"
		);
		setupSlider(
		"slider-tooltips2",
		"slider-margin-value-min2",
		"slider-margin-value-max2"
		);
	};

	const handleBootstrapTouchSpin = function () {
		if ($("input[name='demo_vertical2']").length > 0) {
			jQuery("input[name='demo_vertical2']").TouchSpin({
				verticalbuttons: true,
				verticalupclass: 'fa-solid fa-plus',
				verticaldownclass: 'fa-solid fa-minus'
			});
		}
		if ($(".quantity-input").length > 0) {
			jQuery(".quantity-input").TouchSpin({
				verticalbuttons: true,
				verticalupclass: 'fa-solid fa-plus',
				verticaldownclass: 'fa-solid fa-minus'
			});
		}
	}

	const handleSelectpicker = function () {
		if (jQuery('.default-select').length > 0) {
			jQuery('.default-select').selectpicker();
		}
	}

	const heartBlast = function () {
		$(".heart").on("click", function () {
			$(this).toggleClass("heart-blast");
		});
	}

	const cartButton = function () {
		$(".dz-close").on('click', function () {
			$(this).closest(".sidebar-cart-list li").fadeOut("normal", function () {
				$(this).remove();
			});
		});
		$(".tag-close").on('click', function () {
			$(this).closest(".filter-tag li").fadeOut("normal", function () {
				$(this).remove();
			});
		});
	}

	const handleColorFilter = function () {
		const colorsInput = document.querySelectorAll(".color-filter .form-check-input");
		colorsInput.forEach(colorChange)
		function colorChange(item, index, arr) {
			const color = $(item).val();
			const element = $(item).closest('.form-check').find('span');
			element.css({ backgroundColor: color });
		}
	}

	const wishlistBtn = function () {
		jQuery('.wishlist-link').on('click', function () {
			jQuery('.product-description .nav-tabs button[data-bs-target="#wishlist-pane"]').tab('show');
		})
		jQuery('.cart-btn').on('click', function () {
			jQuery('.product-description .nav-tabs button[data-bs-target="#shopping-cart-pane"]').tab('show');
		})
	}

	const handleSupport = function () {
		const support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-178e1ba00189e4ca69e62e76f6576f47"></script>';
		jQuery('body').append(support);
	}

	const handleMagnifyGallery = function () {

		const imageSelector = $('.DZoomImage');

		imageSelector.on('mousemove', function (t) {
			let e = $(this).offset();
			var i = (t.pageX - e.left) / $(this).width() * 100 <= 100 ? (t.pageX - e.left) / $(this).width() * 100 : 100;
			var c = (t.pageY - e.top) / $(this).height() * 100 <= 100 ? (t.pageY - e.top) / $(this).height() * 100 : 100;

			$(this).find('img').css("transform-origin", i + "% " + c + "%");
		})
		imageSelector.on('mouseenter', function (t) {
			let n = $(this).find('img');
			n.css("cursor", "pointer"),
				n.css("transition", "0.1s"),
				n.css("transform", "scale(" + 1.5 + ")"),
				$(this).find('.mfp-link i').css({ opacity: 1, zIndex: 1 })
		});
		imageSelector.on('mouseleave', function (t) {
			let n = $(this).find('img');
			n.css("transition", "0.1s"), n.css("transform", "scale(1)")
			$(this).find('.mfp-link i').css({ opacity: 0, zIndex: 1 })
		});
	}

	const setCurrentYear = function () {
		const currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		let elements = document.getElementsByClassName('current-year');

		for (const element of elements) {
			element.innerHTML = currentYear;
		}
	}

	const handleTextChar = function () {
		const wordRoateElements = document.querySelectorAll('.word-rotate');
		wordRoateElements.forEach((data, _) => {
			const wordRoate = $(data).text().split('');
			const step = 360 / wordRoate.length;
			wordRoate.forEach((el, i) => {
				$(data).closest('.word-rotate-box').append('<span class="text__char" style="--char-rotate :' + (i * step) + 'deg">' + el + '</span>');
			})
			$(data).remove();
		})
	}

	const handlePointerEffect = function () {

		const pointer = document.createElement("div")
		pointer.id = "pointer-dot"
		const ring = document.createElement("div")
		ring.id = "pointer-ring"
		document.body.insertBefore(pointer, document.body.children[0])
		document.body.insertBefore(ring, document.body.children[0])

		let mouseX = -100
		let mouseY = -100
		let ringX = -100
		let ringY = -100
		let isHover = false
		let mouseDown = false
		const init_pointer = (options) => {

			window.onmousemove = (mouse) => {
				mouseX = (mouse.clientX !== undefined) ? mouse.clientX : -100;
				mouseY = (mouse.clientY !== undefined) ? mouse.clientY : -100;
			}

			window.onmousedown = (mouse) => {
				mouseDown = true
			}

			window.onmouseup = (mouse) => {
				mouseDown = false
			}

			const trace = (a, b, n) => {
				return (1 - n) * a + n * b;
			}
			window["trace"] = trace

			const getOption = (option) => {
				let defaultObj = {
					pointerColor: "#750c7e",
					ringSize: 15,
					ringClickSize: (options["ringSize"] || 15) - 5,
				}
				if (options[option] === undefined) {
					return defaultObj[option]
				} else {
					return options[option]
				}
			}

			const render = () => {
				if (mouseX !== undefined) {
					ringX = trace(ringX, mouseX, 0.2)
					ringY = trace(ringY, mouseY, 0.2)

					if (document.querySelector(".p-action-click:hover")) {
						pointer.style.borderColor = getOption("pointerColor")
						isHover = true
					} else {
						pointer.style.borderColor = "white"
						isHover = false
					}
					ring.style.borderColor = getOption("pointerColor")
					if (mouseDown) {
						ring.style.padding = getOption("ringClickSize") + "px"
					} else {
						ring.style.padding = getOption("ringSize") + "px"
					}
					
					pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`

					ring.style.transform = `translate(${ringX - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px, ${ringY - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px)`

					requestAnimationFrame(render)
				}
			}
			requestAnimationFrame(render)
		}

		jQuery('a').on('mousemove', function (e) {
			jQuery('#pointer-ring').addClass('active');
		});

		jQuery('a').on('mouseleave', function (e) {
			jQuery('#pointer-ring').removeClass('active');
		});

		init_pointer({});
	}
	
	const handleImageUpload = function () {
		if (jQuery('#imagePreview').length > 0) {
			function readURL(input) {
				if (input.files && input.files[0]) {
					const reader = new FileReader();
					reader.onload = function(e) {
						$('#imagePreview').css('background-image', 'url('+e.target.result +')');
						$('#imagePreview').hide();
						$('#imagePreview').fadeIn(650);
					}
					reader.readAsDataURL(input.files[0]);
				}
			}
			$("#imageUpload").on('change',function() {
				
				readURL(this);
			});
			$('.remove-img').on('click', function() {
				const imageUrl = "images/no-img-avatar.png";
				$('.avatar-preview, #imagePreview').removeAttr('style');
				$('#imagePreview').css('background-image', 'url(' + imageUrl + ')');
			});
		}
	};
	
	const handleThemeMode = function() {
		if(jQuery(".dz-theme-mode").length > 0) {
			jQuery('.dz-theme-mode').on('click',function(){
				jQuery(this).toggleClass('active');
				if(jQuery(this).hasClass('active')){
					jQuery('body').attr('data-theme-version','dark');
					setCookie('version', 'dark');
					jQuery('#theme_version').val('dark');
					jQuery(".sticky-header .logo-abbr").attr("src", "./assets/images/logo-white.png");
					jQuery(".map-section .logo-abbr").attr("src", "./assets/images/vector/2.png");
					
					setCookie('logo_src', './assets/images/logo-white.png');
					setCookie('logo_src2', 'assets/images/logo-text-white.png');
				}else{
					jQuery('body').attr('data-theme-version','light');
					setCookie('version', 'light');
					jQuery('#theme_version').val('light');	
					jQuery(".sticky-header .logo-abbr").attr("src", "./assets/images/logo.png");
					jQuery(".map-section .logo-abbr").attr("src", "./assets/images/vector/1.png");
					
					setCookie('logo_src', './assets/images/logo.png');
					setCookie('logo_src2', 'assets/images/logo-text.png');				
				}
				$('.default-select').selectpicker('refresh');
			});
			const version = getCookie('version');
			if(version){
				jQuery('body').attr('data-theme-version', version);
			}else{
				jQuery('body').attr('data-theme-version', 'light');	
			}
			jQuery('.dz-theme-mode').removeClass('active');
			setTimeout(function(){
				if(jQuery('body').attr('data-theme-version') === "dark")
				{
					jQuery('.dz-theme-mode').addClass('active');
				}
			},1500) 
		}
	}
	
    const ScrollTop = function() {
        const scrollBtn = document.getElementById("scrollProgress");
		if(scrollBtn){
			const circle = scrollBtn.querySelector("circle");

			window.addEventListener("scroll", () => {
				const scrollTop = window.scrollY;
				const docHeight = document.documentElement.scrollHeight - window.innerHeight;
				const scrollPercent = scrollTop / docHeight;
				const circleLength = 106.76;
				const offset = circleLength - (circleLength * scrollPercent);

				circle.style.strokeDashoffset = offset;

				if (scrollTop > 100) {
				scrollBtn.classList.add("show");
				} else {
				scrollBtn.classList.remove("show");
				}
			});

			scrollBtn.addEventListener("click", () => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
		}
    }

	const handleShopSidebar = () => {
		const shopSidebar = document.querySelector(".shop-sidebar");
		const openSidebar = document.querySelector(".sidebar-open");
		const closeSidebar = document.querySelector(".sidebar-close");

		if (shopSidebar) {
		openSidebar.addEventListener("click", () => {
			shopSidebar.style.left = 0;
		});
		closeSidebar.addEventListener("click", () => {
			shopSidebar.style.left = '-320px';
		});
		}
	};
	const handleSidebarMenu = () => {

		jQuery('.menu-btn, .menu-btn1').on('click', function () {
			const $this = jQuery(this);
			const $sideNav = jQuery('.full-sidenav');
			const $mainBar = jQuery('.main-bar');

			$this.toggleClass('open');
			$sideNav.toggleClass('show');
			$mainBar.toggleClass('show');


			if (!$this.hasClass('open') && !$sideNav.hasClass('show')) {
				jQuery('.full-sidenav .navbar-nav > li > a, .full-sidenav .sub-menu > li > a')
					.removeClass('dz-open');

				jQuery('.full-sidenav .sub-menu, .full-sidenav .mega-menu')
					.slideUp(0);
			}
		});

		// For style-2 header animation
		jQuery('.header.style-2 .menu-btn').on('click', function () {
			const $headerNav = jQuery('.header.style-2 .header-nav');

			if (jQuery(this).hasClass('open')) {
				$headerNav.css({ visibility: "hidden", opacity: "0" });
			} else {
				$headerNav.css({ visibility: "visible", opacity: "1" });
			}
		});

		// Menu close button
		jQuery('.menu-close').on('click', () => {
			jQuery('.contact-sidebar').removeClass('active');
			jQuery('.menu-btn').removeClass('open');
			jQuery('.full-sidenav, .main-bar').removeClass('show');

			jQuery('.full-sidenav .navbar-nav > li > a, .full-sidenav .sub-menu > li > a')
				.removeClass('dz-open');

			jQuery('.full-sidenav .sub-menu, .full-sidenav .mega-menu')
				.slideUp(0);
		});
	};
	const dzTheme2 = function () {

			if (screenWidth <= 991) {

				jQuery('.navbar-nav > li > a, .header-sidenav-1 .sub-menu > li > a')
					.unbind()
					.on('click', function (e) {

						e.preventDefault();
						const parentLi = jQuery(this).parent();

						if (parentLi.hasClass('open')) {
							parentLi.removeClass('open');
						} else {
							parentLi.parent().find('li').removeClass('open');
							parentLi.addClass('open');
						}
					});
			}

			const fullNavLinks = jQuery('.full-sidenav .navbar-nav > li > a');
			const subNavLinks = jQuery('.full-sidenav .sub-menu > li > a');

			fullNavLinks.next('.sub-menu, .mega-menu').slideUp();
			subNavLinks.next('.sub-menu').slideUp();

			jQuery('.full-sidenav .navbar-nav > li > a, .full-sidenav .sub-menu > li > a')
				.unbind()
				.on('click', function (e) {

					const link = jQuery(this);
					const parentLi = link.parent('li');
					const targetMenu = parentLi.children('.sub-menu, .mega-menu');

					if (link.hasClass('dz-open')) {

						link.removeClass('dz-open');
						targetMenu.slideUp();

					} else {

						parentLi.siblings('li').children('a').removeClass('dz-open');
						parentLi.siblings('li').children('.sub-menu, .mega-menu').slideUp();

						link.addClass('dz-open');

						if (targetMenu.length > 0) {
							e.preventDefault();
							link.next('.sub-menu, .mega-menu').slideDown();
						}
					}
				});
		};

	const handleScrollTop2 = () => {
		const scrollBtn = document.getElementById("Progressscroll");
		if (!scrollBtn) return;

		window.addEventListener("scroll", () => {
			scrollBtn.classList.toggle("show", window.scrollY > 100);
		});

		scrollBtn.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	};


	 const initRocketAnimation = () => {
    let cleanupFn = null;

    ScrollTrigger.matchMedia({
      "(min-width: 991px)": function () {
        const rocket = document.getElementById("rocket");
        const blast = document.getElementById("blast");
        const path = document.querySelector("#rocket-path");
        const pathPrimary = document.querySelector("#green-path");
        const rocketSection = document.querySelector(".rocket-section");
        const animeRows = document.querySelectorAll(".anime-row");

        if (!rocket || !blast || !path || !pathPrimary || !rocketSection) return;

        const thresholds = [0.25, 0.45, 0.65, 0.85];

        const rocketTween = gsap.to(rocket, {
          scrollTrigger: {
            trigger: rocketSection,
            start: "top+=10% top",
            end: "bottom+=50% bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const isEnd = progress >= 0.99;

              pathPrimary.style.height = `${progress * 116}%`;
              rocket.style.opacity = isEnd ? "0" : "1";
              blast.style.opacity = isEnd ? "1" : "0";

              animeRows.forEach((row, index) => {
                row.classList.toggle("active", progress >= thresholds[index]);
              });
            },
          },
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          ease: "none",
        });

        const blastTween = gsap.to(blast, {
          scrollTrigger: {
            trigger: rocketSection,
            start: "top top",
            end: "bottom+=50% bottom",
            scrub: true,
          },
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0,
            end: 1,
          },
          ease: "none",
        });

        cleanupFn = () => {
          rocketTween.scrollTrigger?.kill();
          rocketTween.kill();
          blastTween.scrollTrigger?.kill();
          blastTween.kill();
        };
      },
    });

    return () => {
      if (cleanupFn) cleanupFn();
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger &&
          st.trigger.classList &&
          st.trigger.classList.contains("rocket-section")
        ) {
          st.kill();
        }
      });
    };
  };

  const initHorizontalScroll = () => {
  let cleanupFn = null;

  ScrollTrigger.matchMedia({
    "(min-width: 1920px)": function () {
      const $wrapper = $(".horizontal-wrapper");
      const $section = $(".horizontal-section");
      const $panels = $(".panel");

      if ($wrapper.length === 0 || $section.length === 0 || $panels.length === 0) return;

      const panelWidth = 560;
      const gap = 50;
      const totalWidth = $panels.length * panelWidth + ($panels.length - 1) * gap + 30;
      const scrollDistance = totalWidth - panelWidth;

      $wrapper.css("width", `${totalWidth}px`);

      const horizontalTween = gsap.to($wrapper[0], {
        x: () => -scrollDistance,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: $section[0],
          start: "top top",
          end: () => "+=" + scrollDistance,
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scroller: "#smooth-wrapper",
        },
      });

      const $circle = $(".progress-ring");
      const $text = $(".progress-text");
      const $circleWrapper = $(".circle-progress");
      const circumference = 2 * Math.PI * 45;

      let progressTrigger = null;

      if ($circle.length && $text.length && $circleWrapper.length) {
        $circle.css({
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: circumference,
        });

        progressTrigger = ScrollTrigger.create({
          trigger: $section[0],
          start: "top top",
          end: () => "+=" + scrollDistance,
          scrub: 0.3,
          scroller: "#smooth-wrapper",
          onUpdate: (self) => {
            const percent = Math.floor(self.progress * 100);
            const offset = circumference * (1 - self.progress);
            $circle.css("strokeDashoffset", offset);
            $text.text(`${percent}%`);
          },
          onEnter: () => $circleWrapper.css("opacity", 1),
          onLeave: () => $circleWrapper.css("opacity", 0),
          onEnterBack: () => $circleWrapper.css("opacity", 1),
          onLeaveBack: () => $circleWrapper.css("opacity", 0),
        });
      }

      cleanupFn = () => {
        horizontalTween.scrollTrigger?.kill();
        horizontalTween.kill();
        progressTrigger?.kill();

        $wrapper.css({
          transform: "",
          width: "",
        });

        $circle.css("strokeDashoffset", "");
        $text.text("");
        $circleWrapper.css("opacity", "0");
      };
    },
  });

  return () => {
    if (cleanupFn) cleanupFn();

    ScrollTrigger.getAll().forEach((st) => {
      if (
        st.trigger &&
        $(st.trigger).hasClass("horizontal-section")
      ) {
        st.kill();
      }
    });
  };
};
const handleImageHover = function () {
        const hoverCards = document.querySelectorAll(".card-img-hover");
        const hoverImg = document.querySelectorAll(".hover-img");
        hoverCards.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
            hoverImg.forEach((item) => {
            item.style.opacity = 0;
            });
            hoverImg[index].style.opacity = 1;
        });
        });
    };

function initLoadMore() {

    const loadMoreBtn = document.querySelector(".dz-load-more");
    if (!loadMoreBtn) return;  // <-- YOUR RETURN FIX

    let isLoading = false;

    loadMoreBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (isLoading) return;  
        isLoading = true;

        const url = this.getAttribute("rel");
        if (!url) {
            console.warn("⚠️ Load More: 'rel' attribute missing!");
            isLoading = false;
            return;
        }

        const loader = document.createElement("i");
        loader.className = "fa fa-refresh fa-spin";
        loadMoreBtn.appendChild(loader);

        fetch(url)
            .then(res => res.text())
            .then(html => {
                const container = document.querySelector(".loadmore-content");
                if (container) {
                    container.insertAdjacentHTML("beforeend", html);
                } else {
                    console.warn("⚠️ .loadmore-content not found!");
                }
            })
            .catch(err => {
                console.error("❌ Load More Error:", err);
            })
            .finally(() => {
                if (loader.parentNode === loadMoreBtn) {
                    loadMoreBtn.removeChild(loader);
                }
                isLoading = false;
            });
    });
}

  const handleButtonAnimations = () => {
  const animatedButtons = new WeakSet();

  // Select ANY button that contains .pxl-button-text
  document.querySelectorAll(".pxl-button-text").forEach((textElement) => {
    const button = textElement.closest("a, button, .btn, .nav-item, .nav-link");
    if (!button) return;

    const originalText = textElement.textContent.trim();
    textElement.dataset.originalText = originalText;

    // Hover In Animation
    button.addEventListener("mouseenter", () => {
      if (animatedButtons.has(button)) return;
      animatedButtons.add(button);

      const wrappedText = [...originalText]
        .map((char) => `<span class="letter">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      textElement.innerHTML = wrappedText;

      const letters = textElement.querySelectorAll(".letter");
		gsap.fromTo(
			letters,
			{ opacity: 0, y: -12 }, 
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
				stagger: 0.05,
				ease: "power3.out"
			}
			);
    });

    // Hover Out Reset
    button.addEventListener("mouseleave", () => {
      textElement.innerHTML = textElement.dataset.originalText;
      animatedButtons.delete(button);
    });
  });

  // For .btn-third (always animated)
  document.querySelectorAll(".btn-third .pxl-button-text").forEach((textElement) => {
    const originalText = textElement.textContent.trim();
    const wrappedText = [...originalText]
      .map((char) => `<span class="letter">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    textElement.innerHTML = wrappedText;

    textElement.querySelectorAll(".letter").forEach((letter, index) => {
      letter.style.transitionDelay = `${index * 0.045}s`;
    });
  });
};

const handleScrollTop = function () {

    const btn = jQuery("button.scroltop");
    if (!btn.length) return;

    // Scroll to top click event
    btn.on("click", function (e) {
        e.preventDefault();
        jQuery("html, body").animate({ scrollTop: 0 }, 1000);
    });

    // Show / Hide on scroll
    jQuery(window).on("scroll", function () {
        if (jQuery(this).scrollTop() > 900) {
            btn.fadeIn(300);
        } else {
            btn.fadeOut(300);
        }
    });
};

 const handleMasonryBox = () => {

			const masonryEls = document.querySelectorAll("#masonry, .masonry");

			if (masonryEls.length > 0) {

			  const filters = document.querySelectorAll(".filters li");

			  if (filters.length > 0) {

				filters.forEach((li) => li.classList.remove("active"));

				filters[0].classList.add("active");

			  }
 
			  masonryEls.forEach((self) => {

				const cardContainers = self.querySelectorAll(".card-container");

				if (cardContainers.length > 0) {

				  const gutter = parseInt(self.getAttribute("data-gutter") || "0");

				  let columnWidthValue = self.getAttribute("data-column-width") || "";

				  if (columnWidthValue !== "") {

					columnWidthValue = parseInt(columnWidthValue);

				  }
 
				  new Masonry(self, {

					gutter: gutter,

					columnWidth: columnWidthValue || ".card-container",

					itemSelector: ".card-container",

					isAnimated: true,

					stagger: 0,

				  });

				}

			  });

			}
 
			const masonry2El = document.querySelector(".masonry2");

			let isoInstance = null;
 
			if (masonry2El) {

			  isoInstance = new Isotope(masonry2El, {

				itemSelector: ".grid-item",

				layoutMode: "masonry",

				masonry: {

				  columnWidth: ".grid-sizer",

				  percentPosition: true,

				},

			  });

			}

			const filtersContainer = document.querySelector(".filters");

			if (filtersContainer) {

			  const filterItems = filtersContainer.querySelectorAll("li");

			  if (filterItems.length > 0) {

				filterItems[0].classList.add("active");
 
				filterItems.forEach((item) => {

				  item.addEventListener("click", () => {

					filterItems.forEach((li) => li.classList.remove("active"));

					item.classList.add("active");
 
					const filterValue = item.getAttribute("data-filter");

					if (isoInstance) {

					  isoInstance.arrange({

						filter: filterValue,

						masonry: {

						  columnWidth: ".grid-sizer",

						  percentPosition: true,

						},

					  });

					}

				  });

				});

			  }

			}

		};
 


	
	return {
		init: function () {
			boxHover();
			setCurrentYear();
			initRocketAnimation();
			initHorizontalScroll();
			handleWowAnimation();
			initLoadMore();
			magnificPopup();
			handleVideo();
			handelResize();
			jQuery('.modal').on('show.bs.modal', reposition);
			priceSlider();
			handleCurrentActive();
			handleBootstrapTouchSpin();
			handleSelectpicker();
			handleThemeMode();
			heartBlast();
			handleLightgallery();
			cartButton();
			handlePointerEffect();
			handleColorFilter();
			//handleSupport();
			handleImageTooltip();
			wishlistBtn();
			handleMagnifyGallery();
			handleTextChar();
			handleImageUpload();
			handleShowPass();
			handleScrollTop();
			handleShopSidebar();
			handleSidebarMenu();
			dzTheme2();
			handleScrollTop2();
			handleImageHover();
			handleButtonAnimations();
			ScrollTop();
			handleMasonryBox();
			
		},

		load: function () {
			handleCounter();
			jQuery('.modal').on('show.bs.modal', reposition);
			handleMasonryBox();
		},

		resize: function () {
			screenWidth = $(window).width();
		}
	}

}();

jQuery(document).ready(function () {

	plexify.init();
	
	$('a[data-bs-toggle="tab"]').on('click', function () {
		$($(this).attr('href')).show().addClass('show active').siblings().hide();
	});


	
	jQuery('.toggle-btn').on('click', function () {
		$(this).toggleClass('active');
		$('.account-sidebar').toggleClass('show');
	});
	
	$(".form-toggle").on('click', function(){
		$(".login-area").hide();
		$(".forget-password-area").slideDown('slow');
	});

});

jQuery(window).on('load', function () {

	plexify.load();
	
	setTimeout(function () {
		jQuery('#loading-area').remove();
	}, 100);

	document.body.addEventListener('keydown', function () {
		document.body.classList.add('show-focus-outline');
	});

	document.body.addEventListener('mousedown', function () {
		document.body.classList.remove('show-focus-outline');
	});

});

jQuery(window).on('resize', function () {
	plexify.resize();
});
