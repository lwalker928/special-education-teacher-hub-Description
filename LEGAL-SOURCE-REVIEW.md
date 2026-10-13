# Legal and instructional source review

Content preparation date: October 12, 2026. This is **not a legal verification or effective date**.

## Source verification completed

Source review date: **October 12, 2026** (America/Detroit).

Initial network access denials were resolved after the official-source domains were added to the environment draft. The older Michigan MARSE URL redirected to a not-found page; the website now uses the verified current MDE path.

The 13 federal definition paragraphs were checked against the official U.S. Government Publishing Office **2025 CFR edition, revised July 1, 2025**. Sections 300.304, 300.306–300.311, and 300.323 were also retrieved from that edition to check evaluation, SLD, and IEP implementation guidance. The live IDEA portal returned HTTP 403 and the live eCFR API returned HTTP 406, so this review does **not** establish that no federal amendments occurred after that edition. The website discloses the edition and tells readers to check official sources for later amendments.

Michigan criteria were checked against the complete MARSE PDF linked from MDE’s current MARSE page. Each category page includes the full applicable Michigan rule text, a plain-language summary of requirements, and a direct official rule link. Do not treat the summaries as an eligibility checklist. Rule-history dates are included in the quoted rule text; they are not presented as a single effective date for all of MARSE.

Michigan SLD process guidance was checked against MDE’s currently posted **Michigan Criteria for Determining the Existence of a Specific Learning Disability**, whose cover identifies its last update as **March 16, 2017** and explains that this update concerned accessibility without other content changes. This document remains linked from MDE’s evaluations and eligibility page. The website identifies that document date rather than claiming it was newly issued in 2026.

## Verified official sources

- [34 CFR §300.8: federal disability definitions, official 2025 edition](https://www.govinfo.gov/content/pkg/CFR-2025-title34-vol2/pdf/CFR-2025-title34-vol2-sec300-8.pdf)
- [§300.304: individualized evaluation procedures](https://www.govinfo.gov/content/pkg/CFR-2025-title34-vol2/pdf/CFR-2025-title34-vol2-sec300-304.pdf)
- [§300.306: eligibility determination](https://www.govinfo.gov/content/pkg/CFR-2025-title34-vol2/pdf/CFR-2025-title34-vol2-sec300-306.pdf)
- [§300.309: SLD determination](https://www.govinfo.gov/content/pkg/CFR-2025-title34-vol2/pdf/CFR-2025-title34-vol2-sec300-309.pdf)
- [Michigan Department of Education: MARSE](https://www.michigan.gov/mde/services/special-education/laws-regs/marse)
- [MDE-posted full MARSE PDF](https://www.michigan.gov/mde/-/media/Project/Websites/mde/specialeducation/MI-rules/MARSE-R3401701toR3401873.pdf)
- [MDE: evaluations and eligibility](https://www.michigan.gov/mde/services/special-education/evaluations-ieps/evaluations-eligibility)
- [MDE: Michigan SLD criteria](https://www.michigan.gov/mde/-/media/Project/Websites/mde/specialeducation/eval-eligibility/Criteria_for_Existence_of_SLD.pdf)

The government PDF destinations were downloaded and checked for valid PDF content rather than relying on status codes alone. Federal XML files were parsed as CFR granules; a requested 2026 edition returned an HTML page, which was not accepted as legal evidence.

## Category crosswalk for review

| Federal category | Michigan terminology used in the draft | Rule reference |
| --- | --- | --- |
| Autism | Autism spectrum disorder | R 340.1715 |
| Deaf-blindness | Deaf-blindness | R 340.1717 |
| Deafness | Deaf or hard of hearing | R 340.1707 |
| Emotional disturbance | Emotional impairment | R 340.1706 |
| Hearing impairment | Deaf or hard of hearing | R 340.1707 |
| Intellectual disability | Cognitive impairment | R 340.1705 |
| Multiple disabilities | Severe multiple impairment; not a one-to-one equivalence | R 340.1714 |
| Orthopedic impairment | Physical impairment | R 340.1709 |
| Other health impairment | Other health impairment | R 340.1709a |
| Specific learning disability | Specific learning disability | R 340.1713 |
| Speech or language impairment | Speech and language impairment | R 340.1710 |
| Traumatic brain injury | Traumatic brain injury | R 340.1716 |
| Visual impairment including blindness | Visual impairment including blindness | R 340.1708 |

The crosswalk is a learning aid. Full state rule text and the reviewed summaries are in the website. The summaries cover the stated criteria, exclusions, and required evaluation participants or information; the official rules and individualized evaluation govern decisions. Local procedures are not supplied by this website.

Important review distinctions: Michigan severe multiple impairment is not interchangeable with every federal multiple-disabilities case; federal deafness and hearing impairment share Michigan terminology; age-limited developmental delay is separate from the 13 categories in §300.8(c) and is not a general middle school category. Screening, clinical diagnosis, and educational eligibility are different decisions. No page is intended to decide eligibility.

## Instructional references

The SLD guides reference actual IES What Works Clearinghouse practice guides, not invented research studies:

- [Providing Reading Interventions for Students in Grades 4–9 (2022)](https://ies.ed.gov/ncee/wwc/PracticeGuide/29)
- [Teaching Secondary Students to Write Effectively (2016)](https://ies.ed.gov/ncee/wwc/PracticeGuide/22)
- [Improving Mathematical Problem Solving in Grades 4 Through 8 (2012)](https://ies.ed.gov/ncee/wwc/PracticeGuide/16)

Suggested classroom access supports are not all separately evaluated research interventions. Examples are hypothetical and must be individualized. All three IES pages were retrieved successfully; their titles and publication months/years were checked: March 2022, November 2016, and May 2012 respectively. The reading and writing suggestions were compared with the guides’ recommendation summaries; mathematics problem-solving suggestions align with representation, strategy, monitoring, and reflection recommendations. Not every calculation or access suggestion is claimed to be a separately validated intervention.

## Maintaining the content

Use `assets/hub-data.js` for teacher-facing content and `assets/legal-data.js` for verified public rule excerpts and Michigan requirement summaries. After edits, run `python3 build_website.py` to regenerate the self-contained `index.html`. When official rules change, verify the relevant source text and update the edition, review date, summaries, and excerpts together. No live legal-update service is included. Follow current MDE and district procedures; this website cannot diagnose or decide eligibility.

No student information was used. Templates are blank or contain general examples. The website has no database, analytics, or student-data submission endpoint. No website or environment publication was performed.
