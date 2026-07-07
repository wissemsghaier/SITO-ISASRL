<%@ Language=VBScript %>
<%
option explicit
Response.Expires = -1
Server.ScriptTimeout = 6000
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali s.r.l.</title>

<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />
<!-- #INCLUDE file="..\public\adovbs.inc" -->
<!-- #include file="freeaspupload.asp" -->
<!--#include file="md5.asp"-->


<%

response.buffer=TRUE

Dim DataBaseName
Dim Connection
Dim strSql, rs, password, username, rowCount, sql, z, my_conn, StrSql2 , StrSql0
Dim uploadsDirVar



if (session("HTTP") <> "login.asp" and session("HTTP") <> "administrators.asp" ) then
    session("Mess")="Errore della sessione"
	response.redirect("arearis.asp")
else
  session("HTTP") = "administrators.asp"
end if


if session("User") <> "" then
	username   =  session("User")

End if

if session("Pass") <> "" then
	password   =  session("Pass")
End if

DataBaseName =   "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" & Server.MapPath("../mdb-database") & "\DATI.mdb"

//  Replaces the singe ' with a double ' ('') to stop errors
Function ChkString(string)
	 if string = "" then string = " "
	 ChkString = Replace(string, "'", "''")
End Function


Sub SubLegcons

set Connection = server.CreateObject("ADODB.Connection")
Connection.open (DataBaseName)
set rs = Server.CreateObject("ADODB.Recordset")
	rs.CursorType=adOpenStatic
	rs.LockType=adLockOptimistic



DIM currentPage, i
currentPage = TRIM( Request( "currentPage" ) )

if currentPage = "" then currentPage = 1

set Connection = server.CreateObject("ADODB.Connection")
Connection.open (DataBaseName)
set rs = Server.CreateObject("ADODB.Recordset")
	rs.CursorType=adOpenStatic
	rs.LockType=adLockOptimistic
	sql = "SELECT * FROM FILEMANA"
    rs.Open sql, Connection


z=0
Do while NOT RS.EOF
z=z+1
RS.MoveNext
Loop


if rs.EOF and rs.BOF then
%>
    <P class="titolo-news" >Nessuna Consegna rilevata</p>
<%
RS.Close
else
%>
    <div class="titolo-news">Rilevate <%=z%> Consegne</div>
    <div class="spaziatore"></div>
<%
RS.Close

    rowCount = 0
	rs.PageSize = 4
	sql = "SELECT * FROM  FILEMANA order by id desc"
    rs.Open sql, Connection
    rs.AbsolutePage = cINT( currentPage )

	Response.Write "<div align='center'><table border='0' cellpadding='0' cellspacing='0' width='570'  >"

	While not rs.EOF and rowCount < rs.PageSize



%>
    <tr>
        <td >
		<div class="titolo-news-blu" >ID <%=rs("id")%> - <%=rs("userr")%> - <%=rs("datacre")%> - <%=rs("consegna")%> <br /> Download
        <% if rs("feedback") = true then %>
           <input type="checkbox" value="<%=rs("feedback")%>" readonly="readonly"  checked>
        <% else %>
           <input type="checkbox" value="<%=rs("feedback")%>" readonly="readonly"  unchecked>
        <% end if %>
         <%=rs("dtfeedback")%> </div>

         <div class="testo0" align='left' > <%=rs("logoper")%></div>

		<div class="corpo-news"><textarea name="descrizione" cols="66" rows="5"  readonly="readonly"><%= rs("descrizione")%></textarea></div>

        <a href="../public/upload/<%=rs("userr") & rs("consegna") & "/" & rs("allegato")%>" target="_blank"><div class="testo-link1"><%=rs("allegato")%></div></a>
        </td>
    </tr>

<%

		rowCount = rowCount + 1

    	rs.MoveNext

    Wend

Response.Write "</table>"



Response.Write "<p align='center' class='testo-link1'>"
for i = 1 to RS.PageCount
%>   <a href="administrators-cons.asp?mode=legcons&currentPage=<%=i%>"><strong><%=i%></strong></a> <%
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


Sub SubVercons

%>

<div align="center"><center>

<form action="administrators-cons.asp?mode=ckvercons" method="post" name="f2">
<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">ID Consegna </td>
    <td width="300" align="left"><input name="id" size='5' class="credits" maxlength="5"></td>
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
document.f2.id.focus();
</script>
<%
End Sub

Sub SubckVercons

if len(Request.Form("id")) = 0   then
%>
<Div  class="titolo-news-rilievo">Campo ID consegna non valorizzato</Div>
<%
Else
		session("ID") = Request.Form("id")
		set Connection = server.CreateObject("ADODB.Connection")
		Connection.open (DataBaseName)
		set rs = Server.CreateObject("ADODB.Recordset")
		rs.CursorType=adOpenStatic
		rs.LockType=adLockOptimistic

        rowCount = 0
        RS.PageSize = 2

		strSql = "select * from FILEMANA where ID = " & Request.Form("id")

//		Response.Write StrSql

		rs.Open strSql, Connection

		if rs.EOF and rs.BOF then
%>
<div class="titolo-news-rilievo"><strong>ID <%= Request.Form("id") %> non è stato trovato</strong></div>
<%
            RS.Close
			exit sub
		end if
%>

<div align="center"><center>
<form action="administrators-cons.asp?mode=modifica" method="post"  name="f2">
<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">ID Consegna: </td>
    <td width="300" align="left"><input name="id" size="5" class="credits"  maxlength="5" readonly="readonly" value="<%=rs("id")%>"></INPUT></td>
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">Utente/Commessa: </td>
    <td width="300" align="left"><input name="userr" size="15" class="credits"  maxlength="15" readonly="readonly" value="<%=rs("userr")%>"></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Data Creazione: </td>
    <td  align="left"><input name="datacre" size="10" readonly="readonly"  class="credits"  maxlength="10" value="<%=rs("datacre")%>"></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Consegna: </td>
    <td  align="left"><input name="consegna" size="9"   class="credits"  maxlength="9"  readonly="readonly"  value="<%=rs("consegna")%>"></INPUT></td>
  </tr>
    <td   colspan="2" class="titolo-news-blu" align="center">Descrizione: <br />
    <textarea name="descrizione"  class="credits"  rows="5" cols="75" wrap="virtual"  value=""><%=rs("descrizione")%></textarea></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Allegato: </td>
    <td  align="left" ><a href="../public/upload/<%=rs("userr") & rs("consegna") & "/" & rs("allegato")%>" target="_blank"><div class="testo-link2"><%=rs("allegato")%></div></a></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right"> </td>
    <td  align="left"><INPUT type="submit" value="Allega"  name="submit6"></INPUT><br>&nbsp;</td>
  </tr>
</table>
<div class="spaziatore"></div>
<INPUT type="submit" value="Aggiorna"  name="submit6"></INPUT>
<INPUT type="submit" value="Cancella"  name="submit6"></INPUT>
</form>
</center>
</div>
<script>
document.f2.descrizione.focus();
</script>
<%
end if
End Sub

Sub SubModifica

if request.form("submit6") =  "Aggiorna" or request.form("submit6") = "Allega" then

	if Request.Form("userr") = "" or not IsDate(Request.Form("datacre")) or len(Request.Form("consegna")) = 0  or len(Request.Form("descrizione")) = 0  or not IsDate(Request.Form("datacre")) then

		if len(Request.Form("userr")) = 0 or len(Request.Form("datacre")) = 0 or len(Request.Form("consegna")) = 0 or len(Request.Form("descrizione")) = 0 then
%>
<P  class="titolo-news-rilievo">I campi User, Data Creazione, Consegna, Descrizione, sono obbligatori !</p>
<%
		End if
		if not IsDate(Request.Form("datacre")) then
%>
<P  class="titolo-news-rilievo">La data deve essere in formato gg/mm/aaaa !</p>
<%
		End if
	Else

		strSql = "update FILEMANA set userr = '" & ChkString(request.form("userr")) & "' , "
		strSql = strSql & " datacre = '" & ChkString(request.form("datacre")) & "' , "
		strSql = strSql & "consegna =  '" & request.form("consegna") & "' , descrizione = '" & ChkString(request.form("descrizione")) & "' , logoper='"
		strSql = strSql & ChkString(session("user")) & " - "
		strSql = strSql & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & "'"

		if request.form("submit6") = "Aggiorna" then

			strSql = strSql & " where id = " & Request.Form("id")

			set Connection = server.CreateObject("ADODB.Connection")
			Connection.open (DataBaseName)

			'Response.Write StrSql

			CONNECTION.Execute (StrSql)
			CONNECTION.Close
			set CONNECTION = nothing


		%>
		<div class="titolo-news-blu"><strong>Consegna  <%= Request.Form("consegna") %> è stata Aggiornata</strong></div>
		<%
		   else
			   Session("query") = strSql
			   Session("id")  = Request.Form("id")
			   session("modefunc") = "upd"
			   session("nomecartella") = "/" & Request.Form("userr") & Request.Form("consegna")
			   set Connection = nothing

			   response.redirect("administrators-cons.asp?mode=Allega")
		  End If

	End If
else
	if request.form("submit6") =  "Cancella" then


		set Connection = server.CreateObject("ADODB.Connection")
		Connection.open (DataBaseName)

		strSql = "delete * from FILEMANA where id = " & Request.Form("id")

		//Response.Write StrSql

		CONNECTION.Execute (StrSql)
		CONNECTION.Close
		set CONNECTION = nothing


		%>
		<div class="titolo-news-blu"><strong>La consegna <%= Request.Form("consegna") %> è stata Cancellata</strong></div>
		<%
	else
		response.redirect("logout.asp")
	End if

End If
End Sub
%>

<script>
function onSubmitForm() {
    var formDOMObj = document.frmSend;
        return true;

}
</script>

<%

Sub SubAllega

dim strNewFolder, strPath, objFso

' Nome della nuova cartella
strNewFolder = "\" & session("nomecartella")

' Percorso di destinazione, relativo o assoluto
strPath = Server.MapPath("..") &  "\public\upload"

Set objFso = Server.CreateObject("Scripting.FileSystemObject")

if not objFso.FolderExists(strPath & strNewFolder) then
	objFso.CreateFolder(strPath & strNewFolder)
end if

Set objFso = Nothing

uploadsDirVar = Server.MapPath("..") & "\public\upload" & strNewFolder

Dim diagnostics

if Request.ServerVariables("REQUEST_METHOD") <> "POST" then
    diagnostics = TestEnvironment()
    if diagnostics<>"" then
        response.write "<div style=""margin-left:20; margin-top:30; margin-right:30; margin-bottom:30;"">"
        response.write diagnostics
        response.write "<p>Se il problema persiste contatta assistenza </p>"
        response.write "</div>"
    else
        OutputForm()
    end if
else
    OutputForm()
    response.write SaveFiles()
    response.redirect("administrators-cons.asp?mode=AllegaSalvato")
end if

End Sub


function OutputForm()


%>
<div align="center"><center>
    <form name="frmSend" method="POST" enctype="multipart/form-data" action="administrators-cons.asp?mode=Allega" onSubmit="return onSubmitForm();">

	<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
			  <tr>
				    <td width="20%"  class="titolo-news-blu-r"align="right">Allega:</td>
	    			<td width="80%" align="left"><input name="attach1" type="file" size='75'></input></td>
	  			</tr>
		</table><br>
		<input type=submit value="Salva">
		<input name="attach2"  type="hidden" >
  		<input name="attach3"  type="hidden" >
   		<input name="attach4"  type="hidden" >
    </form>
</center></div>
<script>
document.frmSend.attach1.focus();
</script>
<%

end function

function TestEnvironment()
    Dim fso, fileName, testFile, streamTest
    TestEnvironment = ""
    Set fso = Server.CreateObject("Scripting.FileSystemObject")
    if not fso.FolderExists(uploadsDirVar) then
        TestEnvironment = ""
        exit function
    end if
    fileName = uploadsDirVar & "\test.txt"
    on error resume next
    Set testFile = fso.CreateTextFile(fileName, true)
    If Err.Number<>0 then
        TestEnvironment = "<B>La cartella sul server " & uploadsDirVar & " non possiede i permessi di scrittura.</B>"
        exit function
    end if
    Err.Clear
    testFile.Close
    fso.DeleteFile(fileName)
    If Err.Number<>0 then
        TestEnvironment = "<B>La cartella sul server " & uploadsDirVar & " non possiede i permessi di cancellazione</B>"
        exit function
    end if
    Err.Clear
    Set streamTest = Server.CreateObject("ADODB.Stream")
    If Err.Number<>0 then
        TestEnvironment = "<B>Librerie ADODB non sono presenti sul server</B>"
        exit function
    end if
    Set streamTest = Nothing
end function

function SaveFiles
    Dim Upload, fileName, fileSize, ks, i, fileKey

    Set Upload = New FreeASPUpload
    Upload.Save(uploadsDirVar)

	' If something fails inside the script, but the exception is handled
	If Err.Number<>0 then Exit function

    SaveFiles = ""
    ks = Upload.UploadedFiles.keys
    if (UBound(ks) <> -1) then
        for each fileKey in Upload.UploadedFiles.keys
            SaveFiles = Upload.UploadedFiles(fileKey).FileName
            Response.write ("Dimensioni file: (" & Upload.UploadedFiles(fileKey).Length & "B)")
        next
    end if

	Dim strSql

	strSql = Session("query")

	if session("modefunc") = "ins" then

		strSql = StrSql &  ChkString(SaveFiles) & "')"
	else
		if session("modefunc") = "upd" then
			strSql = StrSql &  ", allegato = '" & ChkString(SaveFiles) & "'"
			strSql = strSql & " where ID = " & session("id")
		else
			response.write("Errore della funzione 1")
		end if
	end if

	set Connection = server.CreateObject("ADODB.Connection")
	Connection.open (DataBaseName)

	'Response.Write StrSql

	CONNECTION.Execute (StrSql)
	CONNECTION.Close
	set CONNECTION = nothing


End function

Sub SubAllegaSalvato

if session("modefunc") = "ins" then
%>
<div class="spaziatore"></div>
<div align="center" class="titolo-news-blu-c"><strong>Inserimento completato </strong></div>
<div class="spaziatore"></div>
<%
else
	if session("modefunc") = "upd" then
%>
<div class="titolo-news-blu"><strong>La Consegna  è stata Aggiornata</strong></div>
<%
	else
		response.write("Errore della funzione 2")
	end if

End if

End Sub

Sub SubInserisci

%>
<div align="center"><center>
<form action="administrators-cons.asp?mode=doit" method="post" name="f1">
<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
  <tr>
    <td width="280"  class="titolo-news-blu-r"  align="left">Utente/Commessa: </td>
    <td width="300" align="left"><input name="userr" size="15" class="credits"  maxlength="15" value=""></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Consegna: </td>
    <td  align="left"><input name="consegna" size="9"   class="credits"  maxlength="9" value=""></INPUT></td>
  </tr>
  <tr>
    <td  class="titolo-news-blu-r" align="right">Data Creazione: </td>
    <td  align="left"><input name="datacre" size="10" readonly="readonly"  class="credits"  maxlength="10" value="<%=DATE()%>"></INPUT></td>
  </tr>
  <tr>
    <td   colspan="2" class="titolo-news-blu" align="center">Descrizione: <br>
    <textarea name="descrizione"  class="credits"  rows="5" cols="75" wrap="virtual"  value=""></textarea></td>
  </tr>
</table>
<BR><INPUT type="submit" value="Salva"  name="submit8"></INPUT>
<INPUT type="submit" value="Allega"  name="submit8"></INPUT>
<INPUT type="reset" value="Reset"  name="submit8"></INPUT>
<div class="spaziatore"></div>
</form>
</center>
</div>


<script>
document.f1.userr.focus();
</script>


<%
End sub


Sub SubDoIt


if Request.Form("userr") = "" or not IsDate(Request.Form("datacre")) or len(Request.Form("consegna")) = 0  or len(Request.Form("descrizione")) = 0  or not IsDate(Request.Form("datacre")) then

	if len(Request.Form("userr")) = 0 or len(Request.Form("datacre")) = 0 or len(Request.Form("consegna")) = 0 or len(Request.Form("descrizione")) = 0 then
%>
<P  class="titolo-news-rilievo">I campi User, Data Creazione, Consegna, Descrizione, sono obbligatori !</p>
<%
	End if
	if not IsDate(Request.Form("datacre")) then
%>
<P  class="titolo-news-rilievo">La data deve essere in formato gg/mm/aaaa !</p>
<%
	End if
Else

			'CONTROLLO SE ESISTE GIÃ  LA CHIAVE (COMMESSA - CONSEGNA)

			set Connection = server.CreateObject("ADODB.Connection")
			Connection.open (DataBaseName)
			set rs = Server.CreateObject("ADODB.Recordset")
			rs.LockType=adLockOptimistic
			rs.CursorType=adOpenStatic

		    StrSql0 = "SELECT * FROM FILEMANA  WHERE userr=" & "'" & ChkString(Request.Form("userr")) & "' AND CONSEGNA = '" & ChkString(Request.Form("consegna")) & "'"
	        rs.Open StrSql0, Connection

			if rs.EOF and rs.BOF then

				Connection.close
				set Connection = nothing


				strSql = "insert into FILEMANA (userr, datacre, consegna, descrizione, logoper, allegato ) values ('"
				strSql = StrSql & ChkString(Request.Form("userr")) & "', '"
				strSql = StrSql & ChkString(Request.Form("datacre")) & "', '"
				strSql = StrSql & ChkString(Request.Form("consegna")) & "', '"
				strSql = StrSql & ChkString(Request.Form("descrizione")) & "', '"
				strSql = StrSql & session("user") & " - " & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & "', '"


				set Connection = server.CreateObject("ADODB.Connection")
				Connection.open (DataBaseName)
				set rs = Server.CreateObject("ADODB.Recordset")
				rs.LockType=adLockOptimistic
				rs.CursorType=adOpenStatic

				StrSql2 = "SELECT * FROM security  WHERE userr=" & "'" & Request.Form("userr") & "'"
				rs.Open StrSql2, Connection

				if rs.EOF and rs.BOF then

					strSql2 = "insert into SECURITY ( pass , userr , livello, ntent,resetpwd) values ('" & md5("12345678") & "', '" & Request.Form("userr") & "' , 0,5,0)"
					CONNECTION.Execute (StrSql2)

					%>
					<div class="titolo-news-blu"><strong>L'utenza <%=Request.Form("userr")%> è stata creata</strong></div>
					<%

				end if

				Connection.close
				set Connection = nothing


				if request.form("submit8") = "Salva" then

					strSql = strSql &  " ')"

					set Connection = server.CreateObject("ADODB.Connection")
					Connection.open (DataBaseName)

					'Response.Write StrSql

					CONNECTION.Execute (StrSql)
					CONNECTION.Close
					set CONNECTION = nothing

					%>
					<div class="titolo-news-blu"><strong>Inserimento completato</strong></div>
					<%

				else
					Session("query") = strSql
					session("modefunc") = "ins"
					session("nomecartella") = "/" & Request.Form("userr") & Request.Form("consegna")
					response.redirect("administrators-cons.asp?mode=Allega")
				End If
			ELSE
				%>
				<P  class="titolo-news-rilievo">COMMEESSA GIÃ  PRESENTE !</p>
				<%
				Connection.close
				set Connection = nothing
			END IF

End If
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
			<div class="menu-verde"><a href="Administrators-ute.asp?mode=verute">Modifica Utenze</a></div>
			<div class="menu-verde"><a href="Administrators-cons.asp?mode=vercons">Modifica Consegne</a></div>
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
		           case "legcons"
			            Call SubLegcons

		           case "vercons"
%>
<Div class="titolo-news" >Modalità Aggiornamento</Div>

<%
			            Call SubVercons
		           case "ckvercons"
%>
<Div class="titolo-news" >Modalità Aggiornamento</Div>

<%
			            Call SubckVercons
		           case "modifica"
%>
<Div class="titolo-news" >Modalità Aggiornamento</Div>

<%
			            Call SubModifica

		           case "inscons"
%>
<Div class="titolo-news" >Modalità Aggiornamento</Div>
<div class="spaziatore"></div>
<%
			            Call SubInserisci
		           case "doit"
%>
<Div class="titolo-news" ><strong>Modalità Aggiornamento</strong></Div>
<%
			            Call SubDoIt

		           case "Allega"
%>
<Div class="titolo-news" >Modalità Aggiornamento</Div>
<%
			            Call SubAllega
		           case "AllegaSalvato"
%>
<Div class="titolo-news" >Modalità Aggiornamento</Div>

<%
			            Call SubAllegaSalvato

		           Case Else
%>

<div class="spaziatore"></div>

<div class="spaziatore"></div>
<%

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