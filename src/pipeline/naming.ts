// File naming rules for cutouts.
//
//   tree.png                 one tree in the photo
//   tree-1.png, tree-2.png   several trees, numbered left → right
//   sign-stop.png            a little text on the object goes into the name
//   book-1.png + book-1.txt  a lot of text gets its own .txt next to the PNG
//   packet-kerrygold.png     …and if one line is clearly the headline (much
//     + .txt                 taller than the rest, ≤ 3 words), it names the file

export const TEXT_RULES = {
  /** Text at or under both limits is short enough to put in the filename. */
  nameMaxWords: 5,
  nameMaxChars: 40,
  /** A headline must be this much taller than the median line… */
  headlineHeightRatio: 1.5,
  /** …and this short. */
  headlineMaxWords: 3,
  /** Max length of the whole base filename. */
  maxBaseLength: 60,
};

export type TextLine = { text: string; score: number; box: { x: number; y: number; w: number; h: number } };

export type TextSummary =
  | { kind: "none" }
  | { kind: "short"; text: string }
  | { kind: "long"; text: string; headline?: string };

export function slug(s: string, max = 40): string {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/g, "");
}

/** Order OCR lines top-to-bottom, left-to-right, grouping lines on the same row. */
export function readingOrder(lines: TextLine[]): TextLine[] {
  const sorted = [...lines].sort((a, b) => a.box.y - b.box.y);
  const rows: TextLine[][] = [];
  for (const l of sorted) {
    const cy = l.box.y + l.box.h / 2;
    const row = rows.find((r) => {
      const ref = r[0];
      return Math.abs(ref.box.y + ref.box.h / 2 - cy) < Math.min(ref.box.h, l.box.h) * 0.5;
    });
    if (row) row.push(l);
    else rows.push([l]);
  }
  return rows.flatMap((r) => r.sort((a, b) => a.box.x - b.box.x));
}

export function summarizeText(lines: TextLine[]): TextSummary {
  const clean = readingOrder(lines)
    .map((l) => l.text.trim())
    .filter((t) => /[\p{L}\p{N}]{2,}/u.test(t));
  if (clean.length === 0) return { kind: "none" };
  const joined = clean.join(" ").replace(/\s+/g, " ").trim();
  const words = joined.split(" ").length;
  if (words <= TEXT_RULES.nameMaxWords && joined.length <= TEXT_RULES.nameMaxChars) {
    return { kind: "short", text: joined };
  }
  return { kind: "long", text: clean.join("\n"), headline: headline(lines) };
}

/** The visually dominant line (brand name, sign title), if there clearly is one. */
function headline(lines: TextLine[]): string | undefined {
  const usable = lines.filter((l) => /[\p{L}]{3,}/u.test(l.text));
  if (usable.length < 2) return undefined;
  const heights = usable.map((l) => l.box.h).sort((a, b) => a - b);
  const median = heights[Math.floor(heights.length / 2)];
  const top = usable.reduce((a, b) => (b.box.h > a.box.h ? b : a));
  const words = top.text.trim().split(/\s+/).length;
  if (top.box.h >= median * TEXT_RULES.headlineHeightRatio && words <= TEXT_RULES.headlineMaxWords) {
    return top.text.trim();
  }
  return undefined;
}

export type Nameable = {
  label: string;
  box: { x: number; y: number; w: number; h: number };
  text: TextSummary;
};

/** Assign unique base names (no extension). Returned in input order. */
export function assignNames(items: Nameable[]): string[] {
  const bases = items.map((it) => {
    const label = slug(it.label) || "object";
    const textPart =
      it.text.kind === "short" ? slug(it.text.text, 32) : it.text.kind === "long" && it.text.headline ? slug(it.text.headline, 32) : "";
    const base = textPart && !label.includes(textPart) ? `${label}-${textPart}` : label;
    return base.slice(0, TEXT_RULES.maxBaseLength).replace(/-+$/g, "");
  });

  const groups = new Map<string, number[]>();
  bases.forEach((b, i) => groups.set(b, [...(groups.get(b) ?? []), i]));

  const names = [...bases];
  for (const [base, idxs] of groups) {
    if (idxs.length < 2) continue;
    idxs
      .sort((a, b) => cx(items[a]) - cx(items[b]) || items[a].box.y - items[b].box.y)
      .forEach((idx, n) => (names[idx] = `${base}-${n + 1}`));
  }
  return names;
}

const cx = (it: Nameable) => it.box.x + it.box.w / 2;
