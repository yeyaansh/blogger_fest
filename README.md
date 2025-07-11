This is an AI powered Blog Website with multiple features.

<details>
<summary><strong>Future Improvements or Features</strong></summary>
<br>
<details>
<summary><strong>Features</strong></summary>
<i>
1. Add Comment Feature via route '/user/actions/comment';
2. Add Text to AI Generated Image Feature via route '/ai/generate/image' 
</i>

</details>
<details>
<summary><strong>Improvements</strong></summary>
<i> Needs Improvement;
</i>

</details>
</details>



<details>
<summary><strong>My Learnings</strong></summary>
<br>
<details>
<summary><strong>explore about equals()</strong></summary>

No, equals() is not a standard, built-in JavaScript method that exists on all objects like toString() or hasOwnProperty().

The .equals() method you're using for comparing Mongoose ObjectIDs is a specific method added by the Mongoose library to its ObjectId type. It's part of the functionality Mongoose provides to simplify working with MongoDB's ObjectIDs in JavaScript applications.

</details>

<details>
<summary><strong>explore about checking and removing</strong></summary>
<em>error that got me stuck for a long time
</em>
<p>

```javascript
const idToRemoveOrAdd = id; // Assuming 'id' is a Mongoose ObjectId

// Check if the post is already liked by the user
const isLiked = req.user.liked_post.some((likedPostId) =>
  likedPostId.equals(idToRemoveOrAdd)
);

if (isLiked) {
  // If already liked, unlike the post
  req.user.liked_post = req.user.liked_post.filter(
    (likedPostId) => !likedPostId.equals(idToRemoveOrAdd)
  ); // Using filter() to create new array without specific id

  postsData.likes--;
  await req.user.save();
  await postsData.save();
  console.log(postsData.likes);
} else {
  // If not liked, like the post
  postsData.likes++;
  req.user.liked_post.push(postsData._id); // Adding the new liked post ID
  await req.user.save();
  await postsData.save();
  console.log(postsData.likes);
}
```

</p>

<i>this logic of code had eaten my whole day</i>

```javascript
const doExists = liked_post.some((checker) => checker.equals(id));

if (doExists) {
  postsData.likes--;

  req.user.liked_post = req.user.liked_post.filter(
    (data) => !data.equals(id) // it returns only those elements which returns 'true'
  );
  console.log(liked_post);
  console.log("abhi hua hai bhiaya: " + postsData.likes);
  await req.user.save();
  await postsData.save();
}
```

</details>

<details>
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

</details>





</details>