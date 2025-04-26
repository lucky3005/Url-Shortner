
const mongoose = require("mongoose");

const shorturlSchema = mongoose.Schema({
    ShortId:{
        type:String,
        required:true,
        unique:true
    },
    RedirectUrl:{
        type:String,
        required:true,
    }
});

const UrlModel = mongoose.model("shortId",shorturlSchema);

module.exports = UrlModel;