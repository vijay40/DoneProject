import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { postData } from '../helpers/api';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (username === '') {
      toast.error('Please enter username', {
        position: toast.POSITION.TOP_CENTER,
        transition: Zoom,
      });
    } else if (password === '') {
      toast.error('Please enter password', {
        position: toast.POSITION.TOP_CENTER,
        transition: Zoom,
      });
    } else {
      try {
        setIsLoading(true);
        await postData('/admin/login', { username, password });
        props.history.push('/patient/list');
      } catch (err) {
        toast.error('Invalid username/password', {
          position: toast.POSITION.TOP_CENTER,
          transition: Zoom,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer />
      <div className="login-form-wrapper">
        <Form>
          <div className="form-header">
            <h3>Admin Sign In</h3>
          </div>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="submit-wrapper">
            <Button
              type="submit"
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting..' : 'Submit'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(Login);
