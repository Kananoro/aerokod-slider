import Slider from '@/components/Slider/slider';
import { NextPage } from 'next';

const HomePage: NextPage = () => (
  <>
    <h1>
      Тестовое задание
      <span className="text-blue">Slider-Beautiful</span>
    </h1>
    <div className="slider">
      <Slider />
    </div>
  </>
);

export default HomePage;
