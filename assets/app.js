const accommodations = [
  { title: 'Make reading more accessible', tag: 'Reading & access', icon: 'Aa', text: 'Help students access grade-level ideas while supporting the reading demands.', tips: ['Provide accessible digital text or text-to-speech when specified in the plan.', 'Preview essential vocabulary with a short definition and an example.', 'Chunk longer passages and check understanding after each part.'] },
  { title: 'Support written expression', tag: 'Writing & expression', icon: '✎', text: 'Separate the task of organizing ideas from the task of putting them on paper.', tips: ['Offer a graphic organizer, word bank, or sentence starter.', 'Allow speech-to-text or an alternate response format when appropriate to the goal and plan.', 'Model one response, then gradually reduce the support.'] },
  { title: 'Give time and a clear setting', tag: 'Assessment & pacing', icon: '◷', text: 'Reduce access barriers without changing the skill an assessment measures.', tips: ['Use the extended-time amount and setting specified in the plan.', 'Provide planned breaks and clear directions for returning to the task.', 'Check with the case manager before reading a test aloud; some tests measure reading itself.'] },
  { title: 'Make directions manageable', tag: 'Attention & processing', icon: '☷', text: 'Make the next step visible, specific, and easy to revisit.', tips: ['Give concise directions verbally and in writing.', 'Ask the student to explain the first step privately, instead of asking “Do you understand?”', 'Provide a checklist and cue the student to check it.'] },
  { title: 'Build an organization routine', tag: 'Executive functioning', icon: '▦', text: 'Reduce the effort needed to start, organize, and finish a task.', tips: ['Use a consistent place for assignments and materials.', 'Break a project into checkpoints with dates.', 'Allow a brief end-of-class check for materials and the next step.'] },
  { title: 'Plan for regulation and access', tag: 'Sensory & participation', icon: '❋', text: 'Partner with the student and team to identify supports that help participation.', tips: ['Offer seating or a quieter work area based on the student’s needs and plan.', 'Agree on a discreet signal for an approved break.', 'Teach how to return to learning; avoid using supports as rewards to be earned.'] }
];
const strategies = [
  { title: 'Model it. Practice it. Try it.', tag: 'Explicit instruction', icon: '→', text: 'Make your thinking visible before asking students to work independently.', tips: ['State the learning goal in student-friendly language.', 'Think aloud through a worked example.', 'Practice together and check understanding before independent work.'] },
  { title: 'Offer more than one way in', tag: 'Universal design', icon: '◈', text: 'Plan flexible access from the start while keeping the learning goal clear.', tips: ['Pair a spoken explanation with a visual or concrete example.', 'Use accessible captions and readable materials.', 'Offer response choices when they still measure the intended skill.'] },
  { title: 'Check understanding early', tag: 'Formative assessment', icon: '✓', text: 'Use a small check to find out what to reteach before the next lesson.', tips: ['Ask everyone to respond with a short explanation, example, or exit ticket.', 'Look for patterns rather than assuming quiet students understand.', 'Reteach one specific step and check again.'] },
  { title: 'Make routines predictable', tag: 'Classroom routines', icon: '☀', text: 'A consistent routine leaves more attention available for learning.', tips: ['Post a brief agenda and explain changes ahead of time.', 'Teach and practice transitions explicitly.', 'Use a private prompt and specific, respectful feedback.'] },
  { title: 'Structure peer collaboration', tag: 'Belonging & discussion', icon: '◌', text: 'Create clear roles and multiple ways for students to contribute.', tips: ['Provide thinking time before a partner discussion.', 'Offer sentence stems and defined group roles.', 'Avoid making one student a permanent helper or dependent partner.'] },
  { title: 'Plan together, then adjust', tag: 'Teacher collaboration', icon: '⇄', text: 'Bring an observation and a work sample to your special education partner.', tips: ['Describe the task and the barrier without labeling the student.', 'Agree on one support, who will provide it, and when to check in.', 'Use your school’s secure channels for any student-specific information.'] }
];
const printables = [
  { title: 'Task breakdown checklist', tag: 'Organization', icon: '☑', text: 'Turn a large assignment into a few clear, manageable steps.', template: '<p><strong>Task:</strong> __________________________________________</p><p><strong>Materials I need:</strong> __________________________________</p><table><thead><tr><th>Done</th><th>My next step</th><th>When?</th></tr></thead><tbody>' + '<tr><td>☐</td><td></td><td></td></tr>'.repeat(5) + '</tbody></table><p>If I get stuck, I can: ___________________________________</p><p>Before I turn it in, I will check: __________________________</p>' },
  { title: 'Teacher support planner', tag: 'Collaboration', icon: '▤', text: 'Plan a classroom support and a follow-up conversation with your team.', template: '<p>Use this blank planning tool alongside the student’s current plan.</p><table><tbody><tr><th>Learning goal / task</th><td></td></tr><tr><th>Barrier observed</th><td></td></tr><tr><th>Support required by the plan</th><td></td></tr><tr><th>How and when to provide it</th><td></td></tr><tr><th>Team member to consult</th><td></td></tr><tr><th>Evidence to review / check-in date</th><td></td></tr></tbody></table><p class="worksheet-note">This is a planning aid, not an IEP or a substitute for required documentation. Store completed student-specific materials securely.</p>' },
  { title: 'Weekly assignment planner', tag: 'Executive functioning', icon: '▦', text: 'Keep assignments, materials, and next steps in one predictable place.', template: '<p><strong>Week of:</strong> ______________________</p><table><thead><tr><th>Day</th><th>Assignment / first step</th><th>Materials / due date</th><th>Done</th></tr></thead><tbody>' + ['Monday','Tuesday','Wednesday','Thursday','Friday'].map(day => `<tr><th>${day}</th><td></td><td></td><td>☐</td></tr>`).join('') + '</tbody></table><p>My top priority this week: ______________________________</p><p>One support I will ask for: ______________________________</p>' },
  { title: 'Reading response organizer', tag: 'Reading & writing', icon: 'Aa', text: 'Support a main idea, relevant evidence, and a clear explanation.', template: '<p><strong>Text / topic:</strong> _______________________________________</p><table><tbody><tr><th>Main idea<br><small>What is the text mostly about?</small></th><td></td></tr><tr><th>Evidence<br><small>What detail supports your idea?</small></th><td></td></tr><tr><th>Explain<br><small>How does the evidence connect?</small></th><td></td></tr><tr><th>My question<br><small>What do I still wonder?</small></th><td></td></tr></tbody></table><p>Sentence starter: “The main idea is _____. One detail that supports it is _____. This shows _____.”</p>' },
  { title: 'Student self-advocacy prompts', tag: 'Participation', icon: '◌', text: 'Practice respectful ways to ask for clarification, support, or a break.', template: '<p>Practice these prompts together. Choose words that feel comfortable.</p><table><thead><tr><th>When I need…</th><th>I could say…</th></tr></thead><tbody><tr><td>Directions explained</td><td>“Could you explain the first step again?”</td></tr><tr><td>A different explanation</td><td>“Could you show me an example?”</td></tr><tr><td>A planned support</td><td>“May I use my checklist / organizer?”</td></tr><tr><td>An approved break</td><td>“May I take my planned break? How should I return?”</td></tr><tr><td>More help</td><td>“I tried _____. I’m stuck on _____.”</td></tr></tbody></table><p>My own helpful phrase:</p><div class="write-line"></div>' },
  { title: 'Quick learning exit ticket', tag: 'Check understanding', icon: '→', text: 'Find out what clicked, what needs practice, and what would help next.', template: '<p><strong>Today’s learning goal:</strong> ______________________________</p><p>1. One thing I learned or can show:</p><div class="write-line"></div><div class="write-line"></div><p>2. An example, explanation, or drawing:</p><div class="write-line"></div><div class="write-line"></div><p>3. Something I’m still working on:</p><div class="write-line"></div><p>4. A support that would help me next time:</p><div class="write-line"></div>' }
];
const faqs = [
  ['What is the difference between an accommodation and a modification?', 'An accommodation changes how a student accesses learning or shows understanding, such as a graphic organizer or extended time. A modification changes what the student is expected to learn or demonstrate, such as a different learning standard. Follow the individual plan and consult the case manager before changing expectations.'],
  ['What is an IEP, and what is my role as a general education teacher?', 'An Individualized Education Program (IEP) describes an eligible student’s special education services, goals, and supports. Know and implement the parts relevant to your classroom, collaborate with the special education team, and share observations through approved channels. Ask the case manager how to access current information and document implementation.'],
  ['How is a Section 504 plan different from an IEP?', 'In the United States, a Section 504 plan generally identifies supports for equal access for an eligible student with a disability. An IEP under IDEA includes specially designed instruction and related services based on eligibility and need. Eligibility and procedures differ; your school’s special education or 504 team can explain the local process.'],
  ['Can I offer a support to students who do not have a plan?', 'Many classroom strategies, such as visual directions and predictable routines, can benefit all students. You can provide general classroom support while still implementing individualized requirements. Check school procedures when a change affects assessment conditions, grading, or formal accommodations.'],
  ['What should I do when an accommodation does not seem to help?', 'Continue required supports and document the specific task, how the support was provided, and the observed result in your approved secure system. Consult the case manager to troubleshoot implementation and discuss whether the team needs to review the plan. Do not independently remove a required accommodation.'],
  ['How do I handle missing work or challenging behavior?', 'Start by looking for barriers: unclear directions, a difficult skill, organization, communication, or regulation needs. Use predictable routines and follow any relevant IEP or behavior intervention plan. Consult the team for patterns or concerns and follow school safety procedures for immediate risks. Avoid interpreting every behavior as intentional noncompliance.'],
  ['How can I protect student confidentiality?', 'Discuss student-specific information only with authorized people who need it for their role, using school-approved systems. Do not put student names, disability information, completed plans, or work samples on a public website. This hub contains only general guidance and blank templates and does not store form responses.'],
  ['What should I bring to a meeting with the special education team?', 'Bring the learning goal, a specific description of the barrier, supports you have already implemented, and relevant observations or work samples shared securely. Ask what the current plan requires, how to provide it consistently, and when you will review progress together.']
];

['task-chunking', 'teacher-planner', 'weekly-planner', 'reading-organizer', 'self-advocacy', 'exit-ticket'].forEach((id, index) => { printables[index].id = id; });

printables.push(...expandedPrintables);

function card(item, printable = false, index = 0) {
  const article = document.createElement('article');
  article.className = 'resource-card searchable';
  article.dataset.subjects = (item.subjects || ['ELA','Math','Science','Social Studies']).join('|');
  article.dataset.search = [item.title, item.tag, item.text, ...(item.tips || [])].join(' ').toLowerCase();
  article.innerHTML = `<div class="card-top"><span class="card-icon" aria-hidden="true">${item.icon}</span><span class="tag">${item.tag}</span></div><h3>${item.title}</h3><p>${item.text}</p>` + (printable ? `<button class="text-link" data-template="${index}" aria-label="Preview ${item.title}">Preview & print <span aria-hidden="true">→</span></button>` : `<span class="try-label tag">TRY IN YOUR CLASSROOM</span><ul>${item.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`);
  return article;
}
accommodations.forEach(item => document.querySelector('#accommodation-cards').append(card(item)));
strategies.forEach(item => document.querySelector('#strategy-cards').append(card(item)));
printables.forEach((item, index) => document.querySelector('#printable-cards').append(card(item, true, index)));
faqs.forEach(([question, answer]) => {
  const detail = document.createElement('details');
  detail.className = 'searchable';
  detail.dataset.search = `${question} ${answer}`.toLowerCase();
  detail.innerHTML = `<summary>${question}</summary><p>${answer}</p>`;
  document.querySelector('#faq-list').append(detail);
});

const searchInput = document.querySelector('#resource-search');
function search() {
  const words = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const subject = document.querySelector('#resource-subject').value;
  let count = 0;
  document.querySelectorAll('.searchable').forEach(item => {
    item.hidden = !words.every(word => item.dataset.search.includes(word)) || item.dataset.localHidden === 'true' || (subject !== 'all' && item.dataset.subjects && !item.dataset.subjects.split('|').includes(subject));
    if (!item.hidden) count++;
  });
  document.querySelectorAll('.resource-section').forEach(section => {
    section.hidden = (words.length > 0 || subject !== 'all') && !Array.from(section.querySelectorAll('.searchable')).some(item => !item.hidden);
  });
  document.querySelector('#search-status').textContent = (words.length || subject !== 'all') ? (count ? `${count} matching ${count === 1 ? 'resource' : 'resources'} across the hub.` : 'No matches. Try a broader term such as “reading,” “writing,” or “plan.”') : '';
  document.querySelector('#clear-search').hidden = !words.length && subject === 'all';
  if (typeof updateVisibleCounts === 'function') updateVisibleCounts();
}
searchInput.addEventListener('input', search);
document.querySelector('#resource-subject').addEventListener('change', search);
document.querySelector('#search-form').addEventListener('submit', event => { event.preventDefault(); search(); });
function clearSearch() {
  searchInput.value = '';
  document.querySelector('#resource-subject').value = 'all';
  document.querySelectorAll('[data-local-hidden]').forEach(item => { item.dataset.localHidden = 'false'; });
  document.querySelectorAll('#eligibility-search, #sld-search, #challenge-search, #accommodation-search, #printable-search').forEach(input => { input.value = ''; });
  const sldSubject = document.querySelector('#sld-subject');
  if (sldSubject) sldSubject.value = 'all';
  document.querySelectorAll('#challenge-choice, #challenge-subject, #accommodation-subject, #printable-subject').forEach(select => { select.value = 'all'; });
  document.querySelectorAll('#eligibility-status, #sld-status, #challenge-status, #accommodation-status, #printable-status').forEach(item => { item.textContent = ''; });
  document.querySelectorAll('#eligibility-empty, #sld-empty, #challenge-empty, #accommodation-empty, #printable-empty').forEach(item => { item.hidden = true; });
  if (typeof refreshExamples === 'function') refreshExamples();
  search();
}
document.querySelector('#clear-search').addEventListener('click', () => { clearSearch(); searchInput.focus(); });
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  document.querySelector('#navigation').classList.toggle('open', open);
});
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  if (link.getAttribute('href') !== '#main') clearSearch();
  menu.setAttribute('aria-expanded', 'false');
  document.querySelector('#navigation').classList.remove('open');
  document.querySelectorAll('nav a').forEach(navLink => {
    if (navLink.getAttribute('href') === link.getAttribute('href')) navLink.setAttribute('aria-current', 'page');
    else navLink.removeAttribute('aria-current');
  });
}));
const dialog = document.querySelector('#resource-dialog');
function showWorksheet(title, template) {
  document.querySelector('#print-content').innerHTML = `<article class="worksheet"><p class="eyebrow">THE INCLUSIVE CLASSROOM · TEACHER RESOURCE</p><h2 id="dialog-title">${title}</h2>${template}<p class="worksheet-note">General classroom tool. Individualize with your special education team. Do not share confidential student information publicly.</p></article>`;
  dialog.showModal();
}
function openPrintable(index) {
  const item = printables[index];
  if (item) showWorksheet(item.title, item.template);
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-template]');
  if (button) openPrintable(Number(button.dataset.template));
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#print-resource').addEventListener('click', () => window.print());
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = Array.from(dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [contenteditable="true"], [tabindex]:not([tabindex="-1"])')).filter(control => control.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first) { event.preventDefault(); return; }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
