const isNew = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  // console.log(created)
  const diffInMs = now - created;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  // console.log(diffInDays)
  // console.log(diffInDays <= 5)
  return diffInDays <= 4;
};

export default isNew;














      // <h1>Latest Posts</h1>
      // {posts.length > 0 ? (
      //   <ul>
      //     {posts.map(post => (
      //       // The 'key' must be a unique value for each item in the list
      //       <li key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      //         {isNew(post.createdAt) && <div className="p-2 w-24 bg-secondary border-2 border-amber-100">New</div>}
      //         <h2>{post.title}</h2>
      //         <p>Likes: {post.likes}</p>
      //         {/* <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p> */}
      //       </li>
      //     ))}
      //   </ul>
      // ) : (
      //   <p>No posts to display.</p>
      // )}