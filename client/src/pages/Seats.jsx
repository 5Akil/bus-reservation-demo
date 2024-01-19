import React, { useContext, useEffect } from 'react'
import Seat_gallary from './Seat_Gallary'
import { useParams } from 'react-router';
import { SocketContext } from '../App';
function seats() {
    const params = useParams();
    const socket = useContext(SocketContext);
    useEffect(() => {
        if (!socket) return;
        socket.emit("join-channel", params.busId);
    }, [socket]);
    return <Seat_gallary />
}

export default seats