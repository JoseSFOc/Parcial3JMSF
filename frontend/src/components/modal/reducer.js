export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Template added!",
    };
  }
  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Template deleted!",
    };
  }
  if (action.type === "UPDATE_ITEM") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Template updated!",
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please enter valid values",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
      modalContent: "",
    };
  }
  throw new Error("No matching action");
};
