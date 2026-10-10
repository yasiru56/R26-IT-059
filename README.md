# Research Project Website: R26-IT-059

Website for the SLIIT research project **"Explainable Multi-Modal AI System for Early Academic
Burnout and Dropout Prediction"** (BurnoutGuard).

**Live site:** https://r26-it-059.vercel.app

Built with **plain HTML and CSS only**: no JavaScript, no frameworks, no build step.

## Files

```
index.html          All page content (one section per comment block)
css/styles.css      All styling (colours are set once at the top)
assets/
  docs/             Documents (PDF)
  presentations/    Presentation slides (PDF)
  images/           Logo, architecture diagram, team photos, screenshots, logos, icons
```

## How to edit

Open `index.html`, find the section by its comment (for example `<!-- DOWNLOADS -->`), change the
text, save, and refresh the browser.

- **Add a document:** copy the PDF into `assets/docs/`, then in the Downloads section replace a
  "Coming soon" block with a copy of an existing file block and change the title and file path.
- **Milestone status:** each timeline item has a class `completed`, `upcoming` or `planned`.
  Change the class and the status text by hand, and update the "4 of 11" progress line.
- **Panel feedback:** each assessment is a `<details>` block. Add `open` to show it expanded.
- **Colours:** change the variables at the top of `css/styles.css`.

To preview locally, double-click `index.html`.

## Publishing

- **Vercel:** every push to `main` updates https://r26-it-059.vercel.app automatically.
- **Course web:** upload `index.html`, `css/` and `assets/` (total size must stay under 20 MB).

> Everything in this repository is public.
