---
slug: A Literature Review on Service Mesh Performance
layout: post
subtitle: Using Meshery and SMP Dashboard for Service Mesh Performance Analysis
author: The Newsroom
image: /assets/img/buttons/smp-logo/smp-new-logo.png
alt:
published: true
date: 2023-07-26 12:00:00 +0000
category: spec
caption: 
  title: 'Exploring, Analyzing and Tuning Service Mesh Performance: A Literature Review'
  subtitle: Using Meshery and SMP Dashboard for Service Mesh Performance Analysis
  thumbnail: /assets/img/blogs/service-mesh-specifications.png
---

## Abstract

With the recent advancement of software development methodologies and frameworks, service meshes has been rapidly gaining the lime light. In this paper, we provide an introduction to service meshes and discuss their key use cases in modern cloud-native architectures. We also explore the challenges associated with performance analysis of service meshes and present a survey of recent research in this area. To address these challenges, we propose the use of soft computing techniques and tools like Meshery for performance analysis of service meshes. Our study includes a comparative analysis of different service mesh platforms and their performance under varying workloads. This paper provides insights into the benefits and limitations of service meshes and highlights the importance of performance analysis in ensuring the reliability and scalability of micro-services based applications.

## Introduction

Service meshes is like a software defined network where the operators gets complete control over the different set of activities that is occurring within their application. Its a dedicated infrastructure layer that oversees service-to-service communication. It's responsible for the reliable delivery of requests through the complex topology of services that comprise a modern, cloud native application. In practice, the service mesh is typically implemented as an array of lightweight network proxies that are deployed alongside application code, without the application needing to be aware.

Each part of an app, called a “service” relies on other services to give users what they want. If a user of an online e-commerce store wants to buy groceries, they need to know if the items they want, say “tomatoes” is in stock. So, the service that communicates with the e-commerce site’s inventory database needs to communicate with the product webpage, which itself needs to communicate with the users’s online shopping cart. To add business value, the owner of the site might eventually build a new service that gives users in-app product recommendation. Now this new service should also be cognizant of user’s shopping cart, and must be able to communicate with inventory database that the product page needed—it’s a lot of reusable, moving parts.

The above definition and use case example can further be mingled with the architecture depicted in Figure 1. In most cases, a service mesh in general is known to have two types of planes: Control Plane and Data Plane. Data plane is composed of intelligent proxies that are deployed as sidecars, basically an extra container deployed under the same Pod as the application container. These proxies regulate the flow of network communication between different microservices. Non-exhaustive list of activities managed by this data plane includes service discovery, health checking, routing, load balancing, authentication/authorization, and observability. While the control plane, sometimes referred to as brain of a service mesh, manages and configure corresponding components to enforce policies and collect telemetry.
A survey of [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io) community found that 68% of the organization are already using or planning to use service meshes in the next 12 months. In production, use of service meshes has been growing 40-50% annually. Service meshes are popular because they solve critical problems related to communication between loosely coupled services (also referred as microservices), which are widely adopted by enterprise companies due to their ease of management/development for production workloads.

**Read the full article on [TechRxiv](https://www.techrxiv.org/articles/preprint/Exploring_Analyzing_and_Tuning_Service_Mesh_Performance_A_Literature_Review/22776119)**

{% include related-discussion.html tag="SMP"%}
