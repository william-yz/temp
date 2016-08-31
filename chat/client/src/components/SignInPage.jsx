import React, { Component, PropTypes } from 'react'

import { Button, Modal, Form, Input } from 'antd'
import { login } from '../services/user'
import Cookies from 'js-cookie'
import { browserHistory } from 'react-router'
const FormItem = Form.Item

class SignInPage extends Component{

  constructor(props) {
    super(props)
  }
  handleLogin() {
    login(this.props.form.getFieldsValue()).then(({jsonResult}) => {
      Cookies.set('user', jsonResult.response.username)
      browserHistory.push('index')
    })
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Modal ref="modal"
          visible={true}
          title="Login" onOk={this.handleLogin.bind(this)}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.handleLogin.bind(this)}>
              Login
            </Button>
          ]}
        >
        <Form horizontal>
            <FormItem
              label="用户名"
            >
              <Input {...getFieldProps('username', {})} type="text" autoComplete="off"/>
            </FormItem>
            <FormItem
              label="密码"
            >
              <Input {...getFieldProps('password', {})} type="password" autoComplete="off"/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(SignInPage)
