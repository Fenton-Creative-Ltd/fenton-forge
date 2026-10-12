'use strict';
// Offline contract validator only. No SDK, network, credentials or paid jobs.
const crypto = require('node:crypto');
function approveRequest(request, quote, approval, now=Date.now()) {
  if (!approval || approval.enabled!==true) throw Error('GENERATION_NOT_APPROVED');
  if (!['image','animation'].includes(request.kind)) throw Error('INVALID_KIND');
  if (!approval.models.includes(request.provider+':'+request.model)) throw Error('MODEL_NOT_APPROVED');
  if (!request.prompt || request.prompt.length>1500) throw Error('INVALID_PROMPT');
  if (!quote || quote.currency!=='USD' || !Number.isFinite(quote.amount) || quote.amount<0 || quote.expiresAt<=now) throw Error('INVALID_QUOTE');
  const fingerprint=crypto.createHash('sha256').update(JSON.stringify(request)).digest('hex');
  if (quote.requestHash!==fingerprint) throw Error('QUOTE_REQUEST_MISMATCH');
  if (quote.amount>approval.maxJobUSD) throw Error('COST_LIMIT');
  if (!request.ownerId || !request.idempotencyKey) throw Error('OWNER_AND_IDEMPOTENCY_REQUIRED');
  return {requestHash:fingerprint,reserveUSD:quote.amount,status:'validated-offline',outboundEnabled:false};
}
module.exports={approveRequest};
