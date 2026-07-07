<%@LANGUAGE = VBScript%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali</title>

<link href="../public/Stile01.css" rel="stylesheet" type="text/css" />





<%

if (session("HTTP") <> "login.asp" and session("HTTP") <> "administrators.asp" and session("HTTP") <> "utente.asp" and session("HTTP") <> "guestftp.asp" ) then
    session("Mess")="Errore della sessione"
	response.redirect("../arearis/arearis.asp")
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

<%
Set UploadProgress = Server.CreateObject("Persits.UploadProgress")
PID = "PID=" & UploadProgress.CreateProgressID()
barref = "framebar.asp?to=10&" & PID
%>

<SCRIPT LANGUAGE="JavaScript">
function ShowProgress()
{
  strAppVersion = navigator.appVersion;
  if (document.MyForm.FILE1.value != "" || document.MyForm.FILE2.value != "" || document.MyForm.FILE3.value != "")
  {
    if (strAppVersion.indexOf('MSIE') != -1 && strAppVersion.substr(strAppVersion.indexOf('MSIE')+5,1) > 4)
    {
      winstyle = "dialogWidth=385px; dialogHeight:50px; center:yes";
      window.showModelessDialog('<% = barref %>&b=IE',null,winstyle);
    }
    else
    {
      window.open('<% = barref %>&b=NN','','width=375,height=50', true);
    }
  }
  return true;
}
</SCRIPT> 


</head>
<body>



<table border="0" align="center" cellpadding="0" cellspacing="0"  width="750" bgcolor="#ffffff">
  <tr>
    <td>


	</td>
   </tr>
  <tr>
    <td>

	<table border="0" cellpadding="0" cellspacing="0" width="750" BGCOLOR="#FFFFFF" >
  		<tr>
   		 <td width="168" align="center" valign="middle"  height="171" ><img src="../images/Logo_Isa_Srl.png" width="170" height="94"></td>
<% if session("HTTP") = "administrators.asp" THEN%>          
   		<td width="582" align="center" valign="middle" class="titolo3">Pannello di controllo - Amministrazione</td>
<% else %>      
   		<td width="582" align="center" valign="middle" class="titolo3">Pannello di controllo - Utente</td>
<%end if%>   
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
<% if session("HTTP") = "administrators.asp" THEN%>  
            <div class="spaziatore"></div>
			<div class="menu-azzurro"><a href="../arearis/Administrators-ute.asp?mode=legute">Utenze</a></div>            
			<div class="menu-azzurro"><a href="../arearis/Administrators-cons.asp?mode=legcons">Consegne</a></div>
            <div class="spaziatore"></div>
			<div class="menu-verde"><a href="../arearis/Administrators-ute.asp?mode=verute">Modifica Utenza</a></div>
            <div class="menu-verde"><a href="../arearis/Administrators-cons.asp?mode=vercons">Modifica Consegna</a></div>
            <div class="spaziatore"></div>
			<div class="menu-giallo"><a href="../arearis/Administrators-ute.asp?mode=insute">Crea Utenza</a></div>
       		<div class="menu-giallo"><a href="../arearis/Administrators-cons.asp?mode=inscons">Crea Consegna</a></div>
 	 		<div class="spaziatore"></div>                        
            <div class="menu-rosso-rosa"><a href="../FILES/lista.asp">Lista file</a></div>
			<div class="menu-rosso-rosa"><a href="inizia.asp">Upload</a></div>
			<div class="menu-rosso-rosa"><a href="../FILES/MANUALI65/LISTA.asp">Manuali AHR 65</a></div> 	 		
			<div class="spaziatore"></div>                                                   
            <div class="menu-arancione"><a href="../arearis/Administrators-ute.asp?mode=newpass">Cambio Password</a></div>
			<div class="menu-arancione"><a href="../arearis/log-accessi.asp">Log Accessi</a></div>	
            <div class="spaziatore"></div>         
			<div class="menu-gestione"><a href="../FILES/Livecare_Internet_Agent_6937.exe">LiveCare Agent</a></div>  
            <div class="menu-gestione"><a href="../arearis/logout.asp">Chiudi Gestione</a></div>
            <div class="spaziatore"></div>
<% else %>   
<% if session("HTTP") = "utente.asp" THEN%>         
            <div class="spaziatore"></div>
			<div class="menu-azzurro"><a href="../arearis/utente.asp?mode=legcons">Consegne</a></div>
            <div class="spaziatore"></div>
			<div class="menu-verde"><a href="inizia.asp">Upload</a></div>
 	 		<div class="spaziatore"></div>     			
			<div class="menu-rosso-rosa"><a href="../FILES/MANUALI65/LISTA.asp">Manuali AHR 65</a></div>			
 	 		<div class="spaziatore"></div>                        
            <div class="menu-arancione"><a href="../arearis/utente.asp?mode=newpass">Cambio Password</a></div>
            <div class="spaziatore"></div>                                  
            <div class="menu-gestione"><a href="../arearis/logout.asp">Chiudi Gestione</a></div>
            <div class="spaziatore"></div>
<% else %>              
            <div class="spaziatore"></div>
			<div class="menu-verde"><a href="inizia.asp">Upload</a></div>
 	 		<div class="spaziatore"></div>                        
            <div class="menu-gestione"><a href="../arearis/logout.asp">Chiudi Gestione</a></div>
            <div class="spaziatore"></div>		
<%end if%>  
<%end if%>             
					</td>
				   </tr>
      					<tr>
					        <td width="164" height="17"></td>
  					    </tr>
    				</table>

				</td>
			  <td valign="top">
    
    <Div class="titolo-news" >Upload File</Div>    
	<div align="center"><center>              
    <FORM NAME="MyForm" METHOD="POST" ENCTYPE="multipart/form-data" ACTION="progress_upload.asp?<% = PID %>" OnSubmit="return ShowProgress();"> 
	<table border="0" width="585" BGCOLOR="#2671fe" cellpadding="0">
			  <tr>
				    <td width="20%"  class="titolo-news-blu-r" align="right">Allega file 1:</td>
	    			<td width="80%" align="left"><input name="FILE1" type="file" size='70'></input></td>
  			</tr>
			  <tr>
				    <td width="20%"  class="titolo-news-blu-r" align="right">Allega file 2:</td>
	    			<td width="80%" align="left"><input name="FILE2" type="file" size='70'></input></td>
  			</tr>
			  <tr>
				    <td width="20%"  class="titolo-news-blu-r" align="right">Allega file 3:</td>
	    			<td width="80%" align="left"><input name="FILE3" type="file" size='70'></input></td>
	  			</tr>
		</table><br>
	<INPUT TYPE=SUBMIT VALUE="Invia!">
	</FORM>
    </center>
</div>

				</td>
  			</tr>
		</table>

  <tr>
    <td height="500">&nbsp;</td>
</tr>
</table>
<script>
document.MyForm.FILE1.focus();
</script>


</body>
</html>






