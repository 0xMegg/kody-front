'use client';

import Link from 'next/link';
import PageHeader from '@/app/(notion)/_components/PageHeader';
import StatCard from '@/lib/components/StatCard';
import Card from '@/lib/components/Card';
import {
  orders,
  shipments,
  accounts,
  activityEvents,
  getBalanceByAccount,
} from '@/lib/mock-data';
import { formatCurrencyShort } from '@/lib/utils';

// ---------------------------------------------------------------------------
// KPI computation
// ---------------------------------------------------------------------------

const pendingOrderCount = orders.filter((o) => o.status === '주문대기').length;
const pendingShipmentCount = shipments.filter((s) => s.status === '출고대기').length;

const receivables = (() => {
  let totalKRW = 0;
  const byCurrency: Record<string, number> = { USD: 0, EUR: 0, RUB: 0, KRW: 0 };
  for (const acc of accounts) {
    const bal = getBalanceByAccount(acc.id);
    if (bal.totalKRW < 0) {
      totalKRW += bal.totalKRW;
      byCurrency.USD += bal.USD;
      byCurrency.EUR += bal.EUR;
      byCurrency.RUB += bal.RUB;
      byCurrency.KRW += bal.KRW;
    }
  }
  return { totalKRW, byCurrency };
})();

const weeklyInboundCount = 12;

// ---------------------------------------------------------------------------
// Weekly trend chart data
// ---------------------------------------------------------------------------

const weeklyTrend = [
  { label: '월', count: 5 },
  { label: '화', count: 8 },
  { label: '수', count: 6 },
  { label: '목', count: 9 },
  { label: '금', count: 7 },
  { label: '토', count: 3 },
  { label: '일', count: 2 },
];
const maxCount = Math.max(...weeklyTrend.map((d) => d.count));

// ---------------------------------------------------------------------------
// Persona shortcuts
// ---------------------------------------------------------------------------

const personas = [
  { emoji: '📝', name: '영업', desc: '주문 등록 · 거래처 관리', href: '/notion/orders' },
  { emoji: '📦', name: '출고', desc: '출고 준비 · 서류 관리', href: '/notion/shipments' },
  { emoji: '🏬', name: '물류', desc: '피킹 · 배송 추적', href: '/notion/shipments' },
  { emoji: '💳', name: '경영관리', desc: '수금 확인 · 미수금 관리', href: '/notion/payments' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NotionDashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader
        title="오늘의 업무"
        helperText="이 화면에서는 주요 지표와 최근 활동을 한눈에 확인합니다"
      />

      {/* Section 1: KPI Cards — 2x2 grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
        }}
      >
        <StatCard
          label="주문대기"
          value={String(pendingOrderCount)}
          trend="up"
          trendLabel="전주 대비 +2"
        />
        <StatCard
          label="출고대기"
          value={String(pendingShipmentCount)}
          trend="down"
          trendLabel="전주 대비 −1"
        />
        <StatCard
          label="미수금 합계"
          value={formatCurrencyShort(receivables.totalKRW)}
          trend="up"
          trendLabel="전주 대비 증가"
        />
        <StatCard
          label="금주 입고"
          value={String(weeklyInboundCount)}
          trend="neutral"
          trendLabel="전주와 동일"
        />
      </div>

      {/* Section 2: Weekly Trend Chart */}
      <Card title="이번 주 흐름">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            height: 120,
          }}
        >
          {weeklyTrend.map((day) => (
            <div
              key={day.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--k-text)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {day.count}
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: 40,
                  backgroundColor: 'var(--k-bg-sub)',
                  borderRadius: 3,
                  position: 'relative',
                  height: 80,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${(day.count / maxCount) * 100}%`,
                    backgroundColor: 'var(--k-brand)',
                    borderRadius: 3,
                    transition: 'height 180ms ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--k-text-muted)',
                }}
              >
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Section 3: Persona Shortcuts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}
      >
        {personas.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 24 }}>{p.emoji}</span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--k-text)',
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--k-text-muted)',
                  }}
                >
                  {p.desc}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Section 4: Recent Activity Stream */}
      <Card title="최근 활동">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activityEvents.slice(0, 10).map((evt, i) => {
            const ts = new Date(evt.timestamp);
            const formatted = `${String(ts.getMonth() + 1).padStart(2, '0')}/${String(ts.getDate()).padStart(2, '0')} ${String(ts.getHours()).padStart(2, '0')}:${String(ts.getMinutes()).padStart(2, '0')}`;
            return (
              <div
                key={evt.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  height: 44,
                  borderBottom:
                    i < 9
                      ? '1px solid var(--k-border)'
                      : 'none',
                  fontSize: 15,
                }}
              >
                <span
                  style={{
                    color: 'var(--k-text-muted)',
                    fontSize: 13,
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: 0,
                    width: 88,
                  }}
                >
                  {formatted}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: 'var(--k-text)',
                    flexShrink: 0,
                  }}
                >
                  {evt.persona}
                </span>
                <span
                  style={{
                    color: 'var(--k-text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {evt.description}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
