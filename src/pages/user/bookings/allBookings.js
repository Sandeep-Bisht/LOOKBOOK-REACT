import { formatIndianRupee } from 'configs/formatIndianRupee';
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import "@css/user/cart.css"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { CiUser } from "react-icons/ci";

const AllBookings = () => {

    const allBookings = useLoaderData();
    const dateOption = { day: '2-digit', month: 'short'};

  return (
    <section className='user-cart-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='text-center'>
              <h1 className='user-all-booking-heading'>All Bookings</h1>
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
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody className="mt-4">
        {allBookings.map((item,index)=>{
          return (
          <Tr className="user-responsive-table-row table-booking-body-row">
            <Td className="text-capitalize table-items">
              <div className='d-flex align-items-center gap-2'>
                {item?.artist?.profile?.image?.thumbnailUrl ? <img src={item?.artist?.profile_id?.image?.thumbnailUrl} width="10"/> : <CiUser />}
                {item?.artist?.profile?.fullName ? item?.artist?.profile?.fullName : ''}
              </div>
            </Td>
            <Td className="text-capitalize table-items">
            {new Intl.DateTimeFormat('en-US', dateOption).format(new Date(item.date))}
            </Td>
            <Td className="text-capitalize table-items">{item?.sessions} Sessions</Td>
            <Td className="text-capitalize table-items">{item?.time.join(', ')}</Td>
            <Td className="text-capitalize table-items">
              {item?.service?.title} {" "}
              {formatIndianRupee(item?.service?.pricing?.totalPrice * item?.sessions)}
            </Td>
            <Td className="text-capitalize table-items">
                Pending
            </Td>
          </Tr>
          )
        })}
      </Tbody>
    </Table>
            </div>
            <hr className='mt-5'/>
            <div className='d-flex gap-3 align-items-center justify-content-center mt-5'>
              <Link to="/services" className="usr-common-action-btn text-decoration-none">BOOK MORE</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllBookings