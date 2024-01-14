import React , {useState} from 'react'

export default function TextForm() {
    const [text,setText]=useState("");
 const handleUpClick=()=>{
    console.log("i am clicked by the owner" + text)
    let newText=text.toUpperCase();
    setText(newText)
 }
 const handleOnChange=(event)=>{
    console.log("on Change")
    setText(event.target.value)
 }
 const handleLoClick=() =>{
    let textSet1=text.toLowerCase();
  setText(textSet1)
 }
 const clearText=() =>{
  let textSet1=""
setText(textSet1)
}
const clearSpace=() =>{
  let textSet1=text.split(/[ ]+/);
  setText(textSet1.join(" "))
}
const copyText=() =>{
  let textt=document.getElementById('myBox');
  textt.select();
  navigator.clipboard.writeText(textt.value);

}

  return (
    <>
   
       
    <h1 >Welcome to our Comment Box</h1>
<div className='container'>
    <div className="mb-3">
      <label htmlFor="myBox">Example textarea</label>
      <textarea className="form-control" value={text}  onChange={handleOnChange}id="myBox" rows="5"></textarea>
    </div>
    <button  className="btn btn-primary mx-1" onClick={handleUpClick}>convert to Uppercase</button>
    <button  className="btn btn-primary mx-1" onClick={handleLoClick} >convert to lowercase</button>
    <button  className="btn btn-primary mx-1" onClick={clearText} >Clear Text</button>
<button  className="btn btn-primary mx-1" onClick={clearSpace} >Clear Space</button>
<button  className="btn btn-primary mx-1" onClick={copyText} >Copy Text</button>

</div>
<div className='container my-3'>
<p >{text.split(" ").length} words and chracter number {text.length} </p>
<p>{0.008*text.split(" ").length} minute read</p>
</div>
</>
  );
}
