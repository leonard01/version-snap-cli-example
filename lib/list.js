const fs = require('fs');
const path = require('path');

const METADATA_FILE = path.join(process.cwd(), '.snapshots', 'index.json');

function listSnapshots() {
  if (!fs.existsSync(METADATA_FILE)) {
    console.log('❌ No snapshot repository found. Run `vcs init` first.');
    process.exit(1);
  }

  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));

  if (metadata.length === 0) {
    console.log('📭 No snapshots found.');
    return;
  }

  console.log('📝 Snapshots:');
  metadata.forEach((entry, idx) => {
    console.log(`${idx + 1}. [${entry.id}] ${entry.file} - ${entry.message || '(no message)'} @ ${entry.timestamp}`);
  });
}

module.exports = { listSnapshots };
