// JavaScript
const url = "https://randomuser.me/api/?results=12&nat=us,au,ca,ch,de,gb,fr&inc=name, picture, email, location, phone, dob, nat & noinfo";
let index = 0;
const employees = [];
const list = document.getElementById("employee-list");


// Fetch the employee data from the randomuser API
function generateData() {
 fetch(url) //fetch takes one argument, the source of where the info is coming from. Stored in url variable...
   .then(response => response.json()) //Anonymous function. Take that information, parse the data into json() format.
   .then(data => { //Anonymous function, do something...
     const results = data.results; //get the data received, store it in "const results"
     generateEmployees(results);  // Call the generateEmployees function, pass it the data stored in results variable
     console.log(results); //Log the results
   })
   .catch(error => console.log("Oops! Something went wrong.", error)) //If something goes wrong, catch the error and log the message
}

//Function to create the actual objects for the data
function generateEmployees(data) {
  let html = []; //set an empty array
  let index = 0; //set the index count at 0
  data.map(result => { //map over all of the data results
    let name = `${changeCase(result.name.first)} ${changeCase(result.name.last)}`;
    let city = changeCase(result.location.city);
    const thumbnail = `
      <section class="employee-card" data-index=${index}><img class="employee-img" src=${result.picture.large}>
      <div class="card">
      <h2>${name}</h2>
      <p>${result.email.toLowerCase()}</p>
      <p>${city}</p>
      </div>
      </section>`; //Format all this HTML markup
    html += thumbnail; //Add this markup (stored in "thumbnail") to the html array.

    // Generate the Employee objects themselves
       const employee = {
         index,
         name,
         city,
         phone: result.phone,
         email: result.email.toLowerCase(),
         street: `${result.location.street.number} ${changeCase(result.location.street.name)}`,
         nationality: result.nat.toUpperCase(),
         zipCode: result.location.postcode,
         image: result.picture.large,
         birthday: new Date(result.dob.date)
       }
       index += 1;
       employees.push(employee);  // add the employee to the employees array
     });
     list.innerHTML = html; //Adds all of this to the list variable
   }

   function changeCase(str) {
     str = str.replace("ß", "ss");
     str = str.replace("-", " - ");
     str = str.replace("/", " - ");
     str = str.replace("\'", " \' ");
     let words = str.split(" ");
     let newString = [];
     words.forEach(word => newString += `${word[0].toUpperCase()}${word.slice(1)} `);
     newString = newString.replace(" - ", "-");
     newString = newString.replace(" \' ", "\'");
     return newString;
   }

generateData();
