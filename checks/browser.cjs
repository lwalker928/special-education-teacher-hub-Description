/* Developer verification. Requires Playwright; axe-core is optional via AXE_CORE_PATH. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.HUB_TEST_URL || 'http://127.0.0.1:8000/';
const executablePath = process.env.CHROMIUM_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

(async () => {
  const browser = await chromium.launch({headless:true, executablePath, args:['--no-sandbox']});
  try {
    const page = await browser.newPage();
    const errors = [];
    const requests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => requests.push(request.url()));
    await page.goto(base);
    assert.equal(requests.length, 1, 'The application must load without external assets');
    assert.equal(await page.locator('#eligibility-cards article').count(), 13);
    assert.equal(await page.locator('#sld-cards article').count(), 9);
    assert.equal(await page.locator('#accommodation-action-cards article').count(), 12);
    assert.equal(await page.locator('#challenge-cards article').count(), 10);
    assert.equal(await page.locator('#printable-cards article').count(), 16);
    assert.equal(await page.locator('#strategy-cards article').count(), 6);
    assert.equal(await page.locator('#accommodation-cards article').count(), 6);
    assert.equal(await page.locator('#faq-list details').count(), 8);

    await page.locator('#eligibility-search').fill('cognitive');
    assert.ok(await page.locator('#eligibility-cards article:visible').count() > 0);
    await page.locator('#eligibility-search').fill('zzzzzzzz');
    assert.equal(await page.locator('#eligibility-cards article:visible').count(), 0);
    assert.ok(await page.locator('#eligibility-empty').isVisible());
    await page.locator('#eligibility-search').fill('');
    await page.locator('#sld-subject').selectOption('math');
    assert.equal(await page.locator('#sld-cards article:visible').count(), 3);
    await page.locator('#sld-subject').selectOption('all');

    const learningLinks = await page.locator('#eligibility-cards a, #sld-cards a').evaluateAll(links => links.map(link=>link.hash));
    const accommodationLinks = await page.locator('#accommodation-action-cards a').evaluateAll(links => links.map(link=>link.hash));
    for (const hash of [...learningLinks, ...accommodationLinks]) {
      await page.goto(base + hash);
      assert.ok(await page.locator('#guide-title').isVisible(), hash);
      assert.ok(!await page.locator('.hero').isVisible(), hash);
      assert.equal(await page.locator('nav [aria-current]').count(), 1);
      const allLinks = await page.locator('#guide-panel a[href^="#"]').evaluateAll(links=>links.map(link=>link.hash));
      for (const href of allLinks) {
        if (href.startsWith('#guide-')) assert.ok(learningLinks.includes(href), href);
        else assert.equal(await page.locator(href).count(), 1, href);
      }
      if (hash.startsWith('#guide-') && await page.locator('.official-rule').count()) {
        await page.locator('.guide-details').first().locator(':scope > summary').click();
        assert.ok(await page.locator('.guide-details').first().getAttribute('open') !== null);
        await page.locator('.official-rule > summary').click();
        assert.match(await page.locator('.rule-text').innerText(), /R 340\./);
        assert.ok(await page.locator('.rule-text').isVisible());
      }
      if (hash.startsWith('#accommodation-')) {
        await page.locator('#page-subject').selectOption('Science');
        assert.equal(await page.locator('#guide-panel [data-example-subject]:visible').count(), 1);
      }
      await page.locator('[data-print-guide]').click();
      assert.ok(await page.locator('#dialog-title').isVisible());
      for (let step=0; step<10; step++) {
        await page.keyboard.press('Tab');
        assert.ok(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)), 'Reference focus stays in modal');
      }
      await page.keyboard.press('Escape');
      assert.ok(!await page.locator('dialog').isVisible());
      assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-print-guide')), true);
      if (process.env.AXE_CORE_PATH) {
        await page.addScriptTag({path:process.env.AXE_CORE_PATH});
        const results = await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
        assert.deepEqual(results.violations.map(item=>({id:item.id,nodes:item.nodes.map(node=>node.target)})), [], hash);
      }
    }
    console.log('PASS: all 34 detailed pages, deep links, related links, full state-rule sections, references, focus restoration.' + (process.env.AXE_CORE_PATH ? ' All 34 pages also passed automated WCAG checks.' : ' Automated WCAG checks skipped: AXE_CORE_PATH unset.'));

    await page.goto(base + '#guide-autism');
    await page.locator('#guide-panel a[href="#eligibility"]').click();
    assert.ok(await page.locator('#eligibility').isVisible());
    assert.ok(await page.locator('#eligibility').evaluate(el=>Math.abs(el.getBoundingClientRect().top) < 200));
    assert.equal(await page.evaluate(()=>document.activeElement.id), 'eligibility-heading');
    await page.goBack();
    assert.ok(await page.locator('#guide-title').isVisible());
    await page.goto(base + '#guide-does-not-exist');
    assert.match(await page.locator('#guide-title').innerText(), /not found/i);
    await page.goto(base);

    const challenges = await page.locator('#challenge-choice option').evaluateAll(options=>options.slice(1).map(option=>option.value));
    for (const choice of challenges) {
      await page.locator('#challenge-choice').selectOption(choice);
      assert.equal(await page.locator('#challenge-cards article:visible').count(), 1);
      assert.ok(await page.locator('#challenge-cards article:visible details').getAttribute('open') !== null);
      for (const subject of ['ELA','Math','Science','Social Studies']) {
        await page.locator('#challenge-subject').selectOption(subject);
        assert.equal(await page.locator('#challenge-cards article:visible [data-example-subject]:visible').count(), 1);
        assert.ok((await page.locator('#challenge-cards article:visible [data-example-subject]:visible').innerText()).startsWith(subject+':'));
      }
      await page.locator('#challenge-cards article:visible [data-template]').first().click();
      assert.ok(await page.locator('#dialog-title').isVisible());
      await page.keyboard.press('Escape');
    }
    await page.locator('#challenge-choice').selectOption('all');
    await page.locator('#challenge-search').fill('zzzzzzzz');
    assert.ok(await page.locator('#challenge-empty').isVisible());
    await page.locator('#challenge-search').fill('');
    await page.locator('#accommodation-subject').selectOption('Math');
    assert.equal(await page.locator('.subject-preview:visible').count(), 12);
    await page.locator('#accommodation-search').fill('zzzzzzzz');
    assert.ok(await page.locator('#accommodation-empty').isVisible());
    await page.locator('#accommodation-search').fill('');

    if (process.env.AXE_CORE_PATH) {
      await page.addScriptTag({path:process.env.AXE_CORE_PATH});
      const results = await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
      assert.deepEqual(results.violations.map(item=>item.id), [], 'Expanded homepage');
    }
    for (let index=0; index<16; index++) {
      await page.locator('#printable-cards [data-template]').nth(index).click();
      assert.ok(await page.locator('#dialog-title').isVisible());
      if (index>=6) {
        const field = page.locator('dialog [contenteditable]').first();
        await field.fill('General lesson example');
        assert.equal(await field.innerText(), 'General lesson example');
      }
      await page.emulateMedia({media:'print'});
      assert.ok(await page.locator('#print-content').isVisible());
      assert.ok(!await page.locator('.site-header').isVisible());
      await page.emulateMedia({media:'screen'});
      if (process.env.AXE_CORE_PATH) {
        const results = await page.evaluate(()=>axe.run(document.querySelector('dialog'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
        assert.deepEqual(results.violations.map(item=>item.id), [], `Printable ${index}`);
      }
      await page.keyboard.press('Escape');
    }
    await page.locator('#printable-cards [data-template]').nth(6).click();
    assert.ok(!(await page.locator('dialog [contenteditable]').first().innerText()).includes('General lesson example'), 'Edits are not stored');
    await page.evaluate(()=>{ window.__printCalled=0;window.print=()=>window.__printCalled++; });
    await page.locator('#print-resource').click();
    assert.equal(await page.evaluate(()=>window.__printCalled), 1);
    await page.keyboard.press('Escape');
    await page.locator('#printable-subject').selectOption('Math');
    assert.ok(await page.locator('#printable-cards article:visible').count()<16);
    await page.locator('#printable-search').fill('essay');
    assert.equal(await page.locator('#printable-cards article:visible').count(), 0);
    await page.locator('#printable-subject').selectOption('all');
    assert.equal(await page.locator('#printable-cards article:visible').count(), 1);
    await page.locator('#resource-search').fill('zzzzzzzz');
    assert.equal(await page.locator('.searchable:visible').count(), 0);
    await page.locator('#clear-search').click();
    assert.equal(await page.locator('#printable-cards article:visible').count(), 16);
    await page.locator('#resource-subject').selectOption('Math');
    assert.ok(await page.locator('#printable-cards article:visible').count()<16);
    await page.locator('#clear-search').click();
    console.log('PASS: all 10 challenge choices × 4 subjects, all 16 printables, editable fields, ephemeral edits, print command, local/global search and filters, empty states, reset.' + (process.env.AXE_CORE_PATH ? ' Printable dialogs also passed automated WCAG checks.' : ''));

    for (const width of [320,390,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      await page.goto(base);
      assert.ok(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth), `Home overflow at ${width}`);
      if (width<=900) {
        await page.locator('.menu-toggle').click();
        assert.ok(await page.locator('nav').isVisible());
        await page.locator('nav a[href="#strategy-finder"]').click();
        assert.ok(!await page.locator('nav').isVisible());
      }
      for (const route of ['#guide-multiple-disabilities','#guide-dysgraphia','#accommodation-communication-access']) {
        await page.goto(base+route);
        assert.ok(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth), `${route} overflow at ${width}`);
      }
      await page.locator('#guide-panel [data-template]').first().click();
      assert.ok(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth), `Dialog overflow at ${width}`);
      await page.keyboard.press('Escape');
    }
    await page.emulateMedia({colorScheme:'dark'});
    assert.equal(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)');
    assert.deepEqual(errors, []);
    assert.equal(await page.evaluate(()=>localStorage.length), 0);
    assert.equal(await page.evaluate(()=>sessionStorage.length), 0);
    console.log('PASS: desktop/mobile/guide/dialog layouts at five widths, mobile navigation, light appearance in dark mode, no JavaScript errors or stored user data.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exit(1);});
