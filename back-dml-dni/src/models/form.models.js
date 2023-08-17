const pool = require('../database/postgresConnection.js')
const models = {}

const tableExists = async (tableName) => {
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
models.createTableForms = async (dni) => {
    try {
        (async () => {
        
            const tableName = `forms_${dni.dni}`;
            const exists = await tableExists(tableName);
        
            if (exists) {
                return 'error'
            } else {
                await pool.query(`create table forms_${dni.dni}(Id text, formName text, description text, formData JSONB)`)
            }
        
        })();
   
    } catch (error) {
        console.log(error);
        return "error";
    }
}




models.findForms = async() =>{
    try {
        const res = await pool.query('SELECT * FROM forms_53702804n')
        return res.rows;

    } catch (error) {
        console.log(error);
        return "error don't get  forms";
    }
}

models.find = ()=>{
    try {
        
    } catch (error) {
        
    }
}
models.createFromBBDD = async (newForm)=>{

    
    let listValue = [];
    const objectValues= Object.entries(newForm)
    objectValues.forEach(([key, value])=>{
        listValue.push(value)
    });
    console.log(listValue);
    const text = `INSERT INTO forms_53702804n(Id, formName, description, formData) VALUES($1, $2, $3, $4)`
    const res = await pool.query(text, listValue);
    
}
models.updateFromBBDD = async (formUpdate)=>{
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
    
    
    const res = await pool.query(text, listValue);

}
module.exports = models;