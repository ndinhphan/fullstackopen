import { useState, forwardRef, useImperativeHandle } from "react";
const Togglable = forwardRef((props, ref, hideCancelButton = false) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = {
    display: visible ? "" : "none",
  };
  const hideWhenVisible = {
    display: visible ? "none" : "",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility, //available outside of component
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {hideCancelButton && (
          <button onClick={toggleVisibility}>cancel</button>
        )}
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
export default Togglable;
