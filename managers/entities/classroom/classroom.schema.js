

module.exports = {
    create: [
        {
            model: 'name',
            required: true,
            path: 'name',
            label: 'name'
        },
        {
            model: 'capacity',
            required: true,
            path: 'capacity',
            label: 'capacity'
        },
        {
            model: 'school',
            required: true,
            path: 'school',
            label: 'school'
        },
        {
            model: 'students',
            required: false,
            path: 'students',
            label: 'students'
        },
    ],
}


