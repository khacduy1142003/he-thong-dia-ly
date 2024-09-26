const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Xa = new Schema(
    {   
       name: String,
       slug: String,
       type: String,
       name_with_type: String,
       path: String,
       path_with_type: String

    }
);

module.exports = mongoose.model('xa_viet_nams', Xa);
