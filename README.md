# Research Project Website

Showcase website for our SLIIT research project (group **R26-IT-059**, BurnoutGuard). It covers the literature survey,
research gap, objectives, methodology, milestones, documents, team and contact details.

It's a plain static site (HTML, CSS and JavaScript). There's nothing to install or build, and it
is hosted for free on Vercel.

**Live site:** https://r26-it-059.vercel.app

## Folder structure

```
research-website/
├── index.html                 Page layout (sections and navigation)
├── css/styles.css             Design: colours, fonts, layout
├── js/data.js                 ★ ALL website content: edit this file
├── js/main.js                 Renders the content and handles menus, theme and animations
├── assets/
│   ├── images/                Logo, architecture diagram, placeholder images
│   │   ├── screenshots/       System screenshots
│   │   ├── team/              Member photos
│   │   └── supervisors/       Supervisor photos
│   ├── docs/                  PDFs: reports, research paper, forms
│   └── presentations/         Slides (.pptx) and their PDF exports
└── .nojekyll                  Tells GitHub Pages to serve files as-is
```

## Editing content

All text, lists and file links are in **`js/data.js`**. Open it, replace the `TBD` placeholders,
save, and refresh the browser.

- **Remove an item:** delete it from its list. An empty list (e.g. `screenshots: []`) hides that section.
- **Milestone status:** set `date: "2025-08-15"`. The status (Completed / Upcoming / Planned) is
  worked out from the date automatically. To set it yourself, add `status: "completed"`.
- **Date ranges:** for a milestone that runs over several days, set `date` to the last day and add
  `dateText: "19 – 21 Oct 2026"`. The text is shown instead of the date.
- **Social links:** leave `email`, `linkedin` or `github` as `""` to hide that icon.

## Adding documents and slides

1. Copy the file into `assets/docs/` (documents) or `assets/presentations/` (slides).
   Use simple file names, e.g. `IT22123456_Final_Report.pdf`.
2. In `js/data.js`, set the item's `file` to the path, for example:
   ```js
   { title: "Research Paper", subtitle: "Group publication", file: "assets/docs/Research_Paper.pdf" }
   ```
3. For slides, also export a PDF copy and set `viewFile`, so visitors can view them in the browser.
   Browsers can't preview .pptx files; they can only download them.
   ```js
   { title: "Progress Presentation I", subtitle: "Slides",
     file: "assets/presentations/PP1.pptx", viewFile: "assets/presentations/PP1.pdf" }
   ```

Items with an empty `file` show **Coming soon** instead of the View and Download buttons.

> GitHub rejects files over **100 MB**, so compress large PDFs before adding them.
> Everything in this repository is **public**: the repository and the live site can be seen by anyone.

## Adding photos and screenshots

- Team photos go in `assets/images/team/` (square images look best, e.g. 400×400).
  Set `photo: "assets/images/team/member1.jpg"`. Without a photo, the person's initials are shown.
- Screenshots go in `assets/images/screenshots/`. List them in `screenshots` in `data.js`.
- To show the real architecture diagram, put it in `assets/images/` and update `methodology.diagram`.
- To use your own logo, replace `assets/images/logo.svg` (it's also the browser tab icon).

## Previewing locally

Double-click `index.html` to open it in a browser, or run a local server from this folder:

```
python -m http.server 8080
```

Then open http://localhost:8080.

## Publishing (Vercel)

The site is deployed on Vercel as the project `r26-it-059`, connected to this GitHub repository.

- **Every push to `main` updates https://r26-it-059.vercel.app automatically**, usually within a minute.
- Pushes to other branches get their own preview link, so you can check changes before merging.
- No build step is needed: Vercel serves the files as they are.

To update the site: edit the files, then

```
git add .
git commit -m "Describe your change"
git push
```

## Changing the colours

The colour theme is set at the top of `css/styles.css` (`--primary`, `--secondary`, gradients),
with a matching dark-mode block below it.
