import * as firebase from 'firebase';


export function userProfileupdate(userId, fname, lname, phonenum, Location, token) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).update({
    id: userId,
    firstname: fname,
    lastname: lname,
    phonenumber: phonenum,
    location: Location,
    token,
  });
}
export function userPlotupdate(userId, addres) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).update({
    address: addres,
  });
}
export function userImageUpload(userId, images) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).update({
    image: images,
  });
}
export function userSkillUpdate(userId, skills) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).update({
    skills,
  });
}

export function userLocationUpdate(userId, address) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).update({
    userlocation: address,
  });
}
export function udpatePrice(userId, price) {
  return firebase.database().ref(`/userInfo/${userId}/profile`).update({
    price,
  });
}
