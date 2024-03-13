// pages/api/ccavenue-handle.js
import CCAvenue from '../utils/ccavenue.utils';

export default async function handler(req:any, res:any) {

    switch (req.method) {
        case "POST":
            try {
                // Decrypt the Response Data from Request Body
                let data:any = CCAvenue.redirectResponseToJson(req.body.encResp);

                // Handle Redirect as per Payment Status
                if (data.order_status === "Success") {
                    // Redirect to Payment Success Page
                    res.redirect(302, "/success");
                } else {
                    // Redirect to Payment Failed Page
                    res.redirect(302, "/failed");
                }
            } catch (error) {
                // Handling Errors if anything Issue/Problem while Payment
                console.error('Error processing CCAvenue request:', error);

                // Redirect to Payment Failed Page
                res.redirect(302, "/onboard/failed");
            }
            break;

        default:
            res.status(405).end('Method Not Allowed');
            break;
    }
}