import React from 'react'
import useGameConstants from './useGameConstants'


export default function useDrawingFunctions() {

    const { HOME_SIZE, PLAYER_CIRCLE_RADIUS, BOARD_SIZE, COLORS, HOME_BOX_SIZE } = useGameConstants();


    const getPositionOfHome = color => {
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

    const initGame = ctx => {
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        drawPaths(ctx);
        drawHomes(ctx);
        drawWinningBox(ctx);
    }

    const drawPaths = ctx => {


        let TotalPathWidth = BOARD_SIZE - (HOME_SIZE * 2);
        let TotalPathHeight = HOME_SIZE;
        let BoxWidth = (TotalPathWidth / 3);
        let BoxHeight = (TotalPathHeight / 6);

        ctx.lineWidth = 0.2;
        ctx.strokeStyle = "#e5e5e";
        // yellow
        ctx.fillStyle = COLORS.YELLOW;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                if ((i == 1 && j != 0) || (i == 2 && j == 1)) {
                    ctx.fillRect(
                        HOME_SIZE + (BoxWidth * i),
                        0 + (j * BoxHeight),
                        BoxWidth,
                        BoxHeight
                    )
                }
                ctx.strokeRect(
                    HOME_SIZE + (BoxWidth * i),
                    0 + (j * BoxHeight),
                    BoxWidth,
                    BoxHeight
                )
            }
        }
        // red
        ctx.fillStyle = COLORS.RED;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                if ((i == 1 && j != 5) || (i == 0 && j == 4)) {
                    ctx.fillRect(
                        HOME_SIZE + (BoxWidth * i),
                        (BOARD_SIZE - HOME_SIZE) + (j * BoxHeight),
                        BoxWidth,
                        BoxHeight
                    )
                }
                ctx.strokeRect(
                    HOME_SIZE + (BoxWidth * i),
                    (BOARD_SIZE - HOME_SIZE) + (j * BoxHeight),
                    BoxWidth,
                    BoxHeight
                )
            }
        }

        TotalPathWidth = HOME_SIZE;;
        TotalPathHeight = BOARD_SIZE - (HOME_SIZE * 2);
        BoxWidth = (TotalPathWidth / 6);
        BoxHeight = (TotalPathHeight / 3);
        // blue
        ctx.fillStyle = COLORS.BLUE;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                if ((i == 1 && j != 0) || (i == 0 && j == 1)) {
                    ctx.fillRect(
                        0 + (BoxWidth * j),
                        HOME_SIZE + (BoxHeight * i),
                        BoxWidth,
                        BoxHeight
                    )
                }
                ctx.strokeRect(
                    0 + (BoxWidth * j),
                    HOME_SIZE + (BoxHeight * i),
                    BoxWidth,
                    BoxHeight
                )
            }
        }

        // green
        ctx.fillStyle = COLORS.GREEN;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                if ((i == 1 && j != 5) || (i == 2 && j == 4)) {
                    ctx.fillRect(
                        (BOARD_SIZE - HOME_SIZE) + (BoxWidth * j),
                        HOME_SIZE + (BoxHeight * i),
                        BoxWidth,
                        BoxHeight
                    )
                }
                ctx.strokeRect(
                    (BOARD_SIZE - HOME_SIZE) + (BoxWidth * j),
                    HOME_SIZE + (BoxHeight * i),
                    BoxWidth,
                    BoxHeight
                )
            }
        }
    }

    function drawWinningBox(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.strokeRect(
            HOME_SIZE,
            HOME_SIZE,
            (BOARD_SIZE - (HOME_SIZE * 2)),
            (BOARD_SIZE - (HOME_SIZE * 2))
        );

        const width = BOARD_SIZE - (HOME_SIZE * 2);
        const BoxWidth = Math.sqrt(width * width);

        // blue
        ctx.fillStyle = COLORS.BLUE;
        ctx.beginPath();
        ctx.moveTo(HOME_SIZE, HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.stroke();
        ctx.fill();

        // red
        ctx.fillStyle = COLORS.RED;
        ctx.beginPath();
        ctx.moveTo(HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(BOARD_SIZE - HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.stroke();
        ctx.fill();


        // green
        ctx.fillStyle = COLORS.GREEN;
        ctx.beginPath();
        ctx.moveTo(BOARD_SIZE - HOME_SIZE, BOARD_SIZE - HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(BOARD_SIZE - HOME_SIZE, HOME_SIZE);
        ctx.stroke();
        ctx.fill();


        // yellow
        ctx.fillStyle = COLORS.YELLOW;
        ctx.beginPath();
        ctx.moveTo(BOARD_SIZE - HOME_SIZE, HOME_SIZE);
        ctx.lineTo(HOME_SIZE + BoxWidth / 2, HOME_SIZE + BoxWidth / 2);
        ctx.lineTo(HOME_SIZE, HOME_SIZE);
        ctx.stroke();
        ctx.fill();
    }

    const drawHomes = (ctx) => {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000'
        for (const [key, color] of Object.entries(COLORS)) {
            ctx.fillStyle = color
            const { x, y } = getPositionOfHome(color)
            ctx.fillRect(x, y, HOME_SIZE, HOME_SIZE)
            ctx.strokeRect(x, y, HOME_SIZE, HOME_SIZE);
            ctx.fillStyle = "#fff"


            const innerBoxX = x + ((HOME_SIZE - HOME_BOX_SIZE) / 2);
            const innerBoxY = y + ((HOME_SIZE - HOME_BOX_SIZE) / 2);
            ctx.fillRect(
                innerBoxX,
                innerBoxY,
                HOME_BOX_SIZE,
                HOME_BOX_SIZE
            )


            ctx.beginPath();
            ctx.arc(
                innerBoxX + (HOME_BOX_SIZE / 4),
                innerBoxY + (HOME_BOX_SIZE / 4),
                PLAYER_CIRCLE_RADIUS, 0, 2 * Math.PI);
            ctx.stroke(); ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
                innerBoxX + (HOME_BOX_SIZE / 4 * 3),
                innerBoxY + (HOME_BOX_SIZE / 4),
                PLAYER_CIRCLE_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
                innerBoxX + (HOME_BOX_SIZE / 4),
                innerBoxY + (HOME_BOX_SIZE / 4 * 3),
                PLAYER_CIRCLE_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
                innerBoxX + (HOME_BOX_SIZE / 4 * 3),
                innerBoxY + (HOME_BOX_SIZE / 4 * 3),
                PLAYER_CIRCLE_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();


        }
    }

    return [initGame]

}
