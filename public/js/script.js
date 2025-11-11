import {getChoices} from "./getChoices.js";

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const allExercisesString = "gate pose stretch, neutral pelvis stretch, traps stretch, glute bridge, lunge variation, side lying leg lift, fire hydrant, donkey kick, piriformis pigeon stretch, quadriceps stretch, butt-kick, knee hug stretch, supine hip flexor stretch, half-kneeling hip flexor stretch, single-leg romanian deadlift, standing calf stretch, leg swing, lunge, bird dog, hollow body hold, forearm plank, dead bug, clamshell, psoas muscle release, lateral band walk, lock clams, side plank clamshell, upper trapezius stretch, levator scapulae stretch, sternocleidomastoid stretch"
const allExercisesArray = allExercisesString.split(", ");

import { exercises } from "./exerciseData.js"

// milliseconds since 1970
const utcTimestamp = Date.now();

//automatically uses local timezone of the client device
const todaysDate = new Date(utcTimestamp);

const announce = convertToCalender(todaysDate);

const target_tz = "America/Chicago";

const options = {
  timeZone: target_tz,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true // Use 24-hour format
};

const formattedDate = new Intl.DateTimeFormat('en-US', options).format(todaysDate);

const ISO_data = isoStrings(todaysDate);

const dateAnnouncement = `Today is ${MONTH[announce.month]} ${announce.day}, ${announce.year}`

const dateSeed = `${ISO_data.year}-${ISO_data.month}-${ISO_data.day}`

console.log(`${dateAnnouncement}. Aka ${dateSeed}`)

console.log(`Current date and time in ${target_tz}: ${formattedDate}`);

const selection = getChoices(dateSeed, exercises);

console.log("Exercises:\n", selection);

document.getElementById("page-header").innerHTML = dateAnnouncement;
document.getElementById("1").innerHTML = selection[0].name;
document.getElementById("2").innerHTML = selection[1].name;
document.getElementById("3").innerHTML = selection[2].name;

document.getElementById("url1").href = `${selection[0].url}&t=${selection[0].t}`;
document.getElementById("url2").href = `${selection[1].url}&t=${selection[1].t}`;
document.getElementById("url3").href = `${selection[2].url}&t=${selection[2].t}`;


function convertToCalender(a_date) {
    return {
        day: a_date.getDate(),
        month: a_date.getMonth(),
        year: a_date.getFullYear()
    }
}

function isoStrings(formatDate) {
    return {
        year: String(formatDate.getFullYear()),
        month: String(formatDate.getMonth() + 1).padStart(2, '0'),
        day: String(formatDate.getDate()).padStart(2, '0')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(box => {
        box.textContent = '\u00A0';

        box.addEventListener('click', () => {
            const isChecked = box.textContent === '✓';
            box.textContent = isChecked ? '\u00A0' : '✓';
            box.classList.toggle('checked', !isChecked);

            // Get the exercise cell in the same row
            const row = box.closest('tr');
            const exerciseCell = row.querySelector('td:nth-child(2)');
            if (exerciseCell) {
                exerciseCell.style.color = isChecked ? '#333' : '#999';
                exerciseCell.style.textDecoration = isChecked ? 'none' : 'line-through';
            }
        });
    });
});