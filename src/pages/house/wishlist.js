import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import config from '../../config'

const Wishlist = () => {
  const [listings, setListings] = useState([])

  // load the homes as soon as the component gets loaded successfully
  useEffect(() => {
    loadHomes()
  }, [])

  // load all homes
  const loadHomes = () => {
    axios
      .get(config.serverURL + '/wishlist/', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        console.log(result)
        if (result['status'] === 'success') {
          setListings(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  // const renderWishlistMessage = () => {
  //   if (listings.length == 0) {
  //     return (
  //       <h4 style={{ textAlign: 'center', margin: 20 }}>
  //         Your wishlist if empty. Please add some homes from the home page.
  //       </h4>
  //     )
  //   } else {
  //     return <div></div>
  //   }
  // }

  return (
    <div className='container'>
      <h3 style={{ textAlign: 'center', margin: 20 }}>Wishlist</h3>
      {/* conditional rendering */}
      {listings.length === 0 && (
        <h4 style={{ textAlign: 'center', margin: 20 }}>
          Your wishlist if empty. Please add some homes from the home page.
        </h4>
      )}

      {/* {renderWishlistMessage()} */}
      <div style={{}} className='row'>
        {listings.map((listing) => {
          const imageUrl = config.serverURL + '/' + listing.image
          console.log(imageUrl)
          return (
            <div
              className='col-3'
              style={{
                position: 'relative',
                padding: 20,
                display: 'inline-block',
                cursor: 'pointer',
              }}>
              <img
                alt='home'
                style={{
                  height: 250,
                  width: '100%',
                  display: 'block',
                  borderRadius: 10,
                }}
                src={imageUrl}
              />
              <div style={{ marginTop: 20 }}>
                <h5 className='card-title'>{listing.title}</h5>
                <p>
                  {listing.tagline} <br />
                  Rs. {listing.rent} per night
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wishlist
