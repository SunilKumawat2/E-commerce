import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const Protected = (props) => {
    const {Component} = props
    const navigate = useNavigate();
    useEffect(() => {
        let AdminLogin = localStorage.getItem("Adminlogin")
        if(!AdminLogin){
         navigate("/AdminLogin")
        }
    },[])
  return (
    <div>
    <Component/>
    </div>
  )
}

export default Protected