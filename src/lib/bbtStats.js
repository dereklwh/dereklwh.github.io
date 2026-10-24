export const PARTICIPANTS = ["Derek", "Darren", "Jeffrey", "Jacob"];
export const PER_PERSON = 100;
export const CATEGORIES = ["Food and drink", "Badminton", "Shuttlecocks", "Hockey", "Misc"];
export const UNCATEGORIZED = "Uncategorized";

const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

export const formatMoney = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

// Expense dates are plain YYYY-MM-DD strings; read them as local dates
export const parseDate = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const monthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const pooledAmount = (pool) =>
  PARTICIPANTS.filter((name) => pool.paid?.[name]).length * PER_PERSON;

// One bucket per month ending with the current one, including empty months
export function monthlyTotals(expenses, months = 6, now = new Date()) {
  const buckets = [];
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: monthKey(date),
      label: date.toLocaleDateString("en-US", { month: "short" }),
      fullLabel: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      total: 0,
      count: 0,
    });
  }
  const byKey = Object.fromEntries(buckets.map((b) => [b.key, b]));
  for (const e of expenses) {
    const bucket = byKey[e.date.slice(0, 7)];
    if (bucket) {
      bucket.total += e.amount;
      bucket.count += 1;
    }
  }
  return buckets;
}

// Average weekly spend over the last 8 weeks, or since the first expense if that's sooner
export function weeklyAverage(expenses, now = new Date()) {
  if (expenses.length === 0) return 0;
  const first = Math.min(...expenses.map((e) => parseDate(e.date).getTime()));
  const start = Math.max(first, now.getTime() - 8 * WEEK);
  const weeks = Math.max(1, (now.getTime() - start) / WEEK);
  const total = expenses
    .filter((e) => parseDate(e.date).getTime() >= start)
    .reduce((sum, e) => sum + e.amount, 0);
  return total / weeks;
}

// Running balance after each funded pool (at its creation date) and each expense
export function balanceTimeline(pools, expenses) {
  const events = [
    ...pools
      .map((pool) => ({
        time: new Date(pool.createdAt).getTime(),
        change: pooledAmount(pool),
        label: "Pool funded",
        order: 0,
      }))
      .filter((event) => event.change > 0),
    ...expenses.map((e) => ({
      time: parseDate(e.date).getTime(),
      change: -e.amount,
      label: e.description,
      order: 1,
    })),
  ].sort((a, b) => a.time - b.time || a.order - b.order);

  let balance = 0;
  return events.map((event) => {
    balance += event.change;
    return { ...event, balance };
  });
}

// Totals per group name (trimmed, case-insensitive), top `limit` plus "Other"
function spendBy(expenses, getName, limit) {
  const groups = new Map();
  for (const e of expenses) {
    const name = getName(e);
    const key = name.toLowerCase();
    const group = groups.get(key) ?? { name, total: 0 };
    group.total += e.amount;
    groups.set(key, group);
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const sorted = [...groups.values()].sort((a, b) => b.total - a.total);
  const rows = sorted.slice(0, limit);
  const rest = sorted.slice(limit).reduce((sum, g) => sum + g.total, 0);
  if (rest > 0) rows.push({ name: "Other", total: rest });

  return rows.map((row) => ({ ...row, share: total ? row.total / total : 0 }));
}

export const spendByDescription = (expenses, limit = 5) =>
  spendBy(expenses, (e) => e.description.trim() || "Untitled expense", limit);

export const spendByCategory = (expenses) =>
  spendBy(expenses, (e) => e.category || UNCATEGORIZED, CATEGORIES.length + 1);

export const hasCategories = (expenses) => expenses.some((e) => e.category);

// Round up to a 1/2/5 step so axis labels stay tidy
export function niceMax(value) {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 5, 10].find((s) => s * magnitude >= value);
  return step * magnitude;
}
