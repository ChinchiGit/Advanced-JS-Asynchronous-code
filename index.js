//RESUELVE TUS EJERCICIOS AQUI

//RESUELVE TUS EJERCICIOS AQUI

//1.- Declara una funcion getAllBreeds que devuelva todas las razas de perro.
function getAllBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(res=>res.json())
        .then(breeds=> {
            return Object.keys(breeds.message)
        })
}

//2.- Declara una función getRandomDog que obtenga una imagen random de una raza.

function getRandomDog (){
    return fetch('https://dog.ceo/api/breeds/image/random')
                .then(res=>res.json())
                .then(getRandom =>getRandom.message);

};

//3.- Declara una función getAllImagesByBreed que obtenga todas las imágenes de una raza.

function getAllImagesByBreed (){
    return fetch(`https://dog.ceo/api/breed/komondor/images`)
                .then(res=>res.json())
                .then(byBreed => byBreed.message);
};

//4.- Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada por el argumento

function getAllImagesByBreed2 (hound){
    return fetch(`https://dog.ceo/api/breed/${hound}/images`)
                .then(res=>res.json())
                .then(breed => breed.message);
};


//5- Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a partir de su nombre de usuario. (https://api.github.com/users/{username}).

function getGitHubUserProfile(username){
    return fetch(`https://api.github.com/users/${username}`)
                        .then(res=>res.json())
                        .then(user => user);
} ;

// 6.- Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM.

// ojo la validacion espera una src distinta de la imagen aunque funciona y se pinta

function printGithubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(res => {

        let img = res.avatar_url;
        let name = res.name;
  
        let objeto = { img: { src: img }, name: name };

        let imagen = document.createElement("img");
        document.body.appendChild(imagen);

        let usuario = document.createElement("p");    
        document.body.appendChild(usuario);

        imagen.src = img;
        usuario.innerHTML = name;

        return objeto;
      });
    }


//7. Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma:


function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(res=> {
                let img = res.avatar_url;
                let name = res.name;
                let repos = res.public_repos;
                console.log(img, name, repos);
        
                return `<section>
                            <img src="${img}" alt="${name}">
                            <h1>${name}</h1>
                            <p>Public repos: ${repos}</p>
                        </section>`
            })
} 



// 8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.(Esto no se testea).

// la validacion del ejercicio 8 corresponde con el enunciado del 9

const textBox = document.createElement("input")
textBox.setAttribute("type", "text");
textBox.setAttribute("value", "username");

const boton = document.createElement("button")
boton.setAttribute("type", "search");
boton.textContent = "Buscar";

document.body.appendChild(textBox);
document.body.appendChild(boton);

boton.addEventListener("click", () => {

  const username = textBox.value;
  console.log(username);


  getAndPrintGitHubUserProfile(username);
});




/* 9.- Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames) que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
Objetivo: Usar Promise.all()
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
Pregunta. ¿cuántas promesas tendremos?
Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario. Consigue que se imprima por consola el nombre de cada usuario.
*/


//que diferencia hay de usar map a for each en este caso? 


let listaUsuarios = ['octocat', 'alenriquez96', 'alejandroereyesb'];

/*function fetchGithubUsers(userNames) {
    let arrayPromesas = userNames.forEach(name => {
        return fetch(`https://api.github.com/users/${name}`)
            .then(res => res.json())
            .then(res=> {
      
                console.log(res.name)
                console.log(res.html_url)

                return res;

            })

    })
    return Promise.all(arrayPromesas);
}
*/

function fetchGithubUsers(userNames) {
    let arrayPromesas = userNames.map(name=> {
        return fetch(`https://api.github.com/users/${name}`)
            .then(res=>res.json())
            .then(res => {
                console.log(res.name);
                console.log(res.html_url)
                return res
        })
    })
    return Promise.all(arrayPromesas);
}

