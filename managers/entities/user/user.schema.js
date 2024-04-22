

module.exports = {
    createUser: [
        {
            model: 'username',
            required: true,
            path: 'username',
            label: 'username'
        },
        {
            model: 'email',
            required: true,
            path: 'email',
            label: 'email'
        },
        {
            model: 'password',
            required: true,
            path: 'password',
            label: 'password'
        }, 
        {
            model: 'role',
            required: true,
            path: 'role',
            label: 'role'
        },
    ],
}


