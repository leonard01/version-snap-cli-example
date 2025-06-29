const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SNAPSHOT_DIR = path.join(process.cwd(), '.snapshots');
const METADATA_FILE = path.join(SNAPSHOT_DIR, 'index.json');

function commitSnapshot(filePath, message = '') {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const hash = crypto.createHash('sha1').update(content + Date.now()).digest('hex').slice(0, 8);
  const timestamp = new Date().toISOString();
  const snapshotFile = path.join(SNAPSHOT_DIR, `${hash}.json`);

  fs.writeFileSync(snapshotFile, content);

  const metadata = fs.existsSync(METADATA_FILE)
    ? JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'))
    : [];

  metadata.push({
    id: hash,
    file: path.basename(filePath),
    message,
    timestamp,
  });

  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  console.log(`✅ Snapshot saved: ${hash}`);
}

module.exports = { commitSnapshot };
