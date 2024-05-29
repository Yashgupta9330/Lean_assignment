export default function Button({disabled}){
      return(
        <div className="submit-container">
         <button className={`submit-button ${disabled ? 'disabled' : ''}`} disabled={disabled} >Submit</button>
        </div>
      )
}