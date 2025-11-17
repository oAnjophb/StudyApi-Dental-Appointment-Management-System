import fetchUsers, { userApiRegisterEndpoint } from "../api.js";

const users = async () => await fetchUsers();

export async function getUsers() {
  const tableOfUsers = document.querySelector("table");
  const tbody = document.createElement("tbody");

  try {
    const jsonReturnedForAPI = await users();

    jsonReturnedForAPI.forEach((user) => {
      const newLine = document.createElement("tr");
      const userName = document.createElement("th");
      const userEmail = document.createElement("td");
      const userType = document.createElement("td");

      userName.textContent = user.name;
      userEmail.textContent = user.email;
      userType.textContent = user.role;

      newLine.appendChild(userName);
      newLine.appendChild(userEmail);
      newLine.appendChild(userType);

      tbody.appendChild(newLine);
    });
    tableOfUsers.appendChild(tbody);
  } catch (erro) {
    console.error("DEU RUIM NA HORA DE BUSCAR OS DADOS: ", erro);
  }
}

export async function RegisterUser() {
  const userForm = document.querySelector(".user-form");

  userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    async function postUser(data) {
      try {
        const response = await fetch(userApiRegisterEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const newUser = await response.json();
        console.log("Usuário criado: ", newUser);

        userForm.reset();
      } catch (error) {
        console.log("Erro ao registrar usuário: ", error);
      }
    }

    const formData = new FormData(userForm);
    const data = Object.fromEntries(formData.entries());

    postUser(data);
  });
}
