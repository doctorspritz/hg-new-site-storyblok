# React Migration Guide: Hunter Galloway Design System

This guide provides context and technical details for developers migrating the Hunter Galloway component library from Astro to React.

## 🏗️ Architecture Overview

The system follows **Atomic Design** principles:

*   **Atoms**: Basic building blocks (Buttons, Inputs, Typography). These are stateless and purely presentational.
*   **Molecules**: Simple combinations of atoms (Cards, Form Groups, Search Box).
*   **Organisms**: Complex, distinct sections of the UI (Calculators, Hero Sections, Headers). These often contain business logic or layout state.

### Directory Structure
```
src/components/
├── atoms/       # Base components
├── molecules/   # Composite components
└── organisms/   # Complex sections
```

## 🎨 Styling System

The design system relies heavily on **CSS Variables (Design Tokens)** defined in `src/styles/tokens.css`.

### Key Token Categories
*   **Colors**: `--color-primary`, `--color-background-body`, `--color-text-heading`
*   **Spacing**: `--space-sm`, `--space-md`, `--space-xl`
*   **Typography**: `--font-size-lg`, `--font-weight-bold`
*   **Layout**: `--size-container-wide`, `--radius-md`

### Migration Strategy for Styles
1.  **Global Styles**: Ensure `tokens.css` and `base.css` are imported at the root of your React application (`App.tsx` or `index.css`).
2.  **Component Styles**:
    *   Most components use **Scoped CSS** (Astro `<style>`).
    *   **Recommendation**: Convert these to **CSS Modules** (`Button.module.css`) or **Styled Components** to maintain scoping.
    *   *Alternative*: If using Tailwind, map the CSS variables to your `tailwind.config.js` theme to use utility classes (e.g., `bg-primary`, `p-xl`).

## 🔄 Component Translation Patterns

### 1. Props Interface
Astro uses TypeScript interfaces for props. These map directly to React props.

**Astro:**
```typescript
interface Props {
  title: string;
  isActive?: boolean;
}
const { title, isActive = false } = Astro.props;
```

**React:**
```typescript
interface ButtonProps {
  title: string;
  isActive?: boolean;
}
export const Button: React.FC<ButtonProps> = ({ title, isActive = false }) => { ... }
```

### 2. Slots vs. Children
Astro `<slot />` maps to React `children`.

**Astro:**
```astro
<div class="card">
  <slot />
</div>
```

**React:**
```tsx
export const Card = ({ children }) => (
  <div className="card">{children}</div>
);
```

### 3. Event Handling
Astro often uses vanilla JS in `<script>` tags for interactivity. In React, this moves to **Event Handlers** and **Hooks**.

**Astro (Vanilla JS):**
```html
<button id="btn">Click me</button>
<script>
  document.getElementById('btn').addEventListener('click', () => { ... });
</script>
```

**React:**
```tsx
<button onClick={() => { ... }}>Click me</button>
```

## ⚠️ Complex Components (Organisms)

Some organisms contain significant logic that needs to be rewritten using React State.

### Calculators (`BorrowingCalculator`, `RentCalculator`)
*   **Current State**: Logic is in `<script>` tags, manipulating DOM elements directly.
*   **Migration**:
    *   Use `useState` for form inputs (income, deposit, etc.).
    *   Use `useEffect` or event handlers to trigger calculations.
    *   Remove direct DOM manipulation (`document.querySelector`).

### Interactive Widgets (`Accordion`, `Tabs`)
*   **Current State**: Uses vanilla JS classes to toggle visibility.
*   **Migration**:
    *   Lift state up or use local state (`isOpen`, `activeTab`) to conditionally render content.

## 📝 Checklist for Developers

1.  [ ] **Setup**: Ensure global CSS tokens are available.
2.  [ ] **Atoms**: Migrate simple components first (Button, Icon, Typography).
3.  [ ] **Molecules**: Assemble atoms into molecules (Cards, Inputs).
4.  [ ] **Organisms**:
    *   Rewrite logic for Calculators using React Hooks.
    *   Ensure responsive layouts (Grid/Flex) are preserved.
5.  [ ] **Assets**: Verify image paths (React imports images differently than Astro's `public/` folder access).

## 💡 Tips
*   **Class Names**: Astro supports `class:list`. In React, use the `clsx` or `classnames` utility library for conditional classes.
*   **HTML Attributes**: Remember to change `class` to `className`, `for` to `htmlFor`, etc.
