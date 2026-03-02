import { useState, useEffect } from "react"
import axios from 'axios';
import { API_BASE } from "../config/api.js";

export default function Home() {
    const [msg, setMsg] = useState("");
    useEffect(() => {
      const getmsg=  async () => {
        const message = await axios.get(`${API_BASE}/api/expenses`);
            console.log(message.data.data);
            setMsg(message.data.data);
        }
    getmsg();
    }, []);
    return (
        <div>
            <h1>{msg.map((i)=>{
                return <li>
                    {i}
                </li>
            })}</h1>
        </div>
    )
}