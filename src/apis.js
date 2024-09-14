const BE_URL = "http://localhost:4500";

// Create User API
export const createUserAPI = async (userDetails) => {
  const response = await fetch(`${BE_URL}/users`, {
    body: JSON.stringify(userDetails),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};
