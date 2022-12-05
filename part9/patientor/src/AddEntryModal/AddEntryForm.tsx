import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from '../state';
import { DiagnosisSelection, TextField, NumberField } from "../AddPatientModal/FormField";

import { NewEntry } from "../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 3,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field label='Type' placeholder='Type' name='type' component={TextField} />
            <Field label='Description' placeholder='Description' name='description' component={TextField} />
            <Field label='Date of visit' placeholder='YYYY-MM-DD' name='date' component={TextField} />
            <Field label='Specialist name' placeholder='Specialist' name='specialist' component={TextField} />

            <Field
              label='Health check rating'
              name='healthCheckRating'
              component={NumberField}
              min={0}
              max={3}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>  
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;