import FormData from 'form-data';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { postFormData } from '../helpers/api';

const RegisterPatient = () => {
  const [dob, setDob] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (name === null) {
        toast.error('Please enter name', {
          position: toast.POSITION.TOP_CENTER,
          transition: Zoom,
        });
      } else if (file === null) {
        toast.error('Please upload license', {
          position: toast.POSITION.TOP_CENTER,
          transition: Zoom,
        });
      } else if (email === null) {
        toast.error('Please enter email', {
          position: toast.POSITION.TOP_CENTER,
          transition: Zoom,
        });
      } else {
        const data = new FormData();
        data.append('licenseImage', file);
        data.append('name', name);
        data.append('email', email);
        data.append('dob', dob);
        data.append('address', address);
        data.append('appointmentTime', appointmentTime);
        data.append('phone', phone);
        await postFormData('/patient/register', data);
        toast.success('Successfully registered', {
          position: toast.POSITION.TOP_CENTER,
          transition: Zoom,
        });
      }
    } catch (err) {
      const errorMessage = 'Unable to register.';
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Zoom,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <ToastContainer />
      <div className="register-form-wrapper">
        <Form>
          <div className="form-header">
            <h3>Register Patient</h3>
          </div>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Date of Birth
            </Form.Label>
            <Col sm={9}>
              <DatePicker onChange={setDob} value={dob} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Email address
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Phone
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="phone"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Address
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                column
                type="address"
                as="textarea"
                placeholder="Enter address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Driver License
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                size="sm"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm={3}>
              Appointment Time
            </Form.Label>
            <Col sm={9}>
              <DateTimePicker
                onChange={setAppointmentTime}
                value={appointmentTime}
              />
            </Col>
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

export default RegisterPatient;
