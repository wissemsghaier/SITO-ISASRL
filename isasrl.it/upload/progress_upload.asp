<HTML>
<BODY>

<%

Set Upload = Server.CreateObject("Persits.Upload")
percorso = Server.MapPath("/FILES/")

' This is needed to enable the progress indicator
Upload.ProgressID = Request.QueryString("PID")

'Count = Upload.Save("d:\inetpub\webs\nomedominiocom\mdb-database")

Count = Upload.Save (percorso)

Response.redirect("inizia.asp")

%>


</BODY>
</HTML>
