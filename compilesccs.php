<?php

//require_once "vendor/scssphp/scssphp/scss.inc.php";

use ScssPhp\ScssPhp\Compiler;

$compiler = new Compiler();

$scss_file = 'scss/style.scss';
$css_file  = 'css/style2.css';

  //$compiler->setImportPaths(dirname($scss_file));


$compiler->setSourceMap(Compiler::SOURCE_MAP_FILE);
    $compiler->setOutputStyle(\ScssPhp\ScssPhp\OutputStyle::EXPANDED);

$compiled = $compiler->compileString(file_get_contents($scss_file));


 file_put_contents($css_file, $compiled->getCss());


