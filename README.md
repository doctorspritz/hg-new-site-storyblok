# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🧩 Component Library

We have migrated the full Atomic Design System to this project. You can view all components in the interactive demo page.

### Viewing the Components
1.  Start the development server:
    ```sh
    npm run dev
    ```
2.  Open your browser to: **[http://localhost:4321/components-demo](http://localhost:4321/components-demo)**

The demo page features a sidebar navigation to browse:
*   **Specific Widgets**: HeroWPParity, RiskWidget, ReputationWidget
*   **Atoms**: Buttons, Inputs, Typography
*   **Calculators & Forms**: Borrowing Power, Mortgage vs Rent, etc.
*   **Content Sections**: Awards, Banks, Blog, FAQ, etc.
*   **Widgets**: Property Map, Statistics, WP Hero

## ⚛️ Atomic Design System

For a comprehensive list of all Atoms, Molecules, and Organisms available in the system, please refer to:
👉 **[Atomic Design Summary](./ATOMIC_DESIGN.md)**

## 🔄 React Migration

If you are a developer looking to migrate these components to React, we have prepared a detailed guide covering architecture, styling, and component translation patterns:
👉 **[React Migration Guide](./REACT_MIGRATION.md)**

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── ATOMIC_DESIGN.md
├── REACT_MIGRATION.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

The `src/components/` directory follows the Atomic Design methodology.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
