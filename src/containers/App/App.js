import React from 'react';
import { Layout, Form, Icon, Input, Checkbox, Button } from 'antd';
import './App.css'
import 'whatwg-fetch'
import LoginForm from '../LoginForm/LoginForm'
const FormItem = Form.Item;


class Logintab extends React.Component {
    render() {
        //有三个状态 一个是登录 一个是注册  登录里有两种状态
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className="Register-content">
                <div className="SignFlowHeader">
                    <svg></svg>
                </div>

                <div className="SignContainer-inner">
                    {/* 判断是哪个form */}
                    {<LoginForm/>}
        
                    <div className="SignFlowHomepage-qrImage SignFlowHomepage-qrImageHidden" style={{ display: 'none' }}>
                    </div>
                </div>

                <button className="Button SignFlowHomepage-downloadBtn" type="button" data-reactid="97">
                    下载知乎 App
              </button>


            </div>
        )
    }
}

export default Form.create()(Logintab)