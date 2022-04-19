// Sidebar toggle behavior
const toggleButton = document.getElementById("sidebarCollapse");
const vertNav = document.getElementById("sidebar")
const content = document.getElementById("content")
const leftChevron = document.querySelector(".icon-left")
const rightChevron = document.querySelector(".icon-right")
// const pageContent = document.getElementById("#content")
console.log(leftChevron.getc)

function toggleStyle(element){
  if(element.style["display"] === "none"){
    element.style["display"] = "block"
  }
  else{
    element.style["display"]= "none"
  }
}

toggleButton.addEventListener("click" ,function() {
  vertNav.classList.toggle("active")
  content.classList.toggle("active")
  toggleStyle(leftChevron)
  toggleStyle(rightChevron)
 
})

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
