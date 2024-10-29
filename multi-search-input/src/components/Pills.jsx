const Pills = ({image,text,onClick}) => {
    return (
      <>
    <div>
      <span className="user-pill" onClick={onClick}>
          <img src={image} alt={text} />
      </span>
      <span>{text}</span>
    </div>
    </>
    )
  };
  export default Pills;