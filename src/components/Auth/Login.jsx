import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";

const Login = () => {
  const { login } = useContext(AuthContext);
  const auth = getAuth();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  const onSubmit = (data, e) => {
    // alert(JSON.stringify(data));
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        login(user.uid);
        // dispatch(authActions.login(user.uid));
        // history.replace("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });

    e.target.reset();
  };

  return (
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
              {errors.lastName && <p>This is required</p>}
            </div>

            <input type="submit" />
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Login;
