import * as yup from "yup"

export const SignupValidation = yup.object({
    fName:yup.string().required("Enter Firts Name"),
    lName:yup.string().required("Enter Last Name"),
    email:yup.string().email("Invalid Email").required("Email Must Need"),
    password:yup.string().required("Pasword Is Mandetory")
})


export const LoginValidation = yup.object({
    email:yup.string().email("Invalid Email").required("Email Must Need"),
    password:yup.string().required("Pasword Is Mandetory")
})




export const AddValidation = yup.object({
    fName:yup.string().required("Enter Firts Name"),
    lName:yup.string().required("Enter Last Name"),
    class:yup.string().required("Enter Your Class"),
    rNumber:yup.string().required("Enter Your Roll NUmber"),
    email:yup.string().email("Invalid Email").required("Email Must Need"),
})
