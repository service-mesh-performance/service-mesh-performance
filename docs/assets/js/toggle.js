// Sidebar toggle behavior
const toggleButton = document.getElementById("sidebarCollapse");
const vertNav = document.getElementById("sidebar")
const content = document.getElementById("content")
const leftChevron = document.querySelector(".icon-left")
const rightChevron = document.querySelector(".icon-right")
console.log(leftChevron.getc)

//toggle left and right chevron
function toggleStyle(element){
  if(element.style["display"] === "none"){
    element.style["display"] = "block"
  }
  else{
    element.style["display"]= "none"
  }
}

// user clickes the toggle button
toggleButton.addEventListener("click" ,function() {
  vertNav.classList.toggle("active")
  content.classList.toggle("active")
  toggleStyle(leftChevron)
  toggleStyle(rightChevron)
 
})

// if the user loads the page in small screen
if(this.window.matchMedia("(max-width: 1167px)").matches){
  leftChevron.style["display"] = "none"
  rightChevron.style["display"] = "block"
  vertNav.classList.add("active")
  content.classList.add("active")
}

// if the user resizes the screen
window.addEventListener("resize",function(){
  if(this.window.matchMedia("(max-width: 1167px)").matches){
    leftChevron.style["display"] = "none"
    rightChevron.style["display"] = "block"
    vertNav.classList.add("active")
    content.classList.add("active")
  }
  if(this.window.matchMedia("(min-width: 1167px)").matches){
    leftChevron.style["display"] = "block"
    rightChevron.style["display"] = "none"
    vertNav.classList.remove("active")
    content.classList.remove("active")
  }
})
