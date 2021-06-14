import './App.scss';
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState([]);
    let [selectedMonth, updateSelectedMonth] = useState(null);
    const loadContent = (e, month) => {
        updateSelectedMonth(month)
        window.scrollTo(e.target.offsetLeft - 172, 0)
        return false;
    }

    const getData = () => {
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                updateSelectedMonth(myJson[0]);
                setData(myJson);
            });
    }
    useEffect(() => {
        getData();
        setTimeout(()=>{ window.scrollTo(0, 0)}, 300);
    }, [])

    return (
            <main className="ml-3 pt-3">
                <section>
                    <nav className="box mb-3" role="navigation" aria-label="Menu principal">
                        <ul className="p-2 d-flex align-items-center">
                            {
                                data && data.length > 0 && data.map(
                                    (month) =>
                                        <li  key={month.month} onClick={(e) => loadContent(e, month)}
                                            className="d-flex flex-column align-items-center">
                                            <a href="/#">{month.month.substr(0,3)}</a>
                                            <img className="polygon"
                                                 alt="indication"
                                                 style={{visibility: month.month === selectedMonth?.month ? 'visible' : 'hidden'}}
                                                 src="polygon.png"/>
                                        </li>
                                )
                            }
                        </ul>
                    </nav>
                    <section className="mr-3" id="details-month">
                        <article className="box-content d-flex flex-column align-items-center">
                            <header><h1>{selectedMonth?.contentTitle}</h1></header>
                            <footer dangerouslySetInnerHTML={{ __html: selectedMonth?.content }}></footer>
                        </article>
                    </section>
                </section>
            </main>
    );
}

export default App;
