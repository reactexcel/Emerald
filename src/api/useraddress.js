import axios from 'axios';
import { ADDRESS_URL } from '../config/config';

export function getUserAddress(address) {
  return new Promise((resolve, reject) => {
    axios.get(ADDRESS_URL + address).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}
