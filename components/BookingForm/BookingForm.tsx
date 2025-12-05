"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import css from "./BookingForm.module.css"
import DatePicker from "react-datepicker";

interface OrderFormValues {
  username: string;
  email: string;
  date: Date | null;
  comment: string;
}

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
    console.log("Form values:", values);
    actions.resetForm();
  };

return (
    <div className={css.wrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={css.form}>
            <h3 className={css.title}>Book your campervan now</h3>
            <p className={css.subtitle}>
              Stay connected! We are always ready to help you.
            </p>

            {/* Name */}
            <div className={css.fieldWrapper}>
              <Field
                className={css.input}
                type="text"
                name="username"
                placeholder="Name*"
                required
              />
            </div>

            {/* Email */}
            <div className={css.fieldWrapper}>
              <Field
                className={css.input}
                type="email"
                name="email"
                placeholder="Email*"
                required
              />
            </div>

            {/* Booking date (calendar) */}
            <div className={css.fieldWrapper}>
              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                placeholderText="Booking date*"
                className={css.input}        // ← класс для инпута календаря
                calendarClassName={css.calendar} // ← класс для всплывающего календаря
                required
              />
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
    </div>
  );
}
