function renderChart() {
    fetch('http://localhost:3000/api/v1/data/A4')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            let dataTemp = []
            let dataPm25 = []
            let cate = []
            data.forEach(i => {
                dataTemp.push(Number(i.temp))
                dataPm25.push(Number(i.pm25))
                cate.push(new Date(i.ts).toLocaleString('th-TH'))
            })

            var baseOptions = {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
            }

            var optionsTemp = {
                ...baseOptions,
                series: [{
                    name: "Desktops",
                    data: dataTemp
                }],

                xaxis: {
                    categories: cate,
                }
            };
            var divTemp = document.querySelector("#chartTemp");
            var chartTemp = new ApexCharts(divTemp, optionsTemp);
            chartTemp.render();

            var optionsPm25 = {
                ...baseOptions,
                series: [{
                    name: "Desktops",
                    data: dataPm25
                }],
                xaxis: {
                    categories: cate,
                }
            };
            var divPm25 = document.querySelector("#chartPm25");
            var chartPm25 = new ApexCharts(divPm25, optionsPm25);
            chartPm25.render();
        })
}

window.onload = renderChart

setInterval(() => {
    renderChart()
}, 6000)
