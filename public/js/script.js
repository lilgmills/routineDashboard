const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const allExercisesString = "gate pose stretch, neutral pelvis stretch, traps stretch, glute bridge, lunge variation, lying leg lift, fire hydrant, donkey kick, piriformis pigeon stretch, quadriceps stretch, butt-kick, knee hug stretch, supine hip flexor stretch, half-kneeling hip flexor stretch, single-leg romanian deadlift, standing calf stretch, leg swing, lunge, bird dog, hollow body hold, forearm plank, dead bug, clamshell, psoas muscle release, lateral band walk, lock clams, side plank clamshell, upper trapezius stretch, levator scapulae stretch, sternocleidomastoid stretch"


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

console.log(`Today is ${MONTH[announce.month]} ${announce.day}, ${announce.year}`)

console.log(`Current date and time in ${target_tz}: ${formattedDate}`);

function convertToCalender(a_date) {
    return {
        day: a_date.getDate(),
        month: a_date.getMonth(),
        year: a_date.getFullYear()
    }
}