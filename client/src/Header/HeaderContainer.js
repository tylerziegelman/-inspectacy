import React from "react";
import HeaderPresentational from "./HeaderPresentational"; // <-- that's the presentational component
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../user/actions";
import "./Header.css";

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
    this.routeTo = this.routeTo.bind(this)
  }

  componentDidMount() {
    let token = localStorage.getItem("inspectacyjwt");
    if (!token) {
      this.routeTo('login')
    }
    const { getUser } = this.props;
    getUser();
  }

  routeTo(route){
    this.props.history.push("/"+route);
  }

  logout() {
    localStorage.removeItem("inspectacyjwt");
    this.props.history.push("/login");
  }


  render() {
    const { user } = this.props;

    return (
      <HeaderPresentational
        
        logout={this.logout}
        routeTo={this.routeTo}
      />
    );
  }

}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderContainer)
);
