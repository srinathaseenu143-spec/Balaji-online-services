import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.balaji.onlineservice',
  appName: 'Balaji Online Service',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#06B6D4'
    }
  }
};

export default config;
