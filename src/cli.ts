#! /usr/bin/env node

import * as yargs from 'yargs';
// @ts-ignore
import * as appRoot from 'app-root-path';
// @ts-ignore
import * as path from 'path';
// @ts-ignore
import fse from 'fs-extra';
import { name as packageName, license as pacakgeLicense } from '../package.json';

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
  // eslint-disable-next-line no-unused-expressions
  yargs
    .usage('Usage: $0 <command> [options]')
    // .usage(`Usage: ${packageName} <command> [options]`)
    .demandOption(['features'])
    .demand(1)
    .command('generate', 'Generates node skeleton project in current folder', {
      features: featuresArguments,
    }, generateProject as any)
    .option('features', featuresArguments)
    .example('$0 generate --features all', 'Generates full node skeleton project for you')
    .help('help')
    .alias('help', 'h')
    .epilog(`Package license ${pacakgeLicense}`)
    .argv;
}

async function generateProject(): Promise<void> {
  const { features } = yargs.argv;
  if (!features) {
    console.log('Missing --features argument value');
    return;
  }

  try {
    switch (features) {
      case 'all':
        console.log('Project is generating...');
        HandlesFeatureAll('data/', `${packageName}-generated`);
        break;
      case 'basic':
        console.log('Project is generating...');
        HandlesFeatureBasic('data/', `${packageName}-generated`);
        break;
      default:
        console.log(`Please enter a valid --features value (${featuresList.join(' or ')})`);
        break;
    }
  } catch (err) {
    //
  }
}

async function HandlesFeatureBasic(srcFolder: string, targetFolder: string): Promise<void> {
  const normalizedAppRootPath: string = path.normalize(appRoot.path);
  const srcfiles1: string = srcFolder;
  const copyFromAbsolutePath1: string = `${normalizedAppRootPath}${path.sep}${path.normalize(srcfiles1)}`;
  const targetfiles: string = path.normalize(`${targetFolder}/`);
  await copyFilesandFolders([copyFromAbsolutePath1], targetfiles, true);
}

async function HandlesFeatureAll(srcFolder: string, targetFolder: string): Promise<void> {
  await HandlesFeatureBasic(srcFolder, targetFolder);
  // console.log(`appRoot = ${appRoot}`);
  // const workingDir: string = process.cwd();

  // console.log('workingDir', workingDir);
  const normalizedAppRootPath: string = path.normalize(appRoot.path);
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

      console.log(`from ${fromList[i]}`);
      console.log(`to ${customTo}`);

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
