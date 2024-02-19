import React from 'react'
import "@css/user/cart.css"
import {Button} from '@mui/material'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Diversity2 } from '@mui/icons-material';
import { MdOutlineDelete } from "react-icons/md";

function Cart() {
  return (
    <section className='user-cart-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='text-center'>
              <h1 className='user-all-booking-heading'>All Booking</h1>
            </div>
            <div className='col-md-12 user-cart-table'>
            <Table className="text-center">
        <Thead>
        <Tr>
          <Th>Artist</Th>
          <Th>Date</Th>
          <Th>Session</Th>
          <Th>Timing</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody className="mt-4">
        <Tr className="user-responsive-table-row">
          <Td>Rahul rawat</Td>
          <Td>18 January</Td>
          <Td>2 Session</Td>
          <Td>11:00Am 05:00Pm</Td>
          <Td>Party Makeup 25000 /-</Td>
          <Td className="common-cursor-pointer" style={{background:"transparant"}}><MdOutlineDelete/></Td>
        </Tr>
        <Tr className=" user-responsive-table-row">
          <Td>Rahul rawat</Td>
          <Td>18 January</Td>
          <Td>2 Session</Td>
          <Td>11:00Am 05:00Pm</Td>
          <Td>Party Makeup 25000 /-</Td>
          <Td className="common-cursor-pointer"><MdOutlineDelete/></Td>
        </Tr>
      </Tbody>
    </Table>
            </div>
            <div className='col-lg-11 d-flex justify-content-between bg-white user-table-grand-total'>
          <p className='user-responsive-table-total'>Grand Total</p>
          <p className='user-responsive-table-total-amount'>75000 /-</p>
      </div>
            <hr className='mt-5'/>
            <div className='text-center mt-5'>
              <button className='btn user-table-book-more-btn ms-4'>BOOK MORE</button>
              <button className='btn user-table-book-btn ms-4'>PAY NOW</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart