import UserRow from "./UserRow";

function Wraper({ data, setRe, re }) {
  return (
    <>
      {data?.map((item, index) => (
        <UserRow key={index} rowData={item} setRe={setRe} re={re} />
      ))}
    </>
  );
}

export default Wraper;
