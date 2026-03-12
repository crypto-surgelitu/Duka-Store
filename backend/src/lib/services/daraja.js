import axios from 'axios';

const DARAJA_BASE = process.env.DARAJA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

/**
 * Gets an OAuth access token from Safaricom Daraja API.
 */
export const getAccessToken = async () => {
    const credentials = Buffer.from(
        `${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`
    ).toString('base64');

    try {
        const res = await axios.get(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${credentials}` }
        });
        return res.data.access_token;
    } catch (error) {
        console.error('Daraja Auth Error:', error.response?.data || error.message);
        throw new Error('Failed to authenticate with Daraja');
    }
};

/**
 * Initiates an M-Pesa STK Push (Lipa Na M-Pesa Online).
 */
export const stkPush = async (phone, amount, orderRef) => {
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(
        `${process.env.DARAJA_SHORTCODE}${process.env.DARAJA_PASSKEY}${timestamp}`
    ).toString('base64');

    try {
        const res = await axios.post(
            `${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: process.env.DARAJA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: Math.ceil(amount),
                PartyA: phone,
                PartyB: process.env.DARAJA_SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: process.env.DARAJA_CALLBACK_URL,
                AccountReference: `DUKA-${orderRef}`,
                TransactionDesc: 'DukaStore Payment',
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    } catch (error) {
        console.error('STK Push Error:', error.response?.data || error.message);
        throw new Error('Failed to initiate M-Pesa payment');
    }
};
