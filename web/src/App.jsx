import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { setDrawerOpen } from './redux/slices/appSlice';
import { getVideos, setFeatured } from './redux/slices/videoSlice';
import { shuffleArray } from './util/helpers';
import ProtectedRoute from './components/ProtectedRoute';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './views/Auth/Login';
import Forgot from './views/Auth/Forgot';
import Reset from './views/Auth/Reset';
import UserHome from './views/User/UserHome';
import Watch from './views/User/Watch';
import AdminHome from './views/Admin/AdminHome';
import List from './views/Admin/List';
import New from './views/Admin/New';
import VideoDetails from './views/User/VideoDetails';
import SeriesDetails from './views/User/SeriesDetails';
import SeasonDetails from './views/User/SeasonDetails';
import Category from './views/User/Category';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TEN_MIN_MS = 10 * 60 * 1000; // 10 minutes
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 2 * 60 * 60 * 1000; // check every 2 hours, refetch when stale

const App = () => {
  const { theme, drawerOpen } = useSelector((state) => state.app);
  const { activeUser } = useSelector((state) => state.user);
  const { allVideos, movies, series, lastFetched } = useSelector(
    (state) => state.video,
  );
  const dispatch = useDispatch();

  let element;

  if (activeUser) {
    element = <Navigate to='/home-user' />;
  } else {
    element = <Login />;
  }

  useEffect(() => {
    if (!activeUser) return;
    if (!allVideos?.length || !!movies?.length || !series?.length) {
      dispatch(getVideos());
    }
  }, [activeUser, allVideos?.length, movies?.length, series?.length, dispatch]);

  useEffect(() => {
    if (!activeUser) return;

    const checkStaleness = () => {
      const isStale = !lastFetched || Date.now() - lastFetched > ONE_DAY_MS;
      if (isStale) {
        dispatch(getVideos());
      }
    };

    const interval = setInterval(checkStaleness, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [activeUser, lastFetched, dispatch]);

  useEffect(() => {
    if (!activeUser) return;

    const refreshFeatured = () => {
      dispatch(setFeatured(shuffleArray(movies)[0]));
    };

    const interval = setInterval(refreshFeatured, TEN_MIN_MS);
    return () => clearInterval(interval);
  }, [activeUser, dispatch, movies]);

  useEffect(() => {
    const checkWidth = () => {
      if (drawerOpen && window.innerWidth >= 820) {
        dispatch(setDrawerOpen(false));
      }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, [drawerOpen, dispatch]);

  return (
    <div className='app' data-theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={element} />
          <Route path='/forgot-password' element={<Forgot />} />
          <Route path='/reset-password/:id' element={<Reset />} />
          <Route
            path='/home-user'
            element={
              <ProtectedRoute
                element={<UserLayout children={<UserHome />} />}
              />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={<UserLayout children={<Category type='movies' />} />}
              />
            }
          />
          <Route
            path='/series'
            element={
              <ProtectedRoute
                element={<UserLayout children={<Category type='series' />} />}
              />
            }
          />
          <Route
            path='/my-list'
            element={
              <ProtectedRoute
                element={<UserLayout children={<Category type='fav' />} />}
              />
            }
          />
          <Route
            path='/watch'
            element={<ProtectedRoute element={<Watch />} />}
          />
          <Route
            path='/home-admin'
            element={
              <ProtectedRoute
                element={<AdminLayout children={<AdminHome />} />}
              />
            }
          />
          <Route path='subs'>
            <Route
              index
              element={
                <ProtectedRoute
                  element={
                    <AdminLayout children={<List title='Subscribers' />} />
                  }
                />
              }
            />
            <Route
              path='new'
              element={
                <ProtectedRoute
                  element={
                    <AdminLayout
                      children={<New type='sub' title='Add New Subscriber' />}
                    />
                  }
                />
              }
            />
          </Route>
          <Route
            path='/inventory'
            element={
              <ProtectedRoute
                element={<AdminLayout children={<List title='Inventory' />} />}
              />
            }
          />
          <Route path='lists'>
            <Route
              index
              element={
                <ProtectedRoute
                  element={<UserLayout children={<List title='Lists' />} />}
                />
              }
            />
          </Route>
          <Route
            path='/video-details'
            element={
              <ProtectedRoute
                element={<UserLayout children={<VideoDetails />} />}
              />
            }
          />
          <Route
            path='/series-details'
            element={
              <ProtectedRoute
                element={<UserLayout children={<SeriesDetails />} />}
              />
            }
          />
          <Route
            path='/season-details'
            element={
              <ProtectedRoute
                element={<UserLayout children={<SeasonDetails />} />}
              />
            }
          />
          {/* <Route
						path='/test'
						element={<ProtectedRoute element={<Drawer />} />}
					/> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
