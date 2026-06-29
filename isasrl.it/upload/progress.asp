<HTML>
<HEAD>
<TITLE>Upload File</TITLE>

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
      winstyle = "dialogWidth=385px; dialogHeight:140px; center:yes";
      window.showModelessDialog('<% = barref %>&b=IE',null,winstyle);
    }
    else
    {
      window.open('<% = barref %>&b=NN','','width=375,height=115', true);
    }
  }
  return true;
}
</SCRIPT> 

</HEAD>
<BODY>

<h3>Selezionare i file da inviare e premere Invia</h3>

	<FORM NAME="MyForm" METHOD="POST" ENCTYPE="multipart/form-data" 
		ACTION="progress_upload.asp?<% = PID %>"
		OnSubmit="return ShowProgress();"> 
		<INPUT TYPE="FILE" SIZE="40" NAME="FILE1"><BR> 
		<INPUT TYPE="FILE" SIZE="40" NAME="FILE2"><BR> 
		<INPUT TYPE="FILE" SIZE="40" NAME="FILE3"><BR> 
	<INPUT TYPE=SUBMIT VALUE="Invia!">
	</FORM>

</BODY>
</HTML>
