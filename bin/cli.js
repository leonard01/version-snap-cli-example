#!/usr/bin/env node

const { program } = require('commander');
const { initRepo } = require('../lib/init');

program
  .command('init')
  .description('Initialize snapshot repository')
  .action(() => {
    initRepo();
  });

program.parse(process.argv);
