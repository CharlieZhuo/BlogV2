import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

import { Formik } from "formik";
import * as Yup from "yup";

export default function SearchBox() {
  return (
    <Formik
      initialValues={{ query: "" }}
      validationSchema={Yup.object().shape({
        query: Yup.string()
          .min(2, "Can't be shorter than 2 characters")
          .max(30, "Can't be longer than 30 characters")
          .required("Can't be empty"),
      })}
      onSubmit={async (values, helper) => {}}
    >
      {(formik) => (
        <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
          <Stack
            direction="row"
            spacing={0}
            alignItems={"center"}
            sx={{ my: "1rem" }}
          >
            <TextField
              variant="outlined"
              label="搜索"
              type="search"
              error={Boolean(formik.touched.query && formik.errors.query)}
              {...formik.getFieldProps("query")}
            ></TextField>
            <IconButton
              aria-label="search"
              onClick={(e) => formik.submitForm()}
              disabled={formik.isSubmitting}
            >
              <SearchIcon />
            </IconButton>
          </Stack>
          <Paper elevation={0}>
            {Boolean(formik.touched.query && formik.errors.query)
              ? formik.errors.query
              : ""}
          </Paper>
        </form>
      )}
    </Formik>
  );
}
