import React, { useEffect, useState } from 'react'
import AdminSideNav from '../AdminSideNav'
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_BASE_URL } from '../../config/Config';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { Pagination, PaginationItem, Stack } from '@mui/material';
const AdminProduct = () => {
    const { _id } = useParams();
    const [title, setTitle] = useState("")
    const itemsPerPage = 10; // Number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [ProductList, setProductList] = useState([])
    const [ProductListById, setProductListById] = useState({})
    const [editProduct,setEditProduct] = useState({
        title
    })
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    // <---------- Get Methods ProductList---------->
    const GetProductList = async () => {
        await axios.get(`${API_BASE_URL}/Product/get`).then((response) => {
            setProductList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    //<---------- Post Methods ProductList------------>
    const HnadleProductList = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/Product/post`, { title }).then((response) => {
            console.log(response)
            setTitle("")
            GetProductList()
        }).catch((error) => {
            console.log(error)
        })
    }

    // <-------- Delete ProductList---------------->
    const DeleteProductList = async (_id) => {
        await axios.delete(`${API_BASE_URL}/Product/delete/${_id}`).then((response) => {
            console.log(response)
            GetProductList();
        }).catch((error) => {
            console.log(error)
        })
    }

    // <------- ProductList Get By Id------->
    const GetProductListByID = async (_id) => {
        await axios.get(`${API_BASE_URL}/Product/getById/${_id}`).then((response) => {
            setProductListById(response.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    // <----------- Edit ProductList ---------------->
    const EditProductTitle = editProduct.title
    const EditProductList = async (_id) => {
            await axios.put(`${API_BASE_URL}/Product/update/${_id}`, editProduct ).then((response) => {
                console.log(response)
                GetProductList()
            }).catch((error) => {
                console.log(error)
            }) 
    }
    useEffect(() => {
        GetProductList();
        GetProductListByID(_id);
    }, [_id])

    useEffect(() => {
        // Fetch data for editing
        GetProductListByID(_id);
        GetProductList();
        // Initialize edit form data if available
        if (ProductListById) {
            setEditProduct({
                title: ProductListById.title || "",
               
            });
        }
    }, [_id, ProductListById]);
    useEffect(() => {
        // Calculate total pages based on the number of products
        setTotalPages(Math.ceil(ProductList.length / itemsPerPage));
    }, [ProductList]);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AdminSideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ marginTop: '100px' }}>
                    <button onClick={handleShow} className='btn btn' style={{
                        borderRadius: "20px", width: '200px', color: "white", fontSize: "20px",
                        backgroundColor: "#ff7600", marginBottom: "30px"
                    }}>+ Add Product</button>
                    {/* <---------- This is Add To Product Modal  */}
                    <Modal style={{ marginTop: '100px' }}
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton className='ModalHeader'>
                            <Modal.Title >Add Product</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={HnadleProductList} methods="post">
                            <Modal.Body className='ModalBody'>
                                <input name='title' value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Product...' />
                            </Modal.Body>
                            <Modal.Footer style={{ margin: "auto" }}>

                                <Button className='ModalButton' onClick={handleClose} type='submit'>Add Product</Button>
                            </Modal.Footer >
                        </form>

                    </Modal>
                    {/* <---------- This is Edit To Product Modal  */}
                    <Modal style={{ marginTop: '100px' }}
                        show={show1}
                        onHide={handleClose1}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton className='ModalHeader'>
                            <Modal.Title >Edit Product</Modal.Title>
                        </Modal.Header>
                        <form   onSubmit={(e) => {
                                            e.preventDefault();
                                            if (ProductListById && ProductListById._id) {
                                                EditProductList(ProductListById._id);
                                            } else {
                                                console.error("Missing _id");
                                            }
                                        }} methods="post">
                            <Modal.Body className='ModalBody'>
                                <input name='title' value={editProduct.title}
                                 onChange={(e) =>
                                    setEditProduct({ ...editProduct, title: e.target.value })}
                                    placeholder='Product...' />
                            </Modal.Body>
                            <Modal.Footer style={{ margin: "auto" }}>

                                <Button className='ModalButton' onClick={handleClose1}
                                    type='submit'>Edit Product</Button>
                            </Modal.Footer >
                        </form>

                    </Modal>
                    <Table striped bordered hover>
                        <thead style={{ backgroundColor: "#ff790782" }}>
                            <tr>
                                <th>P.No</th>
                                <th>Product Name</th>
                                <th >Delete</th>
                                <th>Edit</th>
                                <th>View</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                ProductList?.slice(startIndex, endIndex).map((ProductListResult, index) => {
                                    return (
                                        <>
                                            <tr >
                                                <td>{index + 1}</td>
                                                <td>{ProductListResult?.title}</td>
                                                <td><MdDelete onClick={() => DeleteProductList(ProductListResult?._id)} style={{ color: "red", fontSize: "30px", margin: "auto", cursor: "pointer" }} /></td>
                                                <td><FaEdit onClick={() => {
                                                            handleShow1();
                                                            GetProductListByID(ProductListResult?._id);
                                                        }}
                                                    style={{
                                                        color: "green", fontSize: "30px",
                                                        margin: "auto", cursor: "pointer"
                                                    }} /></td>
                                                <td><FaEye style={{
                                                    color: "blue",
                                                    fontSize: "30px", margin: "auto", cursor: "pointer"
                                                }} /></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                    <Stack spacing={2} justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="primary"
                            renderItem={(item) => (
                                <PaginationItem component="div" {...item} />
                            )}
                        />
                    </Stack>
                </Box>
            </Box>
        </div>
    )
}

export default AdminProduct