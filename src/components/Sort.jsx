function Sort({ onSort }) {
  return (
    <select
      data-testid="sort-field"
      onChange={(e) => {
        onSort(e.target.value);
      }}
    >
      {/*added placeholder option */}
      <option value="">Please select an option</option>
      <option value={"description"}>Description</option>
      <option value={"category"}>Category</option>
    </select>
  );
}
export default Sort;
