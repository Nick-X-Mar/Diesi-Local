import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const ContactForm = (props) => {
    var validationLetters   = /[A-Za-z\u0370-\u03ff\u1f00-\u1fff]+/
    const [robot, setRobot] = useState(null);
    return (
        <Formik
            initialValues={{ email: '', firstname: '', lastname: '', message: '', telephone: ''  }}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'Το πεδίο είναι υποχρεωτικό.';
                } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
                    errors.email = 'Μή έγκυρο email.';
                }
                if (!values.firstname) {
                    errors.firstname = 'Το πεδίο είναι υποχρεωτικό.';
                } else if ( !validationLetters.test(values.firstname) ) {
                    errors.firstname = 'Εισάγετε μονο γράμματα.';
                }
                if (!values.lastname) {
                    errors.lastname = 'Το πεδίο είναι υποχρεωτικό.';
                } else if ( !validationLetters.test(values.lastname) ) {
                    errors.lastname = 'Εισάγετε μονο γράμματα.';
                }
                if (!values.message) {
                    errors.message = 'Το πεδίο είναι υποχρεωτικό.';
                }
                if (!/^[0-9]*$/i.test(values.telephone)) {
                    errors.telephone = 'Εισάγετε μονο αριθμούς.';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                    if(robot !== null){
                        // alert(JSON.stringify(values, null, 2));
                        axios.post(`${process.env.GATSBY_API_URL}/contact`, {...values, captcha: robot}).then((res)=>{
                            (res.status === 200 && res.data.status === 'success') && setSubmitting(false);
                        });
                    }
            }}
            >
            {({ isSubmitting }) => (
                <Form className={props.className}>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="firstname">Όνομα<em>*</em></label>
                            <Field type="text" name="firstname" />
                            <ErrorMessage className="error" name="firstname" component="div" />
                        </div>
                        <div className="field">
                            <label htmlFor="lastname">Επώνυμο<em>*</em></label>
                            <Field type="text" name="lastname" />
                            <ErrorMessage className="error" name="lastname" component="div" />
                        </div>
                        <div className="field">
                            <label htmlFor="company">Επωνυμία Εταιρίας</label>
                            <Field type="text" name="company" />
                        </div>
                        <div className="field">
                            <label htmlFor="number">Email<em>*</em></label>
                            <Field type="email" name="email" />
                            <ErrorMessage className="error" name="email" component="div" />
                        </div>
                        <div className="field">
                            <label htmlFor="message">Μήνυμα<em>*</em></label>
                            <Field type="text" name="message" component="textarea"/>
                            <ErrorMessage className="error" name="message" component="div" />
                        </div>
                        <div className="field" style={{paddingBottom: 40}}>
                            <label htmlFor="number">Τηλέφωνο</label>
                            <Field type="tel" name="telephone" />
                            <ErrorMessage className="error" name="telephone" component="div" />
                            <ReCAPTCHA
                                style={{marginTop: 20}}
                                sitekey="6LdmIq4UAAAAAEJ42U-EQlimGJNaP8RQnwvr9zpq"
                                onChange={(value)=>value !== '' && setRobot(value)}
                            />
                        </div>
                    </div>
                    <button className="Button" type="submit" disabled={isSubmitting}>
                        ΑΠΟΣΤΟΛΗ
                    </button>
                </Form>
            )}
        </Formik>
    )
};

export default ContactForm;