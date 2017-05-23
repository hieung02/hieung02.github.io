// Your code goes here
// Objective:
// validate age > 0  & relationship must be selected
// add ppl to houselist
// update househouse list as modified
// serialize the household as JSON upon form submission

'use strict'

var add = document.querySelectorAll("button[class=add]")[0];
var submit = document.querySelectorAll("button[type=submit]")[0];
var builder = document.querySelectorAll("div[class=builder]")[0];
var body = document.body;
var householdMembers = localStorage;
var guid = 0;


var age;
var rel;
var smoker;
var relValue;
var selectedRel;
var ageBox = document.querySelectorAll("input[name=age]")[0];
var relBox = document.querySelectorAll("select[name=rel]")[0].childNodes;
var smokerBox = document.querySelectorAll("input[name=smoker]")[0];


//create Error Box to advise on properly data input.
var errorBox = document.createElement("div");
var errStyle = "color: red;"; //Only did inline-style for this coding homework.

errorBox.setAttribute("id", "error_memo");
errorBox.style = errStyle;
body.insertBefore(errorBox, builder);

function createButton(remove) {

}

//render List
function renderList(userid) {

    var household = document.querySelector(".household");
    var li = document.createElement("li");
    var removeBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    var btnStyle = "border-radius: 50%; margin-left: 15px;";
    var member = new Member(userid, age, relValue, smoker);

    //store new member into local storage = householdMembers
    householdMembers.setItem(userid, JSON.stringify(member));

    //setup li and button elements for each member
    li.setAttribute("class", "member");
    li.setAttribute("id", userid);
    removeBtn.setAttribute("class", "remove");
    editBtn.setAttribute("class", "edit");
    removeBtn.style = btnStyle + "background: red;";
    editBtn.style = btnStyle + "background: green;";
    li.appendChild(textNode('member: ' + member.userid + '; age: ' + member.age + '; relationship: ' + member.relationship + '; smoker: ' + (member.smoker ? 'Yes' : 'No')));
    household.appendChild(li).appendChild(editBtn);
    household.appendChild(li).appendChild(removeBtn);
    removeBtn.appendChild(textNode("Remove"));
    editBtn.appendChild(textNode("Edit"));

    //bind member info to button
    editBtn.addEventListener("click", member.editMember.bind(member));

    removeBtn.addEventListener("click", member.removeMember.bind(member));
}


//create textNode function 
function textNode(text) {
    return document.createTextNode(text);
}


//create Member constructor function
function Member(userid, age, rel, smoker) {
    this.userid = userid;
    this.age = age;
    this.relationship = rel;
    this.smoker = smoker;
}

Member.prototype.removeMember = function () {
    //Remove li element from DOM
    this.parent = document.getElementById(this.userid).parentNode;
    this.child = document.getElementById(this.userid);
    this.parent.removeChild(this.child)

    //Remove data from localStorage
    householdMembers.removeItem(this.userid);
};

Member.prototype.editMember = function () {

    var renderUpdatedUserInfo = document.getElementById(this.userid).childNodes[0];
    var updateUser = document.getElementById(this.userid).childNodes[1];
    var userid = this.userid;

    updateUser.setAttribute("class", "update");

    //disable other edit buttons - so client can't edit more than one user
    disableButtons("edit", true);

    if (updateUser.textContent === "Edit") {
        add.disabled = true;
        updateUser.setAttribute("class", "update");

        var retrieveMemberData = JSON.parse(householdMembers.getItem(userid));

        //display old member info
        ageBox.value = retrieveMemberData["age"];
        selectedRel.value = retrieveMemberData["relationship"];
        selectedRel.innerText = retrieveMemberData["relationship"];
        smokerBox.checked = retrieveMemberData["smoker"];

        updateUser.innerText = "Update";

    } else {
        //add.addEventListener("click", addHouseholdMembers(e));
        if (validateRequirements()) {

            var updatedMember = new Member(userid, age, relValue, smoker)
            //update localStorage w/ updated info
            householdMembers.setItem(userid, JSON.stringify(updatedMember));

            //render new info
            renderUpdatedUserInfo.data = 'member: ' + updatedMember.userid + '; age: ' + updatedMember.age + '; relationship: ' + updatedMember.relationship + '; smoker: ' + (updatedMember.smoker ? 'Yes' : 'No');

            updateUser.innerText = "Edit";
            updateUser.setAttribute("class", "edit");

            //re-enable edit buttons
            disableButtons("edit", false);

            //re-enable add button
            add.disabled = false;
        }
    }
}

//create household list
function addHouseholdMembers(e) {
    e.preventDefault();
    generateErrorMessage("");

    if (validateRequirements()) {

        var userid = 'u' + guid;

        //render List
        renderList(userid);
        guid += 1
    }
}

//Generate Error Message
function generateErrorMessage(message) {
    errorBox.innerText = message;
}



//Check age, rel, and smoker status upon submission 
function validateRequirements() {

    relValue = "";
    age = Number(ageBox.value);
    rel = document.querySelectorAll("select[name=rel]")[0].childNodes;
    smoker = smokerBox.checked;

    //check for selected relationship
    for (var i in rel) {
        if (rel[i].selected && rel[i].value !== "") {
            relValue = rel[i].value;
            selectedRel = rel[i];
        }
    }

    //check if age is number, float is okay. If not, can change to Number.isInteger(age) as condition
    if (Number.isNaN(age) || age <= 0) {
        generateErrorMessage("Age must be greater than zero.");
        return false;

    } else if (relValue !== "") {
        return true;

    } else {
        generateErrorMessage("Please see a relationship from the dropdown.");
        return false;
    }

}

function disableButtons(item, prop) {
    var item = "button[class = " + item + " ]";

    var btns = document.querySelectorAll(item);

    for (var i in btns) {
        if (Number.isInteger(Number(i))) {
            btns[i].disabled = prop;
        }
    }

}

function submitHousehold(e) {
    e.preventDefault();
    var pre = document.querySelectorAll("pre[class=debug]")[0];

    if (submit.textContent === "submit") {
        pre.style = "display: block; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word";
        
        if (householdMembers.length < 0) {
            generateErrorMessage("Please enter at least one member");
        } else {
            pre.innerText = "";
            for (var member in householdMembers) {
                var user = householdMembers.getItem(member);
                pre.innerText += user;
            }

            disableButtons("edit", true);
            disableButtons("remove", true);
            add.disabled = true;
            submit.innerText = "debug off";
        }
    } else {

        disableButtons("edit", false);
        disableButtons("remove", false);
        add.disabled = false;
        pre.style = "display: none";
        submit.innerText = "submit";
    }
}

//submit.addEventListener("click", validateRequirements);
add.addEventListener("click", addHouseholdMembers);
submit.addEventListener("click", submitHousehold)


