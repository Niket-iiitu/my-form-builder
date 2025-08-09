# My Form Builder

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-setup-yellow)](https://github.com/Niket-iiitu/my-form-builder)

> A dynamic, client-side form builder built with React, TypeScript, MUI and Redux. Create, preview, save and reuse custom forms stored in `localStorage`. Ideal as an assignment/demo for form UIs, validations and dynamic field logic.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Create a form](#create-a-form)
  - [Preview & test](#preview--test)
  - [Save & load](#save--load)
- [Field types & validations](#field-types--validations)
- [Examples](#examples)
- [Development tips](#development-tips)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Visual form builder UI to add / edit / reorder fields
- Multiple field types: Text, TextArea, Number, Select, Radio, Checkbox, Date, Derived fields
- Per-field validation rules (required, min/max length, patterns, email)
- Derived fields: compute a field value from other fields (simple expressions)
- Preview mode to test data entry & validation
- Save forms to `localStorage` and list previously saved forms
- TypeScript types for fields & validations
- MUI (Material UI) for consistent UI components
- Redux for form state management (persisted to `localStorage`)

---

## Tech Stack

- React (v18+)
- TypeScript
- Material UI (MUI)
- Redux / Redux Toolkit
- React Router v6
- localStorage for persistence
- Vite or Create React App (examples below assume `npm` scripts)

---

## Getting Started

### Prerequisites

- Node.js v16+ (recommended) and npm
- Git

### Install

```bash
# clone (or add your remote)
git clone https://github.com/Niket-iiitu/my-form-builder.git
cd my-form-builder

# install dependencies
npm install
