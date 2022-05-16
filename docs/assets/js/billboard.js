function renderSelectedChart(e, id) {
  const chartData = getChartData(e);
  processChartData(chartData, "#" + id);
}

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

function makeTitle(rawdata, res) {
  var title = [];
  if (res.Labels !== "") {
    if (res.URL) {
      // http results
      // title.push(res.Labels + ' - ' + res.URL + ' - ' + formatDate(res.StartTime))
      // title.push(res.URL + ' - ' + formatDate(res.StartTime))
      var labels = res.Labels.split(" -_- ");
      // title.push(`Labels: ${labels.map(item => item + '\n')}`)
      title.push(`Title: ${rawdata ? rawdata.name : labels[0]}`);
      title.push(`URL: ${labels[1]}`);
      title.push(`Start Time: ${formatDate(res.StartTime)}`);
    } else {
      // grpc results
      title.push(`Destination: ${res.Destination}`);
      title.push(`Start Time: ${formatDate(res.StartTime)}`);
    }
  }
  title.push(`Minimum: ${myRound(1000.0 * res.DurationHistogram.Min, 3)} ms`);
  title.push(`Average: ${myRound(1000.0 * res.DurationHistogram.Avg, 3)} ms`);
  title.push(`Maximum: ${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms`);
  var percStr = `Minimum: ${myRound(
    1000.0 * res.DurationHistogram.Min,
    3
  )} ms \nAverage: ${myRound(
    1000.0 * res.DurationHistogram.Avg,
    3
  )} ms \nMaximum: ${myRound(1000.0 * res.DurationHistogram.Max, 3)} ms\n`;
  var percStr_2 = "Percentiles: ";
  if (res.DurationHistogram.Percentiles) {
    for (var i = 0; i < res.DurationHistogram.Percentiles.length; i++) {
      var p = res.DurationHistogram.Percentiles[i];
      percStr_2 += `p${p.Percentile}: ${myRound(1000 * p.Value, 2)} ms; `;
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
    `Target QPS: ${res.RequestedQPS} ( Actual QPS: ${myRound(
      res.ActualQPS,
      1
    )} )`
  );
  title.push(`No of Connections: ${res.NumThreads}`);
  title.push(
    `Requested Duration: ${res.RequestedDuration} ( Actual Duration: ${myRound(
      res.ActualDuration / 1e9,
      1
    )} )`
  );
  title.push(`Errors: ${errStr}`);
  title.push(percStr_2);
  if (res.kubernetes) {
    title.push(`Kubernetes server version: ${res.kubernetes.server_version}`);
    title.push("Nodes:");
    res.kubernetes?.nodes?.forEach((node, ind) => {
      title.push(`Node ${ind + 1} - \nHostname: ${node.hostname} \nCPU: ${node.allocatable_cpu
        } \nMemory: ${node.allocatable_memory} \nArch: ${node.architecture
        } \nOS: ${node.os_image}
                    \nKubelet version: ${node.kubelet_version
        } \nContainer runtime: ${node.container_runtime_version}`);
    });
  }
  return title;
}

let result = {
  meshery_id: "f9ccd668-9d26-4f70-8a51-47de5af3c502",
  name: "No mesh_1650983199033",
  mesh: null,
  performance_profile: "30c9382b-636f-4117-8205-10bac2d77944",
  test_id: null,
  server_metrics: null,
  test_start_time: "2022-04-26T19:56:40.358118Z",
  created_at: "2022-04-26T14:27:12.84392Z",
  user_id: "c0228da7-2415-4626-9ea5-19f97147767b",
  updated_at: "2022-04-26T14:27:12.84393Z",
  runner_results: [
    {
      AbortOn: 0,
      AccessLoggerInfo: "",
      ActualDuration: 30187978458,
      ActualQPS: 2.5838099794764338,
      DurationHistogram: {
        Avg: 0.3866328985641026,
        Count: 78,
        Data: [
          {
            Count: 5,
            End: 0.35000000000000003,
            Percent: 6.410256410256411,
            Start: 0.3349775,
          },
          {
            Count: 51,
            End: 0.4,
            Percent: 71.7948717948718,
            Start: 0.35000000000000003,
          },
          { Count: 19, End: 0.45, Percent: 96.15384615384616, Start: 0.4 },
          { Count: 2, End: 0.5, Percent: 98.71794871794872, Start: 0.45 },
          { Count: 1, End: 0.509868292, Percent: 100, Start: 0.5 },
        ],
        Max: 0.509868292,
        Min: 0.3349775,
        Percentiles: [
          { Percentile: 50, Value: 0.38333333333333336 },
          { Percentile: 75, Value: 0.4065789473684211 },
          { Percentile: 90, Value: 0.4373684210526316 },
          { Percentile: 99, Value: 0.50217102424 },
          { Percentile: 99.9, Value: 0.509098565224 },
        ],
        StdDev: 0.031457000667904265,
        Sum: 30.157366088000003,
      },
      Exactly: 0,
      HeaderSizes: {
        Avg: 0,
        Count: 78,
        Data: [{ Count: 78, End: 0, Percent: 100, Start: 0 }],
        Max: 0,
        Min: 0,
        Percentiles: null,
        StdDev: 0,
        Sum: 0,
      },
      Jitter: false,
      Labels: "No mesh_1650983199033 -_- https://www.facebook.com",
      NumThreads: 1,
      RequestedDuration: "30s",
      RequestedQPS: "max",
      RetCodes: { 200: 78 },
      RunID: 0,
      RunType: "HTTP",
      Sizes: {
        Avg: 88505.5,
        Count: 78,
        Data: [{ Count: 78, End: 88666, Percent: 100, Start: 88363 }],
        Max: 88666,
        Min: 88363,
        Percentiles: null,
        StdDev: 137.89309776147758,
        Sum: 6903429,
      },
      SocketCount: 0,
      StartTime: "2022-04-26T19:56:40.358118+05:30",
      URL: "https://www.facebook.com",
      Uniform: false,
      Version: "dev",
      kubernetes: {
        nodes: [
          {
            allocatable_cpu: "4",
            allocatable_memory: "3925304Ki",
            architecture: "arm64",
            capacity_cpu: "4",
            capacity_memory: "4027704Ki",
            container_runtime_version: "docker://20.10.14",
            hostname: "docker-desktop",
            internal_ip: "192.168.65.4",
            kubelet_version: "v1.22.4",
            kubeproxy_version: "v1.22.4",
            operating_system: "linux",
            os_image: "Docker Desktop",
          },
        ],
        server_version: "v1.22.5",
      },
      "load-generator": "fortio",
    },
  ],
};

let rawdata = result;
let data = result.runner_results;

let tmpData =
  typeof data !== "undefined" ? (data.length == 1 ? data[0] : {}) : {};

// let chartData = singleChart(rawdata, tmpData);

function processChartData(chartData, eleId) {
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

    const chartColumn = [];

    xAxes.forEach((xAxe) => {
      chartColumn.push(xAxe);
    });
    yAxes.forEach((yAxe) => {
      chartColumn.push(yAxe);
    });
    // chartColumn.push(["data1", 30, 200, 100, 400, 150, 250])
    
    // for debugging only
    // const chartCol = [
    //   ["x1", 0, 334.98, 350, 400, 450, 500, 509.87],
    //   ["x2", 334.98, 350, 350, 400, 400, 450, 450, 500, 500, 509.87],
    //   ["Cumulative %", 0, 1.28, 6.41, 71.79, 96.15, 98.72, 100],
    //   ["Cumulat", 0, 6.28, 14.41, 67.79, 84.15, 89.72, 98],
    //   ["Histogram: Count", 5, 5, 51, 51, 19, 19, 2, 2, 1, 1],
    // ];

    // const xAxisTracker1 = {
    //   "Cumulative %": "x1",
    //   "Histogram: Count": "x2",
    //   "Cumulat": "x1"
    // }

    // const types1 = {
    //   "Histogram: Count": "area-step",
    // }

    // const axes1 = {
    //   "Cumulative %": "y",
    //   "Histogram: Count": "y2"
    // }


    const chartConfig = {
      // oninit: function(args){
      //   console.log(JSON.stringify(args));
      // },
      // title: {
      //   text: chartData.options.title.text.join('\n'),
      // },
      bindto: eleId,
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
      bindto: "#chart",
    });
  }
}

const newData = '{"percentiles":[{"Percentile":50,"Value":0.025826149425287357},{"Percentile":75,"Value":0.02928520114942529},{"Percentile":90,"Value":0.06431967213114755},{"Percentile":99,"Value":0.07595585905333334},{"Percentile":99.9,"Value":0.07892761670533335}],"data":{"datasets":[{"label":"Cumulative %","data":[{"x":0,"y":0},{"x":12.34,"y":0.1},{"x":14,"y":0.31},{"x":16,"y":1.45},{"x":18,"y":3.01},{"x":20,"y":7.89},{"x":25,"y":44.03},{"x":30,"y":80.17},{"x":35,"y":83.7},{"x":40,"y":84.01},{"x":45,"y":84.32},{"x":50,"y":84.32},{"x":60,"y":84.53},{"x":70,"y":97.2},{"x":79.26,"y":100}],"fill":false,"yAxisID":"P","stepped":true,"backgroundColor":"rgba(134, 87, 167, 1)","borderColor":"rgba(134, 87, 167, 1)","cubicInterpolationMode":"monotone"},{"label":"Histogram: Count","data":[{"x":12.34,"y":3},{"x":14,"y":3},{"x":14,"y":11},{"x":16,"y":11},{"x":16,"y":15},{"x":18,"y":15},{"x":18,"y":47},{"x":20,"y":47},{"x":20,"y":348},{"x":25,"y":348},{"x":25,"y":348},{"x":30,"y":348},{"x":30,"y":34},{"x":35,"y":34},{"x":35,"y":3},{"x":40,"y":3},{"x":40,"y":3},{"x":45,"y":3},{"x":45,"y":0},{"x":50,"y":0},{"x":50,"y":2},{"x":60,"y":2},{"x":60,"y":122},{"x":70,"y":122},{"x":70,"y":27},{"x":79.26,"y":27}],"yAxisID":"H","pointStyle":"rect","radius":1,"borderColor":"rgba(87, 167, 134, .9)","backgroundColor":"rgba(87, 167, 134, .75)","lineTension":0}]},"options":{"responsive":true,"maintainAspectRatio":false,"metadata":{"title":{"display":{"key":"Title","value":"istio_1649732054757"}},"url":{"display":{"key":"URL","value":"http://10.107.13.36:9080/productpage"}},"startTime":{"display":{"key":"Start Time","value":"2022-04-12 08:26:08"}},"minimum":{"display":{"key":"Minimum","value":"12.336 ms"}},"average":{"display":{"key":"Average","value":"31.116 ms"}},"maximum":{"display":{"key":"Maximum","value":"79.258 ms"}},"qps":{"display":{"key":"QPS","value":"Achieved 32.1 (Requested 100)"}},"numberOfConnections":{"display":{"key":"Number Of Connections","value":1}},"duration":{"display":{"key":"Duration","value":"Achieved 30 (Requested 30s)"}},"errors":{"display":{"key":"Errors","value":"No Errors"}},"percentiles":{"display":{"key":"Percentiles","value":[{"display":{"key":"p50","value":"25.83 ms"}},{"display":{"key":"p75","value":"29.29 ms"}},{"display":{"key":"p90","value":"64.32 ms"}},{"display":{"key":"p99","value":"75.96 ms"}},{"display":{"key":"p99.9","value":"78.93 ms"}}]}},"kubernetes":{"display":{"hide":false,"key":"Kuberenetes","value":[{"display":{"key":"Server Version","value":"v1.18.9"}},{"display":{"key":"Nodes","value":[{"display":{"key":"Node 1","value":[{"display":{"key":"Hostname","value":"k8s-master"}},{"display":{"key":"CPU","value":"4"}},{"display":{"key":"Memory","value":"8050396Ki"}},{"display":{"key":"Arch","value":"amd64"}},{"display":{"key":"OS","value":"Ubuntu 18.04.3 LTS"}},{"display":{"key":"Kubelet Version","value":"v1.18.9"}},{"display":{"key":"Container runtime","value":"docker://20.10.7"}}]}},{"display":{"key":"Node 2","value":[{"display":{"key":"Hostname","value":"k8s-node1"}},{"display":{"key":"CPU","value":"4"}},{"display":{"key":"Memory","value":"8042160Ki"}},{"display":{"key":"Arch","value":"amd64"}},{"display":{"key":"OS","value":"Ubuntu 18.04.6 LTS"}},{"display":{"key":"Kubelet Version","value":"v1.20.5"}},{"display":{"key":"Container runtime","value":"docker://20.10.7"}}]}},{"display":{"key":"Node 3","value":[{"display":{"key":"Hostname","value":"k8s-node2-65"}},{"display":{"key":"CPU","value":"4"}},{"display":{"key":"Memory","value":"8042160Ki"}},{"display":{"key":"Arch","value":"amd64"}},{"display":{"key":"OS","value":"Ubuntu 18.04.3 LTS"}},{"display":{"key":"Kubelet Version","value":"v1.18.9"}},{"display":{"key":"Container runtime","value":"docker://20.10.7"}}]}}]}}]}}},"title":{"display":true,"fontStyle":"normal","text":["Title: istio_1649732054757","URL: http://10.107.13.36:9080/productpage","Start Time: 2022-04-12 08:26:08","Minimum: 12.336 ms","Average: 31.116 ms","Maximum: 79.258 ms","Target QPS: 100 ( Actual QPS: 32.1 )","No of Connections: 1","Requested Duration: 30s ( Actual Duration: 30 )","Errors: No Error","Percentiles: p50: 25.83 ms; p75: 29.29 ms; p90: 64.32 ms; p99: 75.96 ms; p99.9: 78.93 ms; ","Kubernetes server version: v1.18.9","Nodes:","Node 1 - \\nHostname: k8s-master \\nCPU: 4 \\nMemory: 8050396Ki \\nArch: amd64 \\nOS: Ubuntu 18.04.3 LTS\\n                    \\nKubelet version: v1.18.9 \\nContainer runtime: docker://20.10.7","Node 2 - \\nHostname: k8s-node1 \\nCPU: 4 \\nMemory: 8042160Ki \\nArch: amd64 \\nOS: Ubuntu 18.04.6 LTS\\n                    \\nKubelet version: v1.20.5 \\nContainer runtime: docker://20.10.7","Node 3 - \\nHostname: k8s-node2-65 \\nCPU: 4 \\nMemory: 8042160Ki \\nArch: amd64 \\nOS: Ubuntu 18.04.3 LTS\\n                    \\nKubelet version: v1.18.9 \\nContainer runtime: docker://20.10.7"]},"scales":{"xAxes":[{"type":"linear","scaleLabel":{"display":true,"labelString":"Response time in ms","ticks":{"min":0,"beginAtZero":true}}}],"yAxes":[{"id":"P","position":"right","ticks":{"beginAtZero":true,"max":100},"scaleLabel":{"display":true,"labelString":"%"}},{"id":"H","type":"linear","ticks":{"beginAtZero":true},"scaleLabel":{"display":true,"labelString":"Count"}}]}}}'
const istioChartData = "{\"percentiles\":[{\"Percentile\":50,\"Value\":0.11399999999999999},{\"Percentile\":75,\"Value\":0.1264864864864865},{\"Percentile\":90,\"Value\":0.23333333333333342},{\"Percentile\":99,\"Value\":0.3725535154571429},{\"Percentile\":99.9,\"Value\":0.38314386184571436}],\"data\":{\"datasets\":[{\"label\":\"Cumulative %\",\"data\":[{\"x\":0,\"y\":0},{\"x\":70.99,\"y\":0.42},{\"x\":80,\"y\":0.83},{\"x\":90,\"y\":1.25},{\"x\":100,\"y\":3.33},{\"x\":120,\"y\":70},{\"x\":140,\"y\":85.42},{\"x\":160,\"y\":86.67},{\"x\":180,\"y\":87.5},{\"x\":200,\"y\":88.33},{\"x\":250,\"y\":90.83},{\"x\":300,\"y\":92.5},{\"x\":350,\"y\":97.08},{\"x\":384.32,\"y\":100}],\"fill\":false,\"yAxisID\":\"P\",\"stepped\":true,\"backgroundColor\":\"rgba(134, 87, 167, 1)\",\"borderColor\":\"rgba(134, 87, 167, 1)\",\"cubicInterpolationMode\":\"monotone\"},{\"label\":\"Histogram: Count\",\"data\":[{\"x\":70.99,\"y\":2},{\"x\":80,\"y\":2},{\"x\":80,\"y\":1},{\"x\":90,\"y\":1},{\"x\":90,\"y\":5},{\"x\":100,\"y\":5},{\"x\":100,\"y\":160},{\"x\":120,\"y\":160},{\"x\":120,\"y\":37},{\"x\":140,\"y\":37},{\"x\":140,\"y\":3},{\"x\":160,\"y\":3},{\"x\":160,\"y\":2},{\"x\":180,\"y\":2},{\"x\":180,\"y\":2},{\"x\":200,\"y\":2},{\"x\":200,\"y\":6},{\"x\":250,\"y\":6},{\"x\":250,\"y\":4},{\"x\":300,\"y\":4},{\"x\":300,\"y\":11},{\"x\":350,\"y\":11},{\"x\":350,\"y\":7},{\"x\":384.32,\"y\":7}],\"yAxisID\":\"H\",\"pointStyle\":\"rect\",\"radius\":1,\"borderColor\":\"rgba(87, 167, 134, .9)\",\"backgroundColor\":\"rgba(87, 167, 134, .75)\",\"lineTension\":0}]},\"options\":{\"responsive\":true,\"maintainAspectRatio\":false,\"metadata\":{\"title\":{\"display\":{\"key\":\"Title\",\"value\":\"istio_1650568590330\"}},\"url\":{\"display\":{\"key\":\"URL\",\"value\":\"https://layer5.io\"}},\"startTime\":{\"display\":{\"key\":\"Start Time\",\"value\":\"2022-04-22 00:46:31\"}},\"minimum\":{\"display\":{\"key\":\"Minimum\",\"value\":\"70.989 ms\"}},\"average\":{\"display\":{\"key\":\"Average\",\"value\":\"138.927 ms\"}},\"maximum\":{\"display\":{\"key\":\"Maximum\",\"value\":\"384.321 ms\"}},\"qps\":{\"display\":{\"key\":\"QPS\",\"value\":\"Achieved 4 (Requested 4)\"}},\"numberOfConnections\":{\"display\":{\"key\":\"Number Of Connections\",\"value\":2}},\"duration\":{\"display\":{\"key\":\"Duration\",\"value\":\"Achieved 60.1 (Requested 1m0s)\"}},\"errors\":{\"display\":{\"key\":\"Errors\",\"value\":\"No Errors\"}},\"percentiles\":{\"display\":{\"key\":\"Percentiles\",\"value\":[{\"display\":{\"key\":\"p50\",\"value\":\"114 ms\"}},{\"display\":{\"key\":\"p75\",\"value\":\"126.49 ms\"}},{\"display\":{\"key\":\"p90\",\"value\":\"233.33 ms\"}},{\"display\":{\"key\":\"p99\",\"value\":\"372.55 ms\"}},{\"display\":{\"key\":\"p99.9\",\"value\":\"383.14 ms\"}}]}},\"kubernetes\":{\"display\":{\"hide\":false,\"key\":\"Kuberenetes\",\"value\":[{\"display\":{\"key\":\"Server Version\",\"value\":\"v1.22.5\"}},{\"display\":{\"key\":\"Nodes\",\"value\":[{\"display\":{\"key\":\"Node 1\",\"value\":[{\"display\":{\"key\":\"Hostname\",\"value\":\"docker-desktop\"}},{\"display\":{\"key\":\"CPU\",\"value\":\"4\"}},{\"display\":{\"key\":\"Memory\",\"value\":\"20398384Ki\"}},{\"display\":{\"key\":\"Arch\",\"value\":\"amd64\"}},{\"display\":{\"key\":\"OS\",\"value\":\"Docker Desktop\"}},{\"display\":{\"key\":\"Kubelet Version\",\"value\":\"v1.22.5\"}},{\"display\":{\"key\":\"Container runtime\",\"value\":\"docker://20.10.14\"}}]}}]}}]}}},\"title\":{\"display\":true,\"fontStyle\":\"normal\",\"text\":[\"Title: istio_1650568590330\",\"URL: https://layer5.io\",\"Start Time: 2022-04-22 00:46:31\",\"Minimum: 70.989 ms\",\"Average: 138.927 ms\",\"Maximum: 384.321 ms\",\"Target QPS: 4 ( Actual QPS: 4 )\",\"No of Connections: 2\",\"Requested Duration: 1m0s ( Actual Duration: 60.1 )\",\"Errors: No Error\",\"Percentiles: p50: 114 ms; p75: 126.49 ms; p90: 233.33 ms; p99: 372.55 ms; p99.9: 383.14 ms; \",\"Kubernetes server version: v1.22.5\",\"Nodes:\",\"Node 1 - \\nHostname: docker-desktop \\nCPU: 4 \\nMemory: 20398384Ki \\nArch: amd64 \\nOS: Docker Desktop\\n                    \\nKubelet version: v1.22.5 \\nContainer runtime: docker://20.10.14\"]},\"scales\":{\"xAxes\":[{\"type\":\"linear\",\"scaleLabel\":{\"display\":true,\"labelString\":\"Response time in ms\",\"ticks\":{\"min\":0,\"beginAtZero\":true}}}],\"yAxes\":[{\"id\":\"P\",\"position\":\"right\",\"ticks\":{\"beginAtZero\":true,\"max\":100},\"scaleLabel\":{\"display\":true,\"labelString\":\"%\"}},{\"id\":\"H\",\"type\":\"linear\",\"ticks\":{\"beginAtZero\":true},\"scaleLabel\":{\"display\":true,\"labelString\":\"Count\"}}]}}}";
const consulChartData = "{\"percentiles\":[{\"Percentile\":50,\"Value\":0.19597883597883597},{\"Percentile\":75,\"Value\":0.2888364779874214},{\"Percentile\":90,\"Value\":0.43211009174311926},{\"Percentile\":99,\"Value\":0.7000000000000001},{\"Percentile\":99.9,\"Value\":0.8165030844000022}],\"data\":{\"datasets\":[{\"label\":\"Cumulative %\",\"data\":[{\"x\":0,\"y\":0},{\"x\":6.69,\"y\":0.03},{\"x\":7,\"y\":0.07},{\"x\":8,\"y\":0.3},{\"x\":9,\"y\":0.4},{\"x\":10,\"y\":0.53},{\"x\":11,\"y\":0.83},{\"x\":12,\"y\":1},{\"x\":14,\"y\":1.63},{\"x\":16,\"y\":2},{\"x\":18,\"y\":2.37},{\"x\":20,\"y\":2.57},{\"x\":25,\"y\":3.47},{\"x\":30,\"y\":4.3},{\"x\":35,\"y\":5.1},{\"x\":40,\"y\":6.13},{\"x\":45,\"y\":6.97},{\"x\":50,\"y\":7.93},{\"x\":60,\"y\":10.1},{\"x\":70,\"y\":12.03},{\"x\":80,\"y\":14.13},{\"x\":90,\"y\":16.83},{\"x\":100,\"y\":19.33},{\"x\":120,\"y\":24.83},{\"x\":140,\"y\":32.27},{\"x\":160,\"y\":39.53},{\"x\":180,\"y\":44.97},{\"x\":200,\"y\":51.27},{\"x\":250,\"y\":66.77},{\"x\":300,\"y\":77.37},{\"x\":350,\"y\":82.83},{\"x\":400,\"y\":87.67},{\"x\":450,\"y\":91.3},{\"x\":500,\"y\":94.9},{\"x\":600,\"y\":97.93},{\"x\":700,\"y\":99},{\"x\":800,\"y\":99.83},{\"x\":841.26,\"y\":100}],\"fill\":false,\"yAxisID\":\"P\",\"stepped\":true,\"backgroundColor\":\"rgba(134, 87, 167, 1)\",\"borderColor\":\"rgba(134, 87, 167, 1)\",\"cubicInterpolationMode\":\"monotone\"},{\"label\":\"Histogram: Count\",\"data\":[{\"x\":6.69,\"y\":2},{\"x\":7,\"y\":2},{\"x\":7,\"y\":7},{\"x\":8,\"y\":7},{\"x\":8,\"y\":3},{\"x\":9,\"y\":3},{\"x\":9,\"y\":4},{\"x\":10,\"y\":4},{\"x\":10,\"y\":9},{\"x\":11,\"y\":9},{\"x\":11,\"y\":5},{\"x\":12,\"y\":5},{\"x\":12,\"y\":19},{\"x\":14,\"y\":19},{\"x\":14,\"y\":11},{\"x\":16,\"y\":11},{\"x\":16,\"y\":11},{\"x\":18,\"y\":11},{\"x\":18,\"y\":6},{\"x\":20,\"y\":6},{\"x\":20,\"y\":27},{\"x\":25,\"y\":27},{\"x\":25,\"y\":25},{\"x\":30,\"y\":25},{\"x\":30,\"y\":24},{\"x\":35,\"y\":24},{\"x\":35,\"y\":31},{\"x\":40,\"y\":31},{\"x\":40,\"y\":25},{\"x\":45,\"y\":25},{\"x\":45,\"y\":29},{\"x\":50,\"y\":29},{\"x\":50,\"y\":65},{\"x\":60,\"y\":65},{\"x\":60,\"y\":58},{\"x\":70,\"y\":58},{\"x\":70,\"y\":63},{\"x\":80,\"y\":63},{\"x\":80,\"y\":81},{\"x\":90,\"y\":81},{\"x\":90,\"y\":75},{\"x\":100,\"y\":75},{\"x\":100,\"y\":165},{\"x\":120,\"y\":165},{\"x\":120,\"y\":223},{\"x\":140,\"y\":223},{\"x\":140,\"y\":218},{\"x\":160,\"y\":218},{\"x\":160,\"y\":163},{\"x\":180,\"y\":163},{\"x\":180,\"y\":189},{\"x\":200,\"y\":189},{\"x\":200,\"y\":465},{\"x\":250,\"y\":465},{\"x\":250,\"y\":318},{\"x\":300,\"y\":318},{\"x\":300,\"y\":164},{\"x\":350,\"y\":164},{\"x\":350,\"y\":145},{\"x\":400,\"y\":145},{\"x\":400,\"y\":109},{\"x\":450,\"y\":109},{\"x\":450,\"y\":108},{\"x\":500,\"y\":108},{\"x\":500,\"y\":91},{\"x\":600,\"y\":91},{\"x\":600,\"y\":32},{\"x\":700,\"y\":32},{\"x\":700,\"y\":25},{\"x\":800,\"y\":25},{\"x\":800,\"y\":5},{\"x\":841.26,\"y\":5}],\"yAxisID\":\"H\",\"pointStyle\":\"rect\",\"radius\":1,\"borderColor\":\"rgba(87, 167, 134, .9)\",\"backgroundColor\":\"rgba(87, 167, 134, .75)\",\"lineTension\":0}]},\"options\":{\"responsive\":true,\"maintainAspectRatio\":false,\"metadata\":{\"title\":{\"display\":{\"key\":\"Title\",\"value\":\"consul_1633988207149\"}},\"url\":{\"display\":{\"key\":\"URL\",\"value\":\"http://192.168.49.4/post\"}},\"startTime\":{\"display\":{\"key\":\"Start Time\",\"value\":\"2021-10-12 03:06:47\"}},\"minimum\":{\"display\":{\"key\":\"Minimum\",\"value\":\"6.688 ms\"}},\"average\":{\"display\":{\"key\":\"Average\",\"value\":\"221.379 ms\"}},\"maximum\":{\"display\":{\"key\":\"Maximum\",\"value\":\"841.258 ms\"}},\"qps\":{\"display\":{\"key\":\"QPS\",\"value\":\"Achieved 99.1 (Requested 100)\"}},\"numberOfConnections\":{\"display\":{\"key\":\"Number Of Connections\",\"value\":30}},\"duration\":{\"display\":{\"key\":\"Duration\",\"value\":\"Achieved 30.3 (Requested 30s)\"}},\"errors\":{\"display\":{\"key\":\"Errors\",\"value\":\"No Errors\"}},\"percentiles\":{\"display\":{\"key\":\"Percentiles\",\"value\":[{\"display\":{\"key\":\"p50\",\"value\":\"195.98 ms\"}},{\"display\":{\"key\":\"p75\",\"value\":\"288.84 ms\"}},{\"display\":{\"key\":\"p90\",\"value\":\"432.11 ms\"}},{\"display\":{\"key\":\"p99\",\"value\":\"700 ms\"}},{\"display\":{\"key\":\"p99.9\",\"value\":\"816.5 ms\"}}]}},\"kubernetes\":{\"display\":{\"hide\":true,\"key\":\"Kuberenetes\",\"value\":[{\"display\":{\"key\":\"Server Version\"}},{\"display\":{\"key\":\"Nodes\"}}]}}},\"title\":{\"display\":true,\"fontStyle\":\"normal\",\"text\":[\"Title: consul_1633988207149\",\"URL: http://192.168.49.4/post\",\"Start Time: 2021-10-12 03:06:47\",\"Minimum: 6.688 ms\",\"Average: 221.379 ms\",\"Maximum: 841.258 ms\",\"Target QPS: 100 ( Actual QPS: 99.1 )\",\"No of Connections: 30\",\"Requested Duration: 30s ( Actual Duration: 30.3 )\",\"Errors: No Error\",\"Percentiles: p50: 195.98 ms; p75: 288.84 ms; p90: 432.11 ms; p99: 700 ms; p99.9: 816.5 ms; \"]},\"scales\":{\"xAxes\":[{\"type\":\"linear\",\"scaleLabel\":{\"display\":true,\"labelString\":\"Response time in ms\",\"ticks\":{\"min\":0,\"beginAtZero\":true}}}],\"yAxes\":[{\"id\":\"P\",\"position\":\"right\",\"ticks\":{\"beginAtZero\":true,\"max\":100},\"scaleLabel\":{\"display\":true,\"labelString\":\"%\"}},{\"id\":\"H\",\"type\":\"linear\",\"ticks\":{\"beginAtZero\":true},\"scaleLabel\":{\"display\":true,\"labelString\":\"Count\"}}]}}}"
const linkerdChartData = "{\"percentiles\":[{\"Percentile\":50,\"Value\":0.0006040040159574467},{\"Percentile\":75,\"Value\":0.0008281526861702126},{\"Percentile\":90,\"Value\":0.0009626418882978723},{\"Percentile\":99,\"Value\":0.005},{\"Percentile\":99.9,\"Value\":0.006486842600000006}],\"data\":{\"datasets\":[{\"label\":\"Cumulative %\",\"data\":[{\"x\":0,\"y\":0},{\"x\":0.16,\"y\":0.17},{\"x\":1,\"y\":94.17},{\"x\":2,\"y\":96.17},{\"x\":3,\"y\":96.67},{\"x\":4,\"y\":97.83},{\"x\":5,\"y\":99},{\"x\":6,\"y\":99.33},{\"x\":6.57,\"y\":100}],\"fill\":false,\"yAxisID\":\"P\",\"stepped\":true,\"backgroundColor\":\"rgba(134, 87, 167, 1)\",\"borderColor\":\"rgba(134, 87, 167, 1)\",\"cubicInterpolationMode\":\"monotone\"},{\"label\":\"Histogram: Count\",\"data\":[{\"x\":0.16,\"y\":565},{\"x\":1,\"y\":565},{\"x\":1,\"y\":12},{\"x\":2,\"y\":12},{\"x\":2,\"y\":3},{\"x\":3,\"y\":3},{\"x\":3,\"y\":7},{\"x\":4,\"y\":7},{\"x\":4,\"y\":7},{\"x\":5,\"y\":7},{\"x\":5,\"y\":2},{\"x\":6,\"y\":2},{\"x\":6,\"y\":4},{\"x\":6.57,\"y\":4}],\"yAxisID\":\"H\",\"pointStyle\":\"rect\",\"radius\":1,\"borderColor\":\"rgba(87, 167, 134, .9)\",\"backgroundColor\":\"rgba(87, 167, 134, .75)\",\"lineTension\":0}]},\"options\":{\"responsive\":true,\"maintainAspectRatio\":false,\"metadata\":{\"title\":{\"display\":{\"key\":\"Title\",\"value\":\"2022-02-22-20.24.21\"}},\"url\":{\"display\":{\"key\":\"URL\",\"value\":\"http://localhost:8080\"}},\"startTime\":{\"display\":{\"key\":\"Start Time\",\"value\":\"2022-02-23 01:56:02\"}},\"minimum\":{\"display\":{\"key\":\"Minimum\",\"value\":\"0.157 ms\"}},\"average\":{\"display\":{\"key\":\"Average\",\"value\":\"0.758 ms\"}},\"maximum\":{\"display\":{\"key\":\"Maximum\",\"value\":\"6.573 ms\"}},\"qps\":{\"display\":{\"key\":\"QPS\",\"value\":\"Achieved 10 (Requested 10)\"}},\"numberOfConnections\":{\"display\":{\"key\":\"Number Of Connections\",\"value\":2}},\"duration\":{\"display\":{\"key\":\"Duration\",\"value\":\"Achieved 60 (Requested 1m0s)\"}},\"errors\":{\"display\":{\"key\":\"Errors\",\"value\":\"100% errors!\"}},\"percentiles\":{\"display\":{\"key\":\"Percentiles\",\"value\":[{\"display\":{\"key\":\"p50\",\"value\":\"0.6 ms\"}},{\"display\":{\"key\":\"p75\",\"value\":\"0.83 ms\"}},{\"display\":{\"key\":\"p90\",\"value\":\"0.96 ms\"}},{\"display\":{\"key\":\"p99\",\"value\":\"5 ms\"}},{\"display\":{\"key\":\"p99.9\",\"value\":\"6.49 ms\"}}]}},\"kubernetes\":{\"display\":{\"hide\":false,\"key\":\"Kuberenetes\",\"value\":[{\"display\":{\"key\":\"Server Version\",\"value\":\"v1.22.2\"}},{\"display\":{\"key\":\"Nodes\",\"value\":[{\"display\":{\"key\":\"Node 1\",\"value\":[{\"display\":{\"key\":\"Hostname\",\"value\":\"minikube\"}},{\"display\":{\"key\":\"CPU\",\"value\":\"2\"}},{\"display\":{\"key\":\"Memory\",\"value\":\"7114112Ki\"}},{\"display\":{\"key\":\"Arch\",\"value\":\"amd64\"}},{\"display\":{\"key\":\"OS\",\"value\":\"Ubuntu 20.04.2 LTS\"}},{\"display\":{\"key\":\"Kubelet Version\",\"value\":\"v1.22.2\"}},{\"display\":{\"key\":\"Container runtime\",\"value\":\"docker://20.10.8\"}}]}}]}}]}}},\"title\":{\"display\":true,\"fontStyle\":\"normal\",\"text\":[\"Title: 2022-02-22-20.24.21\",\"URL: http://localhost:8080\",\"Start Time: 2022-02-23 01:56:02\",\"Minimum: 0.157 ms\",\"Average: 0.758 ms\",\"Maximum: 6.573 ms\",\"Target QPS: 10 ( Actual QPS: 10 )\",\"No of Connections: 2\",\"Requested Duration: 1m0s ( Actual Duration: 60 )\",\"Errors: 100% errors!\",\"Percentiles: p50: 0.6 ms; p75: 0.83 ms; p90: 0.96 ms; p99: 5 ms; p99.9: 6.49 ms; \",\"Kubernetes server version: v1.22.2\",\"Nodes:\",\"Node 1 - \\nHostname: minikube \\nCPU: 2 \\nMemory: 7114112Ki \\nArch: amd64 \\nOS: Ubuntu 20.04.2 LTS\\n                    \\nKubelet version: v1.22.2 \\nContainer runtime: docker://20.10.8\"]},\"scales\":{\"xAxes\":[{\"type\":\"linear\",\"scaleLabel\":{\"display\":true,\"labelString\":\"Response time in ms\",\"ticks\":{\"min\":0,\"beginAtZero\":true}}}],\"yAxes\":[{\"id\":\"P\",\"position\":\"right\",\"ticks\":{\"beginAtZero\":true,\"max\":100},\"scaleLabel\":{\"display\":true,\"labelString\":\"%\"}},{\"id\":\"H\",\"type\":\"linear\",\"ticks\":{\"beginAtZero\":true},\"scaleLabel\":{\"display\":true,\"labelString\":\"Count\"}}]}}}"
const kumaChart = "{\"percentiles\":[{\"Percentile\":50,\"Value\":0.19597883597883597},{\"Percentile\":75,\"Value\":0.2888364779874214},{\"Percentile\":90,\"Value\":0.43211009174311926},{\"Percentile\":99,\"Value\":0.7000000000000001},{\"Percentile\":99.9,\"Value\":0.8165030844000022}],\"data\":{\"datasets\":[{\"label\":\"Cumulative %\",\"data\":[{\"x\":0,\"y\":0},{\"x\":6.69,\"y\":0.03},{\"x\":7,\"y\":0.07},{\"x\":8,\"y\":0.3},{\"x\":9,\"y\":0.4},{\"x\":10,\"y\":0.53},{\"x\":11,\"y\":0.83},{\"x\":12,\"y\":1},{\"x\":14,\"y\":1.63},{\"x\":16,\"y\":2},{\"x\":18,\"y\":2.37},{\"x\":20,\"y\":2.57},{\"x\":25,\"y\":3.47},{\"x\":30,\"y\":4.3},{\"x\":35,\"y\":5.1},{\"x\":40,\"y\":6.13},{\"x\":45,\"y\":6.97},{\"x\":50,\"y\":7.93},{\"x\":60,\"y\":10.1},{\"x\":70,\"y\":12.03},{\"x\":80,\"y\":14.13},{\"x\":90,\"y\":16.83},{\"x\":100,\"y\":19.33},{\"x\":120,\"y\":24.83},{\"x\":140,\"y\":32.27},{\"x\":160,\"y\":39.53},{\"x\":180,\"y\":44.97},{\"x\":200,\"y\":51.27},{\"x\":250,\"y\":66.77},{\"x\":300,\"y\":77.37},{\"x\":350,\"y\":82.83},{\"x\":400,\"y\":87.67},{\"x\":450,\"y\":91.3},{\"x\":500,\"y\":94.9},{\"x\":600,\"y\":97.93},{\"x\":700,\"y\":99},{\"x\":800,\"y\":99.83},{\"x\":841.26,\"y\":100}],\"fill\":false,\"yAxisID\":\"P\",\"stepped\":true,\"backgroundColor\":\"rgba(134, 87, 167, 1)\",\"borderColor\":\"rgba(134, 87, 167, 1)\",\"cubicInterpolationMode\":\"monotone\"},{\"label\":\"Histogram: Count\",\"data\":[{\"x\":6.69,\"y\":2},{\"x\":7,\"y\":2},{\"x\":7,\"y\":7},{\"x\":8,\"y\":7},{\"x\":8,\"y\":3},{\"x\":9,\"y\":3},{\"x\":9,\"y\":4},{\"x\":10,\"y\":4},{\"x\":10,\"y\":9},{\"x\":11,\"y\":9},{\"x\":11,\"y\":5},{\"x\":12,\"y\":5},{\"x\":12,\"y\":19},{\"x\":14,\"y\":19},{\"x\":14,\"y\":11},{\"x\":16,\"y\":11},{\"x\":16,\"y\":11},{\"x\":18,\"y\":11},{\"x\":18,\"y\":6},{\"x\":20,\"y\":6},{\"x\":20,\"y\":27},{\"x\":25,\"y\":27},{\"x\":25,\"y\":25},{\"x\":30,\"y\":25},{\"x\":30,\"y\":24},{\"x\":35,\"y\":24},{\"x\":35,\"y\":31},{\"x\":40,\"y\":31},{\"x\":40,\"y\":25},{\"x\":45,\"y\":25},{\"x\":45,\"y\":29},{\"x\":50,\"y\":29},{\"x\":50,\"y\":65},{\"x\":60,\"y\":65},{\"x\":60,\"y\":58},{\"x\":70,\"y\":58},{\"x\":70,\"y\":63},{\"x\":80,\"y\":63},{\"x\":80,\"y\":81},{\"x\":90,\"y\":81},{\"x\":90,\"y\":75},{\"x\":100,\"y\":75},{\"x\":100,\"y\":165},{\"x\":120,\"y\":165},{\"x\":120,\"y\":223},{\"x\":140,\"y\":223},{\"x\":140,\"y\":218},{\"x\":160,\"y\":218},{\"x\":160,\"y\":163},{\"x\":180,\"y\":163},{\"x\":180,\"y\":189},{\"x\":200,\"y\":189},{\"x\":200,\"y\":465},{\"x\":250,\"y\":465},{\"x\":250,\"y\":318},{\"x\":300,\"y\":318},{\"x\":300,\"y\":164},{\"x\":350,\"y\":164},{\"x\":350,\"y\":145},{\"x\":400,\"y\":145},{\"x\":400,\"y\":109},{\"x\":450,\"y\":109},{\"x\":450,\"y\":108},{\"x\":500,\"y\":108},{\"x\":500,\"y\":91},{\"x\":600,\"y\":91},{\"x\":600,\"y\":32},{\"x\":700,\"y\":32},{\"x\":700,\"y\":25},{\"x\":800,\"y\":25},{\"x\":800,\"y\":5},{\"x\":841.26,\"y\":5}],\"yAxisID\":\"H\",\"pointStyle\":\"rect\",\"radius\":1,\"borderColor\":\"rgba(87, 167, 134, .9)\",\"backgroundColor\":\"rgba(87, 167, 134, .75)\",\"lineTension\":0}]},\"options\":{\"responsive\":true,\"maintainAspectRatio\":false,\"metadata\":{\"title\":{\"display\":{\"key\":\"Title\",\"value\":\"consul_1633988207149\"}},\"url\":{\"display\":{\"key\":\"URL\",\"value\":\"http://192.168.49.4/post\"}},\"startTime\":{\"display\":{\"key\":\"Start Time\",\"value\":\"2021-10-12 03:06:47\"}},\"minimum\":{\"display\":{\"key\":\"Minimum\",\"value\":\"6.688 ms\"}},\"average\":{\"display\":{\"key\":\"Average\",\"value\":\"221.379 ms\"}},\"maximum\":{\"display\":{\"key\":\"Maximum\",\"value\":\"841.258 ms\"}},\"qps\":{\"display\":{\"key\":\"QPS\",\"value\":\"Achieved 99.1 (Requested 100)\"}},\"numberOfConnections\":{\"display\":{\"key\":\"Number Of Connections\",\"value\":30}},\"duration\":{\"display\":{\"key\":\"Duration\",\"value\":\"Achieved 30.3 (Requested 30s)\"}},\"errors\":{\"display\":{\"key\":\"Errors\",\"value\":\"No Errors\"}},\"percentiles\":{\"display\":{\"key\":\"Percentiles\",\"value\":[{\"display\":{\"key\":\"p50\",\"value\":\"195.98 ms\"}},{\"display\":{\"key\":\"p75\",\"value\":\"288.84 ms\"}},{\"display\":{\"key\":\"p90\",\"value\":\"432.11 ms\"}},{\"display\":{\"key\":\"p99\",\"value\":\"700 ms\"}},{\"display\":{\"key\":\"p99.9\",\"value\":\"816.5 ms\"}}]}},\"kubernetes\":{\"display\":{\"hide\":true,\"key\":\"Kuberenetes\",\"value\":[{\"display\":{\"key\":\"Server Version\"}},{\"display\":{\"key\":\"Nodes\"}}]}}},\"title\":{\"display\":true,\"fontStyle\":\"normal\",\"text\":[\"Title: consul_1633988207149\",\"URL: http://192.168.49.4/post\",\"Start Time: 2021-10-12 03:06:47\",\"Minimum: 6.688 ms\",\"Average: 221.379 ms\",\"Maximum: 841.258 ms\",\"Target QPS: 100 ( Actual QPS: 99.1 )\",\"No of Connections: 30\",\"Requested Duration: 30s ( Actual Duration: 30.3 )\",\"Errors: No Error\",\"Percentiles: p50: 195.98 ms; p75: 288.84 ms; p90: 432.11 ms; p99: 700 ms; p99.9: 816.5 ms; \"]},\"scales\":{\"xAxes\":[{\"type\":\"linear\",\"scaleLabel\":{\"display\":true,\"labelString\":\"Response time in ms\",\"ticks\":{\"min\":0,\"beginAtZero\":true}}}],\"yAxes\":[{\"id\":\"P\",\"position\":\"right\",\"ticks\":{\"beginAtZero\":true,\"max\":100},\"scaleLabel\":{\"display\":true,\"labelString\":\"%\"}},{\"id\":\"H\",\"type\":\"linear\",\"ticks\":{\"beginAtZero\":true},\"scaleLabel\":{\"display\":true,\"labelString\":\"Count\"}}]}}}";
const appMesh = '{"percentiles":[{"Percentile":50,"Value":0.08955882352941176},{"Percentile":75,"Value":0.09594827586206897},{"Percentile":90,"Value":0.09982758620689655},{"Percentile":99,"Value":0.12486559349999994},{"Percentile":99.9,"Value":0.1380026959500001}],"data":{"datasets":[{"label":"Cumulative %","data":[{"x":0,"y":0},{"x":75.75,"y":1.33},{"x":80,"y":6.67},{"x":90,"y":52},{"x":100,"y":90.67},{"x":120,"y":98.67},{"x":139.46,"y":100}],"fill":false,"yAxisID":"P","stepped":true,"backgroundColor":"rgba(134, 87, 167, 1)","borderColor":"rgba(134, 87, 167, 1)","cubicInterpolationMode":"monotone"},{"label":"Histogram: Count","data":[{"x":75.75,"y":5},{"x":80,"y":5},{"x":80,"y":34},{"x":90,"y":34},{"x":90,"y":29},{"x":100,"y":29},{"x":100,"y":6},{"x":120,"y":6},{"x":120,"y":1},{"x":139.46,"y":1}],"yAxisID":"H","pointStyle":"rect","radius":1,"borderColor":"rgba(87, 167, 134, .9)","backgroundColor":"rgba(87, 167, 134, .75)","lineTension":0}]},"options":{"responsive":true,"maintainAspectRatio":false,"metadata":{"title":{"display":{"key":"Title","value":"app mesh_1651607867035"}},"url":{"display":{"key":"URL","value":"https://www.google.com"}},"startTime":{"display":{"key":"Start Time","value":"2022-05-04 01:27:47"}},"minimum":{"display":{"key":"Minimum","value":"75.748 ms"}},"average":{"display":{"key":"Average","value":"90.772 ms"}},"maximum":{"display":{"key":"Maximum","value":"139.462 ms"}},"qps":{"display":{"key":"QPS","value":"Achieved 5 (Requested 5)"}},"numberOfConnections":{"display":{"key":"Number Of Connections","value":3}},"duration":{"display":{"key":"Duration","value":"Achieved 15.1 (Requested 15s)"}},"errors":{"display":{"key":"Errors","value":"No Errors"}},"percentiles":{"display":{"key":"Percentiles","value":[{"display":{"key":"p50","value":"89.56 ms"}},{"display":{"key":"p75","value":"95.95 ms"}},{"display":{"key":"p90","value":"99.83 ms"}},{"display":{"key":"p99","value":"124.87 ms"}},{"display":{"key":"p99.9","value":"138 ms"}}]}},"kubernetes":{"display":{"hide":false,"key":"Kuberenetes","value":[{"display":{"key":"Server Version","value":"v1.22.5"}},{"display":{"key":"Nodes","value":[{"display":{"key":"Node 1","value":[{"display":{"key":"Hostname","value":"docker-desktop"}},{"display":{"key":"CPU","value":"4"}},{"display":{"key":"Memory","value":"20398384Ki"}},{"display":{"key":"Arch","value":"amd64"}},{"display":{"key":"OS","value":"Docker Desktop"}},{"display":{"key":"Kubelet Version","value":"v1.22.5"}},{"display":{"key":"Container runtime","value":"docker://20.10.14"}}]}}]}}]}}},"title":{"display":true,"fontStyle":"normal","text":["Title: app mesh_1651607867035","URL: https://www.google.com","Start Time: 2022-05-04 01:27:47","Minimum: 75.748 ms","Average: 90.772 ms","Maximum: 139.462 ms","Target QPS: 5 ( Actual QPS: 5 )","No of Connections: 3","Requested Duration: 15s ( Actual Duration: 15.1 )","Errors: No Error","Percentiles: p50: 89.56 ms; p75: 95.95 ms; p90: 99.83 ms; p99: 124.87 ms; p99.9: 138 ms; ","Kubernetes server version: v1.22.5","Nodes:","Node 1 - \\nHostname: docker-desktop \\nCPU: 4 \\nMemory: 20398384Ki \\nArch: amd64 \\nOS: Docker Desktop\\n                    \\nKubelet version: v1.22.5 \\nContainer runtime: docker://20.10.14"]},"scales":{"xAxes":[{"type":"linear","scaleLabel":{"display":true,"labelString":"Response time in ms","ticks":{"min":0,"beginAtZero":true}}}],"yAxes":[{"id":"P","position":"right","ticks":{"beginAtZero":true,"max":100},"scaleLabel":{"display":true,"labelString":"%"}},{"id":"H","type":"linear","ticks":{"beginAtZero":true},"scaleLabel":{"display":true,"labelString":"Count"}}]}}}'

function getChartData(type) {
  type = type.toLowerCase().replaceAll(" ", "");
  switch (type) {
    case "istio": return JSON.parse(istioChartData)
    case "consul": return JSON.parse(consulChartData)
    case "linkerd": return JSON.parse(linkerdChartData)
    case "kuma": return JSON.parse(kumaChart)
    case "appmesh": return JSON.parse(appMesh)
    default: return JSON.parse(newData)
  }
}

function tableRowCreator(machineSpec, title) {
  console.log({machineSpec, title})
  function getTableRows() {
    return Object.keys(machineSpec).map((key) => `<tr>
  <th scope="row">${formattedName(key)}</th>
  <td>${machineSpec[key]}</td>
</tr>`).join("")
  }

  return `<table class="table">
<thead class="thead-dark">
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

function alternateClassMap(clss) {
  clss = clss.replace("env", "card");
  if(clss.endsWith("2")) {
    return clss.substring(0, clss.length - 1);
  }

  return clss+"2";
}

function hideOtherTab(id) {
  const alternate = alternateClassMap(id);
  document.getElementById(alternate).classList.remove("show");
}

function renderInfraDetails(appendToId) {
  document.getElementById(appendToId).innerHTML = tableRowCreator(result.runner_results[0].kubernetes.nodes[0], "Environment Details");
  hideOtherTab(appendToId);
}

function processTestSpecificationClick(e, appendToId) {
  const chartData = getChartData(e);
  console.log({chartData, appendToId})
  renderTestSpecs(chartData.options.title.text, appendToId)
}

function renderTestSpecs(titleString, appendToId) {
  function changeStringToObj(strArr) {
    const obj = {};
    strArr.forEach(str => {
      const [key, value] = str.split(":").map(word => word.trim())
      obj[key] = value;
    })
    return obj;
  }
  
  document.getElementById(appendToId).innerHTML = tableRowCreator(changeStringToObj(titleString), "Test Specifications");
  hideOtherTab(appendToId);
}

function formattedName(name) {
  return name.split("_").map(word => word[0].toUpperCase() + word.substring(1)).join(" ")
}