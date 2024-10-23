<?php 
require "vendor/autoload.php";
// require "database/database.php";
require "controllers/UserControllor.php";
use FastRoute\RouteCollector;

class Router{
  private $dispatcher;

  public function __construct(){
    $this->dispatcher = FastRoute\simpleDispatcher(function(RouteCollector $r) {
      $route = require "config/routes.php";
      foreach ($route as $el){
        $r->addRoute($el[0],$el[1],$el[2]);
      }
    });
  }
  public function dispatch($httpMethod, $uri){
    $routeInfo = $this->dispatcher->dispatch($httpMethod, $uri);
    switch ($routeInfo[0]) {
      case FastRoute\Dispatcher::NOT_FOUND:
        echo "404 Not Found";
        break;
      case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        echo "405 Method Not Allowed";
        break;
      case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];  
        $vars = $routeInfo[2];
        $handler($vars); 
        break;
      default:
        echo $routeInfo;
        break;
    }
  }
}
