const {NCALayerClient} = require("ncalayer-js-client");

const ncaLayer = new NCALayerClient();

// module.exports = {
//     connection: async function() {
//         await ncaLayer.connect().then(res => res).catch(err => alert(err.message)); 
//     },
//     getKeyInfoCall: function() {
//         return new Promise( async(resolve, reject) => {
//             await ncaLayer.getKeyInfo("PKCS12")
//                 .then(response => resolve(response))
//                 .catch(err => reject(err.message))
//         })
//     },
//     signWithBase64: function(base64) {
//         return new Promise( async(resolve, reject) => {
//             await ncaLayer.createCMSSignatureFromBase64("PKCS12", base64, 'SIGNATURE', true)
//                 .then(response => resolve(response))
//                 .catch(err => reject(err.message))
//         })
//     }
// }

const connection = async() => {
    await ncaLayer.connect().then(res => res).catch(err => alert(err.message)); 
}

const getKeyInfoCall = async() => {
    return new Promise( async(resolve, reject) => {
        await ncaLayer.getKeyInfo("PKCS12")
            .then(response => resolve(response))
            .catch(err => reject(err.message))
        })
}

const signWithBase64 = async(base64) => {
    return new Promise( async(resolve, reject) => {
        await ncaLayer.createCMSSignatureFromBase64("PKCS12", base64, 'SIGNATURE', true)
            .then(response => resolve(response))
            .catch(err => reject(err.message))
    })
}

export { connection, getKeyInfoCall, signWithBase64 }