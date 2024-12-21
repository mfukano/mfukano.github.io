// Init EmailJS in IIFE on pageload
(function () {
  emailjs.init("3WZiXBeSlANX9BWzV");
})();

// Register contact form event listeners in onload
window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const userName = this.user_name.value;
      const userEmail = this.user_email.value;
      const formMessage = this.message.value;

      let { success, message } = validateEmailFormParams(
        userName,
        userEmail,
        formMessage,
      );

      if (!success) {
        renderError(message);
      } else {
        renderMessage(message);
        this.contact_number.value = (Math.random() * 100000) | 0;
        emailjs
          .sendForm("contact_service_f16b3nt", "personalsite_contactform", this)
          .then(
            function () {
              const message = "Sent email successfully";
              console.log(message);
              renderMessage(message);
            },
            function (error) {
              const errorMessage = `FAILED WITH ERROR: ${error}`;
              console.log(errorMessage);
              renderError(errorMessage);
            },
          );
      }
    });
};

// Open page quadrant
let box = document.getElementsByClassName("box");
Array.from(box).forEach((e) =>
  e.addEventListener("click", handleClick(e, 300, activateBox), false),
);

function handleClick(el, timeout, callback) {
  let startTime;
  const mouseDown = () => (startTime = Date.now());
  const mouseUp = (event) =>
    Date.now() - startTime < timeout && callback(event, el);
  el.addEventListener("mousedown", mouseDown);
  el.addEventListener("mouseup", mouseUp);
}

function activateBox(event, el) {
  if (
    ["INPUT", "TEXTAREA", "A", "BUTTON"].some(
      (name) => name === event.target.tagName,
    ) ||
    event.target.class === "email-form" ||
    // prevent project drop-downs from triggering box close
    event.target.classList.contains("project-dropdown") ||
    event.target.classList.contains("project-title") ||
    event.target.classList.contains("project-image-button")
  ) {
    return;
  }

  el.classList.toggle("active");
  el.firstElementChild.classList.toggle("active");
  if (!document.querySelector(".active")) {
    flushCurrent();
  }
  event.stopPropagation();
}

// Open project dropdown      TODO: lazy-loading
let projectDropdown = document.getElementsByClassName("project-dropdown");
Array.from(projectDropdown).forEach((e) =>
  e.addEventListener("click", dropDown, false),
);

/*
  dropDown is an event listener function that takes a project and
  makes text content viewable; if carousel is available, function also focuses
  the first image and selects the first span in carousel controls.
*/
function dropDown(e) {
  console.log(this);
  if (!this.classList.contains("current")) flushCurrent();
  this.classList.toggle("current");
  let projectContainer = this.querySelector(".project-container");
  if (projectContainer.querySelector(".carousel")) {
    projectContainer.querySelector("img").classList.add("opaque");
    projectContainer.querySelector("span").classList.add("selected");
  }
  e.stopPropagation();
}

/*
    flushCurrent is a utility function that removes all selected settings
    from the project-dropdown labeled as 'current'
*/
function flushCurrent() {
  let current = document.querySelector(".current") || undefined;
  if (current) current.classList.remove("current");
  if (current && current.querySelector(".opaque")) {
    current.querySelector(".opaque").classList.remove("opaque");
    current.querySelector(".selected").classList.remove("selected");
  }
}

let carousel = document.querySelectorAll(".carousel_controls span");
Array.from(carousel).forEach((e) =>
  e.addEventListener("click", controls, false),
);

function controls(e) {
  if (!e.target.classList.contains("selected")) {
    let carousel = e.target.parentElement.previousElementSibling; // select carousel
    let controls = e.target.parentElement; // select controls
    let index = e.target.textContent - 1;
    carousel.querySelector(".opaque").classList.remove("opaque");
    controls.querySelector(".selected").classList.remove("selected");
    e.target.classList.add("selected");
    carousel.children[index].classList.add("opaque");
  }
  e.stopPropagation();
}

function renderError(message) {
  let error = document.getElementById("error");
  error.textContent = message;
  error.style.display = "flex";

  setTimeout(() => {
    error.style.display = "none";
  }, 5000);
}
function renderMessage(message) {
  let msg = document.getElementById("message");
  msg.textContent = message;
  msg.style.display = "flex";

  setTimeout(() => {
    msg.style.display = "none";
  }, 5000);
}

function validateEmailFormParams(name, email, body) {
  let success = true;
  let message = "";

  if (name.length < 4 || !name.includes(" ")) {
    success = false;
    message =
      "Please include your full name if you want to get in touch with me!";
    return { success, message };
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    success = false;
    message = "Please input a properly formatted email.";
    return { success, message };
  }
  if (body.length < 30) {
    success = false;
    message =
      "Please send more detail about why you want to get in touch with me!";
    return { success, message };
  }

  message = "Form was validated successfully, sending email...";
  return { success, message };
}

