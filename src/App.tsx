import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import {
  useDeleteDataMutation,
  useGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
} from "./redux/StudentsSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const [input, setInput] = useState({
    name: "",
    body: "",
  });
  // const navigate = useNavigate();

  // Delete Request
  const [remove] = useDeleteDataMutation();
  //POST Request
  const [Create] = usePostDataMutation();
  //GET Request
  const { data, isLoading } = useGetDataQuery("");
  // Edit Request
  const [updateData] = useUpdateDataMutation();

  console.log("loading state : ", isLoading, "This is mi9ne data : ", data);

  //  console.log("this is mine length::", data.length)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data = {
      id: data.length + 1,
      userId: Math.random() * 1000,
      studentName: input.name,
      body: input.body,
    };
    console.log(
      "handle click is comming corerect so your answer is correct :",
      Data
    );
    Create(Data); // So bro data is comming
  };

  function handleDelete(_id: any) {
    remove(_id);
  }

  const handleEdit = (_id: any, data: any) => {
    console.log("this is my Edit data : ", data);
    const ChangeData = {
      id: data.id,
      userId: data.id,
      studentName: data.studentName,
      body: data.body,
    };
    console.log("changeData:", ChangeData);
    updateData({ _id,updateCardData: ChangeData} );
  };

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
          placeholder="Enter body .."
          type="text"
          value={input.body}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, body: e.target.value })
          }
          required
        />
        <button type="submit" className="mx-2">
          {" "}
          Add Data
        </button>
      </form>

      <hr />
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h1 className="mx-5 my-5 py-5 px-5">Loading....</h1>
          ) : (
            data?.map((val: any, _idx: any) => {
              return (
                <div className="col-lg-2 Card my-2 mx-2 py-2" key={val.id}>
                  <h6>Name : {val.studentName}</h6>
                  <p>
                    <b>Body : {val.body}</b>
                  </p>
                  <div>
                    <span>
                      <button onClick={() => handleEdit(_idx, val)}>
                        Edit
                      </button>
                    </span>
                    <span className="mx-2">
                      <button onClick={() => handleDelete(val.id)}>
                        Delete
                      </button>
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
