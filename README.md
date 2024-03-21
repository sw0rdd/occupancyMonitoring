# Real-Time Occupancy Monitoring System for University Library

This project is designed to monitor the occupancy of a library across different floors and zones using Raspberry Pi Pico W units with ultrasonic sensors and an Arduino board. The data collected by the Pico units is sent to a central Arduino, which then posts the information to a local web server. The server runs on Node.js and stores occupancy data in MongoDB.<br><br>
This project is made for the course "Project with Embedded Systems 2DT304". <br>

Project Demo [Video](https://www.youtube.com/watch?v=ATyk5O6ZMHE)

## Contributers
Seif-Alamir Yousef & Ludvig Svensson

## 
# Academic Report 
In this [Academic Report](https://docs.google.com/document/d/1X3nvK4McUbsehoqTqAhvU4GHUhgysJOzC636muut5SY/edit?usp=sharing) you will detailed information about the project.

## System Components

- **Raspberry Pi Pico W:** Each Pico W has 2 ultrasonic sensors to measure entries and exits from a specific zone. Picos are also Bluetooth-enabled to communicate with the Arduino.
  - **Zone 1:** First floor
  - **Zone 2:** Ground floor
  - **Zone 3:** Second and Third floors
- **Arduino:** Collects data from each Pico W via Bluetooth, then sends this data to the local web server via HTTP POST requests.
- **Web Server:** A Node.js Express app that uses MongoDB for data storage. It displays the occupancy data through a web interface.

## Hardware Setup

1. Connect 2 ultrasonic sensors to each Raspberry Pi Pico W.
2. Power your micro
3. Ensure all devices are within Bluetooth range of each other.

## Software Setup

### Web Server

1. **Prerequisites:** Node.js, MongoDB installed on the host machine.
2. Clone the repository and navigate to the project directory.
3. Copy `.env.example` to `.env` and update the following variables:
   - `MONGODB_URI`: Your MongoDB connection URI.
   - `PORT`: The port number for the web server.
   - `API_KEY`: A custom API key for secure communication between the Arduino and the server.
4. Install dependencies with `npm install`.
5. Run the server using `npm run devStart`.

### Arduino and Raspberry Pi Pico W Code

The code for both the Arduino and Raspberry Pi Pico W units is available in a separate repository. You can find it [here](git@github.com:sw0rdd/occupancyMonitoringES.git). Follow the instructions in that repository to upload the code to your devices.

### Configuring Arduino

Ensure the Arduino is programmed with the IP address of the device running the web server and the matching `API_KEY` for successful POST requests to the server. Also, make sure the Arduino and the server are on the same network.

## Running the System

After completing the setup, the system will monitor the occupancy of the library across the specified zones. The web server provides a real-time interface for viewing occupancy data.

