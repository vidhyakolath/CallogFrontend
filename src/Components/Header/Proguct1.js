import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
//import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';
import *as xlsx from 'xlsx';
export default function Product()
{
    const [excelData, setExcelData]= useState([]);
    const [filter, setFilter]= useState([]);


  const readExcel = async(e)=>{
   const file= e.target.files[0];
   const data= await file.arrayBuffer(file);
   const excelfile= xlsx.read(data);
   const excelsheet= excelfile.Sheets[excelfile.SheetNames[0]];
   const exceljson= xlsx.utils.sheet_to_json(excelsheet);
   //console.log(exceljson);
   setExcelData(exceljson);
   setFilter(excelData);
   console.log(excelData)


  }


  const postData = () => {
    console.log("This is our data", excelData);
    const url = "http://localhost:5000/Excel";
    fetch(url, 
    {method: 'POST', // or 'PUT'
    headers: { 'Content-Type': 'application/json',},
    body: JSON.stringify(excelData),
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
})
.catch((error) => {
console.error('Error:', error);
});

}
    const columns= [
        {
            name:"Name",
            selector:(row)=>row.first_name,
        },
        {
            name:"company name",
            selector:(row)=>row.company_name,
        },
        {
            name:"Email",
            selector:(row)=>row.email,
        },
        {
            name:"Price",
            selector:(row)=>row.price,
        },
        
        {
            name:"Action",
            cell:(row)=>(
                <button className="btn btn-danger" onClick={()=>handleDelete(row.first_name)}>Delete</button>
            )
        }

    ];console.log(columns)
    const [data, setData]= useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);

    const getProduct=async()=>{
    try{
        
        const req= await fetch("http://localhost:5000/Excel");
        const res= await req.json();
        console.log(res);
        setData(res);
        setFilter(res);
        
    } catch(error){
       console.log(error);
    }
    }
    useEffect(()=>{
        getProduct();
       // excelData
    }, []);

    useEffect(()=>{
        const result= data.filter((item)=>{
         return item.title.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    },[search]);

   const handleDelete=(val)=>{
    const newdata= data.filter((item)=>item.first_name!==val);
    setFilter(newdata);
   }
   
   const tableHeaderstyle={
    headCells:{
        style:{
            fontWeight:"bold",
            fontSize:"14px",
            backgroundColor:"#ccc"

        },
    },
   }


    return(
       <div>
        <React.Fragment>
            <h1>Total contacts</h1>
            <form  onSubmit={(e)=>postData(e)}>
            <input type="file" className="form-control" onChange={ (e)=>readExcel(e)}  />
            <button>import</button>
            </form>
            <DataTable 
            customStyles={ tableHeaderstyle}
            columns={columns}
            data={filter}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            actions={
                <button className="btn btn-success">Export Pdf</button>
            }
            subHeader
             subHeaderComponent={
                <input type="text"
                className="w-25 form-control"
                placeholder="Search..."
                value={ search}
                onChange={(e)=>SetSearch(e.target.value)}
                
                />
             }
             subHeaderAlign="right"
            
            />
        </React.Fragment></div>
    );
}