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

var waterfall = require('async/waterfall'),
    stdio = require('stdio')

module.exports = (opts, config, next) => {
    config = {
        name: 'generic',
        type: 'html',
        source_files: ['*.md'],
        // repo path
        // until projects include
        // a document that describe what it
        // provides...
        depends: [],
        // dependencies of type 
        // filter aren't registered here
        filters: [],
        buildOpts: ['--self-contained']
    }

    if (opts.silent) return next(null, 0, config)
    waterfall([
        stdio.question.bind(undefined, 'Project name (generic)'),
        (name, cb) => {
            if (name && name != '') config.name = name
            stdio.question('Document type (html)', cb)
        },
        (doctype, cb) => {
            if (doctype && doctype != '') config.type = doctype
            stdio.question('Markdown source files (use quotes, default *.md)', cb)
        },
        (source, cb) => {
            source = source.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/)
            if (source.length > 0 && source[0] != '') config.source_files = source
            stdio.question('Filters (e.g. pandoc-citeproc)', cb)
        },
        (filters, cb) => {
            filters = filters.split(' ')
            if (filters.length > 0) config.filters = filters
            stdio.question('Extra options (default --self-contained)', cb)
        },
        (opts, cb) => {
            opts = opts.split(' ')
            if (opts.length > 0) config.buildOpts = opts
            cb(null)
        }
    ], (err) => next(err, 0, config))
}
