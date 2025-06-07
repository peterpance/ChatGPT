const app = getApp();

Page({
  data: {
    devices: [],
    scanning: false
  },

  onLoad() {
    wx.openBluetoothAdapter({
      success: this.startScan,
      fail(err) {
        wx.showToast({title: 'Bluetooth unavailable', icon: 'none'});
      }
    });
  },

  startScan() {
    this.setData({devices: [], scanning: true});
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      success: () => {
        wx.onBluetoothDeviceFound((res) => {
          const devices = this.data.devices;
          res.devices.forEach(d => {
            if (!devices.find(item => item.deviceId === d.deviceId)) {
              devices.push(d);
            }
          });
          this.setData({devices});
        });
      }
    });
  },

  connectDevice(e) {
    const deviceId = e.currentTarget.dataset.id;
    wx.createBLEConnection({
      deviceId,
      success: () => {
        app.globalData.connectedDeviceId = deviceId;
        wx.stopBluetoothDevicesDiscovery();
        wx.navigateTo({url: '/pages/debug/debug'});
      },
      fail: (err) => {
        wx.showToast({title: 'Connection failed', icon: 'none'});
      }
    });
  }
});
