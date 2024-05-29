export default function Heading({previous,curr,next}){
    return(
        <div className="heading">
          <span>
            {previous} <span className="sp"> {curr} </span> {next}
          </span>
        </div>
    )
}