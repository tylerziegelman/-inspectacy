import React from "react"
import { Modal, Button, Form, Input } from 'antd';
import axios from "axios"
const inputStyles = {
    height: "40px",
    borderRadius: "5px",
    width: "60%",
    margin: "0 auto",
    marginLeft: "90px"
}
class InspectionRequestModal extends React.Component {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleSubmit = (e) => {
        let {item,item_url} = this.state
        let {user_id,inspector_id} = this.props.userInfo
        axios.post("/createInspectionRequest",{
            item,
            item_url,
            user_id,
            inspector_id,
        }).then((response) =>{
            console.log(response)
        }).catch((err) =>{
            console.log(err)
        })
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleChange = name => (e) => {
        this.setState({ [name]: e.target.value })
        
    }


    render() {
        return (
            <>
                <Button className="request-btn" type="primary" onClick={this.showModal}>
                    Request Inspection
                </Button>
                <Modal
                    title="Request Inspection"
                    visible={this.state.visible}
                    footer={
                        <div>
                            <Button onClick={this.handleCancel}>
                                Cancel
              </Button>
                            <Button type="primary" onClick={this.handleSubmit}>
                                Submit
          </Button>
                        </div>
                    }
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item>
                            <Input style={inputStyles} onChange={this.handleChange('item')} type="text" placeholder="Item To Be Inspected" />
                        </Form.Item>
                        <Form.Item>
                            <Input style={inputStyles} onChange={this.handleChange('item_url')} type="text" placeholder="Item Url" />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default InspectionRequestModal;