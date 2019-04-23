#! /usr/bin/env node

const program = require('commander');
const createProject = require('./index.js');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .arguments('<project-directory>')
  .usage('<project-directory>')
  .parse(process.argv);

createProject(program.args[0]);
