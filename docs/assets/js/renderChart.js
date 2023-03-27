function myRound(v, digits = 2) {
    var p = Math.pow(10, digits);
    return Math.round(v * p) / p;
  }
  
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  
  function formatDate(dStr) {
    var d = new Date(dStr);
    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  }
  
  /**
   * The Axes Definitions and labellers
   */
  const Axes = {
    x: {
      type: "linear",
      scaleLabel: {
        display: true,
        labelString: "Response time in ms",
        ticks: {
          min: 0,
          beginAtZero: true,
        },
      },
    },
    y: {
      id: "H",
      type: "linear",
      ticks: {
        beginAtZero: true,
      },
      scaleLabel: {
        display: true,
        labelString: "Count",
      },
    },
  };
  
  function getMetadata(rawdata, res) {
    return {
      title: {
        display: {
          key: "Title",
          // value : res.Labels.split(' -_- ')?.[0] || "No Title"
          value:
            (rawdata ? rawdata.name : res.Labels.split(" -_- ")?.[0]) ||
            "No Title",
        },
      },
      url: {
        display: {
          key: "URL",
          value:
            (rawdata
              ? rawdata.runner_results.URL
              : res.Labels.split(" -_- ")?.[1]) || "No URL",
        },
      },
      startTime: {
        display: {
          key: "Start Time",
          value: formatDate(res.StartTime),
        },
      },
      minimum: {
        display: {
          key: "Minimum",
          value: `${myRound(1000.0 * res.DurationHistogram.Min, 3)} ms`,
        },
      },
      average: {
        display: {
          key: "Average",
          value: `${myRound(1000.0 * res.DurationHistogram.Avg, 3)} ms`,
        },
      },
      maximum: {
        display: {
          key: "Maximum",
          value: `${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms`,
        },
      },
      qps: {
        display: {
          key: "QPS",
          value: `Achieved ${myRound(res.ActualQPS, 1)} (Requested ${
            res?.RequestedQPS
          })`,
        },
      },
      numberOfConnections: {
        display: {
          key: "Number Of Connections",
          value: res.NumThreads,
        },
      },
      duration: {
        display: {
          key: "Duration",
          value: `Achieved ${myRound(res.ActualDuration / 1e9, 1)} (Requested ${
            res.RequestedDuration
          })`,
        },
      },
      errors: {
        display: {
          key: "Errors",
          value: (() => {
            const status = res.RetCodes?.[200] || res.RetCodes?.SERVING || 0;
            const total = res.DurationHistogram.Count;
  
            if (status !== total) {
              if (status)
                return (
                  myRound((100.0 * (total - status)) / total, 2) + "% errors"
                );
  
              return "100% errors!";
            }
  
            return "No Errors";
          })(),
        },
      },
      percentiles: {
        display: {
          key: "Percentiles",
          value: res.DurationHistogram?.Percentiles?.map((p) => {
            return {
              display: {
                key: `p${p.Percentile}`,
                value: `${myRound(1000 * p.Value, 2)} ms`,
              },
            };
          }),
        },
      },
      kubernetes: {
        display: {
          hide: !res.kubernetes,
          key: "Kuberenetes",
          value: [
            {
              display: {
                key: "Server Version",
                value: res.kubernetes?.server_version,
              },
            },
            {
              display: {
                key: "Nodes",
                value: res.kubernetes?.nodes?.map((node, i) => {
                  return {
                    display: {
                      key: `Node ${i + 1}`,
                      value: [
                        {
                          display: {
                            key: "Hostname",
                            value: node?.hostname,
                          },
                        },
                        {
                          display: {
                            key: "CPU",
                            value: node?.allocatable_cpu,
                          },
                        },
                        {
                          display: {
                            key: "Memory",
                            value: node?.allocatable_memory,
                          },
                        },
                        {
                          display: {
                            key: "Arch",
                            value: node?.architecture,
                          },
                        },
                        {
                          display: {
                            key: "OS",
                            value: node?.os_image,
                          },
                        },
                        {
                          display: {
                            key: "Kubelet Version",
                            value: node?.kubelet_version,
                          },
                        },
                        {
                          display: {
                            key: "Container runtime",
                            value: node?.container_runtime_version,
                          },
                        },
                      ],
                    },
                  };
                }),
              },
            },
          ],
        },
      },
    };
  }
  
  // function makeTitle(rawdata, res) {
  //   c
  //   var title = [];
  //   if (res.Labels !== "") {
  //     if (res.URL) {
  //       // http results
  //       // title.push(res.Labels + ' - ' + res.URL + ' - ' + formatDate(res.StartTime))
  //       // title.push(res.URL + ' - ' + formatDate(res.StartTime))
  //       console.log("hellooo",res.Labels);
        
  //       var labels = res.Labels.split(" -_- ");
  //       // title.push(`Labels: ${labels.map(item => item + '\n')}`)
  //       title.push(`Title: ${rawdata ? rawdata.name : labels[0]}`);
  //       title.push(`URL: ${labels[1]}`);
  //       title.push(`Start Time: ${formatDate(res.StartTime)}`);
  //     } else {
  //       // grpc results
  //       title.push(`Destination: ${res.Destination}`);
  //       title.push(`Start Time: ${formatDate(res.StartTime)}`);
  //     }
  //   }
  //   title.push(`Minimum: ${myRound(1000.0 * res.DurationHistogram.Min, 3)} ms`);
  //   title.push(`Average: ${myRound(1000.0 * res.DurationHistogram.Avg, 3)} ms`);
  //   title.push(`Maximum: ${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms`);
  //   var percStr = `Minimum: ${myRound(
  //     1000.0 * res.DurationHistogram.Min,
  //     3
  //   )} ms \nAverage: ${myRound(
  //     1000.0 * res.DurationHistogram.Avg,
  //     3
  //   )} ms \nMaximum: ${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms\n`;
  //   var percStr_2 = "Percentiles: ";
  //   if (res.DurationHistogram.Percentiles) {
  //     for (var i = 0; i < res.DurationHistogram.Percentiles.length; i++) {
  //       var p = res.DurationHistogram.Percentiles[i];
  //       percStr_2 += `<strong>p${p.Percentile}</strong>: ${myRound(1000 * p.Value, 2)} ms; `;
  //       percStr += `<strong>p${p.Percentile}</strong>: ${myRound(1000 * p.Value, 2)} ms; `;
  //     }
  //     percStr = percStr.slice(0, -2);
  //   }
  //   var statusOk =
  //     typeof res.RetCodes !== "undefined" && res.RetCodes !== null
  //       ? res.RetCodes[200]
  //       : 0;
  //   if (!statusOk) {
  //     // grpc results
  //     statusOk =
  //       typeof res.RetCodes !== "undefined" && res.RetCodes !== null
  //         ? res.RetCodes.SERVING
  //         : 0;
  //   }
  //   var total = res.DurationHistogram.Count;
  //   var errStr = "No Error";
  //   if (statusOk !== total) {
  //     if (statusOk) {
  //       errStr = myRound((100.0 * (total - statusOk)) / total, 2) + "% errors";
  //     } else {
  //       errStr = "100% errors!";
  //     }
  //   }
  //   title.push(
  //     `Target QPS: ${res.RequestedQPS} ( Actual QPS: ${myRound(
  //       res.ActualQPS,
  //       1
  //     )} )`
  //   );
  //   title.push(`No of Connections: ${res.NumThreads}`);
  //   title.push(
  //     `Requested Duration: ${res.RequestedDuration} ( Actual Duration: ${myRound(
  //       res.ActualDuration / 1e9,
  //       1
  //     )} )`
  //   );
  //   title.push(`Errors: ${errStr}`);
  //   title.push(percStr_2);
  //   if (res.kubernetes) {
  //     title.push(`Kubernetes server version: ${res.kubernetes.server_version}`);
  //     title.push("Nodes:");
  //     res.kubernetes?.nodes?.forEach((node, ind) => {
  //       title.push(`Node ${ind + 1} - \nHostname: ${node.hostname} \nCPU: ${
  //         node.allocatable_cpu
  //       } \nMemory: ${node.allocatable_memory} \nArch: ${
  //         node.architecture
  //       } \nOS: ${node.os_image}
  //                     \nKubelet version: ${
  //                       node.kubelet_version
  //                     } \nContainer runtime: ${node.container_runtime_version}`);
  //     });
  //   }
  //   return title;
  // }
  
  function fortioResultToJsChartData(rawdata, res) {
    var dataP = [
      {
        x: 0.0,
        y: 0.0,
      },
    ];
    var len = res.DurationHistogram.Data.length;
    var prevX = 0.0;
    var prevY = 0.0;
    for (var i = 0; i < len; i++) {
      var it = res.DurationHistogram.Data[i];
      var x = myRound(1000.0 * it.Start);
      if (i === 0) {
        // Extra point, 1/N at min itself
        dataP.push({
          x: x,
          // y: myRound(100.0 / res.DurationHistogram.Count, 3)
          y: myRound(100.0 / res.DurationHistogram.Count, 2),
        });
      } else {
        if (prevX !== x) {
          dataP.push({
            x: x,
            y: prevY,
          });
        }
      }
      x = myRound(1000.0 * it.End);
      // var y = myRound(it.Percent, 3)
      var y = myRound(it.Percent, 2);
      dataP.push({
        x: x,
        y: y,
      });
      prevX = x;
      prevY = y;
    }
    var dataH = [];
    var prev = 1000.0 * res.DurationHistogram.Data[0].Start;
    for (i = 0; i < len; i++) {
      it = res.DurationHistogram.Data[i];
      var startX = 1000.0 * it.Start;
      var endX = 1000.0 * it.End;
      if (startX !== prev) {
        dataH.push(
          {
            x: myRound(prev),
            y: 0,
          },
          {
            x: myRound(startX),
            y: 0,
          }
        );
      }
      dataH.push(
        {
          x: myRound(startX),
          y: it.Count,
        },
        {
          x: myRound(endX),
          y: it.Count,
        }
      );
      prev = endX;
    }
    return {
      title: makeTitle(rawdata, res),
      metadata: getMetadata(rawdata, res),
      dataP: dataP,
      dataH: dataH,
      percentiles: res.DurationHistogram.Percentiles,
    };
  }
  
  function makeChart(data) {
    return {
      percentiles: data.percentiles,
      data: {
        datasets: [
          {
            label: "Cumulative %",
            data: data.dataP,
            fill: false,
            yAxisID: "P",
            stepped: true,
            backgroundColor: "rgba(134, 87, 167, 1)",
            borderColor: "rgba(134, 87, 167, 1)",
            cubicInterpolationMode: "monotone",
          },
          {
            label: "Histogram: Count",
            data: data.dataH,
            yAxisID: "H",
            pointStyle: "rect",
            radius: 1,
            borderColor: "rgba(87, 167, 134, .9)",
            backgroundColor: "rgba(87, 167, 134, .75)",
            lineTension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        metadata: data?.metadata,
        title: {
          display: true,
          fontStyle: "normal",
          text: data.title,
        },
        scales: {
          xAxes: [Axes.x],
          yAxes: [
            {
              id: "P",
              position: "right",
              ticks: {
                beginAtZero: true,
                max: 100,
              },
              scaleLabel: {
                display: true,
                labelString: "%",
              },
            },
            Axes.y,
          ],
        },
      },
    };
  }
  
  let singleChart = (rawdata, data) => {
    if (typeof data === "undefined" || typeof data.StartTime === "undefined") {
      return {};
    }
  
    return makeChart(fortioResultToJsChartData(rawdata, data));
  };
  
  
  
  function processChartData(chartData) {
    if (chartData && chartData.data && chartData.options) {
      const xAxes = [];
      const yAxes = [];
      const colors = {};
      const types = {};
      const axes = {};
      const axis = {};
      const yAxisTracker = {};
      const xAxisTracker = {};
  
      if (chartData.data && chartData.data.datasets) {
        chartData.data.datasets.forEach((ds, ind) => {
          // xAxis.push('x');
          const yAxis = [ds.label];
          const xAxis = [`x${ind + 1}`];
  
          xAxisTracker[ds.label] = `x${ind + 1}`;
          yAxisTracker[ds.yAxisID] = `y${ind > 0 ? ind + 1 : ""}`;
          axes[ds.label] = `y${ind > 0 ? ind + 1 : ""}`;
  
          ds.data.forEach((d) => {
            // if(ind === 0){
            xAxis.push(d.x);
            // }
            yAxis.push(d.y);
          });
          yAxes.push(yAxis);
          xAxes.push(xAxis);
          if (ds.cubicInterpolationMode) {
            // types[ds.label] = "line";
          } else {
            types[ds.label] = "area-step";
          }
          colors[ds.label] = ds.borderColor; // not sure which is better border or background
        });
      }
  
      if (chartData.options.scales.xAxes) {
        chartData.options.scales.xAxes.forEach((ya) => {
          axis.x = {
            show: true,
            label: {
              text: ya.scaleLabel.labelString,
              position: "outer-middle",
            },
          };
        });
      }
      if (chartData.options.scales.yAxes) {
        chartData.options.scales.yAxes.forEach((ya) => {
          axis[yAxisTracker[ya.id]] = {
            show: true,
            label: {
              text: ya.scaleLabel.labelString,
              position: "outer-middle",
            },
          };
        });
      }
  
      const grid = {};
  
      if (chartData.percentiles && chartData.percentiles.length > 0) {
        // position: "middle"
        // position: "start"
        let reTrack = 0;
        const percentiles = chartData.percentiles.map(({ Percentile, Value }) => {
          const re = {
            value: (Value * 1000).toFixed(2),
            text: `p${Percentile}`,
          };
          switch (reTrack % 3) {
            case 0:
              // re.position
              break;
            case 1:
              re.position = "middle";
              break;
            case 2:
              re.position = "start";
              break;
          }
  
          reTrack++;
  
          return re;
        });
  
        grid.x = { lines: percentiles };
      }
      console.log(xAxisTracker);
  
      const chartColumn = [];
  
      xAxes.forEach((xAxe) => {
        chartColumn.push(xAxe);
      });
      yAxes.forEach((yAxe) => {
        chartColumn.push(yAxe);
      });
  
      const chartConfig = {
        // oninit: function(args){
        //   console.log(JSON.stringify(args));
        // },
        // title: {
        //   text: chartData.options.title.text.join('\n'),
        // },
        bindto: "#chart-id",
        type: "line",
        data: {
          // x: 'x',
          xs: xAxisTracker,
          // xFormat: self.bbTimeFormat,
          columns: chartColumn,
          colors: { colors, "Cumulative %": "rgb(71,126,150)" },
          axes,
          types,
          // groups,
          // type: 'area',
        },
        axis,
  
        grid,
        legend: { show: true },
        point: {
          r: 0,
          focus: { expand: { r: 5 } },
        },
        tooltip: { show: true },
      };
      // if (!hideTitle) {
      //   if (data.length == 4) {
      //    titleRef.innerText = chartData.options.title.text.slice(0,2).join('\n') +"\n"+ chartData.options.title.text[2].split('\n')[0];
      //     if (chartData.options.title.text[2])self.percentileRef.innerText=chartData.options.title.text[2].split('\n')[1].split('|').join('\n')
      //   } else {
      //    titleRef.innerText=chartData.options.title.text.join('\n')
      //   }
      // }
  
      chart = bb.generate(chartConfig);
    } else {
      chart = bb.generate({
        type: "line",
        data: { columns: [] },
        bindto: "#chart-id",
      });
    }
  }
  
  function fillTittle(rawdata,tmpData) {
    const titleContainer = document.getElementById("titles");
    const titles = makeTitle(rawdata, tmpData);
    titleContainer.innerHTML = `<div id="titles-holder" class="container"></div>`;
    const innerTitle = document.getElementById("titles-holder");
    innerTitle.innerHTML = "";
    let titleCount = 0;
    for (let i = 0; i < 3; i++) {
      innerTitle.innerHTML += `<div id = "row${i}" class="row"> </div>`;
      const row = document.getElementById(`row${i}`);
      row.innerHTML = " ";
      for (let j = 0; j < 3; j++) {
        row.innerHTML += `<div class="col-sm">
       ${titles[titleCount]}
      </div>`;
        titleCount = titleCount + 1;
      }
    }
  }
  
  function renderSelectedChart() {
  
    let URL = window.location.hash.substring(1)
    let profileId = URL.slice(0,36)
    let index = parseInt(URL.slice(37))
    let testSpecButton = document.getElementById("test-spec")
  
  
    let cardTitle = document.getElementById("card-title")
  
    fetch(`https://meshery.layer5.io/api/performance/smp/profiles/${profileId}/results`, { 
      method: "GET"
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
  
      cardTitle.innerHTML = data.results[index].name
      let res = data.results[index];
      
      let rawdata = res;
      let datas = res.runner_results;
    
      let tmpData =
        typeof datas !== "undefined" ? datas : {};
      
      let chartData = singleChart(rawdata, tmpData);
      processChartData(chartData);
  
    })
  }
  
  function tableRowCreator(machineSpec, title) {
      function getTableRows() {
        return Object.keys(machineSpec).map((key) => `<tr>
      <th scope="row">${formattedName(key)}</th>
      <td>${machineSpec[key]}</td>
    </tr>`).join("")
      }
    
      return `<table class="table">
    <thead class="thead-light h5 rounded-top">
      <tr>
        <th scope="col">${title}</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      ${getTableRows(machineSpec)}
    </tbody>
    </table>`
    }
    
    // function hideOtherTab(id) {
    //   const alternate = alternateClassMap(id);
    //   document.getElementById(alternate).classList.remove("show");
    // }
window.addEventListener('load',function(){
    processTestSpecificationClick("env2")
},false)

    function renderInfraDetails(appendToId) {
      let URL = window.location.hash.substring(1)
      let profileId = URL.slice(0,36)
      let index = parseInt(URL.slice(37))
  
    fetch(`https://meshery.layer5.io/api/performance/smp/profiles/${profileId}/results`, { 
      method: "GET"
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      let res = data.results[index];
      let datas = res.runner_results;
    
      
      document.getElementById(appendToId).innerHTML = tableRowCreator(datas.kubernetes.nodes[0], "Environment Details");
  
      // hideOtherTab(appendToId);
    })
  }
    
  function processTestSpecificationClick(appendToId) {
      let URL = window.location.hash.substring(1)
      let profileId = URL.slice(0,36)
      let index = parseInt(URL.slice(37))
  
    fetch(`https://meshery.layer5.io/api/performance/smp/profiles/${profileId}/results`, { 
      method: "GET"
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      let res = data.results[index];
      
      let rawdata = res;
      let datas = res.runner_results;
    
      let tmpData =
        typeof datas !== "undefined" ? datas : {};
      
      const chartData = makeTitle(rawdata,tmpData)
      console.log(chartData)
      renderTestSpecs(chartData, appendToId)
    })
  
  }
  
    
   function renderTestSpecs(titleString, appendToId) {
      function changeStringToObj(strArr) {
        const obj = {};
        strArr.forEach(str => {
          const [key, value] = str.split("=").map(word => word.trim())
          obj[key] = value;
        })

        return obj;
      }
      
      document.getElementById(appendToId).innerHTML = tableRowCreator(changeStringToObj(titleString), "Test Specifications");
      // hideOtherTab(appendToId);
    }
  
  
  
  function makeTitle(rawdata, res) {
    var title = [];
    if (res.Labels !== "") {
      if (res.URL) {
        // http results
        // title.push(res.Labels + ' - ' + res.URL + ' - ' + formatDate(res.StartTime))
        // title.push(res.URL + ' - ' + formatDate(res.StartTime))
        var labels = res.Labels.split(" -_- ");
        // title.push(`Labels: ${labels.map(item => item + '\n')}`)
        title.push(`Title= ${rawdata ? rawdata.name : labels[0]}`);
        title.push(`URL= ${labels[1]}`);
        title.push(`Start Time= ${formatDate(res.StartTime)}`);
      } else {
        // grpc results
        title.push(`Destination= ${res.Destination}`);
        title.push(`Start Time= ${formatDate(res.StartTime)}`);
      }
    }
    title.push(`Minimum= ${myRound(1000.0 * res.DurationHistogram.Min, 3)} ms`);
    title.push(`Average= ${myRound(1000.0 * res.DurationHistogram.Avg, 3)} ms`);
    title.push(`Maximum= ${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms`);
    var percStr = `Minimum= ${myRound(
      1000.0 * res.DurationHistogram.Min,
      3
    )} ms \nAverage= ${myRound(
      1000.0 * res.DurationHistogram.Avg,
      3
    )} ms \nMaximum= ${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms\n`;
    var percStr_2 = "Percentiles= ";
    if (res.DurationHistogram.Percentiles) {
      for (var i = 0; i < res.DurationHistogram.Percentiles.length; i++) {
        var p = res.DurationHistogram.Percentiles[i];
        percStr_2 += `<strong>p${p.Percentile}:</strong> &nbsp;  ${myRound(1000 * p.Value, 2)} ms;<br> `;
        percStr += `p${p.Percentile}: ${myRound(1000 * p.Value, 2)} ms; `;
      }
      percStr = percStr.slice(0, -2);
    }
    var statusOk =
      typeof res.RetCodes !== "undefined" && res.RetCodes !== null
        ? res.RetCodes[200]
        : 0;
    if (!statusOk) {
      // grpc results
      statusOk =
        typeof res.RetCodes !== "undefined" && res.RetCodes !== null
          ? res.RetCodes.SERVING
          : 0;
    }
    var total = res.DurationHistogram.Count;
    var errStr = "No Error";
    if (statusOk !== total) {
      if (statusOk) {
        errStr = myRound((100.0 * (total - statusOk)) / total, 2) + "% errors";
      } else {
        errStr = "100% errors!";
      }
    }
    title.push(
      `Target QPS= ${res.RequestedQPS} ( Actual QPS: ${myRound(
        res.ActualQPS,
        1
      )} )`
    );
    title.push(`No of Connections= ${res.NumThreads}`);
    title.push(
      `Requested Duration= ${res.RequestedDuration} ( Actual Duration= ${myRound(
        res.ActualDuration / 1e9,
        1
      )} )`
    );
    title.push(`Errors= ${errStr}`);
    title.push(percStr_2);
    if (res.kubernetes) {
      title.push(`Kubernetes server version= ${res.kubernetes.server_version}`);
      
      // let nodes;
      // res.kubernetes?.nodes?.forEach((node, ind) => {
      //   nodes=`Node ${ind + 1} - \nHostname: ${node.hostname} \nCPU: ${node.allocatable_cpu
      //     } \nMemory: ${node.allocatable_memory} \nArch: ${node.architecture
      //     } \nOS: ${node.os_image}
      //                 \nKubelet version: ${node.kubelet_version
      //     } \nContainer runtime: ${node.container_runtime_version}`;
      // });
      // title.push(`Nodes= ${nodes}`);
    }
    return title;
  }
  
  
  
  function alternateClassMap(clss) {
    clss = clss.replace("env", "card");
    if(clss.endsWith("2")) {
      return clss.substring(0, clss.length - 1);
    }
  
    return clss+"2";
  }
  
  
  function formattedName(name) {
    return name.split("_").map(word => word[0].toUpperCase() + word.substring(1)).join(" ")
  }