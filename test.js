const test = require('ava');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const TEMP_DIRECTORY = path.resolve('./.tmp');
const CLI_PATH = path.resolve('./cli.js');
const PROJECT_NAME = 'test_project';

test.before(t => {
  if (!fs.existsSync(TEMP_DIRECTORY)) {
    fs.mkdirSync(TEMP_DIRECTORY);
  }
});

test.after.always(t => {
  rimraf.sync(TEMP_DIRECTORY);
});

test('creates new project in expected folder', async t => {
  await exec(`cd ${TEMP_DIRECTORY} && ${CLI_PATH} ${PROJECT_NAME}`);

  const projectFolder = path.join(TEMP_DIRECTORY, PROJECT_NAME);
  t.is(fs.existsSync(projectFolder), true);

  const projectPackage = path.join(projectFolder, 'package.json');
  t.is(fs.existsSync(projectPackage), true);

  const projectGitignore = path.join(projectFolder, '.gitignore');
  t.is(fs.existsSync(projectGitignore), true);
});

test('errors when no project name is provided', async t => {
  await t.throwsAsync(exec(`cd ${TEMP_DIRECTORY} && ${CLI_PATH}`), {
    message: /Please specify the project directory/,
  });
});
