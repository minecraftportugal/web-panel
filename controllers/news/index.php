<?
require_once('lib/sessions.php');

function news_index() {

    validateSession();

    require('templates/news/index.php');
}

?>