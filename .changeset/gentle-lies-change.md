---
"@guardian/react-crossword": minor
---

Resize the crossword grid by dimensions, not the type.

Previously the crossword grid would look up the crossword type in a table to
know how many cells were in the grid, so how wide to make the input box. This
meant that eg. quick crosswords must always be 13x13 grids, prizes 15x15 etc.
But this is unnecessarily limiting on setters, there's no reason we couldn't
have a small 11x11 cryptic, or a jumbo 21x21 quick. Create CSS classes to
control the grid size, and create one for each odd cell width from 11 up to 27,
and read the dimension from the crossword data.
