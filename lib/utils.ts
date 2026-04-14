import type { Currency } from "./types";

export function formatNumber(n: number, fractionDigits = 2): string {
  return n.toLocaleString("ko-KR", { maximumFractionDigits: fractionDigits });
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbols: Record<Currency, string> = {
    KRW: "₩",
    USD: "$",
    EUR: "€",
    RUB: "₽",
  };
  return `${symbols[currency]}${formatNumber(amount)}`;
}

export function formatCurrencyShort(n: number): string {
  const abs = Math.abs(Math.round(n));
  if (abs >= 1_000_000) return `₩${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `₩${(abs / 1_000).toFixed(0)}K`;
  return `₩${abs}`;
}
