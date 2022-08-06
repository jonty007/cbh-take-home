# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. Appropriate renaming of the file to [create-deterministic-partition-key.js`](create-deterministic-partition-key.js) which makes the file self-explanatory.
2. Added base condition at the top of function to reduce the branching, improve readability, and reducing function execution time.
3. Moved the const vars to global scope to reduce reinitailization of the vars everytime the function is called.
4. Added maxPartitionKeylength as the optional param to the function to makes the functionality dynamic as per the key length requirement.
5. Using const vars wherever possible to keep the vars readonly and making the function less error-prone.
6. Created a createHash and getStrigifiedPartitionKey functions to keep the functionality segerated, making it more modular, and easy for future updates.
7. Keeping the code branching to minimal by removing nested branching.
