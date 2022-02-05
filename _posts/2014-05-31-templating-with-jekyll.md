---
title: Templating with Jekyll
author: Marvin
tags: [jekyll, github, dev]
---

Hosting a static content weblog on Github (or any server) is relatively straight forward.
_Author your content &#8594; commit &#8594; push_. After a few posts about your favorite
programming language, your cat and that new restaurant you went to, you start noticing your
workflow becomes _copy page layout from another page &#8594; edit page to include your new content &#8594; save_. Thats not inherently bad. Some content may be that static and simple.

Pain points arise when the content author wants to change something after they have authored a
substantial number of pages. _Find &#8594; Replace_ may work for simple cases however it wont
help if you want to change layout. Ideally changes to content and layout should be orthogonal.
Templating engines facilitate the separation necessary for the content and layout to change
independently. The upfront work of selecting a template engine and a consistent taxonomy of
structural and stylistic elements pays dividends.

[Jekyll](http://jekyllrb.com/docs/home/) is the default templating engine or rather
"static site generator" for Github pages. Have a look [under the hood](https://gitlab.com/marvin.charles/charma.dev) to see how I'm using it.
