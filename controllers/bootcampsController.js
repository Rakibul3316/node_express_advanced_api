// @desc    Get all bootcamps
// @method  GET
// @route   /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Read all bootcamps.', hello: req.hello })
}

// @desc    Get single bootcamp
// @method  GET
// @route   /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Read a bootcamp by ${req.params.id}.` })
}

// @desc    Create new bootcamp
// @method  POST
// @route   /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create a bootcamp.' })
}

// @desc    Update single bootcamp
// @method  PUT
// @route   /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update a bootcamp by ${req.params.id}.` })
}

// @desc    Delete single bootcamp
// @method  DELETE
// @route   /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete a bootcamp by ${req.params.id}.` })
}