import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import Copyleft from '../components/Copyleft'
import './Login.less'

const FormItem = Form.Item

class Login extends Component {
  state = {
    isSigningUp: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  toggleSignUp = (e) => {
    console.log(this.state)
    this.setState({
      isSigningUp: !this.state.isSigningUp
    })
  }

  render() {
    const { toggleSignUp } = this
    const { isSigningUp } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className="wrap">
        <div className="login">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="logo-ct">
              <i className="iconfont icon-b2"></i>
            </div>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {
                !isSigningUp ? getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>保持登录</Checkbox>
                ) : ''
              }
              <a className="login-form-forgot" onClick={toggleSignUp} >{ isSigningUp ?  '登录' : '马上注册！'}</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                { isSigningUp ? '注册' : '登录'}
              </Button>
            </FormItem>
          </Form>
        </div>
        <Copyleft />
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login)

export default WrappedNormalLoginForm
