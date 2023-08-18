const z = require('zod');
const formSchema = z.object({
    formname: z.string({ requiere_error: 'Form name must be a string' }),
    description: z.string({ requiere_error: 'Form description must be a string' }),
    formdata: z.record(z.unknown())
})

function validateForm(object) {
    return formSchema.safeParseAsync(object)
}


function validationPartialForm(object) {
    return formSchema.partial().safeParseAsync(object)
}


module.exports = {
    validateForm,
    validationPartialForm
}