import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PrivateLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default PrivateLayout;
