const { toast } = require('react-toastify');


const success = (msg) => {
    toast(msg, {
        autoClose: 2000,
        type: 'success'
    });
}
const error = (msg) => {
    toast(msg, {
        autoClose: 2000,
        type: 'error'
    });
}

module.exports = { success, error }