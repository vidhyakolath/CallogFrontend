import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
//import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';
import *as xlsx from 'xlsx';
import {CSVLink} from 'react-csv';
export default function Product()
{
    const [excelData, setExcelData]= useState([]);
    //const [filter, setFilter]= useState([]);


  const readExcel = async(e)=>{
   const file= e.target.files[0];
   const data= await file.arrayBuffer(file);
   const excelfile= xlsx.read(data);
   const excelsheet= excelfile.Sheets[excelfile.SheetNames[0]];
   const exceljson= xlsx.utils.sheet_to_json(excelsheet);
   console.log(exceljson);
   setExcelData(exceljson);
   setFilter(excelData);
   console.log(excelData)


  }


  const postData = () => {
    console.log("This is our data", excelData);
    const url = "https://callog-backend.vercel.app/Excel";
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
            name:"Id",
            selector:(row)=>row._id,
        },
        
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
            name:"Action",
            cell:(row)=>(
                <button className="btn btn-danger" onClick={()=>handleDelete(row._id)}>Delete</button>
            )
        }

    ];console.log(columns)
    const [data, setData]= useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);

    const getProduct=async()=>{
       /*try{
      fetch("http://localhost:5000/Excel",{method:"GET"})
      .then((res)=>res.json())
      .then((data)=>setData(data.data))
      //setData(data.data);
      console.log(data)
      console.log(res.json)
      //console.log(data)
      setFilter(filter.data);
    }*/
    
      try {const req= await fetch("https://callog-backend.vercel.app/Excel");
       const res= await req.json();
        console.log(res.data);
        const res1=res.data
       console.log(res1)
       setData(res1);
        setFilter(res1);}
        
    catch(error){
       console.log(error);
    }
    /*const res = await axios.get('http://localhost:5000/Excel')
    console.log(res.data)
    setData(res.data);*/
    }
    useEffect(()=>{
        getProduct();
       // excelData
    }, []);

    useEffect(()=>{
        const result= data.filter((item)=>{
         return item.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    },[search]);

   const handleDelete=(val)=>{
    const newdata= data.filter((item)=>item._id===val);
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
   const csvData = [
    ["ID", "Name", "Username", "Email"],
    ...data.map(({ _id,first_name,company_name,email}) => [
      _id,
      first_name,
      company_name,
      email,
      
    ]),
  ];

 
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
                <button className="btn btn-success"><CSVLink className="downloadbtn" filename="my-file.csv" data={csvData}>
                Export to CSV
              </CSVLink></button>
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