import axios from '../../axios'
import { QR_PRESCRIPTION_NAMESPACE } from '../../constants/namespaces'
import { trackPromise } from 'react-promise-tracker'

const QrPrescriptionApi = {
    getAllQRPrescription() {
        return trackPromise(axios.get(`/${QR_PRESCRIPTION_NAMESPACE}`))
    },
    createQRPrescription(data) {
        return trackPromise(axios.post(`/${QR_PRESCRIPTION_NAMESPACE}`, data))
    },
    downloadQRPrescription(id) {
        return trackPromise(axios.get(`/${QR_PRESCRIPTION_NAMESPACE}/download/${id}`, { responseType: 'blob' }))
    }
}

export default QrPrescriptionApi