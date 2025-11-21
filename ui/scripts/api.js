const userApiEndpoint = "http://localhost:8080/api/v1/users";
export const userApiRegisterEndpoint = "http://localhost:8080/api/v1/user/create";

async function fetchUsers() {
  const response = await (await fetch(userApiEndpoint)).json();
  return response;
}

export default fetchUsers;
