'use client';

import { Product } from '@/app/(root)/types/ProductType';
import ProductCard from '@/components/shared/ProductCard';
import { FaSpinner } from 'react-icons/fa';

interface Props {
    products: Product[];
    isLoading: boolean;
}

const ProductGrid: React.FC<Props> = ({ products, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner size={40} className="animate-spin text-blue-500" />
            </div>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500 text-lg">
                No products found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
