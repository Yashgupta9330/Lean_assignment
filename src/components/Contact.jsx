import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Importing useSelector
import Button from "./Button";
import Heading from "./Heading";
import Textarea from "./Textarea";
import Textinput from "./Textinput";
import Success from "./Success";
import { validateEmail, validateMobile } from "../utils/Valid";

export default function Contact({ setOpen, setSelectedAction }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [fileValue,setFileValue]=useState(null);
  const Email = useSelector(state => state.auth.user?.email);
  console.log(Email);

  // If email exists in Redux, set it in the state
  useEffect(() => {
    if (Email) {
      setEmail(Email);
    }
  }, [Email]);

  const handleSubmit = async () => {
    setEmailError(false); // Reset email error state
    setMobileError(false); // Reset mobile error state

    // Validate email
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    // Validate mobile number
    if (mobile.trim() && !validateMobile(mobile)) {
      setMobileError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/contact",
        { name, email, phone: mobile, query: issueDescription }
      );

      if (response.status === 201) {
        setName("");
        setEmail("");
        setMobile("");
        setIssueDescription("");
        setSubmissionStatus("success");
        setOpen(false);

        setTimeout(() => {
          setSubmissionStatus(null);
          setSelectedAction(null);
        }, 5000);
      } else {
        console.error("Failed to submit contact form");
      }
    } catch (error) {
      console.error("Failed to submit contact form", error);
    }
  };

  return (
    <>
      {submissionStatus === "success" ? (
        <Success message="Your query has been successfully submitted!" />
      ) : (
        <>
          <Heading previous="Let us know what " curr="your queries" next="are!" />
          <Textinput label="Your Name" value={name} onChange={setName} />
          {!email && ( // Render email input only if email doesn't exist in Redux
            <div>
              <Textinput
                label="Your email"
                value={email}
                onChange={setEmail}
                required={true}
              />
              {emailError && (
                <span style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  Invalid Email format
                </span>
              )}
            </div>
          )}
          {!email && ( // Render mobile input only if email doesn't exist in Redux
            <div>
              <Textinput
                label="Your Mobile number"
                value={mobile}
                onChange={setMobile}
              />
              {mobileError && (
                <span style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  Invalid Mobile Number
                </span>
              )}
            </div>
          )}
          <Textarea
            label="Describe the issue In detail"
            placeholder="Enter your Issue here..."
            value={issueDescription}
            onChange={setIssueDescription}
            required={true}
            fileValue={fileValue}
            onFileChange={(file) => setFileValue(file)}
          />
          <div onClick={handleSubmit}>
            <Button disabled={!name.trim() || !email.trim() || !issueDescription.trim()} />
          </div>
        </>
      )}
    </>
  );
}
