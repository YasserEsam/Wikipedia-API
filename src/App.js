// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

// This is a useEffect with an empty dependency array
// run one time only after first render
// useEffect(()=>{

// console.log("Use Effet one time")

// },[])

// -----------------------

// This is a useEffect with dependency array is not empty

// useEffect(() =>{
//   if(name || phone){
//     console.log("name has changed !");
//   }

// }, [name, phone]);

// call the useeffect, when any change happend to the name varible
// This is why they call it dependecy array

// ----------------

// useEffect without dependence curlybrascec , will run everytime something change

// useEffect(()=>{
//   console.log("effect")
// })

// ----------------------------
// CleanUp the useEffect memory palce

// useEffect(()=>{
// if(name){
//  const start= setTimeout(() => {
//     console.log("Two Secondes")
//   }, 2000);
//   return() => {
//     clearTimeout(start)
//   }

// }
// },[name])

// ----------------------------

// return (
//     <div className="container">
//     <div className="inputs">
//       <label htmlFor="name">Name </label>
//       <input
//         type="text"
//         name="name"
//         onChange={(e) => setName(e.target.value)}
//         value={name}
//       />
//       <br/>
//       <label htmlFor="phone">Phone</label>
//       <input
//         type="text"
//         onChange={(e) => setPhone(e.target.value)}
//         value={phone}
//         name="phone"
//       />

//       <p>
//         Name : {name} <br />
//         Phone : {phone}
//       </p>
//     </div>
//     </div>
//   );
// };

// export default App;




// ---------------- API using useEffect Hook ------------------





import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import usePrevState from "./hooks/usePrevState";

const App = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
 

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: term,
          },
        });
        setResults(response.data.query.search);
      } catch (error) {
        // Handle any errors here if needed
        console.error(error);
      }
    };
    if(!results.length){
      if (term) {
        search();
      }
    }else if(term !== usePrevState){
      const debounceSearch = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1200);
  
      return () => {
        clearTimeout(debounceSearch)
      }
    } 
  }, [term, results.length,usePrevState]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Search Input
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result.pageid}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {" "}
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                        result.title
                      )}`}
                      target="_blank"
                    >
                      {result.title}
                    </a>
                  </td>
                  <td>
                    {" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: result.snippet }}
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;




// ---------------- End of API using useEffect Hook ------------------





// ---------- using UseRef to store data inside it with out re-rendering and show the previous state  

// import React, { useEffect, useRef, useState } from 'react'

// const App = () => {
//   const [term, setTerm] = useState("");
//   const prevTermState = useRef();

//   useEffect(()=> {
//     prevTermState.current = term;
//   })

//   const prevTerm = prevTermState.current

//   return (
//     <div style={{margin:"10px 20px"}}>
//     <label htmlFor="term"></label>
//       <input type="text"  name='term' onChange={(e)=> setTerm(e.target.value)  }value={term}/>
//       <p> term : {term}</p>
//       <p>prevTerm : {prevTerm}</p>
//     </div>

//   )
// }

// export default App