const fs = require('fs');
const path = require('path');

const SNAPSHOT_DIR = path.join(process.cwd(), '.snapshots');
const METADATA_FILE = path.join(SNAPSHOT_DIR, 'index.json');

function initRepo() {
  if (!fs.existsSync(SNAPSHOT_DIR)) {
    fs.mkdirSync(SNAPSHOT_DIR);
    fs.writeFileSync(METADATA_FILE, JSON.stringify([], null, 2));
    console.log('✅ Snapshot repo initialized.');
  } else {
    console.log('⚠️ Snapshot repo already initialized.');
  }
}

module.exports = { initRepo };
