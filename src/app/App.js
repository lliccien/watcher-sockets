import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000/";

function App() {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const socket = io(ENDPOINT, { transports: ["websocket"] });
        socket.on("FromAPI", data => {
            setResponse(data);
        });
        return () => socket.disconnect();
    }, []);

    return (
<div>
    {/*{response}*/}
    <table>
        <thead>
            {response.map((line, i) => (
                <tr key={'trh'+i}>{(i === 0 && line.length !== 0)? line.map((item) => (
                    <th key={item}>{item}</th>
                )) : <th tyle="display: none"/> }</tr>
            ))}
        </thead>
        <tbody>
        {response.map((line, i) => (
            <tr key={'trb'+i}>{(i > 0 && line.length !== 0)? line.map((item) => (
                <td key={item}>{item}</td>
            )) : <td tyle="display: none"/>}</tr>
        ))}
        </tbody>
    </table>
</div>
    );
}

export default App;
