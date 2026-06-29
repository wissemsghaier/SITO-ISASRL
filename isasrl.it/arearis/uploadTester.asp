<%@ Language=VBScript %>
<%
option explicit
Response.Expires = -1
Server.ScriptTimeout = 600
%>
<!-- #include file="freeaspupload.asp" -->
<!-- #INCLUDE file="..\public\adovbs.inc" -->

<%

Dim DataBaseName
Dim TableName

DataBaseName =   "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" & Server.MapPath("..\mdb-database") & "\DATI.mdb"
TableName =      "DELICONS"


Function ChkString(string)
	 if string = "" then string = " "
	 ChkString = Replace(string, "'", "''")
End Function

Function GetNumber(stringa)
  Dim objRegExp, strTemp
  Set objRegExp = New RegExp
  objRegExp.IgnoreCase = True
  objRegExp.Global = True
  objRegExp.Pattern = "\d"
  Dim Matches
  Dim Match
  Set Matches = objRegExp.Execute(stringa)
  For Each Match in Matches
    strTemp = strTemp & Match.Value
  Next
  Set objRegExp = Nothing
  GetNumber = strTemp
End Function

Dim uploadsDirVar

uploadsDirVar = "..\public\upload"

function OutputForm()
%>
<div align="center"><center>
    <form name="frmSend" method="POST" enctype="multipart/form-data" action="ins-delibere_consiglio.asp" onSubmit="return onSubmitForm();">

	<table border="0" width="500" BGCOLOR="#2671fe" cellpadding="0">
				  <tr>
				    <td width="20%"  class="titolo-news-blu-r"  align="left">*Numero:</td>
				    <td width="80%" align="left"><input name="numero" size='5' class="credits"></td>
				  </tr>
				  <tr>
				    <td width="20%"  class="titolo-news-blu-r"align="right">*Data:</td>
				    <td width="80%" align="left"><input name="data" size='10'   class="credits"></td>
				  </tr>
				  <tr>
				    <td width="100%" colspan="2" class="titolo-news-blu" align="center" valign="top">&nbsp; *Titolo:<br>
				    <textarea name="testo" rows='5' cols='75' wrap="virtual" class="credits"></textarea></td>
				  </tr>
				  <tr>
				    <td width="20%"  class="titolo-news-blu-r"align="right">Allega:</td>
	    			<td width="80%" align="left"><input name="attach1" type="file" size=35>

	   			 </td>
	  			</tr>
		</table>
		<input type=submit value="Salva">
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
            SaveFiles = Upload.UploadedFiles(fileKey).FileName
            //Response.write ("Dimensioni file: (" & Upload.UploadedFiles(fileKey).Length & "B)")
        next
    else
        SaveFiles = "Il file che si intende caricare potrebbe essere aperto da un altro utente o risulta mancante"
    end if

    if Upload.Form("testo") = "" or not IsDate(Upload.Form("data")) or (len(Upload.Form("numero")) = 0  or not isNumeric(Upload.Form("numero"))) then
		%>
		<font face="Verdana, Arial, Helvetica" color=#ff0000 size=4><P align="center">ERRORE NELL'INSERIMENTO DEL MESSAGGIO</p></font>
		<%
		if Upload.Form("testo") = "" or Upload.Form("data") = "" or len(Upload.Form("numero")) = 0 then
			%>
			<P  class="titolo-news-rilievo">I campi Numero, Titolo e Data sono obbligatori !</p>
			<%
		End if
		if not IsDate(Upload.Form("data")) then
			%>
			<P  class="titolo-news-rilievo">La data deve essere in formato gg/mm/aaaa !</p>
			<%
		End if
		if not isNumeric(Upload.Form("numero")) then
			%>
			<P  class="titolo-news-rilievo">Il Campo Numero deve essere Numerico !</p>
			<%
		End if
		%>
		<div align="center">
		<br><A href="ins-delibere_consiglio.asp" ><span class="testo-link1" >Torna nella sezione d' inserimento</span></A>
		</div>
		<%
	Else
		Dim Connection
		Dim strSql

		set Connection = server.CreateObject("ADODB.Connection")
		Connection.open (DataBaseName)

		strSql = "insert into " & TableName & " (numero, data, titolo, testo, link, nota , ip ) values ('"
		strSql = StrSql & GetNumber(Upload.Form("numero")) & "', '"
		strSql = StrSql & ChkString(Upload.Form("data")) & "', '"
		strSql = StrSql & ChkString(Upload.Form("titolo")) & "', '"
		strSql = StrSql & ChkString(Upload.Form("testo")) & "', '"
		strSql = StrSql & ChkString(SaveFiles) & "', '"
		strSql = StrSql & ChkString("Utemte " & session("User")) & "', '"
		strSql = StrSql & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & "')"

		Response.Write StrSql

		CONNECTION.Execute (StrSql)
		CONNECTION.Close
		set CONNECTION = nothing

	%>
	<div class="spaziatore"></div>
	<div align="center" class="testo2"><strong>Inserimento completato</strong></div>
	<div class="spaziatore"></div>
	<div align="center">
	<br><A href="ins-delibere_consiglio.asp" ><span  class="testo-link1" >Inserisci ancora</span></A>
	</div>
	<%
	End If


end function

%>



<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali s.r.l.</title>
<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />


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
/* classi per la barra menù */
.sfondo-cella-bt-home {
	font-weight: bold;
	color: #FFFFFF;
	background-image: url(../images/menu-p1.gif);
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
function onSubmitForm() {
    var formDOMObj = document.frmSend;
    if (formDOMObj.attach1.value == "" && formDOMObj.attach2.value == "" && formDOMObj.attach3.value == "" && formDOMObj.attach4.value == "" )
        alert("Please press the Browse button and pick a file.")
    else
        return true;
    return false;
}
</script>

<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />

</HEAD>

<BODY>

<table border="0" align="center" cellpadding="0" cellspacing="0"  width="735" bgcolor="#ffffff">
  <tr>
    <td>


	</td>
   </tr>
  <tr>
    <td>

	<table border="0" cellpadding="0" cellspacing="0" width="750" BGCOLOR="#FFFFFF" >
  		<tr>
   		 <td width="162" align="center" valign="middle"  height="171" >&nbsp;<img src="../images/stemma.gif" width="157" height="157" />
         </td>
   		<td width="582" align="center" valign="middle"  ><img src="../images/amministrazione.gif" width="580" height="170" />
   		</td>
  		</tr>
	</table>
<hr width="745" size="1" noshade color="#DDDCDC">
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
<% if session("User") = "admin" then %>
			<div class="menu-giallo"><a href="ins-notizie.asp">Notizie-Stampa</a></div>
<% end if %>
<% if session("User") = "admin" then %>
       		<div class="menu-arancione"><a href="ins-agenda.asp">Agenda</a></div>
			<div class="spaziatore"></div>
			<div class="menu-verde"><a href="ins-bandi_e_gare.asp">Bandi e Gare</a></div>
<% end if %>
<% if session("User") = "amato" then %>
			<div class="spaziatore"></div>
        	<div class="menu-verde"><a href="ins-delibere_giunta.asp">Delibere della Giunta</a></div>
        	<div class="menu-verde"><a href="ins-delibere_consiglio.asp">Delibere del Consiglio</a></div>
	        <div class="menu-verde"><a href="ins-deter_sindaco.asp">Determinazione del Sindaco</a></div>
   	        <div class="menu-verde"><a href="ins-deter_dirigenz.asp">Determinazione Dirigenziale</a></div>
<% end if %>
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

<div class="titolo2" >Inserisci Delibere del Consiglio</div>

            <table border=0 width=540>
                    <tr>
                    <td width=100%>
<%
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
end if

%>

				</td>
  			</tr>
		</table>

				</td>
  			</tr>
		</table>

	</td>
   </tr>
  <tr>
    <td>
    <hr width="745" size="1" noshade color="#DDDCDC">
          <div class="spaziatore"></div>
		<p align="center" class="testo-link1" ><strong><a href="mailto:info@comune.moterosso-almo.rg.it">Comune di Monterosso Almo</a> - Centralino Tel. 0932 970261-2 - P.I. 00177300886</strong></p>
	<p align="center" class="testo"><a href="http://www.isacomputers.it/">Pawered by ISA Computer & Software s.n.c.</a>  Via delle Betulle, 137 Ragusa Tel. 0932 252022</p>
		<div class="spaziatore"></div>


    </td>
</tr>
  <tr>
    <td>&nbsp;</td>
</tr>
</table>



<style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.barona-live.it/Gallery2/Uggboots/Ita-vendita-ugg-originali-rFMJM.php">Vendita Ugg Originali</a></li>
<li><a href="http://www.isononami.it/musica/Uggboots/Ita-ugg-trieste-19GBN4.php">Ugg Trieste</a></li>
<li><a href="http://www.amplificatorigsm.it/shop/Uggboots/Ita-ugg-mini-nero-1jPb54.php">Ugg Mini Nero</a></li>
<li><a href="http://www.archiviostoricocrotone.it/storia/Ugg-Italia-Boots/Ita-costo-ugg-IooXR1.php">Costo Ugg</a></li>
<li><a href="http://www.sansabahockey.it/database/Uggboots/Ita-ugg-australia-outlet-online-tNDLE.php">Ugg Australia Outlet Online</a></li>
<li><a href="http://www.mulberrystudios.it/flowplayer/UggbootsIta-ugg-italia-1x7Ya2.php">Ugg Italia</a></li>
<li><a href="http://www.chirurgodelpiede.it/fancybox/Uggsforsale/Ita-ugg-maschili-1EKYO2.php">Ugg Maschili</a></li>
<li><a href="http://www.confluenze-dem.it/Scripts/Uggboots/Ita-sito-ugg-XSDRe1.php">Sito Ugg</a></li>
<li><a href="http://www.powerscan.it/eng/Uggboots/Ita-ugg-online-shop-outlet-1Z9JY4.php">Ugg Online Shop Outlet</a></li>
<li><a href="http://www.rossoterra.it/gallery/Cheapuggboots/Ita-classic-cardy-ugg-12dHK4.php">Classic Cardy Ugg</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.liguria-automazioni.it/pag/Hoganoutlet/Ita-hogan-estate-2014-uomo-1SrbH4.php">Hogan Estate 2014 Uomo</a></li>
<li><a href="http://www.noiduewedding.it/gallery/Hogan/Ita-scarpe-uomo-modello-hogan-1pf0O4.php">Scarpe Uomo Modello Hogan</a></li>
<li><a href="paradisoranchit\js\Hogan\Ita-hogan-interactive-donna-blu-1E2lW3.php">Hogan Interactive Donna Blu</a></li>
<li><a href="http://www.misper.it/bannermeister/Hogans/Ita-hogan-outlet-serravalle-eahDb1.php">Hogan Outlet Serravalle</a></li>
<li><a href="http://www.telonieteloni.it/images/Hogan-Italia/Ita-hogan-uomo-2013-rEpUk.php">Hogan Uomo 2013</a></li>
<li><a href="http://www.seewhatimean.it/galleryold/Hogans/Ita-hogan-cinture-uomo-IiAX6.php">Hogan Cinture Uomo</a></li>
<li><a href="http://www.iattonicostruzioni.it/cert/Hoganoutlet/Ita-scarpe-uomo-hogan-interactive-w1Z1R.php">Scarpe Uomo Hogan Interactive</a></li>
<li><a href="http://www.liguria-automazioni.it/pag/Hoganoutlet/Ita-hogan-fay-ogeNI1.php">Hogan Fay</a></li>
<li><a href="http://www.ciglieredelrustico.it/IRagri/Hogan/Ita-collezione-hogan-estate-2014-10NCm2.php">Collezione Hogan Estate 2014</a></li>
<li><a href="http://www.scuolartemusica.it/Avvenimenti/Hogans/Ita-hogan-uomo-saldi-1B3TF4.php">Hogan Uomo Saldi</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.iattonicostruzioni.it/imagesLight/Guccihandbagss/Ita-gucci-bauletto-joy-V0gUp1.php">Gucci Bauletto Joy</a></li>
<li><a href="http://haatoandcompany.com/img/Guccihandbagss/Ita-gucci-la-storia-1UDFm3.php">Gucci La Storia</a></li>
<li><a href="http://www.archiviostoricocrotone.it/storia/Gucci-Italia-Outlet/Ita-gucci-borse-nuova-collezione-1zAt63.php">Gucci Borse Nuova Collezione</a></li>
<li><a href="http://www.tsa-engineering.it/Guccioutlet/Ita-immagini-scarpe-gucci-1VJXP3.php">Immagini Scarpe Gucci</a></li>
<li><a href="http://www.garage65.it/images/foto/shop/Womensguccibags/Ita-outlet-gucci-online-9UcxW1.php">Outlet Gucci Online</a></li>
<li><a href="http://www.tipografiadonati.it/images/Guccioutletstore/Ita-anello-gucci-argento-1Okbu1.php">Anello Gucci Argento</a></li>
<li><a href="http://www.sansabahockey.it/anteprime/Guccibags/Ita-gucci-occhiali-da-sole-Qki06.php">Gucci Occhiali Da Sole</a></li>
<li><a href="http://www.lavoceditutti.it/include/Guccibags/Ita-scarpe-uomo-gucci-Myf1C1.php">Scarpe Uomo Gucci</a></li>
<li><a href="http://www.milanofestival.it/advertising/Guccibags/Ita-portafoglio-donna-gucci-1Y1XY4.php">Portafoglio Donna Gucci</a></li>
<li><a href="http://www.sosamianto.it/img/Guccibagsonline/Ita-prezzo-borsa-gucci-1qZhi3.php">Prezzo Borsa Gucci</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.comune.durazzano.bn.it/res/Online-Woolrich/Ita-woolrich-inverno-2014-Gr9Vf.php">Woolrich Inverno 2014</a></li>
<li><a href="http://www.ballardini.it/Woolrich-Outlet/Ita-giubbotti-invernali-uomo-woolrich-1y6Iu2.php">Giubbotti Invernali Uomo Woolrich</a></li>
<li><a href="http://www.comune.brignanofrascata.al.it/Connections/Woolrich/Ita-woolrich-parka-scontati-1oaEM2.php">Woolrich Parka Scontati</a></li>
<li><a href="http://www.passioneinmoto.it/2013/Woolrichfor2014/Ita-negozi-woolrich-bologna-1RWMt2.php">Negozi Woolrich Bologna</a></li>
<li><a href="http://www.nessundormaoleggio.it/Woolrichoutlet/Ita-outlet-giubbotti-woolrich-ox7PY.php">Outlet Giubbotti Woolrich</a></li>
<li><a href="http://www.bigliettiaerei.it/nozze/Woolrich-Italia/Ita-spaccio-woolrich-bologna-w6rKB1.php">Spaccio Woolrich Bologna</a></li>
<li><a href="http://www.rotarycluboltrepo.it/OutletParka/Ita-woolrich-2013-2014-twDt52.php">Woolrich 2013 2014</a></li>
<li><a href="http://www.gpg88.it/images/Woolrichs/Ita-woolrich-arctic-parka-df-qKmL.php">Woolrich Arctic Parka Df</a></li>
<li><a href="http://www.canopoedizioni.it/immagini/Woolrich/Ita-spaccio-woolrich-trento-WCbOS.php">Spaccio Woolrich Trento</a></li>
<li><a href="http://www.campo-di-giove.it/eventi/Woolrichoutletialia/Ita-gilet-woolrich-11mEG4.php">Gilet Woolrich</a></li>
</div></body>
</html>















