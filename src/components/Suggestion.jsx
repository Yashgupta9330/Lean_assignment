import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector hook
import axios from "axios";
import Heading from "./Heading";
import Select from "./Select";
import Textarea from "./Textarea";
import Textinput from "./Textinput";
import Button from "./Button";
import Success from "./Success";
import { validateEmail } from "../utils/Valid";
import { BACKEND_Link } from "../utils/Links";

export default function Suggestion({ setOpen, setSelectedAction }) {
  const [section, setSection] = useState("Interview Question");
  const [suggestion, setSuggestion] = useState("");
  const [email, setEmail] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const userEmail = useSelector(state => state.auth.user?.email); // Access user email from Redux store
  const [fileValue, setFileValue] = useState(null);

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail); // Set email state if user email is available
    }
  }, [userEmail]);

  const handleSubmit = async () => {
    setIsEmailValid(true);

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    try {
      const response = await axios.post(
         BACKEND_Link+"/suggestion",
        { section, description: suggestion, email }
      );
      console.log(response)
      if (response.status === 201) {
        setSubmissionStatus("success");
        setOpen(false);
        setTimeout(() => {
          setSubmissionStatus(null);
          setSelectedAction(null);
        }, 2000);
      } else {
        console.error("Failed to submit suggestion:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit suggestion:", error);
    }
  };

  return (
    <>
      {submissionStatus === "success" ? (
        <Success message="Thank you for your valuable suggestion!" />
      ) : (
        <>
          <Heading previous="Share your" curr="Suggestions" next="with us for a chance to earn rewards!" />
          <Select
            label="Choose the Section"
            sect={section}
            onChange={(value) => setSection(value)}
          />
          <div>
            <Textarea
              label="Describe the Suggestion In detail"
              placeholder="Enter your Suggestion here..."
              value={suggestion}
              onChange={(value) => setSuggestion(value)}
              fileValue={fileValue}
              onFileChange={(file) => setFileValue(file)}
            />
          </div>
          {!userEmail && (
            <div>
              <Textinput
                label="Enter your email to receive an update"
                required={true}
                value={email}
                onChange={(value) => setEmail(value)}
              />
              {!isEmailValid && (
                <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  Invalid email format
                </div>
              )}
            </div>
          )}
          <div onClick={handleSubmit}>
            <Button disabled={email.trim() === "" || suggestion.trim() === ""} />
          </div>
        </>
      )}
    </>
  );
}
