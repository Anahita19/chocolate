/* ---------------------------------------------------------------------------
   The single integration seam for ANAHITA.

   Newsletter sign-ups, corporate enquiries and order requests all pass through
   here. Today each call is fulfilled locally: no third-party service is
   connected, so the app never claims that an email was sent, an order was
   stored or a payment was taken. To go live, set the matching endpoint below to
   your API URL (or wire a payment provider into `startPayment`) — the UI needs
   no changes.
   --------------------------------------------------------------------------- */

export const endpoints = {
  newsletter: null, // e.g. 'https://api.anahita.example/newsletter'
  enquiry: null,
  order: null,
  payment: null, // an order is only ever marked paid once a provider confirms it
};

async function post(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  return response.json().catch(() => ({}));
}

/** Newsletter sign-up. Returns { delivered: boolean } — delivered is true only
 *  when a real endpoint accepted the address. */
export async function submitNewsletter(payload) {
  if (endpoints.newsletter) {
    await post(endpoints.newsletter, payload);
    return { delivered: true };
  }
  return { delivered: false, reason: 'no-endpoint' };
}

/** Corporate / event enquiry. */
export async function submitEnquiry(payload) {
  if (endpoints.enquiry) {
    await post(endpoints.enquiry, payload);
    return { delivered: true };
  }
  return { delivered: false, reason: 'no-endpoint' };
}

/** Order request. Without an endpoint the order stays on the device and is
 *  clearly presented as a request awaiting confirmation by the boutique. */
export async function submitOrder(payload) {
  if (endpoints.order) {
    const result = await post(endpoints.order, payload);
    return { stored: true, reference: result.reference || payload.reference, paid: Boolean(result.paid) };
  }
  return { stored: false, reference: payload.reference, paid: false, reason: 'no-endpoint' };
}

/** Payment is intentionally not started: no provider is connected yet. */
export async function startPayment() {
  if (endpoints.payment) throw new Error('Wire the payment provider into startPayment().');
  return { started: false, reason: 'no-provider' };
}
