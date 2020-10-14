export const RAZORPAY_CARD_TYPE = "Razorpay_gateway";
export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}