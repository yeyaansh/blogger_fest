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
<li>
<details><summary><stron>issue in redux (useDispatch)</stron></summary>
When using useDispatch() and calling actions (functions) encountered with error <br>
<strong>@reduxjs_toolkit.js?v=f9d77b35:403 Uncaught Error: [Immer] An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.</strong>
<br>
This happened because while creating slice using createSlice, I was returning value whereas it is recommended to leave it (not to return any value and let the *Immer* handle it automatically)
<br> The code before in slice.js 'disableLoading: (state) => state.isLoading = false'
<br>
The code after in slice.js 'disableLoading: (state) => {state.isLoading = false}', here we are not returning anything
<br>
<details><summary><strong>more info. about the issue and the solution</strong></summary>
The error message "@reduxjs_toolkit.js?v=f9d77b35:403 Uncaught Error: [Immer] An immer producer returned a new value and modified its draft. Either return a new value or modify the draft." means you're breaking the rules of how Immer (which Redux Toolkit uses under the hood) handles state updates. 
Here's why this error occurs and how to fix it:
Why it happens
You're mutating the draft state and returning a new value: Immer provides a "draft" of your state in your reducer functions, which you can modify directly as if it were mutable. However, you should either modify this draft directly (and not return anything), or create a completely new state object and return it, according to Redux Toolkit. You cannot do both within the same reducer function, because Immer detects this as a conflict and throws the error.
Implicit returns in arrow functions: If you use an arrow function for your reducer and don't explicitly use curly braces {} to define the function body, any expression on the right-hand side will be implicitly returned. This can lead to inadvertently returning a value even if you're also modifying the draft state. 
How to solve it
If you intend to mutate the draft:
Do not return anything: If you're modifying the draft state directly (e.g., state.items.push(newItem) or state.user.name = newName), simply omit the return statement in your reducer. Immer will handle the immutability behind the scenes.
javascript
const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload); // Mutating the draft
            // No return statement here
        },
    },
});
Use code with caution.

If you intend to return a new state object:
Do not modify the draft: If you're constructing a completely new state object (e.g., using filter or map to create new arrays and objects), make sure you are not also making direct changes to the state object passed as an argument.
javascript
const exampleSlice = createSlice({
    name: 'example',
    initialState: [],
    reducers: {
        deleteItem: (state, action) => {
            // Constructing a new array and returning it
            return state.filter(item => item.id !== action.payload);
        },
    },
});
Use code with caution.

Ensure explicit function bodies for reducers (especially with arrow functions):
Use curly braces {}: If your reducer logic involves multiple steps, it's generally recommended to enclose it within curly braces to clearly define the function body. This helps prevent accidental implicit returns.
javascript
const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        token: ''
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token; // Mutating the draft
            // No return statement here
        },
    },
});
Use code with caution.

 
By following these guidelines, you can leverage the benefits of Immer and Redux Toolkit's simplified reducer logic while avoiding this common error. 
</details>
</details>
</li>
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
<li>React-Markdown (to format the text coming from database)</li>
</ul>
</details></li>
</ol>
