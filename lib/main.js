
const fs = require('fs')
const path = require('path')

exports.transform = function (filename, update) {
    if (!fs.existsSync(filename)) {
        console.log(`${filename} does not exists`)
        process.exit(1)
    }

    const basepath = path.dirname(filename)
    const lines = fs.readFileSync(filename).toString().split(/[\n\r]/)

    let output = process.stdout.write
    let buffer = ''
    if (update) {
        output = str => buffer += str
    }

    for (let idx = 0; idx < lines.length; idx++) {
        idx += tranformLine(lines, idx, basepath, output)
    }

    if (buffer) {
        const oldname = `${basepath}/old-${path.basename(filename)}`
        fs.renameSync(filename, oldname)
        fs.writeFileSync(filename, buffer)
        fs.unlinkSync(oldname)
    }
}

function tranformLine(lines, idx, basepath, out) {
    const line = lines[idx]
    if (idx > 0) {
        out('\n')
    }
    out(line)

    const directive = line.trim().match(/^\[\/\/\]:\s*#([^\(]+)\(([^\|\)]+)(\|([^\)]+))?\)$/)
    if (directive) {
        name = directive[1]
        switch (name) {
            case 'embed-code':
                return tranformEmbedCode(directive, lines, idx, basepath, out)
        }
    }
    return 0
}

function tranformEmbedCode(directive, lines, idx, basepath, out) {
    const name = directive[2]
    const language = directive[4] || path.extname(name).replace('.', '')

    const filename = path.join(basepath, name)
    if (!fs.existsSync(filename)) {
        out('\n[//]# (file not found)')
        return 0
    }
    out('\n```' + language+'\n')
    const content = fs.readFileSync(filename).toString()
    out(content)
    out('\n```')

    // skip existing lines
    let skip = 0
    if (lines[idx + 1] && lines[idx + 1].trim().startsWith('```')) {
        skip++
        while (!lines[idx + skip + 1].trim().startsWith('```')) {
            skip++
        }
        skip++
    }
    return skip
}



