class: center, middle

# Zero-to-Lisp In 60-Ish Minutes

.center[![Center-aligned image](/content/gravatar.jpg)]

Jeff Olson <olson.jeffery@gmail.com><br />
@olsonjeffery<br />
Improving Enterprises<br />

---

class: center, middle

# https://github.com/olsonjeffery/z1l60

---

# Who benefits; whose time is wasted

- Lispers, `cons` thyself!
- I procrastinated
- Tractable

---

# A Framework

- Peter Norvig, Smart Person
- http://norvig.com/lispy.html
- Lean & mean

---

# The fundamental Lisp concept(s)

---

class: center, middle

# s-expressions

aka `sexprs`, `sexps`, `symbolic expressions`, etc etc etc etc etc etc etc

---

# s-expressions

.center[![Center-aligned image](/content/sexprs.png)]
.center[Tree structure representing the s-expression for `(* 2 (+ 3 4))`]

- `car` like the thing you drive around
- `cdr` like "could-er"

---

# Eww, prefix notation!

- S-expression from before: `(* 2 (+ 24))`
- Infix notation version: `(2 * (3 + 4))`

---

# Components of our scheme interpreter

- Parsing
- S-Expression stuff
- Environment
- Builtin/global procedures
- Evaluation
- REPL

---

class: center, middle

# Into the fray!

https://github.com/olsonjeffery/z1l60

---

# Beyond the first Norvig essay

---

# Tail Call Optimization

- Trampolines
- "Cheney on the M.T.A."

---

class: center, middle

# R7RS: Just google it
