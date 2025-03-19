import CryptoJS from "crypto-js";

export async function generateHMAC(message : string, secretKey : string) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const messageData = encoder.encode(message);

    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, messageData);
    return btoa(String.fromCharCode(...new Uint8Array(signature))); 
}


export async function generateHMAC2(message: string, secretKey: string) {
    return CryptoJS.HmacSHA256(message, secretKey).toString(CryptoJS.enc.Base64);
}