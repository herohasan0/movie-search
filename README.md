# Getting started

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

Local web server will use port 3000.

## React Hooks

For more information about **React Hooks** click [here](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html).

You can see **React Hooks** in this project. (Search.js component.)

```javascript
const [searchValue, setSearchValue] = useState('');
```

`searchValue` is a variable for hook. And its first value is ' ' as you can see in `useState('')`.

We can use `searchValue` like this:

```HTML
<input value={searchValue} onChange={handleSearchInputChanges} type="text" />
```

And we can chance its value like this:

```Javascript
 const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };
```

When `handleSearchInputChanges()` function called, the value of `searchValue` will be equal to the value of `(e.target.value)`. In this example, when user typing into `input` above, value of `searchValue` variable will be user's input.

## useEffect

For more information about **useEffect** click [here](https://reactjs.org/docs/hooks-reference.html#useeffect).

> Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.

> If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

Because `useEffect` gets called after the first render (`componentDidMount`) and after every update (`componentDidUpdate`).

Look this example:

```javascript
// class components
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    anounceStr = `Clicked ${this.state.count} times.`;
  }
}

// using hooks
useEffect(() => {
  anounceStr = `Clicked ${count} times`;
}, [count]);  // Only re-run if count changes.
```

`useEffect` function accepts two arguments, the function that you want to run and as a second argument which is an array. In that array we just pass in a value that tells React to skip applying an effect if the value passed in has not changed.

We also use `useEffect` for data fetching, manual DOM manipulations. In this project we are fetching data from APİ.

```javascript
useEffect(() => {
  fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.Search
      });
    });
}, []);
```

## useReducer

For more information about **useReducer** click [here](https://reactjs.org/docs/hooks-reference.html#usereducer).

An alternative to `useState`.

> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values. It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

We needed three `useState` in `App.js` component like this:

```javascript
const [loading, setLoading] = useState(true);
const [movies, setMovies] = useState([]);
const [errorMessage, setErrorMessage] = useState(null);
```

Instead of that we can use `useReducer` like that:

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

We need `initialState` and `reducer` for it:

```javascript
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};
```

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
```

And when we need chance these case states, we can use `dispatch` like that:

```javascript
dispatch({
  type: 'SEARCH_MOVIES_SUCCESS',
  payload: jsonResponse.Search
});
```

That would be same with that if we were using `useState`:

```javascript
setMovies(jsonResponse.Search);
setLoading(false);
```

SOURCE: <https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/>
