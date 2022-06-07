cardRow = document.getElementById("card-row")
pages = document.getElementById("pages")

let URL = window.location.href
console.log(URL)
let pageNumber = parseInt(URL.slice(-1))

if(pageNumber==="t"){
  pageNumber = 1;
}
function pageClick(number){
  console.log(number)
  indPage = document.getElementById(`pageNumber${number}`)

  indPage.innerHTML += `<span class="sr-only">(current)</span>`
}

fetch(`https://meshery.layer5.io/smp/performance/profiles/?page=${pageNumber-1}`, { 
    method: "GET"
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    
    let content = " "
    for(let i = 0;i<data.profiles.length;i++){
        content += `
            <div class="col-sm-6" style="margin-bottom: 20px" >
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${data.profiles[i].name}</h5>
                        <p class="card-text">
                            Performance profile number ${i+1}
                        </p>
                         <a href="${location.origin}/dashboard/performance#${data.profiles[i].id}"  class="btn btn-primary">Show Results</a>
                    </div>
                 </div>
            </div>
            
        `
    }
    let numberOfPages = Math.ceil(data.total_count/10);
    console.log(numberOfPages)

    pages.innerHTML = `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      <span class="sr-only">Previous</span>
    </a>
  </li>`

  for(let j = 0;j<numberOfPages;j++){
    pages.innerHTML +=  `<li onclick ="pageClick(${j+1})" class="page-item"><a id=pageNumber${j+1} class="page-link" href="${location.origin}/dashboard/burst/page=${j+1}">${j+1}</a></li>`
  }

  pages.innerHTML += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span aria-hidden="true">&raquo;</span>
    <span class="sr-only">Next</span>
  </a>
</li>`
    console.log(content);
    cardRow.innerHTML = content;
  })