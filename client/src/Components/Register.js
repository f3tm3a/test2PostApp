import { Col, Container, Form, Input, Row, Button } from "reactstrap";
import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addUser,
  deleteUser,
  updateUser,
  addCounter,
} from "../Features/UserSlice";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //For form validation using react-hook-form

  const userList = useSelector((state) => state.users.value);
  const rctr = useSelector((state) => state.users.rcounter);

  //create state var:
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  // Handle form submission
  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log("Form Data", data);
      alert("validation all good");
      //dispatch(addUser(userData));
      //dispatch(addCounter(rctr));
      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log("Error");
    }
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  const handleUpdate = (email) => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(updateUser(userData));
  };

  return (
    <Container fluid>
      <Row className="formrow">
        <Col className="columndiv1" lg="6">
          <Form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Your name..."
                className="form-control"
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
              ></input>
              <p className="error">{errors.name?.message}</p>
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email..."
                className="form-control"
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
              ></input>
              <p className="error">{errors.email?.message}</p>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password..."
                className="form-control"
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              ></input>
              <p className="error">{errors.password?.message}</p>
            </div>
            <div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter password..."
                className="form-control"
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
              ></input>
              <p className="error">{errors.confirmPassword?.message}</p>
            </div>
            <Button color="primary" className="button">
              Register
            </Button>
            Record Added :{rctr}
          </Form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
      <Row>
        <Col md={6}>
          {/*List of Users Record Added:
          <table>
            <tbody>
              {userList.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button onClick={() => handleDelete(user.email)}>
                      Delete User
                    </Button>

                    <Button onClick={() => handleUpdate(user.email)}>
                      Update User
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
              </table>*/}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
