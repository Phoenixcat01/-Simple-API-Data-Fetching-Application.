import { useEffect, useState } from 'react'

// This is a functional component named App & export it to be used by other files (e.g., main.jsx).
export default function App() {
  // useState hook to manage the list of users.
  // We initialize it with an empty array since we expect to fetch an array of user objects.
  const [users, setUsers] = useState([]);

  // useState hook to manage the loading state.
  // We initialize it as 'true' because we are in a loading state as soon as the component renders.
  const [loading, setLoading] = useState(true);
  
  // useEffect hook to handle side effects, such as data fetching.
  // The empty dependency array '[]' ensures this effect runs only once,
  // right after the component first mounts (like componentDidMount in class components).
  useEffect(() => {
    // This is an asynchronous function to perform the data fetching operation.
    const fetchUsers = async () => {
      try {
        // Step 1: Fetching the data.
        // The 'fetch' API is a modern, built-in browser function.
        // It sends a request to the specified URL. The URL points to a public API
        // called JSONPlaceholder, which provides fake JSON data for testing.
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        // Step 2: Parsing the response.
        // The 'response.json()' method parses the JSON data returned by the API
        // into a JavaScript object. We use 'await' because this is also an asynchronous operation.
        const data = await response.json();
        // Step 3: Updating the state.
        // We call the 'setUsers' function from our useState hook to update the 'users' state.
        // This triggers a re-render of the component with the new data.
        setUsers(data);
      } catch (error) {
        // If there's an error during the fetch or parsing, it will be caught here.
        console.error("Error fetching Users:", error);
      } finally {
        // The 'finally' block ensures this code runs regardless of success or failure.
        // We set 'loading' to 'false' to indicate that the fetching process has finished.
        // This will hide the "Loading..." message.
        setLoading(false);
      }
    };
    
    // We call the async function to execute the fetch operation.
    fetchUsers();
  }, []);

  // Conditional rendering: if 'loading' is true, we display a loading message.
  if (loading) {
    return <div>Loading...</div>
  }

  // Once loading is false, the component returns the list of users.
  return (
    
      <div>
        <h1>List Users</h1>
        <ul>
          {/* We use the '.map()' method to iterate over the 'users' array and
            render a list item '<li>' for each user object.
            The 'key' prop is important for React to efficiently update the list. */}
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
  )
}
