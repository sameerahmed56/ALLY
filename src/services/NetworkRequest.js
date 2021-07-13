import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../constants/storageKeys'
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from "@react-native-community/netinfo";
// import ApiUtils from '../utils/ApiUtils'

export async function getRequest(url = "") {

    // let myHeaders = new Headers();
    let response = await fetch(url, {
        method: 'GET',
        // headers: myHeaders
    });
    let responseJson = await response.json();
    return responseJson;
}


export async function postRequest(url = "", body = {}) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: body
    });
    let responseJson = await response.json();
    return responseJson;
}

export function isNetworkConnected(){
    try {
        // var isConnected = true
        NetInfo.fetch().then(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            return state.isConnected
        });
    } catch (error) {
        return true
    }
}

export async function putRequest(url = "", Cookie = "", body = {}) {
    let response = await fetch(url, {
        method: 'PUT',
        body: body,
        headers: {
            Cookie: Cookie
        }
    });
    let responseJson = await response.json();
    return responseJson;
}

// export async function downloadFile(url = "", fileName, cookie) {
//     const { fs } = RNFetchBlob;
//     const downloads = fs.dirs.DownloadDir;
//     RNFetchBlob
//         .config({
//             trusty: true,
//             fileCache: true,
//             addAndroidDownloads: {
//                 useDownloadManager: true,
//                 notification: true,
//                 path: downloads + '/' + fileName,
//             }
//         })
//         .fetch('POST    ', url, {
//             Cookie: cookie
//         })
//         .then((res) => {
//             // res
//         }).catch(err => {
//             // err handling
//         })
// }

// export async function downloadIdCard(url = "", fileName, cookie) {
//     const { fs } = RNFetchBlob;
//     const downloads = fs.dirs.DownloadDir;
//     RNFetchBlob
//         .config({
//             trusty: true,
//             fileCache: true,
//             addAndroidDownloads: {
//                 useDownloadManager: true,
//                 notification: true,
//                 path: downloads + '/' + fileName,
//             }
//         })
//         .fetch('POST', url, {
//             Cookie: cookie,
//         })
//         .then(ApiUtils.checkStatus)
//         .then(response => response.json())
//         .catch(err => {
//             // err handling
//         })
// }