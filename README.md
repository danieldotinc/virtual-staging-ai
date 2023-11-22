## Virtual Staging AI

Furnish empty apartment pictures with AI.

[Demo](https://virtual-staging-ai-three.vercel.app/dashboard)

#### Implemented Features:

- Two separate section for Properties and All Photos
- Create a property while uploading photos for that property
- Upload photos without the need to create a property
- Drag and drop photos to the browser window
- Assign ungrouped photos to existing properties (just click on them for selecting. Need to create a property first)
- See all photos related to a property by clicking on the property
- Mobile view + Desktop view
- Tech Stack: Next.js + Tailwind + Firebase storage & database

#### What other features may I add if I have some extra time?

- add image carousel for each property item on dashboard for previewing all the images
- allow archiving already assigned images or properties for cleaner dashboard
- introduce progress bar for uploading
- loading animation for different pages
- dropping unnecessary fields while creating a property
- depending on the average number of photos that someone uploads, we may need a search bar
- iterate over the design to achieve better utility and experience (the current design was result of less than an hour thinking)

#### What would I do differently technically with extra time?

- adjust more components to achieve more server side rendering
- introduce a global state to avoid all the prop-drilling you see in the code
- refactor dashboard component for readability
- introduce repository and services layers for all the external communications
- add unit and end-to-end tests

#### Sneak peek?

![Preview 1](/public/buildings/demo-1.png)
![Preview 2](/public/buildings/demo-2.png)
![Preview 3](/public/buildings/demo-3.png)
![Preview 4](/public/buildings/demo-4.png)
