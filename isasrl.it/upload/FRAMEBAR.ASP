<%@EnableSessionState=False%>
<% Response.Expires = -1 %>

<HTML>
<HEAD>
<TITLE>sto caricando...</TITLE>
<style type='text/css'>td {font-family:arial; font-size: 9pt }</style>
</HEAD>

<% If Request("b") = "IE" Then %> <!-- Internet Explorer -->
<BODY BGCOLOR="#23f1fe">
<IFRAME src="bar.asp?PID=<%= Request("PID") & "&to=" & Request("to") %>" title="Caricamento in corso..." noresize scrolling=no
frameborder=0 framespacing=10 width=369 height=65></IFRAME>

</BODY>

<%Else%> <!-- Netscape Navigator etc ... -->

<FRAMESET ROWS="65%, 35%" COLS="100%" border="0" framespacing="0" frameborder="NO">
<FRAME SRC="BAR.ASP?PID=<%= Request("PID") & "&to=" & Request("to") %>" noresize scrolling="NO" frameborder="NO" name="sp_body">
<FRAME SRC="NOTE.HTM" noresize scrolling="NO" frameborder="NO" name="sp_note">
</FRAMESET><noframes></noframes>

<%End If%>

</HTML>
