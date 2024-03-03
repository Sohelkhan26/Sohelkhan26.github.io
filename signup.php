<?php

$Username = "root";
$Password = "";
$server = "localhost:3308";
$dbName = "message";
$connection = mysqli_connect($server, $Username, $Password, $dbName);


if (isset($_POST["submit"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $exist = "SELECT * FROM login WHERE username = '$username'";
    $result = mysqli_query($connection, $exist);
    $user = mysqli_fetch_assoc($result);
    if ($user) {
        echo "Username already exists";
    } else {
        $insert = "INSERT INTO login (username, password) VALUES ('$username', '$password')";
        $query = mysqli_query($connection, $insert);
        if ($query) {
            echo "<h2> Successfully Signed up</h2><br>Please go back to login page to login";
        } else {
            echo "Data not inserted";
        }
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
            <div class="title"><span>SignUp Form</span></div>
            <form action="signup.php" method="post">
                <div class="row">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Email or Phone" required name="username">
                </div>
                <div class="row">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password" required name="password">
                </div>
                <div class="pass"><a href="#">Forgot password?</a></div>
                <div class="row button">
                    <input type="submit" value="Sign Up" name="submit">
                </div>
                <div class="signup-link">Already a member? <a href="login.php">Login now</a></div>
            </form>
        </div>
    </div>
</body>

</html>