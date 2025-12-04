$(window).on("load", function () {
  $("body").removeClass("overflow");
});
$(document).ready(function () {
  /************************************ Side Menu ************************************/
  $(".menu-btn").click(function () {
    $(".header-nav").addClass("active");
    $("body").addClass("overflow");
    $(".overlay").fadeIn();
  });
  $(".close-btn,.overlay").click(function () {
    $(".header-nav").removeClass("active");
    $("body").removeClass("overflow");
    $(".overlay").fadeOut();
  });
  /************************************ Search ************************************/
  $(".header_search-icon").click(function () {
    $(".float_search-content").slideToggle();
    $(this).toggleClass("active");
  });
  /************************************ Main Slider ************************************/
  var mainSwiper = new Swiper(".main-slider .swiper", {
    a11y: {
      enabled: false,
    },
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".main-slider .swiper-btn-next",
      prevEl: ".main-slider .swiper-btn-prev",
    },
    pagination: {
      el: ".main-slider .swiper-pagination",
      clickable: true,
    },
  });

  /************************************ Mixitup Filter ************************************/
  $(".auctions_tab-link").on("click", function () {
    let filter = $(this).attr("id");

    $(".auctions_tab-link").removeClass("active");
    $(this).addClass("active");

    if (filter === "all") {
      $(".auction-item").show();
      return;
    }

    $(".auction-item").each(function () {
      let categories = $(this).data("categories").split(",");

      if (categories.includes(filter)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  /************************************ View Toggle ************************************/
  $(".view-btn").on("click", function () {
    let view = $(this).data("view");

    $(".view-btn").removeClass("active");
    $(this).addClass("active");

    if (view === "grid") {
      $(".auctions-grid").removeClass("list-view");
    } else {
      $(".auctions-grid").addClass("list-view");
    }
  });
  /************************************ Accordion ************************************/
  $(".log-title").on("click", function () {
    $(this).toggleClass("closed").next().slideToggle();
  });
  /************************************ Product Page ************************************/
  var productThumbsSlider = new Swiper(".product_thumbs-slider .swiper", {
    breakpoints: {
      0: {
        spaceBetween: 5,
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 8,
      },
    },
  });
  var productImagesSlider = new Swiper(".product_images-slider .swiper", {
    spaceBetween: 10,
    thumbs: {
      swiper: productThumbsSlider,
    },
  });
});

/************************************ Forms ************************************/
$(document).ready(function () {
  /************************************ Password ************************************/
  $(".password-toggle").on("click", function (e) {
    e.preventDefault();
    const input = $(this)
      .closest(".password-content")
      .find("input.form-control");
    const isPassword = input.attr("type") === "password";
    input.attr("type", isPassword ? "text" : "password");
    $(this).toggleClass("active", isPassword);
  });
  /************************************ Country Code Input ************************************/
  let input = $("input[type=tel][intlTelInput]");
  if (input.length > 0) {
    for (let i = 0; i < input.length; i++) {
      intlTelInput(input[i], {
        utilsScript: "/js/utils.js",
        separateDialCode: true,
        initialCountry: "sa",
        preferredCountries: ["sa", "kw", "ae", "bh", "om", "qa"],
      });
    }
  }

  /************************************ OTP ************************************/
  const inputs = $("#otp-input input");
  if (inputs.length > 0) {
    inputs.on("input", function () {
      const index = inputs.index(this);

      if (this.value.length == 1 && index + 1 < inputs.length) {
        $(inputs[index + 1]).removeAttr("disabled");
        inputs[index + 1].focus();
      } else {
        inputs.blur();
        $(".submit-btn").removeAttr("disabled");
      }

      if (this.value.length > 1) {
        if (isNaN(this.value)) {
          this.value = "";
          updateInput();
          return;
        }

        const chars = this.value.split("");

        $.each(chars, function (pos) {
          if (pos + index >= inputs.length) return false;

          let targetInput = inputs[pos + index];
          targetInput.value = chars[pos];
        });

        let focusIndex = Math.min(inputs.length - 1, index + chars.length);
        inputs[focusIndex].focus();
      }
      updateInput();
    });

    inputs.on("keydown", function (e) {
      const index = inputs.index(this);

      if (e.keyCode == 8 && this.value == "" && index != 0) {
        for (let pos = index; pos < inputs.length - 1; pos++) {
          inputs[pos].value = inputs[pos + 1].value;
        }

        inputs[index - 1].value = "";
        inputs[index - 1].focus();
        updateInput();
        return;
      }

      if (e.keyCode == 46 && index != inputs.length - 1) {
        for (let pos = index; pos < inputs.length - 1; pos++) {
          inputs[pos].value = inputs[pos + 1].value;
        }

        inputs[inputs.length - 1].value = "";
        this.select();
        e.preventDefault();
        updateInput();
        return;
      }

      if (e.keyCode == 37) {
        if (index > 0) {
          e.preventDefault();
          inputs[index - 1].focus();
          inputs[index - 1].select();
        }
        return;
      }

      if (e.keyCode == 39) {
        if (index + 1 < inputs.length) {
          e.preventDefault();
          inputs[index + 1].focus();
          inputs[index + 1].select();
        }
        return;
      }
    });

    function updateInput() {
      let inputValue = inputs.toArray().reduce(function (otp, input) {
        otp += input.value.length ? input.value : " ";
        return otp;
      }, "");
      $("input[name=otp]").val(inputValue);
    }
  }
  /************************************ Upload File ************************************/
  $(document).on("change", ".file-input", function () {
    const box = $(this).closest(".upload-box");
    const label = box.find(".upload-content span");
    const file = this.files[0];

    if (file) {
      label.text(file.name);
    } else {
      label.text(label.data("plceholder"));
    }
  });

  /************************************ Submit Form ************************************/
  $(document).on("change", "input[name='product_types']", function () {
    const modalId = "#" + $(this).attr("data-modal-id");
    const button = $("#addProductModal .submit-btn");
    button.attr("data-bs-target", modalId);
  });
});
