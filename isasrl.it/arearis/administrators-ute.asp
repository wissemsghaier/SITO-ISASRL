<%@LANGUAGE = VBScript%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali s.r.l.</title>

<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />
<!-- #INCLUDE file="..\public\adovbs.inc" -->
<!--#include file="md5.asp"-->

<%

response.buffer=TRUE
RESPONSE.EXPIRES=-1

if (session("HTTP") <> "login.asp" and session("HTTP") <> "administrators.asp" ) then
    session("Mess")="Errore della sessione"
	response.redirect("arearis.asp")
else
  session("HTTP") = "administrators.asp"
end if


if session("user") <> "" then
	username   =  session("user")

End if

if session("pass") <> "" then
	password     =  session("pass")
End if

DataBaseName =   "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" & Server.MapPath("../mdb-database") & "\DATI.mdb"

//  Replaces the singe ' with a double ' ('') to stop errors
Function ChkString(string)
	 if string = "" then string = " "
	 ChkString = Replace(string, "'", "''")
End Function



Sub SubLegute

DIM currentPage, i

set Connection = server.CreateObject("ADODB.Connection")
Connection.open (DataBaseName)
set rs = Server.CreateObject("ADODB.Recordset")
	rs.CursorType=adOpenStatic
	rs.LockType=adLockOptimistic

currentPage = TRIM( Request( "currentPage" ) )

if currentPage = "" then currentPage = 1

set Connection = server.CreateObject("ADODB.Connection")
Connection.open (DataBaseName)
set rs = Server.CreateObject("ADODB.Recordset")
	rs.CursorType=adOpenStatic
	rs.LockType=adLockOptimistic
	sql = "SELECT * FROM SECURITY order by LIVELLO, USERR "
    rs.Open sql, Connection


z=0
Do while NOT RS.EOF
z=z+1
RS.MoveNext
Loop


if rs.EOF and rs.BOF then
%>
    <div class="titolo2" >Nessuna utenza trovata</div>
<%
RS.Close
else
%>
    <div class="titolo2" >Totale utenze rilevate <%=z%> </div>
<%
RS.Close

    rowCount = 0
	rs.PageSize = 10
	sql = "SELECT * FROM SECURITY order by LIVELLO desc, naccessi desc, USERR "
    rs.Open sql, Connection
    rs.AbsolutePage = cINT( currentPage )

	Response.Write "<div align='center' ><table border='0' cellpadding='0' cellspacing='0' width='570' class='titolo-news-blu' >"
	
	Response.Write "  <tr class='titolo-news-blu' >"
	Response.Write "    <td >Utenza</td>"
	Response.Write "    <td>Livello</td>"
	Response.Write "    <td >&nbsp;Num. Acc.</td>"
	Response.Write "    <td>Tent. restanti</td>"
	Response.Write "  </tr>"
	Response.Write "<tr>"
	Response.Write "	<td colspan='5' height='10'></td>"
	Response.Write "</tr>"

	While not rs.EOF and rowCount < rs.PageSize

%>
<tr bgcolor="#FFFFFF">
	<td><input name="userr" size="15" class="credits"  maxlength="15" readonly="readonly" value="<%=rs("userr")%>"></INPUT></td>
	<%if rs("livello") = 0 THEN %>
		<td><input name="livello" size="42"   class="credits"  maxlength="1" readonly="readonly" value="Guest"></INPUT></td>
	<%else%>
		<td><input name="livello" size="42"   class="credits"  maxlength="1" readonly="readonly" value="Amministratore"></INPUT></td>
	<%end if%>
	<td><input name="naccessi" size="10"   class="credits"  maxlength="10" readonly="readonly" value="<%=rs("naccessi")%>"></INPUT></td>
	<td><input name="data" size="10"   class="credits"  maxlength="10" readonly="readonly" value="<%=rs("ntent")%>"></INPUT></td>

</tr>
<%

		rowCount = rowCount + 1

    	rs.MoveNext

    Wend

Response.Write "</table>"

Response.Write "<p align='center' class='testo-link1'>"
for i = 1 to RS.PageCount
%>   <a href="administrators-ute.asp?mode=legute&currentPage=<%=i%>"><strong><%=i%></strong></a> <%
next
Response.Write "</p>"

%>
<p align="centre" class="testo2">
Pagina <%= currentPage %>
di
<%= rs.PageCount %>, clicca sul numero per cambiare pagina</p>
<%
End If
Connection.close
set my_conn = nothing

End Sub




Sub SubNewpass


Dim cambia, vecchia, nuova, conferma
cambia = Server.HTMLEncode(Request.Form("cambia"))
vecchia = Request.Form("vecchia")
nuova = Request.Form("nuova")
conferma = Request.Form("conferma")
formmsg = ""

If cambia = "Conferma" Then

	TableName =      "SECURITY"

	set Connection = server.CreateObject("ADODB.Connection")
	Connection.open (DataBaseName)
	set rs = Server.CreateObject("ADODB.Recordset")
 	rs.CursorType=adOpenStatic
	rs.LockType=adLockOptimistic

	StrSql = "SELECT pass FROM " & TableName & " WHERE userr = '" & username & "'"
	rs.Open strSql, Connection

formmsg = ""
formmsgok = ""


 If vecchia = "" Or nuova = "" Then
 	 formmsg = "Specificare dei valori!"
 Else
  	If StrComp(md5(vecchia) , rs("pass"),0) <> 0 Then
  		formmsg = "Vecchia password errata !"
 	Else
 		If StrComp(nuova, conferma, 0) <> 0 Then
  			formmsg = "Conferma nuova password errata !"
 		Else
 			If StrComp(vecchia, nuova, 0) = 0 Then
  				formmsg = "La vecchia e la nuova password coincidono !"
 			Else
	 			If len(nuova) < 1 Then
  					formmsg = "La nuova password deve essere lunga da 1 a 15 caratteri !"
				Else

	 				set Connection = server.CreateObject("ADODB.Connection")
					Connection.open (DataBaseName)

 					 StrSql = "UPDATE SECURITY SET pass = '" & md5(nuova) & "' , resetpwd=0  WHERE " _
  							& "userr = '" & username & "'"
	
  					 CONNECTION.Execute (StrSql)
					 CONNECTION.Close
					 set CONNECTION = nothing

  					 formmsgok = "Password modificata con successo !"
					 session("resetpwd")=0
					 %>
					 <meta http-equiv="Refresh" content="2;URL=administrators.asp">
					 <%
 				End If
			End If
			rs.Close
 			Set rs = Nothing
		End If
	End If
  End If
End If

%>

<form method="post" action="administrators-ute.asp?mode=newpass" name="form2">
<table width="100%"  border="0" cellspacing="0" cellpadding="0" BGCOLOR="#2671fe">
  <tr>
    <td  width="30%"  class="titolo-news-blu-r" BGCOLOR="#2671fe" >Utente</td>
    <td  width="70%"align="left"><input readonly value="<%=username%>" name="utente" maxlength="15"></td>
  </tr>
  <tr>
    <td  width="30%"  class="titolo-news-blu-r" BGCOLOR="#2671fe" >Vecchia Password</td>
    <td  width="70%"align="left"><input type="password"  name="vecchia" maxlength="15"></td>
  </tr>
  <tr BGCOLOR="#2671fe">
    <td  class="titolo-news-blu-r" BGCOLOR="#2671fe">Nuova Password</td>
    <td align="left"><input type="password" name="nuova" maxlength="15"></td>
  </tr>
  <tr BGCOLOR="#2671fe">
    <td class="titolo-news-blu-r" BGCOLOR="#2671fe">Conferma Password</td>
    <td align="left"><input type="password" name="conferma"></td>
  </tr>
</table>  
<table width="100%"  border="0" cellspacing="0" cellpadding="0" >
  <tr>
    <td height="10" align="center"></td>
  </tr>
  <tr>
    <td height="10" align="center"><input type="submit" name="cambia" onclick="return Check1();" value="Conferma"></td>
  </tr>
  <tr>
    <td height="50"  colspan="2" width="650" >
    <% if formmsgok <> "" then %>
		<Div  class="titolo-news-blu"><%=Response.Write(formmsgok)%></Div>
    <% else %> 
		<% if formmsg <> "" then %>
			<Div  class="titolo-news-rilievo"><%= Response.Write(formmsg) %></Div>
		<% end if %>
    <% End if %>
	</td>
  </tr>
</table>
</form>

<script>
document.form2.vecchia.focus();
</script>


<%
End Sub

Sub SubVerute
%>

<div align="center"><center>

<form action="administrators-ute.asp?mode=cercaute" method="post" name="f2">

<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">Utenza: </td>
    <td width="300" align="left"><input name="userr" size='15' class="credits" maxlength="15"></td>
  </tr>
</table>
<div class="spaziatore"></div>
<table border="0" width="100%">
  <tr>
    <td  align="center"><INPUT type="submit" value="Cerca"  name="submit2"></INPUT>
    <INPUT type="reset"  value="Resett"></INPUT></td>
  </tr>
</table>
</form>
</center>
</div>
<script>
document.f2.userr.focus();
</script>
<%
End Sub

Sub SubCercaute

if len(Request.Form("userr")) = 0   then
%>
<Div  class="titolo-news-rilievo">Campo Utenza non valorizzato</Div>
<%
Else

		set Connection = server.CreateObject("ADODB.Connection")
		Connection.open (DataBaseName)
		
		set rs = Server.CreateObject("ADODB.Recordset")
		rs.CursorType=adOpenStatic
		rs.LockType=adLockOptimistic

		set rsa = Server.CreateObject("ADODB.Recordset")
		rsa.CursorType=adOpenStatic
		rsa.LockType=adLockOptimistic

		strSql = "select * from SECURITY WHERE userr = '" & Request.Form("userr") & "'"

		//Response.Write StrSql
		
		rs.Open strSql, Connection
	
		if rs.EOF and rs.BOF then
%>
<div class="titolo-news-rilievo"><strong>L'utenza  <%= Request.Form("userr") %> non è stata trovata</strong></div>
<%

            RS.Close
			exit sub
		
		end if


%>
<div align="center"><center>
<form action="administrators-ute.asp?mode=modificautenza" method="post">
<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">Utenza: </td>
    <td width="300" align="left"><input name="userr" size="15" class="credits"  maxlength="15" readonly="readonly" value="<%=rs("userr")%>"></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">*Password: </td>
    <td  align="left"><input name="pass" size="15"   class="credits"  maxlength="15" ></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Livello: </td>
    <td  align="left">
	<SELECT name="livello" class="credits">
		 <option value="0" 
		 <%	if rs("livello") = 0 then%>
			selected
		 <% end if %>
			>0 - Guest </option> 
		 <option value="1" 
		 <%	if rs("livello") = 1 then%>
			selected
		 <% end if %>
			>1 - Amministratore </option> 
    </SELECT> 					
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Numero Accessi: </td>
    <td  align="left"><input name="naccessi" size="10"   class="credits"  maxlength="10" readonly="readonly" value="<%=rs("naccessi")%>"></INPUT></td>
  </tr>
   <tr>
    <td  class="titolo-news-blu-r" align="right">IP - Data - Ora ultimo accesso: </td>
    <td  align="left"><input name="data" size="31"   class="credits"  maxlength="31" readonly="readonly" value="<%=rs("ultacc")%>"></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Numero tentativi: </td>
    <td  align="left"><input name="ntent" size="2"   class="credits"  maxlength="2" value="<%=rs("ntent")%>"></INPUT></td>
  </tr>

</table>
<div class="spaziatore"></div>
<INPUT type="submit" value="Aggiorna"  name="submit3"></INPUT>
<INPUT type="submit" value="Cancella"  onclick="return onSubmitForm1();" name="submit3"></INPUT>
</form>
</center>
</div>
<div class="spaziatore"></div>
<div class="spaziatore"></div>
<div align="center" class="credits"> * Lasciare bianco per tenere la password invariata, altrimenti immettere un valore per cabiare la password dell'utente scelto. L'utente sarà tuttavia obbligato a ricambiare la password al primo accesso.</div>
<%
    RS.Close
	CONNECTION.Close
	set CONNECTION = nothing

end if
End Sub

Sub SubModificautenza

set Connection = server.CreateObject("ADODB.Connection")
Connection.open (DataBaseName)
set rs = Server.CreateObject("ADODB.Recordset")
rs.CursorType=adOpenStatic

strSql = "select * from SECURITY where userr = '" & Request.Form("userr") & "'"

//Response.Write StrSql

rs.Open strSql, Connection

if not (rs.EOF and rs.BOF) then
	if request.form("submit3") =  "Aggiorna" then
		if (len(request.form("pass")) < 1 and len(request.form("pass")) <> 0) or len(request.form("pass")) > 15 or not isNumeric(request.form("ntent"))  or request.form("ntent") > 5 then
			if (len(request.form("pass")) < 1 and len(request.form("pass")) <> 0) or len(request.form("pass")) > 15 then	
				%>
				<P  class="titolo-news-rilievo">La password deve essere da 1 a 15 caratteri !</p>
				<%
			end if
			if request.form("ntent") > 5 then	
				%>
				<P  class="titolo-news-rilievo">Il numero di tentativi massimo impostabile è 5!</p>
				<%
			end if
			if not isNumeric(request.form("ntent")) then	
				%>
				<P  class="titolo-news-rilievo">Il numero di tentativi deve essere numerico!</p>
				<%
			end if
	
	
			exit sub
		else

			CONNECTION.Close
			set CONNECTION = nothing
		
			strSql = "update SECURITY set " 
			if len(request.form("pass")) <> 0 then
				strSql= strSql & "pass = '" & md5(ChkString(request.form("pass"))) & "' , " 
				strSql= strSql & "resetpwd = 1 ,"
			end if 
			strSql= strSql & "livello = " & ChkString(request.form("livello")) & _
			", ntent = " & request.Form("ntent") & _
			" where userr = '" & ChkString(Request.Form("userr")) & "'"
			
			if username <> ChkString(Request.Form("userr"))then
			
				set Connection = server.CreateObject("ADODB.Connection")
				Connection.open (DataBaseName)
		
				'Response.Write StrSql
		
				CONNECTION.Execute (StrSql)
				CONNECTION.Close
				set CONNECTION = nothing
		
				%>
				<div class="titolo-news-blu"><strong>L'utenza <%=Request.Form("userr")%> è stata aggiornata</strong></div>
				<%	
			else
				%>
				<P  class="titolo-news-rilievo">Impossibile modificare la propria Utenza.</p>
				<%
			End if	
		end if			
	else
		if request.form("submit3") =  "Cancella" then
			CONNECTION.Close
			set CONNECTION = nothing

			strSql = "delete from SECURITY "
			strSql = strSql & " where userr = '" & ChkString(Request.Form("userr")) & "'"
			
			if username <> ChkString(Request.Form("userr"))then
			
				set Connection = server.CreateObject("ADODB.Connection")
				Connection.open (DataBaseName)
		
				//Response.Write StrSql
		
				CONNECTION.Execute (StrSql)
				CONNECTION.Close
				set CONNECTION = nothing
		
		
				%>
				<div class="titolo-news-blu"><strong>L'utenza <%=Request.Form("userr")%> è stata cancellata</strong></div>
				<%
			else
				%>
				<P  class="titolo-news-rilievo">Impossibile cancellare la propria Utenza.</p>
				<%
			End if	
		End If
	End If
else
	%>
	<P  class="titolo-news-rilievo">record non più esistente!!</p>
	<%
end if	
End Sub

Sub SubInsute



%>
<div align="center"><center>
<form action="administrators-ute.asp?mode=ckinsute" method="post" name="form1">
<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  >Utenza: </td>
    <td width="300" align="left"><input name="userr" size="15" class="credits"  maxlength="15"  value=""></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" >Password: </td>
    <td  align="left"><input name="pass" type="password" size="15" class="credits"  maxlength="15" ></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" >Livello: </td>
    <td  align="left">
	<SELECT name="livello" class="credits">
		 <option value="0">0 - Guest </option> 
		 <option value="1">1 - Amministratore </option> 
    </SELECT> 					</td>
  </tr>
</table>
<div class="spaziatore"></div>
<INPUT type="submit" value="Conferma" onclick="return Check();" name="submit4"></INPUT>
<INPUT  type="reset" value="Reset"  name="submit4"></INPUT>
</center>
</div>
<%
End sub

Sub SubckInsute

if len(request.form("pass")) < 1 or len(request.form("userr")) < 1 then


		if len(request.form("userr")) < 1 then
			%>
			<P  class="titolo-news-rilievo">La userr deve essere da 1 a 15 caratteri !</p>
			<%
		end if
		if len(request.form("pass")) < 1 then
			%>
			<P  class="titolo-news-rilievo">La password deve essere da 1 a 15 caratteri !</p>
			<%
		end if
		
		exit sub
else
		
		set Connection = server.CreateObject("ADODB.Connection")
		Connection.open (DataBaseName)
		set rs = Server.CreateObject("ADODB.Recordset")
		rs.CursorType=adOpenStatic

		strSql= "SELECT * FROM SECURITY WHERE USERR ='" & request.form("userr") & "'"
		
		rs.Open strSql, Connection
		
	    if not (rs.EOF and rs.BOF) then
			%>
			<div class="titolo-news-rilievo"><strong>errore: La user scelto esiste già</strong></div>
			<%	
		else
			CONNECTION.Close
			set CONNECTION = nothing

		    set Connection = server.CreateObject("ADODB.Connection")
			Connection.open (DataBaseName)
			
			strSql = "insert into SECURITY ( pass , userr , livello , naccessi , ultacc, ntent, resetpwd) values ('"
			strSql = StrSql & md5(ChkString(Request.Form("pass"))) & "' , '"
			strSql = StrSql & ChkString(Request.Form("userr")) & "' , "		
			strSql = StrSql & Request.Form("livello") & ", 0, '', 5, 1)"
	
			'Response.Write StrSql
			
			CONNECTION.Execute (StrSql)
			CONNECTION.Close
			set CONNECTION = nothing
	
			%>
			<div class="titolo-news-blu"><strong>L'utenza <%=Request.Form("userr")%> è stata creata</strong></div>
			<%
		end if		
End if
End sub

%>



<style type="text/css">
<!--
body {
	font-family: "Tahoma",Geneva,Kalimati,sans-serif;
	font-size: 12px;
	background-image: url(../images/sfondo-cntr.jpg);
	background-position: center;
	background-repeat: repeat-y;
	background-color: #ffffff;
	margin: 0px;
	padding: 0px;
	color: #000;
}
.sfondo-cella {
	/*font-weight: bold;*/
	color: #999;
	font-weight: bold;
	background-image: url(../images/menu-sf.gif);
}


-->
</style>

<script>
function onSubmitForm1() {
var richiesta = window.confirm("ATTENZIONE: L'account verrà cancellato definitivamente. Continuare? ");
 	 if (richiesta)
		return true;
   	 else
		return false;	
}
</script>

<script language="JavaScript">

function Check(){
       	    var formDOMObj = document.form1;
			var user= formDOMObj.userr.value;
			var pwd= formDOMObj.pass.value;
			
			//elenco caratteri speciali non ammessi in password
			if (pwd.indexOf(' ') != -1) {
				alert("La password non ammette spazi al suo interno")
				return false
			}
			else
			if (user == pwd) {
				alert("Username e password non possono essere uguali")
				return false
			}
			else
			if (user.indexOf(' ') != -1) {
				alert("Lo username non ammette spazi al suo interno")
				return false
			}
			else 
				return true
}
</script>

<script language="JavaScript">

function Check1(){
			//i controlli vengono fatti solo su una delle due password: l'utente è infatti bloccato se nuova e conferma non fossero uguali.
       	    var formDOMObj = document.form2;
			var user= formDOMObj.utente.value;
			var pwdconf= formDOMObj.conferma.value;
			
			//elenco caratteri speciali non ammessi in password
			if (pwdconf.indexOf(' ') != -1) {
				alert("La password non ammette spazi al suo interno")
				return false
			}
			else
			if (user == pwdconf) {
				alert("Username e password non possono essere uguali")
				return false
			}
			else 
				return true
}
</script>
<%

Sub SubVercons

%>

<div align="center"><center>

<form action="administrators-ute.asp?mode=ckvercons" method="post" name="f2">

<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">Utenza: </td>
    <td width="300" align="left"><input name="userr" size='15' class="credits" maxlength="15"></td>
  </tr>
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">Consegna: </td>
    <td width="300" align="left"><input name="consegna" size='15' class="credits" maxlength="15"></td>
  </tr>
</table>
<div class="spaziatore"></div>
<table border="0" width="100%">
  <tr>
    <td  align="center"><INPUT type="submit" value="Cerca"  name="submit5"></INPUT>
    <INPUT type="reset"  value="Resett"></INPUT></td>
  </tr>
</table>
</form>
</center>
</div>
<script>
document.f2.userr.focus();
</script>

<%
End Sub
%>

<style type="text/css">
<!--
body {
	font-family: "Tahoma",Geneva,Kalimati,sans-serif;
	font-size: 12px;
	background-image: url(../images/sfondo-cntr.jpg);
	background-position: center;
	background-repeat: repeat-y;
	background-color: #ffffff;
	margin: 0px;
	padding: 0px;
	color: #000;
}
.sfondo-cella {
	/*font-weight: bold;*/
	color: #999;
	font-weight: bold;
	background-image: url(../images/menu-sf.gif);
}

-->
</style>

</head>
<body>

<table border="0" align="center" cellpadding="0" cellspacing="0"  width="735" bgcolor="#ffffff">
  <tr>
    <td>


	</td>
   </tr>
  <tr>
    <td>

	<table border="0" cellpadding="0" cellspacing="0" width="750" BGCOLOR="#FFFFFF" >
  		<tr>
   		 <td width="168" align="center" valign="middle"  height="171" ><img src="../images/Logo_Isa_Srl.png" width="170" height="94"></td>
   		<td width="582" align="center" valign="middle" class="titolo3">Pannello di controllo - Amministrazione</td>
  		</tr>
	</table>
	</td>
  </tr>
  <tr>
    <td valign="top">

		<table width="0" border="0" height="350" cellpadding="0" cellspacing="0">
  			<tr align="left">
    			<td valign="top" >                
				 <table border="0" cellpadding="0" cellspacing="0" width="164">
	      		<tr>
    	    <td class="sfondo-cella">
            <div class="spaziatore"></div>
			<div class="menu-azzurro"><a href="Administrators-ute.asp?mode=legute">Utenze</a></div>            
			<div class="menu-azzurro"><a href="Administrators-cons.asp?mode=legcons">Consegne</a></div>
            <div class="spaziatore"></div>
			<div class="menu-verde"><a href="Administrators-ute.asp?mode=verute">Modifica Utenza</a></div>
			<div class="menu-verde"><a href="Administrators-cons.asp?mode=vercons">Modifica Consegna</a></div>
            <div class="spaziatore"></div>
			<div class="menu-giallo"><a href="Administrators-ute.asp?mode=insute">Crea Utenza</a></div>
       		<div class="menu-giallo"><a href="Administrators-cons.asp?mode=inscons">Crea Consegna</a></div>
 	 		<div class="spaziatore"></div>                        
            <div class="menu-rosso-rosa"><a href="../FILES/lista.asp">Lista file</a></div>
			<div class="menu-rosso-rosa"><a href="../upload/inizia.asp">Upload</a></div>   
			<div class="menu-rosso-rosa"><a href="../FILES/MANUALI65/LISTA.asp">Manuali AHR 65</a></div>
 	 		<div class="spaziatore"></div>                        
            <div class="menu-arancione"><a href="Administrators-ute.asp?mode=newpass">Cambio Password</a></div>
			<div class="menu-arancione"><a href="log-accessi.asp">Log Accessi</a></div>	
            <div class="spaziatore"></div>                                  
			<div class="menu-gestione"><a href="../FILES/Livecare_Internet_Agent_6937.exe">LiveCare Agent</a></div>            
			<div class="menu-gestione"><a href="logout.asp">Chiudi Gestione</a></div>
            <div class="spaziatore"></div>
					</td>
  						</tr>
      					<tr>
					        <td width="164" height="17"></td>
  					    </tr>
    				</table>

				</td>
			  <td valign="top">
               <table border=0 width="585"  align="center" cellpadding="0" cellspacing="0" >
                    <tr valign="top">
                     <td width="100%"  valign="top">
                    
<%
            select case Request.QueryString("mode")

		           case "legute"
			   
			            Call SubLegute

		           case "newpass"
%>
<p class="titolo-news" >Cambio passord per l'utente <% Response.write(username) %></p>

<%				   
			            Call SubNewpass

		           case "verute"
%>
<Div class="titolo-news" >Cerca Utenza</Div>

<%				   
			            Call SubVerute
		           case "cercaute"
%>
<Div class="titolo-news" >Modifica Utenza</Div>

<%				   
			            Call SubCercaute
		           case "modificautenza"
%>
<Div class="titolo-news" >Modifica Utenza</Div>

<%				   
			            Call SubModificautenza
		           case "cancellautenza"
%>
<Div class="titolo-news" >Modifica utenza</Div>

<%				   
			            Call SubCancellautenza

		           case "vercons"
%>
<Div class="titolo-news" >Verifica Consegna</Div>

<%				   
			            Call SubVercons

		           case "insute"
%>
<Div class="titolo-news" >Crea Utenza</Div>

<%				   
			            Call SubInsute
		           case "ckinsute"
%>
<Div class="titolo-news" >Crea Utenza</Div>

<%				   
			            Call SubckInsute

	        End Select
%>



				</td>
  			</tr>
		</table>


				</td>
  			</tr>
		</table>


  <tr>
    <td height="500">&nbsp;</td>
</tr>
</table>


</body>
</html>