import "./mailList.css";
import { useState } from "react";

const MailList = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Submitted: ", inputValue);
        setInputValue("");
        alert("Successfully Submit！");
    };

    return (
        <div className="mail">
            <h1 className="mailTitle">Leave your comments here</h1>
            <span className="mailDesc">Our team will try to provide better service to the clients!!</span>
            <div className="mailInputContainer">
                <input
                    type="text"
                    placeholder="Your Comment"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default MailList;
