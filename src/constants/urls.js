// const BASE_URL = "https://tech.kiet.edu/api/hrms/";
const BASE_URL = "https://eeb1b0534c03.ngrok.io/";
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
    NOTIFICATION: BASE_URL + 'notifications',
    REQUEST_HELP: BASE_URL + 'request_help',
    REQUEST_CATEGORY: BASE_URL + 'request_category',
    UPLOAD_IMAGE: BASE_URL + 'upload',
    PENDING_REQUESTS: BASE_URL + 'pending_requests',
    APPROVE_REJECT_REQUEST: BASE_URL + 'requests_status_update',
    ALL_POST: BASE_URL + 'posts',
    MY_REQUESTS: BASE_URL + 'my_requests',
    PROFILE_PIC_UPLOAD: BASE_URL + 'profile_pic_upload'
}