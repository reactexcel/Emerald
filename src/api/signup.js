import * as firebase from 'firebase';

export function userRegister(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return (errorCode, errorMessage);
  });
}
export function userProfileupdate(userId, fname, lname, token) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).set({
    firstname: fname,
    lastname: lname,
    token,
  });
}
