import React from 'react';
import Index from './screen/Index';
import BestSelling from './screen/BestSelling';
import NewArrival from './screen/NewArrival';
import Banner from './screen/Banner';
import Categories from './screen/Categories';
import RecommendedSection from './screen/RecommendedProducts';
import SecondaryBanner from './screen/SecondaryBanner';
import ThardBanner from './screen/ThardBanner';
import FourthBanner from './screen/FourthBanner';
import BestDeals from './screen/BestDeals';
import MotionRevealWrapper from './components/MotionRevealWrapper';
import MostVisitedProducts from './screen/MostVisitedProducts';
import FeatureSection from './screen/FeatureSection';
import getSeoData from './getSeoData';
import ContentFaqSection from './screen/ContentFaqSection';
// Fetch metadata for SEO
export async function generateMetadata() {
  const data = await getSeoData('home');
  //console.log(data);

  return {
    title: data?.data?.meta_title || '',
    description: data?.data?.meta_description || '',
    keywords: data?.data?.meta_keywords?.map((d: any) => d) || [],
    openGraph: {
      title: data?.data?.meta_title || '',
      description: data?.data?.meta_description || '',
      images: [
        {
          url: data?.data?.meta_image, // Update with your image URL
          width: 1200,
          height: 630,
          alt: data?.data?.meta_alt,
        },
      ],
    },
  };
}
async function Page() {
  return (
    <div className="w-full">
      <div className="h-[65px] w-full bg-[#E6EFFF] md:h-[109px]" />

      <MotionRevealWrapper>
        <Index />
      </MotionRevealWrapper>

      <MotionRevealWrapper>
        <Categories />
      </MotionRevealWrapper>

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <MotionRevealWrapper>
          <Banner />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <RecommendedSection />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <SecondaryBanner />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <MostVisitedProducts visitorId={'dfa'} />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <BestSelling />
        </MotionRevealWrapper>

        {/* <MotionRevealWrapper>
          <ThardBanner />
        </MotionRevealWrapper> */}

        <MotionRevealWrapper>
          <NewArrival />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <FourthBanner />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <BestDeals />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <ContentFaqSection />
        </MotionRevealWrapper>

        <MotionRevealWrapper>
          <FeatureSection />
        </MotionRevealWrapper>
      </div>
    </div>
  );
}

export default Page;
