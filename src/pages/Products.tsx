import { useEffect, useState, useCallback } from "react";
import Product from '../types/productType'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';
import apiUrl from "../api/apiUrl";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';

const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
}

function Products() {
    const navigate: NavigateFunction = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(6);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchId, setSearchId] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const query: URLSearchParams = useQuery();
    const location = useLocation();
    const isPageInRange = page >= 0 && page < Math.ceil(totalPages / rowsPerPage);
    
    const fetchProducts = useCallback(async (param: number | string, isById: boolean = false) => {
        let queryString: string = '';

        if (isById) {
            queryString = `?id=${param}`;
            setSearchId(param as string);
        } else {
            queryString = `?page=${param}`;
        }

        try {
            const response = await fetch(`${apiUrl}${queryString}`);
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    setMessage(isById ? "Sorry, we couldn't find the product with that id." : "Sorry, we couldn't find the products you were looking for.");
                } else if (response.status >= 500) {
                    setMessage("Sorry, there's a problem with our server. Please try again later.");
                }
                setProducts([]);
                return;
            }
            const data = await response.json();
            if (!data.data || (Array.isArray(data.data) && data.data.length === 0) ) {
                setMessage(isById ? "No products found with that ID." : "No products found.")
                setProducts([])
            } else {
                setProducts(Array.isArray(data.data) ? data.data : [data.data]);
                setRowsPerPage(data.per_page);
                setTotalPages(data.total);
                setMessage(null);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setMessage("An unexpected error occurred. Please try again.");
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
        setSearchId(id)
    };

    const debouncedNavigateForSearch = useDebouncedCallback((id) => {
        if(id) {
            navigate(`?id=${id}`);
        } else if (page > 0) {
            navigate(`?page=${page + 1}`);
        } else {
            navigate('');
        }
    }, 500);

    useEffect(() => {
        debouncedNavigateForSearch(searchId);
    }, [searchId, debouncedNavigateForSearch]);

    return (
        <>
            <div className="flex flex-col mb-12">
                <label htmlFor="searchId">Search by ID:</label>
                <input
                    type="number"
                    id="searchId"
                    value={searchId}
                    onChange={handleSearchChange}
                    className="border border-gray-400 rounded-md px-3 py-1.5 w-full max-w-44 focus:outline-none"
                />
            </div>
            {message && (
                <div className="text-center my-4 p-2 bg-red-100 text-red-700 rounded">
                    {message}
                </div>
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Year</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="cursor-pointer"
                            style={{ backgroundColor: product.color }}
                            onClick={() => handleOpen(product)}
                        >
                        <TableCell align="center">{product.id}</TableCell>
                        <TableCell align="center">{product.name}</TableCell>
                        <TableCell align="center">{product.year}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {searchId === '' && isPageInRange && (
                    <TablePagination
                        component="div"
                        count={totalPages}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[]}
                    />
                )}
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-72 sm:min-w-80 bg-white rounded-md p-5 pt-2 focus:outline-none flex flex-col" >
                    <div className="flex justify-end">
                        <IconButton className="text-end w-fit" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {selectedProduct && (
                        <div>
                            <h2 className="text-xl font-semibold text-center">{selectedProduct.name}</h2>
                            <p>ID: {selectedProduct.id}</p>
                            <p>Year: {selectedProduct.year}</p>
                            <p>Color: <span style={{color: selectedProduct.color}}>{selectedProduct.color}</span></p>
                            <p>Pantone: {selectedProduct.pantone_value}</p>
                        </div>
                    )}
                </Box>
            </Modal>
        </>
    );
}

export default Products;
