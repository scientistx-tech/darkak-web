// components/FilterSidebar.tsx
'use client';

import { Product } from "@/types/apiTypes";

interface Props {
    products: Product[];
}

export default function FilterSidebar({ products }: Props) {
    const categories = [...new Set(products.map(p => p.categoryId))];
    const brands = [...new Set(products.map(p => p.brandId))];
    const colors = [
        ...new Set(products.flatMap(p => p.items?.find(i => i.title === 'Color')?.options?.map(c => c.title))),
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Filters</h2>

            {/* Category Filter */}
            <div>
                <h3 className="font-semibold">Category</h3>
                <ul>
                    {categories.map(c => (
                        <li key={c}><input type="checkbox" /> {c}</li>
                    ))}
                </ul>
            </div>

            {/* Brand Filter */}
            <div>
                <h3 className="font-semibold">Brand</h3>
                <ul>
                    {brands.map(b => (
                        <li key={b}><input type="checkbox" /> {b}</li>
                    ))}
                </ul>
            </div>

            {/* Color Filter */}
            <div>
                <h3 className="font-semibold">Color</h3>
                <ul>
                    {colors.map((color, index) => (
                        <li key={index}><input type="checkbox" /> {color}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
