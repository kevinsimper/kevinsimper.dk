# Find Meetup group most active members

I made this script that you can paste in the developer console when you are on
the past event page and have scrolled all the way to the bottom.

When you run this it will request all attendees, count and sort them.

After it has finished fetching all the events you can find who your most
common attendees are! You should praise them ;)

```
const events = Array.prototype.map.call(
  document.querySelectorAll(".groupPageWrapper--child .eventCardHead--title"),
  i => i.getAttribute("href").replace('/','')
);

async function main() {
  let result = []
  for (let e in events) {
    result.push(await fetchEvent(events[e]))
  }
  const names = getAllNames(result)
  const total = countTotalAttendances(names)
  const counted = countNames(names)
  const ranked = rank(counted)
  console.log('Total attendees:', total)
  console.log('Most meetup attended:')
  console.log(ranked)
}

const fetchEvent = event => {
  return fetch(
    "https://www.meetup.com/mu_api/urlname/events/eventId/attendees?queries=" +
      encodeURIComponent(
        `(endpoint:${event}attendance,meta:(method:get),params:(desc:!t,fields:'self,web_actions,answers,pay_status',order:time),ref:eventAttendance_${event
          .replace("/events/", "_")
          .replace("/", "")},type:attendance)`
      )
  ).then(r => r.json());
};

const getAllNames = (data) => {
  return data.map(d =>
    d.responses[0].value
    .filter(i => i.rsvp.response === "yes")
    .map(i => i.member.name)
    .sort()
  );
}

const countTotalAttendances = (attendees) => {
  return attendees.map(i => i.length).reduce((total, i) => total + i)
}

const countNames = (attendees) => {
  return attendees.reduce((all, i) => {
    i.forEach(m => {
      let before = all[m] === undefined ? 0 : all[m];
      all[m] = before + 1;
    });
    return all;
  }, {})
};

const rank = (counted) => {
  let rank = [];
  Object.keys(counted).forEach(i => {
    rank.push({
      name: i,
      count: counted[i]
    });
  });

  return rank.sort((a, b) => {
    return b.count - a.count;
  })
}


main();
```
