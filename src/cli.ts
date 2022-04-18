#! /usr/bin/env node

// @ts-ignore
import * as yargs from 'yargs';
// @ts-ignore
import * as path from 'path';
// @ts-ignore
import fse from 'fs-extra';
import { name as packageName, license as packageLicense } from '../package.json';
// @ts-ignore
const { exec } = require('child_process');

const featuresList: string[] = ['all', 'basic'];
const featuresListDetailed: string[] = ['all (basic + docker support including Dockerfile, docker-compose)', 'basic'];

const featuresArguments: yargs.Options = {
  alias: 'f',
  describe: `Determines node requires features. Available options are: ${featuresListDetailed.join(', ')}`,
  required: true,
  type: 'string',
};

// @ts-ignore
if (!module.parent) {
  initializeCommands();
}

function initializeCommands(): void {
  // const cliRunnableFileName: string = 'cli.js';
  const cliCommandName: string = 'node-skeleton';

  // @ts-ignore
  // eslint-disable-next-line no-unused-expressions
  yargs
    .usage(`Usage: ${cliCommandName} <command> [options]`)
    // .usage('Usage: $0 <command> [options]')
    .demandOption(['features'])
    .demand(1)
    .command('generate', 'Generates node skeleton project in current folder', {
      features: featuresArguments,
    }, generateProject as any)
    .option('features', featuresArguments)
    .example(`${cliCommandName} generate --features all`, 'Generates full node skeleton project for you') // $0
    .help('help')
    .alias('help', 'h')
    .epilog(`Package license ${packageLicense}`)
    /* .parse('', (_err: any, _argv: any, output: any) => {
      if (output) {
        const result: string = output.replace(cliRunnableFileName, cliCommandName);
        console.log(result);
      }
    }) */
    .argv;
}

async function generateProject(): Promise<void> {
  const { features } = yargs.argv;
  if (!features) {
    console.log('Missing --features argument value');
    return;
  }

  const generatedPackageName: string = 'my-node-project';
  try {
    switch (features) {
      case 'all':
        console.log('Project is generating...');
        await HandlesFeatureAll('build/data/', generatedPackageName);
        console.log(`Congratulations!!! You've your new node-skeleton project at "${generatedPackageName}" folder`);
        break;
      case 'basic':
        console.log('Project is generating...');
        await HandlesFeatureBasic('build/data/', generatedPackageName);
        console.log(`Congratulations!!! You've your new node-skeleton project at "${generatedPackageName}" folder`);
        break;
      default:
        console.log(`Please enter a valid --features value (${featuresList.join(' or ')})`);
        break;
    }
  } catch (err) {
    //
  }
}

async function getModulePath(): Promise<string> {
  // import * as appRoot from 'app-root-path';
  // path.normalize(appRoot.path)

  return new Promise((resolve: any, reject: any) => {
    // @ts-ignore
    exec(`npm ls -g ${packageName} --parseable`, (err: any, stdout: string, stderr: any) => {
      if (!err) {
        resolve(stdout.trim()); // -> /Users/me/my-project/node_modules/my-dep
        return;
      }
      const errMessage: string = `Can't find global ${packageName} package path. `
        + `Verify you've an updated ${packageName} version installed globally (npm i -g ${packageName})`;
      // console.log(errMessage);
      reject(errMessage);
    });
  });
}

async function HandlesFeatureBasic(srcFolder: string, targetFolder: string): Promise<void> {
  const normalizedAppRootPath: string = await getModulePath();
  const srcfiles1: string = srcFolder;
  const copyFromAbsolutePath1: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles1)}`;

  /* // Need to copy .npmignore file, otherwise, it doesn't copied
  const srcfiles2: string = `${srcFolder}${path.sep}.npmignore`;
  const copyFromAbsolutePath2: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles2)}`;
  // Need to copy .gitignore file, otherwise, it doesn't copied
  const srcfiles3: string = `${srcFolder}${path.sep}.gitignore`;
  const copyFromAbsolutePath3: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles3)}`; */
  const targetfiles: string = path.normalize(`${targetFolder}/`);
  await copyFilesandFolders([copyFromAbsolutePath1, /* copyFromAbsolutePath2, copyFromAbsolutePath3 */], targetfiles, true);
}

async function HandlesFeatureAll(srcFolder: string, targetFolder: string): Promise<void> {
  await HandlesFeatureBasic(srcFolder, targetFolder);
  // console.log(`appRoot = ${appRoot}`);
  // const workingDir: string = process.cwd();

  // console.log('workingDir', workingDir);
  const normalizedAppRootPath: string = await getModulePath();
  const srcfiles1: string = `${srcFolder}.dockerignore`;
  const copyFromAbsolutePath1: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles1)}`;
  const srcfiles2: string = `${srcFolder}/Dockerfile`;
  const copyFromAbsolutePath2: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles2)}`;
  const srcfiles3: string = `${srcFolder}/docker-compose.yml`;
  const copyFromAbsolutePath3: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles3)}`;
  const targetfiles: string = path.normalize(`${targetFolder}`);
  // console.log(`Copy from absolute path: ${copyFromAbsolutePath}`);
  // console.log(`Copy to: ${targetfiles}`);

  await copyFilesandFolders([copyFromAbsolutePath1, copyFromAbsolutePath2, copyFromAbsolutePath3], targetfiles, false);
}

async function copyFilesandFolders(fromList: string[], to: string, isFolder: boolean): Promise<void> {
  const customToWithoutSep: string = (to[to.length - 1] === path.sep) ? to.substr(0, to.length - 1) : to;
  for (let i = 0; i < fromList.length; i++) {
    try {
      const customTo: string = isFolder
        ? customToWithoutSep : customToWithoutSep
        + path.sep + fromList[i].substr(fromList[i].lastIndexOf(path.sep) + 1);

      // console.log(`from ${fromList[i]}`);
      // console.log(`to ${customTo}`);

      // eslint-disable-next-line no-await-in-loop
      await fse.copy(fromList[i], customTo);
      if (isFolder) {
        console.log('Folder copied successfully!');
      } else {
        console.log('File copied successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  }
}
