const { validateForm, validationPartialForm } = require('../schemas/form.schema.js');
const models = require('../models/form.models.js');
const crypto = require('node:crypto')

const controllers = {}

controllers.findForms = async (req, res) => {

    try {
        const dni = "53702804n"
        await models.createTableForms(dni)
        const { id } = req.params
        const forms = await models.findForms();
        if (id) {
            const filterForm = forms.filter(form => form.id === id)
            return res.json(filterForm);
        }
        const names = [];
        forms.forEach(form => {
            names.push({
                id: form.id,
                formname: form.formname,

            })
        })
        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los formularios' });
    }
};


controllers.createFromBBDD = async (req, res) => {
    try {
        const formValidate = await validateForm(req.body)
        if (formValidate.error) {
            return res.status(400).json({ error: JSON.parse(formValidate.error.message) })

        }
        const newForm = {
            id: crypto.randomUUID(),
            ...formValidate.data
        }
        models.createFromBBDD(newForm)
        return res.status(201).json(newForm)

    } catch (error) {
        console.log(error);
    }
}

controllers.delete = async (req, res) => {
    try {
        const id = req.params;

        if (id) {
            await models.deleteFromBBDD(id)
        }

        const forms = await models.findForms();
        return res.json(forms);
    } catch (error) {
        console.log(error);
    }
}
controllers.updateFromBBDD = async (req, res) => {
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
        await models.updateFromBBDD(updateForm)
        return res.status(200).json(updateForm)
    } catch (error) {
        console.log(error);
    }
}

module.exports = controllers;