// const BASE_URL = "https://tech.kiet.edu/api/hrms/";
const BASE_URL = "https://fca4cc440f04.ngrok.io/";
// const BASE_URL = 'http://10.42.0.17:8000/'
// const BASE_URL = 'http://192.168.42.55:8000';

export default {
    REGISTER: BASE_URL + 'index',
    LOGIN: BASE_URL + "login",
    PASSWORD_CHANGE: BASE_URL + 'passwordchange',
    LOGOUT: BASE_URL + 'logout',
    MAIL_SENT: BASE_URL + 'mail',
    VERIFY_OTP: BASE_URL + 'verify',
    PROFILE: BASE_URL + 'profile',
    IFSC_VERIFY: "https://ifsc.razorpay.com/",
    FCM_INSERT: BASE_URL + 'fcm-insert',
    FCM_DELETE: BASE_URL + 'fcm-delete',
    NOTIFICATION: BASE_URL + 'notifications'
}