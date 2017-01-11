// Open page quadrant
let box = document.getElementsByClassName('box')
Array.from(box).forEach(e => e.addEventListener('click', activateBox, false))

function activateBox(e) {
  this.classList.toggle('active')
  this.firstElementChild.classList.toggle('active')
  if (!document.querySelector('.active')) {
    flushCurrent()
  }
  e.stopPropagation()
}

// Open project dropdown      TODO: lazy-loading
let projectDropdown = document.getElementsByClassName('project-dropdown')
Array.from(projectDropdown).forEach(e =>
  e.addEventListener('click', dropDown, false)
)

/*
  dropDown is an event listener function that takes a project and
  makes text content viewable; if carousel is available, function also focuses
  the first image and selects the first span in carousel controls.
*/
function dropDown(e) {
  if (!this.classList.contains('current') )
    flushCurrent()
  this.classList.toggle('current')
  let projectContainer = this.querySelector('.project-container')
  if (projectContainer.querySelector('.carousel')) {
    projectContainer.querySelector('img').classList.add('opaque')
    projectContainer.querySelector('span').classList.add('selected')
  }
  e.stopPropagation()
}

/*
    flushCurrent is a utility function that removes all selected settings
    from the project-dropdown labeled as 'current'
*/

function flushCurrent() {
  let current = document.querySelector('.current') || undefined
  if (current) current.classList.remove('current')
  if (current && current.querySelector('.opaque')) {
    current.querySelector('.opaque').classList.remove('opaque')
    current.querySelector('.selected').classList.remove('selected')
  }
  // opaque.classList.remove('opaque')
}


let carousel = document.querySelectorAll('.carousel_controls span')
Array.from(carousel)
  .forEach(e => e.addEventListener('click', controls, false))

function controls(e) {
  if (!e.target.classList.contains('selected')) {
    let carousel = e.target.parentElement.previousElementSibling // select carousel
    let controls = e.target.parentElement                       // select controls
    let index = e.target.textContent - 1
    carousel.querySelector('.opaque').classList.remove('opaque')
    controls.querySelector('.selected').classList.remove('selected')
    e.target.classList.add('selected')
    carousel.children[index].classList.add('opaque')
  }
  e.stopPropagation()
}
