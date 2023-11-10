import { ChangeEvent, FormEvent, useState } from "react";
import {
  useDeleteContactMutation,
  useContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
} from "./redux/ContactApi";
import { contact } from "./models/contact.model";

function App() {
  const [input, setInput] = useState({
    name: "",
    email: "",
  });

  // Delete Request
  const [remove] = useDeleteContactMutation();
  //POST Request
  const [Create] = useAddContactMutation();
  //GET Request
  const { data, isLoading } = useContactsQuery();
  // Edit Request
  const [updateData] = useUpdateContactMutation();

  console.log("loading state : ", isLoading, "This is mi9ne data : ", data);

  //  console.log("this is mine length::", data.length)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data = {
      id: data.length + 1,
      name: input.name,
      email: input.email,
    };
    console.log("handle click is  :", Data);
    Create(Data); // So bro data is comming
  };


  function handleDelete(_id: any) {
    remove(_id);
  }


  function handleEdit(val: contact): void {
    console.log("this is edit click data ::", val);
    setInput({
      name: val.name,
      email: val.email,
    });
    console.log("this is my input data : ", input);
    const ChangeData = {
      id: val.id,
      name: input.name,
      email: input.email,
    };
    console.log("changeData:", ChangeData);
    updateData( ChangeData );
    console.log("this is my input data : ", input);
  }

  return (
    <>
      <br />
      <form onSubmit={handleSubmit} className="form-control form mx-5">
        <input
          type="text"
          placeholder="Enter Name .."
          value={input.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, name: e.target.value })
          }
          required
        />
        <input
          className="mx-2"
          placeholder="Enter email .."
          type="text"
          value={input.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, email: e.target.value })
          }
          required
        />
        <button type="submit" className="mx-2">
          {" "}
          Add Data
        </button>
      </form>

      <hr />
      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h1 className="mx-5 my-5 py-5 px-5">Loading....</h1>
          ) : (
            // ------------------------------------ TERNARY OPERATOR WITH map method...--------------------------------------------------
            data?.map((val: contact) => {
              return (
                <div className="col-lg-2 Card my-2 mx-2 py-2" key={val.id}>
                  <h6>id : {val.id}</h6>
                  <h6>Name : {val.name}</h6>
                  <p>
                    <b>E-mail : {val.email}</b>
                  </p>
                  <div>
                    <span>
                      <button onClick={() => handleEdit(val)}>Edit</button>
                    </span>
                    <span className="mx-2">
                      <button onClick={() => handleDelete(val.id)}>
                        Delete
                      </button>
                      {/* when we hav to delete a contact , we will need to pass the (id) of that contact  */}
                      {/* and when we want to upadate the contact, we need to to pass whole contact item  */}
                    </span>
                  </div>
                  <br />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
