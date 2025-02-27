export interface Importmap {
  imports: Record<string, string>;
  inherit: Array<string>;
}

export interface PackageData {
  name: string;
  version: string;
  description: string;
  importmap?: Importmap;
  main: string;
  author:
    | string
    | {
        name?: string;
        url?: string;
        email?: string;
      };
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// Shape of the package.json of a pilet
export interface PiletPackageData extends PackageData {
  piral?: {
    name: string;
  };
  custom?: any;
}

// Shape of the package.json of a Piral instance or emulator
export interface PiralPackageData extends PackageData {
  pilets?: PiletsInfo;
  piralCLI?: { generated: boolean; version: string };
}

export interface PiralInstancePackageData extends PiralPackageData {
  root: string;
  app: string;
}

export interface AppDefinition {
  appPackage: PiralInstancePackageData;
  appFile: string;
  appRoot: string;
  emulator: boolean;
}

export enum LogLevels {
  /**
   * Logging disabled
   */
  disabled = 0,
  /**
   * Only log errors
   */
  error = 1,
  /**
   * Log errors and warnings
   */
  warning = 2,
  /**
   * Log errors, warnings and info
   */
  info = 3,
  /**
   * Verbose logging, which keeps everything in log with timestamps
   * and also log http requests to dev server.
   */
  verbose = 4,
  /**
   * Debug logging active, which saves everything to a file with
   * timestamps.
   */
  debug = 5,
}

export interface BundleDetails {
  dir: string;
  name: string;
  hash: string;
}

export interface Bundler {
  readonly bundle: BundleDetails;
  start(): void;
  on(cb: (args: any) => void): void;
  off(cb: (args: any) => void): void;
  ready(): Promise<void>;
}

export interface ReleaseProvider {
  (directory: string, files: Array<string>, args: Record<string, string>, interactive: boolean): Promise<void>;
}

export interface TemplateFileLocation {
  from: string;
  to: string;
  deep?: boolean;
  once?: boolean;
}

export interface PiletsInfo {
  files: Array<string | TemplateFileLocation>;
  template: string;
  externals?: Array<string>;
  devDependencies: Record<string, string | true>;
  scripts: Record<string, string>;
  validators: Record<string, any>;
  packageOverrides: Record<string, any>;
  preScaffold: string;
  postScaffold: string;
  preUpgrade: string;
  postUpgrade: string;
}

export interface RuleContext {
  error(message: string): void;
  warning(message: string): void;
  logLevel?: LogLevels;
  root: string;
  entry: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

export interface SharedDependency {
  id: string;
  requireId: string;
  name: string;
  ref: string;
  type: 'local' | 'remote';
  entry: string;
  parents?: Array<string>;
}

export interface RuleRunner<T extends RuleContext> {
  (context: T, options: any): void | Promise<void>;
}

export interface Rule<T extends RuleContext> {
  run: RuleRunner<T>;
  name: string;
}

export interface PiralRuleContext extends RuleContext {
  info: PiletsInfo;
}

export interface PiletRuleContext extends RuleContext {
  apps: Array<AppDefinition>;
  piletPackage: any;
  peerModules: Array<string>;
  importmap: Array<SharedDependency>;
}
