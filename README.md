# WebXR Tools
We have developed a regulatory science tool that enables the measurement of head-mounted display (HMD) quality by creating customized scenes and patterns. This tool in particular provides an easy way to display scenes on multiple headsets so that users can assess and compare image quality. This is accomplished through the use of known standardized patterns like the grille or dot array and simple entities like circles, rectangles, or triangles. This flexibility allows for the conduction of targeted examinations of specific display characteristics. For instance, users can create and share packages that are designed to assess display resolution, chromatic aberrations, color mapping, and other spatiotemporal effects. This tool also addresses the issue of pattern portability. Currently, HMDs are very heterogeneous, making it difficult to deploy the same pattern to multiple headsets. This barrier often comes up in standards meetings as an impeding force on the development and validation of different HMDs. In short, this tool provides scientists, medical device manufacturers, and regulators access to a centralized scene to test various display devices and provide reports that are easier to understand and, most importantly, replicate.

The Pattern Creation Tool consists of a user interface built using A-Frame, Three.js, and WebXR for the easy creation of image quality test patterns. It is housed on a website that can be accessed on any WebXR-compatible device with internet access. Created test patterns and collections of scenes can be downloaded and shared as JSON files. This feature enables users to easily create and share patterns, allowing the testing of the same scene on multiple devices. All uploaded patterns remain fully editable, allowing users to make necessary changes to patterns that are shared with them. Additionally, test patterns can be saved in groups or scenes to allow for testing multiple different patterns or variations of a pattern.

The tool is available here: [Custom Pattern Creator tool](https://didsr.github.io/WebXR-tools/Custom/)

Documentation for the tool is available here: [Custom Pattern Creator tool](https://didsr.github.io/WebXR-tools/Custom/doc)

## Regulatory Science Tool (RST) Reference
* RST Reference Number: RST24MX01.01
* Date of Publication: January, 2024
* Recommended Citation: U.S. Food and Drug Administration (2024). _Toolkit for Evaluation of Head Mounted Display Image Quality_ (RST24MX01.01). [https://cdrh-rst.fda.gov/toolkit-evaluation-head-mounted-display-image-quality](https://cdrh-rst.fda.gov/toolkit-evaluation-head-mounted-display-image-quality)

## For More Information:
* [Catalog of Regulatory Science Tools to Help Assess New Medical Devices](https://www.fda.gov/medical-devices/science-and-research-medical-devices/catalog-regulatory-science-tools-help-assess-new-medical-devices) 

####
**Disclaimer**
<br>

***About the Catalog of Regulatory Science Tools*** 
<br>
<sub>
The enclosed tool is part of the Catalog of Regulatory Science Tools, which provides a peer-reviewed resource for stakeholders to use where standards and qualified Medical Device Development Tools (MDDTs) do not yet exist. These tools do not replace FDA-recognized standards or MDDTs. This catalog collates a variety of regulatory science tools that the FDA's Center for Devices and Radiological Health's (CDRH) Office of Science and Engineering Labs (OSEL) developed. These tools use the most innovative science to support medical device development and patient access to safe and effective medical devices. If you are considering using a tool from this catalog in your marketing submissions, note that these tools have not been qualified as [Medical Device Development Tools](https://www.fda.gov/medical-devices/medical-device-development-tools-mddt) and the FDA has not evaluated the suitability of these tools within any specific context of use. You may [request feedback or meetings for medical device submissions](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/requests-feedback-and-meetings-medical-device-submissions-q-submission-program) as part of the Q-Submission Program. 
</sub>
<br><br>
<sub>
For more information about the Catalog of Regulatory Science Tools, email OSEL_CDRH@fda.hhs.gov.  
</sub>
<br><br>
<sub>
This software and documentation (the "Software") were developed at the Food and Drug Administration (FDA) by employees of the Federal Government in the course of their
official duties. Pursuant to Title 17, Section 105 of the United States Code, this work is not subject to copyright protection and is in the public domain. Permission
is hereby granted, free of charge, to any person obtaining a copy of the Software, to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of the Software or derivatives, and to permit persons to whom the Software is furnished to
do so. FDA assumes no responsibility whatsoever for use by other parties of the Software, its source code, documentation or compiled executables, and makes no
guarantees, expressed or implied, about its quality, reliability, or any other characteristic. Further, use of this code in no way implies endorsement by the FDA or
confers any advantage in regulatory decisions. Although this software can be redistributed and/or modified freely, we ask that any derivative works bear some notice
that they are derived from it, and any modified versions bear some notice that they have been modified.
</sub>

## Custom Pattern Creator

![plot](Images/patternGenerator.PNG)

## Local Installation

To install and use this tool locally, download the contents of the package from github and run index.html. If the tool is being run without connection to the internet, the link based sharing will not work. Instead, opt to manually download and upload files.

