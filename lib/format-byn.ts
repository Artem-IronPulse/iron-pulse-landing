export function kopecksToByn(amount: unknown): number | null {
  if (typeof amount === "number") {
    if (!Number.isFinite(amount)) return null;
    return Math.round(amount) / 100;
  }

  if (typeof amount !== "string") return null;

  const trimmed = amount.trim();
  if (!trimmed) return null;

  const kopecks = Number(trimmed);
  if (!Number.isFinite(kopecks)) return null;

  return Math.round(kopecks) / 100;
}

export function formatByn(amountByn: number | null): string {
  if (amountByn === null || !Number.isFinite(amountByn)) return "—";

  const minor = Math.round(amountByn * 100);
  const negative = minor < 0;
  const absolute = Math.abs(minor);
  const whole = Math.floor(absolute / 100);
  const fraction = absolute % 100;
  const body =
    fraction === 0 ? String(whole) : `${whole}.${String(fraction).padStart(2, "0")}`;

  return negative ? `-${body}` : body;
}
