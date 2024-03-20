

document.addEventListener('DOMContentLoaded', function() {

    const updateDateTime = () => {
        document.getElementById('todaysDate').textContent = moment().format('MMMM Do YYYY, HH:mm:ss');
    };

    // Update the date/time once on page load
    updateDateTime();

    // Then update every second (1000 milliseconds)
    setInterval(updateDateTime, 1000);

    // update library status (opening hours and days)
    const updateLibraryStatus = () => {
        const now = moment();
        const dayOfWeek = now.day(); // Sunday - 0, Monday - 1, ..., Saturday - 6
        const currentTime = now.format('HH:mm'); // Get current time in HH:mm format

        let statusMessage = '';

        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
            if (now.isBetween(now.clone().startOf('day').add(8, 'hours'), now.clone().startOf('day').add(19, 'hours'), null, '[]')) {
                statusMessage = 'Open to everyone';
            } else if (now.isBetween(now.clone().startOf('day').add(19, 'hours'), now.clone().startOf('day').add(22, 'hours'), null, '[]')) {
                statusMessage = 'Open, LNU swipe card required';
            } else {
                statusMessage = 'Closed';
            }
        } else if (dayOfWeek === 6) { // Saturday
            if (now.isBetween(now.clone().startOf('day').add(10, 'hours'), now.clone().startOf('day').add(14, 'hours'), null, '[]')) {
                statusMessage = 'Open to everyone';
            } else if ((now.isBetween(now.clone().startOf('day').add(8, 'hours'), now.clone().startOf('day').add(10, 'hours'), null, '[]')) || (now.isBetween(now.clone().startOf('day').add(14, 'hours'), now.clone().startOf('day').add(18, 'hours'), null, '[]'))) {
                statusMessage = 'Open, LNU swipe card required';
            } else {
                statusMessage = 'Closed';
            }
        } else if (dayOfWeek === 0) { // Sunday
            if (now.isBetween(now.clone().startOf('day').add(8, 'hours'), now.clone().startOf('day').add(18, 'hours'), null, '[]')) {
                statusMessage = 'Closed to public, open for LNU swipe card holders';
            } else {
                statusMessage = 'Closed';
            }
        }

        document.querySelector('.libraryStatus').textContent = `The Library is ${statusMessage} (${currentTime})`;
    };

    updateLibraryStatus();
    setInterval(updateLibraryStatus, 60000);

    const socket = io();

    socket.on('occupancyUpdated', (data) => {
        console.log('Occupancy updated: ', data);
        document.getElementById('entryCount').textContent = `${data.entry}`;
        document.getElementById('groundFloorCount').textContent = `${data.groundFloor}`;
        document.getElementById('firstFloorCount').textContent = `${data.firstFloor}`;
        document.getElementById('secondFloorCount').textContent = `${data.secondFloor}`;
        document.getElementById('timeStamp').textContent = `${data.timestamp}`;

    });







});