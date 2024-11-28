import React from "react";
import { useContext, useCallback } from "react";
import { ContactContext } from "../App";
import stylesCenter from "./index.module.css";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const { contactArray, setContactArray } = useContext(ContactContext);

  const changeContact = useCallback(
    (index, e, name) => {
      setContactArray((prevArray) =>
        prevArray.map((item, i) =>
          i === index ? { ...item, [name]: e.target.value } : item
        )
      );
    },
    [setContactArray]
  );

  const onBtnClick = () => {
    setContactArray((prevArray) => [
      ...prevArray,
      { options: "", details: "" },
    ]);
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
            // setDetails={changeDetails}
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
