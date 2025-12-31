import React, { useCallback, useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Typography,
  Checkbox,
  Box,
} from "@mui/material";

import type { FormData } from "../Typescript/Interface";



/* ---------- Regex ---------- */
const phoneRegex = /^[0-9]{10,15}$/;
const marksRegex = /^[0-9]+(\.[0-9]+)?$/;
const salaryRegex = /^[0-9]+(\.[0-9]+)?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/;

/* ---------- Yup Schema ---------- */
const educationSchema = yup.object({
  level: yup.string().required("Level is required"),
  schoolOrCollege: yup.string().required("School/College is required"),
  passingYear: yup
    .date()
    .max(new Date(), "Passing Year cannot be in the future")
    .required("Passing Year is required")
    .typeError("Invalid date"),
  marks: yup.string().matches(marksRegex, "Marks must be numeric").required("Marks are required"),
});

const experienceSchema = yup.object({
  companyName: yup.string().required("Company Name is required"),
  jobRole: yup.string().required("Job Role is required"),
  startDate: yup.date().required("Start Date is required").typeError("Invalid date"),
  endDate: yup
    .date()
    .required("End Date is required")
    .typeError("Invalid date")
    .when("startDate", (startDate: any, schema: yup.DateSchema) => {
      if (startDate) {
        return schema.min(new Date(startDate), "End Date cannot be before Start Date");
      }
      return schema;
    }),
});

const schema = yup.object({
  personalInfo: yup.object({
    fullName: yup.string().required("Full Name is required"),
    dob: yup.date().required("DOB is required").typeError("Invalid date"),
    gender: yup.string().required("Gender is required"),
  }),
  addressDetails: yup.object({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pincode: yup.string().required("Pincode is required"),
  }),
  contactInfo: yup.object({
    phone: yup.string().matches(phoneRegex, "Phone must be 10–15 digits").required("Phone is required"),
    email: yup.string().matches(emailRegex, "Email is invalid").required("Email is required"),
    linkedin: yup.string().matches(urlRegex, "URL is invalid").optional(),
  }),
  education: yup.array().of(educationSchema).min(2, "At least 10th and 12th required"),
  experience: yup.array().of(experienceSchema),
  applyFor: yup.object({
    jobRole: yup.string().required("Job Role is required"),
    lastSalary: yup.string().matches(salaryRegex, "Last Salary must be numeric").required("Last Salary is required"),
    expectedSalary: yup.string().matches(salaryRegex, "Expected Salary must be numeric").required("Expected Salary is required"),
  }),
  termsAccepted: yup.boolean().oneOf([true], "Accept Terms & Conditions"),
});


const LargeForm: React.FC = () => {
  const initialFormData: FormData = useMemo(
    () => ({
      personalInfo: { fullName: "", dob: "", gender: "" },
      addressDetails: { address: "", city: "", state: "", pincode: "" },
      contactInfo: { phone: "", email: "", linkedin: "" },
      education: [
        { level: "10th", schoolOrCollege: "", passingYear: "", marks: "" },
        { level: "12th", schoolOrCollege: "", passingYear: "", marks: "" },
      ],
      experience: [],
      applyFor: { jobRole: "", lastSalary: "", expectedSalary: "" },
      termsAccepted: false,
    }),
    []
  );

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: initialFormData,
    resolver: yupResolver(schema as any),
  });

  const { fields: eduFields, append: appendEdu } = useFieldArray({ control, name: "education" });
  const { fields: expFields, append: appendExp } = useFieldArray({ control, name: "experience" });

  const addDegree = useCallback(() => {
    appendEdu({ level: "Degree", schoolOrCollege: "", passingYear: "", marks: "" });
  }, [appendEdu]);

  const addExperience = useCallback(() => {
    appendExp({ companyName: "", jobRole: "", startDate: "", endDate: "" });
  }, [appendExp]);

  const onSubmit = useCallback((data: FormData) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  }, []);

  const onClear = useCallback(() => reset(initialFormData), [reset, initialFormData]);

  return (
    <Box maxWidth={800} mx="auto" my={6} p={4} bgcolor="white" boxShadow={3} borderRadius={3}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info */}
        <Box p={3} borderRadius={2} border={1} borderColor="primary.main" bgcolor="#e3f2fd">
          <Typography variant="h6" fontWeight="bold" color="primary.main" mb={2}>
            Personal Information
          </Typography>
          <Controller
            name="personalInfo.fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name *"
                fullWidth
                margin="dense"
                error={!!errors.personalInfo?.fullName}
                helperText={errors.personalInfo?.fullName?.message}
              />
            )}
          />
          <Controller
            name="personalInfo.dob"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="DOB *"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="dense"
                error={!!errors.personalInfo?.dob}
                helperText={errors.personalInfo?.dob?.message}
              />
            )}
          />
          <Controller
            name="personalInfo.gender"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ mt: 2, p: 2, border: '1px solid #1976d2', borderRadius: 2 }} error={!!errors.personalInfo?.gender}>
                <Typography variant="subtitle1" fontWeight="bold" color="#0d47a1" mb={1}>
                  Gender *
                </Typography>
                <RadioGroup row {...field}>
                  {["Male", "Female", "Other"].map((g) => (
                    <FormControlLabel
                      key={g}
                      value={g}
                      control={<Radio sx={{ color: '#1976d2', '&.Mui-checked': { color: '#0d47a1' } }} />}
                      label={g}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>{errors.personalInfo?.gender?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* Address Details */}
        <Box p={3} borderRadius={2} border={1} borderColor="primary.main" bgcolor="#f3e5f5">
          <Typography variant="h6" fontWeight="bold" color="primary.main" mb={2}>
            Address Details
          </Typography>
          {(["address", "city", "state", "pincode"] as const).map((fieldName) => (
            <Controller
              key={fieldName}
              name={`addressDetails.${fieldName}`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} *`}
                  fullWidth
                  margin="dense"
                  error={!!errors.addressDetails?.[fieldName]}
                  helperText={errors.addressDetails?.[fieldName]?.message}
                />
              )}
            />
          ))}
        </Box>

        {/* Contact Info */}
        <Box p={3} borderRadius={2} border={1} borderColor="primary.main" bgcolor="#fff3e0">
          <Typography variant="h6" fontWeight="bold" color="primary.main" mb={2}>
            Contact Information
          </Typography>
          {(["phone", "email", "linkedin"] as const).map((fieldName) => (
            <Controller
              key={fieldName}
              name={`contactInfo.${fieldName}`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={fieldName === "linkedin" ? "LinkedIn" : `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} *`}
                  fullWidth
                  margin="dense"
                  error={!!errors.contactInfo?.[fieldName]}
                  helperText={errors.contactInfo?.[fieldName]?.message}
                />
              )}
            />
          ))}
        </Box>

        {/* Education */}
        <Box p={3} borderRadius={2} border={1} borderColor="primary.main" bgcolor="#e8f5e9">
          <Typography variant="h6" fontWeight="bold" color="primary.main" mb={2}>
            Education
          </Typography>
          {eduFields.map((edu, index) => (
            <Box key={edu.id || index} p={2} border={1} borderColor="grey.300" borderRadius={2} mb={2}>
              <Typography fontWeight="bold" mb={1}>{edu.level}</Typography>
              <Controller
                name={`education.${index}.schoolOrCollege`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={edu.level === "Degree" ? "College Name" : "School Name"}
                    fullWidth
                    margin="dense"
                    error={!!errors.education?.[index]?.schoolOrCollege}
                    helperText={errors.education?.[index]?.schoolOrCollege?.message}
                  />
                )}
              />
              <Controller
                name={`education.${index}.passingYear`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Passing Year *"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="dense"
                    error={!!errors.education?.[index]?.passingYear}
                    helperText={errors.education?.[index]?.passingYear?.message}
                  />
                )}
              />
              <Controller
                name={`education.${index}.marks`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Marks *"
                    fullWidth
                    margin="dense"
                    error={!!errors.education?.[index]?.marks}
                    helperText={errors.education?.[index]?.marks?.message}
                  />
                )}
              />
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={addDegree}>
            Add Degree
          </Button>
        </Box>

        {/* Experience */}
        <Box p={3} borderRadius={2} border={1} borderColor="primary.main" bgcolor="#fff3e0">
          <Typography variant="h6" fontWeight="bold" color="primary.main" mb={2}>
            Experience
          </Typography>
          {expFields.map((exp, index) => (
            <Box key={exp.id || index} p={2} border={1} borderColor="grey.300" borderRadius={2} mb={2}>
              <Controller
                name={`experience.${index}.companyName`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Company Name *" fullWidth margin="dense" error={!!errors.experience?.[index]?.companyName} helperText={errors.experience?.[index]?.companyName?.message} />
                )}
              />
              <Controller
                name={`experience.${index}.jobRole`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Job Role *" fullWidth margin="dense" error={!!errors.experience?.[index]?.jobRole} helperText={errors.experience?.[index]?.jobRole?.message} />
                )}
              />
              <Controller
                name={`experience.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="date" label="Start Date *" InputLabelProps={{ shrink: true }} fullWidth margin="dense" error={!!errors.experience?.[index]?.startDate} helperText={errors.experience?.[index]?.startDate?.message} />
                )}
              />
              <Controller
                name={`experience.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="date" label="End Date *" InputLabelProps={{ shrink: true }} fullWidth margin="dense" error={!!errors.experience?.[index]?.endDate} helperText={errors.experience?.[index]?.endDate?.message} />
                )}
              />
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={addExperience}>
            Add Experience
          </Button>
        </Box>

        {/* Apply For */}
        <Box p={3} borderRadius={2} border={1} borderColor="primary.main" bgcolor="#e3f2fd">
          <Typography variant="h6" fontWeight="bold" color="primary.main" mb={2}>
            Apply For
          </Typography>
          {(["jobRole", "lastSalary", "expectedSalary"] as const).map((fieldName) => (
            <Controller
              key={fieldName}
              name={`applyFor.${fieldName}`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " *"}
                  fullWidth
                  margin="dense"
                  error={!!errors.applyFor?.[fieldName]}
                  helperText={errors.applyFor?.[fieldName]?.message}
                />
              )}
            />
          ))}
        </Box>

        {/* Terms */}
        <Controller
          name="termsAccepted"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.termsAccepted} sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Checkbox {...field} checked={!!field.value} />}
                label="I accept Terms & Conditions *"
              />
              <FormHelperText>{errors.termsAccepted?.message}</FormHelperText>
            </FormControl>
          )}
        />

        {/* Submit / Clear */}
        <Box display="flex" gap={2} mt={4}>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onClear}>
            Clear
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LargeForm;