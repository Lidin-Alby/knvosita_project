import { useEffect, useState } from "react";
import api from "../api";

const Chat = () => {
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [selectedHistory, selectHistory] = useState({});
  useEffect(() => {
    getHistory();
  }, []);
  async function getHistory() {
    const res = await api.get("/chats/");
    setHistory(res.data);
  }
  async function chat(e) {
    e.preventDefault();

    const res = await api.post("/chats/", { prompt: prompt });
    selectHistory(res.data);
    getHistory();
    setPrompt("");
  }
  return (
    <div className="vh-100 d-flex flex-column overflow-hidden">
      <div
        className="bg-dark text-white p-3 fixed-top"
        style={{ height: "60px" }}
      >
        <h2>Chat</h2>
      </div>

      <div
        className="d-flex flex-grow-1 overflow-hidden"
        style={{ marginTop: "60px" }}
      >
        <h6 className="position-fixed p-2">History </h6>
        <div
          className=" overflow-auto  border-end p-2 mt-4"
          style={{ width: "20%" }}
        >
          {history.map((h) => (
            <div role="button" onClick={() => selectHistory(h)} key={h.id}>
              {h.prompt} <hr />
            </div>
          ))}
        </div>

        <div
          className="d-flex flex-column overflow-auto p-2"
          style={{ width: "80%" }}
        >
          <div className="flex-grow-1 overflow-auto">
            <div>
              <div>{selectedHistory.prompt}</div>
              <div>
                <br />

                {selectedHistory.response}
              </div>
            </div>
            {/* {response ? (
              <div>{response}</div>
            ) : (
              <div>
                <div>{selectedHistory.prompt}</div>
                <div>
                  <br />

                  {selectedHistory.response}
                </div>
              </div>
            )} */}
          </div>
          <form
            onSubmit={chat}
            className="w-100 d-flex justify-content-center mb-3 "
          >
            <textarea
              name="prompt"
              style={{ width: "80%", resize: "none" }}
              type="text"
              placeholder="Chat here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="mx-2"></div>
            <button className="ml-4" type="submit">
              Sumbit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
