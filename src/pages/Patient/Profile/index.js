import React, { useEffect, useState, useContext } from 'react'
import { ACCOUNT, APPOINTMENTS, LAB_RESULTS, MEDICAL_PROFILE, QR_PRESCRIPTION, FAMILY_MEMBERS, SICK_LEAVES } from '../../../constants/patientProfile'
import ProfileTopNavigation from './components/ProfileTopNavigation'
import AppLayout from '../../../layout/AppLayout'
import MedicalProfile from './components/MedicalProfile'
import Appointments from './components/Appointments'
import QRPrescription from './components/QRPrescription'
import LabResults from './components/LabResults'
import Account from './components/Account'
import { connect } from 'react-redux'
import { getPatientAccountInfo, deactivePatient } from '../../../store/actions/patientActions'
import { RootContext } from '../../../contextApi'
import FamilyMembers from './components/FamilyMembers'
import SickLeaves from './components/SickLeaves'
import Rewards from './components/Rewards'
import AccountDelete from './components/AccountDelete'

function PatientProfile({ getPatientAccountInfo, patients, deactivePatient }) {
    const [selectedTab, setSelectedTab] = useState(MEDICAL_PROFILE)
    const { user } = useContext(RootContext)

    const { patient } = patients && patients

    useEffect(() => {
        getPatientAccountInfo(user?._id)
    }, [getPatientAccountInfo])

    let componentToRender = null

    switch (selectedTab) {
        case MEDICAL_PROFILE:
            componentToRender = <MedicalProfile patient={patient} />; break
        case FAMILY_MEMBERS:
            componentToRender = <FamilyMembers familyMembers={patient?.familyMembers} />; break
        case APPOINTMENTS:
            componentToRender = <Appointments appointments={patient?.upcommingAppointments} />; break
        case SICK_LEAVES:
            componentToRender = <SickLeaves />; break
        // case REWARDS:
        //     componentToRender = <Rewards />; break
        case QR_PRESCRIPTION:
            componentToRender = <QRPrescription prescriptions={patient?.qrPrescriptions} />; break
        case LAB_RESULTS:
            componentToRender = <LabResults results={patient?.labResults} />; break
        case ACCOUNT:
            componentToRender = <Account deactivePatient={deactivePatient} patient={patient} user={user} />; break
        default:
            componentToRender = <MedicalProfile patient={patient?.patient} />
    }

    return (
        <AppLayout>
            <ProfileTopNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {componentToRender}
        </AppLayout>
    )
}

const mapStateToProps = (state) => ({
    patients: state.patients
})

const mapDispatchToProps = {
    getPatientAccountInfo,
    deactivePatient
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile)
