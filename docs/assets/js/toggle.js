// // Sidebar toggle behavior
// const toggleButton = document.getElementById("sidebarCollapse");
// const vertNav = document.getElementById("sidebar")
// const content = document.getElementById("content")
// console.log(vertNav.classList)
// toggleButton.addEventListener(onclick ,function() {
//   console.log("toggleClicked")
//   vertNav.classList.toggle("active")
//   content.classList.toggle("active")
// })

$(function() {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
    });
  });