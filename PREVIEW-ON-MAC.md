# Preview your website on a Mac

This website is private project work. Nothing has been published.

1. Download this project folder to your Mac. If you download a ZIP file, double-click it to unzip it first.
2. Open the folder in Finder.
3. Double-click **index.html**. It should open in your default browser. You can also right-click it, choose **Open With**, and select Safari or Google Chrome.
4. Click the navigation links to explore the toolkit, strategies, printables, and FAQs. Use the search box to find a topic.
   The expanded site also has an **Eligibility center**, **Learning disabilities** section, and **Strategy finder**. Open a resource card to view a full guide, expand its sections, and print a teacher reference sheet. Use the subject and topic filters to narrow the resources.
5. Select **Preview & print** on a printable. Choose **Print / Save as PDF**. On a Mac, choose **Save as PDF** from the PDF menu in the print window. Your browser may also offer “Save as PDF” as a destination.

**index.html** now contains the complete website, including its design and interactive tools. You can download and open that file by itself. No account, paid software, internet connection, or coding tool is needed to preview it. Resize the browser window to see the mobile layout.

If you have an older downloaded copy, replace it with the latest **index.html**, then reopen it in Safari or Chrome. A text editor or a document preview may display the code instead of the website.

## Making simple content updates

- **index.html** is the complete, ready-to-open website.
- For developers, **assets/app.js** and **assets/styles.css** are the editable sources for interactive content and design. After changing them, run `python3 build_website.py` to update the embedded copies in **index.html**. This step is not needed just to preview the website.
- **assets/hub-data.js** contains the expanded eligibility, SLD, strategy, accommodation, and printable content. **assets/legal-data.js** contains reviewed official rule excerpts and Michigan summaries. **assets/hub.js** handles the added guides, filters, and related links. Rebuild **index.html** after changing either file.

Make a copy of the folder before editing. If you prefer, ask for a specific change in plain language instead of editing code yourself.

Use only general guidance and blank templates in the website. Keep completed student-specific resources in school-approved secure systems.

Some blank templates can be edited inside their preview before printing. Enter only general lesson content, never student names, diagnoses, or confidential information. Changes are not saved and disappear when that preview is reopened. The website has no submission form, analytics, or database. Official-source links need internet access, but the hub and its tools work offline.

Legal pages identify their source review date and the federal CFR edition used. See **LEGAL-SOURCE-REVIEW.md** for verified sources and the limitation on checking later federal amendments. Do not use the website to determine eligibility.

## Optional local server for developers

Opening index.html directly is enough for this version. If Python 3 is installed, a developer can run this command from the project folder:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The developer can then check the website in a local browser. Press Control+C in Terminal to stop the server. This serves the project locally; it does not publish it.
