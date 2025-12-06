"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./BookingForm.module.css";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

interface OrderFormValues {
  username: string;
  email: string;
  date: Date | null;
  comment: string;
}
const validationSchema = Yup.object({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date().required("Booking date is required").nullable(),
  comment: Yup.string(),
});
const initialValues: OrderFormValues = {
  username: "",
  email: "",
  date: null,
  comment: "",
};

export default function BookingForm() {
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {

 toast.success("Your campervan is successfully booked!");
    actions.resetForm();
  };

  return (
    <div className={css.wrapper}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, touched, errors }) => (
          <Form className={css.form}>
            <h3 className={css.title}>Book your campervan now</h3>
            <p className={css.subtitle}>
              Stay connected! We are always ready to help you.
            </p>

            {/* Name */}
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.input} ${
                  errors.username && touched.username ? css.inputError : ""
                }`}
                type="text"
                name="username"
                placeholder="Name*"
                required
              />
              <ErrorMessage name="username" component="p" className={css.error} />
            </div>

            {/* Email */}
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ""
                }`}
                type="email"
                name="email"
                placeholder="Email*"
                required
              />
              <ErrorMessage name="email" component="p"  className={css.error} />
            </div>

            {/* Booking date (calendar) */}
            <div className={css.fieldWrapper}>
              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                placeholderText="Booking date*"
                className={css.input} // ← класс для инпута календаря
                calendarClassName={css.calendar} // ← класс для всплывающего календаря
                required
              />
              <ErrorMessage name="date" className={css.error} />
            </div>

            {/* Comment */}
            <div className={css.fieldWrapper}>
              <Field
                as="textarea"
                name="comment"
                className={css.textarea}
                placeholder="Comment"
                rows={4}
              />
            </div>

            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>

      <Toaster position="top-center" />
    </div>
  );
}
