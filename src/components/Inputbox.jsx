import { components } from "../utils/Links";

function InputBox({ action, setOpen, setSelectedAction }) {
  const Component = components.find(item => item.action === action)?.component;
  
  if (!Component) {
    return null; 
  }

  return (
    <div className="inputbox">
      <Component setOpen={setOpen} setSelectedAction={setSelectedAction} />
    </div>
  );
} 

export default InputBox;
