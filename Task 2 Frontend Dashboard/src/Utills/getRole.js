export function getCurrentUserRoleOrAddVisitor() {
  const currentUserData = localStorage.getItem("currentUser");

  if (currentUserData) {
    const user = JSON.parse(currentUserData);
    return user.role;
  } else {
    const visitor = {
      email: "new@gmail.com",
      role: "Visitor",
    };
    localStorage.setItem("currentUser", JSON.stringify(visitor));
    return visitor.role;
  }
}
