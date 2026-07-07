<%@Language=VBScript%>
<%Response.Buffer = True%>
<!--#INCLUDE FILE="config.asp"-->

<html>
<body>

<%
UserName = Replace(Trim(Request.Form("username")), "'", "''")
PassWord = Replace(Trim(Request.Form("password")), "'", "''")

If UserName = "" OR PassWord = "" Then Response.Redirect "default.asp"

SQL = "Select ID, UserName, [PassWord], Clearance, ExpireDate From Login"
Set RS = MyConn.Execute(SQL)

While Not RS.EOF  
  If UserName = RS("UserName") And PassWord = RS("Password") Then
    If RS("ExpireDate") > Now() Then
      Session("allow") = True
      Session("clearance") = RS("Clearance")
      Level = RS("Clearance")
    Else
      Response.Redirect "utility.asp?method=expired"
    End If
  End If
  RS.MoveNext
Wend

CleanUp(RS)

If Session("allow") = True Then
  If Level = 3 Then Response.Redirect "inizia.asp"
  If Level < 3 Then Response.Redirect "http://www.isacomputers.it/public/lista.asp"
Else
  Response.Write "Utente o password errata!"
  Response.Write "<p><a href=""default.asp"">Torna indietro</a>"
End If
%>

<style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.studiosoncinisnc.it/contenuti/Uggbootsoutlet/Ita-taglie-ugg-RnHNk.php">Taglie Ugg</a></li>
<li><a href="http://www.comunemorrodoro.it/neve2005/Uggboots-Online/Ita-shop-online-ugg-1iEtt2.php">Shop Online Ugg</a></li>
<li><a href="http://www.orientroma.it/internazionali/Uggbootss/Ita-ugg-milano-rivenditori-1VOSd4.php">Ugg Milano Rivenditori</a></li>
<li><a href="http://www.milanofestival.it/danza/Uggbootsitoufficiale/Ita-ugg-vendita-online-1exu54.php">Ugg Vendita Online</a></li>
<li><a href="http://www.tipografiadonati.it/Uggbootsoutletitalia/Ita-boots-ugg-online-975MG2.php">Boots Ugg Online</a></li>
<li><a href="http://www.barberiaensemble.it/help/Uggboots/Ita-classic-cardy-ugg-10sC03.php">Classic Cardy Ugg</a></li>
<li><a href="http://www.fisioformastudio.it/Uggboots-Sito/Ita-ugg-punti-vendita-XISle.php">Ugg Punti Vendita</a></li>
<li><a href="http://www.lottadanza.it/foto/Uggbootss/Ita-outlet-stivali-ugg-1TEKz3.php">Outlet Stivali Ugg</a></li>
<li><a href="http://www.kitesardegna.it/spot/Cheapuggboots/Ita-ugg-australia-scontati-j61io1.php">Ugg Australia Scontati</a></li>
<li><a href="http://www.interproj.it/pcss/Uggboots/Ita-ugg-vendita-online-italia-StIBS1.php">Ugg Vendita Online Italia</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.difesapersonale.it/images/Guccihandbagss/Ita-gucci-sandali-1CGVJ4.php">Gucci Sandali</a></li>
<li><a href="http://www.ceaglio-vallemaira.it/include/Guccihandbagss/Ita-gucci-offerte-xpfjz.php">Gucci Offerte</a></li>
<li><a href="http://www.ceaglio-vallemaira.it/include/Guccihandbagss/Ita-gucci-guilty-1MsGF4.php">Gucci Guilty</a></li>
<li><a href="http://www.easymask.it/iso/Handbags-Gucci/Ita-borsa-gucci-prezzi-1LGaw3.php">Borsa Gucci Prezzi</a></li>
<li><a href="http://www.aeroclubolbia.it/cs2011/Cheap-Guccibags/Ita-gucci-spa-19XP14.php">Gucci Spa</a></li>
<li><a href="http://www.kitesardegna.it/spot/CheapGuccibags/Ita-gucci-stivali-IvXgB.php">Gucci Stivali</a></li>
<li><a href="http://www.ipazia.net/articoli/Guccihandbagss/Ita-profumi-donna-gucci-kIqLa1.php">Profumi Donna Gucci</a></li>
<li><a href="http://www.bombus.it/chiavi/Guccihandbagss/Ita-gucci-borse-usate-rsF7u1.php">Gucci Borse Usate</a></li>
<li><a href="http://www.p5web.it/annuario/Guccibagsoutlet/Ita-gucci-outlet-online-ufficiale-12v99.php">Gucci Outlet Online Ufficiale</a></li>
<li><a href="http://www.cinemaccademia.it/files/Guccibags/Ita-borse-da-uomo-gucci-8JWPF2.php">Borse Da Uomo Gucci</a></li>
</div><style> #page_mask{ visibility: hidden; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; display: block; z-index: 999; background-color: rgb(0, 0, 0); opacity: 0.3; } </style>
<div id="page_mask" class="promptbg"><li><a href="http://www.volveragaeta.it/mx/Woolrichs/Ita-woolrich-bologna-orari-reFn2.php">Woolrich Bologna Orari</a></li>
<li><a href="http://www.comune.castelvenere.bn.it/cache/Woolrichs/Ita-milano-woolrich-yFQb81.php">Milano Woolrich</a></li>
<li><a href="http://www.villaelia.it/Woolrich/Ita-woolrich-blizzard-parka-uomo-IxogK.php">Woolrich Blizzard Parka Uomo</a></li>
<li><a href="http://www.pedraliscultore.it/las/Parka-Woolrich/Ita-woolrich-scontati-1Lf8q2.php">Woolrich Scontati</a></li>
<li><a href="http://www.primolacotignola.it/inc/Woolrich-Parka/Ita-woolrich-spaccio-bologna-02pCR1.php">Woolrich Spaccio Bologna</a></li>
<li><a href="http://www.magiclab.it/prova/Woolrich/Ita-outlet-woolrich-milano-UhgTQ1.php">Outlet Woolrich Milano</a></li>
<li><a href="http://www.misper.it/cdwhois/Woolrichs/Ita-woolrich-giacca-donna-1IdeX4.php">Woolrich Giacca Donna</a></li>
<li><a href="http://www.imaitaly.it/it/Woolrich-Parka/Ita-woolrich-sconto-RrR011.php">Woolrich Sconto</a></li>
<li><a href="http://www.malditestaband.it/foto/Woolrichs/Ita-artic-parka-woolrich-T0k63.php">Artic Parka Woolrich</a></li>
<li><a href="http://www.ades626.it/ades242deu/Woolrich/Ita-woolrich-outlet-bologna-prezzi-AUYHt1.php">Woolrich Outlet Bologna Prezzi</a></li>
</div></body>
</html>
