$(function () {
  var futureContainer = document.getElementById("future");
  var presentContainer = document.getElementById("present");
  var pastContainer = document.getElementById("past");

  var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  for (let i = 0; i < hours.length; i++) {
  
    var currentHour = dayjs().hour(hours[i]).format("h a");
  //Creating Elements  
    var hour = document.createElement("div");
    var textAreaDiv = document.createElement("div");
    var textArea = document.createElement("textarea");
    var saveBtn = document.createElement("button");
    var saveIcon = document.createElement("i");

    //Styling
    textAreaDiv.className = "col-2 col-md-1 hour text-center py-3";
    textAreaDiv.textContent = currentHour;
    textArea.className = "col-8 col-md-10 description";
    textArea.rows = "3";
    saveBtn.className = "btn saveBtn col-2 col-md-1";
    saveBtn.ariaLabel = "save";
    saveIcon.className = "fas fa-save";
    saveIcon.ariaHidden = "true";

    saveBtn.appendChild(saveIcon);
    hour.appendChild(textAreaDiv);
    hour.appendChild(textArea);
    hour.appendChild(saveBtn);

    if (compareHour(hours[i]) < 0) {
      hour.className = "row time-block past";
      pastContainer.appendChild(hour);
    } else if (compareHour(hours[i]) === 0) {
      hour.className = "row time-block present";
      presentContainer.appendChild(hour);
    } else {
      hour.className = "row time-block future";
      futureContainer.appendChild(hour);
    }
  }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    
    displayDay();
  });
  
  function displayDay(){
    var currentDay = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDay);
  }

  function compareHour(hour){ 
    var currentHour = dayjs().hour();
    var compareHour = dayjs().hour(hour);
    currentHour = dayjs().hour(currentHour);

    return compareHour.diff(currentHour, "hours"); 

  }