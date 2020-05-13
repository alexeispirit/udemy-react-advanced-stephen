export default ({ dispatch }) => (next) => (action) => {
  // check to see if the action has a promise in payload
  // if it does, then wait for it to resolve
  // if it doesn't, then send the action to next middleware

  if (!action.payload || !action.payload.then) {
    return next(action);
  }
};
