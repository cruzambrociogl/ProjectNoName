import { fb, db, auth} from '../firebase/config';
import errorMessage from '../utils/errorHandler.js'

// AUTH
export async function login(userInfo, callback){
  auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
  .then((value)=> console.log(value))
  .catch((error)=>{
    callback(errorMessage(error))
  });
}

export async function signup(email, password, displayName, callback){
  auth.createUserWithEmailAndPassword(email, password)
  .then((userInfo)=>{
    console.log(userInfo);
    userInfo.user.updateProfile({displayName:displayName.trim()})
    .then(()=>{console.log("UpdateProfile")});
  })
  .catch((error) => console.log('error signing up', error));

}

export function subscribeToAuthChanges(AuthStateChanged){
  auth.onAuthStateChanged((user)=>{
    console.log(user);
    AuthStateChanged(user);
  })
}

export function signOut(onSignedOut){
  auth.signOut()
  .then(()=>{
    console.log('Signed out');
    onSignedOut();
  })
}
//END AUTH

// BEGIN DATA MANAGEMENT
export async function getRooms(roomsRetrieved){
  console.log("getting rooms")
  var roomsList = [];
  var indexList = [];
  db.collection('Rooms')
  .get().then(snapshot => {
    snapshot.forEach((doc) => {
      indexList.push(doc.id)
      roomsList.push({...doc.data(), 'id':doc.id})
    });
    roomsRetrieved(roomsList);
  });
}

export async function getGames(room, gamesRetrieved){
  console.log("getting rooms")
  var gamesList = [];
  var indexList = [];
  db.collection('Rooms')
  .doc(room["id"])
  .collection('Games')
  .get().then(snapshot => {
    snapshot.forEach((doc) => {
      indexList.push(doc.id)
      gamesList.push({...doc.data(), 'id':doc.id})
    });
    gamesRetrieved(gamesList);
  });
}
export function gameListener(callback){
  console.log('listener')
  db.collection('Rooms')
  .doc('Room_1')
  .collection('Games')
  .doc('tic_tac_toe')
  .onSnapshot(function (querySnapshot) {
    console.log("Data Listened")
    console.log(querySnapshot.data())
    callback(querySnapshot.data());
  })
}
export function cleanGame(){
  db.collection('Rooms')
  .doc('Room_1')
  .collection('Games')
  .doc('tic_tac_toe')
  .update({
    firstPlayer:'0',
    moves:['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    name:"tic tac toe 1",
    player1:["userid", '0'],
    player2:["userid", '0']
  })
  .catch((error) => console.log('collection', error));

}
export function makingAMove(positions){ 
  console.log('MOVING FF')
  console.log(positions)
  db.collection('Rooms')
  .doc('Room_1')
  .collection('Games')
  .doc('tic_tac_toe')
  .update({
    moves:positions
  }).catch((error) => console.log('collection', error));;
}
export function checkFirstPlayer(callback){
  db.collection('Rooms')
  .doc('Room_1')
  .collection('Games')
  .doc('tic_tac_toe')
  .get().then(async snapshot => {
    if (snapshot.data()['firstPlayer'] == "0"){
      await db.collection('Rooms')
      .doc('Room_1')
      .collection('Games')
      .doc('tic_tac_toe')
      .update({
        firstPlayer:'x',
        player1:[auth.currentUser.uid, 'x']
      }).catch((error) => console.log('collection', error));
    }else {
      await db.collection('Rooms')
      .doc('Room_1')
      .collection('Games')
      .doc('tic_tac_toe')
      .update({
        player2:[auth.currentUser.uid, 'o']
      }).catch((error) => console.log('collection', error));
    }
  }).then(async snapt =>{
    await db.collection('Rooms')
    .doc('Room_1')
    .collection('Games')
    .doc('tic_tac_toe')
    .get().then(snap => {
      console.log("new data")
      snap.user_id = auth.currentUser.uid
      callback(snap);
    });
  });
}
// END DATA MANAGEMENT