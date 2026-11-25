// LPU Sports Management System - beginner-friendly JavaScript
// All records are stored in this browser using LocalStorage.

function loadData(key, defaultValue) {
  try {
    var saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

var athletes = loadData("lpuAthletes", [
  {name: "Aman Kumar", age: 19, sport: "Cricket"},
  {name: "Priya Sharma", age: 18, sport: "Badminton"},
  {name: "Rahul Singh", age: 20, sport: "Football"},
  {name: "Nigesh Kumar", age: 21, sport: "Football"},
  {name: "Neha Singh", age: 21, sport: "Football"}
]);
var coaches = loadData("lpuCoaches", [
  {name: "Coach Gaurav", sport: "Football", experience: 5},
  {name: "Coach Harnoor", sport: "Cricket", experience: 4},
  {name: "Coach Surya", sport: "Badminton", experience: 3}
]);
var sports = loadData("lpuSports", ["Cricket", "Football", "Basketball", "Badminton", "Athletics"]);
var grounds = loadData("lpuGrounds", ["Main Sports Ground", "Football Ground", "Indoor Stadium", "Basketball Court", "Athletics Track"]);
var attendance = loadData("lpuAttendance", []);
var performances = loadData("lpuPerformances", [
  {athlete: "Aman Kumar", test: "Batting Accuracy", score: 86},
  {athlete: "Priya Sharma", test: "Court Agility", score: 91},
  {athlete: "Rahul Singh", test: "Sprint Test", score: 78}
]);
var batches = loadData("lpuBatches", [
  {name: "Cricket Batch A", sport: "Cricket", coach: "Coach Harnoor", time: "7:00 AM - 8:30 AM"},
  {name: "Football Batch B", sport: "Football", coach: "Coach Gaurav", time: "4:00 PM - 5:30 PM"},
  {name: "Badminton Batch A", sport: "Badminton", coach: "Coach Surya", time: "5:00 PM - 6:00 PM"}
]);
var sessions = loadData("lpuSessions", [
  {day: "Monday", sport: "Cricket", coach: "Coach Harnoor", time: "07:00", place: "Main Sports Ground"},
  {day: "Tuesday", sport: "Football", coach: "Coach Gaurav", time: "16:00", place: "Football Ground"},
  {day: "Wednesday", sport: "Badminton", coach: "Coach Surya", time: "17:00", place: "Indoor Stadium"},
  {day: "Friday", sport: "Basketball", coach: "Coach Gaurav", time: "16:30", place: "Basketball Court"}
]);

var editingBatchIndex = -1;
var editingSessionIndex = -1;

function showPage(pageName, button) {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove("show");
  document.getElementById(pageName).classList.add("show");
  var buttons = document.getElementsByClassName("nav");
  for (var j = 0; j < buttons.length; j++) buttons[j].classList.remove("active");
  if (button) button.classList.add("active");
}

function saveData() {
  localStorage.setItem("lpuAthletes", JSON.stringify(athletes));
  localStorage.setItem("lpuCoaches", JSON.stringify(coaches));
  localStorage.setItem("lpuSports", JSON.stringify(sports));
  localStorage.setItem("lpuGrounds", JSON.stringify(grounds));
  localStorage.setItem("lpuAttendance", JSON.stringify(attendance));
  localStorage.setItem("lpuPerformances", JSON.stringify(performances));
  localStorage.setItem("lpuBatches", JSON.stringify(batches));
  localStorage.setItem("lpuSessions", JSON.stringify(sessions));
}

function fillSelect(id, values, placeholder) {
  var menu = document.getElementById(id);
  if (!menu) return;
  var previous = menu.value;
  menu.innerHTML = "";
  var first = document.createElement("option");
  first.value = "";
  first.textContent = placeholder || "Select option";
  menu.appendChild(first);
  values.forEach(function(value) {
    var option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    menu.appendChild(option);
  });
  if (values.indexOf(previous) !== -1) menu.value = previous;
}

function refreshDropdowns() {
  fillSelect("aSport", sports, "Select sport");
  fillSelect("cSport", sports, "Select specialization");
  fillSelect("bSport", sports, "Select sport");
  fillSelect("sSport", sports, "Select sport");
  fillSelect("sCoach", coaches.map(function(c) { return c.name; }), "Select coach");
  fillSelect("bCoach", coaches.map(function(c) { return c.name; }), "Select coach");
  fillSelect("sPlace", grounds, "Select ground / court");
  fillSelect("attAthlete", athletes.map(function(a) { return a.name; }), "Select athlete");
  fillSelect("pAthlete", athletes.map(function(a) { return a.name; }), "Select athlete");
}

function addAthlete() {
  var name = document.getElementById("aName").value.trim();
  var age = document.getElementById("aAge").value;
  var sport = document.getElementById("aSport").value;
  if (!name || !age || !sport) return alert("Please fill all athlete details.");
  athletes.push({name: name, age: Number(age), sport: sport});
  saveData(); displayAthletes(); refreshDropdowns();
  document.getElementById("aName").value = "";
  document.getElementById("aAge").value = "";
  document.getElementById("aSport").value = "";
  alert("Athlete added successfully.");
}

function displayAthletes(list) {
  var table = document.getElementById("athleteRows");
  if (!table) return;
  table.innerHTML = "";
  (list || athletes).forEach(function(person) {
    var index = athletes.indexOf(person);
    table.innerHTML += "<tr><td>" + escapeHTML(person.name) + "</td><td>" + person.age +
      "</td><td>" + escapeHTML(person.sport) + "</td><td><button class='delete' onclick='deleteAthlete(" +
      index + ")'>Delete</button></td></tr>";
  });
  updateDashboard();
}
function deleteAthlete(index) {
  if (!confirm("Delete this athlete? Related attendance and performance records will remain.")) return;
  athletes.splice(index, 1); saveData(); displayAthletes(); refreshDropdowns();
}
function searchAthletes() {
  var term = document.getElementById("aSearch").value.toLowerCase();
  displayAthletes(athletes.filter(function(a) {
    return a.name.toLowerCase().includes(term) || a.sport.toLowerCase().includes(term);
  }));
}

function addCoach() {
  var name = document.getElementById("cName").value.trim();
  var sport = document.getElementById("cSport").value;
  var experience = document.getElementById("cExp").value;
  if (!name || !sport || experience === "") return alert("Please fill all coach details.");
  coaches.push({name: name, sport: sport, experience: Number(experience)});
  saveData(); displayCoaches(); refreshDropdowns();
  document.getElementById("cName").value = "";
  document.getElementById("cSport").value = "";
  document.getElementById("cExp").value = "";
  alert("Coach added. The batch coach dropdown has been updated.");
}
function displayCoaches() {
  var table = document.getElementById("coachRows");
  if (!table) return;
  table.innerHTML = "";
  coaches.forEach(function(c, i) {
    table.innerHTML += "<tr><td>" + escapeHTML(c.name) + "</td><td>" + escapeHTML(c.sport) +
      "</td><td>" + c.experience + " years</td><td><button class='delete' onclick='deleteCoach(" + i + ")'>Delete</button></td></tr>";
  });
  updateDashboard();
}
function deleteCoach(index) {
  if (!confirm("Delete this coach? Existing batch records will not be changed.")) return;
  coaches.splice(index, 1); saveData(); displayCoaches(); refreshDropdowns();
}

function addSport() {
  var name = document.getElementById("newSportName").value.trim();
  if (!name) return alert("Enter a sport name.");
  if (sports.some(function(s) { return s.toLowerCase() === name.toLowerCase(); })) return alert("This sport already exists.");
  sports.push(name); saveData(); refreshDropdowns(); displaySports();
  document.getElementById("newSportName").value = "";
  alert("Sport added. All sport dropdowns have been updated.");
}
function deleteSport(index) {
  var name = sports[index];
  if (!confirm("Remove " + name + " from the available sports? Existing records will remain unchanged.")) return;
  sports.splice(index, 1); saveData(); refreshDropdowns(); displaySports();
}
function displaySports() {
  var container = document.getElementById("sportsList");
  if (!container) return;
  container.innerHTML = "";
  var icons = {"Cricket":"🏏","Football":"⚽","Basketball":"🏀","Badminton":"🏸","Athletics":"🏃"};
  sports.forEach(function(s, i) {
    container.innerHTML += "<div class='sport'><span>" + (icons[s] || "🏅") + "</span><h3>" +
      escapeHTML(s) + "</h3><button class='delete' onclick='deleteSport(" + i + ")'>Remove</button></div>";
  });
}
function addGround() {
  var name = document.getElementById("newGroundName").value.trim();
  if (!name) return alert("Enter a ground or court name.");
  if (grounds.some(function(g) { return g.toLowerCase() === name.toLowerCase(); })) return alert("This ground already exists.");
  grounds.push(name); saveData(); refreshDropdowns(); displayGrounds();
  document.getElementById("newGroundName").value = "";
  alert("Ground added. The training schedule dropdown has been updated.");
}
function deleteGround(index) {
  var name = grounds[index];
  if (!confirm("Remove " + name + " from the available grounds? Existing sessions will remain unchanged.")) return;
  grounds.splice(index, 1); saveData(); refreshDropdowns(); displayGrounds();
}
function displayGrounds() {
  var container = document.getElementById("groundsList");
  if (!container) return;
  container.innerHTML = "";
  grounds.forEach(function(g, i) {
    container.innerHTML += "<div class='option-row'><span>" + escapeHTML(g) +
      "</span><button class='delete' onclick='deleteGround(" + i + ")'>Remove</button></div>";
  });
}

function addBatch() {
  var name = document.getElementById("bName").value.trim();
  var sport = document.getElementById("bSport").value;
  var coach = document.getElementById("bCoach").value;
  var time = document.getElementById("bTime").value.trim();
  if (!name || !sport || !coach || !time) return alert("Please fill all batch details.");
  var record = {name: name, sport: sport, coach: coach, time: time};
  if (editingBatchIndex === -1) batches.push(record);
  else batches[editingBatchIndex] = record;
  saveData(); displayBatches(); cancelBatchEdit();
}
function displayBatches() {
  var table = document.getElementById("batchRows");
  if (!table) return;
  table.innerHTML = "";
  batches.forEach(function(b, i) {
    table.innerHTML += "<tr><td>" + escapeHTML(b.name) + "</td><td>" + escapeHTML(b.sport) +
      "</td><td>" + escapeHTML(b.coach) + "</td><td>" + escapeHTML(b.time) +
      "</td><td><button class='edit' onclick='editBatch(" + i + ")'>Edit</button> <button class='delete' onclick='deleteBatch(" + i + ")'>Delete</button></td></tr>";
  });
}
function editBatch(index) {
  var b = batches[index]; editingBatchIndex = index;
  document.getElementById("bName").value = b.name;
  document.getElementById("bSport").value = b.sport;
  document.getElementById("bCoach").value = b.coach;
  document.getElementById("bTime").value = b.time;
  document.getElementById("batchSaveBtn").textContent = "Update Batch";
  document.getElementById("batchCancelBtn").style.display = "inline-block";
  document.getElementById("bName").focus();
}
function cancelBatchEdit() {
  editingBatchIndex = -1;
  ["bName","bSport","bCoach","bTime"].forEach(function(id) { document.getElementById(id).value = ""; });
  document.getElementById("batchSaveBtn").textContent = "Save Batch";
  document.getElementById("batchCancelBtn").style.display = "none";
}
function deleteBatch(index) {
  if (!confirm("Delete this batch?")) return;
  batches.splice(index, 1); saveData(); displayBatches();
  if (editingBatchIndex === index) cancelBatchEdit();
}

function addSession() {
  var day = document.getElementById("sDay").value;
  var sport = document.getElementById("sSport").value;
  var time = document.getElementById("sTime").value;
  var coach = document.getElementById("sCoach").value;
  var place = document.getElementById("sPlace").value;
  if (!day || !sport || !coach || !time || !place) return alert("Please fill all training session details.");
  var record = {day: day, sport: sport, coach: coach, time: time, place: place};
  if (editingSessionIndex === -1) sessions.push(record);
  else sessions[editingSessionIndex] = record;
  saveData(); displaySchedule(); cancelSessionEdit();
}
function displaySchedule() {
  var table = document.getElementById("scheduleRows");
  if (!table) return;
  table.innerHTML = "";
  sessions.forEach(function(s, i) {
    table.innerHTML += "<tr><td>" + escapeHTML(s.day) + "</td><td>" + escapeHTML(s.sport) +
      "</td><td>" + escapeHTML(s.coach || "Not assigned") + "</td><td>" + escapeHTML(s.time) + "</td><td>" + escapeHTML(s.place) +
      "</td><td><button class='edit' onclick='editSession(" + i + ")'>Edit</button> <button class='delete' onclick='deleteSession(" + i + ")'>Delete</button></td></tr>";
  });
}
function editSession(index) {
  var s = sessions[index]; editingSessionIndex = index;
  document.getElementById("sDay").value = s.day;
  document.getElementById("sSport").value = s.sport;
  document.getElementById("sCoach").value = s.coach || "";
  document.getElementById("sTime").value = s.time;
  document.getElementById("sPlace").value = s.place;
  document.getElementById("sessionSaveBtn").textContent = "Update Session";
  document.getElementById("sessionCancelBtn").style.display = "inline-block";
}
function cancelSessionEdit() {
  editingSessionIndex = -1;
  document.getElementById("sDay").selectedIndex = 0;
  ["sSport","sCoach","sTime","sPlace"].forEach(function(id) { document.getElementById(id).value = ""; });
  document.getElementById("sessionSaveBtn").textContent = "Save Session";
  document.getElementById("sessionCancelBtn").style.display = "none";
}
function deleteSession(index) {
  if (!confirm("Delete this training session?")) return;
  sessions.splice(index, 1); saveData(); displaySchedule();
  if (editingSessionIndex === index) cancelSessionEdit();
}

function markAttendance() {
  if (athletes.length === 0) return alert("Add an athlete first.");
  var name = document.getElementById("attAthlete").value;
  var status = document.getElementById("attStatus").value;
  if (!name) return alert("Select an athlete.");
  attendance.push({name: name, status: status, date: new Date().toLocaleDateString()});
  saveData(); displayAttendance(); alert("Attendance saved.");
}
function displayAttendance() {
  var table = document.getElementById("attendanceRows");
  if (!table) return;
  table.innerHTML = "";
  attendance.forEach(function(a) {
    table.innerHTML += "<tr><td>" + escapeHTML(a.name) + "</td><td>" + escapeHTML(a.status) + "</td><td>" + escapeHTML(a.date) + "</td></tr>";
  });
}
function addPerformance() {
  if (athletes.length === 0) return alert("Add an athlete first.");
  var athlete = document.getElementById("pAthlete").value;
  var test = document.getElementById("pTest").value.trim();
  var scoreText = document.getElementById("pScore").value;
  var score = Number(scoreText);
  if (!athlete || !test || scoreText === "") return alert("Select an athlete and enter test name and score.");
  if (score < 0 || score > 100) return alert("Score must be between 0 and 100.");
  performances.push({athlete: athlete, test: test, score: score});
  saveData(); displayPerformances();
  document.getElementById("pTest").value = "";
  document.getElementById("pScore").value = "";
  alert("Performance saved.");
}
function displayPerformances() {
  var table = document.getElementById("performanceRows");
  if (!table) return;
  table.innerHTML = "";
  performances.forEach(function(p, i) {
    table.innerHTML += "<tr><td>" + escapeHTML(p.athlete) + "</td><td>" + escapeHTML(p.test) +
      "</td><td>" + p.score + " / 100</td><td><button class='delete' onclick='deletePerformance(" + i + ")'>Delete</button></td></tr>";
  });
}
function deletePerformance(index) {
  if (!confirm("Delete this performance record?")) return;
  performances.splice(index, 1); saveData(); displayPerformances();
}
function updateDashboard() {
  document.getElementById("athleteCount").innerText = athletes.length;
  document.getElementById("coachCount").innerText = coaches.length;
  document.getElementById("sportCount").innerText = sports.length;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function(ch) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
  });
}

// Render all sections and populate every dropdown when the page opens.
refreshDropdowns();
displayAthletes();
displayCoaches();
displaySports();
displayGrounds();
displayBatches();
displaySchedule();
displayAttendance();
displayPerformances();
updateDashboard();


/* Show the main website after the separate welcome screen. */
function enterSystem() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("appShell").classList.remove("hidden");
  window.scrollTo(0, 0);
}
