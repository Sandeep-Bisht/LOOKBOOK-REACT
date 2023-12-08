import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useLoaderData } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSafety } from 'react-icons/ai';

const BASE_URL = process.env.REACT_APP_APIURL;

const BlogList = () => {
     
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])

    const all_blogs=useLoaderData()
    console.log(all_blogs,"check data");
    const navigate=useNavigate()
    useEffect(() => {
      allServicesDetails();
    }, [all_blogs])
  
    const columns = [
      { id: 'title', label: 'Title', minWidth: 170 },
      { id: 'featuredImage', label: 'Images', minWidth: 170 },
      { id: 'description', label: 'Description', minWidth: 170 },
      { id:'action', label: 'Action', minWidth:170 },
    ]
  
    const allServicesDetails = async () => {
      try {
        if (all_blogs && all_blogs.length>0) {
          const blogData = all_blogs;
          const formattedData = blogData.map(blog => ({
            title: blog.title,
            featuredImage: {
              thumbnailUrl: blog.featuredImage?.thumbnailUrl || '',
            },
            description:blog.description
          }));
          setRows(formattedData || []);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        // Handle the error appropriately
      }
    };
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
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
            <Button type='submit' variant='contained' size='large' onClick={()=>navigate("/management/create-blog")}>
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
    {rows.slice(page , rowsPerPage, page  ,rowsPerPage + rowsPerPage).map(row => (
      <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
        {columns.map(column => (
          <TableCell key={column.id} align={column.align}>
            
            {column.id == "featuredImage" ? (
                
              <div>
                <img src={row.featuredImage?.thumbnailUrl} alt="featuredImage" style={{ height: "100px", width: "100px" }} />
              </div>
            ) : column.id == "title" ? (
              row.title
            ) : column.id == "description" ? (
                row.description
              ) 
              :
            column.id == "action" ? (
              
              <div className='d-flex'>
              <div><CiEdit/>
              </div>
              <div className='ms-3'>
              <MdDeleteForever/>
              </div>
              </div>
            
            ) :
            (
              row[column.id]
            )}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
//     const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [rows, setRows] = useState([])
    

//     useEffect(() => {
//         getAllBlog();
//       }, [])
         
//       const columns = [
//         { id: 'title', label: 'Title', minWidth: 170 },
//         { id: 'image', label: 'Images', minWidth: 170 },
//         { id: 'action', label: 'Action', minWidth: 170 },
//       ]

//       const getAllBlog = async() => {
//         try {
//             const response = await axios.get(`${BASE_URL}/blog/blog-create`);
//             if(response.data){
//                const blogData = response.data.data
//                const formattedData = servicesData.map(service => ({
//                 service: service.title,
//                 ,
//                 image: {
//                   thumbnailUrl: service.image?.thumbnailUrl || '',
//                   name: service.image?.name || ''
//                 }
//               }));
//               setRows(formattedData || []);
//             }
//           } catch (error) {
//             console.error("Error fetching services:", error);
//             // Handle the error appropriately
//           }
//         };

//                }
            
          
        
//         catch (error){
                
//         }
       
      
//       const handleChangePage = (event, newPage) => {
//         setPage(newPage)
//       }
    
//       const handleChangeRowsPerPage = event => {
//         setRowsPerPage(+event.target.value)
//         setPage(0)
//       }

//   return (
//     <div>
//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <Grid item xs={12}>
//         <Box
//           sx={{
//             gap: 5,
//             display: 'flex',
//             flexWrap: 'wrap',
//             alignItems: 'center',
//             justifyContent: 'end',
//             marginRight: "20px",
//             marginTop: "10px"
//           }}
//         >
//           <Link href='/management/services/create'>
//             Add
//           </Link>
//         </Box>
//       </Grid>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label='sticky table'>
//           <TableHead>
//             <TableRow>
//               {columns.map(column => (
//                 <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//   {rows.slice(page  rowsPerPage, page  rowsPerPage + rowsPerPage).map(row => (
//     <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
//       {columns.map(column => (
//         <TableCell key={column.id} align={column.align}>
//           {
//            column.id == "image" ? (
//             <div>
//               <img src={row.image?.thumbnailUrl} alt="Image" style={{ height: "100px", width: "100px" }} />
//             </div>
//           ) : column.id == "title" ? (
//             row.service
//           ) : column.id == "action" ? (
//             <>
//             <div className='d-flex'>
//             <div><CiEdit/>
//             </div>
//             <div className='ms-3'>
//             <MdDeleteForever/>
//             </div>
//             </div>
//             </>
//           ) :
//           (
//             row[column.id]
//           )}
//         </TableCell>
//       ))}
//     </TableRow>
//   ))}
// </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component='div'
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//     </div>
//   )
// }

export default BlogList
