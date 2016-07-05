# jquery.content

----------------------------------------------------
OVERVIEW
----------------------------------------------------
jQuery.content is a package for client side template parsing and formatting as an alternative to something like AngularJS (https://angularjs.org/) or Handlebars (http://handlebarsjs.com/).


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
