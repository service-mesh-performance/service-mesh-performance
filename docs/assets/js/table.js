
tableBody = document.getElementById("table-body")
let text = window.location.hash.substring(1)


fetch(`https://meshery.layer5.io/smp/performance/profiles/${text}/results`, { 
    method: "GET"
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    let content = " "
    for(let i = 0;i<data.results.length;i++){
        content += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>  <a href="${location.origin}/dashboard/performance/individual#${text}#${i}">${data.results[i].name}</a></td>
                <td>${data.results[i].runner_results.URL}</td>
                <td>${data.results[i].updated_at}</td>
                <td>${data.results[i].mesh}</td>
            </tr>
        `
    }
    console.log(content);
    tableBody.innerHTML = content;
  })