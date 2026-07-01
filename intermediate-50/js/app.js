/**
 * intermediate-50/js/app.js
 * Security hardened, ARIA-compliant, no inline handlers.
 */
'use strict';


// All code samples stored as plain strings (no template literals) to avoid syntax conflicts
const Q = [
  {
    id:1,cat:"React / Next.js",tech:["React"],diff:"Medium",
    q:"What is the difference between useEffect and useLayoutEffect, and when would you use each?",
    a:"<strong>useEffect</strong> runs <em>after</em> the browser has painted the screen — asynchronous with respect to rendering. <strong>useLayoutEffect</strong> runs <em>synchronously after</em> all DOM mutations but <em>before</em> the browser paints, so the user never sees an intermediate state.<br><br>Use <strong>useEffect</strong> for: data fetching, subscriptions, logging — anything that doesn't need to block the paint.<br><br>Use <strong>useLayoutEffect</strong> for: reading DOM measurements (getBoundingClientRect), preventing visual flicker when you need to reposition elements before the user sees them.",
    code:"// useEffect — safe for data fetching\nuseEffect(() => {\n  fetchUser(id).then(setUser);\n}, [id]);\n\n// useLayoutEffect — prevents flicker for DOM reads\nuseLayoutEffect(() => {\n  const h = ref.current.getBoundingClientRect().height;\n  setHeight(h); // sets state before paint\n}, []);",
    explain:'"I think of useEffect as \'fire and forget after render\' — perfect for side effects that don\'t affect layout. useLayoutEffect is my go-to when I need to read the DOM and immediately update something to avoid a visible flash. A real example is a tooltip that needs to position itself based on its own rendered size."',
    tip:"If you're seeing flickering UI, replacing useEffect with useLayoutEffect for that specific DOM read fixes it almost every time."
  },
  {
    id:2,cat:"React / Next.js",tech:["React"],diff:"Hard",
    q:"Explain React's reconciliation algorithm and how the 'key' prop affects it.",
    a:"React's <strong>reconciliation</strong> is the process of comparing the previous virtual DOM tree with the new one (diffing) to find the minimal set of real DOM operations needed. React uses two heuristics:<br><br>1. <strong>Same type → update</strong>: React updates attributes and recurses into children.<br>2. <strong>Different type → destroy &amp; recreate</strong>: React unmounts the old tree and builds a fresh one.<br>3. <strong>Keys for lists</strong>: React uses the <code>key</code> prop to match elements across renders. Without keys, React matches by position — causing bugs when items reorder.",
    code:"// Bad — index key breaks reordering and animations\nitems.map((item, i) => &lt;Card key={i} data={item} /&gt;)\n\n// Good — stable identity from the data\nitems.map(item => &lt;Card key={item.id} data={item} /&gt;)",
    explain:'"React\'s reconciler is like a smart diff tool. The key prop is an element\'s stable identity in a list. Without it, React guesses by position — breaking animations, form state, and focus management. My rule: the key must always come from the data, never the loop index, unless the list is completely static."',
    tip:"Index keys are only safe when a list never reorders, filters, or changes length. In any other case, use a unique ID from your data source."
  },
  {
    id:3,cat:"React / Next.js",tech:["Next.js","React"],diff:"Medium",
    q:"What are React Server Components (RSC) and how do they differ from Client Components in Next.js App Router?",
    a:"<strong>React Server Components (RSC)</strong> run exclusively on the server. They have zero JS bundle impact on the client and can directly access server resources — databases, file systems, environment variables — without an API layer.<br><br><strong>Client Components</strong> (marked with <code>'use client'</code>) run in the browser and support hooks, event listeners, and browser APIs.<br><br>In Next.js App Router, <em>all components are Server Components by default</em>. You opt into client-side interactivity only when needed.",
    code:"// app/users/page.tsx — Server Component (default)\nasync function UsersPage() {\n  const users = await db.query('SELECT * FROM users');\n  return &lt;UserList users={users} /&gt;;\n}\n\n// components/LikeButton.tsx — Client Component\n'use client';\nexport function LikeButton() {\n  const [liked, setLiked] = useState(false);\n  return &lt;button onClick={() => setLiked(!liked)}&gt;Like&lt;/button&gt;;\n}",
    explain:'"RSC is the biggest mental shift in React in years. Server Components are for fetching and rendering; Client Components are for interactivity. I start everything as a server component and only add \'use client\' when I actually need state or browser events — keeping the JS bundle tiny."',
    tip:"Push 'use client' as far down the tree as possible. Wrap only the interactive leaf — not the whole page — to maximize server rendering benefits."
  },
  {
    id:4,cat:"React / Next.js",tech:["React"],diff:"Medium",
    q:"What are React custom hooks and why would you create one? Give a real-world example.",
    a:"A <strong>custom hook</strong> is a JavaScript function whose name starts with <code>use</code> and that calls other hooks inside it. They let you extract and reuse stateful logic across components without changing component structure.<br><br>Think of them like utility functions — but for stateful logic. Common uses: data fetching, form handling, window resize, debouncing, auth state.",
    code:"// Custom hook: useDebounce\nfunction useDebounce(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer); // cleanup\n  }, [value, delay]);\n  return debounced;\n}\n\n// Usage\nfunction SearchBar() {\n  const [query, setQuery] = useState('');\n  const debouncedQuery = useDebounce(query, 400);\n  useEffect(() => {\n    if (debouncedQuery) fetchResults(debouncedQuery);\n  }, [debouncedQuery]);\n  return &lt;input value={query} onChange={e => setQuery(e.target.value)} /&gt;;\n}",
    explain:'"Custom hooks are my favourite React pattern. Any time I copy the same useEffect or useState logic into two components, that\'s my signal to extract a custom hook. I always mention useDebounce as an example — it shows both useEffect cleanup and real-world utility."',
    tip:"The 'use' prefix is not just convention — React's linter (eslint-plugin-react-hooks) uses it to enforce the Rules of Hooks inside your function. Never skip the prefix."
  },
  {
    id:5,cat:"React / Next.js",tech:["Next.js"],diff:"Medium",
    q:"What are Next.js API routes and when would you use them vs a separate backend?",
    a:"Next.js <strong>API routes</strong> (App Router: <em>Route Handlers</em>) let you write server-side endpoint logic directly inside your Next.js project under <code>app/api/</code>. They run on Node.js and can connect to databases, call third-party APIs, and handle authentication.<br><br><strong>Use API routes when:</strong> your app is small-to-medium, you want a single deployment, and the backend logic is simple (form submissions, webhooks, auth callbacks).<br><br><strong>Use a separate backend when:</strong> multiple clients consume the API (mobile + web), you need microservices, or the backend team works independently.",
    code:"// app/api/contact/route.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nexport async function POST(req: NextRequest) {\n  const { name, email, message } = await req.json();\n  await sendEmail({ to: 'you@site.com', name, message });\n  return NextResponse.json({ success: true }, { status: 200 });\n}",
    explain:'"I think of Next.js API routes as a built-in BFF (Backend For Frontend). For a contact form or a Stripe webhook, there\'s no reason to spin up a separate Express server. But if the same API needs to serve a mobile app and a web app, I\'d split it into a dedicated backend."',
    tip:"Route Handlers in App Router support all HTTP methods (GET, POST, PUT, DELETE) via named exports. You no longer need to check req.method like in the old Pages Router."
  },
  {
    id:6,cat:"React / Next.js",tech:["React","Redux","Zustand"],diff:"Medium",
    q:"Compare Redux Toolkit and Zustand — when would you choose one over the other?",
    a:"<strong>Redux Toolkit (RTK)</strong> is structured and opinionated — strict unidirectional data flow (action → reducer → store). It excels in large apps where predictability, strong conventions, and powerful DevTools (time-travel debugging) are needed.<br><br><strong>Zustand</strong> is a minimal, hook-based library with almost zero boilerplate. You define a store as a plain JS object with actions. Perfect for small-to-medium apps where you want simplicity without sacrificing DevTools support.",
    code:"// Redux Toolkit\nconst counterSlice = createSlice({\n  name: 'counter', initialState: { value: 0 },\n  reducers: { increment: state => { state.value++ } }\n});\n\n// Zustand — same thing in 4 lines\nconst useCounter = create(set => ({\n  value: 0,\n  increment: () => set(s => ({ value: s.value + 1 }))\n}));\n\n// Usage\nconst { value, increment } = useCounter();",
    explain:'"I compare Redux to a large enterprise with strict processes — auditable and scalable. Zustand is a nimble startup — fast and light. Zustand is my default for personal projects. For a team of 5+ developers sharing complex server-synced state, I\'d choose RTK because conventions reduce coordination overhead."',
    tip:"RTK Query (included in Redux Toolkit) is a powerful data-fetching and caching layer. If you're already using RTK, try RTK Query before reaching for React Query or SWR."
  },
  {
    id:7,cat:"React / Next.js",tech:["React"],diff:"Hard",
    q:"What is React's Concurrent Mode and what problems does it solve?",
    a:"<strong>Concurrent Mode</strong> (React 18+) lets React work on multiple tasks simultaneously — pausing and resuming rendering as needed. Before it, rendering was synchronous and could freeze the UI on slow renders.<br><br>Key APIs: <code>startTransition</code> (marks updates as non-urgent), <code>useDeferredValue</code> (defers a derived value), and improved <code>Suspense</code>. The result is a UI that stays responsive even during heavy renders.",
    code:"import { useState, startTransition } from 'react';\n\nfunction Search() {\n  const [input, setInput] = useState('');\n  const [query, setQuery] = useState('');\n\n  const handleChange = (e) => {\n    setInput(e.target.value); // urgent — updates immediately\n    startTransition(() => {\n      setQuery(e.target.value); // non-urgent — can be interrupted\n    });\n  };\n\n  return (\n    &lt;&gt;\n      &lt;input value={input} onChange={handleChange} /&gt;\n      &lt;HeavyResultsList query={query} /&gt;\n    &lt;/&gt;\n  );\n}",
    explain:'"Concurrent Mode solves the \'jank on slow renders\' problem. Without startTransition, every keystroke triggers a heavy re-render that makes typing sluggish. With startTransition, React knows the results update is low-priority and keeps the input snappy. It\'s a huge UX win with minimal code change."',
    tip:"You don't opt into Concurrent Mode — React 18 uses it automatically with createRoot(). startTransition and useDeferredValue are the tools you add manually where needed."
  },
  {
    id:8,cat:"React / Next.js",tech:["React","Next.js","Google Lighthouse"],diff:"Hard",
    q:"Walk me through how you'd optimize a slow Next.js page using Lighthouse.",
    a:"I follow a <strong>measure → identify → fix → verify</strong> cycle:<br><br>1. <strong>Measure</strong> with Lighthouse to get LCP, FCP, CLS, TBT scores.<br>2. <strong>LCP</strong>: preload hero images, use Next.js Image with priority, use RSC so HTML is server-rendered.<br>3. <strong>TBT</strong>: code-split with dynamic(), defer non-critical JS, avoid large third-party scripts.<br>4. <strong>CLS</strong>: always set width/height on images, reserve space with skeleton loaders.<br>5. <strong>Caching</strong>: use Next.js ISR or React cache() for expensive server data.",
    code:"// Next.js Image with priority for LCP hero\nimport Image from 'next/image';\n// &lt;Image src='/hero.webp' width={1200} height={600} priority alt='Hero' /&gt;\n\n// Dynamic import — splits heavy component into its own chunk\nimport dynamic from 'next/dynamic';\nconst HeavyMap = dynamic(() => import('./Map'), {\n  loading: () => &lt;Skeleton /&gt;,\n  ssr: false\n});\n\n// ISR — revalidate page every 60s without a full redeploy\nexport const revalidate = 60;",
    explain:'"When a client shows me a slow page, I open Lighthouse first. It tells me exactly where time is lost — I never guess. The three issues I fix most often are: unoptimized images (Next.js Image), large JS bundles (dynamic imports), and layout shift (skeleton components)."',
    tip:"Run Lighthouse in Incognito mode with extensions disabled. Extensions can inflate or deflate scores significantly. Also test in production build — dev mode is much slower."
  },

  // ── JAVASCRIPT / TYPESCRIPT ──────────────────────────────────────────────
  {
    id:9,cat:"JavaScript",tech:["JavaScript"],diff:"Medium",
    q:"What is the JavaScript event loop and how does it handle async operations?",
    a:"JavaScript is <strong>single-threaded</strong> but handles async through the <strong>event loop</strong>:<br><br>1. <strong>Call Stack</strong>: Synchronous code executes here (LIFO).<br>2. <strong>Web / Node APIs</strong>: Async operations (setTimeout, fetch, I/O) live here while completing.<br>3. <strong>Microtask Queue</strong>: Resolved Promises queue here — processed <em>before</em> the next macrotask (highest priority).<br>4. <strong>Macrotask Queue</strong>: setTimeout, setInterval callbacks queue here.<br><br>Order: Call stack empties → drain all microtasks → process one macrotask → repeat.",
    code:"console.log('1 - sync');\n\nsetTimeout(() => console.log('4 - macrotask'), 0);\n\nPromise.resolve()\n  .then(() => console.log('3 - microtask'));\n\nconsole.log('2 - sync');\n\n// Output order: 1, 2, 3, 4",
    explain:'"I explain the event loop like a restaurant: the chef (call stack) can only cook one dish at a time. Async orders go to the back (Web APIs). When done, they return as tickets. Promise callbacks are VIP tickets — they always jump ahead of setTimeout. This is why setTimeout(fn, 0) always runs after .then(), even with 0ms delay."',
    tip:"Understanding microtask vs macrotask priority is the key to debugging async ordering bugs. If code runs 'too early' or 'too late,' ask: is it a Promise or a setTimeout?"
  },
  {
    id:10,cat:"JavaScript",tech:["TypeScript"],diff:"Medium",
    q:"What are TypeScript generics and why are they useful? Give a practical example.",
    a:"<strong>Generics</strong> let you write reusable, type-safe code that works with multiple types — like type variables. Without generics, you'd use <code>any</code> (losing type safety) or write duplicate functions for each type.<br><br>They're most useful in utility functions, custom hooks, and API response wrappers.",
    code:"// Without generics — loses type safety\nfunction getFirst(arr) { return arr[0]; }\n\n// With generics — flexible AND type-safe\nfunction getFirst(arr) { return arr[0]; } // T inferred\n\nconst name = getFirst(['Alice', 'Bob']); // string\nconst num  = getFirst([1, 2, 3]);        // number\n\n// Real-world: generic API response wrapper\ntype ApiRes = { data: T; status: number; error: string | null };\n\nasync function fetchUser(id) {\n  const res = await fetch('/api/users/' + id);\n  return res.json();\n}",
    explain:'"I use generics whenever I build something reusable. The clearest example is an API response wrapper — instead of typing data as \'any\', I make it generic. TypeScript then knows exactly what shape the response holds, giving full autocomplete and error catching without duplicate types."',
    tip:"Generics shine in custom hooks. A useFetch hook can return typed data — the caller decides the type, keeping the hook fully reusable across every API endpoint."
  },
  {
    id:11,cat:"JavaScript",tech:["JavaScript"],diff:"Easy",
    q:"What is the difference between var, let, and const in JavaScript?",
    a:"<strong>var</strong> is function-scoped, hoisted and initialized as <code>undefined</code>, and can be re-declared. These traits cause hard-to-find bugs and are why var is avoided in modern JS.<br><br><strong>let</strong> is block-scoped, hoisted but not initialized (Temporal Dead Zone — accessing before declaration throws ReferenceError), and cannot be re-declared in the same scope.<br><br><strong>const</strong> is block-scoped like let, but the binding cannot be reassigned. Important: objects and arrays declared with const are still <em>mutable</em>.",
    code:"var x = 1;\nvar x = 2; // OK — dangerous re-declaration!\n\nlet y = 1;\n// let y = 2; // SyntaxError: already declared\n\nconst obj = { name: 'Alice' };\nobj.name = 'Bob';  // OK — object properties are mutable\n// obj = {};       // TypeError — reference is locked",
    explain:'"My simple rule: always const first. If I need to reassign, switch to let. Never use var — its function scope and hoisting cause subtle bugs. I also make sure to mention that const doesn\'t make objects immutable — only the reference is locked."',
    tip:"To deeply freeze an object (making it truly immutable), use Object.freeze(). Note it's shallow — nested objects still need their own freeze() call."
  },
  {
    id:12,cat:"JavaScript",tech:["JavaScript"],diff:"Medium",
    q:"Explain closures in JavaScript with a practical use case.",
    a:"A <strong>closure</strong> is a function that retains access to its outer (lexical) scope even after the outer function has returned. Every function in JavaScript creates a closure over its surrounding scope — it's a fundamental feature, not a trick.<br><br>Closures power: data privacy / encapsulation, factory functions, partial application / currying, and the way React hooks like useState work internally.",
    code:"// Closure for data privacy — module pattern\nfunction createCounter(initialValue) {\n  let count = initialValue || 0; // private variable\n\n  return {\n    increment() { count++; },\n    decrement() { count--; },\n    getCount() { return count; }\n  };\n}\n\nconst counter = createCounter(10);\ncounter.increment();\nconsole.log(counter.getCount()); // 11\n// 'count' is inaccessible from outside",
    explain:'"I describe a closure as a function that \'remembers\' where it was born. The classic example is a counter factory — the outer variable count is private, and only the returned methods can touch it. I also connect it to React: useState uses closures to keep each component\'s state separate across renders."',
    tip:"Closures in loops are a classic interview gotcha. Using var in a loop creates one shared binding — all closures capture the same variable. Using let creates a new binding per iteration, which fixes the issue."
  },
  {
    id:13,cat:"JavaScript",tech:["JavaScript"],diff:"Easy",
    q:"What is the difference between == and === in JavaScript, and what is type coercion?",
    a:"<strong>===</strong> (strict equality) compares both <em>value and type</em>. No conversion — if types differ, it returns false immediately.<br><br><strong>==</strong> (loose equality) performs <em>type coercion</em> before comparison — JavaScript converts values to a common type, leading to surprising results.<br><br><strong>Type coercion</strong> is JavaScript's automatic conversion of values from one type to another (e.g., string to number).",
    code:"// Strict equality — predictable\n1 === '1'        // false (number vs string)\nnull === undefined // false\n\n// Loose equality — coercion happens\n1 == '1'         // true  (string coerced to number)\nnull == undefined // true  (special rule)\n0 == false       // true  (false coerced to 0)\n'' == false      // true  (both become 0)\n\n// Always use ===\nconsole.log([] == false); // true — very surprising!",
    explain:'"I always use === and recommend the same to my team. The coercion rules of == are hard to memorize and create subtle bugs. The only exception I allow is the null check: `value == null` catches both null and undefined in one expression, which can be useful."',
    tip:"null == undefined is true with ==. This is the one intentional use of loose equality — writing if (value == null) cleanly catches both null and undefined without two separate checks."
  },

  // ── CSS / TAILWIND ────────────────────────────────────────────────────────
  {
    id:14,cat:"CSS / Tailwind",tech:["CSS","TailwindCSS"],diff:"Easy",
    q:"Explain CSS specificity and how it interacts with TailwindCSS utility classes.",
    a:"<strong>Specificity</strong> is how the browser decides which CSS rule wins when multiple rules target the same element. Scoring (high to low): inline styles, ID selectors, classes/attributes/pseudo-classes, elements/pseudo-elements.<br><br>TailwindCSS uses single utility classes (one class = 0,0,1,0), keeping specificity low and predictable. When two Tailwind classes conflict, the one later in the generated stylesheet wins — not the one later in your HTML.",
    code:"/* Specificity conflict */\n.card .title { color: blue; }   /* 0,0,2,0 — beats Tailwind */\n.text-red-500 { color: red; }   /* 0,0,1,0 — loses */\n\n/* Fix 1: Tailwind important modifier (v3+) */\n/* Use class='!text-red-500' in HTML */\n\n/* Fix 2: Tailwind @layer directive */\n@layer utilities {\n  .text-red-500 { color: red; } /* utilities beat components */\n}",
    explain:'"Specificity is CSS\'s voting system. Tailwind wins because it keeps specificity flat — almost everything is one class. When third-party CSS overrides my Tailwind, I use the ! prefix modifier rather than writing !important manually. It\'s surgical and doesn\'t pollute other styles."',
    tip:"Use Tailwind's @layer directive to place custom CSS into the right cascade layer. Styles in @layer components have lower specificity than utilities, so utilities always win."
  },
  {
    id:15,cat:"CSS / Tailwind",tech:["CSS"],diff:"Easy",
    q:"What is the CSS Box Model and how does box-sizing affect it?",
    a:"The <strong>Box Model</strong> describes how every HTML element is rendered as a box with four layers (inside out): content → padding → border → margin.<br><br>Default <code>box-sizing: content-box</code>: width/height applies only to the <em>content area</em> — padding and border are added on top, making elements larger than declared.<br><br><code>box-sizing: border-box</code>: width/height includes padding and border — the element stays exactly the size you set. Almost all modern projects set border-box globally.",
    code:"/* Global reset — apply border-box everywhere */\n*, *::before, *::after { box-sizing: border-box; }\n\n/* content-box (default) — confusing */\n.box { width: 200px; padding: 20px; border: 2px solid; }\n/* actual rendered width: 200 + 40 + 4 = 244px */\n\n/* border-box — predictable */\n.box { box-sizing: border-box; width: 200px; padding: 20px; }\n/* actual rendered width: exactly 200px */",
    explain:'"I explain the box model with a shipping analogy: content-box is like saying a box is 200cm but then adding foam padding on top — the final box is bigger. border-box includes the padding inside the measurement — 200cm is 200cm. This is why I add the border-box reset to every project as the first CSS line."',
    tip:"Tailwind automatically applies border-box to all elements via its preflight reset. If you're using Tailwind, you already have this — no extra CSS needed."
  },
  {
    id:16,cat:"CSS / Tailwind",tech:["CSS","SCSS"],diff:"Medium",
    q:"What are SCSS features that plain CSS doesn't have, and when is SCSS still worth using?",
    a:"SCSS adds: <strong>variables</strong> (before CSS custom properties existed), <strong>nesting</strong>, <strong>mixins</strong> (reusable blocks with parameters), <strong>functions</strong>, <strong>extends</strong>, <strong>loops</strong>, and <strong>partials</strong> (splitting CSS into multiple files that compile to one).<br><br>With CSS custom properties and native nesting now widely supported, SCSS's advantage has shrunk. It's still valuable for: complex design token management, large teams needing mixins and shared partials, and projects not using Tailwind.",
    code:"// SCSS mixin — responsive font size\n@mixin fluid-type($min, $max) {\n  font-size: clamp(#{$min}px, 2.5vw, #{$max}px);\n}\n\n// SCSS loop — generate utility classes\n@each $color, $value in (primary: #7c6bff, danger: #ff6b9d) {\n  .btn-#{$color} {\n    background: $value;\n    &:hover { background: darken($value, 10%); }\n  }\n}",
    explain:'"In modern projects with Tailwind, I rarely need SCSS. But on a project with a design system team generating CSS from design tokens, SCSS\'s mixins and loops are hard to replace. I always mention that native CSS nesting is now supported in all modern browsers — so the nesting argument for SCSS is mostly gone."',
    tip:"If you're on a Tailwind project, resist adding SCSS. The two can conflict in specificity and make the build chain more complex. Use Tailwind's @apply and @layer directives instead."
  },
  {
    id:17,cat:"CSS / Tailwind",tech:["CSS","TailwindCSS"],diff:"Medium",
    q:"What is CSS Grid and how do you build a responsive layout without media queries using it?",
    a:"<strong>CSS Grid</strong> is a two-dimensional layout system — it manages both rows and columns simultaneously. Unlike Flexbox (one axis), Grid lets you place items precisely in both directions.<br><br>The most powerful trick for responsive layouts without media queries is <code>repeat(auto-fill, minmax(min, 1fr))</code>. The browser creates as many columns as fit, each at least min wide. As the viewport narrows, columns automatically wrap to new rows.",
    code:"/* Responsive card grid — zero media queries */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 24px;\n}\n\n/* Named grid areas — semantic page layout */\n.layout {\n  display: grid;\n  grid-template-areas:\n    'header header'\n    'sidebar main'\n    'footer footer';\n  grid-template-columns: 240px 1fr;\n}",
    explain:'"The auto-fill + minmax combo is one of my favourite CSS tricks. It creates a fully responsive grid in one line — no breakpoints, no JavaScript. I use it for card grids, product listings, and image galleries. Grid named areas are great for page layouts because they read like a diagram, making the intent obvious."',
    tip:"auto-fill creates empty tracks for remaining space; auto-fit collapses them. For card grids, use auto-fill so items don't stretch to fill the full row when fewer items than expected columns exist."
  },

  // ── PERFORMANCE ───────────────────────────────────────────────────────────
  {
    id:18,cat:"Performance",tech:["JavaScript","React"],diff:"Medium",
    q:"What is lazy loading and code splitting, and how do you implement them?",
    a:"<strong>Code splitting</strong> divides your JavaScript bundle into smaller chunks loaded on demand. <strong>Lazy loading</strong> defers a resource (image, component, module) until it's needed — reducing initial page load time.<br><br>In React, <code>React.lazy()</code> + <code>Suspense</code> handles component-level code splitting. Vite and Webpack do it automatically for dynamic <code>import()</code> calls. In Next.js, <code>dynamic()</code> wraps React.lazy with SSR support.",
    code:"// React — lazy load a route component\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\nfunction App() {\n  return (\n    &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;\n      &lt;Dashboard /&gt;\n    &lt;/Suspense&gt;\n  );\n}\n\n// Next.js dynamic — disable SSR for browser-only libs\nconst Editor = dynamic(() => import('./RichTextEditor'), {\n  loading: () => &lt;Skeleton /&gt;, ssr: false\n});\n\n// Native image lazy loading (zero JS)\n// &lt;img src='hero.jpg' loading='lazy' alt='...' /&gt;",
    explain:'"Code splitting is my first answer to \'our bundle is too large.\' Instead of sending 500KB on initial load, I split into route-level chunks — each page downloads only what it needs. The loading attribute on images is also underrated — one attribute defers off-screen images with zero JavaScript."',
    tip:"Lighthouse's 'Reduce unused JavaScript' audit shows exactly which modules are loaded but unused. Use that as your guide for what to code-split first."
  },
  {
    id:19,cat:"Performance",tech:["JavaScript","React"],diff:"Hard",
    q:"What is debouncing vs throttling and when do you use each?",
    a:"Both limit how often a function runs, but differently:<br><br><strong>Debouncing</strong> delays execution until a certain time has passed since the <em>last call</em>. If the function keeps being called, the timer resets. Use for: search input, window resize, form validation.<br><br><strong>Throttling</strong> ensures the function runs at most once per interval, regardless of how many calls occur. Use for: scroll events, mouse move handlers, API rate limiting.",
    code:"// Debounce — waits for a pause in calls\nfunction debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst handleSearch = debounce(query => fetchResults(query), 400);\n\n// Throttle — limits call frequency\nfunction throttle(fn, interval) {\n  let last = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - last >= interval) { last = now; fn(...args); }\n  };\n}\nconst handleScroll = throttle(() => updateNav(), 100);",
    explain:'"I use the rain analogy: debounce waits for the rain to stop before acting — fires once when the user stops typing. Throttle is a leaky bucket — it lets one drop through every N milliseconds no matter how heavy the rain. Search bars get debounce; scroll and resize events get throttle."',
    tip:"Lodash provides battle-tested _.debounce and _.throttle implementations. In React, install use-debounce for hook-based integration that handles cleanup correctly on unmount."
  },

  // ── NODE.JS / EXPRESS ─────────────────────────────────────────────────────
  {
    id:20,cat:"Node.js / Express",tech:["Node.js","Express.js"],diff:"Medium",
    q:"What is middleware in Express.js and how does the request-response cycle work?",
    a:"<strong>Middleware</strong> is a function with access to <code>req</code>, <code>res</code>, and <code>next</code>. Middleware functions form a pipeline — each can execute code, modify req/res, end the cycle, or call <code>next()</code> to pass control forward.<br><br>The <strong>request-response cycle</strong>: incoming request → global middleware (logging, parsing) → route-specific middleware (auth) → route handler → response sent. If any middleware doesn't call next() or send a response, the request hangs.",
    code:"app.use(express.json());           // parse JSON bodies\napp.use(morgan('dev'));             // request logger\n\n// Auth middleware\nfunction authenticate(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next(); // pass to next middleware\n  } catch {\n    res.status(403).json({ error: 'Invalid token' });\n  }\n}\n\napp.get('/api/profile', authenticate, getProfile);",
    explain:'"I describe middleware as a chain of checkpoints. Each checkpoint can inspect the request, enrich it (attaching req.user), or stop it cold. The auth middleware is the perfect example — it reads the token, verifies it, attaches the user, and calls next(). If anything is wrong, it sends 401 and never calls next()."',
    tip:"Always call next(err) for errors — not next(). This skips regular middleware and goes directly to your 4-argument error-handling middleware (err, req, res, next), keeping error handling centralized."
  },
  {
    id:21,cat:"Node.js / Express",tech:["Node.js"],diff:"Medium",
    q:"What is the difference between process.nextTick(), setImmediate(), and setTimeout() in Node.js?",
    a:"All three schedule async callbacks, but at different points in the event loop:<br><br><strong>process.nextTick()</strong>: Runs before any I/O events — highest priority. Drains the entire nextTick queue before the event loop continues.<br><br><strong>setImmediate()</strong>: Runs in the 'check' phase — after I/O events, before setTimeout.<br><br><strong>setTimeout(fn, 0)</strong>: Runs in the 'timers' phase — scheduled after a minimum of ~1ms (OS timer resolution). Relative order with setImmediate is non-deterministic outside I/O.",
    code:"console.log('start');\n\nsetTimeout(() => console.log('setTimeout'), 0);\nsetImmediate(() => console.log('setImmediate'));\nprocess.nextTick(() => console.log('nextTick'));\n\nconsole.log('end');\n\n// Output order:\n// start\n// end\n// nextTick     <- before I/O, highest priority\n// setTimeout   <- timers phase\n// setImmediate <- check phase",
    explain:'"process.nextTick is like a VIP fast-pass — it cuts the queue entirely. I use it when I want to emit an event after the current function returns but before any I/O. setImmediate is my pick when I want to defer work until after pending I/O, so I don\'t starve I/O callbacks."',
    tip:"Be careful with recursive process.nextTick() calls — they can starve I/O since Node.js must drain the entire nextTick queue before moving on. Use setImmediate for recursive deferral."
  },
  {
    id:22,cat:"Node.js / Express",tech:["Node.js","Express.js"],diff:"Easy",
    q:"What are environment variables and how do you manage them securely in a Node.js app?",
    a:"<strong>Environment variables</strong> are key-value pairs injected into a process's environment at runtime — separate from code. Used for: secrets (API keys, DB passwords), configuration that differs per environment (dev vs prod), and feature flags.<br><br>In Node.js, accessed via <code>process.env.VAR_NAME</code>. The <strong>dotenv</strong> package loads a <code>.env</code> file into process.env during development. In production, variables are set directly in the host environment — never from a committed file.",
    code:"# .env file (NEVER commit to Git — add to .gitignore)\nDATABASE_URL=mongodb://localhost:27017/myapp\nJWT_SECRET=super-secret-key-here\nAPI_KEY=your-api-key\n\n# .env.example (commit this — shows structure, not values)\nDATABASE_URL=\nJWT_SECRET=\nAPI_KEY=\n\n// Node.js — load .env in development\nimport 'dotenv/config';\nconst db = mongoose.connect(process.env.DATABASE_URL);",
    explain:'"The key security rule I always emphasize: the .env file goes in .gitignore from day one — before you write a single secret into it. I commit a .env.example with empty values as documentation for the team. Secrets committed to Git, even briefly, can be scraped by bots and are considered permanently compromised."',
    tip:"Use zod or envalid to validate environment variables at startup. If a required variable is missing, the app crashes immediately with a clear error — far better than a cryptic runtime failure deep in production."
  },
  {
    id:23,cat:"Node.js / Express",tech:["Node.js","Express.js"],diff:"Hard",
    q:"What is JWT authentication and how do you implement it securely in Express?",
    a:"<strong>JWT (JSON Web Token)</strong> is a compact, self-contained token that encodes a payload (like user ID and role) signed with a secret key. The server issues it on login; the client sends it on subsequent requests. The server verifies the signature — no database lookup needed per request.<br><br>A JWT has three parts: <code>header.payload.signature</code>. The signature prevents tampering — if anyone modifies the payload, the signature no longer matches.",
    code:"// Login — issue token\napp.post('/auth/login', async (req, res) => {\n  const user = await User.findOne({ email: req.body.email });\n  if (!user || !bcrypt.compareSync(req.body.password, user.hash))\n    return res.status(401).json({ error: 'Invalid credentials' });\n\n  const token = jwt.sign(\n    { id: user._id, role: user.role },\n    process.env.JWT_SECRET,\n    { expiresIn: '7d' }\n  );\n  res.json({ token });\n});\n\n// Middleware — verify token\nfunction auth(req, res, next) {\n  const token = req.headers.authorization?.replace('Bearer ', '');\n  if (!token) return res.sendStatus(401);\n  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }\n  catch { res.sendStatus(403); }\n}",
    explain:'"JWT is stateless — the server doesn\'t need to store sessions. The trade-off is that you can\'t invalidate a token before it expires unless you maintain a blocklist. For most apps, short expiry (15min) + refresh tokens solve this. I always mention: never store JWTs in localStorage — use HttpOnly cookies to protect against XSS."',
    tip:"Always use an expiry (expiresIn) on JWTs. A token without expiry is valid forever — if it's ever leaked, the damage is permanent. Pair short-lived access tokens with long-lived refresh tokens."
  },

  // ── LINUX ─────────────────────────────────────────────────────────────────
  {
    id:24,cat:"Linux",tech:["Linux"],diff:"Easy",
    q:"What are the most essential Linux commands every developer should know?",
    a:"As a web developer deploying to Linux servers, these are daily-use commands:<br><br><strong>File system:</strong> ls, cd, pwd, mkdir, rm, cp, mv, find, cat, less, tail<br><strong>Permissions:</strong> chmod, chown<br><strong>Process management:</strong> ps, kill, top, htop<br><strong>Networking:</strong> curl, wget, netstat, ping, ssh<br><strong>Text processing:</strong> grep, sed, awk, sort, uniq, wc<br><strong>Package management:</strong> apt/apt-get (Debian/Ubuntu), yum/dnf (RHEL/CentOS)",
    code:"# Navigate and list\nls -la          # list all files with permissions\ncd /var/www     # change directory\npwd             # print working directory\n\n# File operations\ncp -r src/ dest/         # copy directory recursively\nfind . -name '*.log'     # find files by name\ntail -f /var/log/nginx/error.log  # live log watching\n\n# Grep — search in files\ngrep -r 'ERROR' ./logs/  # recursive search\ngrep -n 'TODO' src/*.js  # show line numbers\n\n# Permissions\nchmod 755 script.sh      # rwxr-xr-x\nchmod +x deploy.sh       # add execute permission",
    explain:'"When I\'m on a Linux server, tail -f is one of my most-used commands — it\'s like a live feed of log files, essential for debugging production issues in real time. I also mention grep -r because searching an entire codebase for a string is something I do several times a day."',
    tip:"Use man <command> to read the manual for any Linux command, and <command> --help for a quick summary. You don't need to memorize every flag — knowing how to look them up quickly is the real skill."
  },
  {
    id:25,cat:"Linux",tech:["Linux"],diff:"Medium",
    q:"What are Linux file permissions and how does chmod work?",
    a:"Every Linux file has three permission groups: <strong>owner</strong>, <strong>group</strong>, and <strong>others</strong>. Each group has three bits: <strong>r</strong>ead (4), <strong>w</strong>rite (2), e<strong>x</strong>ecute (1).<br><br>Permissions shown as 9 characters (e.g., <code>rwxr-xr--</code>). The numeric (octal) representation sums the bits: 7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---.<br><br><code>chmod</code> changes permissions using either symbolic (u+x) or numeric (755) notation.",
    code:"# View permissions\nls -la\n# -rwxr-xr-- 1 alice dev 1234 app.js\n# Owner: rwx (7), Group: r-x (5), Others: r-- (4)\n\n# Numeric notation\nchmod 755 app.js   # owner: rwx, group: r-x, others: r-x\nchmod 644 config   # owner: rw-, group: r--, others: r--\nchmod 600 .env     # owner: rw- ONLY — keep secrets private!\n\n# Symbolic notation\nchmod +x deploy.sh     # add execute for all\nchmod u+x,g-w file     # owner +execute, group -write\nchmod -R 755 /var/www  # recursive",
    explain:'"chmod 755 is the most common permission for web server files — everyone can read and execute, only the owner can write. chmod 600 for .env files is critical for security — only the owner can read it. I always set this when deploying to a server."',
    tip:"chmod 777 (rwx for everyone) is a security red flag. Never use it on a production server. If something needs 777 to work, the real issue is that the web server process doesn't have the right owner — fix with chown instead."
  },
  {
    id:26,cat:"Linux",tech:["Linux","Node.js"],diff:"Medium",
    q:"What is a process manager and why would you use PM2 for a Node.js app on Linux?",
    a:"A <strong>process manager</strong> keeps your Node.js application running continuously — restarting it if it crashes, managing multiple instances, and handling log aggregation. Without one, your app dies the moment the SSH session closes or an uncaught exception occurs.<br><br><strong>PM2</strong> is the most popular Node.js process manager: automatic restart on crash, cluster mode (multiple CPU cores), startup scripts (survives server reboots), log management, and a monitoring dashboard.",
    code:"# Install PM2 globally\nnpm install -g pm2\n\n# Start your app\npm2 start dist/index.js --name 'my-api'\n\n# Cluster mode — use all CPU cores\npm2 start dist/index.js -i max --name 'my-api'\n\n# Auto-restart on server reboot\npm2 startup   # generates a startup script\npm2 save      # saves current process list\n\n# Monitoring\npm2 status    # view all processes\npm2 logs      # stream logs\npm2 monit     # live dashboard",
    explain:'"Before PM2, I\'d SSH into a server, run node server.js, and the app would die the moment I closed the terminal. PM2 solved that. Now when I deploy, I always set up PM2 with pm2 startup and pm2 save — so the app survives server reboots automatically. Cluster mode is a big deal for performance: instead of one CPU core, Node uses all of them."',
    tip:"For serious production deployments, pair PM2 with Nginx as a reverse proxy. PM2 handles the Node process; Nginx handles SSL termination, static file serving, and routing traffic."
  },
  {
    id:27,cat:"Linux",tech:["Linux"],diff:"Medium",
    q:"How do you use SSH and what is the difference between password auth and key-based auth?",
    a:"<strong>SSH (Secure Shell)</strong> is a cryptographic protocol for securely accessing remote servers. It encrypts all communication between your machine and the server.<br><br><strong>Password authentication</strong>: You type a username and password every time. Vulnerable to brute-force attacks.<br><br><strong>Key-based authentication</strong>: You generate a public/private key pair. The public key is added to the server's <code>~/.ssh/authorized_keys</code>. The private key stays on your machine. No password is sent over the network — the server verifies you have the matching private key using cryptography.",
    code:"# Generate a key pair (on your local machine)\nssh-keygen -t ed25519 -C 'you@email.com'\n# Creates: ~/.ssh/id_ed25519 (private) + id_ed25519.pub (public)\n\n# Copy public key to server\nssh-copy-id user@server-ip\n\n# Connect\nssh user@server-ip\nssh -i ~/.ssh/my-key user@server  # specify key\n\n# Disable password auth on server (after setting up keys)\n# Edit /etc/ssh/sshd_config:\n# PasswordAuthentication no\n# Then: sudo systemctl restart sshd",
    explain:'"I always set up key-based auth and then disable password authentication on production servers. A server with password auth open to the internet is constantly being hit by bots trying common passwords. With key auth only, that entire attack surface disappears. PuTTY handles this on Windows; the built-in ssh command handles it on Mac/Linux."',
    tip:"Store your private key securely and never share it. If you suspect a key is compromised, remove its public key from authorized_keys immediately and generate a new pair. Treat private keys like passwords — but stronger."
  },

  // ── MYSQL ─────────────────────────────────────────────────────────────────
  {
    id:28,cat:"MySQL",tech:["MySQL"],diff:"Easy",
    q:"What are SQL JOINs and what is the difference between INNER, LEFT, RIGHT, and FULL JOIN?",
    a:"<strong>JOINs</strong> combine rows from two or more tables based on a related column.<br><br><strong>INNER JOIN</strong>: Returns rows where the join condition matches in <em>both</em> tables — think Venn diagram intersection.<br><br><strong>LEFT JOIN</strong>: Returns all rows from the left table + matching rows from the right. Non-matching left rows get NULL on the right side. Use when you want 'all A, with B if it exists.'<br><br><strong>RIGHT JOIN</strong>: Mirror of LEFT JOIN.<br><br><strong>FULL OUTER JOIN</strong>: All rows from both tables (simulated in MySQL with UNION of LEFT + RIGHT JOIN).",
    code:"-- INNER JOIN: only users who have orders\nSELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- LEFT JOIN: all users, orders if they exist\nSELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name;\n-- Users with no orders: order_count = 0 (not excluded)",
    explain:'"I use the Venn diagram analogy: INNER JOIN is the overlap, LEFT JOIN is the full left circle with whatever overlap exists. The LEFT JOIN is what I use most — for example, \'show me all users and how many orders they have, including users who\'ve never ordered.\' INNER JOIN would silently drop those users."',
    tip:"Be aware of how NULL propagates in JOINs. After a LEFT JOIN, columns from the right table will be NULL for non-matching rows. Adding WHERE right.column = something on a LEFT JOIN effectively converts it to an INNER JOIN — a common silent bug."
  },
  {
    id:29,cat:"MySQL",tech:["MySQL"],diff:"Medium",
    q:"What are database indexes in MySQL and how do they affect query performance?",
    a:"An <strong>index</strong> is a B-tree data structure MySQL maintains alongside a table to speed up data retrieval. Without an index, MySQL scans every row (full table scan — O(n)). With an index, it finds rows in O(log n) — dramatically faster for large tables.<br><br>The trade-off: indexes speed up reads (SELECT) but slow down writes (INSERT, UPDATE, DELETE) because the index must be updated too.<br><br>MySQL automatically creates indexes for PRIMARY KEY and UNIQUE columns. You add manual indexes on columns in WHERE, JOIN ON, and ORDER BY clauses.",
    code:"-- Check if a query uses an index\nEXPLAIN SELECT * FROM orders WHERE user_id = 42;\n-- Look at: type (ref/range = good, ALL = full scan = bad)\n\n-- Create an index\nCREATE INDEX idx_user_id ON orders(user_id);\n\n-- Composite index\nCREATE INDEX idx_status_date ON orders(status, created_at);\n-- Covers: WHERE status = 'shipped' ORDER BY created_at\n\n-- Check existing indexes\nSHOW INDEX FROM orders;",
    explain:'"I use EXPLAIN before adding any index. It tells me if MySQL is doing a full table scan. A type of \'ALL\' on a table with millions of rows is a red flag. I once added an index on orders.user_id and a 3-second query dropped to 12ms instantly — that\'s the power of indexes."',
    tip:"Don't over-index. Every index is a maintenance overhead on writes. Index the columns you actually query on. And always test with EXPLAIN — adding an index doesn't guarantee MySQL will use it."
  },
  {
    id:30,cat:"MySQL",tech:["MySQL"],diff:"Hard",
    q:"What are SQL transactions and what does ACID stand for?",
    a:"A <strong>transaction</strong> is a group of SQL operations executed as a single unit — either all succeed or all fail together. Critical for data integrity in financial or inventory systems.<br><br><strong>ACID</strong> properties:<br><strong>Atomicity</strong>: All operations succeed, or none do.<br><strong>Consistency</strong>: A transaction brings the DB from one valid state to another, respecting all constraints.<br><strong>Isolation</strong>: Concurrent transactions don't interfere with each other.<br><strong>Durability</strong>: Once committed, data survives crashes (written to disk).",
    code:"-- Transfer money — classic ACID example\nSTART TRANSACTION;\n\nUPDATE accounts SET balance = balance - 500\n  WHERE id = 1;  -- debit sender\n\nUPDATE accounts SET balance = balance + 500\n  WHERE id = 2;  -- credit receiver\n\nCOMMIT;  -- only if BOTH succeed\n-- ROLLBACK;  -- undo everything on failure\n\n-- In Node.js with mysql2\nconst conn = await pool.getConnection();\nawait conn.beginTransaction();\ntry {\n  await conn.query('UPDATE accounts SET balance = balance - 500 WHERE id = ?', [1]);\n  await conn.query('UPDATE accounts SET balance = balance + 500 WHERE id = ?', [2]);\n  await conn.commit();\n} catch (e) { await conn.rollback(); throw e; }",
    explain:'"The money transfer example is the classic way to explain transactions. If you debit one account but the credit fails, you\'d have lost money from the system. ROLLBACK undoes the debit as if it never happened. ACID is what separates a real database from a flat file — it\'s the guarantee that your data remains trustworthy."',
    tip:"MySQL's InnoDB engine supports transactions. MyISAM does not. Always use InnoDB for any table that needs transactional safety — which is basically every table in a real application."
  },
  {
    id:31,cat:"MySQL",tech:["MySQL","Node.js"],diff:"Medium",
    q:"What is the N+1 query problem and how do you fix it?",
    a:"The <strong>N+1 problem</strong> occurs when you fetch N records and then execute 1 additional query for each — resulting in N+1 total queries instead of one efficient query. It's a common performance bug when using ORMs naively.<br><br>Example: fetching 100 users then querying each user's orders separately = 101 queries. One optimized JOIN = 1 query.",
    code:"// N+1 problem — 101 queries for 100 users\nconst users = await db.query('SELECT * FROM users LIMIT 100');\nfor (const user of users) {\n  user.orders = await db.query(\n    'SELECT * FROM orders WHERE user_id = ?', [user.id]\n  );\n}\n\n// Fix 1 — JOIN (1 query)\nconst rows = await db.query(\n  'SELECT u.*, o.id as order_id, o.total' +\n  ' FROM users u' +\n  ' LEFT JOIN orders o ON u.id = o.user_id' +\n  ' LIMIT 100'\n);\n\n// Fix 2 — WHERE IN (2 queries)\nconst ids = users.map(u => u.id);\nconst orders = await db.query(\n  'SELECT * FROM orders WHERE user_id IN (?)', [ids]\n);",
    explain:'"The N+1 problem is something I look for in every code review. It\'s easy to write accidentally with ORMs, and devastating for performance at scale. My go-to fix is a JOIN or a WHERE IN query. Sequelize and Prisma have \'eager loading\' that handles this automatically — but you have to opt in."',
    tip:"When profiling slow Node.js apps, log all SQL queries with timing. A page making 200+ queries is almost always an N+1 issue. Tools like Prisma Studio or Sequelize's logging option make this visible."
  },

  // ── MONGODB ───────────────────────────────────────────────────────────────
  {
    id:32,cat:"MongoDB",tech:["MongoDB","Node.js"],diff:"Easy",
    q:"What is MongoDB and how does it differ from a relational database like MySQL?",
    a:"<strong>MongoDB</strong> is a document-oriented NoSQL database. Instead of rows and tables, it stores data as flexible JSON-like <strong>documents</strong> grouped in <strong>collections</strong>. Documents can have different structures — there's no enforced schema by default.<br><br><strong>Schema:</strong> MongoDB is flexible; MySQL is rigid (columns fixed at table creation).<br><strong>Relations:</strong> MySQL uses foreign keys and JOINs; MongoDB embeds related data or references with $lookup.<br><strong>Transactions:</strong> MySQL has full ACID transactions; MongoDB added multi-document transactions in v4.0.<br><strong>Scaling:</strong> MongoDB scales horizontally (sharding) more naturally.",
    code:"// MySQL: two tables with JOIN\n// users(id, name) + orders(id, user_id, total)\n\n// MongoDB: embedded document — one query, no JOIN\n{\n  _id: 'user1',\n  name: 'Alice',\n  email: 'alice@example.com',\n  orders: [\n    { orderId: 'ORD-001', total: 249, status: 'shipped' },\n    { orderId: 'ORD-002', total: 89,  status: 'pending' }\n  ]\n}",
    explain:'"I describe MongoDB as a database that lets your data look like your JavaScript objects. No table schemas to maintain — great for rapid development. The trade-off is that data consistency becomes your responsibility (or Mongoose\'s). I use MongoDB when data is naturally hierarchical or when the schema is still evolving rapidly."',
    tip:"Use Mongoose in Node.js to add schema validation to MongoDB. Without it, nothing stops you from saving { foo: 'bar' } into your users collection — and those inconsistencies become painful to query later."
  },
  {
    id:33,cat:"MongoDB",tech:["MongoDB"],diff:"Medium",
    q:"What is the MongoDB aggregation pipeline and when would you use it?",
    a:"The <strong>aggregation pipeline</strong> is a framework for processing and transforming documents through a sequence of stages. Each stage takes the output of the previous stage as input — like a conveyor belt. Used for analytics, reporting, grouping, and complex transformations that can't be done with simple find() queries.<br><br>Common stages: <code>$match</code> (filter), <code>$group</code> (aggregate), <code>$project</code> (shape output), <code>$sort</code>, <code>$limit</code>, <code>$lookup</code> (JOIN equivalent), <code>$unwind</code> (flatten arrays).",
    code:"// Total revenue per user, sorted by highest spend\ndb.orders.aggregate([\n  // Stage 1: filter only completed orders\n  { $match: { status: 'completed' } },\n\n  // Stage 2: group by user, sum their totals\n  { $group: {\n    _id: '$userId',\n    totalSpent: { $sum: '$amount' },\n    orderCount: { $sum: 1 }\n  }},\n\n  // Stage 3: join with users collection\n  { $lookup: {\n    from: 'users',\n    localField: '_id',\n    foreignField: '_id',\n    as: 'userInfo'\n  }},\n\n  { $sort: { totalSpent: -1 } },\n  { $limit: 10 }\n]);",
    explain:'"I think of the aggregation pipeline like an assembly line — raw documents come in one end, processed results come out the other. It\'s MongoDB\'s equivalent of SQL with GROUP BY, JOIN, and ORDER BY. I use it for dashboards — for example, \'top 10 customers by revenue this month\' is a perfect aggregation use case."',
    tip:"Use $match as early as possible in the pipeline — before $group or $lookup. This reduces the number of documents all subsequent stages process, dramatically improving performance. Ensure fields in $match have indexes."
  },
  {
    id:34,cat:"MongoDB",tech:["MongoDB","Node.js"],diff:"Medium",
    q:"What are MongoDB indexes and how do you create them using Mongoose?",
    a:"MongoDB indexes create B-tree data structures that let MongoDB find documents without scanning the entire collection. Without indexes, every query does a <strong>collection scan</strong> — reads all documents.<br><br>Index types: <strong>single field</strong>, <strong>compound</strong> (multiple fields), <strong>unique</strong> (enforces uniqueness), <strong>text</strong> (full-text search), <strong>TTL</strong> (auto-delete after a time — great for sessions/tokens), <strong>2dsphere</strong> (geospatial).",
    code:"// Mongoose schema with indexes\nconst userSchema = new mongoose.Schema({\n  email: {\n    type: String,\n    required: true,\n    unique: true  // creates a unique index automatically\n  },\n  username: { type: String, index: true }, // single field index\n  createdAt: { type: Date, default: Date.now }\n});\n\n// Compound index\nuserSchema.index({ role: 1, createdAt: -1 });\n\n// TTL index — auto-delete documents after 24 hours\nsessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });\n\n// Check query efficiency\n// db.users.find({ email: 'alice@x.com' }).explain('executionStats')",
    explain:'"I always add indexes after I know my query patterns. The most important index is on any field used in a find() filter. MongoDB\'s explain() is my equivalent of MySQL\'s EXPLAIN — it shows whether a query is using an index (IXSCAN) or scanning the whole collection (COLLSCAN)."',
    tip:"The TTL index is one of MongoDB's hidden gems. Use it for session tokens, password reset codes, or any data with a natural expiry — MongoDB automatically deletes expired documents without any cron jobs."
  },
  {
    id:35,cat:"MongoDB",tech:["MongoDB","Node.js"],diff:"Hard",
    q:"What is the difference between embedding and referencing documents in MongoDB, and how do you decide?",
    a:"<strong>Embedding</strong> (denormalization): Store related data inside the same document. One query retrieves everything. Best for: data always accessed together, bounded relationships (a post's comments), data that doesn't change independently.<br><br><strong>Referencing</strong> (normalization): Store a reference (ObjectId) to another document. Requires $lookup or multiple queries. Best for: large/unbounded data, data shared across many documents, data that changes independently.<br><br>Golden rule: <strong>embed if you read them together, reference if you use them independently.</strong>",
    code:"// Embedding — good for: comments on a blog post\n{\n  _id: 'post1',\n  title: 'My Post',\n  comments: [   // bounded, always fetched with post\n    { user: 'alice', text: 'Great!' },\n    { user: 'bob',   text: 'Nice!' }\n  ]\n}\n\n// Referencing — good for: orders referencing products\n{\n  _id: 'order1',\n  userId:    'user1',   // reference — user has many orders\n  productId: 'prod1',   // reference — product exists independently\n  quantity: 2\n}",
    explain:'"I use the \'access pattern\' question to decide: Do I ever access the child data without the parent? If yes, reference it. Will the embedded array grow unboundedly (e.g., all user activity ever)? Reference it — MongoDB documents have a 16MB size limit. Otherwise, embedding is simpler and faster."',
    tip:"MongoDB documents have a hard 16MB limit. An embedded array that grows forever (like all tweets from a user) will eventually hit this limit and crash. This is the clearest signal to switch to referencing."
  },

  // ── WEBPACK ───────────────────────────────────────────────────────────────
  {
    id:36,cat:"Webpack",tech:["Webpack","JavaScript"],diff:"Medium",
    q:"What is Webpack and what problems does it solve?",
    a:"<strong>Webpack</strong> is a module bundler for JavaScript applications. It takes your source files (JS, CSS, images, fonts) and their dependencies and bundles them into optimized files for the browser.<br><br>Problems it solves:<br>1. <strong>Module system</strong>: Browsers historically didn't support ES modules — Webpack bundled all imports into browser-compatible files.<br>2. <strong>Asset optimization</strong>: Minification, tree shaking, and code splitting.<br>3. <strong>Asset transformation</strong>: Through loaders — transpile TypeScript, compile SCSS, process images.<br>4. <strong>Development experience</strong>: Hot Module Replacement (HMR), source maps.",
    code:"// webpack.config.js\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n\nmodule.exports = {\n  entry: './src/index.js',\n  output: {\n    path: path.resolve(__dirname, 'dist'),\n    filename: '[name].[contenthash].js', // cache busting\n    clean: true\n  },\n  module: {\n    rules: [\n      { test: /\\.tsx?$/, use: 'ts-loader' },\n      { test: /\\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },\n      { test: /\\.(png|jpg|svg)$/, type: 'asset' }\n    ]\n  },\n  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })]\n};",
    explain:'"I describe Webpack as a factory: raw materials (source files) go in one end, optimized products (bundles) come out the other. Loaders are the machines that transform each material type. Plugins are the supervisors managing the overall production process. Most developers use Webpack indirectly through Create React App or Vite — but understanding it helps when customizing the pipeline."',
    tip:"The [contenthash] in the output filename is crucial for cache busting. It changes only when file content changes, so browsers can safely cache bundles indefinitely without serving stale code."
  },
  {
    id:37,cat:"Webpack",tech:["Webpack","JavaScript"],diff:"Hard",
    q:"What is tree shaking in Webpack and how does it work?",
    a:"<strong>Tree shaking</strong> is dead code elimination — Webpack analyzes the static structure of ES module imports and removes code that is imported but never actually used.<br><br>It works because ES module imports are static (resolved at build time, not runtime), so Webpack can build a complete dependency graph. CommonJS (<code>require()</code>) is dynamic and cannot be tree-shaken.<br><br>Requirements: use ES module syntax (import/export), set <code>sideEffects: false</code> in package.json for pure modules, and use production mode.",
    code:"// utils.js — only 'add' will be included if 'multiply' isn't used\nexport const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;\n\n// app.js — only imports 'add'\nimport { add } from './utils.js';\nconsole.log(add(2, 3));\n// Webpack removes multiply() entirely from the bundle!\n\n// package.json — tell Webpack this package has no side effects\n// { \"sideEffects\": false }\n\n// webpack.config.js\nmodule.exports = {\n  mode: 'production',  // enables tree shaking + minification\n  optimization: { usedExports: true }\n};",
    explain:'"Tree shaking is why you can import just one function from lodash-es and not ship the entire 500KB library. The key is always using ES module syntax — if you use require(), Webpack can\'t analyze what\'s actually used at build time. I always check bundle size with webpack-bundle-analyzer after a major dependency change."',
    tip:"Install webpack-bundle-analyzer to visualize exactly what's in your bundle. It's eye-opening — you'll often find one large package dominating, and you can look for a smaller alternative or import just the piece you need."
  },
  {
    id:38,cat:"Webpack",tech:["Webpack","Vite"],diff:"Medium",
    q:"Why is Vite faster than Webpack in development mode and how do they differ fundamentally?",
    a:"<strong>Webpack</strong> bundles your <em>entire application</em> on startup — resolving and bundling every module before the dev server is ready. For large apps, this takes seconds or minutes. HMR is slow because it re-bundles affected chunks.<br><br><strong>Vite</strong> takes a fundamentally different approach:<br>1. <strong>No bundling in dev</strong>: Vite serves source files directly as native ES modules — the browser requests modules on demand, Vite transforms one file at a time.<br>2. <strong>esbuild pre-bundling</strong>: Dependencies are pre-bundled once using esbuild (written in Go, 10-100x faster than JS bundlers).<br>Result: instant startup, near-instant HMR regardless of app size.",
    code:"// vite.config.ts\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  build: {\n    rollupOptions: {\n      output: {\n        // Manual chunk splitting for production\n        manualChunks: {\n          vendor: ['react', 'react-dom'],\n          router: ['react-router-dom']\n        }\n      }\n    }\n  },\n  // Proxy API requests in development (avoids CORS)\n  server: {\n    proxy: { '/api': 'http://localhost:3000' }\n  }\n});",
    explain:'"The key insight: Webpack thinks in bundles, Vite thinks in files. In dev, Webpack says \'bundle everything first.\' Vite says \'I\'ll transform each file when the browser asks for it.\' So startup is instant. For production, Vite uses Rollup — a mature bundler with excellent tree shaking — to produce optimized static assets."',
    tip:"Vite's server.proxy config is incredibly useful in development. It forwards /api requests to your backend server, avoiding CORS issues during development without any extra setup."
  },
  {
    id:39,cat:"Webpack",tech:["Webpack","JavaScript"],diff:"Medium",
    q:"What are Webpack loaders and plugins, and what is the difference between them?",
    a:"<strong>Loaders</strong> transform files as they're imported into the dependency graph — they work at the module level. They answer: 'when Webpack encounters this file type, how should it transform it?' Loaders are chained right to left and run per-file.<br><br><strong>Plugins</strong> have access to the entire compilation lifecycle — they generate HTML, extract CSS into separate files, define environment variables, analyze bundle size. They answer: 'what should happen at the build level?'<br><br>Simple rule: <strong>Loaders transform files. Plugins orchestrate the build.</strong>",
    code:"module.exports = {\n  module: {\n    rules: [\n      // Loaders — transform file types\n      {\n        test: /\\.tsx?$/,\n        use: ['babel-loader', 'ts-loader'], // chained: ts then babel\n        exclude: /node_modules/\n      },\n      {\n        test: /\\.scss$/,\n        // Chained right to left: sass -> css -> style\n        use: ['style-loader', 'css-loader', 'sass-loader']\n      }\n    ]\n  },\n  plugins: [\n    new HtmlWebpackPlugin({ template: './public/index.html' }),\n    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),\n    new webpack.DefinePlugin({\n      'process.env.NODE_ENV': JSON.stringify('production')\n    })\n  ]\n};",
    explain:'"I use a cooking analogy: loaders are the prep cooks who transform raw ingredients (TypeScript, SCSS) into standard form (JS, CSS). Plugins are the head chef who manages the whole kitchen — deciding how dishes are plated and what\'s available on the menu."',
    tip:"Loader order matters — they're applied right to left. For SCSS: sass-loader runs first (SCSS to CSS), then css-loader (handles @import and url()), then style-loader (injects CSS into the DOM)."
  },

  // ── WEBHOOKS ──────────────────────────────────────────────────────────────
  {
    id:40,cat:"Webhooks",tech:["Node.js","Express.js"],diff:"Easy",
    q:"What is a webhook and how does it differ from polling?",
    a:"A <strong>webhook</strong> is an HTTP callback — your server exposes an endpoint, and an external service hits it automatically when an event happens. It's a 'don't call us, we'll call you' pattern.<br><br><strong>Polling</strong>: Your app periodically asks the external service 'did anything happen?' — even when nothing has. Wastes requests and introduces latency.<br><br><strong>Webhook</strong>: The external service sends a POST request to your endpoint the <em>moment</em> the event occurs. Real-time, no wasted requests.<br><br>Common webhook uses: Stripe payment confirmations, GitHub push events, Twilio SMS callbacks, Slack slash commands, Shopify order events.",
    code:"// Express webhook endpoint (e.g., for Stripe)\napp.post('/webhooks/stripe',\n  express.raw({ type: 'application/json' }),\n  async (req, res) => {\n    const sig = req.headers['stripe-signature'];\n    let event;\n    try {\n      event = stripe.webhooks.constructEvent(\n        req.body, sig, process.env.STRIPE_WEBHOOK_SECRET\n      );\n    } catch (err) {\n      return res.status(400).send('Webhook Error: ' + err.message);\n    }\n\n    switch (event.type) {\n      case 'payment_intent.succeeded':\n        await fulfillOrder(event.data.object);\n        break;\n    }\n\n    res.json({ received: true }); // always acknowledge promptly!\n  }\n);",
    explain:'"I describe webhooks as event notifications vs. polling being like refreshing your email manually. With Stripe webhooks, the moment a payment succeeds, Stripe calls my endpoint — I can fulfill the order immediately. With polling, I\'d check every 5 seconds and still have up to 5 seconds of delay."',
    tip:"Always respond to webhooks quickly (within 5-10 seconds) with a 200 OK. If processing takes longer, acknowledge immediately and process asynchronously (queue the job). Otherwise the sender retries, potentially processing the event multiple times."
  },
  {
    id:41,cat:"Webhooks",tech:["Node.js","Express.js"],diff:"Medium",
    q:"How do you verify the authenticity of a webhook payload and prevent replay attacks?",
    a:"Webhook endpoints are public URLs — anyone can POST to them. Providers use <strong>webhook signatures</strong> to prove authenticity.<br><br>The provider signs the request payload using a shared secret (HMAC-SHA256). Your server recomputes the signature and compares it to the one in the header. If they don't match, reject the request.<br><br>To prevent <strong>replay attacks</strong> (attacker captures and resends a valid webhook), providers include a timestamp in the header. You validate that the timestamp is within an acceptable window (e.g., 5 minutes).",
    code:"const crypto = require('crypto');\n\nfunction verifyWebhook(req, res, next) {\n  const payload   = req.body; // must be raw body string\n  const signature = req.headers['x-webhook-signature'];\n  const timestamp = req.headers['x-webhook-timestamp'];\n\n  // 1. Reject if timestamp is older than 5 minutes\n  const fiveMin = 5 * 60 * 1000;\n  if (Date.now() - parseInt(timestamp) * 1000 > fiveMin)\n    return res.status(400).json({ error: 'Webhook too old' });\n\n  // 2. Compute expected signature\n  const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);\n  hmac.update(timestamp + '.' + payload);\n  const expected = 'sha256=' + hmac.digest('hex');\n\n  // 3. Compare using timingSafeEqual (prevents timing attacks)\n  const a = Buffer.from(signature), b = Buffer.from(expected);\n  if (a.length !== b.length || !crypto.timingSafeEqual(a, b))\n    return res.status(401).json({ error: 'Invalid signature' });\n\n  next();\n}",
    explain:'"Webhook verification is non-negotiable in production. Without it, anyone who discovers your endpoint URL can fake events — imagine someone faking a \'payment succeeded\' event. The HMAC signature proves the payload came from the real sender and hasn\'t been tampered with. I always use timingSafeEqual instead of === to prevent timing-based attacks."',
    tip:"Use express.raw() (not express.json()) to get the raw request body for signature verification. If you parse JSON first, the raw body is consumed and you can't verify the signature accurately."
  },
  {
    id:42,cat:"Webhooks",tech:["Node.js","Express.js"],diff:"Hard",
    q:"How do you handle idempotency in webhooks to prevent duplicate processing?",
    a:"<strong>Idempotency</strong> means an operation can be applied multiple times without changing the result beyond the first application. Webhook providers retry failed deliveries — so your endpoint may receive the same event multiple times. Without idempotency, you'd process an order twice, send duplicate emails, or charge a customer twice.<br><br>The solution: track processed webhook event IDs in a database. Before processing, check if the event ID was already handled. If yes, return 200 immediately without reprocessing.",
    code:"// Track processed webhook IDs in MongoDB\napp.post('/webhooks/stripe', async (req, res) => {\n  const event = stripe.webhooks.constructEvent(/*...*/);\n\n  // Check if we've already processed this event\n  const existing = await ProcessedEvent.findOne({ eventId: event.id });\n  if (existing) {\n    return res.json({ received: true, duplicate: true });\n  }\n\n  try {\n    switch (event.type) {\n      case 'payment_intent.succeeded':\n        await fulfillOrder(event.data.object);\n        break;\n    }\n\n    // Mark as processed AFTER successful handling\n    await ProcessedEvent.create({\n      eventId: event.id,\n      type: event.type,\n      processedAt: new Date()\n    });\n\n    res.json({ received: true });\n  } catch (err) {\n    // Don't mark as processed — let the provider retry\n    res.status(500).json({ error: 'Processing failed' });\n  }\n});",
    explain:'"Idempotency is like making sure you only fulfill an order once no matter how many times the \'payment succeeded\' event arrives. Stripe retries if you don\'t respond with 200 within 30 seconds. If your server was briefly down, you might get the same event 3 times. Without idempotency, that\'s 3 orders fulfilled for one payment."',
    tip:"Set a TTL index on your ProcessedEvents collection to automatically delete old event IDs after 30 days. You don't need to keep records forever — most providers stop retrying within a few days."
  },
  {
    id:43,cat:"Webhooks",tech:["Node.js","Express.js"],diff:"Medium",
    q:"How do you test webhooks in local development?",
    a:"Webhook providers need to send HTTP requests to your server. In local development, your server is on localhost — not reachable from the internet. Two main solutions:<br><br>1. <strong>Tunneling tools (ngrok, cloudflared)</strong>: Create a public URL that tunnels to your local server. You give this URL to the webhook provider.<br><br>2. <strong>Provider CLI tools</strong>: Stripe, GitHub, and others provide CLIs that can forward webhook events from their dashboard to your local server without exposing a public URL.",
    code:"# Option 1: ngrok — expose localhost publicly\nnpx ngrok http 3000\n# You get: https://abc123.ngrok.io\n# Set this as your webhook URL in Stripe dashboard\n\n# Option 2: Stripe CLI — no public URL needed\nnpm install -g stripe\nstripe login\nstripe listen --forward-to localhost:3000/webhooks/stripe\n# Stripe gives you a local webhook signing secret\n\n# Trigger a test event\nstripe trigger payment_intent.succeeded\n\n# Option 3: Manual testing with curl\ncurl -X POST http://localhost:3000/webhooks/test \\\n  -H 'Content-Type: application/json' \\\n  -H 'x-webhook-signature: sha256=...' \\\n  -d '{\"event\": \"payment.succeeded\", \"id\": \"evt_123\"}'",
    explain:'"For Stripe specifically, I always use the Stripe CLI — it\'s brilliant. It listens to real events in your Stripe test dashboard and forwards them to localhost, including the correct signatures. No need to expose your machine to the internet. For other services, ngrok is my go-to."',
    tip:"Add your ngrok URL to your .env file as WEBHOOK_URL and regenerate it each session. Paid ngrok plans give you a stable subdomain so you don't have to update webhook settings on every restart."
  },

  // ── WEB FUNDAMENTALS ──────────────────────────────────────────────────────
  {
    id:44,cat:"Web Fundamentals",tech:["JavaScript","HTML"],diff:"Easy",
    q:"What is CORS and how do you resolve it in a Node.js Express backend?",
    a:"<strong>CORS (Cross-Origin Resource Sharing)</strong> is a browser security mechanism that blocks web pages from making requests to a different origin (protocol + domain + port) than the page's origin. The browser enforces this — not the server.<br><br>Example: frontend at <code>localhost:3000</code> making a fetch to <code>localhost:5000/api</code> will be blocked because different ports are different origins. The backend must return <code>Access-Control-Allow-Origin</code> headers to opt in.",
    code:"import cors from 'cors';\n\n// Development: allow all origins\napp.use(cors());\n\n// Production: whitelist specific origins\napp.use(cors({\n  origin: ['https://myapp.com', 'https://www.myapp.com'],\n  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true, // allow cookies/auth headers\n}));\n\n// Manual (without library)\napp.use((req, res, next) => {\n  res.setHeader('Access-Control-Allow-Origin', 'https://myapp.com');\n  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');\n  if (req.method === 'OPTIONS') return res.sendStatus(204);\n  next();\n});",
    explain:'"CORS is purely a browser enforcement. Curl and Postman don\'t enforce it — so a request that fails in the browser might succeed in Postman. That confuses a lot of developers. In production, I always whitelist specific origins — never wildcard (*) when credentials are involved."',
    tip:"'credentials: true' in cors config requires the frontend fetch to also include credentials: 'include'. Both sides must opt in for cookies and auth headers to cross origins."
  },
  {
    id:45,cat:"Web Fundamentals",tech:["JavaScript","HTML"],diff:"Easy",
    q:"What is the difference between localStorage, sessionStorage, and cookies?",
    a:"All three are client-side storage, but they differ in persistence, size, and behavior:<br><br><strong>localStorage</strong>: Persists indefinitely until explicitly cleared. Scoped to origin. Not sent to server. ~5MB.<br><br><strong>sessionStorage</strong>: Cleared when the browser tab closes. Same origin scope. Not sent to server. ~5MB.<br><br><strong>Cookies</strong>: Can have a set expiry (or be session cookies). Sent with <em>every</em> HTTP request to the matching domain — key for authentication. Size limit ~4KB. Can be HttpOnly (JS can't read them — XSS protection) and Secure (HTTPS only).",
    code:"// localStorage — cross-session persistence\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\n\n// sessionStorage — tab-only temporary storage\nsessionStorage.setItem('formDraft', JSON.stringify(formData));\n\n// Cookie set by JavaScript (less secure)\ndocument.cookie = 'user=alice; Secure; SameSite=Strict; max-age=3600';\n\n// Best for auth — HttpOnly cookie set by server\n// Server sends: Set-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict",
    explain:'"My rule: localStorage for preferences like theme or language, sessionStorage for temporary form state, and HttpOnly cookies for authentication tokens. The key insight: localStorage is vulnerable to XSS — any injected script can steal the token. HttpOnly cookies are invisible to JavaScript entirely — XSS can\'t steal what it can\'t read."',
    tip:"SameSite=Strict prevents cookies from being sent on cross-site requests, protecting against CSRF attacks. SameSite=Lax allows cookies on top-level navigation. For most auth cookies, Strict is the right choice."
  },
  {
    id:46,cat:"Web Fundamentals",tech:["JavaScript"],diff:"Medium",
    q:"What is the difference between synchronous and asynchronous programming, and what is a Promise?",
    a:"<strong>Synchronous</strong> code executes line by line — each line must complete before the next starts. Long operations block everything (including the UI).<br><br><strong>Asynchronous</strong> code starts an operation and moves on, handling the result later. JavaScript handles this via callbacks, Promises, and async/await.<br><br>A <strong>Promise</strong> is an object representing the eventual completion or failure of an async operation. It's in one of three states: <em>pending</em>, <em>fulfilled</em>, or <em>rejected</em>. Promises chain with .then() and .catch(), and async/await is syntactic sugar on top of Promises.",
    code:"// Callback (old way) — 'callback hell'\nfetchUser(id, (err, user) => {\n  if (err) return handleError(err);\n  fetchPosts(user.id, (err, posts) => { /* ... */ });\n});\n\n// Promise chaining — cleaner\nfetchUser(id)\n  .then(user => fetchPosts(user.id))\n  .then(posts => renderPosts(posts))\n  .catch(err => handleError(err));\n\n// async/await — reads like sync code\nasync function loadUserPosts(id) {\n  try {\n    const user  = await fetchUser(id);\n    const posts = await fetchPosts(user.id);\n    return posts;\n  } catch (err) { handleError(err); }\n}\n\n// Parallel — faster than sequential\nconst [user, settings] = await Promise.all([\n  fetchUser(id),\n  fetchSettings(id)\n]);",
    explain:'"async/await is my preferred style — it reads like synchronous code, making the logic easier to follow. I always mention Promise.all for parallel requests — when two async operations are independent, running them in parallel instead of sequentially can cut wait time in half."',
    tip:"Don't use await in a loop unless operations must be sequential. Use Promise.all with .map() to run them in parallel. A loop with await fetches one at a time — N requests take N times the delay. Promise.all makes them concurrent."
  },
  {
    id:47,cat:"Web Fundamentals",tech:["JavaScript","HTML"],diff:"Medium",
    q:"What is the Critical Rendering Path and how can you optimize it?",
    a:"The <strong>Critical Rendering Path (CRP)</strong> is the sequence of steps the browser performs to convert HTML, CSS, and JS into pixels on screen:<br>1. Parse HTML → build DOM<br>2. Parse CSS → build CSSOM<br>3. Combine → Render Tree<br>4. Layout → calculate positions<br>5. Paint → draw pixels<br><br>Optimization targets: <strong>minimize render-blocking resources</strong> (scripts and stylesheets that pause HTML parsing), <strong>reduce critical bytes</strong>, and <strong>shorten the critical path length</strong>.",
    code:"&lt;!-- Render-blocking — blocks HTML parsing --&gt;\n&lt;head&gt;\n  &lt;link rel='stylesheet' href='styles.css'&gt;\n  &lt;script src='app.js'&gt;&lt;/script&gt;\n&lt;/head&gt;\n\n&lt;!-- Optimized --&gt;\n&lt;head&gt;\n  &lt;!-- Preload critical resources --&gt;\n  &lt;link rel='preload' href='hero.jpg' as='image'&gt;\n  &lt;link rel='preload' href='fonts/main.woff2' as='font' crossorigin&gt;\n\n  &lt;!-- Non-critical CSS: async load --&gt;\n  &lt;link rel='stylesheet' href='non-critical.css' media='print'\n    onload='this.media=all'&gt;\n\n  &lt;!-- defer: execute after parse, in order --&gt;\n  &lt;script src='app.js' defer&gt;&lt;/script&gt;\n  &lt;!-- async: execute ASAP, any order --&gt;\n  &lt;script src='analytics.js' async&gt;&lt;/script&gt;\n&lt;/head&gt;",
    explain:'"The critical rendering path explains why a page might look blank for a moment on a fast connection. Every render-blocking resource is a stop sign — the browser pauses HTML parsing to download and execute it. I use defer for my app scripts (they download in parallel, execute after parsing), preload for fonts and hero images, and async for independent analytics scripts."',
    tip:"The defer attribute executes scripts in order after the HTML is parsed. async executes them as soon as downloaded, in any order. Use defer for your app scripts, async for independent third-party analytics or ads."
  },

  // ── GIT & TOOLING ─────────────────────────────────────────────────────────
  {
    id:48,cat:"Git & Tooling",tech:["Git"],diff:"Easy",
    q:"What is Git rebase vs Git merge and when would you use each?",
    a:"Both integrate changes from one branch into another, but differently:<br><br><strong>git merge</strong> creates a new 'merge commit' that ties together both branches' histories. History is preserved exactly. Best for: main/production branches, preserving history.<br><br><strong>git rebase</strong> moves or replays your commits on top of another branch — rewriting commit history for a linear, clean log. Best for: local feature branches before merging.<br><br>Golden rule: <strong>never rebase a shared/public branch</strong> — it rewrites history that others may already have.",
    code:"# Merge — preserves history, creates merge commit\ngit checkout main\ngit merge feature/my-feature\n\n# Rebase — linear history, replays commits\ngit checkout feature/my-feature\ngit rebase main  # replay feature commits on top of latest main\n\n# Interactive rebase — squash/rename commits before PR\ngit rebase -i HEAD~3  # rebase last 3 commits interactively\n\n# Common workflow:\n# 1. Develop on feature branch\n# 2. git rebase main (catch up with main)\n# 3. Open Pull Request\n# 4. Merge the PR",
    explain:'"I use merge for integrating finished features into main — I want to preserve the full history. I use rebase on my local feature branch to catch up with main\'s latest changes before opening a PR. Interactive rebase is great for cleaning up \'WIP\' and \'fix typo\' commits into one clean, meaningful commit before review."',
    tip:"If you accidentally rebase a shared branch and force-push, other developers' local branches will diverge and they'll need to reset. Always confirm no one else is working on the branch before rebasing."
  },
  {
    id:49,cat:"Git & Tooling",tech:["Git","Node.js"],diff:"Medium",
    q:"What is the difference between npm, npx, and Bun, and when would you use each?",
    a:"<strong>npm</strong>: Installs packages and manages dependencies. <code>npm install</code> adds packages to node_modules. <code>npm run</code> executes scripts defined in package.json.<br><br><strong>npx</strong>: Runs a Node.js package directly — downloading it temporarily if not installed. Perfect for one-off tools (scaffolding CLIs) where you don't want a permanent installation.<br><br><strong>Bun</strong>: A new JavaScript runtime (like Node.js) that also includes a bundler, test runner, and package manager — all in one, written in Zig for extreme speed. npm install on a large project can take 30s; bun install often takes 1-2s.",
    code:"# npm — install and manage dependencies\nnpm install express\nnpm install -D typescript\nnpm run build\nnpm ci          # clean install for CI/CD\n\n# npx — run without permanently installing\nnpx create-react-app my-app\nnpx prisma migrate dev\nnpx serve dist  # serve dist folder temporarily\n\n# Bun — runtime + package manager\nbun install     # much faster than npm install\nbun run dev     # run scripts\nbun add express\nbun test        # built-in test runner",
    explain:'"I use npm for production Node.js projects where ecosystem compatibility matters most. npx is my go-to for running CLIs I don\'t want to install globally — prisma, create-react-app, etc. I\'m increasingly using Bun on greenfield projects because the speed difference is dramatic — bun install is genuinely 10-20x faster on large projects."',
    tip:"Use npm ci instead of npm install in CI/CD pipelines. It installs exactly from package-lock.json without modifying it, ensuring reproducible builds and failing fast if package-lock.json is out of sync."
  },
  {
    id:50,cat:"Git & Tooling",tech:["Git"],diff:"Medium",
    q:"What is a Git workflow and how does GitFlow or Trunk-Based Development work?",
    a:"A <strong>Git workflow</strong> is a branching strategy — agreed rules for how teams create, name, merge, and delete branches.<br><br><strong>GitFlow</strong>: Uses long-lived branches — main (production), develop (integration), feature/* (new work), release/* (release prep), hotfix/* (emergency fixes). Good for software with scheduled releases and formal versioning.<br><br><strong>Trunk-Based Development (TBD)</strong>: All developers commit to main frequently — multiple times per day. Feature flags hide incomplete work. Branches are short-lived (hours, not days). Preferred by high-performing engineering teams. Requires solid CI/CD and test coverage.",
    code:"# GitFlow\ngit checkout -b feature/user-auth develop  # from develop\n# ... work ...\ngit checkout develop\ngit merge --no-ff feature/user-auth\ngit branch -d feature/user-auth\n\n# Trunk-Based Development\ngit checkout main && git pull\ngit checkout -b feat/search-bar   # short-lived branch\n# ... work for a few hours ...\ngit push origin feat/search-bar\n# Open PR -> review -> merge to main -> deploy\n\n// Feature flag — hide incomplete work in main\nif (featureFlags.newSearch) {\n  return renderNewSearchBar();\n}\nreturn renderOldSearchBar();",
    explain:'"Most modern startups use Trunk-Based Development because it forces small, frequent integrations — avoiding the \'merge hell\' of long-lived feature branches. GitFlow makes sense for products with formal versioning (v1.2, v1.3). Feature flags are the key enabler of TBD — they let incomplete code live in main without affecting users."',
    tip:"Regardless of workflow, keep branches short-lived. A feature branch open for more than 2 days accumulates drift from main, and merge conflicts grow exponentially with time. Small, frequent PRs are easier to review and safer to deploy."
  }
];

/* ── Constants ── */
const SK = 'iqhub_inter_v2';

/* ── Validated localStorage load ── */
function loadDone(key) {
  try {
    var raw = localStorage.getItem(key);
    if (!raw) return new Set();
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter(function(n) {
      return Number.isInteger(n) && n > 0 && n <= 200;
    }));
  } catch(e) { return new Set(); }
}

var done = loadDone(SK);
var fDiff = 'all';
var fCat  = 'all';

var cats = [...new Set(Q.map(function(q) { return q.cat; }))];

/* ── Category filter buttons ── */
function buildCatButtons() {
  var catbtns = document.getElementById('catbtns');
  if (!catbtns) return;
  catbtns.innerHTML = '';

  var allBtn = document.createElement('button');
  allBtn.className = 'btn';
  allBtn.setAttribute('aria-pressed', 'true');
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', function() { setC('all', allBtn); });
  catbtns.appendChild(allBtn);

  cats.forEach(function(c) {
    var b = document.createElement('button');
    b.className = 'btn';
    b.setAttribute('aria-pressed', 'false');
    b.textContent = c;
    b.addEventListener('click', function() { setC(c, b); });
    catbtns.appendChild(b);
  });
}

function setC(c, btn) {
  fCat = c;
  var catbtns = document.getElementById('catbtns');
  if (catbtns) {
    catbtns.querySelectorAll('.btn').forEach(function(b) {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
  }
  render();
}

/* ── Difficulty buttons ── */
function initDiffButtons() {
  document.querySelectorAll('[data-d]').forEach(function(b) {
    b.addEventListener('click', function() {
      document.querySelectorAll('[data-d]').forEach(function(x) {
        x.setAttribute('aria-pressed', 'false');
        x.classList.remove('e', 'm');
      });
      b.setAttribute('aria-pressed', 'true');
      var v = b.dataset.d;
      fDiff = v;
      if (v === 'Easy') b.classList.add('e');
      else if (v === 'Medium') b.classList.add('m');
      render();
    });
  });
}

/* ── Toggle accordion ── */
function tog(id) {
  var body   = document.getElementById('b' + id);
  var togBtn = document.getElementById('tb' + id);
  var card   = document.getElementById('c' + id);
  if (!body || !togBtn || !card) return;
  var isOpen = !body.hidden;
  body.hidden = isOpen;
  togBtn.setAttribute('aria-expanded', String(!isOpen));
  card.classList.toggle('open', !isOpen);
  if (!isOpen) {
    // announce for screen readers
    announce('Answer expanded');
  }
}

/* ── Mark done ── */
function mkDone(id) {
  var btn  = document.getElementById('db' + id);
  var card = document.getElementById('c' + id);
  if (!btn || !card) return;
  var isDone = done.has(id);
  if (isDone) {
    done.delete(id);
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Mark question ' + id + ' as done');
    card.classList.remove('done');
    announce('Marked as not done');
  } else {
    done.add(id);
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Question ' + id + ' marked as done. Click to undo.');
    card.classList.add('done');
    announce('Marked as done');
  }
  try { localStorage.setItem(SK, JSON.stringify([...done])); } catch(ex) {}
  upd();
}

/* ── Accessible live announcer ── */
function announce(msg) {
  var live = document.getElementById('a11y-live');
  if (!live) return;
  live.textContent = '';
  setTimeout(function() { live.textContent = msg; }, 50);
}

/* ── Escape HTML (for any future user-dynamic content) ── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Render question list ── */
function render() {
  // Search is filtered, never written to DOM
  var srchEl = document.getElementById('srch');
  var s = srchEl ? srchEl.value.toLowerCase().trim().slice(0, 120) : '';

  var list = document.getElementById('ql');
  if (!list) return;
  list.innerHTML = '';

  var fil = Q.filter(function(q) {
    var d  = fDiff === 'all' || q.diff === fDiff;
    var c  = fCat  === 'all' || q.cat  === fCat;
    var sr = !s ||
      q.q.toLowerCase().includes(s) ||
      q.cat.toLowerCase().includes(s) ||
      q.tech.some(function(t) { return t.toLowerCase().includes(s); });
    return d && c && sr;
  });

  if (!fil.length) {
    var emp = document.createElement('div');
    emp.className = 'es';
    emp.setAttribute('role', 'status');
    emp.innerHTML = '<p>No questions match. Try adjusting filters or search.</p>';
    list.appendChild(emp);
    upd();
    return;
  }

  fil.forEach(function(q) {
    var isDone = done.has(q.id);
    var article = document.createElement('article');
    article.className = 'qc' + (isDone ? ' done' : '');
    article.id = 'c' + q.id;

    var tagsHTML = q.tech.map(function(t) {
      return '<span class="tg tt">' + escapeHTML(t) + '</span>';
    }).join('') +
    '<span class="tg t' + escapeHTML(q.diff.toLowerCase().charAt(0)) + '">' + escapeHTML(q.diff) + '</span>' +
    '<span class="tg tc">' + escapeHTML(q.cat) + '</span>';

    var codeHTML = q.code
      ? '<div class="cb" role="region" aria-label="Code example"><code>' + q.code + '</code></div>'
      : '';

    // NOTE: q.a, q.explain, q.tip are from a trusted, hardcoded array — not user input.
    // q.q (question text) is also hardcoded; escapeHTML applied to dynamic parts only.
    article.innerHTML =
      '<div class="qh">' +
        '<span class="qn" aria-hidden="true">' + String(q.id).padStart(2, '0') + '</span>' +
        '<div class="qm">' +
          '<div class="qt" aria-label="Tags">' + tagsHTML + '</div>' +
          '<p class="qq" id="qq' + q.id + '">' + q.q + '</p>' +
        '</div>' +
        '<div class="qa">' +
          '<button class="db' + (isDone ? ' done' : '') + '"' +
            ' id="db' + q.id + '"' +
            ' aria-pressed="' + (isDone ? 'true' : 'false') + '"' +
            ' aria-label="' + (isDone ? 'Question ' + q.id + ' done. Click to undo' : 'Mark question ' + q.id + ' as done') + '"' +
            ' data-done-id="' + q.id + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</button>' +
          '<button class="toggle-btn"' +
            ' id="tb' + q.id + '"' +
            ' aria-expanded="false"' +
            ' aria-controls="b' + q.id + '"' +
            ' aria-labelledby="qq' + q.id + '"' +
            ' data-toggle-id="' + q.id + '">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="sr-only">Toggle answer</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="qb" id="b' + q.id + '" role="region" aria-labelledby="qq' + q.id + '" hidden>' +
        '<div class="sh" aria-hidden="true">Answer</div>' +
        '<div class="at">' + q.a + '</div>' +
        codeHTML +
        '<div class="eb">' +
          '<div class="ehe" aria-hidden="true">How to explain it to the interviewer</div>' +
          '<p class="et">' + q.explain + '</p>' +
        '</div>' +
        '<div class="tb"><div class="tbl" aria-hidden="true">Pro Tip</div><p>' + q.tip + '</p></div>' +
      '</div>';

    list.appendChild(article);
  });

  // Attach events AFTER insertion (not via inline handlers)
  fil.forEach(function(q) {
    var togBtn = document.getElementById('tb' + q.id);
    var doneBtn = document.getElementById('db' + q.id);
    if (togBtn) togBtn.addEventListener('click', function() { tog(q.id); });
    if (doneBtn) doneBtn.addEventListener('click', function(e) { e.stopPropagation(); mkDone(q.id); });
  });

  upd();
}

/* ── Keyboard: Escape closes open accordion ── */
function initKeyboard() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.toggle-btn[aria-expanded="true"]').forEach(function(btn) {
        var id = btn.dataset.toggleId;
        if (id) tog(parseInt(id, 10));
      });
    }
  });
}

/* ── Update stats ── */
function upd() {
  var tot = Q.length;
  var dn  = done.size;
  var pct = tot > 0 ? Math.round((dn / tot) * 100) : 0;

  var setTxt = function(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('tQ', tot);
  setTxt('dQ', dn);
  setTxt('lQ', tot - dn);
  setTxt('pQ', pct + '%');
  setTxt('ptxt', dn + ' / ' + tot + ' completed');

  var pfill = document.getElementById('pfill');
  if (pfill) pfill.style.width = pct + '%';

  var statsRegion = document.getElementById('stats-region');
  if (statsRegion) statsRegion.setAttribute('aria-label', dn + ' of ' + tot + ' questions completed, ' + pct + ' percent');

  var cpwrap = document.getElementById('cpwrap');
  if (cpwrap) {
    cpwrap.innerHTML = '';
    cats.forEach(function(c) {
      var ct = Q.filter(function(q) { return q.cat === c; }).length;
      var cd = Q.filter(function(q) { return q.cat === c && done.has(q.id); }).length;
      var p  = document.createElement('div');
      p.className = 'cpill';
      // c comes from Q array (trusted), cd/ct are integers — safe
      p.innerHTML = '<span class="dot" aria-hidden="true"></span>' + escapeHTML(c) + ': ' + cd + '/' + ct;
      cpwrap.appendChild(p);
    });
  }
}

/* ── Search: debounced ── */
function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  buildCatButtons();
  initDiffButtons();
  initKeyboard();
  document.getElementById('srch') && document.getElementById('srch').addEventListener('input', debounce(render, 200));
  render();
});
