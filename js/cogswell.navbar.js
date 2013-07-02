$(document).ready(function(){
  // Check cookies
  if($.cookie("login") == 1)
  {
    setNavbar($.cookie("first"),$.cookie("last"));
  }

  // Initialize rotating banner
  $("#carousel").carousel();

  // Button sign in
  $("#btn-signin").click(function() {
    var payload = $("#form-signin").serializeObject();

    var url = "http://"+window.location.hostname+":8888/post.login";
    $.post(url, payload, function(data){
      if(data.response == "failure")
      {
        $("#modalBox").modal("show");
      }
      else if(data.response == "success")
      {
        setCookies(data);
        setNavbar(data.first, data.last);
      }
    },"json");
  });

  // Button log out
  $("#btn-logout").click(function() {
    delCookies();
    window.location = "http://localhost:8888/";
  });

  // Enables navbar features
  function setNavbar(first, last)
  {
    $("#nav-user").html(first+" "+last+" <b class=\"caret\"></b>");
    $("#form-signin").hide();
    if($.cookie("type") == "admin" || $.cookie("type") == "club")
    {
      $("#nav-blog").show();
    }
    $("#nav-settings").show();
  }

  function setCookies(data)
  {

    var date = new Date();
    var minutes = 120;
    date.setTime(date.getTime()+(minutes * 60 * 1000));

    $.cookie("login", '1', {expires: date, path: '/'});
    $.cookie("first", data.first, {expires: date, path: '/'});
    $.cookie("last", data.last, {expires: date, path: '/'});
    $.cookie("user", data.user, {expires: date, path: '/'});
    $.cookie("type", data.type, {expires: date, path: '/'});
    $.cookie("email", data.email, {expires: date, path: '/'});
    $.cookie("program", data.program, {expires: date, path: '/'});
  }

  function delCookies()
  {
    var date = new Date();
    var minutes = 60;
    date.setTime(date.getTime()+(minutes * 60 * 1000));

    $.cookie("login", '0', { expires: date, path: '/' });
    $.removeCookie("login");
    $.removeCookie("first");
    $.removeCookie("last");
    $.removeCookie("user");
    $.removeCookie("type");
    $.removeCookie("email");
    $.removeCookie("program");
  }

  // Creates JSON array
  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      }
      else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  }
});