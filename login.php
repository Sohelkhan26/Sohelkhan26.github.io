<?php

$username = "root";
$password = "";
$server = "localhost:3308";
$dbName = "message";
$connection = mysqli_connect($server, $username, $password, $dbName);
if (isset($_POST["submit"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $exist = "SELECT * FROM login WHERE username = '$username' and password = '$password'";
    $result = mysqli_query($connection, $exist);
    $user = mysqli_fetch_assoc($result);
    if ($user) {
        echo "<h3 style='margin-left: 45%; margin-top: 30px;'>Login Successful</h3>";
    } else {
        echo "<h3 style='margin-left: 40%; margin-top: 30px;'>Username or Password is incorrect.</h3>";
    }
}

?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>Login</title>

    <script src="https://kit.fontawesome.com/36190af118.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <div class="wrapper">
            <div class="title"><span>Login Form</span></div>
            <form action="login.php" method="post">
                <div class="row">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Username" required name="username">
                </div>
                <div class="row">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password" required name="password">
                </div>
                <div class="pass"><a href="login.php">Forgot password?</a></div>
                <div class="row button">
                    <input type="submit" value="Login" name="submit">
                </div>
                <div class="signup-link">Not a member? <a href="signup.php">Signup now</a></div>
            </form>
        </div>
    </div>
</body>

</html>