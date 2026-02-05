The application is built in TypeScript and runs on Node.js

Try command: npm install <-- to get all dependecies, etc.

Try tu run the .ts files in terminal: npx tsc --watch  


Its layout is divided into three main sections that work together to create an interactive drawing environment.

On the left side, the control panel allows the user to choose a shape type, adjust its size, and pick a color. 
This panel also includes a button for action to draw a new shape to the canvas.

The status panel displays real‑time information about the system, including whether the pointer is on the canvas, the canvas dimensions, the window size, and the current pointer coordinates. 
This helps monitor how the interface behaves during interaction.

On the right side, the canvas is the area where shapes are drawn. 
Each shape is created based on the selected settings and can be moved around afterward. 
A hit‑testing system identifies which shape is under the cursor, and the overlap logic detects when shapes collide or intersect while being dragged.
