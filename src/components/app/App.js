import { lazy, Suspense } from "react";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import AppHeader from '../appHeader/AppHeader';
import Spinners from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {

    return (
      <Routers>
        <AppHeader/>
        <main>
          <Container>
            <Suspense fallback={<Spinners />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/comics/*" element={<ComicsPage />} />
                <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </Container>
        </main>
        <footer>
          <Container>
            <Row>
              <Col xs={12}>
                <div className="copy">copyright</div>
              </Col>
            </Row>
          </Container>
        </footer>
      </Routers>
    );
  
}

export default App;
