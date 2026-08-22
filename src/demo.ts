import { PianoBrain } from "./index.js";

const brain = PianoBrain.load();
console.log(`Loaded ${brain.stats.rules} rules, ${brain.stats.patterns} patterns`);
console.log(`Rejected patterns: ${brain.stats.rejectedPatterns.length}`);

const tensions = brain.selectTensions({
  chord: "G7",
  chordQuality: "dominant7",
  chordFunction: "V7",
  resolvesTo: "Cmaj7",
  style: "Jazz",
  difficulty: "intermediate",
  teacherProfile: "hai_piano_course_001",
});
console.log("selectTensions", JSON.stringify(tensions, null, 2));
console.log("explain", JSON.stringify(brain.explainDecision(tensions.decision_id), null, 2));
