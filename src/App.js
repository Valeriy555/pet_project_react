import {Link, Route, Routes} from "react-router-dom";

import {UsersPage} from "./components/UserBase";
import {StagePage} from "./components/StagePage";
import {ContainersPage} from "./components/СontainerBase";
import css from "./App.module.css";

const App = () => {

    return (
        <div>

            <div className={css.WrapApp}>
                <div className={css.link}>
                    <li><Link to={'/stages'}>Stage Page</Link></li>
                    <li><Link to={'/users'}>users page</Link></li>
                    <li><Link to={'/containers'}>containers page</Link></li>
                </div>

                <Routes>
                    <Route path={'stages'} element={<StagePage/>}/>


                    <Route path={'users'} element={<UsersPage/>}/>
                    <Route path={'containers'} element={<ContainersPage/>}/>


                </Routes>
            </div>

        </div>
    );
};

export default App;
