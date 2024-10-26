import $ from "jquery";

export const toggleNavbar = () => {
  $(document).ready(function () {
    $(".navbar-burger").click(function () {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });
  });
};
