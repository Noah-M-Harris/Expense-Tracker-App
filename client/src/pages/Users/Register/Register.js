import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import { useFormik } from 'formik'
import * as yup from 'yup'


import { registerUserAction } from '../../../redux/slices/users/userSlice'
import DisabledButton from '../../../components/DisabledButton'
import SuccessMessage from '../../../components/SuccessMessage'






// Create our yup Schema: Form Validation
const formSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required')
})


const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Data retrival from store
  const user = useSelector(state => state?.users)

  // Destructuring user
  const {userAppErr, userLoading, userServerErr, isRegistered , registered} = user

  // Formik Form Hook
  const formik = useFormik({
    // What we want to be sending to the frontend
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values))
    },
    validationSchema: formSchema
  })


    // Redirect
   useEffect(() => {
      if(isRegistered) {
        navigate('/profile')
      }
    }, [isRegistered, navigate])
    /* setTimeout(() => {
      if(isRegistered) navigate('/profile')
    }, 3000) */

  return (
    <section className="position-relative py-5 overflow-hidden vh-100">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Keep Track of your income and expenses flow
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">New User</span>
                <h3 className="fw-bold mb-5">Register</h3>

                { /* Success msg */ }
                {registered && (
                  <SuccessMessage msg="Register Successfully. You will be redirected soon." />
                )}
                
                {/* Display err here*/}
                {userAppErr || userServerErr ? (
                <div class="alert alert-danger" role="alert">
                  {userAppErr || userServerErr}
                </div> 
                ) : null}

                <input
                  // what we assigned in initialValues
                  value={formik.values.firstName}
                  onChange={formik.handleChange('firstName')}
                  onBlur={formik.handleBlur('firstName')}
                  className="form-control mb-2"
                  type="text"
                  placeholder="First Name"
                />
                {/* Err */}
                <div className='text-danger mb-2'>
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
                <input
                  // what we assigned in initialValues
                  value={formik.values.lastName}
                  onChange={formik.handleChange('lastName')}
                  onBlur={formik.handleBlur('lastName')}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Last Name"
                />
                {/* Err */}
                <div className='text-danger mb-2'>
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
                <input
                  // what we assigned in initialValues
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  className="form-control mb-2"
                  type="email"
                  placeholder="E-mail address"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input 
                  // what we assigned in initialValues
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  {userLoading ? <DisabledButton /> : 
                  (<button
                    type="submit"
                    className="btn btn-primary py-2 w-100 mb-4"
                  >
                    Register
                  </button>)}
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
