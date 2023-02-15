/*
  Universal for all input changes
  This function work well with requiring condition:
  1. The state structrue: { { name: <value: <value>, validated: boolean } }
  2. Should hava a Ref of the form for purpose check validity
  3. Have and Validity State to enable submiting

  params:
  event: The event happens when input changed
  setState: the setState from useState
  formRef: The formRef container using for validation
  setValidity: the set Validity from current page
  confirmPrefix: the prefix of confirm name field (Ex: confirmPassword)
*/
export function handleInputChange(event, setState, formRef: React.RefObject<HTMLFormElement> | React.MutableRefObject<HTMLFormElement | undefined> | null, setValidity = (v) => {}) {
    const input = event.currentTarget;
    if(event.currentTarget) {
      const value = input.type === "checkbox" ? event.currentTarget.checked : event.currentTarget.value.trim() !== "" ? event.currentTarget.value : event.currentTarget.value.trim();
      const name = input.name;
      if(formRef) {
        const form = formRef.current;
        if(input.checkValidity() === false) {
          if(form && form.checkValidity() === false) {
            setValidity(false);
          }
        } else {
          if(form && form.checkValidity() === true) {
            setValidity(true);
          }
        }
      }
      setState((prevState) => {
        return {
          ...prevState,
          [name]: {
            value: value,
            validated: true
          }
        };
      });
    }
  }

/** Function to blur out in input field */
export const handleLoseFocus = (event) => {
    if (event.key.toLowerCase() === "enter") {
      event.preventDefault();
      event.currentTarget.blur()
    }
  }

/** Function change the enter behavior to jump to the next input field */
export const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };
  