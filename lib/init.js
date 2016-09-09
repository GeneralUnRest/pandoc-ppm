/*
 * Copyright 2016 prussian <genunrest@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var yaml = require('js-yaml'),
    waterfall = require('async/waterfall'),
    stdio = require('stdio'),
    sh = require('shelljs'),
    optDoc = './pandoc-proj.yml'

module.exports = (opts, config, cb) => {
    var initDoc = {
        name: 'generic',
        type: 'pdf',
        source_files: ['*.md'],
        // { type: 'template'|'css'|'csl', 
        //   repo: 'some/repo', //(default: github)
        //   path: 'path/to/provided/template' }
        depends: [],
        buildOpts: ['--self-contained']
    }
    waterfall([
        stdio.question.bind(undefined, 'Project name (generic)'),
        (name, next) => {
            if (name && name != '') initDoc.name = name
            stdio.question('Document type (pdf)', next)
        },
        (doctype, next) => {
            if (doctype && doctype != '') initDoc.type = doctype
            stdio.question('Markdown source files (use quotes, default *.md)', next)
        },
        (source, next) => {
            source = source.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/)
            if (source.length > 0 && source[0] != '') initDoc.source_files = source
            stdio.question('Extra options (default --self-contained)', next)
        },
        (opts, next) => {
            opts = opts.split('')
            if (opts.length > 0) initDoc.buildOpts = opts
            next(null)
        }
    ], (err) => {
        sh.ShellString(yaml.safeDump(initDoc)).to(optDoc)
        cb(err)
    })
}
