import { io } from "socket.io-client";
import { getSocketEndpoint } from "helper/config";
import React from "react";

export const socket = io(getSocketEndpoint());
export const SocketContext = React.createContext();
