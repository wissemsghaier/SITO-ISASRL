
function initMenu() {
  $('#menu ul').hide();
  $('#menu li a').click(
    function() {
        $(this).next().slideToggle('normal');	
      }
    );
  }
$(document).ready(function() {initMenu();});


function WinWebInteractive(lnk,xpos,ypos,larg,alt) {
		window.open(lnk,'',"toolbar=no,location=no,scrollbars=0,resizable=0,width="+larg+",height="+alt+",top="+ypos+",left="+xpos);
}
