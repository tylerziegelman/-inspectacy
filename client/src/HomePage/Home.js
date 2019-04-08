import React, { Component } from "react";
import axios from "axios";
import Cards from "./Card.js";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../user/actions";
import Map from '../Maps/Maps.js'
class Home extends React.Component {
// class Home extends Component {
  constructor(){
    super()
    this.state = {
      searchTerms: ''
    }
    this.updateSearch=this.updateSearch.bind(this)
  }
  componentDidMount() {
    // this.toLogin=this.toLogin.bind(this)
    // let token = localStorage.getItem("inspectacyjwt");
    // if (!token){
    //     this.toLogin()
    // }

    const { getUser } = this.props;
    getUser();


  }
  
  updateSearch(input){
    this.setState({searchTerms:input})
  }
//   toLogin() {
//     this.props.history.push("/login");
//   }

  render() {
    const { user } = this.props;
    return (
      <div>
        
       {/* <div className="search-wrap"> 
        <div className="logo-container">
    <div className="inspect-logo"></div>
    </div>
        <SearchBar updateSearch={this.updateSearch}/>
        </div> */}
       
    
    
        <div className="search-wrapper">
        <SearchBar updateSearch={this.updateSearch}/>
        </div>
        <div className="map-and-inspectors-wrapper">
        <div className="map-and-inspectors">
       
         <Map addressArray={["59718'", "Bozeman, MT"]}/>
        
        <Cards searchTerms = {this.state.searchTerms}/>
        
        </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state)=>({
    user: state.user.user
})

const mapDispatchToProps = (dispatch)=>bindActionCreators({
    getUser,
},dispatch)

 export default connect(mapStateToProps,mapDispatchToProps)(Home)
