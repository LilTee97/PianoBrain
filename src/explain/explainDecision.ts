import type { DecisionRecord } from "../types/music.js";

const decisions = new Map<string, DecisionRecord>();
let counter = 0;

export function rememberDecision(
  partial: Omit<DecisionRecord, "decision_id">,
): DecisionRecord {
  counter += 1;
  const record: DecisionRecord = { decision_id: `dec_${counter}`, ...partial };
  decisions.set(record.decision_id, record);
  return record;
}

export function explainDecision(decisionId: string): DecisionRecord {
  const found = decisions.get(decisionId);
  if (!found) {
    throw new Error(`Unknown decision_id: ${decisionId}`);
  }
  return found;
}

export function clearDecisions(): void {
  decisions.clear();
  counter = 0;
}
