cardRow = document.getElementById("card-row")

fetch("https://meshery.layer5.io/smp/performance/profiles/", { 
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
                         <a href="http://127.0.0.1:4000/dashboard/performance" class="btn btn-primary">Show Results</a>
                    </div>
                 </div>
            </div>
            
        `
    }
    console.log(content);
    cardRow.innerHTML = content;
  })