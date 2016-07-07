# jquery.content

----------------------------------------------------
OVERVIEW
----------------------------------------------------
jQuery.content is a package for client side template parsing and formatting as an alternative to something like AngularJS (https://angularjs.org/) or Handlebars (http://handlebarsjs.com/).

The benefits being there is no middleware or meta language/scripts separating the feature.  It's just Javascript and HTML.


----------------------------------------------------
Parsing through HTML object
----------------------------------------------------

```
var user = {
  name: "Testing Name",
  email: "testing@testing.com",
  phone: {
    mobile: "416-123-1234"
  }
}

<div data-content-parse="template-name">
  {user.name}
  <span>Email: {user.email}</span> 
  <span>Phone: {user.phone.mobile}</span> 
</div>

Content.parse("template-name", variables_object);
```

The Content.parse function will look for all occurences of "template-name" defined with a data-content-parse tag and replace with the coresponding data values.

----------------------------------------------------
Looping through HTML object
----------------------------------------------------

```
var user = [
  {
    name: "Testing Name",
    email: "testing@testing.com",
      phone: {
        mobile: "416-123-1234"
      }
  },
  {
    name: "Testing Name 2",
    email: "testing2@testing.com",
      phone: {
        mobile: "416-123-1234"
      }
  }
]

<div data-content-loop="template-name">
  <div>
    {user.name}
    <span>Email: {user.email}</span> 
    <span>Phone: {user.phone.mobile}</span> 
  </div>
</div>

Content.loop("template-name", variables_object);
```

The Content.loop function will loop through for all occurences of "template-name" defined with a data-content-loop tag and replace with the coresponding array data values.


----------------------------------------------------
Content Formatting and Manipulation
----------------------------------------------------

The jquery.content library allows client side content formatting and content manipulation through passing the tag through a bar like so:

{variable|FORMAT_date}

The current available functions in jquery.format.js are:
(please suggest any standard ones you think should be added.

```
function FORMAT_slug(text)
function FORMAT_youtube_image(url) 
function FORMAT_lowercase(text) 
function FORMAT_from_ago(date) 
function FORMAT_timestamp(date)
function FORMAT_archive_date(date) 
function FORMAT_month(date)
function FORMAT_year(date)
function FORMAT_archive_date_slug(date)
function FORMAT_truncate_event_title(title)
function FORMAT_truncate_event_details(content)
function FORMAT_truncate_news_details(content)
function FORMAT_event_date_short(date)
function FORMAT_event_date_long(date)
function FORMAT_time(time)
function FORMAT_parse_links(text)
```

You can add your own functions to this through javascript.  I would recommend keeping theses all in one place but they can be placed anywhere in your application if they are meant to only be used in our spot. 

```
Content.format(“FORMAT_name”, function(input) {

});
```
