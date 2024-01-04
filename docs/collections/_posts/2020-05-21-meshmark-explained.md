---
slug: MeshMark explained
subtitle: MeshMark explained
image: /assets/img/smi-conformance.svg
alt: MeshMark explained
date: 2020-05-21 12:15:05 +0000
category: spec
author: Lee Calcote
layout: post
caption:
  title: MeshMark explained
  subtitle: Through the eyes of a consumer
  thumbnail: /assets/img/container-crane.svg
---

An introduction to MeshMark might be best explained through a simple story that we can all relate to. As a consumer, when you make a purchase, there are generically two methods by which we determine our happiness about making any given purchase.

We ask ourselves:

1. Do I feel that this widget is worth its cost to me (the sales price)? The intrinsic weight that we assign to this feeling of value; to how valuable to consider a given item is based on many factors:
    * As a detractant of the value: cost (dollars, interest on a loan, mental stress of a loan)
    * As an additive of value: feature/function (usefulness to me and relative to how great my need is for such a   widget), goodwill (to the brand), and psychology (peace of mind, social status, immediate satisfaction of purchase),

It’s in this context that we compare how this widget functionally compares to other widgets and how much it costs compared to other widgets (using the factors described in #1). When you consider this and relate it to infrastructure (when you relate it to service meshes), ask yourself, “do I feel that this network function is worth its cost to me?”. Then, the computation that you do in our heads today is again based on a set of factors:

- Criticality
     * How important is this function? How much would it cost me to get it elsewhere?
- Risk
     * Positive: how much am I leaving exposed without this service mesh feature?
     * Negative: how concerned am I that this service mesh feature will fail?


MeshMark functions as a service mesh performance index (a scale) to provide people the ability to weigh the value of their service mesh versus the overhead of their service mesh and assess whether they are getting out of the mesh what they are “paying” for in it.

The scoring system ranges from 0 to 100.

<img class="image-right" src="/assets/img/distributed-performance_green.svg">
Another aspect here is the need for distributed, multi-mesh and workload performance management. Distributed load testing offers insight into system behaviors that arguably more accurately represent real world behaviors of services under load as that load comes from any number of sources. This aim of enhancing the current load generation and analysis techniques to include distributed load testing is hoped to be achieved by the [Distributed Performance Management of Service Meshes](https://layer5.io/projects/nighthawk) project, by analyzing and working hand ii n hand with Nighthawk, a versatile HTTP load testing tool.

{% include related-discussion.html tag="SMP"%}
