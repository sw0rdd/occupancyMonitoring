

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded with JavaScript');

    const socket = io();

    socket.on('occupancyUpdated', (data) => {
        console.log('Occupancy updated: ', data);
        // Assuming you have elements with IDs corresponding to these values
        document.getElementById('entryCount').textContent = `Entry: ${data.entry}`;
        document.getElementById('groundFloorCount').textContent = `Ground Floor: ${data.groundFloor}`;
        document.getElementById('firstFloorCount').textContent = `First Floor: ${data.firstFloor}`;
        document.getElementById('secondFloorCount').textContent = `Second Floor: ${data.secondFloor}`;
        document.getElementById('timeStamp').textContent = `Timestamp: ${data.timestamp}`;

    });







});