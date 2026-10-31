import { useSelector } from 'react-redux';
import Widget from '../components/Widget';
import './adminHome.scss';

const AdminHome = () => {
  const { allUsers } = useSelector((state) => state.user);
  const { movies, series } = useSelector((state) => state.video);

  return (
    <div className='admin-home'>
      <div className='widgets'>
        <Widget type='sub' list={allUsers} />
        <Widget type='movie' list={movies} />
        <Widget type='series' list={series} />
      </div>
    </div>
  );
};

export default AdminHome;
