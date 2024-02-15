import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import UserIcon from 'layouts/components/UserIcon';
import { formatIndianRupee } from 'configs/formatIndianRupee';

const Cart = () => {
    const CartData = useLoaderData();
    if(!CartData || !Array.isArray(CartData) || !CartData.length > 0){
        return <NoDataFound/>
    }

    
  const dateOption = { day: '2-digit', month: 'short'};
  var totalPrice = 0;

  for(let i =0; i < CartData.length; i++){

   totalPrice += (CartData[i]?.artist?.pricing.find(el => el.service === CartData[i]?.service?._id).totalPrice * CartData[i]?.sessions);
  }
  console.log(totalPrice,'total price is this')

  return (
    <section className='py-4 container'>
        <h1 className='text-center text-uppercase'>Cart</h1>
        <div>
        <Table>
                <Thead>
                  <Tr>
                    <Th>Artist Name</Th>
                    <Th>Date</Th>
                    <Th>Session</Th>
                    <Th>Timing</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {CartData.map((item, index) => (
                    <Tr key={index}>
                      <Td className="text-capitalize">
                        <div className='d-flex'>
                          {item?.artist?.profile_id?.image?.thumbnailUrl ? <img src={item?.artist?.profile_id?.image?.thumbnailUrl} width="10"/> : UserIcon}
                          {item?.artist?.profile_id?.fullName}
                        </div>
                      </Td>
                      
                      <Td className="text-capitalize">{new Intl.DateTimeFormat('en-US', dateOption).format(new Date(item.date))}</Td>
                      <Td className="text-capitalize">{item?.sessions} Sessions</Td>
                      <Td className="text-capitalize">{item?.time}</Td>
                      <Td className="text-capitalize">{item?.service?.title} {" "}
                        {formatIndianRupee(item?.artist?.pricing.find(el => el.service === item?.service?._id).totalPrice * item?.sessions)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <div className='d-flex justify-content-between'><span>Grand Total</span><span>{formatIndianRupee(totalPrice)}</span></div>
        </div>
    </section>
  )
}

export default Cart