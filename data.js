export const cards = [
  { id: 1, question: "What is useState?", answer: "A React Hook that lets functional components hold and update local state across renders. Returns a state value and a setter function.", category: "React" },
  { id: 2, question: "What is useEffect used for?", answer: "Running side effects after a render — data fetching, subscriptions, DOM mutations. Accepts a cleanup function and optional dependency array.", category: "React" },
  { id: 3, question: "What is the virtual DOM?", answer: "A lightweight in-memory copy of the real DOM. React diffs the new virtual DOM against the previous one and applies only the changed nodes to the real DOM.", category: "React" },
  { id: 4, question: "What is useContext?", answer: "A Hook that reads and subscribes to a React Context value without needing a Consumer wrapper component.", category: "React" },
  { id: 5, question: "What is useReducer?", answer: "An alternative to useState for complex state logic. Accepts a reducer function (state, action) => newState and an initial value.", category: "React" },
  { id: 6, question: "What is useMemo?", answer: "Memoizes an expensive computed value, recalculating only when listed dependencies change — prevents redundant recalculations on every render.", category: "React" },
  { id: 7, question: "What does CSS stand for?", answer: "Cascading Style Sheets — a stylesheet language used to describe the presentation of HTML or XML documents.", category: "CSS" },
  { id: 8, question: "What is the box model?", answer: "Content → Padding → Border → Margin. These four layers define the space every CSS element occupies in the layout.", category: "CSS" },
  { id: 9, question: "What is Flexbox?", answer: "A one-dimensional CSS layout model for distributing space along a main axis (row or column) with powerful alignment controls.", category: "CSS" },
  { id: 10, question: "What is CSS specificity?", answer: "A weight browsers assign to CSS rules. Inline styles beat IDs, which beat classes, which beat elements. Equal specificity defers to source order.", category: "CSS" },
  { id: 11, question: "What is a CSS custom property?", answer: "Variables defined with -- prefix (e.g. --color: red) and consumed via var(--color). Cascade and inherit like regular properties.", category: "CSS" },
  { id: 12, question: "What is a closure?", answer: "A function that retains access to variables from its outer lexical scope even after the outer function has returned.", category: "JavaScript" },
  { id: 13, question: "What does async/await do?", answer: "Syntax sugar over Promises that lets you write asynchronous code that reads synchronously. await pauses execution until the Promise resolves.", category: "JavaScript" },
  { id: 14, question: "What is event bubbling?", answer: "When an event fires on an element, it propagates upward through each ancestor in the DOM tree, triggering their handlers too.", category: "JavaScript" },
  { id: 15, question: "What is the difference between == and ===?", answer: "== performs type coercion before comparing. === compares value AND type with no coercion — always prefer === in production code.", category: "JavaScript" },
  { id: 16, question: "What is the event loop?", answer: "JavaScript's concurrency mechanism: runs synchronous code first, then processes the microtask queue (Promises), then the macrotask queue (setTimeout, etc.).", category: "JavaScript" },
];

export const CATEGORIES = ["All", ...new Set(cards.map(c => c.category))];

export const CATEGORY_COLORS = {
  React:      { bg: "var(--teal-bg)",   text: "var(--teal)",   border: "var(--teal)" },
  CSS:        { bg: "var(--orange-bg)", text: "var(--orange)", border: "var(--orange)" },
  JavaScript: { bg: "var(--accent-dim)",text: "var(--accent)", border: "var(--accent)" },
  All:        { bg: "var(--surface2)",  text: "var(--text-2)", border: "var(--border)" },
};
