<html>
    <head>
        <title>PHP file_get_contents</title>
        <style>
            body {
                font-family: "Chinese Quote";
                font-size: 20px;
                background: #ECECEC;
                padding: 50px;
            }
        </style>
    </head>
    <body>
    <?php
        echo file_get_contents($_GET['exploit']);
    ?>
    </body>
</html>
