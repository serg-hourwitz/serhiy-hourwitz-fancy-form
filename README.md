Problem 1

Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.


/* using for loop */

const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

console.log(sum_to_n_a(5)); //15


/* using arithmetic formula */

const sum_to_n_b = (n) => {
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(4)); //10

/* using recursive approach */

const sum_to_n_c = (n) => {
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(3)); //6

