import React, { useState, useEffect } from "react";

function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", message: "" });
  const [receivedForms, setReceivedForms] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    console.log("called effect");
    fetch("https://crudcrud.com/api/f89605f75aa84c51ba965ee7880602a3/contact")
      .then((res) => res.json())
      .then((data) => setReceivedForms(data));
  }, [isSubmited]);

  function handleSubmitContact(e) {
    e.preventDefault();
    setIsSubmited(true);
    fetch("https://crudcrud.com/api/f89605f75aa84c51ba965ee7880602a3/contact", {
      method: "post",
      body: JSON.stringify(contactForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setContactForm({ name: "", message: "" });
  }
  return (
    <div className="container">
      <div className="row ">
        <div className="col-6 mx-auto">
          <form
            action=""
            className="d-flex flex-column"
            onSubmit={(e) => handleSubmitContact(e)}
          >
            <label htmlFor="">نام</label>
            <input
              type="text"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
            />
            <label htmlFor="">پیام</label>
            <textarea
              name=""
              id=""
              value={contactForm.message}
              cols="30"
              rows="10"
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
            ></textarea>
            <button>ارسال</button>
          </form>
        </div>
      </div>

      <br />

      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام</th>
            <th scope="col">پیام</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {receivedForms &&
              receivedForms.map((form,index) => (
                <tr>
                    <th scope="row">{index}</th>
                  <td>{form.name}</td>
                  <td>{form.message}</td>
                </tr>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Contact;
