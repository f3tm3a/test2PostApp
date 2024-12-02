import logo from "../Images/logo-t.png";
import { Link } from "react-router-dom";

import {
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Features/UserSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Retieve current value of state frome store , name os state is users with a property user:
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  //function will invoked when the user clicks login button:
  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData)); //dispatch a login action from user slice
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, isError, isSuccess]);

  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md={3}>
              <img src={logo} alt="logo" height="120px"></img>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label for="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email..."
                  onChange={(e) => setemail(e.target.value)}
                ></Input>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup>
                <label for="password">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password..."
                  onChange={(e) => setpassword(e.target.value)}
                ></Input>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Button color="primary" className="button" onClick={handleLogin}>
                Login
              </Button>
            </Col>
          </Row>
        </Form>

        <p className="smalltext">
          No Account?
          <Link to="/register"> Sign Up Now</Link>
        </p>
      </Container>
    </div>
  );
};

export default Login;
