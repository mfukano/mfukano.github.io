// Open profile quarter for more information
$(document).on("click",".box",function(e){
  e.stopPropagation();
  $(this).toggleClass("active");
  if ($(".active").length == 0) {
    console.log("'current' length: " + $(".current").length);
    console.log("no active");
    $(".current").find(".project-container").toggleClass("hide");
    $(".current").removeClass("current");
  }
});

// Shifts the title to a readable, unobtrusive position
$(".title").parent().hasClass("active", function(){
  $(this).toggleClass("active");
});


/*
* Portfolio page project views
* TODO: lazy-loading
*/
$(".project-dropdown").on("click", function (e) {
  e.stopPropagation();
  $(".current").removeClass("current");
  var currContainer = $(this).children(".project-container");
  $(this).addClass("current");
    
  $(".current").find(".project-container").toggleClass("hide");
  $(".current").siblings().find(".project-container").addClass("hide");

  if (currContainer.hasClass("hide")) {
    $(".hover").removeClass("hover");
    $(".current").removeClass("current");
    $(".carousel img").removeClass("opaque");
    $(".carousel_controls span").removeClass("selected");
  } else {
    $(".current").find(".carousel img").first().addClass("opaque");
    $(".current").find(".carousel_controls span").first().addClass("selected");
  }

    $(".current").addClass("hover");
    $(".current").find("*").addClass("hover");

    $(".current").mouseover(function() {
      $(".current").addClass("hover");
      $(".current").find("*").addClass("hover");
    });
    $(".current").mouseleave(function(){
      $(".current").removeClass("hover");
      $(".current").find("*").removeClass("hover");
    });
    $(".project-dropdown").not(".current").mouseover(function(){
      $(".current").removeClass("hover");
      $(".current").find("*").removeClass("hover");
  }); 

});

/* 
*  show go-icon on hover
*  TODO: affix go-icon on current container
*/
$(".project-dropdown").hover(function(){
    $(this).find(".go-icon").css("visibility", "visible");
}, function() {
    $(this).find(".go-icon").css("visibility", "hidden");
});

// image carousel jQuery
$(".carousel_controls").on("click", "span", function(e) {
  e.stopPropagation();
$(".carousel img").removeClass("opaque");

var newImage = $(this).index();
console.log(newImage);

var displayed = $(".current").find(".carousel img").eq(newImage);

displayed.addClass("opaque");

$(".carousel_controls span").removeClass("selected");
$(this).addClass("selected");
});