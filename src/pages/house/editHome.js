import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'
import Input from '../../components/input'
import TextArea from '../../components/textArea'
import Button from '../../components/button'

const EditHome = (props) => {
  const [details, setDetails] = useState({})
  const [title, setTitle] = useState('')
  const [tagLine, setTagLine] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')

  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [addressLine3, setAddressLine3] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [serviceFee, setServiceFee] = useState('')
  const [cleaningFee, setCleaningFee] = useState('')

  const [rent, setRent] = useState(0)
  const [tax, setTax] = useState(0)
  const [beds, setBeds] = useState(1)
  const [guests, setGuests] = useState(1)
  const [bedRooms, setBedRooms] = useState(1)
  const [bathRooms, setBathRooms] = useState(1)
  const [guestRooms, setGuestRooms] = useState(0)

  // used to ge the data/state sent by previous screen
  const location = useLocation()

  // used to navigate
  const navigate = useNavigate()

  // execute this function when the component gets loaded successfully
  useEffect(() => {
    // get the parameters (state object) sent by the previous page
    // navigate('/edit-home', { state: { homeId: id } })
    // the state passed in the above statement can be accessed by location.state
    const { homeId } = location.state

    // get the details of the home
    getDetails(homeId)
  }, [])

  const getDetails = (id) => {
    axios
      .get(config.serverURL + '/home/details/' + id, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          // set the details
          setDetails(result['data'])
          console.log(result['data'])
        } else {
          toast.error(result['error'])

          // if home not found then to back to the previous page
          navigate('/my-homes')
        }
      })
  }

  const updateHome = () => {}

  return (
    <div className='container'>
      <h3 style={{ textAlign: 'center', margin: 20 }}>Edit Home</h3>
      <div className='row'>
        <div className='row'>
          <div
            className='col'
            style={{
              borderRightStyle: 'solid',
              borderRightColor: 'lightgray',
            }}>
            <Input
              title='Title'
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <Input
              title='Tag Line'
              onChange={(e) => {
                setTagLine(e.target.value)
              }}
            />
            <TextArea
              lines='3'
              title='Short Description'
              onChange={(e) => {
                setShortDescription(e.target.value)
              }}
            />
            <TextArea
              lines='6'
              title='Long Desription'
              onChange={(e) => {
                setLongDescription(e.target.value)
              }}
            />
          </div>
          <div className='col'>
            <Input
              title='Address Line 1'
              onChange={(e) => {
                setAddressLine1(e.target.value)
              }}
            />
            <Input
              title='Address Line 2'
              onChange={(e) => {
                setAddressLine2(e.target.value)
              }}
            />
            <Input
              title='Address Line 3'
              onChange={(e) => {
                setAddressLine3(e.target.value)
              }}
            />
            <Input
              title='City'
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />
            <Input
              title='State'
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
            <Input
              title='Zipcode'
              onChange={(e) => {
                setZipcode(e.target.value)
              }}
            />
          </div>
        </div>

        <hr />

        <div className='row'>
          <div
            className='col'
            style={{
              borderRightStyle: 'solid',
              borderRightColor: 'lightgray',
            }}>
            <Input
              type='number'
              title='Rent (per night)'
              onChange={(e) => {
                setRent(e.target.value)
              }}
            />
            <Input
              type='number'
              title='Service Fee'
              onChange={(e) => {
                setServiceFee(e.target.value)
              }}
            />
            <Input
              type='number'
              title='Cleaning Fee'
              onChange={(e) => {
                setCleaningFee(e.target.value)
              }}
            />
            <Input
              type='number'
              title='Tax'
              onChange={(e) => {
                setTax(e.target.value)
              }}
            />
          </div>
          <div className='col'>
            <Input
              type='number'
              title='No of guests allowed'
              onChange={(e) => {
                setGuests(e.target.value)
              }}
            />
            <Input
              type='number'
              title='No of beds'
              onChange={(e) => {
                setBeds(e.target.value)
              }}
            />
            <Input
              type='number'
              title='No of bathrooms'
              onChange={(e) => {
                setBathRooms(e.target.value)
              }}
            />
            <Input
              type='number'
              title='No of bedrooms'
              onChange={(e) => {
                setBedRooms(e.target.value)
              }}
            />
          </div>
        </div>

        <hr />

        <div className='row'>
          <div className='col'>
            <Button onClick={updateHome} title='Update Details' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditHome
