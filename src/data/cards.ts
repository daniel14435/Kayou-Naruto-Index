import type { Card } from "./types";
import { packs } from "./packs";
import { sourcedCardsBySeries, SOURCE_IMAGE_BASE, SOURCE_PAGE } from "./cards_store_ready_2652_unique_by_series";
import realNarutoNr001 from "@/assets/packs/real-naruto-nr-001.png";

const exactSourceImageOverrides = {
  "t1w1__R-001": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/001.webp",
  "t1w1__R-002": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/002.webp",
  "t1w1__R-003": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/003.webp",
  "t1w1__R-004": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/004.webp",
  "t1w1__R-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/005.webp",
  "t1w1__R-006": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/006.webp",
  "t1w1__R-007": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/007.webp",
  "t1w1__R-008": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/008.webp",
  "t1w1__R-009": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/009.webp",
  "t1w1__R-010": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/010.webp",
  "t1w1__R-011": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/011.webp",
  "t1w1__R-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/012.webp",
  "t1w1__R-013": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/013.webp",
  "t1w1__R-014": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/014.webp",
  "t1w1__R-015": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/015.webp",
  "t1w1__R-016": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/016.webp",
  "t1w1__R-017": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/017.webp",
  "t1w1__R-018": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/018.webp",
  "t1w1__R-019": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/019.webp",
  "t1w1__R-020": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/020.webp",
  "t1w1__R-021": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/021.webp",
  "t1w1__R-022": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/022.webp",
  "t1w1__R-023": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/023.webp",
  "t1w1__R-024": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/024.webp",
  "t1w1__R-025": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/025.webp",
  "t1w1__R-026": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/026.webp",
  "t1w1__R-027": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/027.webp",
  "t1w1__R-028": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/028.webp",
  "t1w1__R-029": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/029.webp",
  "t1w1__R-030": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/030.webp",
  "t1w1__R-031": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/031.webp",
  "t1w1__R-032": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/032.webp",
  "t1w1__R-033": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/033.webp",
  "t1w1__R-034": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/034.webp",
  "t1w1__R-035": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/035.webp",
  "t1w1__R-036": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/036.webp",
  "t1w1__R-037": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/037.webp",
  "t1w1__R-038": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/038.webp",
  "t1w1__R-039": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/039.webp",
  "t1w1__R-040": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/040.webp",
  "t1w1__R-041": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/041.webp",
  "t1w1__R-042": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/042.webp",
  "t1w1__R-043": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/043.webp",
  "t1w1__R-044": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/044.webp",
  "t1w1__R-045": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/045.webp",
  "t1w1__R-046": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/046.webp",
  "t1w1__R-047": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/047.webp",
  "t1w1__R-048": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/048.webp",
  "t1w1__R-049": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/049.webp",
  "t1w1__R-050": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/050.webp",
  "t1w2__R-051": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/051.webp",
  "t1w2__R-052": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/052.webp",
  "t1w2__R-053": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/053.webp",
  "t1w2__R-054": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/054.webp",
  "t1w2__R-055": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/055.webp",
  "t1w2__R-056": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/056.webp",
  "t1w2__R-057": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/057.webp",
  "t1w2__R-058": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/058.webp",
  "t1w2__R-059": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/059.webp",
  "t1w2__R-060": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/060.webp",
  "t1w2__R-061": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/061.webp",
  "t1w2__R-062": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/062.webp",
  "t1w2__R-063": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/063.webp",
  "t1w2__R-064": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/064.webp",
  "t1w2__R-065": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/R/065.webp",
  "t1w1__SR-001": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/001.webp",
  "t1w1__SR-002": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/002.webp",
  "t1w1__SR-003": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/003.webp",
  "t1w1__SR-004": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/004.webp",
  "t1w1__SR-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/005.webp",
  "t1w1__SR-006": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/006.webp",
  "t1w1__SR-007": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/007.webp",
  "t1w1__SR-008": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/008.webp",
  "t1w1__SR-009": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/009.webp",
  "t1w1__SR-010": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/010.webp",
  "t1w1__SR-011": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/011.webp",
  "t1w1__SR-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/012.webp",
  "t1w1__SR-013": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/013.webp",
  "t1w1__SR-014": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/014.webp",
  "t1w1__SR-015": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/015.webp",
  "t1w1__SR-016": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/016.webp",
  "t1w1__SR-017": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/017.webp",
  "t1w1__SR-018": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/018.webp",
  "t1w1__SR-019": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/019.webp",
  "t1w1__SR-020": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/020.webp",
  "t1w1__SR-021": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/021.webp",
  "t1w1__SR-022": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/022.webp",
  "t1w1__SR-023": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/023.webp",
  "t1w1__SR-024": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/024.webp",
  "t1w1__SR-025": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/025.webp",
  "t1w1__SR-026": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/026.webp",
  "t1w1__SR-027": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/027.webp",
  "t1w1__SR-028": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/028.webp",
  "t1w1__SR-029": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/029.webp",
  "t1w1__SR-030": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/030.webp",
  "t1w1__SR-031": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/031.webp",
  "t1w1__SR-032": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/032.webp",
  "t1w1__SR-033": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/033.webp",
  "t1w1__SR-034": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/034.webp",
  "t1w1__SR-035": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/035.webp",
  "t1w1__SR-036": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/036.webp",
  "t1w2__SR-050": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/050.webp",
  "t1w2__SR-051": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/051.webp",
  "t1w2__SR-052": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/052.webp",
  "t1w2__SR-053": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/053.webp",
  "t1w2__SR-054": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/054.webp",
  "t1w2__SR-055": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/055.webp",
  "t1w2__SR-056": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/056.webp",
  "t1w2__SR-057": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/057.webp",
  "t1w2__SR-058": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/058.webp",
  "t1w2__SR-059": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/059.webp",
  "t1w2__SR-060": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/060.webp",
  "t1w2__SR-061": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/061.webp",
  "t1w2__SR-062": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/062.webp",
  "t1w2__SR-063": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SR/063.webp",
  "t1w1__SSR-001": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/001.webp",
  "t1w1__SSR-002": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/002.webp",
  "t1w1__SSR-003": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/003.webp",
  "t1w1__SSR-004": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/004.webp",
  "t1w1__SSR-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/005.webp",
  "t1w1__SSR-006": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/006.webp",
  "t1w1__SSR-007": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/007.webp",
  "t1w1__SSR-008": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/008.webp",
  "t1w1__SSR-009": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/009.webp",
  "t1w1__SSR-010": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/010.webp",
  "t1w1__SSR-011": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/011.webp",
  "t1w1__SSR-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/012.webp",
  "t1w1__SSR-013": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/013.webp",
  "t1w1__SSR-014": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/014.webp",
  "t1w1__SSR-015": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/015.webp",
  "t1w1__SSR-016": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/016.webp",
  "t1w1__SSR-017": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/017.webp",
  "t1w1__SSR-018": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/018.webp",
  "t1w1__SSR-019": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/019.webp",
  "t1w1__SSR-020": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/020.webp",
  "t1w1__SSR-021": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/021.webp",
  "t1w1__SSR-022": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/022.webp",
  "t1w1__SSR-023": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/023.webp",
  "t1w1__SSR-024": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/024.webp",
  "t1w1__SSR-025": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/025.webp",
  "t1w1__SSR-026": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/026.webp",
  "t1w1__SSR-027": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/027.webp",
  "t1w1__SSR-028": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/028.webp",
  "t1w1__SSR-029": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/029.webp",
  "t1w1__SSR-030": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/030.webp",
  "t1w1__SSR-031": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/031.webp",
  "t1w1__SSR-032": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/032.webp",
  "t1w2__SSR-041": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/041.webp",
  "t1w2__SSR-042": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/042.webp",
  "t1w2__SSR-043": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/043.webp",
  "t1w2__SSR-044": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/044.webp",
  "t1w2__SSR-045": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/045.webp",
  "t1w2__SSR-046": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/046.webp",
  "t1w2__SSR-047": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/047.webp",
  "t1w2__SSR-048": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/048.webp",
  "t1w2__SSR-049": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/049.webp",
  "t1w2__SSR-050": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/050.webp",
  "t1w2__SSR-051": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/051.webp",
  "t1w2__SSR-052": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/052.webp",
  "t1w2__SSR-053": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/053.webp",
  "t1w2__SSR-054": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/054.webp",
  "t1w2__SSR-055": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SSR/055.webp",
  "t1w1__UR-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/005.webp",
  "t1w1__UR-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/012.webp",
  "t1w1__UR-013": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/013.webp",
  "t1w1__UR-014": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/014.webp",
  "t1w1__UR-015": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/015.webp",
  "t1w1__UR-016": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/016.webp",
  "t1w1__UR-017": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/017.webp",
  "t1w1__UR-018": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/018.webp",
  "t1w2__UR-025": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/025.webp",
  "t1w2__UR-026": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/026.webp",
  "t1w2__UR-027": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/027.webp",
  "t1w2__UR-028": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/028.webp",
  "t1w2__UR-029": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/029.webp",
  "t1w2__UR-030": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/030.webp",
  "t1w2__UR-031": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/031.webp",
  "t1w2__UR-032": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/032.webp",
  "t4w4__UR-081": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/081.webp",
  "t4w4__UR-082": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/082.webp",
  "t4w4__UR-083": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/083.webp",
  "t4w4__UR-084": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/084.webp",
  "t4w5__UR-101": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/101.webp",
  "t4w5__UR-102": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/102.webp",
  "t4w5__UR-103": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/103.webp",
  "t4w5__UR-104": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/UR/104.webp",
  "t4w4__AR-046": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/AR/046.webp",
  "t4w4__AR-047": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/AR/047.webp",
  "t4w4__AR-048": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/AR/048.webp",
  "t4w5__AR-058": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/AR/058.webp",
  "t4w5__AR-059": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/AR/059.webp",
  "t4w5__AR-060": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/AR/060.webp",
  "t1w2__OR-019": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/019.webp",
  "t1w2__OR-020": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/020.webp",
  "t1w2__OR-021": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/021.webp",
  "t1w2__OR-022": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/022.webp",
  "t1w2__OR-023": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/023.webp",
  "t1w2__OR-024": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/024.webp",
  "t1w3__OR-039": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/039.webp",
  "t1w3__OR-040": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/040.webp",
  "t1w3__OR-041": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/041.webp",
  "t1w3__OR-042": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/042.webp",
  "t4w4__OR-073": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/073.webp",
  "t4w4__OR-074": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/074.webp",
  "t4w4__OR-075": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/075.webp",
  "t4w4__OR-076": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/076.webp",
  "t4w4__OR-077": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/077.webp",
  "t4w4__OR-078": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/078.webp",
  "t4w5__OR-093": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/093.webp",
  "t4w5__OR-094": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/094.webp",
  "t4w5__OR-095": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/095.webp",
  "t4w5__OR-096": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/096.webp",
  "t4w5__OR-097": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/097.webp",
  "t4w5__OR-098": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/OR/098.webp",
  "t1w1__SP-002": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/002.webp",
  "t1w2__SP-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/012.webp",
  "t1w3__SP-025": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/025.webp",
  "t1w3__SP-026": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/026.webp",
  "t4w4__SP-045": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/045.webp",
  "t4w4__SP-046": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/046.webp",
  "t4w4__SP-047": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/047.webp",
  "t4w4__SP-049": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/049.webp",
  "t1w4__SP-055": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/055.webp",
  "t1w4__SP-056": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/056.webp",
  "t4w5__SP-061": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/061.webp",
  "t4w5__SP-063": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/063.webp",
  "t4w5__SP-064": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/064.webp",
  "t4w5__SP-065": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SP/065.webp",
  "t1w2__MR-001": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/001.webp",
  "t1w2__MR-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/005.webp",
  "t4w4__MR-040": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/040.webp",
  "t4w4__MR-041": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/041.webp",
  "t4w4__MR-042": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/042.webp",
  "t4w5__MR-055": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/055.webp",
  "t4w5__MR-056": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/056.webp",
  "t4w5__MR-057": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/057.webp",
  "t4w5__MR-058": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/MR/058.webp",
  "t1w2__GP-001": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/001.webp",
  "t1w2__GP-002": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/002.webp",
  "t1w2__GP-003": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/003.webp",
  "t1w2__GP-004": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/004.webp",
  "t1w2__GP-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/005.webp",
  "t1w2__GP-006": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/006.webp",
  "t1w2__GP-007": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/007.webp",
  "t1w2__GP-008": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/008.webp",
  "t1w3__GP-009": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/009.webp",
  "t1w3__GP-010": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/010.webp",
  "t1w3__GP-011": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/011.webp",
  "t1w3__GP-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/012.webp",
  "t1w3__GP-013": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/013.webp",
  "t1w3__GP-014": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/014.webp",
  "t1w3__GP-015": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/015.webp",
  "t1w3__GP-016": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/016.webp",
  "t1w4__GP-017": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/017.webp",
  "t1w4__GP-018": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/018.webp",
  "t1w4__GP-019": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/019.webp",
  "t1w4__GP-020": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/020.webp",
  "t1w4__GP-021": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/021.webp",
  "t1w4__GP-022": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/022.webp",
  "t1w4__GP-023": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/023.webp",
  "t1w4__GP-024": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/GP/024.webp",
  "t4w4__BP-017": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/017.webp",
  "t4w4__BP-018": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/018.webp",
  "t4w4__BP-019": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/019.webp",
  "t4w4__BP-020": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/020.webp",
  "t4w4__BP-021": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/021.webp",
  "t4w4__BP-022": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/022.webp",
  "t4w5__BP-023": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/023.webp",
  "t4w5__BP-024": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/024.webp",
  "t4w5__BP-025": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/025.webp",
  "t4w5__BP-026": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/026.webp",
  "t4w5__BP-027": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/BP/027.webp",
  "t4w4__SE-001": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/001.webp",
  "t4w4__SE-002": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/002.webp",
  "t4w4__SE-003": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/003.webp",
  "t4w4__SE-004": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/004.webp",
  "t4w4__SE-005": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/005.webp",
  "t4w4__SE-006": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/006.webp",
  "t4w5__SE-007": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/007.webp",
  "t4w5__SE-008": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/008.webp",
  "t4w5__SE-009": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/009.webp",
  "t4w5__SE-010": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/010.webp",
  "t4w5__SE-011": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/011.webp",
  "t4w5__SE-012": "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/SE/012.webp"
};

const exactFullReplacementSets = new Set(["T2W5", "T2W6", "T2W7"]);
const exactReplacementImageBase = "https://pub-03c2467f5eb1430bbed05882f1f6fc60.r2.dev/naruto-cards/";
const exactReplacementRanges = [
  { sourceSet: "T3W1", rarity: "AR", start: 1, end: 10 },
  { sourceSet: "T3W2", rarity: "AR", start: 20, end: 21 },
  { sourceSet: "T3W2", rarity: "AR", start: 23, end: 24 },
  { sourceSet: "T3W2", rarity: "MR", start: 9, end: 12 },
  { sourceSet: "T3W2", rarity: "NR", start: 1, end: 6 },
  { sourceSet: "T3W2", rarity: "OR", start: 27, end: 32 },
  { sourceSet: "T3W2", rarity: "SP", start: 17, end: 19 },
  { sourceSet: "T3W2", rarity: "UR", start: 37, end: 40 },
  { sourceSet: "T3W3", rarity: "AR", start: 31, end: 33 },
  { sourceSet: "T3W3", rarity: "MR", start: 23, end: 25 },
  { sourceSet: "T3W3", rarity: "NR", start: 7, end: 12 },
  { sourceSet: "T3W3", rarity: "OR", start: 47, end: 52 },
  { sourceSet: "T3W3", rarity: "SP", start: 27, end: 29 },
  { sourceSet: "T3W3", rarity: "UR", start: 57, end: 60 },
  { sourceSet: "T3W4", rarity: "AR", start: 43, end: 45 },
  { sourceSet: "T3W4", rarity: "MR", start: 37, end: 39 },
  { sourceSet: "T3W4", rarity: "NR", start: 13, end: 18 },
  { sourceSet: "T3W4", rarity: "OR", start: 67, end: 72 },
  { sourceSet: "T3W4", rarity: "UR", start: 77, end: 80 },
  { sourceSet: "T3W5", rarity: "AR", start: 55, end: 57 },
  { sourceSet: "T3W5", rarity: "MR", start: 51, end: 54 },
  { sourceSet: "T3W5", rarity: "NR", start: 19, end: 23 },
  { sourceSet: "T3W5", rarity: "OR", start: 87, end: 92 },
  { sourceSet: "T3W5", rarity: "SP", start: 57, end: 60 },
  { sourceSet: "T3W5", rarity: "UR", start: 97, end: 100 },
  { sourceSet: "T4W1", rarity: "AR", start: 11, end: 12 },
  { sourceSet: "T4W1", rarity: "SP", start: 5, end: 8 },
  { sourceSet: "T4W1", rarity: "SSR", start: 33, end: 40 },
  { sourceSet: "T4W1", rarity: "UR", start: 21, end: 24 },
  { sourceSet: "T4W2", rarity: "BP", start: 1, end: 6 },
  { sourceSet: "T4W2", rarity: "MR", start: 13, end: 14 },
  { sourceSet: "T4W2", rarity: "OR", start: 33, end: 38 },
  { sourceSet: "T4W2", rarity: "SP", start: 20, end: 21 },
  { sourceSet: "T4W2", rarity: "UR", start: 41, end: 44 },
  { sourceSet: "T4W3", rarity: "AR", start: 34, end: 36 },
  { sourceSet: "T4W3", rarity: "BP", start: 7, end: 12 },
  { sourceSet: "T4W3", rarity: "MR", start: 26, end: 28 },
  { sourceSet: "T4W3", rarity: "OR", start: 53, end: 58 },
  { sourceSet: "T4W3", rarity: "SP", start: 30, end: 32 },
  { sourceSet: "T4W3", rarity: "UR", start: 61, end: 64 },
  { sourceSet: "T4W6", rarity: "BP", start: 28, end: 34 },
  { sourceSet: "T4W6", rarity: "MR", start: 63, end: 68 },
  { sourceSet: "T4W6", rarity: "R", start: 111, end: 160 },
  { sourceSet: "T4W6", rarity: "SE", start: 13, end: 16 },
  { sourceSet: "T4W6", rarity: "SP", start: 70, end: 73 },
  { sourceSet: "T4W6", rarity: "SR", start: 109, end: 128 },
  { sourceSet: "T4W6", rarity: "SSR", start: 131, end: 154 },
  { sourceSet: "T4W6", rarity: "UR", start: 115, end: 129 },
  { sourceSet: "T2.5", rarity: "OR", start: 1, end: 18 },
  { sourceSet: "T2.5", rarity: "SP", start: 10, end: 11 },
  { sourceSet: "T2.5", rarity: "SR", start: 37, end: 48 },
];
const exactReplacementSingles = new Set([
  "T3W1__SP-001",
  "T3W1__SP-004",
  "T3W2__SR-049",
  "T3W4__SP-039",
  "T3W4__SP-043",
  "T3W4__SP-044",
  "T3W4__SP-050",
  "T4W2__AR-019",
  "T4W2__AR-022",
  "EX1__SP-009",
  "EX2__SP-022",
  "EX3__SP-033",
  "EX4__SP-048",
  "EX5__SP-062",
  "YouthScroll__BP-013",
  "YouthScroll__BP-014",
  "YouthScroll__BP-015",
  "YouthScroll__BP-016",
  "YouthScroll__CR-009",
  "YouthScroll__CR-010",
  "YouthScroll__SP-034",
  "YouthScroll__SP-035",
  "YouthScroll__SP-036",
  "YouthScroll__SP-037",
]);

function exactReplacementImageFor(sourceSet: string, cardNumber: string): string | undefined {
  const [rarity, number] = cardNumber.split("-");
  if (!rarity || !number) return undefined;
  const numericNumber = Number(number);
  const hasExactReplacement =
    exactFullReplacementSets.has(sourceSet) ||
    exactReplacementSingles.has(`${sourceSet}__${cardNumber}`) ||
    exactReplacementRanges.some(
      (range) =>
        range.sourceSet === sourceSet &&
        range.rarity === rarity &&
        numericNumber >= range.start &&
        numericNumber <= range.end,
    );

  if (!hasExactReplacement) return undefined;

  return `${exactReplacementImageBase}${rarity}/${number}.webp`;
}

const sampleArt = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
  "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80",
  "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=600&q=80",
  "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
  "https://images.unsplash.com/photo-1604335079441-0254acdc9544?w=600&q=80",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600&q=80",
  "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?w=600&q=80",
];

interface Seed {
  packId: string;
  no: string;
  char: string;
  rarity: Card["rarity"];
  en: string;
  zh: string;
  ja: string;
  price: number;
  flavorEn: string;
}

// A curated set of well-known cards across packs — covers every rarity tier.
const seeds: Seed[] = [
  // Tier 1 Wave 1 booster
  { packId: "t1w1-booster", no: "NR-001", char: "Naruto Uzumaki", rarity: "UR", en: "Naruto — Nine Tails Awakening", zh: "鸣人 — 九尾觉醒", ja: "うずまきナルト — 九尾覚醒", price: 620, flavorEn: "Believe it. The first chase card of the entire Kayou era." },
  { packId: "t1w1-booster", no: "NR-002", char: "Sasuke Uchiha", rarity: "SSR", en: "Sasuke — Curse Mark Stage 2", zh: "佐助 — 咒印第二阶段", ja: "うちはサスケ — 呪印第二段階", price: 145, flavorEn: "Drenched in shadow, the second-born Uchiha awakens his hunger." },
  { packId: "t1w1-booster", no: "NR-003", char: "Sakura Haruno", rarity: "SR", en: "Sakura — Genin Days", zh: "小樱 — 下忍时代", ja: "春野サクラ — 下忍時代", price: 18, flavorEn: "Pink hair tied back, scroll in hand — the Team 7 medic begins." },
  { packId: "t1w1-booster", no: "NR-004", char: "Kakashi Hatake", rarity: "SR", en: "Kakashi — Sharingan Eye", zh: "卡卡西 — 写轮眼", ja: "はたけカカシ — 写輪眼", price: 55, flavorEn: "Copy Ninja Kakashi reveals the gift his friend left behind." },
  { packId: "t1w1-booster", no: "NR-005", char: "Iruka Umino", rarity: "R", en: "Iruka Sensei", zh: "伊鲁卡老师", ja: "うみのイルカ先生", price: 4, flavorEn: "The teacher who first believed in the boy with the fox inside." },
  { packId: "t1w1-booster", no: "NR-006", char: "Hinata Hyuga", rarity: "SR", en: "Hinata — Byakugan", zh: "雏田 — 白眼", ja: "日向ヒナタ — 白眼", price: 22, flavorEn: "She watches quietly, eyes seeing all." },
  { packId: "t1w1-booster", no: "NR-007", char: "Rock Lee", rarity: "C", en: "Rock Lee — Eight Inner Gates", zh: "李洛克 — 八门遁甲", ja: "ロック・リー — 八門遁甲", price: 1, flavorEn: "Hard work beats genius — fists alone, no chakra needed." },
  { packId: "t1w1-booster", no: "NR-008", char: "Gaara", rarity: "SP", en: "Gaara — Sand Coffin", zh: "我爱罗 — 砂之棺", ja: "我愛羅 — 砂の棺", price: 280, flavorEn: "Mother whispers, and the desert closes its fist." },

  // Tier 1 Wave 1 deluxe
  { packId: "t1w1-deluxe", no: "NR-D1", char: "Naruto Uzumaki", rarity: "SP", en: "Naruto — Sage Mode (Holo SP)", zh: "鸣人 — 仙人模式 (烫金SP)", ja: "うずまきナルト — 仙人モード (ホロSP)", price: 410, flavorEn: "Toad sage at full focus — a deluxe-only foil." },
  { packId: "t1w1-deluxe", no: "NR-D2", char: "Itachi Uchiha", rarity: "UR", en: "Itachi — Tsukuyomi", zh: "宇智波鼬 — 月读", ja: "うちはイタチ — 月読", price: 780, flavorEn: "Inside the moon, time bends to his will." },
  { packId: "t1w1-deluxe", no: "NR-D3", char: "Jiraiya", rarity: "SSR", en: "Jiraiya — Toad Sage", zh: "自来也 — 蛤蟆仙人", ja: "自来也 — 蛙仙人", price: 95, flavorEn: "The pervy hermit grins — Gamabunta rises behind him." },

  // Tier 2 Wave 1
  { packId: "t2w1-booster", no: "T2-001", char: "Naruto Uzumaki", rarity: "UR", en: "Naruto — Tailed Beast Mode", zh: "鸣人 — 尾兽模式", ja: "うずまきナルト — 尾獣モード", price: 340, flavorEn: "Kurama's chakra cloak roars to life across the battlefield." },
  { packId: "t2w1-booster", no: "T2-002", char: "Itachi Uchiha", rarity: "SP", en: "Itachi — Crow Body", zh: "宇智波鼬 — 鸦分身", ja: "うちはイタチ — 烏分身", price: 520, flavorEn: "A thousand crows scatter — and one carries his final words." },
  { packId: "t2w1-booster", no: "T2-003", char: "Tsunade", rarity: "SSR", en: "Tsunade — Hokage", zh: "纲手 — 火影", ja: "綱手 — 火影", price: 65, flavorEn: "The slug princess takes the hat. Don't bet against her." },

  // Tier 3 Wave 1 — Akatsuki
  { packId: "t3w1-booster", no: "AK-001", char: "Pain", rarity: "UR", en: "Pain — Six Paths", zh: "佩恩 — 六道", ja: "ペイン — 六道", price: 460, flavorEn: "Know pain. Six bodies, one will." },
  { packId: "t3w1-booster", no: "AK-002", char: "Konan", rarity: "SSR", en: "Konan — Paper Angel", zh: "小南 — 纸之天使", ja: "小南 — 紙の天使", price: 88, flavorEn: "Origami wings unfold — beauty bound to grief." },
  { packId: "t3w1-booster", no: "AK-003", char: "Deidara", rarity: "SSR", en: "Deidara — Art is an Explosion", zh: "迪达拉 — 艺术就是爆炸", ja: "デイダラ — 芸術は爆発だ", price: 72, flavorEn: "Hmph — true art exists only for an instant." },
  { packId: "t3w1-booster", no: "AK-004", char: "Sasori", rarity: "SR", en: "Sasori — Hiruko Puppet", zh: "蝎 — 蝎傀儡", ja: "サソリ — 蛭子", price: 28, flavorEn: "Eternity carved in red sand and poison." },
  { packId: "t3w1-booster", no: "AK-005", char: "Kisame Hoshigaki", rarity: "SR", en: "Kisame — Samehada", zh: "鬼鲛 — 鲛肌", ja: "鬼鮫 — サメ肌", price: 24, flavorEn: "The Tailless Tailed Beast brings the ocean with him." },

  // Tier 3 Wave 3 deluxe — Sannin
  { packId: "t3w3-deluxe", no: "SN-001", char: "Tsunade", rarity: "UR", en: "Tsunade — Strength of a Hundred", zh: "纲手 — 百豪之术", ja: "綱手 — 百豪の術", price: 305, flavorEn: "Forehead diamond aglow, life pours back into the broken." },
  { packId: "t3w3-deluxe", no: "SN-002", char: "Jiraiya", rarity: "UR", en: "Jiraiya — Sage Mode (Frog Form)", zh: "自来也 — 仙人模式 (蛙形)", ja: "自来也 — 仙人モード (蛙形態)", price: 295, flavorEn: "Mount Myoboku's pride. The Pervy Sage takes the field." },
  { packId: "t3w3-deluxe", no: "SN-003", char: "Orochimaru", rarity: "SP", en: "Orochimaru — Eight Branches", zh: "大蛇丸 — 八岐之术", ja: "大蛇丸 — 八岐の術", price: 540, flavorEn: "A serpent god rises, eight heads hungry." },
  { packId: "t3w3-deluxe", no: "SN-004", char: "Naruto Uzumaki", rarity: "SSR", en: "Naruto — Rasenshuriken", zh: "鸣人 — 螺旋手里剑", ja: "うずまきナルト — 螺旋手裏剣", price: 110, flavorEn: "A wind blade at the cellular level. He alone could shape it." },

  // Tier 4 Wave 1
  { packId: "t4w1-booster", no: "T4-001", char: "Madara Uchiha", rarity: "UR", en: "Madara — Perfect Susanoo", zh: "斑 — 完全体须佐能乎", ja: "うちはマダラ — 完成体須佐能乎", price: 720, flavorEn: "A god clad in violet flame — and the world remembers fear." },
  { packId: "t4w1-booster", no: "T4-002", char: "Obito Uchiha", rarity: "SP", en: "Obito — Ten Tails Jinchuriki", zh: "带土 — 十尾人柱力", ja: "オビト — 十尾人柱力", price: 480, flavorEn: "From a boy who waited under a stone, to a god who held the moon." },
  { packId: "t4w1-booster", no: "T4-003", char: "Minato Namikaze", rarity: "SSR", en: "Minato — Yellow Flash", zh: "波风水门 — 黄色闪光", ja: "波風ミナト — 黄色い閃光", price: 165, flavorEn: "Faster than thought. The Fourth's kunai marks every battlefield." },

  // T4W5 demo seeds removed — the t4w5-collector record is now a real
  // community-sourced product (NR-RD-Z005) with no verified checklist yet.


  // English Vol 1
  { packId: "en-vol-1", no: "EN-001", char: "Naruto Uzumaki", rarity: "UR", en: "Naruto — English Edition Promo", zh: "鸣人 — 英文版促销卡", ja: "うずまきナルト — 英語版プロモ", price: 220, flavorEn: "First-print English UR — already a grail among Western collectors." },
  { packId: "en-vol-1", no: "EN-002", char: "Sasuke Uchiha", rarity: "SSR", en: "Sasuke — Chidori (English)", zh: "佐助 — 千鸟 (英文版)", ja: "うちはサスケ — 千鳥 (英語版)", price: 78, flavorEn: "Lightning in the palm. Translated, but no less sharp." },
  { packId: "en-vol-1", no: "EN-003", char: "Kakashi Hatake", rarity: "SSR", en: "Kakashi — Lightning Cutter", zh: "卡卡西 — 雷切", ja: "はたけカカシ — 雷切", price: 65, flavorEn: "An assassin's technique mastered into protection." },
  { packId: "en-vol-2", no: "EN-101", char: "Itachi Uchiha", rarity: "UR", en: "Itachi — English UR", zh: "宇智波鼬 — 英文 UR", ja: "うちはイタチ — 英語UR", price: 340, flavorEn: "The genius of the Uchiha, in English print run." },
  { packId: "en-vol-3", no: "EN-201", char: "Pain", rarity: "SP", en: "Pain — Almighty Push (English SP)", zh: "佩恩 — 神罗天征 (英文SP)", ja: "ペイン — 神羅天征 (英語SP)", price: 195, flavorEn: "Konoha falls in a single breath." },
];

const t1w1SourceCards = sourcedCardsBySeries["T1W1"] ?? [];
const realT1W1Cards: Card[] = t1w1SourceCards.map((s) => ({
  id: `t1w1__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T1W1 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t1w2SourceCards = sourcedCardsBySeries["T1W2"] ?? [];
const realT1W2Cards: Card[] = t1w2SourceCards.map((s) => ({
  id: `t1w2__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T1W2 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t1w3SourceCards = sourcedCardsBySeries["T1W3"] ?? [];
const realT1W3Cards: Card[] = t1w3SourceCards.map((s) => ({
  id: `t1w3__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T1W3 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t1w4SourceCards = sourcedCardsBySeries["T1W4"] ?? [];
const realT1W4Cards: Card[] = t1w4SourceCards.map((s) => ({
  id: `t1w4__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T1W4 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t2w1SourceCards = sourcedCardsBySeries["T2W1"] ?? [];
const realT2W1Cards: Card[] = t2w1SourceCards.map((s) => ({
  id: `t2w1__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T2W1 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t2w2SourceCards = sourcedCardsBySeries["T2W2"] ?? [];
const realT2W2Cards: Card[] = t2w2SourceCards.map((s) => ({
  id: `t2w2__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T2W2 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t2w3SourceCards = sourcedCardsBySeries["T2W3"] ?? [];
const realT2W3Cards: Card[] = t2w3SourceCards.map((s) => ({
  id: `t2w3__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T2W3 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t2w4SourceCards = sourcedCardsBySeries["T2W4"] ?? [];
const realT2W4Cards: Card[] = t2w4SourceCards.map((s) => ({
  id: `t2w4__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T2W4 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

function realSourceCardsForSet(sourceSet: string): Card[] {
  const sourceCards = sourcedCardsBySeries[sourceSet] ?? [];
  return sourceCards.map((s) => ({
    id: `${sourceSet.toLowerCase()}__${s.number}`,
    number: s.number,
    rarity: s.rarity as Card["rarity"],
    character: s.character,
    name: {
      en: `${s.character} â€” ${s.number}`,
      zh: `${s.character} â€” ${s.number}`,
      ja: `${s.character} â€” ${s.number}`,
    },
    image:
      exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ??
      exactReplacementImageFor(s.sourceSet, s.number) ??
      `${SOURCE_IMAGE_BASE}${s.imageFile}`,
    isPlaceholder: true,
    flavor: {
      en: `${s.character} â€” ${s.number}`,
      zh: `${s.character} â€” ${s.number}`,
      ja: `${s.character} â€” ${s.number}`,
    },
    sourceUrl: SOURCE_PAGE,
    sourceNotes: `${sourceSet} sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
    sourceStatus: "Community sourced" as const,
    recordStatus: "community_sourced" as const,
    imageStatus: "verified" as const,
    priceStatus: "unavailable" as const,
  }));
}

const realT2W5Cards = realSourceCardsForSet("T2W5");
const realT2W6Cards = realSourceCardsForSet("T2W6");
const realT2W7Cards = realSourceCardsForSet("T2W7");
const realT2W8Cards = realSourceCardsForSet("T2W8");
const realT2W9Cards = realSourceCardsForSet("T2W9");
const realT25Cards = realSourceCardsForSet("T2.5");
const realEX1Cards = realSourceCardsForSet("EX1");
const realEX2Cards = realSourceCardsForSet("EX2");
const realEX3Cards = realSourceCardsForSet("EX3");
const realEX4Cards = realSourceCardsForSet("EX4");
const realEX5Cards = realSourceCardsForSet("EX5");
const realT3W1Cards = realSourceCardsForSet("T3W1");
const realT3W2Cards = realSourceCardsForSet("T3W2");
const realT3W3Cards = realSourceCardsForSet("T3W3");
const realT3W4Cards = realSourceCardsForSet("T3W4");
const realT3W5Cards = realSourceCardsForSet("T3W5");
const realT4W1Cards = realSourceCardsForSet("T4W1");
const realT4W2Cards = realSourceCardsForSet("T4W2");
const realT4W3Cards = realSourceCardsForSet("T4W3");
const realT4W6Cards = realSourceCardsForSet("T4W6");
const realT4W7Cards = realSourceCardsForSet("T4W7");
const realT4W8Cards = realSourceCardsForSet("T4W8");
const realYouthScrollCards = realSourceCardsForSet("YouthScroll");
const realNewYearsCards = realSourceCardsForSet("NewYears");
const realHeavenEarthCards = realSourceCardsForSet("Heaven&Earth");
const realNinjaAgeCards = realSourceCardsForSet("NinjaAge");
const realNinjaAgeNCards = realSourceCardsForSet("NinjaAgeN");
const realBadgeCards = realSourceCardsForSet("Badge");
const realFigureCards = realSourceCardsForSet("Figure");

// ---------------------------------------------------------------------------
// T4W4 / T4W5 pilot migration
// Only migrate these two source groups as a small pilot; leave all other
// sourced groups untouched for now.
// ---------------------------------------------------------------------------
const t4w4SourceCards = sourcedCardsBySeries["T4W4"] ?? [];
const realT4W4Cards: Card[] = t4w4SourceCards.map((s) => ({
  id: `t4w4__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T4W4 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

const t4w5SourceCards = sourcedCardsBySeries["T4W5"] ?? [];
const realT4W5Cards: Card[] = t4w5SourceCards.map((s) => ({
  id: `t4w5__${s.number}`,
  number: s.number,
  rarity: s.rarity as Card["rarity"],
  character: s.character,
  name: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  image: exactSourceImageOverrides[`${s.sourceSet.toLowerCase()}__${s.number}`] ?? `${SOURCE_IMAGE_BASE}${s.imageFile}`,
  isPlaceholder: true,
  flavor: {
    en: `${s.character} — ${s.number}`,
    zh: `${s.character} — ${s.number}`,
    ja: `${s.character} — ${s.number}`,
  },
  sourceUrl: SOURCE_PAGE,
  sourceNotes: `T4W5 sourced from Capsule Corp Gear. sourceSet: ${s.sourceSet}.${s.sourceMetadata ? ` ${s.sourceMetadata}.` : ""}`,
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  imageStatus: "verified" as const,
  priceStatus: "unavailable" as const,
}));

// Exclude demo seeds for packs that we've migrated to real sourced records.
const nonT1W1Seeds = seeds.filter(
  (s) =>
    s.packId !== "t1w1-booster" &&
    s.packId !== "t1w1-deluxe" &&
    s.packId !== "t1w2-booster" &&
    s.packId !== "t1w3-booster" &&
    s.packId !== "t1w4-collector" &&
    s.packId !== "t2w1-booster" &&
    s.packId !== "t2w2-booster" &&
    s.packId !== "t2w3-deluxe" &&
    s.packId !== "t2w4-collector" &&
    s.packId !== "t2w5-cc" &&
    s.packId !== "t2w6-cc" &&
    s.packId !== "t2w7-cc" &&
    s.packId !== "t2w8-cc" &&
    s.packId !== "t2w9-cc" &&
    s.packId !== "t2-5-itachi-cloud" &&
    s.packId !== "ex-1-rainbow" &&
    s.packId !== "ex-2-rainbow" &&
    s.packId !== "ex-3-rainbow" &&
    s.packId !== "ex-4-rainbow" &&
    s.packId !== "ex-5-rainbow" &&
    s.packId !== "t3w1-booster" &&
    s.packId !== "t3w2-booster" &&
    s.packId !== "t3w3-deluxe" &&
    s.packId !== "t3w4-collector" &&
    s.packId !== "t3w5-cc" &&
    s.packId !== "t4w1-booster" &&
    s.packId !== "t4w2-booster" &&
    s.packId !== "t4w3-deluxe" &&
    s.packId !== "t4w4-deluxe" &&
    s.packId !== "t4w5-collector" &&
    s.packId !== "t4w6-cc" &&
    s.packId !== "t4w7-cc" &&
    s.packId !== "t4w8-cc",
);

// Drop seeds whose pack does not exist (e.g. between data revisions).
const validIds = new Set(packs.map((p) => p.id));

export const cards: Card[] = [
  ...realT1W1Cards,
  ...realT1W2Cards,
  ...realT1W3Cards,
  ...realT1W4Cards,
  ...realT2W1Cards,
  ...realT2W2Cards,
  ...realT2W3Cards,
  ...realT2W4Cards,
  ...realT2W5Cards,
  ...realT2W6Cards,
  ...realT2W7Cards,
  ...realT2W8Cards,
  ...realT2W9Cards,
  ...realT25Cards,
  ...realEX1Cards,
  ...realEX2Cards,
  ...realEX3Cards,
  ...realEX4Cards,
  ...realEX5Cards,
  ...realT3W1Cards,
  ...realT3W2Cards,
  ...realT3W3Cards,
  ...realT3W4Cards,
  ...realT3W5Cards,
  ...realT4W1Cards,
  ...realT4W2Cards,
  ...realT4W3Cards,
  ...realT4W4Cards,
  ...realT4W5Cards,
  ...realT4W6Cards,
  ...realT4W7Cards,
  ...realT4W8Cards,
  ...realYouthScrollCards,
  ...realNewYearsCards,
  ...realHeavenEarthCards,
  ...realNinjaAgeCards,
  ...realNinjaAgeNCards,
  ...realBadgeCards,
  ...realFigureCards,
  ...nonT1W1Seeds
    .filter((s) => validIds.has(s.packId))
    .map((s, i) => {
      const parentPack = packs.find((p) => p.id === s.packId);
      return {
        id: `${s.packId}__${s.no}`,
        packId: s.packId,
        number: s.no,
        rarity: s.rarity,
        character: s.char,
        name: { en: s.en, zh: s.zh, ja: s.ja },
        image: sampleArt[i % sampleArt.length],
        isPlaceholder: true,
        priceUsd: s.price,
        flavor: { en: s.flavorEn, zh: s.flavorEn, ja: s.flavorEn },
        gradingPotentialScore: Math.min(100, Math.round(40 + s.price / 12)),
        estimatedPsa10Value: Math.round(s.price * (s.rarity === "UR" || s.rarity === "SP" ? 3.2 : 2.4)),
        worthGrading: s.price >= 60,
        marketNotes: s.price >= 200 ? "High-demand chase card — verify centering before grading." : undefined,
        marketRegion: parentPack?.marketRegion ?? "UNKNOWN",
        printLanguage: parentPack?.printLanguage ?? "Unknown",
        sourceStatus: "Unverified" as const,
        recordStatus: "demo" as const,
        imageStatus: "placeholder" as const,
        priceStatus: "demo_estimate" as const,
      };
    }),
];

// Real uploaded NR card — verification pending. NOT assigned to any pack.
// Has no CardAvailability entry until exact product mapping is confirmed.
cards.push({
  id: "real-naruto-nr-001",
  // packId intentionally omitted — assignment lives in CardAvailability only,
  // and this card has none yet.
  number: "NR-NR-001",
  rarity: "NR",
  character: "Naruto Uzumaki",
  name: {
    en: "Naruto Uzumaki — NR #001",
    zh: "漩涡鸣人 — NR #001",
    ja: "うずまきナルト — NR #001",
  },
  image: realNarutoNr001,
  isPlaceholder: false,
  flavor: {
    en: "Real card photograph. Pack assignment and market data not yet confirmed.",
    zh: "真实卡片照片。所属补充包与市场数据仍在核验中。",
    ja: "実カード写真。収録パックと市場データは確認中です。",
  },
  marketRegion: "UNKNOWN",
  printLanguage: "Unknown",
  sourceStatus: "Community sourced",
  recordStatus: "community_sourced",
  imageStatus: "uploaded_unverified",
  priceStatus: "unavailable",
  sourceNotes:
    "Community references indicate NR is a Tier 3-exclusive rarity introduced from Wave 2 onward; exact pack assignment pending verification.",
});

// Community-sourced real card identities indexed from Capsule Corp Gear.
// These records intentionally carry no packId, no market value, and placeholder imagery only.
// `sourceSet` is the source site's first-introduced set reference, not an exclusivity claim.
interface CommunityCardSeed {
  number: string;
  character: string;
  rarity: Card["rarity"];
  sourceSet: string;
  sourceUrl: string;
}

const communityCardSeeds: CommunityCardSeed[] = [
  // Collector Rare (CR)
  { number: "NR-CR-002", character: "Sakura Haruno", rarity: "CR", sourceSet: "T2W2", sourceUrl: "https://collection.capsulecorpgear.com/card/0431d12e-7ea9-4d7e-954e-81de1bbcfc15" },
  { number: "NR-CR-006", character: "Orochimaru", rarity: "CR", sourceSet: "T2W3", sourceUrl: "https://collection.capsulecorpgear.com/card/cb5bbf8b-015e-411d-bab0-5ea631188b99" },
  { number: "NR-CR-007", character: "Kakashi Hatake", rarity: "CR", sourceSet: "T2W3", sourceUrl: "https://collection.capsulecorpgear.com/card/011cd6ce-c2ec-41dd-8286-acfe4b8b0819" },
  { number: "NR-CR-013", character: "Itachi Uchiha", rarity: "CR", sourceSet: "T2W4", sourceUrl: "https://collection.capsulecorpgear.com/card/d048467c-63bc-4959-b2c2-4146076b87e2" },
  { number: "NR-CR-016", character: "Rock Lee", rarity: "CR", sourceSet: "T2W5", sourceUrl: "https://collection.capsulecorpgear.com/card/a9437a85-2bbf-4a49-a932-ca3472c2c8c4" },
  { number: "NR-CR-017", character: "Neji Hyuga", rarity: "CR", sourceSet: "T2W5", sourceUrl: "https://collection.capsulecorpgear.com/card/3fbd3995-01c1-450b-ba30-51e898309647" },
  { number: "NR-CR-018", character: "Ino Yamanaka", rarity: "CR", sourceSet: "T2W5", sourceUrl: "https://collection.capsulecorpgear.com/card/0463342a-30ec-42fc-a3a3-a7ba119ff72a" },
  { number: "NRB07-CR-023", character: "Naruto Uzumaki", rarity: "CR", sourceSet: "T2W7", sourceUrl: "https://collection.capsulecorpgear.com/card/8be5a178-dc45-47e7-a571-34a3e9dcdd8a" },
  { number: "NRB07-CR-024", character: "Zabuza Momochi", rarity: "CR", sourceSet: "T2W7", sourceUrl: "https://collection.capsulecorpgear.com/card/285e8268-b5e2-4477-a264-c6d288653722" },
  { number: "NRB07-CR-025", character: "Haku", rarity: "CR", sourceSet: "T2W7", sourceUrl: "https://collection.capsulecorpgear.com/card/ce8781f2-9ba6-47c8-a6a3-314f0c0aa5d2" },
  { number: "NRB07-CR-026", character: "Boruto Uzumaki", rarity: "CR", sourceSet: "T2W7", sourceUrl: "https://collection.capsulecorpgear.com/card/81cf209c-1635-4149-8d3a-bb1b1270cd34" },

  // Box Pull (BP)
  { number: "NR-BP-001", character: "Obito Uchiha", rarity: "BP", sourceSet: "T4W2", sourceUrl: "https://collection.capsulecorpgear.com/card/8273ba45-2965-4b53-bee1-3d5031c62a9d" },
  { number: "NR-BP-003", character: "Hashirama Senju", rarity: "BP", sourceSet: "T4W2", sourceUrl: "https://collection.capsulecorpgear.com/card/3cb18724-ecd6-4a0b-86e2-bca639a1a003" },
  { number: "NR-BP-004", character: "Konan", rarity: "BP", sourceSet: "T4W2", sourceUrl: "https://collection.capsulecorpgear.com/card/ccb94ce5-b3c0-4c20-a5e7-1eb31975ca8e" },
  { number: "NR-BP-012", character: "Madara Uchiha", rarity: "BP", sourceSet: "T4W3", sourceUrl: "https://collection.capsulecorpgear.com/card/f01139f0-0db0-49f5-8319-01f041adfb0d" },
  { number: "NR-BP-015", character: "Minato Namikaze", rarity: "BP", sourceSet: "YouthScroll", sourceUrl: "https://collection.capsulecorpgear.com/card/4ea05e7c-003b-4bf2-b797-3bd05e639110" },
  { number: "NR-BP-018", character: "Kakashi Hatake", rarity: "BP", sourceSet: "T4W4", sourceUrl: "https://collection.capsulecorpgear.com/card/96dbaa24-11ef-4909-af64-517ff45067a4" },
  { number: "NR-BP-020", character: "Jiraiya", rarity: "BP", sourceSet: "T4W4", sourceUrl: "https://collection.capsulecorpgear.com/card/7bb4862f-ff2e-47ab-b45b-f39e2c2b3af3" },
  { number: "NR-BP-023", character: "Onoki", rarity: "BP", sourceSet: "T4W5", sourceUrl: "https://collection.capsulecorpgear.com/card/b59536c2-b6ed-4421-bbc0-a03b0922d26a" },

  // Serialized / Special Edition (SE)
  { number: "NR-SE-002", character: "Kushina Uzumaki", rarity: "SE", sourceSet: "T4W4", sourceUrl: "https://collection.capsulecorpgear.com/card/5c6d2ff1-61ac-445a-a791-9ff75e7874b2" },
  { number: "NR-SE-005", character: "Sakura Haruno", rarity: "SE", sourceSet: "T4W4", sourceUrl: "https://collection.capsulecorpgear.com/card/c0d82560-bcd7-49f9-b509-c254c2268143" },
  { number: "NR-SE-007", character: "Naruto Uzumaki", rarity: "SE", sourceSet: "T4W5", sourceUrl: "https://collection.capsulecorpgear.com/card/b794b084-569a-4d06-a57a-c14f64efb7fd" },
  { number: "NR-SE-008", character: "Jiraiya", rarity: "SE", sourceSet: "T4W5", sourceUrl: "https://collection.capsulecorpgear.com/card/b68ecab7-3548-4787-bff5-c12170324011" },
  { number: "NR-SE-010", character: "Itachi Uchiha", rarity: "SE", sourceSet: "T4W5", sourceUrl: "https://collection.capsulecorpgear.com/card/2906f4b7-745d-46bf-8642-d8fda057f43d" },

  // Numbered Rare (NR) - excludes NR-NR-001 because the real uploaded Naruto photo record already exists below.
  { number: "NR-NR-002", character: "Sasuke Uchiha", rarity: "NR", sourceSet: "T3W2", sourceUrl: "https://collection.capsulecorpgear.com/card/1a36ca24-d743-4433-b8a4-585996f9c830" },
  { number: "NR-NR-009", character: "Shikamaru Nara", rarity: "NR", sourceSet: "T3W3", sourceUrl: "https://collection.capsulecorpgear.com/card/726621c9-9087-4f91-9084-215419723473" },
  { number: "NR-NR-012", character: "Minato Namikaze", rarity: "NR", sourceSet: "T3W3", sourceUrl: "https://collection.capsulecorpgear.com/card/9a2e6369-bd2a-4025-903a-9a77766d729f" },
  { number: "NR-NR-014", character: "Temari", rarity: "NR", sourceSet: "T3W4", sourceUrl: "https://collection.capsulecorpgear.com/card/496aae2a-8688-4803-a460-98c106a39cef" },
  { number: "NR-NR-018", character: "Orochimaru", rarity: "NR", sourceSet: "T3W4", sourceUrl: "https://collection.capsulecorpgear.com/card/a1c6fba5-beae-4937-80c6-aafac4b31c6e" },
  { number: "NR-NR-021", character: "Kisame Hoshigaki", rarity: "NR", sourceSet: "T3W5", sourceUrl: "https://collection.capsulecorpgear.com/card/64c55a4f-ec76-4526-8100-bbcc8990b093" },
  { number: "NR-NR-022", character: "Pain Deva Path", rarity: "NR", sourceSet: "T3W5", sourceUrl: "https://collection.capsulecorpgear.com/card/40f0a5e8-46a7-4fed-be15-d85641ad98f2" },
];

communityCardSeeds.forEach((s, i) => {
  if (cards.some((existing) => existing.number === s.number)) return;

  cards.push({
    id: `community-${s.number.toLowerCase()}`,
    number: s.number,
    rarity: s.rarity,
    character: s.character,
    name: {
      en: `${s.character} — ${s.number}`,
      zh: `${s.character} — ${s.number}`,
      ja: `${s.character} — ${s.number}`,
    },
    image: sampleArt[i % sampleArt.length],
    isPlaceholder: true,
    flavor: {
      en: "Community-sourced card identity. Set reference is the first documented set; pull availability and market value still require verification.",
      zh: "Community-sourced card identity. Set reference is the first documented set; pull availability and market value still require verification.",
      ja: "Community-sourced card identity. Set reference is the first documented set; pull availability and market value still require verification.",
    },
    marketRegion: "UNKNOWN",
    printLanguage: "Unknown",
    sourceStatus: "Community sourced",
    recordStatus: "community_sourced",
    imageStatus: "placeholder",
    priceStatus: "unavailable",
    sourceNotes: `Indexed Capsule Corp Gear card record. First documented set reference: ${s.sourceSet}. This is not an exclusivity or pull-location guarantee. Source: ${s.sourceUrl}`,
  });
});
