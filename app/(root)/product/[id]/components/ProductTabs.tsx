'use client';
import { useRef, RefObject, useState } from 'react';
import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const tabs = [
  { id: 'specification', label: 'Specification' },
  { id: 'description', label: 'Description' },
  { id: 'warranty', label: 'Warranty' },
] as const;

type TabId = (typeof tabs)[number]['id'];

// Allow refs to possibly be null (which is always the case with useRef)
type SectionRefs = Record<TabId, RefObject<HTMLDivElement | null>>;

export const ProductTabs = ({
  data,
}: {
  data: {
    specification: string;
    description: string;
    warranty_details: string;
  };
}) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const sectionRefs: SectionRefs = {
    specification: useRef(null),
    description: useRef(null),
    warranty: useRef(null),
  };
  const [activeTab, setActiveTab] = useState<TabId>('specification');

  const scrollToSection = (id: TabId) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getLabel = (id: TabId) => {
    if (lang === 'bn') {
      switch (id) {
        case 'specification':
          return 'স্পেসিফিকেশন';
        case 'description':
          return 'বিবরণ';
        case 'warranty':
          return 'ওয়ারেন্টি';
      }
    }
    return tabs.find((tab) => tab.id === id)?.label || '';
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-2 bg-secondaryWhite">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              scrollToSection(tab.id);
              setActiveTab(tab.id);
            }}
            className={`w-full rounded-md py-2 text-center transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-primaryBlue text-white hover:bg-primaryDarkBlue'
                : 'text-primaryDarkBlue hover:bg-primaryBlue hover:text-white'
            }`}
          >
            {getLabel(tab.id)}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <motion.div
          ref={sectionRefs.specification}
          id="specification"
          className="min-h-[200px] rounded-md p-4 shadow-sm shadow-secondaryBlue"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-2 font-semibold">{lang === 'bn' ? 'স্পেসিফিকেশন' : 'Specification'}</h3>
          <div className="rendered-html" dangerouslySetInnerHTML={{ __html: data?.specification }} />

        </motion.div>

        <motion.div
          ref={sectionRefs.description}
          id="description"
          className="rounded-md bg-white p-4 shadow-sm shadow-secondaryBlue"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-2 font-semibold">{lang === 'bn' ? 'বিবরণ' : 'Description'}</h3>
          <div className="rendered-html" dangerouslySetInnerHTML={{ __html: data?.description }} />

        </motion.div>

        <motion.div
          ref={sectionRefs.warranty}
          id="warranty"
          className="min-h-[100px] rounded-md bg-primaryWhite p-4 shadow-sm shadow-secondaryBlue"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-2 font-semibold">{lang === 'bn' ? 'ওয়ারেন্টি' : 'Warranty'}</h3>
          <div className="rendered-html" dangerouslySetInnerHTML={{ __html: data?.warranty_details }} />
        </motion.div>
      </div>
    </div>
  );
};
