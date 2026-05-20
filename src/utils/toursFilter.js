export const TOURS_FILTER_EVENT = "mariposas:tours-filter";

/** @param {"Semua Paket" | "Umroh" | "Indonesia" | "Turkey"} category */
export function dispatchToursFilter(category) {
  window.dispatchEvent(
    new CustomEvent(TOURS_FILTER_EVENT, { detail: { category } })
  );
}
