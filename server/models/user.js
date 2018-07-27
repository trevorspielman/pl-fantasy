let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "User"
let bcrypt = require("bcryptjs")
const SALT_FACTOR = 12

let schema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    shoppingList: {
        type: Object,
        required: true,
        default: {
            fermentables: [],
            hops: [],
            steepingGrains: [],
            adjuncts: [],
            yeasts: [],
        }
    },
    following: [{}]
}, {minimize: false})

schema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR));
};

schema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model(schemaName, schema)