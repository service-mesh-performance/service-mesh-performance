cardRow = document.getElementById("card-row")
pages = document.getElementById("pages")

let test_type = cardRow.attributes[2].value

if(window.location.hash == "" )
{
  reloadFunction(1,"start")
}

let URL = window.location.href
let currentPage = parseInt(URL.slice(-1))

if(currentPage==="t"){
  currentPage = 1;
}
function reloadFunction(page,status){
  if(status=="start")
  window.location.replace(`${location.origin}/dashboard/${test_type}#page=${page}`)
  else{
    window.location.replace(`${location.origin}/dashboard/${test_type}#page=${page}`)
    window.location.reload()
  }
  
}

function createPagination(pages, page) {
  let str = '<ul class="pagination justify-content-center">';
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;
  // Show the Previous button only if you are on a page other than the first
  if (page > 1) {
    str += `<li class="page-item previous no"><a onclick="reloadFunction(${page-1},'pageChange')" class = "page-link" onclick="createPagination(${pages}, ${page-1})">Previous</a></li>`;
  }
  // Show all the pagination elements if there are less than 6 pages total
  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page == p ? "active" : "no";
      str += `<li class=" page-item ${active}"><a onclick="reloadFunction(${p})" class = "page-link" onclick="createPagination(${pages}, ${p})"> ${p} </a></li>`;
    }
  }
  // Use "..." to collapse pages outside of a certain range
  else {
    // Show the very first page followed by a "..." at the beginning of the
    // pagination section (after the Previous button)
    if (page > 2) {
      str += `<li class="no page-item"><a onclick="reloadFunction(${1})" class = "page-link" onclick="createPagination(${pages}, ${1})">1</a></li>`;
      if (page > 3) {
          str += `<li class="out-of-range"><a onclick="reloadFunction(${page-2})" class = "page-link" onclick="createPagination(${pages},${page-2})">...</a></li>`;
      }
    }
    // Determine how many pages to show after the current page index
    if (page === 1) {
      pageCutHigh += 2;
    } else if (page === 2) {
      pageCutHigh += 1;
    }
    // Determine how many pages to show before the current page index
    if (page === pages) {
      pageCutLow -= 2;
    } else if (page === pages-1) {
      pageCutLow -= 1;
    }
    // Output the indexes for pages that fall inside the range of pageCutLow
    // and pageCutHigh
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pages) {
        continue
      }
      active = page == p ? "active" : "no";
      str += `<li class="page-item ${active}"><a onclick="reloadFunction(${p})" class = "page-link" onclick="createPagination(${pages}, ${p})">${p}</a></li>`;
    }
    // Show the very last page preceded by a "..." at the end of the pagination
    // section (before the Next button)
    if (page < pages-1) {
      if (page < pages-2) {
        str += `<li class="out-of-range"><a onclick="reloadFunction(${page+2})" class = "page-link" onclick="createPagination(${pages},${page+2})">...</a></li>`;
      }
      str += `<li class="page-item no"><a onclick="reloadFunction(${pages})" class = "page-link" onclick="createPagination(${pages}, ${pages})">${pages}</a></li>`;
    }
  }
  // Show the Next button only if you are on a page other than the last
  if (page < pages) {
    str += `<li class="page-item next no"><a onclick="reloadFunction(${page+1})" class = "page-link" onclick="createPagination(${pages}, ${page+1})">Next</a></li>`;
  }
  str += '</ul>';
  // Return the pagination string to be outputted in the pug templates
  document.getElementById('paginations').innerHTML = str;
  return str;
}

let loader = `<div class="spinnerContainer"><div class="spinner"></div></div>`;
cardRow.innerHTML = loader;
fetch(`https://meshery.layer5.io/api/performance/smp/profiles/?page=${currentPage-1}`, { 
    method: "GET"
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    if(test_type=="all"){
    let content = " ";
    let total_item = 0;
    let perfoProfileNo = 0;
    for(let i = 0;i<data.profiles.length;i++){
      let profileName = data.profiles[i].name
      let title;
      let smpProfileName= profileName.split(".")[0];
      let smpProfileNameArray = smpProfileName.split("-");
      let profileNameArray;
      if(smpProfileNameArray[0]==="smp"){
        profileNameArray=smpProfileName.split("smp-")[1].split("-");
      }
      else{
        profileNameArray=smpProfileName.split("-");
      }
      let servMesh = profileNameArray[0]== 'osm'? 'OSM': profileNameArray[0][0].toUpperCase()+profileNameArray[0].slice(1);
      let testType = profileNameArray[2][0].toUpperCase()+profileNameArray[2].slice(1);
      let loadGen = profileNameArray[1]=='wrk2'?'WRK2':profileNameArray[1][0].toUpperCase()+profileNameArray[1].slice(1)
      let createdDate = new Date(data.profiles[i].created_at)
      let lastRun = new Date(data.profiles[i].last_run)

      // Istio Load Test with Forito
      title = ` ${servMesh} ${testType} Test with ${loadGen} `
        let display;
        if(data.profiles[i].total_results){
          display = "block";
          total_item = total_item+1;
          perfoProfileNo = perfoProfileNo+1;
        }
        else{
          display = "none";
        }

        content += `
            <div style = "display:${display}; margin-bottom: 20px" class="col-sm-6"  >
                <div  class="card">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <div class="card-text">
                          <div class="information">
                            <div>
                              <h6 class="card-subtitle mb-2 text-muted 
                              font-weight-bold
                              font-italic">Service mesh:&nbsp;${servMesh}</h6>
                            </div>
                            
                            <div>
                              <h6 class="card-subtitle mb-2 text-muted font-weight-bold font-italic">Test Config:&nbsp;${testType} Test</h6>
                            </div>
                            <div>
                              <h6 class="card-subtitle mb-2 text-muted font-weight-bold font-italic">Load Generator:&nbsp;${loadGen}</h6>
                            </div>
                          </div>
                          <div class="dateInfo">
                            <h6 class="card-subtitle mb-2 text-muted font-italic" style="font-size:14px;">Date Created:&nbsp; ${createdDate.toUTCString()} </h6>

                            <h6 class="card-subtitle mb-2 text-muted font-italic" style="font-size:14px;">Last Run:&nbsp;${lastRun.toUTCString()} </h6>
                          </div>
                        </div>
                         <a href="${location.origin}/dashboard/performance#${data.profiles[i].id}?page=1"  class="btn btn-primary">Show Results</a>
                    </div>
                 </div>
            </div>
            
        `
    }
    let numberOfPages = Math.ceil(total_item/10);

    document.getElementById('paginations').innerHTML = createPagination(numberOfPages, currentPage);

    cardRow.innerHTML = content;
  }
  else {
  let total_item = 0
  let content = " "
  let perfoProfileNo = 0;
  for(let i = 0;i<data.profiles.length;i++){
      let parse_test_type = data.profiles[i].name.split("-")[2]
      if(parse_test_type==test_type){
        let profileName = data.profiles[i].name;
      let title;
      let profileNameArray= profileName.split(".")[0].split("-")
      let servMesh = profileNameArray[0]== 'osm'? 'OSM': profileNameArray[0][0].toUpperCase()+profileNameArray[0].slice(1);
      let testType = profileNameArray[2][0].toUpperCase()+profileNameArray[2].slice(1);
      let loadGen = profileNameArray[1]=='wrk2'?'WRK2':profileNameArray[1][0].toUpperCase()+profileNameArray[1].slice(1)
      let createdDate = new Date(data.profiles[i].created_at)
      let lastRun = new Date(data.profiles[i].last_run)

      // Istio Load Test with Forito
      title = ` ${servMesh} ${testType} Test with ${loadGen} `
        let display;
        if(data.profiles[i].total_results){
          display = "block";
          total_item = total_item+1;
          perfoProfileNo = perfoProfileNo+1;
        }
        else{
          display = "none";
        }
      
      content += `
      <div style = "display:${display}; margin-bottom: 20px" class="col-sm-6"  >
      <div  class="card">
          <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <div class="card-text">
                <div class="information">
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted 
                    font-weight-bold
                    font-italic">Service mesh:&nbsp;${servMesh}</h6>
                  </div>
                  
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted font-weight-bold font-italic">Test Config:&nbsp;${testType} Test</h6>
                  </div>
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted font-weight-bold font-italic">Load Generator:&nbsp;${loadGen}</h6>
                  </div>
                </div>
                <div class="dateInfo">
                  <h6 class="card-subtitle mb-2 text-muted font-italic" style="font-size:14px;">Date Created:&nbsp; ${createdDate.toUTCString()} </h6>

                  <h6 class="card-subtitle mb-2 text-muted font-italic" style="font-size:14px;">Last Run:&nbsp;${lastRun.toUTCString()} </h6>
                </div>
              </div>
               <a href="${location.origin}/dashboard/performance#${data.profiles[i].id}?page=1"  class="btn btn-primary">Show Results</a>
          </div>
       </div>
  </div>
  
          
      `
  }
  let numberOfPages = Math.ceil(total_item/10);

  document.getElementById('paginations').innerHTML = createPagination(numberOfPages, currentPage);

  cardRow.innerHTML = content;
}
}
  })