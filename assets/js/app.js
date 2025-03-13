// =================== ****************** ================== //
// Template Name: Coffee Shop
// Description:  Coffee Shop Html Template
// Version: 1.0.0

// =================== ****************** ================== //

var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";

  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.preloader();
      Init.BackToTop();
      Init.header();
      Init.searchToggle();
      Init.quantityHandle();
      Init.toggle();
      Init.swiper();
      Init.slick();
      Init.countdownInit(".countdown", "2025/11/01");
      Init.timePicker();
      Init.filterSearch();
      Init.dropdown();
      Init.filterToggle();
      Init.priceRangeSlider();
      Init.formValidation();
      Init.contactForm();
    },

    w: function (e) {},

    // Preloader
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 3000);
    },

    /*-- Back-to-top --*/
    BackToTop: function () {
      const scrollToTopBtn = document.querySelector(".scrollToTopBtn");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          scrollToTopBtn.style.opacity = "1";
          scrollToTopBtn.style.transform = "none";
        } else {
          scrollToTopBtn.style.opacity = "0";
          scrollToTopBtn.style.transform = "translateY(100px)";
        }
      });

      // Scroll to top on click
      scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    // Header
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },

    // Search Toggle
    searchToggle: function () {
      if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
          e.preventDefault();
          $(".search-popup").toggleClass("active");
          $(".mobile-nav__wrapper").removeClass("expanded");
          $("body").toggleClass("locked");
        });
      }
    },

    // Quantity Controller
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    // Toggle
    toggle: function () {
      $(".tab-button").on("click", function () {
        $(".tab-button").removeClass("active");
        var target = $(this).attr("data-toggle");
        $(this).addClass("active");

        $(".tab-pane").hide();
        $("#" + target).show();
      });
    },

    swiper: function () {
      if ($(".itemsSwiper").length) {
        var sliderCounter = document.createElement("div");
        sliderCounter.classList.add("slider__counter");

        var swiper = new Swiper(".itemsSwiper", {
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 3,
          coverflowEffect: {
            rotate: -25,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false,
          // },
          speed: 1000,
          loop: true,
          breakpoints: {
            1499: {
              slidesPerView: 3,
            },
            1399: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 1,
            },
            767: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1,
            },
            375: {
              slidesPerView: 1,
            },
          },
          on: {
            init: function () {
              updateSliderCounter(this);
              this.el.append(sliderCounter);
            },
            slideChange: function () {
              updateSliderCounter(this);
            },
          },
        });

        function updateSliderCounter(swiper) {
          var currentSlide = (swiper.realIndex + 1).toString().padStart(2, "0");
          var slidesCount = (swiper.slides.length - swiper.loopedSlides * 2)
            .toString()
            .padStart(2, "1");

          sliderCounter.innerHTML = `<span class="current-slide">${currentSlide}</span>/<span class="total-slides">${slidesCount}</span>`;
        }
      }
    },

    // Slick Slider
    slick: function () {
      if ($(".customer-slider").length) {
        $(".customer-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          centerMode: true,
          arrows: false,
          pauseOnHover: true,
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }

      if ($(".product-slider").length) {
        $(".product-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".product-slider-asnav",
        });
      }
      if ($(".special-slider").length) {
        $(".special-slider").slick({
          centerMode: true,
          slidesToShow: 3,
        });
      }
      if ($(".product-slider-asnav").length) {
        $(".product-slider-asnav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".product-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          variableWidth: true,
          focusOnSelect: true,
        });
      }

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });

      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },

    // Countdown Timer
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<li><h2>%D</h2><p>Days</p></li>\
              <li><h2>%H</h2><p>Hrs</p></li>\
              <li><h2>%M</h2><p>Mins</p></li>\
              <li><h2>%S</h2><p>Secs</p></li>"
            )
          );
        });
      }
    },
    // =======================
    // Time Picker
    // =======================
    timePicker: function () {
      if ($("input[name=time]").length) {
        $("input[name=time]").clockpicker({
          placement: "bottom",
          align: "left",
          autoclose: true,
          default: "now",
          donetext: "Select",
        });
      }
    },

    // Blog Search Toggle
    filterSearch: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".blogs-block").filter(function () {
            var hasMatch =
              $(this).find(".blog-title").text().toLowerCase().indexOf(value) >
              -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },

    // Header
    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },

    // Filter Toggle Button
    filterToggle: function () {
      if ($(".filter-block").length) {
        $(".filter-block .title").on("click", function (e) {
          var count = $(this).data("count");
          if (
            $(".filter-block.box-" + count + " .content-block").is(":visible")
          ) {
            $(".filter-block.box-" + count + " .far").removeClass(
              "fa-horizontal-rule"
            );
            $(".filter-block.box-" + count + " .far").addClass("fa-plus");
            $(".filter-block.box-" + count + " .content-block").hide("slow");
          } else {
            $(".filter-block.box-" + count + " .far").removeClass("fa-plus");
            $(".filter-block.box-" + count + " .far").addClass(
              "fa-horizontal-rule"
            );
            $(".filter-block.box-" + count + " .content-block").show("slow");
          }
        });
      }
      if ($(".toggle-sidebar").length) {
        $(".shop-filter").on("click", function () {
          $(".toggle-sidebar").animate({ left: "0" }, 300);
          $(".overlay").fadeIn(300);
        });

        $(".overlay").on("click", function () {
          $(".toggle-sidebar").animate({ left: "-400px" }, 300);
          $(this).fadeOut(300);
        });
      }

      // Checkout Login
      if ($(".customer-container").length) {
        $(".signin-button").click(function () {
          $(".sign-form").slideToggle();
        });
      }

      // Checkout Billing Address
      if ($("#shipAddress").length) {
        $(".billing-address").hide();
        $("#shipAddress").change(function () {
          if ($(this).is(":unchecked")) {
            $(".billing-address").hide("slow");
          } else {
            $(".billing-address").show("slow");
          }
        });
      }
    },

    // Price Range Slider
    priceRangeSlider: function () {
      const priceGap = 1000;

      $(".price-input input").on("input", function () {
        let minPrice = parseInt($(".price-input .input-min").val()),
          maxPrice = parseInt($(".price-input .input-max").val());

        if (
          maxPrice - minPrice >= priceGap &&
          maxPrice <= $(".range-input .range-max").attr("max")
        ) {
          if ($(this).hasClass("input-min")) {
            $(".range-input .range-min").val(minPrice);
            $(".slider .progress").css(
              "left",
              (minPrice / $(".range-input .range-min").attr("max")) * 100 + "%"
            );
          } else {
            $(".range-input .range-max").val(maxPrice);
            $(".slider .progress").css(
              "right",
              100 -
                (maxPrice / $(".range-input .range-max").attr("max")) * 100 +
                "%"
            );
          }
        }
      });

      $(".range-input input").on("input", function () {
        let minVal = parseInt($(".range-input .range-min").val()),
          maxVal = parseInt($(".range-input .range-max").val());

        if (maxVal - minVal < priceGap) {
          if ($(this).hasClass("range-min")) {
            $(".range-input .range-min").val(maxVal - priceGap);
          } else {
            $(".range-input .range-max").val(minVal + priceGap);
          }
        } else {
          $(".price-input .input-min").val(minVal);
          $(".price-input .input-max").val(maxVal);
          $(".slider .progress").css(
            "left",
            (minVal / $(".range-input .range-min").attr("max")) * 100 + "%"
          );
          $(".slider .progress").css(
            "right",
            100 -
              (maxVal / $(".range-input .range-max").attr("max")) * 100 +
              "%"
          );
        }
      });
    },

    // Form Validation
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },

    // Contact Form
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-2 mb-12'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-2 mb-12'>There is an error</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return false;
        }
      });
    },
  };

  Init.i();
})(window, document, jQuery);
