import Product from "../types/productType";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";

function ProductsTable({
    products,
    handleOpen,
    searchId,
    isPageInRange,
    totalPages,
    rowsPerPage,
    page,
    handleChangePage,
    isLoading,
}: {
    products: Product[];
    handleOpen: (product: Product) => void;
    searchId: string;
    isPageInRange: boolean;
    totalPages: number;
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    isLoading: boolean;
}) {
    return (
        <div className="relative">
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
                        {products.map((product: Product) => (
                            <TableRow
                                key={product.id}
                                sx={{"&:last-child td, &:last-child th": { border: 0 }}}
                                className="cursor-pointer"
                                style={{ backgroundColor: product.color }}
                                onClick={() => handleOpen(product)}
                            >
                                <TableCell align="center">
                                    {product.id}
                                </TableCell>
                                <TableCell align="center">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">
                                    {product.year}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {searchId === "" && isPageInRange && (
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
            {isLoading && (
                <div className="flex justify-center items-center absolute inset-0 bg-black/40">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}

export default ProductsTable;
