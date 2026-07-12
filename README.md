# Interview Prep Hub — 220+ Full Stack Questions

Welcome to the **Interview Prep Hub**, a comprehensive, interactive interview preparation kit designed for full-stack developers. This project contains 220+ hand-crafted questions across four difficulty levels/categories, complete with detailed answers, code examples, plain-English explanations, and tips on how to present your answers to an interviewer.

## 🚀 Preview

This application provides a seamless, accessible, and responsive user experience designed to help you prepare effectively:
- **4 Modules**: Basic, Intermediate, Backend, and Company-Specific.
- **15+ Tech Topics**: Covering React, JavaScript, CSS, Node.js, Linux, MySQL, MongoDB, TypeScript, Docker, NestJS, and more.
- **Company Tracking**: Special `★ Important` badges automatically flag questions frequently asked across different companies like Google, Cognizant, JioHotstar, and Deloitte.
- **Progress Tracking**: Your progress is automatically saved in your browser's local storage so you can easily pick up where you left off.
- **Filter & Search**: Quickly find questions by difficulty or topic, or use the search bar to locate specific technologies.
- **Accessible Design**: Fully keyboard navigable, screen-reader friendly, and supports a beautiful dark and light theme toggle.

## 📂 Folder Structure

The project is structured into three main categories (levels) along with shared assets and components:

```text
interview-question/
├── index.html            # Main landing page for the application
├── favicon.ico           # Application icon
├── LICENSE               # Project license
├── README.md             # Project documentation (this file)
├── basic-50/             # Level 1: Beginner Edition
│   ├── index.html        # Basic questions interface
│   ├── js/               # Question data and basic-specific logic
│   └── css/              # Basic-specific styles
├── intermediate-50/      # Level 2: Intermediate Edition
│   ├── index.html        # Intermediate questions interface
│   ├── js/               # Question data and intermediate-specific logic
│   └── css/              # Intermediate-specific styles
├── backend-50/           # Level 3: Backend Edition
│   ├── index.html        # Backend questions interface
│   ├── js/               # Question data and backend-specific logic
│   └── css/              # Backend-specific styles
├── company-questions/    # Level 4: Company-Specific Edition
│   ├── index.html        # Company questions interface (Yellow Theme)
│   ├── js/               # Question data (Cognizant, JioHotstar, etc.)
│   └── css/              # Custom theme overrides
├── assets/               # Shared assets for the entire application
│   ├── css/              # Global styles (core-app.css, landing.css)
│   └── js/               # Global logic (core-app.js, theme.js, landing.js)
└── components/           # Reusable web components
    └── iqhub-components.js # Custom components like headers and footers
```

## 🛠️ What is Used

This project is built using standard, foundational web technologies without heavy frameworks to ensure blazing fast performance and simple maintainability:
- **HTML5**: Semantic and accessible markup.
- **Vanilla JavaScript (ES5/ES6)**: Core logic, dynamic rendering, and progress tracking using `localStorage`. No external dependencies like React or Vue are required to run this app.
- **Vanilla CSS (CSS3)**: Custom responsive design featuring CSS variables, modern layout techniques (Flexbox/Grid), and smooth transitions. No TailwindCSS or Bootstrap.
- **Custom Web Components**: Utilized for shared elements like the header, footer, and filters across different pages.
- **Google Fonts**: Inter, DM Mono, and Syne for a modern typography experience.

## 🏃 How to Start

Since this is a static web application using vanilla HTML, CSS, and JS, getting started is incredibly simple:

1. **Clone or Download** the repository to your local machine.
2. **Open `index.html`** directly in any modern web browser.
   - Alternatively, for the best experience (to ensure modules and web components load perfectly without CORS issues), run a local static file server. For example:
     - Using Node.js (via `npx`):
       ```bash
       npx serve .
       ```
     - Using Python 3:
       ```bash
       python3 -m http.server
       ```
3. **Navigate** to the provided local URL (usually `http://localhost:3000` or `http://localhost:8000`).

## 💡 How to Use

1. **Pick Your Level**: Start at the landing page and choose between Basic 50, Intermediate 50, or Backend 50 depending on your preparation needs.
2. **Read the Answers**: Click on any question card (or the toggle arrow) to reveal the answer, code snippets, explanations, and pro tips.
3. **Mark as Done**: Click the checkmark circle button next to a question to mark it as complete. Watch your progress bar grow!
4. **Search and Filter**: Use the top filter buttons to sort by category or difficulty, and use the search bar to find exactly what you're looking for.
