// Example data structure
// const data = { timestamps: ['08:00', '09:00', ...], entries: [10, 20, ...] };

const ctx = document.getElementById('occupancyChart').getContext('2d');
const occupancyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // This will be populated with formatted timestamps
        datasets: [{
            label: 'Total Entry',
            data: [], // This will be populated with occupancy counts
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    parser: 'HH:mm', // Specify how to parse the time
                    tooltipFormat: 'HH:mm',
                    min: '08:00', // Set min value of x-axis
                    max: '22:00'  // Set max value of x-axis
                },
                title: {
                    display: true,
                    text: 'Time of Day'
                },
                ticks: {
                    source: 'labels', // Use 'labels' or 'data'
                    autoSkip: true,
                    maxTicksLimit: 10 // Limit the number of ticks on the x-axis
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Occupancy Count'
                }
            }
        }
    }
});


// Function to fetch data and update the chart
async function fetchAndDisplayData(date) {
    try {

        document.getElementById('displayDate').textContent = moment(date).format('LL');

        const response = await fetch(`/api/occupancy/daily-data?date=${date}...`); // Updated endpoint
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Not JSON response");
        }
        
        const { dailyData } = await response.json();

        // Format timestamps before passing to Chart.js
        const formattedData = dailyData.map(data => {
            return {
                ...data,
                timestamp: moment(data.timestamp).format('HH:mm') // Format to hours and minutes
            };
        });

        // Clear any existing data
        occupancyChart.data.labels = [];
        occupancyChart.data.datasets[0].data = [];

        // Populate chart with formatted data
        formattedData.forEach(data => {
            occupancyChart.data.labels.push(data.timestamp);
            occupancyChart.data.datasets[0].data.push(data.entry);
        });

        occupancyChart.update();
    } catch (error) {
        console.error('Failed to fetch daily occupancy data:', error);
    }
}

document.getElementById('fetchDataButton').addEventListener('click', function() {
    let selectedDate = document.getElementById('datePicker').value;
    if (!selectedDate) {
        selectedDate = moment().format('YYYY-MM-DD'); // Use today's date if none is selected
    }
    fetchAndDisplayData(selectedDate);
});



document.getElementById('fetchDataButton').addEventListener('click', function() {
    const selectedDate = document.getElementById('datePicker').value;
    if (!selectedDate) {
        selectedDate = moment().format('YYYY-MM-DD');
    }
        fetchAndDisplayData(selectedDate);
});

const todayDate = moment().format('YYYY-MM-DD');

fetchAndDisplayData(todayDate);