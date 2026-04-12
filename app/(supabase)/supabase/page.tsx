'use client';

import Link from 'next/link';
import PageHeader from '@/app/(supabase)/_components/PageHeader';
import StatCard from '@/app/(supabase)/_components/StatCard';
import Card from '@/app/(supabase)/_components/Card';
import {
  orders,
  shipments,
  accounts,
  activityEvents,
  getBalanceByAccount,
} from '@/lib/mock-data';

// ---------------------------------------------------------------------------
// KPI computation
// ---------------------------------------------------------------------------

const pendingOrderCount = orders.filter((o) => o.status === '주문대기').length;
const pendingShipmentCount = shipments.filter((s) => s.status === '출고대기').length;

const receivables = (() => {
  let totalKRW = 0;
  for (const acc of accounts) {
    const bal = getBalanceByAccount(acc.id);
    if (bal.totalKRW < 0) {
      totalKRW += bal.totalKRW;
    }
  }
  return totalKRW;
})();

function formatKRW(n: number): string {
  const abs = Math.abs(Math.round(n));
  if (abs >= 1_000_000) return `₩${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `₩${(abs / 1_000).toFixed(0)}K`;
  return `₩${abs}`;
}

const weeklyInboundCount = 12;

// ---------------------------------------------------------------------------
// Weekly trend chart data (hardcoded plausible values)
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
  { name: '영업', desc: '주문 등록 · 거래처 관리', href: '/supabase/orders' },
  { name: '출고', desc: '출고 준비 · 서류 관리', href: '/supabase/shipments' },
  { name: '물류', desc: '피킹 · 배송 추적', href: '/supabase/shipments' },
  { name: '경영관리', desc: '수금 확인 · 미수금 관리', href: '/supabase/payments' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SupabaseDashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="대시보드" />

      {/* Section 1: KPI Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}
      >
        <StatCard
          label="주문대기"
          value={String(pendingOrderCount)}
          trend="up"
          trendLabel="전주 대비 +2"
          highlighted
        />
        <StatCard
          label="출고대기"
          value={String(pendingShipmentCount)}
          trend="down"
          trendLabel="전주 대비 −1"
          highlighted
        />
        <StatCard
          label="미수금 합계"
          value={formatKRW(receivables)}
          trend="up"
          trendLabel="전주 대비 증가"
          highlighted
        />
        <StatCard
          label="금주 입고"
          value={String(weeklyInboundCount)}
          trend="neutral"
          trendLabel="전주와 동일"
          highlighted
        />
      </div>

      {/* Section 2: Weekly Trend Chart */}
      <Card title="주간 주문 추이">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            height: 120,
            padding: '8px 0',
            backgroundColor: 'var(--s-bg-overlay)',
            borderRadius: 4,
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
                  color: 'var(--s-text)',
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {day.count}
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: 40,
                  borderRadius: 3,
                  position: 'relative',
                  height: 72,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${(day.count / maxCount) * 100}%`,
                    backgroundColor: 'var(--s-brand)',
                    borderRadius: 3,
                    transition: 'height 0.3s ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--s-text-muted)',
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
          gap: 12,
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
                  gap: 6,
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--s-text)',
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--s-text-muted)',
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
          {activityEvents.map((evt, i) => {
            const ts = new Date(evt.timestamp);
            const formatted = `${String(ts.getMonth() + 1).padStart(2, '0')}/${String(ts.getDate()).padStart(2, '0')} ${String(ts.getHours()).padStart(2, '0')}:${String(ts.getMinutes()).padStart(2, '0')}`;
            return (
              <div
                key={evt.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  height: 36,
                  borderBottom:
                    i < activityEvents.length - 1
                      ? '1px solid var(--s-border)'
                      : 'none',
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    color: 'var(--s-text-muted)',
                    fontSize: 12,
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: 0,
                    width: 80,
                  }}
                >
                  {formatted}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: 'var(--s-text)',
                    flexShrink: 0,
                  }}
                >
                  {evt.persona}
                </span>
                <span
                  style={{
                    color: 'var(--s-text-muted)',
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
