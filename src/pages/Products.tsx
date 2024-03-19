import { useEffect, useState, useCallback } from "react";
import Product from '../types/productType';
import apiUrl from "../api/apiUrl";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';
import ProductsTable from "../components/ProductsTable";
import ErrorMessage from "../components/ErrorMessage";
import ProductModal from "../components/ProductModal";
import SearchInput from "../components/SearchInput";

const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
}

function Products() {
    const navigate: NavigateFunction = useNavigate();
    const query: URLSearchParams = useQuery();
    const location = useLocation();
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchId, setSearchId] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const rowsPerPage: number = 5;
    const isPageInRange: boolean = page >= 0 && page < Math.ceil(totalPages / rowsPerPage);
    
    const fetchProducts = useCallback(async (param: number | string, isById: boolean = false) => {
        setIsLoading(true);
        let queryString: string = `?per_page=${rowsPerPage}`;

        if (isById) {
            queryString += `&id=${param}`;
            setSearchId(param as string);
        } else {
            queryString += `&page=${param}`;
            setPage(parseInt(param as string) -1)
        }

        try {
            const response = await fetch(`${apiUrl}${queryString}`);
            if (!response.ok) {
                if (response.status === 404) {
                    setMessage("Sorry, we couldn't find the product with that id.");
                } else if (response.status >= 500) {
                    setMessage("Sorry, there's a problem with our server. Please try again later.");
                }
                setProducts([]);
                return;
            }
            const data = await response.json();
            if (!data.data || (data?.data?.length === 0) ) {
                setMessage("No products found.");
                setProducts([]);
            } else {
                setProducts(Array.isArray(data.data) ? data.data : [data.data]);
                setTotalPages(data.total);
                setMessage(null);
            }
        } catch (error) {
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const pageParam = query.get("page");
        const idParam = query.get("id");

        if (idParam) {
            fetchProducts(idParam, true);
        } else if (pageParam) {
            fetchProducts(parseInt(pageParam, 10));
        } else {
            fetchProducts(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const handleOpen = (product: Product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        navigate(`?page=${newPage + 1}`);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id: string = event.target.value;
        if(parseInt(id) >= 0 || id === '') {
            setSearchId(id)
            debouncedNavigateForSearch(id);
        }
    };

    const debouncedNavigateForSearch = useDebouncedCallback((id: string) => {
        if(id) {
            navigate(`?id=${id}`);
        } else if (page > 0) {
            navigate(`?page=${page + 1}`);
        } else {
            navigate('');
        }
    }, 500);

    return (
        <>
            <SearchInput
                searchId={searchId}
                handleSearchChange={handleSearchChange}
            />
            { message && <ErrorMessage message={message} /> }
            <ProductsTable 
                products={products}
                handleOpen={handleOpen}
                searchId={searchId}
                isPageInRange={isPageInRange}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
            />
            <ProductModal
                open={open}
                handleClose={handleClose}
                setOpen={setOpen}
                selectedProduct={selectedProduct}
            />
        </>
    );
}

export default Products;
