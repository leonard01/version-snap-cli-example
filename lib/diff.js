const fs = require('fs');
const path = require('path');
const { diffLines } = require('diff');

const SNAPSHOT_DIR = path.join(process.cwd(), '.snapshots');

function getSnapshotPath(id) {
  return path.join(SNAPSHOT_DIR, `${id}.json`);
}

function diffSnapshots(id, currentFilePath = null) {
  const snapshotPath = getSnapshotPath(id);

  if (!fs.existsSync(snapshotPath)) {
    console.error(`❌ Snapshot not found: ${id}`);
    process.exit(1);
  }

  const snapshotContent = fs.readFileSync(snapshotPath, 'utf8');
  const currentContent = currentFilePath
    ? fs.readFileSync(currentFilePath, 'utf8')
    : fs.readFileSync(snapshotPath, 'utf8'); // fallback to same if none given

  const diff = diffLines(snapshotContent, currentContent);

  diff.forEach(part => {
    const color = part.added ? '\x1b[32m' : part.removed ? '\x1b[31m' : '\x1b[0m';
    process.stdout.write(color + part.value + '\x1b[0m');
  });
}
module.exports = { diffSnapshots };
