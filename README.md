# special-education-teacher-hub-Description
Resources and tools for general education teachers

## The Inclusive Classroom

A self-contained, middle school resource hub with the original blue and teal branding, toolkit, classroom strategies, FAQs, search, and printing features preserved.

The expanded site includes 13 IDEA eligibility learning guides with Michigan terminology and official rule text, nine specific learning disability topic guides, a ten-challenge strategy finder, 12 detailed accommodation guides, and 16 blank printable templates. All guides are distinct hash routes within the downloadable HTML file.

Download **index.html** and open it in Safari or Chrome. No installation is needed. See [Mac preview instructions](PREVIEW-ON-MAC.md). Nothing has been published.

Legal sources and edition limitations are documented in [LEGAL-SOURCE-REVIEW.md](LEGAL-SOURCE-REVIEW.md). This hub cannot diagnose students or decide eligibility, and it does not collect student information.

## Developer workflow

Edit the source files under `assets/`, then run:

```sh
python3 build_website.py
```

This updates the styles and scripts embedded in **index.html**. The build is repeatable and needs only Python’s standard library. Do not manually edit the generated embedded blocks.

For internal browser validation, serve the project locally with Python’s HTTP server. The checks in `checks/browser.cjs` require Playwright and Chromium in the developer environment; these are test tools, not website dependencies. Optionally set `AXE_CORE_PATH` to a locally installed `axe-core/axe.min.js` to run automated accessibility checks. `HUB_TEST_URL` can point to a directory containing only a copy of index.html to verify the standalone download. No npm dependencies or browser downloads are needed by teachers viewing the site.

Validation completed: all 34 detailed pages and related navigation; ten challenges across four subject examples; all 16 printable previews, editable fields, and print layouts; global and section searches, filters, and empty states; five responsive widths (320, 390, 768, 1024, and 1440 pixels); focus restoration; automated WCAG checks on all guides and printable dialogs; and actual teacher-reference and blank-template PDF exports. Automated accessibility checks complement manual keyboard and layout checks.
