const socketEndpoint = "http://localhost:5000";
const apiEndpoint = "http://localhost:8000/api";

const getSocketEndpoint = () => socketEndpoint;
const getApiEndpoint = () => apiEndpoint;


module.exports = {
    socketEndpoint, getSocketEndpoint,
    apiEndpoint, getApiEndpoint
};