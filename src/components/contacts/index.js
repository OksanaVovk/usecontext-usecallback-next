import React from "react";
import { useContext, useCallback } from "react";
import { ContactContext } from "../App";
import stylesCenter from "./index.module.css";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const { contactArray, setContactArray } = useContext(ContactContext);

  const changeContact = useCallback(
    (id, e, name) => {
      const updatedArray = contactArray.map((item) =>
        item.id === id ? { ...item, [name]: e.target.value } : item
      );
      setContactArray(updatedArray);
    },
    [setContactArray, contactArray]
  );

  const onBtnClick = () => {
    setContactArray((prevArray) => [
      ...prevArray,
      { options: "", details: "", id: Symbol() },
    ]);
  };

  const onDeleteBtnClick = useCallback(
    (id) => {
      setContactArray((prevArray) =>
        prevArray.filter((item) => item.id !== id)
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
            id={item.id}
            selectedOption={item.options}
            details={item.details}
            changeContact={changeContact}
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
