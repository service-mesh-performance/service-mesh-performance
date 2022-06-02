
tableBody = document.getElementById("table-body")


fetch("https://meshery.layer5.io/smp/performance/profiles/41b1c408-d251-4569-939f-2be756f7c080/results", { 
    method: "GET"
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    let content = " "
    for(let i = 0;i<data.results.length;i++){
        content += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>  <a href="http://127.0.0.1:4000/dashboard/performance/individual">${data.results[i].name}</a></td>
                <td>${data.results[i].runner_results.URL}</td>
                <td>${data.results[i].updated_at}</td>
                <td>${data.results[i].mesh}</td>
            </tr>
        `
    }
    console.log(content);
    tableBody.innerHTML = content;
  })