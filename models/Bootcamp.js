const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters.']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description.'],
        maxlenght: [255, 'Descripton can not be more than 255 characters.']
    },
    website: {
        type: String,
        match: [
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add a address.']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other',
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10'],
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg',
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssitance: {
        type: Boolean,
        default: false
    },
    jonGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create bootcamp slug form the name
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

// Geocode & create loaction field
BootcampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }

    // Don't save the address in DB
    this.address = undefined;

    next();
});

// cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
    console.log(`Courses being removed from bootcamp ${this._id}`);
    await this.model('Course').deleteMany({ bootcam: this._id });
    next()
});

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);