<?
require_once('config.php');
require_once('lib/sessions.php');
require_once('lib/i18n.php');

function sessions_configure () {

  validateSession();
  validateXSRFToken();

  $delete = isset($_POST['delete']) ? $_POST['delete'] : array();

  $status = sessionsConfigure($delete);
  if (!$status) {
    header("Location: /admin#sessions");
  } else {
    header("Location: /admin#sessions");
  }
}

?>