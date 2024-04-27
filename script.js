function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// for login
document.addEventListener("DOMContentLoaded", function() {
  // const submitButton = document.querySelector("button[type='submit']");
  const submitButton = document.getElementById("submit");
  const loginForm = document.querySelector(".container");
  
  submitButton.addEventListener("click", function(event) {
    console.log("The DOM has loaded");
    event.preventDefault(); // Prevent default form submission behavior
    loginForm.style.display = "block"; // Show the login form
  });
});


// for login