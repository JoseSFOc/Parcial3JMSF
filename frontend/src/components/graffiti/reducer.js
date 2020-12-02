export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Graffiti uploaded!",
    };
  }
  if (action.type === "UPDATE_ITEM") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Graffiti updated!",
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please enter valid attributes",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
      modalContent: "",
    };
  }
  throw new Error("no matching action type");
};
