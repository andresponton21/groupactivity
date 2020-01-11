import React from "react";
import "./App.css";
import ErrorMessage from "./ErrorMessage";

function useTextInputState() {
  const [value, setValue] = React.useState("");
  const onChange = event => setValue(event.target.value);
  return {
    value,
    onChange
  };
}

function FormField({ children }) {
  return <div className="FormField">{children}</div>;
}

function FormFieldLabel({ children, type }) {
  let className = "FormField-Label";
  if (type === "radio") {
    className += " FormField-Label__Radio";
  }
  return <label className={className}>{children}</label>;
}

function FormFieldLabelText({ children, type }) {
  let className = "FormField-LabelText";
  if (type === "radio") {
    className += " FormField-LabelText__Radio";
  }
  return <span className={className}>{children}</span>;
}

function TextInputField({ placeholder, value, onChange, errorMessageLabel }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasFocusedOnce, setHasFocusedOnce] = React.useState(false);

  const onFocus = () => {
    setIsFocused(true);
    setHasFocusedOnce(true);
  };

  const onBlur = () => setIsFocused(false);

  return (
    <div>
      <input
        className="FormField-Input FormField-Input__Text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {hasFocusedOnce && !isFocused && !value && (
        <ErrorMessage label={errorMessageLabel} />
      )}
    </div>
  );
}

function RadioInputField({ value, checked, onChange }) {
  return (
    <input
      className="FormField-Input FormField-Input__Radio"
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
}

function ShowInfo({ movie, actor, isAbove19, genre }) {
  return (
    <div>
      <h1 className="App-Title">Movies</h1><p>{movie}</p>
      <p>{actor}</p>
      <p>Above19: {isAbove19 && <span>True</span>}</p>
      <p>{genre}</p>
    </div>
  );
}

export default function App() {
  const firstNameState = useTextInputState();
  const lastNameState = useTextInputState();

  const [isAbove19, setIsAbove19] = React.useState(false);
  const onChangeAbove19 = event => setIsAbove19(event.target.checked);

  const [diet, setDiet] = React.useState(null);
  const onChangeDiet = event => setDiet(event.target.value);

  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const onClickSubmit = () => {
    console.log("Clicked submit button!");
  };

  return (
    <div className="App">
      <div className="App-Content">
        <h1 className="App-Title">Movies</h1>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>Enter your favorite movie</FormFieldLabelText>
            <TextInputField
              placeholder="Enter your favorite"
              value={firstNameState.value}
              onChange={firstNameState.onChange}
              errorMessageLabel="First name required"
            />
          </FormFieldLabel>
        </FormField>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>what is your favorite actor</FormFieldLabelText>
            <TextInputField
              placeholder="Enter actor name"
              value={lastNameState.value}
              onChange={lastNameState.onChange}
              errorMessageLabel="Last name required"
            />
          </FormFieldLabel>
        </FormField>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>
              <input
                className="FormField-Input FormField-Input__Checkbox"
                type="checkbox"
                checked={isAbove19}
                onChange={onChangeAbove19}
              />
              Are you 18+?
            </FormFieldLabelText>
          </FormFieldLabel>
        </FormField>

        <FormField>
          <div className="FormField-Heading">Genre</div>

          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="drama"
                checked={diet === "drama"}
                onChange={onChangeDiet}
              />
              Drama
            </FormFieldLabelText>
          </FormFieldLabel>

          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="comedy"
                checked={diet === "comedy"}
                onChange={onChangeDiet}
              />
              Comedy
            </FormFieldLabelText>
          </FormFieldLabel>

          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="action"
                checked={diet === "action"}
                onChange={onChangeDiet}
              />
              Action
            </FormFieldLabelText>
          </FormFieldLabel>

          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="Terror"
                checked={diet === "Terror"}
                onChange={onChangeDiet}
              />
              Terror
            </FormFieldLabelText>
          </FormFieldLabel>
        </FormField>

        <div>
          <h5>Network status: {isOnline ? "online" : "offline"}</h5>
        </div>

        <div className="FormSubmit">
          <button
            className="FormSubmit-Button"
            onClick={onClickSubmit}
            disabled={
              !firstNameState.value ||
              !lastNameState.value ||
              !diet ||
              !isOnline
            }
          >
            Submit
          </button>
        </div>
        {/* <ShowInfo movie={firstNameState.value} actor={lastNameState} /> */}
      </div>
    </div>
  );
}
