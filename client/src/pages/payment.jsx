import React from 'react'

function Payment() {
    return (
        <>
    
            <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
                <h5 className="font-weight-normal mb-0 text-white">
                    <a className="text-danger " href="./seates"><i className="fa-solid fa-arrow-left me-3 "></i></a>
                    Payment
                </h5>
                <div className="ml-auto d-flex align-items-center">
                    <a className="toggle osahan-toggle h4 m-0 text-white ml-auto hc-nav-trigger hc-nav-1" href="#" role="button" aria-controls="hc-nav-1"><i className="icofont-navigation-menu"></i></a>
                </div>
            </div>
            <div className='p-3'>
                <div className="p-2  w-100">
                    <div className="bg-white border rounded-1 shadow-sm p-2 mb-2">
                        <div className="row mx-0 px-1">
                            <div className="col-6 p-0">
                                <small className="text-muted mb-1 f-10 pr-1">GOING FROM</small>
                                <p className="small mb-0"> Ahmedabad</p>
                            </div>
                            <div className="col-6 p-0">
                                <small className="text-muted mb-1 f-10 pr-1">GOING TO</small>
                                <p className="small mb-0"> Surendranagar</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white border rounded-1 shadow-sm p-2 mb-2">
                        <div class="row mx-0 px-1">
                            <div class="col-12 p-0 mb-2">
                                <small class="text-danger mb-1 f-10 pr-1">PICKUP FROM</small>
                                <p class="small mb-0 l-hght-14"> Model Towm, Ludhiana - 8:15 PM</p>
                            </div>
                            <div class="col-12 p-0">
                                <small class="text-danger mb-1 f-10 pr-1">DROPPING AT</small>
                                <p class="small mb-0 l-hght-14">Goa Mall Road - 7: 00 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment