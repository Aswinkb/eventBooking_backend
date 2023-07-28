// importing mongoose
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/roughPrj', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false, // Disable buffering
});

// model for collection
const User = mongoose.model('User', {
    id: Number,
    uname: String,
    email: String,
    mobile: Number,
    password: String,
    history: []

})

const Admin = mongoose.model('Admin', {
    aid: Number,
    apsw: String

})
const Event = mongoose.model('Event', {
    id: Number,
    categoryId: Number,
    eventName: String,
    description: String,
    price: Number,
    is_available: Boolean,
    eventImage: String,
    venue: String,
    organizer: String,
    date:String,
    time:String

})

// export module 
module.exports = {
    User, Admin,Event
}
