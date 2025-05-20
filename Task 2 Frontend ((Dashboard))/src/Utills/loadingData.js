export function syncUsersToLocalStorage(defaultUsers) {
  let storedData = localStorage.getItem("data");

  if (!storedData) {
    localStorage.setItem("data", JSON.stringify(defaultUsers));
  } else {
    let existingUsers = JSON.parse(storedData);
    const updatedUsers = [...existingUsers];

    defaultUsers.forEach((defaultUser) => {
      const index = updatedUsers.findIndex(
        (user) => user.email === defaultUser.email
      );

      if (index === -1) {
        updatedUsers.push(defaultUser);
      } else {
        const existingUser = updatedUsers[index];

        if (
          existingUser.role !== defaultUser.role ||
          existingUser.password !== defaultUser.password
        ) {
          updatedUsers[index] = {
            ...existingUser,
            role: defaultUser.role,
            password: defaultUser.password,
          };
        }
      }
    });

    localStorage.setItem("data", JSON.stringify(updatedUsers));
  }
}
