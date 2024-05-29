import Feedback1 from "../assets/Feedback.svg"
import Suggestion1 from "../assets/Suggestion.svg"
import Issue1 from "../assets/Issue.svg"
import Contact1 from "../assets/Contact.svg"
import Contact from "../components/Contact";
import Feedback from "../components/Feedback";
import Issue from "../components/Issue";
import Suggestion from "../components/Suggestion";


export const actions = [
    { label: "Report an issue", icon: Issue1, onClick: console.log("suggestion") },
    { label: "Share Feedback", icon: Feedback1, onClick: console.log("share feedback") },
    { label: "Give Suggestion", icon: Suggestion1, onClick: console.log("give suggestion") },
    { label: "Contact Us", icon: Contact1, onClick: console.log("contact us") }
  ];

export const components = [
  { action: "Report an issue", component: Issue },
  { action: "Share Feedback", component: Feedback },
  { action: "Give Suggestion", component: Suggestion },
  { action: "Contact Us", component: Contact }
];