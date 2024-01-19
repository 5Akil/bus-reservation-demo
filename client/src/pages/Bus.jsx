
import moment from 'moment'
import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function Bus() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useLayoutEffect(() => {
    const getBus = async () => {
      const res = await fetch('http://localhost:3214/buses', {
        method: 'GET'
      })
      const result = await res.json()
      setData(result)
      setLoading(false)
    }
    getBus()
  }, [])
  console.log(data);

  return (
    <>
      {!loading ? <>
        <div className="p-2 border-bottom w-100">
          <div className="bg-white border rounded-1 shadow-sm p-2">
            <div className="row mx-0 px-1">
              <div className="col-6 p-0">
                <small className="text-muted mb-1 f-10 pr-1">GOING FROM</small>
                <p className="small mb-0">Ahmedabad</p>
              </div>
              <div className="col-6 p-0">
                <small className="text-muted mb-1 f-10 pr-1">GOING TO</small>
                <p className="small mb-0"> Surendranagar</p>
              </div>
            </div>
          </div>
          <div className='row m-0'>
            {
              data?.map((item) => {
                console.log(item.route);
                return <>
                  <Link to={`bus/${item.id}/seats`} className="text-dark col-6 px-0 ">
                    <div className="list_item_gird m-0 bg-white shadow-sm listing-item border-bottom border-right">
                      <div className="px-3 pt-3 ">
                        <div className="list-item-img ">
                          <img src="https://freepngimg.com/thumb/bus/5-2-bus-png-clipart.png" className="img-thumbnail " style={{ width: "200px" }} />
                        </div>
                        <p className="mb-0 l-hght-10">{item.bus_name}</p>
                        <span className="text-danger small">{item.route.departureCity} to {item.route.arrivalCity}</span>
                        <div className="start-rating small">
                          <i className="fa-solid fa-star text-danger"></i>
                          <i className="fa-solid fa-star text-danger"></i>
                          <i className="fa-solid fa-star text-danger"></i>
                          <i className="fa-solid fa-star text-danger"></i>
                          <i className="fa-regular fa-star"></i>
                          <span className="text-dark">4.0</span>
                        </div>
                      </div>
                      <div className="p-3 d-flex">
                        <div className="bus_details w-100">
                          <div className="d-flex justify-content-between">
                            <p><i className="fa-solid fa-wind"></i><span className="small">{item.bus_type}</span></p>
                            <p className="small ml-auto"><i className="icofont-bus mr-2 text-danger"></i>2/1</p>
                          </div>
                          <div className="d-flex  l-hght-10">
                            <i className="fa-regular fa-clock small me-2 mt-1 p-1 text-danger"></i>
                            <div className='ms-2'>
                              <small className="text-muted mb-2 d-block">Journey Start</small>
                              <p className="small mb-1">{moment(item.departureTime).format("Do MMM ,h:mm a")}</p>
                            </div>
                          </div>
                          <div className="d-flex l-hght-10">
                            <i className="fa-solid fa-location-dot small me-2 mt-1 p-1 me-2 mt-1 p-1  text-danger"></i>
                            <div>
                              <small className="text-muted mb-2 d-block">From - To</small>
                              <p className="small mb-1">{item?.route?.departureCity} to {item.route.arrivalCity}</p>
                            </div>
                          </div>
                          <div className="d-flex l-hght-10">
                            <i className="fa-regular fa-clock small me-2 mt-1 p-1 text-danger"></i>
                            <div>
                              <small className="text-muted mb-2 d-block">Estimated travel time</small>
                              <p className="small mb-1">{item.route.Estimated_travel_time} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                </>
              })
            }
          </div>
        </div>

      </> : null}

    </>
  )
}

export default Bus