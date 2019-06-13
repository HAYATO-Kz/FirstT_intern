import { Form, Icon, Select, Input, Button , Divider} from 'antd';
import * as React from 'react';
import {FormComponentProps} from 'antd/lib/form/Form';
import {visibleStore} from './index';
import {OptGroupProps} from 'antd/lib/select';
import {dataT} from './App';
interface prop extends FormComponentProps,OptGroupProps{
  label: any;
}
// const prob = FormComponentProps && LabeledValue;
const HorizontalLoginForm: React.FC<prop> = (props) => {

  const role = ['staff','manager'];
  function handleChange(value:any) {
    // selectRole = value;
  }
  let handleSubmit = (e:any) => {
    let ok = true;
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log(err+" and "+values);
      if (!err) {
        console.log('Received values of form: ', values);
        dataT.dispatch({type:"ADD",value:values});
        dataT.dispatch({type:"UPDATE"});
      }
      else{
        ok = false;
        return;
      }
    });
    if(!ok){
      return
    }
    visibleStore.dispatch({type:'HIDE'})
  };

    const { getFieldDecorator} = props.form;
    const { Option } = Select;
    return (
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item label="First name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(
            <Input  placeholder="First name"  />,
          )}
        </Form.Item>
        <Form.Item label = "Last name">
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(
            <Input placeholder="Password"/>,
          )}
        </Form.Item>
        <Form.Item label="Role">
        {getFieldDecorator('role', {
            rules: [{ required: true, message: 'Please select your role!' }],
          })(
            <Select mode="multiple"
              style={{ width: '100%' }}
              placeholder="select role"
              onChange={handleChange}
            optionLabelProp="value">
              <Option value="staff">
                  staff
              </Option>
              <Option value ="manager">
                manager
              </Option>
            </Select>
                     )}
        </Form.Item>
        <Form.Item style={{textAlign:"right"}}>
          <Button type="primary" htmlType="submit" className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }


export default Form.create()(HorizontalLoginForm);