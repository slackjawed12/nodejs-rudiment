const min = 2;
const max = 10000000;
const primes = [];

/**
 * start부터 start+range 사이의 소수들을 구한다.
 * 싱글 스레드로 소수를 구함
 */
function findPrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

console.time("prime");
findPrimes(min, max);
console.timeEnd("prime");
console.log(primes.length);
