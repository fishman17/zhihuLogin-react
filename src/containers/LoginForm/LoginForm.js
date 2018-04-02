import React from 'react';
import { Layout, Form, Icon, Input, Checkbox, Button } from 'antd';
import './LoginForm.css'
import 'whatwg-fetch'
const FormItem = Form.Item;


class LoginForm extends React.Component {
    // handleSubmit = (e) => {
    //     e.preventDefault();
    // }
    state = {
        isLogin: false,
        loginForPhone: false,
        form: <div />,
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.props);

        let value = await this.getFormValues();
        if (value) {
            console.log('表单OK');
            console.log(value);
            fetch('./home/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(value)
            }).then(res => {
                // res.json().then(res=>{
                //     console.log(res)
                //     // Message.info(res.message);
                //     if(res.success){
                //         // location.href = '/main';
                //     }
                // })
            })
        }
    }
    getFormValues() {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    resolve(values);
                } else {
                    reject(false);
                }
            })
        })
    }
    changeWays() {
        let isLogin = this.state.isLogin;
        let loginForPhone = this.state.loginForPhone;
        if (this.state.isLogin === false) {   //当前为注册
            isLogin = true;
            loginForPhone = false;  //默认为不用手机登录
        } else {
            isLogin = false;       //跳转到注册界面
            loginForPhone = false;
        }
        this.setState({
            isLogin: isLogin,
            loginForPhone: loginForPhone,
        }
        )
    }
    changeLoginForPhone() {
        this.setState({
            loginForPhone: !this.state.loginForPhone,
        })
        console.log(this.state.loginForPhone)
    }
    getStatus() {
        if (this.state.isLogin === false) {
            return 'register';
        } else if (this.state.loginForPhone === true && this.state.isLogin === true) {
            return 'loginByPhone'
        } else {
            return 'login'
        }
    }

    render() {
        //有三个状态 一个是登录 一个是注册  登录里有两种状态
        const { getFieldDecorator } = this.props.form;
        console.log(this.getStatus());
        switch (this.getStatus()) {
            case 'login':
                return (
                    <div  className="SignContainer-wrapper">
                        <Form onSubmit={this.handleSubmit} className="Register-content">
                            <div className="title">
                                {this.state.isLogin === true ? "登录" : "注册"}知乎，发现更大的世界
                            </div>
                            <FormItem>
                                {

                                    getFieldDecorator('username', {
                                        rules: [{
                                            required: true,
                                            message: "请输入手机号或邮箱"
                                        }]
                                    })(
                                        <Input placeholder="手机号或邮箱" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }]
                                    })(
                                        <Input placeholder="密码" />
                                    )
                                }
                            </FormItem>

                            {/* 判断是哪个form表单下面的东西 */}
                            <div className="Login-options">
                                <button className="Button Login-switchType Button--plain" type="button" onClick={this.changeLoginForPhone.bind(this)}>
                                    手机验证码登录</button>
                                <button className="Button Login-cannotLogin Button--plain" type="button">
                                    忘记密码？
                                </button>
                            </div>


                            {/* 登录 or 注册 按钮 */}
                            <FormItem>
                                <Button type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}>
                                    登录
                                    </Button>
                            </FormItem>
                            <div className="Login-footer">
                                <span className="Login-qrcode">
                                    <button className="Button Button--plain" type="button">
                                        二维码登录</button>
                                </span>
                                <span className="Login-footerSeparate Login-qrcodeSeparate"> · </span>
                                <span className="Login-aboardPhone">
                                    <button className="Button Button--plain" type="button">
                                        海外手机登录</button>
                                </span>
                                <span className="Login-footerSeparate"> · </span>
                                <span className="Login-socialLogin">
                                    <button className="Button Login-socialButtonEntrance Button--plain" type="button">
                                        社交帐号登录</button>

                                </span>
                                <div className="SignContainer-switch">
                                    {this.state.isLogin === true ? "没" : "已"}有帐号？
                                    <span data-reactid="94" onClick={this.changeWays.bind(this)}>{this.state.isLogin === true ? "注册" : "登录"}</span>
                                </div>
                            </div>
                        </Form>
                    </div>
                )
            case 'register':
                return (
                    <div  className="SignContainer-wrapper">
                        <div className="title">
                            {this.state.isLogin === true ? "登录" : "注册"}知乎，发现更大的世界
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                <div className="Popover SignFlow-supportedCountriesSelect">
                                    <button className="Button Select-button Select-plainButton Button--plain" role="combobox" aria-expanded="false" type="button" id="Popover-9351-92409-toggle" aria-haspopup="true" aria-owns="Popover-9351-92409-content">
                                        中国 +86
                                    </button>
                                </div>
                                {

                                    getFieldDecorator('username', {
                                        rules: [{
                                            required: true,
                                            message: "请输入手机号"
                                        }]
                                    })(
                                        <Input placeholder="手机号" className="register-input"/>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请您输入账号密码' }]
                                    })(
                                        <Input placeholder="输入6位短信验证码" />
                                    )
                                }
                                <button className="Button CountingDownButton SignFlow-smsInputButton Button--plain" type="button">获取短信验证码</button>
                            </FormItem>
                            <button className="Button CountingDownButton SignFlow-smsInputButton Button--plain" type="button">接受语音验证码</button>

                            {/* 登录 or 注册 按钮 */}
                            <FormItem>
                                <Button type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}>
                                    注册
                                </Button>
                            </FormItem>
                            <div className="Register-footer">
                                <span className="Register-declaration">注册即代表你同意
                                <a href="https://www.zhihu.com/terms">
                                        《知乎协议》
                                </a>
                                </span>
                                <a className="Register-org" href="https://www.zhihu.com/org/signup">
                                    注册机构号
                                </a>
                            </div>
                            </Form>
                        <div className="SignContainer-switch">
                            {this.state.isLogin === true ? "没" : "已"}有帐号？
                            <span data-reactid="94" onClick={this.changeWays.bind(this)}>{this.state.isLogin === true ? "注册" : "登录"}</span>
                        </div>
                    </div>
                )
            case 'loginByPhone':
                return (
                    <div  className="SignContainer-wrapper">
                        <Form onSubmit={this.handleSubmit} className="Register-content">
                            <div className="title">
                                {this.state.isLogin === true ? "登录" : "注册"}知乎，发现更大的世界
                            </div>
                            <div className="SignFlow-supportedCountriesSelectContainer">
                                <div className="Popover SignFlow-supportedCountriesSelect">
                                    <button className="Button Select-button Select-plainButton Button--plain" role="combobox" aria-expanded="false" type="button" id="Popover-9351-92409-toggle" aria-haspopup="true" aria-owns="Popover-9351-92409-content">
                                        中国 +86
        
                                </button>
                                </div>
                            </div>
                            <FormItem>
                                {

                                    getFieldDecorator('username', {
                                        rules: [{
                                            required: true,
                                            message: "请输入手机号"
                                        }]
                                    })(
                                        <Input placeholder="手机号" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请您输入账号密码' }]
                                    })(
                                        <Input placeholder="输入6位短信验证码" />
                                    )
                                }
                                <button className="Button CountingDownButton SignFlow-smsInputButton Button--plain" type="button">获取短信验证码</button>
                            </FormItem>
                            <div className="Register-smsBackUp">
                            <span onClick={this.changeLoginForPhone.bind(this)}>密码登录(手机号或邮箱)</span>
                            <span>接收语音验证码</span>
                            </div>


                            {/* 登录 or 注册 按钮 */}
                            <FormItem>
                                <Button type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}>
                                    登录
                                </Button>
                            </FormItem>
                            <div className="Login-footer">
                                <span className="Login-qrcode">
                                    <button className="Button Button--plain" type="button">
                                        二维码登录
                                    </button>
                                </span>
                                <span className="Login-footerSeparate Login-qrcodeSeparate"> · </span>
                                <span className="Login-aboardPhone">
                                    <button className="Button Button--plain" type="button">
                                        海外手机登录
                                    </button>
                                </span>
                                <span className="Login-footerSeparate"> · </span>
                                <span className="Login-socialLogin">
                                    <button className="Button Login-socialButtonEntrance Button--plain" type="button">
                                        社交帐号登录
                                    </button>

                                </span>
                                <div className="SignContainer-switch">
                                    {this.state.isLogin === true ? "没" : "已"}有帐号？
                                <span data-reactid="94" onClick={this.changeWays.bind(this)}>{this.state.isLogin === true ? "注册" : "登录"}</span>
                                </div>
                            </div>
                        </Form>
                    </div>
                )
            default:

        }

    }
}

export default Form.create()(LoginForm)