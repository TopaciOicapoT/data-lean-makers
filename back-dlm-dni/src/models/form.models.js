const pool = require('../database/postgresConnection.js')
const models = {}

// Check table forms_53702804n data exist
const tableDniExists = async (tableName) => {
    const query = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = $1
        );
    `;

    const result = await pool.query(query, [tableName]);
    return result.rows[0].exists;
};
// Create table forms_53702804n
models.createTableForms = async (name) => {
    try {
        (async () => {
            const tableName = `forms_${name}`;
            const exists = await tableDniExists(tableName);
            
            if (exists) {
                return 'error'
            } else {
                await pool.query(`create table forms_${name}(Id text, formName text, description text, formData JSONB)`)
            }
        
        })();
   
    } catch (error) {
        console.log(error);
        return "error";
    }
}
// Check table inputs_53702804n exist
const tableInputsExists = async (tableName) => {
    const query = `
    SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = $1
        );
        `;
        
        const result = await pool.query(query, [tableName]);
        return result.rows[0].exists;
    };
 // Create table inputs_53702804n
models.createTableInputs = async () => {
    try {
        (async () => {
            const tableName = 'inputs_53702804n';
            const exists = await tableInputsExists(tableName);
            
            if (exists) {
                return 'error'
            } else {
                await pool.query(`create table ${tableName}(Id text, values JSONB)`)
            }
        
        })();
   
    } catch (error) {
        console.log(error);
        return "error";
    }
}



// Find all forms
models.findForms = async() =>{
    try {
        const res = await pool.query('SELECT * FROM forms_53702804n')
        return res.rows;

    } catch (error) {
        console.log(error);
        return "error don't get  forms";
    }
}
// Find all inputs values
models.findInputsValues = async() =>{
    try {
        const res = await pool.query('SELECT * FROM inputs_53702804n')
        return res.rows;

    } catch (error) {
        console.log(error);
        return "error don't get data";
    }
}
// Create new form
models.createNewForm = async (newForm)=>{
    
    let listValue = [];
    const objectValues= Object.entries(newForm)
    objectValues.forEach(([key, value])=>{
        listValue.push(value)
    });
    
    console.log(newForm);
    const text = `INSERT INTO forms_53702804n(Id, formName, description, formData) VALUES($1, $2, $3, $4)`
    
    const res = await pool.query(text, listValue);
    
}
// Create new inputs Value
models.createNewInputValue = async (inputValues)=>{

    let listValue = [];
    const objectValues= Object.entries(inputValues)
    objectValues.forEach(([key, value])=>{
        listValue.push(value)
    });
    
    console.log(inputValues);
    const text = `INSERT INTO inputs_53702804n(Id, values) VALUES($1, $2)`

    const res = await pool.query(text, listValue);
    
}
// Update form
models.updateForm = async (formUpdate)=>{
    let listValue = [];
    const objectValues= Object.entries(formUpdate)
    objectValues.forEach(([key, value])=>{
        listValue.push(value)
    });
    const text = `UPDATE forms_53702804n SET formName = $2, description = $3, formData = $4 WHERE Id = $1`;
    const res = await pool.query(text, listValue)
    console.log(res);
}
models.deleteFromBBDD = async (formId)=>{
    let listValue = [];
    listValue.push(formId.id)
    const text = 'DELETE FROM forms_53702804n WHERE id = $1'
    
    console.log(formId.id);
    const res = await pool.query(text, listValue);

}
models.deleteRegisterInputs = async (Id)=>{
    let listValue = [];
    listValue.push(Id.id)
    const text = 'DELETE FROM inputs_53702804n WHERE id = $1'
    
    console.log(Id.id);
    const res = await pool.query(text, listValue);

}
module.exports = models;