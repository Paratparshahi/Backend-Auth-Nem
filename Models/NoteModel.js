const mongoose = require ('mongoose');
noteschema = mongoose.Schema({
    title : String,
    note : String,
    category : [],
    userId : String, 
});
 
const notesmodel = mongoose.model("notes_new",noteschema)
module.exports = {
    notesmodel
}