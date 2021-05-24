import { ParcelOptions } from 'parcel';

export interface ParcelConfig extends ParcelOptions {
  global?: string;
  autoInstall?: boolean;
  logLevel?: any;
}

export interface PiralBundlerSetup {
  type: 'piral';
  entryFiles: string;
  config: ParcelConfig;
}

export interface PiletBundlerSetup {
  type: 'pilet';
  targetDir: string;
  externals: Array<string>;
  entryModule: string;
  config: ParcelConfig;
}

export type BundlerSetup = PiralBundlerSetup | PiletBundlerSetup;
