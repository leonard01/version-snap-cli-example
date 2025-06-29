#!/usr/bin/env node

const { program } = require('commander');
const { initRepo } = require('../lib/init');
const { commitSnapshot } = require('../lib/commit');
const { listSnapshots } = require('../lib/list');
const { diffSnapshots } = require('../lib/diff');



program
  .command('init')
  .description('Initialize snapshot repository')
  .action(() => {
    initRepo();
  });

  program
  .command('commit <file>')
  .option('-m, --message <message>', 'Commit message')
  .description('Take a snapshot of the specified file')
  .action((file, options) => {
    commitSnapshot(file, options.message);
  });

  program
  .command('list')
  .description('List all saved snapshots')
  .action(() => {
    listSnapshots();
  });

  program
  .command('diff <snapshotId> [file]')
  .description('Compare a snapshot to the current file or another snapshot')
  .action((id, file) => {
    diffSnapshots(id, file);
  });



program.parse(process.argv);
