const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
    SeasonID: { type: Number },
    SeasonName: { type: String },
    StartDate: { type: Date },
    EndDate: { type: Date }
});

mongoose.model('season', SeasonSchema)
