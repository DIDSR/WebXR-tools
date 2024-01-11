---
title: 'Open-Source Pattern Creation Tool for Medical Extended Reality Image Quality Assessment'
tags:
  - Javascript
  - HTML
  - CSS
  - WebXR
  - A-Frame
  - Virtual Reality
  - VR
  - Image Quality
  - Pattern Creation
authors:
  - name: Brendan Collins
    orcid: 0000-0002-1529-5900
    affiliation: "1, 2, 3"
  - name: Ryan Beams
    orcid: 0000-0003-2592-6064
    affiliation: 1
  - name: Miguel Lago
    orcid: 0000-0002-7829-9570
    affiliation: 1
affiliations:
 - name: Center for Devices and Radiological Health, U.S. Food and Drug Administration
   index: 1
 - name: ORISE Fellow, Oak Ridge Institute for Science and Research
   index: 2
 - name: Department of Computer Science, University of Maryland - College Park
   index: 3
date: 11 August 2023
bibliography: paper.bib

---

# Summary

The potential for extended reality devices in medicine has recently grown. In order to approve these devices for medical use, they must be evaluated on many characteristics to ensure safety and effectiveness. One of the most important evaluations is the quality of the device’s display, known as image quality, especially for medical applications [@Zhao:2023]. The image quality evaluation of virtual and augmented reality devices requires the creation of a variety of different test patterns. These test patterns consist of many different shapes that must frequently change their location, size, or color in order to adapt to the many headsets in the market [@Beams:2020] [@Zhao:2023]. The Pattern Creation Tool allows for the creation, editing, and sharing of patterns that work in a mixed reality environment. The Pattern Creation Tool includes multiple default patterns that are commonly used in image quality evaluation. These include a pattern for finding the center of the device’s display, a pattern to measure geometric distortion, a pattern to measure Michelson contrast, and a pattern to measure line spread. These patterns can make simple testing easier as well as serve as a template for other patterns.

# Statement of need

We have developed a regulatory science tool that enables the measurement of head-mounted display (HMD) quality by creating customized scenes and patterns. This tool in particular provides an easy way to display scenes on multiple headsets so that users can assess and compare image quality. This is accomplished through the use of known standardized patterns like the grille or dot array and simple entities like circles, rectangles, or triangles. Figure 1 demonstrates how to edit a pattern containing multiple of these entities. This flexibility allows for the conduction of targeted examinations of specific display characteristics. For instance, users can create and share packages that are designed to assess display resolution, chromatic aberrations, color mapping, and other spatiotemporal effects. This tool also addresses the issue of pattern portability. Currently, HMDs are very heterogeneous, making it difficult to deploy the same pattern to multiple headsets. This barrier often comes up in standards meetings as an impeding force on the development and validation of different HMDs. In short, this tool provides scientists, medical device manufacturers, and regulators access to a centralized scene to test various display devices and provide reports that are easier to understand and, most importantly, replicate.

The Pattern Creation Tool consists of a user interface built using A-Frame [@AFrame], Three.js [@Three.js], and WebXR [@WebXR] for the easy creation of image quality test patterns. It is housed on a website that can be accessed on any WebXR-compatible device with internet access. Created test patterns and collections of scenes can be downloaded and shared as JSON files. This feature enables users to easily create and share patterns, allowing the testing of the same scene on multiple devices. All uploaded patterns remain fully editable, allowing users to make necessary changes to patterns that are shared with them. Additionally, test patterns can be saved in groups or scenes to allow for testing multiple different patterns or variations of a pattern. Figure 2 shows the display of a pattern that contains uploaded image textures.

Traditionally, most extended reality development is done using video game engines such as Unity or Unreal Engine. These game engines have steep learning curves, need programming skills, and are also heterogeneous. As a result, it can be cumbersome to generate simple patterns for a wide variety of devices in a timely manner. The Pattern Creation Tool simplifies this process by creating a user interface to handle pattern creation (add entities, upload textures, etc.). This mitigates programming experience as a limiting factor. A second issue present with game engines like Unity and Unreal Engine is that it can be difficult to run projects on different devices. This is because device compatibility for extended reality devices is not standardized yet, so different devices may or may not be compatible on different platforms. The Pattern Creation Tool is available on the internet, so any device that is compatible with WebXR will be able to access the tool. This includes Oculus/Meta devices and Microsoft Extended Reality devices. This tool utilizes WebXR and A-Frame to ensure consistent and reliable results across devices. Lastly, game engines are usually not open source, which might cause further hurdles for research. Both WebXR and the Pattern Creation Tool are open-source and easy to use in research projects. The Pattern Creation tool has been used in a scientific publication, where the generated patterns aided the creation of a new methodology for the Image Quality analysis of virtual reality head-mounted displays [@Beams:2022].

# Figures

![Editing a Pattern](./Images/Fig1a.png){ width=75% }  


![Displaying a customized pattern](./Images/Fig1b.png){ width=75% }  


# Acknowledgements

Brendan Collins was supported by an appointment to the Research Participation Program at the Center for Devices and Radiological Health administered by the Oak Ridge Institute for Science and Education through an interagency agreement between the U.S. Department of Energy and the U.S. Food and Drug Administration. 

# Disclaimer
The mention of commercial products, their resources, or their use in connection with material reported herein is not to be construed as either an actual or implied endorsement of such products by the Department of Health and Human Services. This is a contribution of the U.S. Food and Drug Administration and not subject to copyright.

# References
