import type { Currency, DepositSource } from "./types";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  KRW: "₩",
  USD: "$",
  EUR: "€",
  RUB: "₽",
};

export const CURRENCIES: Currency[] = ["KRW", "USD", "EUR", "RUB"];

export const DEPOSIT_SOURCES: DepositSource[] = [
  "농협외환",
  "하나외환",
  "Paypal",
  "Payoneer",
];
