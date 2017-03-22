import React from 'react';
import history from '../history';
import h from '../helpers';
import autobind from 'autobind-decorator';
@autobind
class StorePicker extends React.Component{
  //mixins : [History]
  /*constructor(props){
    super(props);
    this.goToStore = this.goToStore.bind(this);
  }*/

  goToStore(event){
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    //console.log(this.refs);
    history.replaceState(null,'/store/' + storeId);
  }
  render(){
    return(
      <form className='store-selector' onSubmit={this.goToStore}>
      {/* Comment goes in here */}
        <h2>Please Enter a Store</h2>
        <input type='text' ref='storeId' defaultValue={h.getFunName()}/>
        <input type='Submit'/>
      </form>
    )
  }
}

export default StorePicker;
