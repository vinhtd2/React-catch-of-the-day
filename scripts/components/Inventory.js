import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import firebase from 'firebase';

//const ref = new Firebase('https://catch-of-the-day-25b11.firebaseio.com/');
//  var ref Firebase.intializeApp({'https://catch-of-the-day-25b11.firebaseio.com/'})

var config = {
    apiKey: "AIzaSyD5Xnoch37sewBxSurrGhGtr94IQ6ZOXWM",
    authDomain: "catch-of-the-day-25b11.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-25b11.firebaseio.com",
    storageBucket: "catch-of-the-day-25b11.appspot.com",
    messagingSenderId: "139769080714"
  };
firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();


@autobind
class Inventory extends React.Component{
  constructor(){
    super();
    this.state = {
      uid : ''
    }
  }

  authenticate(provider){
    console.log('Trying to auth with ' + provider);
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
    })
  }
  renderLogin(){
    return(
      <nav className='login'>
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className='github'>Log In with Github</button>
        <button className='facebook' onClick = {this.authenticate.bind(this, 'facebook')}>Log In with Facebook</button>
        <button className='twitter'>Log In with Twitter</button>
      </nav>
    )
  }
  render(){
    let logoutButton = <button>Log Out ! </button>
    // first check if they arent logged in
    /*if(!this.state.uid){
      return(
        <div>
          {this.renderLogin()}
        </div>
      )
    }

    // then check if they aren't the owner of the current store
    if(this.state.uid !== this.state.owner){
      return(
        <div>
          <p>Sorry, you aren't the owner of this store</p>
          {logoutButton}
        </div>
      )
    }*/
    return(
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {this.props.renderInventory}
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}
Inventory.propTypes = {
  addFish : React.PropTypes.func.isRequired,
  loadSamples : React.PropTypes.func.isRequired,
  fishes : React.PropTypes.object.isRequired,
  //renderInventory : React.propTypes.func.isRequired
}

export default Inventory;
