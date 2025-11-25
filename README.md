# ABBAS SLP Portfolio - Next.js

Terminal-style portfolio website built with Next.js 14, React, and shadcn/ui Terminal component.

## Features

- 🎨 Built with [shadcn/ui Terminal component](https://www.shadcn.io/components/visualization/terminal)
- ⚡ Next.js 14 with App Router
- 🎭 Tailwind CSS for styling
- 📱 Fully responsive design
- ⌨️ Interactive terminal commands

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Commands

- `--help` or `help` - Show available commands
- `--resume` or `resume` - Show resume link
- `--contact` or `contact` - Display contact information
- `--skills` or `skills` - Display skills in detail
- `clear` - Clear all commands
- `ls` - Show projects list or project details
- `cd [project name]` - Navigate to project directory

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── components/
│   │   └── Terminal.tsx    # Main terminal component
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static files
│   ├── favicon-*.png
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   └── robots.txt
└── package.json
```

