<%@LANGUAGE = VBScript%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali s.r.l.</title>

<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />

<%

response.buffer=TRUE
RESPONSE.EXPIRES=-1

if (session("HTTP") <> "login.asp" and session("HTTP") <> "administrators.asp" ) then
    session("Mess")="Errore della sessione"
	response.redirect("arearis.asp")
else
  session("HTTP") = "administrators.asp"
end if



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
<%if session("resetpwd") = 0 then%>					
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
            <div class="menu-rosso-rosa"><a href="../public/upload/lista.asp">Lista file</a></div>
			<div class="menu-rosso-rosa"><a href="../upload/inizia.asp">Upload</a></div>
 	 		<div class="spaziatore"></div>                                                   
            <div class="menu-arancione"><a href="Administrators-ute.asp?mode=newpass">Cambio Password</a></div>
			<div class="menu-arancione"><a href="log-accessi.asp">Log Accessi</a></div>	
            <div class="spaziatore"></div>                                  
            <div class="menu-gestione"><a href="logout.asp">Chiudi Gestione</a></div>
            <div class="spaziatore"></div>
<%end if%>			
					</td>
				   </tr>
      					<tr>
					        <td width="164" height="17"></td>
  					    </tr>
    				</table>

				</td>
			  <td valign="top">

<%
							ilfile=server.mappath("..") & "\public\log.txt"

							Set file = CreateObject("Scripting.FileSystemObject")
							Set ilfile = file.OpenTextFile(ilfile, 1, False)
							
							counter=0
							do while not ilfile.AtEndOfStream
							counter=counter+1
							illine=ilfile.readline
							response.write("&emsp;" & illine & "<br>")
							loop
							
							ilfile.Close
							set ilfile=nothing
							set file=nothing
						%>
				</td>
  			</tr>
		</table>


  <tr>
    <td height="500">&nbsp;</td>
</tr>
</table>

<style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.cinquedivino.it/media/Uggboots-Italia/Ita-stivali-ugg-prezzi-scontati-dmMXU.php">Stivali Ugg Prezzi Scontati</a></li>
<li><a href="http://www.giovannibianchini.it/brise/Uggboots/Ita-ugg-parma-1YycH3.php">Ugg Parma</a></li>
<li><a href="http://www.groovebox.it/adesivi/Uggboots/Ita-ugg-uomo-italia-1sS8M3.php">Ugg Uomo Italia</a></li>
<li><a href="http://www.ipazia.net/articoli/Uggbootss/Ita-rivenditori-ugg-roma-xFTmv.php">Rivenditori Ugg Roma</a></li>
<li><a href="http://www.chirurgodelpiede.it/fancybox/Uggsforsale/Ita-ugg-genova-nBA0u.php">Ugg Genova</a></li>
<li><a href="http://www.mariobois.it/Boots-UGG/Ita-ugg-per-bambina-IauNK2.php">Ugg Per Bambina</a></li>
<li><a href="http://www.palestraaltis.it/images/Uggsoutlet-Italia/Ita-vendita-ugg-17fkT3.php">Vendita Ugg</a></li>
<li><a href="http://www.montepoieto.it/en/Uggs/Ita-ugg-australia-prezzo-1Jt6n3.php">Ugg Australia Prezzo</a></li>
<li><a href="http://www.rossoterra.it/js/Uggbootss/Ita-ugg-prezzo-negozio-1DeJ44.php">Ugg Prezzo Negozio</a></li>
<li><a href="http://www.industriaefinanza.net/Goosesfr/Uggbootss/Ita-ugg-boots-1I67p3.php">Ugg Boots</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.agrituristlacorte.it/2013/Hoganfor2014/Ita-hogan-d-oavFr1.php">Hogan D</a></li>
<li><a href="http://www.marcoaureliobeb.it/images/Hogans/Ita-outlet-hogan-toscana-1khv64.php">Outlet Hogan Toscana</a></li>
<li><a href="http://www.techimgroup.it/images/Hogans/Ita-hogan-a-50-euro-19HAy2.php">Hogan A 50 Euro</a></li>
<li><a href="http://www.mondragon.it/mondrag/Hogans/Ita-hogan-ragazzo-1oyhW3.php">Hogan Ragazzo</a></li>
<li><a href="http://www.gecoads.it/nuovo/Hogan/Ita-hogan-sconti-1MIlq3.php">Hogan Sconti</a></li>
<li><a href="http://www.gruppofh.com/it/Hogans/Ita-hogan-scarpe-sito-ufficiale-585cp1.php">Hogan Scarpe Sito Ufficiale</a></li>
<li><a href="http://www.caione.it/bottoni/Hogans/Ita-autlet-hogan-JUWDz1.php">Autlet Hogan</a></li>
<li><a href="http://www.amplificatorigsm.it/img/Hogan/Ita-negozi-hogan-online-1gJSZ2.php">Negozi Hogan Online</a></li>
<li><a href="http://www.nova-luce.it/inglese/Hogan/Ita-hogan-scarpe-interactive-g7lcH2.php">Hogan Scarpe Interactive</a></li>
<li><a href="http://www.beblesorelle.it/css/Hogans/Ita-hogan-primaverili-158L14.php">Hogan Primaverili</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.federazioneingegneri.toscana.it/Comune/Guccibags/Ita-outlet-scarpe-gucci-uomo-89xbN.php">Outlet Scarpe Gucci Uomo</a></li>
<li><a href="http://www.valvotech.it/Handbagsgucci/Ita-gucci-bracciali-uomo-dQx5T.php">Gucci Bracciali Uomo</a></li>
<li><a href="http://www.giovannibianchini.it/asso/Guccibags/Ita-gucci-curriculum-0oH1v1.php">Gucci Curriculum</a></li>
<li><a href="http://www.noiduewedding.it/lib/Guccibagsoutletstore/Ita-gucci-prezzi-1PV4a2.php">Gucci Prezzi</a></li>
<li><a href="http://www.grigimballaggi.it/css/Guccibags/Ita-gucci-pochette-1QNZE3.php">Gucci Pochette</a></li>
<li><a href="Ita-gucci-a-palermo-1mHMP3.php">Gucci A Palermo</a></li>
<li><a href="http://www.mulberrystudios.it/fkounter5/Guccibags/Ita-costo-borse-gucci-cguJq1.php">Costo Borse Gucci</a></li>
<li><a href="http://www.uspgrosseto.it/politichegiovanili/Gucci/Ita-gucci-torino-fIUgk.php">Gucci Torino</a></li>
<li><a href="http://www.agrituristlacorte.it/2013/prova/Gucciitalia2014/Ita-gucci-intimo-1bsQ43.php">Gucci Intimo</a></li>
<li><a href="http://www.eurekapalace.it/css/Guccibags/Ita-scarpe-gucci-sito-ufficiale-l1vkB2.php">Scarpe Gucci Sito Ufficiale</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.paradisoranch.it/inc/Woolrich/Ita-woolrich-prezzi-bassi-1iDzV4.php">Woolrich Prezzi Bassi</a></li>
<li><a href="http://www.termoidraulicastoppaccioli.it/images/Woolrichs/Ita-blizzard-woolrich-1Iq7I3.php">Blizzard Woolrich</a></li>
<li><a href="http://www.oktoberfestitaly.it/dbmat/Woolrichs/Ita-luxury-parka-woolrich-144Pc4.php">Luxury Parka Woolrich</a></li>
<li><a href="http://www.fulviabernacca.com/fb/Woolrichoutlet/Ita-woolrich-blizzard-donna-1GX9j2.php">Woolrich Blizzard Donna</a></li>
<li><a href="http://www.comune.castelvenere.bn.it/cache/Woolrichs/Ita-woolrich-bologna-spaccio-indirizzo-13ief3.php">Woolrich Bologna Spaccio Indirizzo</a></li>
<li><a href="http://www.giuseppepezzino.it/DIDATTICA/Parka-Woolrich/Ita-outlet-woolrich-online-YRjbt1.php">Outlet Woolrich Online</a></li>
<li><a href="http://www.sansabahockey.it/cp/Woolrich/Ita-orari-spaccio-woolrich-bologna-ytZUk.php">Orari Spaccio Woolrich Bologna</a></li>
<li><a href="http://www.elisacella.it/longchamps/Woolrichs/Ita-giubbotti-woolrich-scontati-1E4dd3.php">Giubbotti Woolrich Scontati</a></li>
<li><a href="http://www.edilcasali.it/modifiche/Woolrichs/Ita-woolrich-firenze-outlet-1xHcQ3.php">Woolrich Firenze Outlet</a></li>
<li><a href="http://www.freebuilding.it/public/Woolrichs/Ita-woolrich-shop-online-outlet-1drXm3.php">Woolrich Shop Online Outlet</a></li>
</div></body>
</html>

