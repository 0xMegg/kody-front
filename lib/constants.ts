import type { Currency, DepositSource } from "./types";
import type { BadgeVariant } from "./components/Badge";

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

export const salesReps: Record<string, string> = {
  "REP-01": "정민수",
  "REP-02": "김하나",
  "REP-03": "박서연",
};

export const statusVariantMap: Record<string, BadgeVariant> = {
  주문대기: "warning",
  주문완료: "success",
  주문중지: "neutral",
  출고대기: "info",
  출고완료: "success",
};
