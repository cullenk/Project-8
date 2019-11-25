const url = "https://randomuser.me/api/?results=12&nat=us,au,ca,ch,de,gb,fr&inc=name, picture, email, location, phone, dob, nat & noinfo";
const employees = [];

function generateData() {
 fetch(url) //fetch takes one argument, the source of where the info is coming from. Stored in url variable...
   .then(response => response.json()) //Anonymous function. Take that information, parse the data into json() format which are name: value pairs.
   .then(data => { //Anonymous function, do something...
    const results = data.results; //get the data received, store it in "const results"
    console.log(results);
   })
   .catch(error => console.log("Oops! Something went wrong.", error)) //If something goes wrong, catch the error and log the message
   employees.push(results)
}

const directory = employees => { //Anonymous function to handle the insertion of newly created DOM elements for the employees (paramter) in the array.
  const gallery = document.querySelector('#gallery'); //The place to store the elements

  employees.forEach(employee => { //loop through each employee in the array
    gallery.innerHTML += //Target the gallery DIV so we can inject code inside of it.
     // Use a template literal to build the structure of HTML elements.
     `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}</p>
      </div>
    </div>
  `;
  });

  gallery.querySelectorAll('.card').forEach((card, index) => { //Gives click functionality to each new card/employee element.
      card.addEventListener('click', () => {
        modal(employees[index]); //calls the model function for the single employee that was clicked.
      });
    });

};

directory(employees);

const modal = employee => {
  const modalContainer = document.querySelector('.modal-container');
  const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language); // Formats date depending on users locale.

  modalContainer.innerHTML = `
  <div class="modal">
     <div class="modal-info-container">
       <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
       <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
       <p class="modal-text">${employee.email}</p>
       <p class="modal-text cap">${employee.location.city}</p><hr>
       <p class="modal-text">${employee.phone}</p>
       <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
       <p class="modal-text">Birthday: ${dob}</p>
     </div>
   </div>
  `​;
  modalContainer.style.display = 'block';
};

















































// // JavaScript
// const url = "https://randomuser.me/api/?results=12&nat=us,au,ca,ch,de,gb,fr&inc=name, picture, email, location, phone, dob, nat & noinfo";
// let index = 0;
// const employees = [];
// const list = document.getElementById("gallery");
//
//
// // Fetch the employee data from the randomuser API
// function generateData() {
//  fetch(url) //fetch takes one argument, the source of where the info is coming from. Stored in url variable...
//    .then(response => response.json()) //Anonymous function. Take that information, parse the data into json() format.
//    .then(data => { //Anonymous function, do something...
//      const results = data.results; //get the data received, store it in "const results"
//      generateEmployees(results);  // Call the generateEmployees function, pass it the data stored in results variable
//    })
//    .catch(error => console.log("Oops! Something went wrong.", error)) //If something goes wrong, catch the error and log the message
// }
//
// //Function to create the actual objects for the data
// function generateEmployees(data) {
//   let html = []; //set an empty array
//   let index = 0; //set the index count at 0
//   data.map(result => { //map over all of the data results
//     let name = `${result.name.first} ${result.name.last}`;
//     let city = result.location.city;
//     const thumbnail = `
//       <section class="employee-card" data-index=${index}><img class="employee-img" src=${result.picture.large}>
//       <div class="card">
//       <h2>${name}</h2>
//       <p>${result.email}</p>
//       <p>${city}</p>
//       </div>
//       </section>`; //Format all this HTML markup
//     html += thumbnail; //Add this markup (stored in "thumbnail") to the html array.
//
//     // Generate the Employee objects themselves
//        const employee = {
//          index,
//          name,
//          city,
//          phone: result.phone,
//          email: result.email,
//          street: `${result.location.street.number} ${result.location.street.name}`,
//          nationality: result.nat,
//          zipCode: result.location.postcode,
//          image: result.picture.large,
//          birthday: new Date(result.dob.date)
//        }
//        index += 1;
//        employees.push(employee);  // add the employee to the employees array
//
//      });
//
//      list.innerHTML = html; //Adds all of this to the list variable
//
//      // Add click functionality to each card element created in the list/gallery
//      list.querySelectorAll('.card').forEach((card, index) => {
//        card.addEventListener('click', () => {
//          modal(employees[index]);
//        });
//      });
//
//    }
//
// generateData();
//
// // CREATING THE POP UP MODAL OVERLAY
//
//
// const modal = employee => {
//   const modalContainer = document.querySelector('.modal-container');
// // ​  const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language); // Formats date depending on users locale.
//
//   modalContainer.innerHTML = `<div class="modal">
//       <div class="modal-info-container">
//         <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
//         <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
//         <p class="modal-text">${employee.email}</p>
//         <p class="modal-text cap">${employee.location.city}</p><hr>
//         <p class="modal-text">${employee.phone}</p>
//         <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
//         <!-- <p class="modal-text">Birthday: </p> -->
//       </div>
//     </div>
// `;
//
//   modalContainer.style.display = 'block';
// };
