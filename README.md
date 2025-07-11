This is an AI powered Blog Website with multiple features.

<ol>
<li><details>
<summary><strong>Future Improvements or Features</strong></summary>
<br>
<ul>
<li><details>
<summary><strong>Features</strong></summary>
<i>
1. Add Comment Feature via route '/user/actions/comment'; <br>
2. Add Text to AI Generated Image Feature via route '/ai/generate/image' (present in controllers)
</i>

</details></li>
<li>
<details>
<summary><strong>Improvements</strong></summary>
<i> Needs Improvement;
</i>

</details></li>
</ul>

</details>

</li>
<li><details>
<summary><strong>My Learnings</strong></summary>
<br>
<ul>
<li><details>
<summary><strong>explore about equals()</strong></summary>

No, equals() is not a standard, built-in JavaScript method that exists on all objects like toString() or hasOwnProperty().

The .equals() method you're using for comparing Mongoose ObjectIDs is a specific method added by the Mongoose library to its ObjectId type. It's part of the functionality Mongoose provides to simplify working with MongoDB's ObjectIDs in JavaScript applications.

</details></li>
<li><details>
<summary><strong>explore about some()</strong></summary>
Think of the some() method like this:
Imagine you have a basket of different fruits, and you want to know if there's at least one red apple in it. You don't need to count how many, or find all of them – just a yes or no answer. 
That's what .some() does for arrays in JavaScript: 
You give it an array (your fruit basket).
You tell it what to look for (a red apple, or a condition like a number being greater than 50).
It goes through the items one by one.
As soon as it finds one item that matches your description, it says "Yes, there is one!" (returns true) and stops looking.
If it checks all items and finds none that match, then it says "No, there isn't one." (returns false). 
Example

```javascript
const fruits = ["apple", "banana", "orange", "grape"];

// Do we have at least one banana in the basket?
const hasBanana = fruits.some((fruit) => fruit === "banana");
console.log(hasBanana); // Output: true

// Do we have at least one kiwi in the basket?
const hasKiwi = fruits.some((fruit) => fruit === "kiwi");
console.log(hasKiwi); // Output: false
```

In the first example, "banana" is found, and true is returned. It doesn't need to check "orange" or "grape".
In the second example, all fruits are checked, but "kiwi" isn't found, so false is returned.`

</details></li>
</ul>

</details></li>

<li><details>
<summary><strong>Tech Stacks or Technologies Used</strong> </summary>
<ul>
<li>Express.js (API)</li>
<li>Gemini AI (GenAI)</li>
<li>MongoDB (mongoose)</li>
<li>Redis (authentication jwt blocking)</li>
<li>JWT (jsonwebtoken)</li>
<li>Password Hashing (bcrypt)</li>
<li>Validator (to check email and strong password)</li>
</ul>
</details></li>
</ol>

