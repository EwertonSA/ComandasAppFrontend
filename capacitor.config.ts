import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Ewerton.comandas',
  appName: 'fronteste',
  webDir: 'out',  
  server: {
    url: 'https://esadev.com.br/indexComandas',
    cleartext: false
  }
};

export default config;
