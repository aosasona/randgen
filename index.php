<?php

require_once "vendor/autoload.php";

use Trulyao\PhpRouter\HTTP\Request as Request;
use Trulyao\PhpRouter\HTTP\Response as Response;
use Trulyao\PhpRouter\Router as Router;


$router = new Router(__DIR__ . "/src", "");

$router->allowed(["text/html", "application/json"]);

$router->get("/", function (Request $request, Response $response) {
    $request->append("ip_address", $_SERVER['SERVER_ADDR']);
    return $response->use_engine()->render("Views/home.html", $request);
});

$router->post("/generate", function (Request $request, Response $response) {
    $length = $request->body("length");
    $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(!is_numeric($length)) {
        return $response->status(400)->send(["success" => false,  "message" => "Length must be a number"]);
    }

    if($length < 6) {
        return $response->status(400)->send(["success" => false,  "message" => "Length must be greater than 5"]);
    }

    $generated_string = "";

    for($i = 0; $i < $length; $i++) {
        $generated_string .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $response->send(["success" => true, "message" => "Here you go", "data" => ["string" => $generated_string]]);
});

$router->serve();
