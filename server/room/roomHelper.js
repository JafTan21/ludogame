const axios = require("axios").default;
const API_ENDPOINT = "http://localhost:8000/api";


// create room
const crate_room = async ({ room_name, entry_fee, user_id }, callback) => {
    axios.post(`${API_ENDPOINT}/create-room`, {
        room_name, entry_fee
    }).then(response => {
        join_room_if_exists({ room_name, user_id }, () => {
            callback({ status: response.data.status, msg: response.data.msg });
        });
    });
}

// join room
const join_room_if_exists = async ({ room_name, user_id }, callback) => {
    axios.post(`${API_ENDPOINT}/join-room`, {
        room_name, user_id
    }).then(response => {
        callback({ status: response.data.status, msg: response.data.msg });
    });
}

const check_user_in_room = async ({ room_name, user_id }, callback) => {
    axios.post(`${API_ENDPOINT}/check-user-in-room`, {
        room_name, user_id
    }).then(response => {
        callback({ status: response.data.status, msg: response.data.msg });
    });
}

const send_updated_players = async ({ room_name }, callback) => {
    axios.post(`${API_ENDPOINT}/get-room`, {
        room_name
    }).then(response => {
        if (response.data.status == 1) {
            const players = [];
            if (response.data.room.player_id_1) players.push(response.data.room.player_id_1);
            if (response.data.room.player_id_2) players.push(response.data.room.player_id_2);
            if (response.data.room.player_id_3) players.push(response.data.room.player_id_3);
            if (response.data.room.player_id_4) players.push(response.data.room.player_id_4);
            callback({ players });
        }
    });
}


const leave_room = async ({ room_name, user_id }) => {

}

module.exports = {
    crate_room,
    join_room_if_exists,
    check_user_in_room,
    send_updated_players,
    leave_room
}