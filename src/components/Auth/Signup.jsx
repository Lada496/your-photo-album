import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const auth = getAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  const onSubmit = (data, e) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password1)
      .then((userCredential) => {
        const user = userCredential.user;
        login(user.uid);
        navigate("/loggedin/gallery", { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignupError(errorMessage);
      })
      .finally(() => setLoading(false));
    e.target.reset();
  };

  useEffect(() => {
    const subscription = watch((value) => setPasswordInput(value.password1));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Card style={{ width: "18rem", margin: "2rem auto" }}>
        <Card.Title
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "1.5rem" }}
        >
          Sign Up
        </Card.Title>
        <Card.Body style={{ backgroundColor: "white" }}>
          {loading && <LoadingSpinner text="Processing" />}
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              {signupError && <p>{signupError}</p>}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && <p>Please enter a valid email</p>}
              </div>

              <div>
                <label htmlFor="password1">Password</label>
                <input
                  type="password"
                  {...register("password1", { required: true, minLength: 6 })}
                />
                {errors.password1 && <p>Password should be at least 6 words</p>}
              </div>

              <div>
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  {...register("password2", {
                    required: true,
                    validate: (value) => value === passwordInput,
                  })}
                />
                {errors.password2 && <p>Passwords do not match</p>}
              </div>

              <input type="submit" />
            </form>
          </div>
        </Card.Body>
      </Card>
      <p className="form__link">
        Already Member?{" "}
        <span>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </>
  );
};

export default Signup;
