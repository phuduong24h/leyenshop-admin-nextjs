import { Image } from 'antd';

import { Images, Icons } from 'assets';
import { Calendar } from 'components/form';

const items = [
  {
    key: 1,
    name: 'Clothes',
    icon: Icons.clothes
  },
  {
    key: 2,
    name: 'Cosmetics',
    icon: Icons.cosmetics
  },
  {
    key: 3,
    name: 'Snacks',
    icon: Icons.snacks
  },
  {
    key: 4,
    name: 'Fast food',
    icon: Icons.fast_food
  },
  {
    key: 5,
    name: 'shoes',
    icon: Icons.shoes
  }
];
const CategoryItem = item => {
  const { key, name, icon } = item || {};

  return (
    <div key={key} className="rounded-md border-2 shadow-xl">
      <div className="flex flex-col items-center justify-center px-[46px] py-[26px]">
        <Image src={icon} height={120} width={120} preview={false} className="z-0" />
        <p className="text-xl">{name}</p>
      </div>
    </div>
  );
};

const CategoryHome = () => {
  return (
    <div className="mt-[42px]">
      <p className="text-3xl font-medium">Category</p>
      <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items?.map?.(CategoryItem)}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <div className="flex">
        <div className="relative flex w-full justify-end overflow-hidden rounded-2xl bg-gradient-to-b from-[#e6e8f6] to-[#011ca1] p-8 lg:w-2/3">
          <Image src={Images.work} height={360} preview={false} className="z-0" />
        </div>
        <div className="hidden w-1/3 flex-col items-center justify-center p-8 lg:flex">
          <p className="text-3xl font-medium">Calendar</p>
          <Calendar />
        </div>
      </div>
      <CategoryHome />
    </div>
  );
};

export default Home;
