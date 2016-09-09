pandoc package manager
======================

package manager for handling and building your pandoc projects.

Installing 
----------

    npm install pandoc-ppm

Usage
-----

    ppm init
    # initialize your project
    # will prompt for project name and other options
    # creates pandoc-proj.yml
    
    ppm install 
    # install all dependencies declared in your pandoc-proj.yml 
    ppm install git-repo
    # will prompt to know which files in the repo are templates

    ppm build [ build_type ]
    # will build based on type: in your pandoc-proj.yml,
    # unless you give it a second arg
