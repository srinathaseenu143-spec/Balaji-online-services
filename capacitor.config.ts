import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.balaji.onlineservice',
  appName: 'Balaji Online Service',
  webDir: '.next/standalone/public',
  server: {
    androidScheme: 'https',
    cleartext: ['*']
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#06B6D4',
      showSpinner: true,
      spinnerColor: '#ffffff'
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#06B6D4'
    }
  }
};

export default config;
