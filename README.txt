LPU SPORTS MANAGEMENT SYSTEM — COLLEGE PROJECT

FILES
1. index.html — page structure, welcome screen, forms, dropdowns and tables.
2. style.css — colors, layout, responsive design and welcome-screen styling.
3. script.js — JavaScript functions for adding, editing, deleting, displaying and saving records.

HOW TO RUN
1. Extract this ZIP file.
2. Keep index.html, style.css and script.js in the same folder.
3. Double-click index.html to open the project in Chrome or another browser.

FEATURES
- Separate welcome screen and dashboard.
- Athlete and coach records with sample data.
- Dynamic sport dropdowns. Add a sport in Sports & Grounds and it appears in the relevant dropdowns.
- Dynamic coach dropdowns in Batch Allocation and Training Schedule.
- Dynamic ground/court dropdown in Training Schedule.
- Add and remove sports and grounds.
- Sample batch allocations with Edit and Delete actions.
- Sample weekly training sessions with coach and ground details, plus Edit and Delete actions.
- Sample performance records and the ability to add/delete scores.
- Attendance records.
- Browser LocalStorage keeps changes after refreshing the same browser on the same device.

IMPORTANT
This is a frontend demonstration for a college HTML/CSS/JavaScript project. LocalStorage is browser-specific; it does not sync records between different computers or users. To reset the demo data, clear this site's LocalStorage in browser developer tools.

VIVA / TEACHER EXPLANATION
- HTML creates the structure: headings, forms, dropdowns, buttons and tables.
- CSS controls the appearance: colors, spacing, responsive layout, hover effects and welcome screen.
- JavaScript handles actions such as adding, editing and deleting records.
- Arrays hold multiple records, and push() adds new records while splice() removes them.
- getElementById() selects elements by their IDs.
- fillSelect() creates dropdown options from the sports, coaches, grounds or athlete arrays.
- refreshDropdowns() repopulates dropdowns whenever a coach, sport, ground or athlete is added/removed.
- JSON.stringify() converts arrays into text and JSON.parse() reads the saved data back.
- LocalStorage saves the data in the browser.
