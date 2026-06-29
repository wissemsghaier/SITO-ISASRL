<!-- #INCLUDE file="..\public\adovbs.inc" -->
<%

if (session("HTTP") <> "login.asp" and session("HTTP") <> "utente.asp" ) then
    session("Mess")="Errore della sessione"
	response.redirect("arearis.asp")
else
  session("HTTP") = "utente.asp"
end if

dim MyConn

Function GetNumber(stringa)
  Dim objRegExp, strTemp, Matches, Match
  Set objRegExp = New RegExp
  objRegExp.IgnoreCase = True
  objRegExp.Global = True
  objRegExp.Pattern = "\d"
  Set Matches = objRegExp.Execute(stringa)
  For Each Match in Matches
    strTemp = strTemp & Match.Value
  Next
  Set objRegExp = Nothing
  GetNumber = strTemp
End Function


DataBaseName =   "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" & Server.MapPath("..\mdb-database") & "\DATI.mdb"

strSql = "update FILEMANA set feedback = -1, dtfeedback ='" & date() & " - " & time() & "' where id =" & GetNumber(REQUEST.QUERYSTRING("id")) 
	
	    set Connection = server.CreateObject("ADODB.Connection")
	    Connection.open (DataBaseName)

	    Response.Write StrSql

		CONNECTION.Execute (StrSql)
		CONNECTION.Close
		set CONNECTION = nothing  
		response.redirect("../public/upload/" & request.querystring("allegato"))
		response.Redirect("utente.asp?mode=legcons&currentPage=" & request.querystring("page"))
		
%>