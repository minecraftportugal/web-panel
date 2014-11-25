<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
 <meta name="language" content="de" />
 <meta name="author" content="Valentin Manthei - lightIRC.com" />
 <title></title>
 <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
 <script type="text/javascript" src="/scripts/irc.js"></script>
 <script type="text/javascript" src="/scripts/jquery.js"></script>
 <script type="text/javascript" src="/scripts/frames.js"></script>
 <script type="text/javascript" src="/scripts/sop.js"></script>
 <style type="text/css">
    html { height: 100%; overflow: hidden; }
    body {
      background: linear-gradient(to bottom, #050505, #252525);
      height:100%;
      margin:0;
      padding:0;
      font-family: Helvetica, Arial; 
      color: #ddd;
    }
    div#buttons {
     position: absolute;
     top: 10px;
     right: 10px;
     font-size: 30px;
    }
    a {
     color: #ddd;
     text-decoration: none;
    }


 </style>
<script type="text/javascript">
$(function() {
    $("div#buttons").click(function() {
        parent.toggleChat();
    });
});
</script>
</head>

<body>
 <div id="lightIRC" style="height:100%; text-align:center;">
  <p><a href="//www.adobe.com/go/getflashplayer"><img src="//www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>
 </div>
<!-- <div id="buttons">
 <a id="close" href="#">×</a>
 </div>
 -->

 <!--
 <?= var_dump($player); ?>

 -->
 <script type="text/javascript">
    params.realname = "Minecraftia User: <?=$_SESSION['username']?>";
    params.wmode = "transparent";

  <? if ($player['ircnickname'] != NULL): ?>
    params.nick = "<?=$player['ircnickname']?>";
    params.identifyPassword = "<?=$player['ircpassword']?>";
    params.ident = "<?=dechex(ip2long($_SERVER['REMOTE_ADDR']))?>X";
  <? else: ?>
    params.nick = "<?=$_SESSION['username']?>";
    params.nickAlternate = "<?=$_SESSION['username']?>_";
    params.ident = "<?=dechex(ip2long($_SERVER['REMOTE_ADDR']))?>O";
    params.identifyMessage = "NickServ:Nick registado e protegido";
  <? endif; ?>

  <? if ($player['ircauto'] != 1): ?>
    params.showNickSelection = "true";
  <? else: ?>
    params.showNickSelection = "false";
  <? endif; ?>
    console.log(params);

    swfobject.embedSWF("<?= LIGHTIRC_PATH ?>", "lightIRC", "100%", "100%", "10.0.0", "expressInstall.swf", params, {wmode:"transparent"});
 </script>
</body>
</html>
