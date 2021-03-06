import DashboardLayout from '../../../layout/DashboardLayout'
import MEDEOR_IMAGE from '../../../assets/images/medeor_logo.png';
import DoctorsAppointments from './components/DoctorsAppointments';
import TopDoctors from './components/TopDoctors';
import { useContext, useEffect, useState } from 'react'
import { RootContext } from '../../../contextApi';
import HospitalApi from '../../../api/Hospital';

function Dashboard() {

    const { user } = useContext(RootContext);
    const [hospital, setHospital] = useState();

    useEffect(() => {
        getHospital();
    }, []);

    const getHospital = () => {
        HospitalApi.getSingleHospital(user.referenceId).then(res => {
            setHospital(res.data.data.hospital);
            console.log("Hospital 222", res.data.data.hospital.name);
        })
    }

    return (
        <DashboardLayout>
            <div class="row">
                <div class="col-md-12">
                    <div class="card welcome-block px-lg-3 py-2">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-sm-6">
                                    <h4 style={{ color: "#D3D3D3" }}>Welcome to MedicApp,</h4>
                                    <h2>{hospital?.name}</h2>
                                </div>
                                <div class="col-sm-6 text-sm-right">
                                    <img style={{ width: '125px', height: '125px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #D3D3D3' }} src={hospital?.image ? hospital?.image : MEDEOR_IMAGE} alt="medeor-logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12 col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h4>Doctors Appointments</h4>
                            <DoctorsAppointments />
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12 col-xl-6">
                    <div class="card top-doctor">
                        <div class="card-body">
                            <h4>Top Doctors</h4>
                            <TopDoctors />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard