import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { loginUser } from "../../reducers/authReducer";


const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async ({ username, password, confirm }) => {
    dispatch(loginUser(username, password));
  };

  return (
    <div className="login-wrapper">
      <h2>Log in to blogs</h2>
      <Form
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "required";
          }
          if (!values.password) {
            errors.password = "required";
          }
          if (!values.confirm) {
            errors.confirm = "required";
          } else if (values.confirm !== values.password) {
            errors.confirm = "must match";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div className="user-box">
                  <input
                    {...input}
                    id="username-input"
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  {meta.error && meta.touched && <span>username {meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div className="user-box">
                  <input
                    {...input}
                    id="password-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {meta.error && meta.touched && <span>password {meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="confirm">
              {({ input, meta }) => (
                <div className="user-box">
                  <input
                    {...input}
                    id="password-conf-input"
                    name="password-conf"
                    type="password"
                    placeholder="Confirm"
                  />
                  {meta.error && meta.touched && <span>password {meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="login-form-buttons">
              <button className="login-btn" type="submit" disabled={submitting}>
                Login
              </button>
              <button
                className="reset-btn"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default LoginForm;
