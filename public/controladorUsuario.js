// Función para listar las reservas y mostrarlas en el HTML
export async function login(username, password) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al hacer login");
    }
    //alert("Usuario logueado correctamente");
    return true;
  } catch (error) {
    // alert("Error al hacer login: " + error.message);
    return false;
  }
  //
}

export async function crearUsuario(username, password) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }
    alert("Usuario registrado exitosamente");
    window.location.href = "/";
  } catch (error) {
    alert("Error al crear el usuario: " + error.message);
  }
}

const btnNuevo = document.querySelector("#btnUsuarioNuevo");

if (btnNuevo != null) {
  btnNuevo.addEventListener("click", async () => {
    let username = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;

    if (!username || !password) {
      alert("Complete todos los campos requeridos.");
      return;
    }

    await crearUsuario(username, password);
  });
}

const btnLogin = document.querySelector("#btnIngresar");

if (btnLogin != null) {
  btnLogin.addEventListener("click", async () => {
    let username = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;

    if (!username || !password) {
      alert("Complete todos los campos requeridos.");
      return;
    }
    let resultado = await login(username, password);
    if (resultado == true) {
      window.location.href = "/principal";
    } else {
      alert("no ingresó");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  //console.log("Loguedo correctamente")
});
