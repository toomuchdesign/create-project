const path = require('path');
const fs = require('fs-extra');

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

  fs.copySync(templatePath, projectPath);
  fs.renameSync(
    path.join(projectPath, '_package.json'),
    path.join(projectPath, 'package.json')
  );

  console.log(`Project copied in "${projectName}"!`);
};
