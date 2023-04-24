$(function () {
  var futureContainer = document.getElementById("future");
  var presentContainer = document.getElementById("present");
  var pastContainer = document.getElementById("past");

  var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var scheduleValues = readSchedulesFromStorage();
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
    textArea.id = hours[i]+ "textArea";
    textArea.rows = "3";
    
    for  (let j = 0; j < scheduleValues.length; j++) {
      if (scheduleValues[j].id === hours[i]) {
        textArea.textContent = scheduleValues[j].value; 
      }
    }

    saveBtn.className = "btn saveBtn col-2 col-md-1";
    saveBtn.ariaLabel = "save";
    saveBtn.id = hours[i];
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

  //Saving
  var saveBtnClick = document.getElementsByClassName("saveBtn");
  for (let i = 0; i < saveBtnClick.length; i++) {
    saveBtnClick[i].addEventListener("click", (event) =>
    {
      handleSaveTextArea(event, hours[i]);
    });
  }

  // Storage
  function readSchedulesFromStorage() {
    var schedules = localStorage.getItem("schedules");
    if (schedules) {
      schedules = JSON.parse(schedules);
    } else {
      schedules = [];
    }
    return schedules;
  }
  function saveSchedulesToStorage(schedules) {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }
  function handleSaveTextArea(event, hour) {
    event.preventDefault();
  
    // read user input from the textArea
    var textAreaValue = document.getElementById(hour + "textArea").value;
  
    var newSchedule = {
      id: hour,
      value: textAreaValue,
    };
    var schedules = readSchedulesFromStorage();
    schedules.push(newSchedule);
    saveSchedulesToStorage(schedules);
  }

 //Showing Date
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
    displayDay();
  });
  
  