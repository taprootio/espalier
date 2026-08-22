#!/usr/bin/env node
import{readFileSync as o,writeFileSync as i}from"node:fs";import{runEspalierCli as l}from"./theme-check.js";process.exitCode=l(process.argv.slice(2),{readFile:e=>o(e,"utf8"),writeFile:(e,r)=>i(e,r),log:e=>console.log(e),error:e=>console.error(e)});
