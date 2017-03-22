import React from 'react';
import h from '../helpers';
import fishes from '../sample-fishes';
import linkState from 'react-link-state';
import StorePicker from './StorePicker';
import Fish from './Fish';
import AddFishForm from './AddFishForm';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

import autobind from 'autobind-decorator';

import Rebase from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-25b11.firebaseio.com/');
//import firebase from 'firebase';



@autobind

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fishes: {},
      order: {}
    }
  }
  componentDidMount(){
    base.syncState(this.props.params.storeId + '/fishes', {
      context : this,
      state : 'fishes'
    })
    /*this.setState({
      fishes : fishes
    })*/
    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }

  }
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }
  addToOrder(key){
    this.state.order[key] = this.state.order[key] + 1 || 1;

    this.setState({
      order: this.state.order
    })
  }
  addFish(fish){
      var timestamp = (new Date()).getTime();
      this.state.fishes['fish-' + timestamp] = fish;
      this.setState({
         fishes : this.state.fishes
       });
  }
  removeFromOrder(key){
    delete this.state.order[key];
    this.setState({
      order: this.state.order
    })
  }
  removeFish(key){
    if(confirm('Are you sure you want to remove this fish ?!')){
      delete this.state.fishes[key];
      this.setState({
        fishes: this.state.fishes
      })
    }
  }
  loadSamples(){
    this.setState({
      fishes: fishes
    })
  }
  renderFish(key){
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    )
  }
  renderInventory(key){
    return(
      <div className='fish-edit' key={key}>
        <input type='text' valueLink={linkState(this, 'fishes.' + key + '.name' )}/>
        <input type="text" valueLink={linkState(this, 'fishes.' + key + '.price')}/>
        <select valueLink={linkState(this,'fishes.' + key + '.status')}>
          <option value="unavailable">Sold Out!</option>
          <option value="available">Fresh!</option>
        </select>
        <textarea valueLink={linkState(this,'fishes.' + key + '.desc')}></textarea>
        <input type='text' valueLink={linkState(this, 'fishes.' + key + '.image')} />
        <button onClick={this.removeFish.bind(null,key)}>Remove Fish</button>
      </div>
    )
  }
  render(){
    return(
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <ul className='list-of-fishes'>
            {Object.keys(this.state.fishes).map((key) => this.renderFish(key))}
          </ul>
        </div>

        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes}
          renderInventory={Object.keys(this.state.fishes).map(this.renderInventory)}/>
      </div>
    )
  }
}

export default App;
