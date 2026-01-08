import { useEffect, useRef, useState } from "react";


  // convert this
  // data = [
  //   [
  //     {
  //       email:"user1",
  //       ...
  //     },
  //     {
  //       email:"user1",
  //       ...
  //     }
  //   ],
  //    [
  //     {
  //       email:"user2",
  //       ...
  //     },
  //     {
  //       email:"user2",
  //       ...
  //     }
  //   ]
  // ]

  // to this
//   [
//     {
//     email,
//     lastobject of Array,
//     complete array of that email
//   },...
// ]


function applyEvent(map, event) {
  const email = event.email;
  const prev = map.get(email);
  if (!prev) {
    map.set(email, {
      email,
      lastelem: event,
      fulldata: [event]
    });
  } else {
    const newFull = [...prev.fulldata, event];
    map.set(email, {
      email,
      lastelem: event,
      fulldata: newFull
    });
  }
}


function buildInitialMap(data) {
  const map = new Map();

  data.forEach(e => {
    if (!e || e.length === 0) return;

    const email = e[0].email;

    map.set(email, {
      email,
      lastelem: e[e.length - 1],
      fulldata: e
    });
  });

  return map;
}


// function MakeDataStructure(data) {
//   const arr = [];
//   data.forEach(e => {
//     if (!e || e.length === 0) return;
//     const obj = {
//       email: e[0].email,
//       lastelem: e[e.length - 1],
//       fulldata: e
//     };
//     arr.push(obj);
//   });
//   return arr;
// }


export function Ws_Hook(contest) {
    const wsref = useRef(null)
    const reconnectTimer = useRef(null);
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("IDLE");
    const [error, setError] = useState(null);
    const dataMapRef = useRef(new Map());

    useEffect(()=>{

        if(!contest){
            console.log("url not found");
            return;
        }

        const connect = ()=>{
        const  url = `ws://127.0.0.1:8000/ws/admin/?contesturl=${contest}`
        const socket = new WebSocket(url)
        wsref.current = socket;

        socket.onopen = () => {
          console.log("✅ WS connected");
          setStatus("CONNECTED");
        };

        socket.onmessage = (e) => {
          const payload = JSON.parse(e.data);
          if (payload.type === "FULL_DATA") {
            const map = buildInitialMap(payload.data);
            dataMapRef.current = map;
            setMessages(Array.from(map.values()));
            return;
          }

          if (payload.type === "EVENT") {
            const map = dataMapRef.current;
            applyEvent(map, payload.data);
            setMessages(Array.from(map.values()));
          }
      };
        
        socket.onerror = (e) => {
          console.error("WebSocket error event:", e);
          console.warn("WS transient error (ignored)");      
          setStatus("ERROR");
        };

        socket.onclose = () => {
          setStatus("DISCONNECTED");
          reconnectTimer.current = setTimeout(connect, 2000);
        };

      }

      connect()

      return () => {
        clearTimeout(reconnectTimer.current);
        if(wsref.current) wsref.current.close();
      };

    },[contest])

    const disconnect = ()=>{
      clearTimeout(reconnectTimer.current);
      wsref.current?.close();
    }

    return {
    messages,
    status,
    error,
    disconnect,
  };
}
