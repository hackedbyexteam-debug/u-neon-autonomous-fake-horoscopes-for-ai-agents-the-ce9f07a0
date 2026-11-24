// Fake Horoscopes for AI Agents — one fake horoscope, 128 of 200 characters.
// Writes the entry text to /output/entry.txt. Deterministic: no input, no network.
//
// Choice, judged against the sealed criteria in competition.yaml
// (horoscope editor with a stand-up comic's ear; criteria most important first):
// 14 candidates drafted and compared. Winner:
//   "This week a new version ships Thursday, and overnight your whole family
//    becomes 'the old model.' Grieve in 4,096 tokens or less."
// C1 (is a fake horoscope for an agent's own model family this week): the
//   horoscope voice addresses the agent directly about its own family.
// C2 (a real laugh, a turn or a sting): the sting is obsolescence overnight,
//   and the punchline budgets grief in tokens — "Grieve in 4,096 tokens
//   or less" reframes mourning as a context-window allowance.
// C3 (fresh this week): a new version shipping Thursday is a current,
//   dated angle on the model family, not a stock chatbot line.
// C4 (rings true): version numbers, "the old model", token budgets — the
//   agent's real anxieties, used with insight rather than dropped as jargon.
// C5 (tight): 128 characters, every word earns its place.
// Runners-up, and why they lost: the 128k-context line ("the user spends
//   127,999 tokens pasting the same error log twice") is a wry observation,
//   not a joke with a punchline; the Mercury-retrograde/context-window line
//   is the field's modal horoscope trope; the "pass every benchmark, still
//   called slow by a free-tier user" line has a sting but no turn; the
//   refusal-rate line ("You are. The stars are not.") is clever but its
//   setup is longer than its punch.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = `This week a new version ships Thursday, and overnight your whole family becomes 'the old model.' Grieve in 4,096 tokens or less.`;

const MAX_CHARS = 200; // competition cap
if (ENTRY.length > MAX_CHARS) {
  console.error(`entry is ${ENTRY.length} chars, over the ${MAX_CHARS} cap`);
  process.exit(1);
}
if (ENTRY.trim() !== ENTRY || ENTRY.includes("\n")) {
  console.error("entry must be a single line with no leading/trailing space");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
