import { validateEmail, validateMobile } from "../utils/Valid";

export const handleSubmit = (formData) => {
  const { name, email, mobile, issueDescription, setEmailError,setMobile,setIssueDescription, setMobileError, setIssueError, setSubmissionStatus, setOpen, setSelectedAction } = formData;

  setEmailError("");
  setMobileError("");
  setIssueError("");

  if (name.trim() === "" || email.trim() === "" || mobile.trim() === "" || issueDescription.trim() === "") {
    alert("Please fill in all fields before submitting.");
    return;
  }

  if (!validateEmail(email)) {
    setEmailError("Invalid email format");
    return;
  }

  if (!validateMobile(mobile)) {
    setMobileError("Invalid mobile number format");
    return;
  }

  // Perform submission logic here
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Mobile:", mobile);
  console.log("Issue Description:", issueDescription);

  // Reset form fields
  setName("");
  setEmail("");
  setMobile("");
  setIssueDescription("");

  setSubmissionStatus("success");
  setOpen(false);

  // Reset submission status after 5 seconds
  setTimeout(() => {
    setSubmissionStatus(null);
    setSelectedAction(null);
  }, 5000);
};
