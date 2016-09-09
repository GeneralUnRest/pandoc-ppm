pandoc package manager
======================

package manager for handling and building your pandoc projects.

Usage
-----

    # initialize your project
    ppm.js init
    # will prompt for project name and other options
    # creates pandoc-proj.yml
    
    ppm.js install 
    # install all dependencies declared in your pandoc-proj.yml 
    ppm.js install git-repo
    # will prompt to know which files in the repo are templates

    ppm.js build [ build_type ]
    # will build based on type: in your pandoc-proj.yml,
    # unless you give it a second arg
