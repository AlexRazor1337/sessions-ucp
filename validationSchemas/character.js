const characterValidationSchema = {
    name: { type: 'string', min: 4, max: 32 },
    skin: { type: 'number', min: 1, max: 350, integer: true, optional: true },
    description: { type: 'string', min: 1, max: 256, optional: true },
    sex: { type: 'enum', values: ['male', 'female'] }
};

module.exports = characterValidationSchema;