import React from 'react'
import InspectionSubmitModal  from './Modal'
import axios from 'axios'

class InspectionContainer extends React.Component{
    state = {
        item:""
    }
   componentDidMount(){
    let request_id = window.location.href.split("/").pop();
    console.log(request_id)
    axios.post('/getInspection',{
        request_id
    }).then((response) =>{
        console.log(response)
        this.setState({
            item:response.data.item
        })
    }).catch((err) =>{
        console.log(err)
    })
   }
    render(){
        return(
            <div>
            <h1>Item: {this.state.item}</h1>
             <InspectionSubmitModal />
             </div>
             )
    }
}

export default InspectionContainer