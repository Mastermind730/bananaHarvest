import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import ToggleHeart from "../../components/toggleHeart";
import { Link } from "react-router-dom";
import "./styles.css";

import SideBarButton from "../../components/sideBarBtton";
const Home = () => {
  const [user_name, setUser_name] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const AddUser = () => {
    if (user_name.length === 0) {
      toast.error('Enter user name');
    } else if (mobile_no.length === 0) {
      toast.error('Enter mobile number');
    } else if (password.length === 0) {
      toast.error('Enter password');
    } else if (role.length === 0) {
      toast.error('Enter role of user');
    } else {
      const body = {
        user_name,
        mobile_no,
        password,
        role
      };

      axios
        .post(config.serverURL + '/harvest/users/add', body, {
          headers: { token: sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data;
          if (result['status'] === 'success') {
            toast.success('Successfully added a new user');
            // Reset form fields if needed
            setUser_name('');
            setMobile_no('');
            setPassword('');
            setRole('');
          } else {
            toast.error(result['error']);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="row">
  <div className="col-2">
    <nav className="navbar navbar-expand-lg my_nav navbar-light bg-light shadow-md">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav flex-column gap-2 h-[100%]">
          <li className="nav-item active">
            <Link to={"/farmerBill"} className="nav-link custom-link">Farmer Bill</Link>
          </li>
          <li className="nav-item active">
            <Link to={"/CompanyBill"} className="nav-link custom-link">Company Bill</Link>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Labor Bill</button>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Stock/Inventory</button>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Transport</button>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Audit</button>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Containers</button>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Others</button>
          </li>
          <li className="nav-item active">
            <button className="btn btn-link nav-link custom-link">Setting</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <div className="col-10 bg-gray-100 p-4">
  
  

  <img src="/bg.jpg" alt="Harvest_image" className="harvest_image" />
</div>

</div>

  );
};

export default Home;
