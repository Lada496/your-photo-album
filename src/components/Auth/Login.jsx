import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const auth = getAuth();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  const onSubmit = (data, e) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        login(user.uid);
        navigate("/loggedin/gallery", { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });

    e.target.reset();
  };

  return (
    <>
      <Card style={{ width: "18rem", margin: "2rem auto" }}>
        <Card.Title
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "1.5rem" }}
        >
          Login
        </Card.Title>
        <Card.Body style={{ backgroundColor: "white" }}>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              {loginError && <p>{loginError}</p>}
              <div>
                <label htmlFor="email">Email</label>
                <input {...register("email", { required: true })} />
                {errors.email && <p>This is required</p>}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && <p>This is required</p>}
              </div>

              <input type="submit" />
            </form>
          </div>
        </Card.Body>
      </Card>
      <p className="form__link">
        New Here?{" "}
        <span>
          <Link to="/signup">Sign up</Link>
        </span>
      </p>
    </>
  );
};

export default Login;
