"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Banner from "./Banner";
import RecommendedProducts from "./RecommendedProducts";
import SecondaryBanner from "./SecondaryBanner";
import MostVisitedProducts from "./MostVisitedProducts";
import BestSelling from "./BestSelling";
import NewArrival from "./NewArrival";
import ForthBanner from "./FourthBanner";
import BestDeals from "./BestDeals";
import ContentFaqSection from "./ContentFaqSection";
import FeatureSection from "./FeatureSection";

export default function ClientComponent({ banner, home }: { banner: any, home: any }) {
    const lang = useSelector((state: RootState) => state.language.language);

    return (
        <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
            <Banner lang={lang} />
            <RecommendedProducts banner={home} lang={lang} />
            <SecondaryBanner sliderData={banner} />
            <MostVisitedProducts banner={home} visitorId="sff" lang={lang} />
            <BestSelling banner={home} lang={lang} />
            <NewArrival banner={home} lang={lang} />
            <ForthBanner sliderData={banner} />
            <BestDeals banner={home} lang={lang} />
            <ContentFaqSection data={home} />
            <FeatureSection lang={lang} />
        </div>
    );
}
