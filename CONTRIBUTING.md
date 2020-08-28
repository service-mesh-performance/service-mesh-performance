# <a name="contributing">Contributing Overview</a>
Please do! Thanks for your help improving the project! :balloon:

All contributors are welcome. Please see the [newcomers welcome guide](https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit) for how, where, and why to contribute. This project is community-built and welcomes collaboration. Contributors are expected to adhere to our [Code of Conduct](.CODE_OF_CONDUCT.md).

Grab an open issue with the [help-wanted label](../../labels/help%20wanted) and jump in. Join the [Slack account](http://slack.layer5.io) and engage in conversation. Create a [new issue](/../../issues/new/choose) if needed.  All [pull requests](/../../pulls) should reference an open [issue](/../../issues). Include keywords in your pull request descriptions, as well as commit messages, to [automatically close issues in GitHub](https://help.github.com/en/github/managing-your-work-on-github/closing-issues-using-keywords).

# <a name="contributing">General Contribution Flow</a>

To contribute to Service Mesh Performance, please follow the fork-and-pull request workflow described [here](CONTRIBUTING-gitflow.md).

## <a name="commit-signing">Signing-off on Commits (Developer Certificate of Origin)</a>

To contribute to this project, you must agree to the Developer Certificate of
Origin (DCO) for each commit you make. The DCO is a simple statement that you,
as a contributor, have the legal right to make the contribution.

See the [DCO](https://developercertificate.org) file for the full text of what you must agree to
and how it works [here](https://github.com/probot/dco#how-it-works).
To signify that you agree to the DCO for contributions, you simply add a line to each of your
git commit messages:

```
Signed-off-by: Jane Smith <jane.smith@example.com>
```

In most cases, you can add this signoff to your commit automatically with the
`-s` or `--signoff` flag to `git commit`. You must use your real name and a reachable email
address (sorry, no pseudonyms or anonymous contributions). An example of signing off on a commit:
```
$ commit -s -m “my commit message w/signoff”
```

To ensure all your commits are signed, you may choose to add this alias to your global ```.gitconfig```:

*~/.gitconfig*
```
[alias]
  amend = commit -s --amend
  cm = commit -s -m
  commit = commit -s
```
Or you may configure your IDE, for example, Visual Studio Code to automatically sign-off commits for you:

<a href="https://user-images.githubusercontent.com/7570704/64490167-98906400-d25a-11e9-8b8a-5f465b854d49.png" ><img src="https://user-images.githubusercontent.com/7570704/64490167-98906400-d25a-11e9-8b8a-5f465b854d49.png" width="50%"><a>

### Set up your development environment

Note: Windows users can run Jekyll by following the [Windows Installation Guide,](https://jekyllrb.com/docs/installation/windows/) for Jekyll. This includes installing the Ruby Version Manager [RVM](https://rvm.io) - a command-line tool that allows you to easily install, manage, and work with multiple ruby environments on your local machine. 
 Alternatively, if you are running Windows 10, you may install the Windows Subsystem for Linux:
-  [WSL1](https://docs.microsoft.com/en-us/windows/wsl/install-win10)  for Windows build version 1607 or higher.
-  [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2) for Windows build version 1903 or higher.
After successfully installation, proceed with the following [steps](https://jekyllrb.com/docs/installation/windows/#installation-via-bash-on-windows-10) to run Jekyll on WSL.


## <a name="contributing-docs">Documentation Contribution Flow</a>
Please contribute! All projects under Layer5 use GitHub Pages to host its documentation. Learn more about [Layer5's documentation framework](https://docs.google.com/document/d/17guuaxb0xsfutBCzyj2CT6OZiFnMu9w4PzoILXhRXSo/edit?usp=sharing). The process of contributing follows this flow:

1. Create a fork, if you have not already, by following the steps described [here](./CONTRIBUTING-gitflow.md)
1. In the local copy of your fork, navigate to the docs folder.
`cd docs`
1. Create and checkout a new branch to make changes within
`git checkout -b <my-changes>`
1. Edit/add documentation.
`vi <specific page>.md`
1. Run site locally to preview changes.
`make site`
1. Commit, [sign-off](#commit-signing), and push changes to your remote branch.
`git push origin <my-changes>`
1. Open a pull request (in your web browser) against our main repo: https://github.com/layer5io/service-mesh-performance.
