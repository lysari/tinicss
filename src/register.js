// Require file system modules
const FileSystem = require("fs");
const Path = require("path");

// Folder path
const folderPath = Path.join(__dirname, "assets");

// Function to import files recursively
function importFiles(dirPath) {
  const files = FileSystem.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = Path.join(dirPath, file);
    const stat = FileSystem.statSync(filePath);

    if (stat.isFile() && file.endsWith(".js")) {
      require(filePath);
    } else if (stat.isDirectory()) {
      importFiles(filePath);
    }
  });
}

// Import files
importFiles(folderPath);

// Get imported module exports
const modules = Object.keys(require.cache)
  .filter((key) => key.includes(folderPath))
  .map((key) => require(key));

// Re-export all modules
module.exports = {
  ...modules.reduce((acc, module) => ({ ...acc, ...module }), {}),
};
