import React, { useState } from 'react'
import { useHistory } from 'react-router'
import EMPTY_IMAGE_PLACEHOLDER from '../../../../assets/images/doctor_placeholder.png'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

function SearchedDoctors({ allSearchedDoctors }) {
    const { t } = useTranslation()

    const history = useHistory()
    const [selectedDoctor, setSelectedDoctor] = useState(null)

    return (
        <>
            {allSearchedDoctors?.length > 0 && allSearchedDoctors.map(doctor => (
                <div class="media shadow-lg mb-4" style={{ padding: "0px 15px", boxShadow: "0px 0px 16px 0px rgba(202,202,202,0.75)", borderRadius: "8px" }}>
                    <img src={allSearchedDoctors.length > 0 ? doctor.image ? doctor.image : EMPTY_IMAGE_PLACEHOLDER : EMPTY_IMAGE_PLACEHOLDER} class="mr-3" alt="medeor_logo" style={{ cursor: "pointer" }} onClick={(e) => history.push(`/doctor/${doctor._id}`)} />
                    <div class="media-body">
                        <div class="d-flex flex-wrap justify-content-between align-items-center">
                            <h5 class="mt-0">Dr. {doctor.firstName + " " + doctor.lastName}</h5>
                            <span>
                                <Link to="/book-appointment" class="btn btn-primary px-3 py-1 mt-2" onClick={() => { localStorage.setItem("SELECTED_DOCTOR_OR_HOSPITAL", JSON.stringify(doctor)); localStorage.setItem("hospitalDetailPage", false) }}>{t('book_appointment')}</Link>
                            </span>
                        </div>
                        <p class="rating mb-0">
                            <i class="text-warning fa fa-star"></i>
                            <i class="text-warning fa fa-star"></i>
                            <i class="text-warning fa fa-star"></i>
                            <i class="text-warning fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </p>
                        {/* <p class="my-1"><i class="icon-phone"></i> {doctor.mobile} </p> */}
                        <p class="my-1"><i class="icon-map"></i> {doctor?.hospitalId?.address}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SearchedDoctors

