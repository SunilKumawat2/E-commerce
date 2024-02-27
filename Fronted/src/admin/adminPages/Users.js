import React, { useEffect, useState } from 'react'
import AdminSideNav from '../AdminSideNav'
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_BASE_URL } from '../../config/Config';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
const Users = () => {
    const [UserList, setUserList] = useState([])
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const GetUserList = async () => {
        await axios.get(`${API_BASE_URL}/user/get`).then((response) => {
            setUserList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        GetUserList();
    }, [])
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AdminSideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ marginTop: '100px' }}>
                    {/* <button onClick={handleShow} className='btn btn' style={{
                        borderRadius: "20px", width: '200px', color: "white", fontSize: "20px",
                        backgroundColor: "#ff7600", marginBottom: "30px"
                    }}>+ Add User</button>
                     <Modal style={{marginTop:'100px'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal> */}
                    <Table striped bordered hover>
                        <thead style={{ backgroundColor: "#ff790782" }}>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>PassWord</th>
                                <th>Confirm Password</th>
                                <th>Verify User</th>
                                <th>Token</th>
                                <th>Otp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                UserList?.map((UserListResult) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>1</td>
                                                <td>{UserListResult?.name}</td>
                                                <td>{UserListResult?.email}</td>
                                                <td>{UserListResult?.phone}</td>
                                                <td>{UserListResult?.password}</td>
                                                <td>{UserListResult?.conf_password}</td>
                                                <td>{UserListResult?.is_veerify}</td>
                                                <td>{UserListResult?.tokens}</td>
                                                <td>{UserListResult?.otp}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </Box>
            </Box>

        </div>
    )
}

export default Users