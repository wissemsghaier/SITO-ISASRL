<% 
If session("allow") = False Then Response.Redirect "..\public\lista.asp"
If session("clearance") < 1 Then Response.Redirect "utility.asp?method=unauthorized"
%>
