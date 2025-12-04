# Atomic Design System Summary

This document lists all the components migrated to the `hunter-galloway` project, organized by Atomic Design principles. This serves as a reference for the development team during the React migration.

## ⚛️ Atoms
Base building blocks.

*   **Avatar**: `Avatar`
*   **Badge**: `Badge`
*   **Button**: `Button`, `IconButton`, `ButtonWithIcon`
*   **Container**: `Container`
*   **Forms**: `InputField`, `Checkbox`, `RadioButton`, `Select`, `Textarea`, `Label`, `FieldMessage`
*   **Icons**: `Icon`, `CheckmarkIcon`
*   **Images**: `Image`
*   **Layout**: `Divider`
*   **Links**: `Link`
*   **Loaders**: `Spinner`, `Skeleton`, `ProgressBar`
*   **Typography**: `Heading`, `Paragraph`, `Typography`
*   **Utils**: `VisuallyHidden`
*   **Other**: `Counter`, `StatItem`, `Slider`, `SliderCaption`

## 🧬 Molecules
Combinations of atoms forming functional units.

*   **Cards**: `Card`, `ReviewCard`, `StatCard`, `ServiceCard`, `TeamCard`, `TestimonialCard`, `BenefitCard`, `RiskCard`, `PurposeCard`, `PropertyMapCard`, `RentCalculatorCard`
*   **Navigation**: `Breadcrumb`, `DropdownMenu`, `DropdownNavLink`, `MainNavigation`, `MobileNavigation`, `FooterNavigation`, `MenuItem`, `NavItem`, `NavLink`, `Pagination`, `TableOfContents`, `SocialLinks`
*   **Forms**: `CheckboxGroup`, `RadioGroup`, `FilterGroup`, `SearchBox`, `SelectField`, `FormField`, `SortSelect`, `Toggle`
*   **Interactive**: `Accordion`, `Modal`, `TabGroup`, `Tooltip`, `Toast`
*   **Lists**: `BenefitList`, `FeatureItem`, `FeatureItemGroup`
*   **Calculators**: `MortgageCalculatorSlider`, `MortgageVsRentCalculator`, `RentCalculatorSlider`
*   **Other**: `Alert`, `AwardItem`, `BankItem`, `LogoGrid`, `MediaObject`, `Rating`, `Stepper`, `Tag`, `Timeline`

## 🦠 Organisms
Complex sections composed of molecules and atoms.

### Calculators & Forms
*   `AssessmentForm`
*   `BorrowingCalculator`
*   `BorrowingCapacityForm`
*   `Calculator`
*   `MortgageVsRentSection`
*   `RentCalculatorSection`

### Content Sections
*   `Awards` / `AwardsSection`
*   `BanksSection`
*   `BlogSection`
*   `FAQ` / `FAQSection`
*   `LoanPurposeSection`
*   `PropertyMap`
*   `Reviews` / `ReviewsSection`
*   `Statistics`
*   `WhyChoose`

### Hero & Widgets
*   `Hero` / `HeroWidget`
*   `HeroWPParity` (Specific Design)
*   `WPHero`
*   `RiskWidget` (Specific Design)
*   `ReputationWidget` (Specific Design)

### Layout
*   `Header` / `SiteHeader`
*   `Footer` / `SiteFooter`
*   `NavDropdown`

## 🎨 Styles
*   **Tokens**: `src/styles/tokens.css` (Design tokens for colors, spacing, typography)
*   **Base**: `src/styles/base.css` (Reset and base styles)
*   **Global**: `src/styles/global.css` (Main entry point)
