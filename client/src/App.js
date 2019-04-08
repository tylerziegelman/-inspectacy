import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Provider} from 'react-redux'
import Header from './Header/HeaderContainer'
import ProfileContainer from './Profile/ProfileContainer';
import UserProfile from './Profile/UserProfile';
import SearchContainer from './Search/SearchContainer';
import MessageDock from './Message/MessageDock';
import './App.css';
import RegisterForm from './RegistrationForm/RegistrationForm';
import {applyMiddleware,createStore} from 'redux'
import rootReducer from './rootReducer'
import NormalWrappedLoginForm from './Login/LoginForm';
import Home from './HomePage/Home'
import {composeWithDevTools} from 'redux-devtools-extension'
// import Inspectors from './inspectors/inspectors'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import Maps from './Maps/Maps'
import InspectorRegistration from './InspectorRegistration/InspectorRegistration'
import InspectionContainer from './Inspection/InspectionContainer'
import Footer from './Footer/Footer'
// const middleware = [logger,thunk]
//add in logger to middleware later
const middleware = [thunk,logger]

const store = createStore(
                  rootReducer,
                  {},
                  composeWithDevTools(applyMiddleware(...middleware))
                )

class App extends Component {
  render() {
    return (
      //provider provides redux to entire app through connect
      //Connect is a part of react-redux, and not redux itself(you need both for this app)
      <Provider store={store}>
        <Router>
          <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/inspectorRegistration" component={InspectorRegistration}/>
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={NormalWrappedLoginForm} />
          {/* <Route path="/register" component={RegisterContainer} /> */}
          <Route path="/profile" component={ProfileContainer} />
          <Route path="/search" component={SearchContainer} />
          <Route path="/map" component={Maps}/>
          <Route path="/message" component={MessageDock} />
          <Route path="/inspection" component={InspectionContainer}/>
          <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

//default state
// const defaultState = {
//   welcome: 'Hi',
//   otherState: 'Some STUFFFFFFF'
// }

//simple reducer
// const greeting = (state=defaultState, action)=>{
//   switch(action.type) {
//     case 'GREET_NAME':
//       return {...state, welcome: `Hello ${action.name}`}
//     case 'GREET_WORLD':
//       return {...state, welcome: 'Hello Round BOYE'}
//     default: 
//       return state
//   }  
// }
