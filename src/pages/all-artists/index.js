import { useLoaderData,  useOutletContext } from 'react-router-dom';
import NoDataFound from 'pages/become-a-artist/common/noDataFound';
import '@css/user/allArtists.css'
import { ArtistCard } from 'layouts/components/artistCard';


const AllArtists = () => {

  const allArtists = useLoaderData()
  const [ wishlist ] = useOutletContext();


  return (
    <>  
    {allArtists?.length > 0 ? 
    <section className="usr-all-artist ">
        <div className="container-fluid">          
          <div className="row my-5">
            {allArtists && Array.isArray(allArtists) && allArtists.map((artist,ind)=>{
              return (
                <div className="col-md-3 All-artist-card-main" key={`artist${ind}`}>
                  <ArtistCard artistInfo={artist} wishlist={wishlist} />
            </div>
              )
            })}
          </div>
        </div>
      </section>
      : 
    <section className='bg-white pb-4'>
    <NoDataFound/>
    </section>}
    </>
  )
}

export default AllArtists