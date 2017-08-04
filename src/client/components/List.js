import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<ul>
					{
						this.props.list.map((item, index)=>(
							<li key={index}>{item}</li>
						))
					}
				</ul>
			</div>
		)
	}
}

const mapStateProps = state=>{
	return{
		list:state.list.list
	}
}
export default connect(mapStateProps)(List);