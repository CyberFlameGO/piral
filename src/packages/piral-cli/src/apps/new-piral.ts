import { resolve, basename } from 'path';
import { LogLevels, ForceOverwrite, PiletLanguage, TemplateType, Framework } from '../types';
import {
  installPackage,
  updateExistingJson,
  getPiralPackage,
  scaffoldPiralSourceFiles,
  createDirectory,
  createFileIfNotExists,
  logDone,
  installDependencies,
  combinePackageRef,
  setLogLevel,
  fail,
  progress,
} from '../common';

export interface NewPiralOptions {
  app?: string;
  framework?: Framework;
  target?: string;
  version?: string;
  forceOverwrite?: ForceOverwrite;
  language?: PiletLanguage;
  install?: boolean;
  template?: TemplateType;
  logLevel?: LogLevels;
}

export const newPiralDefaults: NewPiralOptions = {
  app: './src/index.html',
  framework: 'piral',
  target: '.',
  version: 'latest',
  forceOverwrite: ForceOverwrite.no,
  language: PiletLanguage.ts,
  install: true,
  template: 'default',
  logLevel: LogLevels.info,
};

export async function newPiral(baseDir = process.cwd(), options: NewPiralOptions = {}) {
  const {
    app = newPiralDefaults.app,
    framework = newPiralDefaults.framework,
    target = newPiralDefaults.target,
    version = newPiralDefaults.version,
    forceOverwrite = newPiralDefaults.forceOverwrite,
    language = newPiralDefaults.language,
    install = newPiralDefaults.install,
    template = newPiralDefaults.template,
    logLevel = newPiralDefaults.logLevel,
  } = options;
  setLogLevel(logLevel);
  progress('Preparing source and target ...');
  const root = resolve(baseDir, target);
  const success = await createDirectory(root);

  if (success) {
    const packageRef = combinePackageRef(framework, version, 'registry');

    progress(`Creating a new Piral instance in %s ...`, root);

    await createFileIfNotExists(
      root,
      'package.json',
      JSON.stringify(
        {
          name: basename(root),
          version: '1.0.0',
          description: '',
          keywords: ['piral'],
          dependencies: {},
          scripts: {},
        },
        undefined,
        2,
      ),
    );

    await updateExistingJson(root, 'package.json', getPiralPackage(app, language, version, framework));

    progress(`Installing NPM package ${packageRef} ...`);

    await installPackage(packageRef, root, '--no-package-lock');

    progress(`Taking care of templating ...`);

    await scaffoldPiralSourceFiles(template, language, root, app, framework, forceOverwrite);

    if (install) {
      progress(`Installing dependencies ...`);
      await installDependencies(root, '--no-package-lock');
    }

    logDone(`Piral instance scaffolded successfully!`);
  } else {
    fail('cannotCreateDirectory_0044');
  }
}
