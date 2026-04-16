# Contributing to the Service Mesh Performance Documentation

Before contributing, please review the [Documentation Contribution Flow](https://github.com/layer5io/service-mesh-performance/blob/master/CONTRIBUTING.md#documentation-contribution-flow). The following steps will guide you on how to set up your development environment, fork and clone the repository, run the site locally, and finally commit, sign-off, and push any changes made for review. 

### 1. Set up your development environment

* *The Service-Mesh-Performance Docs site is built using Jekyll - a simple static site generator! You can learn more about Jekyll and setting up your development environment in the [Jekyll Docs](https://jekyllrb.com/docs/).*

* First [install Ruby](https://jekyllrb.com/docs/installation/), then install Jekyll and Bundler.

### 2. Get the code

* Fork and then clone the [Service Mesh Performance repository](https://github.com/layer5io/service-mesh-performance)
  ```bash
  $ git clone https://github.com/YOUR-USERNAME/service-mesh-performance
  ```
* Change to the docs directory
  ```bash
  $ cd docs
  ```
* Install any Ruby dependencies
  ```bash
  $ bundle install
  ```

### 3. Serve the site

* Serve the code locally
  ```bash
  $ make site
  ```
  *Note: From the Makefile, this command is running `$ bundle exec jekyll serve --drafts --livereload`*

### 4. Create a Pull Request

* After making changes, don't forget to commit with the sign-off flag (-s)!
  ```bash
  $ commit -s -m “my commit message w/signoff”
  ```
* Once all changes have been committed, push the changes.
  ```bash
  $ git push origin <branch-name>
  ```
* Then on Github, navigate to the [Service-Mesh-Performance repository](https://github.com/layer5io/service-mesh-performance) and create a pull request from your recently pushed changes!

---
*See the [Service-Mesh-Performance Documentation Google Doc](https://docs.google.com/document/d/17guuaxb0xsfutBCzyj2CT6OZiFnMu9w4PzoILXhRXSo/edit) for additional reference.*
