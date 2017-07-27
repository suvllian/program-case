import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { hashHistory } from 'react-router';
import store from './../../../utils/store.js'
import './index.scss'

const FormItem = Form.Item;

class loginForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userNumber: 0,
      userName: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
  }

  componentDidMount() {
    // 浏览器已经存有相关信息，直接进入主页
    if (!!store.get("userNumber") && !!store.get("userName")) {
      if (store.get("userNumber") === 'baiji' && store.get("userName") === 'baiji') {
        hashHistory.push("/reset")
      } else {
        hashHistory.push("/home")
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { userNumber, userName } = this.state

    if (!userNumber || !userName) {
      message.info('请输入完整的工号和花名')
      return 
    }

    store.set("userNumber", userNumber)
    store.set("userName", userName)

    if (userNumber !== 'baiji' || userName !== 'baiji') {
      hashHistory.push("/home")
    } else {
      hashHistory.push("/reset")
    }
  }

  handleName(e) {
    this.setState({
      userName: e.target.value
    })
  }

  handleNumber(e) {
    this.setState({
      userNumber: e.target.value
    })
  }

  render() {
    return (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <p className="login-form-title">LOG IN</p>
          </FormItem>
          <FormItem>
            <Input onChange={this.handleNumber}
             prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号" />
          </FormItem>
          <FormItem>
            <Input onChange={this.handleName}
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="花名" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(loginForm);