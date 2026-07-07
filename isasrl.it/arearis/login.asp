<!-- #INCLUDE file="..\public\adovbs.inc" -->
<!--#include file="md5.asp"-->
<%

response.buffer=TRUE
RESPONSE.EXPIRES=-10000

cuser     = request.form("userid")
cpass     = md5(request.form("password"))

if (session("HTTP") <> "arearis.asp") or _
	Instr(cuser," ") or Instr(cuser,"&") or _
	Instr(cuser,"/") or Instr(cuser,"\") or _
	Instr(cuser,"%") or Instr(cuser,"$") or _
	Instr(cuser,"+") or Instr(cuser,"-") then
	if Instr(cuser," ") or Instr(cuser,"&") or _
		Instr(cuser,"/") or Instr(cuser,"\") or _
		Instr(cuser,"+") or Instr(cuser,"-") then
  		session("Mess") = "I caratteri speciali sono vietati"
	else
	  	session("Mess") = "Errore di sessione, si prega di riprovare"
	end if
	response.redirect("arearis.asp")
else


dim MyConn

DataBaseName =   "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" & Server.MapPath("..\mdb-database") & "\DATI.mdb"
TableName =      "SECURITY"

set Connection = server.CreateObject("ADODB.Connection")
Connection.open (DataBaseName)
set rs = Server.CreateObject("ADODB.Recordset")
rs.CursorType=adOpenStatic

		  Str_Browse_cerca = "SELECT * FROM security  WHERE userr=" & "'" & cuser & "'"

	      rs.Open Str_Browse_cerca, Connection

          Response.write(rs.EOF)
		  Response.write(Str_Browse_cerca)

			  'Utente inesistente
			  if rs.EOF and rs.BOF then
			  		'Riporto nel file di log l'informazione
					set fso=Server.CreateObject("Scripting.FileSystemObject")
					set fi=fso.OpenTextFile(Server.MapPath("../public/log.txt"),8,true)
					fi.WriteLine( cuser & " --> " & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & " --> FAILED (USER NON TROVATA)")
					fi.Close
					set fi=Nothing
				    set fso=Nothing
					Connection.close
					set Connection = nothing
				    
					session("Mess") = "Utente sconosciuto, verificare Userid e Password"
					response.Redirect("arearis.asp")
					
			  else 'utente esistente
			  		if StrComp(rs("userr"),cuser,0)=0 then
						if rs("ntent") > 0 then 'se l'utente ha ancora a disposizione tentativi per loggare

							'Se la password è errata
							if StrComp(cpass , rs("pass"),0) <> 0 then

								'Riporto nel file di log l'informazione
								set fso=Server.CreateObject("Scripting.FileSystemObject")
								set fi=fso.OpenTextFile(Server.MapPath("../public/log.txt"),8,true)
								fi.WriteLine( cuser & " --> " & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & " --> FAILED (PASSWORD ERRATA)")
								fi.Close
								set fi=Nothing
								set fso=Nothing

								'Decremento il numero tentativi a disposizione dell'utente
								 Connection.close
								 set Connection = nothing

								 set Connection = server.CreateObject("ADODB.Connection")
								 Connection.open (DataBaseName)

								 strsql= "update " & TableName & " set ntent=ntent - 1" & _
								 " WHERE userr=" & "'" & cuser & "'"

								 CONNECTION.Execute (StrSql)
								 Connection.close
								 set Connection = nothing								 
									
								 session("Mess") = "Utente sconosciuto, verificare Userid e Password"
								 response.Redirect("arearis.asp")
							else 'utente esistente e password corretta

 								 'Riporto nel file di log l'informazione
								 set fso=Server.CreateObject("Scripting.FileSystemObject")
								 set fi=fso.OpenTextFile(Server.MapPath("../public/log.txt"),8,true)
								 fi.WriteLine( cuser & " --> " & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & " --> SUCCESSED")
								 fi.Close
								 set fi=Nothing
								 set fso=Nothing

								 session("Mess") = ""
								 session("HTTP") = ""
								 cProva = Request.ServerVariables("SCRIPT_NAME")
								 nAt = InStrRev(cProva, "/")
								 cDef = Mid(cProva, nAt+1)
								 session("HTTP") = cDef
								 session("pass") = cpass
								 session("user") = cuser
								 session("livello") = rs("livello")
								 session("ultacc") = rs("ultacc")
								 session("resetpwd")= rs("resetpwd")

								 Connection.close
								 set Connection = nothing

								 set Connection = server.CreateObject("ADODB.Connection")
								 Connection.open (DataBaseName)

								 strsql = "update " & TableName & " set ultacc='" &_
								 Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & "', naccessi=naccessi + 1 ," &_
								 "ntent = 5 " &_
								 " WHERE pass=" & "'" & cpass & "'"& _
								 " AND  userr=" & "'" & cuser & "'"

								 CONNECTION.Execute (StrSql)
								 Connection.close
								 set Connection = nothing

							    if session("livello") = 1 then						 
									response.Redirect("administrators.asp")
								else
									response.Redirect("utente.asp")
								end if
							end if
						else
							'Riporto nel file di log l'informazione
							set fso=Server.CreateObject("Scripting.FileSystemObject")
							set fi=fso.OpenTextFile(Server.MapPath("../public/log.txt"),8,true)
							fi.WriteLine( cuser & " --> " & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & " --> FAILED (USER REVOCATA)")
							fi.Close
							set fi=Nothing
							set fso=Nothing
							Connection.close
							set Connection = nothing

							Session("Mess") = "L'utente inserito non ha piu' tentativi a disposizione"
  							response.Redirect("arearis.asp")
						end if
					else
						'Riporto nel file di log l'informazione
						set fso=Server.CreateObject("Scripting.FileSystemObject")
						set fi=fso.OpenTextFile(Server.MapPath("../public/log.txt"),8,true)
						fi.WriteLine( cuser & " --> " & Request.ServerVariables("REMOTE_ADDR") & " - " & date() & " - " & time() & " --> FAILED (VERIFICARE CASE SENSITIVE)")
						fi.Close
						set fi=Nothing
						set fso=Nothing
						Connection.close
						set Connection = nothing

						Session("Mess") = "Utente sconosciuto, verificare Userid* e Password"
						response.Redirect("arearis.asp")
				    end if
			  end if

end if

%>