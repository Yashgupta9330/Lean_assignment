import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Importing useSelector
import Heading from "./Heading";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";
import Textinput from "./Textinput";
import Button from "./Button";
import Success from "./Success";
import { validateEmail } from "../utils/Valid";
import { BACKEND_Link } from "../utils/Links";

export default function Feedback({ setOpen, setSelectedAction }) {
  const [feedback, setFeedback] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [fileValue, setFileValue] = useState(null); // State for file value

  // Extracting email from Redux store
  const reduxEmail = useSelector((state) => state.auth.user?.email);

  const [email, setEmail] = useState(reduxEmail || ""); // Initialize email state with reduxEmail if available

  const handleSubmit = async () => {
    setIsEmailValid(true);

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    try {
      const response = await axios.post(
        BACKEND_Link+"/feedback", 
        { email, message: feedback, isAnonymous: isChecked}
      );
     console.log(response)
      if (response.status === 200) {
        setSubmissionStatus("success");
        setOpen(false);
        setTimeout(() => {
          setSubmissionStatus(null);
          setSelectedAction(null);
        }, 5000);
      } 
      else {
        // Handle error
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Failed to submit feedback", error);
    }
  };

  return (
    <>
      {submissionStatus === "success" ? (
        <Success message="Thank you for your valuable feedback!" />
      ) : (
        <>
          <Heading previous="Let's us know your" curr="Feedback" next="about us!" />
          <Textarea
            placeholder="Enter your Feedback here"
            value={feedback}
            onChange={(value) => setFeedback(value)}
            fileValue={fileValue} // Pass file value
            onFileChange={(file) => setFileValue(file)}
          />
          <Checkbox
            isChecked={isChecked}
            onChange={(value) => setIsChecked(value)}
          />
          {!reduxEmail && ( // Render email input only if email doesn't exist in Redux
            <div>
              <Textinput
                label="Enter your email to receive an update"
                value={email}
                onChange={(value) => setEmail(value)}
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
            <Button disabled={email.trim() === ""} />
          </div>
        </>
      )}
    </>
  );
}
