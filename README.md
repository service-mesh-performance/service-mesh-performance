<p style="text-align:center;" align="center">
  <img align="center" src="https://raw.githubusercontent.com/layer5io/service-mesh-performance/master/docs/assets/spec/readme/smp-dark-text-side.svg" width="55%" /></p>

<div align="center">

[![GitHub](https://img.shields.io/github/license/service-mesh-performance/service-mesh-performance.svg)](LICENSE)
[![GitHub issues by-label](https://img.shields.io/github/issues/layer5io/service-mesh-performance/help%20wanted.svg)](https://github.com/issues?utf8=✓&q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+label%3A%22help+wanted%22+")
[![Website](https://img.shields.io/website/https/layer5.io/meshery.svg)](https://smp-spec.io)
[![Twitter Follow](https://img.shields.io/twitter/follow/layer5.svg?label=Follow&style=social)](https://twitter.com/intent/follow?screen_name=smp_spec)
[![Join Slack](https://img.shields.io/badge/Slack-@layer5.svg?logo=slack)](http://slack.layer5.io)
[![CLI Best Practices](https://bestpractices.coreinfrastructure.org/projects/5054/badge)](https://bestpractices.coreinfrastructure.org/projects/5054)

</div>

<p align="center"><i>If you’re using Service Mesh Performance or if you like the project, please <a href="https://github.com/layer5io/service-mesh-performance/stargazers">★</a> star this repository to show your support! 🤩</i></p>

<p align="center">SMP Community Meetings are now merged into CNCF TAG-network Meetings on the 1st and 3rd Thursday of every month at 9 AM Pacific Time. (<a href="https://docs.google.com/document/d/18hYemFKK_PC_KbT_TDBUgb0rknOuIhikkRxer4_bv4Q/edit">Meeting Minutes</a> | <a href="https://zoom.us/my/cncftagnetwork">Zoom</a>)</p>

# [Service Mesh Performance](https://smp-spec.io) (SMP)
A common format for capturing and describing:

1. performance test configuration
1. service mesh configuration
1. environment configuration
1. workload configuration
1. performance test results

This specification is currently being advanced through the CNCF [Service Mesh WG](https://github.com/cncf/sig-network/tree/master/service-mesh-wg) and the [Meshery](https://layer5.io/meshery) project. See a [screenshot](docs/assets/spec/readme/meshery_benchmark_screen.png) of SMP's canonical implementation.

## Overview

<a href="https://docs.google.com/presentation/d/1fm7Eu1T3JSBPVmdFYyyevqQLSmAMLXqzWqC7QxTHGX8/edit#"><img src="docs/assets/spec/readme/smp-overview-slides.png" /></a>
<a href="https://docs.google.com/presentation/d/1fm7Eu1T3JSBPVmdFYyyevqQLSmAMLXqzWqC7QxTHGX8/edit#"><i>Project Overview Presentation</i></a>

<p style="clear:both;">
<h2>Implementations</h2>
The following projects or products are compatible with / have implemented SMP.

<h3><a href="https://layer5.io/meshery">Meshery</a></h3>
<a href="https://meshery.io"><img src="docs/assets/spec/readme/meshery-logo-light-text.svg"
style="margin:10px;" width="125px"
alt="Meshery - the Service Mesh Management Plane" align="left" /></a>
<a href="https://meshery.io">Meshery</a> is the multi-service mesh management plane offering lifecycle management of more types of service meshes than any other tool available today. Meshery facilitates adopting, configuring, operating and managing performance of different service meshes and incorporates the collection and display of metrics from applications running on top of any service mesh.<br /><br />

<a href="docs/assets/spec/readme/service mesh performance example.gif"><img src="docs/assets/spec/readme/service mesh performance example.gif" /></a>
See the <a href="docs/assets/spec/readme/service mesh performance result.yaml">sample results</a> file.
<hr />
<br /><br /><p align="center"><i>If you’re using Service Mesh Performance or if you like the project, please <a href="https://github.com/meshery/meshery/stargazers">★</a> star this repository to show your support! 🤩</i></p>
</p>

<p style="clear:both;">
<h2><a name="contributing"></a><a name="community"></a> <a href="http://slack.layer5.io">Community</a> and <a href="https://github.com/service-mesh-performance/service-mesh-performance/blob/master/CONTRIBUTING.md">Contributing</a></h2>
Our projects are community-built and welcome collaboration. 👍 Be sure to see the <a href="https://layer5.io/community/newcomers">Layer5 Newcomers' Guide</a> for a tour of resources available to you and jump into our <a href="http://slack.layer5.io">Slack</a>to engage! Contributors are expected to adhere to the <a href="https://github.com/cncf/foundation/blob/master/code-of-conduct.md">CNCF Code of Conduct</a>.
<br />
<a href="https://slack.meshery.io">

<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset="docs\assets\spec\readme\slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset="docs\assets\spec\readme\slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src="docs\assets\spec\readme\slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>

<a href="https://meshery.io/community"><img alt="Layer5 Service Mesh Community" src="docs/assets/spec/readme/community.svg" style="margin-right:8px;padding-top:5px;" width="140px" align="left" /></a>

<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on the <a href="https://calendar.google.com/calendar/b/1?cid=bGF5ZXI1LmlvX2VoMmFhOWRwZjFnNDBlbHZvYzc2MmpucGhzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/c/Layer5io?sub_confirmation=1">meeting recordings</a>.<br />
✔️ <em><strong>To Access Community Drive,</strong></em> fill <a href="https://docs.google.com/forms/d/e/1FAIpQLSdMLeZY6hZ46yYNkoKKV5OM-jCypjbYcqptbUNltEE73EqCjA/viewform">Community Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️ <em><strong>Browse</strong></em> the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+label%3A%22help+wanted%22+">help-wanted label</a>.
</p>

## About Layer5

[Layer5](https://layer5.io)'s cloud native application and infrastructure management software enables organizations to expect more from their infrastructure. We embrace developer-defined infrastructure. We empower engineer to change how they write applications, support operators in rethinking how they run modern infrastructure and enable product owners to regain full control over their product portfolio.

**License**

This repository and site are available as open source under the terms of the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).
