import * as firebase from 'firebase';

export function hireuser(hiringpersonID, hiredpersonID, array) {
  const test = firebase.database().ref(`/userInfo/${hiringpersonID}/profile/hiredperson`).push();
  const details = {
    id: hiredpersonID,
    plot: array,
  };
  return test.set(details);
}
export function hireperson(hiringpersonID, hiredpersonID, name) {
  const test = firebase.database().ref(`/userInfo/${hiredpersonID}/profile/hiredby`).push();
  const details = {
    hiringid: hiringpersonID,
    plotname: name,
  };
  return test.set(details);
}
