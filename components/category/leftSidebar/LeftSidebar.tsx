'use client';

import React, { useState, useEffect } from 'react';
import Price from './Price';
import FilterRadioGroup from '@/components/category/leftSidebar/FilterRadioGroup';
import FilterRadioSearch from '@/components/category/leftSidebar/FilterRadioSearch';
import { IoIosArrowDown } from 'react-icons/io';
import { useGetProductCategoriesQuery } from '@/redux/services/client/categories';
import { useGetBrandsPublicQuery } from '@/redux/services/client/brands';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';

const availabilityOptions = [
  { value: 'in-stock', label: 'In stock' },
  { value: 'pre-order', label: 'Pre Order' },
];

const warrantyOptions = [
  { value: 'official', label: 'Official' },
  { value: 'darkak', label: 'Darkak' },
];

// const regionOptions = ["BD", "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ"];

const regionOptions = [
  {
    label: 'BD',
    value: 'BD',
  },
  {
    label: 'AF',
    value: 'AF',
  },
  {
    label: 'AL',
    value: 'AL',
  },
  {
    label: 'DZ',
    value: 'DZ',
  },
  {
    label: 'AS',
    value: 'AS',
  },
  {
    label: 'AD',
    value: 'AD',
  },
  {
    label: 'AO',
    value: 'AO',
  },
  {
    label: 'AI',
    value: 'AI',
  },
  {
    label: 'AQ',
    value: 'AQ',
  },
];

// Add your nested categories data here or fetch from API

const LeftSidebar: React.FC<{ onFilterChange?: (params: any) => void }> = (props) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const [availability, setAvailability] = useState('');
  const [warranty, setWarranty] = useState('darkak');
  const [region, setRegion] = useState('BD');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');
  const [open, setOpen] = useState<boolean>(true);
  // --- Brand Filter Section ---
  const [brandSearch, setBrandSearch] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);
  const params = useParams();
  const { brandId } = params;
  // Only one brand can be selected
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  // Store the selected brand title
  const [selectedBrandTitle, setSelectedBrandTitle] = useState<string>((brandId as string) || '');

  // --- Price filter state ---
  const [lowPrice, setLowPrice] = useState('');
  const [highPrice, setHighPrice] = useState('');

  const searchParams = useSearchParams();

  // redux hooks
  const { data: categoriesData } = useGetProductCategoriesQuery();
  const { data: brandsData } = useGetBrandsPublicQuery({
    search: brandSearch,
    // categoryId: categoryIdParams,
    // subCategoryId: subCategoryIdParams,
    // subSubCategoryId: subSubCategoryIdParams,
  });
  const router = useRouter();

  // Ref for auto-scroll to top of sidebar on filter change
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  //console.log('props', props);

  const handleOpenClose = () => {
    setOpen((pre) => !pre);
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability(e.target.value);
  };

  const handleChangeWarranty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarranty(e.target.value);
  };

  const handleChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  // Collapsible category filter component
  const CollapsibleCategoryFilter = ({
    categories,
    selected,
    onSelect,
    onSelectSub,
    onSelectSubSub,
  }: any) => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    // Always keep expanded if selected, or if previously expanded
    const isExpanded = (id: string, selectedId: string) => {
      return expanded[id] || selectedId === id;
    };

    const handleToggle = (id: string) => {
      setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
      <ul className="pl-0">
        {categories.map((cat: any) => (
          <li key={cat.id} className="mb-1">
            <div className="group flex items-center justify-between">
              <span
                className={`flex-1 cursor-pointer rounded px-2 py-1 transition hover:bg-blue-50 ${selected === cat.id ? 'bg-blue-100 font-semibold text-blue-700' : ''}`}
                // onClick={() => {
                //   onSelect(cat.id);
                //   if (onSelectSub) onSelectSub.set("");
                //   if (onSelectSubSub) onSelectSubSub.set("");
                //   if (selectedCategory === cat.id) {
                //     setSelectedCategory("");
                //     // Remove categoryID from query
                //     const params = new URLSearchParams(searchParams.toString());
                //     params.delete("categoryId");
                //     router.push(`?${params.toString()}`);
                //   } else {
                //     setSelectedCategory(cat?.id);
                //     // Add or update categoryID in query
                //     const params = new URLSearchParams(searchParams.toString());
                //     params.set("categoryId", cat.title);
                //     params.delete("subCategoryId");
                //     params.delete("subSubCategoryId");
                //     router.push(`?${params.toString()}`);
                //   }
                // }}
                onClick={() => router.push(`/category/${cat?.slug}`)}
              >
                {cat.title}
              </span>
              {cat.sub_category && cat.sub_category.length > 0 && (
                <button
                  className="ml-2 p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => handleToggle(cat.id)}
                  aria-label={isExpanded(cat.id, selected) ? 'Collapse' : 'Expand'}
                  type="button"
                >
                  <span
                    className={`transition-transform ${isExpanded(cat.id, selected) ? 'rotate-90' : ''}`}
                  >
                    ▶
                  </span>
                </button>
              )}
            </div>
            {cat.sub_category && cat.sub_category.length > 0 && isExpanded(cat.id, selected) && (
              <ul className="ml-4 border-l border-gray-200 pl-2">
                {cat.sub_category.map((sub: any) => (
                  <li key={sub.id} className="mb-1">
                    <div className="group flex items-center justify-between">
                      <span
                        className={`flex-1 cursor-pointer rounded px-3 py-1 text-sm transition hover:bg-blue-50 ${onSelectSub && onSelectSub.selected === sub.id ? 'border-l-4 border-blue-500 bg-blue-200 font-semibold text-blue-800' : ''}`}
                        style={{
                          background:
                            onSelectSub && onSelectSub.selected === sub.id ? '#e0f2fe' : undefined,
                        }}
                        // onClick={() => {
                        //   if (onSelect) onSelect(cat.id); // select parent cat
                        //   onSelectSub && onSelectSub.set(sub.id);
                        //   if (onSelectSubSub) onSelectSubSub.set('');
                        //   if (selectedSubCategory === sub.id) {
                        //     setSelectedSubCategory('');
                        //     // Remove categoryID from query
                        //     const params = new URLSearchParams(searchParams.toString());
                        //     params.delete('subCategoryId');
                        //     router.push(`?${params.toString()}`);
                        //   } else {
                        //     setSelectedSubCategory(sub?.id);
                        //     // Add or update categoryID in query
                        //     const params = new URLSearchParams(searchParams.toString());
                        //     params.set('categoryId', cat.title);
                        //     params.set('subCategoryId', sub.title);
                        //     params.delete('subSubCategoryId');
                        //     router.push(`?${params.toString()}`);
                        //   }
                        // }}
                        onClick={() =>
                          router.push(
                            `/category/${cat?.slug}/${sub?.slug}`
                          )
                        }
                      >
                        {sub.title}
                      </span>
                      {sub.sub_sub_category && sub.sub_sub_category.length > 0 && (
                        <button
                          className="ml-2 mt-2 p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                          onClick={() => handleToggle(sub.id)}
                          aria-label={
                            isExpanded(sub.id, onSelectSub.selected) ? 'Collapse' : 'Expand'
                          }
                          type="button"
                        >
                          <span
                            className={`transition-transform ${isExpanded(sub.id, onSelectSub.selected) ? 'rotate-90' : ''}`}
                          >
                            ▶
                          </span>
                        </button>
                      )}
                    </div>
                    {sub.sub_sub_category &&
                      sub.sub_sub_category.length > 0 &&
                      isExpanded(sub.id, onSelectSub.selected) && (
                        <ul className="ml-4 border-l border-blue-100 pl-2">
                          {sub.sub_sub_category.map((subsub: any) => (
                            <li key={subsub.id}>
                              <span
                                className={`cursor-pointer rounded px-4 py-1 text-xs transition hover:bg-blue-50 ${onSelectSubSub && onSelectSubSub.selected === subsub.id ? 'border-l-4 border-blue-600 bg-blue-300 font-semibold text-blue-900' : ''}`}
                                style={{
                                  background:
                                    onSelectSubSub && onSelectSubSub.selected === subsub.id
                                      ? '#bae6fd'
                                      : undefined,
                                }}
                                // onClick={() => {
                                //   if (onSelect) onSelect(cat.id); // select parent cat
                                //   if (onSelectSub) onSelectSub.set(sub.id); // select parent subcat
                                //   onSelectSubSub && onSelectSubSub.set(subsub.id);
                                //   if (selectedSubSubCategory === subsub.id) {
                                //     setSelectedSubSubCategory('');
                                //     // Remove categoryID from query
                                //     const params = new URLSearchParams(searchParams.toString());
                                //     params.delete('subSubCategoryId');
                                //     router.push(`?${params.toString()}`);
                                //   } else {
                                //     setSelectedSubSubCategory(subsub?.id);
                                //     // Add or update categoryID in query
                                //     const params = new URLSearchParams(searchParams.toString());
                                //     params.set('categoryId', cat.title);
                                //     params.set('subCategoryId', sub.title);
                                //     params.set('subSubCategoryId', subsub.title);
                                //     router.push(`?${params.toString()}`);
                                //   }
                                // }}
                                onClick={() =>
                                  router.push(
                                    `/category/${cat?.slug}/${sub?.slug}/${subsub?.slug}`
                                  )
                                }
                              >
                                {subsub.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Filter brands by search
  const filteredBrands = Array.isArray(brandsData?.data)
    ? brandsData.data.filter((brand: any) =>
      brand.title.toLowerCase().includes(brandSearch.toLowerCase())
    )
    : [];
  const visibleBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 10);

  const handleBrandCheck = (id: string, title: string) => {
    setSelectedBrand(id);
    setSelectedBrandTitle(title);
    router.push(`/brand/${title}`);
    return;
    if (selectedBrand === id) {
      setSelectedBrand('');
      setSelectedBrandTitle('');
      // Remove brandId from query
      const params = new URLSearchParams(searchParams.toString());
      params.delete('brandId');
      router.push(`?${params.toString()}`);
    } else {
      setSelectedBrand(id);
      setSelectedBrandTitle(title);
      // Add or update brandId in query
      const params = new URLSearchParams(searchParams.toString());
      params.set('brandId', title);
      router.push(`?${params.toString()}`);
    }
  };

  // --- Filter state aggregation for parent ---
  useEffect(() => {
    // Compose all filter values into a single object (exclude categoryId, subCategoryId, subSubCategoryId)
    const queryParams = {
      available: availability,
      warranty,
      region,
      lowPrice: !lowPrice  ? "" : Number(lowPrice),
      highPrice: !highPrice  ? "" : Number(highPrice),
      // Add more if needed
    };

    // Remove keys with empty string, undefined, or NaN
    const filteredParams: Record<string, any> = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && !(typeof value === 'number' && isNaN(value))) {
        filteredParams[key] = value;
      }
    });

    if (typeof window !== 'undefined' && typeof props?.onFilterChange === 'function') {
      props.onFilterChange(filteredParams);
    }
  }, [
    // Remove category dependencies
    selectedBrandTitle,
    availability,
    warranty,
    region,
    lowPrice,
    highPrice,
  ]);

  return (
    <div ref={sidebarRef} className="flex flex-col gap-y-6">
      <Price
        onPriceChange={({ lowPrice, highPrice }) => {

          setLowPrice(lowPrice);
          setHighPrice(highPrice);
        }}
      />

      {/* category */}
      <div className="rounded bg-blue-100 p-3">
        <div className={`mb-3 flex items-center justify-between`}>
          <h2 className="text-lg font-semibold text-blue-900">
            {lang === 'bn' ? 'বিভাগ' : 'Category'}
          </h2>
          <div className="flex items-center gap-2">
            {(selectedCategory || selectedSubCategory || selectedSubSubCategory) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedSubCategory('');
                  setSelectedSubSubCategory('');
                  // Remove categoryId, subCategoryId, subSubCategoryId from query
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('categoryId');
                  params.delete('subCategoryId');
                  params.delete('subSubCategoryId');
                  router.push(`?${params.toString()}`);
                }}
                className="rounded border border-blue-300 bg-blue-200 px-2 py-1 text-xs font-medium text-blue-900 hover:bg-blue-300"
                type="button"
                title="Clear category filter"
              >
                {lang === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
              </button>
            )}
            <button
              onClick={handleOpenClose}
              className="flex size-[30px] items-center justify-center rounded-full bg-[#003084]"
            >
              <IoIosArrowDown size={20} color="white" className={`${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        {open && (
          <CollapsibleCategoryFilter
            categories={categoriesData ? categoriesData : []}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            onSelectSub={{
              selected: selectedSubCategory,
              set: setSelectedSubCategory,
            }}
            onSelectSubSub={{
              selected: selectedSubSubCategory,
              set: setSelectedSubSubCategory,
            }}
          />
        )}
      </div>
      {/* Brand Filter */}
      <div className="rounded bg-blue-100 p-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-blue-900">
            {lang === 'bn' ? 'ব্র্যান্ড' : 'Brand'}
          </h2>
        </div>
        <input
          type="text"
          placeholder="Search brand..."
          className="mb-2 w-full rounded border px-2 py-1 text-sm focus:outline-none"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
        />
        <div
          className={`hide-scrollbar overflow-y-auto pr-1 ${showAllBrands ? 'h-fit' : 'max-h-86'}`}
        >
          {/* All option for clearing brand filter */}
          <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 font-semibold text-blue-900 hover:bg-blue-50">
            <input
              type="radio"
              name="brand-filter"
              checked={selectedBrand === ''}
              onClick={() => {
                setSelectedBrand('');
                setSelectedBrandTitle('');
                // Remove brandId from query
                // const params = new URLSearchParams(searchParams.toString());
                //params.delete('brandId');
                router.push(`/category`);
              }}
              className="accent-blue-600"
            />
            <span className="truncate text-sm">All</span>
          </label>
          {visibleBrands.length === 0 && (
            <div className="py-2 text-sm text-gray-400">
              {lang === 'bn' ? 'কোনো ব্র্যান্ড পাওয়া যায়নি' : 'No brands found'}
            </div>
          )}
          {/* Brand filter UI */}
          {visibleBrands.map((brand: any) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-blue-50"
            >
              <input
                type="radio"
                name="brand-filter"
                checked={String(brandId) === brand.slug}
                onChange={() => handleBrandCheck(brand.id, brand.slug)}
                className="accent-blue-600"
              />
              {/* Brand logo if available */}
              {brand.image && (
                <Image
                  src={brand.image}
                  alt={brand.title}
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                />
              )}
              <span className="truncate text-sm">{brand.title}</span>
            </label>
          ))}
        </div>
        {filteredBrands.length > 10 && (
          <button
            className="mt-2 w-full rounded bg-blue-200 py-1 text-xs font-medium text-blue-900 hover:bg-blue-300"
            onClick={() => setShowAllBrands((v) => !v)}
            type="button"
          >
            {showAllBrands
              ? lang === 'bn'
                ? 'কম দেখান'
                : 'Show less'
              : lang === 'bn'
                ? `সব দেখান (${filteredBrands.length})`
                : `Show all (${filteredBrands.length})`}
          </button>
        )}
      </div>
      <FilterRadioGroup
        title={lang === 'bn' ? 'উপলব্ধতা' : 'Availability'}
        name="availability"
        options={availabilityOptions}
        selected={availability}
        onChange={handleAvailabilityChange}
      />
      <FilterRadioGroup
        title={lang === 'bn' ? 'ওয়ারেন্টি' : 'Warranty'}
        name="warranty"
        options={warrantyOptions}
        selected={warranty}
        onChange={handleChangeWarranty}
      />
      <FilterRadioSearch
        title={lang === 'bn' ? 'অঞ্চল' : 'Region'}
        name="region"
        options={regionOptions}
        selected={region}
        onChange={handleChangeRegion}
      // showSeeMore={true}
      // onSeeMore={() => alert("Load more storage options")}
      />
    </div>
  );
};

export default LeftSidebar;
