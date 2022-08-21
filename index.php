<?php

require("vendor/autoload.php");

use Trulyao\PhpRouter\Router as Router;
use Trulyao\PhpRouter\HTTP\Response as Response;
use Trulyao\PhpRouter\HTTP\Request as Request;


$router = new Router(__DIR__ . "/src", "");

$router->allowed(["text/html", "multipart/form-data", "application/x-www-form-urlencoded"]);

$router->get("/", function (Request $request, Response $response) {
    $request->append("ip_address", $_SERVER['SERVER_ADDR']);
    return $response->use_engine()->render("Views/home.html", $request);
});

$router->serve();
