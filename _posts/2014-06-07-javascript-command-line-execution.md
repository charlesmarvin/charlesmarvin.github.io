--- 
title: JavaScript Command-line Execution
author: Marvin
tags: [javascript, dev, osx]   
---

I started hacking my solutions to [Project Euler](http://projecteuler.net/) using python but recently decided to do them in JavaScript. I could easily create a simple web page to execute my JavaScript solutions however the lazy developer in me didn't want to. I wanted to run my scripts outside of the context of a web browser.  


A quick search of the interwebs yielded good results. Turns out there are a [few interpreters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Shells) out there for executing JavaScript from the command-line. OSX Leopard or later ships with [JSC](http://trac.webkit.org/wiki/JSC) which is a command-line utility for executing JavaScript. You can create a symlink to the executable as follows: 

```console
~# sudo ln -s /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Resources/jsc /bin/jsc
```

*Updated: 08/18/2020 - Path for macOS*
```console
~# sudo ln -s /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc /bin/jsc
```
<br/>
Then run the interpreter interactively using the following command:
```console
~# jsc
```
<br/>

Execute a script called solution.js as follows:

```console
~# jsc solution.js
```
<br/>

I went with Mozilla's [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Introduction_to_the_JavaScript_shell). The install was simple enough using [Homebrew](http://brew.sh/):

```console
~# brew install spidermonkey
```
<br/>

Once installation is complete you can run the interpreter interactively using the following command:
```console
~# js
```
<br/>

Execute a script called solution.js as follows:
```console
~# js solution.js
```
<br/>

When writing code to be run using an interpreter be aware that functions which are available in the browser may not be available in your chosen JavaScript runtime and vise versa. Also, you should to check which version/features of [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) the interpreter supports. See examples below.

```console
~# js
js> let foo = 'Hello World'  // let is an ECMA6/JS 1.7 keyword
js> print( foo )
Hello World       
js> console.log( 'bar' )
typein:2: ReferenceError: console is not defined

~# jsc
>>> let foo = 'Hello World'
Expected an identifier but found 'foo' instead:1
>>> console.log( 'bar' )
Exception: ReferenceError: Can't find variable: console
```