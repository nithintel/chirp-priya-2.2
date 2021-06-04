import { useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { ChirpContext } from '../Context/ChirpContext'
import {
  reasonForDiscontinuation,
  deregistrationMessages,
} from '../Context/data'
import { ErrorToastEmitter, SuccessToastEmitter } from './ToastContainer'

function DeregistrationForm(props) {
  const {
    setIsUserAlreadyRegistered,
    setTabKeys,
    deregisterCompletely,
    employeeDetails,
    getChildDetails,
    setIsDataSubmitted,
    chirpList,
  } = useContext(ChirpContext)
  const initialValues = {
    option: '',
    reason: '',
    otherReason: '',
  }
  const validationSchema = Yup.object({
    option: Yup.string().required('Please select an option'),
    reason: Yup.string().required('Please select the reason'),
    otherReason: Yup.string().when('reason', {
      is: (val) => val === 'Other',
      then: Yup.string()
        .max(250, 'Maximum 250 characters')
        .required('Please select the reason'),
    }),
  })

  const onSubmit = (values, actions) => {
    let finalData = {
      ...values,
      deregister: true,
      empId: employeeDetails.employeeId,
    }
    deregisterCompletely(finalData)
      .then((result) => {
        SuccessToastEmitter({ message: result.message })
        props.close(false)
        setTabKeys('home')
        getChildDetails()
        setIsDataSubmitted(Math.random())
      })
      .catch((err) => {
        ErrorToastEmitter({ message: err.message })
      })
    setIsUserAlreadyRegistered(false)
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isSubmitting,
      }) => (
        <Form>
          <Row>
            <p>
              {chirpList &&
              chirpList.filter(({ active }) => active === true).length === 0
                ? deregistrationMessages.childRemovalMessage
                : deregistrationMessages.initialMessgae}
            </p>
          </Row>
          <Row>
            <div className='form-row'>
              <div className='form-group col'>
                <label
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    margin: '2px 0px',
                  }}
                >
                  Please choose one option{' '}
                </label>{' '}
                <div role='group' aria-labelledby='my-radio-group'>
                  <label style={{ marginRight: '15px' }}>
                    <Field
                      type='radio'
                      name='option'
                      value='Child wants to Deregister'
                    />{' '}
                    Child no longer wants to take part
                  </label>{' '}
                  <label>
                    <Field
                      type='radio'
                      name='option'
                      value='Parent wants to Deregister'
                    />{' '}
                    I no longer want my child to take part
                  </label>
                </div>
              </div>
            </div>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <div className='form-row'>
              <div className='form-group col'>
                <label
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    margin: '2px 0px',
                  }}
                >
                  Reason
                </label>
                <Field
                  name='reason'
                  as='select'
                  className={
                    'form-control' +
                    (errors.reason && touched.reason ? ' is-invalid' : '')
                  }
                >
                  <option value='' disabled>
                    Select Reason
                  </option>
                  {reasonForDiscontinuation.map(({ reason, label }) => (
                    <option key={reason}>{label}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name='reason'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
          </Row>
          {values && values.reason === 'Other' ? (
            <Row style={{ marginTop: '5px' }}>
              <div className='form-group col'>
                <Field
                  name='otherReason'
                  as='textarea'
                  placeholder='Please let us know why?'
                  className={
                    'form-control' +
                    (errors.otherReason && touched.otherReason ? ' is-invalid' : '')
                  }
                ></Field>
                <ErrorMessage
                  name='otherReason'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </Row>
          ) : null}

          <br />
          <Button
            type='submit'
            variant='danger'
            style={{ margin: '5px' }}
            disabled={isSubmitting}
          >
            I no longer wish my child(rens) to participate in ChIRP
          </Button>
          <Button
            type='button'
            variant='secondary'
            disabled={isSubmitting}
            onClick={() => {
              props.close(false)
              setTabKeys('home')
            }}
          >
            Cancel
          </Button>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  )
}

export default DeregistrationForm
