// ---------------Variables para el TOTAL --------

let mostrarTotal = document.getElementById("total");
let imprimirTotal = document.createElement("p");

// // ----------- Ingresar nombre de usuario -------

// const verificarUsuario = () => {
//   let usuario = localStorage.getItem("usuario");
//   console.log(`Bienvenido ${usuario}!!`);

//   if (usuario !== null) {
//     $("#usuario").append(`
//                           <div class="add-usuario">
//                             <h3>¡Bienvenido ${usuario}!</h3>
//                           </div>
//     `);
//   } else {
//     let usuario = prompt("Ingrese su nombre");
//     localStorage.setItem("usuario", usuario);
//     $("#usuario").append(`
//                           <div class="add-usuario">
//                             <h3>¡Bienvenido ${usuario}!</h3>
//                           </div>
//     `);
//   }
// };

// ----------------Array de objetos----------------

const GETJSON = "app.json";

//--------------Array vacio para carrito-----------

const carrito = [];

//----------------Clase para cliente---------------

class Cliente {
  constructor(name, email, dni, tel, pedido) {
    this.name = name;
    this.email = email;
    this.dni = dni;
    this.tel = tel;
    this.pedido = pedido;
  }
}

//------------------Carrito-------------------
$("#carrito-imagen").on("click", function () {
  $("");
});

//---------Funcion para generar cards---------

function renderCardCursos() {
  $.getJSON(GETJSON, function (respuesta, estado) {
    if (estado === "success") {
      let cursos = respuesta;

      for (const curso of cursos) {
        $("#estilos-card").prepend(`<div class="card-curso">
                            <h3>${curso.nombre}</h3>
                            <img src="${curso.icon}" class="imagenes"/>
                            <p>Duración: ${curso.duracion}</p>
                            <p>Modalidad: ${curso.modalidad}</p>
                            <p>Valor: $${curso.precio}</p>
                            <button id="btn-${curso.id}" class="botones">Agregar</button>
                          </div>`);

        pushCursoCarrito(curso);
      }
    }
  });
}

//----------Funcion del evento click para agregar un curso al carrito-----------

function pushCursoCarrito(curso) {
  let seleccionarCurso = document.getElementById(`btn-${curso.id}`);
  seleccionarCurso.addEventListener("click", () => {
    carrito.push(curso);

    mostrarCarrito(curso);
  });
}

function totalAPagar() {
  let total = 0;

  for (const aPagar of carrito) {
    total = total + aPagar.precio;
  }
  imprimirTotal.innerHTML = `<p>$${total}</p>`;
  mostrarTotal.append(imprimirTotal);
  console.log("Se agrego un curso");
}

//------------------ABRIR CARRITO-----------------

$(`#carrito-imagen`).click(() => {
  $("#lista-productos").toggle("fast");
});

//------ Funcion que muestra los cursos seleccionados-----

function mostrarCarrito(curso) {
  $(".tabla-carrito").append(`<tr>
                                <td class="item-cart">Curso: ${curso.nombre}</td>
                                <td class="item-cart">$${curso.precio}</td>
                              </tr>
    `);
  if (carrito.length != 0) {
    $(".btn-primary").show();
  }

  $(`#item-seleccionado-${curso.id}`).remove();

  console.log(carrito);

  totalAPagar();
}

//------------FUNCION PARA ENVIAR DATOS AL LocalStorage-----------------------

function enviarDatosCliente() {
  $("#formulario").submit((e) => {
    e.preventDefault();

    let nombreIngresado = document.getElementById("name").value;
    let emailIngresado = document.getElementById("email").value;
    let dniIngresado = document.getElementById("dni").value;
    let telIngresado = document.getElementById("tel").value;

    const cliente1 = new Cliente(
      nombreIngresado,
      emailIngresado,
      dniIngresado,
      telIngresado,
      carrito
    );

    let confirmarCompra = confirm(
      "Estas seguro de que desea finalizar la compra?"
    );
    if (confirmarCompra) {
      console.log(cliente1);

      const enJSON = JSON.stringify(cliente1);

      localStorage.setItem("cliente1", enJSON);

      console.log(JSON.parse(enJSON));

      location.reload();
      alert(
        "Su pedido ha sido procesado. En la brevedad se le enviara un mail."
      );
    } else {
      formulario.reset();
    }
  });
}

enviarDatosCliente();

renderCardCursos();

//verificarUsuario();

//-------------------------------------------------

console.log($(".titulo").html());
