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
});
