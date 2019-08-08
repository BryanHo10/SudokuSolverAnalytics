# Sudoku Solver 
Using [Backtracking](https://en.wikipedia.org/wiki/Backtracking)
> Incrementally builds candidates to the solutions, and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution.
## World's Hardest Sudoku
[Provided by Telegraph.co](https://www.telegraph.co.uk/news/science/science-news/9359579/Worlds-hardest-sudoku-can-you-crack-it.html)
![Hardest Sudoku](img/hardest_sudoku.png)
## Solving Algorithm
Using Recursive Backtracking against World's Hardest Sudoku, I will compare runtimes between multiple programming languages.

| Languages     | Second(s)     |
| ------------- |--------------:| 
| Python        | 7.0486        |
| Node.js       | 0.2631        |
| C#            | 1.1775        |
| C++           | ...           |

## Results
Python
> Over 20 runs with the World's hardest sudoku, this program averages a solving time of 7.04 seconds.

Nodejs
> Over 20 runs with the World's hardest sudoku, this program averages a solving time of 0.263 seconds.

C-Sharp
> Over 20 runs with the World's hardest sudoku, this program averages a solving time of 1.178 seconds.

![Timesheet](img/Timesheet.png)
