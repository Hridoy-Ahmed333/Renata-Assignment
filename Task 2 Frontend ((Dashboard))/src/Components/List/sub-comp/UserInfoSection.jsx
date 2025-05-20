function UserInfoSection({ label, value, isWideScreen }) {
  return (
    <div className="name">
      {isWideScreen ? (
        <div className="row-label-cont">
          <div className="row-label">{label}: </div>
          <div className="row-data">{value}</div>
        </div>
      ) : (
        <div className="row-data">{value}</div>
      )}
    </div>
  );
}

export default UserInfoSection;
