import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/common/Header';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isResizeToMobile:false,
            routerName:''
        }
    }
    componentWillReceiveProps(nextProps) {
        
    }
    componentDidMount() {
        
    }
    render(){
        return(
            <div>
                <Header />
                <div className="router-view">
                    {this.props.children}
                </div>
            </div>
        )
    }
    componentWillMount(){
    }
}

const mapStateProps = (state)=>{
    return{
    }
}

export default connect(mapStateProps)(App);
