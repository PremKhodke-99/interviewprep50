'use strict';

const Q = [
  {
    "id": 1,
    "company": "Google",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "How would you design a URL shortener like bit.ly?",
    "a": "<strong>URL Shortener Design</strong><br><br>This is a classic system design question focusing on scale and uniqueness...",
    "code": "// Example hash function snippet\nfunction getShortHash(url) {\n  return btoa(url).substring(0, 7);\n}",
    "explain": "\"I would start by clarifying requirements (read vs write heavy, scale) then propose a high-level architecture with an API gateway, load balancer, and a distributed database.\"",
    "tip": "Remember to talk about handling collisions in the hash function and scaling read operations with a caching layer."
  },
  {
    "id": 2,
    "company": "Meta",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "How does the virtual DOM work in React?",
    "a": "React uses a virtual DOM to optimize UI updates. When state changes, a new virtual DOM tree is created and compared with the old one (diffing).",
    "code": "// Virtual DOM diffing concept",
    "explain": "\"The virtual DOM is React's performance secret. Without it, every state change would mean re-rendering the whole page.\"",
    "tip": "The virtual DOM is one of React's performance tools, but it's not magic. If you write very frequent small updates, consider useMemo."
  },
  {
    "id": 3,
    "company": "Amazon",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "How would you design a URL shortener like bit.ly?",
    "a": "Start with base62 encoding for the short ID...",
    "code": "// Hash generation",
    "explain": "\"I would use a relational database for consistency and a cache like Redis for fast reads.\""
  },
  {
    "id": 4,
    "company": "Cognizant",
    "tech": [
      "React"
    ],
    "diff": "Easy",
    "q": "Explain React's Virtual DOM and how it improves performance.",
    "a": "The <strong>Virtual DOM</strong> is a lightweight, in-memory representation of the real DOM. Instead of updating the browser's DOM directly (which is slow and expensive), React updates the Virtual DOM first. It then compares the new Virtual DOM with a snapshot of the previous one (a process called <strong>diffing</strong>). Finally, it calculates the minimum number of changes needed and updates the real DOM only where necessary (<strong>reconciliation</strong>).",
    "code": "// Conceptually, updating the real DOM is like repainting a whole wall.\n// The Virtual DOM acts as a blueprint, finding only the exact spot that needs a touch-up.",
    "explain": "\"I explain it as a diffing engine. Direct DOM manipulation is a bottleneck. React creates an object representation of the UI, makes changes there first, and then efficiently applies only the delta to the real DOM.\"",
    "tip": "Be sure to mention 'diffing' and 'reconciliation' as those are the key buzzwords interviewers look for."
  },
  {
    "id": 5,
    "company": "Cognizant",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "How does React's reconciliation process work internally?",
    "a": "<strong>Reconciliation</strong> is the algorithm React uses to diff one tree with another to determine which parts need to be changed. React relies on two heuristics:<br><br>1. Two elements of different types will produce different trees (React will tear down the old tree and build the new one from scratch).<br>2. The developer can hint at which child elements may be stable across different renders with a <code>key</code> prop.",
    "code": "// Why keys are important in reconciliation:\n// BAD: elements might be recreated unnecessarily if order changes\n{items.map((item, index) =&gt; &lt;li key={index}&gt;{item.name}&lt;/li&gt;)}\n\n// GOOD: React knows exactly which item moved, was added, or deleted\n{items.map(item =&gt; &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;)}",
    "explain": "\"When the state changes, React builds a new tree. It compares it against the old tree. If the root elements have different types (like going from a div to a span), React tears down the old component completely. For lists, it uses keys to track elements between renders.\"",
    "tip": "Never use array indexes as keys if the list can be reordered, added to, or filtered, as it completely breaks the reconciliation optimization and can lead to UI bugs."
  },
  {
    "id": 6,
    "company": "Cognizant",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Difference between useMemo and useCallback. When would you use each?",
    "a": "Both are used for performance optimization (memoization) but they return different things:<br><br><strong>useMemo</strong> returns a memoized <em>value</em>. It's used to avoid expensive calculations on every render.<br><strong>useCallback</strong> returns a memoized <em>callback function</em>. It's used to maintain referential equality for a function between renders, usually to prevent unnecessary re-renders of child components that depend on that function.",
    "code": "// useMemo: caches a computed value\nconst expensiveResult = useMemo(() =&gt; computeMath(a, b), [a, b]);\n\n// useCallback: caches the function itself\nconst handleClick = useCallback(() =&gt; {\n  console.log('Clicked', a);\n}, [a]);\n// Under the hood, useCallback(fn, deps) is just useMemo(() =&gt; fn, deps)",
    "explain": "\"useMemo remembers a value so you don't have to recalculate it. useCallback remembers a function so its memory address doesn't change on every render, which is crucial when passing callbacks down to memoized child components.\"",
    "tip": "Don't prematurely optimize! Only use them if you're doing heavy calculations or if a child component wrapped in React.memo is re-rendering too often because of a new function reference."
  },
  {
    "id": 7,
    "company": "Cognizant",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "What are React Fiber and concurrent features introduced in modern React?",
    "a": "<strong>React Fiber</strong> is the new reconciliation engine in React 16+. Its main goal is to enable incremental rendering of the virtual DOM. It can pause, abort, or reuse work as new updates come in, prioritizing high-priority updates (like user input) over low-priority ones (like fetching data).<br><br><strong>Concurrent features</strong> (like <code>useTransition</code> and <code>Suspense</code>) build on Fiber to allow React to prepare multiple versions of the UI at the same time without blocking the main thread.",
    "code": "import { useTransition, useState } from 'react';\n\nconst [isPending, startTransition] = useTransition();\nconst [query, setQuery] = useState('');\n\nfunction handleChange(e) {\n  // High priority: update input field immediately\n  setQuery(e.target.value); \n  // Low priority: update the heavy search results later\n  startTransition(() =&gt; {\n    setSearchQuery(e.target.value);\n  });\n}",
    "explain": "\"Before Fiber, React used a synchronous, blocking stack reconciler. Once an update started, it couldn't be stopped, causing dropped frames. Fiber breaks work into chunks, yielding to the browser so the UI stays responsive. Concurrent React uses this to render in the background.\"",
    "tip": "Think of Fiber as the internal engine architecture, and Concurrent React as the features (like useTransition) that developers actually use which are powered by Fiber."
  },
  {
    "id": 8,
    "company": "Cognizant",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Explain the component lifecycle in functional components.",
    "a": "In functional components, we don't have traditional lifecycle methods (like <code>componentDidMount</code>, <code>componentDidUpdate</code>, <code>componentWillUnmount</code>). Instead, we use the <strong>useEffect</strong> hook to handle all side effects across the lifecycle.<br><br>1. <strong>Mounting</strong>: Runs once when the component appears.<br>2. <strong>Updating</strong>: Runs when specified dependencies change.<br>3. <strong>Unmounting</strong>: Handled by the cleanup function returned inside <code>useEffect</code>.",
    "code": "useEffect(() =&gt; {\n  // 1. MOUNT: Component just rendered\n  const timer = setInterval(() =&gt; console.log('Tick'), 1000);\n\n  // 2. UPDATE: Will re-run if dependencies (the array below) change.\n  // Since it's [], it only runs on mount.\n\n  return () =&gt; {\n    // 3. UNMOUNT (Cleanup): Component is about to be removed\n    clearInterval(timer);\n  };\n}, []); // Empty array = run once on mount",
    "explain": "\"I explain it through useEffect. We can replicate componentDidMount with an empty dependency array, componentDidUpdate by putting variables in the array, and componentWillUnmount by returning a cleanup function from the effect.\"",
    "tip": "Always remember the cleanup function in useEffect. If you attach an event listener or a setInterval without cleaning it up, you will cause massive memory leaks in a Single Page Application."
  },
  {
    "id": 9,
    "company": "Cognizant",
    "tech": [
      "Performance",
      "React"
    ],
    "diff": "Hard",
    "q": "How would you optimize a React application with thousands of rendered items?",
    "a": "Rendering thousands of DOM nodes will crush browser performance. The primary solution is <strong>Virtualization (or Windowing)</strong> using libraries like <code>react-window</code> or <code>react-virtualized</code>. Instead of rendering 10,000 items, you only render the 10-20 items currently visible on the screen, plus a few buffer items.<br><br>Other optimizations: use <code>React.memo</code> to prevent unnecessary re-renders of list items, ensure stable <code>key</code> props, and implement pagination or infinite scrolling.",
    "code": "import { FixedSizeList as List } from 'react-window';\n\nconst Row = ({ index, style }) =&gt; (\n  &lt;div style={style}&gt;Row {index}&lt;/div&gt;\n);\n\nconst Example = () =&gt; (\n  &lt;List\n    height={150}\n    itemCount={10000} // Virtualizes 10,000 items instantly\n    itemSize={35}\n    width={300}\n  &gt;\n    {Row}\n  &lt;/List&gt;\n);",
    "explain": "\"The golden rule of large lists is: don't render what the user can't see. I would immediately reach for a virtualization library. It keeps the DOM node count extremely low, regardless of whether the array has a hundred items or a million.\"",
    "tip": "Virtualization is specifically for long lists. If you just have heavy components, code-splitting (React.lazy) or pagination are better approaches."
  },
  {
    "id": 10,
    "company": "Cognizant",
    "tech": [
      "Performance",
      "React"
    ],
    "diff": "Medium",
    "q": "What causes unnecessary re-renders and how can they be identified?",
    "a": "<strong>Causes:</strong><br>1. Parent component re-renders (forces all children to re-render by default).<br>2. Passing inline objects or functions as props (creates a new reference on every render).<br>3. Context value changes (forces all consumers to re-render).<br><br><strong>Identification:</strong><br>Use the <strong>React DevTools Profiler</strong>. You can record a session and it will show you exactly why a component rendered (e.g., 'Props changed' or 'Hook 1 changed').",
    "code": "// CAUSE: Inline object creates a new reference every time Parent renders\nfunction Parent() {\n  return &lt;Child style={{ color: 'red' }} /&gt;;\n}\n\n// FIX: Extract static objects or use useMemo\nconst staticStyle = { color: 'red' };\nfunction Parent() {\n  return &lt;Child style={staticStyle} /&gt;;\n}",
    "explain": "\"A re-render isn't always bad, but unnecessary ones hurt performance. The most common cause I see is passing inline functions or objects to child components wrapped in React.memo, breaking the memoization. I rely heavily on the React Profiler tab to diagnose this.\"",
    "tip": "A component re-rendering doesn't necessarily mean the actual DOM was updated (thanks to the Virtual DOM), but executing the component function repeatedly is still wasted CPU cycles."
  },
  {
    "id": 11,
    "company": "Cognizant",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "How would you implement authentication and protected routes in React?",
    "a": "1. <strong>State:</strong> Use React Context or a state manager (Zustand/Redux) to store the authentication status globally.<br>2. <strong>Storage:</strong> Store the JWT token securely (preferably in an HttpOnly cookie, or localStorage/sessionStorage with XSS precautions).<br>3. <strong>Protected Route Component:</strong> Create a wrapper component that checks the auth state. If authenticated, it renders the <code>children</code> or <code>Outlet</code>. If not, it redirects to the login page using <code>Navigate</code>.",
    "code": "import { Navigate, Outlet } from 'react-router-dom';\nimport { useAuth } from './AuthContext';\n\nconst ProtectedRoute = () =&gt; {\n  const { isAuthenticated, isLoading } = useAuth();\n\n  if (isLoading) return &lt;div&gt;Loading...&lt;/div&gt;;\n  \n  // Redirect to login if not authenticated\n  return isAuthenticated ? &lt;Outlet /&gt; : &lt;Navigate to=\"/login\" replace /&gt;;\n};\n\n// Router usage:\n// &lt;Route element={&lt;ProtectedRoute /&gt;}&gt;\n//   &lt;Route path=\"/dashboard\" element={&lt;Dashboard /&gt;} /&gt;\n// &lt;/Route&gt;",
    "explain": "\"I use a Higher-Order Component or a layout route wrapper in React Router. It intercepts the rendering. If the user context is null, it immediately navigates them back to login. I also ensure there's a loading state so we don't accidentally redirect while checking a valid token on refresh.\"",
    "tip": "Always use `replace` on the `<Navigate />` component for protected routes so the user doesn't get stuck in a redirect loop if they hit the back button."
  },
  {
    "id": 12,
    "company": "Cognizant",
    "tech": [
      "React",
      "State Management"
    ],
    "diff": "Medium",
    "q": "Difference between Redux Toolkit, Context API, and Zustand.",
    "a": "<strong>Context API:</strong> Built into React. Great for low-frequency updates (theme, auth state). Bad for high-frequency updates because any change re-renders all consumers.<br><br><strong>Redux Toolkit (RTK):</strong> The industry standard for complex, enterprise apps. Highly opinionated, uses a single immutable store, strict reducers, and has incredible DevTools. But it has a steep learning curve and boilerplate.<br><br><strong>Zustand:</strong> A modern, lightweight alternative. It uses a single store like Redux but without the boilerplate (no reducers/dispatch needed). It solves Context's re-render issues by allowing components to select only the state they need.",
    "code": "// Zustand - Extremely simple and zero boilerplate\nimport { create } from 'zustand'\n\nconst useStore = create((set) =&gt; ({\n  bears: 0,\n  increasePopulation: () =&gt; set((state) =&gt; ({ bears: state.bears + 1 })),\n  removeAllBears: () =&gt; set({ bears: 0 }),\n}))\n\n// Usage in component (only re-renders when bears change)\nconst bears = useStore((state) =&gt; state.bears)",
    "explain": "\"Context is for dependency injection, not really state management. If I need a global state for a small to medium app today, I immediately choose Zustand. It gives the benefits of Redux (selectors, outside-React access) with zero boilerplate. I reserve RTK for massive legacy enterprise apps.\"",
    "tip": "Context is NOT a state manager. It is a way to pass values deep into the tree without prop-drilling. It doesn't 'manage' state on its own."
  },
  {
    "id": 13,
    "company": "Cognizant",
    "tech": [
      "TypeScript"
    ],
    "diff": "Medium",
    "q": "Explain TypeScript Generics with a practical example.",
    "a": "<strong>Generics</strong> allow you to create reusable components/functions that can work over a variety of types rather than a single one. They are like variables for types. When you call a generic function, you pass the actual type you want it to use, ensuring type safety without losing flexibility.",
    "code": "// Without Generics: Any type is allowed, but we lose type safety on the return\nfunction getFirstItem(arr: any[]) { return arr[0]; }\n\n// With Generics: &lt;T&gt; captures the type\nfunction getFirstItem&lt;T&gt;(arr: T[]): T {\n  return arr[0];\n}\n\nconst num = getFirstItem&lt;number&gt;([1, 2, 3]); // num is strongly typed as number\nconst str = getFirstItem&lt;string&gt;(['a', 'b']); // str is strongly typed as string\n\n// In React:\ninterface Props&lt;T&gt; {\n  items: T[];\n  renderItem: (item: T) =&gt; React.ReactNode;\n}",
    "explain": "\"Generics solve the problem of writing flexible code without resorting to the 'any' type. If I write an API fetcher, I don't know what data structure it will return in advance. By making it generic, the developer calling the function can specify the expected interface, and TypeScript will enforce it.\"",
    "tip": "You will see Generics constantly in React with `useState<User | null>(null)`. The `<User | null>` is passing a type argument to the generic `useState` function."
  },
  {
    "id": 14,
    "company": "Cognizant",
    "tech": [
      "TypeScript"
    ],
    "diff": "Medium",
    "q": "What are utility types such as Partial, Required, Readonly, and Record?",
    "a": "Utility types in TypeScript transform existing types into new configurations without redefining them.<br><br><strong>Partial&lt;T&gt;</strong>: Makes all properties in T optional.<br><strong>Required&lt;T&gt;</strong>: Makes all properties in T required (removes ?).<br><strong>Readonly&lt;T&gt;</strong>: Makes all properties in T readonly (cannot be reassigned).<br><strong>Record&lt;K, V&gt;</strong>: Creates an object type with keys of type K and values of type V. Perfect for dictionaries.",
    "code": "interface User {\n  id: number;\n  name?: string;\n}\n\n// Partial: { id?: number; name?: string; }\nconst update: Partial&lt;User&gt; = { name: 'Alice' }; // id is optional now\n\n// Required: { id: number; name: string; }\nconst req: Required&lt;User&gt; = { id: 1, name: 'Alice' }; // name is mandatory now\n\n// Record: Defines a dictionary/map\nconst userMap: Record&lt;string, User&gt; = {\n  'user_1': { id: 1, name: 'Bob' },\n};",
    "explain": "\"Utility types save a massive amount of boilerplate. Instead of creating an entirely new interface just for a PATCH request where everything is optional, I just use Partial<User>. Instead of writing out an index signature for a map, I use Record<string, string>.\"",
    "tip": "Omit<T, Keys> and Pick<T, Keys> are two other incredibly common utility types used to strip away or select specific properties from a larger interface."
  },
  {
    "id": 15,
    "company": "Cognizant",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Explain the JavaScript event loop, Promise execution, and async/await behavior.",
    "a": "JavaScript is single-threaded. The <strong>Event Loop</strong> manages asynchronous operations by constantly checking the Call Stack and the Task Queues.<br><br>There are two queues:<br>1. <strong>Microtask Queue</strong> (High priority): Stores Promise callbacks (<code>.then</code>, <code>.catch</code>, <code>await</code> continuations).<br>2. <strong>Macrotask Queue</strong> (Low priority): Stores <code>setTimeout</code>, <code>setInterval</code>, DOM events.<br><br>The event loop clears the call stack, then completely empties the Microtask queue, then processes ONE Macrotask, and repeats.",
    "code": "console.log('1. Start');\n\nsetTimeout(() =&gt; console.log('4. Timeout (Macrotask)'), 0);\n\nPromise.resolve().then(() =&gt; console.log('3. Promise (Microtask)'));\n\nconsole.log('2. End');\n\n// Output Order:\n// 1. Start\n// 2. End\n// 3. Promise (Microtask)\n// 4. Timeout (Macrotask)",
    "explain": "\"I explain it as a priority boarding system. Synchronous code boards the plane first (Call Stack). Then, all VIPs (Promises/Microtasks) are allowed to board until their line is empty. Finally, regular passengers (Timeouts/Macrotasks) board one by one.\"",
    "tip": "Async/await is syntactic sugar over Promises. When an `await` is encountered, the function pauses, yields control back to the event loop, and puts the remainder of the function into the Microtask queue."
  },
  {
    "id": 16,
    "company": "Cognizant",
    "tech": [
      "JavaScript",
      "React"
    ],
    "diff": "Medium",
    "q": "How would you handle API failures, retries, loading states, and error boundaries?",
    "a": "A robust API strategy involves multiple layers:<br>1. <strong>Local State:</strong> Use <code>isLoading</code> and <code>error</code> states for UI feedback.<br>2. <strong>Retries:</strong> Use a library like Axios with an interceptor, or React Query / SWR which have built-in exponential backoff retries.<br>3. <strong>Error Boundaries:</strong> Wrap parts of the React tree in an Error Boundary component to catch unexpected rendering or lifecycle errors, preventing the whole app from crashing and showing a fallback UI.",
    "code": "// React Query handles loading, errors, and retries automatically!\nimport { useQuery } from '@tanstack/react-query';\n\nfunction Profile() {\n  const { data, isPending, isError } = useQuery({\n    queryKey: ['user'],\n    queryFn: fetchUser,\n    retry: 3, // automatically retries 3 times on failure\n  });\n\n  if (isPending) return &lt;Spinner /&gt;;\n  if (isError) return &lt;ErrorMessage /&gt;;\n  return &lt;div&gt;{data.name}&lt;/div&gt;;\n}",
    "explain": "\"Manually managing loading and error states with useEffect is prone to race conditions and boilerplate. In a modern app, I use a data-fetching library like React Query or SWR. They abstract away retries, caching, and deduplication out of the box. For catastrophic UI crashes, Error Boundaries act as a safety net.\"",
    "tip": "Note that React Error Boundaries catch rendering errors, NOT asynchronous API errors! You must handle async errors in your fetch/catch blocks or pass them to an error boundary manually using a state trick."
  },
  {
    "id": 17,
    "company": "Cognizant",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a frontend architecture for a multi-tenant SaaS application.",
    "a": "A multi-tenant SaaS frontend must handle different customers (tenants) securely and dynamically.<br><br><strong>Key architectural decisions:</strong><br>1. <strong>Routing:</strong> Use subdomain routing (tenantA.app.com) to identify the tenant early.<br>2. <strong>Theming:</strong> Load a CSS variables JSON file based on the tenant ID to dynamically theme the app (colors, logos).<br>3. <strong>Auth:</strong> Attach the tenant ID to the JWT token and all API requests via an Axios interceptor.<br>4. <strong>Feature Flags:</strong> Use a service like LaunchDarkly to toggle features on/off depending on the tenant's subscription tier.",
    "code": "// Axios Interceptor for Multi-Tenant Auth\napi.interceptors.request.use(config =&gt; {\n  const tenantId = getTenantFromSubdomain();\n  const token = localStorage.getItem('token');\n  \n  if (tenantId) {\n    config.headers['X-Tenant-ID'] = tenantId;\n  }\n  if (token) {\n    config.headers['Authorization'] = `Bearer ${token}`;\n  }\n  return config;\n});",
    "explain": "\"The biggest challenge in a multi-tenant frontend is ensuring data isolation and dynamic configuration. I prefer subdomain routing because it makes the context clear immediately. Then, everything from API interceptors to global theme providers reads from that context to customize the experience.\"",
    "tip": "Security is paramount. Even if the frontend hides features a tenant shouldn't see, the backend MUST independently verify the tenant ID on every single API request to prevent unauthorized access."
  },
  {
    "id": 18,
    "company": "Cognizant",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "How would you design a scalable e-commerce frontend handling high traffic during flash sales?",
    "a": "During a flash sale, the backend will be heavily loaded. The frontend's job is to protect the backend and stay responsive.<br><br><strong>Strategies:</strong><br>1. <strong>CDN Caching:</strong> Pre-render product pages (SSG/Next.js) and serve them from the Edge/CDN. Only dynamic data (stock, price) should hit the API.<br>2. <strong>Optimistic UI:</strong> When adding to cart, update the UI instantly before the API responds to make it feel fast.<br>3. <strong>Debouncing/Throttling:</strong> Prevent users from spamming the 'Buy' button.<br>4. <strong>Queuing/Waiting Room:</strong> If traffic spikes wildly, redirect users to a static 'Waiting Room' page hosted on the CDN before letting them into the transaction flow.",
    "code": "Topics to discuss:\n- Code splitting (load checkout JS only when needed)\n- SWR/React Query for stale-while-revalidate caching\n- Zustand for fast cart state\n- Skeleton loaders to reduce perceived latency\n- Sentry for error tracking if services go down",
    "explain": "\"My focus would be offloading as much as possible to the CDN. A flash sale page shouldn't require a database hit just to load the HTML. I'd use Next.js Static Site Generation. For the actual purchase, I would implement a virtual waiting room to rate-limit traffic to the checkout API, ensuring the system doesn't crash under load.\"",
    "tip": "In high-scale system design, the bottleneck is always the database. Any frontend caching, memoization, or debouncing you can do to prevent network requests makes the whole system more robust."
  },
  {
    "id": 19,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "How does event delegation work in JavaScript? Why is it efficient?",
    "a": "Event delegation is a technique where you attach a single event listener to a parent element instead of attaching separate listeners to multiple child elements. It utilizes <strong>event bubbling</strong> (events propagate up the DOM tree).",
    "code": "// Inefficient: Attaching to 1000 list items\n// document.querySelectorAll('li').forEach(li =&gt; li.onclick = ...)\n\n// Efficient: Event Delegation\ndocument.getElementById('parent-ul').addEventListener('click', (e) =&gt; {\n  if (e.target.tagName === 'LI') {\n    console.log('Clicked', e.target.textContent);\n  }\n});",
    "explain": "I'd explain that it saves memory because you only create one function in memory rather than hundreds, and it dynamically handles new child elements added to the DOM later.",
    "tip": "Always check `e.target` to ensure the click originated from the intended element before executing logic."
  },
  {
    "id": 20,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "Difference between let, const, and var. Hoisting and Temporal Dead Zone.",
    "a": "<code>var</code> is function-scoped and hoisted (initialized as undefined).<br><code>let</code> and <code>const</code> are block-scoped and hoisted but NOT initialized, placing them in a <strong>Temporal Dead Zone (TDZ)</strong> until the line of declaration is reached.",
    "code": "console.log(a); // undefined\nvar a = 10;\n\nconsole.log(b); // ReferenceError (TDZ)\nlet b = 20;",
    "explain": "Var is legacy. Let is for reassignment. Const is for variables that won't be reassigned. The TDZ prevents bugs by throwing an error if you try to use a let/const before it's declared.",
    "tip": "Use const by default. Only switch to let when you explicitly need to reassign."
  },
  {
    "id": 21,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Explain the JavaScript event loop (Call Stack, Web APIs, Callback Queue, Microtask Queue).",
    "a": "JavaScript is single-threaded. The Event Loop manages execution:<br>1. <strong>Call Stack</strong>: Executes synchronous code.<br>2. <strong>Web APIs</strong>: Browser handles async tasks (setTimeout, fetch).<br>3. <strong>Microtask Queue</strong>: High priority (Promises).<br>4. <strong>Callback Queue (Macrotask)</strong>: Low priority (setTimeout).<br>The loop empties the Call Stack, then empties the Microtask Queue completely, then takes one item from the Callback Queue.",
    "code": "setTimeout(() =&gt; console.log('Macrotask'), 0);\nPromise.resolve().then(() =&gt; console.log('Microtask'));\nconsole.log('Sync');\n// Output: Sync -&gt; Microtask -&gt; Macrotask",
    "explain": "I explain it as a priority boarding queue. Sync code boards first, then Microtasks (VIPs) until empty, then one Macrotask (economy) at a time.",
    "tip": "Microtasks can starve the event loop. If a Microtask keeps queuing more Microtasks, the UI will freeze."
  },
  {
    "id": 22,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "How does === differ from ==? Explain type coercion with examples.",
    "a": "<code>===</code> is strict equality (checks value AND type).<br><code>==</code> is loose equality (checks value only, performing <strong>type coercion</strong> if the types differ).",
    "code": "5 == '5';  // true (string '5' is coerced to number 5)\n5 === '5'; // false (different types)\n\nnull == undefined; // true\nnull === undefined; // false",
    "explain": "Loose equality leads to unpredictable bugs because of JavaScript's weird coercion rules (like [] == 0 being true). Strict equality prevents this.",
    "tip": "Always use ===. The only acceptable use case for == is checking `if (val == null)` to catch both null and undefined."
  },
  {
    "id": 23,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "What is Closure? Provide a real-world use case.",
    "a": "A <strong>Closure</strong> is a function that remembers the variables from its lexical scope even after that outer function has finished executing.",
    "code": "// Real world use case: Data Privacy / Encapsulation\nfunction createCounter() {\n  let count = 0; // Private variable\n  return {\n    increment: () =&gt; ++count,\n    getCount: () =&gt; count\n  };\n}\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1",
    "explain": "It's like a backpack that a function carries around with it, containing the variables that were in scope when it was created. It's used for currying, memoization, and private variables.",
    "tip": "React hooks (like useState and useEffect) rely heavily on closures under the hood to maintain state between renders."
  },
  {
    "id": 24,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Explain async/await vs Promises. How does the event loop handle them?",
    "a": "<code>async/await</code> is syntactic sugar over Promises, making asynchronous code look synchronous and easier to read. Under the hood, an `await` pauses the function execution, returning control to the event loop, and schedules the rest of the function as a Microtask once the Promise resolves.",
    "code": "// Promise chain\nfetch(url).then(r =&gt; r.json()).then(data =&gt; console.log(data));\n\n// Async/Await\nasync function getData() {\n  const r = await fetch(url);\n  const data = await r.json();\n  console.log(data);\n}",
    "explain": "Async/await eliminates 'callback hell' and .then() chaining, making error handling with try/catch much cleaner.",
    "tip": "You cannot use await in a top-level script unless you are using ES Modules. Otherwise, it must be inside an async function."
  },
  {
    "id": 25,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Deep copy vs Shallow copy in JavaScript objects/arrays.",
    "a": "A <strong>Shallow copy</strong> copies the top-level properties. If a property is a nested object, it copies the <em>reference</em> to it. (e.g., spread operator <code>{...obj}</code>).<br>A <strong>Deep copy</strong> creates a completely new copy of all nested objects as well.",
    "code": "const original = { a: 1, b: { c: 2 } };\n\n// Shallow copy\nconst shallow = { ...original };\nshallow.b.c = 99; // MUTATES ORIGINAL!\n\n// Deep copy (modern way)\nconst deep = structuredClone(original);\ndeep.b.c = 42; // Original is safe",
    "explain": "For flat objects, a spread operator is fine. For nested objects, modifying the copy will mutate the original if it's shallow. I use structuredClone() for native deep copying.",
    "tip": "JSON.parse(JSON.stringify(obj)) is a hacky way to deep copy, but it fails with Date objects, functions, and undefined values."
  },
  {
    "id": 26,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "Difference between nullish coalescing (??) and logical OR (||).",
    "a": "<code>||</code> returns the right side if the left side is <strong>falsy</strong> (0, '', false, null, undefined, NaN).<br><code>??</code> returns the right side ONLY if the left side is <strong>nullish</strong> (null or undefined).",
    "code": "const count = 0;\n\nconst a = count || 10; // a is 10 (because 0 is falsy)\nconst b = count ?? 10; // b is 0 (because 0 is not nullish)",
    "explain": "If 0 or empty string are valid values in your application (like a score of 0), using || will introduce a bug by overwriting them with the default. ?? fixes this.",
    "tip": "Use ?? for default values in configuration objects or props."
  },
  {
    "id": 27,
    "company": "Unknown",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Explain WeakMap and WeakSet with use cases.",
    "a": "WeakMap and WeakSet are collections that only accept objects as keys. They are <strong>weakly held</strong>, meaning if there are no other references to the object key, it can be garbage collected. They are not iterable.",
    "code": "let user = { name: 'Alice' };\nconst cache = new WeakMap();\n\ncache.set(user, 'secret data');\n// If user object is deleted:\nuser = null;\n// The 'secret data' is automatically garbage collected from the WeakMap!",
    "explain": "They prevent memory leaks. A great use case is attaching extra data to a DOM node (like tracking if it's been processed). When the DOM node is removed from the page, the data in the WeakMap vanishes automatically.",
    "tip": "Because they are garbage collectable, you cannot loop over or get the size of a WeakMap."
  },
  {
    "id": 28,
    "company": "Unknown",
    "tech": [
      "Performance",
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Scenario Based: You're building a real-time chat application where multiple messages arrive simultaneously. How would you ensure the DOM updates efficiently without blocking the main thread?",
    "a": "1. <strong>Debouncing/Throttling</strong> incoming state updates.<br>2. <strong>Virtualization</strong> (react-window) so only visible messages are rendered.<br>3. <strong>DocumentFragment</strong> if using vanilla JS to append multiple messages in a single reflow.<br>4. <strong>requestAnimationFrame</strong> or <code>useTransition</code> in React to schedule low-priority rendering.",
    "code": "// Batching updates with DocumentFragment\nconst fragment = document.createDocumentFragment();\nmessages.forEach(msg =&gt; {\n  const el = document.createElement('div');\n  el.textContent = msg;\n  fragment.appendChild(el);\n});\ndocument.getElementById('chat').appendChild(fragment);",
    "explain": "The biggest bottleneck is the DOM layout reflow. Batching DOM writes into a DocumentFragment, or utilizing React's concurrent features, ensures the main thread isn't blocked by 100 separate paint operations.",
    "tip": "If a user is scrolled up reading old messages, don't automatically scroll them down when a new message arrives. Show a 'New messages' badge instead."
  },
  {
    "id": 29,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Difference between useEffect and useLayoutEffect.",
    "a": "<code>useEffect</code> runs <strong>asynchronously</strong> after the browser has painted the screen. Good for fetching data.<br><code>useLayoutEffect</code> runs <strong>synchronously</strong> immediately after React mutates the DOM, but BEFORE the browser paints. Good for measuring DOM elements.",
    "code": "useLayoutEffect(() =&gt; {\n  // Measure a tooltip width before the user sees it\n  const width = ref.current.getBoundingClientRect().width;\n  setTooltipWidth(width);\n}, []);",
    "explain": "If you use useEffect to change the DOM based on a measurement, the user might see a flicker (initial render -> paint -> effect runs -> re-render -> paint). useLayoutEffect blocks the paint until it finishes, preventing the flicker.",
    "tip": "Always default to useEffect. Only use useLayoutEffect if you see a visual flicker on the screen."
  },
  {
    "id": 30,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "What is React Fiber? How does it improve rendering performance?",
    "a": "Fiber is React's internal reconciliation engine. Its primary feature is <strong>incremental rendering</strong>: the ability to pause, abort, or reuse work. It assigns priorities to updates (e.g., typing in an input is high priority, rendering a large list is low priority) so the main thread remains responsive.",
    "code": "// Fiber enables Concurrent React features\nimport { useTransition } from 'react';\nconst [isPending, startTransition] = useTransition();\n\n// startTransition tells Fiber: 'this update is low priority, you can interrupt it'",
    "explain": "Before Fiber, rendering was synchronous and blocking. If a complex tree was rendering, the browser froze. Fiber breaks work into chunks and yields to the browser periodically.",
    "tip": "You don't interact with Fiber directly. You interact with features it enables, like Suspense and useTransition."
  },
  {
    "id": 31,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "How does React handle circular dependencies in useEffect?",
    "a": "React doesn't 'handle' it—it crashes! If a <code>useEffect</code> updates a state variable, and that state variable is in the dependency array, it causes an infinite loop.",
    "code": "const [count, setCount] = useState(0);\n\n// INFINITE LOOP CRASH!\nuseEffect(() =&gt; {\n  setCount(count + 1);\n}, [count]);\n\n// FIX: Use functional state update\nuseEffect(() =&gt; {\n  setCount(prev =&gt; prev + 1);\n}, []); // Empty dependency array",
    "explain": "If you need to update state based on previous state inside an effect, use the functional update form (prev => prev + 1). This removes the state from the dependency array, breaking the cycle.",
    "tip": "Use the `eslint-plugin-react-hooks` linter rule. It will warn you when dependency arrays are missing or dangerous."
  },
  {
    "id": 32,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "How to implement protected routes with authentication (Context API, Redux)?",
    "a": "You create a wrapper component (Higher Order Component or Route Layout) that consumes the auth state from Context/Redux. If the user is authenticated, it renders the child route. If not, it redirects to the login page using a Router navigation component.",
    "code": "const ProtectedRoute = () =&gt; {\n  const { user } = useContext(AuthContext);\n  return user ? &lt;Outlet /&gt; : &lt;Navigate to=\"/login\" replace /&gt;;\n};",
    "explain": "This ensures the protected UI is never rendered for unauthenticated users. I always include a loading check so it doesn't redirect briefly while fetching the token on a hard refresh.",
    "tip": "Client-side protection is just for UX. The real protection must happen on the backend API, verifying the token on every request."
  },
  {
    "id": 33,
    "company": "Unknown",
    "tech": [
      "Next.js"
    ],
    "diff": "Hard",
    "q": "How does Next.js automatic code splitting and SSR work?",
    "a": "<strong>Code Splitting:</strong> Next.js automatically splits code by route. When you load a page, you only download the JS for that specific page, not the whole app.<br><strong>SSR:</strong> When a request hits the server, Next.js executes the React components, generates raw HTML, and sends it to the browser for a fast First Contentful Paint. Then, it sends the JS bundle to 'hydrate' the page and make it interactive.",
    "code": "// In App Router, components are Server Components by default\n// They are rendered on the server and send zero JS to the client!\nexport default async function Page() {\n  const data = await fetch(url);\n  return &lt;div&gt;{data.title}&lt;/div&gt;;\n}",
    "explain": "SSR is fantastic for SEO and perceived load time. Code splitting ensures the Time to Interactive is low because the browser isn't parsing megabytes of unused Javascript.",
    "tip": "In Next.js App Router, use 'use client' only at the leaf nodes (like a button with onClick) to keep most of your tree as Server Components."
  },
  {
    "id": 34,
    "company": "Unknown",
    "tech": [
      "Next.js"
    ],
    "diff": "Easy",
    "q": "How does Next.js handle environment variables (.env.local vs .env.production)?",
    "a": "Next.js loads variables from <code>.env.local</code> in development and <code>.env.production</code> in production. By default, environment variables are only available on the Node.js server. To expose them to the browser (client-side JS), they must be prefixed with <code>NEXT_PUBLIC_</code>.",
    "code": "// .env.local\nDATABASE_URL=postgres://... (Server only)\nNEXT_PUBLIC_API_URL=https://... (Client and Server)\n\n// Usage in code\nconst db = process.env.DATABASE_URL;\nconst api = process.env.NEXT_PUBLIC_API_URL;",
    "explain": "This prevents accidentally leaking sensitive database passwords or API secrets into the client-side JavaScript bundle.",
    "tip": "Never commit .env.local to version control!"
  },
  {
    "id": 35,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Easy",
    "q": "Difference between ReactDOM.render() and createRoot() in React 18.",
    "a": "<code>ReactDOM.render()</code> is the legacy React 17 API. <code>createRoot()</code> is the new React 18 API that enables Concurrent Features (like useTransition, Suspense) and automatic batching of state updates.",
    "code": "// React 17\nimport ReactDOM from 'react-dom';\nReactDOM.render(&lt;App /&gt;, document.getElementById('root'));\n\n// React 18\nimport { createRoot } from 'react-dom/client';\nconst root = createRoot(document.getElementById('root'));\nroot.render(&lt;App /&gt;);",
    "explain": "Switching to createRoot opts you into the new Fiber concurrent renderer. Without it, React 18 behaves exactly like React 17.",
    "tip": "Automatic batching means if you call multiple setStates inside a setTimeout or fetch promise, React 18 will batch them into one render."
  },
  {
    "id": 36,
    "company": "Unknown",
    "tech": [
      "React",
      "System Design"
    ],
    "diff": "Hard",
    "q": "Scenario Based: You're designing a dashboard where chart updates, user notifications, and data fetches must happen independently. How would you use React Context / Custom Hooks to achieve this?",
    "a": "I would <strong>split the Contexts</strong>. Having one giant global Context causes unnecessary re-renders (if notifications update, the charts shouldn't re-render). I would create a `ChartContext`, a `NotificationContext`, and a `UserContext`.",
    "code": "const ChartProvider = ({ children }) =&gt; {\n  // fetch chart data\n  return &lt;ChartContext.Provider value={...}&gt;{children}&lt;/ChartContext.Provider&gt;\n}",
    "explain": "Context is great, but any change triggers a re-render for ALL consumers. Splitting contexts by domain ensures orthogonal data streams don't affect each other's performance. For highly frequent updates, I'd skip Context and use Zustand.",
    "tip": "For a real-time dashboard, consider using WebSockets and a library like React Query or Zustand which handles fine-grained reactivity better than Context."
  },
  {
    "id": 37,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Difference between useState and useReducer.",
    "a": "Both manage local state. <code>useState</code> is simple and replaces the old state. <code>useReducer</code> is for complex state logic that involves multiple sub-values or when the next state depends on the previous one. It centralizes state logic into a 'reducer' function (like Redux).",
    "code": "const reducer = (state, action) =&gt; {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    default: return state;\n  }\n};\nconst [state, dispatch] = useReducer(reducer, { count: 0 });",
    "explain": "If I find myself calling multiple `setX`, `setY` in a row, or if the state is deeply nested, I switch to useReducer to keep the update logic clean and predictable.",
    "tip": "useReducer is also great for passing down a `dispatch` function via Context instead of passing down multiple specific setter functions."
  },
  {
    "id": 38,
    "company": "Unknown",
    "tech": [
      "React",
      "Performance"
    ],
    "diff": "Medium",
    "q": "How does React manage re-renders (useMemo, useCallback, React.memo)?",
    "a": "React re-renders a component when its state or props change, and by default, <strong>re-renders all its children</strong>. <br><code>React.memo</code> prevents a child from re-rendering if its props haven't changed.<br><code>useCallback</code> memoizes a function reference so it doesn't break React.memo.<br><code>useMemo</code> memoizes an expensive calculation.",
    "code": "const Child = React.memo(({ onClick }) =&gt; &lt;div&gt;...&lt;/div&gt;);\n\nconst Parent = () =&gt; {\n  // Without useCallback, this function is recreated every render, breaking React.memo!\n  const handleClick = useCallback(() =&gt; {}, []);\n  return &lt;Child onClick={handleClick} /&gt;;\n};",
    "explain": "I use React.memo on heavy components (like tables/charts). But it only works if the props are primitves or referentially stable. That's why useCallback is needed for passing functions to memoized children.",
    "tip": "Over-using these hooks can actually hurt performance because memoization has a memory/CPU cost. Use them only when profiling shows a bottleneck."
  },
  {
    "id": 39,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "How do you implement optimistic updates vs pessimistic updates in React?",
    "a": "<strong>Optimistic Update:</strong> Update the UI instantly, then make the API call. If the API fails, roll back the UI to the previous state. Gives a snappy UX.<br><strong>Pessimistic Update:</strong> Make the API call, show a spinner, and only update the UI when the API succeeds.",
    "code": "// Optimistic approach with React Query\nqueryClient.setQueryData(['todos'], old =&gt; [...old, newTodo]);\nmutation.mutate(newTodo, {\n  onError: () =&gt; queryClient.setQueryData(['todos'], oldData) // rollback\n});",
    "explain": "For a 'Like' button, I always use optimistic updates because failures are rare and users expect instant feedback. For a payment submission, I use pessimistic updates because accuracy is critical.",
    "tip": "React Query and SWR have built-in APIs to handle optimistic updates and rollbacks automatically."
  },
  {
    "id": 40,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "Explain React reconciliation and the Virtual DOM diffing algorithm.",
    "a": "Reconciliation is the process of comparing the new Virtual DOM tree with the old one. React uses a heuristic O(n) algorithm based on two rules:<br>1. Different element types (div -> span) result in tearing down the old tree and building a new one.<br>2. Lists require a <code>key</code> prop to track which elements moved, were added, or were deleted.",
    "code": "&lt;ul&gt;\n  &lt;li key=\"1\"&gt;Apple&lt;/li&gt;\n  &lt;li key=\"2\"&gt;Banana&lt;/li&gt;\n&lt;/ul&gt;",
    "explain": "Without keys, if you insert an item at the top of a list, React mutates every single element below it. With keys, React realizes it just needs to insert one node and move the others.",
    "tip": "Never use array index as a key if the list can be reordered, as it defeats the purpose of the diffing algorithm."
  },
  {
    "id": 41,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Component lifecycle methods vs Hooks lifecycle (Mounting, Updating, Unmounting).",
    "a": "In class components: <code>componentDidMount</code>, <code>componentDidUpdate</code>, <code>componentWillUnmount</code>.<br>In functional components, <code>useEffect</code> handles all three phases.",
    "code": "useEffect(() =&gt; {\n  // 1. componentDidMount (on initial render)\n  // 2. componentDidUpdate (if dependencies change)\n\n  return () =&gt; {\n    // 3. componentWillUnmount (cleanup)\n  };\n}, [dependencies]);",
    "explain": "Hooks are superior because they group related logic together. In a class, setting up a timer is in Mount, and clearing it is in Unmount. In a hook, they sit right next to each other in one effect.",
    "tip": "If the dependency array is completely omitted, the effect runs on every single render."
  },
  {
    "id": 42,
    "company": "Unknown",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "Scenario Based: You have an e-commerce product listing where multiple users can add items to cart simultaneously. How would you use React Query / SWR with optimistic updates to prevent stale UI?",
    "a": "When a user clicks 'Add to Cart', I use `onMutate` to snapshot the current cache, instantly increment the cart count (optimistic update), and return the snapshot. If the API mutation fails, I use the `onError` callback to rollback the cache using the snapshot. Finally, `onSettled` invalidates the query to refetch the absolute truth from the server.",
    "code": "useMutation(addToCart, {\n  onMutate: async (item) =&gt; {\n    await queryClient.cancelQueries('cart');\n    const prev = queryClient.getQueryData('cart');\n    queryClient.setQueryData('cart', old =&gt; [...old, item]);\n    return { prev };\n  },\n  onError: (err, item, context) =&gt; queryClient.setQueryData('cart', context.prev),\n  onSettled: () =&gt; queryClient.invalidateQueries('cart'),\n});",
    "explain": "This pattern gives the user instant feedback (snappy UI) while guaranteeing data consistency because it always re-syncs with the server in the background.",
    "tip": "Always cancel outgoing queries for that key in `onMutate` so an older in-flight request doesn't overwrite your optimistic update."
  },
  {
    "id": 43,
    "company": "Unknown",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a real-time collaborative text editor (like Google Docs).",
    "a": "The core challenge is resolving conflicts when two users type at the same time. The standard solution is <strong>Operational Transformation (OT)</strong> or <strong>CRDTs (Conflict-free Replicated Data Types)</strong>.<br>Architecture: Client edits -> Sent via WebSocket to Server -> Server sequences operations using OT -> Broadcasts resolved operations to all clients.",
    "code": "Concepts to discuss:\n- WebSockets for bi-directional real-time communication.\n- OT algorithm (transforms index operations so they don't overwrite each other).\n- Debouncing local saves.\n- Redis pub/sub for scaling multiple WebSocket servers.",
    "explain": "I'd emphasize WebSockets for low latency. If User A types at index 5 and User B types at index 5 simultaneously, a naive system corrupts the document. OT mathematically transforms the operations so both are applied correctly.",
    "tip": "CRDTs are the modern replacement for OT because they are decentralized and easier to implement."
  },
  {
    "id": 44,
    "company": "Unknown",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a Rate limiter for API calls in a SPA.",
    "a": "Client-side rate limiting is for UX (preventing spam clicks), while Server-side is for security. On the client, I'd implement a <strong>debouncer</strong> for search inputs, a <strong>throttler</strong> for scroll events, and disable submit buttons while loading. On the server, I'd use an API Gateway with Redis and a Token Bucket algorithm.",
    "code": "// Client-side Debounce example\nfunction debounce(func, delay) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() =&gt; func.apply(this, args), delay);\n  };\n}",
    "explain": "I separate client and server responsibilities. The client prevents accidental double-clicks. The server uses Redis to track IP addresses and drop requests if they exceed 100/minute to prevent DDoS.",
    "tip": "Always return an HTTP 429 Too Many Requests status code when rate limiting on the backend."
  },
  {
    "id": 45,
    "company": "Unknown",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a dynamic pagination system for infinite scrolling.",
    "a": "I would use <strong>Cursor-based pagination</strong> instead of Offset/Limit. Offset is slow for large datasets and causes duplicates if new items are added while scrolling. Cursor pagination passes the ID of the last item seen.",
    "code": "// Client-side using IntersectionObserver\nconst observer = new IntersectionObserver(entries =&gt; {\n  if (entries[0].isIntersecting) fetchNextPage(lastItemId);\n});\nobserver.observe(loadingSpinnerRef.current);\n\n// API Query\n// SELECT * FROM posts WHERE id &lt; :lastItemId ORDER BY id DESC LIMIT 10",
    "explain": "On the frontend, I use the IntersectionObserver API to detect when the user hits the bottom. I fetch the next chunk using a cursor and append it to the state. I use React Query's `useInfiniteQuery` to handle this easily.",
    "tip": "Cursor pagination is faster because it can utilize database indexes efficiently, whereas OFFSET requires scanning and skipping rows."
  },
  {
    "id": 46,
    "company": "Unknown",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a client-side state management system like Redux Toolkit.",
    "a": "The core is the <strong>Observer Pattern</strong>. You need a central `Store` holding the state object, a `dispatch` function to send actions, and a list of `listeners` (components) that subscribe to changes.",
    "code": "class Store {\n  constructor(reducer, initialState) {\n    this.state = initialState;\n    this.listeners = [];\n    this.reducer = reducer;\n  }\n  getState() { return this.state; }\n  subscribe(listener) { this.listeners.push(listener); }\n  dispatch(action) {\n    this.state = this.reducer(this.state, action);\n    this.listeners.forEach(l =&gt; l());\n  }\n}",
    "explain": "I'd explain that React components subscribe to the store on mount. When dispatch is called, the store runs the reducer to get the new state, then loops through all listeners, triggering a React re-render.",
    "tip": "Redux uses immutable state updates so it can use shallow equality checks (===) to quickly determine if a component needs to re-render."
  },
  {
    "id": 47,
    "company": "Unknown",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a user authentication flow with social login (OAuth, JWT tokens).",
    "a": "1. User clicks 'Login with Google'. Frontend redirects to Google's OAuth URL.<br>2. User approves, Google redirects back to Frontend with an Auth Code.<br>3. Frontend sends Code to Backend.<br>4. Backend trades Code with Google for an Access Token and fetches User Profile.<br>5. Backend generates its own JWT token and sends it to Frontend (via HttpOnly Cookie).",
    "code": "// HttpOnly cookies prevent XSS attacks because JS cannot read them.\nSet-Cookie: token=jwt123; HttpOnly; Secure; SameSite=Strict",
    "explain": "I emphasize security. The frontend never receives the Google Access Token, only the backend does. And the backend issues a JWT stored in an HttpOnly cookie so cross-site scripting (XSS) attacks can't steal the session.",
    "tip": "Always mention HttpOnly cookies for JWT storage. Storing JWTs in localStorage is a major security vulnerability in interviews."
  },
  {
    "id": 48,
    "company": "JioHotstar",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Promises and output-based questions.",
    "a": "Promise output questions test your understanding of synchronous vs asynchronous execution, specifically how the <strong>Microtask Queue</strong> works. Code inside a `new Promise` constructor is executed synchronously, while `.then()` and `.catch()` callbacks are pushed to the Microtask Queue.",
    "code": "console.log(1);\nnew Promise((resolve) =&gt; {\n  console.log(2);\n  resolve(3);\n}).then((res) =&gt; console.log(res));\nconsole.log(4);\n\n// Output: 1, 2, 4, 3",
    "explain": "I'd explain that 1 logs first. Then the Promise constructor runs synchronously, logging 2. It resolves with 3, which pushes the .then callback to the Microtask queue. Then 4 logs synchronously. Finally, the Call Stack empties, and the Event Loop processes the Microtask queue, logging 3.",
    "tip": "Remember that `setTimeout` callbacks go to the Macrotask Queue, which runs AFTER the Microtask Queue is completely empty."
  },
  {
    "id": 49,
    "company": "JioHotstar",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Event Loop, microtasks vs macrotasks.",
    "a": "The Event Loop continuously checks if the Call Stack is empty. If it is, it first processes <strong>all Microtasks</strong> (Promises, MutationObserver, queueMicrotask). Once the Microtask Queue is completely empty, it processes <strong>one Macrotask</strong> (setTimeout, setInterval, I/O, UI rendering), then repeats.",
    "code": "setTimeout(() =&gt; console.log('Macrotask 1'), 0);\n\nPromise.resolve().then(() =&gt; {\n  console.log('Microtask 1');\n  Promise.resolve().then(() =&gt; console.log('Microtask 2'));\n});\n\n// Output: Microtask 1 -&gt; Microtask 2 -&gt; Macrotask 1",
    "explain": "A crucial detail is that if a microtask schedules another microtask, it will be executed immediately in the same cycle. This can potentially starve the event loop and prevent UI rendering if overused. Macrotasks yield to the browser between executions.",
    "tip": "UI Rendering usually happens between processing Microtasks and Macrotasks. If you need to update the DOM before a heavy operation, use `requestAnimationFrame`."
  },
  {
    "id": 50,
    "company": "JioHotstar",
    "tech": [
      "Performance"
    ],
    "diff": "Hard",
    "q": "Critical Rendering Path.",
    "a": "The Critical Rendering Path (CRP) is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on the screen.<br>1. <strong>DOM</strong> (Document Object Model) is built from HTML.<br>2. <strong>CSSOM</strong> (CSS Object Model) is built from CSS.<br>3. <strong>Render Tree</strong> combines DOM and CSSOM (excluding hidden nodes like `display: none`).<br>4. <strong>Layout</strong> calculates exact positions/sizes.<br>5. <strong>Paint</strong> draws pixels.",
    "code": "// Optimizing CRP:\n// 1. Minify HTML/CSS/JS\n// 2. Use &lt;link rel=\"preload\"&gt; for critical fonts/styles\n// 3. Defer non-critical JS (&lt;script defer&gt;)\n// 4. Inline critical CSS in the &lt;head&gt;",
    "explain": "I focus on minimizing render-blocking resources. CSS is render-blocking because the browser can't paint without knowing the styles. Sync JavaScript is parser-blocking because it might use `document.write` to change the HTML.",
    "tip": "To improve First Contentful Paint (FCP), ensure the CSS required for the above-the-fold content is as small as possible."
  },
  {
    "id": 51,
    "company": "JioHotstar",
    "tech": [
      "Performance",
      "React"
    ],
    "diff": "Medium",
    "q": "Bundle optimization, code splitting, lazy loading.",
    "a": "<strong>Bundle Optimization</strong> involves reducing the total JavaScript sent to the client (Tree shaking, minification).<br><strong>Code Splitting</strong> breaks one massive bundle into smaller chunks (e.g., one chunk per route).<br><strong>Lazy Loading</strong> defers the loading of these chunks until they are actually needed by the user.",
    "code": "import React, { Suspense, lazy } from 'react';\n\nLazy load the VideoPlayer component only when it renders\nconst VideoPlayer = lazy(() =&gt; import('./VideoPlayer'));\n\nfunction App() {\n  return (\n    &lt;Suspense fallback={&lt;div&gt;Loading Video...&lt;/div&gt;}&gt;\n      &lt;VideoPlayer /&gt;\n    &lt;/Suspense&gt; );\n}",
    "explain": "In a massive app like JioHotstar, serving a 5MB JS bundle upfront kills the Time to Interactive (TTI). By route-splitting and lazy-loading heavy components (like the video player itself), the initial load becomes lightning fast.",
    "tip": "Use tools like Webpack Bundle Analyzer to visually inspect which libraries are bloating your chunk sizes."
  },
  {
    "id": 52,
    "company": "JioHotstar",
    "tech": [
      "Performance"
    ],
    "diff": "Hard",
    "q": "Reflow vs repaint and rendering performance.",
    "a": "<strong>Reflow (Layout)</strong> happens when you change an element's size or position (width, height, top, left, font-size). The browser must recalculate the layout of the entire page, which is very expensive.<br><strong>Repaint</strong> happens when you change visual styles that don't affect layout (color, visibility, background). It is less expensive than Reflow.",
    "code": "// BAD: Triggers Reflow (Layout thrashing)\nconst width = el.offsetWidth; // Reads layout\nel.style.width = width + 10 + 'px'; // Writes layout\n// Doing this in a loop freezes the browser.\n\n// GOOD: Hardware Accelerated Animation (No reflow/repaint on main thread!)\nel.style.transform = `translateX(${distance}px)`;\nel.style.opacity = 0.5;",
    "explain": "To achieve 60 FPS animations, avoid properties that trigger layout. Stick to <code>transform</code> and <code>opacity</code> because modern browsers offload these to the GPU (Compositor thread), bypassing both reflow and repaint on the main thread.",
    "tip": "Reading layout properties (like `offsetWidth`, `scrollTop`) forces a synchronous layout calculation. Batch your DOM reads and writes separately to avoid layout thrashing."
  },
  {
    "id": 53,
    "company": "JioHotstar",
    "tech": [
      "Performance"
    ],
    "diff": "Medium",
    "q": "HTTP/1.1 vs HTTP/2 and network optimizations.",
    "a": "<strong>HTTP/1.1</strong> suffers from Head-of-Line blocking; it requires opening multiple TCP connections to fetch files concurrently (usually limited to 6 per domain).<br><strong>HTTP/2</strong> solves this using <strong>Multiplexing</strong>: multiple requests and responses can be sent concurrently over a <em>single</em> TCP connection. It also uses binary framing and compresses HTTP headers.",
    "code": "Network Optimizations for Media (JioHotstar):\n- Use HTTP/2 or HTTP/3 (QUIC) for multiplexing.\n- Implement a robust CDN architecture.\n- Use Brotli compression instead of Gzip for static assets.\n- Resource Hints: &lt;link rel=\"preconnect\"&gt; for API and CDN domains.",
    "explain": "Because HTTP/2 is multiplexed, the old HTTP/1.1 optimization trick of 'domain sharding' (serving images from img1.domain.com, img2.domain.com) is actually an anti-pattern now because it forces the browser to do multiple expensive DNS and TLS handshakes.",
    "tip": "HTTP/2 requires HTTPS. You cannot use it over an unencrypted connection in modern browsers."
  },
  {
    "id": 54,
    "company": "JioHotstar",
    "tech": [
      "System Design"
    ],
    "diff": "Hard",
    "q": "Design a scalable Video Player (API design, accessibility, theming, performance, scalability, trade-offs).",
    "a": "<strong>Architecture:</strong> A modular UI wrapping a core media engine (HTML5 Video / MSE).<br><strong>Performance:</strong> Use HLS/DASH for adaptive bitrate streaming (switching quality based on bandwidth). Buffer chunks in memory.<br><strong>API Design:</strong> Expose a clean imperative API (`play()`, `pause()`, `seek(time)`) and declarative props for React (`src`, `autoPlay`, `poster`).<br><strong>Accessibility (a11y):</strong> Custom controls must use semantic `<button>`, `aria-labels` for play/pause, keyboard navigation (Space to toggle, arrows to seek), and ARIA live regions for announcements.<br><strong>Theming:</strong> Use CSS variables (Custom Properties) so teams can inject their branding (`--player-primary-color`).",
    "code": "// A scalable React wrapper approach\nconst VideoPlayer = ({ src, theme, onProgress }) =&gt; {\n  const videoRef = useRef(null);\n  // ... MSE/HLS logic attaches to videoRef ...\n\n  return (\n    &lt;div className=\"player-container\" data-theme={theme}&gt;\n      &lt;video ref={videoRef} className=\"core-video\" /&gt;\n      &lt;Controls aria-label=\"Video Controls\" /&gt;\n    &lt;/div&gt;\n  );\n}",
    "explain": "The biggest trade-off is between using the native browser controls (great for accessibility and performance, but impossible to style consistently) versus building custom controls (heavy DOM manipulation, requires manual a11y, but offers complete design control). For a company like JioHotstar, custom controls with rigorous a11y testing is mandatory.",
    "tip": "Discuss Digital Rights Management (DRM). Premium video platforms use Encrypted Media Extensions (EME) to decrypt Widevine/PlayReady content securely."
  },
  {
    "id": 55,
    "company": "JioHotstar",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "Build an Autocomplete using React.js (Machine Coding).",
    "a": "An autocomplete needs to handle API fetching, debounce input to prevent spamming the backend, manage loading/error states, handle keyboard navigation (Arrow Up/Down, Enter), and cache previous results.",
    "code": "function Autocomplete({ fetchSuggestions }) {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [activeIdx, setActiveIdx] = useState(-1);\n\n  // Debounced effect\n  useEffect(() =&gt; {\n    const timer = setTimeout(() =&gt; {\n      if (query) fetchSuggestions(query).then(setResults);\n    }, 300);\n    return () =&gt; clearTimeout(timer);\n  }, [query]);\n\n  const onKeyDown = (e) =&gt; {\n    if (e.key === 'ArrowDown') {\n      setActiveIdx(prev =&gt; (prev &lt; results.length - 1 ? prev + 1 : prev));\n    } else if (e.key === 'ArrowUp') {\n      setActiveIdx(prev =&gt; (prev &gt; 0 ? prev - 1 : prev));\n    } else if (e.key === 'Enter' && activeIdx &gt;= 0) {\n      setQuery(results[activeIdx]); // Select\n      setResults([]); // Close dropdown\n    }\n  };\n\n  return (\n    &lt;div&gt;\n      &lt;input value={query} onChange={e =&gt; setQuery(e.target.value)} onKeyDown={onKeyDown} /&gt;\n      {results.length &gt; 0 && (\n        &lt;ul&gt;\n          {results.map((res, i) =&gt; (\n            &lt;li key={i} className={i === activeIdx ? 'active' : ''}&gt;{res}&lt;/li&gt;\n          ))}\n        &lt;/ul&gt;\n      )}\n    &lt;/div&gt;\n  );\n}",
    "explain": "In a machine coding round, focus heavily on edge cases: What happens if an API call fails? What happens if they delete the text quickly? (A stale API request might resolve and show options for an empty box). Cancelling in-flight requests or ignoring stale promises using an `isMounted` flag is critical.",
    "tip": "A true autocomplete should also support aria-attributes like `aria-autocomplete`, `aria-activedescendant`, and `role=\"combobox\"` for screen readers."
  },
  {
    "id": 56,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Explain the JavaScript Event Loop. How do Microtasks and Macrotasks work?",
    "a": "JavaScript is single-threaded. The Event Loop manages execution:<br>1. <strong>Call Stack</strong>: Executes synchronous code.<br>2. <strong>Web APIs</strong>: Browser handles async tasks (setTimeout, fetch).<br>3. <strong>Microtask Queue</strong>: High priority (Promises).<br>4. <strong>Callback Queue (Macrotask)</strong>: Low priority (setTimeout).<br>The loop empties the Call Stack, then empties the Microtask Queue completely, then takes one item from the Callback Queue.",
    "code": "setTimeout(() =&gt; console.log('Macrotask'), 0);\nPromise.resolve().then(() =&gt; console.log('Microtask'));\nconsole.log('Sync');\n// Output: Sync -&gt; Microtask -&gt; Macrotask",
    "explain": "I explain it as a priority boarding queue. Sync code boards first, then Microtasks (VIPs) until empty, then one Macrotask (economy) at a time.",
    "tip": "Microtasks can starve the event loop. If a Microtask keeps queuing more Microtasks, the UI will freeze."
  },
  {
    "id": 57,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "What is a Closure? Explain with a real-world example.",
    "a": "A <strong>Closure</strong> is a function that remembers the variables from its lexical scope even after that outer function has finished executing.",
    "code": "// Real world use case: Data Privacy / Encapsulation\nfunction createCounter() {\n  let count = 0; // Private variable\n  return {\n    increment: () =&gt; ++count,\n    getCount: () =&gt; count\n  };\n}\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1",
    "explain": "It's like a backpack that a function carries around with it, containing the variables that were in scope when it was created. It's used for currying, memoization, and private variables.",
    "tip": "React hooks (like useState and useEffect) rely heavily on closures under the hood to maintain state between renders."
  },
  {
    "id": 58,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "Explain Hoisting and the Temporal Dead Zone.",
    "a": "<strong>Hoisting</strong> is JavaScript's default behavior of moving declarations to the top of the current scope before code execution. <code>var</code> is hoisted and initialized as <code>undefined</code>. <code>let</code> and <code>const</code> are hoisted but NOT initialized.<br>The <strong>Temporal Dead Zone (TDZ)</strong> is the period from the start of the block until the <code>let/const</code> declaration is evaluated. Accessing them in the TDZ throws a ReferenceError.",
    "code": "console.log(a); // undefined (Hoisted & initialized)\nvar a = 10;\n\nconsole.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)\nlet b = 20;",
    "explain": "The TDZ was introduced in ES6 to catch bugs. Before ES6, accessing a variable before its declaration silently returned undefined, which caused logic errors. Now, the TDZ strictly enforces declaring variables before using them.",
    "tip": "Function declarations are fully hoisted (you can call them before they appear in code). Function expressions (const myFunc = () => {}) obey let/const hoisting rules."
  },
  {
    "id": 59,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "Difference between \"var\", \"let\", and \"const\".",
    "a": "<code>var</code> is function-scoped and hoisted (initialized as undefined). It allows redeclaration.<br><code>let</code> is block-scoped, hoisted (but uninitialized - TDZ), and allows reassignment but not redeclaration.<br><code>const</code> is block-scoped, must be initialized at declaration, and cannot be reassigned (though objects/arrays declared with const can be mutated).",
    "code": "if (true) {\n  var x = 1;\n  let y = 2;\n  const z = 3;\n}\nconsole.log(x); // 1\nconsole.log(y); // ReferenceError\n\nconst obj = { a: 1 };\nobj.a = 2; // Valid! Const prevents reassignment, not mutation.",
    "explain": "Var is considered legacy. I always default to const because it signals that a variable's reference won't change, making code easier to reason about. I only use let when I know the variable needs to be reassigned (like in a for loop).",
    "tip": "Never use var in modern JavaScript."
  },
  {
    "id": 60,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Explain the \"this\" keyword in normal functions vs arrow functions.",
    "a": "In <strong>normal functions</strong>, <code>this</code> is determined dynamically by <em>how</em> the function is called (e.g., the object calling the method).<br>In <strong>arrow functions</strong>, <code>this</code> is determined lexically by <em>where</em> the function is written in the code. Arrow functions do not have their own <code>this</code>; they inherit it from the surrounding scope.",
    "code": "const obj = {\n  name: 'Alice',\n  regularFunc: function() {\n    console.log(this.name); // 'Alice' (called by obj)\n    \n    setTimeout(function() {\n      console.log(this.name); // undefined (called by window/timeout)\n    }, 100);\n\n    setTimeout(() =&gt; {\n      console.log(this.name); // 'Alice' (inherits from regularFunc scope)\n    }, 100);\n  }\n};",
    "explain": "Arrow functions solve the classic JavaScript problem of losing 'this' in callbacks (like event listeners or timers).",
    "tip": "Never use an arrow function as an object method (e.g., `myMethod: () => {}`), because it will inherit `this` from the global scope, not the object."
  },
  {
    "id": 61,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Difference between \"call()\", \"apply()\", and \"bind()\".",
    "a": "All three are methods used to explicitly set the <code>this</code> context of a function.<br><strong>call()</strong>: Invokes the function immediately. Arguments are passed individually.<br><strong>apply()</strong>: Invokes the function immediately. Arguments are passed as an array.<br><strong>bind()</strong>: Returns a <em>new function</em> with the <code>this</code> context bound. It does not invoke it immediately.",
    "code": "const person = { name: 'John' };\nfunction greet(greeting, punctuation) {\n  console.log(`${greeting}, ${this.name}${punctuation}`);\n}\n\ngreet.call(person, 'Hello', '!');    // Hello, John!\ngreet.apply(person, ['Hi', '.']);    // Hi, John.\n\nconst boundGreet = greet.bind(person, 'Hey');\nboundGreet('?');                     // Hey, John?",
    "explain": "I use an acronym to remember: 'A' in Apply stands for Array. Call takes Comma-separated arguments. Bind builds a new function for later use, which is very common in React class components.",
    "tip": "Arrow functions cannot have their `this` context changed using call, apply, or bind. They will completely ignore it."
  },
  {
    "id": 62,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "Difference between \"==\" and \"===\".",
    "a": "<code>===</code> is strict equality (checks value AND type).<br><code>==</code> is loose equality (checks value only, performing <strong>type coercion</strong> if the types differ).",
    "code": "5 == '5';  // true (string '5' is coerced to number 5)\n5 === '5'; // false (different types)\n\nnull == undefined; // true\nnull === undefined; // false",
    "explain": "Loose equality leads to unpredictable bugs because of JavaScript's weird coercion rules (like [] == 0 being true). Strict equality prevents this.",
    "tip": "Always use ===. The only acceptable use case for == is checking `if (val == null)` to catch both null and undefined."
  },
  {
    "id": 63,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Difference between Shallow Copy and Deep Copy.",
    "a": "A <strong>Shallow copy</strong> copies the top-level properties. If a property is a nested object, it copies the <em>reference</em> to it. (e.g., spread operator <code>{...obj}</code>).<br>A <strong>Deep copy</strong> creates a completely new copy of all nested objects as well.",
    "code": "const original = { a: 1, b: { c: 2 } };\n\n// Shallow copy\nconst shallow = { ...original };\nshallow.b.c = 99; // MUTATES ORIGINAL!\n\n// Deep copy (modern way)\nconst deep = structuredClone(original);\ndeep.b.c = 42; // Original is safe",
    "explain": "For flat objects, a spread operator is fine. For nested objects, modifying the copy will mutate the original if it's shallow. I use structuredClone() for native deep copying.",
    "tip": "JSON.parse(JSON.stringify(obj)) is a hacky way to deep copy, but it fails with Date objects, functions, and undefined values."
  },
  {
    "id": 64,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Explain Event Bubbling and Event Capturing.",
    "a": "They are phases of event propagation in the DOM.<br><strong>Event Capturing (Trickling)</strong>: The event travels from the root of the document down to the target element.<br><strong>Event Bubbling</strong>: The event travels from the target element back up to the root.",
    "code": "// By default, addEventListener uses the Bubbling phase\ndocument.getElementById('child').addEventListener('click', () =&gt; console.log('Child'));\ndocument.getElementById('parent').addEventListener('click', () =&gt; console.log('Parent'));\n// Clicking child outputs: Child, then Parent\n\n// To use Capturing phase, pass { capture: true }\ndocument.getElementById('parent').addEventListener('click', () =&gt; console.log('Parent'), { capture: true });\n// Clicking child outputs: Parent, then Child\n\n// To stop propagation:\n// event.stopPropagation();",
    "explain": "Event delegation relies entirely on Event Bubbling. Without bubbling, we couldn't attach a single listener to a parent `<ul>` to handle clicks on dynamically added `<li>` children.",
    "tip": "Almost all event listeners in standard web development use bubbling. Capturing is rarely used unless you need to intercept an event before it reaches its target."
  },
  {
    "id": 65,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Difference between LocalStorage, SessionStorage, Cookies, and IndexedDB.",
    "a": "<strong>LocalStorage:</strong> Stores 5-10MB of string data persistently. Doesn't expire.<br><strong>SessionStorage:</strong> Same capacity as LocalStorage, but clears when the browser tab is closed.<br><strong>Cookies:</strong> Stores small data (4KB) sent to the server with every HTTP request. Can be secured with HttpOnly/Secure flags.<br><strong>IndexedDB:</strong> A powerful, asynchronous, transactional database in the browser for storing large amounts of structured data (files/blobs).",
    "code": "// LocalStorage\nlocalStorage.setItem('theme', 'dark');\n// Cookies\ndocument.cookie = \"user=123; Secure; HttpOnly\";",
    "explain": "For authentication, I use Cookies (HttpOnly) because JS can't read them, preventing XSS attacks. For UI preferences, LocalStorage. For complex offline web apps, IndexedDB.",
    "tip": "LocalStorage is synchronous and blocks the main thread. Don't use it to store megabytes of JSON."
  },
  {
    "id": 66,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "Explain Promises and Async/Await.",
    "a": "A <strong>Promise</strong> is an object representing the eventual completion (or failure) of an asynchronous operation. It has three states: Pending, Fulfilled, or Rejected.<br><strong>Async/Await</strong> is syntactic sugar over Promises, making asynchronous code look synchronous and easier to read.",
    "code": "// Promise chain\nfetch(url)\n  .then(r =&gt; r.json())\n  .then(data =&gt; console.log(data))\n  .catch(err =&gt; console.error(err));\n\n// Async/Await\nasync function getData() {\n  try {\n    const r = await fetch(url);\n    const data = await r.json();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}",
    "explain": "Async/await eliminates 'callback hell' and deep .then() chaining. It makes error handling unified because you can wrap async calls in standard try/catch blocks.",
    "tip": "Always wrap await calls in a try/catch block, otherwise unhandled promise rejections can crash Node.js applications."
  },
  {
    "id": 67,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Difference between \"Promise.all()\", \"Promise.allSettled()\", \"Promise.any()\", and \"Promise.race()\".",
    "a": "<strong>Promise.all()</strong>: Waits for ALL to resolve. Short-circuits (rejects immediately) if ANY promise rejects.<br><strong>Promise.allSettled()</strong>: Waits for ALL to finish (resolve OR reject). Returns an array of outcomes.<br><strong>Promise.any()</strong>: Returns the FIRST promise to resolve. Ignores rejections unless all reject.<br><strong>Promise.race()</strong>: Returns the FIRST promise to finish, whether it resolves OR rejects.",
    "code": "const p1 = Promise.resolve(1);\nconst p2 = Promise.reject('Error');\nconst p3 = Promise.resolve(3);\n\n// Fails immediately because p2 rejects\nPromise.all([p1, p2, p3]).catch(e =&gt; console.log(e)); // 'Error'\n\n// Waits for all, returns status objects\nPromise.allSettled([p1, p2, p3]).then(console.log);\n// [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 'Error'}, ...]",
    "explain": "Use `all()` when you need all data to proceed. Use `allSettled()` when fetching independent data (like a dashboard) where one failure shouldn't break the whole page. Use `race()` for implementing timeouts.",
    "tip": "Promise.all runs promises concurrently, significantly reducing total wait time compared to awaiting promises sequentially in a loop."
  },
  {
    "id": 68,
    "company": "Deloitte",
    "tech": [
      "Networking",
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "What is CORS? How does it work?",
    "a": "<strong>CORS (Cross-Origin Resource Sharing)</strong> is a browser security mechanism that restricts a webpage from making requests to a different domain than the one that served the webpage.<br>Before sending a complex request (like POST/PUT or requests with custom headers), the browser automatically sends an HTTP <code>OPTIONS</code> request called a <strong>Preflight</strong>. The server must respond with specific headers (like `Access-Control-Allow-Origin`) granting permission.",
    "code": "// The server must return headers like this to allow the request:\nAccess-Control-Allow-Origin: https://myfrontend.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Authorization, Content-Type",
    "explain": "CORS only exists in the browser. It protects the user, not the server. If a malicious site tries to fetch your banking API, the browser blocks it because the bank's server won't include the malicious site in its CORS headers.",
    "tip": "If you get a CORS error in development, you can proxy your requests through a local development server (like Webpack dev server or Next.js API routes) to bypass browser restrictions."
  },
  {
    "id": 69,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Hard",
    "q": "Explain Prototypal Inheritance.",
    "a": "In JavaScript, objects inherit properties and methods from other objects via the <strong>prototype chain</strong>. Every object has a hidden internal property (`__proto__`) that points to its prototype. When you try to access a property on an object, JS checks the object itself. If it's not found, it traverses up the prototype chain until it finds it or reaches `null`.",
    "code": "const animal = { eats: true };\nconst rabbit = { jumps: true };\n\n// Set rabbit's prototype to animal\nrabbit.__proto__ = animal; // Legacy way\n// Object.setPrototypeOf(rabbit, animal); // Modern way\n\nconsole.log(rabbit.jumps); // true (from rabbit)\nconsole.log(rabbit.eats);  // true (inherited from animal prototype)\n\n// Class syntax is just syntactic sugar over this prototype chain!\nclass Animal {}",
    "explain": "Unlike classical inheritance (Java/C++) where classes inherit from classes, JavaScript has objects inheriting directly from other objects. The `class` syntax introduced in ES6 hides this, but under the hood, it's still prototypal inheritance.",
    "tip": "Never mutate `Object.prototype`. It will break the prototype chain for every object in your application and cause severe performance issues."
  },
  {
    "id": 70,
    "company": "Deloitte",
    "tech": [
      "JavaScript"
    ],
    "diff": "Medium",
    "q": "What are Closures and Higher-Order Functions?",
    "a": "A <strong>Higher-Order Function</strong> is a function that either takes a function as an argument, returns a function, or both (e.g., `map`, `filter`, `setTimeout`).<br>A <strong>Closure</strong> is when that inner returned function remembers the variables from its parent function's scope even after the parent has executed.",
    "code": "// Higher-Order Function returning a Closure\nfunction multiplier(factor) {\n  // The returned function is a closure that remembers 'factor'\n  return function(num) {\n    return num * factor;\n  };\n}\n\nconst double = multiplier(2);\nconsole.log(double(5)); // 10",
    "explain": "They work together beautifully. Higher-Order functions are the foundation of functional programming in JavaScript, and Closures are what allow those functions to maintain state and configuration.",
    "tip": "In React, Higher-Order Components (HOCs) are just Higher-Order Functions that take a component and return a new component (often relying on closures to pass down state)."
  },
  {
    "id": 71,
    "company": "Deloitte",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Hard",
    "q": "Implement Debounce from scratch.",
    "a": "Debouncing ensures that a function is not called again until a certain amount of time has passed without it being called. It's essential for performance, like delaying an API call until the user stops typing.",
    "code": "function debounce(func, delay) {\n  let timeoutId;\n  \n  return function(...args) {\n    // Clear the previous timer if the function is called again\n    clearTimeout(timeoutId);\n    \n    // Set a new timer\n    timeoutId = setTimeout(() =&gt; {\n      func.apply(this, args);\n    }, delay);\n  };\n}\n\n// Usage:\nconst search = debounce((query) =&gt; console.log('Searching', query), 300);\nsearch('a');\nsearch('ab'); // Cancels 'a', timer resets",
    "explain": "The core mechanism relies on Closures. The returned function remembers the `timeoutId` variable from the parent scope. Every time the returned function is called, it clears the old timeout and sets a new one.",
    "tip": "In a React component, you usually wrap debounce in a `useCallback` or `useRef` so the debounced function isn't recreated on every render."
  },
  {
    "id": 72,
    "company": "Deloitte",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Hard",
    "q": "Write a Polyfill for \"Array.prototype.map()\".",
    "a": "A polyfill is code that provides modern functionality on older browsers that do not natively support it. To polyfill `.map()`, we iterate over the array, apply the callback to each element, and push the results into a new array.",
    "code": "// Attach to the prototype so all arrays can use it\nArray.prototype.myMap = function(callback, thisArg) {\n  // Error handling\n  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');\n\n  const result = [];\n  // 'this' refers to the array calling the method\n  for (let i = 0; i &lt; this.length; i++) {\n    // Check if index exists (handles sparse arrays)\n    if (i in this) {\n      result[i] = callback.call(thisArg, this[i], i, this);\n    }\n  }\n  return result;\n};\n\nconst arr = [1, 2, 3];\nconsole.log(arr.myMap(x =&gt; x * 2)); // [2, 4, 6]",
    "explain": "In interviews, it's crucial to handle edge cases: checking if the callback is actually a function, binding the `thisArg` context if provided, and using `i in this` to handle sparse arrays (arrays with empty slots).",
    "tip": "Never write polyfills for built-in methods in production code unless absolutely necessary (use Babel instead). Modifying native prototypes is generally considered a bad practice."
  },
  {
    "id": 73,
    "company": "Deloitte",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Hard",
    "q": "Write a Polyfill for \"Promise.all()\".",
    "a": "<code>Promise.all()</code> takes an iterable of promises and returns a single promise. It resolves with an array of results when all promises resolve, or rejects immediately if ANY promise rejects.",
    "code": "Promise.myAll = function(promises) {\n  return new Promise((resolve, reject) =&gt; {\n    const results = [];\n    let completedCount = 0;\n    \n    if (promises.length === 0) resolve(results);\n\n    promises.forEach((promise, index) =&gt; {\n      // Use Promise.resolve to handle non-promise values\n      Promise.resolve(promise).then(\n        value =&gt; {\n          results[index] = value; // Maintain order!\n          completedCount++;\n          if (completedCount === promises.length) {\n            resolve(results);\n          }\n        },\n        error =&gt; {\n          reject(error); // Short-circuit on first rejection\n        }\n      );\n    });\n  });\n};",
    "explain": "The trickiest part is maintaining the order of the results array. Because promises resolve asynchronously, they might finish out of order. By using `results[index] = value` instead of `results.push(value)`, we guarantee the output array matches the input array's order.",
    "tip": "Always wrap the input item in `Promise.resolve(promise)` because the input array might contain plain values (like `[1, 2, Promise.resolve(3)]`)."
  },
  {
    "id": 74,
    "company": "Deloitte",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Easy",
    "q": "Reverse a String without using built-in methods.",
    "a": "Without using `.split('').reverse().join('')`, we can iterate through the string backwards using a standard `for` loop and concatenate the characters to a new string.",
    "code": "function reverseString(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i &gt;= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}\n\nconsole.log(reverseString(\"hello\")); // \"olleh\"\n\n// Alternative using Two Pointers (convert to array first)\n// (Less practical for strings in JS since strings are immutable)",
    "explain": "This is an O(n) operation in terms of time. In JavaScript, string concatenation `+=` is highly optimized by V8 engines, making this approach very efficient.",
    "tip": "If the interviewer asks for a recursive solution: `return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0);` (though less efficient)."
  },
  {
    "id": 75,
    "company": "Deloitte",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "Explain the Virtual DOM and React Reconciliation.",
    "a": "Reconciliation is the process of comparing the new Virtual DOM tree with the old one. React uses a heuristic O(n) algorithm based on two rules:<br>1. Different element types (div -> span) result in tearing down the old tree and building a new one.<br>2. Lists require a <code>key</code> prop to track which elements moved, were added, or were deleted.",
    "code": "&lt;ul&gt;\n  &lt;li key=\"1\"&gt;Apple&lt;/li&gt;\n  &lt;li key=\"2\"&gt;Banana&lt;/li&gt;\n&lt;/ul&gt;",
    "explain": "Without keys, if you insert an item at the top of a list, React mutates every single element below it. With keys, React realizes it just needs to insert one node and move the others.",
    "tip": "Never use array index as a key if the list can be reordered, as it defeats the purpose of the diffing algorithm."
  },
  {
    "id": 76,
    "company": "Deloitte",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Difference between \"useMemo\", \"useCallback\", and \"React.memo\".",
    "a": "React re-renders a component when its state or props change, and by default, <strong>re-renders all its children</strong>. <br><code>React.memo</code> prevents a child from re-rendering if its props haven't changed.<br><code>useCallback</code> memoizes a function reference so it doesn't break React.memo.<br><code>useMemo</code> memoizes an expensive calculation.",
    "code": "const Child = React.memo(({ onClick }) =&gt; &lt;div&gt;...&lt;/div&gt;);\n\nconst Parent = () =&gt; {\n  // Without useCallback, this function is recreated every render, breaking React.memo!\n  const handleClick = useCallback(() =&gt; {}, []);\n  return &lt;Child onClick={handleClick} /&gt;;\n};",
    "explain": "I use React.memo on heavy components (like tables/charts). But it only works if the props are primitves or referentially stable. That's why useCallback is needed for passing functions to memoized children.",
    "tip": "Over-using these hooks can actually hurt performance because memoization has a memory/CPU cost. Use them only when profiling shows a bottleneck."
  },
  {
    "id": 77,
    "company": "Deloitte",
    "tech": [
      "React",
      "Performance"
    ],
    "diff": "Hard",
    "q": "How do you optimize the performance of a React application?",
    "a": "React performance optimization involves reducing the number of renders, the cost of renders, and the bundle size.<br>1. <strong>Code Splitting</strong>: Use `React.lazy` and `Suspense` to lazy-load routes/components.<br>2. <strong>Memoization</strong>: Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders of expensive components.<br>3. <strong>State Colocation</strong>: Move state down the tree as close to where it's needed as possible, so state changes don't re-render parent components.<br>4. <strong>Virtualization</strong>: Use libraries like `react-window` to only render items currently visible in massive lists.<br>5. <strong>Avoid Inline Objects/Functions in Props</strong>: They create new references every render, breaking child memoization.",
    "code": "// Bad: State at the top re-renders everything\nconst App = () =&gt; {\n  const [text, setText] = useState('');\n  return (&lt;&gt;&lt;Input value={text} onChange={setText} /&gt;&lt;HeavyComponent /&gt;&lt;/&gt;);\n}\n\n// Good: State colocated\nconst InputWrapper = () =&gt; {\n  const [text, setText] = useState('');\n  return &lt;Input value={text} onChange={setText} /&gt;;\n}\nconst App = () =&gt; (&lt;&gt;&lt;InputWrapper /&gt;&lt;HeavyComponent /&gt;&lt;/&gt;);",
    "explain": "I always stress that premature optimization is the root of all evil. Don't use `React.memo` everywhere blindly. I use the React DevTools Profiler to identify actual bottlenecks first, then apply these techniques.",
    "tip": "Context API can cause massive performance issues if a large object is passed as the value. Split contexts or use Zustand for high-frequency state updates."
  },
  {
    "id": 78,
    "company": "Deloitte",
    "tech": [
      "React"
    ],
    "diff": "Medium",
    "q": "Explain React Lifecycle and Hooks.",
    "a": "In class components: <code>componentDidMount</code>, <code>componentDidUpdate</code>, <code>componentWillUnmount</code>.<br>In functional components, <code>useEffect</code> handles all three phases.",
    "code": "useEffect(() =&gt; {\n  // 1. componentDidMount (on initial render)\n  // 2. componentDidUpdate (if dependencies change)\n\n  return () =&gt; {\n    // 3. componentWillUnmount (cleanup before next effect or unmount)\n  };\n}, [dependencies]);",
    "explain": "Hooks are superior because they group related logic together. In a class, setting up a timer is in Mount, and clearing it is in Unmount. In a hook, they sit right next to each other in one effect.",
    "tip": "If the dependency array is completely omitted, the effect runs on every single render."
  },
  {
    "id": 79,
    "company": "Deloitte",
    "tech": [
      "React",
      "Coding"
    ],
    "diff": "Hard",
    "q": "Build a Search + Pagination component with API integration.",
    "a": "This requires combining state (query, page, data), debouncing the search input to prevent API spam, and handling loading/error states. When the search query changes, the page should reset to 1.",
    "code": "function SearchPagination() {\n  const [query, setQuery] = useState('');\n  const [page, setPage] = useState(1);\n  const [data, setData] = useState([]);\n\n  // Debounced search logic\n  useEffect(() =&gt; {\n    const timer = setTimeout(() =&gt; {\n      fetch(`/api/search?q=${query}&page=${page}`)\n        .then(res =&gt; res.json())\n        .then(setData);\n    }, 500);\n    return () =&gt; clearTimeout(timer);\n  }, [query, page]);\n\n  // Reset page when typing\n  const handleSearch = (e) =&gt; {\n    setQuery(e.target.value);\n    setPage(1);\n  };\n\n  return (\n    &lt;div&gt;\n      &lt;input onChange={handleSearch} placeholder=\"Search...\" /&gt;\n      &lt;ul&gt;{data.map(item =&gt; &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;)}&lt;/ul&gt;\n      &lt;button onClick={() =&gt; setPage(p =&gt; p - 1)} disabled={page === 1}&gt;Prev&lt;/button&gt;\n      &lt;button onClick={() =&gt; setPage(p =&gt; p + 1)}&gt;Next&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    "explain": "In a real interview, I would highlight edge cases: What if an old API request resolves after a new one (Race conditions)? I would solve this by using an `abortController` to cancel stale fetch requests, or use a library like React Query which handles caching and race conditions automatically.",
    "tip": "React Query (`useQuery`) makes this 10x easier by handling caching, deduping, and loading states out of the box."
  },
  {
    "id": 80,
    "company": "Accenture",
    "tech": [
      "HTML",
      "CSS"
    ],
    "diff": "Easy",
    "q": "What are Semantic HTML tags and why are they important?",
    "a": "Semantic HTML tags are elements that clearly describe their meaning to both the browser and the developer. Instead of using a generic <code>&lt;div&gt;</code> for everything, semantic tags convey the purpose of the content.<br><br>Examples: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;figure&gt;</code>, <code>&lt;time&gt;</code>.<br><br><strong>Why important?</strong><br>1. <strong>Accessibility</strong>: Screen readers use semantic tags to help visually impaired users navigate the page.<br>2. <strong>SEO</strong>: Search engines give more weight to content inside semantic tags like <code>&lt;article&gt;</code> vs content inside a plain <code>&lt;div&gt;</code>.<br>3. <strong>Maintainability</strong>: Code is easier to read and understand for other developers.",
    "code": "&lt;!-- Non-semantic --&gt;\n&lt;div class=\"header\"&gt;\n  &lt;div class=\"nav\"&gt;...&lt;/div&gt;\n&lt;/div&gt;\n\n&lt;!-- Semantic --&gt;\n&lt;header&gt;\n  &lt;nav aria-label=\"Main navigation\"&gt;\n    &lt;ul&gt;\n      &lt;li&gt;&lt;a href=\"/home\"&gt;Home&lt;/a&gt;&lt;/li&gt;\n    &lt;/ul&gt;\n  &lt;/nav&gt;\n&lt;/header&gt;\n\n&lt;main&gt;\n  &lt;article&gt;\n    &lt;h1&gt;Article Title&lt;/h1&gt;\n    &lt;p&gt;Content...&lt;/p&gt;\n  &lt;/article&gt;\n&lt;/main&gt;",
    "explain": "I think of semantic HTML as writing clean, self-documenting markup. A screen reader encountering `<nav>` knows to announce it as a navigation landmark, while a `<div class='nav'>` is invisible to assistive technology.",
    "tip": "Use `<button>` for actions and `<a>` for navigation. Never use `<div onclick>` as a button — it breaks keyboard navigation and screen readers."
  },
  {
    "id": 81,
    "company": "Accenture",
    "tech": [
      "CSS"
    ],
    "diff": "Medium",
    "q": "CSS Grid vs Flexbox — when do you use each?",
    "a": "<strong>Flexbox</strong> is a one-dimensional layout system. It arranges items along either a single row OR a single column. Use it for: navigation bars, centering elements, component-level layouts (cards, button groups).<br><br><strong>CSS Grid</strong> is a two-dimensional layout system. It arranges items in rows AND columns simultaneously. Use it for: overall page layouts, image galleries, dashboards with complex grid structures.<br><br><strong>Key Rule</strong>: Flexbox for components, Grid for page-level layouts.",
    "code": "/* Flexbox: 1D — aligning items in a nav bar */\n.navbar {\n  display: flex;\n  justify-content: space-between; /* horizontal */\n  align-items: center;            /* vertical */\n}\n\n/* Grid: 2D — full page layout */\n.app-layout {\n  display: grid;\n  grid-template-areas:\n    'header  header'\n    'sidebar content'\n    'footer  footer';\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}",
    "explain": "A common misconception is that you should choose one or the other. I use them together all the time. Grid defines the macro layout of the page, and Flexbox handles the micro layout within each grid area (like aligning items inside the header).",
    "tip": "If your design requires knowing the number of rows AND columns, use Grid. If you only care about one axis (items wrapping onto new rows), Flexbox is simpler and sufficient."
  },
  {
    "id": 82,
    "company": "Accenture",
    "tech": [
      "CSS"
    ],
    "diff": "Easy",
    "q": "Centering a div — explain the different approaches.",
    "a": "There are several ways to center a div, and the 'correct' one depends on context.<br><br>1. <strong>Flexbox</strong>: Most common and recommended for centering a child within a parent.<br>2. <strong>Grid</strong>: The most concise, single-property approach.<br>3. <strong>Absolute Positioning</strong>: Classic approach for overlaying elements. Works for popups and modals.<br>4. <strong>Margin Auto</strong>: Only works horizontally for block elements with a known width.",
    "code": "/* Method 1: Flexbox (most common) */\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/* Method 2: Grid (most concise) */\n.parent {\n  display: grid;\n  place-items: center; /* Shorthand for align-items + justify-items */\n}\n\n/* Method 3: Absolute + Transform (for modals/overlays) */\n.modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n/* Method 4: Margin auto (horizontal block centering only) */\n.container {\n  width: 960px;\n  margin: 0 auto;\n}",
    "explain": "My go-to is `display: flex; justify-content: center; align-items: center;` on the parent. I explain the transform trick for modals — `top: 50%; left: 50%` positions the top-left corner in the center, and `translate(-50%, -50%)` shifts the element back by half its own width and height to truly center it.",
    "tip": "The modern `place-items: center` on a Grid container is the shortest way to center something in 2026. It's a shorthand for `align-items` + `justify-items`."
  },
  {
    "id": 83,
    "company": "Accenture",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "Difference between var, let, and const.",
    "a": "<code>var</code> is function-scoped and hoisted (initialized as <code>undefined</code>). It allows redeclaration and can lead to bugs.<br><code>let</code> is block-scoped, hoisted but not initialized (TDZ), allows reassignment but not redeclaration.<br><code>const</code> is block-scoped, must be initialized on declaration, cannot be reassigned. However, the contents of objects/arrays declared with <code>const</code> CAN be mutated.",
    "code": "// var: function-scoped, causes bugs in loops\nfor (var i = 0; i &lt; 3; i++) { setTimeout(() =&gt; console.log(i), 0); }\n// Logs: 3, 3, 3 (bug! 'i' is shared)\n\n// let: block-scoped, fixes the loop bug\nfor (let i = 0; i &lt; 3; i++) { setTimeout(() =&gt; console.log(i), 0); }\n// Logs: 0, 1, 2 (correct — each iteration gets its own 'i')\n\n// const: can't reassign, but can mutate\nconst arr = [1, 2];\narr.push(3); // Valid — mutation is fine\narr = [4];   // TypeError — reassignment is not allowed",
    "explain": "The closure-in-a-loop example is one of the most famous JavaScript interview gotchas, and it perfectly demonstrates why `let` exists. With `var`, all three setTimeout callbacks close over the SAME `i`. With `let`, each loop iteration has its own block-scoped `i`.",
    "tip": "Default to `const`. Only downgrade to `let` when you explicitly need to reassign. Never use `var` in modern JavaScript."
  },
  {
    "id": 84,
    "company": "Accenture",
    "tech": [
      "JavaScript",
      "Tooling"
    ],
    "diff": "Medium",
    "q": "Package management — how do you update project dependencies?",
    "a": "Package management is handled by tools like <strong>npm</strong> (Node Package Manager) or <strong>yarn</strong>. Dependencies are declared in <code>package.json</code>.<br><br><strong>Key commands:</strong><br>1. <code>npm install</code>: Installs all dependencies in <code>package.json</code>.<br>2. <code>npm update &lt;pkg&gt;</code>: Updates a package to the latest version within the allowed semver range.<br>3. <code>npm outdated</code>: Lists packages that are behind their latest version.<br>4. <code>npm install &lt;pkg&gt;@latest</code>: Forces install of the absolute latest version, ignoring semver.<br><br><strong>SemVer (Semantic Versioning)</strong>: <code>MAJOR.MINOR.PATCH</code> (e.g., 3.1.2). A MAJOR version change can include breaking changes.",
    "code": "// package.json versions:\n// Exact: \"react\": \"18.2.0\"  (only this version)\n// Tilde ~: \"react\": \"~18.2.0\" (only patch updates: 18.2.x)\n// Caret ^: \"react\": \"^18.2.0\" (minor + patch: 18.x.x)\n\n// Common commands:\nnpm outdated           // See what's out of date\nnpm update             // Update within semver range\nnpm install react@latest // Force to latest\nnpx npm-check-updates -u // Update ALL packages in package.json to latest",
    "explain": "I always run `npm outdated` before updating to see a diff of current vs wanted vs latest. For major version updates (like React 17 to 18), I check the migration guide first because they can include breaking changes.",
    "tip": "`package-lock.json` is critical — it locks the exact versions of all transitive dependencies. Always commit it to version control so the team has reproducible builds."
  },
  {
    "id": 85,
    "company": "Accenture",
    "tech": [
      "JavaScript"
    ],
    "diff": "Easy",
    "q": "What is JSON and how is it used?",
    "a": "<strong>JSON (JavaScript Object Notation)</strong> is a lightweight, text-based data interchange format. It's human-readable and language-independent (despite the 'JavaScript' name, it's used everywhere).<br><br>It is the standard format for communicating data between a frontend and a backend via REST APIs.<br><br>JavaScript has two built-in methods to work with it:<br>1. <code>JSON.stringify(obj)</code>: Converts a JavaScript object → JSON string. Used when sending data to a server.<br>2. <code>JSON.parse(str)</code>: Converts a JSON string → JavaScript object. Used when receiving data from a server.",
    "code": "const user = { name: 'Prem', age: 25, skills: ['React', 'JS'] };\n\n// Serialize (JS Object → JSON string)\nconst json = JSON.stringify(user);\nconsole.log(json); // '{\"name\":\"Prem\",\"age\":25,\"skills\":[\"React\",\"JS\"]}'\nconsole.log(typeof json); // 'string'\n\n// Deserialize (JSON string → JS Object)\nconst parsed = JSON.parse(json);\nconsole.log(parsed.name); // 'Prem'\nconsole.log(typeof parsed); // 'object'\n\n// Sending via fetch API\nfetch('/api/user', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(user) // Must stringify before sending!\n});",
    "explain": "A common bug is forgetting to call `JSON.parse()` on API responses, leading to errors when trying to access `.name` on a string. Similarly, forgetting `JSON.stringify()` before a POST body results in `[object Object]` being sent to the server.",
    "tip": "JSON does NOT support functions, `undefined`, or `Date` objects. `JSON.stringify()` will either omit them or convert them to strings. Use `structuredClone()` for deep copying objects if you need to preserve these types."
  },
  {
    "id": 86,
    "company": "Accenture",
    "tech": [
      "React"
    ],
    "diff": "Hard",
    "q": "How does React work internally? Explain Fiber and the Diffing Algorithm.",
    "a": "React's job is to keep the UI in sync with the application state. Internally it works in two phases:<br><br><strong>1. Render Phase (Reconciliation)</strong>: When state changes, React creates a new Virtual DOM tree and compares it with the old one. This comparison process is called <strong>Diffing</strong>.<br><br><strong>Diffing Algorithm</strong> rules:<br>- Different element types (e.g., <code>&lt;div&gt;</code> → <code>&lt;span&gt;</code>) → tear down the old tree, build a new one.<br>- Same element type → update only the changed attributes.<br>- Lists require a <code>key</code> prop to identify which items moved.<br><br><strong>2. Commit Phase</strong>: React applies the computed changes to the actual DOM in a single batch.<br><br><strong>React Fiber</strong> is the reimplemented reconciliation engine (React 16+). It broke the render work into small units (fibers), allowing React to pause, prioritize, and abort work. This is what powers features like Concurrent Mode and Suspense.",
    "code": "// Fiber enables interruptible rendering\n// React can now prioritize urgent updates (user input) over slow ones (data fetching)\n\n// Example: Both state updates below are handled via the Fiber scheduler\nimport { useTransition } from 'react';\n\nfunction App() {\n  const [isPending, startTransition] = useTransition();\n\n  const handleSearch = (value) =&gt; {\n    // Urgent: update the input immediately\n    setInputValue(value);\n\n    // Non-urgent: defer the heavy list re-render\n    startTransition(() =&gt; {\n      setSearchQuery(value); // This can be interrupted by user input!\n    });\n  };\n}",
    "explain": "Before Fiber, React's reconciler was synchronous. If a component tree was expensive to render, it would block the main thread entirely, causing dropped frames and a janky UI. Fiber's innovation was making rendering interruptible — it can render a few fibers, yield control back to the browser to handle a click, and then resume.",
    "tip": "React Fiber is the internal engine. React Concurrent Mode and `useTransition` are the user-facing APIs built on top of Fiber. You probably won't use Fiber directly, but understanding it helps you understand WHY concurrent features work."
  },
  {
    "id": 87,
    "company": "Accenture",
    "tech": [
      "React",
      "Performance"
    ],
    "diff": "Medium",
    "q": "Explain React.memo and useCallback. How do they work together?",
    "a": "React re-renders a component when its state or props change. By default, when a parent re-renders, <strong>all its children re-render too</strong>, even if their props didn't change.<br><br><code>React.memo</code> is a Higher-Order Component (HOC) that wraps a component and skips re-rendering if the props are the same (using shallow comparison). It memoizes the rendered output.<br><br>The problem: if a parent passes a function as a prop, that function is recreated on every render, so the new function reference fails the shallow comparison and breaks <code>React.memo</code>.<br><br><code>useCallback</code> memoizes the function reference itself, so the same reference is passed between renders, keeping <code>React.memo</code> happy.",
    "code": "// Without optimization: HeavyList re-renders on every App render\nconst App = () =&gt; {\n  const [count, setCount] = useState(0);\n  \n  // ❌ New function reference created every render\n  const handleItemClick = (id) =&gt; console.log(id);\n  \n  return (\n    &lt;&gt;\n      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;Increment&lt;/button&gt;\n      &lt;HeavyList onItemClick={handleItemClick} /&gt;\n    &lt;/&gt;\n  );\n};\n\n// With optimization: HeavyList only re-renders when handleItemClick changes\nconst App = () =&gt; {\n  const [count, setCount] = useState(0);\n  \n  // ✅ Stable reference — only changes if deps change\n  const handleItemClick = useCallback((id) =&gt; console.log(id), []);\n  \n  return (\n    &lt;&gt;\n      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;Increment&lt;/button&gt;\n      &lt;HeavyList onItemClick={handleItemClick} /&gt; {/* Won't re-render! */}\n    &lt;/&gt;\n  );\n};\n\n// HeavyList must be wrapped with React.memo for any of this to work\nconst HeavyList = React.memo(({ onItemClick }) =&gt; {\n  console.log('HeavyList rendered!');\n  return &lt;ul&gt;...&lt;/ul&gt;;\n});",
    "explain": "React.memo and useCallback are a pair — one without the other is often useless. React.memo prevents re-renders, but only if the props are referentially equal. For primitive props (strings, numbers), React.memo alone is enough. For object or function props, you NEED useCallback/useMemo to maintain stable references.",
    "tip": "Don't blindly wrap everything in memo and useCallback. They have overhead (memory + comparison cost). Profile first with React DevTools Profiler, then optimize only the components that are confirmed bottlenecks."
  },
  {
    "id": 88,
    "company": "Accenture",
    "tech": [
      "React",
      "Performance"
    ],
    "diff": "Hard",
    "q": "Different ways to optimize a React application.",
    "a": "Performance optimization in React targets two areas: reducing the cost of renders, and reducing what is sent to the client.<br><br>1. <strong>Prevent unnecessary re-renders</strong>: `React.memo`, `useCallback`, `useMemo`, state colocation.<br>2. <strong>Reduce bundle size</strong>: Code-splitting with `React.lazy()` and dynamic `import()`. Tree-shaking dead code.<br>3. <strong>Virtualize long lists</strong>: Use `react-window` or `react-virtual` to only render visible items in a list of thousands.<br>4. <strong>Avoid layout thrashing</strong>: Batch DOM reads/writes. Use CSS transitions over JS animations.<br>5. <strong>Use a production build</strong>: Development builds include warnings and checks that significantly slow down React.<br>6. <strong>Web Workers</strong>: Move heavy computations (data processing, sorting) off the main thread.",
    "code": "// 1. Code splitting — only load the dashboard when needed\nconst Dashboard = React.lazy(() =&gt; import('./Dashboard'));\n\n// 2. Memoize expensive computation\nconst sortedList = useMemo(\n  () =&gt; expensiveSortOperation(rawData),\n  [rawData] // Only recompute when rawData changes\n);\n\n// 3. Virtualized list — renders only ~10 items even if list has 10,000\nimport { FixedSizeList } from 'react-window';\nconst VirtualList = () =&gt; (\n  &lt;FixedSizeList height={500} itemCount={10000} itemSize={35}&gt;\n    {({ index, style }) =&gt; &lt;div style={style}&gt;Item {index}&lt;/div&gt;}\n  &lt;/FixedSizeList&gt;\n);",
    "explain": "When asked this in interviews, I structure my answer into three tiers: network (less code sent), rendering (fewer and cheaper renders), and runtime (efficient algorithms). I also mention that profiling FIRST is essential — optimization without measurement is just guessing.",
    "tip": "The single biggest performance win for most apps is code splitting. Splitting your bundle by route alone can reduce initial load time by 60-70% in large applications."
  },
  {
    "id": 89,
    "company": "Accenture",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Medium",
    "q": "Find the second largest element in an array.",
    "a": "We need to find the second largest unique value in the array without using built-in sort, or we can sort and pick. The efficient approach is a single-pass O(n) solution using two variables: `first` and `second`.",
    "code": "function findSecondLargest(arr) {\n  if (arr.length &lt; 2) throw new Error('Array needs at least 2 elements');\n\n  let first = -Infinity;\n  let second = -Infinity;\n\n  for (const num of arr) {\n    if (num &gt; first) {\n      second = first; // Old first becomes second\n      first = num;   // Update first\n    } else if (num &gt; second &amp;&amp; num !== first) {\n      second = num;  // Found new second (that's not a duplicate of first)\n    }\n  }\n\n  if (second === -Infinity) throw new Error('No second largest element');\n  return second;\n}\n\nconsole.log(findSecondLargest([3, 1, 4, 1, 5, 9, 2, 6])); // 6\nconsole.log(findSecondLargest([5, 5, 5])); // Error: No second largest\n\n// Alternative: Sort approach (O(n log n))\nconst secondLargestSort = (arr) =&gt; [...new Set(arr)].sort((a, b) =&gt; b - a)[1];",
    "explain": "The O(n) single-pass approach is the preferred answer in an interview. The key edge case is handling duplicates — if the array is `[5, 5, 3]`, the second largest should be `3`, not `5` again. The `num !== first` condition handles this.",
    "tip": "Always clarify edge cases before coding: 1) What if all elements are equal? 2) What if the array has only one element? 3) Are negative numbers possible? This shows structured thinking, which interviewers love."
  },
  {
    "id": 90,
    "company": "Accenture",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Hard",
    "q": "Implement a debounce function from scratch.",
    "a": "Debouncing ensures a function is only called after a specified delay since its last invocation. Essential for search inputs, resize handlers, and API calls triggered by user typing.",
    "code": "function debounce(func, delay) {\n  let timeoutId = null;\n\n  return function(...args) {\n    // 'this' context is preserved for method usage\n    const context = this;\n\n    // Clear the previous timer every time the function is called\n    clearTimeout(timeoutId);\n\n    // Set a new timer\n    timeoutId = setTimeout(function() {\n      func.apply(context, args);\n      timeoutId = null; // Reset after execution\n    }, delay);\n  };\n}\n\n// Usage:\nconst searchAPI = (query) =&gt; console.log('API call with:', query);\nconst debouncedSearch = debounce(searchAPI, 300);\n\n// Simulate rapid typing\ndebouncedSearch('r');      // Cancelled\ndebouncedSearch('re');     // Cancelled\ndebouncedSearch('rea');    // Cancelled\ndebouncedSearch('react');  // This fires after 300ms\n// Only one API call is made!",
    "explain": "The closure over `timeoutId` is the heart of debounce. The returned function 'remembers' the `timeoutId` variable across multiple calls. Every invocation clears the previous timer and sets a new one, so only the LAST call after the user stops triggers the actual function.",
    "tip": "Debounce delays until AFTER a burst of calls stops. Throttle allows a function to run at most once per interval. Use debounce for search input, throttle for scroll events."
  },
  {
    "id": 91,
    "company": "Accenture",
    "tech": [
      "JavaScript",
      "Coding"
    ],
    "diff": "Medium",
    "q": "Flatten a nested array — implement array flattening.",
    "a": "Flattening means converting a deeply nested array into a single-level array. There are multiple approaches: using the modern built-in `Array.prototype.flat()`, a recursive solution, and a stack-based iterative solution.",
    "code": "// Method 1: Modern built-in (ES2019)\nconst nested = [1, [2, [3, [4]]], 5];\nconsole.log(nested.flat());       // [1, 2, [3, [4]], 5] — 1 level\nconsole.log(nested.flat(2));      // [1, 2, 3, [4], 5] — 2 levels\nconsole.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5] — all levels\n\n// Method 2: Recursive (custom implementation)\nfunction flattenRecursive(arr) {\n  return arr.reduce((acc, item) =&gt; {\n    if (Array.isArray(item)) {\n      return acc.concat(flattenRecursive(item));\n    }\n    return acc.concat(item);\n  }, []);\n}\n\n// Method 3: Stack-based iterative (avoids call stack limit)\nfunction flattenIterative(arr) {\n  const stack = [...arr];\n  const result = [];\n  while (stack.length) {\n    const item = stack.pop();\n    if (Array.isArray(item)) {\n      stack.push(...item); // Push children back onto stack\n    } else {\n      result.unshift(item); // Add to front of result\n    }\n  }\n  return result;\n}",
    "explain": "For an interview, I would first mention `flat(Infinity)`, then implement the recursive approach using `reduce`. The recursive solution might hit the call stack limit for deeply nested arrays (stack overflow), which is why the iterative stack-based approach is the most robust production solution.",
    "tip": "The `Array.prototype.flatMap()` method is a useful combination of `.map()` followed by `.flat(1)`. It's great for transforming data that produces nested arrays (like mapping each sentence to an array of words)."
  }
];
