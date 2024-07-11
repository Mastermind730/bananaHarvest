import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyHomes = () => {
  const [homes, setHomes] = useState([])

  // hook used to navigate
  const navigate = useNavigate()

  // this hooks is called when the value(s) are changed
  // first param: callback function which will be called
  // second param:
  // - list of values which when changed, the callback function gets called
  // - empty array as a second param means the callback gets calld when the component
  //   get loaded successfully
  useEffect(() => {
    // user is not yet logged in
    // so send the user to the signin page
    if (!sessionStorage['token']) {
      navigate('/signin')
    } else {
      // load all the homes created by the user
      getMyHomes()
    }
  }, [])

  // get my homes
  const getMyHomes = () => {
    axios
      .get(config.serverURL + '/home/my', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          setHomes(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  // delete my home
  const deleteHome = (id) => {
    axios
      .delete(config.serverURL + '/home/' + id, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          // reload the screen
          getMyHomes()
        } else {
          toast.error(result['error'])
        }
      })
  }

  // edit my home
  const editHome = (id) => {
    // pass the home id which you want to edit
    navigate('/edit-home', { state: { homeId: id } })
  }

  const uploadImage = (id) => {
    navigate('/upload-image', { state: { homeId: id } })
  }

  return (
    <div className='container'>
      <h3 style={styles.h3}>My Homes</h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Rent</th>
            <th>Title</th>
            <th>Tag Line</th>
            <th>Short Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes.map((home) => {
            return (
              <tr>
                <td>{home.id}</td>
                <td>{home.rent}</td>
                <td>{home.title}</td>
                <td>{home.tagline}</td>
                <td>{home.shortDescription}</td>
                <td>
                  <button
                    onClick={() => uploadImage(home.id)}
                    style={styles.button}
                    className='btn btn-sm btn-warning'>
                    Upload Image
                  </button>
                  <button
                    onClick={() => editHome(home.id)}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHome(home.id)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  h3: {
    textAlign: 'center',
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
}

export default MyHomes
