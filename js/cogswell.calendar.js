$(document).ready(function(){
  var apiKey = 'AIzaSyAav7qkljVCBY9lA0Gjua1x49rpgEo6udg';
  var url = 'https://www.googleapis.com/calendar/v3/calendars/cogswellasb%40gmail.com/events?key='+apiKey;
  $.get(url, function(data){
    for(var i = 0 ; i < 10;i++)
    {
      console.log(i);
      $("#calendar-div ul").append(buildCalendarEntry(data.items[i]));
    }
  },"json");


  function buildCalendarEntry(data)
  {
    /*data.created
    data.description
    data.end
    data.htmlLink
    data.location
    data.start
    data.updated
    */
    var entry = '<li><a href="'+data.htmlLink+'">'+data.summary+'</a></li>';
    return entry;
  }
});

/*
https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId
Key for browser apps (with referers)
API key:  
AIzaSyAav7qkljVCBY9lA0Gjua1x49rpgEo6udg
Referers:   
Any referer allowed
Activated on:   Jun 26, 2013 4:34 PM
Activated by:   cogswellasb@gmail.com – you 
https://www.google.com/calendar/feeds/cogswellasb@gmail.com/public/basic?sortorder=descending
*/
