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

var spawn = require('child_process').spawn,
    defaultGit = 'https://github.com',
    defaultRepo = 'pandoc_modules',
    each = require('async/each'),
    sh = require('shelljs')

var spawnGit = (args, next) => {
    var err = '',
        out = '',
        cmd = spawn('git', args)

    cmd.stdout.on('data', (data) => {
        out += data
    })

    cmd.stderr.on('data', (data) => {
        err += data
    })

    cmd.on('close', (code) => {
        // clearTimeout(timeout)
        if (code > 0) err += ` - nonzero exit code (${code})`
        else err = null
        next(err)
    })
}

var fetchDeps = (config, next) => {
    each(config.depends, (dep, cb) => {
        if (!/^https?:\/\//.test(dep))
            dep = `${defaultGit}/${dep}`  
        var project_name = dep.split('/').slice(-1)
        spawnGit([ 'clone', dep,
            `${defaultRepo}/${project_name}`
        ], cb)
    }, next)
} 

module.exports = (opts, config, next) => {
    // get all deps
    if (!opts.args[1]) return fetchDeps(config)

    config.depends.push(opts.args[1])
    if (!sh.which('git')) return next('no git binary')
    if (!/^https?:\/\//.test(opts.args[1]))
        opts.args[1] = `${defaultGit}/${opts.args[1]}`  
    
    var project_name = opts.args[1].split('/').slice(-1)
    spawnGit([ 'clone', opts.args[1], 
        `${defaultRepo}/${project_name}`
    ], (err) => next(err, null, config))
}
