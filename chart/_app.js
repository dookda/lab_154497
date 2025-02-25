async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/data/A4');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
}

async function renderChart() {
    const data = await fetchData();

    // แปลงข้อมูลจาก API
    const categories = data.map(item => new Date(item.ts).toLocaleString('th-TH'));
    const tempSeries = data.map(item => parseFloat(item.temp));
    const rhSeries = data.map(item => parseFloat(item.rh));

    // สร้าง options เบื้องต้นที่ใช้ร่วมกันได้ (สำหรับข้อมูล xaxis และ chart)
    const baseOptions = {
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'เวลา'
            },
            labels: {
                rotate: -45,
                style: {
                    fontSize: '10px'
                }
            }
        },
        title: {
            text: '',
            align: 'center'
        }
    };

    // สร้าง options สำหรับกราฟอุณหภูมิ โดยรวม baseOptions และเพิ่มการตั้งค่าเฉพาะของ yaxis และ series
    const tempChartOptions = {
        ...baseOptions,
        series: [{
            name: 'อุณหภูมิ',
            data: tempSeries
        }],
        yaxis: {
            title: {
                text: 'อุณหภูมิ (°C)'
            }
        }
    };

    // สร้าง options สำหรับกราฟความชื้น
    const rhChartOptions = {
        ...baseOptions,
        series: [{
            name: 'ความชื้น',
            data: rhSeries
        }],
        yaxis: {
            title: {
                text: 'ความชื้น (%)'
            }
        }
    };

    // สร้างอินสแตนซ์สำหรับกราฟอุณหภูมิ
    const tempChartElem = document.querySelector("#tempChart");
    const tempChart = new ApexCharts(tempChartElem, tempChartOptions);
    tempChart.render();

    // สร้างอินสแตนซ์สำหรับกราฟความชื้น
    const rhChartElem = document.querySelector("#rhChart");
    const rhChart = new ApexCharts(rhChartElem, rhChartOptions);
    rhChart.render();
}

// เรียก renderChart เมื่อหน้าเว็บโหลดเสร็จ
window.onload = renderChart;

// รีเฟรชกราฟทุก 6 วินาที
setInterval(() => {
    renderChart();
}, 6000);


