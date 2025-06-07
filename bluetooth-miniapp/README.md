# Bluetooth Staircase Light Mini Program

This is a simple WeChat mini program demonstrating how to scan and connect to a Bluetooth device, send and receive data, and configure settings for a staircase light.

## Usage

1. Import the project into WeChat Developer Tools.
2. Update `app.js` with the correct `serviceId` and `characteristicId` for your Bluetooth device.
3. Run the mini program on a device with Bluetooth enabled.
4. The index page scans for nearby devices. Connect to your device to enter the debug page.
5. Use the debug page to send text or HEX data and view incoming messages.
6. Access the settings page from the debug page to adjust staircase light parameters.

The settings are stored locally using `wx.setStorageSync`.
