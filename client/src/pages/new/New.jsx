import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import {message , Form , Input ,Select} from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function New({ title }){
   let states = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry" ,
      "Non-Indian"
  ];
  const currentDate = dayjs(new Date);
  const dateFormat = 'YYYY-MM-DD';
  function ValidatePAN() {

   var txtPANCard = document.getElementById("txtPANCard");

   var lblPANCard = document.getElementById("lblPANCard")

   var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

   if (regex.test(txtPANCard.value.toUpperCase())) {

       lblPANCard.style.visibility = "hidden";

       return true;

   } else {

       lblPANCard.style.visibility = "visible";

       return false;

   }

}
const Navigate = useNavigate(true);
const onFinish = async (values) => {
   if(ValidatePAN()){
      const d = dayjs(values.DOB).format("YYYY-MM-DD");
      const newPAN = values.PAN.toUpperCase();
      values.PAN = newPAN;
      values.DOB = d;
      if(values.country === undefined){
         values.country = "India";
      }
      try {
         await axios.post('api/clients/register',values);
         message.success('Registration Successful');
         Navigate('/users');
      } catch (error) {
         message.error('Something went wrong');
      }
}
else {
   message.error('Something went wrong');
}
}
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top" id="t">
          <h1>{title}</h1>
        </div>
        <div className="bottom"  id="b">
            <Form layout="vertical" className="form" onFinish={onFinish}>
               <Form.Item label="Enter Your Name" name="name" className="forminput">
                  <Input  type="text" placeholder="John doe" pattern="[a-zA-Z ]*" minLength={2} maxLength={25} required />
               </Form.Item>
               <Form.Item label="Enter Your User Name" name="username" className="forminput">
                  <Input  type="text" pattern="[a-zA-Z0-9@_]*" required />
               </Form.Item>
               <Form.Item label="Enter Your Phone Number" name="phonenumber" className="forminput">
                  <Input  type="text" pattern="[0-9]{10}" required />
               </Form.Item>
               <Form.Item label="Enter Your Email ID" name="email" className="forminput">
                  <Input  type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required />
               </Form.Item>
               <Form.Item label="Enter Your Address" name="address" className="forminput">
                  <Input  type="text" required />
               </Form.Item>
               <Form.Item label="Enter Your City" name="city" className="forminput">
                  <Input  type="text" pattern="[a-zA-Z ]*" required />
               </Form.Item>
               <Form.Item label="Enter Your PinCode" name="pincode" className="forminput">
                  <Input  type="text" pattern="[0-9]{6}" required />
               </Form.Item>
               <Form.Item label="Enter Your Country" name="country" className="forminput">
                  <Select className="select" defaultValue="India" required>
                     <Select.Option value="Australia">Australia</Select.Option>
                     <Select.Option value="Cannada">Cannada</Select.Option>
                     <Select.Option value="China">China</Select.Option>
                     <Select.Option value="France">France</Select.Option>
                     <Select.Option value="Germany">Germany</Select.Option>
                     <Select.Option value="India">India</Select.Option>
                     <Select.Option value="Russia">Russia</Select.Option>
                     <Select.Option value="USA">USA</Select.Option>
                     <Select.Option value="Argentina">Argentina</Select.Option>
                     <Select.Option value="Brazil">Brazil</Select.Option>
                     <Select.Option value="Spain">Spain</Select.Option>
                     <Select.Option value="Portugal">Portugal</Select.Option>
                  </Select>
               </Form.Item>
                <Form.Item label="Enter Your State" name="state" className="forminput">
                   <Select className="select" required>
                     {states.map((d)=>(
                         <Select.Option value={d}>{d}</Select.Option>
                     ))}
                   </Select>
                </Form.Item>
                <div className="forminput">
                <Form.Item label="Enter Your PAN Number" name="PAN">
                   <Input type="text" id="txtPANCard" className="PAN" placeholder="ABCDE1234X" required/>
                </Form.Item>
                <span id="lblPANCard" class="error">Invalid PAN Number</span>
                </div>
                     <Form.Item label="Select your Date of Birth" name="DOB" className="x">
                        <DatePicker className="w" label="Date picker" defaultValue={dayjs('1997-01-01')} maxDate={dayjs(currentDate, dateFormat)} required/>
                     </Form.Item>
                <div className="submit">
                   <button type="submit" value="Submit" className="box" onClick={ValidatePAN}>SUBMIT</button>
                </div>
            </Form>
        </div>
      </div>
    </div>
  );
};

export default New;
