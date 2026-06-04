# En-Vol-1 & En-Vol-3 Image Replacement Implementation Plan

**Scope:** Replace placeholder Unsplash images with real verified product images for English Edition Vol 1 and Vol 3 packs.

**Files to Edit:** 1 file total  
**Imports to Add:** 2 new imports  
**Pack Fields to Modify:** 1 field (add new field)  
**No changes to:** Card data, migrations, Card Search, other products

---

## STEP-BY-STEP IMPLEMENTATION PLAN

### STEP 1: File Placement (What You Do)

**Create/place these image files in the asset folder:**

```
d:\KAYOU ISRAEL\loveable project KAYOU vsc\src\assets\packs\
├── t4w4-naruto-sasuke.png          (already exists)
├── t4w5-naruto-pain.png            (already exists)
├── en-vol-1-booster.png            ← ADD THIS (real product image)
└── en-vol-3-booster.png            ← ADD THIS (real product image)
```

**Requirements:**
- Both must be PNG format (same as existing packs)
- Recommended dimensions: ~900x900px minimum (for web optimization)
- File names: **exactly as shown above** (must match import paths)
- Quality: Clear, professional product photography (actual English Edition box art)

**Where to get files:**
- You provide real product images
- I will NOT download, generate, or use placeholder images

---

### STEP 2: Code Changes (I Will Do This)

#### 2.1: Add imports to top of `src/data/packs.ts`

**File:** `d:\KAYOU ISRAEL\loveable project KAYOU vsc\src\data\packs.ts`

**Current lines 1-5:**
```typescript
import type { Pack, Rarity } from "./types";
import { ebaySearch } from "@/lib/ebay";
import { CAPSULE_CORP_SOURCE_URL } from "@/lib/catalog-status";
import t4w4Image from "@/assets/packs/t4w4-naruto-sasuke.png";
import t4w5Image from "@/assets/packs/t4w5-naruto-pain.png";
```

**Will become (lines 1-7):**
```typescript
import type { Pack, Rarity } from "./types";
import { ebaySearch } from "@/lib/ebay";
import { CAPSULE_CORP_SOURCE_URL } from "@/lib/catalog-status";
import t4w4Image from "@/assets/packs/t4w4-naruto-sasuke.png";
import t4w5Image from "@/assets/packs/t4w5-naruto-pain.png";
import enVol1Image from "@/assets/packs/en-vol-1-booster.png";
import enVol3Image from "@/assets/packs/en-vol-3-booster.png";
```

---

#### 2.2: Update `enPacks` array in `src/data/packs.ts`

**File:** `d:\KAYOU ISRAEL\loveable project KAYOU vsc\src\data\packs.ts`

**Current location:** Lines ~250-295 (the entire `enPacks` constant)

**Current `.map()` logic:**
```typescript
].map((e, i) => ({
  id: `en-vol-${e.vol}`,
  seriesId: "kayou-en",
  tag: `EN${e.vol}`,
  variant: "booster" as const,
  name: {
    en: `English Edition Vol ${e.vol} Booster Box`,
    zh: `英文版 第${e.vol}弹 整盒`,
    ja: `英語版 Vol ${e.vol} BOX`,
  },
  image: img[(i + 5) % img.length],  // ← THIS LINE CHANGES
  // ... rest of fields (NO OTHER CHANGES BELOW)
  totalCards: 120,
  cardsPerPack: 5,
  packsPerBox: 18,
  // ... continue unchanged to end
}));
```

**Modified `.map()` logic:**
```typescript
].map((e, i) => ({
  id: `en-vol-${e.vol}`,
  seriesId: "kayou-en",
  tag: `EN${e.vol}`,
  variant: "booster" as const,
  name: {
    en: `English Edition Vol ${e.vol} Booster Box`,
    zh: `英文版 第${e.vol}弹 整盒`,
    ja: `英語版 Vol ${e.vol} BOX`,
  },
  image: e.vol === 1 ? enVol1Image : e.vol === 3 ? enVol3Image : img[(i + 5) % img.length],
  imageStatus: e.vol === 1 || e.vol === 3 ? "verified" : undefined,  // ← NEW FIELD
  // ... rest of fields (NO OTHER CHANGES BELOW)
  totalCards: 120,
  cardsPerPack: 5,
  packsPerBox: 18,
  // ... continue unchanged to end
}));
```

**What changes:**
1. Line with `image:` — Replace the value with conditional logic
2. Add new line after `image:` with `imageStatus:` field

**What does NOT change:**
- Every other field in the object remains identical
- en-vol-2 still uses placeholder: `img[(i + 5) % img.length]` and `imageStatus` undefined
- All fields below `image` and `imageStatus` are unchanged

---

## STATUS FIELD DECISIONS

### What STAYS Unchanged (Do NOT modify):

| Field | Current | Reason |
|---|---|---|
| `recordStatus` | `"demo"` | Product data (card list, pull rates, prices) is still prototype — only the **image** is verified |
| `sourceStatus` | `"Unverified"` | Product identity/sourcing is still unverified — only the **image** is verified |
| `priceStatus` | `"demo_estimate"` | Price is still estimated — image verification doesn't change price status |
| `pullRateStatus` | `"demo_estimate"` | Pull rates are still estimated — image verification doesn't change pull rates |
| `checklistStatus` | `"incomplete"` | Checklist is still incomplete — image verification doesn't affect card completeness |
| `printLanguage` | `"English"` | No change needed |
| `marketRegion` | `"UNKNOWN"` | No change needed |

### What CHANGES (Add this field):

| Field | New Value | Reason |
|---|---|---|
| `imageStatus` | `"verified"` (only for vol 1 & 3) | Image is now verified real product photo, not Unsplash |

**Key principle:** We're only saying "the image is verified," not "the entire product is verified."

---

## HOMEPAGE ALLOWLIST LOGIC

**Current logic in `src/routes/index.tsx` (lines ~31-32):**
```typescript
const HOMEPAGE_ALLOWED_PLACEHOLDER_BOX_IDS = new Set(["en-vol-1", "en-vol-3"]);
```

**What happens after implementation:**
- ✅ Keep this line **unchanged**
- No harm keeping it — it's just an exception list
- Once `en-vol-1` and `en-vol-3` have `imageStatus: "verified"`, they will qualify naturally
- The allowlist becomes redundant but doesn't hurt

**Filter function (line ~52) — No changes needed:**
```typescript
function pickFeaturedBoxes(): Pack[] {
  return FEATURED_BOX_IDS.map((id) => packs.find((p) => p.id === id))
    .filter((p): p is Pack => !!p && (p.imageStatus === "verified" || HOMEPAGE_ALLOWED_PLACEHOLDER_BOX_IDS.has(p.id)))
    .slice(0, 4);
}
```

**After implementation:**
- `en-vol-1` will pass because `imageStatus === "verified"` ✓
- `en-vol-3` will pass because `imageStatus === "verified"` ✓
- Allowlist exception is still there but no longer needed

**Recommendation:** Keep allowlist as-is for now (future proofing in case you want to add en-vol-2 temporarily).

---

## EXACT CODE CHANGES SUMMARY

### File to Edit
```
src/data/packs.ts
```

### Change 1: Add 2 imports (after line 5)
```typescript
import enVol1Image from "@/assets/packs/en-vol-1-booster.png";
import enVol3Image from "@/assets/packs/en-vol-3-booster.png";
```

### Change 2: Update enPacks map function (line ~267, the `image:` field)
**FROM:**
```typescript
image: img[(i + 5) % img.length],
```

**TO:**
```typescript
image: e.vol === 1 ? enVol1Image : e.vol === 3 ? enVol3Image : img[(i + 5) % img.length],
```

### Change 3: Add imageStatus field (after the `image:` line)
**INSERT NEW LINE:**
```typescript
imageStatus: e.vol === 1 || e.vol === 3 ? "verified" : undefined,
```

**Full context after changes (lines ~250-280):**
```typescript
const enPacks: Pack[] = [
  { vol: 1, price: 145 },
  { vol: 2, price: 132 },
  { vol: 3, price: 128 },
].map((e, i) => ({
  id: `en-vol-${e.vol}`,
  seriesId: "kayou-en",
  tag: `EN${e.vol}`,
  variant: "booster" as const,
  name: {
    en: `English Edition Vol ${e.vol} Booster Box`,
    zh: `英文版 第${e.vol}弹 整盒`,
    ja: `英語版 Vol ${e.vol} BOX`,
  },
  image: e.vol === 1 ? enVol1Image : e.vol === 3 ? enVol3Image : img[(i + 5) % img.length],
  imageStatus: e.vol === 1 || e.vol === 3 ? "verified" : undefined,
  totalCards: 120,
  cardsPerPack: 5,
  packsPerBox: 18,
  ebayUrl: ebaySearch(`english edition vol ${e.vol} booster box`),
  priceUsd: e.price,
  priceUpdated: undefined,
  priceSource: "estimate" as const,
  priceStatus: "demo_estimate" as const,
  pullRates: [
    { rarity: "C" as Rarity, odds: "1 : 1" },
    { rarity: "R" as Rarity, odds: "1 : 3" },
    { rarity: "SR" as Rarity, odds: "1 : 6" },
    { rarity: "SSR" as Rarity, odds: "1 : 22" },
    { rarity: "UR" as Rarity, odds: "1 : 65" },
  ],
  pullRateStatus: "demo_estimate" as const,
  priceHistory: history(e.price),
  marketRegion: "UNKNOWN" as const,
  printLanguage: "English" as const,
  releaseLine: "Tier/Wave" as const,
  sourceStatus: "Unverified" as const,
  recordStatus: "demo" as const,
  checklistStatus: "incomplete" as const,
  productFamily: "english" as const,
  productType: "Booster Box" as const,
}));
```

---

## VERIFICATION CHECKLIST

After implementation, verify:

- [ ] `src/assets/packs/en-vol-1-booster.png` exists and is readable
- [ ] `src/assets/packs/en-vol-3-booster.png` exists and is readable
- [ ] 2 new imports added at top of `packs.ts`
- [ ] `en-vol-1` pack object has `image: enVol1Image` and `imageStatus: "verified"`
- [ ] `en-vol-3` pack object has `image: enVol3Image` and `imageStatus: "verified"`
- [ ] `en-vol-2` still uses placeholder image and has no `imageStatus` field
- [ ] Build runs: `npm.cmd run build` (should succeed with no errors)
- [ ] No changes to card data or migrations
- [ ] Homepage shows en-vol-1 and en-vol-3 with new images (no more Unsplash)

---

## ROLLBACK (If Needed)

If anything goes wrong, reverting is simple:

1. Delete `en-vol-1-booster.png` and `en-vol-3-booster.png` from `src/assets/packs/`
2. Remove the 2 new imports from top of `packs.ts`
3. Revert `enPacks` `image:` field and remove `imageStatus:` field
4. Run `npm.cmd run build` again

No database changes, no card data affected.

---

## READY FOR IMPLEMENTATION?

✅ **Yes, when you provide:**
1. Real product image for English Edition Vol 1 (named `en-vol-1-booster.png`)
2. Real product image for English Edition Vol 3 (named `en-vol-3-booster.png`)
3. Confirmation to proceed with code changes

**I will then:**
1. Verify images are placed correctly
2. Add imports and update pack objects exactly as specified
3. Run build to verify no errors
4. Report successful completion
