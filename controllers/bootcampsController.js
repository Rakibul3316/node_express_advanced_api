const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @method  GET
// @route   /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            total: bootcamps.length,
            data: bootcamps
        })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}

// @desc    Get single bootcamp
// @method  GET
// @route   /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}

// @desc    Create new bootcamp
// @method  POST
// @route   /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}

// @desc    Update single bootcamp
// @method  PUT
// @route   /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!bootcamp) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}

// @desc    Delete single bootcamp
// @method  DELETE
// @route   /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if (!bootcamp) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}