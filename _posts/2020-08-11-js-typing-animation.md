--- 
title: JS Typing Animation
author: Marvin
tags: [dev,javascript]   
--- 

I thought the typing animation on the [ngrok](https://ngrok.com/) website was super cool. So when I decided to build my [personal site](https://charma.dev) I wanted to do something similar. I challenged myself to implement the animation in pure javascript before looking at the way it was implemented on ngrok.

![Typing - ngrok/typed-js](/assets/img/typing-ngrok.gif)

![Typing - charma.dev](/assets/img/typing-charma.gif)

Below was my initial solution:

```javascript
  (function () {
    var typedText = document.querySelector('.typed-text')
    var text = 'Wanderer.Engineer.Developer.Handyman.Cook.Jogger.Human.'
    var charIdx = 0
    function setupBackspace() {
      var backspaceInterval = setInterval(() => {
        if (typedText.innerHTML) {
          typedText.innerHTML = typedText.innerHTML.slice(0, -1)
          return
        }
        clearInterval(backspaceInterval)
        setupTyping()
      }, 50)
    }
    function setupTyping() {
      var typeInterval = setInterval(() => {
        var c = text.charAt(charIdx)
        typedText.innerHTML = typedText.innerHTML + c
        if (c === '.') {
          // long pause after last word for dramatic effect
          var delay = charIdx === text.length - 1 ? 3000 : 300
          clearInterval(typeInterval)
          setTimeout(() => {
            setupBackspace()
          }, delay)
        }
        if (charIdx < text.length) {
          charIdx += 1
        } else {
          charIdx = 0
        }
      }, 100)
    }
    setupTyping()
  })()
```
<br/>
Definitely lots of room for improvement. For starters I could pass the element selector, words, and delay configs as params to the [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and I could support taking an array of sentences instead of single period separated words.

Then I thought I might as well make those changes...

```javascript
  (function ({
    sentences,
    selector = '.typed-text',
    backspaceDelay = 50,
    typingDelay = 100,
    wordDelay = 300,
    endDelay = 3000,
  }) {
    var typedText = document.querySelector(selector)
    var sentenceIdx = 0
    function setupBackspace() {
      var backspaceInterval = setInterval(() => {
        if (typedText.innerHTML) {
          typedText.innerHTML = typedText.innerHTML.slice(0, -1)
          return
        }
        clearInterval(backspaceInterval)
        setupTyping()
      }, backspaceDelay)
    }
    function setupTyping() {
      var sentence = sentences[sentenceIdx]
      // convert sentence into char array so we can shift off chars
      var chars = sentence.split('') 
      // long pause after last word for dramatic effect
      var delay = sentenceIdx === sentences.length - 1 ? endDelay : wordDelay
      // wrap sentenceIdx when we've processed the last sentence
      sentenceIdx = (sentenceIdx + 1) % sentences.length
      var typeInterval = setInterval(() => {
        if (chars.length) {
          typedText.innerHTML = typedText.innerHTML + chars.shift()
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setupBackspace()
          }, delay)
        }
      }, typingDelay)
    }
    setupTyping()
  })({
    sentences: ['Wanderer.', 'Engineer.', 'Developer.', 'Handyman.', 'Cook.', 'Jogger.', 'Human.'],
  })
```
<br/>
But what about input validation?! We can add the following below `line 9` above: 

```javascript
  ...
    if (!typedText) {
      console.error("No element found matching query selector '" + selector + "'")
      return
    }
    if (!(Array.isArray(sentences) && sentences.length)) {
      console.error('{ sentences } param must be a non empty array.')
      return
    }
  ...
```
<br/>
What about unit test?! Ok you got me - I only did manual testing. 

I did eventually look under the hood of ngrok after completing my implementation and discovered ngrok uses [typed.js](https://mattboldt.com/demos/typed-js/), by Matt Boldt, which is way more [robust](https://github.com/mattboldt/typed.js/blob/master/lib/typed.js).
