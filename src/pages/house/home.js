import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import ToggleHeart from "../../components/toggleHeart";

// get the current signin status
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import SideBarButton from "../../components/sideBarBtton";

const Home = () => {

  const [user_name, setUser_name] = useState('')
  const [mobile_no, setMobile_no] = useState('')
  const [password, setPassword] = useState('')
  const [userID, setUserID] = useState('')
  const [role, setRole] = useState('')
  

  const AddUser = () => {
    const navigate=useNavigate();
    if (user_name.length === 0) {
      toast.error('enter first name')
    } else if (mobile_no.length === 0) {
      toast.error('enter mobile number')
    } else if (password.length === 0) {
      toast.error('enter password')
    } else if(role.length === 0){
        toast.error('enter role of user')
    }else {
      const body = {
        user_name,
        mobile_no,
        password,
        role
      }
    //  console.log(body)

      axios
        .post(config.serverURL + '/harvest/users/add', body, {
          headers: { token: sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'success') {
            toast.success('successfully adde a new home')
            //navigate('/home')
          } else {
            toast.error(result['error'])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }


  return (
    <div className="row">
      <div className="col-2">
        
        <Link to={"/farmerBill"}><SideBarButton  title='Farmer Bill' /></Link>

        <Link to={"/CompanyBill"}><SideBarButton  title='Company Bill' /></Link>

        <SideBarButton onClick={AddUser} title='Labor Bill' />

        <SideBarButton onClick={AddUser} title='Stock/Inventory' />

        <SideBarButton onClick={AddUser} title='Transport' />

        <SideBarButton onClick={AddUser} title='Audit' />

        <SideBarButton onClick={AddUser} title='Containers' />

        <SideBarButton onClick={AddUser} title='Others' />

        <SideBarButton onClick={AddUser} title='Setting' />

      </div>
      
      <div className="col-10"></div>
    </div>
  );
};

export default Home;
