


import React, { useContext, useEffect, useState } from 'react'
import soldSeatsIcon from '../assets/sold-seat.png'
import availableSeatsIcon from '../assets/available-seat.png'
import selectedSeatsIcon from '../assets/selected-seat.png'
import driverIcon from '../assets/driver.png'
import { SocketContext } from '../App'
import { useParams } from 'react-router'

function Seat_gallary() {
    const [seats, setSeates] = useState([])
    const [seatesByGroup, setSeatesByGroup] = useState({})
    const [loading, setLoading] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([])
    const [bloackedSeats, setBlockedSeates] = useState([])
    const socket = useContext(SocketContext);
    const params = useParams()
    const getSeates = async () => {
        try {
            const res = await fetch(`http://localhost:3214/buses/${params.busId}/seats`, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const result = await res.json();
            const groupedSeats = result.reduce((acc, seat) => {
                const rowLetter = seat.seatNumber.charAt(0);
                if (!acc[rowLetter]) {
                    acc[rowLetter] = [];
                }
                acc[rowLetter].push(seat);
                return acc;
            }, {});
            setSeates(result)
            setSeatesByGroup(groupedSeats)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            setSelectedSeats([...selectedSeats, value])
            socket.emit("reserve", { busId: params.busId, seat_id: id, seat_number: value })
        } else {
            const update = selectedSeats.filter(seat => seat !== value)
            setSelectedSeats(update)
            socket.emit("seat-diselected", { busId: params.busId, seat_id: id, seat_number: value })
        }
    }
    const handleModel = async () => {
        const res = await fetch(`http://localhost:3214/buses/${params.busId}/reserve_seat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedSeats),
        })
        const messege = await res.json();
        if (res.status == 201) {
            setBlockedSeates([])
            setSelectedSeats([]);
            setLoading(true)
            getSeates();
            socket.emit('confirmed_seats', messege)
        }
    }
    useEffect(() => {
        getSeates();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("join-channel", (message) => {
            console.log(message);
        });
        socket.on("reserveSeatSuccess", ({ seat_id, seat_number, message }) => {
            console.log(message);
            setBlockedSeates((preBlockedSeats) => [...preBlockedSeats, seat_number])
        })
        socket.on("seat-diselected", ({ seat_id, seat_number, message }) => {
            console.log(message);
            setBlockedSeates((preBlockedSeats) => (
                preBlockedSeats.filter(seat => seat !== seat_number)
            ));
        })
        socket.on("seat-released", () => {
            setBlockedSeates([])
            setSelectedSeats([])
        })
        socket.on('confirmed_seats', (message) => {
            console.log(message);
        })
    }, [socket]);
    console.log(bloackedSeats);
    return (
        !loading ?
            <>
                <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
                    <h5 className="font-weight-normal mb-0 text-white">
                        <a className="text-danger " href="/"><i className="fa-solid fa-arrow-left me-3 "></i></a>
                        Bus Seat Select
                    </h5>
                    <div className="ml-auto d-flex align-items-center">
                        <a className="toggle osahan-toggle h4 m-0 text-white ml-auto hc-nav-trigger hc-nav-1" href="#" role="button" aria-controls="hc-nav-1"><i className="icofont-navigation-menu"></i></a>
                    </div>
                </div>
                {
                    seats.length !== 0 ?
                        <div className="select-seat row bg-white mx-0 px-3 pt-3 pb-1 mb-3 rounded-1 shadow-sm">
                            <div className=" pl-0">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="sold text-center">
                                            <img src={soldSeatsIcon} className="img-fluid mb-1 " style={{ width: '25px', height: '25px' }} />
                                            <p className="small f-10">Sold Out</p>
                                        </div>
                                        <div className="sold text-center mx-3">
                                            <img src={availableSeatsIcon} className="img-fluid mb-1" style={{ width: '25px', height: '25px' }} />
                                            <p className="small f-10">Available</p>
                                        </div>
                                        <div className="sold text-center">
                                            <img src={selectedSeatsIcon} className="img-fluid mb-1" style={{ width: '25px', height: '25px' }} />
                                            <p className="small f-10">Selected</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={driverIcon} className="img-fluid mb-1" style={{ width: '25px', height: '25px' }} />
                                        <p className="small f-10">Driver</p>
                                    </div>
                                </div>
                                <div className="plane">
                                    {Object.keys(seatesByGroup).map((group) => {
                                        return <li className="row" key={group}>
                                            <ol className="seats" type={group} key={group}>
                                                {seatesByGroup[group].map((seat) => {
                                                    return <>
                                                        <li className="seat" >
                                                            <input type="checkbox"
                                                                id={seat.id}
                                                                name={seat.id}
                                                                value={seat.seatNumber}
                                                                onChange={(e) => handleChange(e)}
                                                                disabled={seat.seatStatus === "damaged" || seat.seatStatus === "booked" || seat.seatStatus === "blocked" || bloackedSeats?.includes(seat.seatNumber) ? true : false}
                                                                className={seat.seatStatus === "damaged" ? "damaged" : seat.seatStatus === "booked" ? "booked" : seat.seatStatus === "blocked" || bloackedSeats?.includes(seat.seatNumber) ? "custom" : null}
                                                            />
                                                            <label htmlFor={seat.id}>{seat.seatNumber}</label>
                                                        </li>
                                                    </>
                                                })}
                                            </ol>
                                        </li>
                                    })}
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <p>Something went from our side!!!!! please, try again later</p>
                        </>
                }
                {
                    selectedSeats?.length !== 0 ? <>
                        <div className="fixed-bottom  p-3">
                            <a onClick={() => handleModel()} className="btn btn-danger btn-block d-flex align-items-center justify-content-between osahanbus-btn rounded-1">
                                <span className="text-left l-hght-14">
                                    TOTAL <br />
                                    <small className="f-10 text-white-50">Seats Selected : {selectedSeats?.length}</small>
                                </span>
                                <span className="font-weight-bold ml-auto">BOOK</span>
                            </a>
                        </div>
                    </> : null
                }
            </> : null
    )
}

export default Seat_gallary