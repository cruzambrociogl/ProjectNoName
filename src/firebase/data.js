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