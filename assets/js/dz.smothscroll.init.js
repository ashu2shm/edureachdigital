const plexifyGsap = () => {
  
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MotionPathPlugin, SplitText);

  let smoother;

  if (!smoother) {
    smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1, 
    });
  }

  const stickyCard = () => {
    const contentsticky = document.querySelector(".content--sticky");
	  if(!contentsticky) return;
    ScrollTrigger.matchMedia({
      "(min-width: 1200px)": () => {
        const contentElements = gsap.utils.toArray(".content--sticky");

      
        if (!contentElements.length) {
          console.warn("⚠️ No .content--sticky elements found!");
          return;
        }

        const total = contentElements.length;
        const triggers = [];

        contentElements.forEach((el, index) => {
          if (!el) return; 

          const isLast = index === total - 1;

          if (!isLast) {
            try {
              const pinTrigger = ScrollTrigger.create({
                trigger: el,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
              });
              triggers.push(pinTrigger);
            } catch (err) {
              console.error("Error creating pin trigger:", err);
            }
          }

          const img = el.querySelector(".content__img");
         if(!img) return;

          try {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "+=100%",
                scrub: true,
              },
            });

            tl.to(
              el,
              {
                ease: "none",
                startAt: { filter: "brightness(100%) contrast(100%)" },
                filter: isLast ? "none" : "brightness(60%) contrast(135%)",
                yPercent: isLast ? 0 : -15,
              },
              0
            );

            if (img) {
              tl.to(
                img,
                {
                  scale: 1.5,
                  ease: "power1.in",
                },
                0
              );
            }
          } catch (err) {
            console.error("Timeline creation failed:", err);
          }
        });

        ScrollTrigger.refresh();

        return () => {
          triggers.forEach((trigger) => trigger.kill());
        };
      },
    });
  };


  const headerSticky = () => {
    const header = document.querySelector(".site-header");
    const sidebarStickyWrap = document.querySelector(".sidebar-sticky");

    if (!header) {
      console.warn("⚠️ .site-header not found! headerSticky() stopped.");
      return;
    }

    if (typeof smoother === "undefined" || !smoother || !smoother.scrollTop) {
      console.warn("⚠️ GSAP ScrollSmoother (smoother) not found!");
      return;
    }

    let lastScroll = 0;

    const updateStickyHeader = (scrollY) => {
      const scrollingDown = scrollY > lastScroll;
  
      header.classList.toggle("is-fixed", !scrollingDown && scrollY !== 0);

      if (sidebarStickyWrap) {
        const headerHeight = header.offsetHeight || 80;

        sidebarStickyWrap.style.top = header.classList.contains("is-fixed")
          ? `${headerHeight + 10}px`
          : "60%";
      }

      lastScroll = scrollY;
    };

    const smootherScrollLoop = () => {
      try {
        const currentScroll = smoother.scrollTop();
        updateStickyHeader(currentScroll);
        requestAnimationFrame(smootherScrollLoop);
      } catch (err) {
        console.error("❌ Error in smootherScrollLoop:", err);
      }
    };

    requestAnimationFrame(smootherScrollLoop);
  };

  const linkSmoothScroll = () => {

      if (typeof smoother === "undefined" || !smoother || !smoother.scrollTo) {
        return;
      }

      const anchors = document.querySelectorAll('a[href^="#"]');

      if (!anchors.length) {
        return;
      }

      anchors.forEach(anchor => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");

          if (href === "#") return;

          const targetId = href.replace("#", "").trim();
          if (!targetId) return;

          const targetEl = document.getElementById(targetId);

          if (!targetEl) {
            return;
          }

          e.preventDefault();

          try {
            smoother.scrollTo(targetEl, true);
          } catch (err) {
            console.error("❌ Error while using smoother.scrollTo:", err);
          }
        });
      });
  };



  const initStickyPosition = (selector = ".my-sticky", offset = 100) => {
    if (typeof ScrollTrigger === "undefined") return;

    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        const elements = document.querySelectorAll(selector);

        if (!elements || !elements.length) return;

        const triggers = [];

        elements.forEach((el) => {
          if (!el) return;

          const parent = el.parentElement;
          if (!parent) return;

          const elHeight = el.offsetHeight || 0;
          const finalOffset = offset || 0;

          const spacer = document.createElement("div");
          spacer.style.position = "relative";

          const noSpace =
            el.classList.contains("sidebar-sticky") ||
            el.classList.contains("space-top-0");

          spacer.style.height = noSpace
            ? `0px`
            : `${elHeight + finalOffset}px`;

          parent.insertBefore(spacer, el);
          spacer.appendChild(el);

          Object.assign(el.style, {
            position: "absolute",
            top: el.classList.contains("space-top-0") ? "0px" : `${finalOffset}px`,
            left: 0,
            right: 0,
            width: "100%",
          });

          let trigger;

          try {
            trigger = ScrollTrigger.create({
              trigger: spacer,
              start: "top top",
              end: () => {
                const parentHeight = parent.offsetHeight || 0;
                return `+=${Math.max(0, parentHeight - elHeight - finalOffset)}`;
              },
              pin: el,
              pinSpacing: false,
              scroller:
                document.querySelector("#smooth-wrapper")
                  ? "#smooth-wrapper"
                  : undefined,
              anticipatePin: 1,
            });
          } catch (err) {
            return;
          }

          triggers.push({ trigger, spacer, el });
        });

        return () => {
          triggers.forEach(({ trigger, spacer, el }) => {
            try {
              trigger.kill();
            } catch (e) {}

            const parent = spacer.parentElement;
            if (parent) {
              parent.insertBefore(el, spacer);
              parent.removeChild(spacer);
            }

            Object.assign(el.style, {
              position: "",
              top: "",
              left: "",
              right: "",
              width: "",
            });
          });
        };
      },
    });
  };



  const initVideoAnimation = () => {
    if (typeof ScrollTrigger === "undefined") return;

    const imgZoomElements = document.querySelectorAll(".img-zoom");

    if (!imgZoomElements.length) return;

    imgZoomElements.forEach((imgZoom) => {
      if (!imgZoom) return;

      const target = imgZoom.querySelector("img");
      if (!target) return;

      try {
        ScrollTrigger.create({
          trigger: imgZoom,
          start: "top+=100 bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scaleValue = 1 + progress;

            target.style.scale = scaleValue.toFixed(3);
          },
        });
      } catch (e) {
        return;
      }
    });
  };

  const headingAnimation = () => {
    if (typeof ScrollTrigger === "undefined") {
      console.warn("ScrollTrigger missing");
      return;
    }

  
  ScrollTrigger.matchMedia({
    "(min-width: 568px)": () => {

      
      const headingNodes = document.querySelectorAll(".pxl-heading-scroll-effect .heading-text");

    
    if(!headingNodes) return;

      
      if (typeof SplitText === "undefined") {
        console.warn("SplitText plugin is missing.");
        return;
      }

      headingNodes.forEach((headingEl) => {
        if (!headingEl) return;

        let split;

        try {
          split = new SplitText(headingEl, {
            type: "lines",
            position: "relative",
          });
        } catch (e) {
          console.error("SplitText failed:", e);
          return;
        }

        if (!split.lines || split.lines.length === 0) return;

        split.lines.forEach((line) => {
          if (!line) return;

          try {
            gsap.to(line, {
              backgroundPositionX: "0%",
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: line,
                start: "top 30%",
                end: "bottom center",
                scrub: 1,
              },
            });
          } catch (e) {
            console.error("GSAP Line Animation Error:", e);
          }
        });
      });
    },
  });

  };

  const Animationheading = () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger?.classList?.contains("headline")) {
        trigger.kill();
      }
    });
    document.fonts.ready.then(() => {
      const container = document.body;
      const headlines = container.querySelectorAll(".headline");
      headlines.forEach((headline) => {
        const splitText = new SplitText(headline, {
          type: "chars, words",
          charsClass: "char",
        });
        const chars = splitText.chars;
        gsap.set(headline, { opacity: 0 });
        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              headline,
              { opacity: 0 },
              { opacity: 1, duration: 0.1, ease: "none" }
            );
            gsap.from(chars, {
              duration: 1.5,
              opacity: 0,
              scale: 0,
              y: 80,
              rotationX: 180,
              transformOrigin: "0% 50% -50",
              ease: "back.out(1.7)",
              stagger: 0.05,
            });
          },
        });
      });
    });
  };
 

 const customScroll = () => {
  const content = document.querySelectorAll(".custom-scroll");

  if (!content.length) {
    console.warn("No .custom-scroll elements found.");
    return;
  }

  content.forEach(item => {

   
    item.addEventListener(
      "wheel",
      (e) => {
        item.scrollTop += e.deltaY;
        e.preventDefault(); 
      },
      { passive: false }
    );

  
    let startY = 0;

    item.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches || !e.touches[0]) return;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    item.addEventListener(
      "touchmove",
      (e) => {
        if (!e.touches || !e.touches[0]) return;

        const currentY = e.touches[0].clientY;
        const delta = startY - currentY;

        item.scrollTop += delta;
        startY = currentY;

        e.preventDefault();
      },
      { passive: false }
    );
  });
};



window.handleScrollImageEffect = function () {

   
    const safeAll = (sel, root = document) => {
        try {
            const list = root.querySelectorAll(sel);
            return list && list.length ? list : [];
        } catch {
            return [];
        }
    };

    const safeOne = (sel, root = document) => {
        try {
            const el = root.querySelector(sel);
            return el || null;
        } catch {
            return null;
        }
    };

   
    function plexify_scroll_image_effect($scope) {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
            console.warn("[ScrollEffect] GSAP/ScrollTrigger missing");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

    
        if ($scope instanceof jQuery) $scope = $scope[0];
        if (typeof $scope === "string") $scope = safeOne($scope);
        if (!($scope instanceof Element)) return;

        
        const evenItems = safeAll(
            ".pxl-group-image .inner-item:nth-child(even):not(:first-child) .item-image",
            $scope
        );
        const oddItems = safeAll(
            ".pxl-group-image .inner-item:nth-child(odd):not(:first-child) .item-image",
            $scope
        );
        const firstImage = safeOne(
            ".pxl-group-image .inner-item .item-image",
            $scope
        );

        if (!firstImage) {
            console.warn("[ScrollEffect] No .item-image found.");
            return;
        }

        const imageWidth = firstImage.offsetWidth || 200;

      
        gsap.set(evenItems, {
            x: (i) => (i % 2 === 0 ? imageWidth / 3.5 : -imageWidth / 3.5),
            rotation: (i) => (i % 2 === 0 ? 7 : -7)
        });

        gsap.set(oddItems, {
            x: (i) => (i % 2 === 0 ? -imageWidth / 2 : imageWidth / 2),
            rotation: (i) => (i % 2 === 0 ? -14 : 14)
        });

     
        [...evenItems, ...oddItems].forEach((img) => {
            gsap.to(img, {
                x: 0,
                rotation: 0,
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1.2,
                }
            });
        });
    }

    const activeGroups = safeAll(".tab-pane.active .pxl-group-image");

   if (!activeGroups.length) return;

      activeGroups.forEach((el) => {
          plexify_scroll_image_effect(el);
      });

    activeGroups.forEach((el) => {
        plexify_scroll_image_effect(el);
    });
};

  
  var handleTextTrail = function(){
		const widget = $('.pxl-text-trail')[0]; 
		if (widget) {
			const images = [...widget.querySelectorAll('.inner-item .item-text')];
	
			const MathUtils = {
				lerp: (a, b, n) => (1 - n) * a + n * b,
				distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
			};
	
			const getMousePos = (ev) => {
				return { x: ev.clientX, y: ev.clientY };
			};
	
			let mousePos = { x: 0, y: 0 };
			let lastMousePos = { x: 0, y: 0 };
			let cacheMousePos = { x: 0, y: 0 };
	
			widget.addEventListener('mousemove', (ev) => {
				mousePos = getMousePos(ev);
			});
	
			const getMouseDistance = () => MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
	
			class Image {
				constructor(el) {
					this.DOM = { el: el };
					this.defaultStyle = { x: 0, y: 0, opacity: 0 };
					this.getRect();
					this.initEvents();
				}
				initEvents() {
					window.addEventListener('resize', () => this.resize());
				}
				resize() {
					gsap.set(this.DOM.el, this.defaultStyle);
					this.getRect();
				}
				getRect() {
					this.rect = this.DOM.el.getBoundingClientRect();
				}
				isActive() {
					return gsap.getTweensOf(this.DOM.el).length > 0 || this.DOM.el.style.opacity != 0;
				}
			}
	
			class ImageTrail {
				constructor() {
					this.images = images.map(img => new Image(img));
					this.imagesTotal = this.images.length;
					this.imgPosition = 0;
					this.zIndexVal = 1;
					this.threshold = 100;
					requestAnimationFrame(() => this.render());
				}
				render() {
					let distance = getMouseDistance();
					cacheMousePos.x = MathUtils.lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
					cacheMousePos.y = MathUtils.lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);
	
					if (distance > this.threshold) {
						this.showNextImage();
						this.zIndexVal++;
						this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
						lastMousePos = mousePos;
					}
	
					let isIdle = this.images.every(img => !img.isActive());
					if (isIdle && this.zIndexVal !== 1) {
						this.zIndexVal = 1;
					}
	
					requestAnimationFrame(() => this.render());
				}
				showNextImage() {
					const img = this.images[this.imgPosition];
					TweenMax.killTweensOf(img.DOM.el);
	
					new TimelineMax()
						.set(img.DOM.el, {
							startAt: { opacity: 0 },
							opacity: 1,
							scale: 1,
							zIndex: this.zIndexVal,
							x: cacheMousePos.x - img.rect.width / 2,
							y: cacheMousePos.y - img.rect.height / 2
						}, 0)
						.to(img.DOM.el, 1.8, {
							ease: Expo.easeOut,
							x: mousePos.x - img.rect.width / 2,
							y: mousePos.y - img.rect.height / 2
						}, 0)
						.to(img.DOM.el, 0.8, {
							ease: Power1.easeOut,
							opacity: 0
						}, 0.8)
						.to(img.DOM.el, 0.8, {
							ease: Quint.easeInOut,
							scale: 2
						}, 0.8);
				}
			}
			new ImageTrail();
		}
	}

   const scrollTextAnimation = () => {
    const triggers = [];
    const scrollSplitInstances = [];

    const headings = document.querySelectorAll(
      ".pxl-heading-scroll-effect .heading-text"
    );

    if (headings.length === 0) return;

    headings.forEach((heading) => {
      heading.innerHTML = heading.textContent;
      const split = new SplitText(heading, { type: "lines" });
      scrollSplitInstances.push(split);

      split.lines.forEach((line) => {
        const tween = gsap.to(line, {
          backgroundPositionX: "0%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 50%",
            end: "bottom center",
            scrub: 1,
          },
        });

        if (tween.scrollTrigger) {
          triggers.push(tween.scrollTrigger);
        }
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      scrollSplitInstances.forEach((split) => split.revert());
    };
  };

 const bannerTabs = document.querySelectorAll(".banner-tabs");

  if (bannerTabs.length) {
    bannerTabs.forEach((tabItem) => {
      tabItem.addEventListener("click", function () {

        // Run AFTER tab becomes active
        setTimeout(() => {

          const targetGroups = document.querySelectorAll(".tab-pane.active .pxl-group-image");

          if (!targetGroups.length) return;  // safely skip

          targetGroups.forEach((group) => {
            if (typeof plexifyScrollImageEffect === "function") {
              plexifyScrollImageEffect(group);
            }
          });

          // refresh GSAP
          if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
          }

        }, 80); // best timing
      });
    });
  }




  function plexifyTypewriter(scope) {

  
  if (typeof scope === "string") {
    scope = document.querySelector(scope);
  } else if (scope && scope.jquery) {
    scope = scope[0];
  }

  
  if (!(scope instanceof Element)) return;

  
  const elements = scope.querySelectorAll(".typewrite .pxl-item--text");

 
  if (!elements || elements.length === 0) return;

  let index = 0;
  let timer = null;

  
  if (scope._typewriterTimer) {
    clearTimeout(scope._typewriterTimer);
  }

  function typewriterLoop(i) {
   
    elements.forEach((el) => el.classList.remove("is-active"));

   
    const currentElement = elements[i];
    if (currentElement) currentElement.classList.add("is-active");

   
    timer = setTimeout(() => {
      const nextIndex = (i + 1) % elements.length;
      typewriterLoop(nextIndex);
    }, 3500);

   
    scope._typewriterTimer = timer;
  }

  typewriterLoop(index);
}


 const dzPinArea = () => {
 
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("[dzPinArea] GSAP or ScrollTrigger missing.");
    return;
  }

  const pin = gsap.matchMedia();

  pin.add("(min-width: 1199px)", () => {
    
    const panels = document.querySelectorAll(".dz-pin-card");
    const endArea = document.querySelector(".dz-pin-area");

    
    if (!panels.length || !endArea) {
     
      return;
    }

    panels.forEach((section) => {
      if (!(section instanceof Element)) return;

      try {
        ScrollTrigger.create({
          trigger: section,
          pin: section,
          scrub: 1,
          start: "top 10%",
          end: "bottom 90%",
          endTrigger: endArea,
          pinSpacing: false,
          markers: false,
        });
      } catch (e) {
        console.error("[dzPinArea] ScrollTrigger error:", e);
      }
    });

   
    try {
      ScrollTrigger.refresh();
    } catch (e) {
      console.error("[dzPinArea] Refresh error:", e);
    }
  });
};
	

const initCardSticky = () => {
  let cleanupFn = null;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("[initCardSticky] GSAP/ScrollTrigger missing.");
    return () => {};
  }

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    const cards = gsap.utils.toArray(".stackCard");

    if (!cards.length) {
    
      return;
    }

    const triggers = [];
    const animations = [];

   
    const updateOpacity = (currentIndex) => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity:
            index === currentIndex
              ? 1
              : index < currentIndex
              ? 0.5
              : 1,
          duration: 0.2,
        });
      });
    };

   
    cards.forEach((card, index) => {
      if (!card) return;

      const scale = 1 - (cards.length - index) * 0.025;

      const scaleDown = gsap.to(card, {
        scale,
        ease: "none",
        paused: true,
      });

      let st;
      try {
        st = ScrollTrigger.create({
          trigger: card,
          start: "bottom bottom-=100",
          end: () => {
            const lastCard = cards[cards.length - 1];
            let lastTrigger = ScrollTrigger.getById("last-card");

            if (!lastTrigger) {
              lastTrigger = ScrollTrigger.create({
                trigger: lastCard,
                start: "bottom bottom-=100",
                id: "last-card",
              });
            }

            return lastTrigger.start;
          },
          pin: true,
          pinSpacing: false,
          animation: scaleDown,
          toggleActions: "restart none none reverse",
          onEnter: () => updateOpacity(index),
          onEnterBack: () => updateOpacity(index),
          onLeaveBack: () => updateOpacity(index - 1),
        });
      } catch (err) {
        console.error("[initCardSticky] ScrollTrigger error:", err);
        return;
      }

      triggers.push(st);
      animations.push(scaleDown);
    });

   
    cleanupFn = () => {
      triggers.forEach(t => t.kill());
      animations.forEach(a => a.kill());
    };
  });

 
  return () => {
    if (cleanupFn) cleanupFn();
  };
};


  const initCardSticky2 = () => {
  let cleanupFn = null;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("[initCardSticky2] GSAP/ScrollTrigger missing.");
    return () => {};
  }

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    const cards = gsap.utils.toArray(".stackCard2");

    if (!cards.length) {
      return;
    }

    const triggers = [];
    const animations = [];

    
    const updateOpacity = (currentIndex) => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity:
            index === currentIndex
              ? 1
              : index < currentIndex
              ? 0.5
              : 1,
          duration: 0.2,
        });
      });
    };

    
    cards.forEach((card, index) => {
      if (!card) return;

      const scale = 1 - (cards.length - index) * 0.025;

      const scaleDown = gsap.to(card, {
        scale,
        ease: "none",
        paused: true,
      });

      let st;

      try {
        st = ScrollTrigger.create({
          trigger: card,
          start: "bottom center",
          end: () => {
            const lastCard = cards[cards.length - 1];

            let lastST = ScrollTrigger.getById("last-card-2");
            if (!lastST) {
              lastST = ScrollTrigger.create({
                trigger: lastCard,
                start: "bottom center",
                id: "last-card-2",
              });
            }

            return lastST.start;
          },
          pin: true,
          pinSpacing: false,
          animation: scaleDown,
          toggleActions: "restart none none reverse",
          onEnter: () => updateOpacity(index),
          onEnterBack: () => updateOpacity(index),
          onLeaveBack: () => updateOpacity(index - 1),
        });
      } catch (err) {
        console.error("[initCardSticky2] ScrollTrigger error:", err);
        return;
      }

      triggers.push(st);
      animations.push(scaleDown);
    });

    cleanupFn = () => {
      triggers.forEach(t => t.kill());
      animations.forEach(a => a.kill());
    };
  });

  return () => {
    if (cleanupFn) cleanupFn();
  };
};


window.initCircleSlider = function () {
  try {
    const animatedCircleEl = document.getElementById("animatedCircle");
    if(!animatedCircleEl) return;
    const stepsData = document.querySelectorAll(".service-card-box");
    const stepsContainer = document.getElementById("circleStepsContainer");

    // ------- SAFE CHECKS -------
    if (!animatedCircleEl || !stepsContainer || !stepsData.length) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    // Kill old triggers
    if (window.circleTriggers?.length) {
      window.circleTriggers.forEach((t) => t.kill());
    }
    window.circleTriggers = [];

    // Reset steps container
    stepsContainer.innerHTML = "";

    const circle = animatedCircleEl;
    const totalSteps = stepsData.length;

    // ------- CIRCLE SIZE -------
    let circleSize = window.innerWidth < 1680 ? 620 : 717;
    let radius = window.innerWidth < 1680 ? 310 : 355;
    let center = window.innerWidth < 1680 ? 310 : 358.5;

    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;

    // ---------- UPDATE CIRCLE ----------
    const updateCircle = (index) => {
      const data = stepsData[index];
      if (!data) return;

      gsap.to(circle, {
        rotate: index * -(360 / totalSteps),
        duration: 0.5,
        ease: "power2.out",
      });

      // TEXT
      const circleTextEl = document.getElementById("circleText");
      if (circleTextEl) {
        circleTextEl.style.opacity = 1;
        circleTextEl.style.visibility = "visible";
        circleTextEl.innerHTML = data.dataset.title || "";
      }

      // ICON
      const circleIconEl = document.getElementById("circleIcon");
      const iconEl = data.querySelector(".service-icon");
      if (circleIconEl && iconEl) {
        circleIconEl.innerHTML = iconEl.innerHTML;

        const svg = circleIconEl.querySelector("svg");
        if (svg) {
          gsap.fromTo(
            svg,
            { scale: 0.5, opacity: 0, rotate: -20 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              transformOrigin: "center center",
            }
          );
        }
      }

      // STEPS SHOW / HIDE
      const stepEls = document.querySelectorAll(".step");
      stepEls.forEach((el, idx) => {
        const isActive = idx === index;
        const isNear = idx === index - 1 || idx === index + 1;

        el.style.opacity = isActive || isNear ? 1 : 0;
        el.style.visibility = isActive || isNear ? "visible" : "hidden";
        el.classList.toggle("active", isActive);

        if (isActive) {
          stepEls.forEach((el2) => {
            el2.style.rotate = index * (360 / totalSteps) + "deg";
          });
        }
      });

      // CARD ACTIVATE
      stepsData.forEach((card, idx) => {
        card.classList.toggle("active", idx === index);
      });
    };

    // -------- CREATE DOTS ----------
    stepsData.forEach((step, i) => {
      const angle = (360 / totalSteps) * i;
      const rad = (angle * Math.PI) / 180;

      const x = center + radius * Math.cos(rad) - 25;
      const y = center + radius * Math.sin(rad) - 25;

      const stepDiv = document.createElement("div");
      stepDiv.className =
        "step flex items-center justify-center absolute dark:bg-bg4 bg-[#F3F6E9] text-[#979797] size-50 rounded-full text-xl font-bold duration-500";

      stepDiv.style.left = `${x}px`;
      stepDiv.style.top = `${y}px`;
      stepDiv.textContent = String(i + 1).padStart(2, "0");

      stepsContainer.appendChild(stepDiv);
    });

    // ---------- PIN ----------
    const pinTrigger = ScrollTrigger.create({
      trigger: ".circle-sticky-content",
      start: "top top",
      endTrigger: ".circle-content-over",
      end: "bottom-=950",
      pin: true,
      pinSpacing: false,
    });
    window.circleTriggers.push(pinTrigger);

    // ---------- CARD TRIGGERS ----------
    stepsData.forEach((card, index) => {
      const t = ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateCircle(index),
        onEnterBack: () => updateCircle(index),
      });
      window.circleTriggers.push(t);
    });

    // ---------- INIT ----------
    updateCircle(0);
  } catch (err) {
    // Fail silently — no console error
  }
};



  let circleSliderResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(circleSliderResizeTimer);

  circleSliderResizeTimer = setTimeout(() => {
    try {

      const circleEl = document.getElementById("animatedCircle");
      if(!circleEl) return;

      // Function check
      if (typeof window.initCircleSlider !== "function") {
        console.warn("⚠️ initCircleSlider() is not defined.");
        return;
      }

      // Slider init
      window.initCircleSlider();

    } catch (err) {
      console.error("❌ Error in circle slider resize:", err);
    }
  }, 250);
});

// Select all elements with animation class
const elements = document.querySelectorAll(".pxl-draw");

// Create Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // ❌ Skip if inside slider
    if (el.closest(".pxl-slider-item")) {
      observer.unobserve(el);
      return;
    }

    // Read custom delay
    let delay = 0;
    const customData = el.getAttribute("data-setting-custom");

    if (customData) {
      try {
        const parsed = JSON.parse(customData);
        delay = parsed.custom_animation_delay || 0;
      } catch (err) {
        console.warn("Invalid JSON in data-setting-custom", err);
      }
    }

    // Animation trigger with optional delay
    setTimeout(() => {
      el.classList.add("pxl-animated");

      // Direction values
      let x = 0, y = 0;

      if (el.classList.contains("pxl-from-left"))  x = -100;
      if (el.classList.contains("pxl-from-right")) x = 100;
      if (el.classList.contains("pxl-from-top"))   y = -100;
      if (el.classList.contains("pxl-from-bottom"))y = 100;

      // GSAP animation
      gsap.fromTo(el,
        { opacity: 0, x, y },
        { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" }
      );
    }, delay);

    // Stop observing once animated
    observer.unobserve(el);
  });
}, {
  threshold: 0.4
});

// Observe all animation elements
elements.forEach(el => observer.observe(el));



  
  return {
    init: () => {
      plexifyTypewriter(".main-banner");
      stickyCard();
	  initCircleSlider();
      headerSticky();
      dzPinArea();
      handleScrollImageEffect();
      linkSmoothScroll();
      handleTextTrail();
      initCardSticky();
      initCardSticky2();
      initStickyPosition();
      initVideoAnimation();
      scrollTextAnimation();
      headingAnimation();
      Animationheading();
      customScroll();
    },
    load: function () {
			handleScrollImageEffect();
		},

		resize: function () {
			handleScrollImageEffect();
		}
  };
};

document.addEventListener("DOMContentLoaded", () => {
	plexifyGsap().init();
	setTimeout(() => {
		jQuery('.pxl-border-animated').addClass('pxl-animated');
	},100)
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
jQuery('button[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
	handleScrollImageEffect();  // ✅ function now globally accessible
	ScrollTrigger.refresh();    // ✅ refresh GSAP
});