import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      lastname: "",
      address: "",
      city: "",
      country: "",
      email: [""],
      numbers: [""],
    }
  );

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.name &&
      formState.lastname &&
      formState.address &&
      formState.city &&
      formState.country &&
      formState.email &&
      formState.number
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null && Array.isArray(formState[name])) {
      const updatedArray = [...formState[name]];
      updatedArray[index] = value;
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: updatedArray,
      }));
    } else {
      setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
    }
  };
  const handleAddEmail = () => {
    setFormState((prevFormState) => {
      const updatedEmails = Array.isArray(prevFormState.email)
        ? [...prevFormState.email, ""]
        : [""];
      return { ...prevFormState, email: updatedEmails };
    });
  };
  const handleAddNumber = () => {
    setFormState((prevFormState) => {
      const updatedNumbers = Array.isArray(prevFormState.numbers)
        ? [...prevFormState.numbers, ""]
        : [""];
      return { ...prevFormState, numbers: updatedNumbers };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">LastName</label>
            <input
              name="lastname"
              onChange={handleChange}
              value={formState.lastname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              name="address"
              onChange={handleChange}
              value={formState.address}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">city</label>
            <input name="city" onChange={handleChange} value={formState.city} />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              name="country"
              onChange={handleChange}
              value={formState.country}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            {formState.email.map((email, index) => (
              <div key={index}>
                <input
                  name="email"
                  onChange={(e) => handleChange(e, index)}
                  value={email}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddEmail}>
              Add Email
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            {formState.numbers.map((number, index) => (
              <div key={index}>
                <input
                  name="number"
                  onChange={(e) => handleChange(e, index)}
                  value={number}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddNumber}>
              Add Number
            </button>
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
