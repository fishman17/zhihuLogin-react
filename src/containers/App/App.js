import React from 'react';
import { Layout, Form, Icon, Input, Checkbox, Button } from 'antd';
import './App.css'
import 'whatwg-fetch'
import LoginForm from '../LoginForm/LoginForm'
const FormItem = Form.Item;


class Logintab extends React.Component {
    // handleSubmit = (e) => {
    //     e.preventDefault();
    // }
    state = {
        isLogin: false,
        loginForPhone: false,
        loginStatus: 'login',
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

    updateForm(){
        let form = <div />;
        // switch (this.getStatus()) {
        //     case 'login':
        //         form = <Form onSubmit={this.handleSubmit} className="Register-content">
        //             <FormItem>
        //                 <label>账号</label>
        //                 {

        //                     getFieldDecorator('username', {
        //                         rules: [{
        //                             required: true,
        //                             message: "请您输入账号名称"
        //                         }]
        //                     })(
        //                         <Input placeholder="请输入账号" />
        //                     )
        //                 }
        //             </FormItem>
        //             <FormItem>
        //                 {
        //                     getFieldDecorator('password', {
        //                         rules: [{ required: true, message: '请您输入账号密码' }]
        //                     })(
        //                         <Input placeholder="请输入密码" />
        //                     )
        //                 }
        //             </FormItem>

        //             {/* 判断是哪个form表单下面的东西 */}
        //             <FormItem>
        //                 <p onClick={this.changeLoginForPhone.bind(this)}>123</p>
        //             </FormItem>
        //             <FormItem>
        //                 <p>456</p>
        //             </FormItem>


        //             {/* 登录 or 注册 按钮 */}
        //             <FormItem>
        //                 <Button type="primary"
        //                     htmlType="submit"
        //                     style={{ width: '100%' }}>
        //                     Login
        //                     </Button>
        //             </FormItem>
        //         </Form>
        //         break;
        //     case 'register':
        //         break;
        //     case 'loginByPhone':
        //         break;
        //     default:
        //         form = <div />
        // }
    }
    render() {
        //有三个状态 一个是登录 一个是注册  登录里有两种状态
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className="Register-content">
                <div className="SignFlowHeader">
                    <svg></svg>
                    <div className="title">
                        {this.state.isLogin === true ? "登录" : "注册"}知乎，发现更大的世界
                  </div>
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