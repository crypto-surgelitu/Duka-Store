import AfricasTalking from 'africastalking';

const at = AfricasTalking({
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME,
});

const sms = at.SMS;

/**
 * Sends an SMS via Africa's Talking.
 * @param {string} to Phone number in international format (+254...)
 * @param {string} message The text content of the SMS.
 */
export const sendSMS = async (to, message) => {
    try {
        const response = await sms.send({
            to: [to],
            message: message,
            from: 'DUKASTORE' // Requires an approved Shortcode/Alpha-numeric on AT
        });
        return response;
    } catch (error) {
        console.error('SMS Error:', error);
        // We don't throw here to avoid failing critical paths (like checkout) if SMS fails
        return null;
    }
};

/**
 * Specific helper for order confirmations.
 */
export const sendOrderConfirmation = async (phone, receipt, amount) => {
    const msg = `✅ Payment confirmed! KES ${amount} received for Duka Store. Ref: ${receipt}. Your order is being processed.`;
    return await sendSMS(phone, msg);
};
