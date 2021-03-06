import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Redirect } from 'react-router-dom'
import { reduxConnect } from '../helpers'
import Copyleft from '../components/Copyleft'
import './Login.less'

const FormItem = Form.Item

class Login extends Component {
  state = {
    redirectToReferrer: false
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    const { userLogin, userSignup } = this.props.actions
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(this.props.user.select_form === 'login') {
        userLogin(values)
      } else {
        userSignup(values)
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { token } = this.props.user

    if (token) {
      return (
        <Redirect to={from}/>
      )
    }

    const { userSelectForm } = this.props.actions
    const { select_form } = this.props.user
    const { getFieldDecorator } = this.props.form

    return (
      <div className="wrap">
        <div className="login">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="logo-ct">
              <i className="iconfont icon-b2"></i>
            </div>
            <FormItem>
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {
                select_form === 'login' ? getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>保持登录</Checkbox>
                ) : ''
              }
              <a className="login-form-forgot" onClick={e => userSelectForm(select_form === 'login' ? 'signup' : 'login')} >{ select_form === 'signup' ? '登录' : '马上注册！'}</a>
              <Button onClick={this.handleSubmit} type="primary" htmlType="submit" className="login-form-button">
                { select_form === 'login' ? '登录' : '注册'}
              </Button>
            </FormItem>
          </Form>
        </div>
        <Copyleft />
      </div>
    )
  }
}

const connectedLogin = reduxConnect(Login)

// antd 表单验证绑定操作
const WrappedNormalLoginForm = Form.create()(connectedLogin)

export default WrappedNormalLoginForm
