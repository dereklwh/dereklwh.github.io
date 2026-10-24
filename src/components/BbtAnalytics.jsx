import { useEffect, useMemo, useRef, useState } from "react";
import {
  balanceTimeline,
  formatMoney,
  hasCategories,
  monthlyTotals,
  niceMax,
  spendByCategory,
  spendByDescription,
  weeklyAverage,
} from "../lib/bbtStats";

const HEIGHT = 160;
const PAD = { top: 10, right: 8, bottom: 22, left: 44 };
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

// Draw at the container's real pixel width so text and marks keep their size
function useChartWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(320);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

const compactMoney = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const formatDay = (time) =>
  new Date(time).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// Bar with 4px rounded top corners, square at the baseline
function barPath(x, y, w, h) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

function ChartTitle({ children }) {
  return (
    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#92ACA0]">
      {children}
    </h3>
  );
}

function Tooltip({ leftPct, children }) {
  return (
    <div
      className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-[#92ACA0]/30 bg-white px-3 py-1.5 text-xs shadow-md dark:bg-[#1a2f2a]"
      style={{ left: `${Math.min(85, Math.max(15, leftPct))}%` }}
    >
      {children}
    </div>
  );
}

function YAxis({ ticks, y, width }) {
  return ticks.map((tick) => (
    <g key={tick}>
      <line
        x1={PAD.left}
        x2={width - PAD.right}
        y1={y(tick)}
        y2={y(tick)}
        className="stroke-[#92ACA0]/20"
        strokeWidth="1"
      />
      <text
        x={PAD.left - 6}
        y={y(tick)}
        dy="0.32em"
        textAnchor="end"
        className="fill-[#3e5d58]/60 text-[11px] dark:fill-[#a3c4bc]"
      >
        {compactMoney(tick)}
      </text>
    </g>
  ));
}

function StatTile({ label, value, detail, alert }) {
  return (
    <div className="rounded-lg border border-[#92ACA0]/30 px-3 py-2.5">
      <p className="text-xs text-[#3e5d58]/70 dark:text-[#a3c4bc]">{label}</p>
      <p className={`mt-0.5 truncate text-lg font-bold ${alert ? "text-[#A6192E]" : ""}`}>
        {value}
      </p>
      {detail && (
        <p className="truncate text-xs text-[#3e5d58]/60 dark:text-[#a3c4bc]">{detail}</p>
      )}
    </div>
  );
}

function MonthlyChart({ months }) {
  const [ref, width] = useChartWidth();
  const [active, setActive] = useState(null);
  const max = niceMax(Math.max(...months.map((m) => m.total)));
  const y = (v) => PAD.top + PLOT_H - (v / max) * PLOT_H;
  const slot = (width - PAD.left - PAD.right) / months.length;
  const barW = Math.min(28, slot - 2);
  const current = months.length - 1;

  return (
    <div>
      <ChartTitle>Monthly spending</ChartTitle>
      <div ref={ref} className="relative" onPointerLeave={() => setActive(null)}>
        {active !== null && (
          <Tooltip leftPct={((PAD.left + slot * (active + 0.5)) / width) * 100}>
            <p className="font-semibold">{months[active].fullLabel}</p>
            <p>
              {formatMoney(months[active].total)} · {months[active].count}{" "}
              {months[active].count === 1 ? "expense" : "expenses"}
            </p>
          </Tooltip>
        )}
        <svg viewBox={`0 0 ${width} ${HEIGHT}`} width={width} height={HEIGHT} className="block max-w-full" aria-hidden="true">
          <YAxis ticks={[0, max / 2, max]} y={y} width={width} />
          {months.map((m, i) => {
            const x = PAD.left + slot * i + (slot - barW) / 2;
            const h = y(0) - y(m.total);
            return (
              <g key={m.key}>
                {h > 0 && (
                  <path
                    d={barPath(x, y(m.total), barW, h)}
                    className={
                      i === current
                        ? "fill-[#6f8a84]"
                        : active === i
                          ? "fill-[#7f9b91]"
                          : "fill-[#92ACA0]"
                    }
                  />
                )}
                <text
                  x={PAD.left + slot * (i + 0.5)}
                  y={HEIGHT - 6}
                  textAnchor="middle"
                  className="fill-[#3e5d58]/60 text-[11px] dark:fill-[#a3c4bc]"
                >
                  {m.label}
                </text>
                {/* Full-height hit area so small bars are easy to tap */}
                <rect
                  x={PAD.left + slot * i}
                  y={PAD.top}
                  width={slot}
                  height={PLOT_H}
                  fill="transparent"
                  onPointerEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <table className="sr-only">
        <caption>Monthly spending</caption>
        <tbody>
          {months.map((m) => (
            <tr key={m.key}>
              <th scope="row">{m.fullLabel}</th>
              <td>{formatMoney(m.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BalanceChart({ points }) {
  const [ref, width] = useChartWidth();
  const [active, setActive] = useState(null);
  const plotW = width - PAD.left - PAD.right;

  const first = points[0].time;
  const last = points[points.length - 1].time;
  const span = last - first || 1;
  const x = (t) => PAD.left + ((t - first) / span) * plotW;

  const balances = points.map((p) => p.balance);
  const max = niceMax(Math.max(...balances, 0));
  const min = Math.min(...balances, 0) < 0 ? -niceMax(-Math.min(...balances)) : 0;
  const y = (v) => PAD.top + PLOT_H - ((v - min) / (max - min)) * PLOT_H;

  // Step line: balance holds until the next event, then jumps
  const path = points
    .map((p, i) => (i === 0 ? `M${x(p.time)},${y(p.balance)}` : `H${x(p.time)}V${y(p.balance)}`))
    .join("");

  const handleMove = (e) => {
    const px = e.clientX - ref.current.getBoundingClientRect().left;
    let nearest = 0;
    points.forEach((p, i) => {
      if (Math.abs(x(p.time) - px) < Math.abs(x(points[nearest].time) - px)) nearest = i;
    });
    setActive(nearest);
  };

  const point = active !== null ? points[active] : null;
  const ticks = min < 0 ? [min, 0, max] : [0, max / 2, max];

  return (
    <div>
      <ChartTitle>Pool balance over time</ChartTitle>
      <div ref={ref} className="relative" onPointerLeave={() => setActive(null)}>
        {point && (
          <Tooltip leftPct={(x(point.time) / width) * 100}>
            <p className="font-semibold">{formatDay(point.time)}</p>
            <p>
              {point.change > 0 ? "+" : "−"}
              {formatMoney(Math.abs(point.change))} {point.label}
            </p>
            <p>Balance {formatMoney(point.balance)}</p>
          </Tooltip>
        )}
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          width={width}
          height={HEIGHT}
          aria-hidden="true"
          className="block max-w-full touch-none"
          onPointerMove={handleMove}
          onPointerDown={handleMove}
        >
          <YAxis ticks={ticks} y={y} width={width} />
          <line
            x1={PAD.left}
            x2={width - PAD.right}
            y1={y(0)}
            y2={y(0)}
            className="stroke-[#3e5d58]/40 dark:stroke-[#a3c4bc]/50"
            strokeDasharray="3 3"
          />
          <path d={path} fill="none" strokeWidth="2" strokeLinejoin="round" className="stroke-[#6f8a84] dark:stroke-[#92ACA0]" />
          <text x={PAD.left} y={HEIGHT - 6} className="fill-[#3e5d58]/60 text-[11px] dark:fill-[#a3c4bc]">
            {formatDay(first)}
          </text>
          <text
            x={width - PAD.right}
            y={HEIGHT - 6}
            textAnchor="end"
            className="fill-[#3e5d58]/60 text-[11px] dark:fill-[#a3c4bc]"
          >
            {formatDay(last)}
          </text>
          {point && (
            <g>
              <line
                x1={x(point.time)}
                x2={x(point.time)}
                y1={PAD.top}
                y2={PAD.top + PLOT_H}
                className="stroke-[#3e5d58]/30 dark:stroke-[#a3c4bc]/40"
              />
              <circle
                cx={x(point.time)}
                cy={y(point.balance)}
                r="4"
                strokeWidth="2"
                className="fill-[#6f8a84] stroke-white dark:fill-[#92ACA0] dark:stroke-[#243b35]"
              />
            </g>
          )}
          <rect x={PAD.left} y={PAD.top} width={plotW} height={PLOT_H} fill="transparent" />
        </svg>
      </div>
      <p className="mt-1 text-xs text-[#3e5d58]/60 dark:text-[#a3c4bc]">
        Pool money is counted on the day each pool started.
      </p>
      <table className="sr-only">
        <caption>Pool balance over time</caption>
        <tbody>
          {points.map((p, i) => (
            <tr key={i}>
              <th scope="row">{formatDay(p.time)}</th>
              <td>{p.label}</td>
              <td>{formatMoney(p.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const GROUPINGS = [
  { id: "category", label: "Category" },
  { id: "description", label: "Description" },
];

function BreakdownChart({ rows, grouping, onGroupingChange }) {
  const max = Math.max(...rows.map((r) => r.total));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#92ACA0]">
          Where the money goes
        </h3>
        <div className="flex rounded-lg border border-[#92ACA0]/30 p-0.5 text-xs">
          {GROUPINGS.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={grouping === g.id}
              onClick={() => onGroupingChange(g.id)}
              className={`rounded-md px-2 py-1 transition-colors ${
                grouping === g.id
                  ? "bg-[#92ACA0] font-semibold text-white"
                  : "text-[#3e5d58]/70 hover:bg-[#92ACA0]/10 dark:text-[#a3c4bc]"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.name} className="text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate">{row.name}</span>
              <span className="shrink-0 text-xs text-[#3e5d58]/70 dark:text-[#a3c4bc]">
                {formatMoney(row.total)} · {Math.round(row.share * 100)}%
              </span>
            </div>
            <div className="mt-1 h-2 rounded-r bg-[#92ACA0]/15">
              <div
                className="h-full rounded-r bg-[#92ACA0]"
                style={{ width: `${(row.total / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BbtAnalytics({ pools, expenses, balance, className = "" }) {
  // Until picked, group by category as soon as any expense has one
  const [groupingChoice, setGroupingChoice] = useState(null);
  const grouping = groupingChoice ?? (hasCategories(expenses) ? "category" : "description");

  const stats = useMemo(() => {
    const months = monthlyTotals(expenses);
    const weekly = weeklyAverage(expenses);
    return {
      months,
      weekly,
      timeline: balanceTimeline(pools, expenses),
      breakdown:
        grouping === "category" ? spendByCategory(expenses) : spendByDescription(expenses),
    };
  }, [pools, expenses, grouping]);

  if (expenses.length < 2) {
    return (
      <div className={className}>
        <h2 className="mb-2 text-xl font-semibold">Insights</h2>
        <p className="text-sm text-[#3e5d58]/70 dark:text-[#a3c4bc]">
          Log a few expenses to see trends here.
        </p>
      </div>
    );
  }

  const { months, weekly, timeline, breakdown } = stats;
  const thisMonth = months[months.length - 1].total;
  const lastMonth = months[months.length - 2].total;
  const runwayWeeks = weekly > 0 ? balance / weekly : null;
  const top = breakdown[0];

  let runway = "Not enough data";
  if (balance <= 0) runway = "Top up now";
  else if (runwayWeeks !== null)
    runway = runwayWeeks < 1 ? "Under a week" : `About ${Math.round(runwayWeeks)} wk`;

  return (
    <div className={className}>
      <h2 className="mb-4 text-xl font-semibold">Insights</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="This month"
          value={formatMoney(thisMonth)}
          detail={`vs ${formatMoney(lastMonth)} last month`}
        />
        <StatTile label="Weekly average" value={formatMoney(weekly)} detail="Last 8 weeks" />
        <StatTile
          label="Runway"
          value={runway}
          detail={balance > 0 && weekly > 0 ? `at ${compactMoney(weekly)}/week` : undefined}
          alert={balance <= 0}
        />
        <StatTile
          label="Biggest cost"
          value={top.name}
          detail={`${Math.round(top.share * 100)}% of spending`}
        />
      </div>

      <div className="mt-8 space-y-8">
        <MonthlyChart months={months} />
        {timeline.length >= 2 && <BalanceChart points={timeline} />}
        <BreakdownChart
          rows={breakdown}
          grouping={grouping}
          onGroupingChange={setGroupingChoice}
        />
      </div>
    </div>
  );
}
