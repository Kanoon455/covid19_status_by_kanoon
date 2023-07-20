import { useState } from 'react';
import { DatePicker } from '@gsebdev/react-simple-datepicker';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState({ firstName: '', lastName: '', identificationNumber: '', gender: "", dateOfBirth: "" });
  const [selectedGender, setSelectedGender] = useState(null);
  var yearDiff;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  calculateDate(data.dateOfBirth);


  function calculateDate(birthday) {
    const toDay = Date.now();
    console.log(toDay)
    console.log(birthday);

    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs);
    yearDiff = Math.abs(ageDate.getUTCFullYear() - 1970)
    console.log("diff year:" + yearDiff);

    if ((yearDiff > 65) || (yearDiff >= 0) && (yearDiff < 12) && (data.gender == 'ชาย') || (data.gender == 'หญิง')) {
      return (
        <div>
          <p style={{ color: 'green', fontSize: '20px' }}>สามารถเข้ารับบริการได้</p>
        </div>
      )
    } else {
      return (
        <div>
          <p style={{ color: 'red', fontSize: '20px' }}>ไม่สามารถเข้ารับบริการได้</p>
        </div>
      )

    }
  }


  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand">Covid 19</h1>
        </div>
      </nav>

      <div className="container">

        <div className='md-6'>
          <form>
            <div className="from-group md-6">
              <label>กรุณากรอกชื่อ</label>
              <div className='row'>
                {/* input fristname */}
                <div className='col'>
                  <input className="form-control" type="text" placeholder=" ชื่อ" value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} />
                </div>
                {/* input lastname */}
                <div className='col'>
                  <input className="form-control" type="text" placeholder="นามสกุล" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} />
                </div>
              </div>
            </div>
            <br />

            <div className="from-group">
              <div className='row'>
                <div className='col'>
                  {/* Identification Number */}
                  <label>เลขบัตรประชาชน 13 หลัก</label>
                  <input className="form-control" type="number" placeholder=" x-xxxx-xxxxx-xx-x" value={data.identificationNumber} onChange={e => setData({ ...data, identificationNumber: e.target.value })} />
                </div>

                <div className='col'>
                  {/* drop down */}
                  <label>เพศ</label>
                  <div className="input-group mb-3">
                    <select className="form-select" defaultValue={null} aria-label="Default select example" onChange={e => {
                      setData({ ...data, gender: e.target.value })
                      setSelectedGender(e.target.value)
                    }}>
                      <option value={null} disabled>เลือกเพศ</option>
                      <option value="---" >---</option>
                      <option value="ชาย" >ชาย</option>
                      <option value="หญิง">หญิง</option>
                      <option value="">อื่นๆ</option>
                    </select>
                  </div>
                </div >
                {selectedGender === "" ? <div className="col">
                  <label for="text" >อื่นๆ</label>
                  <input type="text" className="form-control" id="DropdownFormgender" placeholder="อื่นๆ โปรดระบุ" value={data.gender} onInput={e => setData({ ...data, gender: e.target.value })} />
                </div> : <div></div>
                }

              </div>
            </div>

            <div className="from-group md-6">
              <div className="from-group">
                <label>กรุณาเลือกวันเดือนปีเกิด : </label>
                <DatePicker
                  className="form-control"
                  placeholder="วว/ดด/ปปปป"
                  selected={data.dateOfBirth}
                  onChange={e => setData({ ...data, dateOfBirth: e.target.value })}
                />
              </div>
            </div>
          </form>
        </div>
        {/* <!-- Button trigger modal --> */}
        <div style={{ display: 'flex' }}>
          <button className='btn btn-primary' type="button" onClick={handleShow}>ยืนยัน</button>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>กรุณาตรวจสอบข้อมูล</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ fontSize: '20px' }}>ชื่อนามสกุล: {data.firstName} {data.lastName}</p>
                <p style={{ fontSize: '20px' }}>เลขบัตรประชาชน: {data.identificationNumber}</p>
                <p style={{ fontSize: '20px' }}>เพศ: {data.gender}</p>
                <p style={{ fontSize: '20px' }}>วันเดือนปีเกิด: {data.dateOfBirth}</p>
                <p>{calculateDate(data.dateOfBirth)}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>ยกเลิก</Button>
                <Button variant="primary" onClick={handleClose}>ยืนยัน</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <button className='btn btn-secondary' style={{ marginLeft: '10px' }} onClick={() => setData({ firstName: '', lastName: '', identificationNumber: '', gender: "", dateOfBirth: '' })}>ล้างค่า</button><br />
        </div>

      </div>

    </div >

  );

}

export default App;
