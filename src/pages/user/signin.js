import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// use the dispatch to update the redux store about the signin state
import { useDispatch } from 'react-redux'
import { signin } from '../../slices/authSlice'

const Signin = () => {
  // get user inputs
  const [mobileNo, setMobileNO] = useState('')
  const [password, setPassword] = useState('')

  // get the dispatcher
  const dispatch = useDispatch()

  // get the navigate function reference
  const navigate = useNavigate()

  const signinUser = () => {
    // check if user has really entered any value
    if (mobileNo.length === 0 ||Number(mobileNo)<0 || mobileNo.length!==10) {

      toast.error('please enter valid mobile no')
    } else if (password.length === 0) {
      toast.error('please enter password')
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + '/harvest/login', {  
          mobile_no : mobileNo,
          password: password })
        .then((response) => {
          // get the data returned by server
          const result = response.data

          // check if user's authentication is successfull
          if (result['status'] === 'error') {
            console.log(result);
            toast.error('invalid email or password')
          } else {
            // get the logged in user's info
            const user = result['data']

            // send the action
            dispatch(signin(user))

            toast.success('welcome to app')
            navigate('/home')
          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }

  return (
    <div style={{ marginTop: 100 }}>
      <div style={styles.container}>
        <div className='mb-3'>
          <label>Mobile No.</label>
          <input
            onChange={(event) => {
              setMobileNO(event.target.value)
            }}
            className='form-control'
            type='number'
          />
        </div>
        <div className='mb-3'>
          <label>Password</label>
          <input
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            className='form-control'
            type='password'
          />
        </div>
        <div className='mb-3' style={{ marginTop: 40 }}>
          <button onClick={signinUser} style={styles.signinButton}>
            Signin
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: 400,
    height: 300,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#db0f62',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#db0f62',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}

export default Signin
