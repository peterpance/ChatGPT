const app = getApp();

function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), bit => {
    return ('00' + bit.toString(16)).slice(-2);
  });
  return hexArr.join('');
}

Page({
  data: {
    inputText: '',
    isHex: false,
    logs: []
  },

  onLoad() {
    const {connectedDeviceId, serviceId, characteristicId} = app.globalData;
    if (!connectedDeviceId) {
      wx.navigateBack();
      return;
    }
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: connectedDeviceId,
      serviceId,
      characteristicId,
    });
    wx.onBLECharacteristicValueChange((res) => {
      const hex = ab2hex(res.value);
      const log = this.data.isHex ? hex : wx.arrayBufferToString(res.value);
      this.data.logs.push('recv: ' + log);
      this.setData({logs: this.data.logs});
    });
  },

  onInput(e) {
    this.setData({inputText: e.detail.value});
  },

  toggleHex(e) {
    this.setData({isHex: e.detail.value});
  },

  sendData() {
    const {inputText, isHex} = this.data;
    if (!inputText) return;
    const {connectedDeviceId, serviceId, characteristicId} = app.globalData;
    let buffer;
    if (isHex) {
      const typedArray = new Uint8Array(inputText.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      buffer = typedArray.buffer;
    } else {
      buffer = wx.stringToArrayBuffer(inputText);
    }
    wx.writeBLECharacteristicValue({
      deviceId: connectedDeviceId,
      serviceId,
      characteristicId,
      value: buffer,
      success: () => {
        this.data.logs.push('send: ' + inputText);
        this.setData({logs: this.data.logs, inputText: ''});
      },
      fail: () => {
        wx.showToast({title: 'Send failed', icon: 'none'});
      }
    });
  },

  goToSettings() {
    wx.navigateTo({url: '/pages/settings/settings'});
  }
});
