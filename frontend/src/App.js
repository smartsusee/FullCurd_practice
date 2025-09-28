import "./App.css";
import { useEffect, useState } from "react";
import { authAxios } from "./AuthAxios/auth";
import { Bounce, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { FaUserEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function App() {
  const [show, setShow] = useState({
    showData: false,
    userid: null,
  });
  const [studentobj, setstudentobj] = useState({
    Firstname: "",
    Lastname: "",
  });

  const [updateData, setUpdateData] = useState({
    Firstname: "",
    Lastname: "",
  });

  const [data, setdata] = useState([]);
  const [ref, setref] = useState(true);

  console.log(process.env.REACT_APP_API_URL);

  function GetMethod() {
    authAxios
      .get(`/studentGet`)
      .then((res) => {
        setdata(res.data);
        console.log(res);
      })
      .catch((err) => {
        toast.error(`${err}, !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  }

  useEffect(() => {
    GetMethod();
  }, [ref]);

  const handleChange = (e) => {
    setstudentobj({ ...studentobj, [e.target.name]: e.target.value });
  };
  const UpdatehandleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleDataUpload = (e) => {
    e.preventDefault();

    if (studentobj.Firstname === "" || studentobj.Lastname === "") {
      alert("Please fill all the fields");
    } else {
      authAxios
        .post("/studentCreate", studentobj)
        .then((res) => {
          console.log(res);

          setref(!ref);

          //  alert(res.data.msg)

          toast(`Hi... ${res.data.SaveData.Firstname} ${res.data.msg}, !`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        })
        .catch((err) => {
          toast.error(`${err}, !`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
    }

    setstudentobj({ ...studentobj, Firstname: "", Lastname: "" });
  };

  function deleteFun(item) {
    console.log(item._id);

    authAxios
      .delete(`studentDelete/${item._id}`)
      .then((res) => {
        setref(!ref);
        //  res.data.msg
        toast(`${res.data.msg}, !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        toast.error(`${err}, !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  }

  function editFun(item) {
    setShow({ ...show, showData: true, userid: item._id });

    console.log(item.Firstname, item.Lastname);

    setUpdateData({
      ...updateData,
      Firstname: item.Firstname,
      Lastname: item.Lastname,
    });
  }

  function UpdateFunHandle(e) {
    e.preventDefault();

    console.log(show.userid);

    console.log(updateData);

    authAxios
      .put(`studentUpdate/${show.userid}`, updateData)
      .then((res) => {
        // console.log(res.data.msg , );

        setref(!ref);
        toast(`${res.data.updatedata.Firstname},${res.data.msg}, !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        toast.error(`${err}, !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });

    setShow({ ...show, showData: false, userid: null });
  }

  return (
    <div className="App">
      <form onSubmit={handleDataUpload}>
        <input
          type="text"
          name="Firstname"
          placeholder="First name"
          value={studentobj.Firstname}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="Lastname"
          placeholder="Last name"
          value={studentobj.Lastname}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">click</button>
      </form>
      <br />
      <br />

      {data.length === 0 ? (
        <Spinner animation="border" />
      ) : (
        <>
          <center>
            <Table striped bordered hover style={{ width: "50%" }}>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.map((item, ind) => {
                    let { Firstname, Lastname } = item;

                    return (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{Firstname}</td>
                        <td>{Lastname}</td>
                        <td>
                          <FaUserEdit
                            className="mx-3"
                            id="icon"
                            onClick={() => {
                              editFun(item);
                            }}
                          />
                          <FaTrash
                            id="icon"
                            className="trash"
                            onClick={() => {
                              deleteFun(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </center>
          {show.showData && (
            <div>
              <h1>update Form </h1>
              <form onSubmit={UpdateFunHandle}>
                <input
                  type="text"
                  name="Firstname"
                  placeholder="First name"
                  value={updateData.Firstname}
                  onChange={UpdatehandleChange}
                />
                <br />
                <br />
                <input
                  type="text"
                  name="Lastname"
                  placeholder="Last name"
                  value={updateData.Lastname}
                  onChange={UpdatehandleChange}
                />
                <br />
                <br />
                <button type="submit">Update</button>
              </form>
            </div>
          )}
        </>

        //   <table>
        //        <thead>
        //         <tr>
        //           <th>S.no</th>
        //           <th>FisrtName</th>
        //           <th>LastName</th>
        //           <th>Action</th>
        //         </tr>
        //        </thead>
        //        <tbody>

        //        </tbody>
        //   </table>
      )}
    </div>
  );
}

export default App;
