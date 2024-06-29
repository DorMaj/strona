$(document).ready(function() {
	function slideMenu() {
	  var activeState = $("#menu-container .menu-list").hasClass("active");
	  $("#menu-container").animate({right: activeState ? "0%" : "-100%"}, 400);
	}

	function toggleMenu() {
	  $("#hamburger-menu").toggleClass("open");
	  $("#menu-container .menu-list").toggleClass("active");
	  slideMenu();
	  $("body").toggleClass("overflow-hidden");
	}

	$("#menu-wrapper").click(function(event) {
	  event.stopPropagation();
	  toggleMenu();
	});

	$("#menu-container .close-menu").click(function(event) {
	  event.stopPropagation();
	  toggleMenu();
	});

	$(document).click(function(event) {
	  if (!$(event.target).closest("#menu-container, #menu-wrapper").length) {
		if ($("#menu-container .menu-list").hasClass("active")) {
		  toggleMenu();
		}
	  }
	});

	$(".menu-list").find(".accordion-toggle").click(function() {
	  $(this).nextUntil(".accordion-toggle").slideToggle("fast").toggleClass("open");
	  $(this).toggleClass("active-tab").find(".menu-link").toggleClass("active");

	  $(".menu-list .accordion-content").not($(this).nextUntil(".accordion-toggle")).slideUp("fast").removeClass("open");
	  $(".menu-list .accordion-toggle").not($(this)).removeClass("active-tab").find(".menu-link").removeClass("active");
	});
  });