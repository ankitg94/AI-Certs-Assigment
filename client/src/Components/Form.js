import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';



const Form = () => {
  // gate all data
  const [categories, setCategories] = useState([]);
   //form data
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [status,setStatus] =useState('');
  const [dueDate,setdue]=useState('');
  // modal
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  // update the form
  const [updatetitle, setUpdateTitle] = useState('');
  const [updateDesc, setUpdateDesc] = useState('');
  const [updatestatus,setUpdateStatus] =useState('');
  const [updaatedueDate,setUpdatedue]=useState('');
  


  // Create new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data}  = await axios.post('/api/v1/data/create',
       {title,description,status,dueDate});

      if (data?.success) {
        toast.success(`${title} is created`);
        getAllCategory();
        setTitle('')
        setDesc('')
        setStatus('')
        setdue('')
        console.log(data);
        
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("error in creating Todo")
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/data/get');
      if (data.success) {
        setCategories(data?.Alldata);
        console.log("data")
      }
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/data/update/${selected._id}`, 
      { title:updatetitle,description:updateDesc,status:updatestatus,dueDate:updaatedueDate });
      if (data?.success) {
        console.log('success');
        setSelected(null);
        setUpdateTitle('')
        setUpdateDesc('')
        setUpdateStatus('')
        setUpdatedue('')  
        setVisible(false);
        getAllCategory();
        toast.success("Your Item will updated succesfully")
      } else {
        toast.error('Error in updating the data');
      }
    } catch (error) {
      console.log('updated error');
    }
  };

  // Delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(`/api/v1/data/delete/${pid}`);
      if (data.success) {
        getAllCategory();
        toast.success("Item Deleted Succesfully")
      } else {
        console.log('error');
        toast.error("Error in deleting")
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ToDo AI Certs Assigment</h1>
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              required
            />

          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder=" Pending , in-progress , Completed"
            />
          </div>


      <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setdue(e.target.value)}
              placeholder="Description"
            />
          </div>



          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </div>
        </form>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">title</th>
              <th scope="col">Description</th>
              <th scope="col">status</th>
              <th scope="col">DueDate</th>
              <th scope="col">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            
            {categories.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>{c.status}</td>
                <td>{c.diffDays} To go</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setVisible(true);
                      // setUpdatedName(c.name);
                      setUpdateTitle(c.title)
                      setUpdateDesc(c.description)
                      setUpdateStatus(c.status)
                      setUpdatedue(c.dueDate)
                      setSelected(c);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className={`modal fade ${visible ? 'show' : ''}`} style={{ display: visible ? 'block' : 'none' }} role="dialog" tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Todo</h5>
              <button type="button" className="btn-close" onClick={() => setVisible(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={updatetitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    placeholder="Name is required"
                    required
                  />
                </div>
                <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={updateDesc}
              onChange={(e) => setUpdateDesc(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={updatestatus}
              onChange={(e) =>setUpdateStatus(e.target.value)}
               placeholder=" Pending , in-progress , Completed"
            />
          </div>
       <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={updaatedueDate}
              onChange={(e) => setUpdatedue(e.target.value)}
              placeholder="Date"
            />
          </div>
                <button type="submit" className="btn btn-primary w-100">Update</button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

