import React, { useEffect, useState } from 'react'
import AdminSideNav from '../AdminSideNav'
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../config/Config';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { Pagination, PaginationItem, Stack } from '@mui/material';

const AdminProductMoreDetails = () => {
    const { _id } = useParams();
    const [title, setTitle] = useState("")
    const [images, setImages] = useState("")
    const itemsPerPage = 10; // Number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [ProductList, setProductList] = useState([])
    const [Product, setProduct] = useState("")
    const [ProductDetailsList, setProductDetailsList] = useState([])
    const [ProductDetailsListById, setProductDetailsListById] = useState({})
    const [editProductDetails, setEditProduct] = useState({
        title,
        images
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    // <---------- Get Methods ProductDetailsList---------->
    const GetProductDetailsList = async () => {
        await axios.get(`${API_BASE_URL}/ProductDetails/get`).then((response) => {
            setProductDetailsList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const GetProductList = async () => {
        await axios.get(`${API_BASE_URL}/Product/get`).then((response) => {
            setProductList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    //<---------- Post Methods ProductDetailsList------------>
    const HandleProductDetailsList = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("images", images);
        formData.append("title", title);
        formData.append("Product", Product);
        axios.post(`${API_BASE_URL}/ProductDetails/post`, formData).then((response) => {
            console.log(response)
            setTitle("")
            GetProductDetailsList()
        }).catch((error) => {
            console.log(error)
        })
    }

    // <-------- Delete ProductDetailsList---------------->
    const DeleteProductDetailsList = async (_id) => {
        await axios.delete(`${API_BASE_URL}/ProductDetails/delete/${_id}`).then((response) => {
            console.log(response)
            GetProductDetailsList();
        }).catch((error) => {
            console.log(error)
        })
    }

    // <------- ProductDetailsList Get By Id------->
    const GetProductDetailsListById = async (_id) => {
        await axios.get(`${API_BASE_URL}/ProductDetails/getById/${_id}`).then((response) => {
            setProductDetailsListById(response.data.data)
        
        }).catch((error) => {
            console.log(error)
        })
    }
console.log("ProductDetailsListById",ProductDetailsListById)
    // <----------- Edit ProductDetailsList ---------------->
    const EditProductDetailsList = async (_id) => {
        await axios.put(`${API_BASE_URL}/ProductDetails/update/${_id}`, editProductDetails).then((response) => {
            console.log(response)
            GetProductDetailsList()
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        GetProductDetailsList();
        GetProductList();
        GetProductDetailsListById(_id);
    }, [_id])

    useEffect(() => {
        // Fetch data for editing
        GetProductDetailsListById(_id);
        GetProductDetailsList();
        // Initialize edit form data if available
        if (ProductDetailsListById) {
            setEditProduct({
                title: ProductDetailsListById.title || "",
                images: ProductDetailsListById.images || "",
           
            });
        }
    }, [_id, ProductDetailsListById]);
    useEffect(() => {
        // Calculate total pages based on the number of products
        setTotalPages(Math.ceil(ProductDetailsList.length / itemsPerPage));
    }, [ProductDetailsList]);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
  return (
    <Box sx={{ display: 'flex' }}>
    <AdminSideNav />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ marginTop: '100px' }}>
        <button onClick={handleShow} className='btn btn' style={{
            borderRadius: "20px", width: '260px', color: "white", fontSize: "20px",
            backgroundColor: "#ff7600", marginBottom: "30px"
        }}>+ Add Product Details</button>
        {/* <---------- This is Add To Product Modal  */}
        <Modal style={{ marginTop: '100px' }}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className='ModalHeader'>
                <Modal.Title >Add Product Details</Modal.Title>
            </Modal.Header>
            <form onSubmit={HandleProductDetailsList} methods="post"
                encType='multipart/form-data'>
                <Modal.Body className='ModalBody'>
                    <select
                        className='form-control mb-3'
                        name='Product'
                        value={Product}
                        onChange={(e) => {
                            setProduct(e.target.value)
                            console.log('Selected Development Service ID:', e.target.value);
                        }}
                    >
                        <option value='' disabled>Select Product...</option>
                        {
                            ProductList?.map((ProductListResult) => {
                                return (
                                    <>
                                        <option key={ProductListResult?._id}
                                            value={ProductListResult?._id}>
                                            {ProductListResult?.title}</option>
                                    </>
                                )
                            })
                        }

                        {/* Add more options as needed */}
                    </select>
                    <input type='text' style={{ marginBottom: "20px" }} name='title' value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder='Product...' />
                    <input type="file" name='images'
                        onChange={(e) => setImages(e.target.files[0])}
                        placeholder='Product Images...' />
                </Modal.Body>
                <Modal.Footer style={{ margin: "auto" }}>

                    <Button className='ModalButton'
                        onClick={handleClose} type='submit'>
                        Add Product Details</Button>
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
                <Modal.Title >Edit Product Details</Modal.Title>
            </Modal.Header>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (ProductDetailsListById && ProductDetailsListById?._id) {
                    EditProductDetailsList(ProductDetailsListById?._id);
                } else {
                    console.error("Missing _id");
                }
            }} methods="post">
                <Modal.Body className='ModalBody'>
                    <img src='' style={{width:"200px"}} alt=''/>

                    <input style={{marginBottom:"20px"}} name='title' value={editProductDetails.title}
                        onChange={(e) =>
                            setEditProduct({ ...editProductDetails, title: e.target.value })}
                        placeholder='Product...' />

                    <input style={{marginBottom:"20px"}} type="file" name='images'
                        onChange={(e) => setImages(e.target.files[0])}
                        placeholder='Product Images...' />
                </Modal.Body>
                <Modal.Footer style={{ margin: "auto" }}>

                    <Button className='ModalButton' onClick={handleClose1}
                        type='submit'>Edit Product Details</Button>
                </Modal.Footer >
            </form>

        </Modal>
        <Table striped bordered hover>
            <thead style={{ backgroundColor: "#ff790782" }}>
                <tr>
                    <th>P.No</th>
                    <th>Product Name</th>
                    <th >Images</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    <th>View</th>

                </tr>
            </thead>
            <tbody>
                {
                    ProductDetailsList?.slice(startIndex, endIndex).map((ProductListResult, index) => {
                        return (
                            <>
                                <tr >
                                    <td>{index + 1}</td>
                                    <td>{ProductListResult?.title}</td>
                                    <td><img style={{ width: "50px", height: '50px' }} src={`${IMG_BASE_URL}${ProductListResult?.images}`} /></td>
                                    <td><MdDelete onClick={() =>
                                        DeleteProductDetailsList(ProductListResult?._id)}
                                        style={{
                                            color: "red", fontSize: "30px", margin:
                                                "auto", cursor: "pointer"
                                        }} /></td>
                                    <td><FaEdit onClick={() => {
                                        handleShow1();
                                        GetProductDetailsListById(ProductListResult?._id);
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
  )
}

export default AdminProductMoreDetails