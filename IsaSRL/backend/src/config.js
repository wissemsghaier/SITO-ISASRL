const fs = require("fs");

function readSecretFile(filePath) {
  if (!filePath) {
    return "";
  }

  try {
    const content = fs.readFileSync(filePath, "utf8").trim();
    return content;
  } catch {
    return "";
  }
}

function getConfigValue(name, fallback = "") {
  const fileValue = readSecretFile(process.env[`${name}_FILE`]);
  if (fileValue) {
    return fileValue;
  }

  const directValue = process.env[name];
  if (typeof directValue === "string" && directValue.trim()) {
    return directValue.trim();
  }

  return fallback;
}

module.exports = {
  getConfigValue,
};
