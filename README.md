Problem 1

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

