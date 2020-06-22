async function eventCalendar() {
  let data = await getHolidays();
  console.log(data);
  return $('#event_calendar').fullCalendar({
      events: DataEvent(data)
  });
};

function clearCalendar() {
  $('#event_calendar').fullCalendar('delete'); // In case delete doesn't work.
  $('#event_calendar').html('');
};


function getHolidays() {
  return $.ajax(
      {
          url: "https://api.calendario.com.br/?json=true&ano=2020&ibge=3550308&token=ZmVybmFuZG8uanN0c0BnbWFpbC5jb20maGFzaD0zNzk1NzA1Mg",
      }
  )
}

function DataEvent(data_json) {
  let events = [];
  for (let i = 0; i < data_json.length; i++) {
      let [dia , mes , ano] = data_json[i].date.split("/");
      let start = ano + "-" + mes + "-" + dia;
      events.push({
        id: i,
        title: data_json[i].name,
        start: start,
        url: data_json[i].link,
      })
  }
  return events
}


$(document).on('turbolinks:load', eventCalendar);
$(document).on('turbolinks:before-cache', clearCalendar);