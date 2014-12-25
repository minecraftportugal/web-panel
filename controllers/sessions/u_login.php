<?

use lib\session\Session;
use lib\environment\Environment;
use models\log\LogModel;
use helpers\notice\NoticeHelper;

function u_login() {

    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $valid = Session::validateLogin($username, $password);

    if ($valid) {

        LogModel::create('login', Session::get('id'), Environment::get('REMOTE_ADDR'), "");

        header('Location: /');

    } else {

        LogModel::create('failed_login', null, Environment::get('REMOTE_ADDR'), "Username: $username, Password: $password");

        NoticeHelper::set('error', 'username/password inválidos');

        header('Location: /login');


    }
}

?>