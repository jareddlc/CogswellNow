$(document).ready(function(){
  //Initial blog page
  $.cookie("page-blog", 0);

  // Load blog
  loadBlog();
  loadBlogCount();
  updateButtons();

  function updateButtons()
  {
    console.log(parseInt($.cookie("blog-count"))-1);
    console.log($.cookie("page-blog"));
    // Button prev blog
    $("#blog-prev").click(function() {
      var page = parseInt($.cookie("page-blog"));
      page -= 1;
      $.cookie("page-blog", page);
      loadBlog();
      updateButtons();
    });

    // Button next blog
    $("#blog-next").click(function() {
      var page = parseInt($.cookie("page-blog"));
      page += 1;
      $.cookie("page-blog", page);
      loadBlog();
      updateButtons();
    });
    // Disable buttons
    if($.cookie("page-blog") == 0)
    {
      $("#blog-prev").removeClass("active");
      $("#blog-prev").addClass("disabled");
      $("#blog-prev").unbind("click");
    }
    else
    {
      $("#blog-prev").removeClass("disabled");
      $("#blog-prev").addClass("active");
      $("#blog-prev").bind("click");
    }
    if($.cookie("page-blog") >= parseInt($.cookie("blog-count"))-1)
    {
      $("#blog-next").removeClass("active");
      $("#blog-next").addClass("disabled");
      $("#blog-next").unbind("click");
    }
    else
    {
      $("#blog-next").removeClass("disabled");
      $("#blog-next").addClass("active");
      $("#blog-next").bind("click");
    }
  }

  // Load blog
  function loadBlog()
  {
    var page = {page: $.cookie("page-blog")};
    var url = "http://"+window.location.hostname+":8888/get.blog";
    $.get(url, page, function(data){
      $("#blog").html("");
      for(var i in data)
      {
        $("#blog").append(buildBlogEntry(data[i]));
      }
    });
  }

  // Load blog count
  function loadBlogCount()
  {
    var date = new Date();
    var minutes = 60;
    date.setTime(date.getTime()+(minutes * 60 * 1000));

    var url = "http://"+window.location.hostname+":8888/get.blog.count";
    $.get(url, function(data){
      $.cookie("blog-count", data.count, {expires: date, path: '/'});
    });
  }

  // Builds the blog entry
  function buildBlogEntry(post)
  {
    var titleAndType = '<div><span class="blog-title">'+post.title+'</span>'+buildType(post.type)+'</div>';
    var title =   "<div class=\"blog-title\" >"+post.title+"</div>";
    var type =     "<div class=\"blog-type\" ><span class=\"label label-warning \">"+post.tag+"</span></div>";
    var author =  "<div class=\"blog-author\">Author: "+post.author+"</div>";
    var date =    "<div class=\"blog-date\">posted: "+formatDate(post.date)+"</div>";
    var body =    "<pre>"+post.body+"</pre>";
    var tag = "<div class=\"blog-tag\">tag: "+post.tags+"</div>";
    var footer =  "<hr style=\"border-top: 1px dotted #b0b0b0;border-bottom: 0px\">";
    var entry = titleAndType+author+date+body+tag+footer;
    return entry;
  }

  // Builds the type labal
  function buildType(type)
  {
    var str;
    if(type == "ASB Notice")
      str = '<span class="blog-type label label-blog-asb">'+type+'</span>';
    if(type == "Club Notice")
      str = '<span class="blog-type label label-blog-club">'+type+'</span>';
    if(type == "Event")
      str = '<span class="blog-type label label-blog-event">'+type+'</span>';
    return str;
  }

  // Formats date
  function formatDate(ISODate)
  {
    d = new Date(ISODate);
    return d.toLocaleString();
  }
});