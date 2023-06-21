module.exports = {
    username: { type: 'string', min: 6, max: 32 },
    email: { type: 'email' },
    password: { type: 'string', min: 6, max: 64},
    password_confirmation: {
        type: 'string', custom: (value, errors, schema, name, parent) => {
            if (parent.data.password !== value) return [{ type: 'passConfirm' }];
            return value;
        },
        messages: {
            passConfirm: 'Passwords must match!'
        }
    }
};