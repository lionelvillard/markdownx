#!/usr/bin/env node
const minimist = require('minimist') 
const processor = require('../lib/main') 

const argv = minimist(process.argv.slice(2), {
    boolean: ['u'],
})

if (argv._.length !== 1) {
    console.log('usage: markdownx [-u] file.md')
    console.log('-u   update file.md')
    process.exit(1)
}

processor.transform(argv._[0], argv.u)


