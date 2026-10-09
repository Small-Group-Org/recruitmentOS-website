import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let errors = [];

function assert(condition, message) {
    if (!condition) {
        errors.push(message);
        console.error(`❌ FAIL: ${message}`);
    } else {
        console.log(`✅ PASS: ${message}`);
    }
}

console.log('--- 1. Checking robots.ts ---');
const robotsPath = path.join(rootDir, 'src/app/robots.ts');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');

assert(robotsContent.includes('OAI-SearchBot'), 'robots.ts includes OAI-SearchBot');
assert(robotsContent.includes('PerplexityBot'), 'robots.ts includes PerplexityBot');
assert(robotsContent.includes('Claude-SearchBot'), 'robots.ts includes Claude-SearchBot');
assert(robotsContent.includes('GPTBot'), 'robots.ts includes GPTBot');
assert(robotsContent.includes('ClaudeBot'), 'robots.ts includes ClaudeBot');
assert(robotsContent.includes('Googlebot'), 'robots.ts includes Googlebot');
assert(robotsContent.includes('Bingbot'), 'robots.ts includes Bingbot');
assert(robotsContent.includes("'/tools/gate'"), 'robots.ts disallows /tools/gate');
assert(robotsContent.includes("'/api/'"), 'robots.ts disallows /api/');
assert(robotsContent.includes('sitemap.xml'), 'robots.ts includes sitemap reference');

console.log('\n--- 2. Checking AI Discovery Manifests (llms.txt & llms-full.txt) ---');
const bannedRegex = /(book a demo|5x (your )?placements?|autopilot|ai[.\- ]powered|fully automated)/i;

const llmsPath = path.join(rootDir, 'public/llms.txt');
assert(fs.existsSync(llmsPath), 'public/llms.txt exists');
const llmsContent = fs.readFileSync(llmsPath, 'utf8');

assert(llmsContent.includes('# RecruitmentOS'), 'llms.txt has # RecruitmentOS title');
assert(llmsContent.includes('https://www.hirerecruitmentos.com/'), 'llms.txt has canonical root link');
assert(llmsContent.includes('100 verified hiring-manager contacts in 60 days'), 'llms.txt has 100 contacts guarantee');
assert(llmsContent.includes('7-Component Qualified Meeting Contract') || llmsContent.includes('7-component qualified meeting contract'), 'llms.txt has 7-component contract');
assert(llmsContent.includes('Client Data & Infrastructure Ownership') || llmsContent.includes('client data and infrastructure ownership'), 'llms.txt has client data ownership');
assert(!bannedRegex.test(llmsContent), 'llms.txt does not contain banned words');
assert(!/\bboutique\b/i.test(llmsContent), 'llms.txt does not contain "boutique"');
assert(llmsContent.includes('https://www.hirerecruitmentos.com/llms-full.txt'), 'llms.txt links to llms-full.txt');
assert(llmsContent.includes('tushar.mangla1120@gmail.com'), 'llms.txt includes direct contact email');
assert(llmsContent.includes('/contact'), 'llms.txt includes /contact link');

const llmsFullPath = path.join(rootDir, 'public/llms-full.txt');
assert(fs.existsSync(llmsFullPath), 'public/llms-full.txt exists');
const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf8');

assert(llmsFullContent.includes('Stage 01: Setup & Foundation'), 'llms-full.txt has 4-stage methodology');
assert(llmsFullContent.includes('Managed Capacity Sprint'), 'llms-full.txt has Managed Capacity Sprint model');
assert(llmsFullContent.includes('Orion Placement'), 'llms-full.txt has Orion Placement case study');
assert(llmsFullContent.includes('RecruitmentOS vs. In-House BD Hire') || llmsFullContent.includes('RecruitmentOS vs In-House BD'), 'llms-full.txt has BD hire comparison');
assert(!bannedRegex.test(llmsFullContent), 'llms-full.txt does not contain banned words');
assert(!/\bboutique\b/i.test(llmsFullContent), 'llms-full.txt does not contain "boutique"');
assert(llmsFullContent.includes('tushar.mangla1120@gmail.com'), 'llms-full.txt includes direct contact email');
assert(llmsFullContent.includes('/contact'), 'llms-full.txt includes /contact link');

console.log('\n--- 3. Checking Schema Graph Unification & Contact (schemas.ts & seo.ts) ---');
const seoPath = path.join(rootDir, 'src/lib/seo.ts');
const seoContent = fs.readFileSync(seoPath, 'utf8');
assert(seoContent.includes("CONTACT_EMAIL = 'tushar.mangla1120@gmail.com'"), 'seo.ts exports CONTACT_EMAIL');
assert(seoContent.includes('CONTACT_MAILTO'), 'seo.ts exports CONTACT_MAILTO');

const schemasPath = path.join(rootDir, 'src/lib/schemas.ts');
const schemasContent = fs.readFileSync(schemasPath, 'utf8');

assert(schemasContent.includes('CONTACT_EMAIL'), 'schemas.ts imports CONTACT_EMAIL');
assert(schemasContent.includes('email: CONTACT_EMAIL'), 'schemas.ts includes email: CONTACT_EMAIL');
assert(schemasContent.includes('contactPoint: ['), 'organizationSchema includes contactPoint');
assert(schemasContent.includes("'@type': 'ContactPoint'"), 'organizationSchema contactPoint has ContactPoint @type');
assert(schemasContent.includes("'@id': `${SITE_URL}/#organization`"), 'organizationSchema has #organization @id');
assert(schemasContent.includes("'@id': `${SITE_URL}/#founder`"), 'schemas.ts has #founder @id');
assert(schemasContent.includes("'@id': `${SITE_URL}/#service`"), 'serviceWithOffersSchema has #service @id');
assert(schemasContent.includes('webPageSchema'), 'schemas.ts exports webPageSchema');
assert(schemasContent.includes("'@id': `${url}#webpage`"), 'webPageSchema has #webpage @id');
assert(schemasContent.includes("'@id': `${pageUrl}#faq`"), 'faqSchema has #faq @id');
assert(schemasContent.includes("'@id': `${pageUrl}#webpage`"), 'faqSchema links isPartOf to #webpage');

console.log('\n--- 4. Checking FAQ Decoupling ---');
const faqComponentPath = path.join(rootDir, 'src/components/FAQ.tsx');
const faqComponentContent = fs.readFileSync(faqComponentPath, 'utf8');

assert(!faqComponentContent.includes('JsonLd'), 'FAQ.tsx does not import or render JsonLd');
assert(!faqComponentContent.includes('faqSchema'), 'FAQ.tsx does not import or use faqSchema');
assert(faqComponentContent.includes('homeFaqs'), 'FAQ.tsx imports homeFaqs from faq-data');

const faqDataPath = path.join(rootDir, 'src/lib/faq-data.ts');
assert(fs.existsSync(faqDataPath), 'src/lib/faq-data.ts exists');
const faqDataContent = fs.readFileSync(faqDataPath, 'utf8');
assert(faqDataContent.includes('export const homeFaqs'), 'faq-data.ts exports homeFaqs');
assert(faqDataContent.includes('export function getHomeFaqsForSchema'), 'faq-data.ts exports getHomeFaqsForSchema');

const pagePath = path.join(rootDir, 'src/app/page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf8');
assert(pageContent.includes('webPageSchema'), 'page.tsx renders webPageSchema');
assert(pageContent.includes('faqSchema'), 'page.tsx renders faqSchema');
assert(pageContent.includes('serviceWithOffersSchema'), 'page.tsx renders serviceWithOffersSchema');
assert(pageContent.includes('getHomeFaqsForSchema'), 'page.tsx uses getHomeFaqsForSchema');

console.log('\n--- 5. Checking SSR Output if Build Exists ---');
const ssgIndexPath = path.join(rootDir, '.next/server/app/index.html');
if (fs.existsSync(ssgIndexPath)) {
    const ssgIndex = fs.readFileSync(ssgIndexPath, 'utf8');
    assert(ssgIndex.includes('FAQPage'), 'Built index.html contains FAQPage JSON-LD in SSR payload');
    assert(ssgIndex.includes('WebPage'), 'Built index.html contains WebPage JSON-LD in SSR payload');
    assert(ssgIndex.includes('#organization'), 'Built index.html contains #organization @id');
} else {
    console.log('ℹ️ .next/server/app/index.html not built yet (run `npm run build` to verify SSR payload).');
}

console.log('\n=============================================');
if (errors.length > 0) {
    console.error(`Verification FAILED with ${errors.length} error(s).`);
    process.exit(1);
} else {
    console.log('All verification checks PASSED successfully! 🎉');
    process.exit(0);
}
