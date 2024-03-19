function SearchInput({
    searchId, 
    handleSearchChange
}: {
    searchId: string, 
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="flex flex-col mb-12">
            <label htmlFor="searchId">Search by ID:</label>
            <input
                type="number"
                id="searchId"
                min={0}
                value={searchId}
                onChange={handleSearchChange}
                className="border border-gray-400 rounded-md px-3 py-1.5 w-full max-w-44 focus:outline-none"
            />
        </div>
    );
}
  
export default SearchInput;