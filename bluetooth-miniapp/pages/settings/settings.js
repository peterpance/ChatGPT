Page({
  data: {
    stepCount: 10,
    brightness: 50,
    delay: 100
  },

  onStepCount(e) {
    this.setData({stepCount: parseInt(e.detail.value, 10) || 0});
  },

  onBrightness(e) {
    this.setData({brightness: e.detail.value});
  },

  onDelay(e) {
    this.setData({delay: parseInt(e.detail.value, 10) || 0});
  },

  saveSettings() {
    wx.setStorageSync('stairSettings', {
      stepCount: this.data.stepCount,
      brightness: this.data.brightness,
      delay: this.data.delay
    });
    wx.showToast({title: 'Saved'});
  }
});
