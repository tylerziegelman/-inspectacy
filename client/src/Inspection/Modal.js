import React from 'react'
import { Modal, Button, Form, Item, Input, Card } from 'antd';
import "./Modal.css"
import UploadImage from '../RegistrationForm/UploadImage'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveUrl } from '../Image/actions'
import { withRouter } from 'react-router-dom'

const inputStyles = {
    height: "40px",
    borderRadius: "5px",
    width: "60%",
    margin: "0 auto",
    marginLeft: "90px"
}
const imageStyle = {
    height: "140px",
    borderRadius: "5px",
    width: "140px",
    margin: "3%"
}
const modalImageStyle = {
    height: "300px",
    width: "300px",
    borderRadius: "5px"
}
const cardStyle = {
    height: "auto"
}
const confirm = Modal.confirm;



class InspectionSubmitModal extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            haveUrl: false,
            uploadedImages: [],
            imageVisible: false,
            imageForModal: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.completeInspection = this.completeInspection.bind(this)
        this.openImage = this.openImage.bind(this)
        this.closeImage = this.closeImage.bind(this)
        this.imageFooter = this.imageFooter.bind(this)
        this.showConfirm = this.showConfirm.bind(this)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    componentDidMount() {
        let request_id = window.location.href.split("/").pop();
        axios.post("/getInspectionImages", {
            request_id: request_id
        }).then((response) => {
            console.log(response.data)
            this.setState({ uploadedImages: response.data })
        }).catch((e) => {
            console.log(e)
        })
    }
    imageFooter() {
        return (<button onClick={this.closeImage}>Close</button>)
    }
    footer() {
        if (this.props.url) {
            return (
                <div>
                    <button onClick={this.handleCancel} >Cancel</button>
                    <button onClick={this.handleSubmit} >Submit</button>
                </div>
            )
        } else {
            return (<button onClick={this.handleCancel}>Cancel</button>)
        }
    }
    handleSubmit = (e) => {
        let url = this.props.url
        let image_description = this.state.description
        let request_id = window.location.href.split("/").pop();

        axios.post("/createInspectionImage",
            // {
            // Headers: {
            //     Authorization:`${localStorage.getItem('inspectacyjwt')}`
            // }
            // },
            {
                image_url: url,
                image_description: image_description,
                request_id: request_id

            }
        ).then((response) => {
            console.log(response.data)
            this.setState({
                uploadedImages: response.data,
                visible: false,
                thisSucks: true
            })
        }).catch((e) => {
            console.log(e)
        })

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
    completeInspection() {
        let request_id = window.location.href.split("/").pop();
        axios.post("/completeInspection",{
            description:this.state.inspectionDescription,
            request_id:request_id
        }).then((response) =>{
            this.props.history.push("/userProfile")
        }).catch((err) => {
            console.log(err)
        })
    }
    openImage(item) {
        this.setState({
            imageVisible: true,
            imageForModal: item
        })
    }
    closeImage(e) {
        this.setState({
            imageVisible: false,
        });
    }
    showConfirm() {
        let description = this.completeInspection
        confirm({
            title: 'Are you sure you want to submit this Inspection?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                description()
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch((e) => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }

    render() {
        return (

            <div>
                <Modal
                    // title=""
                    visible={this.state.imageVisible}
                    footer={this.imageFooter()}
                >
                    <img style={modalImageStyle} src={this.state.imageForModal.image_url} />
                    <p>{this.state.imageForModal.image_description}</p>
                </Modal>
                <h1>Overall Description</h1>
                <Input onChange={this.handleChange("inspectionDescription")} type="text" placeholder="Inspection Description" />
                <Card className={cardStyle}>
                    <Button type="primary" onClick={this.showModal}>
                        Submit Inspection Image
        </Button>
                    {this.state.uploadedImages.map((item) => {
                        return (
                            <div>
                                <a onClick={() => this.openImage(item)}>
                                    <img style={imageStyle} src={item.image_url} />
                                </a>
                                <p>click the image to view the inspection</p>

                            </div>
                        )
                    })}

                </Card>
                <Modal
                    title="Inspection Request"
                    visible={this.state.visible}
                    footer={
                        this.footer()
                    }

                >
                    <Form>
                        <Form.Item>
                            <UploadImage style={{ borderRadius: "0px" }} />
                        </Form.Item>
                        <Form.Item>
                            <Input style={inputStyles} onChange={this.handleChange("description")} type="text" placeholder="Image Description" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Button className="submit-button" onClick={this.showConfirm}>Complete Inspection</Button>

            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        //   ...props,
        url: state.image.url
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveUrl,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InspectionSubmitModal))
