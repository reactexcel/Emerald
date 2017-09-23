import * as firebase from 'firebase';

export function userInfo(userId) {
  return new Promise((reslove, reject) => firebase.database().ref(`/userInfo/${userId}/profile`).on('value', (dataSnapshot) => {
    const data = dataSnapshot.val();
    if (data) {
      reslove(data);
    } else {
      reslove('');
    }
  }));
}
