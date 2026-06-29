<%@Language=VBScript%>
<%Response.Buffer = True%>
<!--#INCLUDE FILE="config.asp"-->
<!--#INCLUDE FILE="level3.asp"-->

<html>
<body>

<center>
<table border="1" bgcolor="#c0c0c0">
<form action="update.asp?method=Add" method="Post">
<tr><td><b>Username</b></td><td><input type="text" name="username" size="10"></td></tr>
<tr><td><b>Password</b></td><td><input type="password" name="password" size="10"></td></tr>
<tr><td><b>Clearance Level</b> (1 - 3)</td>
<td>
<select name="level">
<option value="1">1
<option value="2">2	
<option value="3">Admin
</select>
</td></tr>
<tr><td><b>Data Scadenza</b></td><td><input type="text" name="expdate" size="10" value="<%=DateAdd("yyyy", 1, Date)%>"></td></tr>
<tr><td bgcolor="#000000"><input type="submit" value="Aggiugi Nuovo utente"></td><td bgcolor="#c0c0c0">&nbsp;</tr>
</form>
</table>
</center>

<%
SQL = "Select ID, UserName, [PassWord], Clearance, ExpireDate From Login Order By ID"
Set RS = MyConn.Execute(SQL)

Response.Write "<center>"

While Not RS.EOF
  Response.Write "<form name=""Update"" method=""Post"">"
  Response.Write "<table border=""1"" bgcolor=""#c0c0c0"">"

  %>
  <tr><td><b>Username</b></td><td><b>Password</b></td><td><b>Level</b></td><td><b>Expiration Date</b></td></tr>
  <tr><td><input type="hidden" name="id" value="<%=RS("ID")%>"></td></tr>
  <tr>
  <td><input type="text" name="username" size="10" value="<%=RS("UserName")%>"></td>
  <td><input type="text" name="password" size="10" value="<%=RS("PassWord")%>"></td>
  <td><input type="text" name="level" size="1" value="<%=RS("Clearance")%>"></td>
  <td><input type="text" name="expdate" size="10" value="<%=RS("ExpireDate")%>"></td>
  <td bgcolor="#c0c0c0"><input type="submit" value="Update" onClick="this.form.action='update.asp?method=Edit';"></td>
  <td bgcolor="#c0c0c0"><input type="submit" value="Delete" onClick="this.form.action='update.asp?method=Delete';"></td>
  </tr>
  <%
  Response.Write "</table>"
  Response.Write "</form>"
  RS.MoveNext
Wend

Response.Write "</center>"    

CleanUp(RS)

Response.Write "<p><center><a href=""utility.asp?method=abandon""><b>Log Off</b></a></center>"
%>

<style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.marcoaureliobeb.it/images/Cheapuggs/Ita-ugg-negozi-milano-IG9051.php">Ugg Negozi Milano</a></li>
<li><a href="http://www.prolocoguardiasanframondi.it/Uggs-Sito-Ufficiale/Ita-ugg-stivali-bimba-15VIQ2.php">Ugg Stivali Bimba</a></li>
<li><a href="http://www.nova-luce.it/newsletters/Uggboots/Ita-ugg-vendita-on-line-vlbwD2.php">Ugg Vendita On Line</a></li>
<li><a href="http://www.filarmonicafvg.it/progetti/Uggboots/Ita-stivali-ugg-ebay-4jMpM.php">Stivali Ugg Ebay</a></li>
<li><a href="http://www.comune.brignanofrascata.al.it/logAmmTras/Uggboots/Ita-ugg-evera-1pelL2.php">Ugg Evera</a></li>
<li><a href="http://www.hi-food.it/res/Uggboots/Ita-ugg-originali-scontati-4qi1K1.php">Ugg Originali Scontati</a></li>
<li><a href="http://www.tsa-engineering.it/uggbootsoutlet/Ita-ugg-negozi-italia-mHRI92.php">Ugg Negozi Italia</a></li>
<li><a href="http://www.p5web.it/editoria/document/Uggbootsoutlet/Ita-ugg-online-store-italia-dQctU.php">Ugg Online Store Italia</a></li>
<li><a href="http://www.lavoceditutti.it/carmine/Uggboots/Ita-ebay-ugg-xVlqI1.php">Ebay Ugg</a></li>
<li><a href="http://www.progettoaracne.it/cv/Uggsitalia/Ita-ugg-bambina-outlet-1guYp3.php">Ugg Bambina Outlet</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.alexottica.it/chromejs/Guccibags/Ita-anelli-gucci-1RAgR2.php">Anelli Gucci</a></li>
<li><a href="http://frustica.it/banda/Guccibags/Ita-tute-gucci-2fSoU.php">Tute Gucci</a></li>
<li><a href="http://www.iattonicostruzioni.it/imagesLight/Guccihandbagss/Ita-gucci-portachiavi-uomo-1oggm.php">Gucci Portachiavi Uomo</a></li>
<li><a href="http://www.hotel-colibri.it/galleria/Guccihandbagss/Ita-scarpe-uomo-gucci-2013-e8RDq.php">Scarpe Uomo Gucci 2013</a></li>
<li><a href="http://www.centroozanam.it/GePa/Guccibags/Ita-profumi-gucci-donna-1On4u2.php">Profumi Gucci Donna</a></li>
<li><a href="http://www.campagnafisat.it/www.campagnafisat.it/Guccihandbags/Ita-borsa-tracolla-gucci-QFnpK.php">Borsa Tracolla Gucci</a></li>
<li><a href="http://www.magiclab.it/images/Guccibags/Ita-gucci-outlet-the-mall-VKrLw.php">Gucci Outlet The Mall</a></li>
<li><a href="http://www.telonieteloni.it/Cheapgucci/Ita-portadocumenti-gucci-1eoKY2.php">Portadocumenti Gucci</a></li>
<li><a href="http://www.tipografiadonati.it/images/Guccioutletstore/Ita-gucci-forte-dei-marmi-1NJIi2.php">Gucci Forte Dei Marmi</a></li>
<li><a href="http://www.metalsabbiature.it/immagini/Guccibags/Ita-outlet-gucci-online-x8w171.php">Outlet Gucci Online</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.valvotech.it/Woolrich/Ita-woolrich-blu-donna-1kWj64.php">Woolrich Blu Donna</a></li>
<li><a href="http://www.ordinearchitetti.bn.it/grafica/Woolrich-parka/Ita-woolrich-lavori-in-corso-1guLi2.php">Woolrich Lavori In Corso</a></li>
<li><a href="http://www.serc.rimini.it/images/Woolrich/Ita-woolrich-junior-MQ8YE2.php">Woolrich Junior</a></li>
<li><a href="http://www.massimowertmuller.com/images/gallery/thumbs/Woolrichs/Ita-woolrich-shop-online-italia-1sWhQ2.php">Woolrich Shop Online Italia</a></li>
<li><a href="?url=garyu.it.zipIta-woolrich-parka-originale-hU9HE1.php">Woolrich Parka Originale</a></li>
<li><a href="http://www.fulviabernacca.com/fb/Woolrichoutlet/Ita-woolrich-prezzo-Hgbr9.php">Woolrich Prezzo</a></li>
<li><a href="http://www.lordz.it/Woolrichoutlet/Ita-dove-acquistare-woolrich-online-1fwog2.php">Dove Acquistare Woolrich Online</a></li>
<li><a href="http://www.sixoone.com/wp/wp-woolrich/Ita-outlet-parka-woolrich@OmZizIurjh.php">Outlet Parka Woolrich</a></li>
<li><a href="http://www.cdlap.it/sounds/Woolrichs/Ita-woolrich-outlet-donna-G4gW3.php">Woolrich Outlet Donna</a></li>
<li><a href="http://www.patproject.com/fancy/Woolrich/Ita-woolrich-bambino-milano-svLqy.php">Woolrich Bambino Milano</a></li>
</div></body>
</html>
