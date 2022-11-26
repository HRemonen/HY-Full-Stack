import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { loginUser } from "../../reducers/authReducer";


const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async ({ username, password, confirm }) => {
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <h2>Log in to blogs</h2>
      <Form
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.confirm) {
            errors.confirm = "Required";
          } else if (values.confirm !== values.password) {
            errors.confirm = "Must match";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label>Username</label>
                  <input
                    {...input}
                    id="username-input"
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input
                    {...input}
                    id="password-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="confirm">
              {({ input, meta }) => (
                <div>
                  <label>Confirm</label>
                  <input
                    {...input}
                    id="password-conf-input"
                    name="password-conf"
                    type="password"
                    placeholder="Confirm"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="login-form-buttons">
              <button className="login-btn" type="submit" disabled={submitting}>
                Submit
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
