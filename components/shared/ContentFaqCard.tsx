'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  content: string;
  faqs: FAQ[];
};

export default function ContentFaqCard({ content, faqs }: Props) {
  const lang = useSelector((state: RootState) => state.language.language);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-8 rounded-2xl bg-white p-6 shadow">
      {/* Content */}

      <div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-primaryBlue md:text-xl">
              {lang === 'bn' ? 'বিবরণ' : 'Description'}
            </h3>
          </div>

          <div className="relative">
            <div
              className={`rendered-html prose prose-sm md:prose-lg text-gray-700 leading-relaxed transition-all duration-300 break-words pr-2 ${showMore
                ? 'max-h-none overflow-visible'
                : 'max-h-56 md:max-h-72 lg:max-h-[16rem] overflow-y-auto hide-scrollbar'
                }`}
              dangerouslySetInnerHTML={{ __html: content }}
            // ensure long words/images wrap and inner scroll on small screens
            />

            {/* Fade overlay when collapsed */}
            {!showMore && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/95 to-transparent" />
            )}
          </div>

          <div className="mt-4 flex w-full justify-end">
            <button
              name="seeMoreButton"
              onClick={() => setShowMore((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full  bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity duration-200"
            // style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              {showMore
                ? lang === 'bn'
                  ? 'কম দেখান'
                  : 'See Less'
                : lang === 'bn'
                  ? 'আরও দেখুন'
                  : 'See More'}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="mb-6 border-b pb-4 text-xl font-bold text-primaryBlue md:text-3xl">
          {lang === 'bn' ? 'প্রায়ই জিজ্ঞাসিত প্রশ্নাবলী' : 'Frequently Asked Questions'}
        </h2>

        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300"
              >
                <button
                  name={`faqButton-${index}`}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium text-gray-800 transition hover:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {isOpen ? (
                    <BiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <BiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <div
                    key="content"

                  >
                    <div className="px-6 pb-6 pt-0 text-base leading-relaxed text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
