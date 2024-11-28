import React from "react";
import { useContext, useCallback, useState } from "react";
import { ContactContext } from "../App";
import stylesCenter from "./index.module.css";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const { contactArray, setContactArray } = useContext(ContactContext);

  const [options, setOptions] = useState("");
  const [details, setDetails] = useState("");

  const selectOptions = useCallback(
    (index, e) => {
      const updatedArray = contactArray.map((item, i) =>
        i === index ? { ...item, options: e.target.value } : item
      );
      setContactArray(updatedArray);
      setOptions(e.target.value);
    },
    [setContactArray, contactArray]
  );

  const changeDetails = useCallback(
    (index, e) => {
      const updatedArray = contactArray.map((item, i) =>
        i === index ? { ...item, details: e.target.value } : item
      );
      setContactArray(updatedArray);

      setDetails(e.target.value);
    },
    [setContactArray, contactArray]
  );

  const onBtnClick = () => {
    setContactArray((prevContacts) => [
      ...prevContacts.slice(0, prevContacts.length - 1),
      { options: options, details: details },

      { options: "", details: "" },
    ]);
    setOptions("");
    setDetails("");
  };

  const onDeleteBtnClick = useCallback(
    (deleteIndex) => {
      setContactArray((prevArray) =>
        prevArray.filter((_, index) => index !== deleteIndex)
      );
    },
    [setContactArray]
  );

  // NOTE: 'teach' the button to add new contact info
  // NOTE: and render an array of ContactItem components

  return (
    <>
      <div className={stylesCenter.channels}>
        {contactArray.map((item, index) => (
          <ContactItem
            key={index}
            index={index}
            selectedOption={item.options}
            details={item.details}
            setDetails={changeDetails}
            setOptions={selectOptions}
            onDeleteBtnClick={onDeleteBtnClick}
          />
        ))}
      </div>
      <div>
        <button
          className={stylesCenter.addButton}
          data-testid="add-button"
          onClick={onBtnClick}
        >
          <img src="plus.svg" alt="plus logo" />
          <span className={stylesCenter.addButtonText}>
            Додати канал зв'язку
          </span>
        </button>
      </div>
    </>
  );
};

export default Contacts;
