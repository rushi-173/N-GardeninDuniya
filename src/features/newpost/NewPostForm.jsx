import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../feed/feedSlice';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

function NewPostForm() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('idle');
  const {addToast} = useToasts();
  const [formValues, setFormValues] = useState({
    content: '',
    time: null,
  });
  const navigate = useNavigate();

  const handleFormValueChange = event => {
    setFormValues(formValues => {
      formValues[event.target.name] = event.target.value;
      return { ...formValues };
    });
  };

  const validateFormData = formValues => {
    if (formValues.content === '') {
      return false;
    }
    return true;
  };

  const handlePost = async event => {
    if (!validateFormData(formValues)) {
      addToast(`Empty Post`,{appearance: "error"});
      return;
    }
    setStatus('loading');

    formValues.time = new Date();
    await dispatch(addNewPost({ ...formValues }));
    setStatus('idle');
    setFormValues({ content: '', time: null });
    
    navigate("/")
  };

  return (
    <div className="container-center container-column">
      <div className="div-sm-child">
          <div class="avatar avatar-md">
            <img
              src={
                user?.photo
                  ? user?.photo
                  : 'https://www.shareicon.net/data/256x256/2016/02/22/722964_button_512x512.png'
              }
              alt="profile"
              className="avatar-img"
            />
          </div><br/><br/>
          <textarea
            className="input-area"
            rows="4"
            name="content"
            value={formValues.content}
            onChange={event => handleFormValueChange(event)}
            placeholder="Write your thoughts.."
          /><br/><br/>

        <button
          className="btn btn-primary"
          disabled={status === 'loading'}
          onClick={handlePost}
          style={{width: "100%"}}
        >
          {status === 'idle' && <p>Post</p>}
          {status === 'loading' && <p>Posting..</p>}
        </button>
      </div>
    </div>
  );
}

export default NewPostForm;
