# WebXR Tools
We have developed a regulatory science tool that enables the measurement of head-mounted display (HMD) quality by creating customized scenes and patterns. This tool in particular provides an easy way to display scenes on multiple headsets so that users can assess and compare image quality. This is accomplished through the use of known standardized patterns like the grille or dot array and simple entities like circles, rectangles, or triangles. This flexibility allows for the conduction of targeted examinations of specific display characteristics. For instance, users can create and share packages that are designed to assess display resolution, chromatic aberrations, color mapping, and other spatiotemporal effects. This tool also addresses the issue of pattern portability. Currently, HMDs are very heterogeneous, making it difficult to deploy the same pattern to multiple headsets. This barrier often comes up in standards meetings as an impeding force on the development and validation of different HMDs. In short, this tool provides scientists, medical device manufacturers, and regulators access to a centralized scene to test various display devices and provide reports that are easier to understand and, most importantly, replicate.

The Pattern Creation Tool consists of a user interface built using A-Frame, Three.js, and WebXR for the easy creation of image quality test patterns. It is housed on a website that can be accessed on any WebXR-compatible device with internet access. Created test patterns and collections of scenes can be downloaded and shared as JSON files. This feature enables users to easily create and share patterns, allowing the testing of the same scene on multiple devices. All uploaded patterns remain fully editable, allowing users to make necessary changes to patterns that are shared with them. Additionally, test patterns can be saved in groups or scenes to allow for testing multiple different patterns or variations of a pattern.

The tool is available here: [Custom Pattern Creator tool](https://didsr.github.io/WebXR-tools/Custom/)

Documentation for the tool is available here: [Custom Pattern Creator tool](https://didsr.github.io/WebXR-tools/Custom/doc)


## Custom Pattern Creator

![plot](Images/patternGenerator.PNG)

## Local Installation

To install and use this tool locally, download the contents of the package from github and run index.html. If the tool is being run without connection to the internet, the link based sharing will not work. Instead, opt to manually download and upload files.

