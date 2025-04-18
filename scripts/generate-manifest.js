const fs = require("fs");
const path = require("path");

// Load environment variables from .env.local
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

const templatePath = path.join(
  process.cwd(),
  "public",
  "manifest.template.json"
);
const outputPath = path.join(process.cwd(), "public", "manifest.json");

// Read the template file
fs.readFile(templatePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading manifest template:", err);
    process.exit(1); // Exit with error
  }

  // Get environment variable (use fallback if not set)
  const authorName = process.env.AUTHOR_NAME || "Default Name";
  // You could add AUTHOR_SHORT_NAME here if needed
  // const authorShortName = process.env.AUTHOR_SHORT_NAME || authorName;

  // Replace placeholders
  let result = data.replace(/__AUTHOR_NAME__/g, authorName);
  // result = result.replace(/__AUTHOR_SHORT_NAME__/g, authorShortName); // Uncomment if using short name

  // Write the final manifest.json file
  fs.writeFile(outputPath, result, "utf8", (err) => {
    if (err) {
      console.error("Error writing final manifest.json:", err);
      process.exit(1); // Exit with error
    }
    console.log("manifest.json generated successfully!");
  });
});
