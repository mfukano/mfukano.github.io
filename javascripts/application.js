// // Open profile quarter for more information
let box = document.getElementsByClassName('box')
Array.from(box).forEach(e => e.addEventListener('click', activateBox, false))

function activateBox(e) {
  this.classList.toggle('active')
  this.firstElementChild.classList.toggle('active')
  if (!document.querySelector('.active')) {
    let cur = document.querySelector('.current')
    if (cur) {
      cur.children('.project-container').classList.toggle('hide')
      cur.classList.removeClass('current')
    }
  }
  e.stopPropagation()
}


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
    $(".current").removeClass("current");
    $(".carousel img").removeClass("opaque");
    $(".carousel_controls span").removeClass("selected");
  } else {
    $(".current").find(".carousel img").first().addClass("opaque");
    $(".current").find(".carousel_controls span").first().addClass("selected");
  }
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
