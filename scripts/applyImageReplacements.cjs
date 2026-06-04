const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const reportPath = path.join(root, "src", "data", "imageReplacementReport.json");
const cardsPath = path.join(root, "src", "data", "cards.ts");

const reportText = fs.readFileSync(reportPath, "utf8");
const report = JSON.parse(reportText);
const allowedSets = new Set(["T1W1", "T1W2", "T1W3", "T1W4", "T4W4", "T4W5"]);
const exactReplacements = (report.safeReplacements || []).filter(
  (item) => item.matchConfidence === "exact" && allowedSets.has(item.sourceSet)
);

if (!exactReplacements.length) {
  throw new Error("No exact replacements found for T1W1/T1W2/T1W3/T1W4/T4W4/T4W5.");
}

const counts = exactReplacements.reduce((acc, item) => {
  acc[item.sourceSet] = (acc[item.sourceSet] || 0) + 1;
  return acc;
}, {});

console.log("Replacement counts per set:");
["T1W1", "T1W2", "T1W3", "T1W4", "T4W4", "T4W5"].forEach((set) => {
  console.log(`${set}: ${counts[set] || 0}`);
});

const overrides = exactReplacements.reduce((acc, item) => {
  let cardId = item.localCardId || `${item.sourceSet.toLowerCase()}__${item.cardNumber}`;
  if (typeof cardId === "string") {
    cardId = cardId.replace(/^[^_]+/, (prefix) => prefix.toLowerCase());
  }
  acc[cardId] = item.newImageUrl;
  return acc;
}, {});

const cardsText = fs.readFileSync(cardsPath, "utf8");
const overrideText = `const exactSourceImageOverrides = ${JSON.stringify(overrides, null, 2)};\n\n`;

let newCardsText = cardsText;
const existingOverrideBlock = /const exactSourceImageOverrides = \{[\s\S]*?\};\n\n/;
if (existingOverrideBlock.test(cardsText)) {
  newCardsText = cardsText.replace(existingOverrideBlock, overrideText);
} else {
  const insertAfter = "import realNarutoNr001 from \"@/assets/real-naruto-nr-001.png\";\n\n";
  const insertIndex = cardsText.indexOf(insertAfter);
  if (insertIndex === -1) {
    throw new Error("Could not find insert location in cards.ts.");
  }
  newCardsText =
    cardsText.slice(0, insertIndex + insertAfter.length) +
    overrideText +
    cardsText.slice(insertIndex + insertAfter.length);
}

const oldImageLine = "  image: `${SOURCE_IMAGE_BASE}${s.imageFile}`,";
const newImageLine =
  "  image: exactSourceImageOverrides[`$\{s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,";

const occurrences = (newCardsText.match(new RegExp(oldImageLine.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g")) || []).length;
if (occurrences > 0) {
  newCardsText = newCardsText.replace(
    new RegExp(oldImageLine.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
    newImageLine
  );
  console.log(`Converted ${occurrences} legacy source image lines to exact override lookups.`);
} else {
  console.log("No legacy source image lines to replace; cards.ts already uses exactSourceImageOverrides.");
}

fs.writeFileSync(cardsPath, newCardsText, "utf8");
console.log(`Updated ${cardsPath} with exact image URL overrides.`);
