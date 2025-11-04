import { useState, useEffect } from 'react';

/**
 * 🎓 FRONTEND TO BACKEND CONNECTION GUIDE
 * ===========================================
 * 
 * This file shows you EXACTLY how to connect your Next.js frontend
 * to your backend API. Each example is copy-paste ready!
 * 
 * YOUR BACKEND URL (replace this with your actual Vercel backend URL):
 */
const BACKEND_URL = 'https://dihycare-backend.vercel.app';

// ===========================================
// 📚 SECTION 1: AUTHENTICATION
// ===========================================

/**
 * Example 1: LOGIN
 * This is how users sign in to your app
 */
export function LoginExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Making a POST request to your backend
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Save the token for later use
        localStorage.setItem('token', data.token);
        console.log('Login successful!');
        // Redirect to dashboard or home page
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

/**
 * Example 2: REGISTER
 * This is how new users create an account
 */
export function RegisterExample() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully!', data);
        // Redirect to login page
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input 
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input 
        type="text"
        placeholder="Surname"
        onChange={(e) => setFormData({...formData, surname: e.target.value})}
      />
      <input 
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />
      <button type="submit">Register</button>
    </form>
  );
}

// ===========================================
// 📚 SECTION 2: FETCHING DATA (GET requests)
// ===========================================

/**
 * Example 3: GET ALL USERS
 * This shows how to fetch a list of users when the page loads
 */
export function UserListExample() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs automatically when the component loads
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Get the token from localStorage (saved during login)
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // This proves you're logged in
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users List</h2>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name} {user.surname}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 4: GET ONE USER BY ID
 * This shows how to fetch details for a specific user
 */
export function UserDetailExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name} {user.surname}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

// ===========================================
// 📚 SECTION 3: CALENDAR/EVENTS
// ===========================================

/**
 * Example 5: GET ALL EVENTS
 * Fetch all calendar events
 */
export function EventsListExample() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/calendar`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  return (
    <div>
      <h2>Calendar Events</h2>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 6: CREATE A NEW EVENT
 * This shows how to add a new event to the calendar
 */
export function CreateEventExample() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    eventType: '',
    userId: 1 // Replace with actual logged-in user ID
  });

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/calendar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Event created successfully!', data);
        // Clear form or redirect
      }
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <form onSubmit={handleCreateEvent}>
      <input 
        type="text"
        placeholder="Event Title"
        onChange={(e) => setEventData({...eventData, title: e.target.value})}
      />
      <textarea 
        placeholder="Description"
        onChange={(e) => setEventData({...eventData, description: e.target.value})}
      />
      <input 
        type="date"
        onChange={(e) => setEventData({...eventData, date: e.target.value})}
      />
      <input 
        type="text"
        placeholder="Event Type"
        onChange={(e) => setEventData({...eventData, eventType: e.target.value})}
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

/**
 * Example 7: UPDATE AN EVENT
 * Edit an existing event
 */
export function UpdateEventExample({ eventId }) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: ''
  });

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/calendar/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Event updated successfully!', data);
      }
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  return (
    <form onSubmit={handleUpdateEvent}>
      <input 
        type="text"
        placeholder="New Title"
        onChange={(e) => setEventData({...eventData, title: e.target.value})}
      />
      <button type="submit">Update Event</button>
    </form>
  );
}

/**
 * Example 8: DELETE AN EVENT
 * Remove an event from the calendar
 */
export function DeleteEventExample({ eventId }) {
  const handleDeleteEvent = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/calendar/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        console.log('Event deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <button onClick={handleDeleteEvent}>
      Delete Event
    </button>
  );
}

// ===========================================
// 📚 SECTION 4: REUSABLE API UTILITY
// ===========================================

/**
 * BONUS: A reusable function to make API calls easier!
 * Copy this into a separate file like 'utils/api.js'
 */
export const apiCall = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Example of using the reusable utility:
 */
export function SimplifiedExample() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Much cleaner!
    apiCall('/user', 'GET')
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

// ===========================================
// 📝 QUICK REFERENCE GUIDE
// ===========================================

/**
 * YOUR AVAILABLE ENDPOINTS:
 * 
 * AUTH:
 * - POST /auth/register - Create new user
 * - POST /auth/login - Login user (returns token)
 * 
 * USERS:
 * - GET /user - Get all users
 * - GET /user/:id - Get specific user
 * - POST /user - Create user
 * - PUT /user/:id - Update user
 * - DELETE /user/:id - Delete user
 * 
 * CALENDAR:
 * - GET /calendar - Get all events
 * - GET /calendar/:id - Get specific event
 * - GET /calendar/user - Get events for logged-in user
 * - GET /calendar/type - Get events by type
 * - POST /calendar - Create event
 * - PUT /calendar/:id - Update event
 * - DELETE /calendar/:id - Delete event
 * 
 * DATA:
 * - GET /data - Get all data
 * - GET /data/user - Get user's data
 * - GET /data/type - Get user's data by type
 * - POST /data - Create data
 * - PUT /data/:id - Update data
 * - DELETE /data/:id - Delete data
 * 
 * IMPORTANT NOTES:
 * - All endpoints except /auth/login and /auth/register require a token
 * - Get the token from login and store it: localStorage.setItem('token', data.token)
 * - Include token in headers: 'Authorization': `Bearer ${token}`
 * - Replace BACKEND_URL with your actual Vercel backend URL
 */
