document.addEventListener('DOMContentLoaded', function() {
    // Initialize the chart with today's date
    const todayDate = moment().format('YYYY-MM-DD');
    fetchFloorsData(todayDate);
    updateDisplayedDate(todayDate);

    document.getElementById('fetchDataButton').addEventListener('click', function() {
        let selectedDate = document.getElementById('datePicker').value;
        if (!selectedDate) {
            selectedDate = moment().format('YYYY-MM-DD'); // Use today's date if none is selected
        }
        fetchFloorsData(selectedDate);
        updateDisplayedDate(selectedDate);
    });
});

function updateDisplayedDate(date) {
    document.getElementById('displayDate').textContent = moment(date).format('LL');
}

async function fetchFloorsData(date) {
    try {
        const response = await fetch(`/api/occupancy/floors-data?date=${date}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const { occupancyData } = await response.json();

        const labels = occupancyData.map(data => `${data._id}:00`);
        const groundFloorData = occupancyData.map(data => data.groundFloorAvg);
        const secondFloorData = occupancyData.map(data => data.secondFloorAvg);
        const firstFloorData = occupancyData.map(data => data.firstFloorAvg);

        const ctx = document.getElementById('floorChart').getContext('2d');
        if (window.occupancyChart instanceof Chart) {
            window.occupancyChart.destroy(); // Destroy existing chart instance if exists
        }
        window.occupancyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Ground Floor',
                        data: groundFloorData,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    },
                    {
                        label: 'First Floor',
                        data: firstFloorData,
                        borderColor: 'rgb(255, 205, 86)',
                        tension: 0.1
                    },
                    {
                        label: 'Second & Third Floor',
                        data: secondFloorData,
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Hour of the Day'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Occupancy'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Failed to fetch floors occupancy data:', error);
    }
}
