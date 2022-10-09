import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import * as yup from 'yup'
import { useFormik } from 'formik'


import { updateProfileAction } from '../../../redux/slices/users/userSlice'


import LoadingComponent from '../../../components/LoadingComponent'
import ErrorDisplayMessage from '../../../components/ErrorDisplayMessage'
import DisabledButton from '../../../components/DisabledButton'



// Create our yup Schema: Form Validation
const formSchema = yup.object({
  email: yup.string().required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required')
})


const UpdateProfile = ({location: {state}}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Data retrival from store
  const user = useSelector(state => state?.users)

  // Destructuring user
  const {userAppErr, userLoading, userServerErr, isEdited} = user

  // Formik Form Hook
  const formik = useFormik({
    // What we want to be sending to the frontend
    initialValues: {
      enableReintialize: true,
      email: state?.user?.email,
      firstName: state?.user?.firstName,
      lastName: state?.user?.lastName
    },
    onSubmit: (values) => {
      const user = {
        ...values, 
        id: state?.state?._id
      }
      dispatch(updateProfileAction(user))
    },
    validationSchema: formSchema
  })

  useEffect(() => {
    if(isEdited) navigate('/profile')
  }, [isEdited, dispatch])

  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Update Profile</span>
                  <h4 className="mb-4 fw-light">
                    Hi, {state?.state?.firstname} Do you want to update your
                    profile
                  </h4>

                  {/* Display income Err */}
                  {userAppErr || userServerErr ? (
                    <ErrorDisplayMessage
                      error={{
                        userAppErr,
                        userServerErr,
                      }}
                    />
                  ) : null}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur("firstName")}
                      onChange={formik.handleChange("firstName")}
                      className="form-control"
                      type="text"
                      placeholder="Enter firstName"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur("lastName")}
                      onChange={formik.handleChange("lastName")}
                      className="form-control"
                      type="text"
                      placeholder="Enter lastName"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    {userLoading ? <DisabledButton /> : <button type="submit" class="btn btn-warning">
                      Update
                    </button>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
