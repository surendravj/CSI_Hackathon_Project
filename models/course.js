const mongoose = require('mongoose');
const schema = mongoose.Schema




const courseModel = schema({
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    price: {
        type: String
    },
    rating: {
        type: String
    },
    thumbNail: {
        type: String
    },
    comments: [
        {
            name: {
                type: String
            },
            comment: {
                type: String
            },
        }
    ],
    instructors: [
        {
            name: {
                type: String,
            },
            rating: {
                type: String
            },
        }
    ]
})

const model = mongoose.model('courses', courseModel)

module.exports = model;