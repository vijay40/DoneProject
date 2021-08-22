import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from '../components/Table';
import { getData } from '../helpers/api';

const ListPatients = () => {
  const [data, setData] = useState([]);

  const columns = React.useMemo(
      () => [
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Phone',
          accessor: 'phone',
        },
        {
          Header: 'Date of Birth',
          accessor: 'dob',
          Cell: ({ value }) => dayjs(value).format('DD-MMM-YYYY'),
        },
        {
          Header: 'Appointment Time',
          accessor: 'appointmentTime',
          Cell: ({ value }) => dayjs(value).format('DD-MMM-YYYY HH:mm'),
        },
      ],
      [],
    ),
    fetchData = async () => {
      const res = await getData('/patient/all');
      setData(res.patients);
    };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div className="list-patient__wrapper">
        <Table columns={columns} data={data} />
      </div>
    </Container>
  );
};

export default ListPatients;
