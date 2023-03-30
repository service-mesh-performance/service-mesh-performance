
// tableBody = document.getElementById("table-body")
tableContainer = document.getElementById("tableContainer")
let URL = window.location.hash.substring(1)
let profileId = URL.slice(0,36)

let currentPage = parseInt(URL.slice(42))

function reloadFunction(profileIds,page){
  window.location.replace(`${location.origin}/dashboard/performance#${profileIds}?page=${page}`)
  window.location.reload()
  
}


function createPagination(pages, page,profileIds) {
  
  let str = '<ul class="pagination justify-content-center">';
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;
  // Show the Previous button only if you are on a page other than the first
  if (page > 1) {
    str += `<li class="page-item previous no"><a onclick="reloadFunction('${profileIds}',${page-1})" class = "page-link" onclick="createPagination(${pages}, ${page-1}, '${profileIds}')">Previous</a></li>`;
  }
  // Show all the pagination elements if there are less than 6 pages total
  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page == p ? "active" : "no";
      str += `<li class="${active}"><a onclick="reloadFunction('${profileIds}',${p})" class = "page-link" onclick="createPagination(${pages}, ${p}, '${profileIds}')"> ${p} </a></li>`;
    }
  }
  // Use "..." to collapse pages outside of a certain range
  else {
    // Show the very first page followed by a "..." at the beginning of the
    // pagination section (after the Previous button)
    if (page > 2) {
      str += `<li class="no page-item"><a onclick="reloadFunction('${profileIds}',${1})" class = "page-link" onclick="createPagination(${pages}, ${1}, '${profileIds}')">1</a></li>`;
      if (page > 3) {
          str += `<li class="out-of-range"><a onclick="reloadFunction('${profileIds}',${page-2})" class = "page-link" onclick="createPagination(${pages},${page-2}, '${profileIds}')">...</a></li>`;
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
      str += `<li class="page-item ${active}"><a onclick="reloadFunction('${profileIds}',${p})" class = "page-link" onclick="createPagination(${pages}, ${p}, '${profileIds}')">${p}</a></li>`;
    }
    // Show the very last page preceded by a "..." at the end of the pagination
    // section (before the Next button)
    if (page < pages-1) {
      if (page < pages-2) {
        str += `<li class="out-of-range"><a onclick="reloadFunction('${profileIds}',${page+2})" class = "page-link" onclick="createPagination(${pages},${page+2}, '${profileIds}')">...</a></li>`;
      }
      str += `<li class="page-item no"><a onclick="reloadFunction('${profileIds}',${pages})" class = "page-link" onclick="createPagination(${pages}, ${pages},'${profileIds}')">${pages}</a></li>`;
    }
  }
  // Show the Next button only if you are on a page other than the last
  if (page < pages) {
    str += `<li class="page-item next no"><a onclick="reloadFunction('${profileIds}',${page+1})" class = "page-link" onclick="createPagination(${pages}, ${page+1}, '${profileIds}')">Next</a></li>`;
  }
  str += '</ul>';
  // Return the pagination string to be outputted in the pug templates
  document.getElementById('paginations').innerHTML = str;
  return str;
}


let loader = `<div class="spinnerContainer"><div class="spinner"></div></div>`;
tableContainer.innerHTML = loader;

fetch(`https://meshery.layer5.io/api/performance/smp/profiles/${profileId}/results/?page=${currentPage-1}`, { 
    method: "GET"
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    let content = " "
    content += `
           <table class="table"> 
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Endpoints</th>
                  <th scope="col">Last Run</th>
                  <th scope="col">Service Mesh</th>
                </tr>
             </thead>
             <tbody id="table-body">
    `
    if(data.total_count==0){
      content+=`
          <tr>
            <td colspan=5 style="text-align:center; font-size:25px">No results to show</td>
          </tr>
          </tbody>
          </table>
      
      `
      tableContainer.innerHTML = content;
    }
    else{
    for(let i = 0;i<data.results.length;i++){
        content += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>  <a href="${location.origin}/dashboard/performance/individual#${profileId}#${i}">${data.results[i].name}</a></td>
                <td>${data.results[i].runner_results.URL}</td>
                <td>${data.results[i].updated_at}</td>
                <td>${data.results[i].mesh}</td>
            </tr>
        `
    }

    let numberOfPages = Math.ceil(data.total_count/10);

    document.getElementById('paginations').innerHTML = createPagination(numberOfPages, currentPage, profileId);

    content+=`
          </tbody>
          </table>
    `
    tableContainer.innerHTML = content;
  }
  })