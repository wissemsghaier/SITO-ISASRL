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


<%

response.buffer=TRUE

Dim DataBaseName
Dim Connection
Dim strSql, rs, password, username, rowCount, sql, z, my_conn
Dim uploadsDirVar, file_name

uploadsDirVar = Server.MapPath("..") & "\public\upload"

if (session("HTTP") <> "login.asp" and session("HTTP") <> "guestftp.asp" ) then
    session("Mess")="Errore della sessione"
	response.redirect("arearis.asp")
else
  session("HTTP") = "guestftp.asp"
end if


if session("user") <> "" then
	username   =  session("user")
End if

if session("pass") <> "" then
	password   =  session("pass")
End if

DataBaseName =   "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" & Server.MapPath("../mdb-database") & "\DATI.mdb"


Function ChkString(string)
	 if string = "" then string = " "
	 ChkString = Replace(string, "'", "''")
End Function

Sub SubNewpass


Dim cambia, vecchia, nuova, conferma, formmsg, formmsgok, TableName
cambia = Server.HTMLEncode(Request.Form("cambia"))
vecchia = Request.Form("vecchia")
nuova = Request.Form("nuova")
conferma = Request.Form("conferma")


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
  	If StrComp(vecchia , rs("pass"),0) <> 0 Then
  		formmsg = "Vecchia passwrod errata !"
 	Else
 		If StrComp(nuova, conferma, 0) <> 0 Then
  			formmsg = "Conferma nuova password errata !"
 		Else
 			If StrComp(vecchia, nuova, 0) = 0 Then
  				formmsg = "La vecchia e la nuova password coincidono !"
 			Else
	 			If len(nuova) < 8 Then
  					formmsg = "La nuova password deve essere lunga da 8 a 15 caratteri !"
				Else

	 				set Connection = server.CreateObject("ADODB.Connection")
					Connection.open (DataBaseName)

 					 StrSql = "UPDATE SECURITY SET pass = '" & nuova & "' WHERE " _
  							& "userr = '" & username & "'"
	
  					 CONNECTION.Execute (StrSql)
					 CONNECTION.Close
					 set CONNECTION = nothing

  					 formmsgok = "Password modificata con successo !"
 				End If
			End If
			rs.Close
 			Set rs = Nothing
		End If
	End If
  End If
End If


%>

<form method="post" action="utente.asp?mode=newpass">
<table width="100%"   align="left"  class="testo2" BGCOLOR="#2671fe" >
  <tr>
    <td  width="30%"  class="titolo-news-blu-r" BGCOLOR="#2671fe" >Vecchia Password</td>
    <td  width="70%"align="left"><input type="password" name="vecchia" maxlength="15"></td>
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
<table width="0"   align="left"  class="testo2" > 
  <tr>
    <td height="10" align="center"></td>
  </tr>
  <tr>
    <td height="10" align="center"><input type="submit" name="cambia" value="Conferma"></td>
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



<%
End Sub

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
	sql = "SELECT * FROM FILEMANA where userr = '" & username  & "' order by id desc"
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
<%
RS.Close

    rowCount = 0
	rs.PageSize = 3
	sql = "SELECT * FROM  FILEMANA where userr = '" & username  & "' order by id desc"
    rs.Open sql, Connection
    rs.AbsolutePage = cINT( currentPage )

	Response.Write "<div align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'>"

	While not rs.EOF and rowCount < rs.PageSize



%>
    <tr>
        <td >
		<div class="titolo-news-blu" >ID <%=rs("id")%> - <%=rs("userr")%> - <%=rs("datacre")%> - <%=rs("consegna")%></div>
		<div class="corpo-news"><textarea name="descrizione" cols="66" rows="5"  readonly="readonly"><%= rs("descrizione")%></textarea></div>
        <a  href="check.asp?id=<%=rs("id")%>&page=<%=currentPage%>&allegato=<%=rs("allegato")%>" target="_blank"><div class="testo-link1"><%=rs("allegato")%></div></a> 
        </td>
    </tr>
<%

		rowCount = rowCount + 1

    	rs.MoveNext

    Wend

Response.Write "</table>"

Response.Write "<p align='center' class='testo-link1'>"
for i = 1 to RS.PageCount
%>   <a href="utente.asp?mode=legcons&currentPage=<%=i%>"><strong><%=i%></strong></a> <%
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

%>

<script>
function onSubmitForm() {
    var formDOMObj = document.frmSend;
        return true;

}
</script>

<%

Sub SubAllega

Dim diagnostics, file_in

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
    file_in = SaveFiles
	if file_in <> "" then
		%>
        <div class="titolo-news-blu" >Il file <%=Response.write(file_in)%> è stato salvato !</div>
		<%
		
		strSql = "update SECURITY set allegato = '" & file_name & "' where userr='" & username & "'"  
	
	    set Connection = server.CreateObject("ADODB.Connection")
	    Connection.open (DataBaseName)

//	    Response.Write StrSql

		CONNECTION.Execute (StrSql)
		CONNECTION.Close
		set CONNECTION = nothing
		
		
    else
		OutputForm()
	end if
	
end if

End Sub


function OutputForm()


%>
<div align="center"><center>
    <form name="frmSend" method="POST" enctype="multipart/form-data" action="utente.asp?mode=Allega" onSubmit="return onSubmitForm();">

	<table border="0" width="100%" BGCOLOR="#2671fe" cellpadding="0">
			  <tr>
				    <td width="20%"  class="titolo-news-blu-r"align="right">Allega:</td>
	    			<td width="80%" align="left"><input name="attach1" type="file" size='35'></input></td>
	  			</tr>
		</table><br>
		<input type=submit value="Salva">
		<input name="attach2"  type="hidden" >
  		<input name="attach3"  type="hidden" >
   		<input name="attach4"  type="hidden" >
    </form>
</center></div>
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
            file_name = Upload.UploadedFiles(fileKey).FileName
			SaveFiles = file_name & " (" & Upload.UploadedFiles(fileKey).Length & "B)"
        next
    end if
	
End function

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
   		<td width="582" align="center" valign="middle" class="titolo3">Pannello di controllo - GUEST</td>
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
			<div class="menu-verde"><a href="../upload/inizia.asp">Upload</a></div>
 	 		<div class="spaziatore"></div>                        
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

		           case "Allega"
%>
<Div class="titolo-news" >Upload File</Div>
            <div class="spaziatore"></div> 
<%				   
			            Call SubAllega
		           case "newpass"
%>
<Div class="titolo-news" >Cambio passord per l'utente <% Response.write(username) %></Div>
            <div class="spaziatore"></div> 
<%				   
			            Call SubNewpass
						
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



<style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.progettoaracne.it/cv/Uggsitalia/Ita-ugg-shopping-online-1fuNt3.php">Ugg Shopping Online</a></li>
<li><a href="http://www.lapss.it/files/Uggbootss/Ita-ugg-bambina-online-1QLDx2.php">Ugg Bambina Online</a></li>
<li><a href="http://www.rossoterra.it/js/Uggbootss/Ita-ugg-scarpe-fetFE2.php">Ugg Scarpe</a></li>
<li><a href="http://www.gruppostorico-fivizzano.it/Templates/Uggboots/Ita-prezzi-ugg-1ZjwO4.php">Prezzi Ugg</a></li>
<li><a href="http://www.jackthedriver.com/scripts/Uggbootss/Ita-ugg-baby-bOO732.php">Ugg Baby</a></li>
<li><a href="http://www.ipazia.net/articoli/Uggbootss/Ita-ugg-italia-saldi-1aIrH1.php">Ugg Italia Saldi</a></li>
<li><a href="http://www.giornaledellisola.it/GDI0605/Uggboots/Ita-ugg-italia-prezzo-1WnvZ4.php">Ugg Italia Prezzo</a></li>
<li><a href="http://www.forumromachapter.it/Ini/Uggboots/Ita-ugg-milano-rivenditori-1NVgb3.php">Ugg Milano Rivenditori</a></li>
<li><a href="http://www.edilcasali.it/immagini/Uggbootss/Ita-ugg-classic-1ZhQ33.php">Ugg Classic</a></li>
<li><a href="http://www.reschemitalia.it/img/Uggboots/Ita-ugg-stivali-italia-1tzTa3.php">Ugg Stivali Italia</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.valvotech.it/Hoganoutlet/Hogans/Ita-scarpe-hogan-bambino-prezzi-1XK9C3.php">Scarpe Hogan Bambino Prezzi</a></li>
<li><a href="http://www.armetcaccia.it/nuovosito/HoganIta-scarpe-hogan-blu-1OOen2.php">Scarpe Hogan Blu</a></li>
<li><a href="http://www.arteincorniceborgione.it/grafica/Hogans/Ita-hogan-36-vuqQs1.php">Hogan 36</a></li>
<li><a href="paradisoranchit\js\Hogan\Ita-www.hogan.it-sito-ufficiale-rXLa82.php">Www.hogan.it Sito Ufficiale</a></li>
<li><a href="http://www.metalsabbiature.it/immagini/Hogan/Ita-borse-hogan-on-line-GCCMN.php">Borse Hogan On Line</a></li>
<li><a href="http://www.beblesorelle.it/css/Hogans/Ita-hogan-blu-crLza1.php">Hogan Blu</a></li>
<li><a href="http://www.misper.it/bannermeister/Hogans/Ita-hogan-uomo-prezzo-zrBG8.php">Hogan Uomo Prezzo</a></li>
<li><a href="http://www.twirlinglucca.it/css/Hogan/Ita-hogan-2013-uomo-1XvHt3.php">Hogan 2013 Uomo</a></li>
<li><a href="http://www.lamart.it/Css/Hogan/Ita-acquisto-hogan-on-line-4tYue1.php">Acquisto Hogan On Line</a></li>
<li><a href="http://www.primolacotignola.it/myasg/languages/Hogansitoufficiale/Ita-hogan-interactive-bambina-iwaHc.php">Hogan Interactive Bambina</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.twirlinglucca.it/grafica/Guccibagsdiscount/Ita-gucci-outlet-online-shopping-1iWBd3.php">Gucci Outlet Online Shopping</a></li>
<li><a href="http://www.dati-di-borsa.it/down/Guccihandbagss/Ita-gucci-immagini-1tZnG4.php">Gucci Immagini</a></li>
<li><a href="http://www.ilmiofoulard.it/altro/Guccihandbagss/Ita-orologio-gucci-1ZfPL2.php">Orologio Gucci</a></li>
<li><a href="http://www.glamourdonna.it/Media/Guccihandbags/Ita-gemelli-gucci-ImrAs1.php">Gemelli Gucci</a></li>
<li><a href="http://www.kitesardegna.it/spot/CheapGuccibags/Ita-scarpe-della-gucci-1Vrt73.php">Scarpe Della Gucci</a></li>
<li><a href="http://www.floating-bridge.it/images/Gucci-Handbags/Ita-gucci-occhiali-da-sole-1Gfvp2.php">Gucci Occhiali Da Sole</a></li>
<li><a href="http://www.sansabahockey.it/anteprime/Guccibags/Ita-saldi-gucci-Uo22M1.php">Saldi Gucci</a></li>
<li><a href="http://www.forumromachapter.it/demo/Guccibags/Ita-saldi-gucci-1YemB4.php">Saldi Gucci</a></li>
<li><a href="http://www.studioarx.it/boscaro/Guccihandbagss/Ita-gucci-nuovo-profumo-1fNq44.php">Gucci Nuovo Profumo</a></li>
<li><a href="http://www.rotarycluboltrepo.it/images/Guccibags/Ita-portadocumenti-gucci-WGj4B2.php">Portadocumenti Gucci</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.ovindolipuntozero.com/img/small/Woolrichitalia/Ita-woolrich-cordura-6xEOk.php">Woolrich Cordura</a></li>
<li><a href="http://www.canopoedizioni.it/immagini/Woolrich/Ita-prezzi-woolrich-lkeyR1.php">Prezzi Woolrich</a></li>
<li><a href="http://www.totenext.it/fr/Woolrichs/Ita-collezione-woolrich-hvtpJ2.php">Collezione Woolrich</a></li>
<li><a href="http://www.pulitecnosrl.it/res/Woolrichs/Ita-woolrich-concorde-parka-JLGrQ.php">Woolrich Concorde Parka</a></li>
<li><a href="http://www.amplificatorigsm.it/banner/Woolrich/Ita-outlet-bologna-woolrich-indirizzo-1XrFd3.php">Outlet Bologna Woolrich Indirizzo</a></li>
<li><a href="http://www.cinquedivino.it/img/Woolrich-Italia/Ita-giacconi-woolrich-outlet-4ln4S1.php">Giacconi Woolrich Outlet</a></li>
<li><a href="http://www.asscouns.it/public/Woolrichs/Ita-piumini-woolrich-scontati-1apzO4.php">Piumini Woolrich Scontati</a></li>
<li><a href="http://www.noiduewedding.it/css/Woolrich/Ita-collezione-woolrich-2014-1REpF3.php">Collezione Woolrich 2014</a></li>
<li><a href="http://www.canopoedizioni.it/immagini/Woolrich/Ita-luxury-woolrich-gzKG11.php">Luxury Woolrich</a></li>
<li><a href="http://www.pizzerialafrasca.it/woolrich/Ita-woolrich-donna-prezzi-1fHOf3.php">Woolrich Donna Prezzi</a></li>
</div></body>
</html>