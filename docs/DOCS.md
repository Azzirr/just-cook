# Just Cook Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Code Structure](#code-structure)
4. [Branch Naming](#branch-naming)
5. [Pull Request Process](#pull-request-process)
6. [Task Creation Guidelines](#task-creation-guidelines)
7. [Project Assumptions](#project-assumptions)
8. [Task Reviews and Sprint Discussions](#task-reviews-and-sprint-discussions)

---

## Tech Stack

#### Next.js (https://nextjs.org/)

#### TypeScript (https://www.typescriptlang.org/)

#### Shadcn (https://ui.shadcn.com/)

#### Tailwind (https://tailwindcss.com/)

#### Cypress (https://www.cypress.io/)

---

## Project Overview

**Just Cook** is a PWA mobile-first app designed to provide users with:

- The ability to browse recipes by categories.
- Options to add recipe ingredients to a shopping cart (individually or in bulk).
- The ability to create custom recipes, comment, and engage with other users.
- Ability to use AI to create custom recipes in few seconds.

This project is an educational initiative, focusing on improving mobile development skills and promoting a collaborative coding experience.

---

## Code Structure

```plaintext
src/
├── app/
│   ├── categories/
│   │   ├── page.tsx         <-- Categories page (list of categories)
│   │   ├── layout.tsx       <-- Global elements for /categories
│   │   ├── [category]/      <-- Dynamic category
│   │   │   ├── page.tsx     <-- Recipe list for a category
│   │   │   ├── [recipe]/    <-- Dynamic recipe in a category
│   │   │   │   ├── page.tsx <-- Recipe details
│   ├── cart/
│   │   ├── page.tsx         <-- Shopping cart page
│   ├── user/
│   │   ├── page.tsx         <-- User page (basic info)
│   ├── layout.tsx           <-- Global layout (navigation, footer, etc.)
│   ├── globals.css          <-- Global styles
│   ├── page.tsx             <-- App root
```

## Branch Naming

Branches should follow a consistent naming convention to improve collaboration and clarity. Use the following prefixes:

- **feature/** – For new features, e.g., `feature/add-cart`.
- **bugfix/** – For bug fixes, e.g., `bugfix/fix-add-to-cart`.
- **hotfix/** – For critical production fixes, e.g., `hotfix/fix-deployment-error`.
- **docs/** – For documentation updates, e.g., `docs/update-readme`.
- **refactor/** – For refactoring code without introducing new features, e.g., `refactor/cleanup-components`.

**Example full branch name:** `feature/add-commenting-system`.

---

## Pull Request Process

When creating a pull request, include the following details to maintain transparency and foster teamwork:

1. **Goal**: Describe the purpose of the task.
   - **Example**: "Add the ability to comment on recipes."
2. **What has been made**: Summarize what has been implemented.
   - **Example**:
     - "Created a comment component."
     - "Developed API endpoints to handle comments."
3. **What needs to be done**: Mention any blockers or incomplete tasks.
   - **Example**: "E2E tests are not included yet. Waiting for the test framework setup."
4. **What next**: Suggest future actions if applicable.
   - **Example**: "Implement notifications for new comments."

---

## Task Creation Guidelines

Follow these best practices to create clear and actionable tasks:

### 1. Break tasks into small, manageable pieces:

Each task should have a singular, focused goal.

- **Example**: Instead of "Add cart functionality," break it into:
  - "Create cart UI."
  - "Develop API for cart management."
  - "Integrate cart API with UI."

### 2. Provide descriptions for tasks:

- **Example**:

  ```markdown
  **Task:** Implement user profile editing.
  **Description:**

  - Create the profile editing interface.
  - Add form validation for all fields.
  - Implement an API endpoint to save changes.
  ```

### 3. Include links or suggestions for libraries/tools if possible:

- **Example**: "Consider using Zod for handling form inputs."

### 4. Avoid generic task titles:

- **Bad**: "Add user options."
- **Good**: "Add functionality to change user password."

## Project Assumptions

1. **Mobile-first development**:

   - The primary focus is on creating a seamless mobile experience.
   - Desktop layouts are secondary and will not be prioritized during initial development.

2. **Low-pressure environment**:

   - This project is meant for learning and growth. Work at your own pace.

3. **ShadCN/UI components**:
   - Utilize [ShadCN](https://ui.shadcn.dev/) for consistent styling and reusable components.

---

## Task Reviews and "Sprint" Discussions

During task reviews or "sprint" meetings:

1. Showcase completed work and explain key decisions.
2. Plan next steps or brainstorm solutions for unresolved blockers.

These sessions aim to foster a collaborative learning environment and ensure everyone stays aligned with the project goals.
