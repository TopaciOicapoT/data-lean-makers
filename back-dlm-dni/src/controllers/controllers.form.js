const { validateForm, validationPartialForm } = require('../schemas/form.schema.js');
const models = require('../models/form.models.js');
const crypto = require('node:crypto')

const controllers = {}

controllers.findForms = async (req, res) => {

    try {
        const dni = "53702804n"
        await models.createTableForms(dni)
        await models.createTableInputs();
        const { id } = req.params
        const forms = await models.findForms();

        if (id) {
            const filterForm = forms.filter(form => form.id === id)
            return res.json(filterForm);
        }

        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving the forms.' });
    }
};
// Find inputs
controllers.findInputsValues = async (req, res) => {
    
    try {
        await models.createTableInputs();
        const { id } = req.params;
        const inputsValues = await models.findInputsValues();
        if (id) {
            const filterInputsValues = inputsValues.filter(input => input.id === id)
            return res.json(filterInputsValues);
        }
        
        res.json(inputsValues);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving the data.' });
    }
};


controllers.createNewForm = async (req, res) => {
    try {
        const formValidate = await validateForm(req.body)
        if (formValidate.error) {
            return res.status(400).json({ error: JSON.parse(formValidate.error.message) })

        }
        
        const newForm = {
            id: crypto.randomUUID(),
            ...formValidate.data
        }
        models.createNewForm(newForm)
        return res.status(201).json(newForm)
        
    } catch (error) {
        
        return res.status(404).json({error:'error'})
    }
}
// Create new input Value
controllers.createNewInputValue = async (req, res) => {
    try {
        const newInput = await req.body
        
        models.createNewInputValue(newInput)
        return res.status(201).json(newInput)
        
    } catch (error) {
        return res.status(404).json({error:'error'})
        
    }
}

controllers.delete = async (req, res) => {
    try {
        const id = req.params;

        if (id) {
            await models.deleteFromBBDD(id)
            await models.deleteRegisterInputs(id)
        }

        const forms = await models.findForms();
        return res.json(forms);
    } catch (error) {
        console.log(error);
    }
}
controllers.updateForm = async (req, res) => {
    try {
        const result = await validationPartialForm(req.body);
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(clientData.error.message) })

        }
        const forms = await models.findForms();
        const { id } = req.params;
        const form = forms.find(form => form.id === id)
        console.log(form);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        };
        const updateForm = {
            ...form,
            ...result.data
        }
        await models.updateForm(updateForm)
        return res.status(200).json(updateForm)
    } catch (error) {
        console.log(error);
    }
}

module.exports = controllers;