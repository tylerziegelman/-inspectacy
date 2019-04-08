import React from 'react'
import { Upload, Icon, Modal } from 'antd';
import axios from 'axios'
import './Reg-Form.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveUrl } from '../Image/actions'

class UploadImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: '-1',
      name: '',
      status: 'done',
      url: '',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList, file }) => {
    this.setState({ fileList })
    const formData = new FormData();
    formData.append('image_url', file.originFileObj)

    //this.setState({ fileList })
    axios.post(`/uploadImage`, formData).then((response) => {

      const { saveUrl } = this.props
      saveUrl(response.data)
      this.setState({
          image_url: response.data,
          fileList
      })

    })

  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action=""
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>

    );
  }

}


const mapStateToProps = (state) => ({
  url: state.url
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveUrl,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage)