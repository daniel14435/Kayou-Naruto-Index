/** Build an exact-match eBay search URL for a card or pack name. */
export function ebaySearch(query: string): string {
  const q = encodeURIComponent(`naruto kayou ${query}`.trim());
  // _sop=15 = sort by price + shipping (lowest)
  return `https://www.ebay.com/sch/i.html?_nkw=${q}&_sop=15`;
}
