import React from 'react';
import { connect } from 'react-redux';

class Item extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				{this.props.item}
			</div>
		)
	}
}

const mapStateProps = state=>{
	return{
		item:state.item.item
	}
}
export default connect(mapStateProps)(Item);