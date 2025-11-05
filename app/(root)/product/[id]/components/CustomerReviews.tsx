import { ReviewCard } from './ReviewCard';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const dummyReviews = [
  {
    name: 'Mahadi Hassan',
    date: '24/04/2025',
    productName: 'MacBook 16pro',
    rating: 5,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s...',
    images: [
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmV2aWV3fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1584091377118-79bcb017e125?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
  {
    name: 'Mahadi Hassan',
    date: '24/04/2025',
    productName: 'MacBook 16pro',
    rating: 5,
    comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    images: [
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmV2aWV3fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1584091377118-79bcb017e125?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
];

export const CustomerReviews = ({ reviews }: any) => {
  const lang = useSelector((state: RootState) => state.language.language);

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-bold text-primaryBlue">
        {lang === 'bn' ? 'গ্রাহকদের মতামত' : 'Customers Review'}
      </h2>
      {reviews?.length > 0 ? (
        reviews?.map((review: any, i: any) => <ReviewCard key={i} review={review} />)
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-8">
          <p className="text-lg font-medium text-gray-500">
            {lang === 'bn' ? 'এখনো কোন রিভিউ নেই' : 'No reviews yet'}
          </p>
          <p className="text-sm text-gray-400">
            {lang === 'bn'
              ? 'এই পণ্যের আপনার অভিজ্ঞতা শেয়ার করা প্রথম ব্যক্তি হন!'
              : 'Be the first to share your experience with this product!'}
          </p>
          {/* <button
        className="mt-4 rounded bg-primaryBlue px-6 py-2 text-white transition hover:bg-primaryDarkBlue"
        onClick={handleWriteReview} // You can add a handler to open a review modal/form
      >
        Write a Review
      </button> */}
        </div>
      )}
    </div>
  );
};
