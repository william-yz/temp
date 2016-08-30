import React, { Component, PropTypes } from 'react'

import { Button, Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class SignInPage extends Component{

  constructor(props) {
    super(props)
  }
  handleLogin() {
    console.log(this.props.form.getFieldsValue())
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
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
        <Form horizontal form={this.props.form}>
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
