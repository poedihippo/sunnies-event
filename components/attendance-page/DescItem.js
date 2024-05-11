function Desc(props) {
  const { label, value } = props;
  return (
    <div>
      <p>
        <span>{label}</span>
        <br />
        {value}
      </p>
      <hr />
    </div>
  );
}

export default Desc;
