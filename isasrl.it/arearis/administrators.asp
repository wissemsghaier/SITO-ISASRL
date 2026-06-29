<%@LANGUAGE = VBScript%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali s.r.l.</title>

<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />
<!-- #INCLUDE file="..\public\adovbs.inc" -->


<%

response.buffer=TRUE
RESPONSE.EXPIRES=-10000

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
<%end if%>			
					</td>
				   </tr>
      					<tr>
					        <td width="164" height="17"></td>
  					    </tr>
    				</table>

				</td>
			  <td valign="top">

<div class="titolo2"> Benvenuto <%=response.write(session("user"))%></div>
<%if len(session("ultacc")) > 0 then%>
<div class="titolo2"> Ultimo accesso <%=response.write(session("ultacc"))%></div>
<%end if%>
<%if session("resetpwd") = 1 then%>
<div class="titolo2"> <span class="testo-link1">E' richiesto un cambio password per poter usufruire dell'area riservata </span><br /> 
  <a href="administrators-ute.asp?mode=newpass" class="testo-link1">Cambia password</a></div>
<%end if%>
<div align="LEFT" class="titolo2">Accedi a <a href="http://www.isacomputers.it?mode=ADMIN">WWW.ISACOMPUTERS.IT</a></div>

				</td>
  			</tr>
		</table>


  <tr>
    <td height="500">&nbsp;</td>
</tr>
</table>



</body>
</html>