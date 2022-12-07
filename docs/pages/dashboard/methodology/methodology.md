---
layout: page
title: Test Methodology
permalink: dashboard/methodology
redirect_from: dashboard/methodology/
language: en
display-title: "true"
list: exclude
---
# Test Methodology

## Service Mesh Performance GitHub Action

Meshery is the canonical implementation of the Service Mesh Performance specification. You can choose from multiple load generators and use a highly configurable set of load profiles with variable tunable facets to run a performance test. Meshery packages all these features into an easy-to-use GitHub Action.

## Meshery SMP GitHub Action

The [Service Mesh Performance GitHub Action](https://github.com/layer5io/meshery-smp-action) is available in the GitHub Marketplace. You can create your own performance profiles to run repeatable tests with Meshery via:
- Configurable Benchmarking Test: Users can provide their own configuration, choose different service meshes and load generators.
- Scheduled Benchmarking Test: The matrix of different service meshes, load generators and configurations will be run periodically.

## Extending SMP to CNCF Community Infrastructure Lab

CNCF Community Infrastructure Lab resources is contributed and managed by [Equinix Metal](https://metal.equinix.com), a leading bare metal cloud, as part of its commitment to the cloud native and open source communities. We have extended the [Service Mesh Performance GitHub Action](https://github.com/layer5io/meshery-smp-action) to run benchmark tests with [Github self-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) in CNCF Community Infrastructure Lab, which greatly improved the flexibility and credibility of performance bencharmk tests.
 
### SMP Github Action Sequence Diagram:

<a href="/pages/dashboard/methodology/smp-action-sequence-diagram.jpg"><img src="/pages/dashboard/methodology/smp-action-sequence-diagram.jpg" width="100%" /></a>

The results from the tests are updated on the Performance Management dashboard in Meshery. To learn more about interpreting the test results, check out this guide. You can always checkout the [Meshery User Guides](https://docs.meshery.io) to dive-deep into these features.
