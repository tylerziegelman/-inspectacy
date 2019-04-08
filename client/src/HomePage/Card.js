import React, { Component } from "react";
import { Card, Icon, Divider } from "antd";
import axios from "axios";
import "./Home.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInspectors } from "../inspectors/actions";
import { withRouter } from "react-router-dom";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.inspectorCards = this.inspectorCards.bind(this);
    this.getRouteHandler = this.getRouteHandler.bind(this);
    this.checker = this.checker.bind(this);
    this.filterInspectors= this.filterInspectors.bind(this);
  }

  componentDidMount() {
    const { getInspectors, isLoaded } = this.props;
    const { inspectors } = this.props;

    if (!isLoaded) {
      getInspectors();
    }
  }

  getRouteHandler(id) {
    console.log("within get route handler " + id);
    this.props.history.push(`profile/${id}`);
  }
  checker() {
    //   const { inspectors, skills,isLoaded } = this.props;
    //   if(inspectors){
    //   return skills.map((skill)=>{
    //    return inspectors.map((i)=>{
    //     return skill.map((s)=>{
    //       console.log(s)
    //       if(i.id===s.inspector.id)
    //         return s.skill
    //       })
    //   })
    // })
    // }
  }
  
  filterInspectors(inspectors,searchTerms){
    let filtered = []
    if (this.props.searchTerms){
      filtered = inspectors.filter(
        (each)=>{
          if (each.skills){
            for (var i=0;i<each.skills.length;i++){
              // if (each.skills[i].skill===searchTerms){
                if (each.skills[i].skill.indexOf(searchTerms) !== -1){
                
                console.log(each.skills[i].skill)
                return true
              }
            }
          }
        }
        )
    }else{
      filtered = inspectors
    }
    return filtered
  }

  inspectorCards() {
    const { inspectors, skills, isLoaded } = this.props;
    console.log(inspectors);
    this.state = {
      inspector_id: inspectors
    };

    let filteredInspectors = this.filterInspectors(inspectors, this.props.searchTerms)
    
    
    if (filteredInspectors.length) {
      return filteredInspectors.map(inspector => {
        return (
          <Card
            className="ant-card-home"
            size="small"
            onClick={() => this.getRouteHandler(inspector.id)}
                href={`profile/${inspector.id}`}
                data-id={inspector.id}
            // /   >
            // title={`${inspector.user.first_name} ${inspector.user.last_name}`}
            // extra={
            //   <button
            //     onClick={() => this.getRouteHandler(inspector.id)}
            //     // href={`profile/${inspector.id}`}
            //     data-id={inspector.id}
            //   >
            //     <Icon type="plus" />
            //   </button>
            // }
            key={inspector.id}
          >
          <h2 className="inspector-name">{`${inspector.user.first_name} ${inspector.user.last_name}`}</h2>
          <div className="card-content">
            <div className="flex-image">
            <div
              className="inspector-image"
              style={{
                background: `url(${inspector.user.image_url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center"
              }}
            />
            <h5>6.7/10</h5>
            </div>
            <div className="card-content-column">
            <div className="list-styles">
            <div className="card-list">
            <ul>
            <label><b>Specialties:</b></label>
              {inspector.skills.map(skill => {
                console.log(skill);
                return <li><b>&#8901;</b> {skill.skill}</li>;
              })}
          </ul>  
            </div>
              <div className="card-list location-ul">
              <ul>
              <label className="location-label"><b>Location:</b></label> <li>{inspector.user.zipcode}</li>
              </ul>
              </div>
              </div>
            </div>
            </div>
          </Card>
        );
      });
    } else {
      return <div />;
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div className="main-container">
        <h1 className="inspector-cards-h1">Inspectors near your item:</h1>
        <div className="inspector-card-container">{this.inspectorCards()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inspectors: state.inspectors.inspectors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInspectors
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cards)
);
