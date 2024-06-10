// Create table from csv data -  COMPLETE? (Refactor?)
fetch("books.csv")
  .then(response => response.text())
  .then(data => {
    csv_data = data;

    var results = Papa.parse(csv_data);

    let table = document.getElementById("b_data");
    let total_rows = 195;
    let total_cols = 6;
    let col_classnames = ["title_td", "author_td", "pub_td", "", "_yr_td", "rating_td"]

    for (i = 1; i < total_rows; i++) {
      let row = document.createElement("tr");
      table.appendChild(row);
      for (j = 0; j < total_cols; j++) {
        if (j == 3) {
          let t_data = document.createElement("td");
          t_data.textContent = results.data[i][j];
          if (results.data[i][j] == "Fiction") {
            t_data.className = "f_td";
          }
          else if (results.data[i][j] == "Non-Fiction") {
            t_data.className = "nf_td";
          }
          row.appendChild(t_data);
        }
        else if (j == 4) {
          let t_data = document.createElement("td");
          t_data.textContent = results.data[i][j];
          t_data.className = results.data[i][j] + "_yr_td";
          row.appendChild(t_data);
        }
        else {
          let t_data = document.createElement("td");
          t_data.textContent = results.data[i][j];
          t_data.className = col_classnames[j];
          row.appendChild(t_data);
        }
      }
    }
});


// Current state of filters
let fnf_state = "both";
let year_state = "all_years";
let rating_state = "all_ratings";

// Dropdown event listeners
let fnf_dropdown = document.getElementById("fnf");
fnf_dropdown.addEventListener("change", function() {
  fnf_state = this.value;
  apply_filters()
});

let read_dropdown = document.getElementById("read_filter");
read_dropdown.addEventListener("change", function() {
  year_state = this.value;
  apply_filters()
});

let rating_dropdown = document.getElementById("rating_filter");
rating_dropdown.addEventListener("change", function() {
  rating_state = this.value;
  console.log("rating_state: " + rating_state);
  apply_filters()
});


// Adds hidden class status to rows
function set_hidden_status(elements, on_off, filter_name) {
  for (let i = 0; i < elements.length; i++) {
    if (on_off == "on") {
      elements[i].parentNode.classList.add(filter_name + "_hidden");
    }
    else if (on_off == "off") {
      elements[i].parentNode.classList.remove(filter_name + "_hidden");
    }
  }
};

// Unified check filters and apply hide
function apply_filters() {
  let nf_elements = document.getElementsByClassName("nf_td");
  let f_elements = document.getElementsByClassName("f_td");
  let years = ["all_years", "2024", "2023", "2022", "2021", "2020"];
  let year_elements = [];
  let rating_elements = document.getElementsByClassName("rating_td");

  for (let i = 0; i < years.length; i++) {
    if (years[i] !== "all_years") {
      elements = document.getElementsByClassName(years[i] + "_yr_td")
      year_elements.push(elements);
    }
  }

  if (fnf_state == "both") {
    set_hidden_status(nf_elements, "off", "fnf");
    set_hidden_status(f_elements, "off", "fnf");
  }
  else if (fnf_state == "f") {
    set_hidden_status(nf_elements, "on", "fnf");
    set_hidden_status(f_elements, "off", "fnf");
  }
  else if (fnf_state == "nf") {
    set_hidden_status(nf_elements, "off", "fnf");
    set_hidden_status(f_elements, "on", "fnf");
  }

  if (year_state == "all_years") {
    for (let i = 0; i < year_elements.length; i++) {
        set_hidden_status(year_elements[i], "off", "year");
    }
  }
  else {
    for (let i = 0; i < year_elements.length; i++) {
      for (let j = 0; j < year_elements[i].length; j++) {
        if (year_elements[i][j].innerText !== year_state) {
          set_hidden_status(year_elements[i], "on", "year");
        }
        else {
          set_hidden_status(year_elements[i], "off", "year");
        }
      }
    }
  }

  if (rating_state == "all_ratings") {
    for (let i = 0; i < rating_elements.length; i++) {
      rating_elements[i].parentNode.classList.remove("rating_hidden");
    }
  }
  else if (rating_state == "5") {
    for (let i = 0; i < rating_elements.length; i++) {
      rating_elements[i].parentNode.classList.remove("rating_hidden");
      if (rating_elements[i].innerText !== "5") {
        rating_elements[i].parentNode.classList.add("rating_hidden");
      }
    }
  }
  else if (rating_state == "4s") {
    for (i = 0; i < rating_elements.length; i++) {
      rating_elements[i].parentNode.classList.remove("rating_hidden");
      ratings_4s = ["4.75", "4.5", "4.25", "4"];
      if (!ratings_4s.includes(rating_elements[i].innerText)) {
        rating_elements[i].parentNode.classList.add("rating_hidden");
      }
    }
  }
  else if (rating_state == "3s") {
    for (i = 0; i < rating_elements.length; i++) {
      rating_elements[i].parentNode.classList.remove("rating_hidden");
      ratings_3s = ["3.75", "3.5", "3.25", "3"];
      if (!ratings_3s.includes(rating_elements[i].innerText)) {
        rating_elements[i].parentNode.classList.add("rating_hidden");
      }
    }
  }
  else if (rating_state == "2s") {
    for (i = 0; i < rating_elements.length; i++) {
      rating_elements[i].parentNode.classList.remove("rating_hidden");
      ratings_2s = ["2.75", "2.5", "2.25", "2"];
      if (!ratings_2s.includes(rating_elements[i].innerText)) {
        rating_elements[i].parentNode.classList.add("rating_hidden");
      }
    }
  }
  else if (rating_state == "1s") {
    for (i = 0; i < rating_elements.length; i++) {
      rating_elements[i].parentNode.classList.remove("rating_hidden");
      ratings_1s = ["1.75", "1.5", "1.25", "1"];
      if (!ratings_1s.includes(rating_elements[i].innerText)) {
        rating_elements[i].parentNode.classList.add("rating_hidden");
      }
    }
  }
}

let search_box = document.querySelector("#search_box");
search_box.addEventListener("input", function(e) {
  let input_value = e.target.value.toLowerCase()
  let title_elements = document.getElementsByClassName("title_td");
  let author_elements = document.getElementsByClassName("author_td");
  let pub_elements = document.getElementsByClassName("pub_td");
  let combined_elements = [title_elements, author_elements, pub_elements]

  for (i = 0; i < title_elements.length; i++) {
    title_elements[i].parentNode.classList.remove("search_hidden");
    title_elements[i].parentNode.classList.remove("search_found");
  }

  for (i = 0; i < combined_elements.length; i++) {
    for (j = 0; j < combined_elements[i].length; j++)
      {
        if (combined_elements[i][j].parentNode.classList.contains("search_found")) {
          continue;
        }
        else if (combined_elements[i][j].innerText.toLowerCase().includes(input_value)) {
          combined_elements[i][j].parentNode.classList.add("search_found");
          combined_elements[i][j].parentNode.classList.remove("search_hidden");
        }
        else if (!combined_elements[i][j].innerText.toLowerCase().includes(input_value)) {
          combined_elements[i][j].parentNode.classList.add("search_hidden");
        }
      }
  }

})
