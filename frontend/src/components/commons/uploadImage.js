const uploadImage = (props) => {
  const req = new XMLHttpRequest();
  const data = new FormData();
  const elem = document.getElementsByClassName("input-image")[0].files[0];
  let url;

  data.append("image", elem);
  req.open("POST", "https://api.imgur.com/3/image/");
  req.setRequestHeader("Authorization", "Client-ID f50577586266e01");
  req.onreadystatechange = function () {
    if (req.status === 200 && req.readyState === 4) {
      let res = JSON.parse(req.responseText);
      url = `https://i.imgur.com/${res.data.id}.png`;
      props.setTemplate({ ...props.template, image: url });
    }
  };
  req.send(data);
};

export default uploadImage;
