# front-dlm-dni
Form generator with various types of inputs.

# Tools and Technologies
- HTML5
- Tailwind
- Tailwind CSS Animated
- JavaScript (ES++)
- Lit.js
- Vite
    
## Description and Usage
This project consists of a system that combines a backend and a frontend to manage and utilize information stored in a database. The backend provides APIs and the necessary logic to access and manipulate data in the database, while the frontend offers a user interface to interact with this data.

In the front-dlm-dni user interface, we will generate forms based on a main form. We will need to enter a name for the new form, a description, and choose the inputs it will display along with their respective names and types. Once generated, our form will appear below the main form.

The forms will be saved in an SQL database, and the necessary table is created automatically for this project. If the table already exists, it will not be duplicated. We will store the form data in this table, which will later appear in a list to which we will pass the data.

In the list of created forms, we can interact with them and update their names and descriptions. If a form is no longer needed, we simply need to press the delete button.

## Installation

1. Clone this repository: `git clone https://github.com/TopaciOicapoT/data-lean-makers.git`
2. Enter the project directory: `cd front-dlm-dni`
3. Install the dependencies: `npm install`

# Entry and Execution Command
1. `cd front-dlm-dni`
2. `npm run dev`
3. The service should run on the port http://localhost:5173