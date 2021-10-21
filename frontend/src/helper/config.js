const socketEndpoint = "http://localhost:5001";
const apiEndpoint = "http://localhost:8000/api";

const getSocketEndpoint = () => socketEndpoint;
const getApiEndpoint = () => apiEndpoint;


const BOARD_SIZE = 350;
const HOME_SIZE = 140;
const HOME_BOX_SIZE = 100;
const PLAYER_CIRCLE_RADIUS = HOME_BOX_SIZE / 8;
const DISTANCE_OF_BORDER_AND_HOME = (HOME_SIZE - HOME_BOX_SIZE) / 2;
const DISTANCE_OF_BORDER_AND_PLAYER = HOME_BOX_SIZE / 8;
const SOLDIER_SIZE = 25;



const COLORS = {
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    GREEN: 'green',
};

const getPositionOfHome = (color) => {
    switch (color) {
        case COLORS.BLUE:
            return { x: 0, y: 0 };

        case COLORS.RED:
            return { x: 0, y: BOARD_SIZE - HOME_SIZE };

        case COLORS.GREEN:
            return { x: BOARD_SIZE - HOME_SIZE, y: BOARD_SIZE - HOME_SIZE };

        case COLORS.YELLOW:
            return { x: BOARD_SIZE - HOME_SIZE, y: 0 };
    }
}


module.exports = {
    socketEndpoint, getSocketEndpoint,
    apiEndpoint, getApiEndpoint,
    BOARD_SIZE,
    HOME_SIZE,
    HOME_BOX_SIZE,
    PLAYER_CIRCLE_RADIUS,
    COLORS,
    DISTANCE_OF_BORDER_AND_HOME,
    DISTANCE_OF_BORDER_AND_PLAYER,
    getPositionOfHome,
    SOLDIER_SIZE
};