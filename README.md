# Quake Viewer

A quick Proof-of-Concept app for visualizing earthquake data from the USGS catalogue in 3D

Check out the live demo: https://code-with-blanc.github.io/quake-viewer/

It uses React, Redux and Three.js

I may revisit this project in the future as there are so many possible improvements:

- Use (or implement!) an API that provides data for M < 4.0 quakes
- Use a map projection instead of naively using latitude and longitude as xy coordinates
- Display more detailed earthquake data
- Make the color coding of earhquakes user-controllable (ex: color by time instead of magnitude)
- Improve performance when adjusting the timeline slider
- Show markers for cities and volcanoes

In coding this project I realized that three.js could have better support for GeoJson data.
Creating a robust solution and publishing it as a package may be a good idea for when I revisit this project.

### The code is not great

This was a PoC, the point here was not to build an enterprise grade system but to try out some ideas. So... yes, the code has no tests, eslint violations, there are some different react/redux patterns mixed together, etc.

I do hope it is organized and legible enough if anyone is interested.
