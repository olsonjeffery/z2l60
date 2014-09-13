# Who benefits; whose time is wasted

## Lisper, `cons` thyself

- I don't consider myself a "serious" Lisper
- If you're a dedicated lisper, then some stuff in this talk might rub you the wrong way
- So I apologize in advance; this will probably be a painful experience for both of us!
- I skew scheme-wards

## I procrastinated

- My laptop's in the shop
- I started this project on Wednesday, including the creating of dawdle

## Tractable

- This isn't a testament to my leet skills or crazy work ethic or anything
- More that the problem space is within of a weekend project that can yield real, useful understanding of basic programming language problems

# A Framework

## Peter Norvig, Smart Person

- Mr. Norvig is the Director of Research at Google and also a longtime, hardcore Lisper
- He's written a series of essays, as indicated in the URL, about writing a simple scheme interpreter
- These essays are the genesis of this presentation
- I will only cover material in the first essay, more or less, with a few items from later essays discussed briefly towards the end

## Lean & Mean

- Anyways, the main point is that the essays provide a stripped down framework for building out and discussing implementing a language, tip-to-tail

# The fundamental Lisp concept(s)

- S-expressions are a way to notate tree-like data structures
- They were invented for and popularized by Lisp

## S-expressions

- Provides a straight-forward, one-size-fits-all way to approach representing code symbolically
- Really, most text-based programming languages do this as well (what you'd call "lexing" and "parsing")
- What makes this novel is the fact that consist only of "atoms" (the leaf nodes) and "pairs" (which are just two s-expressions)
- These are referred, in lisp terminology, as the "car" and "cdr".. you can also think of it as the "first" and the "rest"
- It's worth noting that it's not quite a linked-list
- There's probably some interesting anecdote about the history of this, but I don't know it

## Eww, prefix notation!

- In this example, we have the infix version that you'd see if that same chunk of code appeared in a mainstream language like C or C++, Java, Python, etc
- I'm not here to mount a defense of Lisp semantics vs everything else
- so forgive me for making the unsupported assertion that parsers for C-likes are much more complex than what you'll see today.. it's a large part of what makes writing a "toy scheme" tractable
