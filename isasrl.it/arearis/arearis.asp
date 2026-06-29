<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ISA Informatica Soluzioni Aziendali</title>

<html>

<head>


<script language="JavaScript">
function Check(){
       	    var formDOMObj = document.F1;
			var user= formDOMObj.userid.value;
			var pwd= formDOMObj.password.value;


			if (user.length == 0)
			{
				alert("Il campo User id deve essere valorizzato.");
				return false
			}
			else
			if (pwd.length == 0 )
			{
				alert("Il campo Password deve essere valorizzato.");
				return false
			}
			else
				return true
}
</script>
<style>

input, text-area, select {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #333333;
}
form {
	padding: 0px;
	margin: 0px;
}
a:link, a:visited {
	color: #2671fe;
	text-decoration: underline;
}
a:hover {
	color: #990000;
	text-decoration: none;
}

</style>

</head>


<body>

<table width="0" border="0" align="center">
  <tr>
    <td height="85">&nbsp;</td>
  </tr>
  <tr>
    <td>

<form name="F1" method="post" action="login.asp" >


<table width="650"  height="236" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E4E4">
  <tr>
    <td colspan="3" height="53" bgcolor="#8BEAFE"><div align="center"><span style="font-variant: small-caps; font-size:24px; color:#999999">ISA Informatica Soluzioni Aziendali</span></div></td>
    </tr>
  <tr>
    <td width="15%" height="153">&nbsp;</td>
    <td width="254" align="center" valign="middle" bgcolor="#FFFFFF">

	<table width="452"  border="0"  align="center" cellpadding="0" cellspacing="0">
		  <tr>
            <td align="center">
			<br>
			</td>
          </tr>
    	  <tr>
            <td width="41%" align="right"><span style="font-variant: small-caps; color:#999999">User ID </span></td>
            <td width="1%" align="center">&nbsp;</td>
            <td width="58%" align="left">&nbsp;<input name="userid"  type="text" size="18" maxlength="18" ></td>
          </tr>
          <tr>
            <td align="right"><span style="font-variant: small-caps; color:#999999">Password</span></td>
            <td align="center">&nbsp;</td>
            <td align="left">&nbsp;<input  name="password"  type="password" size="18" maxlength="18" ></td>
          </tr>
		  <tr>
            <td align="center">
				<br>
			</td>
          </tr>

          <tr>
            <td height="38" align="right" valign="top"><span style="font-variant: small-caps; color:#999999">
              <input  type="submit" name="invia" onclick="return Check();" value=" Entra ">
            </span></td>
            <td colspan="2" align="center" valign="top">
              <div style="font-variant: small-caps; color:#f51e1e; font-size:: 8px;" ><%response.write(session("Mess"))%></div>
            </td>
          </tr>
          <tr>
            <td colspan="3"><div align="center" class="sfondo-cella"><a href="..\default.htm">Home Page</a></div>
            <div align="center" class="sfondo-cella"><a href="..\isaold\default.htm">Vecchio sito</a></div>
            </td>
          </tr>

      </table></td>
    <td width="15%">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="3" height="53" bgcolor="#8BEAFE"><div align="center"><span style="font-variant: small-caps; font-size:24px; color:#999999">Riservato al personale interno</span></div></td>
    </tr>
  <tr>
</table>
</form>

</td>
  </tr>
  <tr>
    <td height="9" ></td>
  </tr>
</table>
<script>
document.F1.userid.focus();
</script>
<% session("Mess")=""
   session("HTTP") = ""
   cProva = Request.ServerVariables("SCRIPT_NAME")
   nAt = InStrRev(cProva, "/")
   cDef = Mid(cProva, nAt+1)
   session("HTTP") = cDef
%>

</body>
</html>
