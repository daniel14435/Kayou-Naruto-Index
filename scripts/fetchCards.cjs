/**
 * Naruto Kayou Card Data Fetcher
 * 
 * Investigates and fetches card data from public sources:
 * - CollectorVerse (primary)
 * - Narutopia.fr (secondary)
 * - Capsule Corp Gear (tertiary/reference)
 * 
 * Preferences: JSON/API > HTML scraping > manual entry
 * 
 * Output:
 * - src/data/narutoCards.json (final card data)
 * - src/data/narutoCards.fetch-report.json (metadata & counts)
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  timeout: 15000,
  politeDelay: 1000, // ms between requests
  retryAttempts: 2,
};

const SOURCES = {
  collectorverse: {
    name: 'CollectorVerse',
    priority: 1,
    urls: [
      'https://www.collectorverse.io/naruto-kayou-cards',
      'https://www.collectorverse.io/api/cards?game=naruto-kayou',
      'https://www.collectorverse.io/',
    ],
  },
  narutopia: {
    name: 'Narutopia.fr',
    priority: 2,
    urls: [
      'https://narutopia.fr/liste-des-cartes-naruto-kayou/',
    ],
  },
  capsulecorp: {
    name: 'Capsule Corp Gear',
    priority: 3,
    urls: [
      'https://capsulecorpgear.com/naruto-kayou-card-list/',
    ],
  },
};

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'narutoCards.json');
const REPORT_FILE = path.join(OUTPUT_DIR, 'narutoCards.fetch-report.json');

// ============================================================================
// Utilities
// ============================================================================

const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
  success: (msg) => console.log(`[✓] ${msg}`),
  debug: (msg) => process.env.DEBUG ? console.log(`[DEBUG] ${msg}`) : null,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createAxiosInstance = () =>
  axios.create({
    timeout: CONFIG.timeout,
    headers: {
      'User-Agent': CONFIG.userAgent,
      'Accept': 'application/json, text/html;q=0.9, */*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
    },
  });

const fetchWithRetry = async (url, { isJSON = false } = {}) => {
  const client = createAxiosInstance();
  for (let attempt = 0; attempt < CONFIG.retryAttempts; attempt++) {
    try {
      log.debug(`Fetching (attempt ${attempt + 1}): ${url}`);
      const response = await client.get(url);
      
      if (isJSON && typeof response.data === 'string') {
        return JSON.parse(response.data);
      }
      return response.data;
    } catch (err) {
      if (attempt < CONFIG.retryAttempts - 1) {
        log.warn(`Attempt ${attempt + 1} failed for ${url}, retrying...`);
        await sleep(CONFIG.politeDelay * (attempt + 1));
      } else {
        throw err;
      }
    }
  }
};

const normalizeCardNumber = (str) => {
  if (!str || typeof str !== 'string') return null;
  // Match patterns like "BP-001", "SE-024", "NR-001", etc.
  const match = str.trim().match(/^([A-Z]{1,4})-(\d{3,4})$/i);
  return match ? `${match[1].toUpperCase()}-${match[2]}` : null;
};

const normalizeRarity = (str) => {
  if (!str) return null;
  const rarityMap = {
    'C': 'C', 'Common': 'C',
    'R': 'R', 'Rare': 'R',
    'SR': 'SR', 'Super Rare': 'SR',
    'SSR': 'SSR', 'Super Super Rare': 'SSR',
    'UR': 'UR', 'Ultra Rare': 'UR',
    'SP': 'SP', 'Special': 'SP',
    'CR': 'CR', 'Collector Rare': 'CR',
    'AR': 'AR', 'Art Rare': 'AR',
    'BP': 'BP', 'Box Pull': 'BP',
    'MR': 'MR', 'Master Rare': 'MR',
    'OR': 'OR', 'Omega Rare': 'OR',
    'GP': 'GP', 'Gold Promo': 'GP',
    'SE': 'SE', 'Serialized/Special Edition': 'SE',
    'NR': 'NR', 'Numbered Rare': 'NR',
    'ZR': 'ZR', 'Z-Rare': 'ZR',
  };
  const normalized = str.trim().toUpperCase();
  return rarityMap[normalized] || (Object.keys(rarityMap).includes(normalized) ? rarityMap[normalized] : null);
};

const normalizeTier = (str) => {
  if (!str) return null;
  const match = String(str).match(/[1-4]/);
  return match ? parseInt(match[0], 10) : null;
};

const normalizeWave = (str) => {
  if (!str) return null;
  const match = String(str).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

const validateCard = (card) => {
  return !!(
    (card.cardNumber && typeof card.cardNumber === 'string') ||
    (card.imageUrl && typeof card.imageUrl === 'string')
  );
};

// ============================================================================
// Source Fetchers
// ============================================================================

const fetchCollectorVerse = async () => {
  const results = [];
  const report = {
    source: SOURCES.collectorverse.name,
    attempts: 0,
    successful: false,
    cardsFound: 0,
    errors: [],
  };

  log.info(`Investigating ${SOURCES.collectorverse.name}...`);

  for (const url of SOURCES.collectorverse.urls) {
    report.attempts++;
    try {
      log.debug(`Attempting: ${url}`);
      const data = await fetchWithRetry(url, { isJSON: url.includes('/api/') });
      await sleep(CONFIG.politeDelay);

      // Try API response format
      if (Array.isArray(data)) {
        log.success(`CollectorVerse API returned JSON array with ${data.length} items`);
        const parsed = data.map((card) => ({
          cardNumber: normalizeCardNumber(card.cardNumber || card.number || card.id),
          characterName: card.characterName || card.character || card.name || null,
          tier: normalizeTier(card.tier),
          wave: normalizeWave(card.wave),
          rarity: normalizeRarity(card.rarity),
          imageUrl: card.imageUrl || card.image || null,
          sourcePage: url,
          sourceName: SOURCES.collectorverse.name,
        }));
        results.push(...parsed.filter(validateCard));
        report.successful = true;
        report.cardsFound = results.length;
        return { results, report };
      }

      // Try API response format (nested)
      if (data.data && Array.isArray(data.data)) {
        log.success(`CollectorVerse API returned nested data with ${data.data.length} items`);
        const parsed = data.data.map((card) => ({
          cardNumber: normalizeCardNumber(card.cardNumber || card.number),
          characterName: card.characterName || card.character || null,
          tier: normalizeTier(card.tier),
          wave: normalizeWave(card.wave),
          rarity: normalizeRarity(card.rarity),
          imageUrl: card.imageUrl || card.image || null,
          sourcePage: url,
          sourceName: SOURCES.collectorverse.name,
        }));
        results.push(...parsed.filter(validateCard));
        report.successful = true;
        report.cardsFound = results.length;
        return { results, report };
      }

      // Try HTML scraping
      if (typeof data === 'string') {
        log.debug('Received HTML, attempting to parse...');
        const $ = cheerio.load(data);
        const parsed = [];

        // Look for common patterns: data-*, data attributes, tables, lists
        $('[data-card-id], [data-card-number], .card-item, .card-row, tr[data-card], .card').each(
          (idx, elem) => {
            const $elem = $(elem);
            const card = {
              cardNumber: normalizeCardNumber(
                $elem.attr('data-card-id') ||
                $elem.attr('data-card-number') ||
                $elem.find('[data-card-id]').attr('data-card-id') ||
                $elem.text()
              ),
              characterName: $elem.attr('data-character') || $elem.find('[data-character]').text() || null,
              tier: normalizeTier($elem.attr('data-tier') || $elem.find('[data-tier]').text()),
              wave: normalizeWave($elem.attr('data-wave') || $elem.find('[data-wave]').text()),
              rarity: normalizeRarity($elem.attr('data-rarity') || $elem.find('[data-rarity]').text()),
              imageUrl: $elem.attr('data-image') || $elem.find('img').attr('src') || null,
              sourcePage: url,
              sourceName: SOURCES.collectorverse.name,
            };
            if (validateCard(card)) {
              parsed.push(card);
            }
          }
        );

        if (parsed.length > 0) {
          log.success(`CollectorVerse HTML scraping found ${parsed.length} cards`);
          results.push(...parsed);
          report.successful = true;
          report.cardsFound = results.length;
          return { results, report };
        }
      }
    } catch (err) {
      report.errors.push({
        url,
        message: err.message,
        status: err.response?.status,
      });
      log.warn(`CollectorVerse fetch failed for ${url}: ${err.message}`);
    }
  }

  if (results.length === 0) {
    log.warn('CollectorVerse: No accessible data found via API or public HTML');
  }

  return { results, report };
};

const fetchNarutopia = async () => {
  const results = [];
  const report = {
    source: SOURCES.narutopia.name,
    attempts: 0,
    successful: false,
    cardsFound: 0,
    errors: [],
  };

  log.info(`Investigating ${SOURCES.narutopia.name}...`);

  for (const url of SOURCES.narutopia.urls) {
    report.attempts++;
    try {
      log.debug(`Attempting: ${url}`);
      const html = await fetchWithRetry(url);
      await sleep(CONFIG.politeDelay);

      const $ = cheerio.load(html);
      const parsed = [];

      // Look for tables or lists with card data
      $('table tr, .card-item, .card-row, .card').each((idx, elem) => {
        const $elem = $(elem);
        const text = $elem.text();
        const cells = $elem.find('td, .cell, [data-col]');

        // Extract from table cells or structured elements
        let cardNumber = null;
        let characterName = null;
        let rarity = null;
        let imageUrl = null;

        cells.each((i, cell) => {
          const $cell = $(cell);
          const cellText = $cell.text().trim();
          const cellImg = $cell.find('img').attr('src');

          if (!cardNumber && /^[A-Z]{1,4}-\d{3,4}$/i.test(cellText)) {
            cardNumber = cellText;
          }
          if (!rarity && normalizeRarity(cellText)) {
            rarity = cellText;
          }
          if (!imageUrl && cellImg && cellImg.includes('kayou')) {
            imageUrl = cellImg.startsWith('http') ? cellImg : new URL(cellImg, url).href;
          }
        });

        // Also try to extract character from link text or nearby elements
        characterName = $elem.find('a').first().text().trim() || null;

        const card = {
          cardNumber: normalizeCardNumber(cardNumber),
          characterName,
          tier: normalizeTier(text),
          wave: normalizeWave(text),
          rarity: normalizeRarity(rarity),
          imageUrl,
          sourcePage: url,
          sourceName: SOURCES.narutopia.name,
        };

        if (validateCard(card)) {
          parsed.push(card);
        }
      });

      if (parsed.length > 0) {
        log.success(`Narutopia found ${parsed.length} cards`);
        results.push(...parsed);
        report.successful = true;
        report.cardsFound = results.length;
      } else {
        log.warn('Narutopia: Page scraped but no structured card data found');
      }
    } catch (err) {
      report.errors.push({
        url,
        message: err.message,
        status: err.response?.status,
      });
      log.warn(`Narutopia fetch failed: ${err.message}`);
    }
  }

  return { results, report };
};

const fetchCapsuleCorpGear = async () => {
  const results = [];
  const report = {
    source: SOURCES.capsulecorp.name,
    attempts: 0,
    successful: false,
    cardsFound: 0,
    errors: [],
    note: 'Reference source only - we already have sourced data from this source',
  };

  log.info(`Investigating ${SOURCES.capsulecorp.name} (reference)...`);

  for (const url of SOURCES.capsulecorp.urls) {
    report.attempts++;
    try {
      log.debug(`Attempting: ${url}`);
      const html = await fetchWithRetry(url);
      await sleep(CONFIG.politeDelay);

      const $ = cheerio.load(html);
      const parsed = [];

      // Capsule Corp Gear likely has structured tables
      $('table tbody tr, .card-list .card, .cards-grid .card').each((idx, elem) => {
        const $elem = $(elem);
        const cells = $elem.find('td');

        if (cells.length === 0) return; // Skip if no table cells

        let cardNumber = null;
        let characterName = null;
        let rarity = null;
        let imageUrl = null;

        cells.each((i, cell) => {
          const $cell = $(cell);
          const cellText = $cell.text().trim();
          const cellImg = $cell.find('img').attr('src');

          if (!cardNumber && /^[A-Z]{1,4}-\d{3,4}$/i.test(cellText)) {
            cardNumber = cellText;
          }
          if (!characterName && cellText.length > 3 && cellText.length < 50) {
            characterName = cellText;
          }
          if (!rarity && normalizeRarity(cellText)) {
            rarity = cellText;
          }
          if (!imageUrl && cellImg) {
            imageUrl = cellImg.startsWith('http') ? cellImg : new URL(cellImg, url).href;
          }
        });

        const card = {
          cardNumber: normalizeCardNumber(cardNumber),
          characterName,
          tier: normalizeTier($elem.text()),
          wave: normalizeWave($elem.text()),
          rarity: normalizeRarity(rarity),
          imageUrl,
          sourcePage: url,
          sourceName: SOURCES.capsulecorp.name,
        };

        if (validateCard(card)) {
          parsed.push(card);
        }
      });

      if (parsed.length > 0) {
        log.success(`Capsule Corp Gear found ${parsed.length} cards`);
        results.push(...parsed);
        report.successful = true;
        report.cardsFound = results.length;
      }
    } catch (err) {
      report.errors.push({
        url,
        message: err.message,
        status: err.response?.status,
      });
      log.warn(`Capsule Corp Gear fetch failed: ${err.message}`);
    }
  }

  return { results, report };
};

// ============================================================================
// Main
// ============================================================================

const main = async () => {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║     Naruto Kayou Card Data Fetcher - Investigation Phase       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const allResults = [];
  const allReports = [];

  try {
    // Fetch from all sources
    log.info('Starting fetch from all sources...\n');

    const cv = await fetchCollectorVerse();
    allResults.push(...cv.results);
    allReports.push(cv.report);
    await sleep(CONFIG.politeDelay);

    const nt = await fetchNarutopia();
    allResults.push(...nt.results);
    allReports.push(nt.report);
    await sleep(CONFIG.politeDelay);

    const ccg = await fetchCapsuleCorpGear();
    allResults.push(...ccg.results);
    allReports.push(ccg.report);

    // Deduplicate by cardNumber
    const seen = new Set();
    const deduped = allResults.filter((card) => {
      const key = `${card.cardNumber}-${card.imageUrl}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    log.info(`\nDeduplication: ${allResults.length} total → ${deduped.length} unique`);

    // Generate report
    const generatedReport = {
      timestamp: new Date().toISOString(),
      totalCards: deduped.length,
      totalSkipped: allResults.length - deduped.length,
      sources: allReports,
      summary: {
        successful: allReports.filter((r) => r.successful).length,
        failed: allReports.filter((r) => !r.successful).length,
      },
    };

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      log.success(`Created output directory: ${OUTPUT_DIR}`);
    }

    // Write output files
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(deduped, null, 2), 'utf-8');
    fs.writeFileSync(REPORT_FILE, JSON.stringify(generatedReport, null, 2), 'utf-8');

    log.success(`\nResults written to: ${OUTPUT_FILE}`);
    log.success(`Report written to: ${REPORT_FILE}`);

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    Fetch Complete                             ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('Summary:');
    console.log(`  Total cards found: ${deduped.length}`);
    console.log(`  Successful sources: ${generatedReport.summary.successful}`);
    console.log(`  Failed sources: ${generatedReport.summary.failed}`);
    console.log(`\nFiles created:`);
    console.log(`  - ${path.relative(process.cwd(), OUTPUT_FILE)}`);
    console.log(`  - ${path.relative(process.cwd(), REPORT_FILE)}\n`);
  } catch (err) {
    log.error(`Fatal error: ${err.message}`);
    process.exit(1);
  }
};

main();
