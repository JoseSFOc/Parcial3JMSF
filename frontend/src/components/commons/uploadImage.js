const uploadImage = (props) => {
  const image = document.getElementsByClassName("input-image")[0].files[0];
  const url = `http://localhost:3030/uploadImage`;
  const formData = new FormData();
  formData.append("image", image);

  const doFetch = async () => {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      redirect: "follow",
    });
    const imageUrl = await response.json();

    try {
      props.setTemplate({ ...props.template, image: imageUrl });
    } catch (e) {
      console.log(e);
    }
  };

  doFetch();
};

export default uploadImage;
