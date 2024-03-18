import { useEffect, useState } from "react";
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

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://reqres.in/api/products?page=1");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
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
