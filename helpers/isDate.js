const moment = require('moment')
const isDate = (value) => {
    if(!value) {
        return false
    };

    //instancia de moment
    const fecha = moment(value)
    if(fecha.isValid()) {
        return true
    } else {
        return false
    }
}   

module.exports = {
    isDate
}