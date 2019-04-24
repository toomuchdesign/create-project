const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;

module.exports = function createProject(projectName) {
  if (!projectName) {
    throw new Error('Please specify the project directory');
  }

  if (fs.existsSync(projectName)) {
    throw new Error(
      `Looks like there's already a directory called "${projectName}"`
    );
  }

  const templatePath = path.resolve(__dirname, './template');
  const projectPath = process.cwd() + '/' + projectName;

  ncp(templatePath, projectPath, function(err) {
    if (err) {
      throw err;
    }
  });

  console.log(`Project copied in "${projectName}"!`);
};
