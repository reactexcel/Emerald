import { API_URL } from '../config/config';
import { FirebaseConstants } from '../config/config';

export function sendData(body, type) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': parseInt(body.length),
    Authorization: `key=${FirebaseConstants.KEY}`,
  });
  return fetch(API_URL, { method: 'POST', headers, body })
    .then(response => (response))
    .catch(error => (error));
}
