# Naruto Kayou Card Data Fetcher

Data investigation script for collecting card information from public sources.

## Purpose

This script investigates public sources to fetch Naruto Kayou card data without modifying the application runtime or existing sourced datasets.

**Output files:**
- `src/data/narutoCards.json` — Fetched card data (for review)
- `src/data/narutoCards.fetch-report.json` — Metadata and statistics

## Sources Investigated (in priority order)

1. **CollectorVerse** — Primary source
   - Attempts API endpoint first, falls back to HTML scraping
   
2. **Narutopia.fr** — Secondary source  
   - French community resource
   
3. **Capsule Corp Gear** — Reference source
   - Already used for our sourced dataset; included for comparison

## How It Works

1. **API-first approach**: Checks for public JSON/API endpoints
2. **Polite scraping**: If no API, scrapes visible HTML (no login/paywall bypass)
3. **Data cleaning**: Normalizes card numbers, rarities, tiers, waves
4. **Deduplication**: Removes duplicate entries across sources
5. **Report generation**: Creates summary of successful/failed attempts

## Dependencies

Install required Node.js packages:

```bash
npm install axios cheerio
```

## How to Run

From the project root:

```bash
node scripts/fetchCards.js
```

Optional: Enable debug logging:

```bash
DEBUG=1 node scripts/fetchCards.js
```

## Environment

- **Node.js version**: 14+ recommended
- **User-Agent**: Includes legitimate browser identifier
- **Polite delays**: 1 second between requests to each source
- **Timeout**: 15 seconds per request
- **Retries**: Up to 2 attempts per URL on failure

## Output Format

### narutoCards.json

Array of card objects:

```json
[
  {
    "cardNumber": "BP-001",
    "characterName": "Obito Uchiha",
    "tier": 4,
    "wave": 2,
    "rarity": "BP",
    "imageUrl": "https://...",
    "sourcePage": "https://collectorverse.io/...",
    "sourceName": "CollectorVerse"
  }
]
```

### narutoCards.fetch-report.json

Metadata and statistics:

```json
{
  "timestamp": "2026-05-30T...",
  "totalCards": 245,
  "totalSkipped": 12,
  "sources": [
    {
      "source": "CollectorVerse",
      "attempts": 1,
      "successful": true,
      "cardsFound": 180,
      "errors": []
    }
  ],
  "summary": {
    "successful": 1,
    "failed": 2
  }
}
```

## Data Cleaning Rules

- **Keep**: Rows with cardNumber OR imageUrl
- **Normalize**: Card numbers to `XXX-000` format
- **Skip**: Incomplete/empty rows

## Important Notes

✅ **Safe:** Non-destructive investigation only
✅ **Respectful:** Honors rate limits, no anti-bot bypass
✅ **Isolated:** Does not modify app runtime or existing data
❌ **No login bypass**: Stops at paywall/authentication
❌ **No changes**: Won't edit cards.ts, cardAvailability.ts, or pack pages

## Next Steps

After running:
1. Review `src/data/narutoCards.json` for data quality
2. Review `src/data/narutoCards.fetch-report.json` for success/failure metrics
3. If satisfied, next step: Integrate into cards.ts/cardAvailability.ts (separate task)
