import React from 'react';
// import './CreateForm.css'; // CSS faylni import qiling
import { useStudent } from '../api/hooks/useStudent';

interface CreateFormProps {
  fname: string;
  lname: string;
  birthday: string;
  addres: string;
  phone_number: number;
  img: string;
}

const CreateForm = () => {
  const { createStudents } = useStudent();

  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [img, setImg] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: CreateFormProps = {
      fname,
      lname,
      birthday,
      addres: address,
      phone_number: Number(phone_number),
      img,
    };

    createStudents.mutate(body);

    setFname('');
    setLname('');
    setBirthday('');
    setAddress('');
    setPhoneNumber('');
    setImg('');
  };

  return (
    <div className="form-container">
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="img">Image URL</label>
          <input
            type="url"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default React.memo(CreateForm);
