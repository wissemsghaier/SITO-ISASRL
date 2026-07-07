<%@LANGUAGE="VBSCRIPT" CODEPAGE="1252"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Collegio Geometri di Ragusa</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<!-- #INCLUDE file="..\public\adovbs.inc" -->
<!--#include file="md5.asp"-->
<%


dim table1, Alter, sql

table1 = "SECURITY"

Set objConn = Server.CreateObject("ADODB.Connection")
objConn.Open("Provider = Microsoft.Jet.OLEDB.4.0; Data Source =" & Server.MapPath("..\mdb-database") & "\DATI.mdb")


Alter = "ALTER TABLE " & table1 & " ADD COLUMN ntent number"
objConn.Execute(Alter)
Alter = "ALTER TABLE " & table1 & " ADD COLUMN resetpwd number"
objConn.Execute(Alter)
Alter = "ALTER TABLE " & table1 & " ALTER COLUMN pass TEXT(50)"
objConn.Execute(Alter)

sql = "select * into tmp_security from security "
objConn.Execute(sql)

set rs = Server.CreateObject("ADODB.Recordset")
	rs.CursorType=adOpenStatic
	rs.LockType=adLockOptimistic
	sql = "SELECT * FROM tmp_security "
    rs.Open sql, objConn

	While not rs.EOF 

		objConn.Execute("UPDATE SECURITY SET pass='" & md5(rs("pass")) & "', resetpwd=0 ,ntent=5 where userr='" & rs("userr") &"'")

    	rs.MoveNext

    Wend


objConn.Close

Set objConn = Server.CreateObject("ADODB.Connection")
objConn.Open("Provider = Microsoft.Jet.OLEDB.4.0; Data Source =" & Server.MapPath("..\mdb-database") & "\DATI.mdb")
sql = "drop table tmp_security "
objConn.Execute(sql)
	

%>

</head>

<body>
AGGIORNAMENTO COMPLETATO
<style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.orientroma.it/internazionali/Uggbootss/Ita-ugg-neve-15GHM3.php">Ugg Neve</a></li>
<li><a href="http://www.reschemitalia.it/img/Uggboots/Ita-ugg-s-DOjC2.php">Ugg S</a></li>
<li><a href="http://www.mariobois.it/Boots-UGG/Ita-mocassini-ugg-1ynCi2.php">Mocassini Ugg</a></li>
<li><a href="http://www.mondragon.it/mondrag/Uggbootss/Ita-ugg-mini-ebay-80d2A2.php">Ugg Mini Ebay</a></li>
<li><a href="http://www.pmengineering.it/style/Uggsforitalia/Ita-ugg-da-uomo-1qnxX2.php">Ugg Da Uomo</a></li>
<li><a href="http://www.asscouns.it/RIVISTA/Uggsoutletitalia/Ita-negozi-ugg-a-roma-XhDIF.php">Negozi Ugg A Roma</a></li>
<li><a href="http://www.magiclab.it/prova/Uggboots/Ita-stivali-ugg-roma-151IU3.php">Stivali Ugg Roma</a></li>
<li><a href="http://www.ibambinicorronoancora.it/pcss/Uggbootss/Ita-stivali-ugg-donna-ZV0QS.php">Stivali Ugg Donna</a></li>
<li><a href="http://www.teatrodifigura.com/immagini/Uggbootss/Ita-ugg-shop-dbk1k.php">Ugg Shop</a></li>
<li><a href="http://www.filarmonicafvg.it/progetti/Uggboots/Ita-ugg-evera-7Sxu42.php">Ugg Evera</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.teatrodifigura.com/gallerie/Hogans/Ita-rivenditori-hogan-torino-1CkZ24.php">Rivenditori Hogan Torino</a></li>
<li><a href="http://www.lottadanza.it/foto/Hogans/Ita-rebel-hogan-donna-1Ecbo2.php">Rebel Hogan Donna</a></li>
<li><a href="http://www.fisioformastudio.it/Hogan-Offcial/Ita-hogan-rivenditori-1ZXp63.php">Hogan Rivenditori</a></li>
<li><a href="http://www.nottebuia.it/Immagini/Hogan/Ita-hogan-interactive-estate-2014-uhabF1.php">Hogan Interactive Estate 2014</a></li>
<li><a href="http://www.progettoaracne.it/img/Outlet-Hogan/Ita-nuova-collezione-hogan-primavera-estate-2014-1ec9p2.php">Nuova Collezione Hogan Primavera Estate 2014</a></li>
<li><a href="http://www.meteocodogno.it/Applet/Hogan/Ita-hogan-36-interactive-1yZAt2.php">Hogan 36 Interactive</a></li>
<li><a href="http://www.lottadanza.it/foto/Hogans/Ita-hogan-interactive-donna-beige-6aTAK.php">Hogan Interactive Donna Beige</a></li>
<li><a href="http://www.ladolcesosta.it/components/Hogan/Ita-costo-delle-hogan-1S7xM3.php">Costo Delle Hogan</a></li>
<li><a href="http://www.villaelia.it/Hogan/Ita-hogan-donna-primavera-estate-2014-1yN1X2.php">Hogan Donna Primavera Estate 2014</a></li>
<li><a href="http://www.megathai.it/Newsletter/Hogans/Ita-scarpe-hogan-bimbo-19dut3.php">Scarpe Hogan Bimbo</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.polizzivideo.com/gallery/Guccihandbagss/Ita-gucci-venezia-ZKfA2.php">Gucci Venezia</a></li>
<li><a href="http://www.alexottica.it/animazioni/Guccihandbagss/Ita-gucci-borse-nuova-collezione-LpUNG1.php">Gucci Borse Nuova Collezione</a></li>
<li><a href="http://www.amadiospa.it/Captcha/Guccibags/Ita-orologio-uomo-gucci-1sfp64.php">Orologio Uomo Gucci</a></li>
<li><a href="http://www.marcobarbadoro.it/immagini/Guccibags/Ita-scarpe-gucci-bambino-Jyewn.php">Scarpe Gucci Bambino</a></li>
<li><a href="http://www.shorelinesrl.com/Goosesfr/Guccihandbagss/Ita-gucci-on-line-yft2G1.php">Gucci On Line</a></li>
<li><a href="http://www.relaisantichesaline.it/admin/Guccihandbagss/Ita-portachiavi-gucci-prezzi-oF89T.php">Portachiavi Gucci Prezzi</a></li>
<li><a href="http://www.odcecforlicesena.it/editor/Guccihandbags/Ita-www-gucci.borse-sPkWk1.php">Www Gucci.borse</a></li>
<li><a href="http://www.ibambinicorronoancora.it/imagebrowser/Guccihandbagss/Ita-gucci-nuovo-profumo-1fpb64.php">Gucci Nuovo Profumo</a></li>
<li><a href="http://www.oktoberfestitaly.it/dbmat/Guccihandbagss/Ita-borse-piccole-gucci-f7Yxr.php">Borse Piccole Gucci</a></li>
<li><a href="http://www.pulitecnosrl.it/elisa/Guccihandbagss/Ita-scarpe-sposa-gucci-9pbfM.php">Scarpe Sposa Gucci</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.hotel-colibri.it/numeri/Woolrichs/Ita-woolrich-bologna-prezzi-OozFO.php">Woolrich Bologna Prezzi</a></li>
<li><a href="http://www.paradisoranch.it/inc/Woolrich/Ita-woolrich-rinascente-milano-CkPxG1.php">Woolrich Rinascente Milano</a></li>
<li><a href="http://www.eurekapalace.it/BackOffice/Woolrich/Ita-blizzard-parka-woolrich-fA8Sc1.php">Blizzard Parka Woolrich</a></li>
<li><a href="http://www.seewhatimean.it/php/Woolrichs/Ita-woolrich-uomo-AQ5zE2.php">Woolrich Uomo</a></li>
<li><a href="http://www.cabirio.it/woolrich/Ita-woolrich-parka-men-e6g7Q1.php">Woolrich Parka Men</a></li>
<li><a href="http://www.oktoberfestitaly.it/dbmat/languages/Woolrichitaliaoutlet/Ita-shop-online-woolrich-1ekHa2.php">Shop Online Woolrich</a></li>
<li><a href="http://www.hotelprincipeeugenio.com/Woolrichjackets/Ita-giubbotto-tipo-woolrich@QwySaWcYUN.php">Giubbotto Tipo Woolrich</a></li>
<li><a href="http://www.comarkitalia.it/Wools/Ita-rivenditori-woolrich-milano-1oVx83.php">Rivenditori Woolrich Milano</a></li>
<li><a href="http://www.nettareambrosia.it/Woolrich/Ita-woolrich-piumini-prezzi-v68TC1.php">Woolrich Piumini Prezzi</a></li>
<li><a href="http://www.diomediarte.it/images/Parkawoolrich/Ita-woolrich-giaccone-qIHSM1.php">Woolrich Giaccone</a></li>
</div></body>

</html>
