// Example freelancers
const freelancerArray = [
  { name: "Dr. Slice", occupation: "Gardener", price: 25 },
  { name: "Dr. Pressure", occupation: "Programmer", price: 51 },
  { name: "Prof. Possibility", occupation: "Teacher", price: 43 },
  { name: "Prof. Prism", occupation: "Teacher", price: 81 },
  { name: "Dr. Impulse", occupation: "Teacher", price: 43 },
  { name: "Prof. Spark", occupation: "Programmer", price: 76 },
  { name: "Dr. Wire", occupation: "Teacher", price: 47 },
  { name: "Prof. Goose", occupation: "Driver", price: 72 },
];

// Possible names
const names = [
  "Aria",
  "Elijah",
  "Olivia",
  "Jackson",
  "Sophia",
  "Liam",
  "Emma",
  "Mason",
  "Isabella",
  "Lucas",
];

// Possible occupations
const occupations = [
  "Software Developer",
  "Teacher",
  "Nurse",
  "Mechanical Engineer",
  "Graphic Designer",
  "Chef",
  "Marketing Analyst",
  "Electrician",
  "Physician",
  "Data Scientist",
];

function init() {
  /**
   * 👉 STEP 1: Grab the div with the id of "root"
   */
  const rootDiv = document.getElementById("root");

  /**
   * 👉 STEP 2:
   *    Create a new h1 element that says "Freelancer Forum"
   *    Add the new h1 to the root div
   */
  const heading = document.createElement("h1");
  heading.textContent = "Freelancer Forum";
  rootDiv.appendChild(heading);

  // Create a placeholder for the average price
  const averageDisplay = document.createElement("p");
  averageDisplay.id = "averagePrice";
  rootDiv.appendChild(averageDisplay);

  // Initial mean price display
  updateMeanPriceDisplay(freelancerArray)

  /**
   * 👉 STEP 3:
   *    Create a table to hold our Freelancers in
   */
  const freelanceTable = new Table(rootDiv);

  freelanceTable.makeTableColumn("Name");
  freelanceTable.makeTableColumn("Occupation");
  freelanceTable.makeTableColumn("Starting Price");

  /**
   * 👉 STEP 5:
   *    Call the function you created in step 4
   */

  // INITIAL RENDERING OF EXISTING FREELANCERS
  renderFreelancers(freelancerArray, freelanceTable);

  /**
   * 👉 STEP 7:
   *    Add an interval to automatically add random freelancers every second
   */
  // DYNAMICALLY RENDERING ADDED FREELANCERS
  setInterval(() => {
    const updatedFreelancers = addRandomFreelancer(names,occupations);
    freelanceTable.clearTableBody(); // Clear current rows, in order to avoid repition of initial freelancers. 
    updatedFreelancers.forEach((freelancer) => freelanceTable.makeTableRow(freelancer)); // Render updated freelancers
  }, 1000); // Interval set to 1 second
}


// A class that creates a table object. Creates rows, columns and clear table. 
class Table {
  constructor(parentElement) {
    this.parentElement = parentElement; // The element where the table will be appended
    this.table = document.createElement("table");
    this.parentElement.appendChild(this.table); // Append the table to the parentElement
  }

  // Method to add a column header
  makeTableColumn(textContent) {
    let thead = this.table.querySelector("thead");
    if (!thead) {
      thead = document.createElement("thead");
      this.table.appendChild(thead);
    }

    const col = document.createElement("th");
    col.textContent = textContent;
    thead.appendChild(col);
  }

  // Method to add a row
  makeTableRow(rowData) {
    const tbody =
      this.table.querySelector("tbody") || document.createElement("tbody");
    if (!this.table.contains(tbody)) {
      this.table.appendChild(tbody);
    }

    const tr = document.createElement("tr");
    rowData.forEach((data) => {
      const td = document.createElement("td");
      td.textContent = data;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  // Method to clear the table body
  clearTableBody() {
    const tbody = this.table.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = "";
    }
  }
}

//Function that calculates the average of the freelancer's salary
function meanPrice(freelancerArray) {
  const average =
    freelancerArray.reduce((sum, freelancer) => sum + freelancer.price, 0) /
    freelancerArray.length;
  return average.toFixed(2); // Round to 2 decimal places
}

//Function that displays updated average of freelancer's salary
function updateMeanPriceDisplay(freelancerArray) {
  const averageDisplay = document.getElementById("averagePrice");
  averageDisplay.textContent =
    "The average starting price is " + meanPrice(freelancerArray);
}

//Convert freelancersArray from array of objects to array of arrays.
function convertObjectsToArray(freelancerArray) {
  return freelancerArray.map((freelancer) => Object.values(freelancer));
}

/**
 * 👉 STEP 4:
 *    Create a function to render the Freelancers in our Freelancers array
 */
function renderFreelancers(freelancerArray, freelanceTable) {
  const results = convertObjectsToArray(freelancerArray);
  return results.forEach((freelancer) =>
    freelanceTable.makeTableRow(freelancer)
  );
}

/**
 * 👉 STEP 6:
 *    Create a function to add a new random Freelancer to the Freelancers array
 */
function addRandomFreelancer(names, occupations) {
  // Generate random name, occupation, and price
  const name = names[Math.floor(Math.random() * names.length)];
  const occupation =
    occupations[Math.floor(Math.random() * occupations.length)];
  const price = Math.floor(Math.random() * 100);

  // Create new freelancer object
  const newFreelancer = { name, occupation, price };

  // Push the new freelancer into our array with all the freelancers.
  freelancerArray.push(newFreelancer);

  // Update the average display everytime a random freelancer is added
  updateMeanPriceDisplay(freelancerArray);

  // Convert new freelancers to array of arrays
  return convertObjectsToArray(freelancerArray); // Return updated array as an array of arrays
}

// Initialize program
init();
