import { useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid'

// import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'

import { generateArrayOfYears } from '../Context/data'
import { ChirpContext } from '../Context/ChirpContext'

const validationSchema = Yup.object({
  month: Yup.string().required('Please Select Birth Month'),
  year: Yup.string().required('Please Select Birth Year'),
  gender: Yup.string().required('Please Choose gender'),
  language: Yup.string().required('Please Choose Primary Languagae'),
  proficiency: Yup.string().required('Please Choose Proficiency level'),
})
function RegistrationForm(props) {
  const {
    addChildData,
    loadedData,
    setLoadedData,
    record,
    setRecord,
    editChildData,
    employeeDetails,
    languageDetails,
  } = useContext(ChirpContext)
  const initialValues = {
    month: '',
    year: '',
    gender: '',
    language: '',
    proficiency: '',
  }

  const onSubmit = (values, actions) => {
    let finalData = {
      ...values,
      age: 10,
      active: true,
      country: employeeDetails.country,
      email: employeeDetails.emailAddress,
      empId: employeeDetails.employeeId,
      recordId: record ? record : uuidv4(),
    }
    setTimeout(() => {
      record
        ? editChildData(finalData)
            .then((result) => {
              props.close(false)
              actions.setSubmitting(false)
              toast.success('🦄 Child Added succesfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              actions.resetForm()
              setRecord(null)
            })
            .catch((err) => {
              actions.setSubmitting(false)
              toast.error('🦄Error not add child', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              setRecord(null)
            })
        : addChildData(finalData)
            .then((result) => {
              props.close(false)
              actions.setSubmitting(false)
              toast.success('🦄 Child Added succesfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              actions.resetForm()
              setRecord(null)
              setLoadedData(null)
            })
            .catch((err) => {
              toast.error('🦄Error not add child', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              setRecord(null)
            })
    }, 0)
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={loadedData || initialValues}
    >
      {({
        touched,
        errors,
        isSubmitting,
        dirty,
        setFieldValue,
        values,
        handleChange,
      }) => (
        <Form>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Select Month</label>
              <Field
                name='month'
                as='select'
                className={
                  'form-control' +
                  (errors.month && touched.month ? ' is-invalid' : '')
                }
              >
                <option value='' disabled>
                  Select Month
                </option>
                {[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Field>
              <ErrorMessage
                name='month'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <br />
            <div className='form-group col'>
              <label>Select Year</label>
              <Field
                name='year'
                as='select'
                className={
                  'form-control' +
                  (errors.year && touched.year ? ' is-invalid' : '')
                }
              >
                <option value='' disabled={true}>
                  Select Year
                </option>
                {generateArrayOfYears().map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Field>
              <ErrorMessage
                name='year'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <br />
          </div>
          <div className='form-group col'>
            <label>Child's Gender </label>{' '}
            <div role='group' aria-labelledby='my-radio-group'>
              <label>
                <Field type='radio' name='gender' value='Male' /> Male
                <ErrorMessage
                  name='gender'
                  component='div'
                  className='invalid-feedback'
                />
              </label>{' '}
              <label>
                <Field type='radio' name='gender' value='Female' /> Female
              </label>
            </div>
          </div>
          <br />
          <div className='form-row'>
            <div className='form-group col'>
              <label>Child's Primary Language</label>
              <Field
                name='language'
                as='select'
                className={
                  'form-control' +
                  (errors.language && touched.language ? ' is-invalid' : '')
                }
              >
                <option value='' disabled={true}>
                  Select Language
                </option>
                {languageDetails.map(({ languageId, name }) => (
                  <option key={languageId}>{name}</option>
                ))}
              </Field>
              <ErrorMessage
                name='language'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <br />
            <div className='form-group col'>
              <label>Child's Reading English Proficiency Level</label>
              <Field
                name='proficiency'
                as='select'
                className={
                  'form-control' +
                  (errors.proficiency && touched.proficiency
                    ? ' is-invalid'
                    : '')
                }
              >
                <option value='' disabled={true}>
                  Select Proficiency Level
                </option>
                {['Sufficient', 'Insufficient'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Field>
              <ErrorMessage
                name='proficiency'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            style={{ margin: '5px' }}
          >
            {isSubmitting ? 'Please wait...' : 'Save'}
          </Button>
          <Button
            type='button'
            disabled={isSubmitting}
            onClick={() => {
              props.close(false)
              setLoadedData(null)
            }}
            variant='secondary'
            style={{ margin: '5px' }}
          >
            Cancel
          </Button>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  )
}

export default RegistrationForm
