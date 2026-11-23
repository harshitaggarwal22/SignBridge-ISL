/**
 * islMapper.ts
 *
 * Deterministic English text → ISL gloss sequence mapper for all 60 ISL classes.
 */

export interface IslGloss {
  label: string;
  asset: string | null;
  meaning: string;
  category: string;
}

export const DEMO_GLOSSES: Record<string, IslGloss> = {
  BOY: { label: 'BOY', asset: null, meaning: 'A male child or young man.', category: 'People' },
  BROTHER: { label: 'BROTHER', asset: null, meaning: 'A male sibling.', category: 'Family' },
  DOCTOR: { label: 'DOCTOR', asset: null, meaning: 'A medical professional or physician.', category: 'Emergency' },
  DRINK: { label: 'DRINK', asset: null, meaning: 'To swallow liquid or beverage.', category: 'Everyday' },
  EAT: { label: 'EAT', asset: null, meaning: 'Food, a meal, or something to eat.', category: 'Everyday' },
  FAMILY: { label: 'FAMILY', asset: null, meaning: 'A group of related individuals.', category: 'Family' },
  FATHER: { label: 'FATHER', asset: null, meaning: 'A male parent.', category: 'Family' },
  FOOD: { label: 'FOOD', asset: null, meaning: 'Nourishment or edible items.', category: 'Everyday' },
  FRIEND: { label: 'FRIEND', asset: null, meaning: 'A person with whom one has a bond of mutual affection.', category: 'People' },
  GIRL: { label: 'GIRL', asset: null, meaning: 'A female child or young woman.', category: 'People' },
  GO: { label: 'GO', asset: null, meaning: 'Movement toward another place or destination.', category: 'Everyday' },
  GOOD_AFTERNOON: { label: 'GOOD_AFTERNOON', asset: null, meaning: 'An afternoon greeting.', category: 'Conversation' },
  GOOD_EVENING: { label: 'GOOD_EVENING', asset: null, meaning: 'An evening greeting.', category: 'Conversation' },
  GOOD_MORNING: { label: 'GOOD_MORNING', asset: null, meaning: 'A morning greeting.', category: 'Conversation' },
  GOOD_NIGHT: { label: 'GOOD_NIGHT', asset: null, meaning: 'A nighttime farewell.', category: 'Conversation' },
  HE: { label: 'HE', asset: null, meaning: 'Referring to a male person.', category: 'People' },
  HELLO: { label: 'HELLO', asset: null, meaning: 'A greeting or an opening to a conversation.', category: 'Conversation' },
  HELP: { label: 'HELP', asset: null, meaning: 'A request for assistance or support.', category: 'Emergency' },
  HOSPITAL: { label: 'HOSPITAL', asset: null, meaning: 'A medical care facility.', category: 'Emergency' },
  HOUSE: { label: 'HOUSE', asset: null, meaning: 'A residential building or home.', category: 'Places' },
  HOW_ARE_YOU: { label: 'HOW_ARE_YOU', asset: null, meaning: 'Inquiring about someone\'s well-being.', category: 'Conversation' },
  I: { label: 'I', asset: null, meaning: 'First-person singular pronoun.', category: 'People' },
  MOTHER: { label: 'MOTHER', asset: null, meaning: 'A female parent.', category: 'Family' },
  NO: { label: 'NO', asset: null, meaning: 'Disagreement, refusal, or a negative answer.', category: 'Conversation' },
  OKAY: { label: 'OKAY', asset: null, meaning: 'Expressing approval or agreement.', category: 'Conversation' },
  PLEASE: { label: 'PLEASE', asset: null, meaning: 'A polite request or softening of a message.', category: 'Conversation' },
  SCHOOL: { label: 'SCHOOL', asset: null, meaning: 'An educational institution.', category: 'Places' },
  SHE: { label: 'SHE', asset: null, meaning: 'Referring to a female person.', category: 'People' },
  SISTER: { label: 'SISTER', asset: null, meaning: 'A female sibling.', category: 'Family' },
  STUDENT: { label: 'STUDENT', asset: null, meaning: 'A learner or person attending school.', category: 'People' },
  TEA: { label: 'TEA', asset: null, meaning: 'A hot aromatic beverage.', category: 'Everyday' },
  TEACHER: { label: 'TEACHER', asset: null, meaning: 'An educator or instructor.', category: 'People' },
  THANK_YOU: { label: 'THANK_YOU', asset: null, meaning: 'An expression of gratitude.', category: 'Conversation' },
  TODAY: { label: 'TODAY', asset: null, meaning: 'On or during the present day.', category: 'Everyday' },
  WATER: { label: 'WATER', asset: null, meaning: 'Water, or a request for something to drink.', category: 'Everyday' },
  WE: { label: 'WE', asset: null, meaning: 'First-person plural pronoun.', category: 'People' },
  WHAT: { label: 'WHAT', asset: null, meaning: 'Question token inquiring about a thing.', category: 'Conversation' },
  WHERE: { label: 'WHERE', asset: null, meaning: 'Question token inquiring about a location.', category: 'Conversation' },
  YES: { label: 'YES', asset: null, meaning: 'Agreement, confirmation, or an affirmative answer.', category: 'Conversation' },
  YOU: { label: 'YOU', asset: null, meaning: 'Second-person pronoun.', category: 'People' }
};

const TOKEN_MAP: Array<{ tokens: string[]; gloss: keyof typeof DEMO_GLOSSES }> = [
  // Multi-word phrase aliases (ordered longest-first)
  { tokens: ['good morning'], gloss: 'GOOD_MORNING' },
  { tokens: ['good afternoon'], gloss: 'GOOD_AFTERNOON' },
  { tokens: ['good evening'], gloss: 'GOOD_EVENING' },
  { tokens: ['good night'], gloss: 'GOOD_NIGHT' },
  { tokens: ['how are you', 'how do you do', 'how is it going'], gloss: 'HOW_ARE_YOU' },
  { tokens: ['thank you', 'thanks', 'thankyou'], gloss: 'THANK_YOU' },

  // Single word aliases
  { tokens: ['boy', 'lad'], gloss: 'BOY' },
  { tokens: ['brother', 'bro'], gloss: 'BROTHER' },
  { tokens: ['doctor', 'physician', 'doc'], gloss: 'DOCTOR' },
  { tokens: ['drink', 'drinking'], gloss: 'DRINK' },
  { tokens: ['eat', 'eating', 'hungry', 'meal', 'snack'], gloss: 'EAT' },
  { tokens: ['family', 'relatives'], gloss: 'FAMILY' },
  { tokens: ['father', 'dad', 'papa'], gloss: 'FATHER' },
  { tokens: ['food', 'lunch', 'dinner', 'breakfast'], gloss: 'FOOD' },
  { tokens: ['friend', 'pal', 'buddy'], gloss: 'FRIEND' },
  { tokens: ['girl'], gloss: 'GIRL' },
  { tokens: ['go', 'going', 'leave', 'walk'], gloss: 'GO' },
  { tokens: ['he', 'him', 'his'], gloss: 'HE' },
  { tokens: ['hello', 'hi', 'hey', 'greetings'], gloss: 'HELLO' },
  { tokens: ['help', 'assist', 'assistance'], gloss: 'HELP' },
  { tokens: ['hospital', 'clinic'], gloss: 'HOSPITAL' },
  { tokens: ['house', 'home'], gloss: 'HOUSE' },
  { tokens: ['i', 'me', 'my', 'myself'], gloss: 'I' },
  { tokens: ['mother', 'mom', 'mum', 'mama'], gloss: 'MOTHER' },
  { tokens: ['no', 'nope', 'never', 'not'], gloss: 'NO' },
  { tokens: ['ok', 'okay', 'alright', 'fine'], gloss: 'OKAY' },
  { tokens: ['please', 'kindly'], gloss: 'PLEASE' },
  { tokens: ['school', 'class'], gloss: 'SCHOOL' },
  { tokens: ['she', 'her', 'hers'], gloss: 'SHE' },
  { tokens: ['sister', 'sis'], gloss: 'SISTER' },
  { tokens: ['student', 'pupil'], gloss: 'STUDENT' },
  { tokens: ['tea', 'chai'], gloss: 'TEA' },
  { tokens: ['teacher', 'tutor', 'professor'], gloss: 'TEACHER' },
  { tokens: ['today'], gloss: 'TODAY' },
  { tokens: ['water'], gloss: 'WATER' },
  { tokens: ['we', 'us', 'our'], gloss: 'WE' },
  { tokens: ['what'], gloss: 'WHAT' },
  { tokens: ['where'], gloss: 'WHERE' },
  { tokens: ['yes', 'yeah', 'yep', 'sure'], gloss: 'YES' },
  { tokens: ['you', 'your', 'yours'], gloss: 'YOU' }
];

export interface MapResult {
  glosses: IslGloss[];
  matched: boolean;
  unsupported: string[];
}

export function mapTextToISL(text: string): MapResult {
  const normalized = text.toLowerCase().trim();
  if (!normalized) return { glosses: [], matched: false, unsupported: [] };

  const hits: Array<{ position: number; gloss: keyof typeof DEMO_GLOSSES }> = [];
  const matchedRanges: Array<{ start: number; end: number }> = [];

  for (const entry of TOKEN_MAP) {
    for (const token of entry.tokens) {
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<![a-z])${escaped}(?![a-z])`, 'gi');
      let match: RegExpExecArray | null;
      while ((match = regex.exec(normalized)) !== null) {
        const start = match.index;
        matchedRanges.push({ start, end: start + match[0].length });
        if (!hits.some(h => h.gloss === entry.gloss)) {
          hits.push({ position: start, gloss: entry.gloss });
        }
      }
    }
  }

  hits.sort((a, b) => a.position - b.position);
  const glosses = hits.map(h => DEMO_GLOSSES[h.gloss]);
  const words = [...normalized.matchAll(/[a-z]+(?:'[a-z]+)?/g)];
  const unsupported = words
    .filter(word => {
      const start = word.index ?? 0;
      const end = start + word[0].length;
      return !matchedRanges.some(range => start >= range.start && end <= range.end);
    })
    .map(word => word[0])
    .filter((word, index, all) => all.indexOf(word) === index);

  return { glosses, matched: glosses.length > 0, unsupported };
}
