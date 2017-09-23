import * as firebase from 'firebase';
const _ = require('lodash');

export function jobList() {
  return new Promise((reslove, reject) => firebase.database().ref().on('value', (dataSnapshot) => {
    const data = dataSnapshot.val();
    const items = [];
    Object.keys(data.userInfo).map((key, index) => {
      if (data.userInfo[key].profile.price) {
        const info = {
          id: data.userInfo[key].profile.id,
          firstname: data.userInfo[key].profile.firstname,
          lastname: data.userInfo[key].profile.lastname,
          location: data.userInfo[key].profile.location,
          phonenumber: data.userInfo[key].profile.phonenumber,
          skill: data.userInfo[key].profile.skill,
          price: data.userInfo[key].profile.price,
          address: data.userInfo[key].profile.address,
          token: data.userInfo[key].profile.token,
        };
        items.push(info);
      }
    });
    reslove(items);
  }));
}
