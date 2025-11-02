'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from '@/components/shared/NavLink';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useGetProductCategoriesQuery } from '@/redux/services/client/categories';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const shimmer = 'animate-pulse bg-secondaryLiteBlue rounded-md h-6 mb-2';

export default function Test() {
  const lang = useSelector((state: RootState) => state.language.language);

  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subCategoryTop, setSubCategoryTop] = useState<number>(0);
  const mainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: categories, isLoading, error } = useGetProductCategoriesQuery('');

  const handleMainHover = (catName: string) => {
    setHoveredMain(catName);
    setHoveredSub(null);

    const mainItem = mainRefs.current[catName];
    if (mainItem) {
      const { top } = mainItem.getBoundingClientRect();
      const containerTop = mainItem.offsetParent?.getBoundingClientRect().top || 0;
      setSubCategoryTop(top - containerTop);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setHoveredMain(null);
        setHoveredSub(null);
      }}
    >
      <NavLink
        href="/category"
        className="group flex cursor-pointer items-center gap-2 font-serif text-lg text-secondaryWhite transition-colors duration-300 hover:text-secondaryBlue"
      >
        {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
        <FaAngleDown
          className={`transition-transform duration-300 ${
            isDropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </NavLink>

      {isDropdownOpen && (
        <div className="absolute left-[-50px] top-full z-50 flex bg-transparent">
          {/* Main Categories */}
          <div className="mt-4 flex min-w-[300px] flex-col rounded border border-primary bg-primaryBlue p-4 text-white shadow-lg">
            {isLoading ? (
              [...Array(5)].map((_, i) => <div key={i} className={shimmer} />)
            ) : error ? (
              <p className="text-sm text-red-500">Failed to load.</p>
            ) : (
              categories?.map((cat) => (
                <div
                  key={cat.title}
                  ref={(el) => {
                    mainRefs.current[cat.title] = el;
                  }}
                  onMouseEnter={() => handleMainHover(cat.title)}
                  className={`flex cursor-pointer items-center justify-between px-3 py-2 transition-all duration-200 ${
                    hoveredMain === cat.title ? 'bg-secondaryBlue' : 'hover:bg-secondaryBlue'
                  }`}
                >
                  <Link
                    href={`/category/${cat?.slug}`}
                    className="flex w-full items-center gap-2"
                  >
                    <Image
                      src={cat.icon}
                      alt={cat.title}
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                    <span className="line-clamp-1">{cat.title}</span>
                  </Link>
                  <FaAngleRight />
                </div>
              ))
            )}
          </div>

          {/* Subcategories */}
          {(() => {
            const selectedMainCategory = categories?.find((c) => c.title === hoveredMain);

            if (!selectedMainCategory?.sub_category?.length) return null;

            return (
              <div
                className="absolute left-[300px] z-50 min-w-[250px] border border-primary bg-primaryBlue p-4 text-white shadow-lg"
                style={{ top: subCategoryTop }}
              >
                {isLoading
                  ? [...Array(4)].map((_, i) => <div key={i} className={shimmer} />)
                  : selectedMainCategory.sub_category.map((sub) => (
                      <div
                        key={sub.title}
                        onMouseEnter={() => {
                          if (sub.sub_sub_category) setHoveredSub(sub.title);
                          else setHoveredSub(null);
                        }}
                        className={`flex cursor-pointer items-center justify-between px-3 py-2 transition-all duration-200 hover:bg-secondaryBlue ${
                          hoveredSub === sub.title ? 'bg-secondaryBlue' : 'hover:bg-secondaryBlue'
                        }`}
                      >
                        <Link
                          href={`/category/${selectedMainCategory?.slug}/${sub?.slug}`}
                          // href={{
                          //   pathname: '/category',
                          //   query: {
                          //     categoryId: selectedMainCategory.title,
                          //     subCategoryId: sub.title,
                          //   },
                          // }}
                          className="w-full"
                        >
                          {sub.title}
                        </Link>
                        {sub.sub_sub_category && <FaAngleRight />}
                      </div>
                    ))}
              </div>
            );
          })()}

          {/* Sub-subcategories */}
          {(() => {
            const selectedSubCategory = categories
              ?.find((c) => c.title === hoveredMain)
              ?.sub_category.find((s) => s.title === hoveredSub);

            if (!selectedSubCategory?.sub_sub_category?.length) return null;

            const parentCategory = categories?.find((c) => c.title === hoveredMain);
            return (
              <div
                className="absolute left-[550px] z-50 min-w-[250px] border border-primary bg-primaryBlue p-4 text-white shadow-lg"
                style={{ top: subCategoryTop }}
              >
                {isLoading
                  ? [...Array(3)].map((_, i) => <div key={i} className={shimmer} />)
                  : selectedSubCategory.sub_sub_category.map((item) => (
                      <Link
                        key={item.title}
                        href={`/category/${parentCategory?.slug || ''}/${selectedSubCategory?.slug}/${item?.slug}`}
                        // href={{
                        //   pathname: '/category',
                        //   query: {
                        //     categoryId: parentCategory?.title,
                        //     subCategoryId: selectedSubCategory?.title,
                        //     subSubCategoryId: item.title,
                        //   },
                        // }}
                        className="block rounded px-3 py-2 transition-all duration-200 hover:bg-secondaryBlue"
                      >
                        {item.title}
                      </Link>
                    ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
