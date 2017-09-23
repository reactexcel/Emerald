import * as firebase from 'firebase';

export function userLogin(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return (errorCode, errorMessage);
  });
}
