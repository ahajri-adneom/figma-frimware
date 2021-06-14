import './App.scss';
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState([]);
    let [selectedMonth, setState] = useState(null);
    const getData = (selectedMonth) => {
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                this.setState({selectedMonth: myJson[0]})
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <nav className="box mb-3" role="navigation" aria-label="Menu principal">
                        <ul className="p-2 d-flex align-items-center">
                            {
                                data && data.length > 0 && data.map(
                                    (month) =>
                                        <li onClick={(e) => loadContent(e, month)}
                                            className="d-flex flex-column align-items-center">
                                            <a href="#">{month.month}</a>
                                            <img className="polygon"
                                                 style={{visibility: month.month === selectedMonth?.month ? 'visible' : 'hidden'}}
                                                 src="polygon.png"/>
                                        </li>
                                )
                            }
                        </ul>
                    </nav>
                    <main role=" main">
                        <div className=" box-content d-flex flex-column align-items-center">
                            <h1>{selectedMonth?.month}</h1>
                            <div className=" mt-3">
                                {selectedMonth?.content}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

function loadContent(e, month) {
    this.selectedMonth = month;
    window.scrollTo(e.target.offsetLeft - 172, 0)
    return false;
}

export default App;
