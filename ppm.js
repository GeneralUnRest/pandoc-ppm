#!/usr/bin/env node
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
    stdio = require('stdio'),
    sh = require('shelljs')

var die = (msg) => {
    sh.echo(msg)
    sh.exit(1)
}

var usage = () => {
    die('no usage yet')
}

var actions = { 
    init: require('./lib/init'),
    install: require('./lib/install'),
    build:  require('./lib/build')
}

var opts = stdio.getopt({
    template: { key: 't', args: 1 },
    css: { key: 'c', args: 1 },
    csl: { key: 's', args: 1 },
    _meta_: { minArgs: 1 }
})

try {
    var config = yaml.safeLoad(sh.cat('./pandoc-proj.yml'))
} catch (e) {
    die(e)
}

if (!actions[opts.args[0]]) usage()
actions[opts.args[0]](opts, config, (err) => {
    if (err) die(err)
})
