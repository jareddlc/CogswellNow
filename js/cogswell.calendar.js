$(document).ready(function(){
  var apiKey = 'AIzaSyAav7qkljVCBY9lA0Gjua1x49rpgEo6udg';
  var url = 'https://www.googleapis.com/calendar/v3/calendars/cogswellasb%40gmail.com/events?sortorder=descending&key='+apiKey;
  $.get(url, function(data){
    console.log(data);
  },"json");
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

Key for browser apps (with referers)
API key:  
AIzaSyACsHJSMNKIAkvVTEZOVaBRCiK1n7CKsdw
Referers:   
Any referer allowed
Activated on:   Jun 26, 2013 4:42 PM
Activated by:   cogswellasb@gmail.com – you 
*/
