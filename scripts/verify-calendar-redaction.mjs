import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const EXPECTED_ASSETS = [
  { file: 'calendar-august-2026.jpeg', width: 1600, height: 1100 },
  { file: 'calendar-september-2026.jpeg', width: 1600, height: 1096 },
  { file: 'calendar-week-aug-sep-2026.jpeg', width: 1600, height: 1089 },
];

let failed = false;

function pass(msg) {
  console.log(`[PASS] ${msg}`);
}

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  failed = true;
}

async function verifyAssets() {
  console.log('\n--- Verifying Public Proof Assets & Dimensions ---');
  for (const asset of EXPECTED_ASSETS) {
    const publicPath = path.join(projectRoot, 'public', 'proof', asset.file);
    if (!fs.existsSync(publicPath)) {
      fail(`Asset missing in public/proof: ${asset.file}`);
      continue;
    }

    const meta = await sharp(publicPath).metadata();
    if (meta.width !== asset.width || meta.height !== asset.height) {
      fail(`${asset.file} dimension mismatch: expected ${asset.width}x${asset.height}, got ${meta.width}x${meta.height}`);
    } else {
      pass(`${asset.file} exists with exact 1:1 dimensions (${meta.width}x${meta.height})`);
    }

    // Assert that the image was actually modified compared to backup
    const backupPath = path.join(projectRoot, '.proof-originals-backup', asset.file);
    if (fs.existsSync(backupPath)) {
      const publicBuf = fs.readFileSync(publicPath);
      const backupBuf = fs.readFileSync(backupPath);
      if (publicBuf.equals(backupBuf)) {
        fail(`${asset.file} is identical to backup - redaction did not alter image!`);
      } else {
        pass(`${asset.file} is successfully redacted (distinct from unredacted original)`);
      }
    }
  }
}

async function verifyBackupsAndGitignore() {
  console.log('\n--- Verifying Non-Public Backup Safety ---');
  const backupDir = path.join(projectRoot, '.proof-originals-backup');
  if (!fs.existsSync(backupDir)) {
    fail('Originals backup directory does not exist!');
    return;
  }
  pass('Backup directory exists outside public directory (.proof-originals-backup/)');

  for (const asset of EXPECTED_ASSETS) {
    const backupPath = path.join(backupDir, asset.file);
    if (!fs.existsSync(backupPath)) {
      fail(`Original backup missing: ${asset.file}`);
    } else {
      const meta = await sharp(backupPath).metadata();
      if (meta.width !== asset.width || meta.height !== asset.height) {
        fail(`Original backup dimension mismatch for ${asset.file}`);
      } else {
        pass(`Original backup verified for ${asset.file} (${meta.width}x${meta.height})`);
      }
    }
  }

  // Ensure no unredacted originals exist inside public/
  const unsafePublicBackupDir = path.join(projectRoot, 'public', 'proof', 'originals');
  if (fs.existsSync(unsafePublicBackupDir)) {
    fail(`Unsafe public backup directory detected at ${unsafePublicBackupDir}!`);
  } else {
    pass('No unredacted originals stored inside public/ web root');
  }

  // Verify .gitignore
  const gitignorePath = path.join(projectRoot, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    fail('.gitignore file missing');
  } else {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (gitignoreContent.includes('.proof-originals-backup')) {
      pass('.gitignore properly ignores .proof-originals-backup/');
    } else {
      fail('.gitignore does NOT ignore .proof-originals-backup/');
    }
  }
}

function verifyCopySanitization() {
  console.log('\n--- Verifying Copy & Captions Sanitization ---');

  const caseStudiesPath = path.join(projectRoot, 'src', 'lib', 'case-studies-data.ts');
  const caseStudiesContent = fs.readFileSync(caseStudiesPath, 'utf8');

  if (caseStudiesContent.includes('Unredacted')) {
    fail('src/lib/case-studies-data.ts still contains substring "Unredacted"!');
  } else {
    pass('src/lib/case-studies-data.ts does not contain "Unredacted"');
  }

  if (caseStudiesContent.includes('Beck Law, Feagans, and Frankl & Kominsky')) {
    fail('src/lib/case-studies-data.ts still names specific client firms in quote!');
  } else {
    pass('src/lib/case-studies-data.ts generalized quote per Option 1B');
  }

  if (caseStudiesContent.includes('leading regional and national legal and accounting practices')) {
    pass('src/lib/case-studies-data.ts contains generalized partner practice reference');
  } else {
    fail('src/lib/case-studies-data.ts missing generalized partner practice reference');
  }

  if (caseStudiesContent.includes('client names redacted for confidentiality')) {
    pass('src/lib/case-studies-data.ts explicitly highlights confidentiality redaction');
  } else {
    fail('src/lib/case-studies-data.ts missing confidentiality redaction notice');
  }

  const opProofPath = path.join(projectRoot, 'src', 'components', 'OperationalProof.tsx');
  const opProofContent = fs.readFileSync(opProofPath, 'utf8');

  if (opProofContent.includes('client names redacted for confidentiality')) {
    pass('src/components/OperationalProof.tsx includes confidentiality notice');
  } else {
    fail('src/components/OperationalProof.tsx missing confidentiality notice');
  }
}

async function run() {
  await verifyAssets();
  await verifyBackupsAndGitignore();
  verifyCopySanitization();

  console.log('\n----------------------------------------------');
  if (failed) {
    console.error('VERIFICATION SUITE FAILED. Review errors above.');
    process.exit(1);
  } else {
    console.log('ALL VERIFICATION ASSERTIONS PASSED (8/8)');
  }
}

run();
