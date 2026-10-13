const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const listHTML = items => `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`;
const sourceHTML = keys => `<ul class="source-list">${keys.map(key => { const [label, href] = hubSources[key]; return `<li><a href="${href}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span class="sr-only">(opens a new tab)</span></a></li>`; }).join('')}</ul>`;
const impactLabels = ['Reading', 'Writing', 'Math', 'Attention', 'Behavior & regulation', 'Communication', 'Classroom participation'];
const guidePanel = document.querySelector('#guide-panel');
const originalTitle = document.title;
const guideLink = (id, title) => `<a class="related-link" href="#guide-${id}">${escapeHTML(title)} →</a>`;
const guideText = guide => JSON.stringify(guide).toLowerCase();
const guideDetails = (title, content, open = false) => `<details class="guide-details"${open ? ' open' : ''}><summary>${escapeHTML(title)}</summary><div>${content}</div></details>`;
function learningCard(guide, isSLD = false) {
  const item = document.createElement('article');
  item.className = 'resource-card searchable learning-card';
  item.dataset.search = guideText(guide);
  item.dataset.localSearch = guideText(guide);
  item.dataset.area = isSLD ? guide.source : 'all';
  item.dataset.subjects = (isSLD && guide.source === 'math' ? ['Math','Science','Social Studies'] : isSLD && guide.source === 'writing' ? ['ELA','Science','Social Studies'] : ['ELA','Math','Science','Social Studies']).join('|');
  item.innerHTML = `<span class="tag">${escapeHTML(isSLD ? guide.kind : guide.mi)}</span><h3>${escapeHTML(guide.title)}</h3><p>${escapeHTML(guide.plain)}</p><a class="text-link" href="#guide-${guide.id}">Explore ${escapeHTML(guide.title)} <span aria-hidden="true">→</span></a>`;
  return item;
}
eligibilityGuides.forEach(guide => {
  document.querySelector('#eligibility-cards').append(learningCard(guide));
  const row = document.createElement('tr');
  row.innerHTML = `<th scope="row">${escapeHTML(guide.title)}</th><td>${escapeHTML(guide.mi)}</td><td>${escapeHTML(guide.rule)}</td>`;
  document.querySelector('#comparison-rows').append(row);
});
sldGuides.forEach(guide => document.querySelector('#sld-cards').append(learningCard(guide, true)));

function filterLearning(kind) {
  const input = document.querySelector(`#${kind}-search`);
  const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const area = kind === 'sld' ? document.querySelector('#sld-subject').value : 'all';
  document.querySelectorAll(`#${kind}-cards .learning-card`).forEach(card => {
    card.dataset.localHidden = String(!words.every(word => card.dataset.localSearch.includes(word)) || (area !== 'all' && card.dataset.area !== area));
  });
  search();
}
document.querySelector('#eligibility-search').addEventListener('input', () => filterLearning('eligibility'));
document.querySelector('#sld-search').addEventListener('input', () => filterLearning('sld'));
document.querySelector('#sld-subject').addEventListener('change', () => filterLearning('sld'));

function printableLinks(ids) {
  return `<div class="related-links">${ids.map(id => {
    const index = printables.findIndex(item => item.id === id);
    return index >= 0 ? `<button class="related-link" data-template="${index}">${escapeHTML(printables[index].title)} · Preview & print</button>` : '<a class="related-link" href="#printables">Browse printable tools →</a>';
  }).join('')}</div>`;
}
function eligibilityHTML(guide) {
  const impacts = `<div class="impact-grid">${guide.impacts.map((impact, index) => `<div><h3>${impactLabels[index]}</h3><p>${escapeHTML(impact)}</p></div>`).join('')}</div>`;
  return `<p class="guide-intro">${escapeHTML(guide.plain)}</p>` +
    guideDetails('Federal definition & Michigan eligibility terminology', `<h3>Federal IDEA: ${guide.paragraph}</h3><blockquote>${escapeHTML(guide.federal)}</blockquote>${guide.federalNote ? `<p>${escapeHTML(guide.federalNote)}</p>` : ''}<h3>Michigan: ${escapeHTML(guide.mi)} · ${guide.rule}</h3><p>${escapeHTML(guide.michigan)}</p><h3>What the evaluation team considers — rule summary</h3>${listHTML(guide.miRequirements)}<details class="official-rule"><summary>Read the official Michigan rule text</summary><p>Transcribed from the MARSE document posted by MDE and reviewed October 12, 2026. Historical terminology below is quoted from the rule, not used to label learners.</p><blockquote class="rule-text">${escapeHTML(guide.michiganFull)}</blockquote><a href="${guide.michiganURL}" target="_blank" rel="noopener noreferrer">View ${guide.rule} on the MDE website <span class="sr-only">(opens a new tab)</span></a></details><p><strong>This is a learning summary, not the full eligibility rule.</strong> The team must apply current federal and Michigan criteria, complete an individualized evaluation, and determine the need for special education. A diagnosis or classroom checklist is not enough.</p>${sourceHTML(['idea','marse','evaluation','eligibility'])}`) +
    guideDetails('Characteristics, potential strengths & grades 6–8', `<p>These are possible patterns, not universal traits or diagnostic criteria. Ask the learner and team what applies.</p><h3>Possible characteristics</h3>${listHTML(guide.characteristics)}<h3>Potential strengths — individual, not assumed</h3>${listHTML(guide.strengths)}<h3>Middle school demands</h3><p>${escapeHTML(guide.middle)}</p>`, true) +
    guideDetails('How classroom learning and participation may be affected', impacts) +
    guideDetails('Instructional strategies & appropriate accommodations', `<h3>Teach the skill and improve access</h3>${listHTML(guide.strategies)}<h3>Possible accommodations</h3>${listHTML(guide.accommodations)}<p>Individualize supports and implement the current IEP. A tool is an accommodation only when it changes access without changing the intended learning expectation; changed expectations are modifications.</p>`, true) +
    guideDetails('Middle school classroom scenarios: ELA, Math, Science & Social Studies', `<p>Hypothetical examples; none describes a real student.</p>${listHTML(guide.scenarios)}`) +
    guideDetails('Common misconceptions', listHTML(guide.misconceptions)) +
    `<section class="related-section"><h2>Related tools and learning</h2>${printableLinks(guide.related)}<div class="related-links">${guide.sldLinks.map(id => {const topic = sldGuides.find(g => g.id === id);return guideLink(id,topic.title);}).join('')}</div></section>`;
}
function sldHTML(guide) {
  return `<p class="guide-intro">${escapeHTML(guide.plain)}</p><p class="learning-note"><strong>${escapeHTML(guide.kind)}:</strong> ${escapeHTML(guide.area)}. This topic is not a separate federal disability category. Evaluation and eligibility are individualized team decisions.</p>` +
    guideDetails('How this differs from related learning areas', `<p>${escapeHTML(guide.difference)}</p>`, true) +
    guideDetails('What difficulties may look like in grades 6–8', `${listHTML(guide.signs)}<p>Observe the task and skill; these examples are not a diagnostic or eligibility checklist.</p>`) +
    guideDetails('Evidence-informed instruction', `${listHTML(guide.instruction)}<p>These approaches align broadly with the practice guide linked below; not every suggested support is a separately studied intervention. Coordinate specialized instruction with the team and monitor the targeted skill.</p>${sourceHTML([guide.source])}`, true) +
    guideDetails('Practical accommodations & a classroom example', `${listHTML(guide.access)}<h3>Middle school example</h3><p>${escapeHTML(guide.example)}</p><p>Follow the current IEP. Preserve the assessment target; if a tool supplies the skill being assessed, consult the team before using it.</p>`) +
    guideDetails('Misconceptions & educational eligibility', `<p>${escapeHTML(guide.myth)}</p><p>School SLD eligibility is not established by a term, diagnosis, or low grade. Apply the evaluation provisions in §§300.307–300.311 and Michigan R 340.1713, including appropriate instruction and relevant exclusionary factors.</p>${sourceHTML(['idea','sld','sldCriteria','sldObservation','sldDocumentation','marse','miSLD'])}`) +
    `<section class="related-section"><h2>Related tools and learning</h2>${printableLinks(guide.related)}<div class="related-links">${guide.others.map(id=>guideLink(id,sldGuides.find(g=>g.id===id).title)).join('')}${guideLink('specific-learning-disability','Specific learning disability: eligibility guide')}</div></section>`;
}

function examplesHTML(examples, subject = 'all') {
  return `<ul class="subject-examples">${Object.entries(examples).map(([name,example])=>`<li data-example-subject="${escapeHTML(name)}"${subject !== 'all' && subject !== name ? ' hidden' : ''}><strong>${escapeHTML(name)}:</strong> ${escapeHTML(example)}</li>`).join('')}</ul>`;
}
function accommodationHTML(guide) {
  return `<p class="guide-intro">${escapeHTML(guide.text)}</p><aside class="learning-note"><strong>Follow the individual IEP.</strong><p>These examples do not authorize changing a plan. Provide required supports as written, consult the case manager about barriers, and document actual implementation in approved secure systems.</p></aside>` +
    guideDetails('How to implement it',listHTML(guide.steps),true) +
    guideDetails('ELA, Math, Science & Social Studies examples',`<label class="example-filter" for="page-subject">Show subject examples<select id="page-subject"><option value="all">All subjects</option><option>ELA</option><option>Math</option><option>Science</option><option>Social Studies</option></select></label>${examplesHTML(guide.examples)}`,true) +
    guideDetails('Common mistakes',listHTML(guide.mistakes)) +
    guideDetails('Document implementation securely',`<p>${escapeHTML(guide.document)}</p><p>Record what support was actually provided, when and under what conditions. If a support was unavailable, record the barrier neutrally and coordinate corrective action with the case manager. This site does not collect implementation records.</p>`,true) +
    `<section class="related-section"><h2>Related blank tools</h2>${printableLinks(guide.related)}</section>`;
}

accommodationGuides.forEach(guide=>{
  const article=document.createElement('article');
  article.className='resource-card searchable accommodation-action-card';
  article.dataset.search=guideText(guide);
  article.dataset.localSearch=guideText(guide);
  article.dataset.subjects='ELA|Math|Science|Social Studies';
  article.dataset.accommodation=guide.id;
  article.innerHTML=`<span class="tag">ACCOMMODATIONS IN ACTION</span><h3>${escapeHTML(guide.title)}</h3><p>${escapeHTML(guide.text)}</p><p class="subject-preview" hidden></p><a class="text-link" href="#accommodation-${guide.id}">Implementation, examples & documentation →</a>`;
  document.querySelector('#accommodation-action-cards').append(article);
});
classroomChallenges.forEach(challenge=>{
  const option=document.createElement('option');option.value=challenge.id;option.textContent=challenge.title;
  document.querySelector('#challenge-choice').append(option);
  const article=document.createElement('article');
  article.className='resource-card searchable challenge-card';
  article.dataset.search=guideText(challenge);
  article.dataset.localSearch=guideText(challenge);
  article.dataset.subjects='ELA|Math|Science|Social Studies';
  article.dataset.challenge=challenge.id;
  article.innerHTML=`<span class="tag">${escapeHTML(challenge.focus)} · OBSERVED CHALLENGE</span><h3>${escapeHTML(challenge.title)}</h3><p>${escapeHTML(challenge.text)}</p><details><summary>Strategies and classroom examples</summary><h4>Practical starting points</h4>${listHTML(challenge.strategies)}<h4>Middle school examples</h4>${examplesHTML(challenge.examples)}<h4>Related blank tools</h4>${printableLinks(challenge.related)}<div class="related-links">${challenge.guides.map(id=>guideLink(id,sldGuides.find(g=>g.id===id).title)).join('')}</div></details>`;
  document.querySelector('#challenge-cards').append(article);
});
function refreshExamples() {
  const challengeSubject=document.querySelector('#challenge-subject').value;
  document.querySelectorAll('#challenge-cards [data-example-subject]').forEach(item=>{item.hidden=challengeSubject!=='all' && item.dataset.exampleSubject!==challengeSubject;});
  const accommodationSubject=document.querySelector('#accommodation-subject').value;
  document.querySelectorAll('.accommodation-action-card').forEach(card=>{
    const preview=card.querySelector('.subject-preview');
    preview.hidden=accommodationSubject==='all';
    preview.textContent=accommodationSubject==='all'?'':`${accommodationSubject}: ${accommodationGuides.find(g=>g.id===card.dataset.accommodation).examples[accommodationSubject]}`;
  });
}
function filterExtra(kind) {
  const query=document.querySelector(`#${kind}-search`).value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const selector=kind==='challenge'?'#challenge-cards .challenge-card':kind==='accommodation'?'#accommodation-action-cards .accommodation-action-card':'#printable-cards .resource-card';
  const chosen=kind==='challenge'?document.querySelector('#challenge-choice').value:'all';
  const subject=kind==='printable'?document.querySelector('#printable-subject').value:'all';
  document.querySelectorAll(selector).forEach(card=>{
    card.dataset.localHidden=String(!query.every(word=>card.dataset.search.includes(word)) || (chosen!=='all' && card.dataset.challenge!==chosen) || (subject!=='all' && !card.dataset.subjects.split('|').includes(subject)));
    if(kind==='challenge') card.querySelector('details').open=chosen!=='all';
  });
  refreshExamples();
  search();
}
function updateVisibleCounts() {
  const selectors={eligibility:'#eligibility-cards .learning-card',sld:'#sld-cards .learning-card',accommodation:'#accommodation-action-cards .accommodation-action-card',challenge:'#challenge-cards .challenge-card',printable:'#printable-cards .resource-card'};
  Object.entries(selectors).forEach(([kind,selector])=>{
    const count=Array.from(document.querySelectorAll(selector)).filter(card=>!card.hidden).length;
    const empty=document.querySelector(`#${kind}-empty`);
    if(empty) empty.hidden=count!==0;
    const status=document.querySelector(`#${kind}-status`);
    if(status) {
      const noun=kind==='eligibility'?(count===1?'category':'categories'):kind==='sld'?'learning topic':kind;
      status.textContent=`${count} ${noun}${kind==='eligibility'||count===1?'':'s'} shown.`;
    }
  });
}
['challenge','accommodation','printable'].forEach(kind=>document.querySelector(`#${kind}-search`).addEventListener('input',()=>filterExtra(kind)));
document.querySelector('#challenge-choice').addEventListener('change',()=>filterExtra('challenge'));
document.querySelector('#challenge-subject').addEventListener('change',refreshExamples);
document.querySelector('#accommodation-subject').addEventListener('change',refreshExamples);
document.querySelector('#printable-subject').addEventListener('change',()=>filterExtra('printable'));
document.addEventListener('change',event=>{
  if(event.target.id==='page-subject') document.querySelectorAll('#guide-panel [data-example-subject]').forEach(item=>{item.hidden=event.target.value!=='all'&&item.dataset.exampleSubject!==event.target.value;});
});
function routeGuide() {
  const wasGuide = document.body.classList.contains('guide-view');
  const isAccom = location.hash.startsWith('#accommodation-');
  const id = location.hash.slice(1).replace(/^(guide-|accommodation-)/, '');
  const isGuide = location.hash.startsWith('#guide-') || isAccom;
  const guide = isGuide ? (isAccom ? accommodationGuides : [...eligibilityGuides, ...sldGuides]).find(item => item.id === id) : null;
  document.body.classList.toggle('guide-view', isGuide);
  guidePanel.hidden = !isGuide;
  if (!isGuide) {
    document.title = originalTitle;
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({behavior:'instant',block:'start'});
      if (wasGuide) {
        const heading=target.querySelector('h2') || target;
        heading.setAttribute('tabindex','-1');
        heading.focus({preventScroll:true});
      }
    }
    return;
  }
  if (!guide) {
    guidePanel.innerHTML = '<h1 id="guide-title" tabindex="-1">Guide not found</h1><p>Choose a guide from the learning center.</p><a class="button" href="#eligibility">Return to learning center</a>';
  } else {
    const isSLD = sldGuides.includes(guide);
    guidePanel.innerHTML = `<a class="text-link" href="#${isAccom ? 'accommodations' : isSLD ? 'sld-center' : 'eligibility'}">← Back to ${isAccom ? 'accommodations' : isSLD ? 'learning disabilities' : 'eligibility center'}</a><p class="eyebrow">${isAccom ? 'ACCOMMODATIONS IN ACTION' : isSLD ? 'SKILL-BUILDING GUIDE' : 'IDEA & MICHIGAN / TEACHER LEARNING GUIDE'}</p><h1 id="guide-title" tabindex="-1">${escapeHTML(guide.title)}</h1><div class="guide-toolbar"><button class="button" data-print-guide="${guide.id}"${isAccom ? ' data-accommodation-reference="true"' : ''}>Print teacher reference / Save PDF</button><a class="text-link" href="#printables">Browse classroom printables →</a></div>${isAccom ? '' : '<p class="source-status">Sources reviewed October 12, 2026. Federal text: July 1, 2025 CFR edition. Michigan: rules posted by MDE. Check official sources for later amendments.</p>'}${isAccom ? accommodationHTML(guide) : isSLD ? sldHTML(guide) : eligibilityHTML(guide)}<section class="guide-sources"><h2>Official sources</h2>${sourceHTML(isAccom ? ['iep','marse'] : isSLD ? ['idea','sld','sldCriteria','sldObservation','sldDocumentation','marse','miSLD',guide.source] : ['idea','evaluation','eligibility','marse','mde'])}<p>Legal summaries are educational references, not legal advice or an eligibility decision. Instructional examples are hypothetical and must be individualized.</p></section>`;
    document.title = `${guide.title} | The Inclusive Classroom`;
  }
  document.querySelectorAll('nav a').forEach(link => {
    if (guide && link.hash === (isAccom ? '#accommodations' : sldGuides.includes(guide) ? '#sld-center' : '#eligibility')) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('#guide-title').focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange', routeGuide);
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) {
    clearSearch();
    menu.setAttribute('aria-expanded','false');
    document.querySelector('#navigation').classList.remove('open');
  }
  const printButton = event.target.closest('[data-print-guide]');
  if (printButton) {
    const isAccom = printButton.dataset.accommodationReference === 'true';
    const guide = (isAccom ? accommodationGuides : [...eligibilityGuides,...sldGuides]).find(g=>g.id===printButton.dataset.printGuide);
    if (isAccom) {
      showWorksheet(guide.title + ' · Teacher reference', `<p>${escapeHTML(guide.text)}</p><h3>Implementation</h3>${listHTML(guide.steps)}<h3>Subject examples</h3>${examplesHTML(guide.examples)}<h3>Common mistakes</h3>${listHTML(guide.mistakes)}<h3>Secure documentation</h3><p>${escapeHTML(guide.document)}</p><p>Follow the current IEP. This guide does not authorize changing its requirements.</p>`);
      return;
    }
    const isSLD = sldGuides.includes(guide);
    const content = isSLD ? `<p>${escapeHTML(guide.difference)}</p><h3>Instruction</h3>${listHTML(guide.instruction)}<h3>Access supports</h3>${listHTML(guide.access)}<p>${escapeHTML(guide.example)}</p>${sourceHTML(['idea','sldCriteria','marse','miSLD',guide.source])}` : `<p><strong>Michigan:</strong> ${escapeHTML(guide.mi)} · ${guide.rule}</p><p>${escapeHTML(guide.michigan)}</p>${listHTML(guide.miRequirements)}<h3>Middle school</h3><p>${escapeHTML(guide.middle)}</p><h3>Instructional strategies</h3>${listHTML(guide.strategies)}<h3>Possible accommodations</h3>${listHTML(guide.accommodations)}<h3>Misconceptions</h3>${listHTML(guide.misconceptions)}${sourceHTML(['idea','marse'])}`;
    showWorksheet(guide.title + ' · Teacher reference', `<p>${escapeHTML(guide.plain)}</p><p class="worksheet-note">Sources reviewed October 12, 2026. Federal text: 2025 CFR edition. Michigan: MDE-posted MARSE. Characteristics and medical diagnoses are not school eligibility. An individualized evaluation and determination of need for special education are required.</p>${content}`);
  }
});
updateVisibleCounts();
routeGuide();
