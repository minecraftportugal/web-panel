<?php
require('../config.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
 <meta name="language" content="de" />
 <meta name="author" content="Valentin Manthei - lightIRC.com" />
 <title>Minecraftia.PT! Webchat: PTnet</title>
 <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
 <script type="text/javascript" src="config.js"></script>
 <script type="text/javascript" src="/scripts/jquery.js"></script>
 <style type="text/css">
    html { height: 100%; overflow: hidden; }
    body { 
      background: #000 url('../images/backgrounds/register/<?= rand(1,5) ?>.png');
      height:100%;
      margin:0;
      padding:0;
      font-family: Helvetica, Arial; 
      color: #ddd;
    }
    div#parent {
      background: rgba(0,0,0,0.5);
    }
    div#parent,div#lightIRC {
     height:100%; text-align:center;
    }

    a {
     color: #ddd;
     text-decoration: none;
    }


 </style>
</head>

<body>
 <div id="parent">
 <div id="lightIRC" style="">
  <p><a href="//www.adobe.com/go/getflashplayer"><img src="//www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>
 </div>
 </div>

 <script type="text/javascript">
    params.ident = "<?=dechex(ip2long($_SERVER['REMOTE_ADDR']))?>W";
    params.identifyMessage = "NickServ:Nick registado e protegido";

    swfobject.embedSWF("<?= $cfg_lightirc_path ?>", "lightIRC", "100%", "100%", "10.0.0", "expressInstall.swf", params, {wmode:"transparent"});
 </script>
</body>
</html>
