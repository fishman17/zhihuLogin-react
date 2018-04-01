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
        isLogin: true,
        loginForPhone: false,
        form: <div/>,
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
                <Form onSubmit={this.handleSubmit} className="Register-content">
                        <FormItem>
                            <label>账号</label>
                            {
    
                                getFieldDecorator('username', {
                                    rules: [{
                                        required: true,
                                        message: "请您输入账号名称"
                                    }]
                                })(
                                    <Input placeholder="请输入账号" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请您输入账号密码' }]
                                })(
                                    <Input placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
    
                        {/* 判断是哪个form表单下面的东西 */}
                        <FormItem>
                            <p onClick={this.changeLoginForPhone.bind(this)}>123</p>
                        </FormItem>
                        <FormItem>
                            <p>456</p>
                        </FormItem>
    
    
                        {/* 登录 or 注册 按钮 */}
                        <FormItem>
                            <Button type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}>
                                Login
                                </Button>
                        </FormItem>
                        <div className="SignContainer-switch">
                          {this.state.isLogin === true? "没":"已"}有帐号？
                          <span data-reactid="94" onClick={this.changeWays.bind(this)}>{this.state.isLogin === true? "注册":"登录"}</span>
                        </div>
                    </Form>
            )
            case 'register':
            return (<div> register </div>);
            case 'loginByPhone':
            return (<div> loginByPhone </div>);
            default:
            
        }
       
    }
}

export default Form.create()(LoginForm)