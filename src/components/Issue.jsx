import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Importing useSelector
import Textarea from "./Textarea";
import Select from "./Select";
import Textinput from "./Textinput";
import Heading from "./Heading";
import Button from "./Button";
import Success from "./Success";
import { validateEmail } from "../utils/Valid";
import { BACKEND_Link } from "../utils/Links";

function Issue({ setOpen, setSelectedAction }) {
  const [issueDescription, setIssueDescription] = useState("");
  const [section, setSection] = useState("Interview Questions");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Extracting email from Redux store
  const reduxEmail = useSelector((state) => state.auth.user?.email);

  // If email exists in Redux, set it in the state
  React.useEffect(() => {
    if (reduxEmail) {
      setEmail(reduxEmail);
    }
  }, [reduxEmail]);

  const handleSubmit = async () => {
    setIsEmailValid(true);
    const isValidEmail = validateEmail(email);
    setIsEmailValid(isValidEmail);
    if (!isValidEmail) {
      return;
    }

    try {
      const response = await axios.post(
        BACKEND_Link+"/issue", // Replace with your actual issue API endpoint
        { section, description: issueDescription, email }
      );

      if (response.status === 201) {
        // Submission successful
        setSubmissionStatus("success");
        setOpen(false);
        setTimeout(() => {
          setSubmissionStatus(null);
          setSelectedAction(null);
        }, 5000);
      } else {
        // Handle other status codes
        console.error("Failed to submit issue:", response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error("Failed to submit issue:", error);
    }
  };

  return (
    <>
      {submissionStatus === "success" ? <Success message="Thanks for bringing the issue to our attention. We'll review it shortly and provide an update soon!" />
       : ( 
       <>
       <Heading previous="Let's us know about the" curr="Issue" next="you are Facing!" />
          <Select
            label="Choose the Section"
            value={section}
            onChange={setSection}
            sect="Interview Question"
          />
          <Textarea
            label="Describe the issue In detail"
            value={issueDescription}
            onChange={setIssueDescription}
            placeholder="Enter your Issue here..."
            fileValue={file}
            onFileChange={(file) => setFile(file)}
          />
          {!reduxEmail && ( // Render email input only if email doesn't exist in Redux
            <div>
              <Textinput
                label="Enter your email to receive an update"
                onChange={(value) => setEmail(value)}
                value={email}
                required={true}
              />
              {!isEmailValid && (
                <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  Invalid email format
                </div>
              )}
            </div>
          )}
          <div onClick={handleSubmit}>
            <Button disabled={email.trim() === "" || issueDescription.trim() === ""} />
          </div>
          </>
          )}
      </>
  );
}

export default Issue;
