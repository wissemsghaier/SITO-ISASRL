<%@Language=VBScript%>
<%Response.Buffer=True%>

<%
method = Request.QueryString("method")

Select Case method
  Case "unauthorized"
    Unauthorized()
  Case "expired"
    Expired()
  Case "abandon"
    Abandon()
End Select


Sub Unauthorized()
  Response.Write "Non sei autorizzato per l'accesso!"
  Response.Write "<p><a href=""default.asp"">Torna indietro</a>"
End Sub

Sub Expired()
  Response.Write "Il tuo profilo è scaduto!"
  Response.Write "<p>contatta l'amministratore."
  Session.Abandon
End Sub

Sub Abandon()
  Session.Abandon
  Response.Redirect "default.asp"
End Sub
%>
