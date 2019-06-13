import { Form, Modal, Button, Icon} from 'antd';
import React,{useState} from 'react';
import HorizontalLoginForm from './HorizontalLoginForm';
import {visibleStore} from './index';


  const Addnew: React.FC = () => {

    const [visible,setVisible] = useState(false);

  visibleStore.subscribe(() => {
      setVisible(visibleStore.getState())})

  let showModal = () => {
    visibleStore.dispatch({type:'SHOW'});
  };

  const handleCancel = (e: any) => {
    visibleStore.dispatch({type:'HIDE'});
  };
    return (
      <div>
        <Button type="primary" size ="large" onClick={showModal} block>
            <Icon type="user-add" />
            Add
        </Button>
        <Modal
          title="Add new user"
          visible={visible}
          onCancel = {handleCancel}
          // footer = {{}}
        >
             <HorizontalLoginForm/>
        </Modal>
      </div>
    );
  }

export default Addnew;
