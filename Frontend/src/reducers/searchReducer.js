// export const setSearchText = (searchText) => {
//   return {
//     type: "SET_SEARCH_TEXT",
//     payload: searchText,
//   };
// };

export const setSearchText = (searchText) => {
  const firstChar = searchText.charAt(0);
  const regex = new RegExp(`^${firstChar}`, "i");

  return {
    type: "SET_SEARCH_TEXT",
    payload: regex,
  };
};
