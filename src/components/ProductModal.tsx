import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Product from "../types/productType";

function ProductModal({
    open,
    handleClose,
    setOpen,
    selectedProduct,
}: {
    open: boolean;
    handleClose: () => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProduct: Product | null;
}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-72 sm:min-w-80 bg-white rounded-md p-5 pt-2 focus:outline-none flex flex-col">
                <div className="flex justify-end">
                    <IconButton
                        className="text-end w-fit"
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                {selectedProduct && (
                    <div>
                        <h2 className="text-xl font-semibold text-center">{selectedProduct.name}</h2>
                        <p>ID: {selectedProduct.id}</p>
                        <p>Year: {selectedProduct.year}</p>
                        <p>Color: <span style={{ color: selectedProduct.color }}>{selectedProduct.color}</span></p>
                        <p>Pantone: {selectedProduct.pantone_value}</p>
                    </div>
                )}
            </Box>
        </Modal>
    );
}

export default ProductModal;
