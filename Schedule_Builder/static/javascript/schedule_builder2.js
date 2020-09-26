// General order of commands ========================================================================================
// displayAllClassList(selected_class_list) is called onload
// createAllTables() is called onload
// displayCourse(0) is called onload

// Onclick events ===================================================================================================
// In displayAllClassList() if a class is clicked on then displayCourse() is called, displaying the table for the course
// In createTable() if a row is clicked on then evaluate_selected_row() is called
//      evaluate_selected_row() will then call updateSchedule(), update_conflicting_times(), and highlightRow() if appropriate
// In html file, if a title is clicked on then either displaySchedule() or displayFilters() will be called accordingly
// In html file, if a weekday is selected then updateDays() is called

// Global Variables =================================================================================================
let class_list;
let schedule = [];

let colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function getTimeString(militaryTime){
    let date = new Date("2020-01-01" + " " + militaryTime);
    //console.log(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let time = hours + ':' + minutes + ' ' + ampm;
    return time;
}

function getDate(){

}

// Determines Course Icon color ====================================================================================
function getAvatarColor(messageSender) {
    var hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

// Displays the classes to the right of the schedule  ==============================================================
function displayAllClassList(class_list_data){
    class_list = class_list_data;
    let title = document.getElementById("title_schedule");
    title.setAttribute("style", "color: rgb(0, 119, 204); display: unset; font-size: 12px;");
    let schedule_container = document.getElementById("schedule_container");

    for (let i=0; i < class_list.length; i++) {
        let course = class_list[Object.keys(class_list)[i]];         // Gets the first dictionary of array
        course = course[Object.keys(course)[0]];                     // Gets the value of the dictionary

        let course_container = document.createElement("div");
        course_container.setAttribute("class", "course_container");

        let course_div = document.createElement("div");
        course_div.setAttribute("class", "course_div");
        course_div.id = "course_div" + i;

        let li = document.createElement("li");

        let name = document.createElement("span");
        let nameText = document.createTextNode(course[i]["course_name"]);
        name.appendChild(nameText);
        name.id = course[i]["course_name"];

        let time = document.createElement("p");
        time.setAttribute("class", "time");
        let tab = "\u00a0\u00a0\u00a0\u00a0";
        let timeText = document.createTextNode("TBA");
        time.appendChild(timeText);
        time.id = "time" + i;

        let campus = document.createElement("p");
        campus.setAttribute("class", "campus");
        let campusText = document.createTextNode("");
        campus.appendChild(campusText);
        campus.id = "campus" + i;

        li.appendChild(name);
        li.appendChild(time);
        li.appendChild(campus);
        course_div.appendChild(li);
        course_container.appendChild(course_div);
        schedule_container.appendChild(course_container);

        course_div.onclick = function() {displayCourse(i); displayClassInformation(i)};
        //course_div.onclick = (function(i) {return function() {displayNewPage(all_patients[i])};})(i);
    }
}

function displayClassInformation(){

}
// Creates and handles the drop down menu to display course tables =================================================
function createCourseDropDownButton(){
    let select_course_container = document.getElementById("select_course_container");

    let dropdown_div = document.createElement("div");
    dropdown_div.className = "dropdown";

    let button = document.createElement("button");
    button.className = "dropbtn";
    let buttonText = document.createTextNode("Select Course \u25be");
    button.appendChild(buttonText);
    button.onclick = function () {myFunction();};

    let dropdown = document.createElement("div");
    dropdown.className = "dropdown-content";
    dropdown.id = "myDropdown";

    // Creates the All dropdown option
    let a = document.createElement("a");
    let text = document.createTextNode("All");
    a.appendChild(text);
    a.onclick = function () {displayAllCourses();};
    dropdown.appendChild(a);

    // Creates the rest of the drop down options for each class
    for (let i=0; i < class_list.length; i++) {
        let course = class_list[Object.keys(class_list)[i]];         // Gets the first dictionary of array
        course = course[Object.keys(course)[0]];                     // Gets the value of the dictionary

        let a = document.createElement("a");
        let text = document.createTextNode(course[i]["course_name"]);
        a.appendChild(text);
        a.id = "dropdown_item" + i;
        a.onclick = function () {displayCourse(i);};
        dropdown.appendChild(a);
    }

    dropdown_div.appendChild(button);
    dropdown_div.appendChild(dropdown);
    select_course_container.appendChild(dropdown_div);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Handles the scrollable select drop down menu for selecting classes =============================================
const selected_subject = document.querySelector(".selected-subject");
const subjectOptionsContainer = document.querySelector(".subject-options-container");

const subjectOptionsList = document.querySelectorAll(".subject-option");

selected_subject.addEventListener("click", () => {
  subjectOptionsContainer.classList.toggle("active");
});

subjectOptionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected_subject.innerHTML = o.querySelector("label").innerHTML;
    subjectOptionsContainer.classList.remove("active");
  });
});

const selected_course = document.querySelector(".selected-course");
const courseOptionsContainer = document.querySelector(".course-options-container");

const courseOptionsList = document.querySelectorAll(".course-option");

selected_course.addEventListener("click", () => {
  courseOptionsContainer.classList.toggle("active");
});

courseOptionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected_course.innerHTML = o.querySelector("label").innerHTML;
    courseOptionsContainer.classList.remove("active");
  });
});

// Handles the button for adding a class -------------------------------------------------------------------------
function displayCourseOptions(){
    let add_course_container = document.getElementById("add_course_options_container");
    add_course_container.className = "select_container_active";
}

function hideCourseOptions(){
    let add_course_container = document.getElementById("add_course_options_container");
    add_course_container.className = "select_container_hidden";
}

// Displays the course table  =====================================================================================
function displayCourse(id){
    let table_holder = document.getElementById("table_holder");
    let children = table_holder.children;


    if (children) {                                 // If there are any children(tables) in table holder then hide them
        for (let i = 0; i < children.length; i++) {
            children[i].style.display = "none";
        }
    }

    if (children[id]){                             // If the table exists, then change style to show table
        children[id].style.display = "table";
    }
    else {                                         // Else the table doesn't exist, then create a new table for it
        createTable(id);
    }
}

function displayAllCourses(){
    let table_holder = document.getElementById("table_holder");
    let children = table_holder.children;

    if (children) {
        for (let i = 0; i < children.length; i++) {
            children[i].style.display = "table";
        }
    }
}

function createAllTables(){
    for (let i=0; i < class_list.length; i++){
        createTable(i);
    }
}

function createTable(id){
    let course = class_list[Object.keys(class_list)[id]];         // Gets the first dictionary of array
    course = course[Object.keys(course)[0]];                      // Gets the value of the dictionary

    // Creates the table for displaying course info
    let table_holder = document.getElementById("table_holder");
    let table = document.createElement("table");
    table.setAttribute("class", "course_table");
    table.style.display = "none";
    table.id = "table" + id;
    let tableID = table.id;
    for (let r=0; r < course.length; r++) {
        let row = document.createElement("tr");
        row.setAttribute("class", "");
        row.id = "table"+ id + "row" + r;
        let rowID = row.id;

        let titles = ["Course", "Campus", "Hours", "Date", "Days", "Time", "Professor", "Rating"];
        if (r === 0){
            let course_name_row = document.createElement("tr");
            course_name_row.setAttribute("class", "course_name_row");
            let course_name_cell = document.createElement("th");

            let course_name_element = document.createElement("p");
            course_name_element.setAttribute("class", "course_name");
            let course_name_text = document.createTextNode(course[0]["course_name"] + " - " + course[0]["course"]);
            course_name_element.appendChild(course_name_text);

            let section_element = document.createElement("p");
            section_element.setAttribute("class", "section_text");
            let section_text = document.createTextNode(" Sections \u25be");
            section_element.appendChild(section_text);

            course_name_cell.appendChild(course_name_element);
            course_name_cell.appendChild(section_element);
            course_name_row.appendChild(course_name_cell);
            table.appendChild(course_name_row);

            let column_title_row = document.createElement("tr");
            column_title_row.setAttribute("class", "row_title");
            for (let c=0; c < titles.length; c++) {
                let titleCell = document.createElement("th");
                let titleCellText = document.createTextNode(titles[c]);
                titleCell.appendChild(titleCellText);
                column_title_row.appendChild(titleCell);
            }
            table.appendChild(column_title_row);
        }

        let course_info = course[r]["course"] + "   " + course[r]["section"];
        let campus = course[r]["campus"];
        let hours = course[r]["hours"];
        let date = course[r]["date"];
        let days = course[r]["days"];
        let time = getTimeString(course[r]["startTime"]) + " - " + getTimeString(course[r]["endTime"]);
        let professor = course[r]["professor"];
        let professor_rating = course[r]["professor_rating"];
        let columns = [course_info, campus, hours, date, days, time, professor, professor_rating];

        for (let c=0; c < columns.length; c++){
            let cell = document.createElement(("td"));
            let cellText = document.createTextNode(columns[c]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        row.onclick = function () {
            evaluate_selected_row(tableID, rowID, id, r);
        };
        table.appendChild(row);
        table_holder.appendChild(table);
    }
}

function evaluate_selected_row(tableID, rowID, id, r){
    let course = class_list[Object.keys(class_list)[id]];         // Gets the first dictionary of array
    course = course[Object.keys(course)[0]];                      // Gets the value of the dictionary

    let row = document.getElementById(rowID);

    // If the row selected has the class row_selected (meaning itself), then
    if (row.className.includes("row_selected")){
        row.className = "";

        // Update displayed text in html
        document.getElementById("time"+id).innerText = "TBA";
        document.getElementById("campus"+id).innerText = " ";

        // Go through the entire selected schedule and delete the current course
        for (let i=0; i < schedule.length; i++){
            if (schedule[i]["course"] === course[r]["course"]){
                schedule.splice(i, 1);
            }
        }
        // Update (take away) conflicting times
        update_conflicting_times(id);
        filter_rows();
        console.log(schedule);
    }
    // If the row selected is a conflicting time (you cannot select conflicting times), then do something
    else if (row.className === "conflicting_time") {
        highlight_conflicting_course(course, r);
    }
    else if (row.className === "unselected_filter") {
        // highlight_conflicting_course(course, r);
    }
    else {
        updateSchedule(id, r);
        update_conflicting_times(id);
        highlightRow(tableID, rowID);
    }
}

function highlight_conflicting_course(course, r){
    for (let i = 0; i < schedule.length; i++) {
        if (course[r]["startTime"] === schedule[i]["startTime"]) {

            let course_div = document.getElementById(schedule[i]["course_name"]);
            let original_color = course_div.style.backgroundColor;
            course_div.style.transition = "0.2s";
            course_div.style.backgroundColor = 'red';
            let timeout = setTimeout(function(){
                course_div.style.transition = "1.2s";
                course_div.style.backgroundColor = original_color;
            },(200));

        }
    }
}

function updateSchedule(ID, row) {
    let course = class_list[Object.keys(class_list)[ID]];         // Gets the first dictionary of array
    course = course[Object.keys(course)[0]];                      // Gets the value of the dictionary

    // Changes the text in the appropriate class course info (within the option container)
    let tab = "\u00a0\u00a0\u00a0\u00a0";
    let time = getTimeString(course[row]["startTime"]) + " - " + getTimeString(course[row]["endTime"]);
    document.getElementById("time"+ID).innerText = course[row]["days"] + tab + time;
    document.getElementById("campus"+ID).innerText = course[row]["campus"];

    // This code checks whether the added course already exists in the schedule database
    // If it does then change the key value, if it doesn't, create a new entry
    let key = course[0]["course"];
    let key_exists_in_schedule = false;
    if (schedule.length > 0) {
        for (let i = 0; i < schedule.length; i++) {
            //console.log(schedule[i]["course"]);
            if (key === schedule[i]["course"]) {
                schedule[i] = course[row];
                key_exists_in_schedule = true;
            }
        }
        if (!key_exists_in_schedule){
            schedule.push(course[row]);
        }
    }
    else {
        schedule.push(course[row]);
    }
    console.log(schedule);
}

function checkConflictingTime(startTime_of_row, endTime_of_row, selected_start_time, selected_end_time){
    if (((selected_start_time <= startTime_of_row) && (selected_end_time >= startTime_of_row )) ||
        ((selected_start_time <= endTime_of_row) && (selected_end_time >= endTime_of_row ))) {
        return true;
    }
    else{
        return false;
    }

}

function update_conflicting_times(id){
// This function changes the background color of all courses that now interferes with a selected schedule
    for (let i=0; i < class_list.length; i++){
        let course = class_list[Object.keys(class_list)[i]];          // Gets the first dictionary of array
        course = course[Object.keys(course)[0]];                      // Gets the value of the key

        for (let r = 0; r < course.length; r++) {
            let rowID = "table" + i + "row" + r;
            let row = document.getElementById(rowID);
            let startTime_of_row = new Date("2020-01-01" + " " + course[r]["startTime"]); // Start time of the row
            let endTime_of_row = new Date("2020-01-01" + " " + course[r]["endTime"]);     // End time of the row
            let day_of_row = course[r]["days"];

            if (!(row.className.includes('row_selected'))) {
                if (schedule.length <= 0) {     // If nothing exists within the schedule then there should be no conflicting times
                    if (row.className === 'conflicting_time') {
                        row.setAttribute("class", "");
                    }
                    else if (row.className === 'conflicting_time unselected_filter'){
                        row.setAttribute("class", "unselected_filter");
                    }
                }
                else {
                    for (let i = 0; i < schedule.length; i++) { // Go through the entire selected schedule and
                                                                // gray all rows that conflict with their times
                        let schedule_start_time = new Date("2020-01-01" + " " + schedule[i]["startTime"]);
                        let schedule_end_time = new Date("2020-01-01" + " " + schedule[i]["endTime"]);
                        let schedule_day = schedule[i]["days"];

                        if (checkConflictingTime(startTime_of_row, endTime_of_row, schedule_start_time, schedule_end_time) && day_of_row === schedule_day){
                            if (course[r]["course"] !== schedule[i]["course"]) { // Conflicting times does not apply to the your current table
                                row.setAttribute("class", "conflicting_time");
                                break;
                            }
                        }
                        else if (row.className.includes("unselected_filter")){
                            row.setAttribute("class", "unselected_filter");
                        }
                        else {
                            row.setAttribute("class", "");
                        }
                    }
                }
            }
        }

    }
}

function highlightRow(tableID, rowID){
    let table = document.getElementById(tableID);
    let rows = table.getElementsByTagName("tr");

    // Goes through all rows in the displayed table and searches for the previous selected row and unselects it
    for (let r=0; r < rows.length; r++){
        if (rows[r].className === 'row_selected' ){
            rows[r].className = "";
        }
    }
    // Gets the currently selected row and adds the row_selected class to change it's background color in css
    let rowSelected = document.getElementById(rowID);
    rowSelected.className = "row_selected";

    //console.log(rowID);
}

// Displays filters or schedule, Onclick events defined in the html file =========================================
function displaySchedule(){
    let schedule_container = document.getElementById("schedule_container");
    schedule_container.style.display = "block";

    let filter_container = document.getElementById("filter_container");
    filter_container.style.display = "none";
}

function displayFilters(){
    let schedule_container = document.getElementById("schedule_container");
    schedule_container.style.display = "none";

    let filter_container = document.getElementById("filter_container");
    filter_container.style.display = "block";
}

// Filters option handlers =======================================================================================

// Filters dictionary keeps track of which options are selected/deselected
let filters = {"days": [],           // Days added here are days that the user doesn't want (so it should be grayed)
                "breaks": [],        // Breaks added here are the times the user doesn't want (so it should be grayed)
                "campus": [],        // Campuses here are should be grayed
                "ratings": 0};       // Rating below this value should also be grayed

function hideORshow(id){
    let container = document.getElementById(id);

    if (container.style.display === "none"){
        container.style.display = "block";
    }
    else {
        container.style.display = "none";
    }
}

// Days ---------------------------------------------------------------------------------------------------------------
function getLetterFromDay(day){
    if (day === "Sun"){
        return "U";}
    else if (day === "Mon"){
        return "M";}
    else if (day === "Tue"){
        return "T";}
    else if (day === "Wed"){
        return "W";}
    else if (day === "Thu"){
        return "R";}
    else if (day === "Fri"){
        return "F";}
    else if (day === "Sat"){
        return "S";}
}

function updateDays(id){
    // Update the available days in the array ---------------------
    let day = document.getElementById(id);
    if (day.className === "li-unselected"){      // Delete the day from the array
        day.className = "";
        let array = filters["days"];             // references the address of filters["days"]
        let index = array.indexOf(day.innerText);

        if (index > -1) {
            array.splice(index, 1);
        }
        //console.log(filters["days"]);
    }
    else {                                      // Add the day to the array
        day.className = "li-unselected";
        let array = filters["days"];            // references the address of filters["days"]
        if (array.indexOf(day.innerText) <= -1){
            array.push(day.innerText);
        }
        //console.log(filters["days"]);
    }

    filter_rows();
}

// Breaks -------------------------------------------------------------------------------------------------------------
function change_am_or_pm(id){
    let startTime_am = document.getElementById('startTime-am');
    let startTime_pm = document.getElementById('startTime-pm');
    let endTime_am = document.getElementById('endTime-am');
    let endTime_pm = document.getElementById('endTime-pm');

    if (id === 'startTime-am'){
        startTime_am.style.color = "blue";
        startTime_pm.style.color = "unset";
    }
    else if (id === 'startTime-pm'){
        startTime_am.style.color = "unset";
        startTime_pm.style.color = "blue";
    }
    else if (id === 'endTime-am'){
        endTime_am.style.color = "blue";
        endTime_pm.style.color = "unset";
    }
    else if (id === 'endTime-pm'){
        endTime_am.style.color = "unset";
        endTime_pm.style.color = "blue";
    }
}

function updateBreaks(){
    let startTime_hour = document.getElementById("startTime-hour").value;
    let startTime_minute = document.getElementById("startTime-minute").value;
    let startTime = '';

    let startTime_pm = document.getElementById("startTime-pm");
    if (startTime_pm.style.color === 'blue'){
        startTime_hour = parseInt(startTime_hour) + 12;
    }

    let endTime_hour = document.getElementById("endTime-hour").value;
    let endTime_minute = document.getElementById("endTime-minute").value;
    let endTime = '';

    let endTime_pm = document.getElementById("endTime-pm");
    if (endTime_pm.style.color === 'blue'){
        endTime_hour = parseInt(endTime_hour) + 12;
    }

    startTime = startTime_hour + ":" + startTime_minute;
    endTime = endTime_hour + ":" + endTime_minute;
    let startDate = new Date("2020-01-01" + " " + startTime);
    let endDate = new Date("2020-01-01" + " " + endTime);

    let array = filters["breaks"];              // references the address of filters["days"]
    let dict = {'startTime': startDate, 'endTime': endDate};
    array.push(dict);

    console.log(filters['breaks']);

    displayBreaks();
    filter_rows();
}

function displayBreaks(){

}

// Campus -------------------------------------------------------------------------------------------------------------
function updateCampuses(id){
    // Update the available campuses in the array ---------------------
    let campus = document.getElementById(id);
    if (campus.checked === true){                   // Delete the campus from the array
        let array = filters["campus"];              // references the address of filters["days"]
        let index = array.indexOf(campus.name);

        if (index > -1) {
            array.splice(index, 1);
        }
        //console.log(filters["campus"]);
    }
    else {                                        // Add the campus to the array
        let array = filters["campus"];            // references the address of filters["days"]
        if (array.indexOf(campus.name) <= -1){
            array.push(campus.name);
        }
        //console.log(filters["campus"]);
    }

    filter_rows();
}

// Rating -------------------------------------------------------------------------------------------------------------
function updateRatings(id){
    // Update the rating -------------------------------------------
    filters["ratings"] = id;
    for (let i = 1; i <= 4; i++){
        let li = document.getElementById("rating-" + i);
        if (i <= id){
            li.className = "li-unselected";
        }
        else {
            li.className = "";
        }
    }

    filter_rows();
}

// Filter Functions ---------------------------------------------------------------------------------------------------

function filters_exist(){
    if (filters["days"].length > 0 || filters["breaks"].length > 0 || filters["campus"].length > 0
        || filters["ratings"] > 0){
        //console.log("filters do exist");
        return true;
    }
    else {
        //console.log("filters do not exist");
        return false;
    }
}

function checkBreaks(startTime_of_row, endTime_of_row, breaks){
    if (breaks == null) {
        return false;
    }
    else {
        if (((breaks['startTime'] <= startTime_of_row) && (breaks['endTime'] >= startTime_of_row )) ||
            ((breaks['startTime'] <= endTime_of_row) && (breaks['endTime'] >= endTime_of_row ))) {
            return true;
        }
        else{
            return false;
        }

    }
}

function filter_rows() {
    // Update the table (graying all unselected days) ------------
    for (let i=0; i < class_list.length; i++){                        // Go through all the tables
        let course = class_list[Object.keys(class_list)[i]];          // Gets the i'th dictionary of array
        course = course[Object.keys(course)[0]];                      // Gets the value of the key

        for (let r = 0; r < course.length; r++) {
            let rowID = "table" + i + "row" + r;
            let row = document.getElementById(rowID);
            let day_of_row = course[r]["days"];                                                 // Day of the row
            let startTime_of_row = new Date("2020-01-01" + " " + course[r]["startTime"]); // Start time of the row
            let endTime_of_row = new Date("2020-01-01" + " " + course[r]["endTime"]);     // End time of the row
            let campus_of_row = course[r]["campus"];                                            // Campus of the row
            let rating_of_row = course[r]["professor_rating"];                                  // Professor Rating of the row

            console.log(startTime_of_row);

            let more_filters = true;

            for (let i = 0; more_filters === true; i++) {                       // Go through until there aren't more filters
                let dayLetter = getLetterFromDay(filters["days"][i]);  // Gets the appropriate letter for the day
                let breaks = filters["breaks"][i];
                let campus = filters["campus"][i];
                let rating = filters["ratings"];

                //console.log(rowID);
                //console.log(row.className);
                if (filters_exist() && (day_of_row.includes(dayLetter) || campus_of_row === campus || rating_of_row <= rating ||
                    checkBreaks(startTime_of_row, endTime_of_row, breaks))) {
                    //if (row.className.includes("row_selected") || row.className.includes("row_selected redRow")){
                    if (row.className === "row_selected" || row.className === "row_selected redRow"){
                        row.setAttribute("class", "row_selected redRow");
                        let error_message = document.getElementById("filter_error_message");
                        error_message.style.display = "block";
                    }
                    else if (row.className.includes("conflicting_time")){
                        row.setAttribute("class", "conflicting_time unselected_filter");
                    }
                    else {
                        row.setAttribute("class", "unselected_filter");
                    }
                    break;
                }
                else {
                    if (row.className === "row_selected" || row.className === "row_selected redRow"){
                        row.setAttribute("class", "row_selected");
                        let error_message = document.getElementById("filter_error_message");
                        error_message.style.display = "none";
                    }
                    else if (row.className.includes("conflicting_time")){
                        row.setAttribute("class", "conflicting_time");
                    }
                    else {
                        row.setAttribute("class", "");
                    }
                }

                if (filters["days"][i+1] == null && filters["breaks"][i+1] == null && filters["campus"][i+1] == null){
                    more_filters = false;
                }
            }
        }
    }
}

// Display scheduled courses =======================================================================================
function displayScheduledCourses(){
    let schedule_container = document.getElementById("scheduled_course_container");
    schedule_container.className = "scheduled_course_container";

    let schedule_table = document.createElement("table");
    schedule_table.setAttribute("class", "scheduled_course_table");
    for (let r=0; r < schedule.length; r++) {
        let row = document.createElement("tr");
        row.className = "scheduled_course";

        let titles = ["Status", "CRN", "Course Detail Information", "Hours", "Date", "Days", "Time", "Location", "Room", "Rating"];
        if (r === 0){
            let column_title_row = document.createElement("tr");
            column_title_row.setAttribute("class", "row_title");
            for (let c=0; c < titles.length; c++) {
                let titleCell = document.createElement("th");
                let titleCellText = document.createTextNode(titles[c]);
                titleCell.appendChild(titleCellText);
                column_title_row.appendChild(titleCell);
            }
            schedule_table.appendChild(column_title_row);
        }

        let status = schedule[r]["status"];
        let crn = schedule[r]["crn"];
        let course_info = "This element is created dynamically below";
        let hours = schedule[r]["hours"];
        let date = schedule[r]["date"];
        let days = schedule[r]["days"];
        let time = getTimeString(schedule[r]["startTime"]) + " - " + getTimeString(schedule[r]["endTime"]);
        let location = schedule[r]["building"];
        let room = schedule[r]["room"];
        let professor_rating = schedule[r]["professor_rating"];
        let columns = [status, crn, course_info, hours, date, days, time, location, room, professor_rating];

        for (let c=0; c < columns.length; c++){
            if (columns[c] === course_info){
                let cell = document.createElement(("td"));

                let cell_div = document.createElement("div");
                cell_div.className = "cell-align-left";
                let courseText = document.createTextNode(schedule[r]["course"] + " (" + schedule[r]["section"] + ")");
                let courseNameText = document.createTextNode(schedule[r]["course_name"]);
                let campusText = document.createTextNode("Campus: " + schedule[r]["campus"]);
                let termText = document.createTextNode("Part of Term: Full Term");
                let instructorText = document.createTextNode("Instructor: " + schedule[r]["professor"]);

                cell_div.appendChild(courseText);
                cell_div.appendChild(document.createElement("br"));
                cell_div.appendChild(courseNameText);
                cell_div.appendChild(document.createElement("br"));
                cell_div.appendChild(campusText);
                cell_div.appendChild(document.createElement("br"));
                cell_div.appendChild(termText);
                cell_div.appendChild(document.createElement("br"));
                cell_div.appendChild(instructorText);
                cell.appendChild(cell_div);
                row.appendChild(cell);
            }
            else {
                let cell = document.createElement(("td"));
                let cellText = document.createTextNode(columns[c]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }

        schedule_table.appendChild(row);
        console.log(schedule_table);
    }
    schedule_container.appendChild(schedule_table);

}



