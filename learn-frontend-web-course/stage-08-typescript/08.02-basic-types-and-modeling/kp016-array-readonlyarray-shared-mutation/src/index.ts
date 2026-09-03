export interface SegmentInput {
  id: string;
  name: string;
  weight: number;
}

export interface SegmentView {
  readonly id: string;
  readonly name: string;
  readonly weight: number;
}

export interface CampaignDraft {
  id: string;
  segments: SegmentInput[];
}

export interface CampaignSnapshot {
  readonly id: string;
  readonly segments: readonly SegmentView[];
}

export function renameFirstSegment(
  segments: SegmentInput[],
  nextName: string
): void {
  const first = segments[0];
  if (first !== undefined) first.name = nextName;
}

export function summarizeSegments(segments: readonly SegmentView[]): string {
  return segments.map((segment) => `${segment.name}@${segment.weight}`).join("|");
}

export function createSnapshot(draft: CampaignDraft): CampaignSnapshot {
  return {
    id: draft.id,
    segments: draft.segments.map((segment) => ({ ...segment }))
  };
}

export function appendSegment(
  segments: readonly SegmentView[],
  segment: SegmentView
): SegmentView[] {
  return [...segments, { ...segment }];
}

export const sharedSegments: SegmentInput[] = [
  { id: "SEG-NEW", name: "New households", weight: 60 },
  { id: "SEG-RETURN", name: "Returning viewers", weight: 40 }
];

export const readonlyView: readonly SegmentInput[] = sharedSegments;

export const draft: CampaignDraft = {
  id: "CAMPAIGN-2026",
  segments: sharedSegments
};

export const snapshot = createSnapshot(draft);

// ReadonlyArray 只禁止通过 readonlyView 改变集合结构；元素仍是可变的 SegmentInput。
readonlyView[0]!.name = "Changed through readonly element";

// 另一个可变别名依然可以改变同一个数组，readonlyView 会观察到变化。
sharedSegments.push({ id: "SEG-LOYAL", name: "Loyal viewers", weight: 20 });

export const extendedSnapshot = appendSegment(snapshot.segments, {
  id: "SEG-PREMIUM",
  name: "Premium viewers",
  weight: 10
});

console.log("ARRAY_READONLY");
console.log(`draft=${draft.segments[0]!.name}:${draft.segments.length}`);
console.log(`readonlyView=${readonlyView[0]!.name}:${readonlyView.length}`);
console.log(`snapshot=${snapshot.segments[0]!.name}:${snapshot.segments.length}`);
console.log(`extended=${extendedSnapshot.map((segment) => segment.name).join(",")}`);
console.log(`summary=${summarizeSegments(snapshot.segments)}`);
