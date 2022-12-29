import StoreLayout from '../layout/StoreLayout';
import Img from './../components/Image/Image';

export default function Home() {
  return (
    <StoreLayout title='Home page'>
      <div>
        <Img src='/pepsi.jpg' />
        <Img src='/pepsi.jpg' />
        <Img src='/pepsi.jpg' />
        <Img src='/pepsi.jpg' />
        <Img src='/pepsi1.jpg' />
      </div>
    </StoreLayout>
  );
}
