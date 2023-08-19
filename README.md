# data-lean-makers
This folder contains the front and back of the prueba-data-lean-makers project.
# Contents

1. front-dlm-dni
2. back-dlm-dni
# Tools and Technologies
- Node.Js v18
- Express
- Cors
- Dotenv
- pg
- zod
- HTML5
- Tailwind
- Tailwind CSS Animated
- JavaScript (ES++)
- Lit.js
- Vite
    
## Description and Usage

This project generates forms based on a main form. We will need to enter a name for the new form, a description, and choose the inputs it will display along with their respective names and types. Once generated, our form will appear below the main form.

The forms will be saved in an SQL database, and the necessary table is created automatically for this project. If the table already exists, it will not be duplicated. We will store the form data in this table, which will later appear in a list to which we will pass the data.

In the list of created forms, we can interact with them and update their names and descriptions. If a form is no longer needed, we simply need to press the delete button.

## Installation

1. Clone this repository: `git clone https://github.com/TopaciOicapoT/data-lean-makers.git`
2. Enter the project directory: `cd front-dlm-dni`
3. Enter the project directory: `cd back-dlm-dni`
4. Install the dependencies: `npm install`
