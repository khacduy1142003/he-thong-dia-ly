const mongoose = require('mongoose');

function connect() {
    try {
        mongoose.connect('mongodb://localhost:27017/he_thong_dia_li', {
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.error('Connect error:', error);
    }
}

module.exports = { connect };
