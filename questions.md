1. Both Component and PureComponent are class components.
Component does not have shouldComponentUpdate method, so it will rerender whenever its state or props change.
PureComponent has shouldComponentUpdate method, which make only shallow comparision. Becouse the comparison is shallow changes to deeply nested data in props or state might not trigger a rerender. Shortly shouldComponentUpdate will detect only primitive type changes or if the refference to an object is changed.


2. As I already mentioned above shouldComponentUpdate only checks for props and state update. So if we consume to Context in some component and that component is PureCompoennt we can skip context changes and our ui will not be in sync with data.


3. One way is to define callback function in parent component and then pass that function to child component as aprop.
   Second way is using Context API.
   using state managers (redux for example)



4. One way is to use React.memo HOC, as second argument it accepts function in wich you can compare state and props and decide should compenent rerender or not by return ing true/false accordingly.
Second way imagine a scenario when you pass some function to child component. By default child will always rerender when something changes in parent component since callback function reference will be recreated. To solve the problem we need to wrap callBack function in useCallback function which will memoize callback function. So new function reference will not be created whenever some state changed in parent and child component will not be rerendered.


5. For example when you want to render two items in jsx like so 

const App = () => {
  return (
    <h1>first</h1>
    <h1>second</h1>
  );
}

you have to wrap it in additional div or React.Fragment. This is a React rule Adjacent JSX elements must be wrapped in an enclosing tag. Fragment will not be rendered in actual DOM so you will have cleaner HTML structure.


6. HOC s are functions that take a component as argument and return new component, maybe with additional props. HOC s allow us to reuse code.
  withRouter from "reac-router-dom"  allows component to access routing information(location, history, match).
  Redux Connect allow to connect React component to store.
  withTranslation from 'react-i18next' library.
  We can create our custom HOC s like PrivatRoute to check if user has access and much more
   



7. In Callbacks we pass error as an argument to callback function and handle error.
   In promises we use catch method to get error.
   In async/await we put code in try/catch block and errors will appear in cathc block.


8. setState mothod can take two arguments, the first is the new value of the state, and second is callback function which will be called after stateupdate.
setState is async for performance optimization, React can batch setStates in one to optimize rerender counts.
also it is async in order not to blovk UI.

9. First we need to convert code structior to function(removing, constructor, render);
   Second replace state with useState or useReducer (depending on state)
   third rewrite lifecycle methods with useEffect

10. We can style react compoennts wih
       Inline styles
       CSS Stylesheets
       CSS Modules
       Styled Components library
       Tailwind CSS framework     


11. to render an HTML string in a react component we can use dangerouslySetInnerHTML property. But in this case we should be aware of sanitazing HTML string to prevent XSS attacks. for example if the string contains some script and commands browser will execute it.   




