import React, { useState} from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useLoaderData } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosAuth } from 'configs/axiosInstance'

const Categories = () => {
     
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const all_categories=useLoaderData()
    const navigate=useNavigate()
  
    const columns = [
      { id: 'title', label: 'Category Name', minWidth: 170 },
      { id: 'description', label: 'Description', minWidth: 170 },
      { id:'action', label: 'Action', minWidth:170 },
    ]
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }
    const editHandler = (_id)=>{
      navigate(`/management/categories/create/${_id}`)
    }

    const categoryDeleteHandler = async(_id)=>{
      try{
        const response = await axiosAuth.delete(`category/delete_category/${_id}`)
      }catch(error){
         return error
      }
    }
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid item xs={12}>
          <Box
            sx={{
              gap: 5,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'end',
              marginRight: "20px",
              marginTop: "10px"
            }}
          >
            <Button type='submit' variant='contained' size='large' onClick={()=>navigate("/management/categories/create")}>
          <MdAdd className="me-2"/> Add
          </Button>
          </Box>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
    {all_categories && all_categories.length>0 && all_categories.map(row => 
    {
        return(
            <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
            {columns.map(column => (
              <TableCell key={column.id} align={column.align}>
                
                { column.id == "title" ? (
                  row.title
                ) : column.id == "description" ? (
                    row.description
                  ) 
                  :
                column.id == "action" ? (
                  
                  <div className='d-flex'>
                  <div className="fs-4 text-black reset-edit-btn" onClick={() => editHandler(row?._id)}><CiEdit/>
                  </div>
                  <div className='ms-3 fs-4 text-black reset-edit-btn'>
                  <MdDeleteForever onClick={()=>categoryDeleteHandler(row?._id)}/>
                  </div>
                  </div>
                
                ) :
                (
                  row[column.id]
                )}
              </TableCell>
            ))}
          </TableRow>
        )
    }
    )}
  </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={all_categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  }

export default Categories
